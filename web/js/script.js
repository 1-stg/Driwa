if (location.href.includes('auth.html') || location.href.includes('reg.html')) {
    button = document.getElementById('button-redirect')

    button.addEventListener('click', () => {
        alert(location.href.includes("auth.html") ? "Вы вошли" : "Вы зарегестрировались")
        location.href = "http://127.0.0.1:5500/index.html"
    })
}
