document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = Array.from(document.querySelectorAll('[data-animate]'));
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!animatedElements.length) return;

    document.body.classList.add('animations-enabled');

    if (prefersReducedMotion) {
        animatedElements.forEach((el) => el.classList.add('in-view'));
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const { delay } = entry.target.dataset;
                if (delay) {
                    entry.target.style.transitionDelay = delay;
                }
                entry.target.classList.add('in-view');
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -16% 0px',
    });

    animatedElements.forEach((el, index) => {
        // Apply a slight progressive delay when not explicitly provided
        if (!el.dataset.delay && index < 6) {
            el.dataset.delay = `${index * 0.05}s`;
        }
        observer.observe(el);
    });
});
