if (location.href.includes('auth.html') || location.href.includes('reg.html')) {
    button = document.querySelector('.form-button')

    button.addEventListener('click', () => {
        alert(location.href.includes("auth.html") ? "Вы вошли" : "Вы зарегестрировались")
        location.href = "index.html"
    })
}

