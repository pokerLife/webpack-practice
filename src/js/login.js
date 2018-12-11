export default function loginValidate() {
    let loginForm = document.getElementById('loginForm');
    let loginBtn = document.getElementById('loginBtn');
    let username = loginForm[0];
    let password = loginForm[1];

    loginBtn.addEventListener('click', event => {
        if(!username.value || !password.value) {
            alert('用户名或密码为空');
        }
    })
}
