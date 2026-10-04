# ArchitectureFirst - Database Setup Guide

## Overview

This guide walks you through setting up the MySQL database for ArchitectureFirst from scratch using Prisma ORM.

## Prerequisites

- **MySQL 8.0+** installed and running
- **Node.js 18+** installed
- **npm** or **pnpm** package manager

---

## Step 1: Configure Environment Variables

### 1.1 Copy the template
```bash
# From the project root
cp .env.example .env.local
```

### 1.2 Edit `.env.local` with your MySQL credentials

```env
# Database (MySQL)
# Format: mysql://user:password@host:port/database
DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/architecturefirst_dev"

# Individual DB components
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=YOUR_PASSWORD
DB_NAME=architecturefirst_dev

# JWT Secrets (generate with: openssl rand -base64 32)
JWT_ACCESS_SECRET="your_32_char_minimum_secret_here"
JWT_REFRESH_SECRET="your_32_char_minimum_secret_here"

# Server
PORT=4000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

> ⚠️ **NEVER commit `.env.local`** - it's in `.gitignore`

---

## Step 2: Create the MySQL Database

Connect to MySQL and create the database:

```sql
-- Run this in MySQL Workbench, CLI, or any MySQL client
CREATE DATABASE architecturefirst_dev 
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;

-- Optional: Create a dedicated user (recommended for production)
CREATE USER 'af_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON architecturefirst_dev.* TO 'af_user'@'localhost';
FLUSH PRIVILEGES;
```

Then update your `.env.local` with the new credentials.

---

## Step 3: Install Dependencies

```bash
cd server
npm install
```

---

## Step 4: Generate Prisma Client

```bash
npm run prisma:generate
# or
npx prisma generate --schema=src/prisma/schema.prisma
```

---

## Step 5: Run Migrations

### Option A: Development (creates migration + applies)
```bash
npm run prisma:migrate
# or
npx prisma migrate dev --name init --schema=src/prisma/schema.prisma
```

### Option B: Production (applies existing migrations)
```bash
npm run prisma:migrate:deploy
# or
npx prisma migrate deploy --schema=src/prisma/schema.prisma
```

### Option C: One-command setup (generate + migrate)
```bash
npm run db:setup
```

---

## Step 6: Verify the Setup

### Check tables exist
```bash
# Using MySQL CLI
mysql -u root -p architecturefirst_dev -e "SHOW TABLES;"

# Expected output:
# +--------------------------+
# | Tables_in_architecturefirst_dev |
# +--------------------------+
# | admin_audit              |
# | password_reset_tokens    |
# | project_prerequisites    |
# | projects                 |
# | projects_versions        |
# | refresh_tokens           |
# | user_bookmarks           |
# | user_notes               |
# | user_progress            |
# | users                    |
# +--------------------------+
```

### Check indexes
```sql
SHOW INDEX FROM users;
SHOW INDEX FROM projects;
SHOW INDEX FROM project_prerequisites;
-- Verify indexes on: email, slug, status, difficulty, foreign keys
```

### Verify table structure
```sql
DESCRIBE users;
DESCRIBE projects;
DESCRIBE project_prerequisites;
```

---

## Step 8: Open Prisma Studio (Optional)

Visual database browser:
```bash
npm run prisma:studio
# Opens at http://localhost:5555
```

---

## Troubleshooting

### "Access denied for user 'root'@'localhost'"
- Verify MySQL is running: `sudo systemctl status mysql` (Linux) or `brew services list` (macOS)
- Check credentials in `.env.local`
- Ensure user has permissions: `GRANT ALL ON architecturefirst_dev.* TO 'user'@'localhost';`

### "Can't reach database server at localhost:3306"
- MySQL not running: start the service
- Wrong port: check MySQL config (`my.cnf` / `my.ini`)
- Firewall blocking: allow port 3306

### "P1001: Can't reach database server"
- Verify `DATABASE_URL` format: `mysql://user:pass@host:port/db`
- Special characters in password? URL-encode them: `@` → `%40`, `#` → `%23`

### Migration fails with "Foreign key constraint"
- Ensure MySQL uses InnoDB (default in 8.0+)
- Check: `SHOW ENGINES;`

### Migration fails with "Unique constraint" on existing data
- Run `npm run db:reset` to wipe and re-run migrations
- Or manually truncate tables: `SET FOREIGN_KEY_CHECKS=0; TRUNCATE TABLE ...; SET FOREIGN_KEY_CHECKS=1;`

---

## Database Schema Summary

### Core Tables
| Table | Purpose |
|-------|---------|
| `users` | User accounts with roles |
| `refresh_tokens` | JWT refresh token storage |
| `password_reset_tokens` | Password reset flow |

### Project Tables
| Table | Purpose |
|-------|---------|
| `projects` | Main project content |
| `projects_versions` | Version history |
| `project_prerequisites` | Project dependency graph |

### Engagement Tables
| Table | Purpose |
|-------|---------|
| `user_progress` | Learning progress tracking |
| `user_notes` | Personal notes on projects |
| `user_bookmarks` | Saved projects |

### Admin Tables
| Table | Purpose |
|-------|---------|
| `admin_audit` | Admin action audit trail |

---

## Key Indexes (Auto-created)

- **users**: `email` (unique), `role`
- **projects**: `slug` (unique), `status`, `difficulty`, `createdById`, `publishedAt`
- **refresh_tokens**: `userId`, `expiresAt`
- **password_reset_tokens**: `userId`, `expiresAt`
- **project_prerequisites**: `projectId`, `prerequisiteId`, `type` (+ unique composite)
- **projects_versions**: `projectId`, `createdById` (+ unique composite on projectId+version)
- **user_progress**: `userId`, `projectId`, `completedAt` (+ unique composite)
- **user_notes**: `userId`, `projectId`, `createdAt`
- **user_bookmarks**: `userId`, `projectId` (+ unique composite)
- **admin_audit**: `adminId`, `action`, `entityType+entityId`, `createdAt`

---

## Useful Commands Reference

```bash
# Regenerate client after schema changes
npm run prisma:generate

# Create new migration
npx prisma migrate dev --name migration_name --schema=src/prisma/schema.prisma

# Reset database (dev only!)
npm run db:reset

# Pull schema from existing DB
npx prisma db pull --schema=src/prisma/schema.prisma

# Validate schema
npx prisma validate --schema=src/prisma/schema.prisma

# Format schema
npx prisma format --schema=src/prisma/schema.prisma
```

---

## Security Notes

1. **Never commit `.env.local`** - Contains real credentials
2. **Use strong JWT secrets** - 32+ chars, generated via `openssl rand -base64 32`
3. **Use dedicated DB user** - Not root, with minimal required privileges
4. **Enable SSL** for production MySQL connections
5. **Rotate secrets** periodically

---

## Next Steps

After database setup:
1. Start the server: `npm run dev` (in `/server`)
2. Start the client: `npm run dev` (in `/client`)
3. Visit `http://localhost:5173` to see the app
4. Register a new user account to begin