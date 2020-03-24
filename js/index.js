class DD_Carousel {
  constructor(id) {
    this.id = id;
  }

  init() {
    this.track = $(".dd-carousel_track");

    this.slides = Array.from(this.track.children(".dd-carousel_slide"));
    this.slideSize = this.slides[0].getBoundingClientRect();
    this.slideWidth = this.slideSize.width;

    this.nextButton = $(".dd-carousel_button.next-button");
    this.prevButton = $(".dd-carousel_button.prev-button");

    this.createNav();

    // this.carouselNav = $(".dd-carousel_nav");
    // this.indicators = Array.from(
    //   this.carouselNav.children(".dd-carousel_indicator")
    // );
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
