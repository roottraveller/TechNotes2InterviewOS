export const authorization = {
  id: 'authorization',
  title: 'Authorization',
  content: `
    <p>Authorization is the process of determining what actions or resources an authenticated user is permitted to access within a system. While authentication answers "Who are you?", authorization answers "What are you allowed to do?" It's a critical security control that enforces access policies and ensures users can only perform actions appropriate to their role and context.</p>

    <h3>Core Authorization Concepts</h3>
    <p>Authorization systems are built on fundamental concepts that define how access decisions are made and enforced across different system components.</p>

    <h4>Key Authorization Elements</h4>
    <ul>
      <li><strong>Subject:</strong> The entity requesting access (user, service, application)</li>
      <li><strong>Object:</strong> The resource being accessed (file, database, API endpoint)</li>
      <li><strong>Action:</strong> The operation being performed (read, write, delete, execute)</li>
      <li><strong>Context:</strong> Environmental factors (time, location, device, network)</li>
      <li><strong>Policy:</strong> Rules that define access permissions</li>
    </ul>

    <details>
      <summary><strong>Example: Google Drive File Sharing</strong></summary>
      <div class="info-note">
        When you share a Google Drive document, you're setting authorization policies. You can give someone "View" access (read-only), "Comment" access (read + comment), or "Edit" access (full permissions). The system checks these permissions every time someone tries to access the file, ensuring they can only perform actions you've authorized.
      </div>
    </details>

    <h3>Authorization Models</h3>
    <p>Different authorization models provide various approaches to managing access control, each suited for different organizational needs and security requirements.</p>

    <h4>Role-Based Access Control (RBAC)</h4>
    <p>RBAC is the most widely used authorization model, organizing permissions around roles that reflect job functions or responsibilities.</p>

    <ul>
      <li><strong>Users:</strong> Individual entities in the system</li>
      <li><strong>Roles:</strong> Job functions or responsibilities (Admin, Editor, Viewer)</li>
      <li><strong>Permissions:</strong> Specific actions on resources</li>
      <li><strong>Role Assignment:</strong> Users assigned to one or more roles</li>
      <li><strong>Permission Assignment:</strong> Permissions assigned to roles</li>
    </ul>

    <details>
      <summary><strong>Example: Hospital Management System RBAC</strong></summary>
      <div class="info-note">
        In a hospital system, a Doctor role might have permissions to read patient records, write prescriptions, and update treatment plans. A Nurse role might read patient records and update vital signs but cannot write prescriptions. An Administrator role manages user accounts and system settings but cannot access patient medical data, ensuring proper separation of duties.
      </div>
    </details>

    <h4>Attribute-Based Access Control (ABAC)</h4>
    <p>ABAC provides fine-grained, dynamic access control based on attributes of the user, resource, action, and environment.</p>

    <ul>
      <li><strong>User attributes:</strong> Department, clearance level, job title</li>
      <li><strong>Resource attributes:</strong> Classification, owner, creation date</li>
      <li><strong>Action attributes:</strong> Operation type, urgency level</li>
      <li><strong>Environmental attributes:</strong> Time, location, network security</li>
    </ul>

    <details>
      <summary><strong>Example: Military Document Access (ABAC)</strong></summary>
      <div class="info-note">
        A military system might allow access to classified documents only if: the user has appropriate security clearance (user attribute), the document classification matches or is below the user's clearance (resource attribute), the access is during business hours (environmental attribute), and the user is accessing from a secure network (environmental attribute).
      </div>
    </details>

    <h4>Discretionary Access Control (DAC)</h4>
    <ul>
      <li><strong>Owner control:</strong> Resource owners set access permissions</li>
      <li><strong>Flexible permissions:</strong> Users can grant/revoke access to their resources</li>
      <li><strong>Access Control Lists (ACLs):</strong> Per-resource permission lists</li>
      <li><strong>Inheritance:</strong> Permissions can be inherited from parent objects</li>
    </ul>

    <h4>Mandatory Access Control (MAC)</h4>
    <ul>
      <li><strong>System-enforced:</strong> Access policies set by system administrators</li>
      <li><strong>Security labels:</strong> Resources and users have security classifications</li>
      <li><strong>No user override:</strong> Users cannot change access permissions</li>
      <li><strong>High security:</strong> Used in military and government systems</li>
    </ul>

    <div class="comparison-table">
      <table>
        <thead>
          <tr>
            <th>Model</th>
            <th>Control</th>
            <th>Flexibility</th>
            <th>Complexity</th>
            <th>Use Case</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>RBAC</strong></td>
            <td>Role-based</td>
            <td>Medium</td>
            <td>Low</td>
            <td>Enterprise applications</td>
          </tr>
          <tr>
            <td><strong>ABAC</strong></td>
            <td>Attribute-based</td>
            <td>High</td>
            <td>High</td>
            <td>Complex, dynamic environments</td>
          </tr>
          <tr>
            <td><strong>DAC</strong></td>
            <td>Owner-based</td>
            <td>High</td>
            <td>Medium</td>
            <td>File systems, collaborative tools</td>
          </tr>
          <tr>
            <td><strong>MAC</strong></td>
            <td>System-enforced</td>
            <td>Low</td>
            <td>Medium</td>
            <td>High-security environments</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h3>Implementation Patterns</h3>
    <p>Authorization can be implemented using various architectural patterns, each offering different trade-offs in terms of performance, maintainability, and security.</p>

    <h4>Middleware-Based Authorization</h4>
    <ul>
      <li><strong>Request interception:</strong> Check permissions before processing requests</li>
      <li><strong>Centralized logic:</strong> Authorization logic in middleware layer</li>
      <li><strong>Framework integration:</strong> Built into web frameworks</li>
      <li><strong>Performance optimization:</strong> Caching and efficient permission checks</li>
    </ul>

    <details>
      <summary><strong>Example: Express.js Authorization Middleware</strong></summary>
      <div class="info-note">
        In an Express.js application, authorization middleware checks user permissions before allowing access to protected routes. For example, an admin dashboard route might require both authentication and admin role verification. The middleware checks the user's JWT token, extracts their role, and either allows the request to proceed or returns a 403 Forbidden error.
      </div>
    </details>

    <h4>Policy Engine Pattern</h4>
    <ul>
      <li><strong>Centralized decisions:</strong> Single point for authorization logic</li>
      <li><strong>Policy language:</strong> Declarative rules for access control</li>
      <li><strong>External evaluation:</strong> Separate service for authorization decisions</li>
      <li><strong>Audit trail:</strong> Detailed logging of authorization decisions</li>
    </ul>

    <h4>API Gateway Authorization</h4>
    <ul>
      <li><strong>Centralized enforcement:</strong> Single entry point for all API requests</li>
      <li><strong>Token validation:</strong> JWT or OAuth token verification</li>
      <li><strong>Rate limiting:</strong> Control access based on usage patterns</li>
      <li><strong>Routing decisions:</strong> Route based on user permissions</li>
    </ul>

    <div class="code-block">
      <div class="code-label">AUTHORIZATION FLOW</div>
      <pre><code>// Authorization Decision Flow
┌─────────────┐    1. Request with Token    ┌─────────────┐
│   Client    │ ──────────────────────────> │   Gateway   │
│Application  │                             │             │
└─────────────┘                             └─────────────┘
                                                   │
                                    2. Extract Claims/Roles
                                                   │
                                                   ▼
                                            ┌─────────────┐
                                            │Policy Engine│
                                            │   (PDP)     │
                                            └─────────────┘
                                                   │
                                    3. Evaluate Policies
                                                   │
                                                   ▼
                                            ┌─────────────┐
                                            │  Decision   │
                                            │(Permit/Deny)│
                                            └─────────────┘
                                                   │
                                    4. Enforce Decision
                                                   │
                                                   ▼
                                            ┌─────────────┐
                                            │  Resource   │
                                            │   Server    │
                                            └─────────────┘</code></pre>
    </div>

    <h3>OAuth 2.0 and Scopes</h3>
    <p>OAuth 2.0 uses scopes to define specific permissions for API access, providing fine-grained authorization for third-party applications.</p>

    <h4>Scope-Based Authorization</h4>
    <ul>
      <li><strong>Granular permissions:</strong> Specific actions on specific resources</li>
      <li><strong>User consent:</strong> Users explicitly grant permissions</li>
      <li><strong>Limited access:</strong> Applications get only requested permissions</li>
      <li><strong>Revocable:</strong> Users can revoke permissions at any time</li>
    </ul>

    <h4>Common OAuth Scopes</h4>
    <ul>
      <li><strong>read:</strong> Read access to resources</li>
      <li><strong>write:</strong> Create and update resources</li>
      <li><strong>delete:</strong> Delete resources</li>
      <li><strong>admin:</strong> Administrative access</li>
      <li><strong>profile:</strong> Access to user profile information</li>
    </ul>

    <details>
      <summary><strong>Example: GitHub OAuth Scopes</strong></summary>
      <div class="info-note">
        When a CI/CD tool requests access to your GitHub repositories, it might request scopes like "repo:status" (access to commit status), "public_repo" (access to public repositories), or "repo" (full repository access). You can see exactly what permissions the application is requesting and approve only the necessary scopes, following the principle of least privilege.
      </div>
    </details>

    <h3>JWT Claims and Authorization</h3>
    <p>JSON Web Tokens can include authorization information in their claims, enabling stateless authorization decisions.</p>

    <h4>Authorization Claims</h4>
    <ul>
      <li><strong>Roles:</strong> User's assigned roles</li>
      <li><strong>Permissions:</strong> Specific permissions granted</li>
      <li><strong>Scopes:</strong> OAuth scopes for API access</li>
      <li><strong>Context:</strong> Time limits, IP restrictions</li>
    </ul>

    <h4>JWT Authorization Example</h4>
    <div class="code-block">
      <div class="code-label">JWT CLAIMS</div>
      <pre><code>{
  "sub": "user123",
  "name": "John Doe",
  "roles": ["editor", "reviewer"],
  "permissions": ["read:articles", "write:articles"],
  "scopes": ["api:read", "api:write"],
  "department": "engineering",
  "clearance": "confidential",
  "exp": 1640995200
}</code></pre>
    </div>

    <h3>Authorization Strategies</h3>
    <p>Different strategies can be employed to implement authorization effectively across various system architectures.</p>

    <h4>Access Control Lists (ACL)</h4>
    <ul>
      <li><strong>Resource-specific:</strong> Permissions attached to individual resources</li>
      <li><strong>User/group lists:</strong> Explicit lists of allowed users or groups</li>
      <li><strong>Action granularity:</strong> Different permissions for different actions</li>
      <li><strong>Inheritance:</strong> Permissions can be inherited from parent resources</li>
    </ul>

    <h4>Capability-Based Security</h4>
    <ul>
      <li><strong>Capability tokens:</strong> Tokens represent specific permissions</li>
      <li><strong>Unforgeable:</strong> Cryptographically secured capabilities</li>
      <li><strong>Transferable:</strong> Capabilities can be delegated</li>
      <li><strong>Revocable:</strong> Capabilities can be revoked</li>
    </ul>

    <h4>Context-Aware Authorization</h4>
    <ul>
      <li><strong>Time-based:</strong> Access allowed only during specific hours</li>
      <li><strong>Location-based:</strong> Access restricted by geographic location</li>
      <li><strong>Device-based:</strong> Access limited to specific devices</li>
      <li><strong>Network-based:</strong> Access restricted to specific networks</li>
    </ul>

    <details>
      <summary><strong>Example: Banking Context-Aware Authorization</strong></summary>
      <div class="info-note">
        A banking application might allow normal transactions during business hours from known devices, but require additional verification for large transfers, transactions outside business hours, or access from new devices. The system considers time, location, transaction amount, and device trust level to make dynamic authorization decisions.
      </div>
    </details>

    <h3>Security Principles</h3>
    <p>Authorization systems should follow established security principles to ensure robust and maintainable access control.</p>

    <h4>Principle of Least Privilege</h4>
    <ul>
      <li><strong>Minimum access:</strong> Users get only permissions needed for their job</li>
      <li><strong>Just-in-time access:</strong> Temporary elevated permissions when needed</li>
      <li><strong>Regular review:</strong> Periodic audit of user permissions</li>
      <li><strong>Automatic revocation:</strong> Remove permissions when no longer needed</li>
    </ul>

    <h4>Separation of Duties</h4>
    <ul>
      <li><strong>Divide critical functions:</strong> No single person can complete critical processes</li>
      <li><strong>Dual approval:</strong> Require multiple approvals for sensitive operations</li>
      <li><strong>Conflict of interest:</strong> Prevent users from having conflicting roles</li>
      <li><strong>Audit trails:</strong> Track who performed what actions</li>
    </ul>

    <h4>Defense in Depth</h4>
    <ul>
      <li><strong>Multiple layers:</strong> Authorization at different system levels</li>
      <li><strong>Redundant controls:</strong> Multiple authorization mechanisms</li>
      <li><strong>Fail-safe defaults:</strong> Deny access by default</li>
      <li><strong>Continuous monitoring:</strong> Real-time authorization monitoring</li>
    </ul>

    <details>
      <summary><strong>Example: AWS IAM Defense in Depth</strong></summary>
      <div class="info-note">
        AWS implements defense in depth with multiple authorization layers: IAM policies control what users can do, resource-based policies control access to specific resources, service control policies provide organization-wide guardrails, and VPC security groups control network access. This multi-layered approach ensures that even if one layer fails, others provide protection.
      </div>
    </details>

    <h3>Modern Authorization Patterns</h3>
    <p>Contemporary authorization systems incorporate advanced patterns to address modern security challenges and architectural requirements.</p>

    <h4>Zero Trust Authorization</h4>
    <ul>
      <li><strong>Never trust, always verify:</strong> Continuous authorization verification</li>
      <li><strong>Context-aware decisions:</strong> Consider all available context</li>
      <li><strong>Micro-segmentation:</strong> Fine-grained access control</li>
      <li><strong>Dynamic policies:</strong> Policies adapt to changing conditions</li>
    </ul>

    <h4>Policy as Code</h4>
    <ul>
      <li><strong>Version control:</strong> Authorization policies in source control</li>
      <li><strong>Automated testing:</strong> Test authorization policies like application code</li>
      <li><strong>CI/CD integration:</strong> Deploy policy changes through pipelines</li>
      <li><strong>Audit trail:</strong> Track policy changes over time</li>
    </ul>

    <h4>Microservices Authorization</h4>
    <ul>
      <li><strong>Service-to-service:</strong> Authorization between microservices</li>
      <li><strong>Distributed decisions:</strong> Authorization at service boundaries</li>
      <li><strong>Token propagation:</strong> Pass authorization context between services</li>
      <li><strong>Service mesh:</strong> Authorization at the infrastructure level</li>
    </ul>

    <details>
      <summary><strong>Example: Netflix's Microservices Authorization</strong></summary>
      <div class="info-note">
        Netflix uses a distributed authorization model where each microservice makes its own authorization decisions based on JWT tokens. The tokens contain user context and permissions, allowing services to make authorization decisions without calling back to a central authorization service. This approach scales well with their thousands of microservices while maintaining security.
      </div>
    </details>

    <h3>Implementation Challenges</h3>
    <p>Authorization systems face various challenges that must be addressed for effective security and usability.</p>

    <h4>Performance Considerations</h4>
    <ul>
      <li><strong>Caching strategies:</strong> Cache authorization decisions to improve performance</li>
      <li><strong>Lazy evaluation:</strong> Evaluate permissions only when needed</li>
      <li><strong>Batch operations:</strong> Group authorization checks for efficiency</li>
      <li><strong>Async processing:</strong> Non-blocking authorization checks</li>
    </ul>

    <h4>Scalability Challenges</h4>
    <ul>
      <li><strong>Distributed systems:</strong> Authorization across multiple services</li>
      <li><strong>Data consistency:</strong> Keeping authorization data synchronized</li>
      <li><strong>High availability:</strong> Authorization system uptime requirements</li>
      <li><strong>Global distribution:</strong> Authorization across geographic regions</li>
    </ul>

    <h4>Complexity Management</h4>
    <ul>
      <li><strong>Policy conflicts:</strong> Resolving conflicting authorization rules</li>
      <li><strong>Role explosion:</strong> Managing large numbers of roles</li>
      <li><strong>Permission creep:</strong> Users accumulating unnecessary permissions</li>
      <li><strong>Debugging:</strong> Troubleshooting authorization failures</li>
    </ul>

    <h3>Best Practices</h3>

    <h4>Design Best Practices</h4>
    <ul>
      <li><strong>Clear authorization model:</strong> Choose appropriate model for your use case</li>
      <li><strong>Consistent patterns:</strong> Use consistent authorization patterns across the system</li>
      <li><strong>Fail-safe defaults:</strong> Deny access by default, explicitly grant permissions</li>
      <li><strong>Separation of concerns:</strong> Separate authentication from authorization</li>
      <li><strong>Audit logging:</strong> Log all authorization decisions for security analysis</li>
    </ul>

    <h4>Implementation Best Practices</h4>
    <ul>
      <li><strong>Centralized policy management:</strong> Manage policies in a central location</li>
      <li><strong>Regular access reviews:</strong> Periodically review and update permissions</li>
      <li><strong>Automated provisioning:</strong> Automate user onboarding and offboarding</li>
      <li><strong>Performance monitoring:</strong> Monitor authorization system performance</li>
      <li><strong>Security testing:</strong> Regular penetration testing of authorization controls</li>
    </ul>

    <h4>Operational Best Practices</h4>
    <ul>
      <li><strong>Incident response:</strong> Procedures for authorization breaches</li>
      <li><strong>Monitoring and alerting:</strong> Real-time monitoring of authorization patterns</li>
      <li><strong>Compliance reporting:</strong> Generate reports for regulatory compliance</li>
      <li><strong>User training:</strong> Educate users on proper authorization practices</li>
      <li><strong>Vendor management:</strong> Evaluate third-party authorization solutions</li>
    </ul>

    <details>
      <summary><strong>Example: Airbnb's Authorization Evolution</strong></summary>
      <div class="info-note">
        Airbnb evolved from a simple RBAC system to a sophisticated authorization platform that handles complex scenarios like hosts managing multiple properties, guests with different booking statuses, and support agents with time-limited access. They implemented a policy engine that evaluates rules in real-time, considering factors like user type, property ownership, booking status, and geographic location.
      </div>
    </details>

    <div class="reference-links">
      <h4>References</h4>
      <ul>
        <li><a href="https://owasp.org/www-project-application-security-verification-standard/" target="_blank">OWASP: Application Security Verification Standard</a></li>
        <li><a href="https://csrc.nist.gov/publications/detail/sp/800-162/final" target="_blank">NIST: Guide to Attribute Based Access Control</a></li>
        <li><a href="https://auth0.com/docs/manage-users/access-control" target="_blank">Auth0: Access Control Documentation</a></li>
        <li><a href="https://www.okta.com/identity-101/authorization/" target="_blank">Okta: Authorization Best Practices</a></li>
        <li><a href="https://datatracker.ietf.org/doc/html/rfc6749#section-3.3" target="_blank">RFC 6749: OAuth 2.0 Scope Parameter</a></li>
      </ul>
    </div>
  `
}; 