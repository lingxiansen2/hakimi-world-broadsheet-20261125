import sys
from pathlib import Path
from PIL import Image

raw_path = Path(sys.argv[1])
out_path = Path(sys.argv[2])
thumb_path = Path(r"d:\workspace\AI链上金币\hakimi\logs\news-20261125-thumb-preview.png")

img = Image.open(raw_path).convert("RGB")
assert img.size == (1024, 1024), f"Unexpected dimensions: {img.size}"

# Save lossless RGB PNG first
img.save(out_path, format="PNG", optimize=True)
size_bytes = out_path.stat().st_size

# If larger than 920 KB, quantize cleanly with adaptive palette (256 colors) to stay well under 1 MiB
if size_bytes > 940_000:
    q = img.quantize(colors=256, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE)
    q.save(out_path, format="PNG", optimize=True)
    size_bytes = out_path.stat().st_size

# Save 768px width preview thumbnail for visual audit
thumb = img.resize((768, 768), Image.Resampling.LANCZOS)
thumb_path.parent.mkdir(parents=True, exist_ok=True)
thumb.save(thumb_path, format="PNG", optimize=True)

if raw_path.exists():
    raw_path.unlink()

print(f"Saved {out_path} ({img.size[0]}x{img.size[1]}, {size_bytes} bytes)")
print(f"Saved {thumb_path} ({thumb.size[0]}x{thumb.size[1]}, {thumb_path.stat().st_size} bytes)")
