
$(document).ready(function(){
    //append to header
    $('<div class="theme_bal"><h4></h4></div>').insertBefore("header>h1")
    $("header").append(`<div class="theme"><button class="theme_button" onclick="setTheme()" title="Color mode switch"><img src="img/sun.png" alt="Light mode"></button></div>`);
    //append to nav
    $("nav").append('<ul><li class="empty"></li><li><a href="index.html">Kezdőlap</a></li><li><a href="portfolio.html">Portfólió</a></li><li><a href="projects.html">Projektek</a></li><li><a href="html_playground.html">HTML készítő</a></li></ul>')
    //append to footer
    $("footer").append("<h1>© BETA™</h1>");
});

var theme = "light";

function setTheme(){
    if(theme=="light")
    {
        //replace light images with dark
        $("header>.theme>.theme_button").empty();
        $(".link_type_github").empty();
        $(".link_type_link").empty();
        $(".link_type_download").empty();
        $("header>.theme>.theme_button").append(`<img src="img/moon.png" alt="Dark mode">`);
        $(".link_type_github").append(`<img src="img/git.png" alt="GitHub">`);
        $(".link_type_link").append(`<img src="img/link.png" alt="Link">`);
        $(".link_type_download").append(`<img src="img/download.png" alt="Download">`);
        theme = "dark";
    }
    else
    {
        //replace dark images with light
        $("header>.theme>.theme_button").empty();
        $(".link_type_github").empty();
        $(".link_type_link").empty();
        $(".link_type_download").empty();
        $("header>.theme>.theme_button").append(`<img src="img/sun.png" alt="Light mode">`);
        $(".link_type_github").append(`<img src="img/git_dark.png" alt="GitHub">`);
        $(".link_type_link").append(`<img src="img/link_dark.png" alt="Link">`);
        $(".link_type_download").append(`<img src="img/download_dark.png" alt="Download">`);
        theme = "light";
    }
    document.documentElement.className = theme;
}

/*      header unpacked
            <div class="themes">
                <button class="theme_button" onclick="setTheme()" title="Color mode change">
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