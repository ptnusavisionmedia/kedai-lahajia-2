from PIL import Image
import numpy as np
import math
from pathlib import Path

root = Path(__file__).parent
source = Image.open(root / 'kedai-lahajia-kuning-gurih.png').convert('RGBA')
source.thumbnail((560,560), Image.Resampling.LANCZOS)
a = np.array(source)
mask = a[:,:,3] > 80
seen = np.zeros(mask.shape, bool)
parts = []
for y,x in zip(*np.where(mask)):
    if seen[y,x]: continue
    stack=[(y,x)]; seen[y,x]=True; coords=[]
    while stack:
        yy,xx=stack.pop(); coords.append((yy,xx))
        for ny,nx in ((yy-1,xx),(yy+1,xx),(yy,xx-1),(yy,xx+1)):
            if 0<=ny<mask.shape[0] and 0<=nx<mask.shape[1] and mask[ny,nx] and not seen[ny,nx]:
                seen[ny,nx]=True; stack.append((ny,nx))
    if len(coords)>200: parts.append(coords)
layers=[]
for coords in parts:
    layer=np.zeros_like(a)
    yy,xx=np.array(coords).T
    # Include the anti-aliased fringe surrounding each connected component.
    region=Image.new('L',source.size)
    ra=np.array(region); ra[yy,xx]=255
    from PIL import ImageFilter
    region=Image.fromarray(ra).filter(ImageFilter.MaxFilter(5))
    layer=a.copy(); layer[:,:,3]=np.minimum(a[:,:,3],np.array(region))
    im=Image.fromarray(layer)
    box=im.getbbox()
    layers.append((im.crop(box),box))
layers.sort(key=lambda p:p[1][0])
frames=[]
N=100
for i in range(N):
    t=2*math.pi*i/N
    frame=Image.new('RGBA',(600,600))
    bob=2*math.sin(t)
    for j,(im,box) in enumerate(layers):
        x,y=box[:2]
        if box[3] < source.height*.45:
            phase=t+j*1.4
            dx=4*math.sin(phase)
            dy=-5*math.sin(phase)+bob
            sx=1+.025*math.sin(phase+.4)
            sy=1+.035*math.sin(phase)
            tile=im.resize((round(im.width*sx),round(im.height*sy)),Image.Resampling.LANCZOS)
            x+=dx+(im.width-tile.width)/2
            y+=dy+(im.height-tile.height)/2
        else:
            tile=im; y+=bob
        frame.alpha_composite(tile,(round(x+20),round(y+20)))
    frames.append(frame)
# Shared palette avoids color flicker. Reserve index 255 for transparency.
sheet=Image.new('RGB',(600*5,600), '#FFF8E7')
for k in range(5):
    f=frames[k*20]; sheet.paste(f,(600*k,0),f)
palette=sheet.quantize(colors=255,method=Image.Quantize.MEDIANCUT)
out=[]
for f in frames:
    rgb=Image.new('RGB',f.size,'#FFF8E7'); rgb.paste(f,mask=f.getchannel('A'))
    q=rgb.quantize(palette=palette,dither=Image.Dither.NONE)
    qa=np.array(q); qa[np.array(f.getchannel('A'))<128]=255
    q=Image.fromarray(qa,'P'); q.putpalette(palette.getpalette())
    q.info['transparency']=255
    out.append(q)
path=root/'kedai-lahajia-animated.gif'
out[0].save(path,save_all=True,append_images=out[1:],duration=40,loop=0,transparency=255,disposal=2,optimize=False)
with Image.open(path) as check:
    assert check.n_frames>=60
    assert check.info['loop']==0
    print(f'{path}: {check.size}, {check.n_frames} frames, 4 seconds, {path.stat().st_size} bytes')
preview=Image.new('RGB',(1200,600),'#FFF8E7')
for pos,idx in enumerate((0,25)):
    preview.paste(frames[idx],(pos*600,0),frames[idx])
preview.save(root/'animation-preview.png')
