export const websockets = {
  id: 'websockets',
  title: 'WebSockets',
  content: `
## Definition
WebSockets provide full-duplex communication channels over a single TCP connection between client and server.

## Key Features
- **Bidirectional**: Both client and server can send messages
- **Real-time**: Low-latency communication
- **Persistent**: Connection stays open
- **Efficient**: Less overhead than HTTP polling
- **Cross-origin**: CORS support

## WebSocket Handshake
1. Client sends HTTP upgrade request
2. Server responds with 101 Switching Protocols
3. Connection upgraded to WebSocket protocol
4. Bidirectional communication begins

## Use Cases
- **Chat Applications**: Real-time messaging
- **Live Updates**: Stock prices, sports scores
- **Gaming**: Multiplayer online games
- **Collaboration**: Document editing
- **Notifications**: Push notifications

## WebSocket vs HTTP
- **Connection**: Persistent vs request-response
- **Overhead**: Low vs high for frequent updates
- **Complexity**: Higher vs simpler implementation
- **Caching**: Not applicable vs cacheable

## Implementation
\`\`\`javascript
const socket = new WebSocket('ws://localhost:8080');
socket.onopen = () => console.log('Connected');
socket.onmessage = (event) => console.log(event.data);
socket.send('Hello Server');
\`\`\`

## Challenges
- Connection management
- Scaling across servers
- Firewall/proxy issues
- Reconnection logic

## Interview Questions
**Q: When would you use WebSockets over HTTP?**
A: For real-time, bidirectional communication like chat apps, live updates, or collaborative editing.
`
}; 