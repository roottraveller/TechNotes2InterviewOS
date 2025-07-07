// Import all the individual subtopic files
import { acidProperties } from './acidProperties';
import { activeActiveVsActivePassive } from './activeActiveVsActivePassive';
import { algorithms } from './algorithms';
import { apiDesign } from './apiDesign';
import { apiGateway } from './apiGateway';
import { applicationServer } from './applicationServer';
import { authentication } from './authentication';
import { authorization } from './authorization';
import { backup } from './backup';
import { baseProperties } from './baseProperties';
import { bgp } from './bgp';
import { bloomFilter } from './bloomFilter';
import { bulkhead } from './bulkhead';
import { cacheEvictionPolicies } from './cacheEvictionPolicies';
import { cacheStrategies } from './cacheStrategies';
import { caching } from './caching';
import { capTheorem } from './capTheorem';
import { cdn } from './cdn';
import { cicd } from './cicd';
import { circuitBreaker } from './circuitBreaker';
import { cloudComputing } from './cloudComputing';
import { compressionDecompression } from './compressionDecompression';
import { concurrencyControlProblems } from './concurrencyControlProblems';
import { consistentHashing } from './consistentHashing';
import { consistentHashingVsLoadBalancing } from './consistentHashingVsLoadBalancing';
import { containerization } from './containerization';
import { containers } from './containers';
import { cors } from './cors';
import { databaseDesignPrinciples } from './databaseDesignPrinciples';
import { databaseSharding } from './databaseSharding';
import { databaseTypes } from './databaseTypes';
import { dataStructures } from './dataStructures';
import { ddos } from './ddos';
import { deadlockDetectionPrevention } from './deadlockDetectionPrevention';
import { distributedConsensus } from './distributedConsensus';
import { distributedTransactions } from './distributedTransactions';
import { dns } from './dns';
import { docker } from './docker';
import { edgeComputing } from './edgeComputing';
import { elasticityVsScalability } from './elasticityVsScalability';
import { encodingDecoding } from './encodingDecoding';
import { encryption } from './encryption';
import { encryptionDecryption } from './encryptionDecryption';
import { eventSourcing } from './eventSourcing';
import { eventStreaming } from './eventStreaming';
import { failoverStrategies } from './failoverStrategies';
import { forwardProxy } from './forwardProxy';
import { gossipProtocol } from './gossipProtocol';
import { graphql } from './graphql';
import { hashing } from './hashing';
import { hintedHandoff } from './hintedHandoff';
import { http } from './http';
import { httpHeaders } from './httpHeaders';
import { httpStatusCodes } from './httpStatusCodes';
import { httpVersions } from './httpVersions';
import { httpVsHttps } from './httpVsHttps';
import { https } from './https';
import { hyperLogLog } from './hyperLogLog';
import { indexing } from './indexing';
import { isolationLevels } from './isolationLevels';
import { jwt } from './jwt';
import { keyExchange } from './keyExchange';
import { kubernetes } from './kubernetes';
import { loadBalancer } from './loadBalancer';
import { localityOfReference } from './localityOfReference';
import { logging } from './logging';
import { merkleTree } from './merkleTree';
import { messageQueues } from './messageQueues';
import { microservices } from './microservices';
import { monitoring } from './monitoring';
import { monitoringObservability } from './monitoringObservability';
import { mvcc } from './mvcc';
import { networking } from './networking';
import { networkProtocols } from './networkProtocols';
import { normalization } from './normalization';
import { nosql } from './nosql';
import { oauth } from './oauth';
import { oauth2 } from './oauth2';
import { optimisticVsPessimisticLocking } from './optimisticVsPessimisticLocking';
import { osiModel } from './osiModel';
import { pacelcTheorem } from './pacelcTheorem';
import { partitioning } from './partitioning';
import { paxosConsensus } from './paxosConsensus';
import { proxies } from './proxies';
import { quorumConcepts } from './quorumConcepts';
import { raftConsensus } from './raftConsensus';
import { rateLimit } from './rateLimit';
import { rateLimiting } from './rateLimiting';
import { rbac } from './rbac';
import { recovery } from './recovery';
import { replication } from './replication';
import { resourceStarvation } from './resourceStarvation';
import { restApi } from './restApi';
import { retryPattern } from './retryPattern';
import { reverseProxy } from './reverseProxy';
import { serializationDeserialization } from './serializationDeserialization';
import { serverless } from './serverless';
import { softwareDesignPatterns } from './softwareDesignPatterns';
import { sql } from './sql';
import { tcp } from './tcp';
import { tcpIpModel } from './tcpIpModel';
import { tcpVsUdp } from './tcpVsUdp';
import { thunderingHerd } from './thunderingHerd';
import { thunderingHerdProblem } from './thunderingHerdProblem';
import { timeoutPattern } from './timeoutPattern';
import { timestampingProtocol } from './timestampingProtocol';
import { tracing } from './tracing';
import { twoPhaseLocking } from './twoPhaseLocking';
import { udp } from './udp';
import { unicodeCharacters } from './unicodeCharacters';
import { unixEpoch } from './unixEpoch';
import { urlVsUriVsUrn } from './urlVsUriVsUrn';
import { vectorClocks } from './vectorClocks';
import { verticalVsHorizontalScaling } from './verticalVsHorizontalScaling';
import { webServer } from './webServer';
import { websockets as webSockets } from './webSockets';

