import os
import requests
from save_file_manager import UI_list

# local projects
def local_get():
    types = ["html", "py", "java"]
    for p_type in types:
        f = open(f"links/{p_type}.txt", "w")
        for name in os.listdir(f"links\\types\{p_type}"):
            if ".png" not in name and ".txt" not in name:
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
        print("\nResolve added project conflicts:\nnothing = add to list with current name, . = don't add to list, text = add to list with this name\n")
        for ad in added_lis:
            ans = input(f"{ad[0]}({ad[1]}): ")
            if ans == "":
                extra.append([ad[1], ad[0], ad[0]])
            if ans != "." and ans != "":
                extra.append([ad[1], ad[0], ans])
    if len(removed_lis) > 0:
        print("\nResolve removed project conflicts:\nnothing = don't add to list, . = add to list with original name anyways, text = add to list with different name anyways\n")
        for re in removed_lis:
            ans = input(f"{re[2]}({re[0]}) git name:\"{re[1]}\": ")
            if ans == ".":
                extra.append(re)
            if ans != "." and ans != "":
                extra.append([re[0], re[1], ans])
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
    print("\nFetching and comparing github projects:\n")
    if git_tok != "":
        gitprojects = requests.get(f"https://api.github.com/users/{u_name}/repos?per_page=100&page=1", headers={"Authorization": git_tok}).text
    else:
        gitprojects = requests.get(f"https://api.github.com/users/{u_name}/repos?per_page=100&page=1").text
    if gitprojects.find("API rate limit exceeded for") != -1:
        print("\nAPI REQUEST LIMIT EXCEDED!!!")
        return True
    names_split = gitprojects.split("\",\"full_name\":\"")
    for x in range(len(names_split) - 1):
        print(names_split[x + 1].split("\",\"")[0])
        git_name = names_split[x + 1].split("\",\"")[0].split("/")[1]
        if git_name != u_name and git_name != "Portfolio":
            # get language
            # this method very rarely doesn't work
            # Example:
            #   2022_02_17-FarsangGaleria language is none: https://api.github.com/users/Blaj3n/repos
            #   this works: https://api.github.com/repos/Blaj3n/2022_02_17-FarsangGaleria/languages
            gitp_type = ((names_split[x+1].split('"language":')[1]).split(",")[0]).replace('"', "")
            # none
            if gitp_type == "null":
                gitp_type = "none"
            # python
            elif gitp_type == "Python":
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
            if raw_project[1] == pre_project[0] and raw_project[0] == pre_project[1]:
                print(raw_project[0] + " is " + pre_project[2])
                git_good.append(pre_project)
                git_pre_left.remove(pre_project)
                git_raw.remove(raw_project)
                break
    if git_pre_left == [[""]]:
        git_pre_left = []
    f = open("links/github.txt", "w", encoding="utf-8")
    for x in range(len(git_good)):
        if x > 0:
            f.write("\n")
        f.write(f"{git_good[x][0]}||{git_good[x][1]}||{git_good[x][2]}")
    f.close()
    extra_gits = conflicts(git_raw, git_pre_left)
    f = open("links/github.txt", "a", encoding="utf-8")
    for x in range(len(extra_gits)):
        if not(x == 0 and len(git_good) == 0):
            f.write("\n")
        f.write(f"{extra_gits[x][0]}||{extra_gits[x][1]}||{extra_gits[x][2]}")
    f.close()


# print(requests.get("https://api.github.com/users/Kalandor01/repos").text)

u_name = "Kalandor01"

if UI_list(["Yes", "No"], "Refresh local projects?").display() == 0:
    local_get()
git_action = UI_list(["Yes", "No", "Edit project names", "Delete projects"], "Refresh github repositories?").display()
# refresh git
if git_action == 0:
    if git_get():
        authent = input('Do you want to try again with a personal access token (put into "token.txt")?(Y/N): ')
        if authent.upper() == "Y":
            try:
                tok = open("token.txt", "r")
            except FileNotFoundError:
                print('"token.txt" not found!')
            else:
                git_token = tok.readline().replace("\n", "")
                tok.close()
                if len(git_token) < 5:
                    print("The git token is not this short!")
                if len(git_token) > 100:
                    print("The git token is not this long!")
                else:
                    git_get(git_token)
# edit/delete
elif git_action == 2 or  git_action == 3:
    while True:
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
            break
        except FileExistsError:
            print("\nThe github.txt is empty!")
            break
        else:
            # edit
            if git_action == 2:
                rename_num = UI_list(git_projects_display, "Chose a project to rename?").display()
                git_projects[rename_num][2] = input(f'\nRename "{git_projects[rename_num][2]}" to: ')
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
            input("\nYou can close this program NOW!")
input("\nDONE!")
