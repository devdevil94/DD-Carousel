class DD_Slider {
  constructor(selector) {
    this.container = document.querySelector(selector);
    if (this.container) {
      this.slides = this.container.querySelectorAll(".slide");
    }
  }

  init() {}
}
