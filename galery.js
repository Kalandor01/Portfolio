
setInterval(() => {
    $(".galery>div>.img_container").css("height", $(".galery>div>.img_container").css("width"));
}, 1000);

var file_error = false
var git_project_num = 0, html_project_num = 0, py_project_num = 0, java_project_num = 0, other_project_num = 0;
var order_num = 1

$(document).ready(function(){
    //galery projects
    //html
    $(`<div class="no fadeIn" style="--order: ${order_num}"><h2>HTML</h2></div>`).insertBefore(`.galery_html`)
    get_filenames("html");

    //python
    order_num += 1
    $(`<div class="no fadeIn" style="--order: ${order_num}"><h2>Python</h2></div>`).insertBefore(`.galery_py`)
    get_filenames("py");
    
    //java
    order_num += 1
    $(`<div class="no fadeIn" style="--order: ${order_num}"><h2>Java</h2></div>`).insertBefore(`.galery_java`)
    get_filenames("java");

    //github
    get_gits();

    //extra
    git_project_num += 1;
    galery("html", "Fenntarthatósági témahét 2022", "https://fenntarthatosagi.github.io/fenntarthatosagi_temahet_2022/", true, false);
    galery("html", "Farsang forms", "http://tanulo10.szf1b.oktatas.szamalk-szalezi.hu/farsangi_buli/", true, false);
    
    //table
    table();



    /*      table unpacked
                <tr>
                    <th>Projekt számok</th>
                </tr>
                <tr>
                    <th>Github</th>
                    <td>x</td>
                </tr>
                <tr>
                    <th>HTML</th>
                    <td>y</td>
                </tr>
                <tr>
                    <th>Python</th>
                    <td>z</td>
                </tr>
                <tr>
                    <th>Java</th>
                    <td>f</td>
                </tr>
    */
    
    /*  nodejs try
    var galery_type = []
    var galery_name = []
    var galery_link = []
    alert(6);
    var fs = require('fs');
    var html_files = fs.readdir('/web/');
    alert(5);
    for (file in html_files) {
        galery("html", file);
        alert(file);
    }
    var py_files = fs.readdirSync('/file/py/');
    for (file in py_files) {
        galery("py", file);
    }
    var java_files = fs.readdirSync('/file/java/');
    for (file in java_files) {
        galery("java", file);
    }
    */
});

function table()
{
    //write to table
    let sum_project_num = html_project_num + py_project_num + java_project_num + other_project_num;
    $("aside>table>tbody").empty();
    $("aside>table>tbody").append(`<tr><th colspan="2" id="2">Number of projects</th></tr>`);
    if(git_project_num > 0)
        $("aside>table>tbody").append(`<tr><th>GitHub</th><td>${git_project_num}</td></tr>`);
    if(html_project_num > 0)
        $("aside>table>tbody").append(`<tr><th>HTML</th><td>${html_project_num}</td></tr>`);
    if(py_project_num > 0)
        $("aside>table>tbody").append(`<tr><th>Python</th><td>${py_project_num}</td></tr>`);
    if(java_project_num > 0)
        $("aside>table>tbody").append(`<tr><th>Java</th><td>${java_project_num}</td></tr>`);
    if(other_project_num > 0)
        $("aside>table>tbody").append(`<tr><th  id="3">Other</th><td>${other_project_num}</td></tr>`);
    $("aside>table>tbody").append(`<tr><th  id="4">Total</th><td>${sum_project_num}</td></tr>`);
}

