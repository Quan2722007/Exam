import { filterProducts } from "../listProduct/listProduct.js";
const filter = document.getElementsByClassName("filter")[0];

if (filter) {
    filter.innerHTML = `
        <div class="container containerFilter ">
            <form id="filterForm" class="row g-3 align-items-center bg-light p-3 rounded shadow-sm">
                <div class="col-12 col-md-4">
                    <input type="text" class="form-control" id="searchInput" placeholder="Nhập tên cây...">
                </div>
                <div class="col-12 col-md-3">
                    <select class="form-select" id="categorySelect">
                        <option value="">Tất cả danh mục</option>
                        <option value="Cây trong nhà">Cây trong nhà</option>
                        <option value="Cây dễ chăm">Cây dễ chăm</option>
                        <option value="Cây trồng nước">Cây trồng nước</option>
                        <option value="Cây trồng đất">Cây trồng đất</option>
                    </select>
                </div>
                <div class="col-12 col-md-3">
                    <select class="form-select" id="priceSelect">
                        <option value="">Tất cả mức giá</option>
                        <option value="under_150">Dưới 150.000 VNĐ</option>
                        <option value="150_300">150.000 - 300.000 VNĐ</option>
                        <option value="over_300">Trên 300.000 VNĐ</option>
                    </select>
                </div>
                <div class="col-12 col-md-2 d-flex gap-2">
                    <button type="reset" class="btn btn-secondary" title="Đặt lại"><i class="fa-solid fa-rotate-right"></i></button>
                </div>
            </form>
        </div>
    `;

    const filterForm = filter.querySelector("#filterForm");
    const searchInput = filter.querySelector("#searchInput");
    const categorySelect = filter.querySelector("#categorySelect");
    const priceSelect = filter.querySelector("#priceSelect");

    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get("category");
    if (categoryParam) {
        categorySelect.value = categoryParam;
    }

    if (filterForm) {
        const handleFilter = () => {
            const filters = {
                keyword: searchInput.value.trim(),
                category: categorySelect.value,
                price: priceSelect.value,
            };
            filterProducts(filters);
        };

        let debounceTimer;
        const debounceHandleFilter = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(handleFilter, 300);
        };

        searchInput.addEventListener("input", debounceHandleFilter);
        categorySelect.addEventListener("change", handleFilter);
        priceSelect.addEventListener("change", handleFilter);

        filterForm.addEventListener("submit", (e) => {
            e.preventDefault();
        });

        filterForm.addEventListener("reset", () => {
            setTimeout(() => {
                filterProducts({ keyword: "", category: "", price: "" });
            }, 0);
        });
    }
}
