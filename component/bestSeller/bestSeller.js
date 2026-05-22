let bestSellerState = {
    products: [],
    currentIndex: 0,
};

const bestSeller = document.getElementsByClassName("bestSeller")[0] ?? [];
bestSeller.innerHTML = `
    <div class="container d-flex flex-column containerGap position-relative">
        <h3 class="title text-center">5 sản phẩm bán chạy</h3>
        <div class="carouselWrapper position-relative">
            <button class="btnArrow btnPrev position-absolute" id="btnPrevBestSeller"><i class="fa-solid fa-chevron-left"></i></button>
            <div class="wrapBestSeller d-flex" ></div>
            <button class="btnArrow btnNext position-absolute" id="btnNextBestSeller"><i class="fa-solid fa-chevron-right"></i></button>
        </div>
    </div>
`;

const listProducts = bestSeller.querySelector(".wrapBestSeller");
const btnPrev = bestSeller.querySelector("#btnPrevBestSeller");
const btnNext = bestSeller.querySelector("#btnNextBestSeller");

function renderBestSeller() {
    if (!listProducts) return;

    listProducts.innerHTML = bestSellerState.products
        .map(
            (product) => `
            <div class="card cardProduct h-100 shadow-sm border-0">
                <img src="../../${product.hinhAnh}" class="card-img-top" alt="${product.tenSanPham}" style="height: 250px; object-fit: cover;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title fw-bold" style="font-size: 1.1rem;">${product.tenSanPham}</h5>
                    <p class="card-text text-muted">${product.thongTin}</p>
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
        .join("");

    if (listProducts.children.length > 0) {
        const cardWidth = listProducts.children[0].offsetWidth + 20;
        listProducts.style.transform = `translateX(-${bestSellerState.currentIndex * cardWidth}px)`;
    }

    const addToCartBtns = listProducts.querySelectorAll(".addToCart");
    addToCartBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const productInfo = {
                id: btn.getAttribute("data-id"),
                name: btn.getAttribute("data-name"),
                price: parseInt(btn.getAttribute("data-price")),
                image: btn.getAttribute("data-image"),
                quantity: 1,
            };

            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            const existingProduct = cart.find((item) => item.id === productInfo.id);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push(productInfo);
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`Đã thêm ${productInfo.name} vào giỏ hàng!`);
        });
    });

    const viewDetailBtns = listProducts.querySelectorAll(".viewDetail");
    viewDetailBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const productId = btn.getAttribute("data-id");
            window.location.href = `../detailproductpage/detailproductpage.html?id=${productId}`;
        });
    });
}

async function fetchBestSellerData() {
    try {
        const response = await fetch("https://6a106463d2a985707036bbf0.mockapi.io/exames/examess");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        let listBestProducts = [];
        if (Array.isArray(data) && data[0] && data[0].products) {
            listBestProducts = data[0].products;
        } else if (data.products) {
            listBestProducts = data.products;
        } else if (Array.isArray(data) && data.length > 1 && data[1].products) {
            listBestProducts = data[1].products;
        }

        bestSellerState.products = listBestProducts.sort((a, b) => b.soLanBan - a.soLanBan).slice(0, 5);

        renderBestSeller();
    } catch (error) {
        console.error("Lỗi khi tải danh sách sản phẩm:", error);
    }
}

if (btnNext) {
    btnNext.addEventListener("click", () => {
        const cardWidth = listProducts.children[0].offsetWidth + 20;
        const visibleCards = Math.floor(listProducts.parentElement.offsetWidth / cardWidth);

        if (bestSellerState.currentIndex < bestSellerState.products.length - visibleCards) {
            bestSellerState.currentIndex++;
            console.log("Current Index:", bestSellerState.currentIndex);
            renderBestSeller();
        }
    });
}

if (btnPrev) {
    btnPrev.addEventListener("click", () => {
        if (bestSellerState.currentIndex > 0) {
            bestSellerState.currentIndex--;
            console.log("Current Index:", bestSellerState.currentIndex);
            renderBestSeller();
        }
    });
}

fetchBestSellerData();
