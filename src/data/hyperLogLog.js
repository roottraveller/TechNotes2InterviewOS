export const hyperLogLog = {
  id: 'hyperloglog',
  title: 'HyperLogLog (HLL)',
  content: `
<p>HyperLogLog is a probabilistic data structure used for estimating the number of unique elements in very large datasets or data streams with high accuracy and minimal memory usage.</p>

    <h3>Key Characteristics</h3>
    <ul>
      <li><strong>Space Efficient:</strong> Uses only O(log log n) space</li>
      <li><strong>Probabilistic:</strong> Provides estimates, not exact counts</li>
      <li><strong>Accuracy:</strong> Typically 2% standard error</li>
      <li><strong>Scalable:</strong> Can handle billions of unique elements</li>
      <li><strong>Mergeable:</strong> Multiple HLL structures can be combined</li>
    </ul>

    <h3>How HyperLogLog Works</h3>
    
    <h4>Basic Algorithm Concept</h4>
    <p>HyperLogLog uses the observation that the cardinality of a multiset of uniformly distributed random numbers can be estimated by calculating the maximum number of leading zeros in the binary representation of each number in the set.</p>

    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code># Simplified HyperLogLog concept
def count_leading_zeros(hash_value):
    """Count leading zeros in binary representation"""
    if hash_value == 0:
        return 32  # Assuming 32-bit hash
    
    count = 0
    mask = 1 << 31  # Start with leftmost bit
    
    while (hash_value & mask) == 0:
        count += 1
        mask >>= 1
    
    return count

# Example:
# hash("item1") = 0b00001010... → 4 leading zeros
# hash("item2") = 0b00000001... → 7 leading zeros
# hash("item3") = 0b01010101... → 1 leading zero

# Maximum leading zeros observed: 7
# Estimated cardinality ≈ 2^7 = 128</code></pre>
    </div>

    <h4>Algorithm Steps</h4>
    <ol>
      <li><strong>Hash Function:</strong> Apply a hash function to each element</li>
      <li><strong>Bucket Selection:</strong> Use first k bits to select one of 2^k buckets</li>
      <li><strong>Leading Zeros:</strong> Count leading zeros in remaining bits</li>
      <li><strong>Register Update:</strong> Store maximum leading zeros per bucket</li>
      <li><strong>Estimation:</strong> Combine all buckets using harmonic mean</li>
    </ol>

    <h3>Implementation Details</h3>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>class HyperLogLog:
    def __init__(self, precision=14):
        """
        Initialize HyperLogLog
        precision: number of bits for bucket addressing (4-16)
        """
        self.precision = precision
        self.m = 2 ** precision  # Number of buckets
        self.registers = [0] * self.m
        self.alpha = self._get_alpha(self.m)
    
    def _get_alpha(self, m):
        """Get bias correction constant"""
        if m == 16:
            return 0.673
        elif m == 32:
            return 0.697
        elif m == 64:
            return 0.709
        else:
            return 0.7213 / (1 + 1.079 / m)
    
    def add(self, item):
        """Add an item to the HLL"""
        # Hash the item
        hash_value = hash(str(item)) & ((1 << 32) - 1)
        
        # Use first 'precision' bits for bucket
        bucket = hash_value >> (32 - self.precision)
        
        # Count leading zeros in remaining bits
        remaining_bits = hash_value & ((1 << (32 - self.precision)) - 1)
        leading_zeros = self._count_leading_zeros(remaining_bits)
        
        # Update register with maximum
        self.registers[bucket] = max(self.registers[bucket], 
                                     leading_zeros + 1)
    
    def estimate_cardinality(self):
        """Estimate the number of unique elements"""
        # Calculate raw estimate using harmonic mean
        raw_estimate = self.alpha * (self.m ** 2) / \
                      sum(2 ** (-x) for x in self.registers)
        
        # Apply bias correction for different ranges
        if raw_estimate <= 2.5 * self.m:
            # Small range correction
            zeros = self.registers.count(0)
            if zeros != 0:
                return self.m * math.log(self.m / zeros)
        elif raw_estimate <= (1/30) * (1 << 32):
            # No correction
            return raw_estimate
        else:
            # Large range correction
            return -1 * (1 << 32) * math.log(1 - raw_estimate / (1 << 32))
        
        return raw_estimate</code></pre>
    </div>

    <h3>Memory Usage</h3>
    
    <table>
      <thead>
        <tr>
          <th>Precision (p)</th>
          <th>Buckets (2^p)</th>
          <th>Memory Usage</th>
          <th>Standard Error</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>4</td>
          <td>16</td>
          <td>12 bytes</td>
          <td>26%</td>
        </tr>
        <tr>
          <td>8</td>
          <td>256</td>
          <td>192 bytes</td>
          <td>6.5%</td>
        </tr>
        <tr>
          <td>12</td>
          <td>4096</td>
          <td>3 KB</td>
          <td>1.6%</td>
        </tr>
        <tr>
          <td>14</td>
          <td>16384</td>
          <td>12 KB</td>
          <td>0.8%</td>
        </tr>
        <tr>
          <td>16</td>
          <td>65536</td>
          <td>48 KB</td>
          <td>0.4%</td>
        </tr>
      </tbody>
    </table>

    <h3>Use Cases and Examples</h3>
    
    <h4>1. Counting Unique Visitors</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code># Website unique visitor counter
class UniqueVisitorCounter:
    def __init__(self):
        self.hll = HyperLogLog(precision=14)
    
    def record_visit(self, user_id):
        self.hll.add(user_id)
    
    def get_unique_visitors(self):
        return int(self.hll.estimate_cardinality())

# Usage
counter = UniqueVisitorCounter()
for visitor in website_traffic:
    counter.record_visit(visitor['user_id'])

print(f"Unique visitors: ~{counter.get_unique_visitors()}")</code></pre>
    </div>

    <h4>2. Database Query Optimization</h4>
    <ul>
      <li>Estimating distinct values in columns</li>
      <li>Query planning and optimization</li>
      <li>Approximate COUNT(DISTINCT) queries</li>
    </ul>

    <h4>3. Network Traffic Analysis</h4>
    <ul>
      <li>Counting unique IP addresses</li>
      <li>DDoS detection</li>
      <li>Traffic pattern analysis</li>
    </ul>

    <h4>4. Real-time Analytics</h4>
    <ul>
      <li>Stream processing systems</li>
      <li>Live dashboard metrics</li>
      <li>Social media analytics</li>
    </ul>

    <h3>Advantages</h3>
    <ul>
      <li><strong>Constant Memory:</strong> Fixed memory regardless of cardinality</li>
      <li><strong>Fast Updates:</strong> O(1) time complexity for additions</li>
      <li><strong>Mergeable:</strong> Can combine multiple HLLs</li>
      <li><strong>No False Negatives:</strong> Never underestimates significantly</li>
      <li><strong>Tunable Accuracy:</strong> Trade memory for accuracy</li>
    </ul>

    <h3>Limitations</h3>
    <ul>
      <li><strong>Approximate Only:</strong> Cannot get exact counts</li>
      <li><strong>No Deletion:</strong> Cannot remove elements</li>
      <li><strong>No Membership Test:</strong> Cannot check if element exists</li>
      <li><strong>One-way Operation:</strong> Cannot retrieve original elements</li>
    </ul>

    <h3>Implementations in Practice</h3>
    
    <h4>Redis HyperLogLog</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code># Redis HyperLogLog commands
PFADD visitors "user123"      # Add element
PFADD visitors "user456"      # Add another element
PFCOUNT visitors              # Get cardinality estimate

# Merge multiple HLLs
PFMERGE combined visitors_day1 visitors_day2</code></pre>
    </div>

    <h4>PostgreSQL</h4>
    <ul>
      <li>postgresql-hll extension</li>
      <li>Used for approximate distinct counts</li>
    </ul>

    <h4>Apache Spark</h4>
    <ul>
      <li>approxCountDistinct() function</li>
      <li>Used in big data analytics</li>
    </ul>

    <h3>Related Links</h3>
    <ul>
      <li><a href="https://stackoverflow.com/a/35219704" target="_blank">HyperLogLog Explained - Stack Overflow</a></li>
      <li><a href="https://www.waitingforcode.com/big-data-algorithms/hyperloglog-explained/read" target="_blank">HyperLogLog Algorithm Explained</a></li>
    </ul>
`
}; 