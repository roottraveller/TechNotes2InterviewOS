export const restApi = {
  id: 'rest-api',
  title: 'REST API',
  content: `# REST API (Representational State Transfer)

## Definition
REST is an architectural style for designing networked applications using stateless communication and standard HTTP methods.

## REST Principles
- **Stateless**: Each request contains all necessary information
- **Client-Server**: Separation of concerns
- **Cacheable**: Responses can be cached
- **Uniform Interface**: Consistent API design
- **Layered System**: Hierarchical architecture
- **Code on Demand**: Optional executable code transfer

## HTTP Methods in REST
- **GET**: Retrieve resources
- **POST**: Create new resources
- **PUT**: Update/replace resources
- **PATCH**: Partial updates
- **DELETE**: Remove resources

## Resource Naming
- Use nouns, not verbs
- Plural nouns for collections
- Hierarchical structure
- Examples: /users, /users/123, /users/123/orders

## Status Codes
- **200**: OK
- **201**: Created
- **204**: No Content
- **400**: Bad Request
- **401**: Unauthorized
- **404**: Not Found
- **500**: Internal Server Error

## Best Practices
- Consistent naming conventions
- Proper status codes
- Versioning strategy
- Error handling
- Documentation

## Interview Questions
**Q: What makes an API RESTful?**
A: Following REST principles: stateless, uniform interface, resource-based URLs, and proper HTTP methods.`
}; 