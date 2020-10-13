const burger = document.querySelector('.burger');
const mainnav= document.getElementById('mainnav')
burger.addEventListener('click', () => {
    mainnav.classList.toggle('active');
});
