# Changelog

All notable changes to Teca's Kitchen will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2024-02-06

### Security
- **CRITICAL**: Removed multer dependency (was unused in codebase)
  - Fixed 4 Denial of Service vulnerabilities in multer@1.4.5-lts.1
  - Application uses image URLs instead of direct file uploads via Supabase Storage
  - No breaking changes or functionality affected

### Documentation
- Added SECURITY.md with security policy and reporting guidelines
- Added CHANGELOG.md to track all changes
- Updated ARCHITECTURE.md to remove multer references

## [1.0.0] - 2024-02-06

### Added
- Initial release of Teca's Kitchen Restaurant Management System
- Complete full-stack application (Frontend + Backend + Database)
- Public website with menu, about, and contact pages
- Admin panel with authentication
- Dashboard with real-time metrics and charts
- Product management (CRUD)
- Sales tracking and history
- Financial management (expenses and revenue)
- Settings configuration
- JWT authentication with bcrypt password hashing
- PostgreSQL database via Supabase
- Responsive design for all devices
- Comprehensive documentation (61,000+ characters)

### Backend Features
- RESTful API with 20+ endpoints
- Express.js server
- JWT token authentication
- Input validation with express-validator
- Error handling middleware
- Supabase integration
- Environment variable configuration

### Frontend Features
- React 18 with Vite
- React Router for navigation
- Tailwind CSS for styling
- Protected routes for admin pages
- Context API for state management
- Toast notifications
- Charts with Recharts
- Responsive design

### Database
- 7 tables with proper relationships
- Indexes for performance
- Seed data with examples
- Complete schema documentation

### Documentation
- README.md - Project overview
- INSTALLATION.md - Setup guide (6,300 chars)
- API.md - Complete API reference (10,000+ chars)
- DATABASE.md - Database structure (10,900+ chars)
- QUICKSTART.md - Quick reference (5,900 chars)
- ARCHITECTURE.md - System architecture (15,000+ chars)
- PROJECT_SUMMARY.md - Executive summary (13,000+ chars)

---

## Version History

- **1.0.1** - Security fix release (removed vulnerable multer dependency)
- **1.0.0** - Initial release with complete feature set
