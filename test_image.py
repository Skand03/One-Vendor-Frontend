import urllib.request
import urllib.error

url = "https://lh3.googleusercontent.com/aida-public/AB6AXuBS48L8GsJeSkMwEAsrfoqhWRz0BOFzOyQAGMWvRxDmcKwK2G85v09-yPWwcPjXtgbfqu5qVK3aO1LZ4S2VbzvPeMidV8jDzpQzblXAamM55_bkMds1za83nYuxgi0zXNXEcTneC0LBPWum36KcuzLyHmkT_dJBU37aYqypAVsYlWOCpaNiw5MWTUhDsqKQR49UtTi7SPonDywk5PPxPbG8Iluodxpijk8QaA-ml5t0a61-fQH5AFYAYEzzI62sdJZkKaGSOs9YRpI"

try:
    req = urllib.request.Request(
        url, 
        headers={'User-Agent': 'Mozilla/5.0'}
    )
    with urllib.request.urlopen(req) as response:
        print("Status Code:", response.getcode())
except urllib.error.HTTPError as e:
    print("HTTP Error:", e.code)
except Exception as e:
    print("Error:", e)
