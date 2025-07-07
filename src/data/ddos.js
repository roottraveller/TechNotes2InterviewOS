export const ddos = {
  id: 'distributed-denial-of-service',
  title: 'Distributed Denial of Service (DDoS)',
  content: `
    <h2>Distributed Denial of Service (DDoS)</h2>
    <p>In a DDoS attack, multiple compromised computers or devices, often referred to as "bots" or "zombies," are used to generate or amplify the attack traffic, overwhelming the target's resources such as bandwidth, CPU, memory, or network connections.</p>

    <h3>How DDoS Attacks Work</h3>
    
    <h4>Attack Infrastructure</h4>
    <ul>
      <li><strong>Botnet:</strong> Network of compromised computers (bots/zombies)</li>
      <li><strong>Command & Control (C&C):</strong> Central server controlling the botnet</li>
      <li><strong>Attack Traffic:</strong> Coordinated flood of requests from multiple sources</li>
      <li><strong>Target:</strong> The victim's servers, network, or infrastructure</li>
    </ul>

    <h3>Types of DDoS Attacks</h3>
    
    <h4>1. Volume-Based Attacks</h4>
    <ul>
      <li><strong>UDP Flood:</strong> Overwhelming with UDP packets</li>
      <li><strong>ICMP Flood:</strong> Ping flood attacks</li>
      <li><strong>Amplification Attacks:</strong> DNS, NTP amplification</li>
      <li><strong>Goal:</strong> Saturate the bandwidth</li>
    </ul>

    <h4>2. Protocol Attacks</h4>
    <ul>
      <li><strong>SYN Flood:</strong> Exploiting TCP handshake</li>
      <li><strong>Ping of Death:</strong> Malformed packets</li>
      <li><strong>Smurf Attack:</strong> ICMP amplification</li>
      <li><strong>Goal:</strong> Consume server resources</li>
    </ul>

    <h4>3. Application Layer Attacks</h4>
    <ul>
      <li><strong>HTTP Flood:</strong> Overwhelming web servers</li>
      <li><strong>Slowloris:</strong> Keeping connections open</li>
      <li><strong>DNS Query Flood:</strong> Overwhelming DNS servers</li>
      <li><strong>Goal:</strong> Crash web applications</li>
    </ul>

    <h3>Attack Vectors and Techniques</h3>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code># Example: SYN Flood Attack Pattern
# Attacker sends SYN packets without completing handshake

Normal TCP Handshake:
Client → Server: SYN
Server → Client: SYN-ACK
Client → Server: ACK
[Connection Established]

SYN Flood Attack:
Attacker → Server: SYN (fake source IP)
Server → Fake IP: SYN-ACK (never received)
Server: Waits for ACK (timeout)
[Server resources consumed]

# Thousands of half-open connections exhaust server</code></pre>
    </div>

    <h3>Defense and Mitigation Techniques</h3>
    <p>To defend against DDoS attacks, organizations often use various mitigation techniques:</p>
    
    <h4>1. Traffic Filtering</h4>
    <ul>
      <li><strong>Blackhole Routing:</strong> Drop all traffic to attacked IP</li>
      <li><strong>IP Filtering:</strong> Block known malicious IPs</li>
      <li><strong>Geo-blocking:</strong> Block traffic from specific regions</li>
      <li><strong>Pattern Recognition:</strong> Identify and block attack patterns</li>
    </ul>

    <h4>2. Rate Limiting</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code># Example: Rate Limiting Implementation
class RateLimiter:
    def __init__(self, max_requests=100, window=60):
        self.max_requests = max_requests
        self.window = window  # seconds
        self.requests = defaultdict(list)
    
    def is_allowed(self, client_ip):
        now = time.time()
        # Clean old requests
        self.requests[client_ip] = [
            req_time for req_time in self.requests[client_ip]
            if now - req_time < self.window
        ]
        
        # Check rate limit
        if len(self.requests[client_ip]) >= self.max_requests:
            return False
            
        self.requests[client_ip].append(now)
        return True</code></pre>
    </div>

    <h4>3. IP Whitelisting</h4>
    <ul>
      <li>Allow only known good IP addresses</li>
      <li>Useful for critical services with known users</li>
      <li>Not practical for public-facing services</li>
    </ul>

    <h4>4. Blackholing</h4>
    <ul>
      <li>Route attack traffic to null route</li>
      <li>Drops both legitimate and malicious traffic</li>
      <li>Last resort when service is completely overwhelmed</li>
    </ul>

    <h4>5. DDoS Protection Services</h4>
    <ul>
      <li><strong>CDN-based Protection:</strong> Cloudflare, Akamai</li>
      <li><strong>Scrubbing Centers:</strong> Clean traffic before forwarding</li>
      <li><strong>Cloud-based Protection:</strong> AWS Shield, Azure DDoS Protection</li>
      <li><strong>On-premise Appliances:</strong> Hardware-based solutions</li>
    </ul>

    <h3>Detection Strategies</h3>
    
    <h4>Traffic Analysis</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code># DDoS Detection Metrics
def detect_ddos_patterns(traffic_data):
    indicators = {
        'request_rate': calculate_requests_per_second(traffic_data),
        'unique_ips': count_unique_source_ips(traffic_data),
        'packet_size': average_packet_size(traffic_data),
        'syn_fin_ratio': calculate_syn_fin_ratio(traffic_data),
        'geographic_distribution': analyze_geo_distribution(traffic_data)
    }
    
    # Detection rules
    if indicators['request_rate'] > THRESHOLD_RPS:
        return "Possible volumetric attack"
    
    if indicators['syn_fin_ratio'] > 3:
        return "Possible SYN flood attack"
    
    if indicators['unique_ips'] < 100 and indicators['request_rate'] > 1000:
        return "Possible amplification attack"
    
    return "Normal traffic"</code></pre>
    </div>

    <h3>Best Practices for DDoS Protection</h3>
    
    <h4>Preparation</h4>
    <ul>
      <li><strong>Capacity Planning:</strong> Over-provision bandwidth and server resources</li>
      <li><strong>DDoS Response Plan:</strong> Document procedures and contacts</li>
      <li><strong>Regular Testing:</strong> Simulate attacks to test defenses</li>
      <li><strong>Baseline Monitoring:</strong> Know your normal traffic patterns</li>
    </ul>

    <h4>Architecture</h4>
    <ul>
      <li><strong>Distributed Infrastructure:</strong> Multiple data centers and regions</li>
      <li><strong>Anycast Routing:</strong> Distribute traffic across multiple servers</li>
      <li><strong>Load Balancing:</strong> Distribute load across servers</li>
      <li><strong>Caching:</strong> Reduce load on origin servers</li>
    </ul>

    <h4>Response</h4>
    <ul>
      <li><strong>Early Detection:</strong> Monitor traffic anomalies</li>
      <li><strong>Incremental Response:</strong> Start with least disruptive measures</li>
      <li><strong>Communication:</strong> Keep stakeholders informed</li>
      <li><strong>Post-Attack Analysis:</strong> Learn and improve defenses</li>
    </ul>

    <h3>Real-World Examples</h3>
    
    <h4>Notable DDoS Attacks</h4>
    <ul>
      <li><strong>2016 Dyn Attack:</strong> 1.2 Tbps using Mirai botnet</li>
      <li><strong>2018 GitHub Attack:</strong> 1.35 Tbps memcached amplification</li>
      <li><strong>2020 AWS Attack:</strong> 2.3 Tbps, largest recorded</li>
    </ul>

    <h3>Cost of DDoS Attacks</h3>
    <ul>
      <li><strong>Downtime Costs:</strong> Lost revenue during outage</li>
      <li><strong>Mitigation Costs:</strong> DDoS protection services</li>
      <li><strong>Reputation Damage:</strong> Loss of customer trust</li>
      <li><strong>Recovery Costs:</strong> Incident response and analysis</li>
    </ul>
  `
}; 