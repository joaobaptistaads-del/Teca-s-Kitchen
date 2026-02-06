# Documentação da API - Teca's Kitchen

Esta documentação descreve todas as rotas disponíveis na API REST do Teca's Kitchen.

**Base URL**: `http://localhost:3000/api`

## Autenticação

A API utiliza JWT (JSON Web Tokens) para autenticação. As rotas protegidas requerem um token válido no header:

```
Authorization: Bearer <seu_token_jwt>
```

## Códigos de Status HTTP

- `200` - OK: Requisição bem-sucedida
- `201` - Created: Recurso criado com sucesso
- `400` - Bad Request: Dados inválidos
- `401` - Unauthorized: Não autenticado ou token inválido
- `404` - Not Found: Recurso não encontrado
- `500` - Internal Server Error: Erro no servidor

## Formato de Resposta

Todas as respostas seguem o formato:

```json
{
  "success": true,
  "message": "Mensagem descritiva",
  "data": { }
}
```

---

## 🔐 Autenticação

### POST /api/auth/login
Realiza login e retorna token JWT.

**Corpo da Requisição:**
```json
{
  "email": "admin@tecaskitchen.com",
  "password": "Admin@123"
}
```

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "uuid",
      "email": "admin@tecaskitchen.com",
      "name": "Administrador"
    }
  }
}
```

### GET /api/auth/profile
Retorna perfil do usuário autenticado.

**Headers**: `Authorization: Bearer <token>`

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "message": "Profile retrieved",
  "data": {
    "id": "uuid",
    "email": "admin@tecaskitchen.com",
    "name": "Administrador",
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

### POST /api/auth/change-password
Altera a senha do usuário autenticado.

**Headers**: `Authorization: Bearer <token>`

**Corpo da Requisição:**
```json
{
  "currentPassword": "Admin@123",
  "newPassword": "NewPassword@456"
}
```

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "message": "Password changed successfully",
  "data": null
}
```

---

## 📦 Produtos

### GET /api/products
Lista todos os produtos (rota pública).

**Query Parameters:**
- `category` (opcional): UUID da categoria
- `isActive` (opcional): "true" ou "false"
- `search` (opcional): Busca por nome

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "message": "Products retrieved successfully",
  "data": [
    {
      "id": "uuid",
      "name": "Filé ao Molho Madeira",
      "description": "Filé mignon com molho madeira",
      "price": 55.90,
      "category_id": "uuid",
      "image_url": "https://...",
      "is_active": true,
      "created_at": "2024-01-01T00:00:00Z",
      "categories": {
        "id": "uuid",
        "name": "Pratos Principais",
        "slug": "pratos-principais"
      }
    }
  ]
}
```

### GET /api/products/:id
Retorna um produto específico.

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "message": "Product retrieved successfully",
  "data": {
    "id": "uuid",
    "name": "Filé ao Molho Madeira",
    "description": "Filé mignon com molho madeira",
    "price": 55.90,
    "category_id": "uuid",
    "image_url": "https://...",
    "is_active": true,
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

### POST /api/products
Cria um novo produto (requer autenticação).

**Headers**: `Authorization: Bearer <token>`

**Corpo da Requisição:**
```json
{
  "name": "Novo Prato",
  "description": "Descrição do prato",
  "price": 45.90,
  "category_id": "uuid",
  "image_url": "https://...",
  "is_active": true
}
```

**Resposta de Sucesso (201):**
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": { }
}
```

### PUT /api/products/:id
Atualiza um produto (requer autenticação).

**Headers**: `Authorization: Bearer <token>`

**Corpo da Requisição:** Mesmo formato do POST

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": { }
}
```

### DELETE /api/products/:id
Deleta um produto (requer autenticação).

**Headers**: `Authorization: Bearer <token>`

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "message": "Product deleted successfully",
  "data": null
}
```

