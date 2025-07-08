export const localityOfReference = {
  id: 'locality-of-reference',
  title: 'Locality of Reference',
  content: `
<p>The principle that programs tend to access data and instructions that are near previously accessed data and instructions, both in time and space. This principle is fundamental to the design of cache systems and memory hierarchies.</p>
    
    <h3>Types of Locality</h3>
    
    <h4>1. Temporal Locality</h4>
    <ul>
      <li><strong>Definition:</strong> Recently accessed data is likely to be accessed again soon</li>
      <li><strong>Examples:</strong> Loop variables, frequently called functions, recently used database records</li>
      <li><strong>Cache Strategy:</strong> Keep recently used items in cache</li>
      <li><strong>Time Window:</strong> Effectiveness decreases over time</li>
    </ul>

    <h4>2. Spatial Locality</h4>
    <ul>
      <li><strong>Definition:</strong> Data near recently accessed data is likely to be accessed soon</li>
      <li><strong>Examples:</strong> Array elements, sequential file reads, adjacent memory addresses</li>
      <li><strong>Cache Strategy:</strong> Prefetch neighboring data blocks</li>
      <li><strong>Block Size:</strong> Optimal block size balances hit rate and overhead</li>
    </ul>

    <h3>Applications in Computer Systems</h3>
    
    <h4>CPU Cache Design</h4>
    <ul>
      <li><strong>Cache Lines:</strong> Load entire cache lines (64-128 bytes) for spatial locality</li>
      <li><strong>LRU Policy:</strong> Least Recently Used eviction for temporal locality</li>
      <li><strong>Prefetching:</strong> Hardware prefetchers predict access patterns</li>
      <li><strong>Cache Hierarchy:</strong> L1, L2, L3 caches with different sizes and speeds</li>
    </ul>

    <h4>Virtual Memory</h4>
    <ul>
      <li><strong>Page Replacement:</strong> LRU and other algorithms based on temporal locality</li>
      <li><strong>Working Set:</strong> Set of pages referenced in recent time window</li>
      <li><strong>Thrashing:</strong> Occurs when working set exceeds available memory</li>
      <li><strong>Page Size:</strong> Larger pages improve spatial locality</li>
    </ul>

    <h4>Database Systems</h4>
    <ul>
      <li><strong>Buffer Pool:</strong> Keep frequently accessed pages in memory</li>
      <li><strong>Clustering:</strong> Store related records physically close together</li>
      <li><strong>Index Design:</strong> B+ trees exploit spatial locality for range queries</li>
      <li><strong>Query Optimization:</strong> Minimize random I/O operations</li>
    </ul>

    <h3>Programming Patterns</h3>
    
    <h4>Good Locality Examples</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Good spatial locality - sequential access
for (int i = 0; i < n; i++) {
    array[i] = array[i] * 2;
}

// Good temporal locality - reuse variables
int sum = 0;
for (int i = 0; i < n; i++) {
    sum += array[i];  // 'sum' reused frequently
}</code></pre>
    </div>

    <h4>Poor Locality Examples</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Poor spatial locality - random access
for (int i = 0; i < n; i++) {
    array[random(n)] = value;
}

// Poor spatial locality - column-wise access of row-major array
for (int j = 0; j < cols; j++) {
    for (int i = 0; i < rows; i++) {
        matrix[i][j] = value;  // Non-sequential memory access
    }
}</code></pre>
    </div>

    <h3>Database Locality Optimizations</h3>
    
    <h4>Physical Design</h4>
    <ul>
      <li><strong>Clustering Index:</strong> Order table data by frequently queried columns</li>
      <li><strong>Partitioning:</strong> Divide large tables into smaller, related partitions</li>
      <li><strong>Denormalization:</strong> Store related data together to reduce joins</li>
      <li><strong>Compression:</strong> Reduce I/O by compressing related data</li>
    </ul>

    <h4>Query Patterns</h4>
    <ul>
      <li><strong>Range Queries:</strong> Benefit from spatial locality in indexes</li>
      <li><strong>Sequential Scans:</strong> Efficient when large portions of table accessed</li>
      <li><strong>Index Scans:</strong> Leverage spatial locality in B+ tree leaf pages</li>
      <li><strong>Join Algorithms:</strong> Hash joins and sort-merge joins optimize locality</li>
    </ul>

    <h3>Measuring Locality</h3>
    
    <h4>Metrics</h4>
    <ul>
      <li><strong>Cache Hit Ratio:</strong> Percentage of memory accesses served by cache</li>
      <li><strong>Working Set Size:</strong> Number of unique pages accessed in time window</li>
      <li><strong>Reuse Distance:</strong> Number of unique accesses between repeated accesses</li>
      <li><strong>Miss Rate:</strong> Frequency of cache misses</li>
    </ul>

    <h4>Profiling Tools</h4>
    <ul>
      <li><strong>CPU Profilers:</strong> Intel VTune, perf, cachegrind</li>
      <li><strong>Database Tools:</strong> EXPLAIN ANALYZE, buffer pool statistics</li>
      <li><strong>Application Metrics:</strong> Custom instrumentation for access patterns</li>
    </ul>

    <h3>Optimization Strategies</h3>
    
    <h4>Data Structure Design</h4>
    <ul>
      <li><strong>Array of Structures vs Structure of Arrays:</strong> Choose based on access patterns</li>
      <li><strong>Cache-Oblivious Algorithms:</strong> Automatically adapt to cache hierarchy</li>
      <li><strong>Data Layout:</strong> Arrange data to match access patterns</li>
      <li><strong>Prefetching:</strong> Explicitly prefetch data when patterns are predictable</li>
    </ul>

    <h4>Algorithm Design</h4>
    <ul>
      <li><strong>Blocking/Tiling:</strong> Process data in cache-sized chunks</li>
      <li><strong>Loop Optimization:</strong> Reorder loops to improve spatial locality</li>
      <li><strong>Data Reuse:</strong> Maximize reuse of loaded data before moving to new data</li>
    </ul>

    <h3>Real-World Impact</h3>
    <ul>
      <li><strong>Performance:</strong> Good locality can improve performance by 10-100x</li>
      <li><strong>Energy Efficiency:</strong> Cache hits consume much less energy than memory accesses</li>
      <li><strong>Scalability:</strong> Better locality reduces memory bandwidth requirements</li>
      <li><strong>Cost:</strong> Reduces need for expensive high-speed memory</li>
    </ul>

    <div class="info-note">
      <strong>💡 Key Insight:</strong>
      <p>Understanding and optimizing for locality of reference is crucial for high-performance systems. Modern processors and databases are designed around this principle, making it essential for system designers and developers.</p>
    </div>

    <div class="reference-links">
      <h4>🔗 Learn More:</h4>
      <ul>
        <li><a href="https://en.wikipedia.org/wiki/Locality_of_reference" target="_blank">Locality of Reference - Wikipedia</a></li>
        <li><a href="https://www.geeksforgeeks.org/locality-of-reference-and-cache-operation-in-cache-memory/" target="_blank">Locality in Cache Memory</a></li>
      </ul>
    </div>
`
}; 