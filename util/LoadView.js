
function isLogin() {
    return localStorage.getItem("token")
}

function renderTopbar(user) {
    // console.log(user)
    let photo = document.querySelector("#topbar-photo");
    let currentUsername = document.querySelector("#currentUsername");
    let exit = document.querySelector("#exit");

    photo.src = user.photo;
    currentUsername.innerHTML = user.username;

    exit.onclick = () => {
        // 清理token
        localStorage.removeItem("token");
        location.href = "/admin/views/login/index.html";
    }
}

async function load(id) {
    let user = isLogin();

    if (user) {
        let topbarText = await fetch("/admin/components/topbar/index.html").then(res => res.text())

        document.querySelector('.topbar').innerHTML = topbarText;

        renderTopbar(JSON.parse(user))

        let sidemenuText = await fetch("/admin/components/sidemenu/index.html").then(res => res.text())

        document.querySelector('.sidemenu').innerHTML = sidemenuText;

        // 这里事项首页高亮
        document.querySelector("#"+id).style.color = "#0a58ca"

    } else {
        location.href = "/admin/views/login/index.html"
    }
}

export { load,isLogin }


