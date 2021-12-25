
import os

# html
f = open("html.txt", "w")
root = "./links/web"
for name in os.listdir(root):
    if not os.path.isfile(os.path.join(root, name)):
        f.write(name + "\n")
f.close()

# other
others = ["py", "java"]
for other in others:
    f = open(f"{other}.txt", "w")
    for _, _, files in os.walk(f"file\{other}"):
        for name in files:
            try:
                f.write(name + "\n")
            except UnicodeEncodeError:
                print("\r[UnicodeEncodeError]")
    f.close()
