// Inicializa o Swiper para a seção Kits Populares
const kitsSwiper = new Swiper('.kits-swiper-container', {
    // Configurações do Swiper
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    pagination: {
        el: '.kits-swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.kits-swiper-button-next',
        prevEl: '.kits-swiper-button-prev',
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 40,
        },
    },
});

// Inicializa o Swiper para a seção Instagram Feed
const instaSwiper = new Swiper('.instagram-swiper-container', {
    // Configurações do Swiper
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    pagination: {
        el: '.instagram-swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.instagram-swiper-button-next',
        prevEl: '.instagram-swiper-button-prev',
    },
    breakpoints: {
        640: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
        1024: {
            slidesPerView: 4,
            spaceBetween: 30,
        },
    },
});
