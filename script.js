document.addEventListener('DOMContentLoaded', () => {

    // --- HIỆU ỨNG SAO BĂNG RƠI ---
    const canvas = document.getElementById('falling-stars-canvas');
    const ctx = canvas.getContext('2d');

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    });

    const stars = [];
    const numStars = 100;

    class Star {
        constructor() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.len = Math.random() * 2 + 1;
            this.speed = Math.random() * 2 + 0.5;
            this.color = `rgba(0, 255, 204, ${Math.random()})`;
        }

        update() {
            this.y += this.speed;
            if (this.y > h) {
                this.y = 0;
                this.x = Math.random() * w;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x, this.y + this.len);
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 0.5;
            ctx.stroke();
        }
    }

    for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
    }

    function animate() {
        ctx.clearRect(0, 0, w, h);
        stars.forEach(star => {
            star.update();
            star.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();

    // --- ĐỒNG HỒ ---
    const clockElement = document.getElementById('clock');
    function updateClock() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}`;
    }
    setInterval(updateClock, 1000);
    updateClock();

    // --- CHẾ ĐỘ SÁNG/TỐI ---
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        themeToggle.textContent = isLight ? '☀️' : '🌙';
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });

    // Load theme đã lưu
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
        themeToggle.textContent = '☀️';
    }

    // --- MENU TOGGLE ---
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
    
    // Đóng menu khi click ra ngoài
    document.addEventListener('click', (event) => {
        if (!sidebar.contains(event.target) && !menuToggle.contains(event.target) && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });

    // --- HIỆU ỨNG CLICK CHUỘT ---
    document.addEventListener('click', (e) => {
        let effect = document.createElement('div');
        effect.className = 'click-effect';
        effect.style.top = `${e.clientY}px`;
        effect.style.left = `${e.clientX}px`;
        document.body.appendChild(effect);
        setTimeout(() => {
            effect.remove();
        }, 500);
    });

    // --- Xử lý auto play nhạc (một số trình duyệt chặn) ---
    const music = document.getElementById('background-music');
    document.body.addEventListener('click', () => {
        music.play().catch(error => {
            // Lỗi này thường xảy ra nếu người dùng chưa tương tác, không sao cả
            console.log("User interaction is needed to play audio.");
        });
    }, { once: true }); // Chỉ chạy 1 lần đầu
});
