# Documentação da API - Teca's Kitchen

Documentação completa de todos os endpoints da API do Teca's Kitchen.

**Base URL**: `http://localhost:3000/api`

## 📑 Índice

- [Autenticação](#autenticação)
- [Produtos](#produtos)
- [Vendas](#vendas)
- [Finanças](#finanças)
- [Configurações](#configurações)

## 🔐 Autenticação

Todos os endpoints protegidos requerem um token JWT no header:
```
Authorization: Bearer <token>
```

### POST /auth/login

Fazer login no sistema.

**Request:**
```json
{
  "email": "admin@tecaskitchen.com",
  "password": "Admin@123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "uuid",
      "email": "admin@tecaskitchen.com",
      "name": "Administrator"
    }
  }
}
```

### GET /auth/profile

Obter perfil do usuário autenticado.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "admin@tecaskitchen.com",
    "name": "Administrator",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

## 🍽️ Produtos

### GET /products

Listar todos os produtos.

**Query Parameters:**
- `page` (number): Número da página (padrão: 1)
- `limit` (number): Itens por página (padrão: 50, máx: 100)
- `category_id` (uuid): Filtrar por categoria
- `is_active` (boolean): Filtrar por status ativo

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Fettuccine Alfredo",
      "description": "Massa fresca ao molho branco cremoso",
      "price": 42.90,
      "category_id": "uuid",
      "image_url": "https://...",
      "is_active": true,
      "created_at": "2024-01-01T00:00:00.000Z",
      "categories": {
        "id": "uuid",
        "name": "Pratos Principais",
        "slug": "pratos-principais"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 10,
    "pages": 1
  }
}
```

### GET /products/:id

Obter um produto específico.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Fettuccine Alfredo",
    "description": "Massa fresca ao molho branco cremoso",
    "price": 42.90,
    "category_id": "uuid",
    "image_url": "https://...",
    "is_active": true,
    "categories": {
      "id": "uuid",
      "name": "Pratos Principais",
      "slug": "pratos-principais"
    }
  }
}
```

### POST /products

Criar novo produto. 🔒 *Requer autenticação*

**Request:**
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

**Response (201):**
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": { ... }
}
```

### PUT /products/:id

Atualizar produto. 🔒 *Requer autenticação*

**Request:**
```json
{
  "name": "Prato Atualizado",
  "price": 49.90
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": { ... }
}
```

### DELETE /products/:id

Deletar produto. 🔒 *Requer autenticação*

**Response (200):**
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

### GET /products/categories

Listar todas as categorias.

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Entradas",
      "slug": "entradas",
      "order_position": 1
    }
  ]
}
```

## 💰 Vendas

Todos os endpoints de vendas requerem autenticação. 🔒

### GET /sales

Listar todas as vendas.

**Query Parameters:**
- `page`, `limit`: Paginação
- `start_date` (ISO 8601): Data inicial
- `end_date` (ISO 8601): Data final
- `payment_method`: Método de pagamento

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "total_amount": 125.80,
      "payment_method": "credit_card",
      "status": "completed",
      "created_at": "2024-01-01T12:00:00.000Z",
      "sale_items": [
        {
          "id": "uuid",
          "quantity": 2,
          "unit_price": 42.90,
          "subtotal": 85.80,
          "products": {
            "id": "uuid",
            "name": "Fettuccine Alfredo"
          }
        }
      ]
    }
  ],
  "pagination": { ... }
}
```

### POST /sales

Criar nova venda.

**Request:**
```json
{
  "items": [
    {
      "product_id": "uuid",
      "quantity": 2
    }
  ],
  "payment_method": "credit_card"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Sale created successfully",
  "data": { ... }
}
```

### GET /sales/stats

Obter estatísticas de vendas.

**Query Parameters:**
- `period`: 'today', 'week', 'month', 'year'

**Response (200):**
```json
{
  "success": true,
  "data": {
    "period": "today",
    "total_sales": 1250.00,
    "sales_count": 15,
    "average_ticket": 83.33,
    "start_date": "2024-01-01T00:00:00.000Z",
    "end_date": "2024-01-01T23:59:59.000Z"
  }
}
```

### GET /sales/top-products

Obter produtos mais vendidos.

**Query Parameters:**
- `limit` (number): Número de produtos (padrão: 10)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "product": {
        "id": "uuid",
        "name": "Fettuccine Alfredo",
        "price": 42.90
      },
      "total_quantity": 45,
      "total_revenue": 1930.50
    }
  ]
}
```

## 💵 Finanças

Todos os endpoints de finanças requerem autenticação. 🔒

### GET /finance/expenses

Listar despesas.

**Query Parameters:**
- `page`, `limit`: Paginação
- `start_date`, `end_date`: Período
- `category`: Categoria da despesa

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "description": "Fornecedor de Ingredientes",
      "amount": 2500.00,
      "category": "Fornecedores",
      "date": "2024-01-01",
      "created_at": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": { ... }
}
```

### POST /finance/expenses

Criar nova despesa.

**Request:**
```json
{
  "description": "Conta de Luz",
  "amount": 450.00,
  "category": "Contas",
  "date": "2024-01-15"
}
```

### GET /finance/summary

Obter resumo financeiro.

**Query Parameters:**
- `period`: 'today', 'week', 'month', 'year'

**Response (200):**
```json
{
  "success": true,
  "data": {
    "period": "month",
    "revenue": 15000.00,
    "expenses": 8500.00,
    "net_profit": 6500.00,
    "expenses_by_category": {
      "Fornecedores": 2500.00,
      "Contas": 450.00,
      "Salários": 8500.00
    }
  }
}
```

## ⚙️ Configurações

### GET /settings

Obter todas as configurações. (Público)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "restaurant_name": "Teca's Kitchen",
    "restaurant_phone": "(11) 98765-4321",
    "restaurant_email": "contato@tecaskitchen.com",
    ...
  }
}
```

### PUT /settings/:key

Atualizar uma configuração. 🔒 *Requer autenticação*

**Request:**
```json
{
  "value": "Novo Valor"
}
```

### PUT /settings/batch

Atualizar múltiplas configurações. 🔒 *Requer autenticação*

**Request:**
```json
{
  "restaurant_name": "Teca's Kitchen",
  "restaurant_phone": "(11) 98765-4321",
  "theme_color": "#D4AF37"
}
```

## 📝 Códigos de Status

- `200` - Sucesso
- `201` - Criado com sucesso
- `400` - Requisição inválida
- `401` - Não autorizado
- `404` - Não encontrado
- `409` - Conflito (recurso já existe)
- `500` - Erro interno do servidor

## 🔒 Autenticação

O token JWT expira em 24 horas. Após expirar, é necessário fazer login novamente.

---

**Nota**: Todos os exemplos usam dados fictícios. Substitua pelos valores reais do seu sistema.
