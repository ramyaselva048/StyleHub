// =========================================
// STYLEHUB - MAIN JAVASCRIPT
// =========================================


// =========================================
// 1. MOBILE MENU
// =========================================

const menuToggle =
    document.getElementById("menu-toggle");

const mobileMenu =
    document.getElementById("mobile-menu");


if (menuToggle && mobileMenu) {

    menuToggle.addEventListener(
        "click",
        () => {

            mobileMenu.classList.toggle(
                "show"
            );

            const icon =
                menuToggle.querySelector("i");


            if (
                mobileMenu.classList.contains(
                    "show"
                )
            ) {

                if (icon) {
                    icon.classList.remove(
                        "fa-bars"
                    );

                    icon.classList.add(
                        "fa-xmark"
                    );
                }

            } else {

                if (icon) {
                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );
                }

            }

        }
    );


    const mobileLinks =
        mobileMenu.querySelectorAll("a");


    mobileLinks.forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    mobileMenu.classList.remove(
                        "show"
                    );

                    const icon =
                        menuToggle.querySelector(
                            "i"
                        );


                    if (icon) {

                        icon.classList.remove(
                            "fa-xmark"
                        );

                        icon.classList.add(
                            "fa-bars"
                        );

                    }

                }
            );

        }
    );

}



// =========================================
// 2. CART COUNT
// =========================================

function updateCartCount() {

    const cartCountElement =
        document.getElementById(
            "cart-count"
        );


    if (!cartCountElement) {
        return;
    }


    let cart = [];


    try {

        cart =
            JSON.parse(
                localStorage.getItem(
                    "stylehubCart"
                )
            ) || [];

    } catch (error) {

        cart = [];

    }


    const totalItems =
        cart.reduce(
            (total, item) => {

                return total +
                    Number(
                        item.quantity || 1
                    );

            },
            0
        );


    cartCountElement.textContent =
        totalItems;

}



// =========================================
// 3. WISHLIST
// =========================================

let wishlist = [];


try {

    wishlist =
        JSON.parse(
            localStorage.getItem(
                "stylehubWishlist"
            )
        ) || [];

} catch (error) {

    wishlist = [];

}


function saveWishlist() {

    localStorage.setItem(
        "stylehubWishlist",
        JSON.stringify(wishlist)
    );

}


function updateWishlistCount() {

    document
        .querySelectorAll(
            ".nav-icon"
        )
        .forEach(
            icon => {

                const heart =
                    icon.querySelector(
                        ".fa-heart"
                    );


                if (!heart) {
                    return;
                }


                const count =
                    icon.querySelector(
                        ".icon-count"
                    );


                if (count) {

                    count.textContent =
                        wishlist.length;

                }

            }
        );

}


function toggleWishlist(
    productId,
    button
) {

    productId =
        Number(productId);


    const existingIndex =
        wishlist.indexOf(
            productId
        );


    if (
        existingIndex === -1
    ) {

        wishlist.push(
            productId
        );


        if (button) {
            button.classList.add(
                "active"
            );
        }


        const icon =
            button
                ? button.querySelector("i")
                : null;


        if (icon) {

            icon.classList.remove(
                "fa-regular"
            );

            icon.classList.add(
                "fa-solid"
            );

        }


        showNotification(
            "Product added to wishlist ❤️"
        );

    } else {

        wishlist.splice(
            existingIndex,
            1
        );


        if (button) {

            button.classList.remove(
                "active"
            );

        }


        const icon =
            button
                ? button.querySelector("i")
                : null;


        if (icon) {

            icon.classList.remove(
                "fa-solid"
            );

            icon.classList.add(
                "fa-regular"
            );

        }


        showNotification(
            "Product removed from wishlist"
        );

    }


    saveWishlist();

    updateWishlistCount();

}



// =========================================
// 4. WISHLIST BUTTONS
// =========================================

function setupWishlistButtons() {

    const buttons =
        document.querySelectorAll(
            ".wishlist-btn"
        );


    buttons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const productCard =
                        button.closest(
                            ".product-card"
                        );


                    if (!productCard) {
                        return;
                    }


                    const addButton =
                        productCard.querySelector(
                            ".add-cart-btn"
                        );


                    if (!addButton) {
                        return;
                    }


                    const productId =
                        Number(
                            addButton.dataset
                                .productId
                        );


                    if (!productId) {
                        return;
                    }


                    toggleWishlist(
                        productId,
                        button
                    );

                }
            );

        }
    );

}



// =========================================
// 5. RESTORE WISHLIST
// =========================================

function restoreWishlistState() {

    const buttons =
        document.querySelectorAll(
            ".wishlist-btn"
        );


    buttons.forEach(
        button => {

            const productCard =
                button.closest(
                    ".product-card"
                );


            if (!productCard) {
                return;
            }


            const addButton =
                productCard.querySelector(
                    ".add-cart-btn"
                );


            if (!addButton) {
                return;
            }


            const productId =
                Number(
                    addButton.dataset
                        .productId
                );


            if (
                wishlist.includes(
                    productId
                )
            ) {

                button.classList.add(
                    "active"
                );


                const icon =
                    button.querySelector(
                        "i"
                    );


                if (icon) {

                    icon.classList.remove(
                        "fa-regular"
                    );

                    icon.classList.add(
                        "fa-solid"
                    );

                }

            }

        }
    );

}



