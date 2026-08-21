// =========================================
// STYLEHUB - PRODUCT DATA
// =========================================

// All product information is stored in JavaScript.
// No database is required for this project.

const products = [

    // =====================================
    // WOMEN'S COLLECTION
    // =====================================

    {
        id: 1,
        name: "Floral Summer Dress",
        price: 4199,
        oldPrice: 5499,
        category: "women",
        subcategory: "Dresses & Gowns",
        brand: "StyleHub",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Pink", "White", "Blue"],
        image: "images/women/floral-dress.jpg",
        badge: "NEW",
        rating: 5,
        reviews: 24,
        description:
            "A beautiful floral summer dress designed for comfort and effortless style."
    },

    {
        id: 3,
        name: "Elegant Casual Top",
        price: 2499,
        oldPrice: 3299,
        category: "women",
        subcategory: "Tops & Blouses",
        brand: "StyleHub",
        sizes: ["S", "M", "L", "XL"],
        colors: ["White", "Pink", "Black"],
        image: "images/women/top.jpg",
        badge: "NEW",
        rating: 5,
        reviews: 18,
        description:
            "An elegant casual top that pairs perfectly with jeans, skirts and trousers."
    },

    {
        id: 5,
        name: "Classic Women's Jeans",
        price: 3299,
        oldPrice: 3999,
        category: "women",
        subcategory: "Jeans & Skirts",
        brand: "StyleHub",
        sizes: ["28", "30", "32", "34"],
        colors: ["Blue", "Black"],
        image: "images/women/womens-jeans.jpg",
        badge: "SALE",
        rating: 4,
        reviews: 16,
        description:
            "Comfortable classic fit jeans made for everyday fashion."
    },

    {
        id: 6,
        name: "Elegant Party Gown",
        price: 5999,
        oldPrice: 7499,
        category: "women",
        subcategory: "Dresses & Gowns",
        brand: "StyleHub",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Black", "Red", "Pink"],
        image: "images/women/party-gown.jpg",
        badge: "TRENDING",
        rating: 5,
        reviews: 29,
        description:
            "A stylish party gown designed for special occasions and celebrations."
    },

    {
        id: 7,
        name: "Women's Casual Sneakers",
        price: 2899,
        oldPrice: 3499,
        category: "women",
        subcategory: "Footwear",
        brand: "StyleHub",
        sizes: ["5", "6", "7", "8"],
        colors: ["White", "Black"],
        image: "images/women/women-sneakers.jpg",
        badge: "",
        rating: 4,
        reviews: 21,
        description:
            "Lightweight casual sneakers offering comfort and modern everyday style."
    },


    // =====================================
    // MEN'S COLLECTION
    // =====================================

    {
        id: 2,
        name: "Classic Denim Jeans",
        price: 3299,
        oldPrice: 3999,
        category: "men",
        subcategory: "Jeans & Trousers",
        brand: "StyleHub",
        sizes: ["30", "32", "34", "36"],
        colors: ["Blue", "Black"],
        image: "images/men/denim-jeans.jpg",
        badge: "SALE",
        rating: 5,
        reviews: 31,
        description:
            "Classic denim jeans with a comfortable fit for everyday casual wear."
    },

    {
        id: 8,
        name: "Premium Cotton T-Shirt",
        price: 1999,
        oldPrice: 2499,
        category: "men",
        subcategory: "Shirts & T-Shirts",
        brand: "StyleHub",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["White", "Black", "Navy"],
        image: "images/men/tshirt.jpg",
        badge: "NEW",
        rating: 5,
        reviews: 35,
        description:
            "Premium cotton t-shirt designed for comfort and everyday style."
    },

    {
        id: 9,
        name: "Slim Fit Formal Shirt",
        price: 2499,
        oldPrice: 2999,
        category: "men",
        subcategory: "Shirts & T-Shirts",
        brand: "StyleHub",
        sizes: ["S", "M", "L", "XL"],
        colors: ["White", "Blue", "Black"],
        image: "images/men/formal-shirt.jpg",
        badge: "",
        rating: 4,
        reviews: 19,
        description:
            "A smart slim-fit formal shirt suitable for office and formal occasions."
    },

    {
        id: 10,
        name: "Men's Casual Trousers",
        price: 2799,
        oldPrice: 3499,
        category: "men",
        subcategory: "Jeans & Trousers",
        brand: "StyleHub",
        sizes: ["30", "32", "34", "36", "38"],
        colors: ["Black", "Beige", "Navy"],
        image: "images/men/trousers.jpg",
        badge: "POPULAR",
        rating: 4,
        reviews: 23,
        description:
            "Modern casual trousers designed with a comfortable fit for everyday wear."
    },

    {
        id: 11,
        name: "Men's Leather Sneakers",
        price: 4499,
        oldPrice: 5499,
        category: "men",
        subcategory: "Footwear",
        brand: "StyleHub",
        sizes: ["7", "8", "9", "10", "11"],
        colors: ["White", "Black"],
        image: "images/men/men-sneakers-2.jpg",
        badge: "NEW",
        rating: 5,
        reviews: 27,
        description:
            "Stylish leather sneakers combining comfort and contemporary design."
    },

    {
        id: 12,
        name: "Classic Blazer",
        price: 6999,
        oldPrice: 8499,
        category: "men",
        subcategory: "Suits & Blazers",
        brand: "StyleHub",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Black", "Navy", "Grey"],
        image: "images/men/blazer.jpg",
        badge: "PREMIUM",
        rating: 5,
        reviews: 14,
        description:
            "A refined classic blazer suitable for business, parties and formal events."
    },


    // =====================================
    // KIDS' COLLECTION
    // =====================================

    {
        id: 4,
        name: "Kids Casual Dress",
        price: 1899,
        oldPrice: 2499,
        category: "kids",
        subcategory: "Girls Clothing",
        brand: "StyleHub Kids",
        sizes: ["2Y", "4Y", "6Y", "8Y", "10Y"],
        colors: ["Pink", "Yellow", "Blue"],
        image: "images/kids/kids-dress.jpg",
        badge: "NEW",
        rating: 5,
        reviews: 12,
        description:
            "A cute and comfortable casual dress designed for active kids."
    },

    {
        id: 13,
        name: "Kids Boys T-Shirt",
        price: 1299,
        oldPrice: 1699,
        category: "kids",
        subcategory: "Boys Clothing",
        brand: "StyleHub Kids",
        sizes: ["2Y", "4Y", "6Y", "8Y", "10Y"],
        colors: ["Blue", "Green", "White"],
        image: "images/kids/boys-tshirt.jpg",
        badge: "",
        rating: 4,
        reviews: 17,
        description:
            "Soft and comfortable t-shirt made for everyday play and activities."
    },

    {
        id: 14,
        name: "Kids Denim Jeans",
        price: 1699,
        oldPrice: 2199,
        category: "kids",
        subcategory: "Girls Clothing",
        brand: "StyleHub Kids",
        sizes: ["4Y", "6Y", "8Y", "10Y", "12Y"],
        colors: ["Blue", "Black"],
        image: "images/kids/jeans.jpg",
        badge: "SALE",
        rating: 4,
        reviews: 11,
        description:
            "Durable and comfortable denim jeans designed for kids."
    },

    {
        id: 15,
        name: "Kids Casual Sneakers",
        price: 2199,
        oldPrice: 2799,
        category: "kids",
        subcategory: "Kids Footwear",
        brand: "StyleHub Kids",
        sizes: ["10C", "11C", "12C", "1Y", "2Y"],
        colors: ["White", "Blue", "Black"],
        image: "images/kids/sneakers.jpg",
        badge: "POPULAR",
        rating: 5,
        reviews: 20,
        description:
            "Lightweight sneakers designed to keep kids comfortable throughout the day."
    },

    {
        id: 16,
        name: "Kids Party Outfit",
        price: 2999,
        oldPrice: 3799,
        category: "kids",
        subcategory: "Kids Accessories",
        brand: "StyleHub Kids",
        sizes: ["4Y", "6Y", "8Y", "10Y"],
        colors: ["Red", "Pink", "Blue"],
        image: "images/kids/party-outfit.jpg",
        badge: "TRENDING",
        rating: 5,
        reviews: 15,
        description:
            "A stylish party outfit perfect for birthdays and special occasions."
    }

];


