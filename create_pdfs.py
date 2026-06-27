import os

def create_pdf(filename, content):
    pdf_content = f"""%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /Resources 4 0 R /MediaBox [0 0 612 792] /Contents 5 0 R >>
endobj
4 0 obj
<< /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> >> >>
endobj
5 0 obj
<< /Length {len(content) + 54} >>
stream
BT
/F1 24 Tf
100 700 Td
({content}) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000219 00000 n 
0000000302 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
{378 + len(content)}
%%EOF
"""
    with open(filename, 'wb') as f:
        f.write(pdf_content.encode('latin-1'))

files = [
    ("public/docs/sustainability-report-2025.pdf", "2025 Annual Sustainability Report (Dummy File)"),
    ("public/docs/geological-survey-muhanga.pdf", "Geological Survey Muhanga District (Dummy File)"),
    ("public/docs/community-development-framework.pdf", "Community Development Framework (Dummy File)")
]

for filepath, text in files:
    create_pdf(filepath, text)
    print(f"Created {filepath}")
