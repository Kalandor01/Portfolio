
$(document).ready(function(){

    //GALERY
    function galery(type, name, link = 0, full_link = false)
    {
        order_num += 1;
        //div
        $(`.galery_${type}`).append(`<div class="${type} fadeIn current" style="--order: ${order_num}"></div>`);
        //name
        $(`.galery_${type}>.current`).append(`<h1>${name}</h1>`);
        //image
        $(`.galery_${type}>.current`).append(`<img src="img/${type}.png" alt="${type}">`);
        //link
        if(link == 0)
            link = name;
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
                $(`.galery_py>.current`).append(`<a target="_blank" href="links/file/py/${link}.zip"><img src="img/download.png" alt="Download"></a>`);
        }
        //java
        else if(type == "java")
        {
            if(full_link == true)
                $(`.galery_java>.current`).append(`<a target="_blank" href="${link}"><img src="img/download.png" alt="Download"></a>`);
            else
                $(`.galery_java>.current`).append(`<a target="_blank" href="links/file/java/${link}.zip"><img src="img/download.png" alt="Download"></a>`);
        }
        $(`.galery_${type}>.current`).removeClass(`current`)
    }

    function get_filenames(dir_type)
    {
        //directory name
        if(dir_type == "html")
            dir_name = "links/web/";
        else
            dir_name = `links/file/${dir_type}/`;
        //get... file array?
        window.alert("fech start");
        var files = null;
        var file_error = false
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("get", dir_name, true);
        xmlhttp.onload = function()
        {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
                files = xmlhttp.responseText;
            else if(xmlhttp.readyState == 4 && xmlhttp.status != 200)
            {
                window.alert("(Couldn' t load projects dynamically. Reload the page to try again.)\nGithub Sucks!\nLoading Backup content...");
                file_error = true
            }
        }
        xmlhttp.send(); 
        //get file names + run galery()
        if(file_error == false)
        {
            window.alert("fech done");
            var files_lis = files.split(">..<")[1];
            var files_as = files_lis.split(`<span class="name">`)
            for (x = 0; x < files_as.length - 1; x++)
            {
                file = files_as[x+1].split(`</span><span class="size">`)[0].split(".zip")[0]
                galery(dir_type, file)
            }
        }
        return file_error
    }

    //galery projects
    //html
    var order_num = 1
    $(`<div class="no fadeIn" style="--order: ${order_num}"><h2>HTML</h2></div>`).insertBefore(`.galery_html`)
    if(get_filenames("html"))
    {
        //legacy manual method
        var html_names = ["Csapatmunka", "Gaming oldal", "Kutyákról", "Oldalalakítás", "Reszponzív", "Sakkör", "Webáruház"]
        for (x = 0; x < html_names.length; x++)
            galery("html", html_names[x])
    }
    galery("html", "Téli versek", "https://kalandor01.github.io/teli_versek/", true)

    //python
    order_num += 1
    $(`<div class="no fadeIn" style="--order: ${order_num}"><h2>Python</h2></div>`).insertBefore(`.galery_py`)
    if(get_filenames("py"))
    {
        //legacy manual method
        var py_names = ["Béka", "Black Jack", "File Explorer", "Kalandkönyv", "Kémcső"]
        for (x = 0; x < py_names.length; x++)
            galery("py", py_names[x])
    }
    
    //java
    order_num += 1
    $(`<div class="no fadeIn" style="--order: ${order_num}"><h2>Java</h2></div>`).insertBefore(`.galery_java`)
    if(get_filenames("java"))
    {
        //legacy manual method
        var java_names = ["Amőba", "Harc"]
        for (x = 0; x < java_names.length; x++)
            galery("java", java_names[x])
    }

    
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