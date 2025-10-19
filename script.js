document.addEventListener('DOMContentLoaded', () => {

    // --- BẬT NHẠC ---
    // Phải click 1 phát nó mới cho bật nhạc, luật của trình duyệt á ní
    document.body.addEventListener('click', () => {
        document.getElementById('background-music').play();
    }, { once: true });

    
    // --- HIỆU ỨNG CLICK CHUỘT ---
    const particleContainer = document.getElementById('click-effect-container');
    document.addEventListener('click', (e) => {
        for (let i = 0; i < 20; i++) {
            createParticle(e.clientX, e.clientY);
        }
    });

    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        // Tạo hướng bay ngẫu nhiên cho hạt
        const randomX = (Math.random() - 0.5) * 150; // Bay xa 150px
        const randomY = (Math.random() - 0.5) * 150;
        
        particle.style.setProperty('--x', `${randomX}px`);
        particle.style.setProperty('--y', `${randomY}px`);

        particleContainer.appendChild(particle);

        // Xóa hạt sau khi bay xong
        setTimeout(() => {
            particle.remove();
        }, 700);
    }

    
    // --- HIỆU ỨNG CUỘN CHUỘT (SCROLL) ---
    const sections = document.querySelectorAll('.scroll-section');
    
    // Thằng này chuyên đi rình xem ní cuộn tới đâu
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, {
        threshold: 0.25 // Hiện khi 25% của mục lọt vào màn hình
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    
    // --- LOGIC MỞ HỘP QUÀ ---
    const giftBoxes = document.querySelectorAll('.gift-box');
    giftBoxes.forEach(box => {
        box.addEventListener('click', () => {
            box.classList.add('opened');
        });
    });

    
    // --- LOGIC HIỆN MÀN HÌNH CUỐI CÙNG ---
    const finalButton = document.getElementById('final-button');
    const finalScreen = document.getElementById('final-message-screen');
    const journey = document.getElementById('gift-journey');

    finalButton.addEventListener('click', () => {
        journey.style.transition = 'opacity 1s ease-out';
        journey.style.opacity = '0';
        
        setTimeout(() => {
            journey.style.display = 'none';
            finalScreen.classList.add('active');
        }, 1000);
    });
});
