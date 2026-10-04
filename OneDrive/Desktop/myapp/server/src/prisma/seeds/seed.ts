import { PrismaClient, DifficultyLevel, ProjectStatus, PrerequisiteType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data (in development only)
  if (process.env.NODE_ENV !== 'production') {
    console.log('🧹 Cleaning existing data...');
    await prisma.userBookmark.deleteMany();
    await prisma.userNote.deleteMany();
    await prisma.userProgress.deleteMany();
    await prisma.projectPrerequisite.deleteMany();
    await prisma.projectVersion.deleteMany();
    await prisma.project.deleteMany();
    await prisma.passwordResetToken.deleteMany();
    await prisma.refreshToken.deleteMany();
    await prisma.adminAudit.deleteMany();
    await prisma.user.deleteMany();
  }

  // ============================================================
  // CREATE ADMIN USER
  // ============================================================
  const admin = await prisma.user.create({
    data: {
      email: 'admin@architecturefirst.dev',
      passwordHash: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.PZvO.S', // password: admin123
      name: 'Admin User',
      role: 'ADMIN',
      emailVerified: true,
      emailVerifiedAt: new Date(),
    },
  });
  console.log('✅ Created admin user:', admin.email);

  // ============================================================
  // CREATE SAMPLE PROJECTS (6-8 projects)
  // ============================================================
  const projects = await Promise.all([
    // 1. React Fundamentals - Beginner
    prisma.project.create({
      data: {
        slug: 'react-fundamentals',
        title: 'React Fundamentals: Components, Props & State',
        description: `Master the building blocks of React applications. This comprehensive guide covers functional components, props drilling, useState, useEffect hooks, and best practices for component composition. You'll build a real-world task manager application from scratch.`,
        shortDescription: 'Learn React basics by building a task manager app',
        thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
        youtubeUrl: 'https://www.youtube.com/watch?v=Ke90Tje7VS0',
        codeWalkthroughUrl: 'https://github.com/architecturefirst/react-fundamentals-walkthrough',
        githubUrl: 'https://github.com/architecturefirst/react-fundamentals',
        liveDemoUrl: 'https://react-fundamentals.architecturefirst.dev',
        status: 'PUBLISHED',
        difficulty: 'BEGINNER',
        estimatedHours: 4,
        version: 1,
        publishedAt: new Date('2024-01-15'),
        createdById: admin.id,
      },
    }),

    // 2. TypeScript for React Developers - Beginner
    prisma.project.create({
      data: {
        slug: 'typescript-react',
        title: 'TypeScript for React Developers',
        description: `Level up your React skills with TypeScript. Learn type annotations, interfaces, generics, and advanced patterns like discriminated unions and conditional types. Includes practical examples for typing hooks, context, and component props.`,
        shortDescription: 'Add type safety to your React applications',
        thumbnailUrl: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800',
        youtubeUrl: 'https://www.youtube.com/watch?v=zQnBQ4tB3ZA',
        codeWalkthroughUrl: 'https://github.com/architecturefirst/typescript-react-walkthrough',
        githubUrl: 'https://github.com/architecturefirst/typescript-react',
        liveDemoUrl: 'https://typescript-react.architecturefirst.dev',
        status: 'PUBLISHED',
        difficulty: 'BEGINNER',
        estimatedHours: 3,
        version: 1,
        publishedAt: new Date('2024-02-01'),
        createdById: admin.id,
      },
    }),

    // 3. State Management with Zustand - Intermediate
    prisma.project.create({
      data: {
        slug: 'zustand-state-management',
        title: 'State Management with Zustand',
        description: `Move beyond useState and Context API. Learn Zustand - a minimal, fast, and scalable state management solution. Build a complex e-commerce cart with persistence, middleware, and TypeScript support. Compare with Redux and Jotai.`,
        shortDescription: 'Simple, scalable state management for React',
        thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
        youtubeUrl: 'https://www.youtube.com/watch?v=3LZmDdGDG1c',
        codeWalkthroughUrl: 'https://github.com/architecturefirst/zustand-walkthrough',
        githubUrl: 'https://github.com/architecturefirst/zustand-demo',
        liveDemoUrl: 'https://zustand-demo.architecturefirst.dev',
        status: 'PUBLISHED',
        difficulty: 'INTERMEDIATE',
        estimatedHours: 2,
        version: 1,
        publishedAt: new Date('2024-02-20'),
        createdById: admin.id,
      },
    }),

    // 4. Building REST APIs with Node.js & Express - Intermediate
    prisma.project.create({
      data: {
        slug: 'node-express-rest-api',
        title: 'Building REST APIs with Node.js & Express',
        description: `Create production-ready REST APIs from scratch. Covers routing, middleware, validation (Zod), error handling, authentication (JWT), rate limiting, testing with Vitest, and API documentation with OpenAPI/Swagger. Deploy to Railway/Render.`,
        shortDescription: 'Production-grade REST API development',
        thumbnailUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800',
        youtubeUrl: 'https://www.youtube.com/watch?v=pKd0Rpw7O48',
        codeWalkthroughUrl: 'https://github.com/architecturefirst/node-express-api-walkthrough',
        githubUrl: 'https://github.com/architecturefirst/node-express-api',
        liveDemoUrl: 'https://api.architecturefirst.dev/docs',
        status: 'PUBLISHED',
        difficulty: 'INTERMEDIATE',
        estimatedHours: 6,
        version: 1,
        publishedAt: new Date('2024-03-10'),
        createdById: admin.id,
      },
    }),

    // 5. Database Design with Prisma & PostgreSQL - Intermediate
    prisma.project.create({
      data: {
        slug: 'prisma-database-design',
        title: 'Database Design with Prisma & PostgreSQL',
        description: `Master modern database workflows with Prisma ORM. Learn schema modeling, migrations, relations (1:1, 1:N, M:N), transactions, query optimization, and seeding. Build a complete blog platform with users, posts, comments, tags, and likes.`,
        shortDescription: 'Type-safe database access with Prisma ORM',
        thumbnailUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800',
        youtubeUrl: 'https://www.youtube.com/watch?v=ckZsA8a3GZ4',
        codeWalkthroughUrl: 'https://github.com/architecturefirst/prisma-walkthrough',
        githubUrl: 'https://github.com/architecturefirst/prisma-blog',
        liveDemoUrl: 'https://prisma-blog.architecturefirst.dev',
        status: 'PUBLISHED',
        difficulty: 'INTERMEDIATE',
        estimatedHours: 5,
        version: 1,
        publishedAt: new Date('2024-03-25'),
        createdById: admin.id,
      },
    }),

    // 6. Authentication & Authorization - Advanced
    prisma.project.create({
      data: {
        slug: 'auth-authorization',
        title: 'Authentication & Authorization Deep Dive',
        description: `Implement secure auth from scratch. JWT access/refresh tokens, HTTP-only cookies, password reset flows, email verification, OAuth2 (Google/GitHub), RBAC with permissions, session management, and security best practices (CSRF, XSS, timing attacks).`,
        shortDescription: 'Enterprise-grade authentication systems',
        thumbnailUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800',
        youtubeUrl: 'https://www.youtube.com/watch?v=7Q17ubqLfaM',
        codeWalkthroughUrl: 'https://github.com/architecturefirst/auth-walkthrough',
        githubUrl: 'https://github.com/architecturefirst/auth-system',
        liveDemoUrl: 'https://auth-demo.architecturefirst.dev',
        status: 'PUBLISHED',
        difficulty: 'ADVANCED',
        estimatedHours: 8,
        version: 1,
        publishedAt: new Date('2024-04-15'),
        createdById: admin.id,
      },
    }),

    // 7. Real-time Apps with WebSockets & Socket.io - Advanced
    prisma.project.create({
      data: {
        slug: 'websockets-realtime',
        title: 'Real-time Applications with WebSockets & Socket.io',
        description: `Build real-time features: chat, notifications, collaborative editing, presence indicators. Learn WebSocket protocol, Socket.io architecture, rooms/namespaces, scaling with Redis adapter, connection recovery, and TypeScript integration.`,
        shortDescription: 'Real-time communication for modern apps',
        thumbnailUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
        youtubeUrl: 'https://www.youtube.com/watch?v=1BfCnjr_Vjg',
        codeWalkthroughUrl: 'https://github.com/architecturefirst/websockets-walkthrough',
        githubUrl: 'https://github.com/architecturefirst/realtime-chat',
        liveDemoUrl: 'https://chat.architecturefirst.dev',
        status: 'PUBLISHED',
        difficulty: 'ADVANCED',
        estimatedHours: 6,
        version: 1,
        publishedAt: new Date('2024-05-01'),
        createdById: admin.id,
      },
    }),

    // 8. Full-Stack Architecture: Monorepo with Turborepo - Advanced
    prisma.project.create({
      data: {
        slug: 'fullstack-monorepo-turborepo',
        title: 'Full-Stack Architecture: Monorepo with Turborepo',
        description: `Architect scalable full-stack applications using Turborepo. Shared packages (UI, config, types), Next.js frontend, Express backend, Prisma database, Storybook, E2E testing with Playwright, CI/CD with GitHub Actions, and deployment to Vercel + Railway.`,
        shortDescription: 'Professional monorepo architecture',
        thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
        youtubeUrl: 'https://www.youtube.com/watch?v=sw6B1d7Sf9Y',
        codeWalkthroughUrl: 'https://github.com/architecturefirst/turborepo-walkthrough',
        githubUrl: 'https://github.com/architecturefirst/fullstack-monorepo',
        liveDemoUrl: 'https://architecturefirst.dev',
        status: 'PUBLISHED',
        difficulty: 'ADVANCED',
        estimatedHours: 10,
        version: 1,
        publishedAt: new Date('2024-05-20'),
        createdById: admin.id,
      },
    }),
  ]);

  console.log(`✅ Created ${projects.length} projects`);

  // ============================================================
  // CREATE PROJECT PREREQUISITES
  // ============================================================
  const projectMap = Object.fromEntries(projects.map(p => [p.slug, p.id]));

  const prerequisites = [
    // React Fundamentals -> no prerequisites (entry level)
    
    // TypeScript for React -> requires React Fundamentals
    {
      projectId: projectMap['typescript-react'],
      prerequisiteId: projectMap['react-fundamentals'],
      type: 'PROJECT' as PrerequisiteType,
      name: 'React Fundamentals',
      description: 'Understanding of React components, props, and hooks',
      isRequired: true,
      order: 1,
    },

    // Zustand -> requires React Fundamentals + TypeScript
    {
      projectId: projectMap['zustand-state-management'],
      prerequisiteId: projectMap['react-fundamentals'],
      type: 'PROJECT' as PrerequisiteType,
      name: 'React Fundamentals',
      description: 'Core React concepts including hooks',
      isRequired: true,
      order: 1,
    },
    {
      projectId: projectMap['zustand-state-management'],
      prerequisiteId: projectMap['typescript-react'],
      type: 'PROJECT' as PrerequisiteType,
      name: 'TypeScript for React',
      description: 'TypeScript basics for typing state',
      isRequired: false,
      order: 2,
    },

    // Node/Express REST API -> requires TypeScript basics
    {
      projectId: projectMap['node-express-rest-api'],
      prerequisiteId: projectMap['typescript-react'],
      type: 'PROJECT' as PrerequisiteType,
      name: 'TypeScript for React',
      description: 'TypeScript fundamentals for backend development',
      isRequired: true,
      order: 1,
    },

    // Prisma Database -> requires Node/Express REST API
    {
      projectId: projectMap['prisma-database-design'],
      prerequisiteId: projectMap['node-express-rest-api'],
      type: 'PROJECT' as PrerequisiteType,
      name: 'Building REST APIs with Node.js & Express',
      description: 'Backend API structure and middleware patterns',
      isRequired: true,
      order: 1,
    },

    // Auth -> requires Node/Express + Prisma
    {
      projectId: projectMap['auth-authorization'],
      prerequisiteId: projectMap['node-express-rest-api'],
      type: 'PROJECT' as PrerequisiteType,
      name: 'Building REST APIs with Node.js & Express',
      description: 'API structure, middleware, and validation',
      isRequired: true,
      order: 1,
    },
    {
      projectId: projectMap['auth-authorization'],
      prerequisiteId: projectMap['prisma-database-design'],
      type: 'PROJECT' as PrerequisiteType,
      name: 'Database Design with Prisma',
      description: 'User models, relations, and transactions',
      isRequired: true,
      order: 2,
    },

    // WebSockets -> requires Node/Express + Auth
    {
      projectId: projectMap['websockets-realtime'],
      prerequisiteId: projectMap['node-express-rest-api'],
      type: 'PROJECT' as PrerequisiteType,
      name: 'Building REST APIs with Node.js & Express',
      description: 'Server setup and middleware',
      isRequired: true,
      order: 1,
    },
    {
      projectId: projectMap['websockets-realtime'],
      prerequisiteId: projectMap['auth-authorization'],
      type: 'PROJECT' as PrerequisiteType,
      name: 'Authentication & Authorization',
      description: 'Protecting WebSocket connections with JWT',
      isRequired: true,
      order: 2,
    },

    // Turborepo Monorepo -> requires multiple advanced topics
    {
      projectId: projectMap['fullstack-monorepo-turborepo'],
      prerequisiteId: projectMap['node-express-rest-api'],
      type: 'PROJECT' as PrerequisiteType,
      name: 'Building REST APIs with Node.js & Express',
      description: 'Backend architecture patterns',
      isRequired: true,
      order: 1,
    },
    {
      projectId: projectMap['fullstack-monorepo-turborepo'],
      prerequisiteId: projectMap['prisma-database-design'],
      type: 'PROJECT' as PrerequisiteType,
      name: 'Database Design with Prisma',
      description: 'Shared database package',
      isRequired: true,
      order: 2,
    },
    {
      projectId: projectMap['fullstack-monorepo-turborepo'],
      prerequisiteId: projectMap['auth-authorization'],
      type: 'PROJECT' as PrerequisiteType,
      name: 'Authentication & Authorization',
      description: 'Shared auth package across apps',
      isRequired: true,
      order: 3,
    },
    {
      projectId: projectMap['fullstack-monorepo-turborepo'],
      prerequisiteId: projectMap['websockets-realtime'],
      type: 'PROJECT' as PrerequisiteType,
      name: 'Real-time Applications with WebSockets',
      description: 'Real-time features in monorepo',
      isRequired: false,
      order: 4,
    },
  ];

  await prisma.projectPrerequisite.createMany({ data: prerequisites });
  console.log(`✅ Created ${prerequisites.length} prerequisites`);

  // ============================================================
  // CREATE PROJECT VERSIONS (version history)
  // ============================================================
  const versions = [];
  for (const project of projects) {
    versions.push({
      projectId: project.id,
      version: 1,
      title: project.title,
      description: project.description,
      content: `# ${project.title}\n\n${project.description}\n\n## Overview\nThis is the initial version of the project.\n\n## Learning Objectives\n- Objective 1\n- Objective 2\n- Objective 3\n\n## Prerequisites\nSee project prerequisites section.\n\n## Getting Started\n\`\`\`bash\nnpm install\nnpm run dev\n\`\`\``,
      changelog: 'Initial release',
      createdById: admin.id,
    });
  }

  await prisma.projectVersion.createMany({ data: versions });
  console.log(`✅ Created ${versions.length} project versions`);

  // ============================================================
  // CREATE SAMPLE REGULAR USERS
  // ============================================================
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'alice@example.com',
        passwordHash: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.PZvO.S', // password: password123
        name: 'Alice Developer',
        emailVerified: true,
        emailVerifiedAt: new Date(),
      },
    }),
    prisma.user.create({
      data: {
        email: 'bob@example.com',
        passwordHash: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.PZvO.S',
        name: 'Bob Builder',
        emailVerified: true,
        emailVerifiedAt: new Date(),
      },
    }),
    prisma.user.create({
      data: {
        email: 'carol@example.com',
        passwordHash: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.PZvO.S',
        name: 'Carol Coder',
        emailVerified: false,
      },
    }),
  ]);
  console.log(`✅ Created ${users.length} sample users`);

  // ============================================================
  // CREATE SAMPLE USER PROGRESS
  // ============================================================
  const progressData = [
    // Alice completed React Fundamentals, in progress on TypeScript
    { userId: users[0].id, projectId: projectMap['react-fundamentals'], completedAt: new Date('2024-02-01'), progressPercent: 100, timeSpentMinutes: 240 },
    { userId: users[0].id, projectId: projectMap['typescript-react'], completedAt: null, progressPercent: 65, timeSpentMinutes: 120 },
    { userId: users[0].id, projectId: projectMap['zustand-state-management'], completedAt: null, progressPercent: 10, timeSpentMinutes: 15 },
    
    // Bob completed React + TypeScript, in progress on Node/Express
    { userId: users[1].id, projectId: projectMap['react-fundamentals'], completedAt: new Date('2024-01-20'), progressPercent: 100, timeSpentMinutes: 200 },
    { userId: users[1].id, projectId: projectMap['typescript-react'], completedAt: new Date('2024-02-15'), progressPercent: 100, timeSpentMinutes: 180 },
    { userId: users[1].id, projectId: projectMap['node-express-rest-api'], completedAt: null, progressPercent: 40, timeSpentMinutes: 150 },
    
    // Carol just started
    { userId: users[2].id, projectId: projectMap['react-fundamentals'], completedAt: null, progressPercent: 25, timeSpentMinutes: 60 },
  ];

  await prisma.userProgress.createMany({ data: progressData });
  console.log(`✅ Created ${progressData.length} progress records`);

  // ============================================================
  // CREATE SAMPLE USER NOTES
  // ============================================================
  const notes = [
    { userId: users[0].id, projectId: projectMap['react-fundamentals'], content: 'useEffect cleanup function is crucial for preventing memory leaks!', position: 'section:hooks' },
    { userId: users[0].id, projectId: projectMap['typescript-react'], content: 'Generics with React components: <T extends { id: string }>() => Component<T>', position: 'section:generics' },
    { userId: users[1].id, projectId: projectMap['node-express-rest-api'], content: 'Zod schema validation middleware pattern is very clean', position: 'section:validation' },
  ];

  await prisma.userNote.createMany({ data: notes });
  console.log(`✅ Created ${notes.length} user notes`);

  // ============================================================
  // CREATE SAMPLE USER BOOKMARKS
  // ============================================================
  const bookmarks = [
    { userId: users[0].id, projectId: projectMap['react-fundamentals'] },
    { userId: users[0].id, projectId: projectMap['zustand-state-management'] },
    { userId: users[1].id, projectId: projectMap['node-express-rest-api'] },
    { userId: users[1].id, projectId: projectMap['prisma-database-design'] },
    { userId: users[2].id, projectId: projectMap['react-fundamentals'] },
  ];

  await prisma.userBookmark.createMany({ data: bookmarks });
  console.log(`✅ Created ${bookmarks.length} bookmarks`);

  // ============================================================
  // CREATE ADMIN AUDIT LOGS
  // ============================================================
  const audits = [
    { adminId: admin.id, action: 'CREATE' as AuditAction, entityType: 'Project', entityId: projectMap['react-fundamentals'], newData: JSON.stringify({ title: 'React Fundamentals' }), ipAddress: '127.0.0.1' },
    { adminId: admin.id, action: 'CREATE' as AuditAction, entityType: 'Project', entityId: projectMap['typescript-react'], newData: JSON.stringify({ title: 'TypeScript for React' }), ipAddress: '127.0.0.1' },
    { adminId: admin.id, action: 'PROJECT_PUBLISH' as AuditAction, entityType: 'Project', entityId: projectMap['react-fundamentals'], oldData: JSON.stringify({ status: 'DRAFT' }), newData: JSON.stringify({ status: 'PUBLISHED' }), ipAddress: '127.0.0.1' },
  ];

  await prisma.adminAudit.createMany({ data: audits });
  console.log(`✅ Created ${audits.length} audit logs`);

  console.log('🎉 Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });