const heroSection = document.getElementsByClassName("heroSection")[0] ?? [];
heroSection.innerHTML = `
    <div class="bgHero position-relative">
        <img src="../../assets/heroSection/bgHeroSection2.jpeg" alt="heroSection" class="picture" />
        <div class="bgOverlay position-absolute top-0"></div>
            <div class="container d-flex flex-column align-items-center position-absolute top-50 start-50 translate-middle heroBanner">
            <div class="titleHero text-center">Một chậu cây nhỏ cho ngày nhẹ nhàng hơn</div>
            <div class="contentHero text-center">Từ sen đá, monstera đến các loại cây để bàn tối giản — tất cả đều được chọn để mang lại cảm giác thư giãn cho không gian của bạn.</div>
            <button class="primary btnCTA">Chọn cây ngay</button>
        </div>
    </div>
`;
const btnCTA = heroSection.querySelector(".btnCTA");
if (btnCTA) {
    btnCTA.addEventListener("click", () => {
        window.location.href = "../../pages/productspage/productspage.html";
    });
}
