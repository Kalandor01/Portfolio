//github configs
var git_user = "Kalandor01";
var portfolio_name = "Portfolio";
//veneral vars
var file_error = false;
var git_project_num = 0;
var order_num = 1;
//cache vars
var raw_cache = "";
var local_projects_loaded = false;
var git_projects_loaded = false;
var extra_projects_loaded = false;
var cache_exists = false;
var cache_proj_sep = " #&# ";
var cache_line_sep = "|&|";
//project types vars
var project_types = {
    "html": {
        type: "html",
        name: "HTML",
        count: {value: 0 },
        seperate_type: true
    },
    "py": {
        type: "py",
        name: "Python",
        count: {value: 0 },
        seperate_type: true
    },
    "java": {
        type: "java",
        name: "Java",
        count: {value: 0 },
        seperate_type: true
    },
    "php": {
        type: "php",
        name: "PHP",
        count: {value: 0 },
        seperate_type: true
    },
    "c#": {
        type: "C_Sharp",
        name: "C#",
        count: {value: 0 },
        seperate_type: true
    }
};
//html but not github pages
project_types["html_p"] = {
    type: "html",
    name: project_types.html.name,
    count: project_types.html.count,
    seperate_type: false
}


setInterval(() => {
    $(".galery>div>.img_container").css("height", $(".galery>div>.img_container").css("width"));
}, 1000);

$(document).ready(function(){
    if(!enable_cache || !is_cache)
    {
        //galery projects
        get_filenames("html");
        get_filenames("py");
        get_filenames("java");
        // get_filenames("php");
        // get_filenames("lol");

        //github
        get_gits();

        //extra
        galery(project_types.html.type, "Fenntarthatósági témahét 2022", "https://fenntarthatosagi.github.io/fenntarthatosagi_temahet_2022/", false, true, false);
        galery(project_types.html.type, "Farsang forms", "http://tanulo10.szf1b.oktatas.szamalk-szalezi.hu/farsangi_buli/",false, false);

        extra_projects_loaded = true;
        make_final_cache();
    }
    else
    {
        parse_cache();
        $("article").prepend(`<div class="no"><h4 class="translation_key_7">(Locally cached)</h4></div>`);
        $("footer").append(`<p class="translation_key_8">The contents of this page were localy cached for 8 hours.</p>`);
        $("footer").append(`<div class="gitlink"><a class="translation_key_9" onclick="caching_off()">Turn off caching PERMANENTLY! (or until you delete the cookies)</a></div>`);
    }
    
    //table
    table();
});

function caching_off()
{
    document.cookie = `enabled_cache=0; expires=${years_from_now(cookies_expire)}; SameSite=Strict`;
    location.reload();
}

