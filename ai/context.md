# 📖 Contexto del Proyecto: Referral Engine

## 🎯 Objetivo
Plataforma de crecimiento orgánico donde agentes gestionan su red, y clientes proporcionan referidos calificados mediante un sistema de encuestas ponderadas.

## 👥 Roles del Sistema
1. **Agente (AGENT):**

   - Gestiona su cartera de clientes y la calidad de sus referidos.
   - Visualiza estadísticas de desempeño (leads verdes, amarillos, rojos).
2. **Cliente (CLIENT):**
   - Registrado bajo un Agente.
   - Su función principal es proveer referidos mediante encuestas.
   - Recibe recompensas basadas en la cantidad de "Referidos Verdes" aportados.
3. **Referido (REFERRAL):**
   - Persona captada a través de la encuesta de un Cliente.
   - Clasificado por calidad mediante un sistema de scoring automático.

## 🛠️ Stack Tecnológico
- **Frontend:** React + TypeScript + Vite.
- **Estilos:** Tailwind CSS.
- **Estado:** Zustand (Global) & React Query (Server).
- **Ruteo:** React Router Dom.
- **API:** Axios con interceptores para JWT.

## 🏗️ Arquitectura
Estructura basada en **features**:
- `features/auth`: Registro diferenciado y manejo de roles.
- `features/referrals`: Lógica de encuestas y sistema de scoring.
- `profile`: Dashboards diferenciados según el rol del usuario.

# Integración de Lógica de Negocio: Referral Engine
    2
    3 ## 1. Sistema de Roles y Acceso
    4 El sistema se divide estrictamente por el `role` presente en el JWT:
    5 - **AGENT**: Perfil administrador de su propia línea. Gestiona preguntas y ve métricas de sus clientes.
    6 - **CLIENT**: Usuario operativo. Su función principal es capturar leads (referidos).
    7
    8 ## 2. Registro y Vinculación (Herencia)
    9 El `referralCode` determina la genealogía en el registro (`POST /users/register`):
10 - **Si el rol es AGENT**: El código de invitación debe ser de otro Agente. El nuevo agente nace **independiente** (sin
jefe).
11 - **Si el rol es CLIENT**: Se vincula al Agente del dueño del código. Esto garantiza que todos los clientes pertenezcan
a un Agente para heredar sus reglas de calificación.
12
13 ## 3. Motor de Calificación (Scoring)
14 La sección "Agregar Referido" es exclusiva para Clientes. No es un formulario estático:
15 - **Dinámico**: Se deben cargar las preguntas del agente asignado (`GET /agents/:agentCode`).
16 - **Pesos**: Cada pregunta tiene un peso. El backend calcula el score de 0 a 100.
17 - **Colores (Status)**:
18     - **Verde (>70)**: Alta prioridad. Suma puntos para recompensas.
19     - **Amarillo (30-70)**: Seguimiento medio.
20     - **Rojo (<30)**: Baja prioridad.
21
22 ## 4. Sistema de Recompensas
23 El objeto `ClientScore` (disponible en el perfil del usuario) rastrea el rendimiento del cliente:
24 - `greenLeads`: Contador acumulado de referidos exitosos (Score > 70). Este valor es el que debe usarse para mostrar
niveles o premios en la interfaz del cliente.
25
26 ## 5. Notas de Implementación
27 - **JWT**: El payload incluye `id`, `role`, `name` y `email`.
28 - **Captura de Leads**: Al enviar un lead (`POST /leads`), el `agentId` ya no es necesario en el body; el backend lo
detecta automáticamente por la relación del cliente autenticado.

