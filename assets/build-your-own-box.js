// ===================================
// GLOBAL DATA
// ===================================

let dataRaw = {
  addons: new Set(),
  cupcakes: new Map(),
  maxCupcakes: 0,
  basePrice: 0,
  totalPrice: 0,

  cupcakeLength() {
    return measureCupcakeLength(this.cupcakes);
  },

  variant() {
    return "cupcake-box-" + this.maxCupcakes; // Replace this with variant id.
  },

  reset() {
    this.addons = new Set();
    this.cupcakes = new Map();
  },
};

function measureCupcakeLength(cupcakes) {
  let length = 0;
  for (const [_, amount] of cupcakes.entries()) {
    length += amount;
  }
  return length;
}

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
      saveToLocalStorage();
      break;
    case "cupcakes":
      updateCupcakeCounters();
      rerenderCupcakePreview();
      saveToLocalStorage();
      checkBoxIsValid();
      canReset();
      const wasMax = measureCupcakeLength(oldValue) == data.maxCupcakes;
      const isMax = measureCupcakeLength(newValue) == data.maxCupcakes;
      if (isMax || wasMax) {
        clickAllCakeBtns();
      }
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

// ===================================
// SAVE TO LOCAL STORAGE
// ===================================

function saveToLocalStorage() {
  const dataToStore = {
    addons: Array.from(dataRaw.addons),
    cupcakes: Array.from(dataRaw.cupcakes.entries()),
  };
  localStorage.setItem(data.variant(), JSON.stringify(dataToStore));
}

function getFromLocalStorage() {
  const stored = localStorage.getItem(data.variant());
  if (stored) {
    const dataToLoad = JSON.parse(stored);
    data.addons = new Set(dataToLoad.addons);
    data.cupcakes = new Map(dataToLoad.cupcakes);
    recheckAddons();
    cupcakeElements.forEach(function (element) {
      element.click();
    });
  }
}

// ===================================
// PRICE
// ===================================

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

// ===================================
// ADDONS
// ===================================

const addonElements = document.querySelectorAll("[data-addon-id]");
addonElements.forEach(function (element) {
  element.addEventListener("change", function () {
    const addonId = this.getAttribute("data-addon-id");
    const currentAddons = new Set(data.addons);

    if (this.checked) {
      currentAddons.add(addonId);
    } else {
      currentAddons.delete(addonId);
    }

    data.addons = currentAddons;
  });
});
// Needed to restore state from storage.
function recheckAddons() {
  data.addons.forEach(function (addonId) {
    const addonElement = document.querySelector(`[data-addon-id="${addonId}"]`);
    if (addonElement) {
      addonElement.checked = true;
    }
  });
}

// ===================================
// CUPCAKES
// ===================================

function updateCupcakeCounters() {
  const cupcakeCounter = document.querySelector("#cupcake-counter");
  cupcakeCounter.textContent = data.cupcakeLength();
  cupcakeElements.forEach(function (element) {
    const cupcakeId = element.getAttribute("data-cupcake-id");
    const count = data.cupcakes.get(cupcakeId) || 0;
    const counter = element.querySelector('[data-role="count"]');
    counter.textContent = count;
  });
}

function rerenderCupcakePreview() {
  const cupcakePreview = document.querySelector("#cupcake-preview");
  cupcakePreview.innerHTML = "";
  for (const [id, value] of data.cupcakes.entries()) {
    const image = document.querySelector(`[data-cupcake-image="${id}"]`);
    for (let i = 0; i < value; i++) {
      cupcakePreview.appendChild(image.cloneNode(true));
    }
  }
  const emptyCount = data.maxCupcakes - data.cupcakeLength();
  const emptyImage = document.querySelector(`#empty-cupcake-image`);
  for (let i = 0; i < emptyCount; i++) {
    cupcakePreview.appendChild(emptyImage.cloneNode(true));
  }
}

function cullCupcakes() {
  if (data.cupcakes.length > data.maxCupcakes) {
    data.cupcakes = data.cupcakes.slice(0, data.maxCupcakes);
  }
}

const cupcakeElements = document.querySelectorAll("[data-cupcake-id]");
cupcakeElements.forEach(function (element) {
  const cupcakeId = element.getAttribute("data-cupcake-id");
  const stock = parseInt(element.getAttribute("data-cupcake-stock"));
  const minusBtn = element.querySelector('[data-action="decrement"]');
  const plusBtn = element.querySelector('[data-action="increment"]');
  const counter = element.querySelector('[data-role="count"]');

  element.addEventListener("click", function (event) {
    const prevCount = data.cupcakes.get(cupcakeId) || 0;

    if (event.target.dataset.action === "increment") {
      const currentCupcakes = new Map(data.cupcakes);
      currentCupcakes.set(cupcakeId, prevCount + 1);
      data.cupcakes = currentCupcakes;
    } else if (event.target.dataset.action === "decrement") {
      const currentCupcakes = new Map(data.cupcakes);
      if (prevCount > 0) {
        currentCupcakes.set(cupcakeId, prevCount - 1);
      }
      data.cupcakes = currentCupcakes;
    }
    const count = data.cupcakes.get(cupcakeId) || 0;
    plusBtn.disabled =
      count >= stock || data.cupcakeLength() >= data.maxCupcakes;
    minusBtn.disabled = count < 1;
    counter.innerHTML = count;
  });
});

function clickAllCakeBtns() {
  cupcakeElements.forEach(function (element) {
    element.click();
  });
}

// ===================================
// RESET
// ===================================

const resetBtn = document.querySelector("#reset-gift-box");
resetBtn.addEventListener("click", function () {
  data.reset();
});
function canReset() {
  resetBtn.disabled = data.cupcakeLength() === 0;
}

// ===================================
// ADD TO CART
// ===================================

const addToCartBtn = document.querySelector("#add-to-cart");
addToCartBtn.addEventListener("click", async function () {
  const dataToCart = {
    id: data.variant(),
    quantity: 1,
    properties: new Map(),
  };
  for (const [id, value] of data.cupcakes.entries()) {
    const name = document.querySelector(
      `[data-cupcake-name="${id}"]`,
    ).innerText;
    dataToCart.properties.set(name, value);
  }
  for (const addonId of data.addons) {
    const element = document.querySelector(`[data-addon-id="${addonId}"]`);
    const name = element.getAttribute("data-addon-name");
    dataToCart.properties.set("Addon: " + name, true);
  }
  try {
    data.reset();
    const response = await fetch("/cart/add.js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [dataToCart],
      }),
    });
    if (response.status === 200) {
      console.log("Success, added box to cart!");
    } else {
      console.error(`Error ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

// Checks whether the box is valid (cupcakes + addons) and then enables / disables
// the add to cart button.
function checkBoxIsValid() {
  addToCartBtn.disabled = data.cupcakeLength() != data.maxCupcakes;
}

// ===================================
// ON DOM LOAD
// ===================================

document.addEventListener("DOMContentLoaded", function () {
  readBoxLayout();
  getFromLocalStorage();
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
