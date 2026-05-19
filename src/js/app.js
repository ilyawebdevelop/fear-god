import * as flsFunctions from "./modules/functions.js";
import "./modules/jquery-3.7.1.min.js";
import { Fancybox } from "./modules/fancybox.esm.js";
import "./modules/inputmask.min.js";
import './components.js';

flsFunctions.isWebp();

Fancybox.bind("[data-fancybox]", {
	closeButton: false,
});

let inputs = document.querySelectorAll('input[type="tel"]');
let im = new Inputmask({
	mask: '+7 (999) 999-99-99',
	onBeforeWrite: function (event, buffer, caretPos, opts) {
		// console.log(caretPos);
		// Проверяем:
		// 1. Позиция каретки (caretPos) равна 5 (вторая цифра в "99")
		// 2. Нажата клавиша "8"
		if (caretPos === 5 && event.key === '8') {
			event.preventDefault(); // Запрещаем ввод     
			// console.log("Ввод 8 в этой позиции запрещен!");
			return {
				refreshFromBuffer: true,
				buffer: [],
				caret: 4
			};
		}
	},
	onBeforePaste: function (pastedValue, opts) {
		// Удаляем всё, кроме цифр
		var processedValue = pastedValue.replace(/\D/g, "");

		// Если первая цифра 7 или 8 и в строке 11 цифр, убираем первую
		if (processedValue.length === 11 && (processedValue[0] === '7' || processedValue[0] === '8')) {
			return processedValue.substring(1);
		}

		return pastedValue;
	}

});

im.mask(inputs);

// Import swiper
import Swiper, { Navigation, Pagination, Autoplay, Mousewheel, EffectFade, Thumbs, Scrollbar } from 'swiper';
Swiper.use([Navigation, Pagination, Autoplay, Mousewheel, EffectFade, Thumbs, Scrollbar]);

$(window).on('load', function () {
	$('.introVideo').each(function () {
		var video = $(this);
		video[0].play();
	});
});

$(window).on('load', function () {
	$('.sub-menu-cat-video').each(function () {
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
	// autoHeight: 'true',
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
				slidesPerView: 2,
				spaceBetween: 10,
			},
			992: {
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
		let heroCenter = 50;

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

// Burger
const btnMenu = document.querySelector('#toggle');
const menu = document.querySelector('.headerNav');
const btnClose = document.getElementById('headerNavMobileClose');

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


const toggleMenu = function () {
	menu.classList.toggle('active');
}
const toggleBurger = function () {
	btnMenu.classList.toggle('active');
}
const bodyOverflow = function () {
	bodyEl.classList.toggle('hidden');
}
const menuClose = function () {
	toggleBurger();
	bodyOverflow();
	toggleMenu();
}

btnMenu?.addEventListener('click', function (e) {
	e.stopPropagation();
	toggleMenu();
	toggleBurger();
	bodyOverflow();
});

btnClose?.addEventListener('click', function (e) {
	menuClose();
});

hasSubMenuArray.forEach(el => {
	let link = el.querySelector('.menu-link');
	let submenu = el.querySelector('.sub-menu');
	let menuPrev = el.querySelector('.sub-menu-prev');
	let submenuClose = el.querySelector('.sub-menu-close');

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
		submenu.classList.toggle('active');
		bodyEl.classList.toggle('hidden');
		overlaySubmenu.classList.toggle('active');

	});

	menuPrev.addEventListener('click', () => {
		link.classList.remove('active');
		submenu.classList.remove('active');

	});
	submenuClose.addEventListener('click', () => {
		menuClose();
		link.classList.remove('active');
		submenu.classList.remove('active');
		bodyEl.classList.remove('hidden');
		overlaySubmenu.classList.remove('active');
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
	var mySwiperProductGal = new Swiper(productGalSlider, {
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

jQuery('.checkoutBlockTitle').click(function () {
	jQuery(this).toggleClass('active');
	jQuery(this).siblings('.checkoutGrid').slideToggle();
	// jQuery(this).siblings('.bapf_body').toggleClass('hidden');
});

jQuery('.accountHistItemHead').click(function () {
	jQuery(this).toggleClass('active');
	jQuery(this).siblings('.accountHistItemBody').slideToggle();
	jQuery(this).siblings('.accountHistItemBody').toggleClass('active');
});

// filter hide not first element 
jQuery('.accountHistItem:first-child .accountHistItemHead').addClass('active');
jQuery('.accountHistItem:first-child .accountHistItemBody').addClass('active');
jQuery('.accountHistItem:first-child .accountHistItemBody').slideToggle();

// footer nav toggle
jQuery('.footerNavHead').click(function () {
	jQuery(this).toggleClass('active');
	jQuery(this).siblings('ul').slideToggle();
});
