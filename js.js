
$(document).ready(function(){
    //append to header
    $("header").append(`<div class="themes"><button class="theme light" onclick="setTheme('light')" title="Light mode"><img src="img/sun.png" alt="light mode"></button><button class="theme dark" onclick="setTheme('dark')" title="Dark mode"><img src="img/moon.png" alt="dark mode"></button></div>`);
    //append to nav
    $("nav").append('<ul><li class="empty"></li><li><a href="index.html">Kezdőlap</a></li><li><a href="portfolio.html">Portfólió</a></li><li><a href="projects.html">Projektek</a></li><li><a href="html_playground.html">HTML készítő</a></li></ul>')
    //append to footer
    $("footer").append("<h1>© BETA™</h1>");
});



function setTheme(theme){
    document.documentElement.className = theme;
    if(theme=="light")
    {
        //replace light images with dark
        $(".link_type_github").empty();
        $(".link_type_link").empty();
        $(".link_type_download").empty();
        $(".link_type_github").append(`<img src="img/git.png" alt="GitHub">`);
        $(".link_type_link").append(`<img src="img/link.png" alt="Link">`);
        $(".link_type_download").append(`<img src="img/download.png" alt="Download">`);
    }
    if(theme=="dark")
    {
        //replace dark images with light
        $(".link_type_github").empty();
        $(".link_type_link").empty();
        $(".link_type_download").empty();
        $(".link_type_github").append(`<img src="img/git_dark.png" alt="GitHub">`);
        $(".link_type_link").append(`<img src="img/link_dark.png" alt="Link">`);
        $(".link_type_download").append(`<img src="img/download_dark.png" alt="Download">`);
    }
}

/*      header unpacked
            <div class="themes">
                <button class="theme light" onclick="setTheme('light')" title="Light mode">
                    <img src="img/sun.png" alt="light mode">
                </button>
                <button class="theme dark" onclick="setTheme('dark')" title="Dark mode">
                    <img src="img/moon.png" alt="dark mode">
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