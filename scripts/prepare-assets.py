from pathlib import Path
from PIL import Image

SRC_DIR = Path(r"d:\workspace\AI链上金币\hakimi\logs\news-art-v4")
DST_DIR = Path(__file__).resolve().parent / "assets"
DST_DIR.mkdir(parents=True, exist_ok=True)

# Crop ratios (left, top, right, bottom) tuned to strip outer cream margins and inner ink frame lines
CROPS = {
    "art-space.jpg": (0.045, 0.045, 0.955, 0.955),
    "art-markets-chip.jpg": (0.045, 0.045, 0.955, 0.955),
    "art-winter-grid.jpg": (0.056, 0.062, 0.944, 0.872),
    "art-energy-crisis.jpg": (0.048, 0.052, 0.952, 0.948),
}

for name, (l, t, r, b) in CROPS.items():
    img = Image.open(SRC_DIR / name).convert("RGB")
    w, h = img.size
    cropped = img.crop((int(w * l), int(h * t), int(w * r), int(h * b)))
    target_w = 560
    target_h = round(cropped.height * (target_w / cropped.width))
    resized = cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)
    out = DST_DIR / name
    resized.save(out, format="JPEG", quality=90, subsampling=0, optimize=True)
    print(f"{name}: src={w}x{h} -> cropped={cropped.size} -> saved={target_w}x{target_h} ({out.stat().st_size} bytes)")
