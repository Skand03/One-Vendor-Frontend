import json

log_path = r"C:\Users\Skand\.gemini\antigravity-ide\brain\c8a701b5-6d9b-496b-84e1-75513c051f2f\.system_generated\logs\transcript.jsonl"

with open(log_path, 'r', encoding='utf-8') as f:
    for line in f:
        data = json.loads(line)
        if "PROMPT 0" in data.get("content", ""):
            print("Found PROMPT 0 in step:", data.get("step_index"))
            # print first 1000 characters
            print(data.get("content")[:2000])
            print("...")
            # Save it to a file for easy viewing
            with open("extracted_prompts.txt", "w", encoding="utf-8") as out:
                out.write(data.get("content"))
            print("Saved full content to extracted_prompts.txt")
            break
