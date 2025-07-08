export const resourceStarvation = {
  id: 'resource-starvation',
  title: 'Resource Starvation',
  content: `
<p>Resource starvation occurs in distributed systems when certain processes or entities are unable to access the resources (CPU, Memory, Network, I/O, Lock etc) they need, leading to degradation or failure of the system.</p>

    <h3>Types of Resources Subject to Starvation</h3>
    
    <h4>CPU Starvation</h4>
    <ul>
      <li>Low-priority processes never get CPU time</li>
      <li>High-priority processes monopolize the CPU</li>
      <li>Can lead to system unresponsiveness</li>
    </ul>

    <h4>Memory Starvation</h4>
    <ul>
      <li>Processes unable to allocate required memory</li>
      <li>Memory leaks consuming available memory</li>
      <li>Can trigger out-of-memory errors</li>
    </ul>

    <h4>Network Starvation</h4>
    <ul>
      <li>Bandwidth consumed by heavy users</li>
      <li>Connection pool exhaustion</li>
      <li>Network congestion preventing access</li>
    </ul>

    <h4>I/O Starvation</h4>
    <ul>
      <li>Disk I/O bottlenecks</li>
      <li>File handle exhaustion</li>
      <li>Database connection starvation</li>
    </ul>

    <h4>Lock Starvation</h4>
    <ul>
      <li>Threads unable to acquire locks</li>
      <li>Writer starvation in reader-writer locks</li>
      <li>Priority inversion problems</li>
    </ul>

    <h3>Common Causes</h3>
    
    <h4>Priority Inversion</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code># Priority Inversion Example
# Low priority task holds lock needed by high priority task

class PriorityInversionDemo:
    def __init__(self):
        self.resource_lock = threading.Lock()
        
    def low_priority_task(self):
        with self.resource_lock:
            # Long running operation
            time.sleep(10)
            print("Low priority task completed")
    
    def high_priority_task(self):
        # Waits for low priority task
        with self.resource_lock:
            print("High priority task completed")
    
    def medium_priority_task(self):
        # CPU intensive task
        while True:
            calculate_something()
            # Prevents low priority from completing
            # Thus blocking high priority indirectly</code></pre>
    </div>

    <h4>Unfair Scheduling</h4>
    <ul>
      <li>Scheduler bias towards certain processes</li>
      <li>Lack of fairness mechanisms</li>
      <li>No aging or priority boost for waiting processes</li>
    </ul>

    <h4>Resource Leaks</h4>
    <ul>
      <li>Memory leaks reducing available memory</li>
      <li>Connection leaks exhausting pools</li>
      <li>File descriptor leaks</li>
    </ul>

    <h3>Detection Methods</h3>
    
    <h4>Monitoring Metrics</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code># Resource Starvation Detection
class StarvationDetector:
    def __init__(self):
        self.wait_times = defaultdict(list)
        self.threshold = 30  # seconds
        
    def record_wait_time(self, process_id, wait_time):
        self.wait_times[process_id].append(wait_time)
        
        # Check for starvation
        if wait_time > self.threshold:
            self.alert_starvation(process_id, wait_time)
    
    def detect_patterns(self):
        for process_id, times in self.wait_times.items():
            avg_wait = sum(times) / len(times)
            if avg_wait > self.threshold:
                print(f"Process {process_id} experiencing starvation")
                print(f"Average wait time: {avg_wait}s")
    
    def alert_starvation(self, process_id, wait_time):
        alert = {
            "type": "RESOURCE_STARVATION",
            "process_id": process_id,
            "wait_time": wait_time,
            "timestamp": time.time()
        }
        send_alert(alert)</code></pre>
    </div>

    <h3>Prevention Strategies</h3>
    
    <h4>Fair Scheduling Algorithms</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code># Fair Queue Implementation
class FairQueue:
    def __init__(self):
        self.queues = defaultdict(deque)
        self.last_served = defaultdict(float)
        
    def enqueue(self, client_id, request):
        self.queues[client_id].append(request)
    
    def dequeue(self):
        # Find client with oldest last_served time
        if not self.queues:
            return None
            
        # Fair selection based on time since last served
        now = time.time()
        selected_client = min(
            self.queues.keys(),
            key=lambda c: self.last_served.get(c, 0)
        )
        
        if self.queues[selected_client]:
            request = self.queues[selected_client].popleft()
            self.last_served[selected_client] = now
            return request
            
        return None</code></pre>
    </div>

    <h4>Resource Quotas</h4>
    <ul>
      <li>Set per-process resource limits</li>
      <li>Implement rate limiting</li>
      <li>Use cgroups for resource isolation</li>
    </ul>

    <h4>Aging Mechanisms</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code># Priority Aging to Prevent Starvation
class AgingScheduler:
    def __init__(self, age_increment=1, max_priority=10):
        self.processes = []
        self.age_increment = age_increment
        self.max_priority = max_priority
        
    def add_process(self, process):
        process['age'] = 0
        process['effective_priority'] = process['priority']
        self.processes.append(process)
    
    def age_processes(self):
        """Increase priority of waiting processes"""
        for process in self.processes:
            if process['state'] == 'waiting':
                process['age'] += self.age_increment
                process['effective_priority'] = min(
                    process['priority'] + process['age'],
                    self.max_priority
                )
    
    def select_next_process(self):
        """Select highest effective priority process"""
        ready_processes = [p for p in self.processes 
                          if p['state'] == 'ready']
        if not ready_processes:
            return None
            
        selected = max(ready_processes, 
                      key=lambda p: p['effective_priority'])
        selected['age'] = 0  # Reset age when selected
        return selected</code></pre>
    </div>

    <h3>Mitigation Techniques</h3>
    
    <h4>Resource Pools with Timeouts</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code># Connection Pool with Timeout
class ResourcePool:
    def __init__(self, max_size=10, timeout=5):
        self.resources = Queue(maxsize=max_size)
        self.timeout = timeout
        self.waiters = []
        
    def acquire(self):
        start_time = time.time()
        try:
            # Try to get resource with timeout
            resource = self.resources.get(timeout=self.timeout)
            wait_time = time.time() - start_time
            
            # Track wait times for monitoring
            if wait_time > self.timeout * 0.8:
                log_warning(f"Long wait time: {wait_time}s")
                
            return resource
        except Empty:
            raise ResourceStarvationError(
                f"Could not acquire resource after {self.timeout}s"
            )
    
    def release(self, resource):
        try:
            self.resources.put_nowait(resource)
        except Full:
            log_error("Resource pool full on release")</code></pre>
    </div>

    <h4>Circuit Breakers</h4>
    <ul>
      <li>Fail fast when resources are exhausted</li>
      <li>Prevent cascading starvation</li>
      <li>Allow system to recover</li>
    </ul>

    <h4>Backpressure Mechanisms</h4>
    <ul>
      <li>Slow down producers when consumers can't keep up</li>
      <li>Reject requests when at capacity</li>
      <li>Provide feedback to upstream systems</li>
    </ul>

    <h3>Real-World Examples</h3>
    
    <h4>Database Connection Starvation</h4>
    <ul>
      <li>Long-running queries holding connections</li>
      <li>Connection pool exhaustion</li>
      <li>Solution: Connection timeouts and query optimization</li>
    </ul>

    <h4>Thread Pool Starvation</h4>
    <ul>
      <li>All threads blocked on I/O</li>
      <li>No threads available for new requests</li>
      <li>Solution: Separate I/O and compute thread pools</li>
    </ul>

    <h3>Best Practices</h3>
    <ul>
      <li><strong>Monitor Resource Usage:</strong> Track utilization and wait times</li>
      <li><strong>Set Resource Limits:</strong> Prevent any single entity from monopolizing resources</li>
      <li><strong>Implement Fairness:</strong> Use fair queuing and scheduling algorithms</li>
      <li><strong>Use Timeouts:</strong> Prevent indefinite waiting</li>
      <li><strong>Design for Graceful Degradation:</strong> Handle resource exhaustion gracefully</li>
      <li><strong>Test Under Load:</strong> Identify starvation scenarios before production</li>
      <li><strong>Document Resource Requirements:</strong> Know what resources each component needs</li>
    </ul>

    <h3>Related Links</h3>
    <ul>
      <li><a href="https://stackoverflow.com/questions/1162587/what-is-starvation" target="_blank">What is Starvation - Stack Overflow</a></li>
    </ul>
`
}; 