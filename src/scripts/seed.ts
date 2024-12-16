import { pool } from "@/lib/db";

const seedTable = async () => {
  console.log("Creating DNS table");
  await pool.query(
    `CREATE TABLE IF NOT EXISTS dns (
      id INT PRIMARY KEY AUTO_INCREMENT,
      domain_name VARCHAR(255) NOT NULL UNIQUE,
      ip_address VARCHAR(255) NOT NULL,
      ip_class ENUM('A', 'B', 'C', 'D', 'E') NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`
  );

  console.log("Inserting dummy data");
  await pool.query(
    `INSERT INTO dns (domain_name, ip_address, ip_class) VALUES
    ('example.com', '93.184.216.34', 'A'),
    ('test.com', '93.184.216.35', 'B'),
    ('sample.net', '93.184.216.36', 'C'),
    ('demo.org', '93.184.216.37', 'D'),
    ('example.edu', '93.184.216.38', 'E'),
    ('site1.com', '93.184.216.39', 'A'),
    ('site2.com', '93.184.216.40', 'B'),
    ('site3.net', '93.184.216.41', 'C'),
    ('site4.org', '93.184.216.42', 'D'),
    ('site5.edu', '93.184.216.43', 'E'),
    ('site6.com', '93.184.216.44', 'A'),
    ('site7.com', '93.184.216.45', 'B'),
    ('site8.net', '93.184.216.46', 'C'),
    ('site9.org', '93.184.216.47', 'D'),
    ('site10.edu', '93.184.216.48', 'E'),
    ('site62.com', '93.184.216.44', 'A'),
    ('site72.com', '93.184.216.45', 'B'),
    ('site82.net', '93.184.216.46', 'C'),
    ('site92.org', '93.184.216.47', 'D'),
    ('site102.edu', '93.184.216.48', 'E')`
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