export const webServer = {
  id: 'web-server',
  title: 'Web Server',
  content: `# Web Server

## Definition
A web server is a computer system that hosts websites and serves web pages to users over the internet or an intranet.

## Key Concepts
- **HTTP/HTTPS Processing**: Handles HTTP requests and returns responses
- **Static Content**: Serves static files (HTML, CSS, JavaScript, images)
- **Dynamic Content**: Can process server-side scripts and applications
- **Port Management**: Typically listens on port 80 (HTTP) or 443 (HTTPS)

## Common Web Servers
- **Apache HTTP Server**: Open-source, widely used
- **Nginx**: High-performance, reverse proxy capabilities
- **IIS**: Microsoft's web server for Windows
- **Tomcat**: Java-based application server

## Basic Functionality
1. Listen for incoming HTTP requests
2. Parse and process requests
3. Generate or retrieve appropriate responses
4. Send responses back to clients

## Interview Questions
**Q: What is the difference between a web server and an application server?**
A: A web server primarily serves static content and handles HTTP requests, while an application server can execute business logic and dynamic applications.

**Q: How does a web server handle multiple concurrent requests?**
A: Through various models like multi-threading, event-driven architecture, or worker processes.`
}; 