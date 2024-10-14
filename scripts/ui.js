/**AraYüzü etki edecek bütün fonksiyonlar burada tutulacak */


/**Menu list divini çağır */
const menuList = document.getElementById("menu-list")

/**Menü elemanlarını parametre olarak alıp dizideki her bir eleman için ekrana kart bas */
export const renderCards = (data) => {
    /**Data dizindeki herbir nesne için bir kart html'i oluştur */
    /**Join methodu ile diziyi stringe çevirdik */
  const cardsHTML = data.map(
    (item) =>
      `
     <a
        href="/detail.html?id=${item.id}"
        id="card"
        class="d-flex flex-column flex-md-row text-dark gap-3 text-decoration-none"
      >
        <img class="rounded shadow img-fluid" src="${item.img}" />
        <div>
          <div class="d-flex justify-content-between">
            <h5 class="fw-bold">${item.title}</h5>
            <p class="text-success fw-bold">${(item.price*31.4).toFixed(2)}</p>
          </div>
          <p class="lead">
           ${item.desc}
          </p>
        </div>
      </a>   
  
  `
  ).join("")


  //*Oluşturdğumuz kartları menu-list divinin içine aktar 
  menuList.innerHTML = cardsHTML; 
  
  
};
