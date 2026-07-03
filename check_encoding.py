import codecs

def check_bom(filepath):
    with open(filepath, 'rb') as f:
        raw = f.read(4)
        if raw.startswith(codecs.BOM_UTF8):
            return 'utf-8-sig'
        elif raw.startswith(codecs.BOM_UTF16_LE):
            return 'utf-16-le'
        elif raw.startswith(codecs.BOM_UTF16_BE):
            return 'utf-16-be'
        elif raw.startswith(codecs.BOM_UTF32_LE):
            return 'utf-32-le'
        elif raw.startswith(codecs.BOM_UTF32_BE):
            return 'utf-32-be'
    return 'unknown'

filepath = "frontend/src/pages/customer/Home.jsx"
try:
    bom = check_bom(filepath)
    print(f"BOM check: {bom}")
    
    # Try reading as UTF-8
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        print("Successfully read as UTF-8!")
        print("First 100 chars:", repr(content[:100]))
except Exception as e:
    print("Error reading as UTF-8:", e)

try:
    # Try reading as UTF-16
    with open(filepath, 'r', encoding='utf-16') as f:
        content = f.read()
        print("Successfully read as UTF-16!")
        print("First 100 chars:", repr(content[:100]))
except Exception as e:
    print("Error reading as UTF-16:", e)
