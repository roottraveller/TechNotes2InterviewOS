export const http = {
  id: 'http',
  title: 'HTTP (HyperText Transfer Protocol)',
  content: `# HTTP (HyperText Transfer Protocol)

## Definition
HTTP is an application-layer protocol for transmitting hypermedia documents between web servers and clients.

## HTTP Methods
- **GET**: Retrieve data
- **POST**: Submit data
- **PUT**: Update/replace resource
- **PATCH**: Partial update
- **DELETE**: Remove resource
- **HEAD**: Get headers only
- **OPTIONS**: Get allowed methods

## Status Codes
- **1xx**: Informational
- **2xx**: Success (200 OK, 201 Created)
- **3xx**: Redirection (301 Moved, 302 Found)
- **4xx**: Client Error (400 Bad Request, 404 Not Found)
- **5xx**: Server Error (500 Internal Server Error)

## HTTP Headers
- **Request**: Host, User-Agent, Accept
- **Response**: Content-Type, Content-Length, Set-Cookie
- **General**: Date, Connection, Cache-Control

## HTTP vs HTTPS
- **HTTP**: Plain text, port 80
- **HTTPS**: Encrypted with TLS/SSL, port 443

## Interview Questions
**Q: What's the difference between PUT and PATCH?**
A: PUT replaces the entire resource, while PATCH applies partial modifications.`
}; 