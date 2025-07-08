export const eventSourcing = {
  id: 'event-sourcing',
  title: 'Event Sourcing',
  content: `
<p>Event Sourcing is an architectural pattern where application state is stored as a sequence of events rather than storing just the current state. Each state change is captured as an immutable event.</p>

    <h3>Core Concepts</h3>
    
    <h4>Events</h4>
    <ul>
      <li><strong>Immutable:</strong> Events cannot be changed once written</li>
      <li><strong>Append-Only:</strong> New events are added to the end of the stream</li>
      <li><strong>Time-Ordered:</strong> Events maintain chronological sequence</li>
      <li><strong>Domain Events:</strong> Represent meaningful business occurrences</li>
    </ul>

    <h4>Event Store</h4>
    <ul>
      <li>Persistent storage for event streams</li>
      <li>Optimized for append operations</li>
      <li>Supports querying by aggregate ID</li>
      <li>May provide additional features like snapshots</li>
    </ul>

    <h3>Implementation Example</h3>

    <div class="code-block">
      <span class="code-label">CODE</span>
      <pre><code>// Event definitions
class Event {
  constructor(aggregateId, eventType, data, version, timestamp = new Date()) {
    this.aggregateId = aggregateId;
    this.eventType = eventType;
    this.data = data;
    this.version = version;
    this.timestamp = timestamp;
    this.id = this.generateId();
  }

  generateId() {
    return \`\${this.aggregateId}-\${this.version}-\${Date.now()}\`;
  }
}

// Domain events for a bank account
class AccountCreated extends Event {
  constructor(accountId, ownerId, initialBalance, version) {
    super(accountId, 'AccountCreated', {
      ownerId,
      initialBalance
    }, version);
  }
}

class MoneyDeposited extends Event {
  constructor(accountId, amount, version) {
    super(accountId, 'MoneyDeposited', {
      amount
    }, version);
  }
}

class MoneyWithdrawn extends Event {
  constructor(accountId, amount, version) {
    super(accountId, 'MoneyWithdrawn', {
      amount
    }, version);
  }
}

// Aggregate using event sourcing
class BankAccount {
  constructor(accountId) {
    this.accountId = accountId;
    this.ownerId = null;
    this.balance = 0;
    this.version = 0;
    this.uncommittedEvents = [];
  }

  // Factory method to create new account
  static create(accountId, ownerId, initialBalance) {
    const account = new BankAccount(accountId);
    const event = new AccountCreated(accountId, ownerId, initialBalance, 1);
    account.applyEvent(event);
    account.uncommittedEvents.push(event);
    return account;
  }

  // Commands (business operations)
  deposit(amount) {
    if (amount <= 0) {
      throw new Error('Deposit amount must be positive');
    }

    const event = new MoneyDeposited(this.accountId, amount, this.version + 1);
    this.applyEvent(event);
    this.uncommittedEvents.push(event);
  }

  withdraw(amount) {
    if (amount <= 0) {
      throw new Error('Withdrawal amount must be positive');
    }
    
    if (this.balance < amount) {
      throw new Error('Insufficient funds');
    }

    const event = new MoneyWithdrawn(this.accountId, amount, this.version + 1);
    this.applyEvent(event);
    this.uncommittedEvents.push(event);
  }

  // Apply events to rebuild state
  applyEvent(event) {
    switch (event.eventType) {
      case 'AccountCreated':
        this.ownerId = event.data.ownerId;
        this.balance = event.data.initialBalance;
        break;
      case 'MoneyDeposited':
        this.balance += event.data.amount;
        break;
      case 'MoneyWithdrawn':
        this.balance -= event.data.amount;
        break;
      default:
        throw new Error(\`Unknown event type: \${event.eventType}\`);
    }
    this.version = event.version;
  }

  // Rebuild aggregate from event history
  static fromHistory(accountId, events) {
    const account = new BankAccount(accountId);
    events.forEach(event => account.applyEvent(event));
    return account;
  }

  getUncommittedEvents() {
    return [...this.uncommittedEvents];
  }

  markEventsAsCommitted() {
    this.uncommittedEvents = [];
  }
}</code></pre>
    </div>

    <h3>Event Store Implementation</h3>

    <div class="code-block">
      <span class="code-label">CODE</span>
      <pre><code>// Simple in-memory event store
class EventStore {
  constructor() {
    this.events = new Map(); // aggregateId -> events[]
    this.globalEvents = []; // All events in order
  }

  async saveEvents(aggregateId, events, expectedVersion) {
    const existingEvents = this.events.get(aggregateId) || [];
    
    // Optimistic concurrency check
    if (existingEvents.length !== expectedVersion) {
      throw new Error(\`Concurrency conflict. Expected version \${expectedVersion}, but was \${existingEvents.length}\`);
    }

    // Append new events
    const updatedEvents = [...existingEvents, ...events];
    this.events.set(aggregateId, updatedEvents);
    
    // Add to global stream
    this.globalEvents.push(...events);
    
    console.log(\`Saved \${events.length} events for aggregate \${aggregateId}\`);
  }

  async getEvents(aggregateId, fromVersion = 0) {
    const events = this.events.get(aggregateId) || [];
    return events.filter(event => event.version > fromVersion);
  }

  async getAllEvents(fromTimestamp = null) {
    if (fromTimestamp) {
      return this.globalEvents.filter(event => event.timestamp >= fromTimestamp);
    }
    return [...this.globalEvents];
  }

  async getEventsByType(eventType) {
    return this.globalEvents.filter(event => event.eventType === eventType);
  }
}

// Repository pattern for aggregates
class BankAccountRepository {
  constructor(eventStore) {
    this.eventStore = eventStore;
  }

  async save(account) {
    const uncommittedEvents = account.getUncommittedEvents();
    if (uncommittedEvents.length === 0) {
      return;
    }

    const expectedVersion = account.version - uncommittedEvents.length;
    await this.eventStore.saveEvents(
      account.accountId, 
      uncommittedEvents, 
      expectedVersion
    );
    
    account.markEventsAsCommitted();
  }

  async getById(accountId) {
    const events = await this.eventStore.getEvents(accountId);
    if (events.length === 0) {
      return null;
    }
    
    return BankAccount.fromHistory(accountId, events);
  }
}</code></pre>
    </div>

    <h3>Projections and Read Models</h3>

    <div class="code-block">
      <span class="code-label">CODE</span>
      <pre><code>// Read model for account summary
class AccountSummaryProjection {
  constructor(eventStore) {
    this.eventStore = eventStore;
    this.summaries = new Map();
    this.lastProcessedTimestamp = null;
  }

  async buildProjection() {
    const events = await this.eventStore.getAllEvents(this.lastProcessedTimestamp);
    
    for (const event of events) {
      await this.handleEvent(event);
      this.lastProcessedTimestamp = event.timestamp;
    }
  }

  async handleEvent(event) {
    switch (event.eventType) {
      case 'AccountCreated':
        this.summaries.set(event.aggregateId, {
          accountId: event.aggregateId,
          ownerId: event.data.ownerId,
          balance: event.data.initialBalance,
          transactionCount: 0,
          lastActivity: event.timestamp
        });
        break;
        
      case 'MoneyDeposited':
      case 'MoneyWithdrawn':
        const summary = this.summaries.get(event.aggregateId);
        if (summary) {
          summary.balance += (event.eventType === 'MoneyDeposited' ? 
            event.data.amount : -event.data.amount);
          summary.transactionCount++;
          summary.lastActivity = event.timestamp;
        }
        break;
    }
  }

  getAccountSummary(accountId) {
    return this.summaries.get(accountId);
  }

  getAllSummaries() {
    return Array.from(this.summaries.values());
  }
}

// Event handler for notifications
class NotificationHandler {
  constructor(eventStore) {
    this.eventStore = eventStore;
  }

  async subscribeToEvents() {
    // In a real implementation, this would be a continuous subscription
    const events = await this.eventStore.getAllEvents();
    events.forEach(event => this.handleEvent(event));
  }

  handleEvent(event) {
    switch (event.eventType) {
      case 'AccountCreated':
        console.log(\`📧 Welcome email sent to account \${event.aggregateId}\`);
        break;
      case 'MoneyWithdrawn':
        if (event.data.amount > 1000) {
          console.log(\`🚨 Large withdrawal alert: $\${event.data.amount} from account \${event.aggregateId}\`);
        }
        break;
    }
  }
}</code></pre>
    </div>

    <h3>Snapshots for Performance</h3>

    <div class="code-block">
      <span class="code-label">CODE</span>
      <pre><code>// Snapshot functionality
class Snapshot {
  constructor(aggregateId, data, version, timestamp = new Date()) {
    this.aggregateId = aggregateId;
    this.data = data;
    this.version = version;
    this.timestamp = timestamp;
  }
}

class SnapshotStore {
  constructor() {
    this.snapshots = new Map();
  }

  async saveSnapshot(snapshot) {
    this.snapshots.set(snapshot.aggregateId, snapshot);
  }

  async getSnapshot(aggregateId) {
    return this.snapshots.get(aggregateId);
  }
}

// Enhanced repository with snapshot support
class EnhancedBankAccountRepository {
  constructor(eventStore, snapshotStore, snapshotFrequency = 10) {
    this.eventStore = eventStore;
    this.snapshotStore = snapshotStore;
    this.snapshotFrequency = snapshotFrequency;
  }

  async save(account) {
    const uncommittedEvents = account.getUncommittedEvents();
    if (uncommittedEvents.length === 0) {
      return;
    }

    const expectedVersion = account.version - uncommittedEvents.length;
    await this.eventStore.saveEvents(
      account.accountId, 
      uncommittedEvents, 
      expectedVersion
    );
    
    account.markEventsAsCommitted();

    // Create snapshot if needed
    if (account.version % this.snapshotFrequency === 0) {
      await this.createSnapshot(account);
    }
  }

  async getById(accountId) {
    // Try to load from snapshot first
    const snapshot = await this.snapshotStore.getSnapshot(accountId);
    let account;
    let fromVersion = 0;

    if (snapshot) {
      account = new BankAccount(accountId);
      account.ownerId = snapshot.data.ownerId;
      account.balance = snapshot.data.balance;
      account.version = snapshot.version;
      fromVersion = snapshot.version;
    }

    // Load events since snapshot
    const events = await this.eventStore.getEvents(accountId, fromVersion);
    
    if (!account && events.length === 0) {
      return null;
    }

    if (!account) {
      account = BankAccount.fromHistory(accountId, events);
    } else {
      events.forEach(event => account.applyEvent(event));
    }

    return account;
  }

  async createSnapshot(account) {
    const snapshot = new Snapshot(
      account.accountId,
      {
        ownerId: account.ownerId,
        balance: account.balance
      },
      account.version
    );
    
    await this.snapshotStore.saveSnapshot(snapshot);
  }
}</code></pre>
    </div>

    <h3>Usage Example</h3>

    <div class="code-block">
      <span class="code-label">CODE</span>
      <pre><code>// Complete usage example
async function demonstrateEventSourcing() {
  // Setup
  const eventStore = new EventStore();
  const snapshotStore = new SnapshotStore();
  const repository = new EnhancedBankAccountRepository(eventStore, snapshotStore);
  const projection = new AccountSummaryProjection(eventStore);
  const notificationHandler = new NotificationHandler(eventStore);

  // Create and use account
  const account = BankAccount.create('acc-123', 'user-456', 1000);
  await repository.save(account);

  // Perform operations
  account.deposit(500);
  account.withdraw(200);
  account.deposit(1000);
  await repository.save(account);

  // Load account from events
  const loadedAccount = await repository.getById('acc-123');
  console.log(\`Loaded account balance: $\${loadedAccount.balance}\`);

  // Build projections
  await projection.buildProjection();
  const summary = projection.getAccountSummary('acc-123');
  console.log('Account Summary:', summary);

  // Process notifications
  await notificationHandler.subscribeToEvents();

  // Query events
  const allDeposits = await eventStore.getEventsByType('MoneyDeposited');
  console.log(\`Total deposits: \${allDeposits.length}\`);
}

demonstrateEventSourcing().catch(console.error);</code></pre>
    </div>

    <h3>Advantages</h3>
    <ul>
      <li><strong>Complete Audit Trail:</strong> Every state change is recorded</li>
      <li><strong>Time Travel:</strong> Can reconstruct state at any point in time</li>
      <li><strong>Debugging:</strong> Easy to trace how current state was reached</li>
      <li><strong>Analytics:</strong> Rich data for business intelligence</li>
      <li><strong>Flexibility:</strong> Can create new projections from existing events</li>
      <li><strong>Scalability:</strong> Read and write models can be scaled independently</li>
    </ul>

    <h3>Disadvantages</h3>
    <ul>
      <li><strong>Complexity:</strong> More complex than traditional CRUD operations</li>
      <li><strong>Storage:</strong> Requires more storage space</li>
      <li><strong>Learning Curve:</strong> Different mindset required</li>
      <li><strong>Eventual Consistency:</strong> Projections may lag behind events</li>
      <li><strong>Event Evolution:</strong> Handling changes to event schemas</li>
    </ul>

    <h3>When to Use Event Sourcing</h3>

    <h4>Good Fit</h4>
    <ul>
      <li>Audit requirements are critical</li>
      <li>Business needs to analyze historical data</li>
      <li>Complex business logic with many state transitions</li>
      <li>Need to support multiple read models</li>
      <li>High-volume systems requiring CQRS</li>
    </ul>

    <h4>Poor Fit</h4>
    <ul>
      <li>Simple CRUD applications</li>
      <li>Small teams without event sourcing expertise</li>
      <li>Systems with simple business logic</li>
      <li>Applications with limited storage</li>
    </ul>

    <div class="info-note">
      <strong>💡 Key Insight:</strong>
      <p>Event Sourcing provides powerful capabilities for audit trails and analytics, but comes with significant complexity. It's best suited for domains where the benefits clearly outweigh the implementation costs.</p>
    </div>
`
}; 