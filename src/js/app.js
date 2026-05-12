import * as flsFunctions from "./modules/functions.js";
import "./modules/jquery-3.7.1.min.js";
import { Fancybox } from "./modules/fancybox.esm.js";
import './components.js';

flsFunctions.isWebp();

Fancybox.bind("[data-fancybox]", {
	closeButton: false,
});

// Import swiper
import Swiper, { Navigation, Pagination, Autoplay, Mousewheel, EffectFade, Thumbs, Scrollbar } from 'swiper';
Swiper.use([Navigation, Pagination, Autoplay, Mousewheel, EffectFade, Thumbs, Scrollbar]);

$(window).on('load', function () {
	$('.introVideo').each(function () {
		var video = $(this);
		video[0].play();
	});
});

// Инициализация слайдера introSlider
const introSlider = document.querySelector('.introSlider');
var mySwiperIntro = new Swiper(introSlider, {
	slidesPerView: 1,
	speed: 1500,
	spaceBetween: 10,
	loop: true,
	effect: 'fade',
	autoplay: {
		delay: 5000,
		disableOnInteraction: false, // Не останавливать после клика
	},
	// loop: true,
	fadeEffect: {
		crossFade: true
	},
	pagination: {
		el: introSlider?.querySelector('.swiper-pagination'),
		clickable: true,
		type: 'bullets',
	},
});

// Инициализация слайдера productSlider
document.querySelectorAll('.productSlider').forEach(n => {
	const mySwiperProduct = new Swiper(n, {
		slidesPerView: 4,
		spaceBetween: 27,
		speed: 600,
		autoplay: true,
		navigation: {
			prevEl: n.closest('.sliderW').querySelector('.navArrowPrev'),
			nextEl: n.closest('.sliderW').querySelector('.navArrowNext'),
		},
		pagination: {
			el: n.querySelector('.swiper-pagination'),
			clickable: true,
			type: 'bullets',
		},
		breakpoints: {
			0: {
				slidesPerView: 1,
				spaceBetween: 10,
			},
			576: {
				slidesPerView: 2,
				spaceBetween: 10,
			},
			768: {
				slidesPerView: 3,
			},
			1200: {
				slidesPerView: 4,
			},
		},
	});
});


document.addEventListener('DOMContentLoaded', () => {
	const header = document.querySelector('.header');
	// const mainEl = document.querySelector('.main');

	const headerFixed = () => {
		let scrollTop = window.scrollY;
		let heroCenter = 100;

		if (scrollTop >= heroCenter) {
			header.classList.add('active')
			// mainEl.style.marginTop = `${header.offsetHeight}px`;
		} else {
			header.classList.remove('active')
			// mainEl.style.marginTop = `0px`;
		}
	};

	headerFixed();

	window.addEventListener('scroll', () => {
		headerFixed();
	});
});

let headerSearchBtn = document.querySelector('.headerSearchBtn');
let headerSearchField = document.querySelector('.headerAction .searchW');
let bodyEl = document.querySelector('body');

let hasSubMenuArray = document.querySelectorAll('.has-sub-menu');
let overlaySubmenu = document.querySelector('.headerOverlay');

headerSearchBtn.addEventListener('click', () => {
	headerSearchBtn.classList.toggle('active');
	headerSearchField.classList.toggle('active');
	let href = headerSearchBtn.querySelector('use').getAttribute('xlink:href');
	if (href == 'img/icons/icons.svg#search') {
		href = href.replace('img/icons/icons.svg#search', 'img/icons/icons.svg#close');
		headerSearchBtn.querySelector('use').setAttribute('xlink:href', href);
	} else if (href == 'img/icons/icons.svg#close') {
		href = href.replace('img/icons/icons.svg#close', 'img/icons/icons.svg#search');
		headerSearchBtn.querySelector('use').setAttribute('xlink:href', href);
	}
});

hasSubMenuArray.forEach(el => {
	let link = el.querySelector('.menu-link');
	let menu = el.querySelector('.sub-menu');
	link.addEventListener('click', (e) => {
		e.preventDefault();

		if (!link.classList.contains('active')) {
			hasSubMenuArray.forEach(elems => {
				let linkElem = elems.querySelector('.menu-link');
				let menuElem = elems.querySelector('.sub-menu');
				bodyEl.classList.remove('hidden');
				overlaySubmenu.classList.remove('active');
				linkElem.classList.remove('active');
				menuElem.classList.remove('active');
			});
		}
		link.classList.toggle('active');
		menu.classList.toggle('active');
		bodyEl.classList.toggle('hidden');
		overlaySubmenu.classList.toggle('active');

	});

});

overlaySubmenu.addEventListener('click', () => {
	hasSubMenuArray.forEach(el => {
		let link = el.querySelector('.menu-link');
		let menu = el.querySelector('.sub-menu');
		link.classList.remove('active');
		menu.classList.remove('active');
		bodyEl.classList.remove('hidden');
		overlaySubmenu.classList.remove('active');
	});
});

let shopTypeThree = document.querySelector('.shopTypeThree');
let shopTypeFour = document.querySelector('.shopTypeFour');
let shopList = document.querySelector('.shopList');


function enableShopRow() {
	localStorage.setItem('keyTypeShopPage', 2);
	shopTypeFour?.classList.add('active');
	shopTypeThree?.classList.remove('active');
	shopList?.classList.add('shopList--four');
	shopList?.classList.remove('shopList--three');
}
function disableShopRow() {
	localStorage.setItem('keyTypeShopPage', 1);
	shopTypeThree?.classList.add('active');
	shopTypeFour?.classList.remove('active');
	shopList?.classList.remove('shopList--four');
	shopList?.classList.add('shopList--three');
}

shopTypeThree?.addEventListener('click', () => {
	disableShopRow();
});
shopTypeFour?.addEventListener('click', () => {
	enableShopRow();
});
if (localStorage.keyTypeShopPage == 1) {
	disableShopRow();
} else if (localStorage.keyTypeShopPage == 2) {
	enableShopRow();
}


jQuery('.bapf_head').click(function () {
	jQuery(this).toggleClass('hidden');
	jQuery(this).siblings('.bapf_body').slideToggle();
	jQuery(this).siblings('.bapf_body').toggleClass('hidden');
});

// filter hide not first element 
jQuery('#modalFilter .berocket_single_filter_widget_200 .bapf_head').addClass('hidden');
jQuery('#modalFilter .berocket_single_filter_widget_200 .bapf_body').addClass('hidden');

const mediaQueryMax991 = window.matchMedia('(max-width: 991px)');

if (mediaQueryMax991.matches) {
	// Инициализация слайдера introSlider
	const productGalSlider = document.querySelector('.productGalSlider');
	var mySwiperProductGal= new Swiper(productGalSlider, {
		slidesPerView: 1,
		speed: 1500,
		spaceBetween: 10,
		loop: true,
		effect: 'fade',
		// loop: true,
		fadeEffect: {
			crossFade: true
		},
		pagination: {
			el: productGalSlider?.querySelector('.swiper-pagination'),
			clickable: true,
			type: 'bullets',
		},
	});
}