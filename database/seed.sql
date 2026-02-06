-- Seed Data for Teca's Kitchen
-- Initial data for development and testing

-- Insert default admin user
-- Password: Admin@123 (hashed with bcrypt)
INSERT INTO admins (email, password_hash, name) VALUES
('admin@tecaskitchen.com', '$2a$10$rQ9YqX8GqV5ZN7VKj6YKz.vK.XJX0J8xJ.6bV5xL8Z0ZKq5Z9Z9Z9', 'Administrator');

-- Insert categories
INSERT INTO categories (name, slug, order_position) VALUES
('Entradas', 'entradas', 1),
('Pratos Principais', 'pratos-principais', 2),
('Sobremesas', 'sobremesas', 3),
('Bebidas', 'bebidas', 4);

-- Insert sample products
INSERT INTO products (name, description, price, category_id, image_url, is_active) VALUES
-- Entradas
('Bruschetta', 'Pão italiano com tomate fresco, manjericão e azeite', 18.90, (SELECT id FROM categories WHERE slug = 'entradas'), 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400', true),
('Salada Caesar', 'Alface romana, croutons, parmesão e molho caesar', 22.90, (SELECT id FROM categories WHERE slug = 'entradas'), 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400', true),

-- Pratos Principais
('Fettuccine Alfredo', 'Massa fresca ao molho branco cremoso', 42.90, (SELECT id FROM categories WHERE slug = 'pratos-principais'), 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400', true),
('Filé à Parmegiana', 'Filé mignon empanado com molho e queijo', 56.90, (SELECT id FROM categories WHERE slug = 'pratos-principais'), 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=400', true),
('Risoto de Funghi', 'Risoto cremoso com cogumelos frescos', 48.90, (SELECT id FROM categories WHERE slug = 'pratos-principais'), 'https://images.unsplash.com/photo-1476124369491-c404a2d24602?w=400', true),
('Salmão Grelhado', 'Salmão fresco com legumes e molho de limão', 62.90, (SELECT id FROM categories WHERE slug = 'pratos-principais'), 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400', true),

-- Sobremesas
('Tiramisù', 'Sobremesa italiana tradicional com café e mascarpone', 24.90, (SELECT id FROM categories WHERE slug = 'sobremesas'), 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400', true),
('Petit Gâteau', 'Bolo de chocolate quente com sorvete', 26.90, (SELECT id FROM categories WHERE slug = 'sobremesas'), 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400', true),

-- Bebidas
('Suco Natural', 'Suco fresco de frutas da estação', 12.90, (SELECT id FROM categories WHERE slug = 'bebidas'), 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400', true),
('Vinho da Casa', 'Taça de vinho tinto ou branco selecionado', 28.90, (SELECT id FROM categories WHERE slug = 'bebidas'), 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400', true);

-- Insert sample sales
INSERT INTO sales (total_amount, payment_method, status, created_at) VALUES
(85.80, 'credit_card', 'completed', NOW() - INTERVAL '1 day'),
(128.70, 'debit_card', 'completed', NOW() - INTERVAL '2 days'),
(156.90, 'cash', 'completed', NOW() - INTERVAL '3 days');

-- Insert sale items for the first sale
INSERT INTO sale_items (sale_id, product_id, quantity, unit_price, subtotal) 
SELECT 
  (SELECT id FROM sales ORDER BY created_at DESC LIMIT 1 OFFSET 0),
  id,
  2,
  price,
  price * 2
FROM products WHERE name = 'Bruschetta';

INSERT INTO sale_items (sale_id, product_id, quantity, unit_price, subtotal) 
SELECT 
  (SELECT id FROM sales ORDER BY created_at DESC LIMIT 1 OFFSET 0),
  id,
  1,
  price,
  price
FROM products WHERE name = 'Fettuccine Alfredo';

-- Insert sample expenses
INSERT INTO expenses (description, amount, category, date) VALUES
('Fornecedor de Ingredientes', 2500.00, 'Fornecedores', CURRENT_DATE - 1),
('Conta de Luz', 450.00, 'Contas', CURRENT_DATE - 2),
('Salário Funcionários', 8500.00, 'Salários', CURRENT_DATE - 5),
('Manutenção Equipamentos', 850.00, 'Manutenção', CURRENT_DATE - 7);

-- Insert default settings
INSERT INTO settings (key, value) VALUES
('restaurant_name', 'Teca''s Kitchen'),
('restaurant_description', 'Experiência gastronômica única com pratos selecionados e ambiente acolhedor'),
('restaurant_address', 'Rua das Flores, 123 - Centro, São Paulo - SP'),
('restaurant_phone', '(11) 98765-4321'),
('restaurant_email', 'contato@tecaskitchen.com'),
('restaurant_instagram', 'https://instagram.com/tecaskitchen'),
('restaurant_facebook', 'https://facebook.com/tecaskitchen'),
('restaurant_whatsapp', 'https://wa.me/5511987654321'),
('opening_hours', 'Segunda a Sábado: 11h - 23h | Domingo: 11h - 17h'),
('theme_color', '#D4AF37'),
('logo_url', '');
