# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in Teca's Kitchen, please report it by:
- Opening a GitHub issue (for non-critical issues)
- Emailing admin@tecaskitchen.com (for critical security issues)

We take all security reports seriously and will respond within 48 hours.

## Security Updates

### Version 1.0.1 (Current)
**Date**: 2024-02-06

#### Security Fixes
- **Removed multer dependency** (CVE fixes)
  - Previously: multer@1.4.5-lts.1 (vulnerable to DoS attacks)
  - Action: Removed entirely as it was unused in the codebase
  - Impact: Application uses image URLs instead of direct file uploads
  - No breaking changes

**Vulnerabilities Fixed:**
1. ✅ Multer DoS via unhandled exception from malformed requests
2. ✅ Multer DoS via unhandled exceptions
3. ✅ Multer DoS from maliciously crafted requests
4. ✅ Multer DoS via memory leaks from unclosed streams

## Current Security Measures

### Authentication & Authorization
- ✅ JWT token-based authentication
- ✅ Password hashing with bcrypt (salt rounds: 10)
- ✅ Protected API routes with middleware
- ✅ Token expiration (24 hours)
- ✅ Secure session management

### Input Validation
- ✅ Backend validation with express-validator
- ✅ Frontend form validation
- ✅ SQL injection prevention (Supabase ORM)
- ✅ XSS prevention

### Data Protection
- ✅ Environment variables for sensitive data
- ✅ No hardcoded credentials
- ✅ Passwords never stored in plain text
- ✅ Secure token storage

### API Security
- ✅ CORS configuration
- ✅ Rate limiting (recommended for production)
- ✅ Error handling without exposing internals
- ✅ HTTPS enforcement (recommended for production)

## Dependency Security

### Dependency Monitoring
We regularly monitor dependencies for security vulnerabilities using:
- GitHub Dependabot
- npm audit
- Snyk (recommended)

### Update Policy
- **Critical vulnerabilities**: Updated immediately
- **High severity**: Updated within 7 days
- **Medium/Low severity**: Updated in next release cycle

### Current Dependencies (Backend)
```json
{
  "@supabase/supabase-js": "^2.39.3",
  "bcryptjs": "^2.4.3",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "express": "^4.18.2",
  "express-validator": "^7.0.1",
  "jsonwebtoken": "^9.0.2"
}
```

### Current Dependencies (Frontend)
All dependencies are up-to-date with no known vulnerabilities.

## Security Best Practices for Deployment

### Production Checklist
- [ ] Use HTTPS only
- [ ] Set strong JWT secret (32+ characters)
- [ ] Enable rate limiting
- [ ] Configure CORS for production domain only
- [ ] Use environment variables, never commit secrets
- [ ] Enable Supabase Row Level Security (RLS)
- [ ] Regular database backups
- [ ] Monitor logs for suspicious activity
- [ ] Keep dependencies updated
- [ ] Use strong admin passwords

### Environment Variables
Ensure the following are set securely in production:

**Backend:**
```
JWT_SECRET=<strong-random-string-32+chars>
SUPABASE_URL=<your-supabase-url>
SUPABASE_SERVICE_KEY=<your-service-key>
NODE_ENV=production
```

**Frontend:**
```
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_ANON_KEY=<your-anon-key>
VITE_API_URL=<your-production-api-url>
```

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.1   | ✅ Yes            |
| < 1.0   | ❌ No             |

## Security Contacts

- **General Questions**: GitHub Issues
- **Security Reports**: admin@tecaskitchen.com
- **Response Time**: 48 hours

## Acknowledgments

We appreciate responsible disclosure of security vulnerabilities. Contributors who report valid security issues will be acknowledged in our security updates (unless they prefer to remain anonymous).

---

Last Updated: 2024-02-06