// =========================================
// 6. NOTIFICATION
// =========================================

function showNotification(
    message
) {

    const oldNotification =
        document.querySelector(
            ".stylehub-notification"
        );


    if (oldNotification) {

        oldNotification.remove();

    }


    const notification =
        document.createElement(
            "div"
        );


    notification.className =
        "stylehub-notification";


    notification.textContent =
        message;


    notification.style.cssText = `
        position: fixed;
        bottom: 25px;
        right: 25px;
        z-index: 99999;
        padding: 14px 20px;
        background: #1a1a2e;
        color: #ffffff;
        border: 1px solid #c9a227;
        border-radius: 4px;
        font-size: 13px;
        font-weight: 600;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    `;


    document.body.appendChild(
        notification
    );


    setTimeout(
        () => {

            notification.style.opacity =
                "0";

            notification.style.transition =
                "opacity 0.3s ease";


            setTimeout(
                () => {

                    notification.remove();

                },
                300
            );

        },
        2500
    );

}



// =========================================
// 7. NEWSLETTER
// =========================================

const newsletterForm =
    document.getElementById(
        "newsletter-form"
    );


if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const emailInput =
                document.getElementById(
                    "newsletter-email"
                );


            if (!emailInput) {
                return;
            }


            const email =
                emailInput.value.trim();


            if (!email) {

                showNotification(
                    "Please enter your email."
                );

                return;

            }


            showNotification(
                "Thank you for subscribing! ✨"
            );


            newsletterForm.reset();

        }
    );

}



// =========================================
// 8. SMOOTH SCROLL
// =========================================

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(
        link => {

            link.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        this.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (target) {

                        event.preventDefault();


                        target.scrollIntoView({
                            behavior:
                                "smooth",

                            block:
                                "start"
                        });

                    }

                }
            );

        }
    );



// =========================================
// 9. HEADER SCROLL
// =========================================

const header =
    document.querySelector(
        ".header"
    );


window.addEventListener(
    "scroll",
    () => {

        if (!header) {
            return;
        }


        if (
            window.scrollY > 50
        ) {

            header.style.boxShadow =
                "0 5px 25px rgba(26,26,46,0.08)";

        } else {

            header.style.boxShadow =
                "none";

        }

    }
);



// =========================================
// 10. ADD TO CART
// =========================================

function setupAddToCart() {

    const buttons =
        document.querySelectorAll(
            ".add-cart-btn"
        );


    buttons.forEach(
        button => {

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    const productId =
                        Number(
                            this.dataset
                                .productId
                        );


                    if (!productId) {

                        showNotification(
                            "Unable to add product."
                        );

                        return;

                    }


                    /*
                     * IMPORTANT:
                     * cart.js needs the complete
                     * product object.
                     *
                     * Get product from products.js
                     */

                    let product = null;


                    if (
                        Array.isArray(
                            window.products
                        )
                    ) {

                        product =
                            window.products.find(
                                item =>
                                    Number(
                                        item.id
                                    ) ===
                                    productId
                            );

                    }


                    /*
                     * Also support:
                     * PRODUCT_DATA
                     */

                    if (
                        !product &&
                        Array.isArray(
                            window.PRODUCT_DATA
                        )
                    ) {

                        product =
                            window.PRODUCT_DATA.find(
                                item =>
                                    Number(
                                        item.id
                                    ) ===
                                    productId
                            );

                    }


                    /*
                     * If product is found,
                     * add complete object.
                     */

                    if (
                        product &&
                        typeof addToCart ===
                            "function"
                    ) {

                        addToCart(
                            product
                        );

                        showNotification(
                            "Product added to cart 🛍️"
                        );

                        return;

                    }


                    /*
                     * If products.js uses
                     * window.productData
                     */

                    if (
                        !product &&
                        Array.isArray(
                            window.productData
                        )
                    ) {

                        product =
                            window.productData.find(
                                item =>
                                    Number(
                                        item.id
                                    ) ===
                                    productId
                            );

                    }


                    if (
                        product &&
                        typeof addToCart ===
                            "function"
                    ) {

                        addToCart(
                            product
                        );

                        showNotification(
                            "Product added to cart 🛍️"
                        );

                        return;

                    }


                    showNotification(
                        "Product details not found."
                    );

                }
            );

        }
    );

}



// =========================================
// 11. QUICK VIEW
// =========================================

document
    .querySelectorAll(
        ".quick-view"
    )
    .forEach(
        link => {

            link.addEventListener(
                "click",
                function () {

                    // Product detail page
                    // handles complete details.

                }
            );

        }
    );



// =========================================
// 12. IMAGE ERROR HANDLING
// =========================================

document
    .querySelectorAll("img")
    .forEach(
        image => {

            image.addEventListener(
                "error",
                function () {

                    this.style.background =
                        "#e9e1e3";

                    this.style.objectFit =
                        "contain";

                }
            );

        }
    );



// =========================================
// 13. INITIALIZE
// =========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateCartCount();

        updateWishlistCount();

        setupWishlistButtons();

        restoreWishlistState();

        setupAddToCart();


        console.log(
            "StyleHub loaded successfully."
        );

    }
);