function make_final_cache()
{
    if(enable_cache && !cache_exists && local_projects_loaded && git_projects_loaded && extra_projects_loaded)
    {
        cache_exists = true;
        setTimeout(function(){
            raw_cache = raw_cache.replace(/ #&# $/gm, "");
            console.log(raw_cache);
            window.localStorage.setItem("cache", raw_cache);
            document.cookie = `is_cache=1; expires=${hours_from_now(cache_expire)}; SameSite=Strict`;
        },3000);
    }
}

function table()
{
    //write to table
    let total_project_num = 0;
    $("aside>table>tbody").empty();
    $("aside>table>tbody").append(`<tr><th colspan="2" class="translation_key_2">Number of projects</th></tr>`);
    if(git_project_num > 0)
    {
        $("aside>table>tbody").append(`<tr><th>GitHub</th><td>${git_project_num}</td></tr>`);
    }
    for (const [_, type] of Object.entries(project_types)) {
        if (type.seperate_type && type.count.value > 0)
        {
            total_project_num += type.count.value;
            $("aside>table>tbody").append(`<tr><th>${type.name}</th><td>${type.count.value}</td></tr>`);
        }
    };
    $("aside>table>tbody").append(`<tr><th  class="translation_key_4">Total</th><td>${total_project_num}</td></tr>`);
}

function galery(type = "html", name = null, link = null, local_file = false, git_project = false, git_icon_override_bool = null)
{
    //make cache
    if(enable_cache && !is_cache) {
        raw_cache += `${type}${cache_line_sep}${name}${cache_line_sep}${link}${cache_line_sep}${(local_file?"1":"0")}${cache_line_sep}${git_project?"1":"0"}${cache_line_sep}${git_icon_override_bool == null? "-1" : (git_icon_override_bool?"1":"0")}${cache_proj_sep}`;
    }
    
    //get project type properties
    if (!project_types[type])
    {
        project_types[type] = {
            type: type.replace("#", "HASTAG"),
            name: type,
            count: {value: 0 },
            seperate_type: true
        };
    }
    let type_dict = project_types[type];

    //make div
    if(type_dict.count.value == 0)
    {
        $("article").append(`<div id="galery_${type_dict.type}" class="galery"></div>`);
        $(`<div class="no fadeIn" style="--order: ${order_num++}"><h2>${type_dict.name}</h2></div>`).insertBefore(`#galery_${type_dict.type}`);
    }
    type_dict.count.value++;


    //div
    $(`#galery_${type_dict.type}`).append(`<div class="${type_dict.type} fadeIn current" style="--order: ${order_num++}"></div>`);

    //get link/name
    let linkname;
    if(link == null)
    {
        link = name;
        //name processing
        if(local_file && name.indexOf(".") != -1)
        {
            name = name.split(".").slice(0, -1).join(".");
        }
        linkname = name;
    }
    else
    {
        linkname = name.replace(/ /g, "_");
    }
    name = name.replace(/_/g, " ");
    name = name.charAt(0).toUpperCase() + name.slice(1);
    console.log(name, linkname, type);

    //name
    $(`#galery_${type_dict.type}>.current`).append(`<h2>${name}</h2>`);

    //image
    $(`#galery_${type_dict.type}>.current`).append(`<div class="img_container"><img src="links/types/${type_dict.type}/${linkname}.webp" alt="${name}" class="good_img" onerror="javascript:this.src='img/${type_dict.type}.webp'; this.className=''; this.onerror = function(){ this.src='img/link.webp'; }"></div>`);
    
    /*
    //get description
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
            $(`#galery_${type}>.current`).append(`<p>${desc}</p>`);
            alert(desc)
        }
        //backup
        else if(desc_req.readyState == 4 && desc_req.status != 200)
            alert("no desc: " + name)
    }
    desc_req.send();
    */

    //git project
    if(git_project)
    {
        git_project_num++;
    }

    //link
    //html
    if(type_dict.type == project_types.html.type)
    {
        if(!local_file)
        {
            if(git_icon_override_bool == true || (git_project && git_icon_override_bool == null))
            {
                $(`#galery_${type_dict.type}>.current`).append(`<a target="_blank" href="${link}" class="link_type_github"><img src="img/git.webp" alt="GitHub"></a>`);
            }
            else
            {
                $(`#galery_${type_dict.type}>.current`).append(`<a target="_blank" href="${link}" class="link_type_link"><img src="img/link.webp" alt="Link"></a>`);
            }
        }
        else
        {
            $(`#galery_${type_dict.type}>.current`).append(`<a target="_blank" href="links/types/${type_dict.type}/${link}" class="link_type_link"><img src="img/link.webp" alt="Link"></a>`);
        }
    }
    //other
    else
    {
        if(!local_file)
        {
            if(git_icon_override_bool == true || (git_project && git_icon_override_bool == null))
            {
                $(`#galery_${type_dict.type}>.current`).append(`<a target="_blank" href="${link}" class="link_type_github"><img src="img/git.webp" alt="GitHub"></a>`);
            }
            else
            {
                $(`#galery_${type_dict.type}>.current`).append(`<a target="_blank" href="${link}" class="link_type_download"><img src="img/download.webp" alt="Download"></a>`);
            }
        }
        else
        {
            $(`#galery_${type_dict.type}>.current`).append(`<a target="_blank" href="links/types/${type_dict.type}/${link}" class="link_type_download"><img src="img/download.webp" alt="Download"></a>`);
        }
    }
    $(`#galery_${type_dict.type}>.current`).removeClass(`current`);
    
    table();
}

function parse_cache()
{
    let local_cache = window.localStorage.getItem("cache");
    console.log(local_cache);
    let cache_list = local_cache.split(cache_proj_sep);
    cache_list.forEach(cache_line => {
        let proj_args = cache_line.split(cache_line_sep);
        galery(proj_args[0], proj_args[1] == "null"?null:proj_args[1], proj_args[2] == "null"?null:proj_args[2], (proj_args[3] == "1"), (proj_args[4] == "1"), (proj_args[5] == "-1" ? null : (proj_args[5] == "1")))
    });
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
            if(!file.includes(".txt") && !file.includes(".webp"))
            {
                galery(dir_type, file, null, true);
            }
        }
        local_projects_loaded = true;
        make_final_cache();
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
            xhr.overrideMimeType("text/plain; charset=Windows-1250");
        }
        })
        .done(function(files_bak) {
            //seperate file names + run galery()
            let file_bak = files_bak.split("\n");
            for (x = 0; x < file_bak.length - 1; x++)
                galery(dir_type, file_bak[x], null, true);
            local_projects_loaded = true;
            make_final_cache();
        })
        .fail(function() {
            //manual method final backup
            bak_projects = {
                "html": ["Csapatmunka", "gaming_oldal", "Kutyákról", "oldalalakítás", "reszponzív", "Sakkör", "Webáruház"],
                "py": ["Béka.zip", "Black_Jack.zip", "fetch_projects.zip", "Kalandkönyv.zip", "Kémcső.zip"],
                "java": ["Amőba.zip", "Harc.zip", "Itt_a_piros.zip", "Nyugta.zip"]
            }
            if(dir_type == "html" || dir_type == "py" || dir_type == "java")
            {
                let projects = bak_projects[dir_type]
                for (x = 0; x < projects.length; x++)
                {
                    galery(dir_type, projects[x], null, true);
                }
                alert(error_dynamic_load_before + dir_type + error_dynamic_load_after);
                $(`<div class="no"><h4 class="translation_key_6">(backup)</h4></div>`).insertBefore(`#galery_${dir_type}`)
            }
            local_projects_loaded = true;
            make_final_cache();
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
            git_file_stuff = git_files[x].split("||")
            if(git_file_stuff[0] == project_types.html.type)
            {
                galery(project_types.html.type, git_file_stuff[2], `https://${git_user}.github.io/${git_file_stuff[1]}/`, false, true, false);
            }
            else
            {
                galery(git_file_stuff[0], git_file_stuff[2], `https://github.com/${git_user}/${git_file_stuff[1]}`, false, true);
            }
        }
        git_projects_loaded = true;
        make_final_cache();
    })
    //gits error backup
    .fail(function() {
        alert(error_github_dynamic)
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
                    if(git_type == "HTML" || git_type == "CSS" || git_type == "JavaScript")
                        galery("html", git_name, `https://github.com/${git_user}/${git_name}`, false, true);
                    else if(git_type == "Python")
                        galery("py", git_name, `https://github.com/${git_user}/${git_name}`, false, true);
                    else
                        galery(git_type.toLowerCase(), git_name, `https://github.com/${git_user}/${git_name}`, false, true);
                }
            }
            git_projects_loaded = true;
            make_final_cache();
        })
        //github backup error
        .fail(function() {
            alert(error_github_api)
            git_projects_loaded = true;
            make_final_cache();
        });
    });
    //update table
    table();
}
