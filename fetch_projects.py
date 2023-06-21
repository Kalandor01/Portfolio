import os
import requests
from save_file_manager import UI_list, Cursor_icon

# local projects
def update_local_projects():
    types = ["html", "py", "java"]
    for p_type in types:
        f = open(f"links/{p_type}.txt", "w")
        for name in os.listdir(f"links\\types\\{p_type}"):
            if ".webp" not in name and ".txt" not in name:
                try:
                    f.write(name + "\n")
                except UnicodeEncodeError:
                    print("\r[UnicodeEncodeError]")
        f.close()
    input("\nLocal HTML, Python and Java project list updated.\n")


def update_git_projects_file(projects: list[tuple[str, str, str]] , append=False):
    f = open(github_projects_file_path, "a" if append else "w", encoding="utf-8")
    for project in projects:
        f.write(f"{project[0]}{file_entry_separator}{project[1]}{file_entry_separator}{project[2]}\n")
    f.close()


def conflicts(added_projects: list[tuple[str, str]], removed_projects: list[tuple[str, str, str]]):
    # print
    # no change
    if len(added_projects) == 0 and len(removed_projects) == 0:
        print("\nNo changes.")
    # added
    if len(added_projects) > 0:
        print(f"\nAdded {len(added_projects)}:")
        for x in range(len(added_projects)):
            print(f"{added_projects[x][1]}({added_projects[x][0]})", end="")
            if x < len(added_projects) - 1:
                print(end=", ")
        print()
    # removed
    if len(removed_projects) > 0:
        print(f"\nRemoved {len(removed_projects)}:")
        for x in range(len(removed_projects)):
            print(f"{removed_projects[x][1]}({removed_projects[x][0]})", end="")
            if x < len(removed_projects) - 1:
                print(end=", ")
        print()
    
    extra_projects: list[tuple[str, str, str]] = []
    # conflict resolving
    # added
    if len(added_projects) > 0:
        print("\nResolve added project conflicts:\nnothing = add to list with current name, . = don't add to list, text = add to list with this name\n")
        for added_project in added_projects:
            ans = input(f"{added_project[1]}({added_project[0]}): ")
            if ans == "":
                extra_projects.append((added_project[0], added_project[1], added_project[1]))
            if ans != "." and ans != "":
                extra_projects.append((added_project[0], added_project[1], ans))
    # removed
    if len(removed_projects) > 0:
        print("\nResolve removed project conflicts:\nnothing = don't add to list, . = add to list with original name anyways, text = add to list with different name anyways\n")
        for removed_project in removed_projects:
            ans = input(f"{removed_project[2]}({removed_project[0]}) git name:\"{removed_project[1]}\": ")
            if ans == ".":
                extra_projects.append(removed_project)
            if ans != "." and ans != "":
                extra_projects.append((removed_project[0], removed_project[1], ans))
    return extra_projects


