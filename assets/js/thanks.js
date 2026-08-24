document.addEventListener(
  "DOMContentLoaded",
  function () {

    const orderNumber =
      document.querySelector(
        "#order-number"
      );

    const orderTotal =
      document.querySelector(
        "#order-total"
      );


    const savedOrder =
      sessionStorage.getItem(
        "projektDemoLastOrder"
      );


    if (!savedOrder) {

      orderNumber.textContent =
        "brak danych";

      orderTotal.textContent =
        "—";

      return;

    }


    const order =
      JSON.parse(savedOrder);


    orderNumber.textContent =
      order.id;

    orderTotal.textContent =
      Store.money(order.value);


    if (!order.purchaseTracked) {

      Store.track(
        "purchase",
        {
          transaction_id:
            order.id,

          currency:
            order.currency,

          value:
            order.value,

          items:
            order.items
        }
      );


      order.purchaseTracked =
        true;


      sessionStorage.setItem(
        "projektDemoLastOrder",
        JSON.stringify(order)
      );

    }

  }
);