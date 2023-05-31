/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
	navToggle = document.getElementById('nav-toggle'),
	navClose = document.getElementById('nav-close');

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
	navToggle.addEventListener('click', () => {
		navMenu.classList.add('show-menu');
	});
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
	navClose.addEventListener('click', () => {
		navMenu.classList.remove('show-menu');
	});
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
	const navMenu = document.getElementById('nav-menu');
	// When we click on each nav__link, we remove the show-menu class
	navMenu.classList.remove('show-menu');
}
navLink.forEach((n) => n.addEventListener('click', linkAction));

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName('skills__content'),
	skillsHeader = document.querySelectorAll('.skills__header');

function toogleSkills() {
	let itemClass = this.parentNode.className;
	for (i = 0; i < skillsContent.length; i++) {
		skillsContent[i].className = 'skills__content skills__close';
	}

	if (itemClass === 'skills__content skills__close') {
		this.parentNode.className = 'skills__content skills__open';
	}
}

skillsHeader.forEach((el) => {
	el.addEventListener('click', toogleSkills);
});

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]'),
	tabContents = document.querySelectorAll('[data-content]');

tabs.forEach((tab) => {
	tab.addEventListener('click', () => {
		const target = document.querySelector(tab.dataset.target);

		tabContents.forEach((tabContent) => {
			tabContent.classList.remove('qualification__active');
		});

		target.classList.add('qualification__active');

		tabs.forEach((tab) => {
			tab.classList.remove('qualification__active');
		});

		tab.classList.add('qualification__active');
	});
});

/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll('.services__modal'),
	modalBtns = document.querySelectorAll('.services__button'),
	modalCloses = document.querySelectorAll('.services__modal-close');

let modal = function (modalClick) {
	modalViews[modalClick].classList.add('active-modal');
};

modalBtns.forEach((modalBtn, i) => {
	modalBtn.addEventListener('click', () => {
		modal(i);
	});
});

modalCloses.forEach((modalClose) => {
	modalClose.addEventListener('click', () => {
		modalViews.forEach((modalView) => {
			modalView.classList.remove('active-modal');
		});
	});
});
/*==================== PORTFOLIO SWIPER  ====================*/
let swiper = new Swiper('.portfolio__container', {
	cssMode: true,
	loop: true,

	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
	const scrollY = window.pageYOffset;

	sections.forEach((current) => {
		const sectionHeight = current.offsetHeight;
		const sectionTop = current.offsetTop - 50;
		sectionId = current.getAttribute('id');

		if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
			document
				.querySelector('.nav__menu a[href*=' + sectionId + ']')
				.classList.add('active-link');
		} else {
			document
				.querySelector('.nav__menu a[href*=' + sectionId + ']')
				.classList.remove('active-link');
		}
	});
}
window.addEventListener('scroll', scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/

function scrollHeader() {
	const nav = document.getElementById('header');
	// When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
	if (this.scrollY >= 80) nav.classList.add('scroll-header');
	else nav.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
	const scrollUp = document.getElementById('scroll-up');
	// When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
	if (this.scrollY >= 560) scrollUp.classList.add('show-scroll');
	else scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'uil-sun';

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
	document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () =>
	themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun';

// We validate if the user previously chose a topic
if (selectedTheme) {
	// If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
	document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](
		darkTheme
	);
	themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](
		iconTheme
	);
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
	// Add or remove the dark / icon theme
	document.body.classList.toggle(darkTheme);
	themeButton.classList.toggle(iconTheme);
	// We save the theme and the current icon that the user chose
	localStorage.setItem('selected-theme', getCurrentTheme());
	localStorage.setItem('selected-icon', getCurrentIcon());
});

//typeWritter effect
const textDisplay = document.getElementById('text');
const phrases = [
	'Software Engineer @Bit Mascot',
	'Open Source Enthusiast',
	'Backend fanatic',
];

let i = 0;
let j = 0;
let currentPhrase = [];
let isDeleting = false;
let isEnd = false;

function loop() {
	isEnd = false;
	textDisplay.innerHTML = currentPhrase.join('');

	if (i < phrases.length) {
		if (!isDeleting && j <= phrases[i].length) {
			currentPhrase.push(phrases[i][j]);
			j++;
			textDisplay.innerHTML = currentPhrase.join('');
		}

		if (isDeleting && j <= phrases[i].length) {
			currentPhrase.pop(phrases[i][j]);
			j--;
			textDisplay.innerHTML = currentPhrase.join('');
		}

		if (j == phrases[i].length) {
			isEnd = true;
			isDeleting = true;
		}
		if (isDeleting && j === 0) {
			currentPrase = [];
			isDeleting = false;
			i++;
			if (i == phrases.length) i = 0;
		}
	}
	const speedUp = Math.random() * (49 - 50) + 20;
	const normalSpeed = Math.random() * (300 - 200) + 50;
	const time = isEnd ? 350 : isDeleting ? speedUp : normalSpeed;
	setTimeout(loop, time);
}

loop();

/* Ashiq --gradient style */
// VARIABLES
const magicalUnderlines = Array.from(document.querySelectorAll('.underline--magical'));

const gradientAPI = 'https://gist.githubusercontent.com/wking-io/3e116c0e5675c8bcad8b5a6dc6ca5344/raw/4e783ce3ad0bcd98811c6531e40256b8feeb8fc8/gradient.json';

// HELPER FUNCTIONS

// 1. Get random number in range. Used to get random index from array.
const randNumInRange = max => Math.floor(Math.random() * (max - 1));

// 2. Merge two separate array values at the same index to 
// be the same value in new array.
const mergeArrays = (arrOne, arrTwo) => arrOne
  .map((item, i) => `${item} ${arrTwo[i]}`)
  .join(', ');

// 3. Curried function to add a background to array of elms
const addBackground = (elms) => (color) => {
  elms.forEach(el => {
    el.style.backgroundImage = color;
  });
}
// 4. Function to get data from API
const getData = async(url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data.data;
}

// 5. Partial Application of addBackground to always apply 
// background to the magicalUnderlines constant
const addBackgroundToUnderlines = addBackground(magicalUnderlines);

// GRADIENT FUNCTIONS

// 1. Build CSS formatted linear-gradient from API data
const buildGradient = (obj) => `linear-gradient(${obj.direction}, ${mergeArrays(obj.colors, obj.positions)})`;

// 2. Get single gradient from data pulled in array and
// apply single gradient to a callback function
const applyGradient = async(url, callback) => {
  const data = await getData(url);
  const gradient = buildGradient(data[randNumInRange(data.length)]);
  callback(gradient);
}

// RESULT
applyGradient(gradientAPI, addBackgroundToUnderlines);
