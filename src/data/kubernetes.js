export const kubernetes = {
  id: 'kubernetes',
  title: 'Kubernetes',
  content: `
<h2>Definition</h2>
<p>Kubernetes is an open-source container orchestration platform that automates deployment, scaling, and management of containerized applications.</p>

<h2>Core Components</h2>
<ul>
  <li><strong>Master Node</strong>: Control plane components</li>
  <li><strong>Worker Nodes</strong>: Run application workloads</li>
  <li><strong>etcd</strong>: Distributed key-value store</li>
  <li><strong>API Server</strong>: Central management component</li>
  <li><strong>Scheduler</strong>: Assigns pods to nodes</li>
  <li><strong>Controller Manager</strong>: Maintains desired state</li>
</ul>

<h2>Key Objects</h2>
<ul>
  <li><strong>Pod</strong>: Smallest deployable unit</li>
  <li><strong>Service</strong>: Network abstraction for pods</li>
  <li><strong>Deployment</strong>: Manages replica sets</li>
  <li><strong>ConfigMap</strong>: Configuration data</li>
  <li><strong>Secret</strong>: Sensitive data storage</li>
  <li><strong>Namespace</strong>: Virtual clusters</li>
</ul>

<h2>Pod Lifecycle</h2>
<ol>
  <li><strong>Pending</strong>: Scheduled but not running</li>
  <li><strong>Running</strong>: Bound to node and running</li>
  <li><strong>Succeeded</strong>: All containers terminated successfully</li>
  <li><strong>Failed</strong>: At least one container failed</li>
  <li><strong>Unknown</strong>: State cannot be determined</li>
</ol>

<h2>Services Types</h2>
<ul>
  <li><strong>ClusterIP</strong>: Internal cluster communication</li>
  <li><strong>NodePort</strong>: Expose on each node's IP</li>
  <li><strong>LoadBalancer</strong>: External load balancer</li>
  <li><strong>ExternalName</strong>: DNS CNAME record</li>
</ul>

<h2>Scaling</h2>
<ul>
  <li><strong>Horizontal Pod Autoscaler</strong>: Scale pods based on metrics</li>
  <li><strong>Vertical Pod Autoscaler</strong>: Adjust resource requests</li>
  <li><strong>Cluster Autoscaler</strong>: Scale cluster nodes</li>
</ul>

<h2>Storage</h2>
<ul>
  <li><strong>Persistent Volumes</strong>: Cluster-wide storage</li>
  <li><strong>Persistent Volume Claims</strong>: Storage requests</li>
  <li><strong>Storage Classes</strong>: Dynamic provisioning</li>
</ul>

<h2>Interview Questions</h2>
<div class="interview-qa">
  <h3>Q: What is the difference between a Pod and a Container?</h3>
  <p><strong>A:</strong> A Pod is the smallest deployable unit in Kubernetes that can contain one or more containers that share storage and network.</p>
</div>
`
}; 