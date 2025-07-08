export const udp = {
  id: 'udp',
  title: 'UDP (User Datagram Protocol)',
  content: `
## Definition
UDP is a connectionless, unreliable protocol that provides fast data transmission without guarantees.

## Key Features
- **Connectionless**: No connection establishment required
- **Unreliable**: No guarantee of delivery
- **Fast**: Minimal overhead
- **Stateless**: No connection state maintained
- **Broadcast/Multicast**: Supports one-to-many communication

## UDP Header
- Source Port (16 bits)
- Destination Port (16 bits)
- Length (16 bits)
- Checksum (16 bits)

## Use Cases
- **DNS**: Domain name resolution
- **DHCP**: IP address assignment
- **Streaming**: Video/audio streaming
- **Gaming**: Real-time multiplayer games
- **IoT**: Sensor data transmission

## Advantages
- Low latency
- Simple implementation
- No connection overhead
- Supports broadcasting

## Disadvantages
- No reliability guarantees
- No flow control
- No congestion control
- Packet loss possible

## Interview Questions
**Q: When would you choose UDP over TCP?**
A: For real-time applications where speed is more important than reliability, like gaming or streaming.
`
}; 