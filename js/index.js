const burger = document.querySelector('.burger');
const mainnav= document.getElementById('burgernav')
burger.addEventListener('click', () => {
    mainnav.classList.toggle('active');
});
