# ArchitectureFirst – Directory & File Context Guide

This guide provides context for the AI and developers to understand the responsibility of each directory and file in the skeleton.

## /client (Frontend - React + Vite)
- **src/components/ui/**: Low-level reusable UI primitives (buttons, inputs, cards) using shadcn/ui patterns.
- **src/components/layout/**: Structural components like Header, Footer, and AdminLayout wrapper.
- **src/components/project/**: Domain-specific components for project cards, grids, code syntax highlighters, and YouTube embeds.
- **src/components/admin/**: Admin-only forms and tables for content management.
- **src/pages/**: High-level route components. Logic should be minimal here, delegating to hooks/services.
- **src/hooks/**: Custom React hooks for auth state, theme switching, and data fetching (using TanStack Query).
- **src/services/**: API client definitions using Axios. Handles token injection and refresh logic.
- **src/lib/**: Third-party library initializations (e.g., queryClient, tailwind merge utils).

## /server (Backend - Node.js + Express)
- **src/config/**: Environment variable parsing and database client initialization.
- **src/middleware/**: Express middlewares for JWT verification, Zod validation, global error handling, and rate limiting.
- **src/routes/**: Definition of API endpoints grouped by domain.
- **src/controllers/**: Request/Response handling. Extracts data from requests and calls services.
- **src/services/**: Core business logic. Orchestrates database calls and external integrations (like YouTube metadata).
- **src/repositories/**: Data access layer using Prisma. Direct interaction with MySQL.
- **src/validators/**: Zod schemas for incoming request bodies and parameters.
- **src/utils/**: Stateless helper functions for hashing, JWT signing, and URL parsing.
- **src/prisma/**: Database schema definition and migration tracking.

## /shared (Cross-platform)
- **types/**: TypeScript interfaces shared between frontend and backend to ensure end-to-end type safety.
- **schemas/**: Zod schemas used for both frontend form validation and backend request validation.

## /infra
- **docker-compose.yml**: Local development environment setup (MySQL, Redis).
- **.env.example**: Template for environment variables.
