import pymupdf
from pathlib import Path
from PIL import Image
import io

pdfs = [
    (Path(r"c:\Users\HP\Downloads\Brocher_Sandalwood JMK .pdf"), "sw"),
    (Path(r"c:\Users\HP\Downloads\Brocher_(2) JMK  H B Grinders.pdf"), "hb"),
]
out = Path(r"c:\Users\HP\Downloads\Jiwakhan_Musabhai_Kanchwala_Website\tmp_brochure\embedded")
out.mkdir(parents=True, exist_ok=True)

for pdf, prefix in pdfs:
    doc = pymupdf.open(pdf)
    print("=" * 50, pdf.name)
    for pi, page in enumerate(doc):
        images = page.get_images(full=True)
        print(f"page {pi+1}: {len(images)} images")
        for ii, img in enumerate(images):
            xref = img[0]
            try:
                extracted = doc.extract_image(xref)
            except Exception as e:
                print("  fail", xref, e)
                continue
            ext = extracted["ext"]
            w, h = extracted["width"], extracted["height"]
            data = extracted["image"]
            dest = out / f"{prefix}-p{pi+1}-i{ii+1}-{w}x{h}.{ext}"
            dest.write_bytes(data)
            print(f"  saved {dest.name}")
