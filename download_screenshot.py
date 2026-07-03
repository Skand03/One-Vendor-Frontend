import urllib.request

url = "https://lh3.googleusercontent.com/aida/AP1WRLsdonatTGlTFHyvjq1En5J4Sur9Pvp-QnXfEo_aaWsY-Ze_wGFUBXfvWz6q_kX0n4yY1UOEiijfYAVIJTXIc8Ivxk_xHkN6YuIo2reGX9sijHoXY4k_wL1NnsNV1fJ1o8-oRgE2jUd6TS9MlNjPRK_gEUV7mBGnhCnMvbKV9CZg2oLLR2OXnqcNvYffvB9WtmOhzLczcea2Aaw3rXdN5OIE5Rr4phZvHoFwh8x7-jscE0wxv7mzhJ5mKg"
output = "stitch_home_screenshot.png"

try:
    req = urllib.request.Request(
        url, 
        headers={'User-Agent': 'Mozilla/5.0'}
    )
    with urllib.request.urlopen(req) as response:
        with open(output, "wb") as f:
            f.write(response.read())
    print("Downloaded successfully!")
except Exception as e:
    print("Error:", e)
