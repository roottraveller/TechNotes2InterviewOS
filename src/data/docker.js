export const docker = {
  id: 'docker',
  title: 'Docker',
  content: `
    <p>Docker is a containerization platform that packages applications and their dependencies into lightweight, portable containers. It revolutionized software deployment by providing consistent environments across development, testing, and production systems. Docker enables microservices architectures, DevOps practices, and cloud-native applications at scale.</p>

    <details>
      <summary><strong>Real-World Example: Netflix's Docker Infrastructure</strong></summary>
      <div class="info-note">
        Netflix runs 700+ microservices using Docker containers across AWS, serving 260+ million subscribers globally. Their containerized architecture processes 8+ billion hours of streaming monthly, handles 1+ billion API calls daily, and enables rapid deployment of 4,000+ production changes per day. Netflix's Docker implementation includes custom container orchestration (Titus), automated scaling based on demand patterns, and sophisticated monitoring across 100,000+ container instances. The containerized approach reduced deployment time from hours to minutes, improved resource utilization by 40%, and enabled Netflix to achieve 99.99% availability during peak traffic events like new show releases.
      </div>
    </details>

    <h3>Docker Architecture and Components</h3>
    <p>Docker uses a client-server architecture with multiple components working together to manage containerized applications.</p>

    <h4>Core Docker Components</h4>
    <div class="code-block">
      <pre><code>Docker Architecture:

Docker Client (CLI):
├── docker build: Build images from Dockerfile
├── docker run: Create and start containers
├── docker pull: Download images from registry
├── docker push: Upload images to registry
└── docker compose: Multi-container orchestration

Docker Daemon (dockerd):
├── Manages Docker objects (images, containers, networks)
├── Listens for Docker API requests
├── Handles container lifecycle
├── Manages storage and networking
└── Communicates with other daemons

Docker Images:
├── Read-only templates for containers
├── Layered filesystem (Union FS)
├── Built from Dockerfile instructions
├── Stored in registries (Docker Hub, ECR, etc.)
└── Versioned with tags

Docker Containers:
├── Running instances of images
├── Isolated processes with own filesystem
├── Share host kernel (not VM)
├── Ephemeral by default
└── Can be started, stopped, moved, deleted

Docker Registry:
├── Stores and distributes images
├── Docker Hub (public registry)
├── Private registries (ECR, GCR, Harbor)
├── Image versioning and tagging
└── Access control and security

Docker Networking:
├── Bridge networks (default)
├── Host networking
├── Overlay networks (multi-host)
├── Custom networks
└── Network isolation and security

Docker Storage:
├── Volumes (persistent data)
├── Bind mounts (host filesystem)
├── tmpfs mounts (memory)
├── Storage drivers
└── Data management</code></pre>
    </div>

    <h4>Container vs Virtual Machine</h4>
    <table>
      <thead>
        <tr>
          <th>Aspect</th>
          <th>Docker Container</th>
          <th>Virtual Machine</th>
          <th>Advantage</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Resource Usage</td>
          <td>Lightweight (MBs)</td>
          <td>Heavy (GBs)</td>
          <td>Container: 90% less overhead</td>
        </tr>
        <tr>
          <td>Startup Time</td>
          <td>Seconds</td>
          <td>Minutes</td>
          <td>Container: 10x faster startup</td>
        </tr>
        <tr>
          <td>Isolation</td>
          <td>Process-level</td>
          <td>Hardware-level</td>
          <td>VM: Better security isolation</td>
        </tr>
        <tr>
          <td>Portability</td>
          <td>High (same OS kernel)</td>
          <td>Medium (hypervisor required)</td>
          <td>Container: Better portability</td>
        </tr>
        <tr>
          <td>Density</td>
          <td>100s per host</td>
          <td>10s per host</td>
          <td>Container: Higher density</td>
        </tr>
      </tbody>
    </table>

    <h3>Docker Images and Dockerfile</h3>
    <p>Docker images are the foundation of containerization, built using Dockerfiles that define the application environment and dependencies.</p>

    <h4>Dockerfile Best Practices</h4>
    <div class="code-block">
      <pre><code>Optimized Dockerfile Example:

# Multi-stage build for Node.js application
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS production
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package*.json ./

# Security: Run as non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Start application
CMD ["node", "dist/index.js"]

Dockerfile Optimization Techniques:

1. Layer Caching Optimization:
# Bad: Changes in source code invalidate npm install
COPY . .
RUN npm install

# Good: Package files copied first
COPY package*.json ./
RUN npm install
COPY . .

2. Multi-stage Builds:
# Build stage
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm run build

# Production stage (smaller image)
FROM node:18-alpine
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/index.js"]

3. Minimize Layers:
# Bad: Multiple RUN commands
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get clean

# Good: Single RUN command
RUN apt-get update && \
    apt-get install -y curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

4. Use Specific Tags:
# Bad: Latest tag (unpredictable)
FROM node:latest

# Good: Specific version
FROM node:18.17.0-alpine

5. Security Best Practices:
# Create non-root user
RUN groupadd -r appuser && useradd -r -g appuser appuser
USER appuser

# Scan for vulnerabilities
RUN npm audit --audit-level=high

# Use minimal base images
FROM alpine:3.18
FROM scratch  # For static binaries

Common Dockerfile Instructions:
FROM: Base image
WORKDIR: Set working directory
COPY/ADD: Copy files to container
RUN: Execute commands during build
ENV: Set environment variables
EXPOSE: Document exposed ports
VOLUME: Create mount points
USER: Set user context
HEALTHCHECK: Define health check
CMD: Default command
ENTRYPOINT: Executable entry point
LABEL: Add metadata
ARG: Build-time variables
ONBUILD: Trigger instructions</code></pre>
    </div>

    <h4>Image Optimization Strategies</h4>
    <div class="code-block">
      <pre><code>Image Size Optimization:

1. Base Image Selection:
# Full OS (Ubuntu): ~200MB
FROM ubuntu:20.04

# Minimal OS (Alpine): ~5MB
FROM alpine:3.18

# Distroless (Google): ~20MB
FROM gcr.io/distroless/java:11

# Scratch (empty): ~0MB
FROM scratch

2. Layer Optimization:
# Combine commands to reduce layers
RUN apt-get update && \
    apt-get install -y python3 python3-pip && \
    pip3 install flask && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

3. .dockerignore File:
# Exclude unnecessary files
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
.DS_Store
*.log

4. Multi-stage Build Benefits:
# Before: Single stage (500MB)
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "start"]

# After: Multi-stage (150MB)
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
CMD ["node", "dist/index.js"]

Image Analysis Tools:
# Analyze image layers
docker history myapp:latest

# Check image size
docker images myapp:latest

# Dive tool for layer analysis
dive myapp:latest

# Docker Scout (vulnerability scanning)
docker scout cves myapp:latest</code></pre>
    </div>

    <details>
      <summary><strong>Example: Spotify's Docker Optimization</strong></summary>
      <div class="info-note">
        Spotify optimized their Docker images from 1.2GB to 180MB average size through multi-stage builds, Alpine Linux base images, and aggressive layer caching. Their containerized infrastructure serves 500+ million users with 4+ billion hours of music streaming monthly across 8,000+ microservices. Spotify's Docker optimization reduced deployment times by 60%, improved resource utilization by 35%, and enabled faster scaling during peak usage periods. The company processes 100+ deployments daily using optimized containers, maintains 99.95% uptime, and reduced infrastructure costs by 25% through efficient containerization practices.
      </div>
    </details>

    <h3>Docker Networking</h3>
    <p>Docker networking enables communication between containers, external services, and the host system with various network drivers and configurations.</p>

    <h4>Network Drivers and Types</h4>
    <div class="code-block">
      <pre><code>Docker Network Types:

1. Bridge Network (Default):
# Create custom bridge network
docker network create --driver bridge mynetwork

# Run container on custom network
docker run --network mynetwork nginx

# Network isolation between bridge networks
docker network create frontend
docker network create backend

# Connect container to multiple networks
docker network connect frontend web-container
docker network connect backend web-container

2. Host Network:
# Use host networking (no isolation)
docker run --network host nginx

# Benefits: Better performance, no port mapping
# Drawbacks: No network isolation, port conflicts

3. None Network:
# Disable networking
docker run --network none alpine

# Use case: Batch processing, security isolation

4. Overlay Network (Multi-host):
# Create overlay network for Docker Swarm
docker network create --driver overlay --attachable myoverlay

# Enables container communication across hosts
docker service create --network myoverlay nginx

5. Custom Network Drivers:
# Third-party drivers (Weave, Calico, Flannel)
docker network create --driver weave myweave

Container Communication:

1. Container-to-Container (Same Network):
# Containers can communicate by name
docker run --name web --network mynet nginx
docker run --name app --network mynet alpine ping web

2. Container-to-Host:
# Access host services from container
docker run --add-host=host.docker.internal:host-gateway alpine

3. Container-to-External:
# Outbound internet access (default)
docker run alpine ping google.com

4. External-to-Container:
# Port mapping for inbound access
docker run -p 8080:80 nginx

Network Configuration:
# Inspect network details
docker network inspect bridge

# List networks
docker network ls

# Remove unused networks
docker network prune

# Container network info
docker exec container_name ip addr show

Port Mapping Examples:
# Single port mapping
docker run -p 8080:80 nginx

# Multiple ports
docker run -p 8080:80 -p 8443:443 nginx

# Bind to specific interface
docker run -p 127.0.0.1:8080:80 nginx

# Random host port
docker run -P nginx

# UDP port mapping
docker run -p 53:53/udp dns-server</code></pre>
    </div>

    <h4>Network Security and Isolation</h4>
    <div class="code-block">
      <pre><code>Network Security Best Practices:

1. Network Segmentation:
# Create separate networks for different tiers
docker network create --driver bridge frontend
docker network create --driver bridge backend
docker network create --driver bridge database

# Web tier
docker run --network frontend nginx

# App tier (connected to both frontend and backend)
docker run --network backend app-server
docker network connect frontend app-server

# Database tier
docker run --network database postgres

2. Internal Communication:
# Use internal networks (no external access)
docker network create --internal backend-internal

# Containers can communicate internally but not externally
docker run --network backend-internal app-server

3. Firewall Rules:
# Docker automatically creates iptables rules
# Custom rules for additional security
iptables -I DOCKER-USER -p tcp --dport 8080 -j DROP

4. Network Policies:
# Use external tools for advanced policies
# Calico, Weave Net, Cilium for Kubernetes
# Docker Enterprise for advanced networking

5. Monitoring and Logging:
# Monitor network traffic
docker run --rm --net container:target nicolaka/netshoot

# Network troubleshooting
docker exec container_name netstat -tulpn
docker exec container_name ss -tulpn

DNS Configuration:
# Custom DNS servers
docker run --dns 8.8.8.8 --dns 8.8.4.4 alpine

# DNS search domains
docker run --dns-search example.com alpine

# Custom hostname
docker run --hostname myhost alpine

# Add hosts entries
docker run --add-host myhost:192.168.1.100 alpine</code></pre>
    </div>

    <h3>Docker Storage and Volumes</h3>
    <p>Docker storage management is crucial for persistent data, configuration files, and sharing data between containers.</p>

    <h4>Storage Types and Use Cases</h4>
    <table>
      <thead>
        <tr>
          <th>Storage Type</th>
          <th>Use Case</th>
          <th>Persistence</th>
          <th>Performance</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Volumes</td>
          <td>Database data, application state</td>
          <td>Persistent</td>
          <td>High</td>
        </tr>
        <tr>
          <td>Bind Mounts</td>
          <td>Development, configuration files</td>
          <td>Host-dependent</td>
          <td>High</td>
        </tr>
        <tr>
          <td>tmpfs Mounts</td>
          <td>Temporary data, secrets</td>
          <td>Non-persistent</td>
          <td>Highest</td>
        </tr>
        <tr>
          <td>Named Pipes</td>
          <td>Windows containers</td>
          <td>Session-based</td>
          <td>Medium</td>
        </tr>
      </tbody>
    </table>

    <h4>Volume Management</h4>
    <div class="code-block">
      <pre><code>Docker Volume Operations:

1. Named Volumes:
# Create named volume
docker volume create mydata

# Use volume in container
docker run -v mydata:/data postgres

# Inspect volume
docker volume inspect mydata

# List volumes
docker volume ls

# Remove volume
docker volume rm mydata

2. Anonymous Volumes:
# Created automatically
docker run -v /data postgres

# Removed when container is deleted (with --rm)
docker run --rm -v /data postgres

3. Bind Mounts:
# Mount host directory
docker run -v /host/path:/container/path nginx

# Mount current directory
docker run -v $(pwd):/app node

# Read-only mount
docker run -v /host/path:/container/path:ro nginx

4. tmpfs Mounts:
# Memory-based storage
docker run --tmpfs /tmp nginx

# With size limit
docker run --tmpfs /tmp:size=100m nginx

Volume Backup and Restore:
# Backup volume
docker run --rm -v mydata:/data -v $(pwd):/backup alpine tar czf /backup/backup.tar.gz -C /data .

# Restore volume
docker run --rm -v mydata:/data -v $(pwd):/backup alpine tar xzf /backup/backup.tar.gz -C /data

# Copy files from container
docker cp container_name:/path/to/file /host/path

# Copy files to container
docker cp /host/path container_name:/path/to/destination

Storage Drivers:
# Check storage driver
docker info | grep "Storage Driver"

# Common drivers:
# - overlay2 (default, recommended)
# - aufs (legacy)
# - devicemapper (Red Hat)
# - btrfs (advanced features)
# - zfs (advanced features)

Volume Plugins:
# Network storage plugins
docker plugin install store/sumologic/docker-logging-driver:1.0.0

# Cloud storage integration
# - AWS EBS
# - Google Persistent Disk
# - Azure Disk
# - NFS
# - GlusterFS</code></pre>
    </div>

    <h3>Docker Compose</h3>
    <p>Docker Compose simplifies multi-container application deployment using declarative YAML configuration files.</p>

    <h4>Complete Docker Compose Example</h4>
    <div class="code-block">
      <pre><code>docker-compose.yml (Full Stack Application):

version: '3.8'

services:
  # Frontend (React)
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://localhost:5000
    depends_on:
      - backend
    volumes:
      - ./frontend:/app
      - /app/node_modules
    networks:
      - frontend-network

  # Backend (Node.js API)
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@database:5432/mydb
      - REDIS_URL=redis://redis:6379
    depends_on:
      - database
      - redis
    volumes:
      - ./backend:/app
      - /app/node_modules
    networks:
      - frontend-network
      - backend-network
    restart: unless-stopped

  # Database (PostgreSQL)
  database:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=mydb
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./database/init.sql:/docker-entrypoint-initdb.d/init.sql
    networks:
      - backend-network
    restart: unless-stopped

  # Cache (Redis)
  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data
    networks:
      - backend-network
    restart: unless-stopped

  # Reverse Proxy (Nginx)
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./nginx/ssl:/etc/nginx/ssl
    depends_on:
      - frontend
      - backend
    networks:
      - frontend-network
    restart: unless-stopped

  # Monitoring (Prometheus)
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus/prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'
    networks:
      - monitoring-network

volumes:
  postgres_data:
  redis_data:
  prometheus_data:

networks:
  frontend-network:
    driver: bridge
  backend-network:
    driver: bridge
    internal: true
  monitoring-network:
    driver: bridge

Docker Compose Commands:
# Start all services
docker-compose up -d

# Start specific service
docker-compose up -d backend

# View logs
docker-compose logs -f backend

# Scale services
docker-compose up -d --scale backend=3

# Stop services
docker-compose down

# Remove volumes
docker-compose down -v

# Rebuild images
docker-compose build --no-cache

# Execute command in service
docker-compose exec backend bash

# Check service status
docker-compose ps

Environment Configuration:
# .env file
DATABASE_URL=postgresql://user:pass@localhost:5432/mydb
REDIS_URL=redis://localhost:6379
NODE_ENV=development

# Environment-specific overrides
# docker-compose.override.yml (development)
# docker-compose.prod.yml (production)

Production Deployment:
# Use production compose file
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Health checks
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s</code></pre>
    </div>

    <details>
      <summary><strong>Example: Airbnb's Docker Compose for Development</strong></summary>
      <div class="info-note">
        Airbnb uses Docker Compose to standardize development environments across 1,000+ engineers working on 4+ million property listings platform. Their compose configurations include 50+ microservices, databases, caching layers, and monitoring tools, enabling new developers to get fully functional environments running in under 30 minutes. The standardized approach reduced environment setup time by 80%, eliminated "works on my machine" issues, and improved developer productivity by 40%. Airbnb's Docker Compose setup handles complex service dependencies, provides consistent database seeding, and includes automated testing pipelines that run locally before deployment to production.
      </div>
    </details>

    <h3>Docker Security</h3>
    <p>Container security is critical for production deployments, requiring multiple layers of protection and security best practices.</p>

    <h4>Security Best Practices</h4>
    <div class="code-block">
      <pre><code>Docker Security Implementation:

1. Image Security:
# Use official base images
FROM node:18-alpine

# Scan for vulnerabilities
docker scan myapp:latest

# Use minimal base images
FROM gcr.io/distroless/node:18

# Keep images updated
docker pull node:18-alpine

2. User Security:
# Don't run as root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001 -G nodejs
USER nextjs

# Set user in docker-compose
services:
  app:
    user: "1001:1001"

3. Network Security:
# Use custom networks
docker network create --driver bridge secure-network

# Disable inter-container communication
docker network create --driver bridge --opt com.docker.network.bridge.enable_icc=false isolated

# Use internal networks
docker network create --internal backend-only

4. Resource Limits:
# CPU and memory limits
docker run --cpus="1.5" --memory="1g" myapp

# In docker-compose
services:
  app:
    deploy:
      resources:
        limits:
          cpus: '1.5'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M

5. Capability Management:
# Drop all capabilities, add only needed ones
docker run --cap-drop=ALL --cap-add=NET_BIND_SERVICE nginx

# Remove dangerous capabilities
docker run --cap-drop=SYS_ADMIN --cap-drop=SYS_PTRACE myapp

6. Read-only Filesystem:
# Make root filesystem read-only
docker run --read-only --tmpfs /tmp myapp

# In docker-compose
services:
  app:
    read_only: true
    tmpfs:
      - /tmp

7. Security Scanning:
# Docker Scout (built-in)
docker scout cves myapp:latest

# Trivy scanner
trivy image myapp:latest

# Clair scanner
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
  arminc/clair-scanner:latest --ip=host.docker.internal myapp:latest

8. Secrets Management:
# Docker secrets (Swarm mode)
echo "mysecret" | docker secret create db_password -

# Use secrets in service
docker service create --secret db_password myapp

# External secrets management
# - HashiCorp Vault
# - AWS Secrets Manager
# - Azure Key Vault
# - Kubernetes Secrets

Security Monitoring:
# Container runtime security
# - Falco (runtime security)
# - Twistlock/Prisma Cloud
# - Aqua Security
# - Sysdig Secure

# Security policies
# - Open Policy Agent (OPA)
# - Kubernetes Pod Security Standards
# - Docker Bench Security

Security Checklist:
✓ Use official, minimal base images
✓ Keep images updated
✓ Scan for vulnerabilities
✓ Run as non-root user
✓ Use read-only filesystems
✓ Limit container capabilities
✓ Implement resource limits
✓ Use secure networks
✓ Manage secrets properly
✓ Monitor runtime security
✓ Implement security policies
✓ Regular security audits</code></pre>
    </div>

    <h3>Container Orchestration</h3>
    <p>Container orchestration manages containerized applications at scale, providing automated deployment, scaling, and management.</p>

    <h4>Docker Swarm vs Kubernetes</h4>
    <table>
      <thead>
        <tr>
          <th>Feature</th>
          <th>Docker Swarm</th>
          <th>Kubernetes</th>
          <th>Best For</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Complexity</td>
          <td>Simple, easy to learn</td>
          <td>Complex, steep learning curve</td>
          <td>Swarm: Small teams, simple apps</td>
        </tr>
        <tr>
          <td>Scalability</td>
          <td>Good (1000s of nodes)</td>
          <td>Excellent (5000+ nodes)</td>
          <td>K8s: Large-scale deployments</td>
        </tr>
        <tr>
          <td>Ecosystem</td>
          <td>Limited</td>
          <td>Rich ecosystem</td>
          <td>K8s: Enterprise features</td>
        </tr>
        <tr>
          <td>Load Balancing</td>
          <td>Built-in</td>
          <td>Requires configuration</td>
          <td>Swarm: Out-of-box simplicity</td>
        </tr>
        <tr>
          <td>Rolling Updates</td>
          <td>Basic</td>
          <td>Advanced (canary, blue-green)</td>
          <td>K8s: Complex deployments</td>
        </tr>
      </tbody>
    </table>

    <h4>Docker Swarm Example</h4>
    <div class="code-block">
      <pre><code>Docker Swarm Configuration:

1. Initialize Swarm:
# Initialize swarm on manager node
docker swarm init --advertise-addr 192.168.1.100

# Join worker nodes
docker swarm join --token SWMTKN-1-xxx 192.168.1.100:2377

2. Deploy Stack:
# docker-compose.yml for swarm
version: '3.8'

services:
  web:
    image: nginx:alpine
    ports:
      - "80:80"
    deploy:
      replicas: 3
      placement:
        constraints:
          - node.role == worker
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
    networks:
      - webnet

  api:
    image: myapi:latest
    deploy:
      replicas: 5
      update_config:
        parallelism: 2
        delay: 10s
        failure_action: rollback
      placement:
        constraints:
          - node.labels.tier == backend
    networks:
      - webnet
      - backend

networks:
  webnet:
    driver: overlay
  backend:
    driver: overlay
    internal: true

# Deploy stack
docker stack deploy -c docker-compose.yml myapp

3. Service Management:
# List services
docker service ls

# Scale service
docker service scale myapp_web=5

# Update service
docker service update --image nginx:1.21 myapp_web

# Service logs
docker service logs myapp_web

# Service inspection
docker service inspect myapp_web

4. Node Management:
# List nodes
docker node ls

# Add labels to nodes
docker node update --label-add tier=backend worker1

# Drain node (maintenance)
docker node update --availability drain worker1

# Remove node
docker node rm worker1

5. Secrets and Configs:
# Create secret
echo "mysecret" | docker secret create db_password -

# Create config
docker config create nginx_config nginx.conf

# Use in service
docker service create \
  --secret db_password \
  --config source=nginx_config,target=/etc/nginx/nginx.conf \
  myapp</code></pre>
    </div>

    <details>
      <summary><strong>Example: Docker's Production Infrastructure</strong></summary>
      <div class="info-note">
        Docker Inc. runs their own production infrastructure using Docker containers and Swarm mode, serving Docker Hub with 100+ billion container image pulls annually. Their containerized infrastructure handles 10+ million developers, processes 2+ million image pushes daily, and maintains 99.9% uptime for container registry services. Docker's production deployment includes 500+ services across multiple regions, automated scaling based on demand, and sophisticated monitoring using containerized observability tools. The infrastructure demonstrates Docker's capability at massive scale, processing 13+ million concurrent connections during peak usage and maintaining sub-second response times for container operations globally.
      </div>
    </details>

    <h3>Docker Performance and Monitoring</h3>
    <p>Monitoring containerized applications requires specialized tools and techniques to track resource usage, performance metrics, and application health.</p>

    <h4>Performance Monitoring</h4>
    <div class="code-block">
      <pre><code>Container Performance Monitoring:

1. Built-in Docker Stats:
# Real-time container stats
docker stats

# Specific container stats
docker stats container_name

# Stats in JSON format
docker stats --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}"

2. Resource Usage Analysis:
# Container resource limits
docker run --cpus="1.5" --memory="1g" --memory-swap="2g" myapp

# Monitor resource usage
docker exec container_name cat /sys/fs/cgroup/memory/memory.usage_in_bytes

# System-wide container resource usage
docker system df
docker system events

3. Performance Metrics Collection:
# cAdvisor (Google)
docker run \
  --volume=/:/rootfs:ro \
  --volume=/var/run:/var/run:ro \
  --volume=/sys:/sys:ro \
  --volume=/var/lib/docker/:/var/lib/docker:ro \
  --publish=8080:8080 \
  --detach=true \
  --name=cadvisor \
  google/cadvisor:latest

# Prometheus monitoring
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'cadvisor'
    static_configs:
      - targets: ['cadvisor:8080']

4. Application Performance Monitoring:
# Health checks
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Custom metrics endpoint
docker run -p 9090:9090 myapp-with-metrics

# Distributed tracing
# - Jaeger
# - Zipkin
# - OpenTelemetry

5. Log Management:
# Container logs
docker logs container_name
docker logs -f --tail 100 container_name

# Centralized logging
# - ELK Stack (Elasticsearch, Logstash, Kibana)
# - Fluentd
# - Splunk
# - AWS CloudWatch

# Log drivers
docker run --log-driver=json-file --log-opt max-size=10m --log-opt max-file=3 myapp

6. Performance Optimization:
# Optimize image layers
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM node:18-alpine
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/index.js"]

# Resource allocation
docker run --cpus="2" --memory="4g" --memory-swap="4g" myapp

# Use multi-stage builds
# Optimize Dockerfile instructions
# Use .dockerignore
# Choose appropriate base images

Monitoring Stack Example:
version: '3.8'

services:
  # Application
  app:
    image: myapp:latest
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Metrics collection
  cadvisor:
    image: google/cadvisor:latest
    ports:
      - "8080:8080"
    volumes:
      - /:/rootfs:ro
      - /var/run:/var/run:ro
      - /sys:/sys:ro
      - /var/lib/docker/:/var/lib/docker:ro

  # Metrics storage
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml

  # Metrics visualization
  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin

  # Log aggregation
  elasticsearch:
    image: elasticsearch:7.14.0
    environment:
      - discovery.type=single-node

  # Log processing
  logstash:
    image: logstash:7.14.0
    volumes:
      - ./logstash.conf:/usr/share/logstash/pipeline/logstash.conf

  # Log visualization
  kibana:
    image: kibana:7.14.0
    ports:
      - "5601:5601"</code></pre>
    </div>

    <h3>Conclusion</h3>
    <p>Docker revolutionized application deployment by providing lightweight, portable containerization that enables consistent environments across development, testing, and production. Understanding Docker's architecture, security, orchestration, and monitoring is essential for modern software development and DevOps practices.</p>

    <p><strong>Key Docker Principles:</strong></p>
    <ul>
      <li><strong>Containerization:</strong> Package applications with dependencies for portability</li>
      <li><strong>Immutable Infrastructure:</strong> Build once, run anywhere with consistent environments</li>
      <li><strong>Microservices:</strong> Enable service-oriented architectures and independent scaling</li>
      <li><strong>DevOps Integration:</strong> Streamline CI/CD pipelines and deployment processes</li>
      <li><strong>Resource Efficiency:</strong> Optimize resource utilization compared to virtual machines</li>
      <li><strong>Security:</strong> Implement container security best practices and monitoring</li>
      <li><strong>Orchestration:</strong> Manage containerized applications at scale</li>
    </ul>

    <p>As containerization continues to evolve, Docker remains fundamental to modern application architecture, enabling cloud-native development, microservices patterns, and efficient resource utilization across diverse computing environments.</p>

    <h3>References</h3>
    <ul>
      <li><a href="https://docs.docker.com/" target="_blank">Docker Official Documentation</a></li>
      <li><a href="https://docs.docker.com/compose/" target="_blank">Docker Compose Documentation</a></li>
      <li><a href="https://docs.docker.com/engine/swarm/" target="_blank">Docker Swarm Documentation</a></li>
      <li><a href="https://docs.docker.com/engine/security/" target="_blank">Docker Security Documentation</a></li>
      <li><a href="https://kubernetes.io/docs/" target="_blank">Kubernetes Documentation</a></li>
      <li><a href="https://12factor.net/" target="_blank">The Twelve-Factor App</a></li>
    </ul>
  `
}; 