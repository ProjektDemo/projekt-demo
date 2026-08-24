document.addEventListener(
  "DOMContentLoaded",
  function () {

    const form =
      document.querySelector(
        "#checkout-form"
      );

    const content =
      document.querySelector(
        "#checkout-content"
      );

    const empty =
      document.querySelector(
        "#checkout-empty"
      );

    const itemsElement =
      document.querySelector(
        "#checkout-items"
      );

    const totalElement =
      document.querySelector(
        "#checkout-total"
      );


    const items =
      Store.getDetailedCart();


    if (items.length === 0) {

      content.hidden = true;
      empty.hidden = false;

      return;

    }


    const total =
      Store.getCartTotal();


    itemsElement.innerHTML =
      items
        .map(item => {

          return `
            <div class="checkout-item">

              <span>
                ${item.name}
                × ${item.quantity}
              </span>

              <strong>
                ${Store.money(item.total)}
              </strong>

            </div>
          `;

        })
        .join("");


    totalElement.textContent =
      Store.money(total);


    Store.track(
      "begin_checkout",
      {
        currency: "PLN",

        value: total,

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


    form.addEventListener(
      "submit",
      function (event) {

        event.preventDefault();


        if (!form.checkValidity()) {

          form.reportValidity();

          return;

        }


        const orderId =
          "PD-" +
          Date.now()
            .toString()
            .slice(-8);


        const order = {

          id: orderId,

          currency: "PLN",

          value: total,

          items:
            items.map(
              item =>
                Store.toGaItem(
                  item,
                  item.quantity
                )
            ),

          purchaseTracked: false

        };


        sessionStorage.setItem(
          "projektDemoLastOrder",
          JSON.stringify(order)
        );


        Store.clearCart();


        window.location.href =
          "../dziekujemy/";

      }
    );

  }
);