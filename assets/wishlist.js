let products = [];
window.addEventListener("load", async function () {
  if (document.location.href.includes("wishlist")) {
    await getWishlist();
    await drawWishlist();
  }

  if (
    document.location.href.includes("https://cupcakecentral.com.au/account")
  ) {
    const customer_id = document.getElementById(
      "wishlist-customer-id"
    ).textContent;
    const product_id = localStorage.getItem("wishlist_product_id");
    const page_url = localStorage.getItem("wishlist_product_page_url");
    if (product_id && customer_id) {
      await updateWishlist(customer_id, product_id).then(() => {
        window.location.replace(page_url);
        localStorage.removeItem("wishlist_product_id");
        localStorage.removeItem("wishlist_product_page_url");
      });
    }
  }
});

async function drawWishlist() {
  let html = "";
  products.forEach((product, index) => {
    html += `<li class="grid__item scroll-trigger animate--slide-in product-card" data-cascade="">
        <link href="//cupcakecentral.com.au/cdn/shop/t/138/assets/component-rating.css?v=157771854592137137841705876572" rel="stylesheet" type="text/css" media="all">
        <link href="//cupcakecentral.com.au/cdn/shop/t/138/assets/component-volume-pricing.css?v=56284703641257077881705876572" rel="stylesheet" type="text/css" media="all">
          <div class="card-wrapper product-card-wrapper underline-links-hover">
          <div class="card card--standard card--media" style="--ratio-percent: 100.0%;">
    <div class="card__inner color-scheme-2 gradient ratio" style="--ratio-percent: 100.0%;"><div class="card__media">
          <div class="media media--transparent media--hover-effect">`;
    if (product.images[0]) {
      html +=
        `<img srcset="` +
        product.images[0].src +
        `&amp;width=165 165w,` +
        product.images[0].src +
        `&amp;width=360 360w,` +
        product.images[0].src +
        `&amp;width=533 533w,` +
        product.images[0].src +
        ` 568w
              " src="` +
        product.images[0].src +
        `&amp;width=533" sizes="(min-width: 1600px) 367px, (min-width: 990px) calc((100vw - 130px) / 4), (min-width: 750px) calc((100vw - 120px) / 3), calc((100vw - 35px) / 2)" alt="30 Birthday Mini Cupcake Gift Box -  Cupcake Central" class="motion-reduce" loading="lazy" width="568" height="568" data-xblocker="passed" style="visibility: visible;">`;
    }
    if (product.images[1]) {
      html +=
        `<img srcset="` +
        product.images[1].src +
        `&amp;width=165 165w,` +
        product.images[1].src +
        `&amp;width=360 360w,` +
        product.images[1].src +
        `&amp;width=533 533w,` +
        product.images[1].src +
        ` 568w
                " src="` +
        product.images[1].src +
        `&amp;width=533" sizes="(min-width: 1600px) 367px, (min-width: 990px) calc((100vw - 130px) / 4), (min-width: 750px) calc((100vw - 120px) / 3), calc((100vw - 35px) / 2)" alt="" class="motion-reduce" loading="lazy" width="568" height="568" data-xblocker="passed" style="visibility: visible;">`;
    }
    html +=
      `</div>
        </div><div class="card__content">
        <div class="card__information">
          <h3 class="card__heading">
            <a href="/products/` +
      product.handle +
      `" id="StandardCardNoMediaLink-template--15676578791484__product-grid-7110651215932" class="full-unstyled-link" aria-labelledby="StandardCardNoMediaLink-template--15676578791484__product-grid-7110651215932 NoMediaStandardBadge-template--15676578791484__product-grid-7110651215932">
              30 Birthday Mini Cupcake Gift Box
            </a>
          </h3>
        </div>
      </div>
    </div>
    <div class="card__content">
      <div class="card__information">
        <h3 class="card__heading h5" id="title-template--15676578791484__product-grid-7110651215932">
          <a href="/products/` +
      product.handle +
      `" id="CardLink-template--15676578791484__product-grid-7110651215932" class="full-unstyled-link" aria-labelledby="CardLink-template--15676578791484__product-grid-7110651215932 Badge-template--15676578791484__product-grid-7110651215932">` +
      product.title +
      `</a>
        </h3>
        <div class="card-information">
<div class="price  price--on-sale">
<div class="price__container"><div class="price__regular"><span class="visually-hidden visually-hidden--inline">Regular price</span>
      <span class="price-item price-item--regular">
        $` +
      product.variants[0].price +
      `
      </span></div>
  <div class="price__sale">
      <span class="visually-hidden visually-hidden--inline">Regular price</span>
      <span>
        <s class="price-item price-item--regular">
          
            $` +
      product.variants[0].compare_at_price +
      `
          
        </s>
      </span><span class="visually-hidden visually-hidden--inline">Sale price</span>
    <span class="price-item price-item--sale price-item--last">
      $` +
      product.variants[0].price +
      `
    </span>
  </div>
  <small class="unit-price caption hidden">
    <span class="visually-hidden">Unit price</span>
    <span class="price-item price-item--last">
      <span></span>
      <span aria-hidden="true">/</span>
      <span class="visually-hidden">&nbsp;per&nbsp;</span>
      <span>
      </span>
    </span>
  </small>
</div></div>

</div>
      </div><div class="quick-add no-js-hidden"><product-form data-section-id="template--15676578791484__product-grid"><form method="post" action="/cart/add" id="quick-add-template--15676578791484__product-grid7110651215932" accept-charset="UTF-8" class="form" enctype="multipart/form-data" novalidate="novalidate" data-type="add-to-cart-form"><input type="hidden" name="form_type" value="product"><input type="hidden" name="utf8" value="✓"><input type="hidden" name="id" value="40588557156412" class="product-variant-id">
                  <button id="quick-add-template--15676578791484__product-grid7110651215932-submit" type="submit" name="add" class="quick-add__submit button button--full-width button--secondary" aria-haspopup="dialog" aria-labelledby="quick-add-template--15676578791484__product-grid7110651215932-submit title-template--15676578791484__product-grid-7110651215932" aria-live="polite" data-sold-out-message="true" fdprocessedid="dhhubr">
                    <span>Add to cart
</span>
                    <span class="sold-out-message hidden">
                      Sold out
                    </span>

<link href="//cupcakecentral.com.au/cdn/shop/t/138/assets/component-loading-spinner.css?v=116724955567955766481705876572" rel="stylesheet" type="text/css" media="all">

<div class="loading__spinner hidden">
<svg aria-hidden="true" focusable="false" class="spinner" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
  <circle class="path" fill="none" stroke-width="6" cx="33" cy="33" r="30"></circle>
</svg>
</div>
</button><input type="hidden" name="product-id" value="7110651215932"><input type="hidden" name="section-id" value="template--15676578791484__product-grid"></form></product-form></div><div class="card__badge top left"><span id="Badge-template--15676578791484__product-grid-7110651215932" class="badge badge--bottom-left color-scheme-5">Sale</span></div>
    </div>
  </div>
</div>
              </li>`;
  });
  document.getElementById("product-grid").innerHTML = html;
}

