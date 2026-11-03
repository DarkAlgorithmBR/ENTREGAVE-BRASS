# Entregável "Moda Feminina - Fábricas Preço de Custo"

Clone fiel e funcional baseado na estrutura real da página:
**URL Original:** `https://roupasprecodefabrica.com/feminina/ADS/`

---

## 📁 Arquivos do Projeto

- **[`index.html`](file:///c:/Users/delgi/Documents/entregavel-brass/index.html)**: Arquivo executável principal. Contém a lista de fábricas de Moda Feminina e o modal idêntico ao pop-up original acionado pelo botão **"VER PEÇAS"**.
- **[`style.css`](file:///c:/Users/delgi/Documents/entregavel-brass/style.css)**: Estilos da página principal (cabeçalho, barra de busca, cards de fábrica, botões de WhatsApp e Instagram).
- **[`popup-style.css`](file:///c:/Users/delgi/Documents/entregavel-brass/popup-style.css)**: Estilos oficiais do pop-up de Achados do Dia (cards escuros com borda translúcida, badges rosa neon, fotos de modelos, comparativo FÁBRICA vs FORNECEDOR e caixa de economia).
- **[`script.js`](file:///c:/Users/delgi/Documents/entregavel-brass/script.js)**: Lógica completa de renderização, cálculo de economia, busca em tempo real e abertura/fechamento do modal.
- **[`feminina_data.js`](file:///c:/Users/delgi/Documents/entregavel-brass/feminina_data.js)**: Banco de dados com **138 fábricas reais** e **119 peças com fotos baixadas localmente**.
- **[`popup_images/`](file:///c:/Users/delgi/Documents/entregavel-brass/popup_images)**: Pasta com as **119 fotos reais em alta definição** de todas as peças (vestidos, conjuntos, croppeds, etc.).
- **[`server.js`](file:///c:/Users/delgi/Documents/entregavel-brass/server.js)**: Servidor Node.js local.

---

## 📸 Como ficou a parte do botão "VER PEÇAS" (Idêntica ao Print):

Ao clicar no botão **"VER PEÇAS"** no card *"ESTOU TE AJUDANDO 🩷"*:
1. **Botão de Fechar Redondo Rosa:** Círculo rosa neon com "✕" no canto superior direito para fechar a qualquer momento (ou apertando ESC).
2. **Card Superior de Destaque:** Ícone com coração `💖`, título em caixa alta **ESTOU TE AJUDANDO** e subtítulo *"Pra ficar fácil de conhecer as peças, selecionei algumas pra você 😊"*.
3. **Barra de Pesquisa Interna:** *"Buscar por produto, fábrica ou código"*.
4. **Cards das Peças:**
   - Título em destaque (ex: `Conjunto 203 Helena curto`).
   - Badges: `ID: 288` (cinza) e `MENINA MODERNA` (rosa neon).
   - Foto real da modelo usando a peça centralizada no fundo escuro.
   - Badge central: `FAIXA DE PREÇO`.
   - Comparativo: Coluna **FÁBRICA** (`R$ 12,99`) vs Coluna **FORNECEDOR** (`R$ 24,38`).
   - Mensagem explicativa: *"Você compra pelo preço da FÁBRICA. O valor do fornecedor é para comparação."*
   - Caixa de economia estimada calculando o lucro.
   - Botão verde oficial: **COMPRAR DA FÁBRICA**, com o link direto do WhatsApp do fabricante já com a mensagem configurada.

---

## 🚀 Como Testar:

### Opção 1: Abrir direto no Navegador
Dê um **duplo clique no arquivo [`index.html`](file:///c:/Users/delgi/Documents/entregavel-brass/index.html)**. Funciona 100% offline e online!

### Opção 2: Servidor Local Node.js
```bash
node server.js
```
Acesse: `http://localhost:3000`
