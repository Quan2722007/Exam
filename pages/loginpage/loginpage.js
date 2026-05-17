document.addEventListener("DOMContentLoaded", () => {
    const btnLogin = document.getElementById("btnLogin");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    btnLogin.addEventListener("click", () => {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (!username || !password) {
            alert("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!");
            return;
        }

        // Kiểm tra với tài khoản Admin (từ file JSON của bạn)
        if (username === "admin" && password === "admin123") {
            alert("Đăng nhập tài khoản Quản trị viên thành công!");
            // Lưu trạng thái đăng nhập (nếu cần)
            localStorage.setItem("userRole", "admin");
            window.location.href = "../admin/admin.html";
        } else {
            // Giả lập đăng nhập thành công cho người dùng bình thường
            alert("Đăng nhập thành công!");
            localStorage.setItem("userRole", "user");
            window.location.href = "../homepage/homepage.html";
        }
    });
});
