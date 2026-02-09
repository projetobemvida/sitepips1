/**
 * Sistema de Cookies LGPD - JavaScript
 * Implementação completa para conformidade com LGPD
 * Compatível com o site PIPS Pegue Monte
 */

class CookieConsentManager {
    constructor() {
        this.cookieName = 'pips_cookie_consent';
        this.cookieExpiry = 365; // dias
        this.consentData = this.getConsentData();
        this.categories = {
            essential: {
                name: 'Cookies Essenciais',
                description: 'Necessários para o funcionamento básico do site. Não podem ser desabilitados.',
                required: true,
                enabled: true,
                cookies: [
                    { name: 'pips_cookie_consent', purpose: 'Armazena suas preferências de cookies' },
                    { name: 'PHPSESSID', purpose: 'Mantém sua sessão ativa no site' },
                    { name: 'csrf_token', purpose: 'Proteção contra ataques CSRF' }
                ]
            },
            functional: {
                name: 'Cookies Funcionais',
                description: 'Melhoram sua experiência lembrando de preferências e configurações.',
                required: false,
                enabled: false,
                cookies: [
                    { name: 'language_preference', purpose: 'Lembra seu idioma preferido' },
                    { name: 'theme_preference', purpose: 'Lembra suas configurações de tema' },
                    { name: 'form_data', purpose: 'Salva dados de formulários temporariamente' }
                ]
            },
            analytics: {
                name: 'Cookies de Análise',
                description: 'Nos ajudam a entender como você usa o site para melhorarmos a experiência.',
                required: false,
                enabled: false,
                cookies: [
                    { name: '_ga', purpose: 'Google Analytics - Identificador único' },
                    { name: '_ga_*', purpose: 'Google Analytics - Dados de sessão' },
                    { name: '_gid', purpose: 'Google Analytics - Identificador de sessão' },
                    { name: '_gat', purpose: 'Google Analytics - Limitação de taxa' }
                ]
            },
            marketing: {
                name: 'Cookies de Marketing',
                description: 'Utilizados para personalizar anúncios e medir a eficácia de campanhas.',
                required: false,
                enabled: false,
                cookies: [
                    { name: '_fbp', purpose: 'Facebook Pixel - Rastreamento' },
                    { name: 'fr', purpose: 'Facebook - Publicidade personalizada' },
                    { name: 'IDE', purpose: 'Google Ads - Publicidade personalizada' },
                    { name: 'test_cookie', purpose: 'Google - Teste de suporte a cookies' }
                ]
            }
        };
        
        this.init();
    }

    init() {
        this.createBannerHTML();
        this.createModalHTML();
        this.createSettingsLink();
        this.bindEvents();
        this.loadConsentData();
        this.checkConsentStatus();
        this.initializeAllowedCookies();
    }

