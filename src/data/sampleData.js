// Import all the individual subtopic files
import { acidProperties } from './acidProperties';
import { baseProperties } from './baseProperties';
import { capTheorem } from './capTheorem';
import { pacelcTheorem } from './pacelcTheorem';
import { consistentHashing } from './consistentHashing';
import { loadBalancer } from './loadBalancer';
import { consistentHashingVsLoadBalancing } from './consistentHashingVsLoadBalancing';
import { authentication } from './authentication';
import { authorization } from './authorization';
import { jwt } from './jwt';
import { oauth2 } from './oauth2';

// New imports for additional subtopics
import { databaseDesignPrinciples } from './databaseDesignPrinciples';
import { unixEpoch } from './unixEpoch';
import { mvcc } from './mvcc';
import { concurrencyControlProblems } from './concurrencyControlProblems';
import { distributedConsensus } from './distributedConsensus';
import { paxosConsensus } from './paxosConsensus';

// New Database Fundamentals imports
import { optimisticVsPessimisticLocking } from './optimisticVsPessimisticLocking';
import { twoPhaseLocking } from './twoPhaseLocking';
import { timestampingProtocol } from './timestampingProtocol';
import { localityOfReference } from './localityOfReference';
import { isolationLevels } from './isolationLevels';
import { deadlockDetectionPrevention } from './deadlockDetectionPrevention';

// Distributed Systems Theory imports
import { raftConsensus } from './raftConsensus';
import { quorumConcepts } from './quorumConcepts';
import { hintedHandoff } from './hintedHandoff';
import { gossipProtocol } from './gossipProtocol';
import { thunderingHerd } from './thunderingHerd';
import { resourceStarvation } from './resourceStarvation';
import { distributedTransactions } from './distributedTransactions';
import { vectorClocks } from './vectorClocks';
import { merkleTree } from './merkleTree';
import { bloomFilter } from './bloomFilter';
import { hyperLogLog } from './hyperLogLog';

// System Architecture & Scalability imports
import { caching } from './caching';
import { messageQueues } from './messageQueues';
import { microservices } from './microservices';
import { apiDesign } from './apiDesign';
import { databaseSharding } from './databaseSharding';
import { eventSourcing } from './eventSourcing';

// Security & Authentication imports
import { rbac } from './rbac';
import { encryption } from './encryption';
import { ddos } from './ddos';

// Data Structures & Algorithms imports
import { dataStructures } from './dataStructures';
import { algorithms } from './algorithms';

