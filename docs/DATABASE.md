# Estrutura do Banco de Dados - Teca's Kitchen

Documentação completa do schema do banco de dados PostgreSQL/Supabase.

## 📊 Diagrama de Relacionamento

```
┌─────────────┐
│   admins    │
└─────────────┘

┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│ categories  │──────<│  products   │>──────│ sale_items  │
└─────────────┘       └─────────────┘       └──────┬──────┘
                                                    │
                                                    │
┌─────────────┐                             ┌──────▼──────┐
│  settings   │                             │    sales    │
└─────────────┘                             └─────────────┘

┌─────────────┐
│  expenses   │
└─────────────┘
```

## 📋 Tabelas

### 1. admins

Armazena os usuários administrativos do sistema.

**Colunas:**

| Coluna | Tipo | Constraints | Descrição |
|--------|------|-------------|-----------|
| id | UUID | PRIMARY KEY, DEFAULT uuid_generate_v4() | Identificador único |
| email | VARCHAR(255) | UNIQUE, NOT NULL | Email do administrador |
| password_hash | VARCHAR(255) | NOT NULL | Hash bcrypt da senha |
| name | VARCHAR(255) | NOT NULL | Nome do administrador |
| created_at | TIMESTAMP | DEFAULT NOW() | Data de criação |
| updated_at | TIMESTAMP | DEFAULT NOW() | Data de atualização |

**Índices:**
- Primary Key em `id`
- Unique Index em `email`

**Exemplo:**
```sql
SELECT * FROM admins;
```
```
id                                   | email                      | name
-------------------------------------|----------------------------|---------------
550e8400-e29b-41d4-a716-446655440000 | admin@tecaskitchen.com     | Administrator
```

---

### 2. categories

Categorias de produtos do cardápio.

**Colunas:**

| Coluna | Tipo | Constraints | Descrição |
|--------|------|-------------|-----------|
| id | UUID | PRIMARY KEY | Identificador único |
| name | VARCHAR(100) | NOT NULL | Nome da categoria |
| slug | VARCHAR(100) | UNIQUE, NOT NULL | Slug URL-friendly |
| order_position | INTEGER | DEFAULT 0 | Ordem de exibição |
| created_at | TIMESTAMP | DEFAULT NOW() | Data de criação |

**Índices:**
- Primary Key em `id`
- Unique Index em `slug`

**Exemplo:**
```sql
SELECT * FROM categories ORDER BY order_position;
```
```
id   | name              | slug              | order_position
-----|-------------------|-------------------|---------------
...  | Entradas          | entradas          | 1
...  | Pratos Principais | pratos-principais | 2
...  | Sobremesas        | sobremesas        | 3
...  | Bebidas           | bebidas           | 4
```

---

### 3. products

Produtos/itens do cardápio.

**Colunas:**

| Coluna | Tipo | Constraints | Descrição |
|--------|------|-------------|-----------|
| id | UUID | PRIMARY KEY | Identificador único |
| name | VARCHAR(255) | NOT NULL | Nome do produto |
| description | TEXT | | Descrição do produto |
| price | DECIMAL(10,2) | NOT NULL | Preço do produto |
| category_id | UUID | FOREIGN KEY → categories(id) | Categoria do produto |
| image_url | TEXT | | URL da imagem |
| is_active | BOOLEAN | DEFAULT true | Produto ativo/inativo |
| created_at | TIMESTAMP | DEFAULT NOW() | Data de criação |
| updated_at | TIMESTAMP | DEFAULT NOW() | Data de atualização |

**Índices:**
- Primary Key em `id`
- Index em `category_id`
- Index em `is_active`

**Relacionamentos:**
- `category_id` → `categories.id` (ON DELETE SET NULL)

**Exemplo:**
```sql
SELECT p.name, p.price, c.name as category 
FROM products p 
LEFT JOIN categories c ON p.category_id = c.id 
WHERE p.is_active = true;
```

---

### 4. sales

Vendas/transações realizadas.

**Colunas:**

| Coluna | Tipo | Constraints | Descrição |
|--------|------|-------------|-----------|
| id | UUID | PRIMARY KEY | Identificador único |
| total_amount | DECIMAL(10,2) | NOT NULL | Valor total da venda |
| payment_method | VARCHAR(50) | | Método de pagamento |
| status | VARCHAR(50) | DEFAULT 'completed' | Status da venda |
| created_at | TIMESTAMP | DEFAULT NOW() | Data/hora da venda |

**Índices:**
- Primary Key em `id`
- Index em `created_at`

**Valores comuns:**
- `payment_method`: 'credit_card', 'debit_card', 'cash', 'pix'
- `status`: 'completed', 'pending', 'cancelled'

**Exemplo:**
```sql
SELECT 
  DATE(created_at) as date,
  COUNT(*) as total_sales,
  SUM(total_amount) as revenue
FROM sales
WHERE status = 'completed'
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

---

### 5. sale_items

Itens individuais de cada venda.

**Colunas:**

| Coluna | Tipo | Constraints | Descrição |
|--------|------|-------------|-----------|
| id | UUID | PRIMARY KEY | Identificador único |
| sale_id | UUID | FOREIGN KEY → sales(id) | ID da venda |
| product_id | UUID | FOREIGN KEY → products(id) | ID do produto |
| quantity | INTEGER | NOT NULL | Quantidade vendida |
| unit_price | DECIMAL(10,2) | NOT NULL | Preço unitário |
| subtotal | DECIMAL(10,2) | NOT NULL | Subtotal (quantity * unit_price) |

**Índices:**
- Primary Key em `id`
- Index em `sale_id`

**Relacionamentos:**
- `sale_id` → `sales.id` (ON DELETE CASCADE)
- `product_id` → `products.id` (ON DELETE SET NULL)

**Exemplo:**
```sql
SELECT 
  s.created_at,
  p.name,
  si.quantity,
  si.unit_price,
  si.subtotal
