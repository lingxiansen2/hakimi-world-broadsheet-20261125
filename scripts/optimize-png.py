import sys
from pathlib import Path
from PIL import Image

raw_path = Path(sys.argv[1])
out_path = Path(sys.argv[2])
thumb_768 = Path(r"d:\workspace\AI链上金币\hakimi\logs\news-20261125-thumb-preview.png")
thumb_320 = Path(r"d:\workspace\AI链上金币\hakimi\logs\news-320px-v4.png")

img = Image.open(raw_path).convert("RGB")
assert img.size == (1024, 1024), f"Unexpected dimensions: {img.size}"

# Try lossless PNG first; if > 950 KiB, use crisp 4:4:4 JPEG (subsampling=0, quality=92)
img.save(out_path, format="PNG", optimize=True)
size_bytes = out_path.stat().st_size
fmt_used = "PNG"

if size_bytes > 950_000:
    img.save(out_path, format="JPEG", quality=92, subsampling=0, optimize=True)
    size_bytes = out_path.stat().st_size
    fmt_used = "JPEG (4:4:4 q=92)"

if size_bytes > 1_048_576:
    img.save(out_path, format="JPEG", quality=88, subsampling=0, optimize=True)
    size_bytes = out_path.stat().st_size
    fmt_used = "JPEG (4:4:4 q=88)"

for dst, px in ((thumb_768, 768), (thumb_320, 320)):
    dst.parent.mkdir(parents=True, exist_ok=True)
    resized = img.resize((px, px), Image.Resampling.LANCZOS)
    resized.save(dst, format="PNG", optimize=True)
    print(f"Saved {dst} ({px}x{px}, {dst.stat().st_size} bytes)")

if raw_path.exists():
    raw_path.unlink()

print(f"Saved {out_path} as {fmt_used} ({img.size[0]}x{img.size[1]}, {size_bytes} bytes)")
