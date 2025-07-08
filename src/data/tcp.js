export const tcp = {
  id: 'tcp',
  title: 'TCP (Transmission Control Protocol)',
  content: `
    <h2>TCP (Transmission Control Protocol)</h2>
    <p><strong>TCP is a reliable, connection-oriented transport layer protocol that provides guaranteed delivery of data packets in the correct order between applications running on networked devices.</strong></p>

    <h3>Core Characteristics & Performance Impact</h3>
    <table border="1" style="border-collapse: collapse; width: 100%; margin: 20px 0;">
      <tr style="background-color: #f5f5f5;">
        <th style="padding: 12px; text-align: left;">Characteristic</th>
        <th style="padding: 12px; text-align: left;">TCP Implementation</th>
        <th style="padding: 12px; text-align: left;">Performance Impact</th>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>Connection Management</strong></td>
        <td style="padding: 10px;">3-way handshake establishment</td>
        <td style="padding: 10px;">+1.5 RTT overhead per connection</td>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>Reliability</strong></td>
        <td style="padding: 10px;">ACK + sequence numbers</td>
        <td style="padding: 10px;">99.9% delivery guarantee</td>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>Flow Control</strong></td>
        <td style="padding: 10px;">Sliding window protocol</td>
        <td style="padding: 10px;">Prevents buffer overflow</td>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>Congestion Control</strong></td>
        <td style="padding: 10px;">AIMD (Additive Increase, Multiplicative Decrease)</td>
        <td style="padding: 10px;">Adapts to network conditions</td>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>Error Detection</strong></td>
        <td style="padding: 10px;">16-bit checksum</td>
        <td style="padding: 10px;">Detects 99.998% of errors</td>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>Ordering</strong></td>
        <td style="padding: 10px;">Sequence number ordering</td>
        <td style="padding: 10px;">Maintains data integrity</td>
      </tr>
    </table>

    <h3>TCP Header Structure (20 bytes minimum)</h3>
    <div class="code-block">
      <div class="code-label">TCP HEADER STRUCTURE</div>
      <pre><code>
 0                   1                   2                   3
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
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Options                    |    Padding    |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

Key Fields:
• Source/Destination Port (16 bits each): Application endpoints
• Sequence Number (32 bits): Data ordering and reliability
• Acknowledgment Number (32 bits): Confirms received data
• Window Size (16 bits): Flow control mechanism
• Flags (6 bits): Control connection state
• Checksum (16 bits): Error detection
      </code></pre>
    </div>

    <h3>TCP Connection Lifecycle</h3>
    
    <h4>1. Connection Establishment (3-Way Handshake)</h4>
    <div class="code-block">
      <div class="code-label">3-WAY HANDSHAKE</div>
      <pre><code>
Client                                    Server
  |                                         |
  |----------- SYN (seq=x) --------------->|  Step 1: Client initiates
  |                                         |
  |<------ SYN-ACK (seq=y, ack=x+1) -------|  Step 2: Server responds
  |                                         |
  |----------- ACK (ack=y+1) ------------->|  Step 3: Client confirms
  |                                         |
  |<============ Data Transfer ============>|  Connection established
  
Timing Analysis:
• Total time: 1.5 RTT (Round Trip Time)
• SYN → SYN-ACK: 0.5 RTT
• SYN-ACK → ACK: 0.5 RTT
• Data can start: 1.0 RTT
• Simultaneous Open: Both sides send SYN (rare)
      </code></pre>
    </div>

    <h4>2. Data Transfer Phase</h4>
    <div class="code-block">
      <div class="code-label">DATA TRANSFER</div>
      <pre><code>
Sender                                    Receiver
  |                                         |
  |------ Data (seq=100, len=50) --------->|  Send data segment
  |                                         |
  |<--------- ACK (ack=150) ---------------|  Acknowledge receipt
  |                                         |
  |------ Data (seq=150, len=100) -------->|  Next data segment
  |                                         |
  |<--------- ACK (ack=250) ---------------|  Cumulative ACK
  
Sequence Numbers:
• Initial sequence number: Random 32-bit value
• Incremented by data bytes sent
• Acknowledgment = Next expected sequence number
• Cumulative acknowledgment: ACKs all data up to sequence number
      </code></pre>
    </div>

    <h4>3. Connection Termination (4-Way Handshake)</h4>
    <div class="code-block">
      <div class="code-label">4-WAY HANDSHAKE</div>
      <pre><code>
Client                                    Server
  |                                         |
  |----------- FIN (seq=x) --------------->|  Step 1: Client closes
  |                                         |
  |<---------- ACK (ack=x+1) --------------|  Step 2: Server ACKs
  |                                         |
  |<---------- FIN (seq=y) ----------------|  Step 3: Server closes
  |                                         |
  |----------- ACK (ack=y+1) ------------->|  Step 4: Client ACKs
  |                                         |
  |<========== TIME_WAIT (2MSL) ==========|  Wait for delayed packets
  
States:
• FIN_WAIT_1: Waiting for FIN ACK
• FIN_WAIT_2: Waiting for remote FIN
• TIME_WAIT: 2×MSL (Maximum Segment Lifetime)
• CLOSED: Connection fully terminated
      </code></pre>
    </div>

    <h3>TCP Flow Control (Sliding Window)</h3>
    <div class="code-block">
      <div class="code-label">SLIDING WINDOW MECHANISM</div>
      <pre><code>
Sender Window (Send Buffer):
[Sent & ACKed][Sent, Not ACKed][Can Send][Cannot Send]
             ^                ^         ^
         Last ACK        Next to Send  Window End

Receiver Window (Receive Buffer):
[Received & ACKed][Can Receive][Cannot Receive]
                 ^             ^
            Next Expected   Window End

Window Size Dynamics:
• Advertised Window: Receiver tells sender available buffer space
• Effective Window: Min(advertised window, congestion window)
• Zero Window: Receiver buffer full, sender stops
• Window Probe: Sender checks if window opened
      </code></pre>
    </div>

    <h3>TCP Congestion Control Algorithms</h3>
    
    <h4>1. Slow Start & Congestion Avoidance</h4>
    <div class="code-block">
      <div class="code-label">CONGESTION CONTROL</div>
      <pre><code>
Congestion Window (cwnd) Growth:

Slow Start Phase:
• cwnd starts at 1 MSS (Maximum Segment Size)
• cwnd doubles every RTT (exponential growth)
• Continues until cwnd >= ssthresh (slow start threshold)

Congestion Avoidance Phase:
• cwnd increases by 1 MSS per RTT (linear growth)
• More conservative approach
• Continues until packet loss detected

Packet Loss Detection:
• Timeout: cwnd = 1, ssthresh = cwnd/2, restart slow start
• 3 Duplicate ACKs: Fast retransmit + Fast recovery

Algorithm Evolution:
• Tahoe (1988): Slow start + congestion avoidance
• Reno (1990): Added fast retransmit + fast recovery
• NewReno (1999): Improved fast recovery
• CUBIC (2008): More aggressive for high-speed networks
      </code></pre>
    </div>

    <h4>2. Fast Retransmit & Fast Recovery</h4>
    <div class="code-block">
      <div class="code-label">FAST RETRANSMIT</div>
      <pre><code>
Normal Operation:
Data1 → ACK1
Data2 → ACK2
Data3 → ACK3

Packet Loss Scenario:
Data1 → ACK1
Data2 → (LOST)
Data3 → ACK1 (duplicate)
Data4 → ACK1 (duplicate)
Data5 → ACK1 (duplicate) ← 3rd duplicate triggers fast retransmit

Fast Recovery:
• Retransmit lost packet immediately
• Set ssthresh = cwnd/2
• Set cwnd = ssthresh + 3 MSS
• Continue in congestion avoidance mode
      </code></pre>
    </div>

    <h3>TCP State Machine</h3>
    <div class="code-block">
      <div class="code-label">TCP STATE TRANSITIONS</div>
      <pre><code>
                    CLOSED
                       |
                   listen()
                       |
                    LISTEN
                       |
                  SYN received
                       |
                   SYN_RCVD
                       |
                  ACK received
                       |
Client Side:       ESTABLISHED       Server Side:
    |                  |                  |
connect()         Data Transfer      accept()
    |                  |                  |
SYN_SENT              |               LISTEN
    |                  |                  |
SYN-ACK received      |               SYN received
    |                  |                  |
ESTABLISHED           |               SYN_RCVD
    |                  |                  |
close()               |               close()
    |                  |                  |
FIN_WAIT_1 ←---------- | ----------→ FIN_WAIT_1
    |                  |                  |
FIN_WAIT_2            |               CLOSE_WAIT
    |                  |                  |
TIME_WAIT             |               LAST_ACK
    |                  |                  |
CLOSED ←-------------- | ----------→ CLOSED
      </code></pre>
    </div>

    <h3>TCP Options & Extensions</h3>
    <table border="1" style="border-collapse: collapse; width: 100%; margin: 20px 0;">
      <tr style="background-color: #f5f5f5;">
        <th style="padding: 12px; text-align: left;">Option</th>
        <th style="padding: 12px; text-align: left;">Purpose</th>
        <th style="padding: 12px; text-align: left;">Benefit</th>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>MSS (Maximum Segment Size)</strong></td>
        <td style="padding: 10px;">Negotiate maximum data per segment</td>
        <td style="padding: 10px;">Prevents fragmentation</td>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>Window Scaling</strong></td>
        <td style="padding: 10px;">Scale window size beyond 65KB</td>
        <td style="padding: 10px;">High-speed networks support</td>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>SACK (Selective ACK)</strong></td>
        <td style="padding: 10px;">ACK non-contiguous data blocks</td>
        <td style="padding: 10px;">Faster recovery from multiple losses</td>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>Timestamps</strong></td>
        <td style="padding: 10px;">Measure RTT, prevent sequence wraparound</td>
        <td style="padding: 10px;">Better congestion control</td>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>TCP Fast Open</strong></td>
        <td style="padding: 10px;">Send data in SYN packet</td>
        <td style="padding: 10px;">Reduces connection latency</td>
      </tr>
    </table>

    <h3>TCP Performance Optimization</h3>
    
    <h4>1. Bandwidth-Delay Product (BDP)</h4>
    <div class="code-block">
      <div class="code-label">BDP CALCULATION</div>
      <pre><code>
BDP = Bandwidth × Round Trip Time

Examples:
• 1 Gbps × 100ms = 100 Mbits = 12.5 MB buffer needed
• 10 Gbps × 200ms = 2 Gbits = 250 MB buffer needed

Window Size Requirements:
• TCP window must be ≥ BDP for full utilization
• Default TCP window: 65KB (too small for high-speed)
• Window scaling option: Supports up to 1GB window

Throughput Formula:
Throughput = Window Size / RTT
• 64KB window, 100ms RTT = 640 KB/s = 5.12 Mbps
• Need larger windows for high-speed networks
      </code></pre>
    </div>

    <h4>2. TCP Tuning Parameters</h4>
    <div class="code-block">
      <div class="code-label">SYSTEM TUNING</div>
      <pre><code>
Linux TCP Parameters:
• net.core.rmem_max = 134217728          # Max receive buffer
• net.core.wmem_max = 134217728          # Max send buffer
• net.ipv4.tcp_rmem = 4096 87380 134217728   # Auto-tuning
• net.ipv4.tcp_wmem = 4096 65536 134217728   # Auto-tuning
• net.ipv4.tcp_congestion_control = cubic    # Algorithm choice
• net.ipv4.tcp_window_scaling = 1            # Enable scaling
• net.ipv4.tcp_sack = 1                      # Enable SACK
• net.ipv4.tcp_timestamps = 1                # Enable timestamps

Application-Level Optimizations:
• SO_RCVBUF / SO_SNDBUF: Socket buffer sizes
• TCP_NODELAY: Disable Nagle's algorithm
• TCP_CORK: Batch small writes
• SO_REUSEADDR: Reuse TIME_WAIT sockets
      </code></pre>
    </div>

    <h3>Real-World TCP Applications & Performance</h3>
    
    <h4>High-Performance Examples</h4>
    <table border="1" style="border-collapse: collapse; width: 100%; margin: 20px 0;">
      <tr style="background-color: #f5f5f5;">
        <th style="padding: 12px; text-align: left;">Application</th>
        <th style="padding: 12px; text-align: left;">TCP Usage</th>
        <th style="padding: 12px; text-align: left;">Performance Metrics</th>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>Netflix CDN</strong></td>
        <td style="padding: 10px;">Video streaming delivery</td>
        <td style="padding: 10px;">15+ petabytes/month, 99.9% reliability</td>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>Google Search</strong></td>
        <td style="padding: 10px;">HTTPS connections</td>
        <td style="padding: 10px;">8.5B queries/day, <200ms response</td>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>Amazon AWS</strong></td>
        <td style="padding: 10px;">API calls, data transfer</td>
        <td style="padding: 10px;">Millions of connections/server</td>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>Facebook</strong></td>
        <td style="padding: 10px;">Social media updates</td>
        <td style="padding: 10px;">3B users, real-time messaging</td>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>Stock Trading</strong></td>
        <td style="padding: 10px;">Financial data feeds</td>
        <td style="padding: 10px;"><1ms latency, 99.999% uptime</td>
      </tr>
    </table>

    <h4>TCP vs UDP Performance Comparison</h4>
    <div class="code-block">
      <div class="code-label">PERFORMANCE COMPARISON</div>
      <pre><code>
Metric                  TCP                 UDP
Latency                 Higher (+1.5 RTT)  Lower (immediate)
Throughput              High (reliable)     Higher (no overhead)
CPU Usage               Higher              Lower
Memory Usage            Higher (buffers)    Lower
Reliability             99.9%+              Best effort
Ordering                Guaranteed          Not guaranteed
Flow Control            Yes                 No
Congestion Control      Yes                 No

Use Cases:
TCP: Web browsing, email, file transfer, databases
UDP: Gaming, video streaming, DNS, VoIP, IoT sensors
      </code></pre>
    </div>

    <h3>TCP Security Considerations</h3>
    
    <h4>Common Attack Vectors</h4>
    <ul>
      <li><strong>SYN Flood Attack:</strong> Exhaust server resources with half-open connections</li>
      <li><strong>TCP Hijacking:</strong> Inject packets with correct sequence numbers</li>
      <li><strong>RST Attack:</strong> Forcefully close connections</li>
      <li><strong>Sequence Prediction:</strong> Guess sequence numbers for injection</li>
    </ul>

    <h4>Security Mitigations</h4>
    <div class="code-block">
      <div class="code-label">SECURITY MEASURES</div>
      <pre><code>
SYN Flood Protection:
• SYN Cookies: Stateless connection tracking
• Rate limiting: Limit SYN packets per source
• Firewall rules: Block suspicious traffic

Sequence Number Security:
• Random initial sequence numbers
• Cryptographic sequence generation
• Window size validation

Connection Security:
• TLS/SSL over TCP for encryption
• IPSec for network-layer security
• Firewall rules for access control
      </code></pre>
    </div>

    <h3>TCP Troubleshooting & Monitoring</h3>
    
    <h4>Common Issues & Solutions</h4>
    <table border="1" style="border-collapse: collapse; width: 100%; margin: 20px 0;">
      <tr style="background-color: #f5f5f5;">
        <th style="padding: 12px; text-align: left;">Issue</th>
        <th style="padding: 12px; text-align: left;">Symptoms</th>
        <th style="padding: 12px; text-align: left;">Solution</th>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>High Latency</strong></td>
        <td style="padding: 10px;">Slow response times</td>
        <td style="padding: 10px;">Optimize network path, increase buffer sizes</td>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>Packet Loss</strong></td>
        <td style="padding: 10px;">Retransmissions, timeouts</td>
        <td style="padding: 10px;">Check network congestion, upgrade bandwidth</td>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>Connection Drops</strong></td>
        <td style="padding: 10px;">Frequent reconnections</td>
        <td style="padding: 10px;">Tune keepalive settings, check firewall</td>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>Poor Throughput</strong></td>
        <td style="padding: 10px;">Low bandwidth utilization</td>
        <td style="padding: 10px;">Increase window size, enable window scaling</td>
      </tr>
    </table>

    <h4>Monitoring Tools</h4>
    <div class="code-block">
      <div class="code-label">MONITORING COMMANDS</div>
      <pre><code>
Network Statistics:
• netstat -an: Active connections
• ss -tuln: Socket statistics
• tcpdump: Packet capture
• wireshark: GUI packet analyzer

Performance Metrics:
• sar -n DEV: Network interface statistics
• iperf3: Bandwidth testing
• nload: Real-time traffic monitoring
• iostat: I/O statistics

TCP-Specific:
• cat /proc/net/tcp: TCP connection table
• ss -i: Detailed socket information
• nstat: Network statistics
      </code></pre>
    </div>

    <h3>Interview Questions & Answers</h3>
    
    <h4>Fundamental Questions</h4>
    <div class="qa-section">
      <div class="question">
        <strong>Q: Explain the TCP three-way handshake in detail.</strong>
      </div>
      <div class="answer">
        <strong>A:</strong> The TCP three-way handshake establishes a connection:
        <br>1. <strong>SYN:</strong> Client sends SYN packet with initial sequence number
        <br>2. <strong>SYN-ACK:</strong> Server responds with SYN-ACK, acknowledging client's SYN and sending its own SYN
        <br>3. <strong>ACK:</strong> Client acknowledges server's SYN
        <br>This takes 1.5 RTT and establishes sequence numbers for both directions.
      </div>
    </div>

    <div class="qa-section">
      <div class="question">
        <strong>Q: What happens if a TCP packet is lost?</strong>
      </div>
      <div class="answer">
        <strong>A:</strong> TCP uses several mechanisms:
        <br>• <strong>Timeout:</strong> Sender retransmits if no ACK received within RTO
        <br>• <strong>Fast Retransmit:</strong> 3 duplicate ACKs trigger immediate retransmission
        <br>• <strong>SACK:</strong> Selective acknowledgment helps identify specific lost packets
        <br>• <strong>Congestion Control:</strong> Reduces sending rate to prevent further losses
      </div>
    </div>

    <div class="qa-section">
      <div class="question">
        <strong>Q: How does TCP flow control work?</strong>
      </div>
      <div class="answer">
        <strong>A:</strong> TCP uses sliding window protocol:
        <br>• <strong>Window Size:</strong> Receiver advertises available buffer space
        <br>• <strong>Sender Limit:</strong> Cannot send more than advertised window
        <br>• <strong>Zero Window:</strong> Receiver can stop sender when buffer full
        <br>• <strong>Window Update:</strong> Receiver sends updated window size as buffer frees
      </div>
    </div>

    <div class="qa-section">
      <div class="question">
        <strong>Q: Explain TCP congestion control algorithms.</strong>
      </div>
      <div class="answer">
        <strong>A:</strong> TCP uses multiple algorithms:
        <br>• <strong>Slow Start:</strong> Exponential increase until ssthresh
        <br>• <strong>Congestion Avoidance:</strong> Linear increase after ssthresh
        <br>• <strong>Fast Retransmit:</strong> Immediate retransmission on 3 duplicate ACKs
        <br>• <strong>Fast Recovery:</strong> Avoid slow start after fast retransmit
        <br>Modern variants: CUBIC, BBR optimize for different network conditions.
      </div>
    </div>

    <div class="qa-section">
      <div class="question">
        <strong>Q: What is the TIME_WAIT state and why is it needed?</strong>
      </div>
      <div class="answer">
        <strong>A:</strong> TIME_WAIT ensures reliable connection termination:
        <br>• <strong>Duration:</strong> 2×MSL (Maximum Segment Lifetime)
        <br>• <strong>Purpose:</strong> Handle delayed packets from closed connection
        <br>• <strong>Final ACK:</strong> Ensures final ACK reaches remote peer
        <br>• <strong>Sequence Space:</strong> Prevents sequence number reuse
        <br>Can cause port exhaustion in high-connection scenarios.
      </div>
    </div>

    <div class="qa-section">
      <div class="question">
        <strong>Q: How would you optimize TCP for high-speed networks?</strong>
      </div>
      <div class="answer">
        <strong>A:</strong> Several optimizations:
        <br>• <strong>Window Scaling:</strong> Enable large windows (>64KB)
        <br>• <strong>SACK:</strong> Selective acknowledgment for faster recovery
        <br>• <strong>Timestamps:</strong> Better RTT measurement
        <br>• <strong>Buffer Tuning:</strong> Increase socket buffers
        <br>• <strong>Algorithm Choice:</strong> Use CUBIC or BBR for high-speed links
        <br>• <strong>TCP Fast Open:</strong> Reduce connection establishment overhead
      </div>
    </div>

    <div class="qa-section">
      <div class="question">
        <strong>Q: What are the main differences between TCP and UDP?</strong>
      </div>
      <div class="answer">
        <strong>A:</strong> Key differences:
        <br>• <strong>Reliability:</strong> TCP guarantees delivery, UDP is best-effort
        <br>• <strong>Connection:</strong> TCP is connection-oriented, UDP is connectionless
        <br>• <strong>Ordering:</strong> TCP maintains order, UDP doesn't
        <br>• <strong>Overhead:</strong> TCP has higher overhead (20+ bytes vs 8 bytes)
        <br>• <strong>Speed:</strong> UDP is faster, TCP provides reliability
        <br>• <strong>Use Cases:</strong> TCP for web/email, UDP for gaming/streaming
      </div>
    </div>

    <div class="qa-section">
      <div class="question">
        <strong>Q: How does Nagle's algorithm work and when would you disable it?</strong>
      </div>
      <div class="answer">
        <strong>A:</strong> Nagle's algorithm reduces network congestion:
        <br>• <strong>Mechanism:</strong> Buffers small packets until ACK received or buffer full
        <br>• <strong>Benefit:</strong> Reduces number of small packets
        <br>• <strong>Drawback:</strong> Adds latency for interactive applications
        <br>• <strong>Disable with:</strong> TCP_NODELAY socket option
        <br>• <strong>Use Cases:</strong> Real-time games, terminal applications, low-latency trading
      </div>
    </div>

    <h3>Related Concepts</h3>
    <ul>
      <li><strong>UDP:</strong> Connectionless alternative to TCP</li>
      <li><strong>QUIC:</strong> Modern transport protocol over UDP</li>
      <li><strong>HTTP/2:</strong> Multiplexing over single TCP connection</li>
      <li><strong>WebSockets:</strong> Full-duplex communication over TCP</li>
      <li><strong>TLS/SSL:</strong> Security layer over TCP</li>
      <li><strong>Load Balancing:</strong> Distributing TCP connections</li>
    </ul>
  `
}; 