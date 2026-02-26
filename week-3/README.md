# 📚 EDUFLEX – Online Learning Platform  
**Week 03 – Modern JavaScript Bootcamp**

---

## 📌 Project Overview

**EduFlex** is an Online Learning Platform developed using modern JavaScript (ES2023).  
The system allows managing courses and users through an object-oriented architecture, applying encapsulation, inheritance, polymorphism, abstract classes, and DOM integration.

This project demonstrates a solid understanding of:

- Object-Oriented Programming (OOP)
- ES2023 private fields
- Class inheritance
- Abstract class implementation
- CRUD operations
- DOM manipulation
- Filtering and searching logic
- Clean architecture separation

---

# 🧠 Architecture

The application follows a clear separation of responsibilities:

## 📦 Application Structure

1️⃣ **Models (Business Logic)**
- Course (Abstract Class)
- ProgrammingCourse
- DesignCourse
- MarketingCourse
- Person
- Student
- Instructor
- LearningPlatform

2️⃣ **UI Controller**
- Handles DOM rendering
- Manages events
- Connects UI with business logic

3️⃣ **Initialization**
- Mock data
- Global interaction handlers

---

# 🏗 Object-Oriented Design

## 1️⃣ Abstract Base Class

### `Course` (Abstract)

- Cannot be instantiated directly
- Contains shared logic for all courses
- Implements encapsulation using `#privateFields`
- Provides:
  - Getters
  - Setter with validation
  - Activation/deactivation methods
  - `getType()` method

```javascript
if (new.target === Course) {
  throw new Error("Course es una clase abstracta");
}