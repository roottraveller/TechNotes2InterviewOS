export const distributedTransactions = {
  id: 'distributed-transactions',
  title: 'Distributed Transactions',
  content: `
<p>Distributed transactions are transactions that span multiple databases, systems, or resources across a network, requiring coordination to ensure ACID properties are maintained across all participating systems.</p>
    
    <h3>What are Distributed Transactions?</h3>
    <ul>
      <li><strong>Definition:</strong> Transactions that involve multiple resource managers or databases</li>
      <li><strong>Scope:</strong> Operations across network boundaries</li>
      <li><strong>Coordination:</strong> Requires distributed coordination protocols</li>
      <li><strong>ACID Compliance:</strong> Must maintain atomicity, consistency, isolation, durability across all resources</li>
    </ul>

    <h3>Challenges in Distributed Transactions</h3>
    
    <h4>1. Network Failures</h4>
    <ul>
      <li><strong>Partitions:</strong> Network splits can isolate participants</li>
      <li><strong>Timeouts:</strong> Slow networks can cause transaction timeouts</li>
      <li><strong>Message Loss:</strong> Critical coordination messages may be lost</li>
      <li><strong>Partial Failures:</strong> Some participants may fail while others succeed</li>
    </ul>

    <h4>2. Consistency Challenges</h4>
    <ul>
      <li><strong>Global Consistency:</strong> Ensuring all participants have consistent view</li>
      <li><strong>Isolation Levels:</strong> Maintaining isolation across distributed resources</li>
      <li><strong>Deadlock Detection:</strong> Detecting deadlocks across multiple systems</li>
      <li><strong>Concurrent Access:</strong> Managing concurrent distributed transactions</li>
    </ul>

    <h3>Distributed Transaction Protocols</h3>
    
    <h4>1. Two-Phase Commit (2PC)</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>Phase 1: Prepare Phase
1. Coordinator sends PREPARE to all participants
2. Participants prepare transaction and vote YES/NO
3. Participants write to undo/redo logs
4. Coordinator collects all votes

Phase 2: Commit Phase
If all votes are YES:
1. Coordinator sends COMMIT to all participants
2. Participants commit transaction
3. Participants send ACK to coordinator

If any vote is NO:
1. Coordinator sends ABORT to all participants
2. Participants rollback transaction
3. Participants send ACK to coordinator</code></pre>
    </div>

    <h4>2. Three-Phase Commit (3PC)</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>Phase 1: CanCommit Phase
1. Coordinator sends CANCOMMIT to all participants
2. Participants respond YES/NO based on ability to commit

Phase 2: PreCommit Phase
If all responses are YES:
1. Coordinator sends PRECOMMIT to all participants
2. Participants prepare to commit and respond ACK

Phase 3: DoCommit Phase
1. Coordinator sends DOCOMMIT to all participants
2. Participants commit transaction
3. Participants send HAVECOMMITTED to coordinator</code></pre>
    </div>

    <h3>Implementation Examples</h3>
    
    <h4>Java Transaction API (JTA)</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>@Transactional
public class DistributedTransactionExample {
    
    @Resource
    private UserTransaction userTransaction;
    
    @Resource(name = "jdbc/database1")
    private DataSource dataSource1;
    
    @Resource(name = "jdbc/database2")
    private DataSource dataSource2;
    
    public void transferMoney(String fromAccount, String toAccount, 
                            BigDecimal amount) throws Exception {
        
        userTransaction.begin();
        
        try {
            // Operation on Database 1
            try (Connection conn1 = dataSource1.getConnection()) {
                PreparedStatement stmt = conn1.prepareStatement(
                    "UPDATE accounts SET balance = balance - ? WHERE id = ?");
                stmt.setBigDecimal(1, amount);
                stmt.setString(2, fromAccount);
                stmt.executeUpdate();
            }
            
            // Operation on Database 2
            try (Connection conn2 = dataSource2.getConnection()) {
                PreparedStatement stmt = conn2.prepareStatement(
                    "UPDATE accounts SET balance = balance + ? WHERE id = ?");
                stmt.setBigDecimal(1, amount);
                stmt.setString(2, toAccount);
                stmt.executeUpdate();
            }
            
            userTransaction.commit();
            
        } catch (Exception e) {
            userTransaction.rollback();
            throw e;
        }
    }
}</code></pre>
    </div>

    <h4>XA Transactions</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// XA Transaction with multiple resources
public class XATransactionExample {
    
    public void performXATransaction() throws Exception {
        // Create XA resources
        XADataSource xaDS1 = new MysqlXADataSource();
        XADataSource xaDS2 = new PostgresXADataSource();
        
        XAConnection xaConn1 = xaDS1.getXAConnection();
        XAConnection xaConn2 = xaDS2.getXAConnection();
        
        XAResource xaRes1 = xaConn1.getXAResource();
        XAResource xaRes2 = xaConn2.getXAResource();
        
        // Create transaction IDs
        Xid xid1 = new XidImpl(1, "db1".getBytes(), "tx1".getBytes());
        Xid xid2 = new XidImpl(1, "db2".getBytes(), "tx1".getBytes());
        
        try {
            // Start XA transactions
            xaRes1.start(xid1, XAResource.TMNOFLAGS);
            xaRes2.start(xid2, XAResource.TMNOFLAGS);
            
            // Perform operations
            Connection conn1 = xaConn1.getConnection();
            Connection conn2 = xaConn2.getConnection();
            
            // Database operations...
            
            // End XA transactions
            xaRes1.end(xid1, XAResource.TMSUCCESS);
            xaRes2.end(xid2, XAResource.TMSUCCESS);
            
            // Prepare phase
            int vote1 = xaRes1.prepare(xid1);
            int vote2 = xaRes2.prepare(xid2);
            
            if (vote1 == XAResource.XA_OK && vote2 == XAResource.XA_OK) {
                // Commit phase
                xaRes1.commit(xid1, false);
                xaRes2.commit(xid2, false);
            } else {
                // Rollback
                xaRes1.rollback(xid1);
                xaRes2.rollback(xid2);
            }
            
        } catch (Exception e) {
            xaRes1.rollback(xid1);
            xaRes2.rollback(xid2);
            throw e;
        }
    }
}</code></pre>
    </div>

    <h3>Modern Alternatives</h3>
    
    <h4>1. Saga Pattern</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Saga implementation for distributed transactions
public class OrderSaga {
    
    public void processOrder(Order order) {
        try {
            // Step 1: Reserve inventory
            inventoryService.reserveItems(order.getItems());
            
            // Step 2: Process payment
            paymentService.processPayment(order.getPayment());
            
            // Step 3: Create shipment
            shippingService.createShipment(order);
            
            // Step 4: Confirm order
            orderService.confirmOrder(order);
            
        } catch (InventoryException e) {
            // No compensation needed
            throw new OrderProcessingException("Inventory not available");
            
        } catch (PaymentException e) {
            // Compensate: Release inventory
            inventoryService.releaseItems(order.getItems());
            throw new OrderProcessingException("Payment failed");
            
        } catch (ShippingException e) {
            // Compensate: Refund payment and release inventory
            paymentService.refundPayment(order.getPayment());
            inventoryService.releaseItems(order.getItems());
            throw new OrderProcessingException("Shipping failed");
        }
    }
}</code></pre>
    </div>

    <h4>2. Event Sourcing with Eventual Consistency</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Event-driven approach
public class EventDrivenTransaction {
    
    @EventHandler
    public void handleOrderCreated(OrderCreatedEvent event) {
        // Publish events instead of direct calls
        eventBus.publish(new InventoryReservationRequested(
            event.getOrderId(), event.getItems()));
    }
    
    @EventHandler  
    public void handleInventoryReserved(InventoryReservedEvent event) {
        eventBus.publish(new PaymentRequested(
            event.getOrderId(), event.getAmount()));
    }
    
    @EventHandler
    public void handlePaymentProcessed(PaymentProcessedEvent event) {
        eventBus.publish(new ShipmentRequested(
            event.getOrderId(), event.getShippingAddress()));
    }
    
    // Compensation events for failures
    @EventHandler
    public void handlePaymentFailed(PaymentFailedEvent event) {
        eventBus.publish(new InventoryReleaseRequested(
            event.getOrderId()));
    }
}</code></pre>
    </div>

    <h3>Best Practices</h3>
    
    <h4>Design Principles</h4>
    <ul>
      <li><strong>Minimize Scope:</strong> Keep distributed transactions as small as possible</li>
      <li><strong>Timeout Management:</strong> Set appropriate timeouts for all operations</li>
      <li><strong>Idempotency:</strong> Ensure operations can be safely retried</li>
      <li><strong>Compensation Logic:</strong> Design proper rollback mechanisms</li>
    </ul>

    <h4>Error Handling</h4>
    <ul>
      <li><strong>Retry Logic:</strong> Implement exponential backoff for transient failures</li>
      <li><strong>Dead Letter Queues:</strong> Handle permanently failed transactions</li>
      <li><strong>Circuit Breakers:</strong> Prevent cascade failures</li>
      <li><strong>Monitoring:</strong> Track transaction success/failure rates</li>
    </ul>

    <h3>Performance Considerations</h3>
    
    <h4>Optimization Strategies</h4>
    <ul>
      <li><strong>Connection Pooling:</strong> Reuse database connections</li>
      <li><strong>Batch Operations:</strong> Group multiple operations together</li>
      <li><strong>Asynchronous Processing:</strong> Use async operations where possible</li>
      <li><strong>Resource Optimization:</strong> Minimize lock holding time</li>
    </ul>

    <h4>Monitoring Metrics</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Transaction monitoring
public class TransactionMonitor {
    private final MeterRegistry meterRegistry;
    
    public void recordTransactionStart(String transactionId) {
        Timer.Sample sample = Timer.start(meterRegistry);
        sample.stop(Timer.builder("distributed.transaction.duration")
            .tag("transaction.id", transactionId)
            .register(meterRegistry));
    }
    
    public void recordTransactionOutcome(String outcome) {
        Counter.builder("distributed.transaction.outcome")
            .tag("result", outcome)
            .register(meterRegistry)
            .increment();
    }
}</code></pre>
    </div>

    <div class="info-note">
      <strong>💡 Key Insight:</strong>
      <p>Distributed transactions are complex and can significantly impact system performance. Modern architectures often favor eventual consistency patterns like Saga or event sourcing over traditional 2PC for better scalability and resilience.</p>
    </div>

    <div class="reference-links">
      <h4>🔗 Learn More:</h4>
      <ul>
        <li><a href="https://en.wikipedia.org/wiki/Distributed_transaction" target="_blank">Distributed Transactions - Wikipedia</a></li>
        <li><a href="https://microservices.io/patterns/data/saga.html" target="_blank">Saga Pattern</a></li>
      </ul>
    </div>
`
}; 