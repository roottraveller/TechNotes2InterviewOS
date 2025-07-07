export const compressionDecompression = {
  id: 'compression-decompression',
  title: 'Compression and Decompression',
  content: `
    <h2>Compression and Decompression</h2>
    <p>Before serialization, data can be compressed to reduce its size, which can lead to more efficient transmission over the network or storage in files or databases. Compression algorithms reduce data size by identifying and eliminating redundancy.</p>

    <h3>Core Concepts</h3>
    
    <h4>Types of Compression</h4>
    <ul>
      <li><strong>Lossless:</strong> Original data can be perfectly reconstructed</li>
      <li><strong>Lossy:</strong> Some data is lost but often imperceptible (images, audio)</li>
      <li><strong>Real-time:</strong> Fast enough for streaming applications</li>
      <li><strong>Archival:</strong> Maximum compression for long-term storage</li>
    </ul>

    <h3>Compression Algorithms</h3>
    
    <h4>Huffman Coding</h4>
    <p>A lossless data compression algorithm that uses variable-length codes for different characters based on their frequency of occurrence.</p>
    
    <ul>
      <li><strong>Type:</strong> Lossless, entropy encoding</li>
      <li><strong>Principle:</strong> Frequent characters get shorter codes</li>
      <li><strong>Process:</strong> Build frequency table → Create binary tree → Assign codes</li>
      <li><strong>Efficiency:</strong> Optimal for symbol-by-symbol encoding</li>
    </ul>

    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Huffman Coding Example
Input: "AABBBCCCC"
Frequency: A:2, B:3, C:4

Huffman Tree:
       (9)
      /   \\
    (5)    C:4
   /  \\
  A:2  B:3

Codes:
C: 1
B: 01
A: 00

Encoded: 00 00 01 01 01 1 1 1 1
Original: 9 bytes × 8 = 72 bits
Compressed: 13 bits
Compression ratio: 82%</code></pre>
    </div>

    <h4>Run-Length Encoding (RLE)</h4>
    <p>A simple compression algorithm that replaces sequences of repeated data with a count and a single value.</p>
    
    <ul>
      <li><strong>Type:</strong> Lossless</li>
      <li><strong>Best for:</strong> Data with many consecutive repeated values</li>
      <li><strong>Worst case:</strong> Can increase size if no repetition</li>
      <li><strong>Applications:</strong> Fax machines, simple graphics</li>
    </ul>

    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// RLE Example
Original:  AAABBBBBCCCCCC
Encoded:   3A5B6C

Original:  ABCDEF
Encoded:   1A1B1C1D1E1F (worse than original!)

// Better RLE with escape sequences
Original:  AAABCDDDDD
Encoded:   3ABC5D (literals not counted)</code></pre>
    </div>

    <h3>Compression Libraries</h3>
    
    <h4>Gzip</h4>
    <p>Widely used compression library based on DEFLATE algorithm (LZ77 + Huffman coding).</p>
    
    <ul>
      <li><strong>Algorithm:</strong> DEFLATE (LZ77 + Huffman)</li>
      <li><strong>Compression Level:</strong> 1-9 (speed vs ratio)</li>
      <li><strong>File Extension:</strong> .gz</li>
      <li><strong>Use Cases:</strong> HTTP compression, file archiving</li>
      <li><strong>Typical Ratio:</strong> 60-70% for text</li>
    </ul>

    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Using Gzip in different languages

# Python
import gzip
# Compress
with gzip.open('file.txt.gz', 'wb') as f:
    f.write(b'Hello World' * 1000)

# Node.js
const zlib = require('zlib');
const gzip = zlib.createGzip();
fs.createReadStream('input.txt')
  .pipe(gzip)
  .pipe(fs.createWriteStream('output.txt.gz'));

# Command line
gzip file.txt          # Creates file.txt.gz
gzip -d file.txt.gz    # Decompress
gzip -9 file.txt       # Maximum compression</code></pre>
    </div>

    <h4>Snappy</h4>
    <p>Fast compression library by Google, optimized for speed over compression ratio.</p>
    
    <ul>
      <li><strong>Focus:</strong> Speed over compression ratio</li>
      <li><strong>Compression Speed:</strong> >250 MB/s</li>
      <li><strong>Decompression Speed:</strong> >500 MB/s</li>
      <li><strong>Use Cases:</strong> Real-time systems, databases</li>
      <li><strong>Used by:</strong> Cassandra, MongoDB, Hadoop</li>
    </ul>

    <h3>Compression Algorithm Comparison</h3>
    
    <table>
      <thead>
        <tr>
          <th>Algorithm</th>
          <th>Type</th>
          <th>Speed</th>
          <th>Ratio</th>
          <th>Use Cases</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Gzip</td>
          <td>Lossless</td>
          <td>Moderate</td>
          <td>Good</td>
          <td>Web, general purpose</td>
        </tr>
        <tr>
          <td>Snappy</td>
          <td>Lossless</td>
          <td>Very Fast</td>
          <td>Moderate</td>
          <td>Real-time, databases</td>
        </tr>
        <tr>
          <td>LZ4</td>
          <td>Lossless</td>
          <td>Extremely Fast</td>
          <td>Moderate</td>
          <td>Real-time compression</td>
        </tr>
        <tr>
          <td>Brotli</td>
          <td>Lossless</td>
          <td>Slow</td>
          <td>Excellent</td>
          <td>Static web content</td>
        </tr>
        <tr>
          <td>Zstandard</td>
          <td>Lossless</td>
          <td>Fast</td>
          <td>Very Good</td>
          <td>General purpose</td>
        </tr>
        <tr>
          <td>JPEG</td>
          <td>Lossy</td>
          <td>Fast</td>
          <td>Excellent</td>
          <td>Images</td>
        </tr>
        <tr>
          <td>MP3</td>
          <td>Lossy</td>
          <td>Moderate</td>
          <td>Excellent</td>
          <td>Audio</td>
        </tr>
      </tbody>
    </table>

    <h3>Compression in Practice</h3>
    
    <h4>HTTP Compression</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Request header
Accept-Encoding: gzip, deflate, br

// Response header
Content-Encoding: gzip

// Server configuration (Nginx)
gzip on;
gzip_types text/plain application/json application/javascript;
gzip_comp_level 6;
gzip_min_length 1000;</code></pre>
    </div>

    <h4>Database Compression</h4>
    <ul>
      <li><strong>Row Compression:</strong> Compress individual rows</li>
      <li><strong>Page Compression:</strong> Compress data pages</li>
      <li><strong>Column Compression:</strong> Compress columnar data</li>
      <li><strong>Backup Compression:</strong> Compress backup files</li>
    </ul>

    <h3>Choosing Compression</h3>
    
    <h4>Factors to Consider</h4>
    <ul>
      <li><strong>Data Type:</strong> Text compresses better than binary</li>
      <li><strong>Speed Requirements:</strong> Real-time vs batch processing</li>
      <li><strong>Compression Ratio:</strong> Storage savings needed</li>
      <li><strong>CPU Usage:</strong> Compression overhead</li>
      <li><strong>Memory Usage:</strong> Buffer requirements</li>
    </ul>

    <h4>Best Practices</h4>
    <ul>
      <li><strong>Benchmark:</strong> Test with your actual data</li>
      <li><strong>Consider Context:</strong> Network vs storage compression</li>
      <li><strong>Avoid Double Compression:</strong> Don't compress already compressed data</li>
      <li><strong>Stream When Possible:</strong> For large files</li>
      <li><strong>Cache Compressed Data:</strong> Avoid repeated compression</li>
    </ul>

    <h3>Advanced Topics</h3>
    
    <h4>Dictionary Compression</h4>
    <ul>
      <li><strong>Shared Dictionary:</strong> Pre-shared compression dictionary</li>
      <li><strong>Training:</strong> Build dictionary from sample data</li>
      <li><strong>Benefits:</strong> Better compression for similar data</li>
      <li><strong>Examples:</strong> Zstandard dictionary mode</li>
    </ul>

    <h4>Adaptive Compression</h4>
    <ul>
      <li><strong>Dynamic Selection:</strong> Choose algorithm based on data</li>
      <li><strong>Hybrid Approaches:</strong> Combine multiple algorithms</li>
      <li><strong>Content-Aware:</strong> Different algorithms for different content types</li>
    </ul>

    <h3>Common Pitfalls</h3>
    <ul>
      <li><strong>Compression Bombs:</strong> Small compressed files that expand enormously</li>
      <li><strong>CRIME/BREACH:</strong> Security vulnerabilities with HTTPS compression</li>
      <li><strong>Already Compressed:</strong> Compressing JPEG, MP3, etc.</li>
      <li><strong>Small Files:</strong> Overhead may exceed savings</li>
      <li><strong>Random Data:</strong> Cannot be compressed effectively</li>
    </ul>

    <h3>Real-World Applications</h3>
    <ul>
      <li><strong>Web Servers:</strong> Gzip/Brotli for HTML, CSS, JS</li>
      <li><strong>CDNs:</strong> Edge compression for static assets</li>
      <li><strong>Databases:</strong> Transparent compression for storage</li>
      <li><strong>Message Queues:</strong> Compress large messages</li>
      <li><strong>Log Files:</strong> Compress rotated logs</li>
      <li><strong>Backups:</strong> Reduce backup storage costs</li>
      <li><strong>APIs:</strong> Compress JSON/XML responses</li>
    </ul>
  `
}; 