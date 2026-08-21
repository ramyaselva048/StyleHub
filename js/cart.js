/* =========================================================
   STYLEHUB - CART.JS
   Complete Working Cart System
   ========================================================= */

const CART_KEY = "stylehubCart";
const FREE_SHIPPING_LIMIT = 3000;
const SHIPPING_CHARGE = 99;
const TAX_RATE = 0.05;


/* =========================================================
   GET CART
   ========================================================= */

function getCart() {

    try {

        const savedCart =
            localStorage.getItem(CART_KEY);

        if (!savedCart) {
            return [];
        }

        const cart =
            JSON.parse(savedCart);

        return Array.isArray(cart)
            ? cart
            : [];

    } catch (error) {

        console.error(
            "Error loading cart:",
            error
        );

        return [];
    }
}


/* =========================================================
   SAVE CART
   ========================================================= */

function saveCart(cart) {

    if (!Array.isArray(cart)) {
        cart = [];
    }

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );

    updateCartCount();
}


/* =========================================================
   PRICE FORMAT
   ========================================================= */

function formatPrice(price) {

    return "₹" +
        Number(price || 0)
            .toLocaleString("en-IN", {
                maximumFractionDigits: 0
            });

}


/* =========================================================
   CART COUNT
   ========================================================= */

function updateCartCount() {

    const cart = getCart();

    const count =
        cart.reduce(
            (total, item) => {

                return total +
                    Number(
                        item.quantity || 1
                    );

            },
            0
        );


    document
        .querySelectorAll(
            "#cart-count, .cart-count"
        )
        .forEach(element => {

            element.textContent =
                count;

        });

}


/* =========================================================
   ADD PRODUCT TO CART
   ========================================================= */

function addToCart(product) {

    if (!product) {

        console.error(
            "Product not found."
        );

        return;

    }


    const cart =
        getCart();


    const productId =
        product.id ||
        product.productId;


    if (
        productId === undefined ||
        productId === null
    ) {

        console.error(
            "Product ID missing."
        );

        return;

    }


    const existingProduct =
        cart.find(
            item =>
                String(item.id) ===
                String(productId)
        );


    if (existingProduct) {

        existingProduct.quantity =
            Number(
                existingProduct.quantity || 1
            ) + 1;

    } else {

        cart.push({

            id:
                productId,

            name:
                product.name ||
                "Product",

            price:
                Number(
                    product.price || 0
                ),

            image:
                product.image ||
                product.img ||
                "images/hero.jpg",

            quantity:
                1

        });

    }


    saveCart(cart);

    updateCartCount();


    /* Optional notification */

    showCartMessage(
        "Product added to cart!"
    );

}


/* =========================================================
   ADD PRODUCT USING INDIVIDUAL VALUES
   ========================================================= */

function addProductToCart(
    id,
    name,
    price,
    image
) {

    addToCart({

        id: id,

        name: name,

        price: Number(price),

        image: image

    });

}


/* =========================================================
   CHANGE QUANTITY
   ========================================================= */

function changeQuantity(
    productId,
    change
) {

    const cart =
        getCart();


    const item =
        cart.find(
            product =>
                String(product.id) ===
                String(productId)
        );


    if (!item) {

        console.error(
            "Product not found in cart:",
            productId
        );

        return;

    }


    item.quantity =
        Number(
            item.quantity || 1
        ) +
        Number(change);


    if (
        item.quantity <= 0
    ) {

        removeFromCart(
            productId
        );

        return;

    }


    saveCart(cart);

    renderCart();

}


/* =========================================================
   REMOVE PRODUCT
   ========================================================= */

function removeFromCart(
    productId
) {

    let cart =
        getCart();


    cart =
        cart.filter(
            item =>
                String(item.id) !==
                String(productId)
        );


    saveCart(cart);

    renderCart();

}


/* =========================================================
   REMOVE ITEM ALIAS
   ========================================================= */

function removeCartItem(
    productId
) {

    removeFromCart(
        productId
    );

}


/* =========================================================
   CLEAR CART
   ========================================================= */

function clearCart() {

    localStorage.removeItem(
        CART_KEY
    );

    updateCartCount();

    renderCart();

}


/* =========================================================
   CALCULATE SUBTOTAL
   ========================================================= */

function getCartSubtotal() {

    const cart =
        getCart();


    return cart.reduce(
        (total, item) => {

            return total +
                Number(
                    item.price || 0
                ) *
                Number(
                    item.quantity || 1
                );

        },
        0
    );

}


