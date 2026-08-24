document.addEventListener(
  "DOMContentLoaded",
  function () {

    const grid =
      document.querySelector(
        "#product-grid"
      );

    const message =
      document.querySelector(
        "#shop-message"
      );


    if (!grid) {
      return;
    }


    grid.innerHTML =
      window.PRODUCTS
        .map(product => {

          return `
            <article class="product-card">

              <div class="product-image">
                ${product.emoji}
              </div>

              <p class="product-category">
                ${product.category}
              </p>

              <h2>
                ${product.name}
              </h2>

              <p class="product-description">
                ${product.description}
              </p>

              <p class="product-price">
                ${Store.money(product.price)}
              </p>

              <button
                class="add-to-cart"
                data-add-to-cart
                data-product-id="${product.id}"
              >
                Dodaj do koszyka
              </button>

            </article>
          `;

        })
        .join("");


    Store.track(
      "view_item_list",
      {
        item_list_id: "sklep",
        item_list_name: "Sklep",

        items:
          window.PRODUCTS.map(
            product =>
              Store.toGaItem(
                product,
                1
              )
          )
      }
    );


    grid.addEventListener(
      "click",
      function (event) {

        const button =
          event.target.closest(
            "[data-add-to-cart]"
          );

        if (!button) {
          return;
        }


        const productId =
          button.dataset.productId;

        const product =
          Store.getProductById(
            productId
          );


        Store.addToCart(
          productId
        );


        message.textContent =
          `${product.name} dodano do koszyka.`;


        const originalText =
          button.textContent;


        button.textContent =
          "Dodano ✓";


        setTimeout(
          function () {

            button.textContent =
              originalText;

          },
          800
        );

      }
    );

  }
);