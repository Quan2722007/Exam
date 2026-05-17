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

        if (username === "admin" && password === "admin123") {
            alert("Đăng nhập tài khoản Quản trị viên thành công!");
            localStorage.setItem("userRole", "admin");
            window.location.href = "../admin/admin.html";
        } else {
            alert("Đăng nhập thành công!");
            localStorage.setItem("userRole", "user");
            window.location.href = "../homepage/homepage.html";
        }
    });
});
