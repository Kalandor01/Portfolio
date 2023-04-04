//general vars
var cookies_expire = 2; //years
var cache_expire = 8; //hours
var langs = ["en", "hu", "de"];
var lang_num = 0;
var error_lang_translation = "No translation file found for this language!";
var error_page_translation = "No translation file found for this page!";
var error_page_name = "Couldn't get the name of this page!";
//galery vars
var error_dynamic_load_before = "Couldn't load ";
var error_dynamic_load_other = "other";
var error_dynamic_load_after = " projects dynamically. Reload the page to try again.\nLoading backup...";
var error_github_dynamic = "Couldn't load GitHub projects dynamically. Reload the page to try again.\nDownloading backup with the help of the GitHub API...";
var error_github_api = "Couldn't access the GitHub API!";
//cookies
var theme = "dark";
var is_cache = false;
var enable_cache = false;


$(document).ready(function(){
    //append to header
    $('<div class="languages"><button class="langs" title="Language switch"><img src="img/link_dark.webp" alt="Language switch"><div class="langs_container"></div></button></div>').insertBefore("header>h1");
    get_langs();
    $("header").append(`<div class="theme"><button class="theme_button" onclick="set_theme()" title="Theme change"><img src="img/sun.webp" alt="Light mode"></button></div>`);
    //append to nav
    $("nav").append('<ul><li class="empty"></li><li><a href="index.html">Home page</a></li><li><a href="portfolio.html">Portfolio</a></li><li><a href="projects.html">Projects</a></li><li><a href="html_playground.html">HTML creator</a></li></ul>')
    //append to footer
    $("footer").append("<h1>© BETA™</h1>");

    //cookies (automaticly in alphabetic order?)     theme, lang
    //clear cookies from browser

    let cookies = document.cookie;
    if(cookies=="")
    {
        alert("This page uses a few cookies, mainly to remember your theme and language settings!")
        document.cookie = `theme=0; expires=${years_from_now(cookies_expire)}; SameSite=Strict`;
        document.cookie = `lang=0; expires=${years_from_now(cookies_expire)}; SameSite=Strict`;
        document.cookie = `enabled_cache=1; expires=${years_from_now(cookies_expire)}; SameSite=Strict`;
        document.cookie = `is_cache=0; expires=${hours_from_now(cache_expire)}; SameSite=Strict`;
        cookies = document.cookie;
    }
    cookies = cookies.split("; ");
    //console.log(cookies);
    var site_settings = [0, 0, 1, 0];
    cookies.forEach(cookie => {
        let cookie_part = cookie.split("=");
        if(cookie_part[0] == "theme")
            site_settings[0] = cookie_part[1];
        else if(cookie_part[0] == "lang")
            site_settings[1] = cookie_part[1];
        else if(cookie_part[0] == "enabled_cache")
            site_settings[2] = cookie_part[1];
        else if(cookie_part[0] == "is_cache")
            site_settings[3] = cookie_part[1];
    });
    //console.log(site_settings);

    //set defaults
    if(site_settings[0] != 0)
        set_theme(false);
    if(site_settings[1] != 0)
        change_lang(site_settings[1]);
    if(site_settings[2] != 0)
        enable_cache = true;
    if(site_settings[3] != 0)
        is_cache = true;
});


function set_theme(set_cookie=true){
    //empty
    $("header>.theme>.theme_button").empty();
    $(".link_type_github").empty();
    $(".link_type_link").empty();
    $(".link_type_download").empty();
    $(".link_type_link-download").empty();
    $(".pre_portfolio").empty();
    $(".pre_projects").empty();
    $(".pre_html_playground").empty();

    if(theme=="dark")
    {
        //switch to light mode
        //lang
        document.querySelector("header>.languages>.langs>img").src = "img/link.webp";
        //theme
        $("header>.theme>.theme_button").append(`<img src="img/moon.webp" alt="Dark mode">`);
        //galery
        $(".link_type_github").append(`<img src="img/git_dark.webp" alt="GitHub">`);
        $(".link_type_link").append(`<img src="img/link_dark.webp" alt="Link">`);
        $(".link_type_download").append(`<img src="img/download_dark.webp" alt="Download">`);
        $(".link_type_link-download").append(`<img src="img/link-download_dark.webp" alt="Linkd or download">`);
        //preview
        $(".pre_portfolio").append(`<img src="img/preview/portfolio.webp" alt="Portfolio">`);
        $(".pre_projects").append(`<img src="img/preview/projects.webp" alt="Projektek">`);
        $(".pre_html_playground").append(`<img src="img/preview/html_playground.webp" alt="HTML készítő">`);
        theme = "light";
        if(set_cookie)
            document.cookie = `theme=1; expires=${years_from_now(cookies_expire)}; SameSite=Strict`;
    }
    else
    {
        //switch to dark mode
        //lang
        document.querySelector("header>.languages>.langs>img").src = "img/link_dark.webp";
        //theme
        $("header>.theme>.theme_button").append(`<img src="img/sun.webp" alt="Light mode">`);
        //galery
        $(".link_type_github").append(`<img src="img/git.webp" alt="GitHub">`);
        $(".link_type_link").append(`<img src="img/link.webp" alt="Link">`);
        $(".link_type_download").append(`<img src="img/download.webp" alt="Download">`);
        $(".link_type_link-download").append(`<img src="img/link-download.webp" alt="Link or download">`);
        //preview
        $(".pre_portfolio").append(`<img src="img/preview/portfolio_dark.webp" alt="Portfolio">`);
        $(".pre_projects").append(`<img src="img/preview/projects_dark.webp" alt="Projektek">`);
        $(".pre_html_playground").append(`<img src="img/preview/html_playground_dark.webp" alt="HTML készítő">`);
        theme = "dark";
        if(set_cookie)
            document.cookie = `theme=0; expires=${years_from_now(cookies_expire)}; SameSite=Strict`;
    }
    //set html class for color
    document.documentElement.className = theme;
}

function years_from_now(add_years=2)
{
    return new Date(new Date().setFullYear(new Date().getFullYear() + add_years)).toUTCString();
}

function hours_from_now(add_hours=8)
{
    return new Date(new Date().setHours(new Date().getHours() + add_hours)).toUTCString();
}

function get_langs()
{
    $("header>.languages>.langs>.langs_container").empty();
    for (let x = 0; x < langs.length; x++)
        $("header>.languages>.langs>.langs_container").append(`<button onclick="change_lang(${x})"><img src="img/lang_${langs[x]}.webp" alt="${langs[x]}"></button>`);
}

function change_lang(new_lang=0)
{
    if(new_lang != lang_num)
    {
        lang_num = new_lang;
        set_lang();
    }
}

function set_lang()
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
        error_lang_translation = lines_main[7].replace("\\n", "\n");;
        error_page_translation = lines_main[8].replace("\\n", "\n");;
        error_page_name = lines_main[9].replace("\\n", "\n");;
        error_dynamic_load_before = lines_main[10].replace("\\n", "\n");;
        error_dynamic_load_other = lines_main[11].replace("\\n", "\n");;
        error_dynamic_load_after = lines_main[12].replace("\\n", "\n");;
        error_github_dynamic = lines_main[13].replace("\\n", "\n");;
        error_github_api = lines_main[14].replace("\\n", "\n");;
    })
    //error message
    .fail(function() {
        alert(error_lang_translation);
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
                $(`.translation_key_${x}`).empty();
                $(`.translation_key_${x}`).append(lines[x]);
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
    document.cookie = `lang=${lang_num}; expires=${years_from_now(cookies_expire)}; SameSite=Strict`;
}