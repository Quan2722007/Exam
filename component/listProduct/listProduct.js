let listProductState = {
    allProducts: [],
    products: [],
};

const listProduct = document.getElementsByClassName("listProduct")[0];

function renderListProduct() {
    if (!listProduct) return;

    if (listProductState.products.length === 0) {
        listProduct.innerHTML = `
            <div class="container text-center py-5">
                <h5 class="text-muted"><i class="fa-solid fa-box-open"></i> Không tìm thấy sản phẩm nào phù hợp!</h5>
            </div>
        `;
    } else {
        listProduct.innerHTML = `<div class="container d-grid gap-4" style="grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));">
        ${listProductState.products
            .map(
                (product) => `
            <div class="card h-100 shadow-sm border-0">
                <img src="../../${product.hinhAnh}" class="card-img-top" alt="${product.tenSanPham}" style="height: 250px; object-fit: cover;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title fw-bold" style="font-size: 1.1rem;">${product.tenSanPham}</h5>
                    <p class="card-text text-muted" >${product.thongTin}</p>
                    <div class="mt-auto d-flex justify-content-between align-items-center">
                        <span class="text-danger fw-bold fs-5">${product.gia.toLocaleString("vi-VN")}đ</span>
                        <span class="quantitySold">${product.soLanBan} đã bán</span>
                    </div>
                    <div class="d-flex gap-2 justify-content-between">
                            <button class="btn btn-success btn-sm viewDetail " data-id="${product.id}">Xem chi tiết</button>
                            <button class="btn btn-outline-success btn-sm addToCart"
                                data-id="${product.id}" 
                                data-name="${product.tenSanPham}" 
                                data-price="${product.gia}"
                                data-image="${product.hinhAnh}">
                                <i class="fa-solid fa-cart-plus"></i> Thêm
                            </button>
                    </div>
                </div>
            </div>
    `,
            )
            .join("")}
        </div>`;
    }

    const addToCartBtns = listProduct.querySelectorAll(".addToCart");
    addToCartBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const productInfor = {
                id: btn.getAttribute("data-id"),
                name: btn.getAttribute("data-name"),
                price: parseInt(btn.getAttribute("data-price")),
                image: btn.getAttribute("data-image"),
                quantity: 1,
            };

            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            const existingProduct = cart.find((item) => item.id === productInfor.id);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push(productInfor);
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`Đã thêm ${productInfor.name} vào giỏ hàng!`);
        });
    });

    const viewDetailBtns = listProduct.querySelectorAll(".viewDetail");
    viewDetailBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const productId = btn.getAttribute("data-id");
            window.location.href = `../detailproductpage/detailproductpage.html?id=${productId}`;
        });
    });
}

async function fetchAllProducts() {
    try {
        const response = await fetch("https://6a106463d2a985707036bbf0.mockapi.io/exames/examess");
        const data = await response.json();

        let listProducts = [];
        if (Array.isArray(data)) {
            const record = data.find((item) => item.products);
            if (record) listProducts = record.products;
        } else if (data.products) {
            listProducts = data.products;
        }

        listProductState.allProducts = listProducts;

        renderListProduct();

        filterCategory();
    } catch (error) {
        console.error("Lỗi khi tải danh sách sản phẩm:", error);
    }
}

export function filterProducts(filters) {
    const { keyword, category, price } = filters;

    listProductState.products = listProductState.allProducts.filter((product) => {
        const matchKeyword = keyword === "" || product.tenSanPham.toLowerCase().includes(keyword.toLowerCase());

        let matchCategory = false;
        if (category === "") {
            matchCategory = true;
        } else if (category === "Cây dễ chăm") {
            matchCategory = (product.doKho || "").toLowerCase().includes("dễ chăm");
        } else if (category === "Cây trồng nước") {
            matchCategory = (product.phuongThucTrong || "") === "Trồng nước";
        } else if (category === "Cây trồng đất") {
            matchCategory = (product.phuongThucTrong || "") === "Trồng đất";
        } else {
            matchCategory = (product.viTriTrong || "") === category;
        }

        let matchPrice = true;
        if (price === "under_150") matchPrice = product.gia < 150000;
        else if (price === "150_300") matchPrice = product.gia >= 150000 && product.gia <= 300000;
        else if (price === "over_300") matchPrice = product.gia > 300000;

        return matchKeyword && matchCategory && matchPrice;
    });

    renderListProduct();
}
function filterCategory() {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get("category");

    const urlNameParamsName = new URLSearchParams(window.location.search);
    const nameParam = urlNameParamsName.get("keyword");

    if (categoryParam || nameParam) {
        filterProducts({ keyword: nameParam || "", category: categoryParam || "", price: "" });
    } else {
        listProductState.products = listProductState.allProducts;
        renderListProduct();
    }
}
fetchAllProducts();