    createBannerHTML() {
        const bannerHTML = `
            <div id="cookie-banner" class="cookie-banner">
                <div class="cookie-banner-content">
                    <div class="cookie-banner-text">
                        <h3 class="cookie-banner-title">Política de Cookies</h3>
                        <p class="cookie-banner-description">
                            Utilizamos cookies para melhorar sua experiência, personalizar conteúdo e analisar nosso tráfego. 
                            Você pode escolher quais cookies aceitar.
                        </p>
                        <div class="cookie-banner-links">
                            <a href="#" class="cookie-banner-link" onclick="cookieManager.openModal()">
                                Personalizar Cookies
                            </a>
                            <a href="/politica-privacidade" class="cookie-banner-link" target="_blank">
                                Política de Privacidade
                            </a>
                        </div>
                    </div>
                    <div class="cookie-banner-actions">
                        <button class="cookie-btn cookie-btn-reject" onclick="cookieManager.rejectAll()">
                            Rejeitar Todos
                        </button>
                        <button class="cookie-btn cookie-btn-customize" onclick="cookieManager.openModal()">
                            Personalizar
                        </button>
                        <button class="cookie-btn cookie-btn-accept" onclick="cookieManager.acceptAll()">
                            Aceitar Todos
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', bannerHTML);
    }

    createModalHTML() {
        const categoriesHTML = Object.keys(this.categories).map(key => {
            const category = this.categories[key];
            const cookiesListHTML = category.cookies.map(cookie => 
                `<li>
                    <span class="cookie-name">${cookie.name}</span>
                    <span class="cookie-purpose">${cookie.purpose}</span>
                </li>`
            ).join('');

            return `
                <div class="cookie-category" data-category="${key}">
                    <div class="cookie-category-header">
                        <div class="cookie-category-info">
                            <h4 class="cookie-category-title">
                                <span class="cookie-icon cookie-icon-${key}"></span>
                                ${category.name}
                                ${category.required ? '<span style="color: #ff6b6b; font-size: 0.8em;">(Obrigatório)</span>' : ''}
                            </h4>
                            <p class="cookie-category-description">${category.description}</p>
                        </div>
                        <label class="cookie-toggle">
                            <input type="checkbox" 
                                   data-category="${key}" 
                                   ${category.required ? 'checked disabled' : ''}
                                   ${category.enabled ? 'checked' : ''}>
                            <span class="cookie-toggle-slider"></span>
                        </label>
                    </div>
                    <div class="cookie-details">
                        <button class="cookie-details-toggle" onclick="cookieManager.toggleDetails('${key}')">
                            Ver detalhes dos cookies
                        </button>
                        <div class="cookie-details-content" id="details-${key}">
                            <ul class="cookie-list">
                                ${cookiesListHTML}
                            </ul>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        const modalHTML = `
            <div id="cookie-modal" class="cookie-modal">
                <div class="cookie-modal-content">
                    <div class="cookie-modal-header">
                        <h2 class="cookie-modal-title">Configurações de Cookies</h2>
                        <button class="cookie-modal-close" onclick="cookieManager.closeModal()">×</button>
                    </div>
                    <div class="cookie-modal-body">
                        <p class="cookie-modal-description">
                            Gerencie suas preferências de cookies. Você pode ativar ou desativar diferentes 
                            categorias de cookies abaixo. Note que desabilitar alguns cookies pode afetar 
                            a funcionalidade do site.
                        </p>
                        <div class="cookie-categories">
                            ${categoriesHTML}
                        </div>
                    </div>
                    <div class="cookie-modal-footer">
                        <button class="cookie-btn cookie-btn-reject" onclick="cookieManager.rejectAll()">
                            Rejeitar Todos
                        </button>
                        <button class="cookie-btn cookie-btn-accept" onclick="cookieManager.savePreferences()">
                            Salvar Preferências
                        </button>
                        <button class="cookie-btn cookie-btn-accept" onclick="cookieManager.acceptAll()">
                            Aceitar Todos
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    createSettingsLink() {
        const linkHTML = `
            <a href="#" id="cookie-settings-link" class="cookie-settings-link" onclick="cookieManager.openModal()">
                ⚙️ Cookies
            </a>
        `;
        
        document.body.insertAdjacentHTML('beforeend', linkHTML);
    }

    bindEvents() {
        // Fechar modal ao clicar fora
        document.addEventListener('click', (e) => {
            const modal = document.getElementById('cookie-modal');
            if (e.target === modal) {
                this.closeModal();
            }
        });

        // Tecla ESC para fechar modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });

        // Monitorar mudanças nos toggles
        document.addEventListener('change', (e) => {
            if (e.target.matches('.cookie-toggle input[type="checkbox"]')) {
                const category = e.target.dataset.category;
                this.categories[category].enabled = e.target.checked;
            }
        });
    }

    checkConsentStatus() {
        if (!this.consentData || this.isConsentExpired()) {
            this.showBanner();
        } else {
            this.showSettingsLink();
            this.loadUserPreferences();
        }
    }

    showBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            setTimeout(() => {
                banner.classList.add('show');
            }, 1000); // Delay para não interferir no carregamento
        }
    }

    hideBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.classList.remove('show');
            setTimeout(() => {
                banner.style.display = 'none';
            }, 300);
        }
    }

    showSettingsLink() {
        const link = document.getElementById('cookie-settings-link');
        if (link) {
            setTimeout(() => {
                link.classList.add('show');
            }, 2000);
        }
    }

    openModal() {
        const modal = document.getElementById('cookie-modal');
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
            this.updateModalToggles();
        }
    }

    closeModal() {
        const modal = document.getElementById('cookie-modal');
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    updateModalToggles() {
        Object.keys(this.categories).forEach(key => {
            const toggle = document.querySelector(`input[data-category="${key}"]`);
            if (toggle && !toggle.disabled) {
                toggle.checked = this.categories[key].enabled;
            }
        });
    }

    toggleDetails(category) {
        const details = document.getElementById(`details-${category}`);
        const button = details.previousElementSibling;
        
        if (details.classList.contains('show')) {
            details.classList.remove('show');
            button.setAttribute('aria-expanded', 'false');
        } else {
            details.classList.add('show');
            button.setAttribute('aria-expanded', 'true');
        }
    }

    acceptAll() {
        Object.keys(this.categories).forEach(key => {
            this.categories[key].enabled = true;
        });
        
        this.saveConsent();
        this.hideBanner();
        this.closeModal();
        this.showSettingsLink();
        this.initializeAllowedCookies();
        this.showNotification('Todas as categorias de cookies foram aceitas!', 'success');
    }

    rejectAll() {
        Object.keys(this.categories).forEach(key => {
            if (!this.categories[key].required) {
                this.categories[key].enabled = false;
            }
        });
        
        this.saveConsent();
        this.hideBanner();
        this.closeModal();
        this.showSettingsLink();
        this.removeDisallowedCookies();
        this.showNotification('Apenas cookies essenciais foram mantidos.', 'info');
    }

    savePreferences() {
        this.saveConsent();
        this.closeModal();
        this.hideBanner();
        this.showSettingsLink();
        this.initializeAllowedCookies();
        this.removeDisallowedCookies();
        this.showNotification('Suas preferências foram salvas!', 'success');
    }

    saveConsent() {
        const consentData = {
            timestamp: new Date().toISOString(),
            version: '1.0',
            categories: {},
            userAgent: navigator.userAgent,
            ip: null // Seria preenchido pelo backend se necessário
        };

        Object.keys(this.categories).forEach(key => {
            consentData.categories[key] = this.categories[key].enabled;
        });

        this.setConsentCookie(consentData);
        this.consentData = consentData;
        
        // Enviar dados para o backend (opcional)
        this.sendConsentToServer(consentData);
    }

    setConsentCookie(data) {
        const expires = new Date();
        expires.setDate(expires.getDate() + this.cookieExpiry);
        
        document.cookie = `${this.cookieName}=${encodeURIComponent(JSON.stringify(data))}; expires=${expires.toUTCString()}; path=/; SameSite=Strict`;
    }

    getConsentData() {
        const cookies = document.cookie.split(';');
        const consentCookie = cookies.find(cookie => 
            cookie.trim().startsWith(`${this.cookieName}=`)
        );
        
        if (consentCookie) {
            try {
                const data = decodeURIComponent(consentCookie.split('=')[1]);
                return JSON.parse(data);
            } catch (e) {
                console.warn('Erro ao ler dados de consentimento:', e);
                return null;
            }
        }
        
        return null;
    }

    loadConsentData() {
        if (this.consentData && this.consentData.categories) {
            Object.keys(this.consentData.categories).forEach(key => {
                if (this.categories[key]) {
                    this.categories[key].enabled = this.consentData.categories[key];
                }
            });
        }
    }

    loadUserPreferences() {
        this.loadConsentData();
        this.initializeAllowedCookies();
    }

    isConsentExpired() {
        if (!this.consentData || !this.consentData.timestamp) {
            return true;
        }
        
        const consentDate = new Date(this.consentData.timestamp);
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() - this.cookieExpiry);
        
        return consentDate < expiryDate;
    }

    initializeAllowedCookies() {
        // Google Analytics
        if (this.categories.analytics.enabled) {
            this.loadGoogleAnalytics();
        }
        
        // Facebook Pixel
        if (this.categories.marketing.enabled) {
            this.loadFacebookPixel();
        }
        
        // Outros cookies funcionais
        if (this.categories.functional.enabled) {
            this.loadFunctionalCookies();
        }
    }

    removeDisallowedCookies() {
        // Remover cookies do Google Analytics
        if (!this.categories.analytics.enabled) {
            this.removeCookiesByPattern(['_ga', '_gid', '_gat']);
        }
        
        // Remover cookies do Facebook
        if (!this.categories.marketing.enabled) {
            this.removeCookiesByPattern(['_fbp', 'fr']);
        }
        
        // Remover cookies funcionais
        if (!this.categories.functional.enabled) {
            this.removeCookiesByPattern(['language_preference', 'theme_preference']);
        }
    }

    removeCookiesByPattern(patterns) {
        patterns.forEach(pattern => {
            // Remover cookie do domínio atual
            document.cookie = `${pattern}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            document.cookie = `${pattern}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
            
            // Remover cookies que começam com o padrão
            const cookies = document.cookie.split(';');
            cookies.forEach(cookie => {
                const cookieName = cookie.split('=')[0].trim();
                if (cookieName.startsWith(pattern)) {
                    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                }
            });
        });
    }

    loadGoogleAnalytics() {
        if (window.gtag) return; // Já carregado
        
        // Carregar Google Analytics
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
        document.head.appendChild(script);
        
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'GA_MEASUREMENT_ID', {
            anonymize_ip: true,
            cookie_flags: 'SameSite=Strict'
        });
        
        window.gtag = gtag;
    }

    loadFacebookPixel() {
        if (window.fbq) return; // Já carregado
        
        // Carregar Facebook Pixel
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        
        fbq('init', 'YOUR_PIXEL_ID');
        fbq('track', 'PageView');
    }

    loadFunctionalCookies() {
        // Implementar cookies funcionais conforme necessário
        console.log('Cookies funcionais habilitados');
    }

    sendConsentToServer(consentData) {
        // Enviar dados de consentimento para o servidor (opcional)
        fetch('/api/cookie-consent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify(consentData)
        }).catch(error => {
            console.warn('Erro ao enviar consentimento para o servidor:', error);
        });
    }

    showNotification(message, type = 'info') {
        // Criar notificação temporária
        const notification = document.createElement('div');
        notification.className = `cookie-notification cookie-notification-${type}`;
        notification.innerHTML = `
            <div class="cookie-notification-content">
                <span class="cookie-notification-icon">
                    ${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}
                </span>
                <span class="cookie-notification-message">${message}</span>
            </div>
        `;
        
        // Adicionar estilos inline
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3',
            color: 'white',
            padding: '15px 20px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: '10001',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            maxWidth: '300px',
            fontSize: '14px'
        });
        
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remover após 3 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Métodos públicos para integração
    hasConsent(category) {
        return this.categories[category] && this.categories[category].enabled;
    }

    updateConsent(category, enabled) {
        if (this.categories[category] && !this.categories[category].required) {
            this.categories[category].enabled = enabled;
            this.saveConsent();
            
            if (enabled) {
                this.initializeAllowedCookies();
            } else {
                this.removeDisallowedCookies();
            }
        }
    }

    getConsentStatus() {
        const status = {};
        Object.keys(this.categories).forEach(key => {
            status[key] = this.categories[key].enabled;
        });
        return status;
    }

    revokeAllConsent() {
        Object.keys(this.categories).forEach(key => {
            if (!this.categories[key].required) {
                this.categories[key].enabled = false;
            }
        });
        
        // Remover cookie de consentimento
        document.cookie = `${this.cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        
        this.removeDisallowedCookies();
        this.showBanner();
        
        const link = document.getElementById('cookie-settings-link');
        if (link) {
            link.classList.remove('show');
        }
    }
}

// Inicializar o gerenciador de cookies quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    window.cookieManager = new CookieConsentManager();
});

// Função global para verificar consentimento (para uso em outros scripts)
window.hasCookieConsent = function(category) {
    return window.cookieManager && window.cookieManager.hasConsent(category);
};

// Função global para atualizar consentimento
window.updateCookieConsent = function(category, enabled) {
    if (window.cookieManager) {
        window.cookieManager.updateConsent(category, enabled);
    }
};

// Função global para obter status do consentimento
window.getCookieConsentStatus = function() {
    return window.cookieManager ? window.cookieManager.getConsentStatus() : {};
};

