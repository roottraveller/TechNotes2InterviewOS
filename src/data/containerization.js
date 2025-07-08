export const containerization = {
  id: 'containerization',
  title: 'Containerization',
  content: `
<p>Containerization is a lightweight form of virtualization that packages applications and their dependencies into containers. Containers share the host OS kernel but run in isolated user spaces, making them more efficient than traditional virtual machines.</p>

    <h3>Containers vs Virtual Machines</h3>
    
    <table>
      <thead>
        <tr>
          <th>Aspect</th>
          <th>Containers</th>
          <th>Virtual Machines</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Architecture</strong></td>
          <td>Share host OS kernel</td>
          <td>Each has its own OS</td>
        </tr>
        <tr>
          <td><strong>Size</strong></td>
          <td>Megabytes</td>
          <td>Gigabytes</td>
        </tr>
        <tr>
          <td><strong>Startup Time</strong></td>
          <td>Seconds</td>
          <td>Minutes</td>
        </tr>
        <tr>
          <td><strong>Resource Usage</strong></td>
          <td>Low overhead</td>
          <td>Higher overhead</td>
        </tr>
        <tr>
          <td><strong>Isolation</strong></td>
          <td>Process-level</td>
          <td>Hardware-level</td>
        </tr>
        <tr>
          <td><strong>Portability</strong></td>
          <td>Highly portable</td>
          <td>Less portable</td>
        </tr>
      </tbody>
    </table>

    <h3>Docker Architecture</h3>
    
    <h4>Core Components</h4>
    <ul>
      <li><strong>Docker Engine:</strong> Runtime that creates and manages containers</li>
      <li><strong>Docker Daemon:</strong> Background service managing Docker objects</li>
      <li><strong>Docker Client:</strong> CLI tool to interact with Docker daemon</li>
      <li><strong>Docker Registry:</strong> Storage for Docker images (e.g., Docker Hub)</li>
    </ul>

    <h4>Docker Objects</h4>
    <ul>
      <li><strong>Images:</strong> Read-only templates with instructions for creating containers</li>
      <li><strong>Containers:</strong> Runnable instances of images</li>
      <li><strong>Volumes:</strong> Persistent data storage</li>
      <li><strong>Networks:</strong> Communication between containers</li>
    </ul>

    <h3>Dockerfile Example</h3>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code># Multi-stage Dockerfile for Node.js app

# Build stage
FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Runtime stage
FROM node:16-alpine
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Copy built application
COPY --from=builder /app/node_modules ./node_modules
COPY --chown=nodejs:nodejs . .

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Start application
CMD ["node", "server.js"]</code></pre>
    </div>

    <h3>Docker Commands</h3>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code># Image Management
docker build -t myapp:latest .              # Build image
docker images                               # List images
docker rmi myapp:latest                     # Remove image
docker pull nginx:latest                    # Download image

# Container Management
docker run -d -p 8080:80 --name web nginx  # Run container
docker ps                                   # List running containers
docker ps -a                                # List all containers
docker stop web                             # Stop container
docker start web                            # Start container
docker rm web                               # Remove container
docker logs web                             # View logs
docker exec -it web /bin/bash               # Access container shell

# Volume Management
docker volume create mydata                 # Create volume
docker run -v mydata:/data myapp            # Mount volume
docker volume ls                            # List volumes
docker volume rm mydata                     # Remove volume

# Network Management
docker network create mynet                 # Create network
docker run --network mynet myapp            # Use network
docker network ls                           # List networks</code></pre>
    </div>

    <h3>Docker Compose</h3>
    <p>Tool for defining and running multi-container Docker applications using YAML files.</p>

    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code># docker-compose.yml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "8080:80"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgres://db:5432/myapp
    depends_on:
      - db
      - redis
    volumes:
      - ./uploads:/app/uploads
    networks:
      - backend
    restart: unless-stopped

  db:
    image: postgres:13
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: \${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - backend

  redis:
    image: redis:6-alpine
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data
    networks:
      - backend

volumes:
  postgres_data:
  redis_data:

networks:
  backend:
    driver: bridge</code></pre>
    </div>

    <h3>Container Orchestration</h3>
    
    <h4>Kubernetes (K8s)</h4>
    <p>Open-source container orchestration platform for automating deployment, scaling, and management of containerized applications.</p>

    <h5>Key Concepts</h5>
    <ul>
      <li><strong>Pod:</strong> Smallest deployable unit (one or more containers)</li>
      <li><strong>Service:</strong> Network endpoint for accessing pods</li>
      <li><strong>Deployment:</strong> Manages replicated application</li>
      <li><strong>Node:</strong> Worker machine in cluster</li>
      <li><strong>Cluster:</strong> Set of nodes running containerized applications</li>
    </ul>

    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code># kubernetes-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  labels:
    app: web
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
      - name: web
        image: myapp:latest
        ports:
        - containerPort: 8080
        resources:
          requests:
            memory: "64Mi"
            cpu: "250m"
          limits:
            memory: "128Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
---
apiVersion: v1
kind: Service
metadata:
  name: web-service
spec:
  selector:
    app: web
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
  type: LoadBalancer</code></pre>
    </div>

    <h3>Container Best Practices</h3>
    
    <h4>Security</h4>
    <ul>
      <li>Run as non-root user</li>
      <li>Use minimal base images (Alpine, Distroless)</li>
      <li>Scan images for vulnerabilities</li>
      <li>Don't store secrets in images</li>
      <li>Use read-only filesystems when possible</li>
      <li>Implement network policies</li>
    </ul>

    <h4>Image Optimization</h4>
    <ul>
      <li>Use multi-stage builds</li>
      <li>Minimize layers</li>
      <li>Order commands by change frequency</li>
      <li>Clean up in same layer</li>
      <li>Use .dockerignore file</li>
    </ul>

    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code># Optimized Dockerfile
FROM node:16-alpine AS builder
WORKDIR /app
# Copy only package files first (cache layer)
COPY package*.json ./
RUN npm ci --only=production && \
    npm cache clean --force  # Clean in same layer

FROM node:16-alpine
WORKDIR /app
# Copy from builder
COPY --from=builder /app/node_modules ./node_modules
COPY . .
# Combine RUN commands
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app
USER nodejs
CMD ["node", "server.js"]</code></pre>
    </div>

    <h4>Container Patterns</h4>
    <ul>
      <li><strong>Sidecar:</strong> Helper container alongside main container</li>
      <li><strong>Ambassador:</strong> Proxy for network connections</li>
      <li><strong>Adapter:</strong> Standardize output from main container</li>
      <li><strong>Init Container:</strong> Run setup before main container</li>
    </ul>

    <h3>Container Registries</h3>
    
    <h4>Popular Registries</h4>
    <ul>
      <li><strong>Docker Hub:</strong> Default public registry</li>
      <li><strong>Amazon ECR:</strong> AWS container registry</li>
      <li><strong>Google Container Registry:</strong> GCP registry</li>
      <li><strong>Azure Container Registry:</strong> Microsoft registry</li>
      <li><strong>Harbor:</strong> Open-source enterprise registry</li>
    </ul>

    <h4>Registry Operations</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code># Tag and push to registry
docker tag myapp:latest myregistry.com/myapp:v1.0
docker push myregistry.com/myapp:v1.0

# Pull from private registry
docker login myregistry.com
docker pull myregistry.com/myapp:v1.0

# Multi-architecture images
docker buildx build --platform linux/amd64,linux/arm64 \
  -t myregistry.com/myapp:latest --push .</code></pre>
    </div>

    <h3>Container Monitoring</h3>
    
    <h4>Key Metrics</h4>
    <ul>
      <li>CPU usage</li>
      <li>Memory consumption</li>
      <li>Network I/O</li>
      <li>Disk usage</li>
      <li>Container restarts</li>
      <li>Application-specific metrics</li>
    </ul>

    <h4>Monitoring Tools</h4>
    <ul>
      <li><strong>Prometheus:</strong> Metrics collection and alerting</li>
      <li><strong>Grafana:</strong> Visualization dashboards</li>
      <li><strong>ELK Stack:</strong> Logging (Elasticsearch, Logstash, Kibana)</li>
      <li><strong>Datadog:</strong> Full-stack monitoring</li>
      <li><strong>New Relic:</strong> Application performance monitoring</li>
    </ul>

    <h3>Related Links</h3>
    <ul>
      <li><a href="https://medium.com/@kmdkhadeer/containerization-and-orchestration-6eadd9a3c2d" target="_blank">Containerization and Orchestration</a></li>
      <li><a href="https://www.scaler.com/topics/docker/docker-vs-virtual-machine/" target="_blank">Docker vs Virtual Machine</a></li>
    </ul>
`
};