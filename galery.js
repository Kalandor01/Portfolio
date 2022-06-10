
setInterval(() => {
    $(".galery>div>.img_container").css("height", $(".galery>div>.img_container").css("width"));
}, 1000);

var git_user = "Kalandor01"
var portfolio_name = "Portfolio";

var file_error = false
var git_project_num = 0, html_project_num = 0, py_project_num = 0, java_project_num = 0, php_project_num = 0, other_project_num = 0;
var order_num = 1

$(document).ready(function(){
    //galery projects
    get_filenames("html");
    get_filenames("py");
    get_filenames("java");
    // get_filenames("php");
    // get_filenames("lol");

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
    var py_files = fs.readdirSync('/types/py/');
    for (file in py_files) {
        galery("py", file);
    }
    var java_files = fs.readdirSync('/types/java/');
    for (file in java_files) {
        galery("java", file);
    }
    */
});

function table()
{
    //write to table
    let sum_project_num = html_project_num + py_project_num + java_project_num + php_project_num + other_project_num;
    $("aside>table>tbody").empty();
    $("aside>table>tbody").append(`<tr><th colspan="2" class="translation_key_2">Number of projects</th></tr>`);
    if(git_project_num > 0)
        $("aside>table>tbody").append(`<tr><th>GitHub</th><td>${git_project_num}</td></tr>`);
    if(html_project_num > 0)
        $("aside>table>tbody").append(`<tr><th>HTML</th><td>${html_project_num}</td></tr>`);
    if(py_project_num > 0)
        $("aside>table>tbody").append(`<tr><th>Python</th><td>${py_project_num}</td></tr>`);
    if(java_project_num > 0)
        $("aside>table>tbody").append(`<tr><th>Java</th><td>${java_project_num}</td></tr>`);
    if(php_project_num > 0)
        $("aside>table>tbody").append(`<tr><th>PHP</th><td>${php_project_num}</td></tr>`);
    if(other_project_num > 0)
        $("aside>table>tbody").append(`<tr><th  class="translation_key_3">Other</th><td>${other_project_num}</td></tr>`);
    $("aside>table>tbody").append(`<tr><th  class="translation_key_4">Total</th><td>${sum_project_num}</td></tr>`);
}

