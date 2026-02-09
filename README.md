# Sistema de Cookies LGPD - PIPS Pegue Monte

## Visão Geral

Este projeto implementa um sistema completo de consentimento de cookies em conformidade com a Lei Geral de Proteção de Dados (LGPD) brasileira para o website da PIPS Pegue Monte.

## Características Principais

### ✅ Conformidade LGPD
- Consentimento granular por categoria de cookies
- Base legal claramente definida para cada tipo de tratamento
- Registro de consentimento com timestamp
- Facilidade para revogação de consentimento
- Política de privacidade completa

### 🎨 Design Responsivo
- Interface moderna e profissional
- Compatível com o design existente do site
- Totalmente responsivo para dispositivos móveis
- Animações suaves e micro-interações
- Acessibilidade (WCAG 2.1)

### 🔧 Funcionalidades Técnicas
- Banner de consentimento não intrusivo
- Modal de configurações detalhadas
- Link flutuante para reconfiguração
- Sistema de notificações
- Armazenamento local de preferências
- Integração com Google Analytics e Facebook Pixel

## Estrutura de Arquivos

```
website_pips/
├── index.html                    # Página principal (modificada)
├── politica-privacidade.html     # Política de privacidade completa
├── politica-cookies-lgpd.md      # Documentação da política de cookies
├── css/
│   ├── styles.css               # Estilos originais do site
│   └── cookies-lgpd.css         # Estilos do sistema de cookies
├── js/
│   ├── script.js                # Scripts originais do site
│   └── cookies-lgpd.js          # Sistema de gerenciamento de cookies
└── images/                      # Imagens originais do site
```

## Categorias de Cookies

### 1. Cookies Essenciais (Obrigatórios)
- **Base Legal:** Interesse legítimo
- **Finalidade:** Funcionamento básico do site
- **Exemplos:** Sessão, CSRF, consentimento de cookies
- **Podem ser desabilitados:** ❌ Não

### 2. Cookies Funcionais
- **Base Legal:** Consentimento
- **Finalidade:** Melhorar experiência do usuário
- **Exemplos:** Preferências de idioma, tema, dados de formulário
- **Podem ser desabilitados:** ✅ Sim

### 3. Cookies de Análise
- **Base Legal:** Consentimento
- **Finalidade:** Análise de tráfego e comportamento
- **Exemplos:** Google Analytics (_ga, _gid, _gat)
- **Podem ser desabilitados:** ✅ Sim

### 4. Cookies de Marketing
- **Base Legal:** Consentimento
- **Finalidade:** Publicidade personalizada
- **Exemplos:** Facebook Pixel, Google Ads
- **Podem ser desabilitados:** ✅ Sim

## Como Usar

### Instalação
1. Copie os arquivos CSS e JS para seus respectivos diretórios
2. Adicione as referências no HTML:
```html
<!-- No <head> -->
<link rel="stylesheet" href="css/cookies-lgpd.css">

<!-- Antes do </body> -->
<script src="js/cookies-lgpd.js"></script>
```

### Configuração
1. **Personalize as categorias** no arquivo `cookies-lgpd.js`
2. **Configure IDs de rastreamento** (Google Analytics, Facebook Pixel)
3. **Ajuste textos e cores** conforme sua marca
4. **Teste em diferentes dispositivos**

### API JavaScript

```javascript
// Verificar consentimento
if (hasCookieConsent('analytics')) {
    // Carregar Google Analytics
}

// Atualizar consentimento
updateCookieConsent('marketing', true);

// Obter status completo
const status = getCookieConsentStatus();
console.log(status); // { essential: true, functional: false, ... }

// Revogar todo consentimento
cookieManager.revokeAllConsent();
```

## Fluxo de Funcionamento

### 1. Primeira Visita
1. Banner aparece após 1 segundo
2. Usuário pode aceitar todos, rejeitar ou personalizar
3. Consentimento é salvo com timestamp
4. Cookies permitidos são carregados