### GET /api/products/categories
Lista todas as categorias (rota pública).

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "message": "Categories retrieved successfully",
  "data": [
    {
      "id": "uuid",
      "name": "Entradas",
      "slug": "entradas",
      "order_position": 1,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

---

## 🛒 Vendas

Todas as rotas de vendas requerem autenticação.

### GET /api/sales
Lista todas as vendas.

**Headers**: `Authorization: Bearer <token>`

**Query Parameters:**
- `startDate` (opcional): Data inicial (ISO 8601)
- `endDate` (opcional): Data final (ISO 8601)
- `status` (opcional): Status da venda
- `limit` (opcional): Número de resultados (padrão: 50)

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "message": "Sales retrieved successfully",
  "data": [
    {
      "id": "uuid",
      "total_amount": 139.60,
      "payment_method": "credit_card",
      "status": "completed",
      "created_at": "2024-01-01T12:00:00Z",
      "sale_items": [
        {
          "id": "uuid",
          "quantity": 2,
          "unit_price": 55.90,
          "subtotal": 111.80,
          "products": {
            "id": "uuid",
            "name": "Filé ao Molho Madeira"
          }
        }
      ]
    }
  ]
}
```

### GET /api/sales/:id
Retorna uma venda específica.

**Headers**: `Authorization: Bearer <token>`

### POST /api/sales
Cria uma nova venda.

**Headers**: `Authorization: Bearer <token>`

**Corpo da Requisição:**
```json
{
  "items": [
    {
      "product_id": "uuid",
      "quantity": 2,
      "unit_price": 55.90
    }
  ],
  "payment_method": "credit_card",
  "notes": "Observações opcionais"
}
```

**Resposta de Sucesso (201):**
```json
{
  "success": true,
  "message": "Sale created successfully",
  "data": { }
}
```

### GET /api/sales/stats
Retorna estatísticas de vendas.

**Headers**: `Authorization: Bearer <token>`

**Query Parameters:**
- `period`: "today", "week", "month", "year"

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "message": "Sales statistics retrieved successfully",
  "data": {
    "period": "today",
    "totalSales": 450.00,
    "totalOrders": 5,
    "averageTicket": 90.00
  }
}
```

### GET /api/sales/top-products
Retorna produtos mais vendidos.

**Headers**: `Authorization: Bearer <token>`

**Query Parameters:**
- `limit` (opcional): Número de produtos (padrão: 5)

---

## 💰 Finanças

Todas as rotas de finanças requerem autenticação.

### GET /api/finance/expenses
Lista todas as despesas.

**Headers**: `Authorization: Bearer <token>`

**Query Parameters:**
- `startDate` (opcional): Data inicial
- `endDate` (opcional): Data final
- `category` (opcional): Categoria da despesa
- `limit` (opcional): Número de resultados

### POST /api/finance/expenses
Cria uma nova despesa.

**Headers**: `Authorization: Bearer <token>`

**Corpo da Requisição:**
```json
{
  "description": "Fornecedor de Carnes",
  "amount": 1500.00,
  "category": "Fornecedores",
  "date": "2024-01-15"
}
```

### GET /api/finance/summary
Retorna resumo financeiro.

**Headers**: `Authorization: Bearer <token>`

**Query Parameters:**
- `startDate` (opcional): Data inicial
- `endDate` (opcional): Data final

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "message": "Financial summary retrieved successfully",
  "data": {
    "period": {
      "startDate": "2024-01-01",
      "endDate": "2024-01-31"
    },
    "totalRevenue": 15000.00,
    "totalExpenses": 8000.00,
    "netProfit": 7000.00,
    "expensesByCategory": {
      "Fornecedores": 3500.00,
      "Contas": 2000.00,
      "Salários": 2500.00
    }
  }
}
```

---

## ⚙️ Configurações

### GET /api/settings
Lista todas as configurações (rota pública).

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "message": "Settings retrieved successfully",
  "data": {
    "restaurant_name": "Teca's Kitchen",
    "restaurant_description": "Restaurante especializado...",
    "restaurant_address": "Rua das Flores, 123",
    "restaurant_phone": "(11) 98765-4321",
    "restaurant_email": "contato@tecaskitchen.com",
    "social_instagram": "https://instagram.com/...",
    "social_facebook": "https://facebook.com/...",
    "social_whatsapp": "https://wa.me/..."
  }
}
```

### POST /api/settings
Atualiza uma configuração (requer autenticação).

**Headers**: `Authorization: Bearer <token>`

**Corpo da Requisição:**
```json
{
  "key": "restaurant_name",
  "value": "Novo Nome"
}
```

### PUT /api/settings/bulk
Atualiza múltiplas configurações (requer autenticação).

**Headers**: `Authorization: Bearer <token>`

**Corpo da Requisição:**
```json
{
  "restaurant_name": "Novo Nome",
  "restaurant_phone": "(11) 99999-9999",
  "social_instagram": "https://instagram.com/novo"
}
```

---

## Exemplos de Uso

### cURL

```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@tecaskitchen.com","password":"Admin@123"}'

# Listar produtos (sem autenticação)
curl http://localhost:3000/api/products

# Criar produto (com autenticação)
curl -X POST http://localhost:3000/api/products \
  -H "Authorization: Bearer SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Novo Prato","price":45.90,"category_id":"uuid"}'
```

### JavaScript/Axios

```javascript
// Login
const login = await axios.post('http://localhost:3000/api/auth/login', {
  email: 'admin@tecaskitchen.com',
  password: 'Admin@123'
});

const token = login.data.data.token;

// Buscar produtos
const products = await axios.get('http://localhost:3000/api/products');

// Criar produto (autenticado)
const newProduct = await axios.post(
  'http://localhost:3000/api/products',
  {
    name: 'Novo Prato',
    price: 45.90,
    category_id: 'uuid'
  },
  {
    headers: { Authorization: `Bearer ${token}` }
  }
);
```

---

Desenvolvido com ❤️ por Teca's Kitchen Team
