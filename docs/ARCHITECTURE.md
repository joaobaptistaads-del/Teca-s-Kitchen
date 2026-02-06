# System Architecture - Teca's Kitchen

This document describes the technical architecture of the Teca's Kitchen restaurant management system.

## 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                         │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────┐         ┌──────────────────┐          │
│  │   Public Website │         │   Admin Panel    │          │
│  │                  │         │                  │          │
│  │  - Home          │         │  - Login         │          │
│  │  - Menu          │         │  - Dashboard     │          │
│  │  - About         │         │  - Products      │          │
│  │  - Contact       │         │  - Sales         │          │
│  │                  │         │  - Finance       │          │
│  │  (No Auth)       │         │  - Settings      │          │
│  │                  │         │  (JWT Required)  │          │
│  └────────┬─────────┘         └────────┬─────────┘          │
│           │                            │                     │
│           └────────────┬───────────────┘                     │
│                        │                                     │
│                   React 18 + Vite                            │
│                   Tailwind CSS                               │
│                   React Router                               │
│                        │                                     │
└────────────────────────┼─────────────────────────────────────┘
                         │
                         │ HTTP/HTTPS (Axios)
                         │ JWT Token in Headers
                         │
┌────────────────────────▼─────────────────────────────────────┐
│                      API LAYER (Backend)                      │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              Express.js Server                       │    │
│  │                                                       │    │
│  │  ┌─────────────────────────────────────────────┐    │    │
│  │  │           Middleware Layer                   │    │    │
│  │  │  • CORS                                      │    │    │
│  │  │  • Body Parser                               │    │    │
│  │  │  • Auth Middleware (JWT Verification)        │    │    │
│  │  │  • Validation Middleware                     │    │    │
│  │  │  • Error Handler                             │    │    │
│  │  └─────────────────────────────────────────────┘    │    │
│  │                                                       │    │
│  │  ┌─────────────────────────────────────────────┐    │    │
│  │  │           Routes Layer                       │    │    │
│  │  │  • /api/auth         (Login, Profile)       │    │    │
│  │  │  • /api/products     (CRUD, Categories)     │    │    │
│  │  │  • /api/sales        (History, Stats)       │    │    │
│  │  │  • /api/finance      (Expenses, Summary)    │    │    │
│  │  │  • /api/settings     (Config, Update)       │    │    │
│  │  └─────────────────────────────────────────────┘    │    │
│  │                                                       │    │
│  │  ┌─────────────────────────────────────────────┐    │    │
│  │  │         Controllers Layer                    │    │    │
│  │  │  • authController.js                         │    │    │
│  │  │  • productController.js                      │    │    │
│  │  │  • salesController.js                        │    │    │
│  │  │  • financeController.js                      │    │    │
│  │  │  • settingsController.js                     │    │    │
│  │  └─────────────────────────────────────────────┘    │    │
│  │                                                       │    │
│  └───────────────────────────┬───────────────────────────┘    │
│                              │                               │
└──────────────────────────────┼───────────────────────────────┘
                               │
                               │ Supabase Client SDK
                               │
┌──────────────────────────────▼───────────────────────────────┐
│                    DATABASE LAYER (Supabase)                  │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │            PostgreSQL Database                       │    │
│  │                                                       │    │
│  │  Tables:                                             │    │
│  │  ┌──────────────┐  ┌──────────────┐                │    │
│  │  │   admins     │  │  categories  │                │    │
│  │  │              │  │              │                │    │
│  │  │ • id         │  │ • id         │                │    │
│  │  │ • email      │  │ • name       │                │    │
│  │  │ • password   │  │ • slug       │                │    │
│  │  │ • name       │  │ • order      │                │    │
│  │  └──────────────┘  └──────┬───────┘                │    │
│  │                           │ 1:N                     │    │
│  │  ┌──────────────┐  ┌──────▼───────┐                │    │
│  │  │   settings   │  │   products   │                │    │
│  │  │              │  │              │                │    │
│  │  │ • key        │  │ • id         │                │    │
│  │  │ • value      │  │ • name       │                │    │
│  │  │              │  │ • price      │                │    │
│  │  └──────────────┘  │ • category   │                │    │
│  │                    │ • image      │                │    │
│  │                    └──────┬───────┘                │    │
│  │                           │ N:M                     │    │
│  │  ┌──────────────┐  ┌──────▼───────┐                │    │
│  │  │   expenses   │  │  sale_items  │                │    │
│  │  │              │  │              │                │    │
│  │  │ • amount     │  │ • sale_id    │                │    │
│  │  │ • category   │  │ • product_id │                │    │
│  │  │ • date       │  │ • quantity   │                │    │
│  │  └──────────────┘  │ • price      │                │    │
│  │                    └──────▲───────┘                │    │
│  │                           │ 1:N                     │    │
│  │                    ┌──────┴───────┐                │    │
│  │                    │    sales     │                │    │
│  │                    │              │                │    │
│  │                    │ • id         │                │    │
│  │                    │ • total      │                │    │
│  │                    │ • payment    │                │    │
│  │                    │ • status     │                │    │
│  │                    └──────────────┘                │    │
│  │                                                       │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow

