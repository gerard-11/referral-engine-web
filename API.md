# 🚀 API Integration Guide - Referral Engine

## 📍 Base URL
```
http://localhost:3000
```

---

## 🔐 Autenticación con JWT

### Flujo de Autenticación

```
1. Usuario ingresa email/password
   ↓
2. POST /auth/login
   ↓
3. Backend retorna { access_token, user }
   ↓
4. Frontend guarda token en localStorage
   ↓
5. En cada request protegido, envía: Authorization: Bearer <token>
```

### Guardar Token
```javascript
// Después del login exitoso
localStorage.setItem('token', response.access_token);
localStorage.setItem('user', JSON.stringify(response.user));
```

### Usar Token en Requests
```javascript
// En cada request protegido
const token = localStorage.getItem('token');
const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
};
```

### Token Expira
- **Validez:** 24 horas
- Si expira → usuario debe loguearse de nuevo
- Implementar: Detectar 401 → redirigir a login

---

## 📋 Endpoints

### 1️⃣ **AUTH: Login**

```http
POST /auth/login
Content-Type: application/json
```

**Body:**
```json
{
  "email": "admin@test.com",
  "password": "admin123"
}
```

**Success (200):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "3de642e2-90bb-4fd7-ad7e-3b94c8f14181",
    "name": "Admin",
    "email": "admin@test.com",
    "role": "ADMIN"
  }
}
```

**Error (401):**
```json
{
  "message": "Invalid credentials",
  "statusCode": 401
}
```

**JavaScript Example:**
```javascript
async function login(email, password) {
  const response = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();
  
  // Guardar token y usuario
  localStorage.setItem('token', data.access_token);
  localStorage.setItem('user', JSON.stringify(data.user));
  
  return data;
}
```

---

### 2️⃣ **USERS: Register**

```http
POST /users/register
Content-Type: application/json
```

**Body (Cliente):**
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "password123",
  "role": "CLIENT",
  "referralCode": "ABC123XY"
}
```

**Body (Agente):**
```json
{
  "name": "Carlos López",
  "email": "carlos@example.com",
  "password": "password123",
  "role": "AGENT",
  "agentCodeInput": "X7Y9Z2W1"
}
```

**Success (201):**
```json
{
  "id": "uuid-aqui",
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "role": "CLIENT",
  "agentId": "uuid-agente",
  "referralCode": null,
  "createdAt": "2026-05-07T12:30:00Z"
}
```

**Error (400) - Cliente sin referralCode:**
```json
{
  "message": "Cliente debe ser referido por un agente",
  "statusCode": 400
}
```

**JavaScript Example:**
```javascript
async function registerClient(name, email, password, referralCode) {
  const response = await fetch('http://localhost:3000/users/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      email,
      password,
      role: 'CLIENT',
      referralCode // Código del agente que lo refiere
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return await response.json();
}

async function registerAgent(name, email, password, agentCode) {
  const response = await fetch('http://localhost:3000/users/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      email,
      password,
      role: 'AGENT',
      agentCodeInput: agentCode // Código generado por admin
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return await response.json();
}
```

---

### 3️⃣ **USERS: Get Profile**

```http
GET /users/:id
Authorization: Bearer <token>
```

**URL Example:**
```
GET /users/3de642e2-90bb-4fd7-ad7e-3b94c8f14181
```

**Success (200):**
```json
{
  "id": "3de642e2-90bb-4fd7-ad7e-3b94c8f14181",
  "name": "Admin",
  "email": "admin@test.com",
  "role": "ADMIN",
  "bio": "My bio",
  "phoneNumber": "+34123456789",
  "avatarUrl": "https://example.com/avatar.jpg",
  "agentId": null,
  "referralCode": null,
  "createdAt": "2026-05-01T10:00:00Z",
  "updatedAt": "2026-05-07T12:00:00Z"
}
```

**JavaScript Example:**
```javascript
async function getProfile(userId) {
  const token = localStorage.getItem('token');
  const response = await fetch(`http://localhost:3000/users/${userId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    if (response.status === 401) {
      // Token expirado
      localStorage.clear();
      window.location.href = '/login';
    }
    throw new Error('Failed to fetch profile');
  }

  return await response.json();
}
```

---

### 4️⃣ **USERS: Get Referrals (Clientes vinculados)**

```http
GET /users/:id/referrals?page=1&limit=10
Authorization: Bearer <token>
```

**Query Params:**
- `page` (número, default: 1) - Número de página
- `limit` (número, default: 10) - Items por página

**Success (200):**
```json
{
  "data": [
    {
      "id": "referral-uuid-1",
      "referrerId": "agent-uuid",
      "referredId": "client-uuid-1",
      "createdAt": "2026-05-07T10:00:00Z"
    },
    {
      "id": "referral-uuid-2",
      "referrerId": "agent-uuid",
      "referredId": "client-uuid-2",
      "createdAt": "2026-05-06T14:30:00Z"
    }
  ],
  "meta": {
    "total": 25,
    "page": 1,
    "limit": 10,
    "pages": 3
  }
}
```

**JavaScript Example:**
```javascript
async function getReferrals(userId, page = 1, limit = 10) {
  const token = localStorage.getItem('token');
  const response = await fetch(
    `http://localhost:3000/users/${userId}/referrals?page=${page}&limit=${limit}`,
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch referrals');
  }

  return await response.json();
}

