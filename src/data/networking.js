export const networking = {
  id: 'networking',
  title: 'Computer Networking',
  content: `
    <p>Computer networking is the practice of connecting computing devices to enable communication, resource sharing, and data exchange. It forms the backbone of modern digital infrastructure, enabling everything from simple file sharing to complex distributed systems and the global internet.</p>

    <details>
      <summary><strong>Real-World Example: Google's Global Network Infrastructure</strong></summary>
      <div class="info-note">
        Google operates one of the world's largest private networks, spanning 100+ countries with 1.4 million miles of fiber optic cables. Their network handles 40+ billion searches daily and serves 8+ billion users across YouTube, Gmail, and Google Search. Google's network uses advanced routing protocols, custom hardware, and machine learning to optimize traffic flow, achieving 99.9% uptime while processing 3.5 billion search queries daily with sub-100ms response times globally.
      </div>
    </details>

    <h3>OSI Model (Open Systems Interconnection)</h3>
    <p>The OSI model is a conceptual framework that standardizes network communication functions into seven distinct layers, each with specific responsibilities.</p>

    <h4>Layer 7: Application Layer</h4>
    <p><strong>Purpose:</strong> Provides network services directly to end-user applications.</p>
    <ul>
      <li><strong>Protocols:</strong> HTTP/HTTPS, FTP, SMTP, DNS, DHCP, SSH</li>
      <li><strong>Functions:</strong> User authentication, data formatting, application-specific services</li>
      <li><strong>Examples:</strong> Web browsers, email clients, file transfer applications</li>
    </ul>

    <h4>Layer 6: Presentation Layer</h4>
    <p><strong>Purpose:</strong> Handles data translation, encryption, and compression.</p>
    <ul>
      <li><strong>Functions:</strong> Data encryption/decryption, compression, character encoding</li>
      <li><strong>Formats:</strong> SSL/TLS, JPEG, MPEG, ASCII, Unicode</li>
      <li><strong>Examples:</strong> SSL certificates, data compression algorithms</li>
    </ul>

    <h4>Layer 5: Session Layer</h4>
    <p><strong>Purpose:</strong> Manages sessions and connections between applications.</p>
    <ul>
      <li><strong>Functions:</strong> Session establishment, maintenance, termination</li>
      <li><strong>Protocols:</strong> NetBIOS, RPC, SQL sessions</li>
      <li><strong>Examples:</strong> Database connections, web sessions, API sessions</li>
    </ul>

    <h4>Layer 4: Transport Layer</h4>
    <p><strong>Purpose:</strong> Provides reliable end-to-end communication and error recovery.</p>
    <ul>
      <li><strong>Protocols:</strong> TCP (reliable), UDP (fast), SCTP</li>
      <li><strong>Functions:</strong> Segmentation, flow control, error detection, port addressing</li>
      <li><strong>Examples:</strong> TCP connections, UDP datagrams, port numbers</li>
    </ul>

    <h4>Layer 3: Network Layer</h4>
    <p><strong>Purpose:</strong> Handles routing and logical addressing across networks.</p>
    <ul>
      <li><strong>Protocols:</strong> IP (IPv4/IPv6), ICMP, OSPF, BGP</li>
      <li><strong>Functions:</strong> Routing, logical addressing, path determination</li>
      <li><strong>Examples:</strong> Routers, IP addresses, subnetting</li>
    </ul>

    <h4>Layer 2: Data Link Layer</h4>
    <p><strong>Purpose:</strong> Provides node-to-node delivery and error detection.</p>
    <ul>
      <li><strong>Protocols:</strong> Ethernet, WiFi (802.11), PPP</li>
      <li><strong>Functions:</strong> Frame formatting, MAC addressing, error detection</li>
      <li><strong>Examples:</strong> Switches, bridges, MAC addresses</li>
    </ul>

    <h4>Layer 1: Physical Layer</h4>
    <p><strong>Purpose:</strong> Handles the physical transmission of raw bits.</p>
    <ul>
      <li><strong>Components:</strong> Cables, hubs, repeaters, network cards</li>
      <li><strong>Functions:</strong> Electrical signals, optical signals, radio waves</li>
      <li><strong>Examples:</strong> Ethernet cables, fiber optics, wireless signals</li>
    </ul>

    <h4>OSI Model Data Flow</h4>
    <div class="code-block">
      <pre><code>Data Transmission Process:

Sender (Application → Physical):
Application  │ HTTP Request
Presentation │ + SSL Encryption
Session      │ + Session ID
Transport    │ + TCP Header (Port 80)
Network      │ + IP Header (Source/Dest IP)
Data Link    │ + Ethernet Header (MAC Addresses)
Physical     │ → Electrical Signals

Receiver (Physical → Application):
Physical     │ ← Electrical Signals
Data Link    │ - Ethernet Header
Network      │ - IP Header
Transport    │ - TCP Header
Session      │ - Session ID
Presentation │ - SSL Decryption
Application  │ HTTP Response</code></pre>
    </div>

    <details>
      <summary><strong>Example: Netflix Video Streaming OSI Layers</strong></summary>
      <div class="info-note">
        When you stream Netflix, all OSI layers work together: Physical layer transmits data over fiber/wireless, Data Link manages WiFi frames, Network layer routes packets across ISPs, Transport layer uses TCP for reliable delivery, Session layer manages your login, Presentation layer handles video compression (H.264), and Application layer provides the Netflix interface. This coordinated process delivers 4K video to 230+ million subscribers with 99.9% reliability.
      </div>
    </details>

    <h3>TCP/IP Model vs OSI Model</h3>
    <p>The TCP/IP model is a more practical, four-layer model that forms the foundation of the internet.</p>

    <h4>Layer Comparison</h4>
    <table>
      <thead>
        <tr>
          <th>TCP/IP Layer</th>
          <th>OSI Equivalent</th>
          <th>Key Protocols</th>
          <th>Function</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Application</td>
          <td>Application, Presentation, Session</td>
          <td>HTTP, FTP, SMTP, DNS</td>
          <td>User services and data formatting</td>
        </tr>
        <tr>
          <td>Transport</td>
          <td>Transport</td>
          <td>TCP, UDP</td>
          <td>End-to-end communication</td>
        </tr>
        <tr>
          <td>Internet</td>
          <td>Network</td>
          <td>IP, ICMP, ARP</td>
          <td>Routing and addressing</td>
        </tr>
        <tr>
          <td>Network Access</td>
          <td>Data Link, Physical</td>
          <td>Ethernet, WiFi</td>
          <td>Physical transmission</td>
        </tr>
      </tbody>
    </table>

    <h3>Key Network Protocols</h3>
    <p>Network protocols define rules and standards for communication between devices.</p>

    <h4>Transport Layer Protocols</h4>
    <table>
      <thead>
        <tr>
          <th>Protocol</th>
          <th>Type</th>
          <th>Reliability</th>
          <th>Speed</th>
          <th>Use Cases</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>TCP</td>
          <td>Connection-oriented</td>
          <td>High</td>
          <td>Slower</td>
          <td>Web browsing, email, file transfer</td>
        </tr>
        <tr>
          <td>UDP</td>
          <td>Connectionless</td>
          <td>Low</td>
          <td>Faster</td>
          <td>Video streaming, gaming, DNS</td>
        </tr>
        <tr>
          <td>SCTP</td>
          <td>Connection-oriented</td>
          <td>High</td>
          <td>Medium</td>
          <td>Telecommunications, multimedia</td>
        </tr>
      </tbody>
    </table>

    <h4>TCP vs UDP Detailed Comparison</h4>
    <div class="code-block">
      <pre><code>TCP (Transmission Control Protocol):
┌─────────────────────────────────────────────────────────────┐
│                    TCP Connection                           │
├─────────────────────────────────────────────────────────────┤
│  1. Three-way handshake (SYN, SYN-ACK, ACK)               │
│  2. Reliable data transmission                              │
│  3. Error checking and retransmission                      │
│  4. Flow control and congestion control                    │
│  5. Connection termination (FIN, ACK)                      │
└─────────────────────────────────────────────────────────────┘

UDP (User Datagram Protocol):
┌─────────────────────────────────────────────────────────────┐
│                    UDP Communication                       │
├─────────────────────────────────────────────────────────────┤
│  1. No connection establishment                             │
│  2. Send data immediately                                   │
│  3. No error recovery                                       │
│  4. No flow control                                         │
│  5. Lower overhead                                          │
└─────────────────────────────────────────────────────────────┘</code></pre>
    </div>

    <h4>Application Layer Protocols</h4>
    <ul>
      <li><strong>HTTP/HTTPS:</strong> Web communication (port 80/443)</li>
      <li><strong>FTP:</strong> File transfer (port 21)</li>
      <li><strong>SMTP:</strong> Email sending (port 25)</li>
      <li><strong>POP3/IMAP:</strong> Email retrieval (port 110/143)</li>
      <li><strong>DNS:</strong> Domain name resolution (port 53)</li>
      <li><strong>DHCP:</strong> Dynamic IP assignment (port 67/68)</li>
      <li><strong>SSH:</strong> Secure remote access (port 22)</li>
      <li><strong>Telnet:</strong> Remote terminal access (port 23)</li>
    </ul>

    <details>
      <summary><strong>Example: WhatsApp's Protocol Usage</strong></summary>
      <div class="info-note">
        WhatsApp uses multiple protocols strategically: TCP for reliable message delivery ensuring your texts arrive, UDP for voice calls to minimize latency, HTTPS for secure API communication, and WebSocket for real-time messaging. Their custom XMPP-based protocol handles 100+ billion messages daily across 2+ billion users, with 99.9% message delivery rate and sub-second global message delivery.
      </div>
    </details>

    <h3>IP Addressing and Subnetting</h3>
    <p>IP addressing provides unique identifiers for devices on networks, while subnetting divides networks into smaller, manageable segments.</p>

    <h4>IPv4 Addressing</h4>
    <p><strong>Format:</strong> 32-bit address divided into 4 octets (e.g., 192.168.1.1)</p>
    <p><strong>Address Classes:</strong></p>
    <ul>
      <li><strong>Class A:</strong> 1.0.0.0 to 126.0.0.0 (16.7M hosts per network)</li>
      <li><strong>Class B:</strong> 128.0.0.0 to 191.255.0.0 (65K hosts per network)</li>
      <li><strong>Class C:</strong> 192.0.0.0 to 223.255.255.0 (254 hosts per network)</li>
    </ul>

    <h4>Private IP Ranges</h4>
    <table>
      <thead>
        <tr>
          <th>Class</th>
          <th>Private Range</th>
          <th>Subnet Mask</th>
          <th>Hosts</th>
          <th>Common Use</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>A</td>
          <td>10.0.0.0 - 10.255.255.255</td>
          <td>255.0.0.0 (/8)</td>
          <td>16,777,214</td>
          <td>Large enterprises</td>
        </tr>
        <tr>
          <td>B</td>
          <td>172.16.0.0 - 172.31.255.255</td>
          <td>255.240.0.0 (/12)</td>
          <td>1,048,574</td>
          <td>Medium networks</td>
        </tr>
        <tr>
          <td>C</td>
          <td>192.168.0.0 - 192.168.255.255</td>
          <td>255.255.0.0 (/16)</td>
          <td>65,534</td>
          <td>Home/small office</td>
        </tr>
      </tbody>
    </table>

    <h4>Subnetting Example</h4>
    <div class="code-block">
      <pre><code>Network: 192.168.1.0/24 (256 addresses)
Subnet Mask: 255.255.255.0

Subnetting into 4 subnets (/26):
┌─────────────────────────────────────────────────────────────┐
│ Subnet 1: 192.168.1.0/26   (192.168.1.1-192.168.1.62)    │
│ Subnet 2: 192.168.1.64/26  (192.168.1.65-192.168.1.126)  │
│ Subnet 3: 192.168.1.128/26 (192.168.1.129-192.168.1.190) │
│ Subnet 4: 192.168.1.192/26 (192.168.1.193-192.168.1.254) │
└─────────────────────────────────────────────────────────────┘

Each subnet: 64 addresses (62 usable hosts)</code></pre>
    </div>

    <h4>IPv6 Addressing</h4>
    <p><strong>Format:</strong> 128-bit address in hexadecimal (e.g., 2001:0db8:85a3:0000:0000:8a2e:0370:7334)</p>
    <p><strong>Benefits:</strong></p>
    <ul>
      <li><strong>Address Space:</strong> 340 undecillion addresses</li>
      <li><strong>Auto-configuration:</strong> Stateless address configuration</li>
      <li><strong>Security:</strong> Built-in IPSec support</li>
      <li><strong>Efficiency:</strong> Improved routing and packet processing</li>
    </ul>

    <h3>Network Types and Topologies</h3>
    <p>Networks are classified by their geographical scope and physical/logical arrangement.</p>

    <h4>Network Types by Scope</h4>
    <table>
      <thead>
        <tr>
          <th>Type</th>
          <th>Scope</th>
          <th>Range</th>
          <th>Examples</th>
          <th>Technologies</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>PAN</td>
          <td>Personal Area Network</td>
          <td>1-10 meters</td>
          <td>Bluetooth, USB</td>
          <td>Bluetooth, USB, NFC</td>
        </tr>
        <tr>
          <td>LAN</td>
          <td>Local Area Network</td>
          <td>Building/Campus</td>
          <td>Office, School</td>
          <td>Ethernet, WiFi</td>
        </tr>
        <tr>
          <td>MAN</td>
          <td>Metropolitan Area Network</td>
          <td>City/Metro Area</td>
          <td>City networks</td>
          <td>Fiber, WiMAX</td>
        </tr>
        <tr>
          <td>WAN</td>
          <td>Wide Area Network</td>
          <td>Country/Global</td>
          <td>Internet, Corporate</td>
          <td>MPLS, Satellite</td>
        </tr>
      </tbody>
    </table>

    <h4>Network Topologies</h4>
    <div class="code-block">
      <pre><code>Common Network Topologies:

Star Topology:           Bus Topology:
    [Hub]                ─────────────────
   /  |  \\               │   │   │   │   │
  A   B   C              A   B   C   D   E

Ring Topology:          Mesh Topology:
  A ─── B                A ─── B
  │     │                │ \\ / │
  D ─── C                │  X  │
                         │ / \\ │
                         D ─── C</code></pre>
    </div>

    <h4>Topology Comparison</h4>
    <table>
      <thead>
        <tr>
          <th>Topology</th>
          <th>Advantages</th>
          <th>Disadvantages</th>
          <th>Use Cases</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Star</td>
          <td>Easy to manage, fault isolation</td>
          <td>Single point of failure</td>
          <td>Office networks, home WiFi</td>
        </tr>
        <tr>
          <td>Bus</td>
          <td>Simple, cost-effective</td>
          <td>Collision domain, hard to troubleshoot</td>
          <td>Legacy networks, simple LANs</td>
        </tr>
        <tr>
          <td>Ring</td>
          <td>Equal access, no collisions</td>
          <td>Single point of failure</td>
          <td>Token Ring, fiber networks</td>
        </tr>
        <tr>
          <td>Mesh</td>
          <td>High redundancy, fault tolerance</td>
          <td>Complex, expensive</td>
          <td>Internet backbone, data centers</td>
        </tr>
      </tbody>
    </table>

    <details>
      <summary><strong>Example: Amazon's Data Center Network Topology</strong></summary>
      <div class="info-note">
        Amazon's AWS data centers use a sophisticated mesh topology called "Clos network" with multiple redundant paths between servers. Each data center has 100,000+ servers connected through a three-tier architecture: Top-of-Rack switches, Aggregation switches, and Core switches. This design provides 99.99% uptime, handles 1+ trillion operations daily, and automatically routes around failures in milliseconds, ensuring uninterrupted service for millions of AWS customers globally.
      </div>
    </details>

    <h3>Network Devices and Components</h3>
    <p>Network devices operate at different OSI layers to enable communication and manage traffic flow.</p>

    <h4>Layer 1 Devices (Physical)</h4>
    <ul>
      <li><strong>Hubs:</strong> Multi-port repeaters, single collision domain</li>
      <li><strong>Repeaters:</strong> Amplify signals, extend network range</li>
      <li><strong>Cables:</strong> Ethernet, fiber optic, coaxial</li>
    </ul>

    <h4>Layer 2 Devices (Data Link)</h4>
    <ul>
      <li><strong>Switches:</strong> Learn MAC addresses, separate collision domains</li>
      <li><strong>Bridges:</strong> Connect network segments, filter traffic</li>
      <li><strong>Wireless Access Points:</strong> Provide WiFi connectivity</li>
    </ul>

    <h4>Layer 3 Devices (Network)</h4>
    <ul>
      <li><strong>Routers:</strong> Route packets between networks, use IP addresses</li>
      <li><strong>Layer 3 Switches:</strong> Combine switching and routing functions</li>
      <li><strong>Firewalls:</strong> Control network traffic based on security rules</li>
    </ul>

    <h4>Device Comparison</h4>
    <table>
      <thead>
        <tr>
          <th>Device</th>
          <th>OSI Layer</th>
          <th>Function</th>
          <th>Addressing</th>
          <th>Collision Domains</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Hub</td>
          <td>Physical</td>
          <td>Signal amplification</td>
          <td>None</td>
          <td>Single</td>
        </tr>
        <tr>
          <td>Switch</td>
          <td>Data Link</td>
          <td>Frame forwarding</td>
          <td>MAC addresses</td>
          <td>Per port</td>
        </tr>
        <tr>
          <td>Router</td>
          <td>Network</td>
          <td>Packet routing</td>
          <td>IP addresses</td>
          <td>Per interface</td>
        </tr>
      </tbody>
    </table>

    <h3>Routing and Switching</h3>
    <p>Routing determines the best path for data packets, while switching forwards frames within a network segment.</p>

    <h4>Routing Protocols</h4>
    <ul>
      <li><strong>Static Routing:</strong> Manually configured routes</li>
      <li><strong>Dynamic Routing:</strong> Automatic route discovery and updates</li>
      <li><strong>Interior Gateway Protocols (IGP):</strong> RIP, OSPF, EIGRP</li>
      <li><strong>Exterior Gateway Protocols (EGP):</strong> BGP</li>
    </ul>

    <h4>Switching Methods</h4>
    <ul>
      <li><strong>Store-and-Forward:</strong> Receives entire frame before forwarding</li>
      <li><strong>Cut-Through:</strong> Forwards frame after reading destination address</li>
      <li><strong>Fragment-Free:</strong> Checks first 64 bytes for errors</li>
    </ul>

    <h4>Routing Table Example</h4>
    <div class="code-block">
      <pre><code>Routing Table (Router):
Destination     Gateway         Interface    Metric
0.0.0.0         192.168.1.1     eth0         1
192.168.1.0/24  0.0.0.0         eth1         0
10.0.0.0/8      192.168.1.100   eth0         2
172.16.0.0/16   192.168.1.200   eth0         3

MAC Address Table (Switch):
VLAN  MAC Address        Type    Ports
1     00:1B:44:11:3A:B7  Dynamic Fa0/1
1     00:09:0F:09:00:01  Dynamic Fa0/2
1     00:0C:29:B5:B8:9A  Dynamic Fa0/3</code></pre>
    </div>

    <h3>Network Security Fundamentals</h3>
    <p>Network security protects network infrastructure and data from unauthorized access and attacks.</p>

    <h4>Common Security Threats</h4>
    <ul>
      <li><strong>DDoS Attacks:</strong> Overwhelming network resources</li>
      <li><strong>Man-in-the-Middle:</strong> Intercepting communications</li>
      <li><strong>Packet Sniffing:</strong> Capturing network traffic</li>
      <li><strong>Port Scanning:</strong> Discovering open services</li>
      <li><strong>ARP Spoofing:</strong> Redirecting network traffic</li>
    </ul>

    <h4>Security Measures</h4>
    <ul>
      <li><strong>Firewalls:</strong> Control network access</li>
      <li><strong>VPNs:</strong> Secure remote connections</li>
      <li><strong>Encryption:</strong> Protect data in transit</li>
      <li><strong>Access Control Lists (ACLs):</strong> Filter traffic</li>
      <li><strong>Network Segmentation:</strong> Isolate network sections</li>
    </ul>

    <details>
      <summary><strong>Example: Cloudflare's DDoS Protection</strong></summary>
      <div class="info-note">
        Cloudflare's global network spans 300+ cities and handles 50+ million HTTP requests per second. Their DDoS protection automatically detects and mitigates attacks, including the largest recorded DDoS attack of 3.8 Tbps in 2023. Using anycast routing and machine learning, Cloudflare can absorb massive attacks while maintaining 99.99% uptime for 26+ million internet properties, protecting websites from attacks that would otherwise bring down entire data centers.
      </div>
    </details>

    <h3>Network Performance and Optimization</h3>
    <p>Network performance depends on various factors including bandwidth, latency, throughput, and congestion.</p>

    <h4>Performance Metrics</h4>
    <table>
      <thead>
        <tr>
          <th>Metric</th>
          <th>Definition</th>
          <th>Measurement</th>
          <th>Typical Values</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Bandwidth</td>
          <td>Maximum data transfer rate</td>
          <td>Bits per second (bps)</td>
          <td>1 Gbps (Ethernet)</td>
        </tr>
        <tr>
          <td>Latency</td>
          <td>Time for data to travel</td>
          <td>Milliseconds (ms)</td>
          <td>10-50ms (LAN)</td>
        </tr>
        <tr>
          <td>Throughput</td>
          <td>Actual data transfer rate</td>
          <td>Bits per second (bps)</td>
          <td>80% of bandwidth</td>
        </tr>
        <tr>
          <td>Jitter</td>
          <td>Variation in latency</td>
          <td>Milliseconds (ms)</td>
          <td><30ms (VoIP)</td>
        </tr>
        <tr>
          <td>Packet Loss</td>
          <td>Percentage of lost packets</td>
          <td>Percentage (%)</td>
          <td><0.1% (good)</td>
        </tr>
      </tbody>
    </table>

    <h4>Optimization Techniques</h4>
    <ul>
      <li><strong>Quality of Service (QoS):</strong> Prioritize critical traffic</li>
      <li><strong>Traffic Shaping:</strong> Control bandwidth usage</li>
      <li><strong>Load Balancing:</strong> Distribute traffic across paths</li>
      <li><strong>Caching:</strong> Store frequently accessed data locally</li>
      <li><strong>Compression:</strong> Reduce data size for transmission</li>
    </ul>

    <h3>Wireless Networking</h3>
    <p>Wireless networks use radio waves to connect devices without physical cables.</p>

    <h4>WiFi Standards</h4>
    <table>
      <thead>
        <tr>
          <th>Standard</th>
          <th>Year</th>
          <th>Frequency</th>
          <th>Max Speed</th>
          <th>Range</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>802.11n (WiFi 4)</td>
          <td>2009</td>
          <td>2.4/5 GHz</td>
          <td>600 Mbps</td>
          <td>70m indoor</td>
        </tr>
        <tr>
          <td>802.11ac (WiFi 5)</td>
          <td>2013</td>
          <td>5 GHz</td>
          <td>3.5 Gbps</td>
          <td>35m indoor</td>
        </tr>
        <tr>
          <td>802.11ax (WiFi 6)</td>
          <td>2019</td>
          <td>2.4/5 GHz</td>
          <td>9.6 Gbps</td>
          <td>70m indoor</td>
        </tr>
        <tr>
          <td>802.11be (WiFi 7)</td>
          <td>2024</td>
          <td>2.4/5/6 GHz</td>
          <td>46 Gbps</td>
          <td>100m indoor</td>
        </tr>
      </tbody>
    </table>

    <h4>Wireless Security</h4>
    <ul>
      <li><strong>WEP:</strong> Weak encryption (deprecated)</li>
      <li><strong>WPA:</strong> Improved security with TKIP</li>
      <li><strong>WPA2:</strong> Strong AES encryption</li>
      <li><strong>WPA3:</strong> Latest standard with enhanced security</li>
    </ul>

    <h3>Conclusion</h3>
    <p>Computer networking forms the foundation of modern digital communication and enables global connectivity. Understanding networking concepts is essential for designing, implementing, and troubleshooting network infrastructure in today's interconnected world.</p>

    <p>Key takeaways for networking professionals:</p>
    <ul>
      <li><strong>Layered Architecture:</strong> OSI and TCP/IP models provide systematic approaches</li>
      <li><strong>Protocol Knowledge:</strong> Understanding TCP/UDP and application protocols</li>
      <li><strong>Addressing Systems:</strong> IPv4/IPv6 and subnetting for network design</li>
      <li><strong>Security Awareness:</strong> Implementing proper security measures</li>
      <li><strong>Performance Optimization:</strong> Monitoring and tuning network performance</li>
    </ul>

    <h3>References</h3>
    <ul>
      <li><a href="https://www.cisco.com/c/en/us/support/docs/ip/routing-information-protocol-rip/13769-5.html" target="_blank">Cisco Networking Fundamentals</a></li>
      <li><a href="https://tools.ietf.org/rfc/rfc791.txt" target="_blank">RFC 791 - Internet Protocol</a></li>
      <li><a href="https://tools.ietf.org/rfc/rfc793.txt" target="_blank">RFC 793 - Transmission Control Protocol</a></li>
      <li><a href="https://www.ieee.org/standards/" target="_blank">IEEE Networking Standards</a></li>
      <li><a href="https://www.iana.org/" target="_blank">Internet Assigned Numbers Authority</a></li>
    </ul>
  `
}; 