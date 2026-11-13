// ---------- storage helpers ----------
const CART_KEY = "cart";

function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getFromStorage(key, defaultValue = null) {
    const data = localStorage.getItem(key);
    if (data === null) return defaultValue;
    try {
        return JSON.parse(data);
    } catch {
        return defaultValue;
    }
}

// ---------- state: ONE object ----------
const state = {
    products: [
        { id: 1, name: "Mandazi (pack of 6)", price: 120, image: "🍩" },
        { id: 2, name: "Chapati (pack of 5)", price: 150, image: "🫓" },
        { id: 3, name: "Tea leaves 250g", price: 180, image: "🍃" },
    ],
    cart: getFromStorage(CART_KEY, []), // { productId, quantity } - only the cart is saved
};

// ---------- DOM ----------
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const cartCountEl = document.getElementById("cart-count");
const cartTotalEl = document.getElementById("cart-total");

// ---------- calculated values (never stored) ----------
function getCartTotal() {
    return state.cart.reduce((total, item) => {
        const product = state.products.find((p) => p.id === item.productId);
        return total + product.price * item.quantity;
    }, 0);
}

function getCartCount() {
    return state.cart.reduce((count, item) => count + item.quantity, 0);
}

function formatPrice(amount) {
    return `KSh ${amount.toLocaleString("en-KE")}`;
}

// ---------- one place that saves and redraws ----------
function commit() {
    saveToStorage(CART_KEY, state.cart);
    render();
}

// ---------- actions ----------
function addToCart(productId) {
    const existing = state.cart.find((item) => item.productId === productId);

    if (existing) {
        existing.quantity++;
    } else {
        state.cart.push({ productId, quantity: 1 });
    }

    commit();
}
function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
        removeFromCart(productId); // quantity 0 means remove
        return;
    }
    state.cart = state.cart.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
    );
    commit();
}

function removeFromCart(productId) {
    state.cart = state.cart.filter((item) => item.productId !== productId);
    commit();
}

function clearCart() {
    state.cart = [];
    commit();
}

// ---------- render ----------
function render() {
    productList.replaceChildren(
        ...state.products.map((product) => {
            const li = document.createElement("li");
            li.textContent = `${product.image} ${product.name} - ${formatPrice(product.price)} `;

            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "add";
            btn.dataset.id = product.id;
            btn.textContent = "Add to Cart";

            li.append(btn);
            return li;
        })
    );

        cartList.replaceChildren(
        ...state.cart.map((item) => {
            const product = state.products.find((p) => p.id === item.productId);
            const li = document.createElement("li");

            const label = document.createElement("span");
            label.textContent = `${product.name} x ${item.quantity} = ${formatPrice(product.price * item.quantity)} `;

            const minus = document.createElement("button");
            minus.type = "button";
            minus.dataset.action = "decrease";
            minus.dataset.id = product.id;
            minus.textContent = "-";
            minus.setAttribute("aria-label", `Decrease ${product.name}`);

            const plus = document.createElement("button");
            plus.type = "button";
            plus.dataset.action = "increase";
            plus.dataset.id = product.id;
            plus.textContent = "+";
            plus.setAttribute("aria-label", `Increase ${product.name}`);

            const remove = document.createElement("button");
            remove.type = "button";
            remove.dataset.action = "remove";
            remove.dataset.id = product.id;
            remove.textContent = "Remove";

            li.append(label, minus, plus, remove);
            return li;
        })
    );
    cartCountEl.textContent = getCartCount();
    cartTotalEl.textContent = formatPrice(getCartTotal());
}

// ---------- events: ONE listener for all Add buttons ----------
productList.addEventListener("click", (event) => {
    if (!event.target.matches(".add")) return;
    addToCart(Number(event.target.dataset.id)); // dataset is a string!
});

// ONE listener for all the +, - and Remove buttons
cartList.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;

    const productId = Number(button.dataset.id); // dataset is a string!
    const item = state.cart.find((cartItem) => cartItem.productId === productId);
    if (!item) return;

    if (button.dataset.action === "increase") {
        updateQuantity(productId, item.quantity + 1);
    } else if (button.dataset.action === "decrease") {
        updateQuantity(productId, item.quantity - 1);
    } else if (button.dataset.action === "remove") {
        removeFromCart(productId);
    }
});

document.getElementById("clear-cart").addEventListener("click", clearCart);

// ---------- start: draw what was loaded ----------
render();