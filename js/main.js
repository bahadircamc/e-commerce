// baglanti kontrolu 
//console.log("selam js");
import { addToCart, displayCartTotal, renderCartItems } from "./cart.js";
import { fetchProducts, renderProducts } from "./product.js";    
import { getFromLocalStorage, updateCartIcon } from "./utils.js";

//!html den elemanlari cekme 
const menuIcon = document.querySelector("#menu-icon");

const menu = document.querySelector(".navbar");

menuIcon.addEventListener("click", () => {
    menu.classList.toggle("open-menu");
});
// Ana sayfa ve cart sayfasinda yapilacak islemleri ayir.
document.addEventListener("DOMContentLoaded", async () => {
    const cart = getFromLocalStorage();
    //console.log(window);
    //tarayicida ana sayfada mi cart sayfasinda mi?
    if(window.location.pathname.includes('cart.html')){
        // console.log(`Cart sayfasi`);
        renderCartItems();
        displayCartTotal();
        
    }
    else{
        // console.log(`Ana sayfasi`);
        const product = await fetchProducts();
        // console.log(product);

        //buradaki arrow function addToCallBack fonskyionu oluyor.
        renderProducts(product, (event) => addToCart(event, product));
    }
    //sepettkei ikonu guncelle
    updateCartIcon(cart);
});