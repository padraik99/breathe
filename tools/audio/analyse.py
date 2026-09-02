import json, base64, numpy as np
SR=48000
d=json.load(open('audit.json'))
S={k: np.frombuffer(base64.b64decode(v),dtype='<i2').astype(np.float64)/32768.0 for k,v in d.items()}
def db(x): return -99.0 if x<=1e-9 else 20*np.log10(x)
def band(x,lo,hi):
    X=np.fft.rfft(x); f=np.fft.rfftfreq(len(x),1/SR)
    Xf=np.where((f>=lo)&(f<hi),X,0); return np.fft.irfft(Xf,n=len(x))
def peak_st(x,win=0.025):
    n=int(win*SR); return max(np.sqrt(np.mean(x[i:i+n]**2)) for i in range(0,max(1,len(x)-n),n//4))
def steady(x):
    n=int(0.025*SR); m=len(x)//2; return np.sqrt(np.mean(x[m:m+n]**2))

bed=S['shruti']
# critical bands (Bark-ish) around each cue's real energy
print("Margin in the band where each sound actually lives (25 ms windows):\n")
tests=[('tickOld', 100, 350),('tickNew', 700, 1700),
       ('preOld', 250, 340),('preNew', 320, 420)]
for k,lo,hi in tests:
    b=db(steady(band(bed,lo,hi))); v=db(peak_st(band(S[k],lo,hi)))
    print(f"  {k:8s} {lo:5d}-{hi:5d} Hz   bed {b:6.1f}   cue {v:6.1f}   margin {v-b:+6.1f} dB")

print("\nWhat the bed duck buys (bed attenuated by X during the cue):")
for att in (0.0,0.25,0.34,0.50):
    print(f"   duck {att:4.2f}  -> +{-db(1-att):.1f} dB of margin")

print("\nHeadroom check -- how loud can the tick get before it clips with the bed under it?")
bp=np.max(np.abs(bed)); print(f"   bed peak {db(bp):.1f} dBFS ({bp:.3f} linear)")
for mult in (1,2,3,4):
    tp=np.max(np.abs(S['tickNew']))*mult
    print(f"   tick x{mult}  peak {db(tp):6.1f} dBFS   bed+tick worst case {bp+tp:.3f} "
          f"{'CLIPS' if bp+tp>1 else 'ok'}")
