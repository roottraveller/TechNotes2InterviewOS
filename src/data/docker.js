export const docker = {
  id: 'docker',
  title: 'Docker',
  content: `
## Definition
Docker is a platform that uses containerization technology to package applications and their dependencies into portable containers.

## Core Components
- **Docker Engine**: Runtime for containers
- **Docker Images**: Lightweight, standalone packages
- **Docker Containers**: Running instances of images
- **Docker Hub**: Cloud-based registry
- **Dockerfile**: Text file with build instructions

## Basic Commands
\`\`\`bash
docker build -t myapp .          # Build image
docker run -p 3000:3000 myapp    # Run container
docker ps                        # List running containers
docker images                    # List images
docker stop container_id         # Stop container
docker rm container_id           # Remove container
\`\`\`

## Dockerfile Instructions
- **FROM**: Base image
- **WORKDIR**: Working directory
- **COPY/ADD**: Copy files
- **RUN**: Execute commands
- **EXPOSE**: Expose ports
- **CMD/ENTRYPOINT**: Default command

## Docker Networking
- **Bridge**: Default network driver
- **Host**: Use host networking
- **None**: Disable networking
- **Custom Networks**: User-defined networks

## Volumes and Storage
- **Bind Mounts**: Host filesystem paths
- **Volumes**: Docker-managed storage
- **tmpfs**: Temporary filesystem in memory

## Multi-stage Builds
Optimize image size by using multiple FROM statements

## Docker Compose
Orchestrate multi-container applications with YAML configuration

## Interview Questions
**Q: Explain the difference between COPY and ADD in Dockerfile.**
A: COPY simply copies files, while ADD can also extract archives and download from URLs.
`
}; 