
$(document).ready(function(){
    //append to header
    $('<div class="language"><button class="lang_button" onclick="setLang()" title="Nyelv váltás"><img src="img/lang_hu.png" alt="Magyar"></button></div>').insertBefore("header>h1")
    $("header").append(`<div class="theme"><button class="theme_button" onclick="setTheme()" title="Theme change"><img src="img/sun.png" alt="Light mode"></button></div>`);
    //append to nav
    $("nav").append('<ul><li class="empty"></li><li><a href="index.html">Home page</a></li><li><a href="portfolio.html">Portfolio</a></li><li><a href="projects.html">Projects</a></li><li><a href="html_playground.html">HTML creator</a></li></ul>')
    //append to footer
    $("footer").append("<h1>© BETA™</h1>");

    //cookies?
    document.cookie = "accept=1; expires=Thu, 1 Jan 2025 12:00:00 UTC";
    let x = document.cookie;
    alert(x)
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
    $.ajax({
    url: `translations/main_${langs[lang_num]}.txt`,
    beforeSend: function(xhr) {
        xhr.overrideMimeType("text/plain; charset=iso-8859-2");
    }
    })
    .done(function(lang_main) {
        //seperate lines
        let lines_main = lang_main.split("\n");
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
    
    //get next lang
    //name
    let next_lang_num = lang_num+1;
    if(next_lang_num >= langs.length)
        next_lang_num = 0;
    
    $.ajax({
    url: `translations/main_${langs[next_lang_num]}.txt`,
    beforeSend: function(xhr) {
        xhr.overrideMimeType("text/plain; charset=iso-8859-2");
    }
    })
    .done(function(data_main_next) {
        //seperate lines
        let lines_main_next = data_main_next.split("\n");
        //next lang flag text
        $("header>.language").empty();
        $("header>.language").append(`<button class="lang_button" onclick="setLang()" title="${lines_main_next[0]}"><img src="img/lang_${langs[next_lang_num]}.png" alt="${lines_main_next[1]}"></button>`);
    })
    //error message
    .fail(function() {
        alert(error_next_translation_file);
    });
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