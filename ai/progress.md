# 📈 Seguimiento del Proceso

## 🏁 Último Paso Completado
- **Diferenciación de Dashboards por Rol:**
  - Se actualizaron los tipos en `types.ts` para incluir roles (`AGENT`, `CLIENT`) y el `ClientScore`.
  - Se crearon componentes especializados: `AgentDashboard` y `ClientDashboard`.
  - Se implementó renderizado condicional en `ProfilePage` para mostrar la interfaz adecuada según el rol.
  - Se mejoró la UX del Cliente con un contador de "Referidos Verdes" y botón de acción principal.

## 🚀 Paso Pendiente
- **Sistema de Encuesta (Agregar Referido):**
  - Implementar el Modal y el formulario de encuesta para el rol Cliente.
  - Configurar la lógica de pesos y el cálculo visual del scoring (colores).
  - Integrar la mutación de React Query para guardar el referido y refrescar las recompensas.
  - Asegurar que el interceptor de Axios maneje correctamente el flujo de refresco de tokens.
