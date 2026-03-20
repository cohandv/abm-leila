const { Pool } = require("pg");

const connectionString =
  process.env.DATABASE_URL || "postgresql://abm:abm@localhost:5432/abm";

const pool = new Pool({ connectionString });

async function waitForDb(maxAttempts = 30, delayMs = 1000) {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const c = await pool.connect();
      c.release();
      return;
    } catch {
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
  throw new Error("No se pudo conectar a PostgreSQL");
}

module.exports = { pool, waitForDb };