function galery(type = "html", name = "null", link = 0, internet_link = false, git_repo = false)
{
    if(type == "html_p")
    {
        type == "html";
    }
    order_num += 1;
    //div
    if(type=="html" || type=="py" || type=="java" || type=="php")
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
    }
    else
        linkname = name.replace(/ /g, "_");
    name = name.replace(/_/g, " ");
    name = name.charAt(0).toUpperCase() + name.slice(1);
    console.log(name, linkname);

    //name
    if(type=="html" || type=="py" || type=="java" || type=="php")
        $(`.galery_${type}>.current`).append(`<h2>${name}</h2>`);
    else
    {
        if(other_project_num == 0)
        {
            order_num += 1;
            $(`<div class="no fadeIn" style="--order: ${order_num}"><h2 class="translation_key_1">Other</h2></div>`).insertBefore(`.galery_other`);
        }
        $(`.galery_other>.current`).append(`<h2>${name}</h2>`);
    }
    //galery label
    if(type=="html" && html_project_num == 0)
    {
        order_num += 1;
        $(`<div class="no fadeIn" style="--order: ${order_num}"><h2>HTML</h2></div>`).insertBefore(`.galery_html`);
    }
    else if(type=="py" && py_project_num == 0)
    {
        order_num += 1;
        $(`<div class="no fadeIn" style="--order: ${order_num}"><h2>Python</h2></div>`).insertBefore(`.galery_py`);
    }
    else if(type=="java" && java_project_num == 0)
    {
        order_num += 1;
        $(`<div class="no fadeIn" style="--order: ${order_num}"><h2>Java</h2></div>`).insertBefore(`.galery_java`);
    }
    else if(type=="php" && php_project_num == 0)
    {
        order_num += 1;
        $(`<div class="no fadeIn" style="--order: ${order_num}"><h2>PHP</h2></div>`).insertBefore(`.galery_php`);
    }

    //image
    if(type=="html" || type=="py" || type=="java" || type=="php")
        $(`.galery_${type}>.current`).append(`<div class="img_container"><img src="links/types/${type}/${linkname}.png" alt="${type}" class="good_img" onerror="javascript:this.src='img/${type}.png'; this.className=''"></div>`);
    else
        $(`.galery_other>.current`).append(`<div class="img_container"><img src="links/types/${type}/${linkname}.png" alt="${type}" class="good_img" onerror="javascript:this.src='img/link.png'; this.className=''"></div>`);
    
        /*//get description
    let desc = null;
    let desc_req = new XMLHttpRequest();
    if(type == "html")
        desc_req.open("get", `links/web/${name}.txt`, true);
    else
        desc_req.open("get", `links/types/${type}/${name}.txt`, true);
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
    if(type=="html" || type=="py" || type=="java" || type=="php")
    {
        if(type=="html")
        {
            if(internet_link == true)
            {
                if(git_repo)
                    $(`.galery_${type}>.current`).append(`<a target="_blank" href="${link}" class="link_type_github"><img src="img/git_dark.png" alt="GitHub"></a>`);
                else
                    $(`.galery_${type}>.current`).append(`<a target="_blank" href="${link}" class="link_type_link"><img src="img/link_dark.png" alt="Link"></a>`);
            }
            else
                $(`.galery_${type}>.current`).append(`<a target="_blank" href="links/types/${type}/${link}" class="link_type_link"><img src="img/link_dark.png" alt="Link"></a>`);
        }
        else
        {
            if(internet_link == true)
            {
                if(git_repo)
                    $(`.galery_${type}>.current`).append(`<a target="_blank" href="${link}" class="link_type_github"><img src="img/git_dark.png" alt="GitHub"></a>`);
                else
                    $(`.galery_${type}>.current`).append(`<a target="_blank" href="${link}" class="link_type_download"><img src="img/download_dark.png" alt="Download"></a>`);
            }
            else
                $(`.galery_${type}>.current`).append(`<a target="_blank" href="links/types/${type}/${link}" class="link_type_download"><img src="img/download_dark.png" alt="Download"></a>`);
        }

        if(type == "html")
            html_project_num++;
        else if(type == "py")
            py_project_num++;
        else if(type == "java")
            java_project_num++;
        else if(type == "php")
            php_project_num++;
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
                $(`.galery_other>.current`).append(`<a target="_blank" href="${link}" class="link_type_link-download"><img src="img/link-download_dark.png" alt="Download"></a>`);
        }
        else
            $(`.galery_other>.current`).append(`<a target="_blank" href="links/types/other/${link}" class="link_type_download"><img src="img/download_dark.png" alt="Download"></a>`);
        $(`.galery_other>.current`).removeClass(`current`);
    }
    $(`.galery_${type}>.current`).removeClass(`current`);
    
    table();
}

function get_filenames(dir_type)
{
    //directory name
    let dir_name = `links/types/${dir_type}/`;
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
            $("article").prepend(`<div class="no"><h4 class="translation_key_5">(GitHub version)</h4></div>`);
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
            bak_projects = {
                "html": ["Csapatmunka", "gaming_oldal", "Kutyákról", "oldalalakítás", "reszponzív", "Sakkör", "Webáruház"],
                "py": ["Béka.zip", "Black_Jack.zip", "fetch_projects.zip", "Kalandkönyv.zip", "Kémcső.zip"],
                "java": ["Amőba.zip", "Harc.zip", "Itt_a_piros.zip", "Nyugta.zip"],
                "php": [],
                "other": []
            }
            if(dir_type == "html" || dir_type == "py" || dir_type == "java" || dir_type == "php")
            {
                let projects = bak_projects[dir_type]
                for (x = 0; x < projects.length; x++)
                {
                    galery(dir_type, projects[x])
                }
                alert(`Couldn't load ${dir_type} projects dynamicly. Reload the page\nLoading backup...`);
                $(`<div class="no"><h4 class="translation_key_6">(backup)</h4></div>`).insertBefore(`.galery_${dir_type}`)
            }
            else
            {
                let projects = bak_projects["other"]
                for (x = 0; x < projects.length; x++)
                {
                    galery("other", projects[x])
                }
                alert("Couldn't load other projects dynamicly. Reload the page\nLoading backup...");
                $(`<div class="no"><h4 class="translation_key_6">(backup)</h4></div>`).insertBefore(`.galery_other`)
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
                galery("html", git_file_stuff[2], `https://${git_user}.github.io/${git_file_stuff[1]}/`, true)
            }
            else
            {
                galery(git_file_stuff[0], git_file_stuff[2], `https://github.com/${git_user}/${git_file_stuff[1]}`, true, true)
            }
        }
    })
    //gits error backup
    .fail(function() {
        alert("Couldn't load GitHub projects dynamicly. Reload the page to try again.\nDownloading backup with the help of the GitHub API...")
        //get names from api
        $.ajax({
        url: `https://api.github.com/users/${git_user}/repos`,
        beforeSend: function(xhr) {
            xhr.overrideMimeType("text/plain; charset=utf-8");
        }
        })
        .done(function(answers) {
            //get project names
            let ans_lis = answers.split("\",\n    \"full_name\": \"");
            for(x = 0; x < ans_lis.length - 1; x++)
            {
                let git_name = ans_lis[x + 1].split("\",\n    \"")[0].split("/")[1];
                if(git_name != git_user && git_name != portfolio_name)
                {
                    //get project language
                    let git_type = ((ans_lis[x+1].split("\"language\":")[1]).split(",")[0]).replace('"', "").replace('"', "").replace(" ", "");
                    console.log(git_name + ": " + git_type);
                    git_project_num += 1;
                    if(git_type == "HTML" || git_type == "CSS" || git_type == "JavaScript")
                    {
                        galery("html", git_name, `https://github.com/${git_user}/${git_name}`, true, true)
                    }
                    else if(git_type == "Python")
                    {
                        galery("py", git_name, `https://github.com/${git_user}/${git_name}`, true, true)
                    }
                    else
                    {
                        galery(git_type.toLowerCase(), git_name, `https://github.com/${git_user}/${git_name}`, true, true)
                    }
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
