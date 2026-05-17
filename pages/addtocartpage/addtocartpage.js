function renderCart() {
    const cartTableBody = document.getElementById("cartTableBody");
    const totalCartPrice = document.getElementById("totalCartPrice");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        cartTableBody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-muted">Giỏ hàng của bạn đang trống.</td></tr>`;
        totalCartPrice.innerText = "0đ";
        return;
    }

    let html = "";
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        html += `
            <tr>
                <td>
                    <img src="../../${item.image}" alt="${item.name}" class="img-fluid rounded" style="width: 80px; height: 80px; object-fit: cover" />
                </td>
                <td class="fw-bold">${item.name}</td>
                <td>${item.price.toLocaleString("vi-VN")}đ</td>
                <td>
                    <input type="number" class="form-control text-center mx-auto quantity-input" style="max-width: 80px;" data-index="${index}" value="${item.quantity}" min="1" />
                </td>
                <td class="text-danger fw-bold">${itemTotal.toLocaleString("vi-VN")}đ</td>
                <td>
                    <button class="btn btn-outline-danger btn-sm delete-btn" data-index="${index}" title="Xóa khỏi giỏ hàng"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `;
    });

    cartTableBody.innerHTML = html;
    totalCartPrice.innerText = `${total.toLocaleString("vi-VN")}đ`;

    const quantityInputs = cartTableBody.querySelectorAll(".quantity-input");
    quantityInputs.forEach((input) => {
        input.addEventListener("change", (e) => {
            const index = e.target.getAttribute("data-index");
            const newQuantity = parseInt(e.target.value);
            if (newQuantity >= 1) {
                cart[index].quantity = newQuantity;
                localStorage.setItem("cart", JSON.stringify(cart));
                renderCart();
            } else {
                e.target.value = cart[index].quantity;
            }
        });
    });

    const deleteBtns = cartTableBody.querySelectorAll(".delete-btn");
    deleteBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const index = e.target.closest("button").getAttribute("data-index");
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
        });
    });

    const btnBuy = document.querySelector(".btnBuy");
    btnBuy.addEventListener("click", () => {
        window.location.reload();
        localStorage.removeItem("cart");
        alert("Bạn đã thanh toán thành công!");
    });
}

document.addEventListener("DOMContentLoaded", renderCart);
