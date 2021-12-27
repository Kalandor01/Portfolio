
$(document).ready(function(){
    //GALERY
    function galery(type, name, link = 0, full_link = false)
    {
        order_num += 1;
        //div
        $(`.galery_${type}`).append(`<div class="${type} fadeIn current" style="--order: ${order_num}"></div>`);
        //link
        if(link == 0)
            link = name;
            if(type != "html" && name.includes(".zip"))
                name = name.split(".zip")[0]
            else if(type == "py" && name.includes(".py"))
                name = name.split(".py")[0]
        //name
        $(`.galery_${type}>.current`).append(`<h1>${name}</h1>`);
        //image
        $(`.galery_${type}>.current`).append(`<img src="img/${type}.png" alt="${type}">`);
        //html
        if(type == "html")
        {
            if(full_link == true)
                $(`.galery_html>.current`).append(`<a target="_blank" href="${link}"><img src="img/link.png" alt="Link"></a>`);
            else
                $(`.galery_html>.current`).append(`<a target="_blank" href="links/web/${link}/index.html"><img src="img/link.png" alt="Link"></a>`);
        }
        //python
        else if(type == "py")
        {
            if(full_link == true)
                $(`.galery_py>.current`).append(`<a target="_blank" href="${link}"><img src="img/download.png" alt="Download"></a>`);
            else
                $(`.galery_py>.current`).append(`<a target="_blank" href="links/file/py/${link}"><img src="img/download.png" alt="Download"></a>`);
        }
        //java
        else if(type == "java")
        {
            if(full_link == true)
                $(`.galery_java>.current`).append(`<a target="_blank" href="${link}"><img src="img/download.png" alt="Download"></a>`);
            else
                $(`.galery_java>.current`).append(`<a target="_blank" href="links/file/java/${link}"><img src="img/download.png" alt="Download"></a>`);
        }
        $(`.galery_${type}>.current`).removeClass(`current`)
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
                    galery(dir_type, file)
                }
            }
            //(github) error backup
            else if(xmlhttp.readyState == 4 && xmlhttp.status != 200)
            {
                if(file_error == false)
                {
                    $("header").append("<h4>(GitHub version)</h4>");
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
                                galery("html", html_names[x])
                            window.alert("Nem lehetett a HTML projekteket dimamikusan betölteni. Töltsd újra az oldalt az ujrapróbáláshoz.\n(Github Sucks!)\nBiztonsági mentés betöltése...");
                            $(`<div class="no"><h4>(backup)</h4></div>`).insertBefore(`.galery_html`)
                        }
                        else if(dir_type == "py")
                        {
                            let py_names = ["Béka.zip", "Black Jack.zip", "File Explorer.zip", "Kalandkönyv.zip", "Kémcső.zip"]
                            for (x = 0; x < py_names.length; x++)
                                galery("py", py_names[x])
                            window.alert("Nem lehetett a Python projekteket dimamikusan betölteni. Töltsd újra az oldalt az ujrapróbáláshoz.\n(Github Sucks!)\nBiztonsági mentés betöltése...");
                            $(`<div class="no"><h4>(backup)</h4></div>`).insertBefore(`.galery_py`)
                        }
                        else if(dir_type == "java")
                        {
                            let java_names = ["Amőba.zip", "Harc.zip", "Itt a piros.zip", "Nyugta.zip"]
                            for (x = 0; x < java_names.length; x++)
                                galery("java", java_names[x])
                            window.alert("Nem lehetett a Java projekteket dimamikusan betölteni. Töltsd újra az oldalt az ujrapróbáláshoz.\n(Github Sucks!)\nBiztonsági mentés betöltése...");
                            $(`<div class="no"><h4>(backup)</h4></div>`).insertBefore(`.galery_java`)
                        }
                    }
                }
                xmlhttp_bak.send();
            }
        }
        xmlhttp.send();
    }
    

    //galery projects
    var file_error = false
    //html
    var order_num = 1
    $(`<div class="no fadeIn" style="--order: ${order_num}"><h2>HTML</h2></div>`).insertBefore(`.galery_html`)
    get_filenames("html");
    galery("html", "Téli versek", "https://kalandor01.github.io/teli_versek/", true)

    //python
    order_num += 1
    $(`<div class="no fadeIn" style="--order: ${order_num}"><h2>Python</h2></div>`).insertBefore(`.galery_py`)
    get_filenames("py");
    
    //java
    order_num += 1
    $(`<div class="no fadeIn" style="--order: ${order_num}"><h2>Java</h2></div>`).insertBefore(`.galery_java`)
    get_filenames("java");

    
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