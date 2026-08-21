/* =========================================================
   STYLEHUB - CHECKOUT.JS
   ========================================================= */

const CHECKOUT_CART_KEY = "stylehubCart";
const SHIPPING_LIMIT = 3000;
const TAX_RATE = 0.05;


/* =========================
   GET CART
========================= */

function getCheckoutCart() {
    try {
        const cart = JSON.parse(
            localStorage.getItem(CHECKOUT_CART_KEY) || "[]"
        );

        return Array.isArray(cart) ? cart : [];

    } catch (error) {
        console.error("Unable to read cart:", error);
        return [];
    }
}


/* =========================
   PRICE FORMAT
========================= */

function checkoutPrice(value) {

    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(Number(value || 0));

}


/* =========================
   SUBTOTAL
========================= */

function getCheckoutSubtotal(cart) {

    return cart.reduce(
        (total, item) => {

            return total +
                Number(item.price || 0) *
                Number(item.quantity || 1);

        },
        0
    );

}


/* =========================
   SHIPPING
========================= */

function getCheckoutShipping(subtotal) {

    if (
        subtotal === 0 ||
        subtotal >= SHIPPING_LIMIT
    ) {
        return 0;
    }

    return 99;

}


/* =========================
   TAX
========================= */

function getCheckoutTax(subtotal) {

    return subtotal * TAX_RATE;

}


/* =========================
   CART COUNT
========================= */

function updateCheckoutCartCount() {

    const cart = getCheckoutCart();

    const count = cart.reduce(
        (total, item) =>
            total + Number(item.quantity || 1),
        0
    );

    document
        .querySelectorAll("#cart-count, .cart-count")
        .forEach(element => {

            element.textContent = count;

        });

}


/* =========================
   EMPTY CART
========================= */

function showEmptyCheckout() {

    const content =
        document.getElementById(
            "checkout-content"
        );

    if (!content) return;

    content.innerHTML = `

        <div class="order-success show">

            <div class="success-icon">

                <i class="fa-solid fa-cart-shopping"></i>

            </div>

            <h2>
                Your Cart Is Empty
            </h2>

            <p>
                Please add at least one product
                before proceeding to checkout.
            </p>

            <a
                href="products.html"
                class="btn btn-dark"
            >
                Start Shopping
            </a>

        </div>

    `;

}


/* =========================
   RENDER CHECKOUT PRODUCTS
========================= */

function renderCheckoutSummary() {

    const cart =
        getCheckoutCart();


    if (cart.length === 0) {

        showEmptyCheckout();

        return false;

    }


    const productsContainer =
        document.getElementById(
            "checkout-products"
        );


    if (!productsContainer) {

        console.error(
            "checkout-products container not found."
        );

        return false;

    }


    productsContainer.innerHTML =
        cart.map(item => {

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


            return `

                <div class="checkout-product">

                    <div
                        class="checkout-product-image"
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
                        class="checkout-product-info"
                    >

                        <h3>
                            ${
                                item.name ||
                                "Product"
                            }
                        </h3>

                        <p>
                            Quantity:
                            ${quantity}
                        </p>

                    </div>


                    <div
                        class="checkout-product-price"
                    >

                        ${
                            checkoutPrice(
                                price * quantity
                            )
                        }

                    </div>

                </div>

            `;

        }).join("");


    const subtotal =
        getCheckoutSubtotal(cart);


    const shipping =
        getCheckoutShipping(
            subtotal
        );


    const tax =
        getCheckoutTax(
            subtotal
        );


    const total =
        subtotal +
        shipping +
        tax;


    document.getElementById(
        "checkout-subtotal"
    ).textContent =
        checkoutPrice(
            subtotal
        );


    document.getElementById(
        "checkout-shipping"
    ).textContent =
        shipping === 0
            ? "FREE"
            : checkoutPrice(
                shipping
            );


    document.getElementById(
        "checkout-tax"
    ).textContent =
        checkoutPrice(
            tax
        );


    document.getElementById(
        "checkout-total"
    ).textContent =
        checkoutPrice(
            total
        );


    return true;

}


/* =========================
   PAYMENT METHOD
========================= */

function setupPaymentMethods() {

    const paymentInputs =
        document.querySelectorAll(
            'input[name="payment"]'
        );


    paymentInputs.forEach(
        input => {

            input.addEventListener(
                "change",
                function () {

                    document
                        .querySelectorAll(
                            ".payment-option"
                        )
                        .forEach(
                            option => {

                                option.classList.remove(
                                    "active"
                                );

                            }
                        );


                    const option =
                        this.closest(
                            ".payment-option"
                        );


                    if (option) {

                        option.classList.add(
                            "active"
                        );

                    }


                    const cardDetails =
                        document.getElementById(
                            "card-details"
                        );


                    const upiDetails =
                        document.getElementById(
                            "upi-details"
                        );


                    if (cardDetails) {

                        cardDetails.classList.remove(
                            "show"
                        );

                    }


                    if (upiDetails) {

                        upiDetails.classList.remove(
                            "show"
                        );

                    }


                    if (
                        this.value === "card" &&
                        cardDetails
                    ) {

                        cardDetails.classList.add(
                            "show"
                        );

                    }


                    if (
                        this.value === "upi" &&
                        upiDetails
                    ) {

                        upiDetails.classList.add(
                            "show"
                        );

                    }

                }
            );

        }
    );

}


/* =========================
   CARD FORMAT
========================= */