// =========================================
// PRODUCT HELPER FUNCTIONS
// =========================================


// Get product by ID
function getProductById(id) {

    return products.find(
        product =>
            product.id === Number(id)
    );

}


// Get products by category
function getProductsByCategory(category) {

    return products.filter(
        product =>
            product.category === category
    );

}


// Search products
function searchProducts(searchTerm) {

    const term =
        searchTerm
            .toLowerCase()
            .trim();


    return products.filter(
        product =>

            product.name
                .toLowerCase()
                .includes(term)

            ||

            product.category
                .toLowerCase()
                .includes(term)

            ||

            product.subcategory
                .toLowerCase()
                .includes(term)

            ||

            product.brand
                .toLowerCase()
                .includes(term)

    );

}


// Get products by price range
function getProductsByPrice(
    minPrice,
    maxPrice
) {

    return products.filter(
        product =>

            product.price >= minPrice &&
            product.price <= maxPrice

    );

}


// Get products by size
function getProductsBySize(size) {

    return products.filter(
        product =>
            product.sizes.includes(size)
    );

}


// Get products by color
function getProductsByColor(color) {

    return products.filter(
        product =>
            product.colors.includes(color)
    );

}


// Get products by rating
function getProductsByRating(
    minRating
) {

    return products.filter(
        product =>
            product.rating >= minRating
    );

}


// Sort products by price - Low to High
function sortProductsLowToHigh(
    productList
) {

    return [...productList].sort(
        (a, b) =>
            a.price - b.price
    );

}


// Sort products by price - High to Low
function sortProductsHighToLow(
    productList
) {

    return [...productList].sort(
        (a, b) =>
            b.price - a.price
    );

}


// Sort products by rating
function sortProductsByRating(
    productList
) {

    return [...productList].sort(
        (a, b) =>
            b.rating - a.rating
    );

}


// Get featured products
function getFeaturedProducts() {

    return products.filter(
        product =>
            product.badge === "NEW" ||
            product.badge === "TRENDING"
    );

}


// =========================================
// GLOBAL ACCESS
// =========================================

window.products = products;

window.getProductById =
    getProductById;

window.getProductsByCategory =
    getProductsByCategory;

window.searchProducts =
    searchProducts;

window.getProductsByPrice =
    getProductsByPrice;

window.getProductsBySize =
    getProductsBySize;

window.getProductsByColor =
    getProductsByColor;

window.getProductsByRating =
    getProductsByRating;

window.sortProductsLowToHigh =
    sortProductsLowToHigh;

window.sortProductsHighToLow =
    sortProductsHighToLow;

window.sortProductsByRating =
    sortProductsByRating;

window.getFeaturedProducts =
    getFeaturedProducts;


// =========================================
// CONSOLE CHECK
// =========================================

console.log(
    "StyleHub products loaded:",
    products.length
);

console.log(
    "StyleHub products available globally:",
    window.products.length
);