function galery(type = "html", name = "null", link = 0, internet_link = false, git_repo = false)
{
    if(type == "html_p")
    {
        type == "html";
    }
    order_num += 1;
    //div
    if(type=="html" || type=="py" || type=="java")
        $(`.galery_${type}`).append(`<div class="${type} fadeIn current" style="--order: ${order_num}"></div>`);
    else
        $(`.galery_other`).append(`<div class="other fadeIn current" style="--order: ${order_num}"></div>`);
    //get link/name
    let linkname = "";
    if(link == 0)
    {
        link = name;
        //name processing
        if(type != "html" && name.includes(".zip"))
            name = name.split(".zip")[0]
        else if(type == "py" && name.includes(".py"))
            name = name.split(".py")[0]
        linkname = name;
        name = name.replace(/_/g, " ");
        name = name.charAt(0).toUpperCase() + name.slice(1);
    }
    else
    {
        linkname = name.replace(/ /g, "_");
        name = name.replace(/_/g, " ");
        name = name.charAt(0).toUpperCase() + name.slice(1);
    }
    console.log(name, linkname);
    //name
    if(type=="html" || type=="py" || type=="java")
        $(`.galery_${type}>.current`).append(`<h2>${name}</h2>`);
    else
    {
        if(other_project_num == 1)
        {
            order_num += 1
            $(`<div class="no fadeIn" style="--order: ${order_num}"><h2 id="1">Other</h2></div>`).insertBefore(`.galery_other`)
        }
        $(`.galery_other>.current`).append(`<h2>${name}</h2>`);
    }
    //image
    if(type=="html")
        $(`.galery_${type}>.current`).append(`<div class="img_container"><img src="links/web/${linkname}.png" alt="${type}" class="good_img" onerror="javascript:this.src='img/${type}.png'; this.className=''"></div>`);
    else if(type=="py" || type=="java")
        $(`.galery_${type}>.current`).append(`<div class="img_container"><img src="links/file/${type}/${linkname}.png" alt="${type}" class="good_img" onerror="javascript:this.src='img/${type}.png'; this.className=''"></div>`);
    else
        $(`.galery_other>.current`).append(`<div class="img_container"><img src="links/file/${type}/${linkname}.png" alt="${type}" class="good_img" onerror="javascript:this.src='img/link.png'; this.className=''"></div>`);
    /*//get description
    let desc = null;
    let desc_req = new XMLHttpRequest();
    if(type == "html")
        desc_req.open("get", `links/web/${name}.txt`, true);
    else
        desc_req.open("get", `links/file/${type}/${name}.txt`, true);
    desc_req.overrideMimeType('text/xml; charset=iso-8859-2');
    desc_req.onload = function()
    {
        if (desc_req.readyState == 4 && desc_req.status == 200)
        {
            desc = desc_req.responseText;
            $(`.galery_${type}>.current`).append(`<p>${desc}</p>`);
            alert(desc)
        }
        //backup
        else if(desc_req.readyState == 4 && desc_req.status != 200)
            alert("no desc: " + name)
    }
    desc_req.send();*/
    //link
    //html
    if(type == "html")
    {
        html_project_num++;
        if(internet_link == true)
        {
            if(git_repo)
                $(`.galery_html>.current`).append(`<a target="_blank" href="${link}" class="link_type_github"><img src="img/git_dark.png" alt="GitHub"></a>`);
            else
                $(`.galery_html>.current`).append(`<a target="_blank" href="${link}" class="link_type_link"><img src="img/link_dark.png" alt="Link"></a>`);
        }
        else
            $(`.galery_html>.current`).append(`<a target="_blank" href="links/web/${link}" class="link_type_link"><img src="img/link_dark.png" alt="Link"></a>`);
    }
    //python
    else if(type == "py")
    {
        py_project_num++;
        if(internet_link == true)
        {
            if(git_repo)
                $(`.galery_py>.current`).append(`<a target="_blank" href="${link}" class="link_type_github"><img src="img/git_dark.png" alt="GitHub"></a>`);
            else
                $(`.galery_py>.current`).append(`<a target="_blank" href="${link}" class="link_type_download"><img src="img/download_dark.png" alt="Download"></a>`);
        }
        else
            $(`.galery_py>.current`).append(`<a target="_blank" href="links/file/py/${link}" class="link_type_download"><img src="img/download_dark.png" alt="Download"></a>`);
    }
    //java
    else if(type == "java")
    {
        java_project_num++;
        if(internet_link == true)
        {
            if(git_repo)
                $(`.galery_java>.current`).append(`<a target="_blank" href="${link}" class="link_type_github"><img src="img/git_dark.png" alt="GitHub"></a>`);
            else
                $(`.galery_java>.current`).append(`<a target="_blank" href="${link}" class="link_type_download"><img src="img/download_dark.png" alt="Download"></a>`);
        }
        else
            $(`.galery_java>.current`).append(`<a target="_blank" href="links/file/java/${link}" class="link_type_download"><img src="img/download_dark.png" alt="Download"></a>`);
    }
    //other
    else
    {
        other_project_num++;
        if(internet_link == true)
        {
            if(git_repo)
                $(`.galery_other>.current`).append(`<a target="_blank" href="${link}" class="link_type_github"><img src="img/git_dark.png" alt="GitHub"></a>`);
            else
                $(`.galery_other>.current`).append(`<a target="_blank" href="${link}" class="link_type_download"><img src="img/download_dark.png" alt="Download"></a>`);
        }
        else
            $(`.galery_other>.current`).append(`<a target="_blank" href="links/file/other/${link}" class="link_type_download"><img src="img/download_dark.png" alt="Download"></a>`);
    }
    $(`.galery_${type}>.current`).removeClass(`current`)
    table();
}

