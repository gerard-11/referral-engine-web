# 📖 Contexto del Proyecto: Referral Engine

## 🎯 Objetivo
Plataforma para que agentes gestionen sus referidos y visualicen estadísticas de desempeño. Permite a los usuarios registrarse como agentes, gestionar su perfil y ver el progreso de sus clientes y sub-referidos.

## 🛠️ Stack Tecnológico
- **Frontend:** React + TypeScript + Vite.
- **Estilos:** Tailwind CSS.
- **Estado:** Zustand (Global) & React Query (Server).
- **Ruteo:** React Router Dom.
- **API:** Axios con interceptores para JWT.

## 🏗️ Arquitectura
Sigue una estructura basada en **features** para escalabilidad:
- `features/auth`: Manejo de sesión, login y registro.
- `features/referrals`: Lógica de negocio de referidos.
- `profile`: Gestión del perfil del agente.
- `shared`: Componentes, tipos y servicios reutilizables.
