(function () {

  const CART_KEY = "projektDemoCart";

  window.dataLayer = window.dataLayer || [];


  function money(value) {
    return new Intl.NumberFormat("pl-PL", {
      style: "currency",
      currency: "PLN"
    }).format(value);
  }


  function getCart() {

    try {

      const cart = JSON.parse(
        localStorage.getItem(CART_KEY) || "[]"
      );

      return Array.isArray(cart) ? cart : [];

    } catch {
      return [];
    }

  }


  function saveCart(cart) {

    localStorage.setItem(
      CART_KEY,
      JSON.stringify(cart)
    );

    updateCartBadge();

    window.dispatchEvent(
      new CustomEvent("cart:updated")
    );

  }


  function getProductById(productId) {

    return (window.PRODUCTS || []).find(
      product => product.id === productId
    );

  }


  function toGaItem(product, quantity = 1) {

    return {
      item_id: product.id,
      item_name: product.name,
      item_category: product.category,
      price: product.price,
      quantity: quantity
    };

  }


  function track(eventName, ecommerce) {

    window.dataLayer.push({
      ecommerce: null
    });

    window.dataLayer.push({
      event: eventName,
      ecommerce: ecommerce
    });

    console.log(
      "dataLayer:",
      eventName,
      ecommerce
    );

  }


  function addToCart(productId, quantity = 1) {

    const product = getProductById(productId);

    if (!product) {
      return;
    }

    const cart = getCart();

    const existingProduct = cart.find(
      item => item.id === productId
    );

    if (existingProduct) {

      existingProduct.quantity += quantity;

    } else {

      cart.push({
        id: productId,
        quantity: quantity
      });

    }

    saveCart(cart);

    track("add_to_cart", {
      currency: "PLN",
      value: product.price * quantity,
      items: [
        toGaItem(product, quantity)
      ]
    });

  }


  function changeQuantity(productId, amount) {

    const cart = getCart();

    const item = cart.find(
      item => item.id === productId
    );

    if (!item) {
      return;
    }

    item.quantity = Math.max(
      1,
      item.quantity + amount
    );

    saveCart(cart);

  }


  function removeFromCart(productId) {

    const cart = getCart();

    const removedItem = cart.find(
      item => item.id === productId
    );

    const product = getProductById(productId);

    const newCart = cart.filter(
      item => item.id !== productId
    );

    saveCart(newCart);

    if (removedItem && product) {

      track("remove_from_cart", {
        currency: "PLN",

        value:
          product.price *
          removedItem.quantity,

        items: [
          toGaItem(
            product,
            removedItem.quantity
          )
        ]
      });

    }

  }


  function clearCart() {

    localStorage.removeItem(CART_KEY);

    updateCartBadge();

    window.dispatchEvent(
      new CustomEvent("cart:updated")
    );

  }


  function getDetailedCart() {

    return getCart()
      .map(item => {

        const product = getProductById(
          item.id
        );

        if (!product) {
          return null;
        }

        return {
          ...product,
          quantity: item.quantity,
          total:
            product.price *
            item.quantity
        };

      })
      .filter(Boolean);

  }


  function getCartCount() {

    return getCart().reduce(
      (sum, item) =>
        sum + item.quantity,
      0
    );

  }


  function getCartTotal() {

    return getDetailedCart().reduce(
      (sum, item) =>
        sum + item.total,
      0
    );

  }


  function updateCartBadge() {

    const count = getCartCount();

    document
      .querySelectorAll(
        "[data-cart-count]"
      )
      .forEach(element => {

        element.textContent = count;

      });

  }


  window.Store = {
    money,
    getCart,
    saveCart,
    getProductById,
    getDetailedCart,
    getCartCount,
    getCartTotal,
    addToCart,
    changeQuantity,
    removeFromCart,
    clearCart,
    track,
    toGaItem,
    updateCartBadge
  };


  document.addEventListener(
    "DOMContentLoaded",
    updateCartBadge
  );


  window.addEventListener(
    "storage",
    updateCartBadge
  );

})();