/* =========================================================
   SHIPPING
   ========================================================= */

function getCartShipping() {

    const subtotal =
        getCartSubtotal();


    if (
        subtotal === 0 ||
        subtotal >= FREE_SHIPPING_LIMIT
    ) {

        return 0;

    }


    return SHIPPING_CHARGE;

}


/* =========================================================
   TAX
   ========================================================= */

function getCartTax() {

    return (
        getCartSubtotal() *
        TAX_RATE
    );

}


/* =========================================================
   GRAND TOTAL
   ========================================================= */

function getCartTotal() {

    return (
        getCartSubtotal() +
        getCartShipping() +
        getCartTax()
    );

}


/* =========================================================
   CART CONTAINER
   ========================================================= */

function getCartContainer() {

    return document.querySelector(
        "#cart-items, " +
        "#cart-products, " +
        ".cart-items, " +
        ".cart-products, " +
        "[data-cart-items]"
    );

}


/* =========================================================
   RENDER CART
   ========================================================= */

function renderCart() {

    const cart =
        getCart();


    updateCartCount();


    const container =
        getCartContainer();


    if (!container) {

        console.warn(
            "Cart container not found."
        );

        return;

    }


    /* EMPTY CART */

    if (
        cart.length === 0
    ) {

        container.innerHTML = `

            <div
                class="empty-cart"
                style="
                    text-align:center;
                    padding:70px 20px;
                    width:100%;
                "
            >

                <div
                    style="
                        font-size:55px;
                        margin-bottom:20px;
                    "
                >
                    🛒
                </div>

                <h2>
                    Your Cart is Empty
                </h2>

                <p
                    style="
                        color:#777;
                        margin:12px 0 25px;
                    "
                >
                    Add some products
                    to your shopping cart.
                </p>

                <a
                    href="products.html"
                    style="
                        display:inline-block;
                        padding:14px 28px;
                        background:#1a1a2e;
                        color:#fff;
                        text-decoration:none;
                        font-weight:700;
                    "
                >
                    SHOP NOW
                </a>

            </div>

        `;


        updateSummary();

        return;

    }


    /* RENDER PRODUCTS */

    container.innerHTML =
        cart.map(
            item => {

                const quantity =
                    Math.max(
                        1,
                        Number(
                            item.quantity || 1
                        )
                    );


                const price =
                    Number(
                        item.price || 0
                    );


                const total =
                    price *
                    quantity;


                return `

                    <div
                        class="cart-item"
                        data-cart-id="${item.id}"
                    >

                        <div
                            class="cart-item-image"
                        >

                            <img
                                src="${
                                    item.image ||
                                    "images/hero.jpg"
                                }"
                                alt="${
                                    item.name ||
                                    "Product"
                                }"
                                onerror="
                                    this.onerror=null;
                                    this.src='images/hero.jpg';
                                "
                            >

                        </div>


                        <div
                            class="cart-item-info"
                        >

                            <h3>
                                ${
                                    item.name ||
                                    "Product"
                                }
                            </h3>

                            <p>
                                ${formatPrice(price)}
                            </p>


                            <button
                                type="button"
                                class="remove-cart-item"
                                data-id="${item.id}"
                            >
                                Remove
                            </button>

                        </div>


                        <div
                            class="cart-quantity"
                        >

                            <button
                                type="button"
                                class="cart-minus"
                                data-id="${item.id}"
                            >
                                −
                            </button>


                            <span>
                                ${quantity}
                            </span>


                            <button
                                type="button"
                                class="cart-plus"
                                data-id="${item.id}"
                            >
                                +
                            </button>

                        </div>


                        <strong>
                            ${formatPrice(total)}
                        </strong>

                    </div>

                `;

            }
        ).join("");


    updateSummary();

}


/* =========================================================
   UPDATE SUMMARY
   ========================================================= */

