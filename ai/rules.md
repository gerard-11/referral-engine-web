# 📏 Reglas de Negocio y Estándares

## 🔐 Autenticación y Roles

### Roles
- **AGENT:** Independiente. Gestiona su cartera de clientes y supervisa la calidad de los referidos captados por estos.
- **CLIENT:** Vinculado a un Agente. Acceso a la sección "Agregar Referido" (Encuesta) y seguimiento de sus recompensas.

---

## 📊 Sistema de Scoring (Calidad de Referidos)

La calidad del referido se determina por una encuesta ponderada completada por el Cliente:

| Puntaje | Color | Significado |
| :--- | :--- | :--- |
| **> 70** | 🟢 Verde | Alta calidad (Genera recompensas para el Cliente) |
| **30 - 70** | 🟡 Amarillo | Calidad media |
| **< 30** | 🔴 Rojo | Baja calidad |

### Lógica de Recompensas
- Se contabilizan los referidos **Verdes** de cada Cliente para determinar su nivel de recompensas.

---

## 🌐 Flujo de Registro

### Registro de Agente
- Requiere validación/código de un Agente ya existente, pero no crea una relación de dependencia jerárquica.

### Registro de Cliente
- Se realiza mediante el Perfil Público del Agente (`/agente/:agentCode`).
- Crea un vínculo permanente con dicho Agente.

---

## 🌳 Dashboards Diferenciados

### Dashboard del Agente (AGENT)
- Vista de Clientes asociados.
- Vista de Referidos captados por sus clientes con su respectivo color de scoring.

### Dashboard del Cliente (CLIENT)
- Botón principal: **"Agregar Referido"** (Acceso a la Encuesta).
- Contador de **Referidos Verdes** y estado de recompensas.

---

## 📝 Convenciones de Trabajo
- **Commits:** Conventional Commits.
- **UI:** Tailwind CSS, usando colores semánticos para el scoring (green-500, yellow-500, red-500).
- **Mentoría:** Explicar siempre el fundamento técnico detrás de cada implementación.
