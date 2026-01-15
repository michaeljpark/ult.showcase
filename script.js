console.log("IXEC Showcase loaded");
// Scrollspy
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('.side-nav ul li');

    window.addEventListener('scroll', () => {
        let current = '';
        const triggerPoint = window.scrollY + window.innerHeight * 0.4; // 40% down the screen

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            
            if (triggerPoint >= sectionTop) {
                const id = section.getAttribute('id');
                if (id) {
                    current = id;
                }
            }
        });

        navLi.forEach(li => {
            li.classList.remove('active');
            if (current && li.querySelector('a').getAttribute('href') === `#${current}`) {
                li.classList.add('active');
            }
        });
    });
});

