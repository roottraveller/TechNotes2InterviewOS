export const osiModel = {
  id: 'osi-model',
  title: 'OSI Model',
  content: `
    <h2>OSI (Open Systems Interconnection) Model</h2>
    <p>The OSI Model is a conceptual framework that standardizes the functions of a telecommunication or computing system into seven distinct layers. Each layer serves specific functions and communicates with the layers directly above and below it.</p>

    <h3>The Seven Layers</h3>
    
    <h4>Layer 7: Application Layer</h4>
    <ul>
      <li><strong>Function:</strong> Network process to application</li>
      <li><strong>Purpose:</strong> Provides network services directly to end-users</li>
      <li><strong>Protocols:</strong> HTTP, HTTPS, FTP, SMTP, DNS, DHCP</li>
      <li><strong>Examples:</strong> Web browsers, email clients, file transfer</li>
      <li><strong>Data Unit:</strong> Data</li>
    </ul>

    <h4>Layer 6: Presentation Layer</h4>
    <ul>
      <li><strong>Function:</strong> Data representation and encryption</li>
      <li><strong>Purpose:</strong> Translates data between application and network format</li>
      <li><strong>Services:</strong> Encryption/Decryption, Compression, Data conversion</li>
      <li><strong>Formats:</strong> JPEG, GIF, MPEG, SSL/TLS</li>
      <li><strong>Data Unit:</strong> Data</li>
    </ul>

    <h4>Layer 5: Session Layer</h4>
    <ul>
      <li><strong>Function:</strong> Interhost communication</li>
      <li><strong>Purpose:</strong> Establishes, manages, and terminates sessions</li>
      <li><strong>Services:</strong> Session checkpointing, recovery, synchronization</li>
      <li><strong>Protocols:</strong> SQL, NetBIOS, RPC</li>
      <li><strong>Data Unit:</strong> Data</li>
    </ul>

    <h4>Layer 4: Transport Layer</h4>
    <ul>
      <li><strong>Function:</strong> End-to-end connections and reliability</li>
      <li><strong>Purpose:</strong> Reliable data transfer between end systems</li>
      <li><strong>Services:</strong> Segmentation, Flow control, Error control</li>
      <li><strong>Protocols:</strong> TCP, UDP, SPX</li>
      <li><strong>Data Unit:</strong> Segment (TCP) / Datagram (UDP)</li>
    </ul>

    <h4>Layer 3: Network Layer</h4>
    <ul>
      <li><strong>Function:</strong> Path determination and logical addressing</li>
      <li><strong>Purpose:</strong> Routes data packets across networks</li>
      <li><strong>Services:</strong> Routing, Logical addressing, Path determination</li>
      <li><strong>Protocols:</strong> IP (IPv4/IPv6), ICMP, OSPF, BGP</li>
      <li><strong>Data Unit:</strong> Packet</li>
      <li><strong>Devices:</strong> Routers, Layer 3 switches</li>
    </ul>

    <h4>Layer 2: Data Link Layer</h4>
    <ul>
      <li><strong>Function:</strong> Node-to-node delivery</li>
      <li><strong>Purpose:</strong> Error-free transfer between adjacent nodes</li>
      <li><strong>Services:</strong> Framing, Physical addressing, Error detection</li>
      <li><strong>Protocols:</strong> Ethernet, PPP, Wi-Fi (802.11)</li>
      <li><strong>Data Unit:</strong> Frame</li>
      <li><strong>Devices:</strong> Switches, Bridges</li>
    </ul>

    <h4>Layer 1: Physical Layer</h4>
    <ul>
      <li><strong>Function:</strong> Transmission of raw bits</li>
      <li><strong>Purpose:</strong> Defines electrical and physical specifications</li>
      <li><strong>Components:</strong> Cables, Connectors, Repeaters, Hubs</li>
      <li><strong>Standards:</strong> RJ45, V.35, Ethernet cables</li>
      <li><strong>Data Unit:</strong> Bit</li>
    </ul>

    <h3>Data Encapsulation Process</h3>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>Sending Process (Top-Down):
Application → Data
Presentation → Data
Session → Data
Transport → Segment/Datagram + Header
Network → Packet + Header
Data Link → Frame + Header + Trailer
Physical → Bits

Receiving Process (Bottom-Up):
Bits → Physical
Frame → Data Link (removes frame header/trailer)
Packet → Network (removes IP header)
Segment → Transport (removes TCP/UDP header)
Data → Session
Data → Presentation
Data → Application</code></pre>
    </div>

    <h3>OSI vs TCP/IP Model</h3>
    
    <table>
      <thead>
        <tr>
          <th>OSI Layer</th>
          <th>TCP/IP Layer</th>
          <th>Key Difference</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Application</td>
          <td rowspan="3">Application</td>
          <td rowspan="3">TCP/IP combines top 3 layers</td>
        </tr>
        <tr>
          <td>Presentation</td>
        </tr>
        <tr>
          <td>Session</td>
        </tr>
        <tr>
          <td>Transport</td>
          <td>Transport</td>
          <td>Similar functionality</td>
        </tr>
        <tr>
          <td>Network</td>
          <td>Internet</td>
          <td>Called Internet in TCP/IP</td>
        </tr>
        <tr>
          <td>Data Link</td>
          <td rowspan="2">Network Access</td>
          <td rowspan="2">TCP/IP combines bottom 2 layers</td>
        </tr>
        <tr>
          <td>Physical</td>
        </tr>
      </tbody>
    </table>

    <h3>Remember with Mnemonics</h3>
    
    <h4>Top to Bottom</h4>
    <ul>
      <li><strong>A</strong>ll <strong>P</strong>eople <strong>S</strong>eem <strong>T</strong>o <strong>N</strong>eed <strong>D</strong>ata <strong>P</strong>rocessing</li>
      <li><strong>A</strong>pplication, <strong>P</strong>resentation, <strong>S</strong>ession, <strong>T</strong>ransport, <strong>N</strong>etwork, <strong>D</strong>ata Link, <strong>P</strong>hysical</li>
    </ul>

    <h4>Bottom to Top</h4>
    <ul>
      <li><strong>P</strong>lease <strong>D</strong>o <strong>N</strong>ot <strong>T</strong>hrow <strong>S</strong>ausage <strong>P</strong>izza <strong>A</strong>way</li>
      <li><strong>P</strong>hysical, <strong>D</strong>ata Link, <strong>N</strong>etwork, <strong>T</strong>ransport, <strong>S</strong>ession, <strong>P</strong>resentation, <strong>A</strong>pplication</li>
    </ul>

    <h3>Practical Applications</h3>
    
    <h4>Troubleshooting</h4>
    <ol>
      <li><strong>Physical:</strong> Check cables, connections</li>
      <li><strong>Data Link:</strong> Verify MAC addresses, switch configuration</li>
      <li><strong>Network:</strong> Check IP configuration, routing</li>
      <li><strong>Transport:</strong> Verify port numbers, firewall rules</li>
      <li><strong>Application:</strong> Check application settings</li>
    </ol>

    <h4>Security Implementations</h4>
    <ul>
      <li><strong>Physical:</strong> Secure facilities, cable locks</li>
      <li><strong>Data Link:</strong> MAC filtering, 802.1X</li>
      <li><strong>Network:</strong> IPSec, Firewalls</li>
      <li><strong>Transport:</strong> SSL/TLS</li>
      <li><strong>Application:</strong> Application firewalls, encryption</li>
    </ul>

    <h3>Related Links</h3>
    <ul>
      <li><a href="https://www.scaler.com/topics/computer-network/osi-model/" target="_blank">OSI Model - Scaler</a></li>
      <li><a href="https://www.geeksforgeeks.org/layers-of-osi-model/" target="_blank">Layers of OSI Model - GeeksforGeeks</a></li>
    </ul>
  `
}; 