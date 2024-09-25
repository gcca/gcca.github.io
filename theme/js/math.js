(function () {
    "use strict";

    // This script is deferred, so article and listing content is already parsed.
    const elements = Array.from(document.querySelectorAll(".math"));
    if (!elements.length || document.getElementById("gcca-mathjax")) return;

    const version = "4.1.3";
    const cdn = "https://cdn.jsdelivr.net/npm/";
    window.MathJax = {
        loader: {
            paths: {mathjax: `${cdn}mathjax@${version}`},
        },
        startup: {elements},
        tex: {
            inlineMath: [["\\(", "\\)"]],
            displayMath: [["$$", "$$"], ["\\[", "\\]"]],
            processEscapes: true,
            processEnvironments: true,
            tags: "none",
        },
        output: {
            font: "mathjax-newcm",
            // Pin fonts and dynamic glyph data as well as the engine.
            fontPath: `${cdn}@mathjax/%%FONT%%-font@${version}`,
            displayOverflow: "linebreak",
            linebreaks: {inline: true, width: "100%"},
            displayAlign: "center",
        },
    };

    // Leave the source TeX visible if JavaScript or the CDN is unavailable.
    const script = document.createElement("script");
    script.id = "gcca-mathjax";
    script.src = `${cdn}mathjax@${version}/tex-chtml.js`;
    script.async = true;
    document.head.appendChild(script);
}());
