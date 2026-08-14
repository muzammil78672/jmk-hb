# Jiwakhan Musabhai Kanchwala — React Website

React (Vite) website for sandalwood and fragrance raw materials.

## Setup

```bash
npm install
npm run dev
```

## Product sources

Catalogue copy and imagery are derived from:

- `public/assets/brochures/JMK-Sandalwood-Brochure.pdf`
- `public/assets/brochures/JMK-HB-Grinders-Brochure.pdf`

HD product images were extracted from those brochures and normalised to web sizes in `public/assets/products/`.

## Notes

- Brochure OCR typo **“Scented Prices”** is corrected on the site to **“Scented Pieces”**.
- Packaging variants such as “Sandal Wood” are standardised to **Sandalwood** in website copy.
- Rebuild images after brochure updates with `python scripts/build_product_images.py`.
