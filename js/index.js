class DD_Carousel {
  constructor(id, options) {
    this.id = id;
    this.options = options || {};
  }

  init() {
    this.track = $(".dd-carousel_track");

    this.currentSlide = $(".dd-carousel_slide.current");
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
      const nextSlide = this.nextSlide();

      this.nextIndicator();

      const nextIndex = this.slides.findIndex(slide => slide === nextSlide[0]);
      this.displayArrows(nextIndex);
    });

    this.prevButton.click(() => {
      const prevSlide = this.prevSlide();

      this.prevIndicator();

      const prevIndex = this.slides.findIndex(slide => slide === prevSlide[0]);
      this.displayArrows(prevIndex);
    });

    this.indicators.forEach((indicator, index) => {
      $(indicator).click(() => {
        this.targetSlide(index);
      });
    });
  }
  targetSlide(index) {
    if (index < 0 || index > this.slides.length - 1) return;

    const currentSlide = this.track.find(".dd-carousel_slide.current");
    const targetSlide = $(this.slides[index]);

    this.toSlide(currentSlide, targetSlide);

    return targetSlide;
  }

  prevIndicator() {
    const currentIndicator = this.carouselNav.find(
      ".dd-carousel_indicator.current"
    );
    const prevIndicator = currentIndicator.prev();
    this.toIndicator(currentIndicator, prevIndicator);
  }
  prevSlide() {
    const currentSlide = this.track.find(".dd-carousel_slide.current");
    const prevSlide = currentSlide.prev();
    this.toSlide(currentSlide, prevSlide);

    return prevSlide;
  }

  displayArrows(targetIndex) {
    if (targetIndex === 0) {
      this.prevButton.addClass("hidden");
      this.nextButton.removeClass("hidden");
    } else if (targetIndex === this.slides.length - 1) {
      this.prevButton.removeClass("hidden");
      this.nextButton.addClass("hidden");
    } else {
      this.prevButton.removeClass("hidden");
      this.nextButton.removeClass("hidden");
    }
  }

  nextIndicator() {
    const currentIndicator = this.carouselNav.find(
      ".dd-carousel_indicator.current"
    );
    const nextIndicator = currentIndicator.next();
    this.toIndicator(currentIndicator, nextIndicator);
  }
  toIndicator(currentIndicator, targetIndicator) {
    currentIndicator.removeClass("current");
    targetIndicator.addClass("current");
  }

  nextSlide() {
    const currentSlide = this.track.find(".dd-carousel_slide.current");
    const nextSlide = currentSlide.next();
    this.toSlide(currentSlide, nextSlide);

    return nextSlide;
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
