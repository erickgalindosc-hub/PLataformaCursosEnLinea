/* =====================================================
   GESTOR DE CURSOS ONLINE
   Proyecto Week-02 - Cumple todos los requisitos
   ===================================================== */

/* =============================
   ESTADO GLOBAL
   ============================= */

// Array donde se almacenan todos los cursos
let courses = [];

// ID del curso que se está editando
let editingId = null;


/* =============================
   LOCAL STORAGE
   ============================= */

// Cargar cursos desde LocalStorage
const loadCourses = () => {
  return JSON.parse(localStorage.getItem("courses") ?? "[]");
};

// Guardar cursos en LocalStorage
const saveCourses = courses => {
  localStorage.setItem("courses", JSON.stringify(courses));
};


/* =============================
   CREAR CURSO (CRUD)
   ============================= */

const createCourse = data => {

  // Creamos el objeto curso con valores por defecto
  const newCourse = {
    id: Date.now(),
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: null,
    ...data
  };

  // Inmutabilidad: NO usamos push
  const updated = [...courses, newCourse];

  saveCourses(updated);
  return updated;
};


/* =============================
   ACTUALIZAR CURSO
   ============================= */

const updateCourse = (id, updates) => {

  // Usamos map para modificar sin mutar
  const updated = courses.map(course =>
    course.id === id
      ? { ...course, ...updates, updatedAt: new Date().toISOString() }
      : course
  );

  saveCourses(updated);
  return updated;
};


/* =============================
   ELIMINAR CURSO
   ============================= */

const deleteCourse = id => {
  const filtered = courses.filter(course => course.id !== id);
  saveCourses(filtered);
  return filtered;
};


/* =============================
   ACTIVAR / DESACTIVAR CURSO
   ============================= */

const toggleActive = id => {
  const updated = courses.map(course =>
    course.id === id
      ? { ...course, active: !course.active }
      : course
  );

  saveCourses(updated);
  return updated;
};


/* =============================
   FILTROS Y BÚSQUEDA
   ============================= */

const applyFilters = () => {

  const status = document.getElementById("filter-status").value;
  const search = document.getElementById("search").value.toLowerCase();

  let filtered = courses;

  // Filtrar por estado
  if (status === "active") filtered = filtered.filter(c => c.active);
  if (status === "inactive") filtered = filtered.filter(c => !c.active);

  // Buscar texto
  if (search)
    filtered = filtered.filter(c =>
      c.name.toLowerCase().includes(search)
    );

  renderCourses(filtered);
};


/* =============================
   ESTADÍSTICAS (REDUCE)
   ============================= */

const getStats = () => {

  const stats = courses.reduce((acc, course) => {
    acc.total++;
    course.active ? acc.active++ : acc.inactive++;
    return acc;
  }, { total: 0, active: 0, inactive: 0 });

  document.getElementById("stats").innerHTML = `
    📊 Total: ${stats.total} |
    ✅ Activos: ${stats.active} |
    ❌ Inactivos: ${stats.inactive}
  `;
};


/* =============================
   RENDERIZAR CURSOS
   ============================= */

const renderCourses = list => {

  const container = document.getElementById("course-list");

  container.innerHTML = list.map(course => `
    <div>
      <h3>${course.name}</h3>
      <p>${course.description}</p>

      <button onclick="toggle(${course.id})">
        ${course.active ? "Desactivar" : "Activar"}
      </button>

      <button onclick="edit(${course.id})">Editar</button>
      <button onclick="remove(${course.id})">Eliminar</button>
    </div>
  `).join("");

};


/* =============================
   EVENTOS
   ============================= */

document.getElementById("course-form").addEventListener("submit", e => {

  e.preventDefault();

  const data = {
    name: name.value,
    description: description.value,
    category: category.value,
    priority: priority.value
  };

  if (editingId) {
    courses = updateCourse(editingId, data);
    editingId = null;
  } else {
    courses = createCourse(data);
  }

  e.target.reset();
  renderCourses(courses);
  getStats();
});


/* =============================
   ACCIONES DE BOTONES
   ============================= */

const toggle = id => {
  courses = toggleActive(id);
  renderCourses(courses);
  getStats();
};

const remove = id => {
  courses = deleteCourse(id);
  renderCourses(courses);
  getStats();
};

const edit = id => {
  const course = courses.find(c => c.id === id);

  name.value = course.name;
  description.value = course.description;
  category.value = course.category;
  priority.value = course.priority;

  editingId = id;
};


/* =============================
   INICIALIZACIÓN
   ============================= */

const init = () => {
  courses = loadCourses();
  renderCourses(courses);
  getStats();
};

init()