### Public Website (Read-Only)

```
User → React Components → Service Layer → API → Supabase → Response
                                                              ↓
                                                        Display Data
```

Example: Viewing Menu
```
1. User visits /menu
2. MenuSection component mounts
3. Calls productService.getAllProducts()
4. Service makes GET /api/products
5. Backend queries Supabase
6. Returns products with categories
7. Frontend displays with filters
```

### Admin Panel (Authenticated)

```
User → Login → JWT Token → Storage
                              ↓
                         Subsequent Requests
                              ↓
Admin Action → Component → Service (+ Token) → API (Verify) → Supabase
                                                                  ↓
                                                            Update Data
                                                                  ↓
                                                            Return Success
                                                                  ↓
                                                         Refresh UI + Toast
```

Example: Creating Product
```
1. Admin logs in, receives JWT token
2. Navigates to /admin/products
3. Clicks "New Product"
4. Fills form and submits
5. Frontend validates input
6. Calls productService.createProduct(data)
7. Service adds JWT to headers
8. Backend verifies JWT
9. Backend validates input
10. Backend inserts into Supabase
11. Returns new product
12. Frontend shows success toast
13. Frontend refreshes product list
```

## 🔐 Authentication Flow

```
┌──────────────┐
│   Login Page │
└──────┬───────┘
       │
       │ POST /api/auth/login
       │ { email, password }
       ▼
┌──────────────────┐
│  Auth Controller │
└──────┬───────────┘
       │
       │ 1. Query admin by email
       ▼
┌──────────────────┐
│    Supabase DB   │
└──────┬───────────┘
       │
       │ 2. Return admin record
       ▼
┌──────────────────┐
│  bcrypt.compare  │
│  Verify Password │
└──────┬───────────┘
       │
       │ 3. If valid
       ▼
┌──────────────────┐
│  jwt.sign        │
│  Generate Token  │
└──────┬───────────┘
       │
       │ 4. Return token + user
       ▼
┌──────────────────┐
│  localStorage    │
│  Store token     │
└──────┬───────────┘
       │
       │ 5. Redirect to dashboard
       ▼
┌──────────────────┐
│  Protected Route │
│  (AuthContext)   │
└──────────────────┘

Subsequent API Calls:
┌──────────────────┐
│  Any API Request │
└──────┬───────────┘
       │
       │ Headers: { Authorization: Bearer <token> }
       ▼
┌──────────────────┐
│  authMiddleware  │
└──────┬───────────┘
       │
       │ jwt.verify(token)
       ▼
┌──────────────────┐
│  If Valid: Allow │
│  If Not: 401     │
└──────────────────┘
```

## 📦 Component Structure

### Frontend Component Hierarchy

```
App.jsx (Router + AuthProvider + Toast)
│
├─── Public Routes
│    │
│    ├─── Home
│    │    ├─── Header
│    │    ├─── Hero
│    │    ├─── MenuSection
│    │    ├─── ContactSection
│    │    └─── Footer
│    │
│    ├─── Menu
│    │    ├─── Header
│    │    ├─── MenuSection
│    │    └─── Footer
│    │
│    ├─── About
│    │    ├─── Header
│    │    ├─── (Content)
│    │    └─── Footer
│    │
│    └─── Contact
│         ├─── Header
│         ├─── ContactSection
│         └─── Footer
│
└─── Admin Routes (ProtectedRoute)
     │
     ├─── Login
     │
     ├─── Dashboard
     │    ├─── Sidebar
     │    ├─── Navbar
     │    ├─── Card (x4)
     │    └─── Charts
     │
     ├─── Products
     │    ├─── Sidebar
     │    ├─── Navbar
     │    ├─── Table
     │    └─── Modal (CRUD)
     │
     ├─── Sales
     │    ├─── Sidebar
     │    ├─── Navbar
     │    └─── Table
     │
     ├─── Finance
     │    ├─── Sidebar
     │    ├─── Navbar
     │    ├─── Summary Cards
     │    └─── Expenses Table
     │
     └─── Settings
          ├─── Sidebar
          ├─── Navbar
          └─── Forms
```

