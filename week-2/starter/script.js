/* =====================================================
   GESTOR DE CURSOS ONLINE | EDU FLEX
   Proyecto Week-02 - Rediseño Profesional
   ===================================================== */

/* =============================
   ESTADO GLOBAL
   ============================= */

let courses = [];
let editingId = null;

// Mapeo de iconos por categoría
const categoryIcons = {
  programming: '💻',
  design: '🎨',
  marketing: '📈',
  business: '💼'
};

/* =============================
   LOCAL STORAGE
   ============================= */

const loadCourses = () => {
  return JSON.parse(localStorage.getItem("courses") ?? "[]");
};

const saveCourses = updatedCourses => {
  localStorage.setItem("courses", JSON.stringify(updatedCourses));
};

/* =============================
   OPERACIONES CRUD
   ============================= */

const createCourse = data => {
  const newCourse = {
    id: Date.now(),
    active: true,
    createdAt: new Date().toISOString(),
    ...data
  };
  const updated = [...courses, newCourse];
  saveCourses(updated);
  return updated;
};

const updateCourse = (id, updates) => {
  const updated = courses.map(course =>
    course.id === id ? { ...course, ...updates, updatedAt: new Date().toISOString() } : course
  );
  saveCourses(updated);
  return updated;
};

const deleteCourse = id => {
  const filtered = courses.filter(course => course.id !== id);
  saveCourses(filtered);
  return filtered;
};

const toggleActive = id => {
  const updated = courses.map(course =>
    course.id === id ? { ...course, active: !course.active } : course
  );
  saveCourses(updated);
  return updated;
};

/* =============================
   FILTROS Y BÚSQUEDA
   ============================= */

const applyFilters = () => {
  const status = document.getElementById("filter-status").value;
  const searchTerm = document.getElementById("search").value.toLowerCase();

  let filtered = courses;

  if (status === "active") filtered = filtered.filter(c => c.active);
  if (status === "inactive") filtered = filtered.filter(c => !c.active);

  if (searchTerm) {
    filtered = filtered.filter(c =>
      c.name.toLowerCase().includes(searchTerm) ||
      c.description.toLowerCase().includes(searchTerm)
    );
  }

  renderCourses(filtered);
};

/* =============================
   ESTADÍSTICAS
   ============================= */

const getStats = () => {
  const stats = courses.reduce((acc, course) => {
    acc.total++;
    course.active ? acc.active++ : acc.inactive++;
    return acc;
  }, { total: 0, active: 0, inactive: 0 });

  document.getElementById("stats").innerHTML = `
    <div class="stat-chip">
      <span>Total:</span>
      <span class="stat-value">${stats.total}</span>
    </div>
    <div class="stat-chip">
      <span>Activos:</span>
      <span class="stat-value" style="color: var(--success)">${stats.active}</span>
    </div>
    <div class="stat-chip">
      <span>Inactivos:</span>
      <span class="stat-value" style="color: var(--danger)">${stats.inactive}</span>
    </div>
  `;
};

/* =============================
   RENDERIZAR CURSOS
   ============================= */

const renderCourses = (list = courses) => {
  const container = document.getElementById("course-list");

  if (list.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
        <p>No se encontraron cursos.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(course => `
    <article class="course-card ${course.active ? '' : 'inactive'}">
      <div class="card-top">
        <div class="category-icon" title="${course.category}">
          ${categoryIcons[course.category] || '📚'}
        </div>
        <span class="priority-badge priority-${course.priority}">
          ${course.priority === 'high' ? 'Avanzado' : course.priority === 'medium' ? 'Intermedio' : 'Básico'}
        </span>
      </div>

      <h3>${course.name}</h3>
      <p>${course.description || 'Sin descripción disponible.'}</p>

      <div class="card-actions">
        <button class="action-btn toggle" onclick="toggle(${course.id})" title="${course.active ? 'Desactivar' : 'Activar'}">
          ${course.active ? 'Desactivar' : 'Activar'}
        </button>
        <button class="action-btn edit" onclick="edit(${course.id})" title="Editar curso">
          Editar
        </button>
        <button class="action-btn delete" onclick="remove(${course.id})" title="Eliminar curso">
          Eliminar
        </button>
      </div>
    </article>
  `).join("");
};

/* =============================
   EVENTOS
   ============================= */

document.getElementById("course-form").addEventListener("submit", e => {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    category: document.getElementById("category").value,
    priority: document.getElementById("priority").value
  };

  if (editingId) {
    courses = updateCourse(editingId, data);
    editingId = null;
    document.getElementById("submit-btn").textContent = "Guardar Curso";
  } else {
    courses = createCourse(data);
  }

  e.target.reset();
  applyFilters();
  getStats();
});

// Event listeners para filtros
document.getElementById("filter-status").addEventListener("change", applyFilters);
document.getElementById("search").addEventListener("input", applyFilters);

/* =============================
   ACCIONES
   ============================= */

window.toggle = id => {
  courses = toggleActive(id);
  applyFilters();
  getStats();
};

window.remove = id => {
  if (confirm("¿Estás seguro de que deseas eliminar este curso?")) {
    courses = deleteCourse(id);
    applyFilters();
    getStats();
  }
};

window.edit = id => {
  const course = courses.find(c => c.id === id);
  if (!course) return;

  document.getElementById("course-id").value = course.id;
  document.getElementById("name").value = course.name;
  document.getElementById("description").value = course.description;
  document.getElementById("category").value = course.category;
  document.getElementById("priority").value = course.priority;

  editingId = id;
  document.getElementById("submit-btn").textContent = "Actualizar Curso";

  // Opcional: Scroll al formulario en móviles
  if (window.innerWidth < 1024) {
    document.querySelector('.sidebar').scrollIntoView({ behavior: 'smooth' });
  }
};

/* =============================
   INICIALIZACIÓN
   ============================= */

const init = () => {
  courses = loadCourses();
  renderCourses();
  getStats();
  console.log("🚀 EduFlex initialized");
};

init();