# github projects
def update_git_projects(git_token=""):
    # reading old project data from file
    projects_in_file: list[tuple[str, str, str]] = []  # [type, git_name, display_name]
    removed_projects: list[tuple[str, str, str]] = []      # [type, git_name, display_name]
    projects_from_api: list[tuple[str, str]] = []      # [type, git_name]
    try:
        f = open(github_projects_file_path, "r", encoding="utf-8")
        lines = f.read().split("\n")
        for line in lines:
            line_split = line.split(file_entry_separator)
            if (len(line_split) >= 3):
                projects_in_file.append((line_split[0], line_split[1], line_split[2]))
                removed_projects.append((line_split[0], line_split[1], line_split[2]))
        f.close()
    except FileNotFoundError:
        print(f"No {github_projects_file_name} found!")

    # fetching project names from github api
    print("\nFetching and comparing github projects:\n")
    if git_token != "":
        api_projects_response = requests.get(f"https://api.github.com/users/{user_name}/repos?per_page=100&page=1", headers={"Authorization": git_token}).text
    else:
        api_projects_response = requests.get(f"https://api.github.com/users/{user_name}/repos?per_page=100&page=1").text
    if api_projects_response.find("API rate limit exceeded for") != -1:
        print("\nAPI REQUEST LIMIT EXCEDED!!!")
        return False
    # API response split magic!!!
    names_split = api_projects_response.split("\",\"full_name\":\"")
    for x in range(len(names_split) - 1):
        print(names_split[x + 1].split("\",\"")[0])
        project_name = names_split[x + 1].split("\",\"")[0].split("/")[1]
        if project_name != user_name and project_name != portfolio_project_name:
            # get language
            # this function very rarely doesn't work
            # Example:
            #   2022_02_17-FarsangGaleria language is none: https://api.github.com/users/Blaj3n/repos
            #   this works: https://api.github.com/repos/Blaj3n/2022_02_17-FarsangGaleria/languages
            project_type = ((names_split[x+1].split('"language":')[1]).split(",")[0]).replace('"', "")
            # none
            if project_type == "null":
                project_type = "none"
            # python
            elif project_type == "Python":
                project_type = "py"
            # js and css = html
            elif project_type == "CSS" or project_type == "JavaScript":
                project_type = "html"
            # html, java
            else:
                project_type = project_type.lower()
            projects_from_api.append((project_type, project_name))
            print(f"{project_name}({project_type})")
    print("\n")

    # comparing
    # removing existing projects from extras list, and removing 
    no_change_projects: list[tuple[str, str, str]] = []
    added_projects: list[tuple[str, str]] = []
    
    for api_project in projects_from_api:
        found_project = False
        for project_from_file in projects_in_file:
            if api_project[0] == project_from_file[0] and api_project[1] == project_from_file[1]:
                print(api_project[1] + " is " + project_from_file[2])
                no_change_projects.append(project_from_file)
                removed_projects.remove(project_from_file)
                found_project = True
                break
        
        if not found_project:
            added_projects.append(api_project)
    
    # write no change projects to file
    update_git_projects_file(no_change_projects)
    
    # handle conflicts
    extra_projects = conflicts(added_projects, removed_projects)
    
    # write accepted added and rejected removed projects to file
    if len(extra_projects) > 0:
        update_git_projects_file(extra_projects, True)
    
    return True



def main():
    if UI_list(["Yes", "No"], "Refresh local projects?").display() == 0:
        update_local_projects()
    git_menu_action = (int)(UI_list(["Yes", "No", "Edit project names", "Delete projects"], "Refresh github repositories?").display())
    # refresh git
    if git_menu_action == 0:
        if not update_git_projects():
            authentication = input(f'Do you want to try again with a personal access token (put into "{github_token_file_path}")?(Y/N): ')
            if authentication.upper() == "Y":
                try:
                    token = open(github_token_file_path, "r")
                except FileNotFoundError:
                    print(f'"{github_token_file_name}" not found!')
                else:
                    git_token = token.readline().replace("\n", "")
                    token.close()
                    if len(git_token) < 5:
                        print("The git token is not this short!")
                    if len(git_token) > 100:
                        print("The git token is not this long!")
                    else:
                        update_git_projects(git_token)
    # edit/delete
    elif git_menu_action == 2 or  git_menu_action == 3:
        while True:
            # reading old project data from file
            git_projects: list[tuple[str, str, str]] = []
            git_projects_display = []
            try:
                f = open(github_projects_file_path, "r", encoding="utf-8")
                lines = f.read().split("\n")
                for line in lines:
                    git_projects_display.append(line)
                    line_sep = line.split(file_entry_separator)
                    git_projects.append((line_sep[0], line_sep[1], line_sep[2]))
                f.close()
                # file empty
                if len(git_projects_display) == 1 and git_projects_display[0] == "":
                    raise FileExistsError
            except FileNotFoundError:
                print(f"\nNo {github_projects_file_name} found!")
                break
            except FileExistsError:
                print(f"\nThe {github_projects_file_name} is empty!")
                break
            else:
                # edit
                if git_menu_action == 2:
                    rename_num = UI_list(git_projects_display, "Choose a project to rename?").display()
                    new_name = input(f'\nRename "{git_projects[rename_num][2]}" to: ')
                    git_projects[rename_num] = (git_projects[rename_num][0], git_projects[rename_num][1], new_name)
                # delete
                elif git_menu_action == 3:
                    git_projects.pop(UI_list(git_projects_display, "Choose a project to delete?", Cursor_icon("x ", "", "  ")).display())
                # replace
                update_git_projects_file(git_projects)
                input("\nYou can close the program NOW!")
    input("\nDONE!")


# print(requests.get("https://api.github.com/users/Kalandor01/repos").text)

user_name = "Kalandor01"
portfolio_project_name = "Portfolio"
file_entry_separator = "||"

github_projects_file_name = "github.txt"
github_projects_file_path = "links/" + github_projects_file_name

github_token_file_name = "token.txt"
github_token_file_path = github_token_file_name

main()
