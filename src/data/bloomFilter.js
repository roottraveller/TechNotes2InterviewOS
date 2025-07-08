export const bloomFilter = {
  id: 'bloom-filter',
  title: 'Bloom Filter',
  content: `
<p>A Bloom filter is a space-efficient probabilistic data structure designed to test whether an element is a member of a set. It can have false positives but never false negatives, making it useful for applications where approximate membership testing is acceptable.</p>
    
    <h3>What is a Bloom Filter?</h3>
    <ul>
      <li><strong>Definition:</strong> Probabilistic data structure for set membership testing</li>
      <li><strong>Space Efficient:</strong> Uses much less memory than storing actual elements</li>
      <li><strong>False Positives:</strong> May incorrectly report element as present</li>
      <li><strong>No False Negatives:</strong> Never misses an element that was actually added</li>
    </ul>

    <h3>How Bloom Filters Work</h3>
    
    <h4>Structure</h4>
    <ul>
      <li><strong>Bit Array:</strong> Fixed-size array of m bits, initially all set to 0</li>
      <li><strong>Hash Functions:</strong> k independent hash functions</li>
      <li><strong>Hash Range:</strong> Each hash function maps elements to [0, m-1]</li>
      <li><strong>Operations:</strong> Add elements and test membership</li>
    </ul>

    <h4>Operations</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>Bloom Filter Operations:

1. Add Element:
   - Hash element with all k hash functions
   - Set bits at all k positions to 1
   - h1(x), h2(x), ..., hk(x) → set bits[h1(x)] = bits[h2(x)] = ... = 1

2. Test Membership:
   - Hash element with all k hash functions  
   - Check if ALL k positions are set to 1
   - If any bit is 0 → element definitely NOT in set
   - If all bits are 1 → element MIGHT be in set

3. Cannot Remove Elements:
   - Removing would affect other elements
   - Use Counting Bloom Filter for deletions</code></pre>
    </div>

    <h3>Implementation</h3>
    
    <h4>Basic Bloom Filter</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>import java.util.BitSet;
import java.util.List;
import java.util.ArrayList;

public class BloomFilter {
    private BitSet bitSet;
    private int size;           // m: size of bit array
    private int numHashFunctions; // k: number of hash functions
    private int numElements;    // n: number of elements added
    
    public BloomFilter(int expectedElements, double falsePositiveRate) {
        // Calculate optimal size and number of hash functions
        this.size = calculateOptimalSize(expectedElements, falsePositiveRate);
        this.numHashFunctions = calculateOptimalHashFunctions(expectedElements, size);
        this.bitSet = new BitSet(size);
        this.numElements = 0;
        
        System.out.printf("Bloom Filter: size=%d, hash_functions=%d%n", 
                         size, numHashFunctions);
    }
    
    // Calculate optimal bit array size: m = -n*ln(p) / (ln(2)^2)
    private int calculateOptimalSize(int n, double p) {
        return (int) Math.ceil(-n * Math.log(p) / (Math.log(2) * Math.log(2)));
    }
    
    // Calculate optimal number of hash functions: k = (m/n) * ln(2)
    private int calculateOptimalHashFunctions(int n, int m) {
        return (int) Math.round((double) m / n * Math.log(2));
    }
    
    // Add element to the filter
    public void add(String element) {
        for (int i = 0; i < numHashFunctions; i++) {
            int hash = hash(element, i);
            bitSet.set(hash);
        }
        numElements++;
    }
    
    // Test if element might be in the set
    public boolean mightContain(String element) {
        for (int i = 0; i < numHashFunctions; i++) {
            int hash = hash(element, i);
            if (!bitSet.get(hash)) {
                return false; // Definitely not in set
            }
        }
        return true; // Might be in set
    }
    
    // Generate k different hash values for an element
    private int hash(String element, int hashNumber) {
        // Use double hashing: h1(x) + i*h2(x)
        int hash1 = element.hashCode();
        int hash2 = hash1 >>> 16; // Use upper bits for second hash
        
        int combinedHash = hash1 + hashNumber * hash2;
        
        // Ensure positive and within range
        return Math.abs(combinedHash) % size;
    }
    
    // Calculate current false positive probability
    public double getCurrentFalsePositiveRate() {
        double ratio = (double) bitSet.cardinality() / size;
        return Math.pow(ratio, numHashFunctions);
    }
    
    // Get filter statistics
    public void printStats() {
        int setBits = bitSet.cardinality();
        double fillRatio = (double) setBits / size;
        double expectedFPR = getCurrentFalsePositiveRate();
        
        System.out.println("=== Bloom Filter Statistics ===");
        System.out.printf("Size: %d bits%n", size);
        System.out.printf("Hash functions: %d%n", numHashFunctions);
        System.out.printf("Elements added: %d%n", numElements);
        System.out.printf("Bits set: %d (%.2f%%)%n", setBits, fillRatio * 100);
        System.out.printf("Expected false positive rate: %.4f%n", expectedFPR);
    }
}</code></pre>
    </div>

    <h4>Counting Bloom Filter</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>public class CountingBloomFilter {
    private int[] counters;
    private int size;
    private int numHashFunctions;
    private int numElements;
    
    public CountingBloomFilter(int expectedElements, double falsePositiveRate) {
        this.size = calculateOptimalSize(expectedElements, falsePositiveRate);
        this.numHashFunctions = calculateOptimalHashFunctions(expectedElements, size);
        this.counters = new int[size];
        this.numElements = 0;
    }
    
    public void add(String element) {
        for (int i = 0; i < numHashFunctions; i++) {
            int hash = hash(element, i);
            counters[hash]++;
        }
        numElements++;
    }
    
    public boolean remove(String element) {
        // First check if element might be present
        if (!mightContain(element)) {
            return false; // Element definitely not present
        }
        
        // Decrement counters
        for (int i = 0; i < numHashFunctions; i++) {
            int hash = hash(element, i);
            if (counters[hash] > 0) {
                counters[hash]--;
            }
        }
        numElements--;
        return true;
    }
    
    public boolean mightContain(String element) {
        for (int i = 0; i < numHashFunctions; i++) {
            int hash = hash(element, i);
            if (counters[hash] == 0) {
                return false;
            }
        }
        return true;
    }
    
    private int hash(String element, int hashNumber) {
        int hash1 = element.hashCode();
        int hash2 = hash1 >>> 16;
        int combinedHash = hash1 + hashNumber * hash2;
        return Math.abs(combinedHash) % size;
    }
    
    private int calculateOptimalSize(int n, double p) {
        return (int) Math.ceil(-n * Math.log(p) / (Math.log(2) * Math.log(2)));
    }
    
    private int calculateOptimalHashFunctions(int n, int m) {
        return (int) Math.round((double) m / n * Math.log(2));
    }
}</code></pre>
    </div>

    <h3>Practical Examples</h3>
    
    <h4>Web Crawler URL Deduplication</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>public class WebCrawler {
    private BloomFilter visitedUrls;
    private Set<String> confirmedUrls; // For handling false positives
    private Queue<String> urlQueue;
    
    public WebCrawler(int expectedUrls) {
        this.visitedUrls = new BloomFilter(expectedUrls, 0.01); // 1% FPR
        this.confirmedUrls = new HashSet<>();
        this.urlQueue = new LinkedList<>();
    }
    
    public void addUrl(String url) {
        if (!hasVisited(url)) {
            urlQueue.offer(url);
            System.out.println("Added URL to queue: " + url);
        } else {
            System.out.println("URL already processed: " + url);
        }
    }
    
    private boolean hasVisited(String url) {
        // First check Bloom filter (fast)
        if (!visitedUrls.mightContain(url)) {
            return false; // Definitely not visited
        }
        
        // Bloom filter says "might be present", check actual set
        return confirmedUrls.contains(url);
    }
    
    public String crawlNext() {
        if (urlQueue.isEmpty()) {
            return null;
        }
        
        String url = urlQueue.poll();
        
        // Mark as visited
        visitedUrls.add(url);
        confirmedUrls.add(url);
        
        System.out.println("Crawling: " + url);
        
        // Simulate discovering new URLs
        List<String> newUrls = discoverUrls(url);
        for (String newUrl : newUrls) {
            addUrl(newUrl);
        }
        
        return url;
    }
    
    private List<String> discoverUrls(String baseUrl) {
        // Simulate URL discovery
        List<String> urls = new ArrayList<>();
        for (int i = 1; i <= 3; i++) {
            urls.add(baseUrl + "/page" + i);
        }
        return urls;
    }
    
    public void printCrawlerStats() {
        System.out.println("\n=== Crawler Statistics ===");
        System.out.println("URLs in queue: " + urlQueue.size());
        System.out.println("Confirmed visited URLs: " + confirmedUrls.size());
        visitedUrls.printStats();
    }
}</code></pre>
    </div>

    <h4>Database Query Optimization</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>public class DatabaseQueryOptimizer {
    private BloomFilter existingKeys;
    private Database database;
    
    public DatabaseQueryOptimizer(Database db, int expectedKeys) {
        this.database = db;
        this.existingKeys = new BloomFilter(expectedKeys, 0.05); // 5% FPR
        
        // Populate Bloom filter with existing keys
        initializeBloomFilter();
    }
    
    private void initializeBloomFilter() {
        System.out.println("Initializing Bloom filter with existing keys...");
        
        // In practice, this would scan the database
        List<String> keys = database.getAllKeys();
        for (String key : keys) {
            existingKeys.add(key);
        }
        
        System.out.printf("Added %d keys to Bloom filter%n", keys.size());
    }
    
    public QueryResult optimizedQuery(String key) {
        long startTime = System.nanoTime();
        
        // Fast check with Bloom filter
        if (!existingKeys.mightContain(key)) {
            // Key definitely doesn't exist, avoid expensive DB query
            long duration = System.nanoTime() - startTime;
            
            return new QueryResult(null, false, duration, "Bloom filter skip");
        }
        
        // Key might exist, perform actual database query
        String value = database.get(key);
        long duration = System.nanoTime() - startTime;
        
        boolean found = (value != null);
        String method = found ? "Database hit" : "False positive";
        
        return new QueryResult(value, found, duration, method);
    }
    
    public void addKey(String key, String value) {
        database.put(key, value);
        existingKeys.add(key);
    }
    
    // Simulate database operations
    static class Database {
        private Map<String, String> data = new HashMap<>();
        
        public String get(String key) {
            // Simulate database latency
            try {
                Thread.sleep(1); // 1ms latency
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            return data.get(key);
        }
        
        public void put(String key, String value) {
            data.put(key, value);
        }
        
        public List<String> getAllKeys() {
            return new ArrayList<>(data.keySet());
        }
    }
    
    static class QueryResult {
        public final String value;
        public final boolean found;
        public final long durationNanos;
        public final String method;
        
        public QueryResult(String value, boolean found, long duration, String method) {
            this.value = value;
            this.found = found;
            this.durationNanos = duration;
            this.method = method;
        }
        
        @Override
        public String toString() {
            return String.format("Result: %s, Found: %s, Time: %.2f μs, Method: %s",
                value, found, durationNanos / 1000.0, method);
        }
    }
}</code></pre>
    </div>

    <h3>Advanced Implementations</h3>
    
    <h4>Scalable Bloom Filter</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>public class ScalableBloomFilter {
    private List<BloomFilter> filters;
    private double targetFalsePositiveRate;
    private int currentCapacity;
    private int elementsAdded;
    
    public ScalableBloomFilter(double targetFPR) {
        this.filters = new ArrayList<>();
        this.targetFalsePositiveRate = targetFPR;
        this.currentCapacity = 1000; // Start small
        this.elementsAdded = 0;
        
        // Create first filter
        addNewFilter();
    }
    
    private void addNewFilter() {
        // Each new filter has tighter FPR to maintain overall target
        double filterFPR = targetFalsePositiveRate / Math.pow(2, filters.size() + 1);
        BloomFilter newFilter = new BloomFilter(currentCapacity, filterFPR);
        filters.add(newFilter);
        
        System.out.printf("Added new filter #%d (capacity: %d, FPR: %.6f)%n",
                         filters.size(), currentCapacity, filterFPR);
        
        // Double capacity for next filter
        currentCapacity *= 2;
    }
    
    public void add(String element) {
        BloomFilter currentFilter = filters.get(filters.size() - 1);
        
        // Check if current filter is at capacity
        if (elementsAdded >= currentCapacity / 2) {
            addNewFilter();
            currentFilter = filters.get(filters.size() - 1);
            elementsAdded = 0;
        }
        
        currentFilter.add(element);
        elementsAdded++;
    }
    
    public boolean mightContain(String element) {
        // Check all filters (element could be in any of them)
        for (BloomFilter filter : filters) {
            if (filter.mightContain(element)) {
                return true;
            }
        }
        return false;
    }
    
    public double getCurrentFalsePositiveRate() {
        // Calculate combined FPR across all filters
        double combinedFPR = 0.0;
        for (BloomFilter filter : filters) {
            combinedFPR += filter.getCurrentFalsePositiveRate();
        }
        return Math.min(combinedFPR, 1.0);
    }
    
    public void printStats() {
        System.out.println("=== Scalable Bloom Filter Statistics ===");
        System.out.printf("Number of filters: %d%n", filters.size());
        System.out.printf("Target FPR: %.6f%n", targetFalsePositiveRate);
        System.out.printf("Current FPR: %.6f%n", getCurrentFalsePositiveRate());
        
        for (int i = 0; i < filters.size(); i++) {
            System.out.printf("Filter %d:%n", i + 1);
            filters.get(i).printStats();
        }
    }
}</code></pre>
    </div>

    <h3>Performance Analysis</h3>
    
    <h4>Time Complexity</h4>
    <ul>
      <li><strong>Add Operation:</strong> O(k) where k is number of hash functions</li>
      <li><strong>Lookup Operation:</strong> O(k) where k is number of hash functions</li>
      <li><strong>Space:</strong> O(m) where m is size of bit array</li>
      <li><strong>Independent of n:</strong> Performance doesn't degrade with number of elements</li>
    </ul>

    <h4>False Positive Rate</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Mathematical analysis of false positive rate
public class BloomFilterAnalysis {
    
    public static void analyzeFalsePositiveRate() {
        System.out.println("=== Bloom Filter False Positive Analysis ===");
        
        int[] elementCounts = {1000, 5000, 10000, 50000};
        double[] targetFPRs = {0.01, 0.05, 0.1};
        
        for (int n : elementCounts) {
            for (double targetFPR : targetFPRs) {
                analyzeConfiguration(n, targetFPR);
            }
        }
    }
    
    private static void analyzeConfiguration(int n, double targetFPR) {
        // Calculate optimal parameters
        int m = (int) Math.ceil(-n * Math.log(targetFPR) / (Math.log(2) * Math.log(2)));
        int k = (int) Math.round((double) m / n * Math.log(2));
        
        // Calculate actual FPR with optimal parameters
        double actualFPR = Math.pow(1 - Math.exp(-k * (double) n / m), k);
        
        // Calculate memory usage
        double memoryKB = m / 8.0 / 1024.0;
        
        System.out.printf("n=%d, target_FPR=%.3f: m=%d, k=%d, actual_FPR=%.4f, memory=%.2f KB%n",
                         n, targetFPR, m, k, actualFPR, memoryKB);
    }
    
    public static void compareWithHashSet() {
        System.out.println("\n=== Memory Comparison: Bloom Filter vs HashSet ===");
        
        int[] elementCounts = {1000, 10000, 100000, 1000000};
        
        for (int n : elementCounts) {
            // Bloom filter memory (1% FPR)
            int m = (int) Math.ceil(-n * Math.log(0.01) / (Math.log(2) * Math.log(2)));
            double bloomMemoryKB = m / 8.0 / 1024.0;
            
            // HashSet memory (assuming 32 bytes per string + overhead)
            double hashSetMemoryKB = n * 64 / 1024.0; // Conservative estimate
            
            double spaceSaving = (1 - bloomMemoryKB / hashSetMemoryKB) * 100;
            
            System.out.printf("n=%d: Bloom=%.2f KB, HashSet=%.2f KB, Saving=%.1f%%%n",
                             n, bloomMemoryKB, hashSetMemoryKB, spaceSaving);
        }
    }
}</code></pre>
    </div>

    <h3>Use Cases and Applications</h3>
    
    <h4>Common Applications</h4>
    <ul>
      <li><strong>Web Crawling:</strong> Avoid revisiting URLs</li>
      <li><strong>Database Systems:</strong> Reduce disk I/O for non-existent keys</li>
      <li><strong>Caching:</strong> Quick negative cache lookup</li>
      <li><strong>Network Security:</strong> Malicious URL detection</li>
      <li><strong>Distributed Systems:</strong> Reduce network calls</li>
      <li><strong>CDN:</strong> Cache miss reduction</li>
    </ul>

    <h4>When to Use Bloom Filters</h4>
    <ul>
      <li><strong>Large Datasets:</strong> When memory is constrained</li>
      <li><strong>Acceptable False Positives:</strong> When false positives are tolerable</li>
      <li><strong>Fast Negative Lookups:</strong> When quick "definitely not present" answers are valuable</li>
      <li><strong>Read-Heavy Workloads:</strong> More lookups than insertions</li>
    </ul>

    <h4>When NOT to Use Bloom Filters</h4>
    <ul>
      <li><strong>Need Exact Results:</strong> When false positives are unacceptable</li>
      <li><strong>Frequent Deletions:</strong> Standard Bloom filters don't support removal</li>
      <li><strong>Small Datasets:</strong> Overhead may not be worth it</li>
      <li><strong>Need Element Retrieval:</strong> Bloom filters only test membership</li>
    </ul>

    <div class="info-note">
      <strong>💡 Key Insight:</strong>
      <p>Bloom filters excel in scenarios where you need fast, memory-efficient approximate membership testing. They're particularly valuable in distributed systems and databases where avoiding expensive operations (like network calls or disk I/O) for non-existent items provides significant performance benefits.</p>
    </div>

    <div class="reference-links">
      <h4>🔗 Learn More:</h4>
      <ul>
        <li><a href="https://en.wikipedia.org/wiki/Bloom_filter" target="_blank">Bloom Filter - Wikipedia</a></li>
        <li><a href="https://brilliant.org/wiki/bloom-filter/" target="_blank">Bloom Filters - Brilliant</a></li>
      </ul>
    </div>
`
}; 