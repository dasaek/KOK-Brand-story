
/* ---------- 🤎 스크롤 시 헤더 ---------- */
const header = document.querySelector('header');

let lastScrollY = window.scrollY;

window.addEventListener('scroll', function () {

    const currentScrollY = window.scrollY;

    /* 맨 위 */
    if (currentScrollY <= 30) {

        header.classList.remove('header_show');
        header.classList.remove('header_hide');
        header.classList.add('header_top');

        lastScrollY = currentScrollY;
        return;
    }

    /* 아래로 스크롤 */
    if (currentScrollY > lastScrollY) {

        header.classList.remove('header_show');
        header.classList.remove('header_top');
        header.classList.add('header_hide');

    }

    /* 위로 스크롤 */
    else {

        header.classList.remove('header_hide');
        header.classList.remove('header_top');
        header.classList.add('header_show');

    }

    lastScrollY = currentScrollY;
});


/* 🤎 SVG 라인 실제 경로 길이 설정 */
document.querySelectorAll('.we_line path, .are_line path')
    .forEach((path) => {
        const length = path.getTotalLength();
        path.style.setProperty('--path-length', length);
    });


/* ---------- 🤎 WE / ARE 라인 모션 ---------- */
const weLine = document.querySelector('.we_line');
const areLine = document.querySelector('.are_line');

// WE: 화면에 50% 이상 들어오면 실행
const weObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');

            // 한 번 실행하면 감시 종료
            weObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.7
});

weObserver.observe(weLine);

// ARE: 화면에 들어오면 실행
const areObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');

            // 한 번 실행하면 감시 종료
            areObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

areObserver.observe(areLine);


/* ========== 노란 꽃 이동 모션 ========== */
const yellowFlower = document.querySelector(
    '.yellow_flower_wrap img'
);

const arePath = document.querySelector('.are_line path');

        // ARE 라인 애니메이션 완료 후
        arePath.addEventListener('animationend', (event) => {

            if (event.animationName === 'drawAreLine') {

                yellowFlower.classList.add('active');

                // 꽃 이동 시작 0.5초 후 로고 재생
                setTimeout(() => {
                    startLogoVideo();
                }, 500);
            }
        });



/* ---------- 🤎 로고 영상 재생 모션 ---------- */
const logoVideo = document.querySelector('.logo_ani video');

let logoVideoStarted = false;

// 노란 꽃 모션 완료 후 최초 재생
function startLogoVideo() {

    // 최초 한 번만 실행
    if (logoVideoStarted) return;

    logoVideoStarted = true;
    logoVideo.currentTime = 0;
    logoVideo.play();
}

// 영상이 끝나면 0.9초 대기 후 다시 재생
logoVideo.addEventListener('ended', () => {

    setTimeout(() => {
        logoVideo.currentTime = 0;
        logoVideo.play();
    }, 900);

});



/* ---------- 🤎 브랜드 스토리 영상 모션 ---------- */

const brandVideo = document.querySelector('.brand_story_video');

// 영상이 화면에 30% 들어오면 재생 시작
const brandObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            brandVideo.play().catch(error => {
                console.warn('브랜드 영상 재생 실패:', error);
            });

            // 최초 한 번만 감지
            brandObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.3
});

brandObserver.observe(brandVideo);

// 영상이 끝나면 2초 대기 후 반복
brandVideo.addEventListener('ended', () => {
    setTimeout(() => {
        brandVideo.currentTime = 0;
        brandVideo.play().catch(error => {
            console.warn('브랜드 영상 재생 실패:', error);
        });
    }, 2000);
});


/* ========== 🤎 DIY 배너 블랙 라인 모션 ========== */

const blackLine = document.querySelector('.black_line');
const blackPath = blackLine.querySelector('path');
const diyBanner = document.querySelector('.diy_banner_wrap');

// SVG 선의 실제 길이 계산
const blackLength = blackPath.getTotalLength();
blackPath.style.setProperty('--black-length', blackLength);

// DIY 배너 화면 진입 감지
const blackLineObserver = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            blackLine.classList.add('active');

            // 최초 한 번 실행 후 감시 종료
            blackLineObserver.unobserve(entry.target);
        }

    });

}, {
    threshold: 0.3
});

blackLineObserver.observe(diyBanner);


/* ========== 🤎 타이틀 SVG 라인 애니메이션 ========== */

const titleLines = document.querySelectorAll(
    '.first_line, .diy_line, .store_line'
);

// SVG 경로 길이 계산
titleLines.forEach((svg) => {
    const path = svg.querySelector('path');
    const length = path.getTotalLength();

    path.style.setProperty('--line-length', length);
});

// 화면 진입 감지
const titleObserver = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            // 애니메이션 처음부터 재시작
            entry.target.classList.remove('active');
            void entry.target.offsetWidth;
            entry.target.classList.add('active');

        } else {

            // 화면 밖으로 나가면 초기화
            entry.target.classList.remove('active');

        }

    });

}, {
    threshold: 0.3
});

// 각 라인에 적용
titleLines.forEach((line) => {
    titleObserver.observe(line);
});


/* ========== 🤎 STORE / POP-UP 이미지 탭 ========== */

// 이미지 그룹
const storeImages = document.querySelectorAll('.store_images img');
const popupImages = document.querySelectorAll('.popup_images img');

// 이동 버튼
const greenArrow = document.querySelector('.green_arrow');
const blueArrow = document.querySelector('.blue_arrow');

// 인디케이터
const greenBar = document.querySelector('.green_bar');
const blueBar = document.querySelector('.blue_bar');

// 현재 이미지 번호
let storeIndex = 0;
let popupIndex = 0;

// 현재 표시 중인 그룹
let activeGroup = 'store';

// 이미지 표시 함수
function showStoreImage() {

    // 전체 사진 숨기기
    storeImages.forEach(img => img.classList.remove('active'));
    popupImages.forEach(img => img.classList.remove('active'));

    // 선택한 그룹의 이미지만 표시
    if (activeGroup === 'store') {
        storeImages[storeIndex].classList.add('active');
    } else {
        popupImages[popupIndex].classList.add('active');
    }

    // 인디케이터 위치 변경
    greenBar.style.transform =
        `translateX(${storeIndex * 100}%)`;

    blueBar.style.transform =
        `translateX(${popupIndex * 100}%)`;
}

// 처음에는 매장1 표시
showStoreImage();

// STORE 화살표 클릭
greenArrow.addEventListener('click', () => {

    if (activeGroup === 'store') {
        storeIndex = (storeIndex + 1) % storeImages.length;
    } else {
        activeGroup = 'store';
    }

    showStoreImage();
});

// POP-UP 화살표 클릭
blueArrow.addEventListener('click', () => {

    if (activeGroup === 'popup') {
        popupIndex = (popupIndex + 1) % popupImages.length;
    } else {
        activeGroup = 'popup';
    }

    showStoreImage();
});



