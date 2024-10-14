/**
 * Url' deki arama parametrelerine(search-param) eriş
 * JS'de tarayıcı ile alakalı olan verileri erişmek istiyorsak winsow nesnesi kullanırız.
 *
 * JS' de URL' deki arama parametrelerini(search-param) yönetmeye yarayan yerleşik bir class vardır. URLSearchParams.
 */

const params = new URLSearchParams(window.location.search);

/**Yukarıdaki classtan oluşturdğumuz nesne sayesinde url'deki arama para parametlerini güncellemeye / erişmeye / silmeye yarayan methodları kullanabiliyoruz biz de get methodu ile id parametresine eriştik*/
const id = params.get("id");

//*1) Sayfanın yüklenme olayını izle
document.addEventListener("DOMContentLoaded", async () => {
  //*2) Api'den verileri al
  try {
    const res = await fetch("../db.json");
    const data = await res.json();

    //*3) Veriler arasından url'deki id'ye denk gelen ürünü bul
    const product = data.menu.find((item) => item.id == id);

    /**4.1)Ürün bulunamazsa 404 sayfasını render */
    if (!product) {
      renderNotFound();
    } else {
      //*4) Sayfa içeriğini APİ' den aldığımız ürüne göre renderla
      renderPage(product);
    }
  } catch (error) {
    return alert("Üzgünüz bir sorun oluştu");
  }
});

//**Ekrana bas */
const outlet = document.getElementById("outlet");

//*Aldığı parametreye göre dinamik olarak ekrana basan fonk
function renderPage(product) {
  outlet.innerHTML = `
    <div class="d-flex justify-content-between fs-5">
        <a href="/">
          <img width="35px" src="./images/home.png" alt="" />
        </a>
        <p>Anasayfa / ${product.category} / ${product.title.toLowerCase()}</p>
      </div>

      <h1 class="text-center my-4">${product.title}</h1>
      <img
        src="${product.img}"
        class="rounded object-fit-cover shadow"
        style="max-height: 400px"
      />

      <h4 class="mt-4">
        <span>Ürünün Kategorisi: </span>
        <span class="text-success">${product.category}</span>
      </h4>

      <h4 class="mt-4">
        <span>Ürünün Fiyatı: </span>
        <span class="text-success">${(product.price * 22).toFixed(2)} ₺</span>
      </h4>

      <p class="lead">
        ${product.desc}
      </p>

    `;
}
/**404 SAYFASI */function renderNotFound() {
  outlet.innerHTML = `
  <div style="height:90vh" class="d-flex justify-content-center align-items-center">
  <div class="d-flex flex-column align-items-center gap-3">
    <h1 class="text-center">Aradığınız ürün mevcut değil</h1>

    <a href="/">Anasayfaya Dönün</a>
 </div>
  </div>  
    `;
}
