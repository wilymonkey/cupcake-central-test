let dataRaw = {
  addons: new Set(),
  cupcakes: [],
  maxCupcakes: 0,
  basePrice: 0,
  totalPrice: 0,
};

const handler = {
  set(obj, prop, value) {
    const oldValue = obj[prop];
    obj[prop] = value;
    onPropertyChange(prop, oldValue, value);
    return true;
  },
};

function onPropertyChange(property, oldValue, newValue) {
  switch (property) {
    case "addons":
      recalculateTotalPrice();
      break;
    case "cupcakes":
      updateCupcakeCounter();
      break;
    case "maxCupcakes":
      cullCupcakes();
      break;
    case "basePrice":
      recalculateTotalPrice();
      break;
    case "totalPrice":
      updateTotalView();
      break;
  }
}

const data = new Proxy(dataRaw, handler);

function updateCupcakeCounter() {
  document.querySelector("#cupcake-counter").textContent = data.cupcakes.length;
}

function cullCupcakes() {
  if (data.cupcakes.length > data.maxCupcakes) {
    data.cupcakes = data.cupcakes.slice(0, data.maxCupcakes);
  }
}

function recalculateTotalPrice() {
  if (data.basePrice == 0) return readBoxLayout();

  let total = data.basePrice;
  data.addons.forEach((addonId) => {
    const addon = document.querySelector(`[data-addon-id="${addonId}"]`);
    total += parseInt(addon.getAttribute("data-addon-price"));
  });
  data.totalPrice = total;
}

function updateTotalView() {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "AUD",
  });
  document.querySelector("#total-price").textContent = formatter.format(
    data.totalPrice / 100,
  );
}

const addonElements = document.querySelectorAll("[data-addon-id]");
addonElements.forEach(function (element) {
  element.addEventListener("change", function () {
    const addonId = this.getAttribute("data-addon-id"); // ← use the real ID
    const currentAddons = new Set(data.addons); // copy the current Set

    if (this.checked) {
      currentAddons.add(addonId);
    } else {
      currentAddons.delete(addonId);
    }

    data.addons = currentAddons; // ← this triggers the Proxy set trap
  });
});

const cupcakeElements = document.querySelectorAll("[data-cupcake-id]");
cupcakeElements.forEach(function (e) {
  e.addEventListener("click", function () {
    const stock = e.getAttribute("data-cupcake-stock");
    const minusBtn = container.querySelector('[data-action="decrement"]');
    const plusBtn = container.querySelector('[data-action="increment"]');

    if (e.target.dataset.action === "increment") {
      const cupcakeId = e.getAttribute("data-cupcake-id");
      const currentCupcakes = new Set(data.cupcakes);
      currentCupcakes.add(cupcakeId);
      data.cupcakes = currentCupcakes;
    } else if (e.target.dataset.action === "decrement") {
      const cupcakeId = e.getAttribute("data-cupcake-id");
      const currentCupcakes = new Set(data.cupcakes);
      currentCupcakes.delete(cupcakeId);
      data.cupcakes = currentCupcakes;
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  readBoxLayout();
});

function readBoxLayout() {
  const boxQuantity = document
    .querySelector("[data-box-quantity]")
    .getAttribute("data-box-quantity");
  const boxPrice = document
    .querySelector("[data-box-price]")
    .getAttribute("data-box-price");
  data.maxCupcakes = parseInt(boxQuantity);
  data.basePrice = parseInt(boxPrice);
}
