# Plataforma de Cursos Online - LearnIT

Este proyecto implementa una plataforma de cursos en línea utilizando **arquitectura de microservicios**. Cada microservicio funciona de forma independiente y expone sus funciones mediante APIs REST, permitiendo escalabilidad, mantenimiento sencillo y bajo acoplamiento.

---

## 🧱 Microservicios

| Microservicio        | Función Principal                    | Base de Datos | Puerto |
|----------------------|---------------------------------------|---------------|--------|
| User-Service         | Gestión de usuarios                   | PostgreSQL    | 5432   |
| Course-Service       | Gestión de cursos                     | PostgreSQL    | 5432   |
| Enrollment-Service   | Gestión de inscripciones a los cursos | PostgreSQL    | 5432   |

---

## 🏗️ Arquitectura General

- Node.js + Express para la construcción de APIs REST.
- **Patrón Repository** para separar la lógica de negocio del acceso a datos.
- Uso de **PostgreSQL** como motor de base de datos.
- Microservicios independientes ejecutándose por separado.

---

## 🔧 Ejecución del Proyecto

Para ejecutar cada microservicio:

```bash
cd nombre-del-microservicio
npm install
npm start
