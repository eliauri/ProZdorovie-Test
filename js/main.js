//Метод closest
!function (e) { "function" != typeof e.matches && (e.matches = e.msMatchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || function (e) { for (var t = this, o = (t.document || t.ownerDocument).querySelectorAll(e), n = 0; o[n] && o[n] !== t;)++n; return Boolean(o[n]) }), "function" != typeof e.closest && (e.closest = function (e) { for (var t = this; t && 1 === t.nodeType;) { if (t.matches(e)) return t; t = t.parentNode } return null }) }(window.Element.prototype);

document.addEventListener('DOMContentLoaded', () => {
	const sliderThumbs = new Swiper('#product__thumbs', {
		direction: 'vertical', // вертикальная прокрутка
		slidesPerView: "auto",
		spaceBetween: 8,
		navigation: { // задаем кнопки навигации
			nextEl: '.slider__next', // кнопка Next
			prevEl: '.slider__prev' // кнопка Prev
		},
		freeMode: true,
		breakpoints: { // условия для разных размеров окна браузера
			0: { // при 0px и выше
				direction: 'horizontal', // горизонтальная прокрутка
			},
			1024: { // при 768px и выше
				direction: 'vertical', // вертикальная прокрутка
			}
		}
	});

	const sliderImages = new Swiper('#product__images', {
		direction: 'vertical',
		slidesPerView: 1,
		spaceBetween: 32,
		mousewheel: true,
		navigation: {
			nextEl: '.slider__next',
			prevEl: '.slider__prev'
		},
		grabCursor: true,
		thumbs: {
			swiper: sliderThumbs
		},
		breakpoints: {
			0: { // при 0px и выше
				direction: 'horizontal',
			},
			1024: { // при 768px и выше
				direction: 'vertical',
			}
		}
	});

	const reviewsSlider = new Swiper('#reviews__list', {
		slidesPerView: 3,
		spaceBetween: 32,
		navigation: {
			nextEl: '.reviews__next',
			prevEl: '.reviews__prev'
		},
		breakpoints: {
			0: { // при 0px и выше
				slidesPerView: 1,
				spaceBetween: 32,
			},
			576: {
				slidesPerView: 'auto',
				spaceBetween: 8,
			},
			1100: {
				slidesPerView: 3,
			}
		}
	});



	// Появление Header
	const onScrollHeader = () => {
		const header = document.querySelector('.header');
		let prevScroll = window.pageYOffset;
		let currentScroll;
		window.addEventListener('scroll', () => {
			currentScroll = window.pageYOffset
			const headerHidden = () => header.classList.contains('header_hidden')
			if (currentScroll > prevScroll && !headerHidden()) {
				header.classList.add('header_hidden')
			}
			if (currentScroll < prevScroll && headerHidden()) {
				header.classList.remove('header_hidden')
			}
			prevScroll = currentScroll
		})
	}
	onScrollHeader()

	// развернуть описание продукта
	const unwrapInfoButton = document.querySelector('#unwrapInfo');
	const productInfo = document.querySelector('#productInfo');

	unwrapInfoButton.addEventListener('click', () => {
		productInfo.classList.toggle('unwrap');

		if (productInfo.classList.contains("unwrap")) {
			productInfo.style.maxHeight = productInfo.scrollHeight + 'px';
			unwrapInfoButton.textContent = "Свернуть описание";
		} else {
			productInfo.removeAttribute("style");
			unwrapInfoButton.textContent = "Развернуть описание";
		}

	})

	// Модальные окна
	let modalButtons = document.querySelectorAll('.open-modal');
	let overlay = document.querySelector('#overlay-modal');
	let closeButtons = document.querySelectorAll('.modal__close');


	modalButtons.forEach(function (item) {
		item.addEventListener('click', function (e) {
			e.preventDefault();
			document.querySelector('.modal.active') && document.querySelector('.modal.active').classList.remove('active');
			let modalId = this.getAttribute('data-modal');
			let modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');
			modalElem.classList.add('active');
			overlay.classList.add('active');
		});
	});

	overlay.addEventListener('click', function () {
		document.querySelector('.modal.active').classList.remove('active');
		this.classList.remove('active');
	});

	closeButtons.forEach(function (item) {
		item.addEventListener('click', function (e) {
			var parentModal = this.closest('.modal');
			parentModal.classList.remove('active');
			overlay.classList.remove('active');
		});
	});
 


});