-- Teca's Kitchen - Seed Data
-- Dados iniciais para desenvolvimento e testes

-- Limpar dados existentes (use com cuidado em produção!)
-- TRUNCATE TABLE sale_items, sales, expenses, products, categories, admins, settings CASCADE;

-- Inserir usuário administrador padrão
-- Senha: Admin@123 (hash bcrypt com salt 10)
INSERT INTO admins (email, password_hash, name) VALUES
('admin@tecaskitchen.com', '$2a$10$rJYGKqhqE.yJqHF9LQYqWe8yQ7xFJ5L5F5L5F5L5F5L5F5L5F5L5F', 'Administrador');

-- Inserir categorias
INSERT INTO categories (name, slug, order_position) VALUES
('Entradas', 'entradas', 1),
('Pratos Principais', 'pratos-principais', 2),
('Sobremesas', 'sobremesas', 3),
('Bebidas', 'bebidas', 4);

-- Inserir produtos de exemplo
INSERT INTO products (name, description, price, category_id, image_url, is_active) VALUES
-- Entradas
('Bruschetta', 'Pão italiano tostado com tomate, manjericão e azeite', 15.90, (SELECT id FROM categories WHERE slug = 'entradas'), 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f', true),
('Carpaccio', 'Finas fatias de carne com rúcula e parmesão', 28.90, (SELECT id FROM categories WHERE slug = 'entradas'), 'https://images.unsplash.com/photo-1625944525533-473f1a3d54e7', true),

-- Pratos Principais
('Filé ao Molho Madeira', 'Filé mignon grelhado com molho madeira, acompanha arroz e batatas', 55.90, (SELECT id FROM categories WHERE slug = 'pratos-principais'), 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976', true),
('Salmão Grelhado', 'Salmão grelhado com legumes e molho de maracujá', 62.90, (SELECT id FROM categories WHERE slug = 'pratos-principais'), 'https://images.unsplash.com/photo-1467003909585-2f8a72700288', true),
('Risoto de Funghi', 'Risoto cremoso com cogumelos frescos', 48.90, (SELECT id FROM categories WHERE slug = 'pratos-principais'), 'https://images.unsplash.com/photo-1476124369491-c0df54-f0e27', true),
('Picanha na Brasa', 'Picanha argentina na brasa, acompanha farofa e vinagrete', 68.90, (SELECT id FROM categories WHERE slug = 'pratos-principais'), 'https://images.unsplash.com/photo-1558030006-450675393462', true),

-- Sobremesas
('Tiramisù', 'Sobremesa italiana clássica com café e mascarpone', 18.90, (SELECT id FROM categories WHERE slug = 'sobremesas'), 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9', true),
('Petit Gâteau', 'Bolinho de chocolate com sorvete de creme', 22.90, (SELECT id FROM categories WHERE slug = 'sobremesas'), 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51', true),

-- Bebidas
('Suco Natural', 'Suco natural de frutas da estação', 12.90, (SELECT id FROM categories WHERE slug = 'bebidas'), 'https://images.unsplash.com/photo-1600271886742-f049cd451bba', true),
('Água Mineral', 'Água mineral 500ml', 5.90, (SELECT id FROM categories WHERE slug = 'bebidas'), 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d', true);

-- Inserir vendas de exemplo
INSERT INTO sales (total_amount, payment_method, status, created_at) VALUES
(139.60, 'credit_card', 'completed', NOW() - INTERVAL '2 days'),
(85.80, 'debit_card', 'completed', NOW() - INTERVAL '1 day'),
(110.70, 'cash', 'completed', NOW() - INTERVAL '1 day'),
(156.80, 'pix', 'completed', NOW());

-- Inserir itens de venda
INSERT INTO sale_items (sale_id, product_id, quantity, unit_price, subtotal) VALUES
-- Venda 1
((SELECT id FROM sales ORDER BY created_at LIMIT 1 OFFSET 0), (SELECT id FROM products WHERE name = 'Filé ao Molho Madeira'), 2, 55.90, 111.80),
((SELECT id FROM sales ORDER BY created_at LIMIT 1 OFFSET 0), (SELECT id FROM products WHERE name = 'Tiramisù'), 1, 18.90, 18.90),
((SELECT id FROM sales ORDER BY created_at LIMIT 1 OFFSET 0), (SELECT id FROM products WHERE name = 'Suco Natural'), 1, 12.90, 12.90),

-- Venda 2
((SELECT id FROM sales ORDER BY created_at LIMIT 1 OFFSET 1), (SELECT id FROM products WHERE name = 'Salmão Grelhado'), 1, 62.90, 62.90),
((SELECT id FROM sales ORDER BY created_at LIMIT 1 OFFSET 1), (SELECT id FROM products WHERE name = 'Petit Gâteau'), 1, 22.90, 22.90);

-- Inserir despesas de exemplo
INSERT INTO expenses (description, amount, category, date) VALUES
('Fornecedor de Carnes', 1500.00, 'Fornecedores', CURRENT_DATE - INTERVAL '5 days'),
('Conta de Luz', 450.00, 'Contas', CURRENT_DATE - INTERVAL '3 days'),
('Salário Cozinheiro', 2800.00, 'Salários', CURRENT_DATE - INTERVAL '1 day'),
('Fornecedor de Vegetais', 680.00, 'Fornecedores', CURRENT_DATE);

-- Inserir configurações padrão
INSERT INTO settings (key, value) VALUES
('restaurant_name', 'Teca''s Kitchen'),
('restaurant_description', 'Restaurante especializado em culinária contemporânea com ingredientes selecionados e ambiente acolhedor.'),
('restaurant_address', 'Rua das Flores, 123 - Centro'),
('restaurant_phone', '(11) 98765-4321'),
('restaurant_email', 'contato@tecaskitchen.com'),
('restaurant_hours', 'Seg-Sex: 11h-15h e 18h-23h | Sáb-Dom: 11h-23h'),
('social_instagram', 'https://instagram.com/tecaskitchen'),
('social_facebook', 'https://facebook.com/tecaskitchen'),
('social_whatsapp', 'https://wa.me/5511987654321'),
('theme_primary_color', '#D97706'),
('theme_secondary_color', '#059669');
