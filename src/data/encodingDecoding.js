export const encodingDecoding = {
  id: 'encoding-decoding',
  title: 'Encoding and Decoding',
  content: `
    <h2>Encoding and Decoding</h2>
    <p>Encoding is used to represent data in a specific format that is suitable for a particular purpose, such as storage, transmission, or presentation. Encoding and Decoding are similar concepts to serialization and deserialization. However, serialization and deserialization are commonly used in software development to convert complex data structures or objects into a linear format.</p>

    <h3>Core Concepts</h3>
    
    <h4>Encoding vs Serialization</h4>
    <ul>
      <li><strong>Encoding:</strong> Transform data into a specific format (character encoding, data representation)</li>
      <li><strong>Serialization:</strong> Convert objects/data structures into a storable/transmittable format</li>
      <li><strong>Scope:</strong> Encoding is broader, serialization is a type of encoding</li>
      <li><strong>Purpose:</strong> Encoding focuses on representation, serialization on object persistence</li>
    </ul>

    <h3>Encoding Algorithms</h3>
    
    <h4>Base64 Encoding/Decoding</h4>
    <p>Base64 is a binary-to-text encoding scheme that represents binary data in ASCII string format using 64 printable characters.</p>
    
    <ul>
      <li><strong>Character Set:</strong> A-Z, a-z, 0-9, +, /</li>
      <li><strong>Padding:</strong> = character for alignment</li>
      <li><strong>Size Increase:</strong> ~33% larger than original</li>
      <li><strong>Use Cases:</strong> Email attachments, data URLs, API tokens</li>
    </ul>

    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Base64 Encoding Example
Original: Hello World
Base64: SGVsbG8gV29ybGQ=

// How it works:
1. Convert to binary: 01001000 01100101 01101100 ...
2. Group into 6-bit chunks: 010010 000110 0101...
3. Map to Base64 characters: S G V s ...
4. Add padding if needed: =</code></pre>
    </div>

    <h4>UTF-8 Encoding/Decoding</h4>
    <p>UTF-8 is a variable-width character encoding for Unicode, using 1 to 4 bytes per character.</p>
    
    <ul>
      <li><strong>Compatibility:</strong> Backward compatible with ASCII</li>
      <li><strong>Efficiency:</strong> 1 byte for ASCII characters</li>
      <li><strong>Coverage:</strong> Supports all Unicode characters</li>
      <li><strong>Prevalence:</strong> Most common encoding on the web</li>
    </ul>

    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// UTF-8 Encoding Rules
ASCII (0-127):          0xxxxxxx                    (1 byte)
Extended (128-2047):    110xxxxx 10xxxxxx          (2 bytes)
BMP (2048-65535):       1110xxxx 10xxxxxx 10xxxxxx (3 bytes)
Supplementary:          11110xxx 10xxxxxx 10xxxxxx 10xxxxxx (4 bytes)

Examples:
'A' (U+0041):    01000001                    → 0x41
'€' (U+20AC):    11100010 10000010 10101100 → 0xE282AC
'😀' (U+1F600):  11110000 10011111 10011000 10000000 → 0xF09F9880</code></pre>
    </div>

    <h4>UTF-16 Encoding/Decoding</h4>
    <p>UTF-16 uses 16-bit code units, with surrogate pairs for characters outside the Basic Multilingual Plane.</p>
    
    <ul>
      <li><strong>Fixed Width:</strong> 2 bytes for BMP characters</li>
      <li><strong>Surrogate Pairs:</strong> 4 bytes for supplementary characters</li>
      <li><strong>Byte Order:</strong> Big-endian (BE) or Little-endian (LE)</li>
      <li><strong>Use Cases:</strong> Windows APIs, Java strings, JavaScript</li>
    </ul>

    <h3>Common Encoding Schemes</h3>
    
    <h4>URL Encoding (Percent Encoding)</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// URL Encoding Examples
Space:       %20
Ampersand:   %26
Question:    %3F
Plus:        %2B

Original: Hello World & Friends?
Encoded:  Hello%20World%20%26%20Friends%3F

// JavaScript
encodeURIComponent("Hello World & Friends?")
// "Hello%20World%20%26%20Friends%3F"</code></pre>
    </div>

    <h4>HTML Entity Encoding</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// HTML Entity Encoding
< :  &lt;
> :  &gt;
& :  &amp;
" :  &quot;
' :  &#39; or &apos;

Original: <script>alert("XSS")</script>
Encoded:  &lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;</code></pre>
    </div>

    <h4>Hex Encoding</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Hexadecimal Encoding
Original: Hello
ASCII:    72 101 108 108 111
Hex:      48 65 6C 6C 6F
String:   "48656C6C6F"

// Use cases:
- Color codes: #FF5733
- MAC addresses: 00:1B:44:11:3A:B7
- Binary data representation</code></pre>
    </div>

    <h3>Encoding Detection and Conversion</h3>
    
    <h4>Character Set Detection</h4>
    <ul>
      <li><strong>BOM (Byte Order Mark):</strong> Identifies encoding and byte order</li>
      <li><strong>Heuristic Detection:</strong> Statistical analysis of byte patterns</li>
      <li><strong>Meta Information:</strong> HTTP headers, XML declarations</li>
      <li><strong>Libraries:</strong> chardet (Python), jschardet (JavaScript)</li>
    </ul>

    <h4>Common BOMs</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>UTF-8:      EF BB BF
UTF-16 BE:  FE FF
UTF-16 LE:  FF FE
UTF-32 BE:  00 00 FE FF
UTF-32 LE:  FF FE 00 00</code></pre>
    </div>

    <h3>Practical Examples</h3>
    
    <h4>Multi-Language Examples</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Python
import base64
# Base64 encoding
encoded = base64.b64encode(b"Hello World")
decoded = base64.b64decode(encoded)

# UTF-8 encoding
text = "Hello 世界"
utf8_bytes = text.encode('utf-8')
decoded_text = utf8_bytes.decode('utf-8')

// JavaScript
// Base64
const encoded = btoa("Hello World");
const decoded = atob(encoded);

// UTF-8 with TextEncoder/TextDecoder
const encoder = new TextEncoder();
const decoder = new TextDecoder();
const bytes = encoder.encode("Hello 世界");
const text = decoder.decode(bytes);

// Java
import java.util.Base64;
import java.nio.charset.StandardCharsets;

// Base64
String encoded = Base64.getEncoder().encodeToString("Hello".getBytes());
byte[] decoded = Base64.getDecoder().decode(encoded);

// UTF-8
byte[] utf8Bytes = "Hello 世界".getBytes(StandardCharsets.UTF_8);
String text = new String(utf8Bytes, StandardCharsets.UTF_8);</code></pre>
    </div>

    <h3>Common Pitfalls</h3>
    
    <h4>Encoding Errors</h4>
    <ul>
      <li><strong>Mojibake:</strong> Garbled text from wrong encoding</li>
      <li><strong>Replacement Character (�):</strong> Invalid byte sequences</li>
      <li><strong>Double Encoding:</strong> Encoding already encoded data</li>
      <li><strong>BOM Issues:</strong> Unexpected bytes at file start</li>
    </ul>

    <h4>Security Considerations</h4>
    <ul>
      <li><strong>Injection Attacks:</strong> Improper encoding in SQL/HTML</li>
      <li><strong>Path Traversal:</strong> URL encoding bypasses</li>
      <li><strong>Homograph Attacks:</strong> Similar-looking characters</li>
      <li><strong>Encoding Smuggling:</strong> Mixed encoding exploitation</li>
    </ul>

    <h3>Best Practices</h3>
    
    <h4>General Guidelines</h4>
    <ul>
      <li><strong>Use UTF-8:</strong> Default for new applications</li>
      <li><strong>Specify Encoding:</strong> Always declare encoding explicitly</li>
      <li><strong>Validate Input:</strong> Check for valid sequences</li>
      <li><strong>Handle Errors:</strong> Define error handling strategy</li>
      <li><strong>Test Thoroughly:</strong> Use various character sets</li>
    </ul>

    <h4>Web Development</h4>
    <ul>
      <li><strong>HTTP Headers:</strong> Content-Type: text/html; charset=utf-8</li>
      <li><strong>HTML Meta:</strong> &lt;meta charset="utf-8"&gt;</li>
      <li><strong>Form Encoding:</strong> accept-charset="utf-8"</li>
      <li><strong>URL Encoding:</strong> Use proper encoding functions</li>
    </ul>

    <h3>Performance Considerations</h3>
    
    <h4>Optimization Tips</h4>
    <ul>
      <li><strong>Streaming:</strong> Process large files incrementally</li>
      <li><strong>Caching:</strong> Cache encoding detection results</li>
      <li><strong>Native Functions:</strong> Use built-in encoding functions</li>
      <li><strong>Batch Processing:</strong> Encode/decode in chunks</li>
      <li><strong>Avoid Conversions:</strong> Minimize encoding changes</li>
    </ul>

    <h3>Real-World Applications</h3>
    <ul>
      <li><strong>Email Systems:</strong> MIME encoding for attachments</li>
      <li><strong>Web APIs:</strong> JSON with UTF-8 encoding</li>
      <li><strong>Databases:</strong> Character set configuration</li>
      <li><strong>File Systems:</strong> Filename encoding</li>
      <li><strong>Network Protocols:</strong> Binary to text encoding</li>
      <li><strong>Cryptography:</strong> Base64 for keys and certificates</li>
    </ul>
  `
}; 