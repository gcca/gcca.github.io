/* System follows CSS media queries; explicit choices override the palette. */
(() => {
    "use strict";

    const storageKey = "gcca-theme";
    const root = document.documentElement;
    const validPreference = (value) =>
        ["system", "light", "dark"].includes(value) ? value : "system";

    function applyPreference(value) {
        root.dataset.theme = validPreference(value);
        const select = document.getElementById("theme-preference");
        if (select) select.value = root.dataset.theme;
    }

    let savedPreference = "system";
    try {
        savedPreference = localStorage.getItem(storageKey);
    } catch {
        // Browsers may disable storage; the selector still works on this page.
    }
    applyPreference(savedPreference);

    function initializeControl() {
        const control = document.querySelector(".theme-control");
        const select = document.getElementById("theme-preference");
        if (!control || !select) return;

        select.value = root.dataset.theme;
        select.addEventListener("change", () => {
            applyPreference(select.value);
            try {
                localStorage.setItem(storageKey, root.dataset.theme);
            } catch {
                // Keep the current selection even when persistence is blocked.
            }
        });
        control.hidden = false;
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initializeControl, {once: true});
    } else {
        initializeControl();
    }

    window.addEventListener("storage", (event) => {
        if (event.key === storageKey || event.key === null) {
            applyPreference(event.key === null ? "system" : event.newValue);
        }
    });
})();
