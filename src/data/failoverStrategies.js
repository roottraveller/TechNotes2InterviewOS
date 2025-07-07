export const failoverStrategies = {
  id: 'failover-strategies',
  title: 'Failover Strategies',
  content: `
    <h2>Failover Strategies</h2>
    <p>Failover is the process of switching to a redundant or standby system, server, or network upon the failure or abnormal termination of the currently active system. It's a critical component of high availability and disaster recovery planning.</p>

    <h3>Types of Failover</h3>
    
    <h4>1. Cold Failover (Manual Failover)</h4>
    <p>Requires manual intervention to switch to the backup system.</p>
    
    <ul>
      <li><strong>Process:</strong> Manual detection and switching</li>
      <li><strong>RTO:</strong> Hours to days</li>
      <li><strong>RPO:</strong> Depends on backup frequency</li>
      <li><strong>Cost:</strong> Lowest</li>
      <li><strong>Complexity:</strong> Simplest</li>
    </ul>

    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Cold Failover Process
1. System failure detected by monitoring
2. Alert sent to operations team
3. Team assesses the situation
4. Decision made to failover
5. Backup system manually started
6. DNS records updated
7. Traffic redirected
8. Verification and testing

// Time elapsed: 2-4 hours typically</code></pre>
    </div>

    <h4>2. Warm Failover (Standby)</h4>
    <p>Backup systems are running but not actively serving traffic.</p>
    
    <ul>
      <li><strong>Process:</strong> Semi-automatic switching</li>
      <li><strong>RTO:</strong> Minutes to hours</li>
      <li><strong>RPO:</strong> Minutes to hours</li>
      <li><strong>Cost:</strong> Moderate</li>
      <li><strong>Complexity:</strong> Moderate</li>
    </ul>

    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Warm Failover Configuration
{
  "primary_site": {
    "status": "active",
    "servers": ["web1", "web2", "db1"],
    "load": "100%"
  },
  "standby_site": {
    "status": "standby",
    "servers": ["web3", "db2"],
    "load": "0%",
    "sync_interval": "5 minutes",
    "health_check": "every 30 seconds"
  },
  "failover_trigger": {
    "type": "semi-automatic",
    "conditions": [
      "primary_site_down > 5 minutes",
      "manual_approval_required"
    ]
  }
}</code></pre>
    </div>

    <h4>3. Hot Failover (Active-Passive)</h4>
    <p>Backup systems are fully synchronized and ready to take over immediately.</p>
    
    <ul>
      <li><strong>Process:</strong> Automatic switching</li>
      <li><strong>RTO:</strong> Seconds to minutes</li>
      <li><strong>RPO:</strong> Near zero</li>
      <li><strong>Cost:</strong> High</li>
      <li><strong>Complexity:</strong> High</li>
    </ul>

    <h4>4. Active-Active (No Failover Needed)</h4>
    <p>All systems actively serve traffic; failure of one doesn't require failover.</p>
    
    <ul>
      <li><strong>Process:</strong> Automatic load redistribution</li>
      <li><strong>RTO:</strong> Zero (no downtime)</li>
      <li><strong>RPO:</strong> Zero</li>
      <li><strong>Cost:</strong> Highest</li>
      <li><strong>Complexity:</strong> Highest</li>
    </ul>

    <h3>Failover Components</h3>
    
    <h4>1. Health Monitoring</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Health Check Implementation
class HealthMonitor {
  constructor(config) {
    this.targets = config.targets;
    this.interval = config.interval;
    this.timeout = config.timeout;
    this.threshold = config.failureThreshold;
  }

  async checkHealth(target) {
    const checks = {
      ping: await this.pingCheck(target),
      http: await this.httpCheck(target),
      database: await this.dbCheck(target),
      custom: await this.customCheck(target)
    };
    
    return {
      healthy: Object.values(checks).every(c => c),
      checks: checks,
      timestamp: new Date()
    };
  }

  async pingCheck(target) {
    try {
      const response = await ping(target.ip);
      return response.time < this.timeout;
    } catch (error) {
      return false;
    }
  }

  async httpCheck(target) {
    try {
      const response = await fetch(target.healthEndpoint);
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }
}</code></pre>
    </div>

    <h4>2. Failure Detection</h4>
    <ul>
      <li><strong>Heartbeat:</strong> Regular "I'm alive" signals</li>
      <li><strong>Health Checks:</strong> Active probing</li>
      <li><strong>Resource Monitoring:</strong> CPU, memory, disk</li>
      <li><strong>Application Metrics:</strong> Response time, errors</li>
      <li><strong>Network Connectivity:</strong> Ping, traceroute</li>
    </ul>

    <h4>3. Decision Making</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Failover Decision Logic
class FailoverDecisionEngine {
  evaluateFailover(healthData) {
    const decision = {
      shouldFailover: false,
      reason: null,
      confidence: 0
    };

    // Check multiple failure conditions
    if (healthData.consecutiveFailures >= 3) {
      decision.shouldFailover = true;
      decision.reason = "Multiple consecutive failures";
      decision.confidence = 0.9;
    }

    if (healthData.responseTime > 5000) {
      decision.shouldFailover = true;
      decision.reason = "Response time exceeded threshold";
      decision.confidence = 0.7;
    }

    if (healthData.errorRate > 0.5) {
      decision.shouldFailover = true;
      decision.reason = "High error rate";
      decision.confidence = 0.8;
    }

    // Prevent flapping
    if (this.recentFailovers() > 2) {
      decision.shouldFailover = false;
      decision.reason = "Too many recent failovers";
    }

    return decision;
  }
}</code></pre>
    </div>

    <h4>4. Traffic Switching</h4>
    <ul>
      <li><strong>DNS Failover:</strong> Update DNS records</li>
      <li><strong>Load Balancer:</strong> Redirect traffic</li>
      <li><strong>IP Failover:</strong> Virtual IP migration</li>
      <li><strong>Application Level:</strong> Client-side failover</li>
    </ul>

    <h3>Failover Patterns</h3>
    
    <h4>1. Master-Slave Replication</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Master-Slave Failover
┌─────────────┐     Replication    ┌─────────────┐
│   Master    │ ─────────────────> │    Slave    │
│  (Active)   │                    │  (Standby)  │
└─────────────┘                    └─────────────┘
       │                                   │
       │ Failure                          │
       ▼                                   ▼
┌─────────────┐                    ┌─────────────┐
│   Master    │                    │    Slave    │
│   (Down)    │                    │  (Promoted) │
└─────────────┘                    └─────────────┘

// Configuration
{
  "replication": {
    "mode": "asynchronous",
    "lag_threshold": "5 seconds",
    "auto_failover": true,
    "promotion_script": "/scripts/promote_slave.sh"
  }
}</code></pre>
    </div>

    <h4>2. Multi-Master Replication</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Multi-Master Setup
┌─────────────┐ <──────────> ┌─────────────┐
│  Master 1   │              │  Master 2   │
│  (Active)   │              │  (Active)   │
└─────────────┘              └─────────────┘
       │                            │
       └──────────┬─────────────────┘
                  │
            Load Balancer
                  │
              Clients

// No failover needed - automatic rerouting</code></pre>
    </div>

    <h4>3. Cascading Failover</h4>
    <p>Multiple backup systems in priority order.</p>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Cascading Failover Priority
{
  "failover_chain": [
    {
      "priority": 1,
      "site": "primary_datacenter",
      "status": "active"
    },
    {
      "priority": 2,
      "site": "secondary_datacenter",
      "status": "standby"
    },
    {
      "priority": 3,
      "site": "cloud_backup",
      "status": "cold"
    },
    {
      "priority": 4,
      "site": "disaster_recovery",
      "status": "cold"
    }
  ]
}</code></pre>
    </div>

    <h3>Implementation Strategies</h3>
    
    <h4>1. Database Failover</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// PostgreSQL Automatic Failover
-- Primary server configuration
primary_conninfo = 'host=primary port=5432 user=replicator'
restore_command = 'cp /archive/%f %p'
recovery_target_timeline = 'latest'

-- Standby server configuration
standby_mode = on
primary_conninfo = 'host=primary port=5432 user=replicator'
trigger_file = '/tmp/postgresql.trigger'

-- Failover script
#!/bin/bash
# Check primary health
if ! pg_isready -h primary; then
  # Promote standby
  touch /tmp/postgresql.trigger
  
  # Update application configuration
  sed -i 's/primary/standby/g' /app/config/database.yml
  
  # Notify monitoring system
  curl -X POST monitoring.example.com/api/failover
fi</code></pre>
    </div>

    <h4>2. Application-Level Failover</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Circuit Breaker Pattern for Failover
class ServiceClient {
  constructor() {
    this.primary = 'https://api.primary.com';
    this.secondary = 'https://api.secondary.com';
    this.circuitBreaker = new CircuitBreaker({
      timeout: 3000,
      errorThreshold: 50,
      resetTimeout: 30000
    });
  }

  async makeRequest(endpoint, data) {
    try {
      // Try primary first
      return await this.circuitBreaker.fire(
        () => this.request(this.primary + endpoint, data)
      );
    } catch (error) {
      console.log('Primary failed, trying secondary');
      
      // Failover to secondary
      return await this.request(this.secondary + endpoint, data);
    }
  }

  async request(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      timeout: 3000
    });
    
    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}\`);
    }
    
    return response.json();
  }
}</code></pre>
    </div>

    <h4>3. DNS-Based Failover</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Route53 Health Check and Failover
{
  "HealthCheck": {
    "Type": "HTTPS",
    "ResourcePath": "/health",
    "FullyQualifiedDomainName": "primary.example.com",
    "Port": 443,
    "RequestInterval": 30,
    "FailureThreshold": 3
  },
  "RecordSets": [
    {
      "Name": "api.example.com",
      "Type": "A",
      "SetIdentifier": "Primary",
      "Failover": "PRIMARY",
      "HealthCheckId": "health-check-primary",
      "Value": "192.168.1.1"
    },
    {
      "Name": "api.example.com",
      "Type": "A",
      "SetIdentifier": "Secondary",
      "Failover": "SECONDARY",
      "Value": "192.168.2.1"
    }
  ]
}</code></pre>
    </div>

    <h3>Testing Failover</h3>
    
    <h4>1. Planned Failover Tests</h4>
    <ul>
      <li><strong>Scheduled Maintenance:</strong> Test during low traffic</li>
      <li><strong>Gradual Failover:</strong> Move traffic incrementally</li>
      <li><strong>Rollback Plan:</strong> Quick recovery if issues</li>
      <li><strong>Documentation:</strong> Record all steps</li>
    </ul>

    <h4>2. Chaos Engineering</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Chaos Monkey Configuration
{
  "chaos_experiments": [
    {
      "name": "random_instance_termination",
      "probability": 0.1,
      "schedule": "business_hours",
      "targets": ["web_tier", "app_tier"]
    },
    {
      "name": "network_latency",
      "latency_ms": 1000,
      "probability": 0.2,
      "duration": "5m"
    },
    {
      "name": "database_connection_failure",
      "probability": 0.05,
      "duration": "30s"
    }
  ]
}</code></pre>
    </div>

    <h3>Monitoring and Alerting</h3>
    
    <h4>Key Metrics</h4>
    <ul>
      <li><strong>Failover Time:</strong> Time to complete switch</li>
      <li><strong>Data Loss:</strong> Transactions lost during failover</li>
      <li><strong>False Positives:</strong> Unnecessary failovers</li>
      <li><strong>Success Rate:</strong> Successful vs failed failovers</li>
      <li><strong>Recovery Time:</strong> Time to restore primary</li>
    </ul>

    <h4>Alert Configuration</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Alerting Rules
alerts:
  - name: FailoverInitiated
    condition: failover_started == 1
    severity: warning
    notify:
      - ops_team
      - on_call_engineer
    
  - name: FailoverFailed
    condition: failover_success == 0
    severity: critical
    notify:
      - all_engineers
      - management
    escalation:
      after: 5m
      to: cto

  - name: DataLossDuringFailover
    condition: lost_transactions > 0
    severity: high
    notify:
      - database_team
      - ops_team</code></pre>
    </div>

    <h3>Best Practices</h3>
    
    <h4>1. Design Principles</h4>
    <ul>
      <li><strong>Simplicity:</strong> Complex failover = more failure points</li>
      <li><strong>Automation:</strong> Minimize human intervention</li>
      <li><strong>Testing:</strong> Regular failover drills</li>
      <li><strong>Documentation:</strong> Clear runbooks</li>
      <li><strong>Monitoring:</strong> Comprehensive visibility</li>
    </ul>

    <h4>2. Common Pitfalls</h4>
    <ul>
      <li><strong>Split Brain:</strong> Both systems think they're primary</li>
      <li><strong>Cascading Failures:</strong> Failover causes more failures</li>
      <li><strong>Data Inconsistency:</strong> Replication lag issues</li>
      <li><strong>Flapping:</strong> Repeated failover/failback</li>
      <li><strong>Resource Exhaustion:</strong> Backup can't handle load</li>
    </ul>

    <h4>3. Recovery Procedures</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Post-Failover Recovery Checklist
1. Verify backup system stability
2. Assess data consistency
3. Check for data loss
4. Update monitoring dashboards
5. Notify stakeholders
6. Begin root cause analysis
7. Plan primary restoration
8. Schedule post-mortem
9. Update documentation
10. Test failback procedure</code></pre>
    </div>

    <h3>Cost Considerations</h3>
    
    <table>
      <thead>
        <tr>
          <th>Strategy</th>
          <th>Infrastructure Cost</th>
          <th>Operational Cost</th>
          <th>Data Loss Risk</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Cold Failover</td>
          <td>Low</td>
          <td>Low</td>
          <td>High</td>
        </tr>
        <tr>
          <td>Warm Failover</td>
          <td>Medium</td>
          <td>Medium</td>
          <td>Medium</td>
        </tr>
        <tr>
          <td>Hot Failover</td>
          <td>High</td>
          <td>High</td>
          <td>Low</td>
        </tr>
        <tr>
          <td>Active-Active</td>
          <td>Highest</td>
          <td>Highest</td>
          <td>Lowest</td>
        </tr>
      </tbody>
    </table>
  `
}; 