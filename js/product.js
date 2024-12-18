// veriyi api dan alan fonksiyon.
export const fetchProducts = async () => {
    try {
        //API a istek at
        const response = await fetch("db.json");
        // console.log(response);
        //hata durumunu kontrol et

        if (!response.ok) {
            //hata varsa throw methodu ile hata firlat.
            throw new Error("URL Yanlis");
        }
        //hata yoksa return ile veriyi return et.
        return await response.json();
    } catch (error) {
        // hata varsa bunu konsola yazdir.
        console.error(error);
        return [];
    }
};

// urunleri render eden fonksiyon.
export const renderProducts = (products, addToCartCallBack) => {
    //*html de urunlerin listeleme yapacagin kismi sec
    const productList = document.querySelector("#productList");
    // urunleri ekrana yansit.
    // console.log(products);
    productList.innerHTML = products.map((product) =>
        `
    <div class="product">
          <img
            width="200"
            src="${product.image}"
          />
          <div class="product-info">
            <h2 class="product-tittle">${product.title}</h2>
            <p class="product-price">$${product.price}</p>
            <button class="add-to-cart" data-id='${product.id}'>Add To Cart</button>
          </div>
        </div>
    `)
        .join("");

    // add to cart butonlarina eris
    const addToCartButtons = document.getElementsByClassName("add-to-cart");

    // *her bir add to cart butonuna tiklanma eylemi ekleniyor
    for (let i = 0; i < addToCartButtons.length; i++) {
        const addToCartButton = addToCartButtons[i];
        addToCartButton.addEventListener("click", addToCartCallBack);
    }

};