import {
  calculateCartTotal,
  getFromLocalStorage,
  saveToLocalStorage,
  updateCartIcon,
} from "./utils.js";

let cart = getFromLocalStorage();

export function addToCart(event, products) {
  // tiklanilna urunun id sine eris.
  const productId = parseInt(event.target.dataset.id); //parseInt ile verinin type ini string den number a cevirdik.

  // bu id e sayip baska bir urun var mi
  const product = products.find((product) => product.id === productId);

  //   console.log(product);
  //   console.log(cart);

  // Urun var mi kontrol et. Eger varsa, sepete ekleme yap. Eger yoksa, sepete eklenecek urun olustur.
  if (product) {
    // Eger urun varsa bunu bul.
    const exitingItem = cart.find((item) => item.id === productId);

    // Urun sepette varsa miktari arttir.
    if (exitingItem) {
      exitingItem.quantity++;
    //   console.log(
    //     `Ürün miktarı güncellendi: ${exitingItem.title} - ${exitingItem.quantity}`
    //   );
    } else {
      // Eklenecek veriyi objeye cevir.
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      };

      cart.push(cartItem);
      //   console.log(`Yeni ürün eklendi: ${cartItem.title}`);
      // Ekleme yapilan butonun icerigini guncelle.
      event.target.textContent = "Added";

      //sepet ikonunu gunc. fonks.
      updateCartIcon(cart);

      //local storage i guncelle.
      saveToLocalStorage(cart);

    //   //toplam miktari hesapla.
    //   displayCartTotal();

      //sepetteki urun sayisini guncelle.
      updateCartIcon(cart);
    }
  }
}
//sepetteki urunleri silecek fonsk.
const removeFromCart = (event) => {
  //silinecek elemanin id sine eristik ve type ini number yaptik.
  // console.log(parseInt(event.target.dataset.id));
  const productID = parseInt(event.target.dataset.id);

  //tikladigimiz elemani sepetten kaldir.
  cart = cart.filter((item) => item.id !== productID);

  //localstorage i guncelle .
  saveToLocalStorage(cart);

  //sepetteki elemanlari render et.
  renderCartItems();

  //toplam miktari hesapla.
  displayCartTotal();

  //sepetteki urun sayisini guncelle.
  updateCartIcon(cart);
};

// sepettei elemanlari render edecek fonks.
export const renderCartItems = () => {
  //html de  elemanlarin render edillecegi kapsayiciya eris.
  const cartItemsElement = document.querySelector("#cartItems");
  //sepetteki her bir eleman icin cart item render et.
  cartItemsElement.innerHTML = cart
    .map(
      (item) =>
        `
         <div class="cart-item">
              <img 
                src="${item.image}" 
                 alt=""
              />
              <!-- * info kismi  -->
               <div class="cart-item-info">
                <h2>${item.title}</h2>
                <input 
                  type="number" 
                  min="1" 
                  value="${item.quantity}" 
                  class="cart-item-quantity"
                  data-id="${item.id}"
                />
               </div>
               <h2>$${item.price}</h2>
               <button class="remove-from-cart" data-id="${item.id}">Remove</button>
            </div>
`
    )
    .join("");
  //sepete eklenen urunlerin silinebilecegi butonlara eris.
  const removeButtons = document.querySelectorAll(".remove-from-cart");
  for (let i = 0; i < removeButtons.length; i++) {
    const removeButton = removeButtons[i];
    removeButton.addEventListener("click", removeFromCart);
  }

  //quantity inputuna eris
  const quantityInputs = document.getElementsByClassName("cart-item-quantity");


  //her bir inputun degisme olayini izle.
  for (let i = 0; i < quantityInputs.length; i++) {
    const quantityInput = quantityInputs[i];
    quantityInput.addEventListener("change", onQuantityChange)
 }  
};

//*inputlar degistiginde calisan fonks.
const onQuantityChange = (event) => {

    // console.log('miktar degisti, yeni:', event.target.value);//inputun icerisndeki degere erisildi.
    const newQuantity = +event.target.value;
    const productId = +event.target.dataset.id; //inputun id sine erisildi.ve (+) ile number type ina cevrildi.

    //yeni miktar 0'dan buyukse:
    if (newQuantity > 0 ) {
        //id'si bilinen elemanin bilgilerini bul
        const cartItem = cart.find((item) => item.id === productId);

        //egerki eleman sepette  bulunamadiysa fonksiyonu durdur
        if(!cartItem) return;

        // urun miktari guncelle
        cartItem.quantity = newQuantity;

        //localstroge'i guncelle
        saveToLocalStorage(cart);

        //sepet ikonu guncelle
        updateCartIcon(cart);

        //toplam fiyati guncelle
        displayCartTotal();
    }
};

//*toplam miktari ekrana basar.
 export const displayCartTotal = () => {
   const cartTotalElement = document.querySelector("#cartTotal");
   const total = calculateCartTotal(cart);
   cartTotalElement.textContent = `Total: $${total.toFixed(2)} `;
 };

  
