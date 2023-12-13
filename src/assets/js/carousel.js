const slider = document.querySelector('.slider');
const slidesContainer = document.querySelector('.slides-container');
const prevArrow = document.querySelector('.prev-arrow');
const nextArrow = document.querySelector('.next-arrow');

let count = 0;
let isTransitioning = false;

function prevSlide() {
    if (!isTransitioning) {
        count = (count - 1 + slidesContainer.children.length) % slidesContainer.children.length;
        updateSlidePosition();
    }
}

function nextSlide() {
    if (!isTransitioning) {
        count = (count + 1) % slidesContainer.children.length;
        updateSlidePosition();
    }
}

function updateSlidePosition() {
    isTransitioning = true;
    const slideWidth = slidesContainer.offsetWidth;
    const offset = -count * slideWidth;
    
    slidesContainer.style.transform = `translateX(${offset}px)`;

    // Attendre la fin de la transition pour réactiver les boutons
    setTimeout(() => {
        isTransitioning = false;
    }, 500);
}

prevArrow.addEventListener('click', prevSlide);
nextArrow.addEventListener('click', nextSlide);

// Automatiquement passer à la diapositive suivante toutes les 5 secondes
setInterval(() => {
    if (!isTransitioning) {
        nextSlide();
    }
}, 5000);
