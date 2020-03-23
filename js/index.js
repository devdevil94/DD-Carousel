const track = document.querySelector(".dd-carousel_track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".dd-carousel_button.button--right");
const prevButton = document.querySelector(".dd-carousel_button.button--left");
const dotsNav = document.querySelector(".dd-carousel_nav");
const dots = Array.from(dotsNav.children);
const slideSize = slides[0].getBoundingClientRect();
const slideWidth = slideSize.width;

// slides[0].style.left = 0;
// slides[1].style.left = slideWidth + 'px';
// slides[2].style.left = slideWidth * 2 + 'px';

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
};
slides.forEach(setSlidePosition);

const moveToSlide = (track, activeSlide, targetSlide) => {
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";
  activeSlide.classList.remove("active");
  targetSlide.classList.add("active");
};

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("active");
  targetDot.classList.add("active");
};

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    prevButton.classList.add("hidden");
    nextButton.classList.remove("hidden");
  } else if (targetIndex === slides.length - 1) {
    prevButton.classList.remove("hidden");
    nextButton.classList.add("hidden");
  } else {
    prevButton.classList.remove("hidden");
    nextButton.classList.remove("hidden");
  }
};

//click right,move slide to right
nextButton.addEventListener("click", e => {
  const activeSlide = track.querySelector(".dd-carousel_slide.active");
  const nextSlide = activeSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector(".dd-carousel_indicator.active");

  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex(slide => slide === nextSlide);

  moveToSlide(track, activeSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrows(slides, prevButton, nextButton, nextIndex);
});
//click left,move slide to left
prevButton.addEventListener("click", e => {
  const activeSlide = track.querySelector(".dd-carousel_slide.active");
  const prevSlide = activeSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector(".dd-carousel_indicator.active");
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = slides.findIndex(slide => slide === prevSlide);
  console.log(activeSlide);
  moveToSlide(track, activeSlide, prevSlide);
  updateDots(currentDot, prevDot);
  hideShowArrows(slides, prevButton, nextButton, prevIndex);
});

// class DD_Slider {
//   constructor(selector) {
//     this.container = document.querySelector(selector);
//     if (this.container) {
//       this.slides = this.container.querySelectorAll(".slide");
//     }
//   }

//   init() {}
// }
