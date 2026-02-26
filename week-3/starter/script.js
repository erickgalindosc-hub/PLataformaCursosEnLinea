/**
 * ============================================
 * PROYECTO SEMANA 03
 * SISTEMA DE GESTIÓN - PLATAFORMA DE CURSOS ONLINE
 * ============================================
 *
 * Dominio: Plataforma de Cursos en Línea
 * Nomenclatura técnica en inglés
 * Comentarios explicativos en español
 * ES2023 + POO Moderna
 * ============================================
 */

/* =====================================================
   CLASE BASE ABSTRACTA - Course
===================================================== */

class Course {
  // Campos privados obligatorios
  #id;
  #name;
  #active;
  #location;
  #dateCreated;

  /**
   * Constructor base para todos los cursos
   * @param {string} name - Nombre del curso
   * @param {string} location - Plataforma o modalidad (Online, Presencial)
   */
  constructor(name, location) {
    if (new.target === Course) {
      throw new Error("Course es una clase abstracta y no puede instanciarse directamente");
    }

    this.#id = crypto.randomUUID();
    this.#name = name;
    this.#location = location;
    this.#active = true;
    this.#dateCreated = new Date().toISOString();
  }

  /* ==================== GETTERS ==================== */

  get id() { return this.#id; }
  get name() { return this.#name; }
  get isActive() { return this.#active; }
  get location() { return this.#location; }
  get dateCreated() { return this.#dateCreated; }

  /* ==================== SETTERS ==================== */

  /**
   * Permite cambiar la ubicación del curso con validación
   */
  set location(value) {
    if (!value || value.trim() === "") {
      throw new Error("La ubicación no puede estar vacía");
    }
    this.#location = value.trim();
  }

  /* ==================== MÉTODOS DE ESTADO ==================== */

  activate() {
    if (this.#active) {
      return { success: false, message: "El curso ya está activo" };
    }
    this.#active = true;
    return { success: true, message: "Curso activado correctamente" };
  }

  deactivate() {
    if (!this.#active) {
      return { success: false, message: "El curso ya está inactivo" };
    }
    this.#active = false;
    return { success: true, message: "Curso desactivado correctamente" };
  }

  /**
   * Método abstracto obligatorio
   */
  getInfo() {
    throw new Error("getInfo() debe ser implementado en la clase hija");
  }

  getType() {
    return this.constructor.name;
  }
}

/* =====================================================
   CLASES DERIVADAS
===================================================== */

/* ---------------- ProgrammingCourse ---------------- */

class ProgrammingCourse extends Course {
  #language;
  #difficulty;

  constructor(name, location, language, difficulty) {
    super(name, location);
    this.#language = language;
    this.#difficulty = difficulty;
  }

  get language() { return this.#language; }
  get difficulty() { return this.#difficulty; }

  getInfo() {
    return {
      id: this.id,
      name: this.name,
      type: this.getType(),
      location: this.location,
      language: this.#language,
      difficulty: this.#difficulty,
      active: this.isActive
    };
  }
}

/* ---------------- DesignCourse ---------------- */

class DesignCourse extends Course {
  #tool;
  #hours;

  constructor(name, location, tool, hours) {
    super(name, location);
    this.#tool = tool;
    this.#hours = hours;
  }

  get tool() { return this.#tool; }
  get hours() { return this.#hours; }

  getInfo() {
    return {
      id: this.id,
      name: this.name,
      type: this.getType(),
      tool: this.#tool,
      hours: this.#hours,
      active: this.isActive
    };
  }
}

/* ---------------- MarketingCourse ---------------- */

class MarketingCourse extends Course {
  #strategy;
  #certificate;

  constructor(name, location, strategy, certificate) {
    super(name, location);
    this.#strategy = strategy;
    this.#certificate = certificate;
  }

  get strategy() { return this.#strategy; }
  get certificate() { return this.#certificate; }

  getInfo() {
    return {
      id: this.id,
      name: this.name,
      type: this.getType(),
      strategy: this.#strategy,
      certificate: this.#certificate,
      active: this.isActive
    };
  }
}

/* =====================================================
   CLASE PERSON
===================================================== */

class Person {
  #id;
  #name;
  #email;
  #registrationDate;

  constructor(name, email) {
    this.#id = crypto.randomUUID();
    this.#name = name;
    this.email = email; // usa setter
    this.#registrationDate = new Date().toISOString();
  }

  get id() { return this.#id; }
  get name() { return this.#name; }
  get email() { return this.#email; }
  get registrationDate() { return this.#registrationDate; }

  set email(value) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value)) {
      throw new Error("Formato de email inválido");
    }
    this.#email = value;
  }
}

/* =====================================================
   ROLES
===================================================== */

class Student extends Person {
  #enrolledCourses = [];

  enroll(course) {
    this.#enrolledCourses.push(course);
  }

  get enrolledCourses() {
    return [...this.#enrolledCourses];
  }
}

class Instructor extends Person {
  #specialty;

  constructor(name, email, specialty) {
    super(name, email);
    this.#specialty = specialty;
  }

  get specialty() { return this.#specialty; }
}

/* =====================================================
   CLASE PRINCIPAL - LearningPlatform
===================================================== */

class LearningPlatform {
  #items = [];
  #users = [];
  #transactions = [];

  static {
    this.VERSION = "1.0.0";
    this.MAX_ITEMS = 1000;
    this.SYSTEM_NAME = "LearningPlatform";
    console.log(`Sistema ${this.SYSTEM_NAME} v${this.VERSION} cargado`);
  }

  static generateId() {
    return crypto.randomUUID();
  }

  addItem(item) {
    if (!(item instanceof Course)) {
      return { success: false, message: "Debe ser instancia de Course" };
    }
    this.#items.push(item);
    return { success: true, message: "Curso agregado" };
  }

  removeItem(id) {
    const index = this.#items.findIndex(i => i.id === id);
    if (index === -1) return { success: false };
    this.#items.splice(index, 1);
    return { success: true };
  }

  findItem(id) {
    return this.#items.find(i => i.id === id) ?? null;
  }

  getAllItems() {
    return [...this.#items];
  }

  searchByName(query) {
    return this.#items.filter(i =>
      i.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  filterByType(type) {
    return this.#items.filter(i => i.getType() === type);
  }

  filterByStatus(active) {
    return this.#items.filter(i => i.isActive === active);
  }

  getStats() {
    const total = this.#items.length;
    const active = this.#items.filter(i => i.isActive).length;
    const inactive = total - active;

    const byType = this.#items.reduce((acc, item) => {
      const type = item.getType();
      acc[type] = (acc[type] ?? 0) + 1;
      return acc;
    }, {});

    return { total, active, inactive, byType, users: this.#users.length };
  }

  addUser(user) {
    if (!(user instanceof Person)) {
      return { success: false };
    }
    this.#users.push(user);
    return { success: true };
  }
}

/* =====================================================
   INSTANCIA
===================================================== */

const system = new LearningPlatform();

/* =====================================================
   INICIALIZACIÓN
===================================================== */

const init = () => {
  const c1 = new ProgrammingCourse("JavaScript Moderno", "Online", "JavaScript", "Avanzado");
  const c2 = new DesignCourse("UX Fundamentals", "Online", "Figma", 40);
  const c3 = new MarketingCourse("Digital Marketing 2026", "Online", "SEO", true);

  system.addItem(c1);
  system.addItem(c2);
  system.addItem(c3);

  console.log("Sistema inicializado correctamente");
  console.log(system.getStats());
};

document.addEventListener("DOMContentLoaded", init);