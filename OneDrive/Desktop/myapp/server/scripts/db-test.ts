#!/usr/bin/env ts-node
// ============================================================
// ArchitectureFirst - Database Connection Test
// ============================================================
// Verifies database connection and lists all tables
// Usage: npx ts-node scripts/db-test.ts
// ============================================================

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['error', 'warn'],
});

async function main() {
  console.log('🔍 Testing database connection...\n');

  try {
    // Test 1: Basic connection
    await prisma.$connect();
    console.log('✅ Connected to database');

    // Test 2: Run a simple query
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ Query execution works:', result);

    // Test 3: List all tables
    console.log('\n📋 Tables in database:');
    const tables = await prisma.$queryRaw<Array<{ Tables_in_architecturefirst_dev: string }>>`
      SHOW TABLES
    `;

    if (tables.length === 0) {
      console.log('  (no tables found - run migrations first)');
    } else {
      tables.forEach((t, i) => {
        const tableName = Object.values(t)[0];
        console.log(`  ${i + 1}. ${tableName}`);
      });
      console.log(`\n  Total: ${tables.length} tables`);
    }

    // Test 4: Verify key tables exist
    console.log('\n📊 Key table structures:');
    const keyTables = ['users', 'projects', 'project_prerequisites', 'projects_versions', 'refresh_tokens', 'password_reset_tokens', 'user_progress', 'user_notes', 'user_bookmarks', 'admin_audit'];
    
    for (const table of keyTables) {
      const exists = tables.some(t => Object.values(t)[0] === table);
      if (exists) {
        console.log(`  ✅ ${table}: exists`);
      } else {
        console.log(`  ❌ ${table}: missing`);
      }
    }

    // Test 5: Show row count using information_schema
    console.log('\n📈 Table row counts:');
    const rowCounts = await prisma.$queryRaw<Array<{ TABLE_NAME: string; TABLE_ROWS: number | null }>>`
      SELECT TABLE_NAME, TABLE_ROWS 
      FROM information_schema.TABLES 
      WHERE TABLE_SCHEMA = DATABASE() 
        AND TABLE_NAME IN ('users', 'projects', 'project_prerequisites', 'projects_versions', 'refresh_tokens', 'password_reset_tokens', 'user_progress', 'user_notes', 'user_bookmarks', 'admin_audit')
      ORDER BY TABLE_NAME
    `;
    
    rowCounts.forEach(row => {
      console.log(`  ${row.TABLE_NAME}: ${row.TABLE_ROWS || 0} rows`);
    });

    console.log('\n✅ All connection tests passed!');

  } catch (error) {
    console.error('\n❌ Connection test failed:');
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();