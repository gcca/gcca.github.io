(() => {
    const key = 'theme';
    let choice = 'system';
    try {
        const saved = localStorage.getItem(key);
        if (['system', 'light', 'dark'].includes(saved)) choice = saved;
    } catch (_) { /* Storage may be unavailable. */ }
    function apply() {
        if (choice === 'system') document.documentElement.removeAttribute('data-theme');
        else document.documentElement.setAttribute('data-theme', choice);
    }
    apply();
    document.addEventListener('DOMContentLoaded', () => {
        const control = document.getElementById('theme-control');
        const select = document.getElementById('theme-select');
        if (!control || !select) return;
        select.value = choice;
        control.hidden = false;
        select.addEventListener('change', () => {
            choice = select.value;
            apply();
            try {
                if (choice === 'system') localStorage.removeItem(key);
                else localStorage.setItem(key, choice);
            } catch (_) { /* The choice remains active for this page. */ }
        });
    });
})();
