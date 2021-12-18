$(document).ready(function(){
    //append to nav
    $("nav").append('<ul><li><a href="index.html">Kezdőlap</a></li><li><a href="portfolio.html">Portfólió</a></li><li><a href="projects.html">Projektek</a></li><li><a href="index.html">Kezdőlap</a></li></ul>')
    //append to footer
    $("footer").append("<h1>© BETA™</h1>");
    //GALERY
    function galery(type, name, link = 0, full_link = false)
    {
        $(`.galery_${type}`).append(`<div class="${type} current"></div>`);
        //name
        $(`.galery_${type}>.current`).append(`<h1>${name}</h1>`);
        //image
        $(`.galery_${type}>.current`).append(`<img src="img/${type}.png" alt="${type}">`);
        //link
        if(link == 0)
            link = name;
        if(type == "html")
        {
            if(full_link == true)
                $(`.galery_html>.current`).append(`<a target="_blank" href="${link}"><img src="img/link.png" alt="Link"></a>`);
            else
                $(`.galery_html>.current`).append(`<a target="_blank" href="links/web/${link}/index.html"><img src="img/link.png" alt="Link"></a>`);
        }
        else if(type == "py")
        {
            $(`.galery_py>.current`).append(`<a target="_blank" href="links/file/py/${link}.zip"><img src="img/download.png" alt="Download"></a>`);
        }
        else if(type == "java")
        {
            $(`.galery_java>.current`).append(`<a target="_blank" href="links/file/java/${link}.zip"><img src="img/download.png" alt="Download"></a>`);
        }
        $(`.galery_${type}>.current`).removeClass(`current`)
    }

    var html_names = ["Csapatmunka", "Gaming oldal", "Kutyákról", "Oldalalakítás", "Reszponzív", "Sakkör", "Webáruház"]
    for (x = 0; x < html_names.length; x++)
        galery("html", html_names[x])
    galery("html", "Téli versek", "https://kalandor01.github.io/teli_versek/", true)
    var py_names = ["Béka", "Black Jack", "File Explorer", "Kalandkönyv", "Kémcső"]
    for (x = 0; x < py_names.length; x++)
        galery("py", py_names[x])
    var java_names = ["Amőba", "Harc", "Itt a piros, hol a piros", "Nyugta"]
    for (x = 0; x < java_names.length; x++)
        galery("java", java_names[x])
    /*
    var galery_type = []
    var galery_name = []
    var galery_link = []
    var fs = require('fs');
    var html_files = fs.readdir('/web/');
    window.alert(5);
    for (file in html_files) {
        galery("html", file);
        window.alert(file);
    }
    var py_files = fs.readdirSync('./file/py');
    for (file in py_files) {
        galery("py", file);
    }
    var java_files = fs.readdirSync('./file/java');
    for (file in java_files) {
        galery("java", file);
    }
    */
});

/*
            <ul>
                <li>
                    <a href="index.html">Kezdőlap</a>
                </li>
                <li>
                    <a href="portfolio.html">Portfólió</a>
                </li>
                <li>
                    <a href="projects.html">Projektek</a>
                </li>
                <li>
                    <a href="index.html">Kezdőlap</a>
                </li>
            </ul>
*/