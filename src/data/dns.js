export const dns = {
  id: 'dns',
  title: 'DNS (Domain Name System)',
  content: `
    <p>The Domain Name System (DNS) is a hierarchical, distributed naming system that translates human-readable domain names into IP addresses. It serves as the internet's phone book, enabling users to access websites using memorable names instead of numeric IP addresses. DNS is critical infrastructure that handles billions of queries daily with high availability and performance requirements.</p>

    <details>
      <summary><strong>Real-World Example: Cloudflare's DNS Infrastructure</strong></summary>
      <div class="info-note">
        Cloudflare operates one of the world's largest DNS infrastructures, serving 1.1.1.1 public DNS resolver that handles 400+ billion DNS queries daily across 200+ cities worldwide. Their DNS infrastructure provides sub-20ms response times globally, supports DNS over HTTPS (DoH) and DNS over TLS (DoT) for privacy, and processes queries for 25+ million internet properties. Cloudflare's DNS system helped improve internet performance by 28% on average, reduced DNS resolution times from 14ms to 3ms in many regions, and provides DDoS protection for DNS infrastructure. The system handles traffic spikes during major events, supports DNSSEC for security, and provides analytics for DNS query patterns across the internet.
      </div>
    </details>

    <h3>DNS Architecture and Hierarchy</h3>
    <p>DNS operates as a distributed hierarchical system with multiple levels of servers working together to resolve domain names efficiently.</p>

    <h4>DNS Hierarchy Structure</h4>
    <div class="code-block">
      <pre><code>DNS Hierarchy (Top to Bottom):

Root Level (.)
├── Managed by 13 root server clusters
├── Authoritative for top-level domains
├── Operated by organizations like Verisign, NASA, Army
└── Distributed globally with anycast routing

Top-Level Domains (TLD)
├── Generic TLDs: .com, .org, .net, .edu, .gov
├── Country Code TLDs: .uk, .de, .jp, .ca
├── New gTLDs: .app, .cloud, .dev, .tech
└── Managed by registries (Verisign for .com/.net)

Second-Level Domains
├── example.com (registered by domain owner)
├── google.com (registered by Google)
├── amazon.com (registered by Amazon)
└── Managed by domain registrants

Subdomains
├── www.example.com
├── mail.example.com
├── api.example.com
└── Managed by domain owner

Full DNS Hierarchy Example:
www.example.com.
│   │      │   │
│   │      │   └── Root (.)
│   │      └────── TLD (.com)
│   └───────────── Second-level (example)
└───────────────── Subdomain (www)

DNS Resolution Path:
1. Root servers → TLD servers
2. TLD servers → Authoritative servers
3. Authoritative servers → Final IP address</code></pre>
    </div>

    <h4>DNS Server Types</h4>
    <table>
      <thead>
        <tr>
          <th>Server Type</th>
          <th>Function</th>
          <th>Examples</th>
          <th>Characteristics</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Root Servers</td>
          <td>Direct queries to TLD servers</td>
          <td>a.root-servers.net to m.root-servers.net</td>
          <td>13 logical servers, hundreds of physical instances</td>
        </tr>
        <tr>
          <td>TLD Servers</td>
          <td>Manage top-level domains</td>
          <td>Verisign (.com/.net), PIR (.org)</td>
          <td>High availability, global distribution</td>
        </tr>
        <tr>
          <td>Authoritative</td>
          <td>Store DNS records for domains</td>
          <td>ns1.example.com, Route 53, Cloudflare</td>
          <td>Definitive source for domain records</td>
        </tr>
        <tr>
          <td>Recursive</td>
          <td>Resolve queries on behalf of clients</td>
          <td>8.8.8.8, 1.1.1.1, ISP resolvers</td>
          <td>Cache results, handle full resolution</td>
        </tr>
      </tbody>
    </table>

    <h3>DNS Resolution Process</h3>
    <p>DNS resolution involves multiple steps and caching layers to efficiently translate domain names to IP addresses.</p>

    <h4>Complete Resolution Flow</h4>
    <div class="code-block">
      <pre><code>DNS Resolution Steps (www.example.com):

1. Browser Cache Check:
   ├── Check local browser DNS cache
   ├── TTL: 60 seconds typical
   ├── Hit: Return cached IP immediately
   └── Miss: Continue to OS cache

2. Operating System Cache:
   ├── Check OS DNS cache (nscd/systemd-resolved)
   ├── TTL: 300 seconds typical
   ├── Hit: Return cached IP to browser
   └── Miss: Continue to router

3. Router/Local Network Cache:
   ├── Check router DNS cache
   ├── TTL: 300-3600 seconds
   ├── Hit: Return cached IP to OS
   └── Miss: Continue to ISP resolver

4. ISP/Public DNS Resolver:
   ├── Query: www.example.com
   ├── Check resolver cache
   ├── Hit: Return cached result
   └── Miss: Start recursive resolution

5. Recursive Resolution Process:
   
   Step 5a: Query Root Server
   ├── Query: "Where is .com?"
   ├── Root server response: "Ask a.gtld-servers.net"
   ├── Referral to .com TLD servers
   └── No IP address returned yet

   Step 5b: Query TLD Server
   ├── Query: "Where is example.com?"
   ├── TLD server response: "Ask ns1.example.com"
   ├── Referral to authoritative servers
   └── No IP address returned yet

   Step 5c: Query Authoritative Server
   ├── Query: "What is www.example.com?"
   ├── Authoritative server response: "192.0.2.1"
   ├── Final IP address returned
   └── TTL: 3600 seconds

6. Response Propagation:
   ├── Resolver caches result (TTL: 3600s)
   ├── Router caches result (TTL: 3600s)
   ├── OS caches result (TTL: 3600s)
   ├── Browser caches result (TTL: 60s)
   └── Application receives IP address

Total Resolution Time:
├── Cache hit: 1-10ms
├── Recursive resolution: 50-200ms
├── Cold resolution: 100-500ms
└── Timeout scenarios: 5-30 seconds

DNS Query Packet Structure:
Header (12 bytes):
├── ID: Query identifier
├── Flags: QR, Opcode, AA, TC, RD, RA
├── QDCOUNT: Number of questions
├── ANCOUNT: Number of answers
├── NSCOUNT: Number of authority records
└── ARCOUNT: Number of additional records

Question Section:
├── QNAME: Domain name
├── QTYPE: Query type (A, AAAA, MX, etc.)
└── QCLASS: Query class (IN for Internet)

Answer Section:
├── NAME: Domain name
├── TYPE: Record type
├── CLASS: Record class
├── TTL: Time to live
├── RDLENGTH: Data length
└── RDATA: Record data</code></pre>
    </div>

    <h4>DNS Caching Strategy</h4>
    <div class="code-block">
      <pre><code>DNS Caching Levels and TTL Values:

Browser Cache:
├── Location: Browser memory
├── TTL: 60-300 seconds
├── Scope: Per-tab or per-browser
├── Clearing: Browser restart, manual clear
└── Benefits: Fastest access, reduces network calls

Operating System Cache:
├── Location: OS memory (nscd, systemd-resolved)
├── TTL: 300-3600 seconds
├── Scope: System-wide
├── Clearing: Service restart, manual flush
└── Benefits: Shared across applications

Router Cache:
├── Location: Router memory
├── TTL: 300-3600 seconds
├── Scope: Network-wide
├── Clearing: Router restart, configuration
└── Benefits: Reduces ISP queries

ISP/Resolver Cache:
├── Location: DNS server memory/disk
├── TTL: Varies by record type
├── Scope: All customers
├── Clearing: TTL expiration, manual flush
└── Benefits: Reduces upstream queries

Authoritative Server Cache:
├── Location: DNS server memory
├── TTL: Set by domain owner
├── Scope: Global (via resolvers)
├── Clearing: Record updates, TTL expiration
└── Benefits: Reduces server load

TTL Best Practices:
├── A records: 300-3600 seconds
├── CNAME records: 300-3600 seconds
├── MX records: 3600-86400 seconds
├── NS records: 86400 seconds
├── TXT records: 300-3600 seconds
└── SOA records: 86400 seconds

Cache Invalidation:
# Flush local DNS cache (macOS)
sudo dscacheutil -flushcache

# Flush local DNS cache (Linux)
sudo systemctl restart systemd-resolved

# Flush local DNS cache (Windows)
ipconfig /flushdns

# Check DNS cache (Linux)
sudo systemd-resolve --statistics</code></pre>
    </div>

    <h3>DNS Record Types</h3>
    <p>DNS supports various record types for different purposes, from basic name resolution to email routing and security.</p>

    <h4>Core DNS Records</h4>
    <table>
      <thead>
        <tr>
          <th>Record Type</th>
          <th>Purpose</th>
          <th>Format</th>
          <th>Example</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>A</td>
          <td>IPv4 address mapping</td>
          <td>domain → IPv4</td>
          <td>example.com → 192.0.2.1</td>
        </tr>
        <tr>
          <td>AAAA</td>
          <td>IPv6 address mapping</td>
          <td>domain → IPv6</td>
          <td>example.com → 2001:db8::1</td>
        </tr>
        <tr>
          <td>CNAME</td>
          <td>Canonical name alias</td>
          <td>alias → canonical</td>
          <td>www.example.com → example.com</td>
        </tr>
        <tr>
          <td>MX</td>
          <td>Mail exchange servers</td>
          <td>domain → mail server</td>
          <td>example.com → 10 mail.example.com</td>
        </tr>
        <tr>
          <td>NS</td>
          <td>Name server delegation</td>
          <td>domain → name server</td>
          <td>example.com → ns1.example.com</td>
        </tr>
        <tr>
          <td>TXT</td>
          <td>Text information</td>
          <td>domain → text</td>
          <td>example.com → "v=spf1 include:_spf.google.com ~all"</td>
        </tr>
        <tr>
          <td>SOA</td>
          <td>Start of authority</td>
          <td>domain → authority info</td>
          <td>example.com → ns1.example.com admin.example.com ...</td>
        </tr>
      </tbody>
    </table>

    <h4>DNS Record Examples</h4>
    <div class="code-block">
      <pre><code>DNS Zone File Example (example.com):

$TTL 3600
$ORIGIN example.com.

; SOA Record (Start of Authority)
@    IN    SOA    ns1.example.com. admin.example.com. (
                  2023120101  ; Serial number
                  3600        ; Refresh interval
                  1800        ; Retry interval
                  604800      ; Expire time
                  86400       ; Minimum TTL
                  )

; Name Server Records
@    IN    NS     ns1.example.com.
@    IN    NS     ns2.example.com.

; A Records (IPv4)
@    IN    A      192.0.2.1
www  IN    A      192.0.2.1
api  IN    A      192.0.2.10
cdn  IN    A      192.0.2.20

; AAAA Records (IPv6)
@    IN    AAAA   2001:db8::1
www  IN    AAAA   2001:db8::1

; CNAME Records (Aliases)
ftp  IN    CNAME  www.example.com.
mail IN    CNAME  www.example.com.

; MX Records (Mail Exchange)
@    IN    MX     10 mail1.example.com.
@    IN    MX     20 mail2.example.com.

; TXT Records (Various purposes)
@    IN    TXT    "v=spf1 include:_spf.google.com ~all"
@    IN    TXT    "google-site-verification=abc123def456"
_dmarc IN TXT    "v=DMARC1; p=quarantine; rua=mailto:dmarc@example.com"

; SRV Records (Service location)
_sip._tcp IN SRV 10 5 5060 sipserver.example.com.
_http._tcp IN SRV 10 5 80 www.example.com.

; PTR Records (Reverse DNS)
1.2.0.192.in-addr.arpa. IN PTR example.com.

; CAA Records (Certificate Authority Authorization)
@    IN    CAA    0 issue "letsencrypt.org"
@    IN    CAA    0 iodef "mailto:security@example.com"

Advanced Record Types:
; DNSKEY (DNSSEC public key)
@    IN    DNSKEY 256 3 8 AwEAAb...

; DS (Delegation Signer)
@    IN    DS     12345 8 2 1234567890abcdef...

; RRSIG (Resource Record Signature)
@    IN    RRSIG  A 8 2 3600 20231201000000 20231101000000 12345 example.com. abc123...

Common DNS Query Examples:
# A record lookup
dig example.com A

# AAAA record lookup
dig example.com AAAA

# MX record lookup
dig example.com MX

# NS record lookup
dig example.com NS

# TXT record lookup
dig example.com TXT

# Reverse DNS lookup
dig -x 192.0.2.1

# Trace DNS resolution
dig +trace example.com

# Query specific DNS server
dig @8.8.8.8 example.com</code></pre>
    </div>

    <details>
      <summary><strong>Example: Google's DNS Infrastructure</strong></summary>
      <div class="info-note">
        Google operates 8.8.8.8 and 8.8.4.4 public DNS resolvers that handle 1+ trillion DNS queries daily from users worldwide. Their DNS infrastructure spans 100+ countries with anycast routing, provides sub-20ms response times globally, and supports modern DNS features like DNS over HTTPS (DoH) and DNS over TLS (DoT). Google's DNS system helps improve internet performance by 10-15% on average, provides protection against DNS spoofing and cache poisoning attacks, and offers detailed analytics for DNS query patterns. The system handles massive traffic spikes during major events, supports DNSSEC validation for security, and provides IPv6 connectivity for modern internet infrastructure.
      </div>
    </details>

    <h3>DNS Security</h3>
    <p>DNS security is critical for preventing attacks and ensuring the integrity of domain name resolution.</p>

    <h4>DNS Security Threats</h4>
    <table>
      <thead>
        <tr>
          <th>Attack Type</th>
          <th>Description</th>
          <th>Impact</th>
          <th>Mitigation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>DNS Spoofing</td>
          <td>Fake DNS responses redirect users</td>
          <td>Traffic redirection, phishing</td>
          <td>DNSSEC, secure resolvers</td>
        </tr>
        <tr>
          <td>Cache Poisoning</td>
          <td>Corrupt DNS cache with false data</td>
          <td>Persistent redirection</td>
          <td>Query randomization, DNSSEC</td>
        </tr>
        <tr>
          <td>DNS Tunneling</td>
          <td>Exfiltrate data via DNS queries</td>
          <td>Data theft, C&C communication</td>
          <td>DNS monitoring, filtering</td>
        </tr>
        <tr>
          <td>DDoS Attacks</td>
          <td>Overwhelm DNS servers</td>
          <td>Service unavailability</td>
          <td>Rate limiting, anycast, CDN</td>
        </tr>
        <tr>
          <td>DNS Hijacking</td>
          <td>Unauthorized DNS record changes</td>
          <td>Domain takeover</td>
          <td>Registry lock, 2FA, monitoring</td>
        </tr>
      </tbody>
    </table>

    <h4>DNSSEC (DNS Security Extensions)</h4>
    <div class="code-block">
      <pre><code>DNSSEC Implementation:

DNSSEC Components:
├── Digital signatures for DNS records
├── Chain of trust from root to domain
├── Public key cryptography (RSA/ECDSA)
├── Record types: DNSKEY, DS, RRSIG, NSEC/NSEC3
└── Validation by resolvers

DNSSEC Record Types:
DNSKEY: Public key for zone signing
├── Zone Signing Key (ZSK): Signs zone records
├── Key Signing Key (KSK): Signs DNSKEY records
└── Algorithm: RSA/SHA-256 or ECDSA/SHA-256

DS (Delegation Signer): Links parent to child zone
├── Hash of child zone's KSK
├── Stored in parent zone
└── Creates chain of trust

RRSIG: Digital signature for resource records
├── Signature of DNS record set
├── Includes validity period
└── Verifies record authenticity

NSEC/NSEC3: Authenticated denial of existence
├── Proves non-existence of records
├── NSEC3 adds privacy protection
└── Prevents DNS walking attacks

DNSSEC Validation Process:
1. Resolver queries for A record + RRSIG
2. Resolver queries for DNSKEY record
3. Resolver validates RRSIG with DNSKEY
4. Resolver queries parent for DS record
5. Resolver validates DS with parent DNSKEY
6. Chain continues to root zone
7. Validation succeeds or fails

DNSSEC Configuration Example:
# Generate zone signing key
dnssec-keygen -a RSASHA256 -b 2048 -n ZONE example.com

# Generate key signing key
dnssec-keygen -a RSASHA256 -b 4096 -n ZONE -f KSK example.com

# Sign zone
dnssec-signzone -o example.com -k Kexample.com.+008+12345.key example.com.zone Kexample.com.+008+54321.key

# Verify DNSSEC
dig +dnssec example.com

DNSSEC Benefits:
✓ Prevents DNS spoofing
✓ Ensures data integrity
✓ Provides authentication
✓ Builds trust chain
✓ Protects against cache poisoning

DNSSEC Challenges:
✗ Increased complexity
✗ Larger DNS responses
✗ Key management overhead
✗ Validation failures
✗ Limited adoption (~25% of domains)</code></pre>
    </div>

    <h4>DNS over HTTPS (DoH) and DNS over TLS (DoT)</h4>
    <div class="code-block">
      <pre><code>Secure DNS Protocols:

DNS over HTTPS (DoH):
├── Encrypts DNS queries using HTTPS
├── Uses standard port 443
├── Difficult to block or monitor
├── Supported by browsers and apps
└── RFC 8484 standard

DoH Request Example:
GET /dns-query?dns=AAABAAABAAAAAAAAA3d3dwdleGFtcGxlA2NvbQAAAQAB HTTP/2
Host: cloudflare-dns.com
Accept: application/dns-message

DoH Response:
HTTP/2 200 OK
Content-Type: application/dns-message
Content-Length: 64

[Binary DNS response data]

DNS over TLS (DoT):
├── Encrypts DNS queries using TLS
├── Uses port 853
├── Easier to identify and block
├── Lower overhead than DoH
└── RFC 7858 standard

DoT Configuration:
# systemd-resolved (Linux)
[Resolve]
DNS=1.1.1.1#cloudflare-dns.com
DNS=8.8.8.8#dns.google
DNSSEC=yes
DNSOverTLS=yes

# Unbound configuration
server:
    tls-cert-bundle: /etc/ssl/certs/ca-certificates.crt
    
forward-zone:
    name: "."
    forward-tls-upstream: yes
    forward-addr: 1.1.1.1@853#cloudflare-dns.com
    forward-addr: 8.8.8.8@853#dns.google

Comparison:
┌─────────────────┬──────────────┬─────────────────┐
│    Feature      │     DoH      │      DoT        │
├─────────────────┼──────────────┼─────────────────┤
│ Port            │ 443 (HTTPS)  │ 853 (TLS)       │
│ Protocol        │ HTTP/2       │ TLS             │
│ Blocking        │ Difficult    │ Easy            │
│ Overhead        │ Higher       │ Lower           │
│ Browser Support │ Native       │ Limited         │
│ Performance     │ Good         │ Better          │
└─────────────────┴──────────────┴─────────────────┘

Popular DoH/DoT Providers:
├── Cloudflare: 1.1.1.1, 1.0.0.1
├── Google: 8.8.8.8, 8.8.4.4
├── Quad9: 9.9.9.9, 149.112.112.112
├── OpenDNS: 208.67.222.222, 208.67.220.220
└── AdGuard: 94.140.14.14, 94.140.15.15</code></pre>
    </div>

    <h3>DNS Performance Optimization</h3>
    <p>Optimizing DNS performance is crucial for fast web application loading and user experience.</p>

    <h4>DNS Performance Strategies</h4>
    <div class="code-block">
      <pre><code>DNS Optimization Techniques:

1. TTL Optimization:
Short TTL (60-300s):
├── Faster updates during changes
├── More accurate traffic distribution
├── Higher DNS query load
└── Use for: A/AAAA records during deployments

Long TTL (3600-86400s):
├── Reduced DNS query load
├── Better cache efficiency
├── Slower updates during changes
└── Use for: NS, MX, TXT records

2. DNS Prefetching:
HTML DNS Prefetch:
<link rel="dns-prefetch" href="//api.example.com">
<link rel="dns-prefetch" href="//cdn.example.com">
<link rel="dns-prefetch" href="//analytics.example.com">

JavaScript DNS Prefetch:
// Preload DNS for future requests
const link = document.createElement('link');
link.rel = 'dns-prefetch';
link.href = '//api.example.com';
document.head.appendChild(link);

3. Anycast DNS:
├── Multiple servers share same IP
├── Route to closest server
├── Improved performance and reliability
├── Automatic failover
└── Used by: Cloudflare, AWS Route 53

4. DNS Load Balancing:
Round Robin:
example.com    IN    A    192.0.2.1
example.com    IN    A    192.0.2.2
example.com    IN    A    192.0.2.3

Weighted Round Robin:
├── Different weights for servers
├── Traffic distribution control
├── Gradual traffic shifting
└── Blue-green deployments

Geographic DNS:
├── Route based on client location
├── Improved latency
├── Regional content delivery
└── Compliance requirements

5. DNS Monitoring:
Key Metrics:
├── Query response time
├── Query success rate
├── Cache hit ratio
├── DNS server availability
└── Record propagation time

Monitoring Tools:
├── DNS monitoring services
├── Custom health checks
├── Real user monitoring (RUM)
├── Synthetic monitoring
└── Log analysis

Performance Benchmarking:
# DNS query time measurement
dig example.com | grep "Query time"

# Multiple resolver comparison
for dns in 8.8.8.8 1.1.1.1 9.9.9.9; do
  echo "Testing $dns:"
  dig @$dns example.com | grep "Query time"
done

# DNS trace analysis
dig +trace example.com</code></pre>
    </div>

    <h4>CDN and DNS Integration</h4>
    <div class="code-block">
      <pre><code>CDN DNS Integration Patterns:

1. CNAME-based CDN:
Original: www.example.com → 192.0.2.1
CDN: www.example.com → CNAME → cdn.provider.com → 203.0.113.1

Benefits:
├── Easy setup and management
├── Automatic edge server selection
├── Provider handles DNS optimization
└── Transparent to end users

2. DNS-based Load Balancing:
# Multiple CDN providers
www.example.com    IN    A    203.0.113.1  ; CDN Provider A
www.example.com    IN    A    198.51.100.1  ; CDN Provider B
www.example.com    IN    A    192.0.2.1     ; Origin server

3. GeoDNS with CDN:
# Route based on client location
US clients: www.example.com → us-cdn.provider.com
EU clients: www.example.com → eu-cdn.provider.com
APAC clients: www.example.com → apac-cdn.provider.com

4. Intelligent DNS Routing:
├── Real-time performance monitoring
├── Automatic failover
├── Load-based routing
├── Health check integration
└── Custom routing rules

CDN DNS Configuration:
# Cloudflare integration
www.example.com    IN    CNAME    www.example.com.cdn.cloudflare.net

# AWS CloudFront integration
www.example.com    IN    CNAME    d123456789.cloudfront.net

# Multi-CDN setup
www.example.com    IN    CNAME    www.example.com.edgekey.net  ; Akamai
www.example.com    IN    CNAME    www.example.com.fastly.com   ; Fastly

Performance Benefits:
├── Reduced latency (edge servers)
├── Improved availability (multiple servers)
├── Better scalability (distributed load)
├── Enhanced security (DDoS protection)
└── Optimized content delivery</code></pre>
    </div>

    <details>
      <summary><strong>Example: Amazon Route 53 DNS Architecture</strong></summary>
      <div class="info-note">
        Amazon Route 53 is a highly available DNS service that serves 400+ billion DNS queries monthly across AWS's global infrastructure. Route 53 uses anycast routing across 100+ edge locations worldwide, provides sub-10ms DNS response times, and supports advanced features like health checks, weighted routing, and geolocation-based routing. The service handles massive traffic spikes during events like Black Friday, provides 100% uptime SLA for DNS queries, and integrates seamlessly with AWS services like CloudFront, ELB, and S3. Route 53's intelligent routing helped companies like Netflix optimize global content delivery, reduce latency by 40% for international users, and implement blue-green deployments with zero downtime.
      </div>
    </details>

    <h3>DNS Troubleshooting and Debugging</h3>
    <p>Effective DNS troubleshooting requires understanding common issues and having the right tools for diagnosis.</p>

    <h4>Common DNS Issues</h4>
    <table>
      <thead>
        <tr>
          <th>Issue</th>
          <th>Symptoms</th>
          <th>Causes</th>
          <th>Solutions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>DNS Resolution Failure</td>
          <td>Domain not found, timeouts</td>
          <td>Misconfigured records, server down</td>
          <td>Check records, test different resolvers</td>
        </tr>
        <tr>
          <td>Slow DNS Response</td>
          <td>High page load times</td>
          <td>Distant servers, cache misses</td>
          <td>Use faster resolvers, optimize TTL</td>
        </tr>
        <tr>
          <td>DNS Propagation Delay</td>
          <td>Inconsistent results globally</td>
          <td>TTL values, caching layers</td>
          <td>Lower TTL before changes, wait for propagation</td>
        </tr>
        <tr>
          <td>DNSSEC Validation Failure</td>
          <td>SERVFAIL responses</td>
          <td>Broken signatures, key issues</td>
          <td>Check DNSSEC chain, update keys</td>
        </tr>
        <tr>
          <td>DNS Cache Poisoning</td>
          <td>Incorrect IP addresses</td>
          <td>Security vulnerabilities</td>
          <td>Flush caches, enable DNSSEC</td>
        </tr>
      </tbody>
    </table>

    <h4>DNS Debugging Tools</h4>
    <div class="code-block">
      <pre><code>DNS Troubleshooting Commands:

1. Basic DNS Lookup:
# Standard A record lookup
dig example.com

# Specific record type
dig example.com MX
dig example.com NS
dig example.com TXT

# Query specific DNS server
dig @8.8.8.8 example.com

2. Detailed DNS Analysis:
# Trace DNS resolution path
dig +trace example.com

# Show all sections
dig +all example.com

# Short output format
dig +short example.com

# Reverse DNS lookup
dig -x 192.0.2.1

3. DNS Server Testing:
# Test multiple DNS servers
for server in 8.8.8.8 1.1.1.1 9.9.9.9; do
  echo "Testing $server:"
  dig @$server example.com +time=5 +tries=1
done

# Check DNS server response time
dig example.com | grep "Query time"

4. DNSSEC Validation:
# Check DNSSEC status
dig +dnssec example.com

# Verify DNSSEC chain
dig +trace +dnssec example.com

# Check DS record
dig example.com DS

5. DNS Cache Analysis:
# Check local cache (macOS)
sudo dscacheutil -cachedump -entries Host

# Check systemd-resolved cache (Linux)
sudo systemd-resolve --statistics

# Flush DNS cache
sudo dscacheutil -flushcache  # macOS
sudo systemctl restart systemd-resolved  # Linux
ipconfig /flushdns  # Windows

6. Network-level DNS Testing:
# Monitor DNS traffic
sudo tcpdump -i any port 53

# Test DNS over specific interface
dig +tcp example.com  # Force TCP
dig +vc example.com   # Virtual circuit (TCP)

# Test with specific source
dig -b 192.0.2.100 example.com

7. DNS Performance Testing:
# Measure DNS lookup time
/usr/bin/time dig example.com > /dev/null

# Batch DNS testing
echo "example.com" | xargs -I {} dig {} +time=2 +tries=1

# DNS benchmark tool
namebench  # Google's DNS benchmark

8. Advanced Debugging:
# Check DNS propagation globally
dig @a.root-servers.net example.com
dig @ns1.example.com example.com

# Validate zone file
named-checkzone example.com /etc/bind/db.example.com

# Check DNS configuration
named-checkconf /etc/bind/named.conf

DNS Debugging Script:
#!/bin/bash
DOMAIN=$1
echo "DNS Analysis for $DOMAIN"
echo "========================"

echo "1. Basic A record:"
dig +short $DOMAIN A

echo "2. NS records:"
dig +short $DOMAIN NS

echo "3. MX records:"
dig +short $DOMAIN MX

echo "4. DNS trace:"
dig +trace $DOMAIN | tail -10

echo "5. Response time comparison:"
for dns in 8.8.8.8 1.1.1.1 9.9.9.9; do
  dns_time=$(dig @$dns $DOMAIN | grep "Query time" | awk '{print $4}')
  echo "$dns: $dns_time ms"
done

echo "6. DNSSEC status:"
dig +dnssec +short $DOMAIN | head -1</code></pre>
    </div>

    <h3>DNS Best Practices</h3>
    <p>Following DNS best practices ensures reliable, secure, and performant domain name resolution.</p>

    <h4>Configuration Best Practices</h4>
    <div class="code-block">
      <pre><code>DNS Configuration Guidelines:

1. Redundancy and Reliability:
# Multiple name servers
example.com    IN    NS    ns1.example.com.
example.com    IN    NS    ns2.example.com.
example.com    IN    NS    ns3.example.com.

# Different geographic locations
ns1.example.com    IN    A    192.0.2.1      ; US East
ns2.example.com    IN    A    198.51.100.1   ; US West  
ns3.example.com    IN    A    203.0.113.1    ; Europe

# Different providers
example.com    IN    NS    ns1.provider-a.com.
example.com    IN    NS    ns2.provider-b.com.

2. TTL Strategy:
# Dynamic records (short TTL)
www.example.com    300    IN    A    192.0.2.1
api.example.com    300    IN    A    192.0.2.10

# Static records (long TTL)
example.com        3600   IN    NS   ns1.example.com.
example.com        86400  IN    MX   10 mail.example.com.

# Pre-change TTL reduction
# Before change: Reduce TTL to 300
# Make change: Keep TTL at 300
# After propagation: Increase TTL back to 3600

3. Record Organization:
# Logical grouping
$ORIGIN example.com.
$TTL 3600

; Core infrastructure
@              IN    NS    ns1.example.com.
@              IN    NS    ns2.example.com.
@              IN    MX    10 mail.example.com.

; Web services
@              IN    A     192.0.2.1
www            IN    A     192.0.2.1
api            IN    A     192.0.2.10

; CDN and aliases
cdn            IN    CNAME www.example.com.
static         IN    CNAME cdn.cloudflare.com.

4. Security Configuration:
# DNSSEC implementation
example.com    IN    DS    12345 8 2 1234567890abcdef...
example.com    IN    DNSKEY 256 3 8 AwEAAb...

# CAA records for certificate control
example.com    IN    CAA   0 issue "letsencrypt.org"
example.com    IN    CAA   0 iodef "mailto:security@example.com"

# SPF records for email security
example.com    IN    TXT   "v=spf1 include:_spf.google.com ~all"

5. Monitoring and Alerting:
# Health check records
health.example.com    IN    A    192.0.2.100

# Monitoring configuration
monitor_dns_response_time:
  - server: 8.8.8.8
    domain: example.com
    threshold: 100ms
    
monitor_dns_availability:
  - domain: example.com
    record_type: A
    expected_value: 192.0.2.1

6. Documentation:
# Zone file comments
; Last updated: 2023-12-01
; Contact: admin@example.com
; Purpose: Production DNS configuration

; Web servers (load balanced)
www            IN    A     192.0.2.1    ; Primary web server
www            IN    A     192.0.2.2    ; Secondary web server

; API endpoints
api            IN    A     192.0.2.10   ; API server cluster
api-v2         IN    A     192.0.2.11   ; API v2 server</code></pre>
    </div>

    <h4>Operational Best Practices</h4>
    <ul>
      <li><strong>Change Management:</strong> Implement controlled DNS change processes with testing and rollback procedures</li>
      <li><strong>Monitoring:</strong> Monitor DNS resolution times, availability, and propagation across multiple locations</li>
      <li><strong>Backup:</strong> Maintain DNS configuration backups and have recovery procedures documented</li>
      <li><strong>Security:</strong> Implement DNSSEC, use secure DNS resolvers, and monitor for DNS-based attacks</li>
      <li><strong>Performance:</strong> Optimize TTL values, use anycast, and implement geographic routing</li>
      <li><strong>Compliance:</strong> Follow industry standards and regulatory requirements for DNS configuration</li>
    </ul>

    <h3>Modern DNS Trends</h3>
    <p>DNS continues to evolve with new technologies and security requirements.</p>

    <h4>Emerging DNS Technologies</h4>
    <div class="code-block">
      <pre><code>Modern DNS Developments:

1. DNS over QUIC (DoQ):
├── Next-generation encrypted DNS
├── Based on HTTP/3 and QUIC protocol
├── Improved performance and security
├── Reduced connection establishment time
└── RFC 9250 specification

2. Oblivious DNS over HTTPS (ODoH):
├── Enhanced privacy protection
├── Separates client identity from queries
├── Uses proxy servers for anonymization
├── Prevents DNS provider tracking
└── RFC 9230 specification

3. DNS over Dedicated QUIC (DoQ):
├── Dedicated QUIC connection for DNS
├── Multiplexed queries and responses
├── Improved performance over DoH
├── Better congestion control
└── Experimental implementation

4. Encrypted Client Hello (ECH):
├── Encrypts TLS handshake metadata
├── Prevents DNS-based censorship
├── Protects against traffic analysis
├── Requires DNS infrastructure support
└── TLS 1.3 extension

5. DNS Adaptive Bit Rate (ABR):
├── Dynamic quality adjustment
├── Network-aware DNS responses
├── Improved streaming performance
├── CDN integration
└── Experimental technology

Future DNS Considerations:
├── IPv6 adoption and dual-stack
├── Edge computing integration
├── AI-driven DNS optimization
├── Quantum-resistant cryptography
├── Decentralized DNS systems
└── Blockchain-based DNS</code></pre>
    </div>

    <details>
      <summary><strong>Example: Quad9's Security-Focused DNS</strong></summary>
      <div class="info-note">
        Quad9 operates 9.9.9.9 public DNS resolver with a focus on security, blocking access to malicious domains using threat intelligence from 18+ security companies. Their DNS infrastructure handles 200+ billion queries monthly, blocks 10+ million malicious domains daily, and provides real-time protection against phishing, malware, and botnets. Quad9's security-focused approach helped organizations reduce malware infections by 60%, prevent data breaches through DNS-based attacks, and improve overall network security posture. The service provides global coverage with 150+ locations worldwide, supports DNSSEC validation, and offers both filtered and unfiltered DNS services for different security requirements.
      </div>
    </details>

    <h3>Conclusion</h3>
    <p>DNS is fundamental internet infrastructure that enables the modern web by translating human-readable domain names into IP addresses. Understanding DNS architecture, security, performance optimization, and troubleshooting is essential for building reliable internet applications.</p>

    <p><strong>Key DNS Principles:</strong></p>
    <ul>
      <li><strong>Hierarchical Design:</strong> Distributed system with clear delegation boundaries</li>
      <li><strong>Caching Strategy:</strong> Multiple cache layers for performance optimization</li>
      <li><strong>Security First:</strong> Implement DNSSEC, secure resolvers, and monitoring</li>
      <li><strong>Redundancy:</strong> Multiple name servers and geographic distribution</li>
      <li><strong>Performance:</strong> Optimize TTL values, use anycast, and monitor response times</li>
      <li><strong>Monitoring:</strong> Continuous monitoring of DNS health and performance</li>
      <li><strong>Documentation:</strong> Maintain clear records and change procedures</li>
    </ul>

    <p>As the internet continues to evolve, DNS remains a critical component that requires careful planning, implementation, and maintenance to ensure reliable and secure domain name resolution for users worldwide.</p>

    <h3>References</h3>
    <ul>
      <li><a href="https://www.rfc-editor.org/rfc/rfc1035.html" target="_blank">RFC 1035: Domain Names - Implementation and Specification</a></li>
      <li><a href="https://www.rfc-editor.org/rfc/rfc4033.html" target="_blank">RFC 4033: DNS Security Introduction and Requirements</a></li>
      <li><a href="https://www.rfc-editor.org/rfc/rfc8484.html" target="_blank">RFC 8484: DNS Queries over HTTPS (DoH)</a></li>
      <li><a href="https://www.rfc-editor.org/rfc/rfc7858.html" target="_blank">RFC 7858: DNS over TLS (DoT)</a></li>
      <li><a href="https://www.cloudflare.com/learning/dns/" target="_blank">Cloudflare DNS Learning Center</a></li>
      <li><a href="https://developers.google.com/speed/public-dns" target="_blank">Google Public DNS Documentation</a></li>
    </ul>
  `
}; 