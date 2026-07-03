import json
import urllib.request
import os
import shutil

html_dir = 'frontend/stitch_screens'
if os.path.exists(html_dir):
    shutil.rmtree(html_dir)
os.makedirs(html_dir, exist_ok=True)

with open(r'C:\Users\Skand\.gemini\antigravity-ide\brain\c8a701b5-6d9b-496b-84e1-75513c051f2f\.system_generated\steps\80\output.txt', 'r', encoding='utf-8') as f:
    data = json.load(f)

current_screens = []

for screen in data.get('screens', []):
    name = screen.get('title')
    html_info = screen.get('htmlCode', {})
    download_url = html_info.get('downloadUrl')
    
    if download_url:
        print(f"Downloading {name}...")
        safe_name = name.replace(' ', '_').replace('-', '').replace('__', '_')
        req = urllib.request.Request(download_url, headers={'User-Agent': 'Mozilla/5.0'})
        try:
            with urllib.request.urlopen(req) as response:
                html_content = response.read().decode('utf-8')
                with open(os.path.join(html_dir, f'{safe_name}.html'), 'w', encoding='utf-8') as out_f:
                    out_f.write(html_content)
                current_screens.append(safe_name)
        except Exception as e:
            print(f"Failed to download {name}: {e}")

# Save the current list of screen base names for the JSX converter to know what to keep
with open('current_screens.json', 'w') as f:
    json.dump(current_screens, f)
