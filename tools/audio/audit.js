/* Render the old and new sound designs through a real Web Audio graph offline,
   and dump the samples so their spectra can be compared. I cannot hear these
   changes, so they get measured instead of asserted. */
const { chromium } = require('playwright');
const fs = require('fs');

const page_fn = async () => {
  const SR = 48000;

  function noiseBuf(ctx){
    const len = SR * 2, b = ctx.createBuffer(1, len, SR), d = b.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) { last = (last + (Math.random()*2-1)*0.32)/1.32; d[i] = last*2.2; }
    return b;
  }

  async function render(build, secs){
    const ctx = new OfflineAudioContext(1, Math.floor(SR*secs), SR);
    const out = ctx.createGain(); out.gain.value = 1; out.connect(ctx.destination);
    build(ctx, out, noiseBuf(ctx));
    const buf = await ctx.startRendering();
    const f = buf.getChannelData(0);
    const i16 = new Int16Array(f.length);
    for (let i=0;i<f.length;i++) i16[i] = Math.max(-1,Math.min(1,f[i]))*32767;
    let s=''; const u8 = new Uint8Array(i16.buffer);
    for (let i=0;i<u8.length;i+=8192) s += String.fromCharCode.apply(null, u8.subarray(i,i+8192));
    return btoa(s);
  }

  /* ---- breath, before: one wide bandpass, lowpass at 1900 ---- */
  const breathOld = (ctx,out,nb)=>{
    const t=0, freq=146.83, amp=0.30*0.9, dur=4.0;
    const src=ctx.createBufferSource(); src.buffer=nb; src.loop=true;
    const bp=ctx.createBiquadFilter(); bp.type='bandpass'; bp.Q.value=1.4; bp.frequency.value=freq*2.4;
    const lp=ctx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=1900;
    const gp=ctx.createGain();
    gp.gain.setValueAtTime(0.0001,t);
    gp.gain.exponentialRampToValueAtTime(amp*0.55,t+dur*0.42);
    gp.gain.exponentialRampToValueAtTime(0.0001,t+dur+1.4);
    src.connect(bp); bp.connect(lp); lp.connect(gp); gp.connect(out);
    src.start(0);
  };

  /* ---- breath, after: two narrow formants, lowpass at 980, quieter ---- */
  const breathNew = (ctx,out,nb)=>{
    const t=0, freq=146.83, amp=0.30*0.42, d=4.0, dir=-1;
    const src=ctx.createBufferSource(); src.buffer=nb; src.loop=true;
    const f1=ctx.createBiquadFilter(); f1.type='bandpass'; f1.Q.value=5.4;
    const f2=ctx.createBiquadFilter(); f2.type='bandpass'; f2.Q.value=3.4;
    const a1=freq*(dir<0?1.28:0.86), b1=freq*(dir<0?0.86:1.28);
    f1.frequency.setValueAtTime(a1,t); f1.frequency.exponentialRampToValueAtTime(b1,t+d);
    f2.frequency.setValueAtTime(a1*2.7,t); f2.frequency.exponentialRampToValueAtTime(b1*2.7,t+d);
    const g1=ctx.createGain(); g1.gain.value=1.0;
    const g2=ctx.createGain(); g2.gain.value=0.40;
    const lp=ctx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=980; lp.Q.value=0.6;
    const hp=ctx.createBiquadFilter(); hp.type='highpass'; hp.frequency.value=110;
    const gp=ctx.createGain();
    gp.gain.setValueAtTime(0.0001,t);
    gp.gain.exponentialRampToValueAtTime(amp,t+d*0.44);
    gp.gain.exponentialRampToValueAtTime(0.0001,t+d+1.1);
    src.connect(f1); f1.connect(g1); g1.connect(hp);
    src.connect(f2); f2.connect(g2); g2.connect(hp);
    hp.connect(lp); lp.connect(gp); gp.connect(out);
    src.start(0);
  };

  /* ---- metronome, before and after ---- */
  const tickOld = (ctx,out)=>{
    const t=0;
    const o=ctx.createOscillator(); o.type='sine'; o.frequency.value=155.6;
    const lp=ctx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=760; lp.Q.value=0.7;
    const g2=ctx.createGain();
    g2.gain.setValueAtTime(0.0001,t);
    g2.gain.exponentialRampToValueAtTime(0.055,t+0.014);
    g2.gain.exponentialRampToValueAtTime(0.0001,t+0.50);
    o.connect(lp); lp.connect(g2); g2.connect(out); o.start(0); o.stop(0.6);
  };
  const tickNew = (ctx,out,nb)=>{
    const t=0;
    const o=ctx.createOscillator(); o.type='sine';
    o.frequency.setValueAtTime(1240,t); o.frequency.exponentialRampToValueAtTime(780,t+0.055);
    const bp=ctx.createBiquadFilter(); bp.type='bandpass'; bp.frequency.value=1150; bp.Q.value=1.9;
    const g2=ctx.createGain();
    g2.gain.setValueAtTime(0.0001,t);
    g2.gain.exponentialRampToValueAtTime(0.105,t+0.006);
    g2.gain.exponentialRampToValueAtTime(0.0001,t+0.19);
    o.connect(bp); bp.connect(g2); g2.connect(out);
    const ns=ctx.createBufferSource(); ns.buffer=nb; ns.loop=true;
    const nf=ctx.createBiquadFilter(); nf.type='bandpass'; nf.frequency.value=2100; nf.Q.value=1.2;
    const ng=ctx.createGain();
    ng.gain.setValueAtTime(0.0001,t);
    ng.gain.exponentialRampToValueAtTime(0.030,t+0.004);
    ng.gain.exponentialRampToValueAtTime(0.0001,t+0.075);
    ns.connect(nf); nf.connect(ng); ng.connect(out); ns.start(0); ns.stop(0.12);
    o.start(0); o.stop(0.28);
  };

  /* ---- the shruti bed, to see what the cue has to get through ---- */
  const shruti = (ctx,out,nb)=>{
    const df=ctx.createBiquadFilter(); df.type='lowpass'; df.frequency.value=980; df.Q.value=.8;
    const dg=ctx.createGain(); dg.gain.value=0.155;
    const reed=ctx.createBiquadFilter(); reed.type='peaking';
    reed.frequency.value=560; reed.Q.value=1.1; reed.gain.value=6;
    reed.connect(df); df.connect(dg); dg.connect(out);
    const rf=[73.42,110.0,146.83,220.0], rg=[.34,.26,.17,.07];
    for(let j=0;j<rf.length;j++){
      const ro=ctx.createOscillator(); ro.type='sawtooth'; ro.frequency.value=rf[j];
      const g=ctx.createGain(); g.gain.value=rg[j];
      ro.connect(g); g.connect(reed); ro.start(0);
    }
  };

  /* ---- pre-cue, before (octave up) and after (minor third above the octave) ---- */
  const bowlAt = (ctx,out,freq,amp,decay,attack,T)=>{
    const t=0;
    const o1=ctx.createGain(); o1.gain.value=amp; o1.connect(out);
    for(let i=0;i<T.p.length;i++){
      const f=freq*T.p[i]; if(f>16000) continue;
      const dec=Math.max(0.4,decay*T.d[i]);
      for(let v=0;v<2;v++){
        const o=ctx.createOscillator(); o.type='sine';
        o.frequency.value=f+(v?1:-1)*(T.b[i]/2);
        const g=ctx.createGain();
        g.gain.setValueAtTime(0.0001,t);
        g.gain.exponentialRampToValueAtTime(T.g[i]*0.5,t+attack+i*0.025);
        g.gain.exponentialRampToValueAtTime(0.0001,t+dec);
        o.connect(g); g.connect(o1); o.start(0); o.stop(dec+0.25);
      }
    }
  };
  const BOWLS={p:[1,2.74,5.36,8.70,12.50],g:[1,.34,.17,.075,.028],
               d:[1,.70,.50,.34,.22],b:[0.55,1.1,1.7,2.4,3.2]};
  const GLASS={p:[1,2.005,3.99,6.02,9.10],g:[1,.22,.085,.035,.012],
               d:[1,.82,.62,.44,.30],b:[0.35,0.7,1.0,1.4,1.9]};
  const THIRD=Math.pow(2,3/12);
  const preOld = (ctx,out)=>{ bowlAt(ctx,out,146.83*2,0.30*0.085,1.1,0.16,BOWLS); };
  const preNew = (ctx,out)=>{ bowlAt(ctx,out,146.83*2*THIRD,0.150,1.25,0.05,GLASS); };

  return {
    breathOld: await render(breathOld, 2.0),
    breathNew: await render(breathNew, 2.0),
    tickOld:   await render(tickOld,   0.7),
    tickNew:   await render(tickNew,   0.7),
    shruti:    await render(shruti,    1.0),
    preOld:    await render(preOld,    1.0),
    preNew:    await render(preNew,    1.0)
  };
};

(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const p = await b.newPage();
  p.on('pageerror', e => console.log('PAGEERROR', e.message));
  await p.goto('http://localhost:8099/breathe.html');
  const out = await p.evaluate(page_fn);
  fs.writeFileSync('audit.json', JSON.stringify(out));
  console.log('rendered', Object.keys(out).join(', '));
  await b.close();
})();
