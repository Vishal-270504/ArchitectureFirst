# ArchitectureFirst - Product Context

## Product Overview
ArchitectureFirst is a learning platform for software architects to master project-based learning. Users follow structured project paths with prerequisites, track progress, and build portfolio pieces.

## Target Audience
- Junior to mid-level developers transitioning to architecture
- Self-taught developers needing structured learning paths
- Tech leads wanting to mentor teams
- Career changers entering software engineering

## Core User Personas

### Primary: Aspiring Architect
- Age 25-35, software developer
- Needs structured path from coder to architect
- Values hands-on projects over theory
- Wants visible progress tracking
- Needs prerequisites guidance

### Secondary: Self-Directed Learner
- Learns at own pace
- Needs YouTube code walkthroughs
- Wants bookmarks and notes
- Values community examples

## Key Features

### Learning Experience
1. **Project Catalog**: 8+ projects from beginner to advanced
   - React Fundamentals
   - TypeScript for React
   - Zustand State Management
   - Node/Express REST APIs
   - Prisma Database Design
   - Authentication & Authorization
   - WebSockets Real-time
   - Turborepo Monorepo

2. **Prerequisite System**: Visual dependency graph showing what to learn first

3. **Progress Tracking**: 
   - Completion percentage
   - Time spent
   - Last position bookmarking
   - Certificates/badges

4. **Resource Integration**:
   - YouTube code walkthroughs
   - GitHub repos
   - Live demos
   - Code walkthrough documentation

### User Engagement
- Personal notes on projects
- Bookmarking
- Progress visualization (timeline)
- Achievement system

### Admin Features
- Project management
- Version control for projects
- Audit logs
- User management

## Technical Requirements
- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express
- **Database**: MySQL with Prisma ORM
- **Auth**: JWT with refresh tokens
- **Security**: bcrypt password hashing, RBAC

## Design Principles
1. **Clarity over decoration** - Learning-focused, not flashy
2. **Progress visible** - Users should always see where they are
3. **Progressive disclosure** - Show basics first, advanced on demand
4. **Accessibility** - WCAG AA compliant
5. **Performance** - Fast loading, optimized images
6. **Mobile-responsive** - Learn on any device

## Brand Personality
Professional, trustworthy, educational, modern but not distracting. Think Linear.me meets Codecademy.

## Success Metrics
- Project completion rate
- Time to first completion
- User retention (30/90 days)
- Note-taking engagement
- Prerequisite compliance

## Constraints
- Must work on slow connections
- Support for screen readers
- No external tracking pixels
- GDPR compliant
- Dark mode support