
$(document).ready(function () {

  const INACTIVITY_LIMIT = 20000; // 20 seconds
  let inactivityTimer = null;
  let carouselInstance = null;

  function getActiveCarousel() {
    if (window.matchMedia("(max-width: 991px)").matches) {
      return document.getElementById("microgreensCarouselMobile");
    } else {
      return document.getElementById("microgreensCarouselDesktop");
    }
  }

  function initCarousel() {
    const carouselEl = getActiveCarousel();
    if (!carouselEl) return;

    carouselInstance = new bootstrap.Carousel(carouselEl, {
      interval: 5000,
      ride: "carousel",
      pause: false
    });

    attachListeners(carouselEl);
  }

  function attachListeners(carouselEl) {
    $(carouselEl).on(
      "click touchstart mousedown wheel",
      pauseCarousel
    );

    $(carouselEl).on(
      "slid.bs.carousel",
      resetInactivityTimer
    );
  }

  function pauseCarousel() {
    if (!carouselInstance) return;
    carouselInstance.pause();
    resetInactivityTimer();
  }

  function resetInactivityTimer() {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }

    inactivityTimer = setTimeout(function () {
      if (carouselInstance) {
        carouselInstance.cycle();
      }
    }, INACTIVITY_LIMIT);
  }

  // INIT ON LOAD
  initCarousel();

  // RE-INIT ON RESIZE (switch mobile ↔ desktop)
  $(window).on("resize", function () {
    if (carouselInstance) {
      carouselInstance.dispose();
      carouselInstance = null;
    }
    initCarousel();
  });

});