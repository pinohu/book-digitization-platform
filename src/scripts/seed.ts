import fs from 'fs';
import path from 'path';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../db/schema';

// Configuration
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const sql = postgres(connectionString);
const db = drizzle(sql, { schema });

async function seed() {
  const isClean = process.argv.includes('--clean');

  console.log('🚀 Starting seed process...');

  if (isClean) {
    console.log('🧹 Cleaning existing data...');
    // Order matters for foreign key constraints
    await db.delete(schema.transactions);
    await db.delete(schema.books);
    await db.delete(schema.users);
    await db.delete(schema.tenants);
    console.log('✅ Database cleaned.');
  }

  try {
    // 1. Ensure Tenant exists (Required for all subsequent data)
    console.log('🏢 Seeding Tenants...');
    const [tenant] = await db.insert(schema.tenants).values({
      id: 't1a2b3c4-d5e6-4f7a-8b9c-0d1e2f3a4b5c',
      name: 'Criterion Educational Foundation',
      subdomain: 'criterion',
      config: {
        accentColor: '#006400',
        logoUrl: 'https://criterion.example.com/logo.png',
        theme: 'light'
      }
    }).onConflictDoUpdate({
      target: schema.tenants.subdomain,
      set: { name: 'Criterion Educational Foundation' }
    }).returning();

    // 2. Seed Users
    console.log('👥 Seeding Users...');
    const usersData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/seed/users.json'), 'utf-8'));
    for (const user of usersData) {
      await db.insert(schema.users).values(user).onConflictDoUpdate({
        target: schema.users.email,
        set: user
      });
    }
    console.log(`✅ Seeded ${usersData.length} users.`);

    // 3. Seed Books (Content)
    console.log('📚 Seeding Books...');
    const booksData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/seed/content.json'), 'utf-8'));
    for (const book of booksData) {
      await db.insert(schema.books).values(book).onConflictDoUpdate({
        target: schema.books.id,
        set: book
      });
    }
    console.log(`✅ Seeded ${booksData.length} books.`);

    // 4. Seed Transactions
    console.log('💰 Seeding Transactions...');
    const transactionsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/seed/transactions.json'), 'utf-8'));
    for (const tx of transactionsData) {
      await db.insert(schema.transactions).values(tx).onConflictDoUpdate({
        target: schema.transactions.id,
        set: tx
      });
    }
    console.log(`✅ Seeded ${transactionsData.length} transactions.`);

    console.log('✨ Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

seed();