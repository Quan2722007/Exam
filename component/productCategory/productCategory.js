const productCategory = document.getElementsByClassName("productCategory")[0] ?? [];
productCategory.innerHTML = `
    <div class="container  d-flex flex-column containerGap">
        <h3 class="title text-center">Danh mục sản phẩm</h3>
        <div class="wrapProductCategory d-flex flex-nowrap overflow-x-auto gap-3" style="scroll-snap-type: x mandatory;"></div>
    </div>
`;

const listProductContainer = productCategory.querySelector(".wrapProductCategory");

async function getAPICategories() {
    try {
        const response = await fetch("https://6a106463d2a985707036bbf0.mockapi.io/exames/examess");
        if (!response.ok) {
            throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
        }
        const data = await response.json();

        let listCategories = [];
        if (Array.isArray(data) && data[0] && data[0].categories) {
            listCategories = data[0].categories; // Nếu mockapi trả về mảng chứa 1 object tổng
        } else if (data.categories) {
            listCategories = data.categories; // Nếu mockapi trả về 1 object có key 'categories'
        } else if (Array.isArray(data)) {
            listCategories = data; // Nếu mockapi trả về trực tiếp mảng categories
        }

        renderProductCategory(listCategories);
    } catch (error) {
        console.error("Lỗi khi tải danh sách đề mục:", error);
    }
}
function renderProductCategory(categories) {
    if (!listProductContainer) return;
    listProductContainer.innerHTML = `
            ${categories
                .map(
                    (category) => ` 
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

getAPICategories();
