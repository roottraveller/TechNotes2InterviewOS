export const unicodeCharacters = {
  id: 'unicode-characters',
  title: 'Unicode Characters',
  content: `
<p>Unicode is a universal character encoding standard that assigns a unique number to every character across all languages and writing systems. Characters are typically represented in hexadecimal format. The length of a Unicode character representation in bits depends on the encoding scheme used.</p>

    <h3>Unicode Encoding Schemes</h3>
    
    <h4>UTF-8</h4>
    <ul>
      <li><strong>Size:</strong> 8 bits (1 byte) per character for ASCII range</li>
      <li><strong>Range:</strong> U+0000 to U+007F (127/2^8 - 1)</li>
      <li><strong>Variable Length:</strong> 1-4 bytes per character</li>
      <li><strong>Backward Compatible:</strong> With ASCII</li>
      <li><strong>Most Common:</strong> Used on the web (>95% of websites)</li>
    </ul>

    <h4>UTF-16</h4>
    <ul>
      <li><strong>Size:</strong> 16 bits (2 bytes) per character for BMP</li>
      <li><strong>Range:</strong> U+0000 to U+FFFF (65535/2^16−1)</li>
      <li><strong>Variable Length:</strong> 2 or 4 bytes per character</li>
      <li><strong>Used By:</strong> Windows, Java, JavaScript internally</li>
      <li><strong>Surrogate Pairs:</strong> For characters beyond BMP</li>
    </ul>

    <h4>UTF-32</h4>
    <ul>
      <li><strong>Size:</strong> 32 bits (4 bytes) per character</li>
      <li><strong>Range:</strong> U+0000 to U+10FFFF (4294967295/2^32-1)</li>
      <li><strong>Fixed Length:</strong> Always 4 bytes</li>
      <li><strong>Simple:</strong> Direct Unicode code point representation</li>
      <li><strong>Space Inefficient:</strong> Uses more memory</li>
    </ul>

    <h3>Character Representation</h3>
    
    <h4>Code Points</h4>
    <ul>
      <li>Unique number assigned to each character</li>
      <li>Written as U+ followed by hexadecimal digits</li>
      <li>Example: U+0041 represents 'A'</li>
      <li>Range: U+0000 to U+10FFFF</li>
    </ul>

    <h4>Encoding Examples</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code># Character 'A' (U+0041)
UTF-8:  0x41         (1 byte)
UTF-16: 0x0041       (2 bytes)
UTF-32: 0x00000041   (4 bytes)

# Character '€' (U+20AC)
UTF-8:  0xE2 0x82 0xAC  (3 bytes)
UTF-16: 0x20AC          (2 bytes)
UTF-32: 0x000020AC      (4 bytes)

# Character '𝄞' (U+1D11E)
UTF-8:  0xF0 0x9D 0x84 0x9E  (4 bytes)
UTF-16: 0xD834 0xDD1E        (4 bytes, surrogate pair)
UTF-32: 0x0001D11E           (4 bytes)</code></pre>
    </div>

    <h3>UTF-8 Encoding Details</h3>
    
    <h4>Byte Patterns</h4>
    <table>
      <thead>
        <tr>
          <th>Code Point Range</th>
          <th>Byte Pattern</th>
          <th>Bytes</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>U+0000 to U+007F</td>
          <td>0xxxxxxx</td>
          <td>1</td>
        </tr>
        <tr>
          <td>U+0080 to U+07FF</td>
          <td>110xxxxx 10xxxxxx</td>
          <td>2</td>
        </tr>
        <tr>
          <td>U+0800 to U+FFFF</td>
          <td>1110xxxx 10xxxxxx 10xxxxxx</td>
          <td>3</td>
        </tr>
        <tr>
          <td>U+10000 to U+10FFFF</td>
          <td>11110xxx 10xxxxxx 10xxxxxx 10xxxxxx</td>
          <td>4</td>
        </tr>
      </tbody>
    </table>

    <h3>Common Unicode Blocks</h3>
    
    <h4>Basic Multilingual Plane (BMP)</h4>
    <ul>
      <li><strong>Basic Latin:</strong> U+0000 to U+007F</li>
      <li><strong>Latin-1 Supplement:</strong> U+0080 to U+00FF</li>
      <li><strong>Greek and Coptic:</strong> U+0370 to U+03FF</li>
      <li><strong>Cyrillic:</strong> U+0400 to U+04FF</li>
      <li><strong>Hebrew:</strong> U+0590 to U+05FF</li>
      <li><strong>Arabic:</strong> U+0600 to U+06FF</li>
      <li><strong>Devanagari:</strong> U+0900 to U+097F</li>
      <li><strong>CJK Unified Ideographs:</strong> U+4E00 to U+9FFF</li>
    </ul>

    <h3>Practical Considerations</h3>
    
    <h4>Choosing an Encoding</h4>
    <ul>
      <li><strong>UTF-8:</strong> Best for web, APIs, and storage</li>
      <li><strong>UTF-16:</strong> Windows applications, Java/C#</li>
      <li><strong>UTF-32:</strong> When simple indexing is critical</li>
    </ul>

    <h4>Common Issues</h4>
    <ul>
      <li><strong>Mojibake:</strong> Garbled text from wrong encoding</li>
      <li><strong>BOM (Byte Order Mark):</strong> Optional in UTF-8, required in UTF-16/32</li>
      <li><strong>Normalization:</strong> Multiple ways to represent same character</li>
      <li><strong>String Length:</strong> Bytes vs code points vs graphemes</li>
    </ul>

    <h3>Programming Considerations</h3>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code># Python
text = "Hello 世界"
print(len(text))                    # 8 characters
print(len(text.encode('utf-8')))    # 12 bytes
print(len(text.encode('utf-16')))   # 18 bytes (includes BOM)

# JavaScript
const text = "Hello 世界";
console.log(text.length);           // 8 (UTF-16 code units)
console.log([...text].length);      // 8 (actual characters)

# String with emoji
const emoji = "👨‍👩‍👧‍👦";
console.log(emoji.length);          // 11 (UTF-16 code units)
console.log([...emoji].length);     // 7 (code points)
// But visually it's just 1 emoji!</code></pre>
    </div>

    <h3>Best Practices</h3>
    <ul>
      <li><strong>Always Specify Encoding:</strong> Don't rely on defaults</li>
      <li><strong>Use UTF-8:</strong> Unless specific reason not to</li>
      <li><strong>Handle BOM:</strong> Especially when reading files</li>
      <li><strong>Test with International Data:</strong> Include emojis and various scripts</li>
      <li><strong>Be Aware of Normalization:</strong> Use libraries for comparison</li>
      <li><strong>Consider Grapheme Clusters:</strong> For user-facing string operations</li>
    </ul>

    <h3>Related Links</h3>
    <ul>
      <li><a href="https://symbl.cc/en/unicode-table/#devanagari" target="_blank">Unicode Table - Devanagari</a></li>
    </ul>
`
}; 