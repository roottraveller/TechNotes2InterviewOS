export const hashing = {
  id: 'hashing',
  title: 'Hashing',
  content: `
    <h2>Hashing</h2>
    <p>Hashing is a one-way mathematical function that converts input data of any size into a fixed-size string, providing O(1) average-case lookup time in hash tables and ensuring data integrity.</p>

    <h3>Hash Function Properties</h3>
    <table>
      <tr>
        <th>Property</th>
        <th>Description</th>
        <th>Importance</th>
      </tr>
      <tr>
        <td>Deterministic</td>
        <td>Same input → Same output</td>
        <td>Consistent behavior</td>
      </tr>
      <tr>
        <td>Fixed Output Size</td>
        <td>Hash length is constant</td>
        <td>Predictable storage</td>
      </tr>
      <tr>
        <td>Avalanche Effect</td>
        <td>Small input change → Large output change</td>
        <td>Security & distribution</td>
      </tr>
      <tr>
        <td>One-way</td>
        <td>Computationally infeasible to reverse</td>
        <td>Cryptographic security</td>
      </tr>
      <tr>
        <td>Collision Resistant</td>
        <td>Hard to find two inputs with same hash</td>
        <td>Data integrity</td>
      </tr>
    </table>

    <h3>Hash Function Comparison</h3>
    <table>
      <tr>
        <th>Algorithm</th>
        <th>Output Size</th>
        <th>Speed</th>
        <th>Security</th>
        <th>Use Case</th>
      </tr>
      <tr>
        <td>MD5</td>
        <td>128 bits</td>
        <td>Very Fast</td>
        <td>Broken</td>
        <td>Checksums only</td>
      </tr>
      <tr>
        <td>SHA-1</td>
        <td>160 bits</td>
        <td>Fast</td>
        <td>Deprecated</td>
        <td>Legacy systems</td>
      </tr>
      <tr>
        <td>SHA-256</td>
        <td>256 bits</td>
        <td>Moderate</td>
        <td>Strong</td>
        <td>General purpose</td>
      </tr>
      <tr>
        <td>SHA-3</td>
        <td>224-512 bits</td>
        <td>Moderate</td>
        <td>Very Strong</td>
        <td>High security</td>
      </tr>
      <tr>
        <td>BLAKE2</td>
        <td>256-512 bits</td>
        <td>Very Fast</td>
        <td>Strong</td>
        <td>Performance critical</td>
      </tr>
    </table>

    <h3>Hash Table Implementation</h3>
    <div class="code-block">
      <pre><code>Hash Table Structure:

┌─────────────────────────────────────────────────┐
│              Hash Table                         │
│  ┌─────────────────────────────────────────────┐│
│  │  Index 0: [key1, value1] → [key9, value9]  ││
│  │  Index 1: [key2, value2]                   ││
│  │  Index 2: null                             ││
│  │  Index 3: [key3, value3] → [key7, value7]  ││
│  │  Index 4: [key4, value4]                   ││
│  │  Index 5: null                             ││
│  │  Index 6: [key5, value5]                   ││
│  │  Index 7: [key6, value6]                   ││
│  └─────────────────────────────────────────────┘│
└─────────────────────────────────────────────────┘

Hash Function Process:
1. Input: key = "username"
2. Hash: hash("username") = 2847593
3. Index: 2847593 % table_size = 3
4. Store: table[3] = [key, value]

Collision Resolution Methods:

1. Chaining (Separate Chaining):
├── Each bucket contains linked list
├── Multiple items can hash to same index
├── Average case: O(1), Worst case: O(n)
├── Memory overhead: Pointers
└── Easy to implement

2. Open Addressing:
├── Linear Probing: Check next slot
│   └── Clustering problem
├── Quadratic Probing: Check i² slots away
│   └── Better distribution
├── Double Hashing: Use second hash function
│   └── Best distribution
└── Robin Hood Hashing: Minimize variance

Performance Characteristics:
├── Load Factor: n/m (items/buckets)
├── Optimal Load Factor: 0.7-0.8
├── Resize Threshold: When load > 0.75
├── Resize Cost: O(n) amortized O(1)
└── Space Complexity: O(n)

Common Hash Functions for Tables:
├── Division Method: h(k) = k mod m
├── Multiplication Method: h(k) = ⌊m(kA mod 1)⌋
├── Universal Hashing: Random function family
├── FNV Hash: Fast, good distribution
└── MurmurHash: Non-cryptographic, fast</code></pre>
    </div>

    <details>
      <summary><strong>Example: Google's Distributed Hash Tables</strong></summary>
      <div class="info-note">
        Google uses consistent hashing in their distributed systems to handle 100+ billion web pages and 8+ billion searches daily. Their hash tables power BigTable, which stores exabytes of data across millions of servers with 99.99% availability. Google's implementation uses custom hash functions optimized for their workloads, achieving sub-millisecond lookup times and handling 40,000+ queries per second per server. The system automatically redistributes data when servers are added or removed, maintaining load balance across their global infrastructure.
      </div>
    </details>

    <h3>Password Hashing Algorithms</h3>
    <div class="code-block">
      <pre><code>Password Hashing Comparison:

Algorithm    | Time Cost | Memory Cost | Parallelism | Security Level
-------------|-----------|-------------|-------------|----------------
bcrypt       | 2^4-2^31  | 4 KB        | No          | Good
scrypt       | Variable  | 16MB-1GB    | Limited     | Very Good
Argon2i      | Variable  | 8KB-4GB     | Variable    | Excellent
Argon2d      | Variable  | 8KB-4GB     | Variable    | Excellent
Argon2id     | Variable  | 8KB-4GB     | Variable    | Best
PBKDF2       | Variable  | Minimal     | No          | Moderate

Password Hashing Process:

1. Salt Generation:
├── Generate random salt (16+ bytes)
├── Use cryptographically secure random generator
├── Unique salt per password
└── Store salt with hash

2. Hash Computation:
├── Combine password + salt
├── Apply hash function with cost parameter
├── Iterate multiple times (work factor)
└── Output: hash + salt + parameters

3. Verification:
├── Extract salt and parameters from stored hash
├── Hash provided password with same parameters
├── Compare computed hash with stored hash
└── Constant-time comparison to prevent timing attacks

Example Implementation (Argon2):

Password: "mypassword123"
Salt: "randomsalt16bytes"
Time Cost: 3 (iterations)
Memory Cost: 65536 (64MB)
Parallelism: 4 (threads)
Output: $argon2id$v=19$m=65536,t=3,p=4$cmFuZG9tc2FsdDE2Ynl0ZXM$hash...

Security Considerations:
├── Cost Parameter: Adjust based on hardware
├── Salt Length: Minimum 16 bytes
├── Hash Length: Minimum 32 bytes
├── Timing Attacks: Use constant-time comparison
├── Side-channel Attacks: Secure memory handling
└── Upgrade Path: Plan for algorithm updates

Performance Guidelines:
├── Authentication Time: 250-500ms acceptable
├── Memory Usage: Balance security vs resources
├── Parallelism: Match server capabilities
├── Benchmarking: Test on production hardware
└── Monitoring: Track authentication performance</code></pre>
    </div>

    <h3>Cryptographic Hash Functions</h3>
    <div class="code-block">
      <pre><code>SHA-256 Algorithm Structure:

Input Processing:
1. Message Padding: Add padding to make length ≡ 448 (mod 512)
2. Length Append: Add 64-bit length field
3. Block Division: Split into 512-bit blocks

Hash Computation (per block):
1. Initialize: 8 working variables (a,b,c,d,e,f,g,h)
2. Expand: Generate 64 words from 16-word block
3. Compress: 64 rounds of operations
4. Update: Add to hash values

Round Function:
├── Ch(x,y,z) = (x ∧ y) ⊕ (¬x ∧ z)
├── Maj(x,y,z) = (x ∧ y) ⊕ (x ∧ z) ⊕ (y ∧ z)
├── Σ₀(x) = ROTR²(x) ⊕ ROTR¹³(x) ⊕ ROTR²²(x)
├── Σ₁(x) = ROTR⁶(x) ⊕ ROTR¹¹(x) ⊕ ROTR²⁵(x)
├── σ₀(x) = ROTR⁷(x) ⊕ ROTR¹⁸(x) ⊕ SHR³(x)
└── σ₁(x) = ROTR¹⁷(x) ⊕ ROTR¹⁹(x) ⊕ SHR¹⁰(x)

Security Properties:
├── Pre-image Resistance: Hard to find input for given hash
├── Second Pre-image Resistance: Hard to find different input with same hash
├── Collision Resistance: Hard to find any two inputs with same hash
├── Avalanche Effect: 1-bit change affects 50% of output bits
└── Uniform Distribution: Output appears random

Performance Characteristics:
├── SHA-256: ~150 MB/s on modern CPU
├── SHA-3: ~100 MB/s on modern CPU
├── BLAKE2b: ~350 MB/s on modern CPU
├── Hardware Acceleration: AES-NI, SHA extensions
└── Parallel Processing: Multiple blocks simultaneously

Use Cases by Hash Function:
├── SHA-256: TLS, Bitcoin, certificates
├── SHA-3: Post-quantum cryptography
├── BLAKE2: High-performance applications
├── MD5: Checksums, non-security applications
└── CRC32: Error detection, not cryptographic</code></pre>
    </div>

    <details>
      <summary><strong>Example: Bitcoin's Proof-of-Work Hashing</strong></summary>
      <div class="info-note">
        Bitcoin uses SHA-256 double hashing for proof-of-work mining, processing 180+ exahashes per second globally. Miners compete to find a hash with specific leading zeros, requiring trillions of attempts per block. The network adjusts difficulty every 2016 blocks to maintain 10-minute block times, consuming 120+ TWh annually. Bitcoin's hash rate provides security equivalent to the computational power of millions of supercomputers, making the network virtually impossible to attack. Each block hash links to the previous block, creating an immutable chain secured by cumulative proof-of-work.
      </div>
    </details>

    <h3>Collision Handling Strategies</h3>
    <div class="code-block">
      <pre><code>Collision Resolution Techniques:

1. Separate Chaining:
┌─────────────────────────────────────────────────┐
│              Hash Table                         │
│  ┌─────────────────────────────────────────────┐│
│  │  [0] → [key1,val1] → [key9,val9] → null    ││
│  │  [1] → [key2,val2] → null                  ││
│  │  [2] → null                                ││
│  │  [3] → [key3,val3] → [key7,val7] → null    ││
│  │  [4] → [key4,val4] → null                  ││
│  └─────────────────────────────────────────────┘│
└─────────────────────────────────────────────────┘

Pros: Simple, handles clustering well
Cons: Extra memory for pointers, cache misses

2. Linear Probing:
┌─────────────────────────────────────────────────┐
│              Hash Table                         │
│  ┌─────────────────────────────────────────────┐│
│  │  [0] → [key1, val1]                        ││
│  │  [1] → [key9, val9]  ← collision moved     ││
│  │  [2] → [key2, val2]                        ││
│  │  [3] → [key3, val3]                        ││
│  │  [4] → [key7, val7]  ← collision moved     ││
│  └─────────────────────────────────────────────┘│
└─────────────────────────────────────────────────┘

Pros: Good cache locality, simple
Cons: Primary clustering, degraded performance

3. Quadratic Probing:
h(k,i) = (h'(k) + i²) mod m

Pros: Reduces clustering
Cons: Secondary clustering, may not find empty slot

4. Double Hashing:
h(k,i) = (h₁(k) + i × h₂(k)) mod m

Pros: Best distribution, minimal clustering
Cons: More complex, requires good h₂(k)

5. Robin Hood Hashing:
├── Minimize variance in probe distances
├── Rich items give way to poor items
├── Better worst-case performance
└── More complex implementation

Load Factor Impact:
├── α = 0.5: 1.5 avg probes (chaining), 2.5 (linear)
├── α = 0.75: 2.5 avg probes (chaining), 8.5 (linear)
├── α = 0.9: 5.5 avg probes (chaining), 50+ (linear)
└── Optimal: 0.7-0.8 for most applications

Resize Strategy:
1. Detect: Load factor > threshold
2. Allocate: New table (2x size)
3. Rehash: All existing items
4. Replace: Old table with new
5. Cost: O(n) amortized to O(1) per operation</code></pre>
    </div>

    <h3>Hash-Based Data Structures</h3>
    <div class="code-block">
      <pre><code>Hash-Based Implementations:

1. HashMap/Dictionary:
├── Key-value storage
├── O(1) average insert/lookup/delete
├── Dynamic resizing
├── Language implementations:
│   ├── Java HashMap: Open addressing
│   ├── Python dict: Open addressing (3.7+)
│   ├── C++ unordered_map: Chaining
│   └── JavaScript Map: Implementation-specific

2. HashSet:
├── Unique element storage
├── O(1) average membership testing
├── Set operations: union, intersection, difference
├── Implementation: HashMap with dummy values

3. Bloom Filter:
├── Probabilistic membership testing
├── False positives possible, no false negatives
├── Space-efficient for large sets
├── Multiple hash functions
├── Applications: Web caching, databases

4. Consistent Hashing:
├── Distributed system load balancing
├── Minimal reshuffling on node changes
├── Virtual nodes for better distribution
├── Used in: Amazon DynamoDB, Cassandra

5. Count-Min Sketch:
├── Approximate frequency counting
├── Sublinear space complexity
├── Multiple hash functions
├── Applications: Network monitoring, analytics

Performance Characteristics:
├── HashMap: O(1) avg, O(n) worst case
├── TreeMap: O(log n) guaranteed
├── Skip List: O(log n) probabilistic
├── B-Tree: O(log n) disk-optimized
└── Trie: O(k) where k is key length

Memory Usage:
├── HashMap: ~1.5x key-value size
├── TreeMap: ~2x key-value size
├── Array: 1x element size
├── Linked List: ~1.5x element size
└── B-Tree: Depends on branching factor</code></pre>
    </div>

    <details>
      <summary><strong>Example: Redis Hash Implementation</strong></summary>
      <div class="info-note">
        Redis uses ziplist for small hashes (&lt;512 entries) and hash table for larger ones, serving 1+ million operations per second. Their hash table implementation uses chaining with optimized memory layout, achieving 99.9% cache hit rates in production. Redis automatically converts between representations based on size, optimizing memory usage for 100+ million keys. The system handles 100+ GB datasets with sub-millisecond latency, using incremental rehashing to avoid blocking operations. Redis's hash commands power session storage, caching, and real-time analytics for companies like Twitter, GitHub, and Snapchat.
      </div>
    </details>

    <h3>Security Considerations</h3>
    <div class="code-block">
      <pre><code>Hash Security Threats:

1. Rainbow Table Attacks:
├── Pre-computed hash lookups
├── Trade time for space
├── Mitigation: Salt passwords
├── Salt length: 16+ bytes
└── Unique salt per password

2. Dictionary Attacks:
├── Common password hashes
├── Brute force with wordlists
├── Mitigation: Strong passwords + salt
├── Rate limiting: Prevent rapid attempts
└── Account lockout: After failed attempts

3. Timing Attacks:
├── Exploit computation time differences
├── Hash comparison timing
├── Mitigation: Constant-time comparison
├── Example: memcmp() vs timing-safe compare
└── Important for authentication systems

4. Length Extension Attacks:
├── Exploit Merkle-Damgård construction
├── Append data without knowing key
├── Affected: MD5, SHA-1, SHA-2
├── Mitigation: Use HMAC instead
└── Not affected: SHA-3, BLAKE2

5. Collision Attacks:
├── Find two inputs with same hash
├── Birthday paradox: 2^(n/2) attempts
├── MD5: Practical attacks exist
├── SHA-1: Theoretical attacks demonstrated
└── SHA-256: No known practical attacks

HMAC (Hash-based Message Authentication Code):
HMAC(K, m) = H((K ⊕ opad) || H((K ⊕ ipad) || m))

Where:
├── K: Secret key
├── m: Message
├── opad: Outer padding (0x5c repeated)
├── ipad: Inner padding (0x36 repeated)
├── ||: Concatenation
└── H: Hash function

Security Properties:
├── Authenticity: Verifies message source
├── Integrity: Detects message tampering
├── Non-repudiation: Sender cannot deny
├── Key-dependent: Requires secret key
└── Collision resistant: Inherits from hash function

Best Practices:
├── Use strong hash functions (SHA-256+)
├── Implement proper salt generation
├── Use constant-time comparison
├── Regular security audits
├── Monitor for new vulnerabilities
├── Plan for algorithm migration
└── Follow industry standards (NIST, OWASP)</code></pre>
    </div>

    <h3>Interview Questions & Answers</h3>
    <div class="code-block">
      <pre><code>Common Interview Questions:

Q: What's the difference between MD5 and SHA-256?
A: MD5 is 128-bit, cryptographically broken, fast but insecure. SHA-256 
   is 256-bit, secure, slower but suitable for cryptographic applications.

Q: How do you handle hash collisions in hash tables?
A: Use chaining (linked lists) or open addressing (linear/quadratic 
   probing, double hashing). Choice depends on load factor and performance needs.

Q: Why do we salt passwords before hashing?
A: Salting prevents rainbow table attacks and ensures unique hashes 
   for identical passwords. Each password gets a unique random salt.

Q: What's the ideal load factor for a hash table?
A: 0.7-0.8 for most implementations. Below 0.7 wastes space, above 0.8 
   increases collision probability and degrades performance.

Q: How does consistent hashing work?
A: Maps keys and nodes to a hash ring. Keys are assigned to the next 
   clockwise node. Adding/removing nodes only affects adjacent keys.

Q: What's the difference between HMAC and regular hashing?
A: HMAC uses a secret key for authentication and integrity, while 
   regular hashing is for data integrity only. HMAC prevents tampering.

Q: How do you choose between bcrypt, scrypt, and Argon2?
A: Argon2 is newest and most secure. bcrypt is widely supported. 
   scrypt is memory-hard. Choose based on security needs and constraints.

Q: What's the birthday paradox in hash collisions?
A: For n-bit hash, collisions become likely after 2^(n/2) attempts, 
   not 2^n. This is why SHA-256 provides 128-bit security, not 256-bit.

Q: How do you implement a hash table with good performance?
A: Choose appropriate hash function, handle collisions efficiently, 
   maintain optimal load factor, implement dynamic resizing.

Q: What's the difference between cryptographic and non-cryptographic hashes?
A: Cryptographic hashes are designed for security (collision resistance, 
   pre-image resistance). Non-cryptographic prioritize speed for data structures.</code></pre>
    </div>

    <h3>Key Takeaways</h3>
    <ul>
      <li><strong>Hash Functions:</strong> One-way, deterministic, fixed output size</li>
      <li><strong>Collision Handling:</strong> Chaining vs open addressing trade-offs</li>
      <li><strong>Load Factor:</strong> Keep between 0.7-0.8 for optimal performance</li>
      <li><strong>Password Security:</strong> Use salt + strong algorithms (Argon2, bcrypt)</li>
      <li><strong>Cryptographic Hashes:</strong> SHA-256+ for security, avoid MD5/SHA-1</li>
      <li><strong>Performance:</strong> O(1) average case, O(n) worst case</li>
      <li><strong>Security:</strong> Timing attacks, rainbow tables, proper implementation</li>
    </ul>

    <h3>References</h3>
    <ul>
      <li><a href="https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf" target="_blank">NIST SHA-2 Standard</a></li>
      <li><a href="https://tools.ietf.org/html/rfc2104" target="_blank">RFC 2104: HMAC</a></li>
      <li><a href="https://github.com/P-H-C/phc-winner-argon2" target="_blank">Argon2 Specification</a></li>
      <li><a href="https://csrc.nist.gov/publications/detail/sp/800-132/final" target="_blank">NIST Password Hashing Guidelines</a></li>
      <li><a href="https://en.wikipedia.org/wiki/Hash_table" target="_blank">Hash Table Algorithms</a></li>
      <li><a href="https://owasp.org/www-project-cheat-sheets/cheatsheets/Password_Storage_Cheat_Sheet.html" target="_blank">OWASP Password Storage</a></li>
    </ul>
  `
}; 