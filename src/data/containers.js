export const containers = {
  id: 'containers',
  title: 'Containers',
  content: `
## Definition
Containers are lightweight, portable units that package applications and their dependencies together for consistent deployment across environments.

## Key Concepts
- **Image**: Read-only template for creating containers
- **Container**: Running instance of an image
- **Registry**: Repository for storing images
- **Dockerfile**: Instructions for building images
- **Orchestration**: Managing multiple containers

## Benefits
- **Portability**: Run anywhere containers are supported
- **Consistency**: Same environment across dev/test/prod
- **Efficiency**: Lightweight compared to VMs
- **Scalability**: Quick startup and shutdown
- **Isolation**: Process and resource isolation

## Container vs Virtual Machines
- **Resource Usage**: Containers share OS kernel
- **Startup Time**: Containers start faster
- **Isolation**: VMs provide stronger isolation
- **Overhead**: Containers have less overhead

## Docker Basics
\`\`\`dockerfile
FROM node:14
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

## Container Orchestration
- **Docker Compose**: Multi-container applications
- **Kubernetes**: Production-grade orchestration
- **Docker Swarm**: Docker's native orchestration

## Best Practices
- Use official base images
- Minimize image layers
- Don't run as root
- Use .dockerignore
- Keep containers stateless

## Interview Questions
**Q: What are the advantages of containers over virtual machines?**
A: Containers are more lightweight, start faster, and provide better resource utilization while maintaining application isolation.
`
}; 