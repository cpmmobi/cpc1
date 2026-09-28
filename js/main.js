(function () {
    var header = document.querySelector(".site-header");
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".site-nav");
    var links = nav.querySelectorAll("a");
    var form = document.getElementById("contactForm");
    var note = document.getElementById("formNote");

    function onScroll() {
        header.classList.toggle("is-scrolled", window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    function setNav(open) {
        nav.classList.toggle("is-open", open);
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        toggle.querySelector(".sr-only").textContent = open ? "关闭菜单" : "打开菜单";
        document.body.classList.toggle("nav-lock", open);
    }

    toggle.addEventListener("click", function () {
        setNav(!nav.classList.contains("is-open"));
    });

    links.forEach(function (link) {
        link.addEventListener("click", function () {
            setNav(false);
        });
    });

    var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
    if ("IntersectionObserver" in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var id = entry.target.id;
                links.forEach(function (link) {
                    link.classList.toggle("is-active", link.getAttribute("href") === "#" + id);
                });
            });
        }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
        sections.forEach(function (section) { observer.observe(section); });
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        var name = form.name.value.trim();
        var email = form.email.value.trim();
        var phone = form.phone.value.trim();
        var message = form.message.value.trim();

        if (!name || !email || !message) {
            note.textContent = "请填写姓名、邮箱和留言。";
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            note.textContent = "请输入有效的邮箱地址。";
            return;
        }

        var body = [
            "姓名：" + name,
            "邮箱：" + email,
            "电话：" + (phone || "未填写"),
            "",
            message
        ].join("\n");

        window.location.href = "mailto:pt@nowads.cn?subject="
            + encodeURIComponent("官网咨询 - " + name)
            + "&body=" + encodeURIComponent(body);
        note.textContent = "正在打开邮件客户端，邮件将发送至 pt@nowads.cn。";
    });
})();
