const burger = document.querySelector(".burger");
const navBar = document.querySelector(".nav-bar");

burger.addEventListener('click', () => {
    navBar.classList.toggle('active');
});


