import urllib.request

url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzQ3MGYyNjkxYWYyYjQzMTc5ZDBmMWNmYzY2YjBlYzgzEgsSBxCEspy4lBgYAZIBIwoKcHJvamVjdF9pZBIVQhM5NTM0NjQ0MTE3NDc4Mjg0MTgx&filename=&opi=89354086"
output = "downloaded_home.html"

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