async function getWishlist() {
  const customer_id = document.getElementById(
    "wishlist-customer-id"
  ).textContent;
  if (customer_id) {
    const data = {
      customer_id: customer_id,
    };
    const response = await fetch(
      "https://counted-furnishings-pcs-widescreen.trycloudflare.com/cupcake/getWishlist",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    const res = await response.json();

    products = res.products;
  } else {
    // setPopup(0);
    location.replace("/account/login");
  }
}

async function updateWishlist(customer_id, product_id) {
  const data = {
    customer_id: customer_id,
    product_id: product_id,
  };
  const response = await fetch(
    "https://counted-furnishings-pcs-widescreen.trycloudflare.com/cupcake/updateWishlist",
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    }
  );
}

async function handleWishlistClick(event) {
  event.stopPropagation();
  event.preventDefault();
  var productId = event.currentTarget.id;
  const button = event.currentTarget;

  const customer_id = document.getElementById(
    "wishlist-customer-id"
  ).textContent;

  if (customer_id) {
    const iconHeart = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="heart_1" data-name="heart 1" width="30" viewBox="0 0 412 384">
                          <g id="heart_1-2" data-name="heart 1">
                            <image width="412" height="384" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZwAAAGACAYAAACZVdTZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAydpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMS1jMDAxIDc5LjE0NjI4OTk3NzcsIDIwMjMvMDYvMjUtMjM6NTc6MTQgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyNS4xIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGRTJFMjg3RThGRkQxMUVFOEM0QUQyQTNFRkQ4RTNBOCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGRTJFMjg3RjhGRkQxMUVFOEM0QUQyQTNFRkQ4RTNBOCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkZFMkUyODdDOEZGRDExRUU4QzRBRDJBM0VGRDhFM0E4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkZFMkUyODdEOEZGRDExRUU4QzRBRDJBM0VGRDhFM0E4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+l/Q19QAAGvhJREFUeNrs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"/>
                          </g>
                        </svg>`;
    const iconHeartEmpty = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="heart_2" data-name="heart 2" width="30" viewBox="0 0 412 384" class="icon-heart-empty">
                                <g id="heart_2-2" data-name="heart 2">
                                  <image width="412" height="384" xlink:href="data:image/png;base64,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"/>
                                </g>
                              </svg>`;

    const wishlistIcon = button.querySelector(".wishlist-icon");

    if (wishlistIcon.innerHTML.includes("icon-heart-empty")) {
      wishlistIcon.innerHTML = iconHeart;
    } else {
      wishlistIcon.innerHTML = iconHeartEmpty;
    }

    await updateWishlist(customer_id, productId).then(() => {});
  } else {
    localStorage.setItem("wishlist_product_id", productId);
    localStorage.setItem("wishlist_product_page_url", window.location.href);
    // setPopup(0);
    location.replace("/account/login");
  }
}