FROM sale_items si
JOIN sales s ON si.sale_id = s.id
JOIN products p ON si.product_id = p.id
ORDER BY s.created_at DESC;
```

---

### 6. expenses

Despesas/custos do negócio.

**Colunas:**

| Coluna | Tipo | Constraints | Descrição |
|--------|------|-------------|-----------|
| id | UUID | PRIMARY KEY | Identificador único |
| description | VARCHAR(255) | NOT NULL | Descrição da despesa |
| amount | DECIMAL(10,2) | NOT NULL | Valor da despesa |
| category | VARCHAR(100) | | Categoria da despesa |
| date | DATE | NOT NULL | Data da despesa |
| created_at | TIMESTAMP | DEFAULT NOW() | Data de registro |

**Índices:**
- Primary Key em `id`
- Index em `date`

**Categorias comuns:**
- 'Fornecedores'
- 'Contas'
- 'Salários'
- 'Manutenção'
- 'Marketing'

**Exemplo:**
```sql
SELECT 
  category,
  SUM(amount) as total
FROM expenses
WHERE date >= DATE_TRUNC('month', CURRENT_DATE)
GROUP BY category
ORDER BY total DESC;
```

---

### 7. settings

Configurações gerais do sistema.

**Colunas:**

| Coluna | Tipo | Constraints | Descrição |
|--------|------|-------------|-----------|
| id | UUID | PRIMARY KEY | Identificador único |
| key | VARCHAR(100) | UNIQUE, NOT NULL | Chave da configuração |
| value | TEXT | | Valor da configuração |
| updated_at | TIMESTAMP | DEFAULT NOW() | Data de atualização |

**Índices:**
- Primary Key em `id`
- Unique Index em `key`
- Index em `key`

**Configurações padrão:**
- `restaurant_name`
- `restaurant_description`
- `restaurant_address`
- `restaurant_phone`
- `restaurant_email`
- `restaurant_instagram`
- `restaurant_facebook`
- `restaurant_whatsapp`
- `opening_hours`
- `theme_color`
- `logo_url`

**Exemplo:**
```sql
SELECT key, value FROM settings WHERE key LIKE 'restaurant_%';
```

---

## 🔄 Relacionamentos

### One-to-Many (1:N)

1. **categories → products**
   - Uma categoria pode ter múltiplos produtos
   - Um produto pertence a uma categoria

2. **sales → sale_items**
   - Uma venda pode ter múltiplos itens
   - Um item pertence a uma venda

3. **products → sale_items**
   - Um produto pode estar em múltiplos itens de venda
   - Um item de venda referencia um produto

## 📊 Queries Úteis

### Produtos mais vendidos
```sql
SELECT 
  p.name,
  SUM(si.quantity) as total_sold,
  SUM(si.subtotal) as total_revenue
FROM sale_items si
JOIN products p ON si.product_id = p.id
GROUP BY p.id, p.name
ORDER BY total_sold DESC
LIMIT 10;
```

### Vendas por período
```sql
SELECT 
  DATE(created_at) as date,
  COUNT(*) as orders,
  SUM(total_amount) as revenue
FROM sales
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date;
```

### Balanço financeiro mensal
```sql
SELECT 
  (SELECT SUM(total_amount) FROM sales 
   WHERE DATE_TRUNC('month', created_at) = DATE_TRUNC('month', CURRENT_DATE)) as revenue,
  (SELECT SUM(amount) FROM expenses 
   WHERE DATE_TRUNC('month', date) = DATE_TRUNC('month', CURRENT_DATE)) as expenses,
  (SELECT SUM(total_amount) FROM sales 
   WHERE DATE_TRUNC('month', created_at) = DATE_TRUNC('month', CURRENT_DATE)) -
  (SELECT SUM(amount) FROM expenses 
   WHERE DATE_TRUNC('month', date) = DATE_TRUNC('month', CURRENT_DATE)) as net_profit;
```

## 🔒 Segurança

### Row Level Security (RLS)

Para produção, considere habilitar RLS no Supabase:

```sql
-- Exemplo para a tabela products (acesso público leitura)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public products are viewable by everyone"
  ON products FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admin can do everything"
  ON products
  USING (auth.role() = 'authenticated');
```

## 🎯 Manutenção

### Backup
```sql
-- Export todas as tabelas
pg_dump -h localhost -U postgres -d tecas_kitchen > backup.sql
```

### Limpeza de dados antigos
```sql
-- Deletar vendas antigas (exemplo: > 2 anos)
DELETE FROM sales WHERE created_at < NOW() - INTERVAL '2 years';

-- Deletar despesas antigas
DELETE FROM expenses WHERE date < NOW() - INTERVAL '2 years';
```

---

**Nota**: Esta estrutura é otimizada para o caso de uso do Teca's Kitchen. Ajuste conforme necessário para suas necessidades específicas.
