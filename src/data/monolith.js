export const monolith = {
  id: 'monolith',
  title: 'Monolithic Architecture',
  content: `
## Definition
A monolithic architecture is a software design pattern where all components of an application are interconnected and deployed as a single unit.

## Characteristics
- **Single Deployable Unit**: Entire application deployed together
- **Shared Database**: All components use same database
- **Unified Technology Stack**: Same programming language/framework
- **Centralized Business Logic**: All features in one codebase
- **Process Communication**: In-memory function calls

## Benefits
- **Simplicity**: Easier to develop initially
- **Testing**: Simpler integration testing
- **Deployment**: Single deployment artifact
- **Debugging**: Easier to trace issues
- **Performance**: No network latency between components

## Drawbacks
- **Scaling**: Must scale entire application
- **Technology Lock-in**: Hard to adopt new technologies
- **Team Coordination**: Multiple teams working on same codebase
- **Deployment Risk**: Small changes require full deployment
- **Fault Tolerance**: Single point of failure

## When to Use Monoliths
- Small teams
- Simple applications
- Rapid prototyping
- Well-understood domain
- Limited scalability requirements

## Migration to Microservices
- **Strangler Fig Pattern**: Gradually replace components
- **Database Decomposition**: Split shared databases
- **Service Extraction**: Extract bounded contexts

## Interview Questions
**Q: When would you choose a monolith over microservices?**
A: For small teams, simple applications, or when rapid development and deployment simplicity are priorities.
`
}; 