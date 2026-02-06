# Estrutura do Banco de Dados - Teca's Kitchen

Este documento descreve a estrutura completa do banco de dados PostgreSQL utilizado no projeto através do Supabase.

## Diagrama ER (Entidade-Relacionamento)

```
┌─────────────┐         ┌──────────────┐
│   admins    │         │  categories  │
├─────────────┤         ├──────────────┤
│ id (PK)     │         │ id (PK)      │
│ email       │         │ name         │
│ password_   │         │ slug         │
│   hash      │         │ order_       │
│ name        │         │   position   │
│ created_at  │         │ created_at   │
│ updated_at  │         └──────────────┘
└─────────────┘                │
                               │
                               │ (1:N)
                               ▼
                        ┌──────────────┐
                        │  products    │
                        ├──────────────┤
                        │ id (PK)      │
                        │ name         │
                        │ description  │
                        │ price        │
                        │ category_id  │◄───┐
                        │   (FK)       │    │
                        │ image_url    │    │
                        │ is_active    │    │
                        │ created_at   │    │
                        │ updated_at   │    │
                        └──────────────┘    │
                               │            │
                               │ (N:M)      │
                               ▼            │
┌─────────────┐        ┌──────────────┐    │
│   sales     │───────►│ sale_items   │    │
├─────────────┤  (1:N) ├──────────────┤    │
│ id (PK)     │        │ id (PK)      │    │
│ total_      │        │ sale_id (FK) │    │
│   amount    │        │ product_id   │────┘
│ payment_    │        │   (FK)       │
│   method    │        │ quantity     │
│ status      │        │ unit_price   │
│ notes       │        │ subtotal     │
│ created_at  │        └──────────────┘
└─────────────┘

┌─────────────┐        ┌──────────────┐
│  expenses   │        │  settings    │
├─────────────┤        ├──────────────┤
│ id (PK)     │        │ id (PK)      │
│ description │        │ key (UNIQUE) │
│ amount      │        │ value        │
│ category    │        │ updated_at   │
│ date        │        └──────────────┘
│ created_at  │
└─────────────┘
```

## Tabelas

### 1. admins
Armazena os usuários administradores do sistema.

| Coluna | Tipo | Descrição | Restrições |
|--------|------|-----------|------------|
| id | UUID | Identificador único | PRIMARY KEY, DEFAULT uuid_generate_v4() |
| email | VARCHAR(255) | Email do administrador | UNIQUE, NOT NULL |
| password_hash | VARCHAR(255) | Senha criptografada (bcrypt) | NOT NULL |
| name | VARCHAR(255) | Nome do administrador | NOT NULL |
| created_at | TIMESTAMP | Data de criação | DEFAULT NOW() |
| updated_at | TIMESTAMP | Data de atualização | DEFAULT NOW() |

**Índices:**
- PRIMARY KEY em `id`
- UNIQUE em `email`

**Exemplo:**
```sql
INSERT INTO admins (email, password_hash, name) VALUES
('admin@tecaskitchen.com', '$2a$10$...', 'Administrador');
```

---

### 2. categories
Armazena as categorias de produtos do cardápio.

| Coluna | Tipo | Descrição | Restrições |
|--------|------|-----------|------------|
| id | UUID | Identificador único | PRIMARY KEY, DEFAULT uuid_generate_v4() |
| name | VARCHAR(100) | Nome da categoria | NOT NULL |
| slug | VARCHAR(100) | URL-friendly identifier | UNIQUE, NOT NULL |
| order_position | INTEGER | Ordem de exibição | |
| created_at | TIMESTAMP | Data de criação | DEFAULT NOW() |

**Índices:**
- PRIMARY KEY em `id`
- UNIQUE em `slug`

**Exemplo:**
```sql
INSERT INTO categories (name, slug, order_position) VALUES
('Entradas', 'entradas', 1),
('Pratos Principais', 'pratos-principais', 2);
```

---

### 3. products
Armazena os produtos do cardápio.

