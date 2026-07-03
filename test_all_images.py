import urllib.request
import urllib.error
import re

urls = [
    # Catalog First Row
    "https://lh3.googleusercontent.com/aida-public/AB6AXuALZUVwHXovrdb2XW9-NLVvbY50s0jiHFpTzpL08S9Yoq_kZmMBTQZ2d5GVPJF0fASiai2yPoalcMAvCvOgbE_NlL-vhWAA_qMPEGW5vC5GRi2ihn28wFibDjeOkpNUVpaWTBnjc1R8Jb7AgHP7bwPtt4vUjjO9BrL_L2cMjyjucNthsAEoFSybmqImmU0-pu9TbTL37N5I-gIR0DsUxWGArI5k4X8DbcLp5L1P4B-bjZ60E8w-d1DgujwgeVPnzMK6Kj7SSmj9cKU",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDwUnDAYsIKEjs8dVLmonati8pZxIJq-se-2U2tUVdtDSLtIt3v43j-dO8bPfBk0g7sI1khuRgVuXxQXa4LQ9u-RTs1Uw4ETn12uu2PJjqkRo90q0_QZpbj7_x-V5ELC9k4w-IR_PMRND19LJeIvwEtQ5V6FQkyqpYvVT238J7MNrkyYmtCb-pRMdqVVbRw3vi32973Dj271I-GnttQAj7BX_GOjwkTNSbyvAWNi10xOkMj_HJ_d2OMPdebRYxUSOVTItoq5rVbCEw",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDgoKccdjLOIhjyo9IgiKN2DxdoIN_8kPc38uTciEMWPGZeBvch6oEPW-FZcUYFmhfQGR22-u2nQ7bDZWYZRmHeOjMs_LQ5C0xqdG3GDDLtOmAp23DXIf3tiUIMSba-YaSfV2exCocVp6xq9iPInLXb-iVG2KKIc2VRuLi0OoTIiiOIk3ljNUYMUAdOhcai0VJQzZBUfhiVj190zkU0v0pxtPrgCIh5mIEKbU4uLWW5xoxjE1Uy97w3bRb74ibjhsk7eaRga1gL4AQ",
    # Catalog Second Row
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCnTw1Zt6U0JlyMp22qCDewbamz8l0Wg2niz0MWKf2_zRxtseRtIWWpm1R_ocBItF9EXvmHZXGNratBIwElMqvgauoOj2mwMNDyD9ojWuWAgMm46f8fAlOrzKyABp6XIPMzbKfBXSeEfLOsT-EQg13X76Ha9YwiuUZ7Ff-7Q5G42UdSK1u5Q5yxsqcBsIsXSqs85x7_klmb0PS9gBmXLywXDUs-mTtAOYTBz8UsdcGyOL7-7yh0fd1q-kadXhksG1Q6QtAlduo8Ef0",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBt_jNdyqSdwGIgXYX6uZQtCW6S69N7bDftbw22BUyodf0bLWhKAmaNKsO9kE26zbTiXkn6wabD_QvMc0BJ5zhEZZ2xJmteOwW4xYOpaaS1CW0yxkd-7anXpArlaazw6yudrrz5n5hyyfw7EUO0dhwg3-1wFwOw1IwwjAGuJz6j2xAkzyc7gSTTCeO-m1q-zUfqZdjxn6FJgZw9vnVydEuwx5-dSsS72z1O16scnOEkrIQ7Vi7UJMFFR3IYtxqV2nDb0rxahh4_sAM",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBbs54XdYI9x1oey1fYywldgOnA1a6qw5bhSF1y77e36Vc25hxx73ifrXxfQSXyIQmDMGZUS4g_VNlX2KUFqcfVAMLAY5awbihebt2gLkAk6kbdKJyACrjUM_ozz-ltZNADgJ4rQpbmeDn8SyHR6fIHYUi01T34h3vALtGJTuJZ2DGmVK06r6jiic2QIT0N4qvktc9232iYhzv9JZgxzJnXkaC2Zr7blSg-2SzLbIPJnog8n0Dg5hdUf7mb65vHsi5CkO3THBaXLLc"
]

for i, url in enumerate(urls, 1):
    try:
        req = urllib.request.Request(
            url, 
            headers={'User-Agent': 'Mozilla/5.0'}
        )
        with urllib.request.urlopen(req) as response:
            print(f"Image {i}: HTTP {response.getcode()}")
    except urllib.error.HTTPError as e:
        print(f"Image {i}: HTTP Error {e.code}")
    except Exception as e:
        print(f"Image {i}: Error {e}")
