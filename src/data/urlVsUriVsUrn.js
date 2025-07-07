export const urlVsUriVsUrn = {
  id: 'url-vs-uri-vs-urn',
  title: 'URL vs URI vs URN',
  content: `
    <h2>URL vs URI vs URN</h2>
    <p>Understanding the differences between URL, URI, and URN is essential for web development and system design. These terms are often confused but have distinct meanings and purposes.</p>

    <h3>URI (Uniform Resource Identifier)</h3>
    <p>URI is the most general term - it's a string that identifies a resource, either by its location, name, or both. URI is the superset that includes both URLs and URNs.</p>

    <h4>URI Characteristics</h4>
    <ul>
      <li><strong>Purpose:</strong> Identify a resource</li>
      <li><strong>Format:</strong> scheme:scheme-specific-part</li>
      <li><strong>Includes:</strong> Both URLs and URNs</li>
      <li><strong>Can be:</strong> Locator, name, or both</li>
    </ul>

    <h4>URI Examples</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>mailto:user@example.com
file:///home/user/file.txt
http://example.com/page
ftp://ftp.example.com/file.zip
tel:+1-816-555-1212
urn:isbn:0451450523</code></pre>
    </div>

    <h3>URL (Uniform Resource Locator)</h3>
    <p>URL is a subset of URI that specifies where a resource is located and how to retrieve it. It includes the complete address for locating a resource, typically consisting of a protocol, domain name, path, and possibly other components.</p>

    <h4>URL Structure</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>scheme://[userinfo@]host[:port][/path][?query][#fragment]

Example breakdown:
https://user:pass@www.example.com:8080/path/to/page?name=value#section

scheme: https
userinfo: user:pass
host: www.example.com
port: 8080
path: /path/to/page
query: name=value
fragment: section</code></pre>
    </div>

    <h4>URL Examples</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>http://example.com/mypage.html
https://api.example.com/v1/users?limit=10
ftp://example.com/download.zip
file:///C:/Users/John/Documents/file.txt
https://example.com:8443/secure/page</code></pre>
    </div>

    <h3>URN (Uniform Resource Name)</h3>
    <p>URN identifies a resource by a unique and persistent name, but doesn't necessarily tell you how to locate it on the internet. URNs are intended to serve as persistent, location-independent resource identifiers.</p>

    <h4>URN Structure</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>urn:namespace-identifier:namespace-specific-string

Components:
- "urn" - scheme identifier
- namespace-identifier - registered namespace
- namespace-specific-string - unique identifier within namespace</code></pre>
    </div>

    <h4>URN Examples</h4>
    <ul>
      <li><strong>urn:isbn:0451450523</strong> - Identifies a book by its ISBN</li>
      <li><strong>urn:uuid:6e8bc430-9c3a-11d9-9669-0800200c9a66</strong> - A globally unique identifier</li>
      <li><strong>urn:publishing:book</strong> - An XML namespace that identifies the document as a type of book</li>
      <li><strong>urn:ietf:rfc:2648</strong> - IETF RFC document</li>
      <li><strong>urn:mpeg:mpeg7:schema:2001</strong> - MPEG-7 schema</li>
    </ul>

    <h3>Key Differences</h3>
    
    <table>
      <thead>
        <tr>
          <th>Aspect</th>
          <th>URI</th>
          <th>URL</th>
          <th>URN</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Purpose</strong></td>
          <td>Identify</td>
          <td>Locate</td>
          <td>Name</td>
        </tr>
        <tr>
          <td><strong>Persistence</strong></td>
          <td>Varies</td>
          <td>Can change</td>
          <td>Persistent</td>
        </tr>
        <tr>
          <td><strong>Location</strong></td>
          <td>May include</td>
          <td>Always includes</td>
          <td>Never includes</td>
        </tr>
        <tr>
          <td><strong>Retrieval</strong></td>
          <td>May be possible</td>
          <td>Direct retrieval</td>
          <td>Requires resolution</td>
        </tr>
        <tr>
          <td><strong>Example</strong></td>
          <td>Any identifier</td>
          <td>http://example.com</td>
          <td>urn:isbn:12345</td>
        </tr>
      </tbody>
    </table>

    <h3>Relationship Diagram</h3>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>                    URI
                 /       \\
               /           \\
             URL           URN
    (Locator)     (Name)

All URLs are URIs
All URNs are URIs
Not all URIs are URLs or URNs</code></pre>
    </div>

    <h3>Practical Examples</h3>
    
    <h4>URI but not URL or URN</h4>
    <ul>
      <li><strong>data:text/plain;base64,SGVsbG8gV29ybGQ=</strong> - Data URI</li>
      <li><strong>javascript:alert('Hello')</strong> - JavaScript URI</li>
      <li><strong>about:blank</strong> - About URI</li>
    </ul>

    <h4>Real-World Usage</h4>
    <ul>
      <li><strong>Web Browsers:</strong> Primarily use URLs</li>
      <li><strong>XML Namespaces:</strong> Often use URNs</li>
      <li><strong>RESTful APIs:</strong> Use URLs for endpoints</li>
      <li><strong>Digital Libraries:</strong> Use URNs for persistent identification</li>
      <li><strong>Linked Data:</strong> Use URIs for resource identification</li>
    </ul>

    <h3>Common Misconceptions</h3>
    
    <h4>Misconception 1: URI and URL are the same</h4>
    <p>Reality: URL is a subset of URI. Every URL is a URI, but not every URI is a URL.</p>

    <h4>Misconception 2: URNs are obsolete</h4>
    <p>Reality: URNs are still used in specific contexts like digital publishing, standards documents, and persistent identifiers.</p>

    <h4>Misconception 3: Only HTTP/HTTPS are valid URL schemes</h4>
    <p>Reality: Many schemes exist: ftp://, file://, mailto:, tel:, and more.</p>

    <h3>Best Practices</h3>
    
    <h4>When to Use Each</h4>
    <ul>
      <li><strong>Use URL:</strong> When you need to locate and access a resource</li>
      <li><strong>Use URN:</strong> When you need a persistent, location-independent identifier</li>
      <li><strong>Use URI:</strong> When referring to identifiers in general</li>
    </ul>

    <h4>Design Considerations</h4>
    <ul>
      <li><strong>Persistence:</strong> If the identifier must never change, consider URN</li>
      <li><strong>Accessibility:</strong> If direct access is needed, use URL</li>
      <li><strong>Flexibility:</strong> URIs provide the most flexibility</li>
      <li><strong>Standards:</strong> Follow RFC specifications for proper formatting</li>
    </ul>

    <h3>Technical Specifications</h3>
    <ul>
      <li><strong>RFC 3986:</strong> URI Generic Syntax</li>
      <li><strong>RFC 1738:</strong> URL Specification</li>
      <li><strong>RFC 2141:</strong> URN Syntax</li>
      <li><strong>RFC 8141:</strong> URN (updated)</li>
    </ul>
  `
}; 