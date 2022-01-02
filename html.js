

$(document).ready(function(){
    document.getElementById("input_html").value = `<style>\n\t.new_body {\n\t\tbackground-color: var(--c_back);\n\t}\n</style>\n\n<div class="new_body">\n<main>\n\t<header>\n\t\t<h1>Kezdőlap</h1>\n\t</header>\n\t<nav>\n\t\t<ul>\n\t\t\t<li class="empty"></li>\n\t\t\t<li>\n\t\t\t\t<a href="index.html">Kezdőlap</a>\n\t\t\t</li>\n\t\t\t<li>\n\t\t\t\t<a href="portfolio.html">Portfólió</a>\n\t\t\t</li>\n\t\t\t<li>\n\t\t\t\t<a href="projects.html">Projektek</a>\n\t\t\t</li>\n\t\t\t<li>\n\t\t\t\t<a href="html_playground.html">HTML készítő</a>\n\t\t\t</li>\n\t\t</ul>\n\t</nav>\n\t<article>\n\t\t<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum quam nemo assumenda nostrum voluptatem! Repellendus, nulla id eveniet molestias corrupti adipisci odit eligendi, cupiditate totam ullam, temporibus eius aut illo. Eligendi, fugiat! Nihil repellendus quae accusantium, pariatur ratione illum sunt maiores error inventore exercitationem nostrum dignissimos explicabo est, tempora a. Rem maiores nobis, explicabo mollitia non suscipit magnam quisquam hic.<\p>\n\t</article>\n\t<aside>\n\t\t<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore maxime sint cupiditate, fugit, nemo natus quibusdam ad quisquam consectetur, nam mollitia! Dolorem mollitia facere voluptas maiores impedit, molestiae tenetur quibusdam?</p>\n\t</aside>\n\t<footer>\n\t\t<h1>© BETA™</h1>\n\t</footer>\n</main>\n</div>`;
    let input_def = document.getElementById("input_html").value;
    $("aside>.play_area").append(input_def);
});

function gen_html() {
    let input = document.getElementById("input_html").value;
    $("aside>.play_area").empty();
    $("aside>.play_area").append(input);
};