export const techTopicsData = {
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
        // Database Fundamentals (15 subtopics) - Core database concepts and transaction management
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
        {
          ...distributedTransactions,
          category: 'Database Fundamentals'
        },
        {
          ...databaseSharding,
          category: 'Database Fundamentals'
        },
        {
          ...databaseTypes,
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
        {
          ...replication,
          category: 'Distributed Systems Theory'
        },

        // System Architecture & Scalability (20 subtopics) - Architecture patterns and scalability
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
          ...activeActiveVsActivePassive,
          category: 'System Architecture & Scalability'
        },
        {
          ...apiGateway,
          category: 'System Architecture & Scalability'
        },
        {
          ...cdn,
          category: 'System Architecture & Scalability'
        },
        {
          ...circuitBreaker,
          category: 'System Architecture & Scalability'
        },
        {
          ...rateLimiting,
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
          ...eventSourcing,
          category: 'System Architecture & Scalability'
        },
        {
          ...applicationServer,
          category: 'System Architecture & Scalability'
        },
        {
          ...verticalVsHorizontalScaling,
          category: 'System Architecture & Scalability'
        },
        {
          ...elasticityVsScalability,
          category: 'System Architecture & Scalability'
        },
        {
          ...partitioning,
          category: 'System Architecture & Scalability'
        },
        {
          ...hashing,
          category: 'System Architecture & Scalability'
        },
        {
          ...proxies,
          category: 'System Architecture & Scalability'
        },
        {
          ...cloudComputing,
          category: 'System Architecture & Scalability'
        },

        // Security & Authentication (10 subtopics) - Security protocols and access control
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
          ...oauth,
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
          ...keyExchange,
          category: 'Security & Authentication'
        },
        {
          ...encryption,
          category: 'Security & Authentication'
        },
        {
          ...encryptionDecryption,
          category: 'Security & Authentication'
        },
        {
          ...ddos,
          category: 'Security & Authentication'
        },

        // Networking & Protocols (15 subtopics) - Network communication and protocols
        {
          ...networkProtocols,
          category: 'Networking & Protocols'
        },
        {
          ...tcp,
          category: 'Networking & Protocols'
        },
        {
          ...tcpVsUdp,
          category: 'Networking & Protocols'
        },
        {
          ...osiModel,
          category: 'Networking & Protocols'
        },
        {
          ...tcpIpModel,
          category: 'Networking & Protocols'
        },
        {
          ...http,
          category: 'Networking & Protocols'
        },
        {
          ...httpVsHttps,
          category: 'Networking & Protocols'
        },
        {
          ...https,
          category: 'Networking & Protocols'
        },
        {
          ...httpVersions,
          category: 'Networking & Protocols'
        },
        {
          ...httpStatusCodes,
          category: 'Networking & Protocols'
        },
        {
          ...httpHeaders,
          category: 'Networking & Protocols'
        },
        {
          ...webSockets,
          category: 'Networking & Protocols'
        },
        {
          ...dns,
          category: 'Networking & Protocols'
        },
        {
          ...networking,
          category: 'Networking & Protocols'
        },
        {
          ...cors,
          category: 'Networking & Protocols'
        },
        {
          ...urlVsUriVsUrn,
          category: 'Networking & Protocols'
        },
        {
          ...bgp,
          category: 'Networking & Protocols'
        },
        {
          ...unicodeCharacters,
          category: 'Networking & Protocols'
        },
        {
          ...serializationDeserialization,
          category: 'Networking & Protocols'
        },
        {
          ...encodingDecoding,
          category: 'Networking & Protocols'
        },
        {
          ...compressionDecompression,
          category: 'Networking & Protocols'
        },
        {
          ...udp,
          category: 'Networking & Protocols'
        },

        // DevOps & Infrastructure (15 subtopics) - Deployment and infrastructure management
        {
          ...containerization,
          category: 'DevOps & Infrastructure'
        },
        {
          ...docker,
          category: 'DevOps & Infrastructure'
        },
        {
          ...kubernetes,
          category: 'DevOps & Infrastructure'
        },
        {
          ...cicd,
          category: 'DevOps & Infrastructure'
        },
        {
          ...monitoring,
          category: 'DevOps & Infrastructure'
        },
        {
          ...logging,
          category: 'DevOps & Infrastructure'
        },
        {
          ...backup,
          category: 'DevOps & Infrastructure'
        },
        {
          ...recovery,
          category: 'DevOps & Infrastructure'
        },
        {
          ...failoverStrategies,
          category: 'DevOps & Infrastructure'
        },
        {
          ...serverless,
          category: 'DevOps & Infrastructure'
        },
        {
          ...edgeComputing,
          category: 'DevOps & Infrastructure'
        },
        {
          ...containers,
          category: 'DevOps & Infrastructure'
        },
        {
          ...tracing,
          category: 'DevOps & Infrastructure'
        },
        {
          ...monitoringObservability,
          category: 'DevOps & Infrastructure'
        },
        {
          ...retryPattern,
          category: 'DevOps & Infrastructure'
        },

        // Data Structures & Algorithms (10 subtopics) - Core CS fundamentals
        {
          ...dataStructures,
          category: 'Data Structures & Algorithms'
        },
        {
          ...algorithms,
          category: 'Data Structures & Algorithms'
        },
        {
          ...indexing,
          category: 'Data Structures & Algorithms'
        },
        {
          ...hashing,
          category: 'Data Structures & Algorithms'
        },
        {
          ...cacheStrategies,
          category: 'Data Structures & Algorithms'
        },
        {
          ...cacheEvictionPolicies,
          category: 'Data Structures & Algorithms'
        },
        {
          ...normalization,
          category: 'Data Structures & Algorithms'
        },
        {
          ...sql,
          category: 'Data Structures & Algorithms'
        },
        {
          ...nosql,
          category: 'Data Structures & Algorithms'
        },
        {
          ...softwareDesignPatterns,
          category: 'Data Structures & Algorithms'
        },

        // Performance & Reliability (10 subtopics) - System performance and reliability patterns
        {
          ...bulkhead,
          category: 'Performance & Reliability'
        },
        {
          ...timeoutPattern,
          category: 'Performance & Reliability'
        },
        {
          ...thunderingHerdProblem,
          category: 'Performance & Reliability'
        },
        {
          ...eventStreaming,
          category: 'Performance & Reliability'
        },
        {
          ...graphql,
          category: 'Performance & Reliability'
        },
        {
          ...restApi,
          category: 'Performance & Reliability'
        },
        {
          ...rateLimit,
          category: 'Performance & Reliability'
        },
        {
          ...forwardProxy,
          category: 'Performance & Reliability'
        },
        {
          ...reverseProxy,
          category: 'Performance & Reliability'
        },
        {
          ...webServer,
          category: 'Performance & Reliability'
        }
      ].sort((a, b) => a.title.localeCompare(b.title))
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