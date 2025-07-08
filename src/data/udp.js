export const udp = {
  id: 'udp',
  title: 'UDP (User Datagram Protocol)',
  content: `
    <h2>UDP (User Datagram Protocol)</h2>
    <p>UDP is a connectionless, unreliable transport layer protocol that provides fast, lightweight data transmission without delivery guarantees, making it ideal for real-time applications where speed is prioritized over reliability.</p>

    <h3>UDP vs TCP Comparison</h3>
    <table>
      <tr>
        <th>Characteristic</th>
        <th>UDP</th>
        <th>TCP</th>
        <th>Impact</th>
      </tr>
      <tr>
        <td>Connection</td>
        <td>Connectionless</td>
        <td>Connection-oriented</td>
        <td>UDP has no handshake overhead</td>
      </tr>
      <tr>
        <td>Reliability</td>
        <td>Unreliable</td>
        <td>Reliable</td>
        <td>TCP guarantees delivery, UDP doesn't</td>
      </tr>
      <tr>
        <td>Ordering</td>
        <td>No ordering</td>
        <td>Ordered delivery</td>
        <td>TCP maintains packet sequence</td>
      </tr>
      <tr>
        <td>Header Size</td>
        <td>8 bytes</td>
        <td>20+ bytes</td>
        <td>UDP has 60% less overhead</td>
      </tr>
      <tr>
        <td>Speed</td>
        <td>Fast</td>
        <td>Slower</td>
        <td>UDP has lower latency</td>
      </tr>
      <tr>
        <td>Flow Control</td>
        <td>None</td>
        <td>Built-in</td>
        <td>TCP prevents buffer overflow</td>
      </tr>
      <tr>
        <td>Congestion Control</td>
        <td>None</td>
        <td>Built-in</td>
        <td>TCP adapts to network conditions</td>
      </tr>
      <tr>
        <td>Broadcasting</td>
        <td>Supported</td>
        <td>Not supported</td>
        <td>UDP enables one-to-many communication</td>
      </tr>
    </table>

    <h3>UDP Header Structure</h3>
    <div class="code-block">
      <pre><code>UDP Header Format (8 bytes total):

 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|          Source Port          |       Destination Port        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|            Length             |           Checksum            |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                     Data (Variable Length)                    |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

Header Fields:

1. Source Port (16 bits):
├── Range: 0-65535
├── Purpose: Identifies sending application
├── Ephemeral ports: 32768-65535 (Linux)
├── Well-known ports: 0-1023
└── Registered ports: 1024-49151

2. Destination Port (16 bits):
├── Range: 0-65535
├── Purpose: Identifies receiving application
├── Examples: DNS (53), DHCP (67/68), TFTP (69)
├── NTP (123), SNMP (161), Syslog (514)
└── Application-specific port binding

3. Length (16 bits):
├── Range: 8-65535 bytes
├── Purpose: UDP header + data length
├── Minimum: 8 bytes (header only)
├── Maximum: 65535 bytes (theoretical)
├── Practical limit: MTU size (1500 bytes Ethernet)
└── Fragmentation: Handled by IP layer

4. Checksum (16 bits):
├── Purpose: Error detection
├── Coverage: Header + data + pseudo-header
├── Optional: Can be 0 (IPv4 only)
├── Mandatory: Required for IPv6
├── Algorithm: One's complement sum
└── Pseudo-header: IP addresses + protocol + length

Pseudo-Header for Checksum:
┌─────────────────────────────────────────────────────────────┐
│                    Source IP Address                        │
├─────────────────────────────────────────────────────────────┤
│                  Destination IP Address                     │
├─────────────────────────────────────────────────────────────┤
│      Zero       │   Protocol   │      UDP Length           │
└─────────────────────────────────────────────────────────────┘

Performance Characteristics:
├── Header overhead: 8 bytes (0.5% for 1500-byte packet)
├── Processing time: 10-50 microseconds
├── Memory usage: Minimal state information
├── CPU usage: Low processing overhead
├── Bandwidth efficiency: 99.5% for large packets
└── Latency: Near-zero protocol latency</code></pre>
    </div>

    <details>
      <summary><strong>Example: Netflix Video Streaming</strong></summary>
      <div class="info-note">
        Netflix uses UDP for video streaming to deliver content to 230+ million subscribers globally. Their custom UDP implementation handles 15+ petabytes of data monthly with adaptive bitrate streaming that adjusts quality based on network conditions. Netflix's UDP streaming achieves 99.9% uptime with automatic quality degradation during network congestion, maintaining smooth playback even with 5-10% packet loss. The platform uses UDP multicast for efficient content distribution to CDN servers and implements custom reliability mechanisms for critical control messages. Netflix's UDP infrastructure processes 1+ billion streaming hours monthly with average latency under 100ms globally.
      </div>
    </details>

    <h3>UDP Communication Models</h3>
    <div class="code-block">
      <pre><code>UDP Communication Patterns:

1. Unicast (One-to-One):
┌─────────────────────────────────────────────────────────────┐
│                    Client A                                 │
│                      │                                      │
│                      │ UDP Packet                           │
│                      ▼                                      │
│                    Server                                   │
└─────────────────────────────────────────────────────────────┘

Characteristics:
├── Single sender, single receiver
├── Direct point-to-point communication
├── Most common UDP usage pattern
├── Examples: DNS queries, DHCP requests
├── Routing: Standard IP routing
└── Scalability: Limited by server capacity

2. Broadcast (One-to-All):
┌─────────────────────────────────────────────────────────────┐
│                    Sender                                   │
│                      │                                      │
│        ┌─────────────┼─────────────┐                       │
│        │             │             │                       │
│        ▼             ▼             ▼                       │
│   Receiver 1    Receiver 2    Receiver 3                   │
└─────────────────────────────────────────────────────────────┘

Characteristics:
├── Single sender, all receivers in subnet
├── Destination IP: 255.255.255.255 (limited broadcast)
├── Subnet broadcast: x.x.x.255 (directed broadcast)
├── Examples: DHCP discovery, Wake-on-LAN
├── Routing: Limited to local network segment
└── Scalability: Network bandwidth limited

3. Multicast (One-to-Many):
┌─────────────────────────────────────────────────────────────┐
│                    Sender                                   │
│                      │                                      │
│                      │ Multicast Group                      │
│                      ▼                                      │
│        ┌─────────────┼─────────────┐                       │
│        │             │             │                       │
│        ▼             ▼             ▼                       │
│   Subscriber 1  Subscriber 2  Subscriber 3                 │
└─────────────────────────────────────────────────────────────┘

Characteristics:
├── Single sender, multiple interested receivers
├── Destination IP: 224.0.0.0 to 239.255.255.255
├── Group management: IGMP protocol
├── Examples: Video streaming, stock feeds
├── Routing: Multicast routing protocols
└── Scalability: Efficient bandwidth usage

4. Anycast (One-to-Nearest):
┌─────────────────────────────────────────────────────────────┐
│                    Client                                   │
│                      │                                      │
│                      │ Anycast Address                      │
│                      ▼                                      │
│        ┌─────────────┼─────────────┐                       │
│        │             │             │                       │
│        ▼             │             ▼                       │
│   Server 1      (Nearest)     Server 2                     │
│   (Selected)                   (Not selected)              │
└─────────────────────────────────────────────────────────────┘

Characteristics:
├── Single sender, nearest receiver selected
├── Same IP address on multiple servers
├── Routing: BGP selects nearest server
├── Examples: DNS root servers, CDN
├── Routing: Automatic failover
└── Scalability: Geographic distribution

Socket Programming Models:

Client-Side UDP Socket:
import socket

# Create UDP socket
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

# Send data
sock.sendto(b'Hello Server', ('192.168.1.100', 8080))

# Receive response
data, addr = sock.recvfrom(1024)
print(f"Received: {data} from {addr}")

sock.close()

Server-Side UDP Socket:
import socket

# Create UDP socket
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

# Bind to address
sock.bind(('0.0.0.0', 8080))

while True:
    # Receive data
    data, addr = sock.recvfrom(1024)
    print(f"Received: {data} from {addr}")
    
    # Send response
    sock.sendto(b'Hello Client', addr)

Performance Considerations:
├── No connection state: Immediate data transmission
├── Stateless: Each packet independent
├── Memory efficient: No connection tracking
├── CPU efficient: Minimal processing overhead
├── Network efficient: No acknowledgments
└── Scalable: Handle thousands of clients</code></pre>
    </div>

    <h3>UDP Applications & Use Cases</h3>
    <div class="code-block">
      <pre><code>Real-World UDP Applications:

1. Domain Name System (DNS):
├── Port: 53
├── Query/Response pattern
├── Packet size: Typically <512 bytes
├── Timeout: 2-5 seconds
├── Fallback: TCP for large responses
├── Performance: 10-50ms resolution time
├── Reliability: Application-level retries
└── Volume: Billions of queries daily

Implementation:
- Client sends query to DNS server
- Server responds with IP address
- No connection establishment
- Timeout and retry handled by client
- TCP fallback for DNSSEC or large responses

2. Dynamic Host Configuration Protocol (DHCP):
├── Ports: 67 (server), 68 (client)
├── Broadcast-based discovery
├── 4-message exchange: DISCOVER, OFFER, REQUEST, ACK
├── Lease management: IP address assignment
├── Performance: 100-500ms lease acquisition
├── Reliability: Broadcast ensures delivery
└── Scalability: Supports thousands of clients

DHCP Message Flow:
Client → DHCP DISCOVER (broadcast)
Server → DHCP OFFER (unicast)
Client → DHCP REQUEST (broadcast)
Server → DHCP ACK (unicast)

3. Real-Time Gaming:
├── Custom ports: Game-specific
├── Low latency: <50ms critical
├── High frequency: 20-60 updates/second
├── Packet loss tolerance: 1-5%
├── Performance: Predictable timing
├── Reliability: Application-level
└── Scalability: Peer-to-peer or dedicated servers

Game State Synchronization:
- Player position updates
- Game events (shots, collisions)
- Interpolation for smooth movement
- Lag compensation techniques
- Anti-cheat validation

4. Video/Audio Streaming:
├── Custom ports: Application-specific
├── Real-time delivery: Buffer management
├── Quality adaptation: Bitrate adjustment
├── Packet loss handling: Error concealment
├── Performance: Jitter buffer management
├── Reliability: Forward Error Correction
└── Scalability: CDN distribution

Streaming Protocols:
- RTP (Real-time Transport Protocol)
- RTCP (RTP Control Protocol)
- WebRTC (Web Real-Time Communication)
- Custom proprietary protocols
- Adaptive bitrate streaming

5. Network Time Protocol (NTP):
├── Port: 123
├── Time synchronization
├── Packet size: 48 bytes
├── Accuracy: Millisecond precision
├── Performance: 10-100ms round-trip
├── Reliability: Multiple server queries
└── Scalability: Hierarchical server structure

NTP Synchronization:
- Client queries multiple NTP servers
- Calculates network delay and offset
- Adjusts local clock gradually
- Maintains accuracy over time
- Handles network jitter

6. Simple Network Management Protocol (SNMP):
├── Port: 161 (agent), 162 (manager)
├── Network monitoring
├── Get/Set operations
├── Trap notifications
├── Performance: Fast polling
├── Reliability: Application timeouts
└── Scalability: Distributed monitoring

SNMP Operations:
- GET: Retrieve single value
- GETNEXT: Walk through MIB tree
- GETBULK: Retrieve multiple values
- SET: Modify configuration
- TRAP: Asynchronous notifications

7. Trivial File Transfer Protocol (TFTP):
├── Port: 69
├── Simple file transfer
├── Packet size: 512 bytes data blocks
├── Acknowledgment: Stop-and-wait
├── Performance: Slow but reliable
├── Reliability: Built-in retransmission
└── Scalability: Limited concurrent transfers

TFTP Protocol:
- Read/Write request
- Data block transmission
- Acknowledgment for each block
- Error handling
- Timeout and retransmission

8. Voice over IP (VoIP):
├── Custom ports: SIP (5060), RTP (dynamic)
├── Real-time audio: 20ms packets
├── Quality of Service: Prioritized traffic
├── Codec support: G.711, G.729, Opus
├── Performance: <150ms end-to-end delay
├── Reliability: Silence suppression
└── Scalability: Server-based routing

VoIP Components:
- Signaling: SIP, H.323
- Media transport: RTP/RTCP
- Codec negotiation
- Echo cancellation
- Jitter buffer management</code></pre>
    </div>

    <details>
      <summary><strong>Example: Zoom Video Conferencing</strong></summary>
      <div class="info-note">
        Zoom uses UDP for real-time video and audio transmission, handling 300+ million daily meeting participants. Their UDP implementation processes 3+ billion meeting minutes monthly with adaptive quality that adjusts to network conditions in real-time. Zoom's UDP protocol achieves 99.99% uptime with automatic fallback to TCP when UDP is blocked by firewalls. The platform handles packet loss up to 30% while maintaining acceptable call quality through advanced error correction and bandwidth adaptation. Zoom's infrastructure uses UDP multicast for efficient screen sharing and implements custom reliability mechanisms for critical control messages, processing 2+ petabytes of meeting data monthly.
      </div>
    </details>

    <h3>UDP Reliability Mechanisms</h3>
    <div class="code-block">
      <pre><code>Application-Level Reliability for UDP:

1. Acknowledgment Systems:
├── Positive ACK: Confirm successful receipt
├── Negative ACK: Request retransmission
├── Selective ACK: Acknowledge specific packets
├── Cumulative ACK: Acknowledge up to sequence number
├── Timeout-based: Retransmit after timeout
└── Duplicate detection: Sequence number tracking

Implementation Example:
class ReliableUDP:
    def __init__(self):
        self.sequence_number = 0
        self.pending_acks = {}
        self.timeout = 1.0  # 1 second
    
    def send_reliable(self, data, addr):
        packet = {
            'seq': self.sequence_number,
            'data': data,
            'timestamp': time.time()
        }
        self.pending_acks[self.sequence_number] = packet
        self.socket.sendto(pickle.dumps(packet), addr)
        self.sequence_number += 1
    
    def handle_ack(self, ack_packet):
        seq = ack_packet['ack_seq']
        if seq in self.pending_acks:
            del self.pending_acks[seq]
    
    def check_timeouts(self):
        current_time = time.time()
        for seq, packet in self.pending_acks.items():
            if current_time - packet['timestamp'] > self.timeout:
                # Retransmit packet
                self.socket.sendto(pickle.dumps(packet), addr)
                packet['timestamp'] = current_time

2. Flow Control Mechanisms:
├── Window-based: Sliding window protocol
├── Rate-based: Transmission rate limiting
├── Credit-based: Receiver grants transmission credits
├── Congestion detection: Packet loss monitoring
├── Adaptive rate: Adjust based on network conditions
└── Buffer management: Prevent overflow

Flow Control Implementation:
class FlowControl:
    def __init__(self, window_size=10):
        self.window_size = window_size
        self.send_base = 0
        self.next_seq = 0
        self.window = {}
    
    def can_send(self):
        return self.next_seq < self.send_base + self.window_size
    
    def send_packet(self, data):
        if self.can_send():
            packet = {'seq': self.next_seq, 'data': data}
            self.window[self.next_seq] = packet
            self.socket.sendto(pickle.dumps(packet), addr)
            self.next_seq += 1
    
    def handle_ack(self, ack_seq):
        if ack_seq >= self.send_base:
            # Slide window
            for seq in range(self.send_base, ack_seq + 1):
                if seq in self.window:
                    del self.window[seq]
            self.send_base = ack_seq + 1

3. Error Detection & Correction:
├── Checksum validation: Header and data integrity
├── Sequence numbering: Detect duplicates and gaps
├── Forward Error Correction: Reed-Solomon, LDPC
├── Automatic Repeat Request: Retransmission protocols
├── Interleaving: Distribute errors across time
└── Redundancy: Multiple transmission paths

Error Correction Example:
class ErrorCorrection:
    def __init__(self):
        self.fec_enabled = True
        self.redundancy_factor = 2
    
    def encode_packet(self, data):
        if self.fec_enabled:
            # Add Reed-Solomon error correction
            encoded = reed_solomon_encode(data)
            return encoded
        return data
    
    def decode_packet(self, received_data):
        if self.fec_enabled:
            try:
                decoded = reed_solomon_decode(received_data)
                return decoded, True  # Success
            except:
                return None, False  # Uncorrectable error
        return received_data, True

4. Congestion Control:
├── Additive Increase Multiplicative Decrease (AIMD)
├── Slow start: Exponential increase
├── Congestion avoidance: Linear increase
├── Fast recovery: Quick adaptation
├── Bandwidth estimation: Available capacity
└── Rate adaptation: Adjust transmission rate

Congestion Control Implementation:
class CongestionControl:
    def __init__(self):
        self.cwnd = 1  # Congestion window
        self.ssthresh = 64  # Slow start threshold
        self.rtt = 0.1  # Round-trip time
        self.sending_rate = 1000  # Packets per second
    
    def on_ack_received(self):
        if self.cwnd < self.ssthresh:
            # Slow start
            self.cwnd += 1
        else:
            # Congestion avoidance
            self.cwnd += 1.0 / self.cwnd
        
        self.update_sending_rate()
    
    def on_packet_loss(self):
        # Multiplicative decrease
        self.ssthresh = max(self.cwnd / 2, 2)
        self.cwnd = 1
        self.update_sending_rate()
    
    def update_sending_rate(self):
        self.sending_rate = self.cwnd / self.rtt

5. Ordering and Duplicate Detection:
├── Sequence numbering: Monotonic packet IDs
├── Reordering buffer: Sort out-of-order packets
├── Duplicate detection: Track received sequences
├── Gap detection: Identify missing packets
├── Timeout mechanisms: Handle lost packets
└── Delivery guarantees: In-order delivery

Ordering Implementation:
class PacketOrdering:
    def __init__(self):
        self.expected_seq = 0
        self.reorder_buffer = {}
        self.received_sequences = set()
    
    def process_packet(self, packet):
        seq = packet['seq']
        
        # Duplicate detection
        if seq in self.received_sequences:
            return None  # Duplicate packet
        
        self.received_sequences.add(seq)
        
        if seq == self.expected_seq:
            # In-order packet
            self.expected_seq += 1
            result = [packet]
            
            # Check reorder buffer
            while self.expected_seq in self.reorder_buffer:
                result.append(self.reorder_buffer[self.expected_seq])
                del self.reorder_buffer[self.expected_seq]
                self.expected_seq += 1
            
            return result
        elif seq > self.expected_seq:
            # Out-of-order packet
            self.reorder_buffer[seq] = packet
            return None
        else:
            # Old packet (already processed)
            return None

Performance Metrics:
├── Reliability: 99.9-99.99% delivery rate
├── Latency: 10-100ms additional overhead
├── Throughput: 80-95% of UDP performance
├── Memory usage: 2-10x UDP overhead
├── CPU usage: 3-5x UDP overhead
└── Scalability: Reduced due to state management</code></pre>
    </div>

    <h3>UDP Performance Optimization</h3>
    <div class="code-block">
      <pre><code>UDP Performance Tuning:

1. Socket Buffer Optimization:
├── Send buffer size: SO_SNDBUF
├── Receive buffer size: SO_RCVBUF
├── Buffer sizing: 2x bandwidth-delay product
├── Kernel bypass: DPDK, user-space networking
├── Zero-copy: Avoid memory copies
└── Memory alignment: Cache-friendly structures

Buffer Configuration:
# Linux socket buffer tuning
sysctl -w net.core.rmem_max=134217728    # 128MB
sysctl -w net.core.wmem_max=134217728    # 128MB
sysctl -w net.core.rmem_default=262144   # 256KB
sysctl -w net.core.wmem_default=262144   # 256KB

# Application-level buffer setting
import socket
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.setsockopt(socket.SOL_SOCKET, socket.SO_RCVBUF, 1048576)  # 1MB
sock.setsockopt(socket.SOL_SOCKET, socket.SO_SNDBUF, 1048576)  # 1MB

2. Packet Size Optimization:
├── MTU discovery: Avoid fragmentation
├── Jumbo frames: 9000 bytes for local networks
├── Payload efficiency: Minimize header overhead
├── Batch processing: Multiple packets per system call
├── Packet coalescing: Combine small packets
└── Fragmentation avoidance: Keep packets < MTU

Optimal Packet Sizes:
├── Ethernet: 1472 bytes (1500 - 28 header bytes)
├── WiFi: 1400 bytes (additional overhead)
├── Internet: 1200 bytes (conservative)
├── Local network: 8972 bytes (9000 - 28 header bytes)
├── Loopback: 65507 bytes (maximum UDP payload)
└── Mobile: 1000 bytes (variable MTU)

3. CPU Optimization:
├── Interrupt coalescing: Reduce interrupt frequency
├── CPU affinity: Pin threads to specific cores
├── NUMA awareness: Local memory access
├── Polling vs interrupts: High-frequency applications
├── Batch processing: Process multiple packets
└── Lock-free algorithms: Avoid contention

CPU Optimization Techniques:
# Set CPU affinity
import os
os.sched_setaffinity(0, {2, 3})  # Use cores 2 and 3

# Use busy polling for low latency
sock.setsockopt(socket.SOL_SOCKET, socket.SO_BUSY_POLL, 50)

# Enable receive packet steering
echo 'rps' > /sys/class/net/eth0/queues/rx-0/rps_cpus

4. Network Stack Bypass:
├── DPDK: Data Plane Development Kit
├── User-space networking: Bypass kernel
├── Kernel bypass: Direct hardware access
├── Zero-copy: Avoid memory copies
├── Polling mode: Avoid interrupts
└── Hardware acceleration: Offload processing

DPDK Example:
// DPDK packet processing
struct rte_mbuf *pkts[BURST_SIZE];
uint16_t nb_rx = rte_eth_rx_burst(port_id, queue_id, pkts, BURST_SIZE);

for (int i = 0; i < nb_rx; i++) {
    // Process packet directly from NIC
    process_udp_packet(pkts[i]);
}

5. Memory Management:
├── Pre-allocated buffers: Avoid malloc/free
├── Memory pools: Reuse packet buffers
├── Hugepages: Reduce TLB misses
├── Cache optimization: Data locality
├── Memory alignment: SIMD instructions
└── Garbage collection: Minimize pauses

Memory Pool Implementation:
class PacketPool:
    def __init__(self, pool_size=1000, packet_size=1500):
        self.pool = []
        self.packet_size = packet_size
        
        # Pre-allocate packets
        for _ in range(pool_size):
            self.pool.append(bytearray(packet_size))
    
    def get_packet(self):
        if self.pool:
            return self.pool.pop()
        else:
            return bytearray(self.packet_size)
    
    def return_packet(self, packet):
        if len(self.pool) < 1000:  # Max pool size
            self.pool.append(packet)

6. Monitoring and Profiling:
├── Packet loss monitoring: Track dropped packets
├── Latency measurement: Round-trip time
├── Throughput monitoring: Packets/bytes per second
├── CPU utilization: Processing overhead
├── Memory usage: Buffer consumption
└── Network utilization: Bandwidth usage

Performance Monitoring:
class UDPMonitor:
    def __init__(self):
        self.packets_sent = 0
        self.packets_received = 0
        self.bytes_sent = 0
        self.bytes_received = 0
        self.start_time = time.time()
    
    def record_send(self, packet_size):
        self.packets_sent += 1
        self.bytes_sent += packet_size
    
    def record_receive(self, packet_size):
        self.packets_received += 1
        self.bytes_received += packet_size
    
    def get_stats(self):
        elapsed = time.time() - self.start_time
        return {
            'pps_sent': self.packets_sent / elapsed,
            'pps_received': self.packets_received / elapsed,
            'mbps_sent': (self.bytes_sent * 8) / (elapsed * 1000000),
            'mbps_received': (self.bytes_received * 8) / (elapsed * 1000000),
            'packet_loss': 1 - (self.packets_received / self.packets_sent)
        }

Benchmark Results:
├── Standard UDP: 100K-1M packets/second
├── Optimized UDP: 1M-10M packets/second
├── DPDK UDP: 10M-100M packets/second
├── Latency: 10-100 microseconds
├── CPU usage: 10-80% per core
└── Memory usage: 1-100MB per application

Performance Targets:
├── Gaming: <50ms latency, 1% packet loss
├── Streaming: <200ms latency, 5% packet loss
├── VoIP: <150ms latency, 1% packet loss
├── DNS: <100ms response time, 0.1% failure rate
├── NTP: <10ms accuracy, 99.9% availability
└── High-frequency trading: <10μs latency, 0% loss</code></pre>
    </div>

    <details>
      <summary><strong>Example: Discord Voice Chat</strong></summary>
      <div class="info-note">
        Discord uses UDP for voice communication across 150+ million active users, processing 3+ billion voice minutes monthly. Their UDP implementation handles 1+ million concurrent voice connections with average latency under 50ms globally. Discord's voice infrastructure uses Opus codec over UDP with adaptive bitrate (8-128 kbps) based on network conditions and automatic echo cancellation. The platform implements custom reliability mechanisms for critical voice data and falls back to TCP when UDP is blocked. Discord's UDP optimization includes jitter buffering, packet loss concealment, and real-time quality adaptation, maintaining clear voice communication even with 10% packet loss through advanced error correction and bandwidth management.
      </div>
    </details>

    <h3>UDP Security Considerations</h3>
    <div class="code-block">
      <pre><code>UDP Security Challenges:

1. Spoofing Attacks:
├── Problem: No connection validation
├── Attack: Fake source IP addresses
├── Impact: Impersonation, reflection attacks
├── Mitigation: Source validation, authentication
├── Detection: Anomaly detection, rate limiting
└── Prevention: Ingress filtering, cryptographic validation

Anti-Spoofing Measures:
# Source IP validation
def validate_source(packet, expected_sources):
    source_ip = packet['source_ip']
    if source_ip not in expected_sources:
        log_security_event(f"Spoofed packet from {source_ip}")
        return False
    return True

# Cryptographic authentication
def authenticate_packet(packet, shared_key):
    payload = packet['payload']
    signature = packet['signature']
    expected_signature = hmac.new(shared_key, payload, hashlib.sha256).hexdigest()
    return signature == expected_signature

2. Amplification Attacks:
├── Problem: Small request, large response
├── Attack: Use servers to amplify traffic
├── Impact: DDoS amplification (100x+)
├── Mitigation: Rate limiting, response size limits
├── Detection: Traffic pattern analysis
└── Prevention: BCP 38 (ingress filtering)

Common Amplification Vectors:
├── DNS: 50x amplification (query vs response)
├── NTP: 556x amplification (monlist command)
├── SNMP: 650x amplification (GetBulk requests)
├── CharGen: 358x amplification (character generation)
├── LDAP: 46x amplification (search requests)
└── Memcached: 10,000x+ amplification (stats command)

Amplification Prevention:
class AmplificationProtection:
    def __init__(self):
        self.rate_limiter = {}
        self.max_requests_per_second = 10
        self.max_response_size = 1024
    
    def check_rate_limit(self, source_ip):
        current_time = time.time()
        if source_ip not in self.rate_limiter:
            self.rate_limiter[source_ip] = {'count': 0, 'reset_time': current_time + 1}
        
        limit_info = self.rate_limiter[source_ip]
        if current_time > limit_info['reset_time']:
            limit_info['count'] = 0
            limit_info['reset_time'] = current_time + 1
        
        if limit_info['count'] >= self.max_requests_per_second:
            return False
        
        limit_info['count'] += 1
        return True
    
    def limit_response_size(self, response):
        if len(response) > self.max_response_size:
            return response[:self.max_response_size]
        return response

3. Flooding Attacks:
├── Problem: Overwhelming server resources
├── Attack: High-volume packet transmission
├── Impact: Service unavailability
├── Mitigation: Rate limiting, traffic shaping
├── Detection: Traffic volume monitoring
└── Prevention: Upstream filtering, load balancing

Flood Protection:
class FloodProtection:
    def __init__(self):
        self.connection_limits = {}
        self.max_connections_per_ip = 100
        self.packet_rate_limit = 1000  # packets per second
    
    def check_connection_limit(self, source_ip):
        if source_ip not in self.connection_limits:
            self.connection_limits[source_ip] = 0
        
        if self.connection_limits[source_ip] >= self.max_connections_per_ip:
            return False
        
        self.connection_limits[source_ip] += 1
        return True
    
    def cleanup_expired_connections(self):
        # Remove old connection entries
        current_time = time.time()
        for ip in list(self.connection_limits.keys()):
            if current_time - self.last_activity[ip] > 300:  # 5 minutes
                del self.connection_limits[ip]

4. Man-in-the-Middle Attacks:
├── Problem: No built-in encryption
├── Attack: Intercept and modify packets
├── Impact: Data theft, manipulation
├── Mitigation: Application-layer encryption
├── Detection: Integrity checks, anomaly detection
└── Prevention: DTLS, IPSec, application crypto

Encryption Implementation:
from cryptography.fernet import Fernet

class SecureUDP:
    def __init__(self, encryption_key):
        self.cipher = Fernet(encryption_key)
    
    def send_encrypted(self, data, addr):
        encrypted_data = self.cipher.encrypt(data)
        self.socket.sendto(encrypted_data, addr)
    
    def receive_encrypted(self):
        encrypted_data, addr = self.socket.recvfrom(1024)
        try:
            decrypted_data = self.cipher.decrypt(encrypted_data)
            return decrypted_data, addr
        except:
            # Decryption failed - possible attack
            log_security_event(f"Decryption failed from {addr}")
            return None, addr

5. Replay Attacks:
├── Problem: No sequence numbers
├── Attack: Resend captured packets
├── Impact: Duplicate processing, fraud
├── Mitigation: Sequence numbers, timestamps
├── Detection: Duplicate detection
└── Prevention: Nonce, challenge-response

Replay Protection:
class ReplayProtection:
    def __init__(self):
        self.seen_packets = {}
        self.window_size = 1000
        self.cleanup_interval = 60  # seconds
    
    def is_replay(self, packet_id, timestamp):
        current_time = time.time()
        
        # Check if packet already seen
        if packet_id in self.seen_packets:
            return True
        
        # Check timestamp freshness
        if current_time - timestamp > 30:  # 30 seconds
            return True
        
        # Add to seen packets
        self.seen_packets[packet_id] = current_time
        
        # Cleanup old entries
        if len(self.seen_packets) > self.window_size:
            self.cleanup_old_entries()
        
        return False
    
    def cleanup_old_entries(self):
        current_time = time.time()
        expired_keys = [k for k, v in self.seen_packets.items() 
                       if current_time - v > self.cleanup_interval]
        for key in expired_keys:
            del self.seen_packets[key]

6. Firewall and NAT Traversal:
├── Problem: Stateless firewall blocking
├── Challenge: NAT address translation
├── Solution: STUN, TURN, ICE protocols
├── Implementation: Keep-alive packets
├── Detection: Connection testing
└── Fallback: TCP tunneling

NAT Traversal:
class NATTraversal:
    def __init__(self):
        self.stun_servers = [
            ('stun.l.google.com', 19302),
            ('stun1.l.google.com', 19302)
        ]
        self.public_ip = None
        self.public_port = None
    
    def discover_public_address(self):
        for server in self.stun_servers:
            try:
                # Send STUN request
                response = self.send_stun_request(server)
                if response:
                    self.public_ip = response['ip']
                    self.public_port = response['port']
                    return True
            except:
                continue
        return False
    
    def send_keepalive(self, peer_addr):
        # Send periodic keepalive to maintain NAT mapping
        keepalive_packet = b'KEEPALIVE'
        self.socket.sendto(keepalive_packet, peer_addr)

Security Best Practices:
├── Use DTLS for encryption
├── Implement authentication
├── Add sequence numbers
├── Use rate limiting
├── Monitor for anomalies
├── Implement replay protection
├── Use secure random numbers
└── Regular security audits</code></pre>
    </div>

    <h3>Interview Questions & Answers</h3>
    <div class="code-block">
      <pre><code>Common Interview Questions:

Q: When would you choose UDP over TCP?
A: Use UDP for real-time applications where speed is more important than 
   reliability: gaming, video streaming, DNS, VoIP, IoT sensors. UDP is 
   preferred when you need low latency, can tolerate packet loss, or 
   implement custom reliability.

Q: How do you implement reliability in UDP?
A: Add application-layer mechanisms: sequence numbers for ordering, 
   acknowledgments for confirmation, timeouts for retransmission, 
   checksums for error detection, and flow control for congestion 
   management.

Q: What are the main security concerns with UDP?
A: IP spoofing (no connection validation), amplification attacks (small 
   request, large response), flooding attacks (resource exhaustion), 
   man-in-the-middle attacks (no encryption), and replay attacks (no 
   sequence validation).

Q: How does UDP handle congestion?
A: UDP has no built-in congestion control. Applications must implement 
   their own: monitor packet loss, adjust sending rate, use adaptive 
   bitrate, implement backoff algorithms, and respect network capacity.

Q: What's the maximum UDP packet size?
A: Theoretical maximum is 65,507 bytes (65,535 - 8 UDP header - 20 IP 
   header). Practical limit is MTU size (1,472 bytes for Ethernet) to 
   avoid fragmentation. Larger packets get fragmented at IP layer.

Q: How do you optimize UDP performance?
A: Optimize socket buffers, avoid fragmentation, use appropriate packet 
   sizes, implement batching, use kernel bypass (DPDK), enable CPU 
   affinity, and monitor performance metrics.

Q: What's the difference between UDP broadcast and multicast?
A: Broadcast sends to all devices in subnet (255.255.255.255), limited 
   to local network. Multicast sends to specific group 
   (224.0.0.0-239.255.255.255), can cross routers, more efficient for 
   large-scale distribution.

Q: How does NAT affect UDP?
A: NAT creates temporary port mappings for UDP sessions. Without 
   connection state, mappings expire quickly. Solutions include 
   keep-alive packets, STUN/TURN servers, and ICE protocol for 
   traversal.

Q: What protocols use UDP and why?
A: DNS (fast lookups), DHCP (broadcast discovery), NTP (time sync), 
   SNMP (monitoring), TFTP (simple transfer), VoIP (real-time audio), 
   gaming (low latency), streaming (real-time video).

Q: How do you handle packet loss in UDP applications?
A: Implement Forward Error Correction (FEC), use redundant transmission, 
   add application-level retransmission, implement adaptive quality 
   (reduce bitrate), use interpolation for missing data, and provide 
   graceful degradation.</code></pre>
    </div>

    <h3>Key Takeaways</h3>
    <ul>
      <li><strong>Connectionless:</strong> No handshake required, immediate data transmission</li>
      <li><strong>Unreliable:</strong> No delivery guarantees, application handles reliability</li>
      <li><strong>Low Overhead:</strong> 8-byte header vs 20+ bytes for TCP</li>
      <li><strong>Real-time:</strong> Ideal for time-sensitive applications</li>
      <li><strong>Scalable:</strong> Stateless design supports high concurrency</li>
      <li><strong>Flexible:</strong> Supports unicast, broadcast, multicast, anycast</li>
      <li><strong>Security:</strong> Requires application-level security measures</li>
    </ul>

    <h3>References</h3>
    <ul>
      <li><a href="https://tools.ietf.org/html/rfc768" target="_blank">RFC 768: User Datagram Protocol</a></li>
      <li><a href="https://tools.ietf.org/html/rfc1122" target="_blank">RFC 1122: Requirements for Internet Hosts</a></li>
      <li><a href="https://tools.ietf.org/html/rfc5405" target="_blank">RFC 5405: UDP Usage Guidelines</a></li>
      <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API" target="_blank">WebRTC API Documentation</a></li>
      <li><a href="https://tools.ietf.org/html/rfc3550" target="_blank">RFC 3550: RTP Protocol</a></li>
      <li><a href="https://tools.ietf.org/html/rfc6347" target="_blank">RFC 6347: DTLS Protocol</a></li>
    </ul>
  `
}; 