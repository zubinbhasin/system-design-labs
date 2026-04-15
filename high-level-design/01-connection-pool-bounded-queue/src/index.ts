import { ConnectionPool } from "./ConnectionPool";

const POOL_SIZE = 10;
const CONCURRENT_CLIENTS = 50;

async function simulateClient(pool: ConnectionPool, clientId: number): Promise<void> {
  console.log(`  [Client ${clientId}] Requesting a connection...`);

  const result = await pool.withConnection(async (conn) => {
    return conn.query(`SELECT * FROM orders WHERE client_id = ${clientId}`);
  });

  console.log(`  [Client ${clientId}] Done → ${result}`);
}

async function main() {
  console.log("=== Connection Pool Demo ===");
  console.log(`Pool size: ${POOL_SIZE}, Concurrent clients: ${CONCURRENT_CLIENTS}\n`);

  const pool = new ConnectionPool(POOL_SIZE);

  console.log(`\n--- Launching ${CONCURRENT_CLIENTS} concurrent clients ---\n`);

  // Fire all clients at once — only 10 can hold a connection simultaneously,
  // the remaining 40 will wait in the BoundedBlockingQueue.
  const clients = Array.from({ length: CONCURRENT_CLIENTS }, (_, i) =>
    simulateClient(pool, i + 1)
  );

  await Promise.all(clients);

  console.log("\n--- All clients finished ---");
  console.log(`Available connections: ${pool.availableCount}/${pool.totalCount}`);
}

main().catch(console.error);
