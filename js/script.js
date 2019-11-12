console.log(2);

var toggle = document.querySelector('.main-nav__toggle'),
    navList = document.querySelector('.main-nav');

navList.classList.remove('main-nav--no-js');

toggle.addEventListener('click', function() {
  if (navList.classList.contains('main-nav--closed')) {
    navList.classList.remove('main-nav--closed');
    navList.classList.add('main-nav--opened');
  } else {
    navList.classList.add('main-nav--closed');
    navList.classList.remove('main-nav--opened');
  }
});

