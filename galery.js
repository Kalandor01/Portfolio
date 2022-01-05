
$(document).ready(function(){
    //GALERY

    function table()
    {
        //write to table
        let sum_project_num = git_project_num + html_project_num + py_project_num + java_project_num;
        $("aside>table>tbody").empty();
        $("aside>table>tbody").append(`<tr><th colspan="2">Projektek száma</th></tr><tr><th>GitHub</th><td>${git_project_num}</td></tr><tr><th>HTML</th><td>${html_project_num}</td></tr><tr><th>Python</th><td>${py_project_num}</td></tr><tr><th>Java</th><td>${java_project_num}</td></tr><tr><th>Összes</th><td>${sum_project_num}</td></tr>`);
    }

    function galery(type = "html", name = "null", link = 0, full_link = false, git = false)
    {
        order_num += 1;
        //div
        $(`.galery_${type}`).append(`<div class="${type} fadeIn current" style="--order: ${order_num}"></div>`);
        //get link/name
        if(link == 0)
            link = name;
            if(type != "html" && name.includes(".zip"))
                name = name.split(".zip")[0]
            else if(type == "py" && name.includes(".py"))
                name = name.split(".py")[0]
        //name
        $(`.galery_${type}>.current`).append(`<h2>${name}</h2>`);
        //image
        if(type=="html")
            $(`.galery_${type}>.current`).append(`<img src="links/web/${name}.png" alt="${type}" onerror="javascript:this.src='img/${type}.png'">`);
        else
            $(`.galery_${type}>.current`).append(`<img src="links/file/${type}/${name}.png" alt="${type}" onerror="javascript:this.src='img/${type}.png'">`);
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
                window.alert(desc)
            }
            //backup
            else if(desc_req.readyState == 4 && desc_req.status != 200)
                window.alert("no desc: " + name)
        }
        desc_req.send();*/
        //link
        //html
        if(type == "html")
        {
            if(full_link == true)
            {
                if(git)
                    $(`.galery_html>.current`).append(`<a target="_blank" href="${link}" class="link_type_github"><img src="img/git.png" alt="GitHub"></a>`);
                else
                    $(`.galery_html>.current`).append(`<a target="_blank" href="${link}" class="link_type_link"><img src="img/link.png" alt="Link"></a>`);
            }
            else
                $(`.galery_html>.current`).append(`<a target="_blank" href="links/web/${link}/index.html" class="link_type_link"><img src="img/link.png" alt="Link"></a>`);
        }
        //python
        else if(type == "py")
        {
            if(full_link == true)
            {
                if(git)
                    $(`.galery_py>.current`).append(`<a target="_blank" href="${link}" class="link_type_github"><img src="img/git.png" alt="GitHub"></a>`);
                else
                    $(`.galery_py>.current`).append(`<a target="_blank" href="${link}" class="link_type_download"><img src="img/download.png" alt="Download"></a>`);
            }
            else
                $(`.galery_py>.current`).append(`<a target="_blank" href="links/file/py/${link}" class="link_type_download"><img src="img/download.png" alt="Download"></a>`);
        }
        //java
        else if(type == "java")
        {
            if(full_link == true)
            {
                if(git)
                    $(`.galery_java>.current`).append(`<a target="_blank" href="${link}" class="link_type_github"><img src="img/git.png" alt="GitHub"></a>`);
                else
                    $(`.galery_java>.current`).append(`<a target="_blank" href="${link}" class="link_type_download"><img src="img/download.png" alt="Download"></a>`);
            }
            else
                $(`.galery_java>.current`).append(`<a target="_blank" href="links/file/java/${link}" class="link_type_download"><img src="img/download.png" alt="Download"></a>`);
        }
        $(`.galery_${type}>.current`).removeClass(`current`)
        table();
    }

    function get_filenames(dir_type)
    {
        //directory name
        if(dir_type == "html")
            var dir_name = "links/web/";
        else
            dir_name = `links/file/${dir_type}/`;
        //get... file array?
        let files = null;
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open("get", dir_name, true);
        xmlhttp.onload = function()
        {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
            {
                //get file names + run galery()
                files = xmlhttp.responseText;
                let files_lis = files.split(">..<")[1];
                let files_as = files_lis.split(`<span class="name">`)
                for (x = 0; x < files_as.length - 1; x++)
                {
                    file = files_as[x+1].split(`</span><span class="size">`)[0]
                    if(file.includes(".txt") == false && file.includes(".png") == false)
                    {
                        if(dir_type == "html")
                            html_project_num += 1;
                        else if(dir_type == "py")
                            py_project_num += 1;
                        else if(dir_type == "java")
                            java_project_num += 1;
                        galery(dir_type, file)
                    }
                }
            }
            //(github) error backup
            else if(xmlhttp.readyState == 4 && xmlhttp.status != 200)
            {
                if(file_error == false)
                {
                    $("header>theme_bal").empty();
                    $("header>theme_bal").append("<h4>(GitHub verzió)</h4>");
                    file_error = true;
                }
                //backup directory name
                var dir_name_bak = `links/${dir_type}.txt`;
                //get array from file
                let files_bak = null;
                let xmlhttp_bak = new XMLHttpRequest();
                xmlhttp_bak.open("get", dir_name_bak, true);
                xmlhttp_bak.overrideMimeType('text/xml; charset=iso-8859-2');
                xmlhttp_bak.onload = function()
                {
                    if (xmlhttp_bak.readyState == 4 && xmlhttp_bak.status == 200)
                    {
                        //seperate file names + run galery()
                        files_bak = xmlhttp_bak.responseText;
                        let file_bak = files_bak.split("\n")
                        if(dir_type == "html")
                            html_project_num += file_bak.length - 1;
                        else if(dir_type == "py")
                            py_project_num += file_bak.length - 1;
                        else if(dir_type == "java")
                            java_project_num += file_bak.length - 1;
                        for (x = 0; x < file_bak.length - 1; x++)
                            galery(dir_type, file_bak[x])
                    }
                    //secondary error backup
                    else if(xmlhttp_bak.readyState == 4 && xmlhttp_bak.status != 200)
                    {
                        //manual method final backup
                        if(dir_type == "html")
                        {
                            let html_names = ["Csapatmunka", "Gaming oldal", "Kutyákról", "Oldalalakítás", "Reszponzív", "Sakkör", "Webáruház"]
                            for (x = 0; x < html_names.length; x++)
                            {
                                html_project_num += 1;
                                galery("html", html_names[x])
                            }
                            window.alert("Nem lehetett a HTML projekteket dimamikusan betölteni. Töltsd újra az oldalt az ujrapróbáláshoz.\n(Github Sucks!)\nBiztonsági mentés betöltése...");
                            $(`<div class="no"><h4>(biztonsági mentés)</h4></div>`).insertBefore(`.galery_html`)
                        }
                        else if(dir_type == "py")
                        {
                            let py_names = ["Béka.zip", "Black Jack.zip", "File Explorer.zip", "Kalandkönyv.zip", "Kémcső.zip"]
                            for (x = 0; x < py_names.length; x++)
                            {
                                py_project_num += 1;
                                galery("py", py_names[x])
                            }
                            window.alert("Nem lehetett a Python projekteket dimamikusan betölteni. Töltsd újra az oldalt az ujrapróbáláshoz.\n(Github Sucks!)\nBiztonsági mentés betöltése...");
                            $(`<div class="no"><h4>(biztonsági mentés)</h4></div>`).insertBefore(`.galery_py`)
                        }
                        else if(dir_type == "java")
                        {
                            let java_names = ["Amőba.zip", "Harc.zip", "Itt a piros.zip", "Nyugta.zip"]
                            for (x = 0; x < java_names.length; x++)
                            {
                                java_project_num += 1;
                                galery("java", java_names[x])
                            }
                            window.alert("Nem lehetett a Java projekteket dimamikusan betölteni. Töltsd újra az oldalt az ujrapróbáláshoz.\n(Github Sucks!)\nBiztonsági mentés betöltése...");
                            $(`<div class="no"><h4>(biztonsági mentés)</h4></div>`).insertBefore(`.galery_java`)
                        }
                    }
                }
                xmlhttp_bak.send();
            }
        }
        xmlhttp.send();
        table();
    }


    function get_gits()
    {
        //get array from file
        let git_files = null;
        let git_xmlhttp = new XMLHttpRequest();
        git_xmlhttp.open("get", `links/github.txt`, true);
        git_xmlhttp.overrideMimeType('text/xml; charset=utf-8');
        git_xmlhttp.onload = function()
        {
            if (git_xmlhttp.readyState == 4 && git_xmlhttp.status == 200)
            {
                //seperate projects + run galery()
                let git_files = git_xmlhttp.responseText;
                git_files = git_files.split("\n")
                for (x = 0; x < git_files.length; x++)
                {
                    git_project_num += 1;
                    git_file_stuff = git_files[x].split("||")
                    if(git_file_stuff[0] == "html")
                    {
                        html_project_num += 1;
                        galery("html", git_file_stuff[1], `https://kalandor01.github.io/${git_file_stuff[2]}/`, true)
                    }
                    else if(git_file_stuff[0] == "html_p")
                    {
                        html_project_num += 1;
                        galery("html", git_file_stuff[1], `https://github.com/Kalandor01/${git_file_stuff[2]}`, true, true)
                    }
                    else
                    {
                        if(git_file_stuff[0] == "py")
                            py_project_num += 1;
                        else if(git_file_stuff[0] == "java")
                            java_project_num += 1;
                        galery(git_file_stuff[0], git_file_stuff[1], `https://github.com/Kalandor01/${git_file_stuff[2]}`, true, true)
                    }
                }
            }
            //gits error backup
            else if(git_xmlhttp.readyState == 4 && git_xmlhttp.status != 200)
            {
                window.alert("Nem lehetett a GitHub projekteket dimamikusan betölteni. Töltsd újra az oldalt az ujrapróbáláshoz.\n(Github Sucks!)\nMásolat letöltése a GitHub API segítségével...")
                //get names from api
                let answers = null;
                let apireq = new XMLHttpRequest();
                apireq.open("get", "https://api.github.com/users/Kalandor01/repos", true);
                apireq.onload = function()
                {
                    if (apireq.readyState == 4 && apireq.status == 200)
                    {
                        //get project names
                        answers = apireq.responseText;
                        let ans_lis = answers.split(`"name": "`);
                        //window.alert(ans_lis);
                        for (x = 0; x < ans_lis.length - 1; x++)
                        {
                            let git_name = ans_lis[x+1].split(`",`)[0]
                            if(git_name != "Kalandor01" && git_name != "Portfolio")
                            {
                                //get type from api
                                let type_ans = null;
                                let apireq_type = new XMLHttpRequest();
                                apireq_type.open("get", `https://api.github.com/repos/Kalandor01/${git_name}/languages`, true);
                                apireq_type.onload = function()
                                {
                                    if (apireq_type.readyState == 4 && apireq_type.status == 200)
                                    {
                                        let git_type = null;
                                        //get project type
                                        type_ans = apireq_type.responseText;
                                        let ans = type_ans.split(`"`)[1];
                                        git_project_num += 1;
                                        if(ans == "HTML")
                                        {
                                            html_project_num += 1;
                                            galery("html", git_name, `https://kalandor01.github.io/${git_name}/`, true)
                                        }
                                        else if(ans == "Python")
                                        {
                                            py_project_num += 1;
                                            galery("py", git_name, `https://github.com/Kalandor01/${git_name}`, true, true)
                                        }
                                        else if(ans == "Java")
                                        {
                                            java_project_num += 1;
                                            galery("java", git_name, `https://github.com/Kalandor01/${git_name}`, true, true)
                                        }
                                    }
                                    //(github) error backup
                                    else if(apireq_type.readyState == 4 && apireq_type.status != 200)
                                        window.alert("Nem lehetett megszerezni a projekt típusát a GitHup API-ból!")
                                }
                                apireq_type.send();
                            }
                        }
                    }
                    //(github) error backup
                    else if(apireq.readyState == 4 && apireq.status != 200)
                        window.alert("Nem lehetett hozzáférni a GitHub API-hoz!")
                }
                apireq.send();
            }
        }
        git_xmlhttp.send();
        table();
    }
    

    //galery projects
    var file_error = false
    var git_project_num = 0, html_project_num = 0, py_project_num = 0, java_project_num = 0;
    //html
    var order_num = 1
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
    window.alert(6);
    var fs = require('fs');
    var html_files = fs.readdir('/web/');
    window.alert(5);
    for (file in html_files) {
        galery("html", file);
        window.alert(file);
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
