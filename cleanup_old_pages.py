import os

pages_dir = 'frontend/src/pages'
for item in os.listdir(pages_dir):
    item_path = os.path.join(pages_dir, item)
    if os.path.isfile(item_path):
        os.remove(item_path)
        print(f"Removed old page file: {item_path}")
print("Cleanup done.")
