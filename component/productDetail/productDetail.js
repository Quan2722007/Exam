const productDetail = document.getElementsByClassName("productDetail")[0];

async function fetchProductDetail(productId) {
    try {
        const response = await fetch("https://6a106463d2a985707036bbf0.mockapi.io/exames/examess");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();

        let listProducts = [];
        if (Array.isArray(data)) {
            const record = data.find((item) => item.products);
            if (record) listProducts = record.products;
        } else if (data.products) {
            listProducts = data.products;
        }

        const product = listProducts.find((p) => p.id === productId);

        if (product) {
            renderProductDetail(product);
        } else {
            productDetail.innerHTML = `<p class="text-danger fs-5 mt-4">Không tìm thấy sản phẩm này trên hệ thống.</p>`;
        }
    } catch (error) {
        console.error("Error fetching product detail:", error);
        productDetail.innerHTML = `<p class="text-danger">Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.</p>`;
    }
}

function renderProductDetail(product) {
    if (!productDetail) return;
    productDetail.innerHTML = `
        <div class="container">
            <div class="row g-4">
                <div class="col-md-6">
                    <img src="../../${product.hinhAnh}" class="img-fluid rounded shadow-sm" alt="${product.tenSanPham}">
                </div>
                <div class="col-md-6 d-flex flex-column boxInforProduct">
                    <h2 class="fw-bold">${product.tenSanPham}</h2>
                    <h4 class="text-danger fw-bold">${product.gia.toLocaleString("vi-VN")}đ</h4>
                    <p class="text-muted">${product.thongTin}</p>
                    <div class="d-flex flex-column gap-2">
                        <div><span class="fw-bold">Vị trí trồng:</span> ${product.viTriTrong}</div>
                        <div><span class="fw-bold">Phương thức trồng:</span> ${product.phuongThucTrong}</div>
                        <div><span class="fw-bold">Kích thước:</span>
                            <ul class="mb-0">
                                <li>${product.quyCach[0]}</li>
                                <li>${product.quyCach[1]}</li>
                            </ul>
                        </div>
                        <div><span class="fw-bold">Độ khó:</span> ${product.doKho}</div>
                        <div><span class="fw-bold">Yêu cầu ánh sáng:</span> ${product.yeuCauAnhSang}</div>
                        <div><span class="fw-bold">Nhu cầu tưới nước:</span> ${product.nhuCauNuoc}</div>
                        <div><span class="fw-bold">Đã bán:</span> ${product.soLanBan}</div>
                    </div>
                    <div class="d-flex align-items-center">
                        <span class="fw-bold">Số lượng:</span>
                        <input type="number" class="form-control w-25 ms-2" value="1" min="1" id="quantityInput">
                    </div>
                    <div class="d-flex gap-3 align-items-center mb-4">
                        <button class="btn btn-success btn-lg btnBuy">Mua ngay</button>
                        <button class="btn btn-outline-success btn-lg  addToCart" 
                            data-id="${product.id}"
                            data-name="${product.tenSanPham}"
                            data-price="${product.gia}"
                            data-image="${product.hinhAnh}">
                            <i class="fa-solid fa-cart-plus"></i> Thêm vào giỏ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    const addToCartBtn = productDetail.querySelector(".addToCart");
    const quantityInput = productDetail.querySelector("#quantityInput");
    addToCartBtn.addEventListener("click", () => {
        const productInfo = {
            id: addToCartBtn.getAttribute("data-id"),
            name: addToCartBtn.getAttribute("data-name"),
            price: parseInt(addToCartBtn.getAttribute("data-price")),
            image: addToCartBtn.getAttribute("data-image"),
            quantity: parseInt(quantityInput.value) || 1,
        };
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProduct = cart.find((item) => item.id === productInfo.id);
        if (existingProduct) {
            existingProduct.quantity += productInfo.quantity;
        } else {
            cart.push(productInfo);
        }
        localStorage.setItem("cart", JSON.stringify(cart));

        if (addToCartBtn.getAttribute("data-redirect") === "true") {
            window.location.href = "../addtocartpage/addtocartpage.html";
        } else {
            alert(`Đã thêm ${productInfo.name} vào giỏ hàng!`);
        }
    });

    const btnBuy = productDetail.querySelector(".btnBuy");
    btnBuy.addEventListener("click", () => {
        alert("Bạn đã mua thành công sản phẩm này!");
    });
}

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

if (productId) {
    fetchProductDetail(productId);
} else {
    productDetail.innerHTML = `<p class="text-danger">Không tìm thấy sản phẩm.</p>`;
}
