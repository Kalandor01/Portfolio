
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

var langs = ["en", "hu", "de"];
var lang_num = 0;
var error_page_translation = "No translation file found for this page!";
var error_page_name = "Couldn't get the name of this page!";
var error_next_translation_file = "No translation file found for the next language!";

function setLang()
{
    //increase lang num
    lang_num++;
    if(lang_num >= langs.length)
        lang_num = 0;
    //get current lang
    var dir_name_lang_main = `translations/main_${langs[lang_num]}.txt`;
    //get array from file
    let lang_lines_main = null;
    let xmlhttp_lang_main = new XMLHttpRequest();
    xmlhttp_lang_main.open("get", dir_name_lang_main, true);
    xmlhttp_lang_main.overrideMimeType('text/xml; charset=iso-8859-2');
    xmlhttp_lang_main.onload = function()
    {
        if (xmlhttp_lang_main.readyState == 4 && xmlhttp_lang_main.status == 200)
        {
            //seperate lines
            lang_lines_main = xmlhttp_lang_main.responseText;
            let lines_main = lang_lines_main.split("\n")
            //theme change
            $("header>.theme>.theme_button").attr("title", lines_main[2]);
            //nav
            $("nav").empty();
            $("nav").append(`<ul><li class="empty"></li><li><a href="index.html">${lines_main[3]}</a></li><li><a href="portfolio.html">${lines_main[4]}</a></li><li><a href="projects.html">${lines_main[5]}</a></li><li><a href="html_playground.html">${lines_main[6]}</a></li></ul>`);
            error_page_translation = lines_main[7];
            error_page_name = lines_main[8];
            error_next_translation_file = lines_main[9];
        }
        //error message
        else if(xmlhttp_lang_main.readyState == 4 && xmlhttp_lang_main.status != 200)
            alert("No translation file found for this language!")
    }
    xmlhttp_lang_main.send();

    //get pagename + page translation
    var pagename = $("html").attr("id");
    if(pagename!=undefined)
    {
        //translation directory name
        var dir_name_lang = `translations/${pagename}_${langs[lang_num]}.txt`;
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
                alert(error_page_translation)
        }
        xmlhttp_lang.send();
    }
    else
        alert(error_page_name)
    
    //get next lang
    //name
    let next_lang_num = lang_num+1;
    if(next_lang_num >= langs.length)
        next_lang_num = 0;
    var dir_name_lang_main_next = `translations/main_${langs[next_lang_num]}.txt`;
    //get array from file
    let lang_lines_main_next = null;
    let xmlhttp_lang_main_next = new XMLHttpRequest();
    xmlhttp_lang_main_next.open("get", dir_name_lang_main_next, true);
    xmlhttp_lang_main_next.overrideMimeType('text/xml; charset=iso-8859-2');
    xmlhttp_lang_main_next.onload = function()
    {
        if (xmlhttp_lang_main_next.readyState == 4 && xmlhttp_lang_main_next.status == 200)
        {
            //seperate lines
            lang_lines_main_next = xmlhttp_lang_main_next.responseText;
            let lines_main_next = lang_lines_main_next.split("\n")
            //next lang flag text
            $("header>.language").empty();
            $("header>.language").append(`<button class="lang_button" onclick="setLang()" title="${lines_main_next[0]}"><img src="img/lang_${langs[next_lang_num]}.png" alt="${lines_main_next[1]}"></button>`);
        }
        //error message
        else if(xmlhttp_lang_main_next.readyState == 4 && xmlhttp_lang_main_next.status != 200)
            alert(error_next_translation_file)
    }
    xmlhttp_lang_main_next.send();
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