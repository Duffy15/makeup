document.addEventListener('DOMContentLoaded', () => {
    // Lightbox Gallery Functionality for Portfolio Page
    const galleryLinks = document.querySelectorAll('.gallery a');
    console.log('Gallery links found:', galleryLinks); // Debug: Check if links are detected
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    document.body.appendChild(lightbox);

    let currentIndexLightbox = 0;

    galleryLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Block default navigation
            console.log('Click detected on link:', link.href); // Debug: Confirm click event
            currentIndexLightbox = index;
            openLightbox(link.href, link.dataset.title || link.querySelector('img').alt);
        });
    });

    function openLightbox(src, alt) {
        console.log('Opening lightbox with src:', src, 'alt:', alt); // Debug: Confirm lightbox trigger
        lightbox.innerHTML = `
            <span class="close">&times;</span>
            <span class="prev">&lt;</span>
            <img src="${src}" alt="${alt}">
            <span class="next">&gt;</span>
        `;
        lightbox.style.display = 'flex';
        document.querySelector('.close').addEventListener('click', closeLightbox);
        document.querySelector('.prev').addEventListener('click', prevImage);
        document.querySelector('.next').addEventListener('click', nextImage);
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
    }

    function prevImage() {
        currentIndexLightbox = (currentIndexLightbox - 1 + galleryLinks.length) % galleryLinks.length;
        const link = galleryLinks[currentIndexLightbox];
        openLightbox(link.href, link.dataset.title || link.querySelector('img').alt);
    }

    function nextImage() {
        currentIndexLightbox = (currentIndexLightbox + 1) % galleryLinks.length;
        const link = galleryLinks[currentIndexLightbox];
        openLightbox(link.href, link.dataset.title || link.querySelector('img').alt);
    }

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Prevent image clicks from closing the lightbox
    lightbox.querySelectorAll('img').forEach(img => {
        img.addEventListener('click', (e) => e.stopPropagation());
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
});