function get_filenames(dir_type)
{
    //directory name
    let dir_name;
    if(dir_type == "html")
        dir_name = "links/web/";
    else
        dir_name = `links/file/${dir_type}/`;
    //get... file array?
    $.ajax({
    url: dir_name,
    beforeSend: function(xhr) {
        xhr.overrideMimeType("text/plain; charset=utf-8");
    }
    })
    .done(function(files) {
        //get file names + run galery()
        let files_lis = files.split(">..<")[1];
        let files_as = files_lis.split(`<span class="name">`)
        for (x = 0; x < files_as.length - 1; x++)
        {
            file = files_as[x+1].split(`</span><span class="size">`)[0]
            if(file.includes(".txt") == false && file.includes(".png") == false)
            {
                galery(dir_type, file);
            }
        }
    })
    .fail(function() {
        if(file_error == false)
        {
            $("article").prepend(`<div class="no"><h4 id="5">(GitHub version)</h4></div>`);
            file_error = true;
        }
        //backup directory name
        let dir_name_bak = `links/${dir_type}.txt`;
        //get array from file

        $.ajax({
        url: dir_name_bak,
        beforeSend: function(xhr) {
            xhr.overrideMimeType("text/plain; charset=iso-8859-2");
        }
        })
        .done(function(files_bak) {
            //seperate file names + run galery()
            let file_bak = files_bak.split("\n");
            for (x = 0; x < file_bak.length - 1; x++)
                galery(dir_type, file_bak[x]);
        })
        .fail(function() {
            //manual method final backup
            if(dir_type == "html")
            {
                let html_names = ["Csapatmunka", "gaming_oldal", "Kutyákról", "oldalalakítás", "reszponzív", "Sakkör", "Webáruház"]
                for (x = 0; x < html_names.length; x++)
                {
                    galery("html", html_names[x])
                }
                alert("Couldn't load HTML projects dynamicly. Reload the page\nLoading backup...");
                $(`<div class="no"><h4 id="6">(backup)</h4></div>`).insertBefore(`.galery_html`)
            }
            else if(dir_type == "py")
            {
                let py_names = ["Béka.zip", "Black_Jack.zip", "fetch_projects.zip", "Kalandkönyv.zip", "Kémcső.zip"]
                for (x = 0; x < py_names.length; x++)
                {
                    galery("py", py_names[x])
                }
                alert("Couldn't load Pythin projects dynamicly. Reload the page\nLoading backup...");
                $(`<div class="no"><h4 id="7">(backup)</h4></div>`).insertBefore(`.galery_py`)
            }
            else if(dir_type == "java")
            {
                let java_names = ["Amőba.zip", "Harc.zip", "Itt_a_piros.zip", "Nyugta.zip"]
                for (x = 0; x < java_names.length; x++)
                {
                    galery("java", java_names[x])
                }
                alert("Couldn't load Java projects dynamicly. Reload the page\nLoading backup...");
                $(`<div class="no"><h4 id="8">(backup)</h4></div>`).insertBefore(`.galery_java`)
            }
        });
    });
    //generate table
    table();
}


function get_gits()
{
    //get array from file
    $.ajax({
    url: `links/github.txt`,
    beforeSend: function(xhr) {
        xhr.overrideMimeType("text/plain; charset=utf-8");
    }
    })
    .done(function(git_files) {
        //seperate projects + run galery()
        git_files = git_files.split("\n")
        for (x = 0; x < git_files.length; x++)
        {
            git_project_num += 1;
            git_file_stuff = git_files[x].split("||")
            if(git_file_stuff[0] == "html")
            {
                galery("html", git_file_stuff[2], `https://kalandor01.github.io/${git_file_stuff[1]}/`, true)
            }
            else
            {
                galery(git_file_stuff[0], git_file_stuff[2], `https://github.com/Kalandor01/${git_file_stuff[1]}`, true, true)
            }
        }
    })
    //gits error backup
    .fail(function() {
        alert("Couldn't load GitHub projects dynamicly. Reload the page to try again.\nDownloading backup with the help of the GitHub API...")
        //get names from api
        $.ajax({
        url: "https://api.github.com/users/Kalandor01/repos",
        beforeSend: function(xhr) {
            xhr.overrideMimeType("text/plain; charset=utf-8");
        }
        })
        .done(function(answers) {
            //get project names
            let ans_lis = answers.split(`"name": "`);
            //alert(ans_lis);
            for (x = 0; x < ans_lis.length - 1; x++)
            {
                let git_name = ans_lis[x+1].split(`",`)[0]
                if(git_name != "Kalandor01" && git_name != "Portfolio")
                {
                    //get type from api
                    $.ajax({
                    url: `https://api.github.com/repos/Kalandor01/${git_name}/languages`,
                    beforeSend: function(xhr) {
                        xhr.overrideMimeType("text/plain; charset=utf-8");
                    }
                    })
                    .done(function(type_ans) {
                        //get project type
                        let ans = type_ans.split(`"`)[1];
                        git_project_num += 1;
                        if(ans == "HTML" || ans == "CSS" || ans == "JavaScript")
                        {
                            galery("html", git_name, `https://kalandor01.github.io/${git_name}/`, true)
                        }
                        else if(ans == "Python")
                        {
                            galery("py", git_name, `https://github.com/Kalandor01/${git_name}`, true, true)
                        }
                        else if(ans == "Java")
                        {
                            galery("java", git_name, `https://github.com/Kalandor01/${git_name}`, true, true)
                        }
                        else
                        {
                            galery(ans, git_name, `https://github.com/Kalandor01/${git_name}`, true, true)
                        }
                    })
                    .fail(function() {
                        alert("Couldn't load the project's type from the GitHub API!");
                    });
                }
            }
        })
        //github backup error
        .fail(function() {
            alert("Couldn't access the GitHub API!")
        });
    });
    //update table
    table();
}
