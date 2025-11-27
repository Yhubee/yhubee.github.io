(function () {
    const includeTargets = document.querySelectorAll('[data-include]');
    includeTargets.forEach((target) => {
        const file = target.getAttribute('data-include');
        if (!file) return;

        fetch(file)
            .then((response) => response.text())
            .then((html) => {
                target.innerHTML = html;
            })
            .catch((error) => {
                console.error('Include failed for', file, error);
            });
    });
})();

document.addEventListener('DOMContentLoaded', () => {
    const accordionToggles = document.querySelectorAll('.accordion-toggle');

    accordionToggles.forEach((toggle) => {
        const controls = toggle.getAttribute('aria-controls');
        const panel = controls ? document.getElementById(controls) : null;
        if (!panel) return;

        const setExpandedState = (expanded) => {
            toggle.setAttribute('aria-expanded', expanded);
            panel.hidden = !expanded;
        };

        toggle.addEventListener('click', () => {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            setExpandedState(!isExpanded);
        });

        toggle.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggle.click();
            }
        });
    });
});
