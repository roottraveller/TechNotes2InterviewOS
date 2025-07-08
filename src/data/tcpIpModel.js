export const tcpIpModel = {
  id: 'tcp-ip-model',
  title: 'TCP/IP Model',
  content: `
<p>The TCP/IP model is a concise version of the OSI model, containing four layers instead of seven. It was developed by the Department of Defense (DoD) and is the foundation of the modern internet.</p>

    <h3>The Four Layers</h3>
    
    <h4>Layer 4: Application Layer</h4>
    <ul>
      <li><strong>Combines:</strong> OSI Application, Presentation, and Session layers</li>
      <li><strong>Function:</strong> Provides network services to applications</li>
      <li><strong>Protocols:</strong> HTTP, HTTPS, FTP, SMTP, DNS, SSH, Telnet</li>
      <li><strong>Responsibilities:</strong> Data formatting, encryption, session management</li>
      <li><strong>Port Numbers:</strong> Identifies specific applications (80 for HTTP, 443 for HTTPS)</li>
    </ul>

    <h4>Layer 3: Transport Layer</h4>
    <ul>
      <li><strong>Equivalent to:</strong> OSI Transport layer</li>
      <li><strong>Function:</strong> End-to-end message delivery and error recovery</li>
      <li><strong>Protocols:</strong> TCP (reliable), UDP (unreliable)</li>
      <li><strong>TCP Features:</strong> Connection-oriented, flow control, error checking</li>
      <li><strong>UDP Features:</strong> Connectionless, faster, no error recovery</li>
    </ul>

    <h4>Layer 2: Internet Layer</h4>
    <ul>
      <li><strong>Equivalent to:</strong> OSI Network layer</li>
      <li><strong>Function:</strong> Routing packets across networks</li>
      <li><strong>Protocols:</strong> IP (IPv4/IPv6), ICMP, ARP, RARP</li>
      <li><strong>Responsibilities:</strong> Logical addressing, path determination</li>
      <li><strong>Key Component:</strong> IP addressing and subnetting</li>
    </ul>

    <h4>Layer 1: Network Access Layer (Link Layer)</h4>
    <ul>
      <li><strong>Combines:</strong> OSI Physical and Data Link layers</li>
      <li><strong>Function:</strong> Physical transmission of data</li>
      <li><strong>Protocols:</strong> Ethernet, Wi-Fi, PPP, Frame Relay</li>
      <li><strong>Components:</strong> NICs, switches, physical cabling</li>
      <li><strong>Addressing:</strong> MAC addresses</li>
    </ul>

    <h3>TCP vs UDP Comparison</h3>
    
    <table>
      <thead>
        <tr>
          <th>Feature</th>
          <th>TCP</th>
          <th>UDP</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Connection</strong></td>
          <td>Connection-oriented</td>
          <td>Connectionless</td>
        </tr>
        <tr>
          <td><strong>Reliability</strong></td>
          <td>Reliable (ACK needed)</td>
          <td>Unreliable</td>
        </tr>
        <tr>
          <td><strong>Ordering</strong></td>
          <td>Ordered delivery</td>
          <td>No ordering</td>
        </tr>
        <tr>
          <td><strong>Speed</strong></td>
          <td>Slower</td>
          <td>Faster</td>
        </tr>
        <tr>
          <td><strong>Header Size</strong></td>
          <td>20 bytes minimum</td>
          <td>8 bytes</td>
        </tr>
        <tr>
          <td><strong>Use Cases</strong></td>
          <td>Web, Email, File Transfer</td>
          <td>Streaming, Gaming, DNS</td>
        </tr>
      </tbody>
    </table>

    <h3>TCP Three-Way Handshake</h3>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>1. SYN (Synchronize)
   Client → Server
   "I want to establish a connection"
   Seq = x

2. SYN-ACK (Synchronize-Acknowledge)
   Server → Client
   "I acknowledge and also want to connect"
   Seq = y, Ack = x + 1

3. ACK (Acknowledge)
   Client → Server
   "Connection established"
   Seq = x + 1, Ack = y + 1

Connection Established!</code></pre>
    </div>

    <h3>TCP Connection Termination</h3>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>1. FIN (Finish)
   Client → Server
   "I want to close the connection"

2. ACK
   Server → Client
   "I acknowledge your request"

3. FIN
   Server → Client
   "I also want to close"

4. ACK
   Client → Server
   "Connection closed"</code></pre>
    </div>

    <h3>Common Port Numbers</h3>
    
    <h4>Well-Known Ports (0-1023)</h4>
    <ul>
      <li><strong>20/21:</strong> FTP (Data/Control)</li>
      <li><strong>22:</strong> SSH</li>
      <li><strong>23:</strong> Telnet</li>
      <li><strong>25:</strong> SMTP</li>
      <li><strong>53:</strong> DNS</li>
      <li><strong>80:</strong> HTTP</li>
      <li><strong>110:</strong> POP3</li>
      <li><strong>143:</strong> IMAP</li>
      <li><strong>443:</strong> HTTPS</li>
    </ul>

    <h4>Registered Ports (1024-49151)</h4>
    <ul>
      <li><strong>3306:</strong> MySQL</li>
      <li><strong>5432:</strong> PostgreSQL</li>
      <li><strong>6379:</strong> Redis</li>
      <li><strong>8080:</strong> HTTP Alternate</li>
      <li><strong>9092:</strong> Kafka</li>
      <li><strong>27017:</strong> MongoDB</li>
    </ul>

    <h3>IP Addressing</h3>
    
    <h4>IPv4</h4>
    <ul>
      <li>32-bit address (4 octets)</li>
      <li>Format: xxx.xxx.xxx.xxx (0-255 each)</li>
      <li>Total addresses: ~4.3 billion</li>
      <li>Private ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16</li>
    </ul>

    <h4>IPv6</h4>
    <ul>
      <li>128-bit address</li>
      <li>Format: xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx</li>
      <li>Total addresses: 340 undecillion</li>
      <li>Built-in security and QoS</li>
    </ul>

    <h3>TCP/IP Protocol Suite</h3>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>Application Layer Protocols:
- HTTP/HTTPS: Web browsing
- FTP/SFTP: File transfer
- SMTP/POP3/IMAP: Email
- DNS: Name resolution
- DHCP: Dynamic IP assignment

Transport Layer Protocols:
- TCP: Reliable, ordered delivery
- UDP: Fast, unreliable delivery

Internet Layer Protocols:
- IP: Packet routing
- ICMP: Error messages and diagnostics (ping)
- ARP: IP to MAC address resolution
- RARP: MAC to IP address resolution

Network Access Layer:
- Ethernet: Wired networks
- Wi-Fi (802.11): Wireless networks
- PPP: Point-to-point connections</code></pre>
    </div>

    <h3>Advantages of TCP/IP</h3>
    <ul>
      <li><strong>Scalability:</strong> Works from small to global networks</li>
      <li><strong>Interoperability:</strong> Platform and vendor independent</li>
      <li><strong>Routability:</strong> Efficient packet routing</li>
      <li><strong>Robustness:</strong> Automatic error recovery</li>
      <li><strong>Flexibility:</strong> Supports various physical networks</li>
    </ul>

    <h3>Related Links</h3>
    <ul>
      <li><a href="https://www.scaler.com/topics/computer-network/tcp-ip-protocol-suite/" target="_blank">TCP/IP Protocol Suite - Scaler</a></li>
      <li><a href="https://www.geeksforgeeks.org/tcp-ip-model/" target="_blank">TCP/IP Model - GeeksforGeeks</a></li>
      <li><a href="https://www.educative.io/answers/tcp-vs-udp" target="_blank">TCP vs UDP - Educative</a></li>
      <li><a href="https://www.scaler.com/topics/computer-network/tcp-vs-udp/" target="_blank">TCP vs UDP - Scaler</a></li>
    </ul>
`
};