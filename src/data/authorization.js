export const authorization = {
  id: 'authorization',
  title: 'Authorization',
  content: `
## Definition
Authorization is the process of determining what actions or resources an authenticated user is permitted to access.

## Authorization Models
- **Role-Based Access Control (RBAC)**: Permissions based on roles
- **Attribute-Based Access Control (ABAC)**: Dynamic access based on attributes
- **Discretionary Access Control (DAC)**: Resource owners control access
- **Mandatory Access Control (MAC)**: System-enforced access rules

## RBAC Components
- **Users**: Individual entities
- **Roles**: Job functions or responsibilities
- **Permissions**: Specific actions on resources
- **Role Assignment**: Users assigned to roles
- **Permission Assignment**: Permissions assigned to roles

## Authorization Strategies
- **Access Control Lists (ACL)**: Resource-specific permissions
- **Capability-based**: Tokens represent permissions
- **Policy-based**: Rules engine for access decisions
- **Context-aware**: Consider time, location, device

## Implementation Patterns
- **Middleware**: Check permissions before request processing
- **Decorators/Annotations**: Method-level authorization
- **Policy Engines**: Centralized authorization logic
- **API Gateway**: Centralized authorization point

## Common Patterns
- **Least Privilege**: Minimum necessary permissions
- **Separation of Duties**: Divide critical functions
- **Defense in Depth**: Multiple authorization layers
- **Just-in-Time Access**: Temporary elevated permissions

## OAuth 2.0 Scopes
Define specific permissions for API access

## JWT Claims
Include authorization information in tokens

## Best Practices
- Regular permission audits
- Principle of least privilege
- Clear permission hierarchies
- Audit logging
- Regular access reviews

## Interview Questions
**Q: Explain the difference between RBAC and ABAC.**
A: RBAC uses predefined roles, while ABAC makes dynamic decisions based on user, resource, and environmental attributes.
`
}; 