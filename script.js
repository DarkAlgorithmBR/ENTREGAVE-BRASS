// ===== Configuração =====
const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRo3adt6sqyVdXcdexsAeXPC1SU7V4rsgXGaPZBjUc9CzAb1KH1xSxOo_Z2X6gGObRP4_i4H8c5nDM2/pub?gid=0&single=true&output=csv";
const AUTO_REFRESH_MS = 120000;
const CATEGORY_FILTER = "FEMININA";

const factoryListElement = document.getElementById('factory-list');
const searchInput = document.getElementById('factory-search');
const backToTopBtn = document.getElementById('back-to-top');

let allFactories = typeof INITIAL_FACTORIES !== 'undefined' ? [...INITIAL_FACTORIES] : [];

// ===== Utilidades =====
function normalizeText(str) {
  return (str || "")
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function makeInstagramLink(value) {
  const v = (value || "").toString().trim();
  if (!v) return "";
  if (v.includes("instagram.com")) return v.startsWith("http") ? v : `https://${v}`;
  const handle = v.replace(/^@+/, "").replace(/^https?:\/\/+/i, "").replace(/^www\./i, "").trim();
  return handle ? `https://www.instagram.com/${handle}` : "";
}

function makeWhatsAppLink(value) {
  const v = (value || "").toString().trim();
  if (!v) return "";
  if (v.includes("wa.me") || v.includes("whatsapp.com")) return v.startsWith("http") ? v : `https://${v}`;
  let digits = v.replace(/\D/g, "");
  if (!digits) return "";
  if (!digits.startsWith("55")) digits = "55" + digits;
  return `https://wa.me/${digits}`;
}

// ===== Fetch + Parse de Fábricas =====
async function fetchFactories() {
  try {
    const url = `${SHEET_CSV_URL}&t=${Date.now()}`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(url, { cache: "no-store", signal: controller.signal });
    clearTimeout(timer);

    if (!response.ok) throw new Error("HTTP " + response.status);
    const csvText = await response.text();
    if (!csvText.trim() || csvText.trim().startsWith("<")) throw new Error("Resposta inválida");

    const lines = csvText.split(/\r?\n/);
    const factories = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      const row = line.split(',');
      const name = (row[0] || "").trim();
      if (!name) continue;

      const cat = (row[3] || "").trim();
      if (!normalizeText(cat).includes(normalizeText(CATEGORY_FILTER))) continue;

      factories.push({
        name: name,
        code: (row[5] || "").trim() || "—",
        category: cat || "—",
        state: (row[4] || "").trim() || "—",
        links: {
          instagram: makeInstagramLink(row[1]),
          whatsapp: makeWhatsAppLink(row[2])
        }
      });
    }

    if (factories.length > 0) {
      allFactories = factories;
      renderFactories(searchInput?.value || "");
    }
  } catch (e) {
    console.warn("Usando catálogo local offline:", e.message);
  }
}

// ===== Renderização da Lista de Fábricas =====
function renderFactories(searchQuery = '') {
  if (!factoryListElement) return;
  factoryListElement.innerHTML = '';

  let filtered = allFactories;
  if (searchQuery) {
    const q = searchQuery.toLowerCase().trim();
    filtered = filtered.filter(f =>
      f.name.toLowerCase().includes(q) ||
      f.code.toLowerCase().includes(q) ||
      (f.state && f.state.toLowerCase().includes(q))
    );
  }

  if (filtered.length === 0) {
    factoryListElement.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; color: #999;">
        <i class="fa-solid fa-filter-circle-xmark" style="font-size: 3rem; margin-bottom: 16px; color: #ddd;"></i>
        <p>Nenhuma fábrica encontrada.</p>
        <p style="font-size: 0.85rem; margin-top: 8px;">Tente pesquisar com outro termo.</p>
      </div>
    `;
    return;
  }

  filtered.forEach((factory, index) => {
    const card = document.createElement('article');
    card.className = 'factory-card';
    card.style.animationDelay = `${Math.min(index * 0.03, 0.4)}s`;
    card.classList.add('fade-in');

    let buttonsHtml = '';
    if (factory.links.whatsapp && factory.links.whatsapp !== '#') {
      buttonsHtml += `
        <a href="${factory.links.whatsapp}" target="_blank" rel="noopener noreferrer" class="action-btn btn-whatsapp">
          <i class="fa-brands fa-whatsapp"></i>
          WhatsApp
        </a>`;
    }

    if (factory.links.instagram) {
      buttonsHtml += `
        <a href="${factory.links.instagram}" target="_blank" rel="noopener noreferrer" class="action-btn btn-instagram">
          <i class="fa-brands fa-instagram"></i>
          Instagram
        </a>`;
    }

    card.innerHTML = `
      <div class="card-body">
        <div class="card-header-row">
          <div class="header-left">
            <h2 class="factory-name">${factory.name}</h2>
            <span class="factory-code">Código: ${factory.code}</span>
          </div>
        </div>
        
        <span class="category-badge">${factory.state}</span>

        <div class="card-actions" style="margin-top: 20px;">
          ${buttonsHtml}
        </div>
      </div>
    `;

    factoryListElement.appendChild(card);
  });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== Inicialização =====
document.addEventListener('DOMContentLoaded', () => {
  renderFactories();
  fetchFactories();

  if (AUTO_REFRESH_MS > 0) {
    setInterval(fetchFactories, AUTO_REFRESH_MS);
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderFactories(e.target.value);
    });
  }

  window.addEventListener('scroll', () => {
    if (!backToTopBtn) return;
    if (window.scrollY > 300) backToTopBtn.classList.add('visible');
    else backToTopBtn.classList.remove('visible');
  });
});
