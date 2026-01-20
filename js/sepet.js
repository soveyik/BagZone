const tableBody = document.querySelector("tbody");
const totalPriceEl = document.querySelector(".toplam span");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ===============================
// SEPETİ ÇİZ
// ===============================
function renderCart() {
    tableBody.innerHTML = "";

    if (cart.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center;">Sepetiniz boş 🛒</td>
            </tr>
        `;
        totalPriceEl.innerText = "0 TL";
        return;
    }

    cart.forEach((item, index) => {
        const priceNumber = parseInt(item.price.replace("TL", ""));
        const rowTotal = priceNumber * item.quantity;

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><img src="${item.image}" alt="${item.name}"></td>
            <td>${item.name}</td>
            <td>${priceNumber} TL</td>
            <td>
                <input type="number" min="1" value="${item.quantity}" data-index="${index}">
            </td>
            <td>${rowTotal} TL</td>
            <td>
                <button class="btn delete-btn" data-index="${index}">Sil</button>
            </td>
        `;

        tableBody.appendChild(tr);
    });

    updateTotal();
}

// ===============================
// TOPLAM HESAPLA
// ===============================
function updateTotal() {
    let total = 0;

    cart.forEach(item => {
        const priceNumber = parseInt(item.price.replace("TL", ""));
        total += priceNumber * item.quantity;
    });

    totalPriceEl.innerText = total + " TL";
    localStorage.setItem("cart", JSON.stringify(cart));
}

// ===============================
// ADET DEĞİŞTİR
// ===============================
tableBody.addEventListener("input", (e) => {
    if (e.target.type === "number") {
        const index = e.target.dataset.index;
        cart[index].quantity = parseInt(e.target.value);
        renderCart();
    }
});

// ===============================
// ÜRÜN SİL
// ===============================
tableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
        const index = e.target.dataset.index;
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }
});

// İlk yükleme
renderCart();

// js/sepet.js dosyanızın en altına veya uygun bir yerine ekleyin:

const checkoutBtn = document.querySelector(".sepet .butonlar .btn");

if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const isLoggedIn = localStorage.getItem("isLoggedIn");

        if (cart.length === 0) {
            alert("Sepetiniz boş! Önce ürün eklemelisiniz.");
            return;
        }

        // Eğer giriş yapılmamışsa login sayfasına, yapılmışsa ödemeye gönder
        if (isLoggedIn === "true") {
            window.location.href = "odeme.html";
        } else {
            alert("Ödeme yapmak için lütfen önce giriş yapınız.");
            window.location.href = "login.html";
        }
    });
}
