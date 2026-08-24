document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector("#product-details");
  const message = document.querySelector("#product-message");
  const productId = new URLSearchParams(window.location.search).get("id");
  const product = Store.getProductById(productId);

  if (!product) {
    container.innerHTML = `
      <div class="product-not-found">
        <h1>Nie znaleziono produktu</h1>
        <p>Ten produkt nie istnieje.</p>
        <a class="button" href="../sklep/">Wróć do sklepu</a>
      </div>
    `;
    return;
  }

  document.title = `${product.name} | projektDemo`;

  container.innerHTML = `
    <div class="product-detail-image">${product.emoji}</div>
    <div class="product-detail-info">
      <p class="product-category">${product.category}</p>
      <h1>${product.name}</h1>
      <p class="product-detail-description">${product.description}</p>
      <p class="product-detail-price">${Store.money(product.price)}</p>
      <div class="product-status">✓ Produkt dostępny</div>
      <button class="add-to-cart product-add-button" type="button">
        Dodaj do koszyka
      </button>
    </div>
  `;

  Store.track("view_item", {
    currency: "PLN",
    value: product.price,
    items: [Store.toGaItem(product, 1)]
  });

  const button = container.querySelector(".product-add-button");
  button.addEventListener("click", function () {
    Store.addToCart(product.id);
    message.textContent = `${product.name} dodano do koszyka.`;
    button.textContent = "Dodano ✓";

    setTimeout(function () {
      button.textContent = "Dodaj do koszyka";
    }, 800);
  });
});
