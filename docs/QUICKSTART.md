# Teca's Kitchen - Guia Rápido de Início

Este guia fornece um resumo rápido para começar a usar o projeto.

## 🚀 Instalação Rápida

### 1. Pré-requisitos
- Node.js >= 18.0.0
- Conta no Supabase

### 2. Clonar Repositório
```bash
git clone https://github.com/joaobaptistaads-del/Teca-s-Kitchen.git
cd Teca-s-Kitchen
```

### 3. Configurar Supabase
1. Crie projeto em [supabase.com](https://supabase.com)
2. Execute `database/schema.sql` no SQL Editor
3. Execute `database/seed.sql` no SQL Editor
4. Anote as credenciais (URL e keys)

### 4. Backend
```bash
cd backend
npm install
cp .env.example .env
# Edite .env com suas credenciais
npm run dev
```

### 5. Frontend
```bash
cd frontend
npm install
cp .env.example .env
# Edite .env com suas credenciais
npm run dev
```

### 6. Acessar
- **Site**: http://localhost:5173
- **Admin**: http://localhost:5173/admin
- **Login**: admin@tecaskitchen.com / Admin@123

## 📁 Estrutura do Projeto

```
Teca-s-Kitchen/
├── backend/                 # API Node.js + Express
│   ├── src/
│   │   ├── config/         # Configurações (Supabase, env)
│   │   ├── controllers/    # Lógica de negócio
│   │   ├── middleware/     # Auth, validação, errors
│   │   ├── routes/         # Rotas da API
│   │   ├── utils/          # Utilitários
│   │   └── server.js       # Servidor Express
│   └── package.json
│
├── frontend/               # React + Vite
│   ├── src/
│   │   ├── components/    # Componentes reutilizáveis
│   │   │   ├── admin/     # Componentes admin
│   │   │   └── public/    # Componentes públicos
│   │   ├── pages/         # Páginas
│   │   │   └── admin/     # Páginas admin
│   │   ├── services/      # APIs e Supabase
│   │   ├── context/       # Context API (Auth)
│   │   ├── hooks/         # Custom hooks
│   │   ├── utils/         # Formatadores
│   │   └── styles/        # CSS global
│   └── package.json
│
├── database/              # SQL schemas e seeds
│   ├── schema.sql        # Estrutura do DB
│   └── seed.sql          # Dados iniciais
│
└── docs/                 # Documentação
    ├── INSTALLATION.md   # Guia completo
    ├── API.md           # Documentação da API
    └── DATABASE.md      # Estrutura do DB
```

## 🎯 Funcionalidades Principais

### Site Público (Sem Login)
✅ Homepage com hero e destaques
✅ Cardápio com filtros por categoria
✅ Página sobre o restaurante
✅ Contato e redes sociais
✅ 100% responsivo

### Painel Admin (Com Login)
✅ **Dashboard**: métricas, gráficos, top produtos
✅ **Produtos**: CRUD completo, categorias, imagens
✅ **Vendas**: registro, histórico, estatísticas
✅ **Finanças**: despesas, receitas, balanço
✅ **Configurações**: info do restaurante, redes sociais

## 📊 API Endpoints

### Autenticação
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Perfil (auth)
- `POST /api/auth/change-password` - Trocar senha (auth)

### Produtos
- `GET /api/products` - Listar produtos (público)
- `GET /api/products/:id` - Detalhes (público)
- `POST /api/products` - Criar (auth)
- `PUT /api/products/:id` - Atualizar (auth)
- `DELETE /api/products/:id` - Deletar (auth)
- `GET /api/products/categories` - Listar categorias (público)

### Vendas
- `GET /api/sales` - Listar vendas (auth)
- `GET /api/sales/:id` - Detalhes (auth)
- `POST /api/sales` - Criar venda (auth)
- `GET /api/sales/stats` - Estatísticas (auth)
- `GET /api/sales/top-products` - Top produtos (auth)

### Finanças
- `GET /api/finance/expenses` - Listar despesas (auth)
- `POST /api/finance/expenses` - Criar despesa (auth)
- `GET /api/finance/summary` - Resumo financeiro (auth)

### Configurações
- `GET /api/settings` - Listar (público)
- `POST /api/settings` - Atualizar (auth)
- `PUT /api/settings/bulk` - Atualizar múltiplas (auth)

## 🗄️ Banco de Dados

### Tabelas
- **admins**: Usuários admin
- **categories**: Categorias de produtos
- **products**: Produtos do cardápio
- **sales**: Vendas realizadas
- **sale_items**: Itens de cada venda
- **expenses**: Despesas do restaurante
- **settings**: Configurações do site

### Relacionamentos
- categories → products (1:N)
- sales → sale_items (1:N)
- products → sale_items (1:N)

## 🔐 Segurança

- Senhas criptografadas com bcrypt
- JWT para autenticação
- Rotas protegidas no backend e frontend
- Validação de dados
- Environment variables para secrets

## 🎨 Personalização

### Cores (Tailwind)
Edite `frontend/tailwind.config.js`:
```js
colors: {
  primary: { /* cores primárias */ },
  secondary: { /* cores secundárias */ }
}
```

### Configurações do Site
Acesse `/admin/settings` após login:
- Nome do restaurante
- Descrição
- Endereço, telefone, email
- Horário de funcionamento
- Links de redes sociais

## 📱 Responsividade

O sistema é 100% responsivo:
- **Desktop**: Layout completo com sidebar
- **Tablet**: Menu colapsável
- **Mobile**: Interface otimizada para toque

## 🐛 Troubleshooting

### Backend não inicia
- Verifique `.env` do backend
- Confirme credenciais do Supabase
- Execute `npm install` novamente

### Frontend não conecta
- Verifique `.env` do frontend
- Confirme que backend está rodando
- Verifique `VITE_API_URL`

### Erro de autenticação
- Verifique se o seed foi executado
- Hash da senha pode estar incorreto
- Limpe localStorage do navegador

## 📚 Documentação Completa

- [INSTALLATION.md](INSTALLATION.md) - Guia detalhado de instalação
- [API.md](API.md) - Documentação completa da API
- [DATABASE.md](DATABASE.md) - Estrutura do banco de dados

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-feature`
3. Commit: `git commit -m 'Add nova feature'`
4. Push: `git push origin feature/nova-feature`
5. Abra um Pull Request

## 📄 Licença

MIT License - veja [LICENSE](../LICENSE)

## 🆘 Suporte

- GitHub Issues: [Abrir Issue](https://github.com/joaobaptistaads-del/Teca-s-Kitchen/issues)
- Email: admin@tecaskitchen.com

---

**Desenvolvido com ❤️ para transformar a gestão de restaurantes**
