export const bgp = {
  id: 'bgp',
  title: 'BGP (Border Gateway Protocol)',
  content: `
<p>BGP is the protocol that routers use to make decisions about how to route packets between different networks. It's the routing protocol that makes the internet work by enabling data routing between autonomous systems (AS).</p>

    <h3>What is BGP?</h3>
    <ul>
      <li><strong>Purpose:</strong> Exchange routing information between autonomous systems</li>
      <li><strong>Type:</strong> Path vector protocol</li>
      <li><strong>Port:</strong> TCP port 179</li>
      <li><strong>Version:</strong> BGP-4 is the current version</li>
      <li><strong>Scale:</strong> Handles the entire internet routing table (900,000+ routes)</li>
    </ul>

    <h3>Key Concepts</h3>
    
    <h4>Autonomous System (AS)</h4>
    <ul>
      <li>Collection of IP networks under single administrative control</li>
      <li>Identified by unique AS Number (ASN)</li>
      <li>Examples: ISPs, large corporations, universities</li>
      <li>Range: 1-65535 (16-bit), 65536-4294967295 (32-bit)</li>
    </ul>

    <h4>BGP Session Types</h4>
    <ul>
      <li><strong>eBGP (External BGP):</strong> Between different AS</li>
      <li><strong>iBGP (Internal BGP):</strong> Within the same AS</li>
      <li><strong>Multihop BGP:</strong> BGP peers not directly connected</li>
    </ul>

    <h3>How BGP Works</h3>
    
    <h4>BGP Path Selection Process</h4>
    <ol>
      <li><strong>Highest Weight:</strong> Cisco-specific, locally significant</li>
      <li><strong>Highest Local Preference:</strong> Preferred exit point from AS</li>
      <li><strong>Locally Originated:</strong> Routes originated by this router</li>
      <li><strong>Shortest AS Path:</strong> Fewest AS hops</li>
      <li><strong>Lowest Origin Type:</strong> IGP < EGP < Incomplete</li>
      <li><strong>Lowest MED:</strong> Multi-Exit Discriminator</li>
      <li><strong>eBGP over iBGP:</strong> External paths preferred</li>
      <li><strong>Lowest IGP Metric:</strong> To BGP next hop</li>
      <li><strong>Oldest Route:</strong> Most stable</li>
      <li><strong>Lowest Router ID:</strong> Tiebreaker</li>
    </ol>

    <h3>BGP Attributes</h3>
    
    <h4>Well-Known Mandatory</h4>
    <ul>
      <li><strong>AS-PATH:</strong> List of AS the route has traversed</li>
      <li><strong>NEXT-HOP:</strong> IP address of next hop router</li>
      <li><strong>ORIGIN:</strong> How the route was learned (IGP/EGP/Incomplete)</li>
    </ul>

    <h4>Well-Known Discretionary</h4>
    <ul>
      <li><strong>LOCAL-PREF:</strong> Preference value within an AS</li>
      <li><strong>ATOMIC-AGGREGATE:</strong> Route aggregation indicator</li>
    </ul>

    <h4>Optional Transitive</h4>
    <ul>
      <li><strong>COMMUNITY:</strong> Route tagging for policy</li>
      <li><strong>AGGREGATOR:</strong> AS and router that aggregated</li>
    </ul>

    <h4>Optional Non-Transitive</h4>
    <ul>
      <li><strong>MED:</strong> Metric for route selection</li>
      <li><strong>CLUSTER-LIST:</strong> Route reflector path</li>
    </ul>

    <h3>BGP Message Types</h3>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>1. OPEN - Establish BGP session
   - Version, AS number, Hold time, BGP ID
   
2. UPDATE - Advertise or withdraw routes
   - Path attributes, NLRI, Withdrawn routes
   
3. KEEPALIVE - Maintain session
   - Sent every 1/3 of hold time (default 60s)
   
4. NOTIFICATION - Error or session termination
   - Error code and subcode</code></pre>
    </div>

    <h3>BGP States</h3>
    
    <ol>
      <li><strong>Idle:</strong> Initial state, waiting to start</li>
      <li><strong>Connect:</strong> Waiting for TCP connection</li>
      <li><strong>Active:</strong> Trying to establish connection</li>
      <li><strong>OpenSent:</strong> OPEN message sent</li>
      <li><strong>OpenConfirm:</strong> OPEN received, waiting for KEEPALIVE</li>
      <li><strong>Established:</strong> Session up, exchanging routes</li>
    </ol>

    <h3>BGP in Practice</h3>
    
    <h4>Common Use Cases</h4>
    <ul>
      <li><strong>ISP Connectivity:</strong> Connect to multiple ISPs</li>
      <li><strong>Multi-homing:</strong> Redundant internet connections</li>
      <li><strong>Traffic Engineering:</strong> Control inbound/outbound traffic</li>
      <li><strong>CDN Routing:</strong> Direct users to nearest server</li>
      <li><strong>DDoS Mitigation:</strong> Black hole routing</li>
    </ul>

    <h4>BGP Security Issues</h4>
    <ul>
      <li><strong>Route Hijacking:</strong> Announcing routes you don't own</li>
      <li><strong>Route Leaks:</strong> Advertising learned routes incorrectly</li>
      <li><strong>Prefix Deaggregation:</strong> Announcing more specific routes</li>
      <li><strong>BGP Session Hijacking:</strong> TCP vulnerabilities</li>
    </ul>

    <h3>BGP Best Practices</h3>
    
    <h4>Security Measures</h4>
    <ul>
      <li><strong>Prefix Filtering:</strong> Only accept/announce authorized prefixes</li>
      <li><strong>AS-PATH Filtering:</strong> Validate AS paths</li>
      <li><strong>Max Prefix Limits:</strong> Prevent routing table overflow</li>
      <li><strong>MD5 Authentication:</strong> Secure BGP sessions</li>
      <li><strong>RPKI:</strong> Resource Public Key Infrastructure</li>
    </ul>

    <h4>Operational Practices</h4>
    <ul>
      <li><strong>Use Communities:</strong> Tag routes for policy</li>
      <li><strong>Implement BCP38:</strong> Prevent IP spoofing</li>
      <li><strong>Monitor BGP:</strong> Track session status and routes</li>
      <li><strong>Document Policies:</strong> Clear routing policies</li>
      <li><strong>Peer at IXPs:</strong> Internet Exchange Points</li>
    </ul>

    <h3>BGP Configuration Example</h3>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code># Basic BGP configuration (Cisco-style)
router bgp 65001
  bgp router-id 10.0.0.1
  
  # eBGP peer
  neighbor 192.168.1.1 remote-as 65002
  neighbor 192.168.1.1 description ISP-A
  
  # iBGP peer
  neighbor 10.0.0.2 remote-as 65001
  neighbor 10.0.0.2 update-source Loopback0
  
  # Network advertisements
  network 203.0.113.0 mask 255.255.255.0
  
  # Inbound/Outbound policies
  neighbor 192.168.1.1 route-map ISP-IN in
  neighbor 192.168.1.1 route-map ISP-OUT out</code></pre>
    </div>

    <h3>BGP Troubleshooting</h3>
    
    <h4>Common Issues</h4>
    <ul>
      <li><strong>Session Not Establishing:</strong> Check connectivity, AS numbers</li>
      <li><strong>Routes Not Advertised:</strong> Verify network statements, filters</li>
      <li><strong>Routes Not Preferred:</strong> Check BGP attributes</li>
      <li><strong>Routing Loops:</strong> AS-PATH should prevent these</li>
      <li><strong>Convergence Issues:</strong> Timer tuning may help</li>
    </ul>

    <h4>Useful Commands</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code># Show BGP summary
show ip bgp summary

# Show BGP routes
show ip bgp

# Show specific route
show ip bgp 203.0.113.0/24

# Show BGP neighbors
show ip bgp neighbors

# Clear BGP session (soft reset)
clear ip bgp 192.168.1.1 soft</code></pre>
    </div>

    <h3>BGP Scalability</h3>
    
    <h4>Route Reflectors</h4>
    <ul>
      <li>Reduce iBGP full mesh requirement</li>
      <li>Reflect routes between iBGP peers</li>
      <li>Maintain AS-PATH and attributes</li>
    </ul>

    <h4>Confederations</h4>
    <ul>
      <li>Divide AS into sub-AS</li>
      <li>Reduce iBGP sessions</li>
      <li>Alternative to route reflectors</li>
    </ul>

    <h3>Related Links</h3>
    <ul>
      <li><a href="https://www.scaler.com/topics/computer-network/bgp-border-gateway-protocol/" target="_blank">BGP Border Gateway Protocol - Scaler</a></li>
    </ul>
`
}; 