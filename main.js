import { renderCards } from "./scripts/ui.js";

/**Data'ya her yerde erişebilmek için global değişken tanımlarız */
let data;

/**Menü verilerini json dosy. çeken fonk */
async function fetchMenu() {
  //*Api'dan verileri al
  const res = await fetch("./db.json");

  /**Json' dan js' ye çevir */
  data = await res.json();
}

//* Sayfanın yüklenme olayını izlemek
window.addEventListener("DOMContentLoaded", () => {
  //* Verileri çeken fonksiyonu çalıştır
  fetchMenu()
    /**Başarılı olduğu zaman kartları ekrana basan fonk. çalış */
    .then(() => renderCards(data.menu));
});

/**Buttons alanındaki inputları çağır */
const inputs = document.querySelectorAll("#buttons input");

/**inputlardaki tıklanma olayını izle */
inputs.forEach((input) => {
  input.addEventListener("change", () => {
    /**Seçilen kategori */
    const selected = input.id;

    /**Hepsi kategorisi için */
    if (selected === "all") {
      renderCards(data.menu);
    } else {
      /**Menü elemanlarından seçilen kategoriye ait olanları filtrele */
      const filtred = data.menu.filter((i) => i.category === selected);
      /**Ekrana bas */
      renderCards(filtred);
    }
  });
});
