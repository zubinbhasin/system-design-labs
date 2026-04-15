/**
 * BoundedBlockingQueue<T>
 *
 * A fixed-capacity queue that blocks (via Promises) when:
 *  - dequeue() is called on an empty queue  → caller waits until an item is enqueued
 *  - enqueue() is called on a full queue    → caller waits until a slot opens up
 *
 * This is the async equivalent of Java's ArrayBlockingQueue.
 */
export class BoundedBlockingQueue<T> {
  private readonly items: T[] = [];
  private readonly dequeueWaiters: Array<(item: T) => void> = [];
  private readonly enqueueWaiters: Array<{ item: T; resolve: () => void }> = [];

  constructor(private readonly capacity: number) {
    if (capacity <= 0) throw new Error("Capacity must be > 0");
  }

  /**
   * Add an item. If the queue is full, waits until space is available.
   */
  enqueue(item: T): Promise<void> {
    // If a consumer is already waiting, hand off directly — skip the queue entirely
    if (this.dequeueWaiters.length > 0) {
      const resolve = this.dequeueWaiters.shift()!;
      resolve(item);
      return Promise.resolve();
    }

    // Space available → push immediately
    if (this.items.length < this.capacity) {
      this.items.push(item);
      return Promise.resolve();
    }

    // Queue is full → park the producer until a slot opens
    return new Promise<void>((resolve) => {
      this.enqueueWaiters.push({ item, resolve });
    });
  }

  /**
   * Remove and return the next item. If the queue is empty, waits until one arrives.
   */
  dequeue(): Promise<T> {
    // Item available → return immediately
    if (this.items.length > 0) {
      const item = this.items.shift()!;
      this.promoteEnqueueWaiter();
      return Promise.resolve(item);
    }

    // Queue is empty → park the consumer until an item is enqueued
    return new Promise<T>((resolve) => {
      this.dequeueWaiters.push(resolve);
    });
  }

  get size(): number {
    return this.items.length;
  }

  get isFull(): boolean {
    return this.items.length >= this.capacity;
  }

  get isEmpty(): boolean {
    return this.items.length === 0;
  }

  /**
   * After a slot opens up, let the oldest waiting producer in.
   */
  private promoteEnqueueWaiter(): void {
    if (this.enqueueWaiters.length > 0) {
      const { item, resolve } = this.enqueueWaiters.shift()!;
      this.items.push(item);
      resolve();
    }
  }
}
