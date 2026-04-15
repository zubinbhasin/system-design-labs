# Connection Pool using a Bounded Blocking Queue

## The Problem

Opening a database connection is expensive — it involves a TCP handshake, authentication, and session setup. If every incoming request opens its own connection and closes it when done, the database gets overwhelmed fast.

A **connection pool** solves this by keeping a fixed set of connections open and reusing them across requests.

---

## The Two Core Ideas

### 1. Connection Pool

Think of it like a library with a limited number of books.

- The library stocks N copies of a book (connections).
- A reader checks one out (acquire), reads it, then returns it (release).
- If all copies are checked out, the next reader waits — they don't go buy a new copy.

This way, the total number of open connections is always capped at N, no matter how many clients are asking.

### 2. Bounded Blocking Queue

This is the data structure that makes the pool work.

- **Bounded** — it has a fixed max size (the pool size).
- **Blocking** — if you try to take from an empty queue, you wait. You don't crash, you don't spin in a loop — you just park until something becomes available.

When a client calls `acquire()` and the pool is empty, their request goes into a waitlist. The moment another client calls `release()`, the returned connection is handed directly to the first person waiting.

---

## How the Code Is Structured

```
BoundedBlockingQueue<T>       — generic queue with async wait/notify
       ↑
ConnectionPool                — holds N connections in the queue
       ↑
index.ts                      — demo: 50 clients sharing a pool of 10
```

### BoundedBlockingQueue

- Internally holds an array of items and two waitlists: one for consumers waiting to dequeue, one for producers waiting to enqueue.
- `dequeue()` returns a `Promise` that resolves immediately if an item exists, or parks the caller until one is enqueued.
- `enqueue()` checks if anyone is already waiting — if so, the item is handed off directly without ever sitting in the array.

### Connection

- Represents the thing being pooled. In a real system this would wrap a `pg.Client` or `mysql2` connection.
- Each instance has a unique `id` (useful for tracing which connection served which request) and a `query()` method that simulates IO latency.
- Note: the class intentionally has no internal guard tracking whether it's in use — that responsibility belongs entirely to the pool, not the connection itself.

### ConnectionPool

- Pre-fills the queue with N connections on startup.
- `acquire()` calls `dequeue()` — waits if pool is empty.
- `release()` calls `enqueue()` — wakes up the next waiter if any.
- `withConnection(fn)` wraps acquire/release in a `try/finally` so connections are always returned, even if the query throws.

---

## What the Logs Tell You

### `pool remaining: 0` after a release

```
[Pool] Connection #1 released  (pool remaining: 0)
[Pool] Connection #1 acquired  (pool remaining: 0)
```

This means the connection was handed directly to a waiting client — it never sat idle in the queue. This is the expected fast path when demand exceeds pool size.

### "Done" appears after the next acquire

```
[Pool] Connection #1 released  (pool remaining: 0)
[Pool] Connection #1 acquired  (pool remaining: 0)   ← next client already has it
  [Client 1] Done → [conn #1] result of: ...         ← original client logs Done
```

This looks like two clients hold the connection at the same time, but they don't. It's JavaScript's microtask scheduling:

1. `withConnection` runs `release()` inside a `finally` block.
2. `release()` calls `enqueue()`, which calls `resolve()` for the waiting client — scheduling **microtask MT1**.
3. `withConnection`'s promise resolves — scheduling **microtask MT2** (Client 1's "Done" log).
4. MT1 runs first (it was queued first): logs "acquired".
5. MT2 runs second: logs "Done".

The actual ownership sequence is strictly:

```
Client 1 holds #1  →  Client 1 releases #1  →  Client 5 holds #1  →  Client 1 prints Done
```

Client 1 is fully done with the connection before "Done" is even printed.

### Pool draining back to full

When clients finish and no one is waiting, the count climbs back:

```
[Pool] Connection #2 released  (pool remaining: 1)
[Pool] Connection #3 released  (pool remaining: 2)
[Pool] Connection #4 released  (pool remaining: 3)  ← all connections back
```

---

## Running It

```bash
npm run start:01
```

The demo fires 50 concurrent clients against a pool of 10. The first 10 get connections immediately. The remaining 40 wait in the queue and are served as connections are returned — no polling, no busy-waiting.
