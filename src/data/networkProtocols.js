export const networkProtocols = {
  id: 'network-protocols',
  title: 'Network Protocols',
  content: `
# Network Protocols

Network protocols are standardized rules and procedures that govern communication between devices in a network. Understanding these protocols is essential for system design and network architecture.

## Overview

Network protocols define:
- **Communication rules**: How devices establish connections
- **Data format**: Structure and encoding of transmitted data
- **Error handling**: Detection and recovery from transmission errors
- **Flow control**: Managing data transmission rates
- **Security**: Authentication and encryption mechanisms

## Protocol Stack Architecture

### OSI Model Mapping

| Layer | Protocols | Purpose |
|-------|-----------|---------|
| Application | HTTP, HTTPS, FTP, SMTP, DNS | User interface and services |
| Presentation | SSL/TLS, MIME | Data encryption and formatting |
| Session | NetBIOS, RPC | Session management |
| Transport | TCP, UDP | End-to-end communication |
| Network | IP, ICMP, ARP | Routing and addressing |
| Data Link | Ethernet, WiFi | Frame transmission |
| Physical | Cable, Fiber, Radio | Physical transmission |

## Core Internet Protocols

### 1. IP (Internet Protocol)

**IPv4 Characteristics:**
- 32-bit addresses (4.3 billion unique addresses)
- Dotted decimal notation (192.168.1.1)
- Classful and classless addressing
- Fragmentation support

**IPv6 Characteristics:**
- 128-bit addresses (340 undecillion unique addresses)
- Hexadecimal notation (2001:db8::1)
- Built-in security features
- No fragmentation at routers

\`\`\`javascript
// IP address validation
function validateIPv4(ip) {
  const parts = ip.split('.');
  if (parts.length !== 4) return false;
  
  return parts.every(part => {
    const num = parseInt(part, 10);
    return num >= 0 && num <= 255 && part === String(num);
  });
}

function validateIPv6(ip) {
  const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  const ipv6CompressedRegex = /^(([0-9a-fA-F]{1,4}:)*)?::([0-9a-fA-F]{1,4}:)*[0-9a-fA-F]{1,4}$/;
  
  return ipv6Regex.test(ip) || ipv6CompressedRegex.test(ip);
}
\`\`\`

**IP Header Structure:**
```
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|Version|  IHL  |Type of Service|          Total Length         |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|         Identification        |Flags|      Fragment Offset    |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|  Time to Live |    Protocol   |         Header Checksum       |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                       Source Address                          |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Destination Address                        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

### 2. TCP (Transmission Control Protocol)

**Characteristics:**
- Connection-oriented protocol
- Reliable data delivery
- Flow control and congestion control
- Ordered data delivery
- Error detection and recovery

**TCP Three-Way Handshake:**
```
Client                    Server
  |                        |
  |-------SYN(seq=x)------>|
  |                        |
  |<--SYN-ACK(seq=y,ack=x+1)|
  |                        |
  |-------ACK(ack=y+1)---->|
  |                        |
  |   Connection Established|
```

**TCP State Machine:**
```javascript
const TCPStates = {
  CLOSED: 'CLOSED',
  LISTEN: 'LISTEN',
  SYN_SENT: 'SYN_SENT',
  SYN_RECEIVED: 'SYN_RECEIVED',
  ESTABLISHED: 'ESTABLISHED',
  FIN_WAIT_1: 'FIN_WAIT_1',
  FIN_WAIT_2: 'FIN_WAIT_2',
  CLOSE_WAIT: 'CLOSE_WAIT',
  CLOSING: 'CLOSING',
  LAST_ACK: 'LAST_ACK',
  TIME_WAIT: 'TIME_WAIT'
};

class TCPConnection {
  constructor() {
    this.state = TCPStates.CLOSED;
    this.sequenceNumber = Math.floor(Math.random() * 4294967296);
    this.acknowledgmentNumber = 0;
  }
  
  connect() {
    if (this.state === TCPStates.CLOSED) {
      this.state = TCPStates.SYN_SENT;
      this.sendSYN();
    }
  }
  
  sendSYN() {
    const packet = {
      flags: { SYN: true },
      sequenceNumber: this.sequenceNumber,
      acknowledgmentNumber: 0
    };
    return packet;
  }
  
  receiveSYNACK(packet) {
    if (this.state === TCPStates.SYN_SENT) {
      this.state = TCPStates.ESTABLISHED;
      this.acknowledgmentNumber = packet.sequenceNumber + 1;
      this.sendACK();
    }
  }
}
```

**TCP Header Structure:**
```
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
```

### 3. UDP (User Datagram Protocol)

**Characteristics:**
- Connectionless protocol
- Unreliable data delivery
- Low overhead
- No flow control
- No error recovery

**UDP Header Structure:**
```
 0      7 8     15 16    23 24    31
+--------+--------+--------+--------+
|     Source      |   Destination   |
|      Port       |      Port       |
+--------+--------+--------+--------+
|                 |                 |
|     Length      |    Checksum     |
+--------+--------+--------+--------+
|
|          data octets ...
+---------------- ...
```

**UDP Implementation Example:**
```javascript
class UDPSocket {
  constructor(port) {
    this.port = port;
    this.buffer = [];
  }
  
  send(data, destinationIP, destinationPort) {
    const packet = {
      sourcePort: this.port,
      destinationPort: destinationPort,
      length: data.length + 8, // 8-byte header
      checksum: this.calculateChecksum(data),
      data: data
    };
    
    this.transmit(packet, destinationIP);
  }
  
  receive() {
    return this.buffer.shift();
  }
  
  calculateChecksum(data) {
    // Simplified checksum calculation
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data.charCodeAt(i);
    }
    return (~sum) & 0xFFFF;
  }
}
```

## Application Layer Protocols

### 1. HTTP (HyperText Transfer Protocol)

**Request Structure:**
```
GET /index.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0
Accept: text/html,application/xhtml+xml
Connection: keep-alive
```

**Response Structure:**
```
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1234
Server: Apache/2.4.41
Date: Mon, 01 Jan 2024 12:00:00 GMT

<html>...</html>
```

**HTTP Methods:**
```javascript
const HTTPMethods = {
  GET: 'Retrieve data',
  POST: 'Submit data',
  PUT: 'Update/create resource',
  DELETE: 'Remove resource',
  PATCH: 'Partial update',
  HEAD: 'Get headers only',
  OPTIONS: 'Get allowed methods',
  TRACE: 'Echo request'
};
```

### 2. HTTPS (HTTP Secure)

**TLS Handshake Process:**
```
Client                    Server
  |                        |
  |----ClientHello-------->|
  |                        |
  |<---ServerHello---------|
  |<---Certificate---------|
  |<---ServerHelloDone-----|
  |                        |
  |----ClientKeyExchange-->|
  |----ChangeCipherSpec--->|
  |----Finished----------->|
  |                        |
  |<---ChangeCipherSpec----|
  |<---Finished------------|
  |                        |
  | Application Data       |
  |<---------------------->|
```

### 3. DNS (Domain Name System)

**DNS Query Types:**
```javascript
const DNSRecordTypes = {
  A: 'IPv4 address',
  AAAA: 'IPv6 address',
  CNAME: 'Canonical name',
  MX: 'Mail exchange',
  NS: 'Name server',
  PTR: 'Pointer (reverse lookup)',
  SOA: 'Start of authority',
  TXT: 'Text record',
  SRV: 'Service record'
};
```

**DNS Resolution Process:**
```javascript
class DNSResolver {
  constructor() {
    this.cache = new Map();
    this.rootServers = ['198.41.0.4', '199.9.14.201'];
  }
  
  async resolve(domain) {
    // Check cache first
    if (this.cache.has(domain)) {
      return this.cache.get(domain);
    }
    
    // Recursive resolution
    const result = await this.recursiveResolve(domain);
    
    // Cache result
    this.cache.set(domain, result);
    return result;
  }
  
  async recursiveResolve(domain) {
    const labels = domain.split('.').reverse();
    let currentServers = this.rootServers;
    
    for (const label of labels) {
      const response = await this.queryServers(currentServers, label);
      if (response.type === 'A') {
        return response.address;
      }
      currentServers = response.nameservers;
    }
  }
}
```

### 4. FTP (File Transfer Protocol)

**FTP Commands:**
```javascript
const FTPCommands = {
  USER: 'Username for login',
  PASS: 'Password for login',
  CWD: 'Change working directory',
  PWD: 'Print working directory',
  LIST: 'List directory contents',
  RETR: 'Retrieve file',
  STOR: 'Store file',
  DELE: 'Delete file',
  MKD: 'Make directory',
  RMD: 'Remove directory',
  QUIT: 'Logout'
};
```

**FTP Data Transfer Modes:**
- **Active Mode**: Server initiates data connection
- **Passive Mode**: Client initiates data connection

## Routing Protocols

### 1. RIP (Routing Information Protocol)

**Characteristics:**
- Distance vector algorithm
- Hop count metric (max 15)
- Periodic updates every 30 seconds
- Simple configuration

```javascript
class RIPRouter {
  constructor(routerId) {
    this.routerId = routerId;
    this.routingTable = new Map();
    this.neighbors = new Set();
  }
  
  addRoute(destination, nextHop, metric) {
    this.routingTable.set(destination, {
      nextHop: nextHop,
      metric: metric,
      timestamp: Date.now()
    });
  }
  
  sendUpdate() {
    const update = Array.from(this.routingTable.entries()).map(
      ([dest, route]) => ({
        destination: dest,
        metric: route.metric
      })
    );
    
    this.neighbors.forEach(neighbor => {
      this.sendToNeighbor(neighbor, update);
    });
  }
  
  receiveUpdate(fromRouter, routes) {
    routes.forEach(route => {
      const newMetric = route.metric + 1;
      const existing = this.routingTable.get(route.destination);
      
      if (!existing || newMetric < existing.metric) {
        this.addRoute(route.destination, fromRouter, newMetric);
      }
    });
  }
}
```

### 2. OSPF (Open Shortest Path First)

**Characteristics:**
- Link state algorithm
- Dijkstra's shortest path
- Area-based hierarchy
- Fast convergence

**OSPF Packet Types:**
```javascript
const OSPFPacketTypes = {
  HELLO: 1,           // Neighbor discovery
  DATABASE_DESCRIPTION: 2, // Database synchronization
  LINK_STATE_REQUEST: 3,   // Request specific LSAs
  LINK_STATE_UPDATE: 4,    // Send LSAs
  LINK_STATE_ACK: 5        // Acknowledge LSAs
};
```

### 3. BGP (Border Gateway Protocol)

**Characteristics:**
- Path vector protocol
- Inter-AS routing
- Policy-based routing
- Prevents routing loops

```javascript
class BGPRouter {
  constructor(asNumber) {
    this.asNumber = asNumber;
    this.neighbors = new Map();
    this.routingTable = new Map();
  }
  
  establishPeering(neighborAS, neighborIP) {
    this.neighbors.set(neighborAS, {
      ip: neighborIP,
      state: 'IDLE'
    });
    
    this.sendOpen(neighborAS);
  }
  
  announceRoute(prefix, asPath) {
    const announcement = {
      prefix: prefix,
      asPath: [this.asNumber, ...asPath],
      nextHop: this.getNextHop(),
      localPref: 100
    };
    
    this.neighbors.forEach((neighbor, asNumber) => {
      this.sendUpdate(asNumber, announcement);
    });
  }
}
```

## Security Protocols

### 1. SSL/TLS (Secure Sockets Layer/Transport Layer Security)

**TLS Versions:**
- TLS 1.0 (1999) - Deprecated
- TLS 1.1 (2006) - Deprecated
- TLS 1.2 (2008) - Widely used
- TLS 1.3 (2018) - Latest standard

**Cipher Suites:**
```javascript
const TLSCipherSuites = {
  'TLS_AES_128_GCM_SHA256': {
    keyExchange: 'ECDHE',
    authentication: 'RSA',
    encryption: 'AES-128-GCM',
    hash: 'SHA256'
  },
  'TLS_AES_256_GCM_SHA384': {
    keyExchange: 'ECDHE',
    authentication: 'RSA',
    encryption: 'AES-256-GCM',
    hash: 'SHA384'
  }
};
```

### 2. IPSec (Internet Protocol Security)

**IPSec Modes:**
- **Transport Mode**: Encrypts payload only
- **Tunnel Mode**: Encrypts entire IP packet

**IPSec Protocols:**
- **AH (Authentication Header)**: Authentication only
- **ESP (Encapsulating Security Payload)**: Authentication and encryption

## Network Management Protocols

### 1. SNMP (Simple Network Management Protocol)

**SNMP Operations:**
```javascript
const SNMPOperations = {
  GET: 'Retrieve specific value',
  GETNEXT: 'Retrieve next value',
  GETBULK: 'Retrieve multiple values',
  SET: 'Modify value',
  TRAP: 'Asynchronous notification',
  INFORM: 'Acknowledged notification'
};

class SNMPAgent {
  constructor() {
    this.mib = new Map(); // Management Information Base
    this.community = 'public';
  }
  
  handleRequest(request) {
    switch (request.operation) {
      case 'GET':
        return this.getValue(request.oid);
      case 'SET':
        return this.setValue(request.oid, request.value);
      case 'GETNEXT':
        return this.getNextValue(request.oid);
      default:
        throw new Error('Unsupported operation');
    }
  }
  
  sendTrap(oid, value) {
    const trap = {
      version: 'v2c',
      community: this.community,
      pduType: 'TRAP',
      oid: oid,
      value: value,
      timestamp: Date.now()
    };
    
    this.transmitTrap(trap);
  }
}
```

### 2. ICMP (Internet Control Message Protocol)

**ICMP Message Types:**
```javascript
const ICMPTypes = {
  0: 'Echo Reply',
  3: 'Destination Unreachable',
  4: 'Source Quench',
  5: 'Redirect',
  8: 'Echo Request',
  11: 'Time Exceeded',
  12: 'Parameter Problem',
  13: 'Timestamp Request',
  14: 'Timestamp Reply'
};

class ICMPHandler {
  handleEchoRequest(packet) {
    return {
      type: 0, // Echo Reply
      code: 0,
      identifier: packet.identifier,
      sequenceNumber: packet.sequenceNumber,
      data: packet.data
    };
  }
  
  sendDestinationUnreachable(originalPacket, code) {
    return {
      type: 3,
      code: code, // 0=net, 1=host, 2=protocol, 3=port
      unused: 0,
      originalHeader: originalPacket.header
    };
  }
}
```

## Protocol Performance Characteristics

### Latency Comparison

| Protocol | Typical Latency | Use Case |
|----------|----------------|----------|
| UDP | < 1ms | Real-time gaming, streaming |
| TCP | 1-10ms | Web browsing, file transfer |
| HTTP/1.1 | 10-100ms | Web applications |
| HTTP/2 | 5-50ms | Modern web applications |
| HTTPS | 20-200ms | Secure web applications |

### Throughput Considerations

```javascript
// TCP throughput calculation
function calculateTCPThroughput(windowSize, rtt) {
  // Throughput = Window Size / Round Trip Time
  return windowSize / rtt;
}

// UDP packet rate calculation
function calculateUDPPacketRate(bandwidth, packetSize) {
  // Packets per second = Bandwidth / (Packet Size * 8)
  return bandwidth / (packetSize * 8);
}
```

## Protocol Selection Guidelines

### Decision Matrix

| Requirement | Recommended Protocol | Alternative |
|-------------|---------------------|-------------|
| Reliability | TCP | SCTP |
| Low latency | UDP | TCP with optimizations |
| Security | HTTPS/TLS | IPSec |
| Real-time | RTP/UDP | WebRTC |
| File transfer | FTP/SFTP | HTTP |
| Email | SMTP/IMAP | POP3 |
| Web browsing | HTTP/HTTPS | HTTP/2, HTTP/3 |

### Best Practices

```javascript
// Protocol configuration example
const protocolConfig = {
  web: {
    protocol: 'HTTPS',
    version: '1.1',
    keepAlive: true,
    compression: 'gzip',
    timeout: 30000
  },
  
  realTime: {
    protocol: 'UDP',
    bufferSize: 1024,
    jitterBuffer: true,
    errorCorrection: 'FEC'
  },
  
  fileTransfer: {
    protocol: 'TCP',
    windowSize: 65536,
    congestionControl: 'CUBIC',
    retransmissionTimeout: 3000
  }
};
```

## Emerging Protocols

### 1. HTTP/3 (QUIC)

**Characteristics:**
- Built on UDP
- Multiplexed streams
- 0-RTT connection establishment
- Built-in encryption

### 2. gRPC

**Features:**
- HTTP/2 based
- Protocol Buffers serialization
- Bidirectional streaming
- Language agnostic

```javascript
// gRPC service definition
const grpcService = {
  GetUser: {
    path: '/users.UserService/GetUser',
    requestType: 'GetUserRequest',
    responseType: 'User',
    requestStream: false,
    responseStream: false
  },
  
  StreamUsers: {
    path: '/users.UserService/StreamUsers',
    requestType: 'StreamUsersRequest',
    responseType: 'User',
    requestStream: false,
    responseStream: true
  }
};
```

### 3. WebRTC

**Components:**
- MediaStream API
- RTCPeerConnection
- RTCDataChannel
- STUN/TURN servers

## Conclusion

Network protocols form the foundation of modern communication systems. Understanding their characteristics, trade-offs, and appropriate use cases is crucial for:

1. **System Design**: Choosing the right protocols for specific requirements
2. **Performance Optimization**: Tuning protocol parameters for optimal performance
3. **Security**: Implementing appropriate security protocols and practices
4. **Troubleshooting**: Diagnosing and resolving network issues
5. **Scalability**: Designing systems that can handle increasing loads

The evolution of protocols continues with new standards addressing modern requirements like low latency, high throughput, and enhanced security. Staying current with protocol developments is essential for building robust, efficient, and secure networked systems.
`
}; 