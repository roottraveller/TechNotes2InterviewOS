export const tcpVsUdp = {
  id: 'tcp-vs-udp',
  title: 'TCP vs UDP',
  content: `
<p>TCP (Transmission Control Protocol) and UDP (User Datagram Protocol) are the two main transport layer protocols in the Internet Protocol suite. They serve different purposes and have distinct characteristics.</p>

    <h3>TCP (Transmission Control Protocol)</h3>
    <p>TCP is a connection-oriented, reliable protocol that ensures data delivery through acknowledgments and retransmissions. It provides ordered, error-checked delivery of data between applications.</p>

    <h4>TCP Characteristics</h4>
    <ul>
      <li><strong>Connection-Oriented:</strong> Establishes connection before data transfer</li>
      <li><strong>Reliable:</strong> Guarantees delivery through acknowledgments</li>
      <li><strong>Ordered:</strong> Data arrives in the same order it was sent</li>
      <li><strong>Error Checking:</strong> Detects and retransmits corrupted data</li>
      <li><strong>Flow Control:</strong> Prevents overwhelming the receiver</li>
      <li><strong>Congestion Control:</strong> Adapts to network conditions</li>
    </ul>

    <h3>UDP (User Datagram Protocol)</h3>
    <p>UDP is a connectionless, unreliable protocol that sends data without establishing a connection or guaranteeing delivery. It's faster but less reliable than TCP.</p>

    <h4>UDP Characteristics</h4>
    <ul>
      <li><strong>Connectionless:</strong> No connection establishment needed</li>
      <li><strong>Unreliable:</strong> No delivery guarantees</li>
      <li><strong>Unordered:</strong> Packets may arrive out of order</li>
      <li><strong>No Flow Control:</strong> Sender doesn't adapt to receiver</li>
      <li><strong>Low Overhead:</strong> Minimal protocol overhead</li>
      <li><strong>Fast:</strong> No connection setup or acknowledgments</li>
    </ul>

    <h3>Comparison Table</h3>
    
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
          <td>Unreliable (no ACK)</td>
        </tr>
        <tr>
          <td><strong>Ordering</strong></td>
          <td>In-order delivery</td>
          <td>No ordering guarantee</td>
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
          <td><strong>Error Checking</strong></td>
          <td>Yes, with recovery</td>
          <td>Yes, but no recovery</td>
        </tr>
        <tr>
          <td><strong>Flow Control</strong></td>
          <td>Yes</td>
          <td>No</td>
        </tr>
        <tr>
          <td><strong>Congestion Control</strong></td>
          <td>Yes</td>
          <td>No</td>
        </tr>
        <tr>
          <td><strong>Broadcasting</strong></td>
          <td>No</td>
          <td>Yes</td>
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
      <pre><code>1. SYN: Client → Server
   - Client sends SYN packet with initial sequence number
   - "Hey, I want to establish a connection"

2. SYN-ACK: Server → Client
   - Server responds with SYN-ACK
   - "OK, I acknowledge your request, here's my sequence number"

3. ACK: Client → Server
   - Client sends ACK to complete handshake
   - "Great, connection established"

Connection established - data transfer can begin</code></pre>
    </div>

    <h3>TCP Connection Termination</h3>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>1. FIN: Initiator → Receiver
   - "I'm done sending data"

2. ACK: Receiver → Initiator
   - "OK, I acknowledge your FIN"

3. FIN: Receiver → Initiator
   - "I'm also done sending data"

4. ACK: Initiator → Receiver
   - "OK, connection closed"

Connection terminated</code></pre>
    </div>

    <h3>Use Cases</h3>
    
    <h4>When to Use TCP</h4>
    <ul>
      <li><strong>Web Browsing (HTTP/HTTPS):</strong> Reliable page loading</li>
      <li><strong>Email (SMTP, POP3, IMAP):</strong> Ensure message delivery</li>
      <li><strong>File Transfer (FTP, SFTP):</strong> Complete file integrity</li>
      <li><strong>Database Connections:</strong> Consistent data transfer</li>
      <li><strong>SSH:</strong> Secure remote access</li>
      <li><strong>Any scenario requiring guaranteed delivery</strong></li>
    </ul>

    <h4>When to Use UDP</h4>
    <ul>
      <li><strong>Live Streaming:</strong> Speed over reliability</li>
      <li><strong>Online Gaming:</strong> Low latency critical</li>
      <li><strong>VoIP:</strong> Real-time communication</li>
      <li><strong>DNS Queries:</strong> Quick lookups</li>
      <li><strong>DHCP:</strong> Network configuration</li>
      <li><strong>IoT Sensors:</strong> Frequent small updates</li>
      <li><strong>Broadcasting/Multicasting:</strong> One-to-many communication</li>
    </ul>

    <h3>Protocol Headers</h3>
    
    <h4>TCP Header (20 bytes minimum)</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>0                   1                   2                   3
0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|          Source Port          |       Destination Port        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                        Sequence Number                        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Acknowledgment Number                      |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|  Data |           |U|A|P|R|S|F|                               |
| Offset| Reserved  |R|C|S|S|Y|I|            Window             |
|       |           |G|K|H|T|N|N|                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|           Checksum            |         Urgent Pointer        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+</code></pre>
    </div>

    <h4>UDP Header (8 bytes)</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>0                   1                   2                   3
0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|          Source Port          |       Destination Port        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|            Length             |           Checksum            |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+</code></pre>
    </div>

    <h3>Performance Considerations</h3>
    
    <h4>TCP Performance</h4>
    <ul>
      <li><strong>Latency:</strong> Higher due to handshake and acknowledgments</li>
      <li><strong>Throughput:</strong> Can be high with proper tuning</li>
      <li><strong>CPU Usage:</strong> Higher due to state management</li>
      <li><strong>Memory:</strong> Maintains connection state and buffers</li>
    </ul>

    <h4>UDP Performance</h4>
    <ul>
      <li><strong>Latency:</strong> Lower, no connection overhead</li>
      <li><strong>Throughput:</strong> Can be higher for small messages</li>
      <li><strong>CPU Usage:</strong> Lower, minimal processing</li>
      <li><strong>Memory:</strong> No connection state to maintain</li>
    </ul>

    <h3>Hybrid Approaches</h3>
    
    <h4>QUIC Protocol</h4>
    <ul>
      <li>Built on UDP but provides reliability</li>
      <li>Used in HTTP/3</li>
      <li>Faster connection establishment</li>
      <li>Better handling of packet loss</li>
    </ul>

    <h4>Reliable UDP</h4>
    <ul>
      <li>Application-layer reliability over UDP</li>
      <li>Custom acknowledgment mechanisms</li>
      <li>Used in gaming and streaming</li>
    </ul>

    <h3>Related Links</h3>
    <ul>
      <li><a href="https://www.educative.io/answers/tcp-vs-udp" target="_blank">TCP vs UDP - Educative</a></li>
      <li><a href="https://www.scaler.com/topics/computer-network/tcp-vs-udp/" target="_blank">TCP vs UDP - Scaler</a></li>
    </ul>
`
}; 