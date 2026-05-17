const productCategory = document.getElementsByClassName("productCategory")[0] ?? [];
productCategory.innerHTML = `
    <div class="container  d-flex flex-column containerGap">
        <h3 class="title text-center">Danh mục sản phẩm</h3>
        <div class="wrapProductCategory d-flex flex-nowrap overflow-x-auto gap-3" style="scroll-snap-type: x mandatory;"></div>
    </div>
`;

const listProductContainer = productCategory.querySelector(".wrapProductCategory");

fetch("http://localhost:3000/categories")
    .then((response) => response.json())
    .then((categories) => renderProductCategory(categories))
    .catch((error) => console.error("Lỗi khi tải danh mục sản phẩm:", error));

function renderProductCategory(categories) {
    if (!listProductContainer) return;
    listProductContainer.innerHTML = `
            ${categories
                .map(
                    (category) => `
                <!-- Thêm cursor: pointer; và data-name -->
                <div class="cardCategory d-flex position-relative flex-shrink-0" style="scroll-snap-align: start; cursor: pointer;" data-name="${category.tenDanhMuc}">
                    <img src="../../${category.hinhAnh}" alt="${category.tenDanhMuc}" class="imgCategory" >
                    <div class="blockNameCategory position-absolute d-flex justify-content-center">
                        <div class="nameCategory">${category.tenDanhMuc}</div>
                    </div>
                </div>
            `,
                )
                .join("")}
       
    `;

    const categoryCards = listProductContainer.querySelectorAll(".cardCategory");
    categoryCards.forEach((card) => {
        card.addEventListener("click", () => {
            const categoryName = card.getAttribute("data-name").trim();
            window.location.href = `../../pages/productspage/productspage.html?category=${encodeURIComponent(categoryName)}`;
        });
    });
}
