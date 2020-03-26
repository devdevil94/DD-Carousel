class DD_Carousel {
  constructor(id, options) {
    this.id = id;
    this.options = options || {};
  }

  init() {
    this.track = $(".dd-carousel_track");

    this.direction = 1;

    this.slides = Array.from(this.track.children(".dd-carousel_slide"));

    //TODO: Display error message when 'current' class name is not added to a .dd-carousel_slide element
    this.currentSlideIndex = $(".dd-carousel_slide").index(
      $(".dd-carousel_slide.current")
    );

    // if(this.currentSlideIndex)
    this.nextButton = $(".dd-carousel_button.next-button");
    this.prevButton = $(".dd-carousel_button.prev-button");

    this.options.indicators && this.createNav();

    this.initEvents();
  }

  initEvents() {
    this.nextButton.click(() => {
      this.next();

      this.toSlide();
      this.displayArrows();
    });

    this.prevButton.click(() => {
      this.prev();
      // this.toSlide();

      this.displayArrows();
    });

    this.indicators.forEach((indicator, index) => {
      $(indicator).click(() => {
        this.currentSlideIndex = index;
      });
    });

    // this.track.on("transitionend", () => {
    //   if (this.direction === -1) {
    //     console.log("next slide");
    //     this.track.append($(".dd-carousel_slide").first());
    //   } else if (this.direction === 1) {
    //     console.log("prev slide");
    //     this.track.prepend($(".dd-carousel_slide").last());
    //   }

    //   this.track.css("transition", "none");
    //   this.track.css("transform", "translate(0)");
    //   setTimeout(() => {
    //     this.track.css("transition", "transform 250ms ease-in");
    //   });
    // });
  }

  prev() {
    if (this.currentSlideIndex === 0 && !this.options.infinite) return;
    else if (this.currentSlideIndex === 0 && this.options.infinite) {
      this.currentSlideIndex = this.slides.length;
    }

    this.currentSlideIndex--;
    if (this.direction === -1) {
      this.track.append($(".dd-carousel_slide").first());
      this.direction = 1;
    }
    this.track.parent().css("justify-content", "flex-end");
  }
  next() {
    if (
      this.currentSlideIndex === this.slides.length - 1 &&
      !this.options.infinite
    )
      return;
    else if (this.currentSlideIndex === 0 && this.options.infinite) {
      this.currentSlideIndex = -1;
    }

    this.currentSlideIndex++;
    this.direction = -1;
    this.track.parent().css("justify-content", "flex-start");
  }

  displayArrows() {
    console.log(this.currentSlideIndex);
    //TODO: Hide arrows when you have one slide only
    if (this.currentSlideIndex === 0 && !this.options.infinite) {
      this.prevButton.hide();
      this.nextButton.show();
    } else if (
      this.currentSlideIndex === this.slides.length - 1 &&
      !this.options.infinite
    ) {
      this.prevButton.show();
      this.nextButton.hide();
    } else {
      this.prevButton.show();
      this.nextButton.show();
    }
  }
  toSlide() {
    this.track.css("transform", `translateX(${this.direction * 25}%)`);
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
