
$(document).ready(function(){
    //append to header
    $('<div class="languages"><button class="langs" title="Language switch"><img src="img/link.png" alt="Language switch"><div class="langs_container"></div></button></div>').insertBefore("header>h1");
    getLangs();
    $("header").append(`<div class="theme"><button class="theme_button" onclick="setTheme()" title="Theme change"><img src="img/sun.png" alt="Light mode"></button></div>`);
    //append to nav
    $("nav").append('<ul><li class="empty"></li><li><a href="index.html">Home page</a></li><li><a href="portfolio.html">Portfolio</a></li><li><a href="projects.html">Projects</a></li><li><a href="html_playground.html">HTML creator</a></li></ul>')
    //append to footer
    $("footer").append("<h1>© BETA™</h1>");

    //cookies (automaticly in alphabetic order?)     theme, lang
    //document.cookie = "theme=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    //document.cookie = "lang=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    let cookies = document.cookie;
    if(cookies=="")
    {
        alert("This page uses (2) cookies to remember your theme and language settings!")
        document.cookie = "lang=0; expires=Tue, 1 Jan 2030 12:00:00 UTC; SameSite=Strict";
        document.cookie = "theme=0; expires=Tue, 1 Jan 2030 12:00:00 UTC; SameSite=Strict";
    }
    cookies = cookies.split("; ")
    var site_settings = [];
    cookies.forEach(cookie => {
        let cookie_part = cookie.split("=");
        if(cookie_part[0] == "theme")
            site_settings[0] = cookie_part[1];
        else
            site_settings[1] = cookie_part[1];
    });
    //alert(site_settings)

    //set defaults
    if(site_settings[0] == 1)
        setTheme(false);
    if(site_settings[1] != 0)
        setLang(site_settings[1]);
    //alert(site_settings);
});


var theme = "dark";

function setTheme(set_cookie=true){
    //empty
    $("header>.theme>.theme_button").empty();
    $(".link_type_github").empty();
    $(".link_type_link").empty();
    $(".link_type_download").empty();
    $(".pre_portfolio").empty();
    $(".pre_projects").empty();
    $(".pre_html_playground").empty();

    if(theme=="dark")
    {
        //replace dark images with light
        //lang
        document.querySelector("header>.languages>.langs>img").src = "img/link_dark.png";
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
        theme = "light";
        if(set_cookie)
            document.cookie = "theme=1; expires=Tue, 1 Jan 2030 12:00:00 UTC; SameSite=Strict";
    }
    else
    {
        //replace light images with dark
        //lang
        document.querySelector("header>.languages>.langs>img").src = "img/link.png";
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
        theme = "dark";
        if(set_cookie)
            document.cookie = "theme=0; expires=Tue, 1 Jan 2030 12:00:00 UTC; SameSite=Strict";
    }
    //set html class for color
    document.documentElement.className = theme;
}

var langs = ["en", "hu", "de"];
var lang_num = 0;
var error_page_translation = "No translation file found for this page!";
var error_page_name = "Couldn't get the name of this page!";
var error_next_translation_file = "No translation file found for the next language!";

function getLangs()
{
    $("header>.languages>.langs>.langs_container").empty();
    for (let x = 0; x < langs.length; x++)
        $("header>.languages>.langs>.langs_container").append(`<button onclick="setLang(${x})"><img src="img/lang_${langs[x]}.png" alt="${langs[x]}"></button>`);
}

function setLang(lang_num=0)
{
    //get current lang
    $.ajax({
    url: `translations/main_${langs[lang_num]}.txt`,
    beforeSend: function(xhr) {
        xhr.overrideMimeType("text/plain; charset=iso-8859-2");
    }
    })
    .done(function(lang_main) {
        //seperate lines
        let lines_main = lang_main.split("\n");
        //lang change
        $("header>.languages>.langs").attr("title", lines_main[0]);
        $("header>.languages>.langs>img").attr("alt", lines_main[0]);
        //theme change
        $("header>.theme>.theme_button").attr("title", lines_main[2]);
        //nav
        $("nav").empty();
        $("nav").append(`<ul><li class="empty"></li><li><a href="index.html">${lines_main[3]}</a></li><li><a href="portfolio.html">${lines_main[4]}</a></li><li><a href="projects.html">${lines_main[5]}</a></li><li><a href="html_playground.html">${lines_main[6]}</a></li></ul>`);
        error_page_translation = lines_main[7];
        error_page_name = lines_main[8];
        error_next_translation_file = lines_main[9];
    })
    //error message
    .fail(function() {
        alert("No translation file found for this language!");
    });

    //get pagename + page translation
    var pagename = $("html").attr("id");
    if(pagename!=undefined)
    {
        //translation directory name
        $.ajax({
        url: `translations/${pagename}_${langs[lang_num]}.txt`,
        beforeSend: function(xhr) {
            xhr.overrideMimeType("text/plain; charset=iso-8859-2");
        }
        })
        .done(function(lang_lines) {
            //seperate lines
            let lines = lang_lines.split("\n");
            //header
            $("header>h1").empty();
            $("header>h1").append(lines[0]);
            //others
            for (x = 0; x < lines.length; x++)
            {
                $(`#${x}`).empty();
                $(`#${x}`).append(lines[x]);
            }
        })
        //error message
        .fail(function() {
            alert(error_page_translation);
        });
    }
    else
        alert(error_page_name);
    
    //cookie
    document.cookie = `lang=${lang_num}; expires=Tue, 1 Jan 2030 12:00:00 UTC; SameSite=Strict`;
}


/*ajax template
function testAjax()
{
    $.ajax({
    url: "translations/html_playground_en.txt",
    beforeSend: function(xhr) {
        xhr.overrideMimeType("text/plain; charset=iso-8859-2");
    }
    })
    .done(function(data) {
        alert(data);
        $(".testt>p").append(data);
    })
    .fail(function() {
        alert("error");
    });
}*/

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