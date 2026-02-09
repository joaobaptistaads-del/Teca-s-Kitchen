# Teca's Kitchen - Sistema Completo de Gestão de Restaurante 🍽️

![License](https://img.shields.io/badge/license-ISC-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-green.svg)
![React](https://img.shields.io/badge/react-18.2.0-blue.svg)

Sistema completo de gestão de restaurante com frontend público e painel administrativo, desenvolvido com as melhores tecnologias do mercado.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Stack Tecnológica](#stack-tecnológica)
- [Funcionalidades](#funcionalidades)
- [Instalação](#instalação)
- [Uso](#uso)
- [Documentação](#documentação)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Contribuindo](#contribuindo)
- [Licença](#licença)

## 🎯 Sobre o Projeto

Teca's Kitchen é uma solução completa para gestão de restaurantes que combina um site público elegante com um poderoso painel administrativo. O sistema permite que proprietários de restaurantes gerenciem seus negócios de forma eficiente, desde o cardápio até as finanças, tudo em uma única plataforma.

## 🚀 Stack Tecnológica

### Frontend
- **React 18.2** - Biblioteca JavaScript para construção de interfaces
- **Vite** - Build tool moderna e rápida
- **Tailwind CSS** - Framework CSS utilitário
- **React Router DOM** - Roteamento
- **Recharts** - Biblioteca de gráficos
- **React Toastify** - Notificações
- **React Icons** - Ícones
- **Axios** - Cliente HTTP
- **date-fns** - Manipulação de datas

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **@supabase/supabase-js** - Cliente Supabase
- **JWT** - Autenticação por tokens
- **bcryptjs** - Hash de senhas
- **express-validator** - Validação de dados
- **CORS** - Cross-Origin Resource Sharing
- **Multer** - Upload de arquivos

### Banco de Dados
- **Supabase** (PostgreSQL) - Banco de dados em nuvem
- **Supabase Storage** - Armazenamento de arquivos

## ✨ Funcionalidades

### 🌐 Site Público (Sem autenticação)
- ✅ Homepage/Landing page elegante e responsiva
- ✅ Cardápio completo com categorias e filtros
- ✅ Página sobre o restaurante
- ✅ Página de contato com mapa
- ✅ Links para redes sociais
- ✅ Design responsivo (mobile, tablet, desktop)
- ✅ Performance otimizada

### 🔐 Painel Administrativo (Requer autenticação)

#### Dashboard
- 📊 Métricas em tempo real
  - Total de vendas do dia
  - Total de vendas do mês
  - Número de pedidos hoje
  - Ticket médio
- 📈 Gráficos e análises
  - Vendas por período
  - Produtos mais vendidos
  - Análise de tendências

#### Gestão de Produtos
- ➕ CRUD completo de produtos
- 🏷️ Gestão de categorias
- 🖼️ Upload de imagens
- 🔄 Ativação/desativação de produtos
- 📋 Listagem com filtros

#### Sistema de Vendas
- 💰 Registro de vendas manual
- 📜 Histórico completo de transações
- 🔍 Filtros por período e método de pagamento
- 📊 Estatísticas de vendas

#### Gestão Financeira
- 💵 Registro de receitas (vendas)
- 💸 Registro de despesas
- 📑 Categorização de despesas
- 📊 Balanço financeiro
- 📈 Relatórios financeiros

#### Configurações
- 🏪 Informações do restaurante
- 🖼️ Logo e imagens
- 📱 Redes sociais
- ⏰ Horário de funcionamento
- 🎨 Personalização visual

## 📦 Instalação

Para instruções detalhadas de instalação, consulte [INSTALLATION.md](docs/INSTALLATION.md)

### Pré-requisitos
- Node.js >= 18.0.0
- npm ou yarn
- Conta no Supabase

### Instalação Rápida

1. Clone o repositório
```bash
git clone https://github.com/joaobaptistaads-del/Teca-s-Kitchen.git
cd Teca-s-Kitchen
```

2. Configure o Backend
```bash
cd backend
npm install
cp .env.example .env
# Edite o arquivo .env com suas credenciais
npm run dev
```

3. Configure o Frontend
```bash
cd frontend
npm install
cp .env.example .env
# Edite o arquivo .env com suas credenciais
npm run dev
```

4. Configure o Banco de Dados
- Execute os scripts em `database/schema.sql` no Supabase
- Execute os scripts em `database/seed.sql` para dados iniciais

## 💻 Uso

### Acessar o Site Público
```
http://localhost:5173
```

### Acessar o Painel Admin
```
http://localhost:5173/admin/login
```

**Credenciais padrão:**
- Email: `admin@tecaskitchen.com`
- Senha: `Admin@123`

### API Backend
```
http://localhost:3000/api
```

## 📚 Documentação

- [Guia de Instalação](docs/INSTALLATION.md) - Instruções detalhadas de instalação
- [Documentação da API](docs/API.md) - Endpoints e exemplos de uso
- [Estrutura do Banco de Dados](docs/DATABASE.md) - Schema e relacionamentos

## 📁 Estrutura do Projeto

```
Teca-s-Kitchen/
├── frontend/               # Aplicação React
│   ├── src/
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── pages/         # Páginas da aplicação
│   │   ├── services/      # Serviços de API
│   │   ├── context/       # Context API
│   │   ├── hooks/         # Custom hooks
│   │   ├── utils/         # Utilitários
│   │   └── styles/        # Estilos globais
│   └── package.json
│
├── backend/               # API Node.js/Express
│   ├── src/
│   │   ├── controllers/   # Controladores
│   │   ├── routes/        # Rotas da API
│   │   ├── middleware/    # Middlewares
│   │   ├── config/        # Configurações
│   │   └── utils/         # Utilitários
│   └── package.json
│
├── database/              # Scripts SQL
│   ├── schema.sql        # Schema do banco
│   └── seed.sql          # Dados iniciais
│
└── docs/                  # Documentação
    ├── INSTALLATION.md
    ├── API.md
    └── DATABASE.md
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor, leia nosso guia de contribuição antes de enviar pull requests.

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Autores

- **Teca's Kitchen Team** - *Trabalho Inicial*

## 🙏 Agradecimentos

- Comunidade React
- Equipe Supabase
- Todos os contribuidores

---

Feito com ❤️ por Teca's Kitchen Team