| Coluna | Tipo | Descrição | Restrições |
|--------|------|-----------|------------|
| id | UUID | Identificador único | PRIMARY KEY, DEFAULT uuid_generate_v4() |
| name | VARCHAR(255) | Nome do produto | NOT NULL |
| description | TEXT | Descrição do produto | |
| price | DECIMAL(10,2) | Preço do produto | NOT NULL |
| category_id | UUID | Categoria do produto | FOREIGN KEY → categories(id) |
| image_url | TEXT | URL da imagem | |
| is_active | BOOLEAN | Produto ativo/inativo | DEFAULT true |
| created_at | TIMESTAMP | Data de criação | DEFAULT NOW() |
| updated_at | TIMESTAMP | Data de atualização | DEFAULT NOW() |

**Índices:**
- PRIMARY KEY em `id`
- INDEX em `category_id`
- INDEX em `is_active`

**Relacionamentos:**
- `category_id` → `categories(id)` ON DELETE SET NULL

**Exemplo:**
```sql
INSERT INTO products (name, description, price, category_id, is_active) VALUES
('Filé ao Molho Madeira', 'Filé mignon grelhado...', 55.90, 'uuid_categoria', true);
```

---

### 4. sales
Armazena as vendas realizadas.

| Coluna | Tipo | Descrição | Restrições |
|--------|------|-----------|------------|
| id | UUID | Identificador único | PRIMARY KEY, DEFAULT uuid_generate_v4() |
| total_amount | DECIMAL(10,2) | Valor total da venda | NOT NULL |
| payment_method | VARCHAR(50) | Forma de pagamento | |
| status | VARCHAR(50) | Status da venda | DEFAULT 'completed' |
| notes | TEXT | Observações | |
| created_at | TIMESTAMP | Data de criação | DEFAULT NOW() |

**Índices:**
- PRIMARY KEY em `id`
- INDEX em `created_at`

**Valores possíveis para status:**
- `completed` - Venda completada
- `pending` - Venda pendente
- `cancelled` - Venda cancelada

**Exemplo:**
```sql
INSERT INTO sales (total_amount, payment_method, status) VALUES
(139.60, 'credit_card', 'completed');
```

---

### 5. sale_items
Armazena os itens de cada venda (relação N:M entre sales e products).

| Coluna | Tipo | Descrição | Restrições |
|--------|------|-----------|------------|
| id | UUID | Identificador único | PRIMARY KEY, DEFAULT uuid_generate_v4() |
| sale_id | UUID | ID da venda | FOREIGN KEY → sales(id) |
| product_id | UUID | ID do produto | FOREIGN KEY → products(id) |
| quantity | INTEGER | Quantidade vendida | NOT NULL |
| unit_price | DECIMAL(10,2) | Preço unitário | NOT NULL |
| subtotal | DECIMAL(10,2) | Subtotal (quantity × unit_price) | NOT NULL |

**Índices:**
- PRIMARY KEY em `id`
- INDEX em `sale_id`

**Relacionamentos:**
- `sale_id` → `sales(id)` ON DELETE CASCADE
- `product_id` → `products(id)` ON DELETE SET NULL

**Exemplo:**
```sql
INSERT INTO sale_items (sale_id, product_id, quantity, unit_price, subtotal) VALUES
('uuid_venda', 'uuid_produto', 2, 55.90, 111.80);
```

---

### 6. expenses
Armazena as despesas do restaurante.

| Coluna | Tipo | Descrição | Restrições |
|--------|------|-----------|------------|
| id | UUID | Identificador único | PRIMARY KEY, DEFAULT uuid_generate_v4() |
| description | VARCHAR(255) | Descrição da despesa | NOT NULL |
| amount | DECIMAL(10,2) | Valor da despesa | NOT NULL |
| category | VARCHAR(100) | Categoria da despesa | |
| date | DATE | Data da despesa | NOT NULL |
| created_at | TIMESTAMP | Data de criação | DEFAULT NOW() |

**Índices:**
- PRIMARY KEY em `id`
- INDEX em `date`

**Categorias comuns:**
- `Fornecedores`
- `Contas`
- `Salários`
- `Outros`

**Exemplo:**
```sql
INSERT INTO expenses (description, amount, category, date) VALUES
('Fornecedor de Carnes', 1500.00, 'Fornecedores', '2024-01-15');
```

---

### 7. settings
Armazena configurações do site (chave-valor).

