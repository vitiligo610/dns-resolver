import { pool } from "@/lib/db";

const seedTable = async () => {
  console.log("Creating DNS table");
  await pool.query(
    `CREATE TABLE IF NOT EXISTS dns (
      id INT PRIMARY KEY AUTO_INCREMENT,
      domain VARCHAR(255) NOT NULL UNIQUE,
      ip_address VARCHAR(255) NOT NULL,
      ip_class ENUM('A', 'B', 'C', 'D', 'E') NOT NULL
    )`
  );
}

const main = async () => {
  console.log('🌱 Starting database seed...');

  try {
    console.log('Dropping existing tables...');
    await pool.query('DROP TABLE IF EXISTS dns');

    await seedTable();

    console.log('✅ Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

main();