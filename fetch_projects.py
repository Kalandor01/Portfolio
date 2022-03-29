import os
import requests
from save_file_manager import UI_list

# local projects
def local_get():
    # html
    f = open("links/html.txt", "w")
    root = "./links/web"
    for name in os.listdir(root):
        if not os.path.isfile(os.path.join(root, name)):
            f.write(name + "\n")
    f.close()

    # other
    others = ["py", "java"]
    for other in others:
        f = open(f"links/{other}.txt", "w")
        for _, _, files in os.walk(f"links\\file\{other}"):
            for name in files:
                try:
                    f.write(name + "\n")
                except UnicodeEncodeError:
                    print("\r[UnicodeEncodeError]")
        f.close()
    input("\nLocal HTML, Python and Java project list updated.\n")


def conflicts(added_lis, removed_lis):
    # write
    # no change
    if len(added_lis) == 0 and len(removed_lis) == 0:
        print("\nNo changes.")
    # added
    if len(added_lis) > 0:
        print(f"\nAdded {len(added_lis)}:")
        for x in range(len(added_lis)):
            print(f"{added_lis[x][0]}({added_lis[x][1]})", end="")
            if x < len(added_lis) - 1:
                print(end=", ")
        print()
    # removed
    if len(removed_lis) > 0:
        print(f"\nRemoved {len(removed_lis)}:")
        for x in range(len(removed_lis)):
            print(f"{removed_lis[x][0]}({removed_lis[x][1]})", end="")
            if x < len(removed_lis) - 1:
                print(end=", ")
        print()
    extra = []
    # conflict resolving
    # added
    if len(added_lis) > 0:
        print("Resolve added project conflicts:\nnothing = add to list with current name, . = don't add to list, text = add to list with this name\n")
        for ad in added_lis:
            ans = input(f"{ad[0]}({ad[1]}): ")
            if ans == "":
                extra.append([ad[1], ad[0], ad[0]])
            if ans != "." and ans != "":
                extra.append([ad[1], ans, ad[0]])
    if len(removed_lis) > 0:
        print("Resolve removed project conflicts:\nnothing = don't add to list, . = add to list with original name anyways, text = add to list with different name anyways\n")
        for re in removed_lis:
            ans = input(f"{re[1]}({re[0]}) git name:\"{re[2]}\": ")
            if ans == ".":
                extra.append(re)
            if ans != "." and ans != "":
                extra.append([re[0], ans, re[2]])
    return extra


# github projects
def git_get(git_tok=""):
    # reading old project data from file
    git_pre = []
    git_pre_left = []
    git_raw = []
    try:
        f = open("links/github.txt", "r", encoding="utf-8")
        lines = f.read().split("\n")
        for line in lines:
            git_pre.append(line.split("||"))
            git_pre_left.append(line.split("||"))
        f.close()
    except FileNotFoundError:
        print("No github.txt found!")

    # fetching project names from github api
    print("Fetching and comparing github projects:")
    if git_tok != "":
        gitprojects = requests.get("https://api.github.com/users/Kalandor01/repos?per_page=100&page=1", headers={"Authorization": git_tok}).text
    else:
        gitprojects = requests.get("https://api.github.com/users/Kalandor01/repos?per_page=100&page=1").text
    if gitprojects.find("API rate limit exceeded for") != -1:
        print("\nAPI REQUEST LIMIT EXCEDED!!!")
        return True
    names_split = gitprojects.split("\",\"full_name\":\"")
    for x in range(len(names_split) - 1):
        git_name = names_split[x + 1].split("\",\"")[0].split("/")[1]
        if git_name != "Kalandor01" and git_name != "Portfolio":
            # fetching project type
            if git_tok != "":
                gitp_type = requests.get(f"https://api.github.com/repos/Kalandor01/{git_name}/languages", headers={"Authorization": git_tok}).text
            else:
                gitp_type = requests.get(f"https://api.github.com/repos/Kalandor01/{git_name}/languages").text
            if gitp_type.find("API rate limit exceeded for") != -1:
                print("\nAPI REQUEST LIMIT EXCEDED!!!")
                return True
            try:
                gitp_type = gitp_type.split("{\"")[1].split("\":")[0]
            except IndexError:
                gitp_type = "NONE"
            # python
            if gitp_type == "Python":
                gitp_type = "py"
            # js and css = html
            elif gitp_type == "CSS" or gitp_type == "JavaScript":
                gitp_type = "html"
            # html, java
            else:
                gitp_type = gitp_type.lower()
            git_raw.append([git_name, gitp_type])
            print(f"{git_name}({gitp_type})")
    print("\n")

    # comparing
    git_good = []
    for pre_project in git_pre:
        for raw_project in git_raw:
            if raw_project[1] == pre_project[0] and raw_project[0] == pre_project[2]:
                print(raw_project[0] + " is " + pre_project[1])
                git_good.append(pre_project)
                git_pre_left.remove(pre_project)
                git_raw.remove(raw_project)
                break
    f = open("links/github.txt", "w", encoding="utf-8")
    for x in range(len(git_good)):
        if x > 0:
            f.write("\n")
        f.write(f"{git_good[x][0]}||{git_good[x][1]}||{git_good[x][2]}")
    extra_gits = conflicts(git_raw, git_pre_left)
    for x in range(len(extra_gits)):
        if not(x == 0 and len(git_good) == 0):
            f.write("\n")
        f.write(f"{extra_gits[x][0]}||{extra_gits[x][1]}||{extra_gits[x][2]}")
    f.close()


# print(requests.get("https://api.github.com/users/Kalandor01/repos").text)

if UI_list(["Yes", "No"], "Refresh local projects?").display() == 0:
    local_get()
git_action = UI_list(["Yes", "No", "Edit project names", "Delete projects"], "Refresh github repositories?(this will make 1 get request per repository, and you can only make 60 of those per hour)").display()
# refresh
if git_action == 0:
    if git_get():
        authent = input('Do you want to try again with a personal access token (put into "token.txt")?(Y/N): ')
        if authent.upper() == "Y":
            try:
                tok = open("token.txt", "r")
            except FileNotFoundError:
                print('"token.txt" not dound!')
            else:
                git_token = tok.readline().replace("\n", "")
                tok.close()
                if len(git_token) < 5:
                    print("The git token is not this short!")
                else:
                    git_get(git_token)
# edit/delete
elif git_action == 2 or  git_action == 3:
    # reading old project data from file
    git_projects = []
    git_projects_display = []
    try:
        f = open("links/github.txt", "r", encoding="utf-8")
        lines = f.read().split("\n")
        for line in lines:
            git_projects_display.append(line)
            git_projects.append(line.split("||"))
        f.close()
        # file empty
        if len(git_projects_display) == 1 and git_projects_display[0] == "":
            raise FileExistsError
    except FileNotFoundError:
        print("\nNo github.txt found!")
    except FileExistsError:
        print("\nThe github.txt is empty!")
    else:
        # edit
        if git_action == 2:
            rename_num = UI_list(git_projects_display, "Chose a project to rename?").display()
            git_projects[rename_num][1] = input(f'\nRename "{git_projects[rename_num][1]}" to: ')
        # delete
        elif git_action == 3:
            git_projects.pop(UI_list(git_projects_display, "Chose a project to delete?", "x ", "  ").display())
        # replace
        f = open("links/github.txt", "w", encoding="utf-8")
        for x in range(len(git_projects)):
            f.write(f"{git_projects[x][0]}||{git_projects[x][1]}||{git_projects[x][2]}")
            if x < len(git_projects) - 1:
                f.write("\n")
        f.close()
input("\nDONE!")
