// ============================================
// 1️⃣ Datos del Dominio
// ============================================

const entityData = {
  name: 'EduFlex Online',
  description: 'Plataforma de cursos en línea enfocada en tecnología, programación y diseño web.',
  identifier: 'EDU-PLAT-2026',

  contact: {
    email: 'support@eduflex.com',
    phone: '+57 300 123 4567',
    location: 'Colombia'
  },

  items: [
    { name: 'JavaScript Moderno', level: 90, category: 'Programming' },
    { name: 'HTML & CSS Avanzado', level: 85, category: 'Web Design' },
    { name: 'Python desde Cero', level: 80, category: 'Backend' },
    { name: 'Git & GitHub', level: 75, category: 'Tools' },
    { name: 'React Básico', level: 70, category: 'Frontend' }
  ],

  links: [
    { platform: 'Website', url: 'https://eduflex.com', icon: '🌐' },
    { platform: 'YouTube', url: 'https://youtube.com', icon: '▶️' },
    { platform: 'Instagram', url: 'https://instagram.com', icon: '📸' }
  ],

  stats: {
    total: 12500,
    active: 9800,
    rating: 4.7,
    courses: 42
  }
};

// ============================================
// 2️⃣ Referencias al DOM
// ============================================

const userName = document.getElementById('userName');
const userTitle = document.getElementById('userTitle');
const userLocation = document.getElementById('userLocation');
const userBio = document.getElementById('userBio');
const userEmail = document.getElementById('userEmail');
const userPhone = document.getElementById('userPhone');

const skillsList = document.getElementById('skillsList');
const socialLinks = document.getElementById('socialLinks');
const statsContainer = document.getElementById('stats');

const themeToggle = document.getElementById('themeToggle');
const copyEmailBtn = document.getElementById('copyEmailBtn');
const toggleSkillsBtn = document.getElementById('toggleSkills');

const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// ============================================
// 3️⃣ Renderizar información básica
// ============================================

const renderBasicInfo = () => {
  const {
    name,
    description,
    contact: { email, phone, location }
  } = entityData;

  userName.textContent = name;
  userTitle.textContent = 'Online Learning Platform';
  userLocation.textContent = `📍 ${location}`;
  userBio.textContent = description;
  userEmail.textContent = email;
  userPhone.textContent = phone;
};

// ============================================
// 4️⃣ Renderizar cursos (skills)
// ============================================

const renderItems = (showAll = false) => {
  const { items } = entityData;

  const itemsToShow = showAll ? items : items.slice(0, 4);

  skillsList.innerHTML = itemsToShow.map(item => {
    const { name, level } = item;

    return `
      <div class="skill-item">
        <div class="skill-name">${name}</div>
        <div class="skill-level">
          <span>${level}%</span>
          <div class="skill-bar">
            <div class="skill-bar-fill" style="width: ${level}%"></div>
          </div>
        </div>
      </div>
    `;
  }).join('');
};

// ============================================
// 5️⃣ Renderizar enlaces
// ============================================

const renderLinks = () => {
  const { links } = entityData;

  socialLinks.innerHTML = links.map(link => {
    const { platform, url, icon } = link;

    return `
      <a href="${url}" target="_blank" class="social-link">
        ${icon} ${platform}
      </a>
    `;
  }).join('');
};

// ============================================
// 6️⃣ Renderizar estadísticas
// ============================================

const renderStats = () => {
  const { stats } = entityData;

  const statsArray = [
    { label: 'Estudiantes', value: stats.total },
    { label: 'Activos', value: stats.active },
    { label: 'Rating', value: stats.rating },
    { label: 'Cursos', value: stats.courses }
  ];

  statsContainer.innerHTML = statsArray.map(stat => `
    <div class="stat-item">
      <span class="stat-value">${stat.value}</span>
      <span class="stat-label">${stat.label}</span>
    </div>
  `).join('');
};

// ============================================
// 7️⃣ Cambio de tema
// ============================================

const toggleTheme = () => {
  const currentTheme = document.documentElement.dataset.theme ?? 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.dataset.theme = newTheme;
  themeToggle.querySelector('.theme-icon').textContent =
    newTheme === 'dark' ? '☀️' : '🌙';

  localStorage.setItem('theme', newTheme);
};

const loadTheme = () => {
  const savedTheme = localStorage.getItem('theme') ?? 'light';
  document.documentElement.dataset.theme = savedTheme;
  themeToggle.querySelector('.theme-icon').textContent =
    savedTheme === 'dark' ? '☀️' : '🌙';
};

// ============================================
// 8️⃣ Copiar información
// ============================================

const copyInfo = () => {
  const { contact } = entityData;

  navigator.clipboard.writeText(contact.email);
  showToast('Correo copiado al portapapeles');
};

// ============================================
// Toast
// ============================================

const showToast = message => {
  toastMessage.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
};

// ============================================
// 9️⃣ Mostrar / ocultar cursos
// ============================================

let showingAllItems = false;

const handleToggleItems = () => {
  showingAllItems = !showingAllItems;
  renderItems(showingAllItems);
  toggleSkillsBtn.textContent = showingAllItems ? 'Show Less' : 'Show More';
};

// ============================================
// 🔟 Event Listeners
// ============================================

themeToggle.addEventListener('click', toggleTheme);
copyEmailBtn.addEventListener('click', copyInfo);
toggleSkillsBtn.addEventListener('click', handleToggleItems);

// ============================================
// 1️⃣1️⃣ Inicialización
// ============================================

const init = () => {
  loadTheme();
  renderBasicInfo();
  renderItems();
  renderLinks();
  renderStats();
  console.log('✅ Online Learning Platform initialized');
};

init();
