import urllib.request
import urllib.error

url = "https://lh3.googleusercontent.com/aida/AP1WRLsEqxhunGaJEHEKZW_KKYKbOx63gnW1Hs_iwDb4OVR3d5T2YrWKCdSuwNvPxdiHWUJ5uJ6lIDFAQu3om6wqZPH1XvmLKbQ_XTe7A6J8nzaB20M39PpTwR_dJsLIB3nQN5gkxtmRpU-mUAAHGAasDOohEuamPgs069uR8YnmDTd6ABXQZ40Ldh49JniybZrTI6mRXpfi4khHDZ0Zydpiz6XyDcWWrqiMBA0oTOx0jDUrA31gMwC63SQK5kI"

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
