export const kubernetes = {
  id: 'kubernetes',
  title: 'Kubernetes',
  content: `# Kubernetes

## Definition
Kubernetes is an open-source container orchestration platform that automates deployment, scaling, and management of containerized applications.

## Core Components
- **Master Node**: Control plane components
- **Worker Nodes**: Run application workloads
- **etcd**: Distributed key-value store
- **API Server**: Central management component
- **Scheduler**: Assigns pods to nodes
- **Controller Manager**: Maintains desired state

## Key Objects
- **Pod**: Smallest deployable unit
- **Service**: Network abstraction for pods
- **Deployment**: Manages replica sets
- **ConfigMap**: Configuration data
- **Secret**: Sensitive data storage
- **Namespace**: Virtual clusters

## Pod Lifecycle
1. Pending: Scheduled but not running
2. Running: Bound to node and running
3. Succeeded: All containers terminated successfully
4. Failed: At least one container failed
5. Unknown: State cannot be determined

## Services Types
- **ClusterIP**: Internal cluster communication
- **NodePort**: Expose on each node's IP
- **LoadBalancer**: External load balancer
- **ExternalName**: DNS CNAME record

## Scaling
- **Horizontal Pod Autoscaler**: Scale pods based on metrics
- **Vertical Pod Autoscaler**: Adjust resource requests
- **Cluster Autoscaler**: Scale cluster nodes

## Storage
- **Persistent Volumes**: Cluster-wide storage
- **Persistent Volume Claims**: Storage requests
- **Storage Classes**: Dynamic provisioning

## Interview Questions
**Q: What is the difference between a Pod and a Container?**
A: A Pod is the smallest deployable unit in Kubernetes that can contain one or more containers that share storage and network.`
}; 