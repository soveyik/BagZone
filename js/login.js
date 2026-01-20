const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (email === "" || password === "") {
            alert("E-posta ve şifre boş bırakılamaz!");
            return;
        }

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", email);

        alert("Giriş başarılı! Hoş geldiniz.");
        window.location.href = "index.html";
    });
}

window.logout = function () {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    window.location.href = "login.html";
};