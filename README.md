# Teca's Kitchen - Sistema Completo de Gestão de Restaurante

Sistema completo de gestão de restaurante com frontend público e painel administrativo desenvolvido com React, Node.js, Express e Supabase.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.2.0-blue.svg)
![Security](https://img.shields.io/badge/security-hardened-green.svg)

> **Version 1.0.1** - Security-hardened release with all dependencies audited and patched.

## 📋 Visão Geral

Teca's Kitchen é uma aplicação web completa para gestão de restaurantes que oferece:
- **Site público** com cardápio online, informações do restaurante e contato
- **Painel administrativo** com gestão completa de produtos, vendas, finanças e configurações
- **Dashboard analítico** com métricas em tempo real e relatórios financeiros
- **Sistema de autenticação** seguro com JWT
- **Design responsivo** para desktop, tablet e mobile

## 🚀 Stack Tecnológica

### Frontend
- **React 18** - Biblioteca JavaScript para construção de interfaces
- **Vite** - Build tool e dev server ultrarrápido
- **React Router DOM** - Roteamento de páginas
- **Tailwind CSS** - Framework CSS utility-first
- **Recharts** - Biblioteca de gráficos para React
- **React Toastify** - Notificações toast
- **Axios** - Cliente HTTP
- **React Icons** - Biblioteca de ícones

### Backend
- **Node.js** - Ambiente de execução JavaScript
- **Express** - Framework web minimalista
- **Supabase** - Backend-as-a-Service (PostgreSQL)
- **JWT** - JSON Web Tokens para autenticação
- **bcryptjs** - Hash de senhas
- **express-validator** - Validação de dados

### Banco de Dados
- **Supabase (PostgreSQL)** - Banco de dados relacional com recursos modernos

## ✨ Funcionalidades

### Site Público (Sem autenticação)
- ✅ Homepage com hero section e destaques
- ✅ Cardápio completo com filtros por categoria
- ✅ Página sobre o restaurante
- ✅ Página de contato com informações
- ✅ Links para redes sociais
- ✅ Design responsivo completo

### Painel Administrativo (Com autenticação)
- ✅ **Dashboard**
  - Métricas em tempo real (vendas do dia, mês, ticket médio)
  - Gráficos de desempenho
  - Produtos mais vendidos
  - Resumo financeiro

- ✅ **Gestão de Produtos**
  - CRUD completo de produtos
  - Gestão de categorias
  - Upload de imagens
  - Ativação/desativação de produtos

- ✅ **Gestão de Vendas**
  - Registro de vendas
  - Histórico completo
  - Relatórios e estatísticas

- ✅ **Gestão Financeira**
  - Registro de despesas
  - Categorização de gastos
  - Balanço financeiro (receitas vs despesas)
  - Cálculo de lucro líquido

- ✅ **Configurações**
  - Informações do restaurante (nome, endereço, telefone, email)
  - Horário de funcionamento
  - Links de redes sociais
  - Personalização do site

## 📦 Instalação

### Pré-requisitos
- Node.js >= 18.0.0
- npm ou yarn
- Conta no Supabase

### Passo a Passo

1. **Clone o repositório**
```bash
git clone https://github.com/joaobaptistaads-del/Teca-s-Kitchen.git
cd Teca-s-Kitchen
```

2. **Configure o Supabase**
   - Crie um projeto no [Supabase](https://supabase.com)
   - Execute o script SQL em `database/schema.sql`
   - Execute o script SQL em `database/seed.sql` para dados iniciais

3. **Configure o Backend**
```bash
cd backend
npm install
cp .env.example .env
# Edite o arquivo .env com suas credenciais do Supabase
npm start
```

4. **Configure o Frontend**
```bash
cd frontend
npm install
cp .env.example .env
# Edite o arquivo .env com suas credenciais do Supabase
npm run dev
```

5. **Acesse a aplicação**
   - Site público: http://localhost:5173
   - Painel admin: http://localhost:5173/admin
   - Credenciais padrão: admin@tecaskitchen.com / Admin@123

Para mais detalhes, consulte [INSTALLATION.md](docs/INSTALLATION.md)

## 📖 Documentação

- [Guia de Instalação](docs/INSTALLATION.md)
- [Documentação da API](docs/API.md)
- [Estrutura do Banco de Dados](docs/DATABASE.md)

## 🔒 Segurança

- Senhas criptografadas com bcrypt
- Autenticação JWT
- Proteção de rotas administrativas
- Validação de dados no frontend e backend
- Variáveis de ambiente para informações sensíveis

## 🎨 Screenshots

### Site Público
![Homepage](https://via.placeholder.com/800x400?text=Homepage+Screenshot)

### Painel Administrativo
![Dashboard](https://via.placeholder.com/800x400?text=Dashboard+Screenshot)

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:
1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autor

Desenvolvido por [João Baptista](https://github.com/joaobaptistaads-del)

## 📧 Contato

Para dúvidas e suporte:
- Email: admin@tecaskitchen.com
- GitHub Issues: [Abrir Issue](https://github.com/joaobaptistaads-del/Teca-s-Kitchen/issues)

---

⭐ Se este projeto foi útil para você, considere dar uma estrela no repositório!