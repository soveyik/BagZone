// ===============================
// MOBİL MENÜ KONTROLÜ
// ===============================
const menuBtn = document.querySelector("#menu-btn");
const navbar = document.querySelector(".navbar");

if (menuBtn && navbar) {
    menuBtn.addEventListener("click", () => {
        navbar.classList.toggle("active");
    });

    window.addEventListener("scroll", () => {
        navbar.classList.remove("active");
    });
}

// ===============================
// SEPETE VE FAVORİLERE EKLEME MANTIĞI
// ===============================
const productBoxes = document.querySelectorAll(".box");

productBoxes.forEach(box => {
    const cartBtn = box.querySelector(".box-bottom .btn");
    // Eğer HTML'e favori butonu (kalp ikonlu buton) eklerseniz burayı kullanabilirsiniz
    const favBtn = box.querySelector(".fa-heart")?.parentElement; 

    // Sepete Ekle
    if (cartBtn) {
        cartBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const product = getProductData(box);
            addToStorage("cart", product);
            alert(`${product.name} sepete eklendi! 🛒`);
        });
    }
});

// Ürün verilerini kutudan çeken yardımcı fonksiyon
function getProductData(box) {
    return {
        name: box.querySelector("h3")?.innerText,
        price: box.querySelector(".fiyat")?.childNodes[0].textContent.trim(),
        image: box.querySelector("img")?.src,
        quantity: 1
    };
}

// LocalStorage yönetimi
function addToStorage(key, product) {
    let items = JSON.parse(localStorage.getItem(key)) || [];
    const existing = items.find(item => item.name === product.name);

    if (existing) {
        if (key === "cart") existing.quantity += 1;
    } else {
        items.push(product);
    }
    localStorage.setItem(key, JSON.stringify(items));
}

// ===============================
// MERKEZİ ARAMA VE YÖNLENDİRME SİSTEMİ
// ===============================

// 1. Ürün Listesi (Kontrol için)
const bagProducts = [
    "Beyaz ve Kırmızı Çiçekli Deri Crossbody Çanta",
    "Siyah Deri Askılı Omuz Çantası",
    "Siyah Deri çanta",
    "Kahverengi Ve Beyaz çiçekli Sling Çanta",
    "Turkuvaz Renkli Deri El Çantası",
    "Siyah Deri Ve Fularlı El Çantası",
    "Bej Rengi Kulplu Omuz Çantası",
    "Siyah Deri El Çantası"
];

// 2. Seçiciler
const searchBtn = document.querySelector('#search-btn'); // Navbardaki büyüteç butonu
const searchForm = document.querySelector('.search-form'); // Açılan kutucuk formu
const searchBox = document.querySelector('#search-box'); // Navbardaki input alanı
const footerInput = document.querySelector(".footer .search-input"); // Footerdaki input alanı

/**
 * Arama işlemini yürüten, kontrol eden ve yönlendiren ana fonksiyon
 */
const executeSearchAndRedirect = (query) => {
    const searchTerm = query.toLowerCase().trim();
    
    if (searchTerm === "") {
        alert("Lütfen arama için bir kelime girin.");
        return;
    }

    // Eşleşme kontrolü yap
    const matches = bagProducts.filter(name => name.toLowerCase().includes(searchTerm));

    if (matches.length > 0) {
        // Sonuç bulunduysa yönlendir
        alert(`'${query}' araması için ${matches.length} adet ürün bulundu. Ürünler sayfasına yönlendiriliyorsunuz...`);
        window.location.href = `urunler.html?search=${encodeURIComponent(searchTerm)}`;
    } else {
        // Sonuç yoksa uyarı ver ve yönlendirme yapma
        alert("Aradığınız kriterlere uygun sonuç bulunamadı! 🔍");
    }
};

// --- Navbar Etkileşimleri ---

// Navbardaki butona tıklandığında kutucuğu aç/kapat
searchBtn?.addEventListener('click', () => {
    searchForm.classList.toggle('active');
    if(searchForm.classList.contains('active')) searchBox.focus(); // Açıldığında içine odaklan
});

// Navbar input alanında Enter tuşu
searchBox?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        executeSearchAndRedirect(e.target.value);
    }
});

// --- Footer Etkileşimleri ---

// Footer Arama Butonu
document.querySelector(".footer .search .btn")?.addEventListener("click", () => {
    executeSearchAndRedirect(footerInput.value);
});

// Footer input alanında Enter tuşu
footerInput?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        executeSearchAndRedirect(e.target.value);
    }
});

// ===============================
// ÜRÜNLER SAYFASI FİLTRELEME
// ===============================

window.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');

    if (searchQuery && document.querySelector(".urunler")) {
        const products = document.querySelectorAll(".box");
        
        products.forEach(product => {
            const productName = product.querySelector("h3").innerText.toLowerCase();
            if (productName.includes(searchQuery.toLowerCase())) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }
        });
    }
});

// Sayfa kaydırıldığında navbardaki kutucuğu otomatik kapat
window.onscroll = () => {
    searchForm?.classList.remove('active');
};


// ===============================
// İLETİŞİM FORMU KONTROLÜ
// ===============================

const contactForm = document.querySelector(".iletisim form");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Sayfanın yenilenmesini engeller

        // Form içindeki input alanlarını seçiyoruz
        const name = contactForm.querySelector('input[placeholder="İsim"]').value.trim();
        const email = contactForm.querySelector('input[placeholder="Mail"]').value.trim();
        const phone = contactForm.querySelector('input[placeholder="Telefon"]').value.trim();

        // Boşluk kontrolü
        if (name === "" || email === "" || phone === "") {
            alert("Lütfen tüm alanları (İsim, Mail, Telefon) doldurunuz! ⚠️");
        } else {
            // Başarılı gönderim uyarısı
            alert(`Sayın ${name}, mesajınız başarıyla gönderildi! 📩`);
            
            // Formu temizle
            contactForm.reset();
        }
    });
}
