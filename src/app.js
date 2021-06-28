import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import '@fortawesome/fontawesome-free/js/all.min';
import {I18N} from 'aurelia-i18n';

export class App {
  message = 'Hello World!';
  menuOpen = false;
  ind;
  swiper;
  featureSwiper;
  static inject = [I18N];

  constructor(i18n) {
    this.i18n = i18n;
  }

  attached() {
    this.swiper = new Swiper('.swiper', {
      direction: 'vertical',
      mousewheel: true,
      keyboard: true,
      slideToClickedSlide: true,
      pagination: {
        el: '.swiper-pagination',
      },
    })

    this.featureSwiper = new Swiper('.feature-swiper', {
      autoHeight: true,
      slideToClickedSlide: true,
      pagination: {
        el: '.feature-swiper-pagination',
      },
    })

    this.ind = document.querySelector('.indicator')
    document.addEventListener('keydown', (e) => {
      this.handleKeyInput(e)
    });
    this.checkUrlForModals();
  }

  goToClickedSlide(slideIndex) {
    this.swiper.slideTo(slideIndex)
  }

  navClicked() {
    this.menuOpen ? this.closeNav() : this.openNav();
    this.menuOpen = !this.menuOpen;
  }

  openNav() {
    document.querySelectorAll('.main-nav').item(0).style.display = 'flex';
  }

  closeNav() {
    document.querySelectorAll('.main-nav').item(0).style.display = 'none';
  }

  handleIndicator(el) {
    this.ind.style.width = el.offsetWidth + 'px'
    this.ind.style.left = el.offsetLeft + 'px'
  }

  nextSlide() {
    this.swiper.slideNext();
  }

  prevSlide() {
    this.swiper.slidePrev();
  }

  nextFeature() {
    this.featureSwiper.slideNext();
  }

  prevFeature() {
    this.featureSwiper.slidePrev();
  }

  handleKeyInput = (e) => {
    if (e.keyCode === 38) {
      this.prevSlide()
    }
    else if (e.keyCode === 40) {
      this.nextSlide()
    }
    else if (e.keyCode === 37) {
      this.prevFeature()
    }
    else if (e.keyCode === 39) {
      this.nextFeature()
    }
  }

  changeLang(lang) {
    switch (lang) {
      case 'de':
        this.i18n.setLocale('de');
        break;
      case 'fr':
        this.i18n.setLocale('fr');
        break;
      case 'it':
        this.i18n.setLocale('it');
        break;
      default:
        this.i18n.setLocale('en');
        break;
    }

    console.log(this.i18n.getLocale())
  }

  openModal(name) {
    document.getElementById(`${name}-modal`).style.display = 'flex';
  }

  closeModal(name) {
    document.getElementById(`${name}-modal`).style.display = 'none';
    history.pushState({}, null, '/');
  }

  checkUrlForModals() {
    const path = window.location.pathname;
    switch (path) {
      case '/privacy':
        this.openModal('privacy');
        break;
      case '/terms-conditions':
        this.openModal('terms');
        break;
    }
  }
}
