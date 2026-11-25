from pathlib import Path
from PIL import Image

V4_DIR = Path(r"d:\workspace\AI链上金币\hakimi\logs\news-art-v4")
V5_DIR = Path(r"d:\workspace\AI链上金币\hakimi\logs\news-art-v5")
DST_DIR = Path(__file__).resolve().parent / "assets"
DST_DIR.mkdir(parents=True, exist_ok=True)

# (source_dir, filename, (left, top, right, bottom))
SPECS = [
    (V4_DIR, "art-space.jpg", (0.045, 0.045, 0.955, 0.955)),
    (V4_DIR, "art-markets-chip.jpg", (0.045, 0.045, 0.955, 0.955)),
    (V4_DIR, "art-winter-grid.jpg", (0.056, 0.062, 0.944, 0.872)),
    (V4_DIR, "art-energy-crisis.jpg", (0.048, 0.052, 0.952, 0.948)),
    (V5_DIR, "art-cyber-defense.jpg", (0.015, 0.015, 0.985, 0.985)),
    (V5_DIR, "art-justice-rescue.jpg", (0.040, 0.042, 0.960, 0.958)),
    (V5_DIR, "art-africa-ebola-cup.jpg", (0.040, 0.042, 0.960, 0.958)),
    (V5_DIR, "art-voyager-sport.jpg", (0.034, 0.168, 0.966, 0.832)),
]

for src_dir, name, (l, t, r, b) in SPECS:
    img = Image.open(src_dir / name).convert("RGB")
    w, h = img.size
    cropped = img.crop((int(w * l), int(h * t), int(w * r), int(h * b)))
    target_w = 560
    target_h = round(cropped.height * (target_w / cropped.width))
    resized = cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)
    out = DST_DIR / name
    resized.save(out, format="JPEG", quality=90, subsampling=0, optimize=True)
    print(f"{name}: src={w}x{h} -> cropped={cropped.size} -> saved={target_w}x{target_h} ({out.stat().st_size} bytes)")
