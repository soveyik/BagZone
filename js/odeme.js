const paymentForm = document.getElementById("paymentForm");

if (paymentForm) {
    paymentForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Basit bir validasyon simülasyonu
        const cardName = document.getElementById("cardName").value;
        const cardNumber = document.getElementById("cardNumber").value;

        if (cardNumber.length < 16) {
            alert("Lütfen geçerli bir kart numarası giriniz.");
            return;
        }

        // Ödeme Başarılı Simülasyonu
        alert(`Sayın ${cardName}, ödemeniz başarıyla alındı! Siparişiniz hazırlanıyor. 🛍️`);
        
        // Sepeti temizle
        localStorage.removeItem("cart");
        
        // Anasayfaya yönlendir
        window.location.href = "index.html";
    });
}

// Kart numarası arasına otomatik boşluk ekleme (Opsiyonel)
document.getElementById("cardNumber")?.addEventListener("input", function (e) {
    e.target.value = e.target.value.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim();
});