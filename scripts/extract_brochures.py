import pymupdf
from pathlib import Path

pdfs = [
    Path(r"c:\Users\HP\Downloads\Brocher_Sandalwood JMK .pdf"),
    Path(r"c:\Users\HP\Downloads\Brocher_(2) JMK  H B Grinders.pdf"),
]
out = Path(r"c:\Users\HP\Downloads\Jiwakhan_Musabhai_Kanchwala_Website\tmp_brochure")
out.mkdir(exist_ok=True)

for pdf in pdfs:
    doc = pymupdf.open(pdf)
    print("=" * 60)
    print(pdf.name, "pages=", doc.page_count)
    name = "sandalwood" if "Sandalwood" in pdf.name else "hb"
    for i, page in enumerate(doc):
        text = page.get_text("text")
        print(f"--- page {i + 1} ---")
        print(text[:3000])
        print()
        pix = page.get_pixmap(matrix=pymupdf.Matrix(2, 2), alpha=False)
        dest = out / f"{name}-page-{i + 1}.jpg"
        pix.save(dest.as_posix())
        print("saved", dest.name, pix.width, "x", pix.height)
