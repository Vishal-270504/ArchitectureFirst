#!/usr/bin/env bash
# ============================================================
# ArchitectureFirst - Automated Database Setup Script
# ============================================================
# Runs: prisma generate + prisma migrate deploy
# Usage: ./scripts/db-setup.sh
# ============================================================

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log_info() { echo -e "${BLUE}[INFO]${NC} $*"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $*"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $*"; }
log_error() { echo -e "${RED}[ERROR]${NC} $*"; }

# Ensure we're in the server directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SERVER_DIR="$(dirname "$SCRIPT_DIR")"
cd "$SERVER_DIR"

log_info "Starting database setup in $SERVER_DIR"

# Check if .env.local exists
if [[ ! -f ".env.local" ]]; then
    log_warn ".env.local not found. Checking for .env.example..."
    if [[ -f "../.env.example" ]]; then
        log_info "Copying .env.example to .env.local..."
        cp ../.env.example .env.local
        log_warn "Please edit .env.local with your database credentials before continuing!"
        exit 1
    else
        log_error "No .env.example found. Please create .env.local with DATABASE_URL"
        exit 1
    fi
fi

# Load DATABASE_URL from .env.local
if grep -q "^DATABASE_URL=" .env.local; then
    export $(grep "^DATABASE_URL=" .env.local | xargs)
    log_info "Loaded DATABASE_URL from .env.local"
else
    log_error "DATABASE_URL not found in .env.local"
    exit 1
fi

# Step 1: Generate Prisma Client
log_info "Step 1/3: Generating Prisma Client..."
npx prisma generate --schema=src/prisma/schema.prisma
log_success "Prisma Client generated"

# Step 2: Run migrations (deploy mode - applies existing migrations)
log_info "Step 2/3: Running migrations (prisma migrate deploy)..."
npx prisma migrate deploy --schema=src/prisma/schema.prisma
log_success "Migrations applied successfully"

# Step 3: Verify connection
log_info "Step 3/3: Verifying database connection..."
npx ts-node scripts/db-test.ts
log_success "Database connection verified"

log_success "Database setup complete!"
echo ""
log_info "Next steps:"
echo "  - Start server: npm run dev"
echo "  - Open Prisma Studio: npm run prisma:studio"