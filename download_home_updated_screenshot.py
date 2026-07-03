import urllib.request

url = "https://lh3.googleusercontent.com/aida/AP1WRLtn4kO_hi_ovJF-kxslXbTgw9Uj1vwYEEEBrqpb3RSJXCN_F79ZmcrnpxtOEi73a0RQsv98eFtfItRfXG9Ha7Um6jD6Ftl8eSnx13Z6BNWZmQ2b6wr4SLgd8zGyBEYPSQ5sR_GRNn_aub2oi-QZVIcgY3mQRxX9WeMNejtGlp2GBSeE83WfRofzbZvNaTFoJJL29qu0uAL80tptPjn8YTnRmBrD7ndHPoY5dGncLzS4csEIe40tqNSNSg"
output = "stitch_home_updated_screenshot.png"

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
