# Guia de Instalação - Teca's Kitchen

Este guia fornece instruções passo a passo para configurar e executar o projeto Teca's Kitchen em seu ambiente local.

## Requisitos do Sistema

### Software Necessário
- **Node.js**: >= 18.0.0 (recomendado 20.x LTS)
- **npm**: >= 9.0.0 ou **yarn**: >= 1.22.0
- **Git**: Para clonar o repositório
- **Conta Supabase**: Para o banco de dados e autenticação

### Verificando Pré-requisitos

```bash
# Verificar versão do Node.js
node --version

# Verificar versão do npm
npm --version

# Verificar versão do Git
git --version
```

## Passo 1: Clonar o Repositório

```bash
git clone https://github.com/joaobaptistaads-del/Teca-s-Kitchen.git
cd Teca-s-Kitchen
```

## Passo 2: Configurar o Supabase

### 2.1 Criar Projeto no Supabase

1. Acesse [https://supabase.com](https://supabase.com)
2. Faça login ou crie uma conta
3. Clique em "New Project"
4. Escolha um nome para o projeto (ex: tecas-kitchen)
5. Defina uma senha forte para o banco de dados
6. Escolha a região mais próxima de você
7. Aguarde a criação do projeto (1-2 minutos)

### 2.2 Configurar o Banco de Dados

1. No painel do Supabase, vá para **SQL Editor**
2. Clique em "New Query"
3. Copie e cole o conteúdo do arquivo `database/schema.sql`
4. Execute a query (clique em "Run" ou Ctrl/Cmd + Enter)
5. Crie uma nova query
6. Copie e cole o conteúdo do arquivo `database/seed.sql`
7. Execute a query

**Nota**: O seed.sql contém um usuário admin padrão. A senha `Admin@123` precisa ser hasheada antes de inserir. Use a ferramenta online bcrypt ou modifique o seed após configurar o backend.

### 2.3 Obter Credenciais do Supabase

1. Vá para **Settings** > **API**
2. Anote os seguintes valores:
   - **Project URL** (SUPABASE_URL)
   - **anon/public key** (SUPABASE_ANON_KEY)
   - **service_role key** (SUPABASE_SERVICE_KEY)

## Passo 3: Configurar o Backend

### 3.1 Instalar Dependências

```bash
cd backend
npm install
```

### 3.2 Configurar Variáveis de Ambiente

```bash
# Copiar arquivo de exemplo
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais:

```env
PORT=3000
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_KEY=sua_service_role_key_aqui
JWT_SECRET=seu_secret_jwt_super_seguro_mude_isso
NODE_ENV=development
```

**Importante**: 
- Troque `JWT_SECRET` por uma string aleatória e segura
- Use a `service_role key` do Supabase (não a anon key)

### 3.3 Iniciar o Backend

```bash
# Modo desenvolvimento (com hot reload)
npm run dev

# Ou modo produção
npm start
```

O servidor estará rodando em `http://localhost:3000`

## Passo 4: Configurar o Frontend

### 4.1 Instalar Dependências

Abra um novo terminal:

```bash
cd frontend
npm install
```

### 4.2 Configurar Variáveis de Ambiente

```bash
# Copiar arquivo de exemplo
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua_anon_key_aqui
VITE_API_URL=http://localhost:3000/api
```

**Importante**: 
- Use a `anon key` do Supabase (não a service_role key)
- Se o backend estiver em outra porta, ajuste `VITE_API_URL`

### 4.3 Iniciar o Frontend

```bash
npm run dev
```

O frontend estará rodando em `http://localhost:5173`

## Passo 5: Criar Usuário Administrador

Como a senha no seed.sql precisa ser hasheada, você tem duas opções:

### Opção 1: Usar bcrypt online
1. Acesse uma ferramenta online de bcrypt (ex: bcrypt-generator.com)
2. Gere o hash da senha `Admin@123` com salt rounds 10
3. Atualize o seed.sql com o hash gerado
4. Execute o seed.sql novamente no Supabase

### Opção 2: Criar via código
Execute este script no backend:

```javascript
// backend/create-admin.js
import bcrypt from 'bcryptjs';
import supabase from './src/config/supabase.js';

const createAdmin = async () => {
  const passwordHash = await bcrypt.hash('Admin@123', 10);
  
  const { data, error } = await supabase
    .from('admins')
    .insert([{
      email: 'admin@tecaskitchen.com',
      password_hash: passwordHash,
      name: 'Administrador'
    }]);

  if (error) {
    console.error('Erro:', error);
  } else {
    console.log('Admin criado com sucesso!');
  }
};

createAdmin();
```

Execute:
```bash
node backend/create-admin.js
```

## Passo 6: Acessar a Aplicação

### Site Público
- URL: http://localhost:5173
- Navegue livremente sem necessidade de login

### Painel Administrativo
- URL: http://localhost:5173/admin
- Email: `admin@tecaskitchen.com`
- Senha: `Admin@123`

## Verificação de Funcionamento

### Testar Backend
```bash
# Testar health check
curl http://localhost:3000/health
```

Resposta esperada:
```json
{
  "status": "OK",
  "message": "Teca's Kitchen API is running"
}
```

### Testar Frontend
1. Abra http://localhost:5173
2. Verifique se a homepage carrega
3. Navegue para /menu
4. Tente fazer login em /admin

## Problemas Comuns

### Erro: "Missing Supabase environment variables"
- Verifique se o arquivo `.env` existe
- Confirme que as variáveis estão corretamente configuradas
- Reinicie o servidor após editar o `.env`

### Erro: "Cannot find module"
- Execute `npm install` novamente
- Delete `node_modules` e `package-lock.json`, depois execute `npm install`

### Erro: "Port already in use"
- Mude a porta no arquivo `.env` do backend
- Ou encerre o processo que está usando a porta:
  ```bash
  # Linux/Mac
  lsof -ti:3000 | xargs kill -9
  
  # Windows
  netstat -ano | findstr :3000
  taskkill /PID <PID> /F
  ```

### Frontend não conecta ao Backend
- Verifique se o backend está rodando
- Confirme o `VITE_API_URL` no `.env` do frontend
- Verifique se não há firewall bloqueando

## Build para Produção

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

Os arquivos de build estarão em `frontend/dist/`

## Próximos Passos

- Consulte [API.md](API.md) para documentação da API
- Consulte [DATABASE.md](DATABASE.md) para estrutura do banco
- Configure imagens personalizadas no Supabase Storage
- Personalize as cores e o tema em `frontend/tailwind.config.js`
- Configure um domínio personalizado para produção

## Suporte

Se encontrar problemas:
1. Verifique os logs do console
2. Consulte a documentação do Supabase
3. Abra uma issue no GitHub

---

Desenvolvido com ❤️ por Teca's Kitchen Team
