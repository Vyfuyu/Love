document.addEventListener('DOMContentLoaded', () => {

    // Bật nhạc khi người dùng tương tác lần đầu
    document.body.addEventListener('click', () => {
        const music = document.getElementById('background-music');
        if (music.paused) {
            music.play();
        }
    }, { once: true });

    const stages = document.querySelectorAll('.stage');
    function switchStage(currentStageId, nextStageId) {
        const currentStage = document.getElementById(currentStageId);
        const nextStage = document.getElementById(nextStageId);

        currentStage.classList.remove('active');
        
        // Đợi hiệu ứng chuyển cảnh xong mới hiện màn tiếp
        setTimeout(() => {
            nextStage.classList.add('active');
        }, 800);
    }

    // --- LOGIC MÀN 1: GHÉP TIM ---
    const leftHeart = document.getElementById('heart-left');
    const rightHeart = document.getElementById('heart-right');
    const puzzleContainer = document.getElementById('puzzle-container');
    
    let activePiece = null;
    let offsetX = 0;
    let offsetY = 0;
    let leftHeartInPlace = false;
    let rightHeartInPlace = false;

    function startDrag(e, piece) {
        activePiece = piece;
        const rect = piece.getBoundingClientRect();
        const containerRect = puzzleContainer.getBoundingClientRect();
        
        let clientX = e.clientX || e.touches[0].clientX;
        let clientY = e.clientY || e.touches[0].clientY;

        offsetX = clientX - rect.left + containerRect.left;
        offsetY = clientY - rect.top + containerRect.top;
        activePiece.style.transition = 'none'; // Tắt transition khi kéo
    }

    function drag(e) {
        if (activePiece) {
            e.preventDefault();
            let clientX = e.clientX || e.touches[0].clientX;
            let clientY = e.clientY || e.touches[0].clientY;

            let x = clientX - offsetX;
            let y = clientY - offsetY;

            activePiece.style.left = `${x}px`;
            activePiece.style.top = `${y}px`;
        }
    }

    function endDrag() {
        if (!activePiece) return;
        activePiece.style.transition = 'all 0.3s ease'; // Bật lại transition

        // Vị trí trung tâm để ghép tim
        const targetXLeft = puzzleContainer.offsetWidth / 2 - leftHeart.offsetWidth;
        const targetXRight = puzzleContainer.offsetWidth / 2;
        const targetY = puzzleContainer.offsetHeight / 2 - leftHeart.offsetHeight / 2;
        
        const currentX = activePiece.offsetLeft;
        const currentY = activePiece.offsetTop;
        const tolerance = 30; // Độ chính xác

        if (activePiece === leftHeart && Math.abs(currentX - targetXLeft) < tolerance && Math.abs(currentY - targetY) < tolerance) {
            leftHeart.style.left = `${targetXLeft}px`;
            leftHeart.style.top = `${targetY}px`;
            leftHeart.classList.add('completed');
            leftHeartInPlace = true;
        }

        if (activePiece === rightHeart && Math.abs(currentX - targetXRight) < tolerance && Math.abs(currentY - targetY) < tolerance) {
            rightHeart.style.left = `${targetXRight}px`;
            rightHeart.style.top = `${targetY}px`;
            rightHeart.classList.add('completed');
            rightHeartInPlace = true;
        }
        
        activePiece = null;
        checkPuzzleCompletion();
    }

    function checkPuzzleCompletion() {
        if (leftHeartInPlace && rightHeartInPlace) {
            console.log('Ghép tim thành công vcl!');
            setTimeout(() => switchStage('stage-one', 'stage-two'), 1500);
        }
    }
    
    // Cho máy tính
    leftHeart.addEventListener('mousedown', (e) => startDrag(e, leftHeart));
    rightHeart.addEventListener('mousedown', (e) => startDrag(e, rightHeart));
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', endDrag);

    // Cho điện thoại
    leftHeart.addEventListener('touchstart', (e) => startDrag(e, leftHeart));
    rightHeart.addEventListener('touchstart', (e) => startDrag(e, rightHeart));
    document.addEventListener('touchmove', drag);
    document.addEventListener('touchend', endDrag);


    // --- LOGIC MÀN 2: MÊ CUNG KÍ TỰ ---
    const magicTextContainer = document.getElementById('magic-text');
    const nextButton = document.getElementById('next-stage-btn');
    const realMessage = "Trang Lê à, từ ngày có em, cuộc sống của anh bỗng trở nên thật ý nghĩa. Mỗi khoảnh khắc bên em đều là một món quà vô giá..."; // Ní đổi câu này tùy ý nha
    const randomChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let revealedCount = 0;

    for (let i = 0; i < realMessage.length; i++) {
        const charSpan = document.createElement('span');
        if (realMessage[i] === ' ') {
            charSpan.innerHTML = '&nbsp;'; // Xử lý dấu cách
        } else {
            charSpan.textContent = randomChars[Math.floor(Math.random() * randomChars.length)];
            charSpan.dataset.char = realMessage[i];
            charSpan.addEventListener('mouseover', revealChar, { once: true });
        }
        magicTextContainer.appendChild(charSpan);
    }
    
    function revealChar(e) {
        e.target.textContent = e.target.dataset.char;
        revealedCount++;
        // Khi giải mã xong hết thì hiện nút qua màn 3
        if (revealedCount >= realMessage.replace(/\s/g, '').length) {
            setTimeout(() => {
                nextButton.classList.remove('hidden');
            }, 500);
        }
    }

    nextButton.addEventListener('click', () => {
        switchStage('stage-two', 'stage-three');
    });

});
