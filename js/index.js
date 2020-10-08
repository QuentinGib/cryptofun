const toggleBurgerEl = document.getElementById('toggle-burger')
const burgerEl = document.getElementById('burgernav')

toggleBurgerEl.onclick = function toggleBurger(e) {
    burgerEl.classList.toggle('hidden')
}