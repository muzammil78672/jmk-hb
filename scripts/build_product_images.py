"""Build web-ready HD product images from brochure embeds."""
from pathlib import Path
from PIL import Image, ImageOps, ImageFilter, ImageEnhance

Image.MAX_IMAGE_PIXELS = None

ROOT = Path(r"c:\Users\HP\Downloads\Jiwakhan_Musabhai_Kanchwala_Website")
SRC = ROOT / "tmp_brochure" / "embedded"
OUT = ROOT / "public" / "assets" / "products"
BROCHURE_OUT = ROOT / "public" / "assets" / "brochures"
OUT.mkdir(parents=True, exist_ok=True)
BROCHURE_OUT.mkdir(parents=True, exist_ok=True)

# Official cream / paper tone matching site
BG = (251, 248, 242)


def fit_canvas(im: Image.Image, size=(1600, 1200), bg=BG) -> Image.Image:
    """Contain image on a branded canvas at target size."""
    im = im.convert("RGB")
    fitted = ImageOps.contain(im, size, method=Image.Resampling.LANCZOS)
    canvas = Image.new("RGB", size, bg)
    x = (size[0] - fitted.width) // 2
    y = (size[1] - fitted.height) // 2
    canvas.paste(fitted, (x, y))
    return canvas


def enhance(im: Image.Image) -> Image.Image:
    im = ImageEnhance.Sharpness(im).enhance(1.12)
    im = ImageEnhance.Contrast(im).enhance(1.06)
    im = ImageEnhance.Color(im).enhance(1.05)
    return im


def save_product(src_name: str, dest_name: str, size=(1600, 1200), crop=None):
    src = SRC / src_name
    im = Image.open(src)
    if crop:
        im = im.crop(crop)
    out = enhance(fit_canvas(im, size))
    dest = OUT / dest_name
    out.save(dest, "JPEG", quality=90, optimize=True, progressive=True)
    print(f"wrote {dest.name} {out.size}")


# Page 2 products
save_product("sw-p2-i2-1383x881.png", "sandalwood-pieces-no1.jpg")  # Pieces No. 1
save_product("sw-p2-i1-720x1600.png", "sandalwood-pieces-no2.jpg")  # Pieces No. 2
save_product("sw-p2-i3-780x1040.png", "sandalwood-logs-no1.jpg")  # Logs No. 1

# Page 3
save_product("sw-p3-i1-1600x1200.png", "scented-pieces.jpg")  # Scented Pieces (brochure typo: Prices)
save_product("sw-p3-i2-1600x1200.png", "sandalwood-chips.jpg")
save_product("sw-p3-i3-1200x1600.png", "sandalwood-heartwood.jpg")

# Page 4
save_product("sw-p4-i1-1200x1600.png", "rakht-sandalwood-powder.jpg")
save_product("sw-p4-i2-1227x1380.png", "green-agarbatti-powder.jpg")
save_product("sw-p4-i3-1200x1600.png", "red-wood-chips.jpg")

# Cover / powder hero — use high-quality logs as powder category visual + brochure art
save_product("sw-p2-i3-780x1040.png", "sandalwood-powder.jpg")  # placeholder if no powder photo
# Prefer cover log stack if available
for candidate in SRC.glob("sw-p1-i*-*.png"):
    if candidate.stat().st_size < 50_000:
        continue
    im = Image.open(candidate)
    # skip logo/icons and huge backgrounds and elephant art
    if im.width >= 5000 or im.height >= 5000:
        continue
    if im.width < 500 or im.height < 500:
        continue
    # Prefer landscape-ish wood photo from cover area: i7 789x433 looks like logs strip
    if "i7" in candidate.name:
        save_product(candidate.name, "sandalwood-powder.jpg", size=(1600, 1200))
        break

# Packaged powders from HB brochure page 5
for name, dest in [
    ("hb-p5-i2-526x475.jpeg", "mysore-sandalwood.jpg"),
    ("hb-p5-i4-339x253.jpeg", "mysore-malyagiri.jpg"),
    ("hb-p5-i6-335x251.jpeg", "crown-sandalwood.jpg"),
    ("hb-p5-i1-271x273.jpeg", "malayagiri-sandalwood.jpg"),
]:
    if (SRC / name).exists():
        save_product(name, dest, size=(1400, 1200))

# Also export square thumbs for category tiles
square_map = {
    "sandalwood-pieces-no1.jpg": "pieces-no1.jpg",
    "sandalwood-pieces-no2.jpg": "pieces-no2.jpg",
    "sandalwood-logs-no1.jpg": "logs-no1.jpg",
    "sandalwood-chips.jpg": "sandalwood-chips.jpg",
    "sandalwood-heartwood.jpg": "heartwood.jpg",
    "scented-pieces.jpg": "scented-pieces.jpg",
    "sandalwood-powder.jpg": "sandalwood-powder.jpg",
    "rakht-sandalwood-powder.jpg": "rakht-powder.jpg",
    "green-agarbatti-powder.jpg": "green-agarbatti-powder.jpg",
    "red-wood-chips.jpg": "red-wood-chips.jpg",
}

# Re-save primary filenames used by the site (aliases)
aliases = {
    "pieces-no1.jpg": "sandalwood-pieces-no1.jpg",
    "pieces-no2.jpg": "sandalwood-pieces-no2.jpg",
    "logs-no1.jpg": "sandalwood-logs-no1.jpg",
    "heartwood.jpg": "sandalwood-heartwood.jpg",
    "rakht-powder.jpg": "rakht-sandalwood-powder.jpg",
}
for alias, master in aliases.items():
    src = OUT / master
    if src.exists():
        im = Image.open(src)
        # also make a square version for cards
        side = 1200
        sq = enhance(fit_canvas(im, (side, side)))
        sq.save(OUT / alias, "JPEG", quality=90, optimize=True, progressive=True)
        print(f"alias {alias} {sq.size}")

# HD brochure pages for catalogue viewer (from already rendered 2x, or re-render 3x)
tmp_pages = ROOT / "tmp_brochure"
for page in sorted(tmp_pages.glob("sandalwood-page-*.jpg")):
    im = Image.open(page).convert("RGB")
    # upscale gently to ~1800 wide if smaller
    if im.width < 1600:
        ratio = 1800 / im.width
        im = im.resize((1800, int(im.height * ratio)), Image.Resampling.LANCZOS)
    dest = BROCHURE_OUT / page.name.replace("sandalwood-", "")
    im.save(dest, "JPEG", quality=88, optimize=True, progressive=True)
    print("brochure", dest.name)

for page in sorted(tmp_pages.glob("hb-page-*.jpg")):
    im = Image.open(page).convert("RGB")
    dest = BROCHURE_OUT / page.name
    im.save(dest, "JPEG", quality=88, optimize=True, progressive=True)
    print("brochure", dest.name)

# Hero / heritage image from cover elephant art or logs
cover_logs = SRC / "sw-p1-i7-789x433.png"
if cover_logs.exists():
    save_product(cover_logs.name, "hero-sandalwood.jpg", size=(1920, 1080))

print("done")
