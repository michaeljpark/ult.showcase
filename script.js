console.log("IXEC Showcase loaded");

document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const navBackground = document.querySelector('.nav-active-bg');
    const sections = document.querySelectorAll('section');

    function moveNavBackground(targetItem) {
        if (!targetItem || !navBackground) return;

        // Get the specific anchor tag inside since it has the padding/shape we want
        const targetLink = targetItem.querySelector('a');
        if (!targetLink) return;

        const parentList = targetItem.parentElement;
        const parentRect = parentList.getBoundingClientRect();
        const itemRect = targetLink.getBoundingClientRect();

        // Account for parent borders
        const style = window.getComputedStyle(parentList);
        const borderTop = parseFloat(style.borderTopWidth) || 0;
        const borderLeft = parseFloat(style.borderLeftWidth) || 0;

        // Calculate position relative to the UL, adjusting for borders because
        // absolute positioning is relative to the padding box, but getBoundingClientRect includes borders.
        const top = itemRect.top - parentRect.top - borderTop;
        const left = itemRect.left - parentRect.left - borderLeft;
        
        // Apply styles
        navBackground.style.top = `${top}px`;
        navBackground.style.left = `${left}px`;
        navBackground.style.width = `${itemRect.width}px`;
        navBackground.style.height = `${itemRect.height}px`;
        navBackground.style.opacity = '1';
    }

    function updateNavigation() {
        let current = '';
        // Offset to trigger earlier, e.g., 1/3 down the screen
        const triggerPoint = window.scrollY + window.innerHeight * 0.3;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            // Check if within section
            if (triggerPoint >= sectionTop && triggerPoint < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        // Loop through nav items to find the one matching the current section
        let activeItem = null;
        navItems.forEach(li => {
            const link = li.querySelector('a');
            const href = link.getAttribute('href').substring(1); // remove #
            
            if (href === current) {
                li.classList.add('active');
                activeItem = li;
            } else {
                li.classList.remove('active');
            }
        });

        // If we found an active item, move the pill
        if (activeItem) {
            moveNavBackground(activeItem);
        } else if (!current && window.scrollY < 100) {
            // At the very top, maybe deactivate? Or keep it on first?
            // If user wants it to just disappear if no section is active:
            // navBackground.style.opacity = '0';
            // But usually first section 'RESEARCH' starts a bit down.
            // Let's check 'research' section trigger.
        }
    }

    // Event Listeners
    window.addEventListener('scroll', () => {
        window.requestAnimationFrame(updateNavigation);
    });

    window.addEventListener('resize', () => {
        const active = document.querySelector('.nav-item.active');
        if (active) moveNavBackground(active);
    });

    // Initial update
    setTimeout(updateNavigation, 100);

    // View Report Modal Logic
    const viewReportBtn = document.getElementById('view-report-trigger');
    const reportModal = document.getElementById('report-modal');
    const reportContent = document.querySelector('.report-content');

    if (viewReportBtn && reportModal) {
        // Open Modal
        viewReportBtn.addEventListener('click', (e) => {
            e.preventDefault();
            reportModal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Disable scrolling
        });

        // Close Modal on Background Click
        reportModal.addEventListener('click', () => {
            reportModal.classList.remove('show');
            document.body.style.overflow = ''; // Enable scrolling
        });

        // Prevent closing when clicking on the content (image)
        if (reportContent) {
            reportContent.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    }
});

