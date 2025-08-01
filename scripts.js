// scripts.js
document.addEventListener('DOMContentLoaded', () => {
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
});

// Lightbox gallery functionality for portfolio page
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.gallery img');
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    document.body.appendChild(lightbox);

    let currentIndex = 0;

    images.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentIndex = index;
            openLightbox();
        });
    });

    function openLightbox() {
        const img = images[currentIndex];
        lightbox.innerHTML = `
            <span class="close">&times;</span>
            <span class="prev">&lt;</span>
            <img src="${img.src}" alt="${img.alt}">
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
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        openLightbox();
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        openLightbox();
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
