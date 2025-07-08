export const apiGateway = {
  id: 'api-gateway',
  title: 'API Gateway',
  content: `
## Definition
An API Gateway is a server that acts as a single entry point for multiple backend services, handling routing, authentication, and other cross-cutting concerns.

## Core Functions
- **Request Routing**: Direct requests to appropriate services
- **Authentication/Authorization**: Centralized security
- **Rate Limiting**: Control API usage
- **Load Balancing**: Distribute traffic across instances
- **Request/Response Transformation**: Modify data formats

## Key Features
- **Protocol Translation**: HTTP to different protocols
- **API Versioning**: Manage multiple API versions
- **Caching**: Store frequently requested data
- **Monitoring**: Track API usage and performance
- **Documentation**: Auto-generated API docs

## Benefits
- **Single Entry Point**: Simplified client integration
- **Cross-cutting Concerns**: Centralized common functionality
- **Service Abstraction**: Hide backend complexity
- **Security**: Centralized authentication and authorization
- **Analytics**: Unified monitoring and logging

## Common Patterns
- **Backend for Frontend (BFF)**: Specific gateways per client type
- **Microservices Gateway**: Route to microservices
- **Legacy Integration**: Modernize legacy APIs
- **Multi-cloud**: Unify APIs across cloud providers

## Popular API Gateways
- **Amazon API Gateway**: AWS managed service
- **Kong**: Open-source, plugin-based
- **Zuul**: Netflix's gateway (now Zuul 2)
- **Envoy Proxy**: High-performance proxy
- **Azure API Management**: Microsoft's solution

## Challenges
- **Single Point of Failure**: High availability requirements
- **Performance Bottleneck**: Additional network hop
- **Complexity**: Configuration and management overhead
- **Vendor Lock-in**: Platform-specific features

## Security Features
- **OAuth/JWT**: Token-based authentication
- **API Keys**: Simple authentication method
- **IP Whitelisting**: Network-level access control
- **CORS**: Cross-origin resource sharing

## Interview Questions
**Q: What problems does an API Gateway solve?**
A: Centralized routing, authentication, rate limiting, and monitoring while providing a single entry point for multiple backend services.
`
}; 