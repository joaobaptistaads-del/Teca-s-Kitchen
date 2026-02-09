# Guia de Instalação - Teca's Kitchen

Este guia fornece instruções passo a passo para configurar o Teca's Kitchen em seu ambiente local.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** >= 18.0.0 ([Download](https://nodejs.org/))
- **npm** >= 9.0.0 (incluído com Node.js) ou **yarn**
- **Git** ([Download](https://git-scm.com/))
- Uma conta no **Supabase** ([Criar conta](https://supabase.com/))

## 1. Clonar o Repositório

```bash
git clone https://github.com/joaobaptistaads-del/Teca-s-Kitchen.git
cd Teca-s-Kitchen
```

## 2. Configurar o Supabase

### 2.1 Criar um Novo Projeto

1. Acesse [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Clique em "New Project"
3. Preencha os detalhes:
   - **Name**: Teca's Kitchen
   - **Database Password**: Crie uma senha forte (anote-a)
   - **Region**: Escolha a região mais próxima
4. Clique em "Create new project"

### 2.2 Executar os Scripts SQL

1. No dashboard do Supabase, vá para **SQL Editor**
2. Copie todo o conteúdo de `database/schema.sql` e execute
3. Copie todo o conteúdo de `database/seed.sql` e execute

### 2.3 Obter as Credenciais

1. Vá para **Settings** > **API**
2. Anote os seguintes valores:
   - **Project URL**: `SUPABASE_URL`
   - **anon public**: `SUPABASE_ANON_KEY`
   - **service_role**: `SUPABASE_SERVICE_KEY` (clique em "Reveal" para ver)

## 3. Configurar o Backend

### 3.1 Instalar Dependências

```bash
cd backend
npm install
```

### 3.2 Configurar Variáveis de Ambiente

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais:

```env
PORT=3000
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_KEY=sua_service_role_key_aqui
JWT_SECRET=crie_um_secret_aleatorio_minimo_32_caracteres
NODE_ENV=development
```

**Dica**: Para gerar um JWT_SECRET seguro, use:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3.3 Iniciar o Servidor

```bash
# Modo desenvolvimento (com hot reload)
npm run dev

# Modo produção
npm start
```

O servidor estará rodando em `http://localhost:3000`

## 4. Configurar o Frontend

### 4.1 Instalar Dependências

Em um novo terminal:

```bash
cd frontend
npm install
```

### 4.2 Configurar Variáveis de Ambiente

```bash
cp .env.example .env
```

Edite o arquivo `.env`:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua_anon_key_aqui
VITE_API_URL=http://localhost:3000/api
```

### 4.3 Iniciar a Aplicação

```bash
# Modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build de produção
npm run preview
```

A aplicação estará rodando em `http://localhost:5173`

## 5. Verificar a Instalação

### 5.1 Testar o Backend

Abra o navegador e acesse:
```
http://localhost:3000/health
```

Você deve ver:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "..."
}
```

### 5.2 Testar o Frontend

1. Acesse `http://localhost:5173`
2. Você deve ver a homepage do Teca's Kitchen
3. Navegue para `http://localhost:5173/menu` para ver o cardápio

### 5.3 Testar o Painel Admin

1. Acesse `http://localhost:5173/admin/login`
2. Use as credenciais padrão:
   - **Email**: `admin@tecaskitchen.com`
   - **Senha**: `Admin@123`
3. Você deve ser redirecionado para o dashboard

## 6. Configuração de Produção

### 6.1 Backend

```bash
cd backend
npm install --production
NODE_ENV=production npm start
```

### 6.2 Frontend

```bash
cd frontend
npm run build
```

Os arquivos de build estarão em `frontend/dist/`

### 6.3 Deploy

#### Supabase Hosting
- O Supabase não oferece hosting de aplicação, apenas banco de dados

#### Opções de Deploy:

**Backend:**
- [Railway](https://railway.app/)
- [Render](https://render.com/)
- [Heroku](https://heroku.com/)
- [DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform)

**Frontend:**
- [Vercel](https://vercel.com/)
- [Netlify](https://netlify.com/)
- [Cloudflare Pages](https://pages.cloudflare.com/)

## 7. Solução de Problemas

### Erro: "Missing required environment variables"

**Solução**: Verifique se todos os valores no arquivo `.env` estão preenchidos corretamente.

### Erro: "Failed to fetch"

**Solução**: 
1. Certifique-se de que o backend está rodando
2. Verifique se `VITE_API_URL` no frontend está correto
3. Verifique se há problemas de CORS

### Erro: "Invalid credentials"

**Solução**:
1. Verifique se o seed.sql foi executado corretamente
2. Use as credenciais padrão: `admin@tecaskitchen.com / Admin@123`
3. Verifique se a senha foi hasheada corretamente no banco de dados

### Erro: "Cannot connect to Supabase"

**Solução**:
1. Verifique se as URLs e keys estão corretas
2. Certifique-se de que o projeto Supabase está ativo
3. Verifique sua conexão de internet

### Porta já em uso

**Solução**:
```bash
# Linux/Mac
lsof -ti:3000 | xargs kill -9  # Para porta 3000
lsof -ti:5173 | xargs kill -9  # Para porta 5173

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

## 8. Próximos Passos

Após a instalação:

1. ✅ Altere a senha do usuário admin
2. ✅ Configure as informações do restaurante em Configurações
3. ✅ Adicione produtos ao cardápio
4. ✅ Personalize o visual do site
5. ✅ Configure as redes sociais

## 9. Recursos Adicionais

- [Documentação da API](API.md)
- [Estrutura do Banco de Dados](DATABASE.md)
- [Documentação do Supabase](https://supabase.com/docs)
- [Documentação do React](https://react.dev/)
- [Documentação do Express](https://expressjs.com/)

## 10. Suporte

Se encontrar problemas durante a instalação:

1. Verifique a seção de [Solução de Problemas](#7-solução-de-problemas)
2. Consulte a documentação oficial das tecnologias utilizadas
3. Abra uma issue no GitHub

---

**Instalação concluída!** 🎉 Agora você está pronto para usar o Teca's Kitchen.