function setupCardFormatting() {

    const cardNumber =
        document.getElementById(
            "card-number"
        );


    if (cardNumber) {

        cardNumber.addEventListener(
            "input",
            function () {

                let value =
                    this.value.replace(
                        /\D/g,
                        ""
                    );


                value =
                    value.substring(
                        0,
                        16
                    );


                value =
                    value.replace(
                        /(.{4})/g,
                        "$1 "
                    )
                    .trim();


                this.value =
                    value;

            }
        );

    }


    const expiry =
        document.getElementById(
            "card-expiry"
        );


    if (expiry) {

        expiry.addEventListener(
            "input",
            function () {

                let value =
                    this.value.replace(
                        /\D/g,
                        ""
                    );


                value =
                    value.substring(
                        0,
                        4
                    );


                if (
                    value.length >= 3
                ) {

                    value =
                        value.substring(
                            0,
                            2
                        ) +
                        "/" +
                        value.substring(
                            2
                        );

                }


                this.value =
                    value;

            }
        );

    }

}


/* =========================
   PLACE ORDER
========================= */

function placeOrder(event) {

    event.preventDefault();


    const cart =
        getCheckoutCart();


    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;

    }


    const form =
        document.getElementById(
            "checkout-form"
        );


    if (
        !form.checkValidity()
    ) {

        form.reportValidity();

        return;

    }


    const payment =
        document.querySelector(
            'input[name="payment"]:checked'
        );


    const paymentMethod =
        payment
            ? payment.value
            : "cod";


    /* CARD VALIDATION */

    if (
        paymentMethod === "card"
    ) {

        const card =
            document.getElementById(
                "card-number"
            ).value
            .replace(
                /\s/g,
                ""
            );


        const expiry =
            document.getElementById(
                "card-expiry"
            ).value;


        const cvv =
            document.getElementById(
                "card-cvv"
            ).value;


        if (
            !/^\d{16}$/.test(card)
        ) {

            alert(
                "Please enter a valid 16-digit card number."
            );

            return;

        }


        if (
            !/^\d{2}\/\d{2}$/.test(
                expiry
            )
        ) {

            alert(
                "Please enter expiry date as MM/YY."
            );

            return;

        }


        if (
            !/^\d{3}$/.test(cvv)
        ) {

            alert(
                "Please enter a valid 3-digit CVV."
            );

            return;

        }

    }


    /* UPI VALIDATION */

    if (
        paymentMethod === "upi"
    ) {

        const upi =
            document.getElementById(
                "upi-id"
            ).value.trim();


        if (
            !/^[^@\s]+@[^@\s]+$/.test(
                upi
            )
        ) {

            alert(
                "Please enter a valid UPI ID."
            );

            return;

        }

    }


    /* CALCULATE TOTAL */

    const subtotal =
        getCheckoutSubtotal(
            cart
        );


    const shipping =
        getCheckoutShipping(
            subtotal
        );


    const tax =
        getCheckoutTax(
            subtotal
        );


    const total =
        subtotal +
        shipping +
        tax;


    /* ORDER ID */

    const orderId =
        "SH" +
        Date.now()
            .toString()
            .slice(-8);


    /* ORDER DATA */

    const orderData = {

        orderId:

            orderId,


        date:

            new Date()
                .toLocaleString(
                    "en-IN"
                ),


        customer: {

            firstName:

                document
                    .getElementById(
                        "first-name"
                    )
                    .value
                    .trim(),


            lastName:

                document
                    .getElementById(
                        "last-name"
                    )
                    .value
                    .trim(),


            email:

                document
                    .getElementById(
                        "email"
                    )
                    .value
                    .trim(),


            phone:

                document
                    .getElementById(
                        "phone"
                    )
                    .value
                    .trim(),


            address:

                document
                    .getElementById(
                        "address"
                    )
                    .value
                    .trim(),


            city:

                document
                    .getElementById(
                        "city"
                    )
                    .value
                    .trim(),


            state:

                document
                    .getElementById(
                        "state"
                    )
                    .value,


            pincode:

                document
                    .getElementById(
                        "pincode"
                    )
                    .value
                    .trim(),


            country:

                "India"

        },


        items:

            cart,


        subtotal:

            subtotal,


        shipping:

            shipping,


        tax:

            tax,


        total:

            total,


        paymentMethod:

            paymentMethod

    };


    /* SAVE ORDER */

    localStorage.setItem(
        "stylehubLastOrder",
        JSON.stringify(
            orderData
        )
    );


    /* CLEAR CART */

    localStorage.removeItem(
        CHECKOUT_CART_KEY
    );


    updateCheckoutCartCount();


    /* HIDE CHECKOUT */

    const checkoutContent =
        document.getElementById(
            "checkout-content"
        );


    if (checkoutContent) {

        checkoutContent.style.display =
            "none";

    }


    /* SHOW SUCCESS */

    const success =
        document.getElementById(
            "order-success"
        );


    if (success) {

        success.classList.add(
            "show"
        );

    }


    const orderNumber =
        document.getElementById(
            "order-number"
        );


    if (orderNumber) {

        orderNumber.textContent =
            "Order ID: " +
            orderId;

    }


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =========================
   INITIALIZE
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateCheckoutCartCount();


        const hasCart =
            renderCheckoutSummary();


        if (!hasCart) {

            return;

        }


        setupPaymentMethods();


        setupCardFormatting();


        const form =
            document.getElementById(
                "checkout-form"
            );


        if (form) {

            form.addEventListener(
                "submit",
                placeOrder
            );

        }

    }
);
