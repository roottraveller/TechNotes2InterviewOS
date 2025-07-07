export const vectorClocks = {
  id: 'vector-clocks',
  title: 'Vector Clocks',
  content: `
    <h2>Vector Clocks</h2>
    <p>Vector clocks are a mechanism for generating a partial ordering of events in a distributed system and detecting causality violations. They provide a way to determine the causal relationship between events across different processes.</p>
    
    <h3>What are Vector Clocks?</h3>
    <ul>
      <li><strong>Definition:</strong> Data structure that captures causality information in distributed systems</li>
      <li><strong>Purpose:</strong> Determine if events are causally related or concurrent</li>
      <li><strong>Structure:</strong> Array/vector where each element represents logical time of a process</li>
      <li><strong>Ordering:</strong> Provides partial ordering of events across processes</li>
    </ul>

    <h3>How Vector Clocks Work</h3>
    
    <h4>Basic Principles</h4>
    <ul>
      <li><strong>Each Process:</strong> Maintains its own vector clock</li>
      <li><strong>Vector Size:</strong> Equal to the number of processes in the system</li>
      <li><strong>Index Mapping:</strong> Each index corresponds to a specific process</li>
      <li><strong>Clock Updates:</strong> Updated on local events and message passing</li>
    </ul>

    <h4>Vector Clock Rules</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>Vector Clock Update Rules:

1. Initialization:
   - Each process Pi initializes VC[i] = [0, 0, ..., 0]
   - VC[i][i] represents Pi's logical time

2. Local Event:
   - When Pi performs local event: VC[i][i] = VC[i][i] + 1

3. Send Message:
   - Before sending message: VC[i][i] = VC[i][i] + 1
   - Attach current VC[i] to the message

4. Receive Message:
   - When Pi receives message with VC_msg:
   - For all j: VC[i][j] = max(VC[i][j], VC_msg[j])
   - Then: VC[i][i] = VC[i][i] + 1</code></pre>
    </div>

    <h3>Implementation Example</h3>
    
    <h4>Vector Clock Class</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>public class VectorClock {
    private int[] clock;
    private int processId;
    private int numProcesses;
    
    public VectorClock(int processId, int numProcesses) {
        this.processId = processId;
        this.numProcesses = numProcesses;
        this.clock = new int[numProcesses];
        Arrays.fill(clock, 0);
    }
    
    // Handle local event
    public void tick() {
        clock[processId]++;
    }
    
    // Prepare message with current timestamp
    public VectorClock sendEvent() {
        tick();
        return new VectorClock(this);
    }
    
    // Handle received message
    public void receiveEvent(VectorClock otherClock) {
        // Update vector clock based on received timestamp
        for (int i = 0; i < numProcesses; i++) {
            if (i != processId) {
                clock[i] = Math.max(clock[i], otherClock.clock[i]);
            }
        }
        // Increment own logical time
        tick();
    }
    
    // Copy constructor
    public VectorClock(VectorClock other) {
        this.processId = other.processId;
        this.numProcesses = other.numProcesses;
        this.clock = other.clock.clone();
    }
    
    // Compare vector clocks for causality
    public Ordering compare(VectorClock other) {
        boolean thisBeforeOther = true;
        boolean otherBeforeThis = true;
        
        for (int i = 0; i < numProcesses; i++) {
            if (this.clock[i] > other.clock[i]) {
                otherBeforeThis = false;
            }
            if (this.clock[i] < other.clock[i]) {
                thisBeforeOther = false;
            }
        }
        
        if (thisBeforeOther && !otherBeforeThis) {
            return Ordering.BEFORE;
        } else if (otherBeforeThis && !thisBeforeOther) {
            return Ordering.AFTER;
        } else if (thisBeforeOther && otherBeforeThis) {
            return Ordering.EQUAL;
        } else {
            return Ordering.CONCURRENT;
        }
    }
    
    public enum Ordering {
        BEFORE, AFTER, EQUAL, CONCURRENT
    }
    
    @Override
    public String toString() {
        return Arrays.toString(clock);
    }
}</code></pre>
    </div>

    <h4>Distributed Process Example</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>public class DistributedProcess {
    private VectorClock vectorClock;
    private int processId;
    private String processName;
    
    public DistributedProcess(int processId, String name, int totalProcesses) {
        this.processId = processId;
        this.processName = name;
        this.vectorClock = new VectorClock(processId, totalProcesses);
    }
    
    // Perform local computation
    public void performLocalEvent(String eventDescription) {
        vectorClock.tick();
        System.out.printf("%s: Local event '%s' at %s%n", 
            processName, eventDescription, vectorClock);
    }
    
    // Send message to another process
    public Message sendMessage(String content, DistributedProcess recipient) {
        VectorClock messageTimestamp = vectorClock.sendEvent();
        Message message = new Message(content, messageTimestamp, 
            processId, recipient.processId);
        
        System.out.printf("%s: Sending message '%s' to %s at %s%n",
            processName, content, recipient.processName, messageTimestamp);
        
        return message;
    }
    
    // Receive message from another process
    public void receiveMessage(Message message) {
        System.out.printf("%s: Received message '%s' with timestamp %s%n",
            processName, message.getContent(), message.getTimestamp());
        
        vectorClock.receiveEvent(message.getTimestamp());
        
        System.out.printf("%s: Updated vector clock to %s%n",
            processName, vectorClock);
    }
    
    // Check causality between events
    public void compareTo(DistributedProcess other, String event1, String event2) {
        VectorClock.Ordering ordering = this.vectorClock.compare(other.vectorClock);
        
        System.out.printf("Causality: %s (%s) %s %s (%s)%n",
            event1, this.vectorClock,
            ordering.toString().toLowerCase(),
            event2, other.vectorClock);
    }
    
    public VectorClock getVectorClock() {
        return vectorClock;
    }
}

class Message {
    private String content;
    private VectorClock timestamp;
    private int senderId;
    private int recipientId;
    
    public Message(String content, VectorClock timestamp, 
                   int senderId, int recipientId) {
        this.content = content;
        this.timestamp = timestamp;
        this.senderId = senderId;
        this.recipientId = recipientId;
    }
    
    // Getters
    public String getContent() { return content; }
    public VectorClock getTimestamp() { return timestamp; }
    public int getSenderId() { return senderId; }
    public int getRecipientId() { return recipientId; }
}</code></pre>
    </div>

    <h3>Practical Example</h3>
    
    <h4>Three-Process System</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>public class VectorClockDemo {
    public static void main(String[] args) {
        // Create three processes
        DistributedProcess p1 = new DistributedProcess(0, "P1", 3);
        DistributedProcess p2 = new DistributedProcess(1, "P2", 3);
        DistributedProcess p3 = new DistributedProcess(2, "P3", 3);
        
        System.out.println("=== Vector Clock Demo ===");
        
        // P1 performs local event
        p1.performLocalEvent("Initialize database");
        // P1: [1, 0, 0]
        
        // P2 performs local event  
        p2.performLocalEvent("Start web server");
        // P2: [0, 1, 0]
        
        // P1 sends message to P2
        Message msg1 = p1.sendMessage("Database ready", p2);
        // P1: [2, 0, 0]
        
        // P2 receives message from P1
        p2.receiveMessage(msg1);
        // P2: [2, 2, 0]
        
        // P2 sends message to P3
        Message msg2 = p2.sendMessage("System ready", p3);
        // P2: [2, 3, 0]
        
        // P3 receives message from P2
        p3.receiveMessage(msg2);
        // P3: [2, 3, 1]
        
        // P3 performs local event
        p3.performLocalEvent("Process request");
        // P3: [2, 3, 2]
        
        // P1 performs another local event
        p1.performLocalEvent("Backup database");
        // P1: [3, 0, 0]
        
        System.out.println("\n=== Causality Analysis ===");
        
        // Analyze causality relationships
        analyzeCausality(p1, p2, "P1 backup", "P2 after receiving msg");
        analyzeCausality(p2, p3, "P2 send to P3", "P3 process request");
        analyzeCausality(p1, p3, "P1 backup", "P3 process request");
    }
    
    private static void analyzeCausality(DistributedProcess p1, 
                                       DistributedProcess p2,
                                       String event1, String event2) {
        VectorClock.Ordering ordering = p1.getVectorClock()
            .compare(p2.getVectorClock());
        
        System.out.printf("%s %s %s%n", 
            event1, orderingToString(ordering), event2);
    }
    
    private static String orderingToString(VectorClock.Ordering ordering) {
        switch (ordering) {
            case BEFORE: return "happened before";
            case AFTER: return "happened after";
            case EQUAL: return "is equal to";
            case CONCURRENT: return "is concurrent with";
            default: return "unknown relation to";
        }
    }
}</code></pre>
    </div>

    <h3>Vector Clock Properties</h3>
    
    <h4>Causality Detection</h4>
    <ul>
      <li><strong>Happens-Before:</strong> VC1 < VC2 if VC1[i] ≤ VC2[i] for all i, and VC1[j] < VC2[j] for some j</li>
      <li><strong>Concurrent Events:</strong> Neither VC1 < VC2 nor VC2 < VC1</li>
      <li><strong>Causal Consistency:</strong> All causally related events are ordered</li>
      <li><strong>Partial Ordering:</strong> Not all events can be ordered</li>
    </ul>

    <h4>Advantages</h4>
    <ul>
      <li><strong>Accurate Causality:</strong> Captures true causal relationships</li>
      <li><strong>No False Positives:</strong> Concurrent events are correctly identified</li>
      <li><strong>Distributed:</strong> No central coordination required</li>
      <li><strong>Consistent:</strong> Provides consistent view across processes</li>
    </ul>

    <h4>Disadvantages</h4>
    <ul>
      <li><strong>Space Overhead:</strong> O(n) space where n is number of processes</li>
      <li><strong>Message Overhead:</strong> Each message carries full vector</li>
      <li><strong>Scalability:</strong> Grows linearly with number of processes</li>
      <li><strong>Dynamic Systems:</strong> Difficult to handle process failures/joins</li>
    </ul>

    <h3>Applications</h3>
    
    <h4>1. Distributed Debugging</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>public class DistributedDebugger {
    private VectorClock currentTime;
    private List<DebugEvent> eventLog;
    
    public void logEvent(String eventType, String description) {
        currentTime.tick();
        DebugEvent event = new DebugEvent(
            eventType, description, 
            new VectorClock(currentTime)
        );
        eventLog.add(event);
    }
    
    public void analyzeEventOrdering() {
        for (int i = 0; i < eventLog.size(); i++) {
            for (int j = i + 1; j < eventLog.size(); j++) {
                DebugEvent event1 = eventLog.get(i);
                DebugEvent event2 = eventLog.get(j);
                
                VectorClock.Ordering ordering = 
                    event1.getTimestamp().compare(event2.getTimestamp());
                
                if (ordering == VectorClock.Ordering.CONCURRENT) {
                    System.out.printf("Potential race condition: %s || %s%n",
                        event1.getDescription(), event2.getDescription());
                }
            }
        }
    }
}</code></pre>
    </div>

    <h4>2. Consistent Snapshots</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>public class ConsistentSnapshot {
    private Map<Integer, VectorClock> processStates;
    
    public boolean isConsistentSnapshot() {
        // Check if snapshot satisfies consistency condition
        for (Map.Entry<Integer, VectorClock> entry1 : processStates.entrySet()) {
            for (Map.Entry<Integer, VectorClock> entry2 : processStates.entrySet()) {
                if (!entry1.getKey().equals(entry2.getKey())) {
                    VectorClock vc1 = entry1.getValue();
                    VectorClock vc2 = entry2.getValue();
                    
                    // Check consistency condition
                    if (vc1.compare(vc2) == VectorClock.Ordering.AFTER) {
                        // If vc1 > vc2, then all events causally before
                        // vc1 should be included in the snapshot
                        if (!allCausalPredecessorsIncluded(vc1)) {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    }
    
    private boolean allCausalPredecessorsIncluded(VectorClock vc) {
        // Implementation depends on specific requirements
        return true;
    }
}</code></pre>
    </div>

    <h3>Optimizations</h3>
    
    <h4>1. Sparse Vector Clocks</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Only store non-zero entries
public class SparseVectorClock {
    private Map<Integer, Integer> clock;
    private int processId;
    
    public SparseVectorClock(int processId) {
        this.processId = processId;
        this.clock = new HashMap<>();
        clock.put(processId, 0);
    }
    
    public void tick() {
        clock.put(processId, clock.get(processId) + 1);
    }
    
    public void update(SparseVectorClock other) {
        for (Map.Entry<Integer, Integer> entry : other.clock.entrySet()) {
            int pid = entry.getKey();
            int time = entry.getValue();
            
            if (pid != processId) {
                clock.put(pid, Math.max(clock.getOrDefault(pid, 0), time));
            }
        }
        tick();
    }
}</code></pre>
    </div>

    <h4>2. Bounded Vector Clocks</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Limit vector size for scalability
public class BoundedVectorClock {
    private static final int MAX_SIZE = 64;
    private Map<Integer, Integer> clock;
    private int processId;
    
    public void addProcess(int pid) {
        if (clock.size() < MAX_SIZE) {
            clock.put(pid, 0);
        } else {
            // Use approximation strategies
            compactClock();
        }
    }
    
    private void compactClock() {
        // Remove least recently updated entries
        // or use other approximation strategies
    }
}</code></pre>
    </div>

    <div class="info-note">
      <strong>💡 Key Insight:</strong>
      <p>Vector clocks provide precise causality tracking but come with overhead that grows with system size. For large-scale systems, consider alternatives like logical clocks or hybrid approaches that balance accuracy with scalability.</p>
    </div>

    <div class="reference-links">
      <h4>🔗 Learn More:</h4>
      <ul>
        <li><a href="https://en.wikipedia.org/wiki/Vector_clock" target="_blank">Vector Clocks - Wikipedia</a></li>
        <li><a href="https://www.cs.rutgers.edu/~pxk/417/notes/clocks/index.html" target="_blank">Logical Clocks in Distributed Systems</a></li>
      </ul>
    </div>
  `
}; 