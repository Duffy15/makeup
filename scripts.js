document.addEventListener('DOMContentLoaded', () => {
    // Slider Functionality
    const sliderContainer = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide');
    let currentIndex = 0;
    const slideWidth = slides[0].offsetWidth;
    const intervalTime = 3000; // 3 seconds

    function moveSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        const offset = -currentIndex * slideWidth;
        sliderContainer.style.transform = `translateX(${offset}px)`;
    }

    setInterval(moveSlide, intervalTime);

    // Reset slider position if window resized
    window.addEventListener('resize', () => {
        const newSlideWidth = slides[0].offsetWidth;
        const offset = -currentIndex * newSlideWidth;
        sliderContainer.style.transform = `translateX(${offset}px)`;
    });

    // Lightbox Gallery Functionality for Portfolio Page
    const galleryImages = document.querySelectorAll('.gallery a img');
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    document.body.appendChild(lightbox);

    let currentIndexLightbox = 0;

    galleryImages.forEach((img, index) => {
        img.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior
            currentIndexLightbox = index;
            const link = img.parentElement;
            openLightbox(link.href, img.alt);
        });
    });

    function openLightbox(src, alt) {
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
        currentIndexLightbox = (currentIndexLightbox - 1 + galleryImages.length) % galleryImages.length;
        const img = galleryImages[currentIndexLightbox];
        const link = img.parentElement;
        openLightbox(link.href, img.alt);
    }

    function nextImage() {
        currentIndexLightbox = (currentIndexLightbox + 1) % galleryImages.length;
        const img = galleryImages[currentIndexLightbox];
        const link = img.parentElement;
        openLightbox(link.href, img.alt);
    }

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Prevent image clicks from closing the lightbox
    lightbox.querySelectorAll('img').forEach(img => {
        img.addEventListener('click', (e) => e.stopPropagation());
    });
});
