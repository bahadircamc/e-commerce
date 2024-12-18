// local storage a eleman kaydeden fonsk.
export function saveToLocalStorage(cart) {
    // * local storage a cart verisini ekle .
    localStorage.setItem("cart", JSON.stringify(cart));
};

// local storage dan veri ceken fonksiyon.
export const getFromLocalStorage =() => {
    // * local storage dan cart verisini al. ve json a cevir eger veri yoksa bos dizi return et.

    const data = localStorage.getItem("cart");
    return data ?  JSON.parse(data) : [];
};

//sepetteki urun miktarini hesapla.
export const updateCartIcon = (cart)=> {
    //sepet ikonu kapsayicisi ve quantity nin degerine eris.
    const cartIcon = document.querySelector("#cart-icon");
    const i = document.querySelector(".bxs-shopping-bag");
    
    //sepette bulunan toplam urun sayisini hesapla.
    let totalQuantity = cart.reduce((sum, item)=> sum + item.quantity , 0);

    // quantity attribute unun degerini guncelle.
    i.setAttribute("data-quantity", totalQuantity);
};

//
export function calculateCartTotal(cart) {
    return cart.reduce((sum, item)=> sum + item.price * item.quantity , 0);
};