### 2. Visitas Subsequentes
1. Consentimento é verificado
2. Se válido, cookies são carregados automaticamente
3. Link de configurações fica disponível

### 3. Reconfiguração
1. Usuário clica no link "⚙️ Cookies"
2. Modal abre com configurações atuais
3. Alterações são salvas e aplicadas imediatamente

## Conformidade LGPD

### Princípios Atendidos
- **Transparência:** Informações claras sobre uso de cookies
- **Finalidade:** Cada categoria tem propósito específico
- **Adequação:** Tratamento compatível com finalidades
- **Necessidade:** Apenas dados necessários são coletados
- **Livre acesso:** Usuário pode consultar e alterar dados
- **Qualidade dos dados:** Informações precisas e atualizadas
- **Segurança:** Medidas técnicas de proteção
- **Prevenção:** Medidas para evitar danos
- **Não discriminação:** Não há prejuízo por recusar cookies
- **Responsabilização:** Demonstração de conformidade

### Direitos dos Titulares
- ✅ Confirmação da existência de tratamento
- ✅ Acesso aos dados
- ✅ Correção de dados incompletos/inexatos
- ✅ Anonimização/eliminação de dados
- ✅ Portabilidade dos dados
- ✅ Informação sobre compartilhamento
- ✅ Revogação do consentimento
- ✅ Oposição ao tratamento

## Personalização

### Cores e Estilos
Edite as variáveis CSS em `cookies-lgpd.css`:
```css
:root {
    --cookie-primary: #a8e6cf;    /* Cor principal */
    --cookie-secondary: #ffaaa5;  /* Cor secundária */
    --cookie-accent: #ffd3b6;     /* Cor de destaque */
}
```

### Textos e Mensagens
Modifique os textos no arquivo `cookies-lgpd.js`:
```javascript
this.categories = {
    essential: {
        name: 'Seu Texto Aqui',
        description: 'Sua descrição aqui',
        // ...
    }
}
```

### Integração com Analytics
Configure seus IDs de rastreamento:
```javascript
// Google Analytics
gtag('config', 'SEU_GA_ID');

// Facebook Pixel
fbq('init', 'SEU_PIXEL_ID');
```

## Testes Realizados

### ✅ Funcionalidades Testadas
- Banner de consentimento aparece corretamente
- Modal de configurações abre e fecha
- Toggles funcionam para cada categoria
- Botões de ação (aceitar/rejeitar/salvar) funcionam
- Notificações aparecem após ações
- Link de configurações fica visível após consentimento
- Página de política de privacidade carrega corretamente
- Design responsivo em diferentes tamanhos de tela

### ✅ Compatibilidade
- Navegadores modernos (Chrome, Firefox, Safari, Edge)
- Dispositivos móveis (iOS, Android)
- Tablets e desktops
- Leitores de tela (acessibilidade básica)

## Manutenção

### Atualizações Recomendadas
- **Anual:** Revisar política de privacidade
- **Semestral:** Verificar conformidade com novas regulamentações
- **Trimestral:** Auditar cookies de terceiros
- **Mensal:** Verificar funcionamento em novos navegadores

### Monitoramento
- Acompanhar taxa de aceitação de cookies
- Verificar erros no console do navegador
- Monitorar performance de carregamento
- Auditar cookies ativos periodicamente

## Suporte

Para dúvidas sobre implementação ou conformidade:
- **Documentação LGPD:** https://www.gov.br/anpd/
- **Guias de implementação:** Consulte a ANPD
- **Suporte técnico:** Desenvolvedor responsável

## Licença

Este sistema foi desenvolvido especificamente para a PIPS Pegue Monte e está em conformidade com a LGPD brasileira. Adaptações podem ser necessárias para outros contextos ou jurisdições.

---

**Versão:** 1.0  
**Data:** Janeiro 2025  
**Desenvolvido por:** Manus AI  
**Conformidade:** LGPD (Lei nº 13.709/2018)

