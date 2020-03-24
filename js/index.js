class DD_Carousel {
  constructor(id, options) {
    this.id = id;
    this.options = options || {};
  }

  init() {
    this.track = $(".dd-carousel_track");

    this.currentSlide = $(".dd-carousel_slide.active");
    this.slides = Array.from(this.track.children(".dd-carousel_slide"));
    this.slideSize = this.slides[0].getBoundingClientRect();
    this.slideWidth = this.slideSize.width;

    this.setInitialSlidesPositions();

    this.nextButton = $(".dd-carousel_button.next-button");
    this.prevButton = $(".dd-carousel_button.prev-button");

    this.options.indicators && this.createNav();

    this.initEvents();
  }

  setInitialSlidesPositions() {
    this.slides.forEach((slide, i) => {
      $(slide).css("left", this.slideWidth * i + "px");
    });
  }

  initEvents() {
    this.nextButton.click(() => {
      this.nextSlide();
    });
  }
  nextSlide() {
    const currentSlide = this.track.find(".dd-carousel_slide.current");
    const nextSlide = currentSlide.next();
    this.moveToSlide(currentSlide, nextSlide);
  }
  moveToSlide(currentSlide, targetSlide) {
    this.track.css("transform", `translateX(-${targetSlide.css("left")})`);

    currentSlide.removeClass("current");
    targetSlide.addClass("current");
  }
  createNav() {
    this.carouselNav = $(`<div class="dd-carousel_nav"></div>`);
    this.indicators = this.slides.map((_, i) =>
      $(
        `<button class="dd-carousel_indicator${
          i === 0 ? " active" : ""
        }"></button>`
      )
    );

    this.indicators.forEach(indicator => this.carouselNav.append(indicator));

    this.nextButton.parent().append(this.carouselNav);
  }
}
