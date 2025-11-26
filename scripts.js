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
