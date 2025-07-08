export const rbac = {
  id: 'rbac',
  title: 'Role-Based Access Control (RBAC)',
  content: `
<p>RBAC is a security model that restricts system access to authorized users based on their roles within an organization, providing a structured approach to managing permissions and access rights.</p>

    <h3>Core Components</h3>
    
    <h4>1. Users</h4>
    <ul>
      <li>Individual entities that need access to the system</li>
      <li>Can be human users, service accounts, or applications</li>
      <li>Assigned one or more roles</li>
      <li>Inherit permissions through role assignments</li>
    </ul>

    <h4>2. Roles</h4>
    <ul>
      <li>Named collections of permissions</li>
      <li>Represent job functions or responsibilities</li>
      <li>Can be hierarchical (role inheritance)</li>
      <li>Examples: Admin, Manager, Editor, Viewer</li>
    </ul>

    <h4>3. Permissions</h4>
    <ul>
      <li>Specific access rights to resources or operations</li>
      <li>Granular actions like read, write, delete, execute</li>
      <li>Applied to specific resources or resource types</li>
      <li>Examples: read_users, write_posts, delete_comments</li>
    </ul>

    <h4>4. Resources</h4>
    <ul>
      <li>Objects or entities being protected</li>
      <li>Can be data, functions, or system components</li>
      <li>May have hierarchical relationships</li>
      <li>Examples: files, database records, API endpoints</li>
    </ul>

    <h3>RBAC Model Implementation</h3>

    <div class="code-block">
      <span class="code-label">CODE</span>
      <pre><code>// Basic RBAC data structures
class User {
  constructor(id, username, roles = []) {
    this.id = id;
    this.username = username;
    this.roles = roles; // Array of role names
  }
}

class Role {
  constructor(name, permissions = [], parentRoles = []) {
    this.name = name;
    this.permissions = permissions; // Array of permission names
    this.parentRoles = parentRoles; // Role inheritance
  }
}

class Permission {
  constructor(name, resource, action) {
    this.name = name;
    this.resource = resource; // Resource type or specific resource
    this.action = action; // read, write, delete, etc.
  }
}

// RBAC Manager
class RBACManager {
  constructor() {
    this.users = new Map();
    this.roles = new Map();
    this.permissions = new Map();
  }

  // Check if user has permission
  hasPermission(userId, permissionName) {
    const user = this.users.get(userId);
    if (!user) return false;

    // Check all user roles (including inherited)
    const allPermissions = this.getUserPermissions(user);
    return allPermissions.has(permissionName);
  }

  // Get all permissions for a user
  getUserPermissions(user) {
    const permissions = new Set();
    
    for (const roleName of user.roles) {
      const rolePermissions = this.getRolePermissions(roleName);
      rolePermissions.forEach(p => permissions.add(p));
    }
    
    return permissions;
  }

  // Get permissions for a role (including inherited)
  getRolePermissions(roleName) {
    const permissions = new Set();
    const visited = new Set();
    
    const collectPermissions = (currentRoleName) => {
      if (visited.has(currentRoleName)) return;
      visited.add(currentRoleName);
      
      const role = this.roles.get(currentRoleName);
      if (!role) return;
      
      // Add direct permissions
      role.permissions.forEach(p => permissions.add(p));
      
      // Add inherited permissions
      role.parentRoles.forEach(parentRole => 
        collectPermissions(parentRole)
      );
    };
    
    collectPermissions(roleName);
    return permissions;
  }
}</code></pre>
    </div>

    <h3>Role Hierarchy</h3>

    <h4>Hierarchical RBAC</h4>
    <ul>
      <li>Roles can inherit permissions from parent roles</li>
      <li>Reduces permission duplication</li>
      <li>Reflects organizational structure</li>
      <li>Senior roles inherit junior role permissions</li>
    </ul>

    <div class="code-block">
      <span class="code-label">CODE</span>
      <pre><code>// Role hierarchy example
const permissions = {
  'read_posts': new Permission('read_posts', 'posts', 'read'),
  'write_posts': new Permission('write_posts', 'posts', 'write'),
  'delete_posts': new Permission('delete_posts', 'posts', 'delete'),
  'manage_users': new Permission('manage_users', 'users', 'manage'),
  'system_admin': new Permission('system_admin', 'system', 'admin')
};

const roles = {
  'viewer': new Role('viewer', ['read_posts']),
  'editor': new Role('editor', ['write_posts'], ['viewer']), // Inherits read_posts
  'moderator': new Role('moderator', ['delete_posts'], ['editor']), // Inherits read, write
  'admin': new Role('admin', ['manage_users'], ['moderator']), // Inherits all previous
  'super_admin': new Role('super_admin', ['system_admin'], ['admin'])
};

// Usage
const rbac = new RBACManager();
Object.values(roles).forEach(role => rbac.roles.set(role.name, role));

const user = new User(1, 'john_doe', ['editor']);
rbac.users.set(user.id, user);

console.log(rbac.hasPermission(1, 'read_posts')); // true (inherited)
console.log(rbac.hasPermission(1, 'write_posts')); // true (direct)
console.log(rbac.hasPermission(1, 'delete_posts')); // false</code></pre>
    </div>

    <h3>Advanced RBAC Patterns</h3>

    <h4>Attribute-Based Access Control (ABAC) Integration</h4>
    <div class="code-block">
      <span class="code-label">CODE</span>
      <pre><code>// RBAC with contextual attributes
class ContextualRBAC extends RBACManager {
  hasPermission(userId, permissionName, context = {}) {
    const user = this.users.get(userId);
    if (!user) return false;

    // Basic RBAC check
    const hasBasicPermission = super.hasPermission(userId, permissionName);
    if (!hasBasicPermission) return false;

    // Additional contextual checks
    return this.checkContextualRules(user, permissionName, context);
  }

  checkContextualRules(user, permission, context) {
    // Time-based access
    if (context.time && !this.isWithinAllowedHours(user, context.time)) {
      return false;
    }

    // Location-based access
    if (context.location && !this.isAllowedLocation(user, context.location)) {
      return false;
    }

    // Resource ownership
    if (context.resourceOwner && context.resourceOwner !== user.id) {
      return this.hasElevatedPermission(user, permission);
    }

    return true;
  }

  isWithinAllowedHours(user, currentTime) {
    // Check if user can access during current time
    const userRoles = user.roles;
    return userRoles.includes('admin') || this.isBusinessHours(currentTime);
  }
}</code></pre>
    </div>

    <h4>Dynamic Role Assignment</h4>
    <div class="code-block">
      <span class="code-label">CODE</span>
      <pre><code>// Dynamic roles based on conditions
class DynamicRBAC extends RBACManager {
  getUserRoles(userId, context = {}) {
    const user = this.users.get(userId);
    if (!user) return [];

    let roles = [...user.roles]; // Static roles

    // Add dynamic roles based on context
    if (context.projectId) {
      const projectRoles = this.getProjectRoles(userId, context.projectId);
      roles = [...roles, ...projectRoles];
    }

    if (context.department) {
      const deptRoles = this.getDepartmentRoles(userId, context.department);
      roles = [...roles, ...deptRoles];
    }

    return roles;
  }

  hasPermission(userId, permissionName, context = {}) {
    const dynamicRoles = this.getUserRoles(userId, context);
    const tempUser = { ...this.users.get(userId), roles: dynamicRoles };
    
    const allPermissions = this.getUserPermissions(tempUser);
    return allPermissions.has(permissionName);
  }
}</code></pre>
    </div>

    <h3>RBAC in Web Applications</h3>

    <h4>Middleware Implementation</h4>
    <div class="code-block">
      <span class="code-label">CODE</span>
      <pre><code>// Express.js RBAC middleware
function requirePermission(permissionName) {
  return async (req, res, next) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const context = {
        time: new Date(),
        location: req.ip,
        resourceId: req.params.id,
        method: req.method
      };

      const hasPermission = rbac.hasPermission(userId, permissionName, context);
      
      if (!hasPermission) {
        return res.status(403).json({ 
          error: 'Insufficient permissions',
          required: permissionName 
        });
      }

      next();
    } catch (error) {
      res.status(500).json({ error: 'Authorization check failed' });
    }
  };
}

// Usage in routes
app.get('/api/posts', 
  authenticate, 
  requirePermission('read_posts'), 
  getPosts
);

app.post('/api/posts', 
  authenticate, 
  requirePermission('write_posts'), 
  createPost
);

app.delete('/api/posts/:id', 
  authenticate, 
  requirePermission('delete_posts'), 
  deletePost
);</code></pre>
    </div>

    <h4>Frontend Integration</h4>
    <div class="code-block">
      <span class="code-label">CODE</span>
      <pre><code>// React component with RBAC
import { usePermissions } from './hooks/usePermissions';

function PostActions({ post }) {
  const { hasPermission } = usePermissions();

  return (
    <div className="post-actions">
      {hasPermission('read_posts') && (
        <button onClick={() => viewPost(post.id)}>View</button>
      )}
      
      {hasPermission('write_posts') && (
        <button onClick={() => editPost(post.id)}>Edit</button>
      )}
      
      {hasPermission('delete_posts') && (
        <button onClick={() => deletePost(post.id)}>Delete</button>
      )}
    </div>
  );
}

// Custom hook for permissions
function usePermissions() {
  const { user } = useAuth();
  
  const hasPermission = (permissionName, context = {}) => {
    return rbac.hasPermission(user.id, permissionName, context);
  };

  return { hasPermission };
}</code></pre>
    </div>

    <h3>Database Schema Design</h3>

    <div class="code-block">
      <span class="code-label">CODE</span>
      <pre><code>-- RBAC database schema
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE permissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  resource VARCHAR(255) NOT NULL,
  action VARCHAR(255) NOT NULL,
  description TEXT
);

-- Many-to-many relationships
CREATE TABLE user_roles (
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  role_id INTEGER REFERENCES roles(id) ON DELETE CASCADE,
  assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  assigned_by INTEGER REFERENCES users(id),
  PRIMARY KEY (user_id, role_id)
);

CREATE TABLE role_permissions (
  role_id INTEGER REFERENCES roles(id) ON DELETE CASCADE,
  permission_id INTEGER REFERENCES permissions(id) ON DELETE CASCADE,
  PRIMARY KEY (role_id, permission_id)
);

-- Role hierarchy
CREATE TABLE role_hierarchy (
  parent_role_id INTEGER REFERENCES roles(id) ON DELETE CASCADE,
  child_role_id INTEGER REFERENCES roles(id) ON DELETE CASCADE,
  PRIMARY KEY (parent_role_id, child_role_id)
);</code></pre>
    </div>

    <h3>Best Practices</h3>

    <h4>Role Design Principles</h4>
    <ul>
      <li><strong>Principle of Least Privilege:</strong> Grant minimum necessary permissions</li>
      <li><strong>Role Clarity:</strong> Roles should have clear, understandable purposes</li>
      <li><strong>Separation of Duties:</strong> Distribute sensitive operations across roles</li>
      <li><strong>Regular Review:</strong> Periodically audit roles and permissions</li>
    </ul>

    <h4>Implementation Guidelines</h4>
    <ul>
      <li>Cache permission checks for performance</li>
      <li>Log all authorization decisions for auditing</li>
      <li>Implement role delegation and temporary assignments</li>
      <li>Support bulk operations for role management</li>
      <li>Provide clear error messages for access denials</li>
      <li>Design for scalability with large user bases</li>
    </ul>

    <h3>Common Challenges</h3>

    <h4>Role Explosion</h4>
    <ul>
      <li><strong>Problem:</strong> Too many granular roles</li>
      <li><strong>Solution:</strong> Use role composition and inheritance</li>
    </ul>

    <h4>Permission Creep</h4>
    <ul>
      <li><strong>Problem:</strong> Users accumulate unnecessary permissions</li>
      <li><strong>Solution:</strong> Regular access reviews and role cleanup</li>
    </ul>

    <h4>Complex Hierarchies</h4>
    <ul>
      <li><strong>Problem:</strong> Overly complex role inheritance</li>
      <li><strong>Solution:</strong> Keep hierarchies shallow and well-documented</li>
    </ul>

    <div class="info-note">
      <strong>💡 Key Insight:</strong>
      <p>RBAC provides a scalable and manageable approach to access control by organizing permissions around roles. Success depends on thoughtful role design that reflects your organization's structure and security requirements.</p>
    </div>
`
}; 