// Uso
async function loadAgentClients(agentId) {
  const { data, meta } = await getReferrals(agentId);
  console.log(`Total clientes: ${meta.total}`);
  console.log(`Mostrando página ${meta.page} de ${meta.pages}`);
  
  data.forEach(referral => {
    console.log(`Cliente ID: ${referral.referredId}, Referido en: ${referral.createdAt}`);
  });
}
```

---

### 5️⃣ **ADMIN: Generate Agent Code**

```http
POST /admin/agent-codes
Authorization: Bearer <token>
Content-Type: application/json
```

**Requiere:**
- Token de usuario con rol ADMIN

**Body:**
```json
{
  "description": "Código para nuevo agente regional"
}
```

**Success (201):**
```json
{
  "id": "code-uuid-123",
  "code": "A7B9C2D1",
  "createdAt": "2026-05-07T12:30:00Z",
  "isActive": true
}
```

**Error (403) - No es ADMIN:**
```json
{
  "message": "Forbidden resource",
  "statusCode": 403
}
```

**JavaScript Example:**
```javascript
async function generateAgentCode() {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:3000/admin/agent-codes', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      description: 'Código para nuevo agente'
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const { code } = await response.json();
  
  // Copiar al portapapeles o mostrar
  return code; // Ej: "A7B9C2D1"
}
```

---

### 6️⃣ **ADMIN: Create Admin User**

```http
POST /admin/users
Authorization: Bearer <token>
Content-Type: application/json
```

**Requiere:**
- Token de usuario con rol ADMIN

**Body:**
```json
{
  "name": "Nuevo Administrador",
  "email": "newadmin@example.com",
  "password": "securePassword123"
}
```

**Success (201):**
```json
{
  "id": "new-admin-uuid",
  "name": "Nuevo Administrador",
  "email": "newadmin@example.com",
  "role": "ADMIN",
  "createdAt": "2026-05-07T12:30:00Z"
}
```

**Error (400) - Email ya existe:**
```json
{
  "message": "Email already exists",
  "statusCode": 400
}
```

**JavaScript Example:**
```javascript
async function createAdminUser(name, email, password) {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:3000/admin/users', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return await response.json();
}
```

---

## 🌊 Flujos Completos

### 📱 Flujo 1: Login → Ver Mi Perfil

```javascript
async function loginAndViewProfile() {
  try {
    // 1. Login
    const loginData = await login('admin@test.com', 'admin123');
    const { user, access_token } = loginData;
    
    console.log(`✅ Logueado como: ${user.name} (${user.role})`);
    
    // 2. Ver perfil
    const profile = await getProfile(user.id);
    
    console.log(`📋 Perfil completo:`, profile);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}
```

### 👨‍💼 Flujo 2: Admin → Generar Código → Ver Código

```javascript
async function adminGenerateAgentCode() {
  try {
    // Asumir que admin ya está logueado
    const { code } = await generateAgentCode();
    
    console.log(`✅ Código generado: ${code}`);
    console.log(`📝 Compartir con agente: ${code}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}
```

### 🤝 Flujo 3: Agent + Client Registration

```javascript
async function registerAgentAndClient() {
  try {
    // 1. Admin genera código
    const { code: agentCode } = await generateAgentCode();
    console.log(`✅ Código de agente: ${agentCode}`);
    
    // 2. Agente se registra con el código
    const agent = await registerAgent(
      'Carlos López',
      'carlos@example.com',
      'password123',
      agentCode
    );
    console.log(`✅ Agente registrado. Referral Code: ${agent.referralCode}`);
    
    // 3. Cliente se registra con referral code del agente
    const client = await registerClient(
      'Juan Pérez',
      'juan@example.com',
      'password123',
      agent.referralCode
    );
    console.log(`✅ Cliente registrado. Vinculado a agente: ${client.agentId}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}
```

---

## 🛡️ Manejo de Errores

### Errores Comunes

| Status | Problema | Solución |
|--------|----------|----------|
| 400 | Datos inválidos | Valida email, password ≥8 chars, campos obligatorios |
| 401 | Token expirado/inválido | Limpia localStorage, redirige a login |
| 403 | Permiso insuficiente | Solo ADMIN puede acceder a /admin |
| 409 | Email duplicado | Usa otro email único |
| 500 | Error servidor | Contacta al backend |

### Detectar y Manejar 401

```javascript
async function makeAuthenticatedRequest(url, options = {}) {
  const token = localStorage.getItem('token');
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`
    }
  });

  if (response.status === 401) {
    // Token expirado
    console.warn('⚠️ Sesión expirada');
    localStorage.clear();
    window.location.href = '/login';
    return null;
  }

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Request failed');
  }

  return await response.json();
}
```

---

## 📝 Notas Importantes

- **Base URL:** Cambiar a producción cuando se deploy
- **Token storage:** Considerar usar httpOnly cookies para mayor seguridad en producción
- **CORS:** El backend está configurado para aceptar requests de localhost:5173 (Vite)
- **Validación:** Siempre valida en el frontend antes de enviar (UX mejor)

---

## 🔗 Testing Rápido

**Credenciales de prueba en BD:**
```
ADMIN:
  email: admin@test.com
  password: admin123

AGENTE:
  email: agente@test.com
  password: agente123

CLIENTE:
  email: cliente.ligado@test.com
  password: cliente123
```

Úsalas para probar endpoints en Postman o el frontend.
