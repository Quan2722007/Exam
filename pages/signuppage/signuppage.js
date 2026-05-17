document.addEventListener("DOMContentLoaded", () => {
    const btnSign = document.getElementById("btnSign");
    const fullnameInput = document.getElementById("fullname");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");

    btnSign.addEventListener("click", () => {
        const fullname = fullnameInput.value.trim();
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        if (!fullname || !username || !password || !confirmPassword) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        if (password !== confirmPassword) {
            alert("Mật khẩu xác nhận không khớp!");
            return;
        }
        alert("Đăng ký tài khoản thành công! Bạn có thể đăng nhập ngay bây giờ.");
        window.location.href = "../loginpage/loginpage.html";
    });
});
