document.addEventListener("DOMContentLoaded", () => {
    const btnSign = document.getElementById("btnSign");
    const fullnameInput = document.getElementById("fullname");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");

    const strengthText = document.createElement("div");
    strengthText.style.marginTop = "5px";
    strengthText.style.fontSize = "0.85rem";
    strengthText.style.fontWeight = "bold";
    passwordInput.parentNode.insertBefore(strengthText, passwordInput.nextSibling);

    function checkPasswordStrength(password) {
        let strength = 0;
        if (password.length >= 6) strength += 1; 
        if (password.match(/[a-z]+/)) strength += 1; 
        if (password.match(/[A-Z]+/)) strength += 1; 
        if (password.match(/[0-9]+/)) strength += 1; 
        if (password.match(/[\W_]+/)) strength += 1; 
        return strength;
    }

    passwordInput.addEventListener("input", () => {
        const val = passwordInput.value;
        if (val.length === 0) {
            strengthText.textContent = "";
            return;
        }

        const score = checkPasswordStrength(val);
        if (score <= 2) {
            strengthText.textContent = "Mật khẩu yếu (Thêm chữ hoa, số hoặc ký tự đặc biệt)";
            strengthText.style.color = "#dc3545";
        } else if (score === 3 || score === 4) {
            strengthText.textContent = "Mật khẩu trung bình";
            strengthText.style.color = "#ffc107"; 
        } else {
            strengthText.textContent = "Mật khẩu mạnh";
            strengthText.style.color = "#198754"; 
        }
    });


    btnSign.addEventListener("click", async (e) => {
        e.preventDefault(); 

        const fullname = fullnameInput.value.trim();
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        if (!fullname || !username || !password || !confirmPassword) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        if (checkPasswordStrength(password) <= 2) {
            alert("Mật khẩu quá yếu! Vui lòng chọn mật khẩu mạnh hơn.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Mật khẩu xác nhận không khớp!");
            return;
        }

        try {
            btnSign.textContent = "Đang xử lý...";
            btnSign.disabled = true;

            const response = await fetch("https://6a106463d2a985707036bbf0.mockapi.io/exames/examess");
            const data = await response.json();

            let users = [];
            let mainRecord = null;
            let recordId = null;

            if (Array.isArray(data) && data[0] && data[0].users) {
                users = data[0].users;
                mainRecord = data[0];
                recordId = data[0].id;
            } else if (data.users) {
                users = data.users;
                mainRecord = data;
                recordId = data.id;
            }

            if (!mainRecord || !recordId) {
                alert("Cấu trúc dữ liệu trên API không hợp lệ để cập nhật!");
                return;
            }

            if (users.some((u) => u.tenDangNhap === username)) {
                alert("Tên đăng nhập đã tồn tại! Vui lòng chọn tên khác.");
                return;
            }

            const newUser = {
                id: "user_" + Date.now(),
                tenDangNhap: username,
                matKhau: password,
                role: "user",
                hoTen: fullname,
            };

            mainRecord.users.push(newUser);

            const putResponse = await fetch(`https://6a106463d2a985707036bbf0.mockapi.io/exames/examess/${recordId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(mainRecord),
            });

            if (!putResponse.ok) {
                throw new Error(`Lỗi HTTP khi PUT: ${putResponse.status}`);
            }

            alert("Đăng ký tài khoản thành công! Bạn có thể đăng nhập ngay bây giờ.");
            window.location.href = "../loginpage/loginpage.html";
        } catch (error) {
            console.error("Lỗi khi đăng ký:", error);
            alert("Lỗi kết nối máy chủ, vui lòng thử lại!");
        }
    });
});
