/**
 * ============================================
 * EDUFLEX | SISTEMA DE GESTIÓN DE CURSOS
 * PROYECTO SEMANA 03
 * ============================================
 */

/* =====================================================
   MODELOS (BUSINESS LOGIC)
===================================================== */

class Course {
  #id;
  #name;
  #active;
  #location;
  #dateCreated;

  constructor(name, location) {
    if (new.target === Course) {
      throw new Error("Course es una clase abstracta");
    }
    this.#id = crypto.randomUUID();
    this.#name = name;
    this.#location = location;
    this.#active = true;
    this.#dateCreated = new Date().toISOString();
  }

  get id() { return this.#id; }
  get name() { return this.#name; }
  get isActive() { return this.#active; }
  get location() { return this.#location; }
  get dateCreated() { return this.#dateCreated; }

  set location(value) {
    if (!value || value.trim() === "") throw new Error("Ubicación inválida");
    this.#location = value.trim();
  }

  activate() { this.#active = true; }
  deactivate() { this.#active = false; }
  
  getType() { return this.constructor.name; }
}

class ProgrammingCourse extends Course {
  #language;
  #difficulty;
  constructor(name, location, language, difficulty) {
    super(name, location);
    this.#language = language;
    this.#difficulty = difficulty;
  }
  getInfo() {
    return { id: this.id, name: this.name, type: this.getType(), location: this.location, language: this.#language, difficulty: this.#difficulty, active: this.isActive };
  }
}

class DesignCourse extends Course {
  #tool;
  #hours;
  constructor(name, location, tool, hours) {
    super(name, location);
    this.#tool = tool;
    this.#hours = hours;
  }
  getInfo() {
    return { id: this.id, name: this.name, type: this.getType(), location: this.location, tool: this.#tool, hours: this.#hours, active: this.isActive };
  }
}

class MarketingCourse extends Course {
  #strategy;
  #certificate;
  constructor(name, location, strategy, certificate) {
    super(name, location);
    this.#strategy = strategy;
    this.#certificate = certificate;
  }
  getInfo() {
    return { id: this.id, name: this.name, type: this.getType(), location: this.location, strategy: this.#strategy, certificate: this.#certificate, active: this.isActive };
  }
}

class Person {
  #id; #name; #email; #registrationDate;
  constructor(name, email) {
    this.#id = crypto.randomUUID();
    this.#name = name;
    this.email = email;
    this.#registrationDate = new Date().toISOString();
  }
  get id() { return this.#id; }
  get name() { return this.#name; }
  get email() { return this.#email; }
  get registrationDate() { return this.#registrationDate; }
  set email(value) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) throw new Error("Email inválido");
    this.#email = value;
  }
}

class Student extends Person {
  #enrolledCourses = [];
  enroll(course) { this.#enrolledCourses.push(course); }
  get enrolledCourses() { return [...this.#enrolledCourses]; }
}

class Instructor extends Person {
  #specialty;
  constructor(name, email, specialty) {
    super(name, email);
    this.#specialty = specialty;
  }
  get specialty() { return this.#specialty; }
}

class LearningPlatform {
  #items = [];
  #users = [];

  addItem(item) {
    this.#items.push(item);
    return { success: true };
  }

  removeItem(id) {
    const index = this.#items.findIndex(i => i.id === id);
    if (index !== -1) {
        this.#items.splice(index, 1);
        return true;
    }
    return false;
  }

  getAllItems() { return [...this.#items]; }
  
  addUser(user) {
    this.#users.push(user);
    return { success: true };
  }

  getAllUsers() { return [...this.#users]; }

  getStats() {
    const total = this.#items.length;
    const active = this.#items.filter(i => i.isActive).length;
    return { total, active, inactive: total - active, users: this.#users.length };
  }
}

/* =====================================================
   UI CONTROLLER
===================================================== */

class UIController {
  constructor(system) {
    this.system = system;
    this.initEventListeners();
    this.renderAll();
  }

  initEventListeners() {
    // Tab switching
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.switchTab(e.currentTarget.getAttribute('data-tab'));
      });
    });

    // Filters
    ['search-input', 'filter-type', 'filter-status'].forEach(id => {
      document.getElementById(id).addEventListener(id === 'search-input' ? 'input' : 'change', () => this.renderCourses());
    });

    ['search-users', 'filter-role'].forEach(id => {
        document.getElementById(id).addEventListener(id === 'search-users' ? 'input' : 'change', () => this.renderUsers());
    });

    // Buttons
    document.getElementById('add-item-btn').addEventListener('click', () => {
        alert("Funcionalidad de agregar curso (Modal) se implementará en la siguiente fase.");
    });
    
    document.getElementById('add-user-btn').addEventListener('click', () => {
        alert("Funcionalidad de agregar usuario se implementará en la siguiente fase.");
    });
  }

  switchTab(tabId) {
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId));
    document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.toggle('active', panel.id === tabId));
    
    const titles = { catalog: 'Catálogo de Cursos', users: 'Gestión de Usuarios', transactions: 'Inscripciones', stats: 'Estadísticas' };
    document.getElementById('current-tab-title').textContent = titles[tabId] || 'EduFlex';
    
    if (tabId === 'stats') this.renderStats();
  }

  renderCourses() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const type = document.getElementById('filter-type').value;
    const status = document.getElementById('filter-status').value;
    const container = document.getElementById('item-list');
    const emptyState = document.getElementById('empty-state');

    let items = this.system.getAllItems().filter(item => {
        const matchesQuery = item.name.toLowerCase().includes(query);
        const matchesType = type === 'all' || item.getType() === type;
        const matchesStatus = status === 'all' || (status === 'active' ? item.isActive : !item.isActive);
        return matchesQuery && matchesType && matchesStatus;
    });

    container.innerHTML = '';
    emptyState.style.display = items.length === 0 ? 'flex' : 'none';

    items.forEach(item => {
        const info = item.getInfo();
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <div class="card-header">
                <div class="card-title-area">
                    <h3 class="card-title">${info.name}</h3>
                    <span class="card-subtitle">📍 ${info.location}</span>
                </div>
                <span class="item-type-badge ${info.type.toLowerCase()}">${info.type.replace('Course', '')}</span>
            </div>
            <div class="card-body">
                ${this.getCourseSpecificHTML(info)}
                <div class="card-info-item">
                    <span>Estado:</span>
                    <strong style="color: ${info.active ? 'var(--success)' : 'var(--danger)'}">
                        ${info.active ? 'Activo' : 'Inactivo'}
                    </strong>
                </div>
            </div>
            <div class="card-actions">
                <button class="btn btn-ghost" onclick="app.toggleCourseStatus('${info.id}')">
                    ${info.active ? 'Desactivar' : 'Activar'}
                </button>
                <button class="btn btn-danger-ghost" onclick="app.deleteCourse('${info.id}')">Eliminar</button>
            </div>
        `;
        container.appendChild(card);
    });
  }

  getCourseSpecificHTML(info) {
    if (info.type === 'ProgrammingCourse') return `<div class="card-info-item">💻 <span>Lenguaje:</span> <strong>${info.language}</strong></div><div class="card-info-item">📈 <span>Nivel:</span> <strong>${info.difficulty}</strong></div>`;
    if (info.type === 'DesignCourse') return `<div class="card-info-item">🎨 <span>Herramienta:</span> <strong>${info.tool}</strong></div><div class="card-info-item">⏱️ <span>Horas:</span> <strong>${info.hours}h</strong></div>`;
    if (info.type === 'MarketingCourse') return `<div class="card-info-item">📣 <span>Estrategia:</span> <strong>${info.strategy}</strong></div><div class="card-info-item">📜 <span>Certificado:</span> <strong>${info.certificate ? 'Sí' : 'No'}</strong></div>`;
    return '';
  }

  renderUsers() {
    const query = document.getElementById('search-users').value.toLowerCase();
    const role = document.getElementById('filter-role').value;
    const container = document.getElementById('user-list');

    let users = this.system.getAllUsers().filter(user => {
        const matchesQuery = user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query);
        const matchesRole = role === 'all' || user.constructor.name === role;
        return matchesQuery && matchesRole;
    });

    container.innerHTML = '';
    users.forEach(user => {
        const card = document.createElement('div');
        card.className = 'member-card';
        card.innerHTML = `
            <div class="card-header">
                <div class="card-title-area">
                    <h3 class="card-title">${user.name}</h3>
                    <span class="card-subtitle">📧 ${user.email}</span>
                </div>
                <span class="item-type-badge indigo">${user.constructor.name}</span>
            </div>
            <div class="card-body">
                <div class="card-info-item">📅 Registro: <strong>${new Date(user.registrationDate).toLocaleDateString()}</strong></div>
                ${user instanceof Instructor ? `<div class="card-info-item">🎓 Especialidad: <strong>${user.specialty}</strong></div>` : ''}
                ${user instanceof Student ? `<div class="card-info-item">📚 Cursos: <strong>${user.enrolledCourses.length}</strong></div>` : ''}
            </div>
        `;
        container.appendChild(card);
    });
  }

  renderStats() {
    const stats = this.system.getStats();
    document.getElementById('stat-total').textContent = stats.total;
    document.getElementById('stat-active').textContent = stats.active;
    document.getElementById('stat-inactive').textContent = stats.inactive;
    document.getElementById('stat-users').textContent = stats.users;
  }

  renderAll() {
      this.renderCourses();
      this.renderUsers();
      this.renderStats();
  }
}

/* =====================================================
   INICIALIZACIÓN
===================================================== */

const system = new LearningPlatform();
let ui;

const init = () => {
  // Mock Data
  system.addItem(new ProgrammingCourse("Fullstack JS Moderno", "Online", "JavaScript", "Avanzado"));
  system.addItem(new ProgrammingCourse("Python para Data Science", "Online", "Python", "Intermedio"));
  system.addItem(new DesignCourse("UX Fundamentals", "Presencial", "Figma", 40));
  system.addItem(new MarketingCourse("Growth Hacking 2026", "Online", "Viral Loop", true));
  
  const instructor = new Instructor("Erick Galindo", "erick@eduflex.com", "Software Architecture");
  const student = new Student("Juan Perez", "juan@gmail.com");
  student.enroll(system.getAllItems()[0]);
  
  system.addUser(instructor);
  system.addUser(student);
  system.addUser(new Student("Maria Garcia", "maria@outlook.com"));

  ui = new UIController(system);
  
  // Global API for onclick handlers
  window.app = {
      toggleCourseStatus: (id) => {
          const item = system.getAllItems().find(i => i.id === id);
          if (item) {
              item.isActive ? item.deactivate() : item.activate();
              ui.renderAll();
          }
      },
      deleteCourse: (id) => {
          if (confirm("¿Estás seguro de eliminar este curso?")) {
              system.removeItem(id);
              ui.renderAll();
          }
      }
  };
};

document.addEventListener("DOMContentLoaded", init);
