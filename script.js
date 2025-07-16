'use strict';

const btnOpen = document.querySelector('#open-auth');
const btnClose = document.querySelector('.close-modal');
const modal = document.querySelector('.modal');
const nav = document.querySelector('nav');
const btnGetStarted = document.querySelector('#get-started');
const s1 = document.querySelector('#features');
const tabs = document.querySelector('.tabs');
const tabsContent = document.querySelectorAll('.tab-content');

//Functions
const openModal = function () {
  modal.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
};

const handleHover = function (e) {
  // Only run for anchor tags
  if (e.target.tagName === 'A') {
    const link = e.target;
    //select all anchor in nav
    const siblings = nav.querySelectorAll('a');
    const SignIn = nav.querySelector('#open-auth');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this; // 'this' is 0.5 or 1 from bind
    });
  }
};

//SignIn/SignUp
btnOpen.addEventListener('click', openModal);
btnClose.addEventListener('click', closeModal);

modal.addEventListener('click', function (e) {
  if (e.target === modal) closeModal();
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    e.preventDefault();
    closeModal();
  }
});

//Fade navigation on hover
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

//Getting Started
btnGetStarted.addEventListener('click', function () {
  s1.scrollIntoView({ behavior: 'smooth' });
});

//Sticky Navigation
const header = document.querySelector('.header');
const heroSection = document.querySelector('.hero');

const navHeight = header.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) header.classList.add('sticky');
  else header.classList.remove('sticky');
};

const heroObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

heroObserver.observe(heroSection);

//Section scroll
const sections = document.querySelectorAll('.section');

const sectionScroll = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  });
};

const sectionObserver = new IntersectionObserver(sectionScroll, {
  root: null,
  threshold: 0.15,
});
sections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//Navigation scroll
nav.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.tagName === 'A') {
    const id = e.target.getAttribute('href');
    const targetSection = document.querySelector(id);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
});

//Tabbed components
tabs.addEventListener('click', function (e) {
  const clicked = e.target.closest('.tab-btn');
  if (!clicked) return;

  const tab = tabs.querySelectorAll('.tab-btn');

  tab.forEach(tab => tab.classList.remove('active'));
  tabsContent.forEach(el => el.classList.remove('active'));

  clicked.classList.add('active');
  document
    .querySelector(`[data-content='${clicked.dataset.tab}']`)
    .classList.add('active');
});

//About Img Lazy-Loading
const imgTarget = document.querySelector('img[data-src]');

const lazyImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  //Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(lazyImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imageObserver.observe(imgTarget);

//Testimonials
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  let maxSlide = slides.length;

  //Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class ='dot' data-slide ="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    //Remove all active dots
    document
      .querySelectorAll('.dot')
      .forEach(dot => dot.classList.remove('active'));

    //Add active dot
    document
      .querySelector(`.dot[data-slide="${slide}"]`)
      .classList.add('active');
  };

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };

  init();

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    e.key === 'ArrowRight' && nextSlide();
    e.key === 'ArrowLeft' && prevSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dot')) {
      curSlide = Number(e.target.dataset.slide);
      goToSlide(curSlide);
      activateDot(curSlide);
    }
  });
};

slider();

//Pricing Component
document.querySelector('.pricing').addEventListener('click', function (e) {
  const card = e.target.closest('.price-card');
  if (!card) return;

  const allCards = document.querySelectorAll('.price-card');

  allCards.forEach(card => card.classList.remove('highlight'));
  card.classList.add('highlight');
});

// Store dummy user data
let users = [];

//SignuP
const signUpForm = document.getElementById('signup-form');

signUpForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const userName = document.getElementById('signup-name').value.toLowerCase();
  const email = document.getElementById('signup-email').value.toLowerCase();
  const password = document.getElementById('signup-password').value;

  users.push({ userName, email, password });

  signUpForm.reset();
  alert('Account created!');
});

//Login

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const loginEmail = document.getElementById('login-email').value.toLowerCase();
  const loginPassword = document.getElementById('login-password').value;

  const auth = users.find(
    user => loginEmail === user?.email && loginPassword === user.password
  );

  if (auth) {
    alert('Logged in!');
    closeModal(); // make sure this function is defined
  } else {
    alert('Please enter correct email and password');
  }
  loginForm.reset();
});

console.log(users);
