export const tcp = {
  id: 'tcp',
  title: 'TCP (Transmission Control Protocol)',
  content: `# TCP (Transmission Control Protocol)

## Definition
TCP is a reliable, connection-oriented protocol that ensures data is delivered accurately and in order.

## Key Features
- **Connection-Oriented**: Establishes connection before data transfer
- **Reliable**: Guarantees data delivery
- **Ordered**: Data arrives in correct sequence
- **Flow Control**: Manages data transmission rate
- **Error Detection**: Checksums and acknowledgments

## TCP Handshake
1. **SYN**: Client sends synchronization request
2. **SYN-ACK**: Server acknowledges and sends its own SYN
3. **ACK**: Client acknowledges server's SYN

## TCP Header Fields
- Source/Destination Port
- Sequence Number
- Acknowledgment Number
- Window Size
- Checksum
- Flags (SYN, ACK, FIN, RST)

## Congestion Control
- **Slow Start**: Gradually increase window size
- **Congestion Avoidance**: Linear increase
- **Fast Retransmit**: Quick recovery from packet loss

## Interview Questions
**Q: Explain the TCP three-way handshake.**
A: SYN from client, SYN-ACK from server, ACK from client to establish connection.`
}; 