| Coluna | Tipo | Descrição | Restrições |
|--------|------|-----------|------------|
| id | UUID | Identificador único | PRIMARY KEY, DEFAULT uuid_generate_v4() |
| key | VARCHAR(100) | Chave da configuração | UNIQUE, NOT NULL |
| value | TEXT | Valor da configuração | |
| updated_at | TIMESTAMP | Data de atualização | DEFAULT NOW() |

**Índices:**
- PRIMARY KEY em `id`
- UNIQUE em `key`
- INDEX em `key`

**Chaves comuns:**
- `restaurant_name`
- `restaurant_description`
- `restaurant_address`
- `restaurant_phone`
- `restaurant_email`
- `restaurant_hours`
- `social_instagram`
- `social_facebook`
- `social_whatsapp`
- `theme_primary_color`
- `theme_secondary_color`

**Exemplo:**
```sql
INSERT INTO settings (key, value) VALUES
('restaurant_name', 'Teca''s Kitchen'),
('restaurant_phone', '(11) 98765-4321');
```

## Relacionamentos

### 1. categories → products (1:N)
Uma categoria pode ter múltiplos produtos.
```sql
SELECT p.*, c.name as category_name
FROM products p
LEFT JOIN categories c ON p.category_id = c.id;
```

### 2. sales → sale_items (1:N)
Uma venda pode ter múltiplos itens.
```sql
SELECT s.*, si.*
FROM sales s
LEFT JOIN sale_items si ON s.id = si.sale_id;
```

### 3. products → sale_items (1:N)
Um produto pode aparecer em múltiplos itens de venda.
```sql
SELECT p.name, SUM(si.quantity) as total_sold
FROM products p
LEFT JOIN sale_items si ON p.id = si.product_id
GROUP BY p.id;
```

## Queries Úteis

### Total de vendas por período
```sql
SELECT 
  DATE(created_at) as date,
  COUNT(*) as total_orders,
  SUM(total_amount) as total_sales
FROM sales
WHERE created_at >= '2024-01-01'
  AND created_at < '2024-02-01'
  AND status = 'completed'
GROUP BY DATE(created_at)
ORDER BY date;
```

### Produtos mais vendidos
```sql
SELECT 
  p.name,
  SUM(si.quantity) as total_quantity,
  SUM(si.subtotal) as total_revenue
FROM products p
INNER JOIN sale_items si ON p.id = si.product_id
GROUP BY p.id, p.name
ORDER BY total_quantity DESC
LIMIT 10;
```

### Resumo financeiro
```sql
SELECT 
  (SELECT COALESCE(SUM(total_amount), 0) 
   FROM sales 
   WHERE status = 'completed' 
   AND created_at >= '2024-01-01') as total_revenue,
  (SELECT COALESCE(SUM(amount), 0) 
   FROM expenses 
   WHERE date >= '2024-01-01') as total_expenses;
```

### Despesas por categoria
```sql
SELECT 
  category,
  COUNT(*) as total_expenses,
  SUM(amount) as total_amount
FROM expenses
WHERE date >= '2024-01-01'
GROUP BY category
ORDER BY total_amount DESC;
```

## Migração e Seed

### Executar Schema
```bash
# No painel do Supabase SQL Editor
# Copie e execute database/schema.sql
```

### Executar Seed
```bash
# No painel do Supabase SQL Editor
# Copie e execute database/seed.sql
```

## Backup e Restore

### Backup
```bash
pg_dump -h db.xxx.supabase.co -U postgres -d postgres > backup.sql
```

### Restore
```bash
psql -h db.xxx.supabase.co -U postgres -d postgres < backup.sql
```

## Políticas de Segurança (RLS)

O Supabase suporta Row Level Security (RLS). Para este projeto:

- **Tabela settings**: Leitura pública, escrita apenas autenticada
- **Tabela products**: Leitura pública, escrita apenas autenticada
- **Demais tabelas**: Apenas usuários autenticados

```sql
-- Exemplo de política RLS para products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON products
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated write" ON products
  FOR ALL USING (auth.role() = 'authenticated');
```

---

Desenvolvido com ❤️ por Teca's Kitchen Team
