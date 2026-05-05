## 🧠 Decisiones Técnicas

* Estado global manejado con Zustand (no Redux)
* Server state manejado con TanStack Query


---

## 🧩 Arquitectura

* Frontend separado del backend
* Backend con NestJS + Prisma
* Estructura basada en features

---

## 🔐 Auth

* Uso de Refresh Tokens vía HttpOnly cookies.
* El accessToken se persiste en localStorage (temporalmente para esta fase).
* El frontend realiza un `checkAuth` inicial para recuperar la sesión.

---

## ⭐ Reseñas

* Son inmutables
* No se permite edición
* Backend controla duplicados

---

## 🚀 UX

* Uso de Optimistic UI en actualizaciones de perfil
* Manejo de errores amigable en frontend

---

## 📌 Pendiente por decidir

* Implementar refresh tokens o no
* Persistencia de sesión (localStorage vs cookies)
* Estrategia para obtener datos del usuario autenticado
