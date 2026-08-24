document.addEventListener(
  "DOMContentLoaded",
  function () {

    const itemsContainer =
      document.querySelector(
        "#cart-items"
      );

    const empty =
      document.querySelector(
        "#cart-empty"
      );

    const content =
      document.querySelector(
        "#cart-content"
      );

    const total =
      document.querySelector(
        "#cart-total"
      );

    const grandTotal =
      document.querySelector(
        "#cart-grand-total"
      );


    let viewCartTracked = false;


    function renderCart() {

      const items =
        Store.getDetailedCart();


      if (items.length === 0) {

        empty.hidden = false;
        content.hidden = true;

        return;

      }


      empty.hidden = true;
      content.hidden = false;


      itemsContainer.innerHTML =
        items
          .map(item => {

            return `
              <article class="cart-item">

                <div class="cart-item-image">
                  ${item.emoji}
                </div>

                <div class="cart-item-info">

                  <h2>
                    ${item.name}
                  </h2>

                  <p>
                    ${Store.money(item.price)}
                  </p>

                  <button
                    class="remove-button"
                    data-action="remove"
                    data-product-id="${item.id}"
                  >
                    Usuń
                  </button>

                </div>


                <div class="quantity-control">

                  <button
                    data-action="decrease"
                    data-product-id="${item.id}"
                    aria-label="Zmniejsz ilość"
                  >
                    −
                  </button>

                  <span>
                    ${item.quantity}
                  </span>

                  <button
                    data-action="increase"
                    data-product-id="${item.id}"
                    aria-label="Zwiększ ilość"
                  >
                    +
                  </button>

                </div>


                <strong class="cart-item-total">

                  ${Store.money(item.total)}

                </strong>

              </article>
            `;

          })
          .join("");


      const cartTotal =
        Store.getCartTotal();


      total.textContent =
        Store.money(cartTotal);

      grandTotal.textContent =
        Store.money(cartTotal);


      if (!viewCartTracked) {

        Store.track(
          "view_cart",
          {
            currency: "PLN",

            value: cartTotal,

            items:
              items.map(
                item =>
                  Store.toGaItem(
                    item,
                    item.quantity
                  )
              )
          }
        );

        viewCartTracked = true;

      }

    }


    itemsContainer.addEventListener(
      "click",
      function (event) {

        const button =
          event.target.closest(
            "button[data-action]"
          );

        if (!button) {
          return;
        }


        const productId =
          button.dataset.productId;

        const action =
          button.dataset.action;


        if (action === "increase") {

          Store.changeQuantity(
            productId,
            1
          );

        }


        if (action === "decrease") {

          Store.changeQuantity(
            productId,
            -1
          );

        }


        if (action === "remove") {

          Store.removeFromCart(
            productId
          );

        }

      }
    );


    window.addEventListener(
      "cart:updated",
      renderCart
    );


    renderCart();

  }
);