function updateSummary() {

    const subtotal =
        getCartSubtotal();


    const shipping =
        getCartShipping();


    const tax =
        getCartTax();


    const total =
        getCartTotal();


    const subtotalElements =
        document.querySelectorAll(
            "#cart-subtotal, " +
            "#subtotal, " +
            ".cart-subtotal, " +
            "[data-cart-subtotal]"
        );


    subtotalElements.forEach(
        element => {

            element.textContent =
                formatPrice(
                    subtotal
                );

        }
    );


    const shippingElements =
        document.querySelectorAll(
            "#cart-shipping, " +
            "#shipping, " +
            ".cart-shipping, " +
            "[data-cart-shipping]"
        );


    shippingElements.forEach(
        element => {

            element.textContent =
                shipping === 0
                    ? "FREE"
                    : formatPrice(
                        shipping
                    );

        }
    );


    const taxElements =
        document.querySelectorAll(
            "#cart-tax, " +
            "#tax, " +
            ".cart-tax, " +
            "[data-cart-tax]"
        );


    taxElements.forEach(
        element => {

            element.textContent =
                formatPrice(
                    tax
                );

        }
    );


    const totalElements =
        document.querySelectorAll(
            "#cart-total, " +
            "#grand-total, " +
            ".cart-total, " +
            ".grand-total, " +
            "[data-cart-total]"
        );


    totalElements.forEach(
        element => {

            element.textContent =
                formatPrice(
                    total
                );

        }
    );

}


/* =========================================================
   CHECKOUT BUTTON
   ========================================================= */

function goToCheckout() {

    const cart =
        getCart();


    if (
        !cart ||
        cart.length === 0
    ) {

        alert(
            "Your cart is empty. Add a product first."
        );

        return;

    }


    window.location.href =
        "checkout.html";

}


/* =========================================================
   CLICK EVENTS
   ========================================================= */

document.addEventListener(
    "click",
    function (event) {


        /* PLUS */

        const plus =
            event.target.closest(
                ".cart-plus"
            );


        if (plus) {

            event.preventDefault();

            changeQuantity(
                plus.dataset.id,
                1
            );

            return;

        }


        /* MINUS */

        const minus =
            event.target.closest(
                ".cart-minus"
            );


        if (minus) {

            event.preventDefault();

            changeQuantity(
                minus.dataset.id,
                -1
            );

            return;

        }


        /* REMOVE */

        const remove =
            event.target.closest(
                ".remove-cart-item"
            );


        if (remove) {

            event.preventDefault();

            removeFromCart(
                remove.dataset.id
            );

            return;

        }


        /* CLEAR */

        const clear =
            event.target.closest(
                "#clear-cart, " +
                ".clear-cart, " +
                "[data-clear-cart]"
            );


        if (clear) {

            event.preventDefault();

            clearCart();

            return;

        }


        /* CHECKOUT */

        const checkout =
            event.target.closest(
                "#proceed-checkout, " +
                ".proceed-checkout, " +
                ".proceed-checkout-btn, " +
                "[data-checkout]"
            );


        if (checkout) {

            event.preventDefault();

            goToCheckout();

            return;

        }

    }
);


/* =========================================================
   INITIALIZE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateCartCount();

        renderCart();

    }
);


/* =========================================================
   GLOBAL FUNCTIONS
   ========================================================= */

window.getCart =
    getCart;

window.saveCart =
    saveCart;

window.addToCart =
    addToCart;

window.addProductToCart =
    addProductToCart;

window.changeQuantity =
    changeQuantity;

window.removeFromCart =
    removeFromCart;

window.removeCartItem =
    removeCartItem;

window.clearCart =
    clearCart;

window.getCartSubtotal =
    getCartSubtotal;

window.getCartShipping =
    getCartShipping;

window.getCartTax =
    getCartTax;

window.getCartTotal =
    getCartTotal;

window.updateCartCount =
    updateCartCount;

window.renderCart =
    renderCart;

window.goToCheckout =
    goToCheckout;


/* =========================================================
   SMALL MESSAGE
   ========================================================= */

function showCartMessage(message) {

    const oldMessage =
        document.querySelector(
            ".cart-message"
        );


    if (oldMessage) {
        oldMessage.remove();
    }


    const messageBox =
        document.createElement(
            "div"
        );


    messageBox.className =
        "cart-message";


    messageBox.textContent =
        message;


    messageBox.style.cssText = `
        position:fixed;
        top:25px;
        right:25px;
        z-index:99999;
        background:#1a1a2e;
        color:#fff;
        padding:14px 22px;
        border-radius:4px;
        font-size:14px;
        font-weight:600;
        box-shadow:0 8px 25px rgba(0,0,0,.2);
    `;


    document.body.appendChild(
        messageBox
    );


    setTimeout(
        function () {

            messageBox.remove();

        },
        2000
    );

}