export const sampleData = {
  topics: [
    {
      id: 'full-forms',
      title: 'Must know Full form',
      subtopics: [
        {
          id: 'tech-acronyms',
          title: 'Technology Acronyms',
          content: `
            <h2>Essential Technology Acronyms</h2>
            <p>A comprehensive list of must-know technology acronyms for technical interviews:</p>
            
            <h3>Security & Protocols</h3>
            <ul>
              <li><strong>TLS</strong> - Transport Layer Security</li>
              <li><strong>SSL</strong> - Secure Sockets Layer</li>
              <li><strong>SMTP</strong> - Simple Mail Transfer Protocol</li>
              <li><strong>XMPP</strong> - Extensible Messaging and Presence Protocol</li>
              <li><strong>AMQP</strong> - Advanced Message Queuing Protocol</li>
              <li><strong>SSH</strong> - Secure Shell</li>
              <li><strong>HMAC</strong> - Hash-Based Message Authentication Code</li>
              <li><strong>SHA</strong> - Secure Hash Algorithm</li>
            </ul>

            <h3>Database & Storage</h3>
            <ul>
              <li><strong>OLTP</strong> - Online Transaction Processing</li>
              <li><strong>OLAP</strong> - Online Analytical Processing</li>
              <li><strong>TSDB</strong> - Time Series Database</li>
              <li><strong>ORM</strong> - Object-Relational Mapping</li>
              <li><strong>MVCC</strong> - Multi-Version Concurrency Control</li>
              <li><strong>CQRS</strong> - Command and Query Responsibility Segregation</li>
              <li><strong>GFS</strong> - Global File System</li>
              <li><strong>HDFS</strong> - Hadoop Distributed File System</li>
              <li><strong>RAID</strong> - Redundant Array of Independent Disks</li>
            </ul>

            <h3>Cloud & Infrastructure</h3>
            <ul>
              <li><strong>PaaS</strong> - Platform as a Service</li>
              <li><strong>IaaS</strong> - Infrastructure as a Service</li>
              <li><strong>SaaS</strong> - Software as a Service</li>
              <li><strong>FaaS</strong> - Function as a Service</li>
              <li><strong>BCP/DR</strong> - Business Continuity Plan/Disaster Recovery</li>
              <li><strong>UTC</strong> - Coordinated Universal Time</li>
            </ul>

            <h3>Development & Standards</h3>
            <ul>
              <li><strong>JWT</strong> - JSON Web Token</li>
              <li><strong>IDP</strong> - Identity Provider</li>
              <li><strong>JSON</strong> - JavaScript Object Notation</li>
              <li><strong>ISO</strong> - International Organization for Standardization</li>
              <li><strong>UML</strong> - Unified Modeling Language</li>
              <li><strong>RBAC</strong> - Role-Based Access Control</li>
            </ul>

            <h3>Security Threats</h3>
            <ul>
              <li><strong>CSRF</strong> - Cross-Site Request Forgery</li>
              <li><strong>XSS</strong> - Cross-Site Scripting</li>
              <li><strong>DDoS</strong> - Distributed Denial of Service</li>
              <li><strong>SQLi</strong> - SQL Injection</li>
            </ul>

            <h3>Processing & Architecture</h3>
            <ul>
              <li><strong>SIMT</strong> - Single Instruction, Multiple Threads</li>
              <li><strong>SIMD</strong> - Single Instruction, Multiple Data</li>
              <li><strong>DAU</strong> - Daily Active Users</li>
              <li><strong>ELK Stack</strong> - Elasticsearch, Logstash, and Kibana</li>
            </ul>

            <h3>Compliance & Regulations</h3>
            <ul>
              <li><strong>GDPR</strong> - General Data Protection Regulation</li>
              <li><strong>PCI</strong> - Payment Card Industry</li>
            </ul>
          `
        }
      ]
    },
    {
      id: 'must-know-terms',
      title: 'Must know Terms',
      subtopics: [
        // Database Fundamentals (12 subtopics) - Core database concepts and transaction management
        {
          ...databaseDesignPrinciples,
          category: 'Database Fundamentals'
        },
        {
          ...unixEpoch,
          category: 'Database Fundamentals'
        },
        {
          ...acidProperties,
          category: 'Database Fundamentals'
        },
        {
          ...baseProperties,
          category: 'Database Fundamentals'
        },
        {
          ...mvcc,
          category: 'Database Fundamentals'
        },
        {
          ...concurrencyControlProblems,
          category: 'Database Fundamentals'
        },
        {
          ...optimisticVsPessimisticLocking,
          category: 'Database Fundamentals'
        },
        {
          ...twoPhaseLocking,
          category: 'Database Fundamentals'
        },
        {
          ...timestampingProtocol,
          category: 'Database Fundamentals'
        },
        {
          ...localityOfReference,
          category: 'Database Fundamentals'
        },
        {
          ...isolationLevels,
          category: 'Database Fundamentals'
        },
        {
          ...deadlockDetectionPrevention,
          category: 'Database Fundamentals'
        },

        // Distributed Systems Theory (15 subtopics) - Consensus algorithms and distributed coordination
        {
          ...capTheorem,
          category: 'Distributed Systems Theory'
        },
        {
          ...pacelcTheorem,
          category: 'Distributed Systems Theory'
        },
        {
          ...distributedConsensus,
          category: 'Distributed Systems Theory'
        },
        {
          ...paxosConsensus,
          category: 'Distributed Systems Theory'
        },
        {
          ...raftConsensus,
          category: 'Distributed Systems Theory'
        },
        {
          ...quorumConcepts,
          category: 'Distributed Systems Theory'
        },
        {
          ...hintedHandoff,
          category: 'Distributed Systems Theory'
        },
        {
          ...gossipProtocol,
          category: 'Distributed Systems Theory'
        },
        {
          ...thunderingHerd,
          category: 'Distributed Systems Theory'
        },
        {
          ...resourceStarvation,
          category: 'Distributed Systems Theory'
        },
        {
          ...distributedTransactions,
          category: 'Distributed Systems Theory'
        },
        {
          ...vectorClocks,
          category: 'Distributed Systems Theory'
        },
        {
          ...merkleTree,
          category: 'Distributed Systems Theory'
        },
        {
          ...bloomFilter,
          category: 'Distributed Systems Theory'
        },
        {
          ...hyperLogLog,
          category: 'Distributed Systems Theory'
        },

        // System Architecture & Scalability (18 subtopics) - Architecture patterns and scalability
        {
          ...consistentHashing,
          category: 'System Architecture & Scalability'
        },
        {
          ...loadBalancer,
          category: 'System Architecture & Scalability'
        },
        {
          ...consistentHashingVsLoadBalancing,
          category: 'System Architecture & Scalability'
        },
        {
          ...caching,
          category: 'System Architecture & Scalability'
        },
        {
          ...messageQueues,
          category: 'System Architecture & Scalability'
        },
        {
          ...microservices,
          category: 'System Architecture & Scalability'
        },
        {
          ...apiDesign,
          category: 'System Architecture & Scalability'
        },
        {
          ...databaseSharding,
          category: 'System Architecture & Scalability'
        },
        {
          ...eventSourcing,
          category: 'System Architecture & Scalability'
        },

        // Security & Authentication (8 subtopics) - Security protocols and access control
        {
          ...authentication,
          category: 'Security & Authentication'
        },
        {
          ...authorization,
          category: 'Security & Authentication'
        },
        {
          ...jwt,
          category: 'Security & Authentication'
        },
        {
          ...oauth2,
          category: 'Security & Authentication'
        },
        {
          ...rbac,
          category: 'Security & Authentication'
        },
        {
          ...encryption,
          category: 'Security & Authentication'
        },
        {
          ...ddos,
          category: 'Security & Authentication'
        },

        // Data Structures & Algorithms (15 subtopics) - Core CS fundamentals
        {
          ...dataStructures,
          category: 'Data Structures & Algorithms'
        },
        {
          ...algorithms,
          category: 'Data Structures & Algorithms'
        }
      ]
    },
    {
      id: 'system-design',
      title: 'System Design HLD',
      subtopics: [
        {
          id: 'coming-soon',
          title: 'Coming Soon',
          content: `
            <h2>System Design High Level Design</h2>
            <p>This section will contain comprehensive system design concepts and high-level design patterns.</p>
            
            <div class="info-note">
              <strong>📚 External Resource:</strong>
              <p>For now, you can access detailed system design content at:</p>
              <a href="https://docs.google.com/document/d/1jVUeQGD_xFlnVPBEdSHrxka-CESJBe_xuV-IA-kKxOs/edit" target="_blank">
                System Design HLD Google Doc
              </a>
            </div>

            <h3>Topics to be covered:</h3>
            <ul>
              <li>Scalability Patterns</li>
              <li>Database Design</li>
              <li>Caching Strategies</li>
              <li>Message Queues</li>
              <li>API Design</li>
              <li>System Architecture Patterns</li>
              <li>Performance Optimization</li>
              <li>Monitoring and Observability</li>
            </ul>
          `
        }
      ]
    },
    {
      id: 'system-design-lld',
      title: 'System Design LLD',
      subtopics: [
        {
          id: 'low-level-design-coming-soon',
          title: 'Coming Soon',
          content: `
            <h2>System Design Low Level Design</h2>
            <p>This section will contain comprehensive low-level design concepts and implementation patterns.</p>
            
            <div class="info-note">
              <strong>📚 External Resource:</strong>
              <p>For now, you can access detailed low-level design content at:</p>
              <a href="https://docs.google.com/document/d/195UBBc7vSewe9BWUHLAvQFClR4HTLloozVhjdgZ54H8/edit" target="_blank">
                System Design LLD Google Doc
              </a>
            </div>

            <h3>Topics to be covered:</h3>
            <ul>
              <li>Object-Oriented Design Principles</li>
              <li>Design Patterns</li>
              <li>Code Architecture</li>
              <li>Data Structures Implementation</li>
              <li>Algorithm Design</li>
              <li>Class Diagrams and UML</li>
              <li>API Design Patterns</li>
              <li>Testing Strategies</li>
            </ul>
          `
        }
      ]
    }
  ]
}; 