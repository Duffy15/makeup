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