## 🗄️ Database Relationships

```
admins (1) ──────────────────────────────────────────
                                                      │
categories (1) ─────> products (N)                   │
                           │                         │
                           │ (N:M via sale_items)    │
                           │                         │
sales (1) ──────> sale_items (N) ───────────────────┘
                           │
                           └───> products (N)

expenses (independent)
settings (independent, key-value store)
```

## 🔧 Technology Stack Details

### Frontend
- **React 18.2.0**: Component-based UI
- **Vite 5.0.11**: Fast build tool
- **React Router 6.21.3**: Client-side routing
- **Tailwind CSS 3.4.1**: Utility-first CSS
- **Axios**: HTTP client
- **Recharts 2.10.4**: Charts library
- **React Toastify 10.0.4**: Notifications
- **React Icons 5.0.1**: Icon library
- **date-fns 3.0.6**: Date utilities

### Backend
- **Node.js 18+**: Runtime
- **Express 4.18.2**: Web framework
- **@supabase/supabase-js 2.39.3**: DB client
- **jsonwebtoken 9.0.2**: JWT auth
- **bcryptjs 2.4.3**: Password hashing
- **cors 2.8.5**: CORS middleware
- **express-validator 7.0.1**: Input validation
- **multer 1.4.5**: File uploads

### Database
- **PostgreSQL 15+**: RDBMS
- **Supabase**: BaaS provider

## 📡 API Design Principles

### RESTful Design
- **GET**: Retrieve data
- **POST**: Create new resource
- **PUT**: Update existing resource
- **DELETE**: Remove resource

### Consistent Response Format
```json
{
  "success": boolean,
  "message": "Descriptive message",
  "data": object | array | null
}
```

### Error Handling
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### Authentication
- JWT token in `Authorization: Bearer <token>` header
- Token expires in 24 hours
- Refresh requires new login

## 🛡️ Security Layers

### 1. Password Security
- Passwords hashed with bcrypt
- Salt rounds: 10
- Never stored in plain text

### 2. API Security
- JWT token validation
- Token expiration
- Protected routes
- Input validation
- SQL injection prevention (Supabase ORM)

### 3. Frontend Security
- Protected routes with ProtectedRoute HOC
- Token stored in localStorage
- Automatic logout on invalid token
- CORS configuration

### 4. Environment Security
- Sensitive data in .env files
- .env files in .gitignore
- Separate configs for dev/prod

## 🚀 Deployment Architecture

### Development
```
Frontend (localhost:5173) ──HTTP──> Backend (localhost:3000)
                                          │
                                          │
                                          ▼
                                    Supabase (cloud)
```

### Production
```
Frontend (Vercel/Netlify) ──HTTPS──> Backend (Railway/Heroku)
                                           │
                                           │
                                           ▼
                                     Supabase (cloud)
```

## 📊 Performance Considerations

### Frontend
- Code splitting with React.lazy()
- Image optimization
- Lazy loading for routes
- Debouncing search inputs
- Caching API responses

### Backend
- Database indexes on frequently queried columns
- Connection pooling (Supabase)
- Pagination for large datasets
- Response compression

### Database
- Indexes on foreign keys
- Indexes on frequently filtered columns
- Proper use of SELECT (no SELECT *)
- JOIN optimization

## 🔄 State Management

### Global State (Context API)
- **AuthContext**: User authentication state
  - Current user
  - Login/logout functions
  - Loading state
  - isAuthenticated flag

### Local State (useState)
- Component-specific data
- Form inputs
- UI state (modals, dropdowns)
- Loading indicators

### Server State
- Fetched from API
- Cached in component state
- Refreshed on mutations
- No global state management needed

## 📈 Scalability

### Current Capacity
- Handles hundreds of products
- Thousands of sales records
- Multiple admin users
- Real-time updates

### Future Scaling Options
- Add Redis for caching
- Implement WebSockets for real-time
- Add CDN for static assets
- Database read replicas
- Horizontal scaling of backend

---

*This architecture supports the complete restaurant management system with room for growth and optimization.*
