export const applicationServer = {
  id: 'application-server',
  title: 'Application Server',
  content: `
## Definition
An application server is a server that hosts and executes applications, providing business logic and dynamic content generation.

## Key Features
- **Business Logic Execution**: Runs application code and business rules
- **Database Connectivity**: Manages connections to databases
- **Transaction Management**: Handles ACID transactions
- **Security**: Provides authentication and authorization
- **Resource Management**: Manages memory, connections, and threads

## Common Application Servers
- **Apache Tomcat**: Java servlet container
- **JBoss/WildFly**: Java EE application server
- **WebLogic**: Oracle's enterprise application server
- **WebSphere**: IBM's application server
- **Node.js**: JavaScript runtime for server-side applications

## Architecture Layers
1. **Presentation Layer**: User interface
2. **Business Logic Layer**: Application processing
3. **Data Access Layer**: Database interactions

## Interview Questions
**Q: What is the difference between a web server and application server?**
A: Web servers serve static content and handle HTTP requests, while application servers execute business logic and provide enterprise services.

**Q: What are the benefits of using an application server?**
A: Centralized business logic, transaction management, security, scalability, and enterprise integration capabilities.
`
}; 