const popup = document.getElementById("popup");
const closeBtn = document.getElementById("closeBtn");

function setPopup(status) {
  var html = ``;
  if (status == 0) {
    html = `<img style="width: 50px; height: 50px; margin-top: 30px;" src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAACCCAMAAAC93eDPAAAAaVBMVEX///8AAADz8/Pq6ur6+vrh4eH39/fk5OTw8PDb29tubm5bW1tOTk7Y2Njn5+cgICCFhYVTU1NISEh0dHQtLS1lZWXBwcGOjo6enp7Ozs4nJyd+fn4bGxs/Pz8PDw+2trY0NDSpqamWlpZJpol+AAAEQ0lEQVR4nO1b2bKiMBC9AgaI7Moqi/j/HzkmDS53BOnQcWqqOI+ahEN679afnw0bNmzYsGHDBq1ghuMY7F893XL7iMdJ0yQxj3rX+vrzO97uXsG7b7Jwz7u3OPpfIhAcf1/A01XY32BQvDwzvFzClw8K7QSCy+ON+9KBD52yP94/Pmm+iG58UJr9MkWWpeN3nU4GoxDSt3rnc/3CGBi05dSCsoYVuWYG57k1Eay56mHQLZJ0Bqt6HQx8ODv7tK6EdTq81GkZg5FDSO+uo+X2ln1WGRXsMVp21SIK6XeSpasTsfpAywDk6y5dvl+qNwgckNLNxXqPkoErTqz3yzfYIbU2SL94xOyIqH1kjdIEAdAGOgamlCzK11hSexCi+4BOIfoVtJFCZquTEfo9fFIPCZeK3SX2xFRVjiHyxRq7S4S10CGiYCr5GenSTUoKKK8gEJFTiLC7ckqrtJUy0hztzmZgKtkX6S1ICil215lSFxxRxjbYXQklBdaouCbB+2IQUfjhCi9kSOmRpdFXhZCjEtpmUCr4pog2e7TEcS3K3zuV2EOmCoO/R7UNMur8VR6YYHTLQ5P+AHZCSlZyJgvVEtLbXpavT5Qi2yzMCpWUy8SxJu57FZhKFVUDLwaTzb5mkXQdqYsVoUUCoGmwKF5yDUWtBPQ4FlTs0H8k73AIHOAePtwvgzuItbTlgwYOn82EAiB6oSvlXiBzyPmY2Q1Nek0Mbq8IXbddMmGcfgzfh9oY3DgMz2hT/y9ZW/44qPE0Mrgp273pfyjsZxZ2cRi/4eQO4Rfu44DbffO877qs63NePT7VOgoAGNFuBmfS6DiJfTJFoKGqnuZhFOnkeKxNC/234B+nHn/XRmQ7Bokyfnla6MWHG2LvdUiX6CNh88djqviauTZjN8O0GAvcrIhPj29TTZ7haUCZl29EbpT5Y4WOyZB9f0k+kwmUd1WpyY1j9Ejt+UNGGESjvRCPp8Y5ebrg3dxRZdDtqTkMhlAtVPVyjKhkeYsJuQomFxuc+CWgYRB4oAWofDSDuW1CUkswiAgt8rAAgmdDEblBDzz0UQwSiMUjtWmALaQK/ewhl+ZrGfRwB0rxz4B7WPlTAqgOa8WevgXGuW5KBmcoq7UpPSV6jvAMmPyuqA6hEl3ReIPaZVWnAl5CPWRJla7WeVnZFEA3sEfAoHplCuSvkmVMYtbnFQ5KXkK7OvPY1+rXwFfrIkCmc7HKTkcKkWCgYCr7Fvy0fgpSGxTyWSsmMAeANIoGb9syOlQUDAbfgNfrYqVnJTgrJZPDYN7oH/g4zdoQ9wxRc56wqayvRHwKXOVKM4J85wGZe2Grq3xlovCKElmGSBxI4sOIvVAG7Lz3pKJAk5DKjXUyohBJyH5vz0RBhvwFpCEiLGE3XcoVeakNTaAekSsIYh/XnPB/D+wYeuhygpHpIsD8Z3/k2LBhw4YNGzb8//gDhw8q3iOHF+wAAAAASUVORK5CYII='/>
            <p>
                You should log in.
            </p>
            <a href="https://cupcakecentral.com.au//account/login" onClick="closePopup()" class="view-btn">Log in</a>`;
  }

  document.getElementById("popup-content").innerHTML = html;
  popup.style.display = "block";
}

function closePopup() {
  popup.style.display = "none";
}
