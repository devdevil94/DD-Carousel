class DD_Carousel {
  constructor(id) {
    this.id = id;
  }

  init() {
    this.track = $(".dd-carousel_track");

    this.slides = Array.from(this.track.children(".dd-carousel_slide"));
    this.slideSize = this.slides[0].getBoundingClientRect();
    this.slideWidth = this.slideSize.width;

    this.nextButton = $(".dd-carousel_button.right-button");
    this.prevButton = $(".dd-carousel_button.left-button");
  }
}
