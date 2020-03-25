class DD_Carousel {
  constructor(id, options) {
    this.id = id;
    this.options = options || {};
  }

  init() {
    this.track = $(".dd-carousel_track");

    // this.currentSlide = $(".dd-carousel_slide.current");

    this.slides = Array.from(this.track.children(".dd-carousel_slide"));
    this.slideSize = this.slides[0].getBoundingClientRect();
    this.slideWidth = this.slideSize.width;

    this.currentSlideIndex = $(".dd-carousel_slide").index(
      $(".dd-carousel_slide.current")
    );

    this.setInitialSlidesPositions();

    this.nextButton = $(".dd-carousel_button.next-button");
    this.prevButton = $(".dd-carousel_button.prev-button");

    this.options.indicators && this.createNav();

    this.targetSlide(this.currentSlideIndex);
    this.targetIndicator(this.currentSlideIndex);

    this.initEvents();
  }
  setInitialSlidesPositions() {
    this.slides.forEach((slide, i) => {
      $(slide).css("left", this.slideWidth * i + "px");
    });
  }

  initEvents() {
    this.nextButton.click(() => {
      this.next();
      this.displayArrows();
    });

    this.prevButton.click(() => {
      this.prev();
      this.displayArrows();
    });

    this.indicators.forEach((indicator, index) => {
      $(indicator).click(() => {
        this.targetSlide(index);
        this.targetIndicator(index);
        this.displayArrows(index);
      });
    });
  }

  targetIndicator(index) {
    console.log(index);
    const currentIndicator = this.carouselNav.find(
      ".dd-carousel_indicator.current"
    );
    const targetIndicator = $(this.indicators[index]);

    this.toIndicator(currentIndicator, targetIndicator);
  }
  targetSlide(index) {
    const currentSlide = this.track.find(".dd-carousel_slide.current");
    const targetSlide = $(this.slides[index]);

    this.toSlide(currentSlide, targetSlide);
  }

  displayArrows() {
    if (this.currentSlideIndex === 0) {
      this.prevButton.addClass("hidden");
      this.nextButton.removeClass("hidden");
    } else if (this.currentSlideIndex === this.slides.length - 1) {
      this.prevButton.removeClass("hidden");
      this.nextButton.addClass("hidden");
    } else {
      this.prevButton.removeClass("hidden");
      this.nextButton.removeClass("hidden");
    }
  }

  prev() {
    if (this.currentSlideIndex === 0) return;

    this.currentSlideIndex--;

    this.targetSlide(this.currentSlideIndex);
    this.targetIndicator(this.currentSlideIndex);
  }
  next() {
    if (this.currentSlideIndex === this.slides.length - 1) return;

    this.currentSlideIndex++;

    this.targetSlide(this.currentSlideIndex);
    this.targetIndicator(this.currentSlideIndex);
  }

  toIndicator(currentIndicator, targetIndicator) {
    currentIndicator.removeClass("current");
    targetIndicator.addClass("current");
  }
  toSlide(currentSlide, targetSlide) {
    this.track.css("transform", `translateX(-${targetSlide.css("left")})`);

    currentSlide.removeClass("current");
    targetSlide.addClass("current");
  }

  createNav() {
    this.carouselNav = $(`<div class="dd-carousel_nav"></div>`);
    this.indicators = this.slides.map((_, i) =>
      $(
        `<button class="dd-carousel_indicator${
          i === 0 ? " current" : ""
        }"></button>`
      )
    );

    this.indicators.forEach(indicator => this.carouselNav.append(indicator));

    this.nextButton.parent().append(this.carouselNav);
  }
}
