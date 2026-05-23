document.addEventListener("DOMContentLoaded", () => {
    const btnLogin = document.getElementById("btnLogin");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const form = document.getElementById("loginForm");
    const textReport = document.getElementById("textReport");

    async function fetchUsersAPI() {
        const response = await fetch("https://6a106463d2a985707036bbf0.mockapi.io/exames/examess");
        const data = await response.json();

        if (Array.isArray(data) && data[0] && data[0].users) {
            return data[0].users;
        } else if (data.users) {
            return data.users;
        }
        return [];
    }

    function checkUserCredentials(users, username, password) {
        return users.find((u) => u.tenDangNhap === username && u.matKhau === password);
    }

    async function handleLogin(e) {
        if (e) e.preventDefault();
        textReport.classList.add("d-none");

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (!username || !password) {
            textReport.textContent = "Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!";
            textReport.classList.remove("d-none");
            return;
        }

        try {
            if (btnLogin) btnLogin.textContent = "Đang xử lý...";

            const users = await fetchUsersAPI();
            const validUser = checkUserCredentials(users, username, password);

            if (validUser) {
                alert(`Đăng nhập thành công!`);
                localStorage.setItem("activeUser", JSON.stringify(validUser));
                localStorage.setItem("userRole", validUser.role);

                if (validUser.role === "admin") {
                    window.location.href = "../admin/admin.html";
                } else {
                    window.location.href = "../homepage/homepage.html";
                }
            } else {
                textReport.textContent = "Tên đăng nhập hoặc mật khẩu không đúng!";
                textReport.classList.remove("d-none");
            }
        } catch (error) {
            console.error("Lỗi khi đăng nhập:", error);
        } 
    }

    if (form) {
        form.addEventListener("submit", handleLogin);
    } else if (btnLogin) {
        btnLogin.addEventListener("click", handleLogin);
    }
});
