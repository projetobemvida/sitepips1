/**
 * PIPS Pegue Monte - Scripts
 * Interatividade para o site baseado na análise de identidade visual e público-alvo
 */

// Esperar que o DOM esteja completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });
    
    // Menu Mobile Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navList.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    // Rolagem suave para links de âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Filtro da Galeria
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover classe active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adicionar classe active ao botão clicado
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Modal da Galeria
    const galleryZoomLinks = document.querySelectorAll('.gallery-zoom');
    const modal = document.querySelector('.gallery-modal');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.querySelector('.modal-caption');
    const closeModal = document.querySelector('.close-modal');
    const modalPrev = document.querySelector('.modal-prev');
    const modalNext = document.querySelector('.modal-next');
    
    let currentImageIndex = 0;
    const galleryImages = [];
    
    // Coletar todas as imagens da galeria
    galleryZoomLinks.forEach((link, index) => {
        const imgSrc = link.getAttribute('href');
        const imgCaption = link.parentElement.querySelector('h3').textContent;
        galleryImages.push({ src: imgSrc, caption: imgCaption });
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(index);
        });
    });
    
    function openModal(index) {
        modal.style.display = 'block';
        currentImageIndex = index;
        updateModalImage();
    }
    
    function updateModalImage() {
        modalImg.src = galleryImages[currentImageIndex].src;
        modalCaption.textContent = galleryImages[currentImageIndex].caption;
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    if (modalPrev) {
        modalPrev.addEventListener('click', function() {
            currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
            updateModalImage();
        });
    }
    
    if (modalNext) {
        modalNext.addEventListener('click', function() {
            currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
            updateModalImage();
        });
    }
    
    // Fechar modal ao clicar fora da imagem
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Slider de Depoimentos
    const depoimentosSlider = document.querySelector('.depoimentos-slider');
    const depoimentos = document.querySelectorAll('.depoimento');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let depoimentoIndex = 0;
    
    function showDepoimento(index) {
        if (!depoimentosSlider) return;
        
        depoimentos.forEach(depoimento => {
            depoimento.style.display = 'none';
        });
        
        depoimentos[index].style.display = 'block';
    }
    
    if (depoimentos.length > 0) {
        showDepoimento(depoimentoIndex);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            depoimentoIndex = (depoimentoIndex - 1 + depoimentos.length) % depoimentos.length;
            showDepoimento(depoimentoIndex);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            depoimentoIndex = (depoimentoIndex + 1) % depoimentos.length;
            showDepoimento(depoimentoIndex);
        });
    }
    
    // Validação do Formulário de Contato
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Validação de email
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && emailField.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('error');
                }
            }
            
            if (isValid) {
                // Simulação de envio (em um site real, aqui seria o envio para o backend)
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                contactForm.reset();
            } else {
                alert('Por favor, preencha todos os campos obrigatórios corretamente.');
            }
        });
    }
    
    // Header fixo com efeito de scroll
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop) {
            // Scroll para baixo
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scroll para cima
            header.style.transform = 'translateY(0)';
        }
        
        if (scrollTop === 0) {
            // No topo da página
            header.classList.remove('scrolled');
        } else {
            // Não está no topo
            header.classList.add('scrolled');
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    
    // Formulário de Newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                alert('Obrigado por se inscrever em nossa newsletter!');
                emailInput.value = '';
            } else {
                alert('Por favor, insira um e-mail válido.');
            }
        });
    }
});
