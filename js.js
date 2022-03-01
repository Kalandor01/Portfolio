
$(document).ready(function(){
    //append to header
    $('<div class="language"><button class="lang_button" onclick="setLang()" title="Nyelv váltás"><img src="img/lang_hu.png" alt="Magyar"></button></div>').insertBefore("header>h1")
    $("header").append(`<div class="theme"><button class="theme_button" onclick="setTheme()" title="Theme change"><img src="img/sun.png" alt="Light mode"></button></div>`);
    //append to nav
    $("nav").append('<ul><li class="empty"></li><li><a href="index.html">Home page</a></li><li><a href="portfolio.html">Portfolio</a></li><li><a href="projects.html">Projects</a></li><li><a href="html_playground.html">HTML creator</a></li></ul>')
    //append to footer
    $("footer").append("<h1>© BETA™</h1>");
});


var theme = "light";

function setTheme(){
    //empty
    $("header>.theme>.theme_button").empty();
    $(".link_type_github").empty();
    $(".link_type_link").empty();
    $(".link_type_download").empty();
    $(".pre_portfolio").empty();
    $(".pre_projects").empty();
    $(".pre_html_playground").empty();

    if(theme=="light")
    {
        //replace light images with dark
        //theme
        $("header>.theme>.theme_button").append(`<img src="img/moon.png" alt="Dark mode">`);
        //galery
        $(".link_type_github").append(`<img src="img/git.png" alt="GitHub">`);
        $(".link_type_link").append(`<img src="img/link.png" alt="Link">`);
        $(".link_type_download").append(`<img src="img/download.png" alt="Download">`);
        //preview
        $(".pre_portfolio").append(`<img src="img/preview/portfolio.png" alt="Portfolio">`);
        $(".pre_projects").append(`<img src="img/preview/projects.png" alt="Projektek">`);
        $(".pre_html_playground").append(`<img src="img/preview/html_playground.png" alt="HTML készítő">`);
        theme = "dark";
    }
    else
    {
        //replace dark images with light
        //theme
        $("header>.theme>.theme_button").append(`<img src="img/sun.png" alt="Light mode">`);
        //galery
        $(".link_type_github").append(`<img src="img/git_dark.png" alt="GitHub">`);
        $(".link_type_link").append(`<img src="img/link_dark.png" alt="Link">`);
        $(".link_type_download").append(`<img src="img/download_dark.png" alt="Download">`);
        //preview
        $(".pre_portfolio").append(`<img src="img/preview/portfolio_dark.png" alt="Portfolio">`);
        $(".pre_projects").append(`<img src="img/preview/projects_dark.png" alt="Projektek">`);
        $(".pre_html_playground").append(`<img src="img/preview/html_playground_dark.png" alt="HTML készítő">`);
        theme = "light";
    }
    //set html class for color
    document.documentElement.className = theme;
}


var lang = "en";

function setLang(){
    //empty
    $("header>.language").empty();
    $("nav").empty();
    //get pagename
    var pagename = $("html").attr("id");

    //switch to english
    if(lang=="hu")
    {
        if(pagename!=undefined)
            //translation directory name
            var dir_name_lang = `translations/${pagename}_en.txt`;
            //get array from file
            let lang_lines = null;
            let xmlhttp_lang = new XMLHttpRequest();
            xmlhttp_lang.open("get", dir_name_lang, true);
            xmlhttp_lang.overrideMimeType('text/xml; charset=iso-8859-2');
            xmlhttp_lang.onload = function()
            {
                if (xmlhttp_lang.readyState == 4 && xmlhttp_lang.status == 200)
                {
                    //seperate lines
                    lang_lines = xmlhttp_lang.responseText;
                    let lines = lang_lines.split("\n")
                    //header
                    $("header>h1").empty();
                    $("header>h1").append(lines[0]);
                    //others
                    for (x = 0; x < lines.length; x++)
                    {
                        $(`#${x}`).empty();
                        $(`#${x}`).append(lines[x]);
                    }
                }
                //error message
                else if(xmlhttp_lang.readyState == 4 && xmlhttp_lang.status != 200)
                    alert("No translation file found!")
            }
            xmlhttp_lang.send();

        //lang
        $("header>.language").append(`<button class="lang_button" onclick="setLang()" title="Nyelv váltás"><img src="img/lang_hu.png" alt="Magyar"></button>`);
        //theme change
        $("header>.theme>.theme_button").attr("title", "Theme change");
        //nav
        $("nav").append('<ul><li class="empty"></li><li><a href="index.html">Home page</a></li><li><a href="portfolio.html">Portfolio</a></li><li><a href="projects.html">Projects</a></li><li><a href="html_playground.html">HTML creator</a></li></ul>')
        lang = "en";
    }
    //switch to hungarian
    else
    {
        if(pagename!=undefined)
            //translation directory name
            var dir_name_lang = `translations/${pagename}_hu.txt`;
            //get array from file
            let lang_lines = null;
            let xmlhttp_lang = new XMLHttpRequest();
            xmlhttp_lang.open("get", dir_name_lang, true);
            xmlhttp_lang.overrideMimeType('text/xml; charset=iso-8859-2');
            xmlhttp_lang.onload = function()
            {
                if (xmlhttp_lang.readyState == 4 && xmlhttp_lang.status == 200)
                {
                    //seperate lines
                    lang_lines = xmlhttp_lang.responseText;
                    let lines = lang_lines.split("\n")
                    //header
                    $("header>h1").empty();
                    $("header>h1").append(lines[0]);
                    //others
                    for (x = 0; x < lines.length; x++)
                    {
                        $(`#${x}`).empty();
                        $(`#${x}`).append(lines[x]);
                    }
                }
                //error message
                else if(xmlhttp_lang.readyState == 4 && xmlhttp_lang.status != 200)
                    alert("Nem található fordítási fájl!")
            }
            xmlhttp_lang.send();
        
        //lang
        $("header>.language").append(`<button class="lang_button" onclick="setLang()" title="Language switch"><img src="img/lang_en.png" alt="English"></button>`);
        //theme change
        $("header>.theme>.theme_button").attr("title", "Téma változtatás");
        //nav
        $("nav").append('<ul><li class="empty"></li><li><a href="index.html">Kezdőlap</a></li><li><a href="portfolio.html">Portfólió</a></li><li><a href="projects.html">Projektek</a></li><li><a href="html_playground.html">HTML készítő</a></li></ul>')
        lang = "hu";
    }
}

/*      header unpacked
            <div class="language">
                <button class="lang_button" onclick="setLang()" title="Languague switch">
                    <img src="img/lang_en.png" alt="English">
                </button>
            </div>
            H1 TAG
            <div class="theme">
                <button class="theme_button" onclick="setTheme()" title="Color mode switch">
                    <img src="img/sun.png" alt="Light mode">
                </button>
            </div>
*/

/*      nav unpacked
            <ul>
                <li class="empty"></li>
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
                    <a href="html_playground.html">HTML készítő</a>
                </li>
            </ul>
*/