let dataRaw = {
  addons: new Set(),
  cupcakes: new Map(),
  maxCupcakes: 0,
  basePrice: 0,
  totalPrice: 0,

  cupcakeLength() {
    let length = 0;
    for (const [_, amount] of this.cupcakes.entries()) {
      length += amount;
    }
    return length;
  },

  name() {
    return "cupcake-box-" + this.maxCupcakes;
  },
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
      saveToLocalStorage();
      break;
    case "cupcakes":
      updateCupcakeCounters();
      rerenderCupcakePreview();
      saveToLocalStorage();
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

function saveToLocalStorage() {
  const dataToStore = {
    addons: Array.from(dataRaw.addons),
    cupcakes: Array.from(dataRaw.cupcakes.entries()),
  };
  localStorage.setItem(data.name(), JSON.stringify(dataToStore));
}

function getFromLocalStorage() {
  const stored = localStorage.getItem(data.name());
  if (stored) {
    const dataToLoad = JSON.parse(stored);
    data.addons = new Set(dataToLoad.addons);
    data.cupcakes = new Map(dataToLoad.cupcakes);
  }
}

function updateCupcakeCounters() {
  const cupcakeCounter = document.querySelector("#cupcake-counter");
  cupcakeCounter.textContent = data.cupcakeLength();
  cupcakeElements.forEach(function (e) {
    const cupcakeId = e.getAttribute("data-cupcake-id");
    const count = data.cupcakes.get(cupcakeId) || 0;
    const counter = e.querySelector('[data-role="count"]');
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

const cupcakeElements = document.querySelectorAll("[data-cupcake-id]");
cupcakeElements.forEach(function (element) {
  // Capture cupcake stock so that it doesn't change from underneath
  // the user (if it even can).
  const stock = parseInt(element.getAttribute("data-cupcake-stock"));
  const cupcakeId = element.getAttribute("data-cupcake-id");
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
