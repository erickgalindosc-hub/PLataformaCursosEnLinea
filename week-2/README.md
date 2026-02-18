# 📚 Plataforma de Cursos Online

Este proyecto es una **aplicación web interactiva** desarrollada con **HTML, CSS y JavaScript moderno (ES6+)**, cuyo objetivo es simular una **plataforma de cursos en línea**. Forma parte de un proyecto académico del *JavaScript Modern Bootcamp (Semana 01)*.

---

## 🚀 Descripción general

La aplicación muestra información dinámica sobre una plataforma educativa, incluyendo:

* Información general de la plataforma
* Cursos disponibles
* Datos de contacto
* Enlaces a redes/comunidad
* Estadísticas relevantes
* Modo claro / oscuro

Toda la información se carga dinámicamente usando **JavaScript**, sin necesidad de recargar la página.

---

## 🛠️ Tecnologías utilizadas

* **HTML5** → Estructura del proyecto
* **CSS3** → Diseño visual, responsive y dark mode
* **JavaScript (ES2023 / ES6+)** → Lógica, interactividad y manipulación del DOM

No se utilizan librerías ni frameworks externos.

---

## 📁 Estructura del proyecto

```
plataforma-cursos/
│
├── index.html
├── styles.css
└── starter/
    └── script.js
```

---

## ▶️ Cómo ejecutar el proyecto

### Opción recomendada (Live Server)

1. Abrir la carpeta del proyecto en **Visual Studio Code**
2. Instalar la extensión **Live Server** (si no está instalada)
3. Hacer clic derecho sobre `index.html`
4. Seleccionar **Open with Live Server**

Esto abrirá el proyecto en el navegador usando un servidor local.

### Opción alternativa

* Abrir el archivo `index.html` directamente en cualquier navegador moderno.

---

## ⚙️ Funcionamiento del proyecto

### HTML

* Define la estructura visual de la aplicación.
* Contiene contenedores vacíos que se rellenan dinámicamente con JavaScript.

### CSS

* Maneja el diseño visual, animaciones y responsive.
* Usa **variables CSS** para facilitar el cambio de tema (claro / oscuro).

### JavaScript

El archivo `script.js` se encarga de:

* Esperar a que cargue el DOM (`DOMContentLoaded`)
* Definir los datos de la plataforma (objetos y arrays)
* Insertar dinámicamente la información en el HTML
* Manejar eventos del usuario:

  * Cambio de tema (dark / light)
  * Mostrar más cursos
  * Copiar email al portapapeles
* Mostrar notificaciones tipo *toast*
* Renderizar estadísticas dinámicas

---

## ✨ Funcionalidades principales

* 🔄 Carga dinámica de contenido
* 🌙 Modo claro / oscuro
* 📋 Copiar email al portapapeles
* 📊 Estadísticas visuales
* 📱 Diseño responsive
* 🎯 Interfaz interactiva

---

## 🎓 Objetivo académico

Este proyecto demuestra el uso de:

* Manipulación del DOM
* Eventos en JavaScript
* Arrays y objetos
* Buenas prácticas de separación de responsabilidades (HTML, CSS, JS)
* JavaScript moderno (ES6+)

---

## ❤️ Autor

Proyecto desarrollado con fines educativos para el **JavaScript Modern Bootcamp**.

---

## 📌 Notas finales

No se requiere instalación adicional ni dependencias externas. El proyecto puede ejecutarse directamente en el navegador.

¡Gracias por revisar este proyecto! 🚀
