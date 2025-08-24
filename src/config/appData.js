/**
 * Main Application Data Configuration
 * 
 * This file serves as the central data aggregator for the TechNotes Interview OS application.
 * It imports all individual topic modules from the data directory and organizes them into
 * a structured format for the application to consume.
 * 
 * Structure:
 * - Imports all topic modules from ../data/
 * - Organizes topics into categories
 * - Exports a single appData object with topics array
 * - Each topic contains subtopics with content and metadata
 * 
 * @author TechNotes Interview OS
 * @version 1.0.0
 */

// Import all the individual subtopic files
import { acidProperties } from '../data/acidProperties';
import { activeActiveVsActivePassive } from '../data/activeActiveVsActivePassive';
import { algorithms } from '../data/algorithms';
import { apiDesign } from '../data/apiDesign';
import { apiGateway } from '../data/apiGateway';
import { applicationServer } from '../data/applicationServer';
import { authentication } from '../data/authentication';
import { authorization } from '../data/authorization';
import { backup } from '../data/backup';
import { baseProperties } from '../data/baseProperties';
import { bgp } from '../data/bgp';
import { bloomFilter } from '../data/bloomFilter';
import { bulkhead } from '../data/bulkhead';
import { cacheEvictionPolicies } from '../data/cacheEvictionPolicies';
import { cacheStrategies } from '../data/cacheStrategies';
import { caching } from '../data/caching';
import { capTheorem } from '../data/capTheorem';
import { cdn } from '../data/cdn';
import { cicd } from '../data/cicd';
import { circuitBreaker } from '../data/circuitBreaker';
import { cloudComputing } from '../data/cloudComputing';
import { compressionDecompression } from '../data/compressionDecompression';
import { concurrencyControlProblems } from '../data/concurrencyControlProblems';
import { consistentHashing } from '../data/consistentHashing';
import { consistentHashingVsLoadBalancing } from '../data/consistentHashingVsLoadBalancing';
import { containerization } from '../data/containerization';
import { cors } from '../data/cors';
import { databaseDesignPrinciples } from '../data/databaseDesignPrinciples';
import { databaseSharding } from '../data/databaseSharding';
import { databaseTypes } from '../data/databaseTypes';
import { dataStructures } from '../data/dataStructures';
import { ddos } from '../data/ddos';
import { deadlockDetectionPrevention } from '../data/deadlockDetectionPrevention';
import { distributedConsensus } from '../data/distributedConsensus';
import { distributedTransactions } from '../data/distributedTransactions';
import { dns } from '../data/dns';
import { docker } from '../data/docker';
import { edgeComputing } from '../data/edgeComputing';
import { elasticityVsScalability } from '../data/elasticityVsScalability';
import { encodingDecoding } from '../data/encodingDecoding';
import { encryption } from '../data/encryption';
import { encryptionDecryption } from '../data/encryptionDecryption';
import { eventSourcing } from '../data/eventSourcing';
import { eventStreaming } from '../data/eventStreaming';
import { failoverStrategies } from '../data/failoverStrategies';
import { forwardProxy } from '../data/forwardProxy';
import { gossipProtocol } from '../data/gossipProtocol';
import { graphql } from '../data/graphql';
import { hashing } from '../data/hashing';
import { hintedHandoff } from '../data/hintedHandoff';
import { http } from '../data/http';
import { httpHeaders } from '../data/httpHeaders';
import { httpStatusCodes } from '../data/httpStatusCodes';
import { httpVersions } from '../data/httpVersions';
import { httpVsHttps } from '../data/httpVsHttps';
import { https } from '../data/https';
import { hyperLogLog } from '../data/hyperLogLog';
import { indexing } from '../data/indexing';
import { isolationLevels } from '../data/isolationLevels';
import { jwt } from '../data/jwt';
import { keyExchange } from '../data/keyExchange';
import { kubernetes } from '../data/kubernetes';
import { loadBalancer } from '../data/loadBalancer';
import { localityOfReference } from '../data/localityOfReference';
import { logging } from '../data/logging';
import { merkleTree } from '../data/merkleTree';
import { messageQueues } from '../data/messageQueues';
import { microservices } from '../data/microservices';
import { monitoring } from '../data/monitoring';
import { monitoringObservability } from '../data/monitoringObservability';
import { mvcc } from '../data/mvcc';
import { networking } from '../data/networking';
import { networkProtocols } from '../data/networkProtocols';
import { normalization } from '../data/normalization';
import { nosql } from '../data/nosql';
import { oauth2 } from '../data/oauth2';
import { optimisticVsPessimisticLocking } from '../data/optimisticVsPessimisticLocking';
import { osiModel } from '../data/osiModel';
import { pacelcTheorem } from '../data/pacelcTheorem';
import { partitioning } from '../data/partitioning';
import { paxosConsensus } from '../data/paxosConsensus';
import { proxies } from '../data/proxies';
import { quorumConcepts } from '../data/quorumConcepts';
import { raftConsensus } from '../data/raftConsensus';
import { rateLimiting } from '../data/rateLimiting';
import { rbac } from '../data/rbac';
import { recovery } from '../data/recovery';
import { replication } from '../data/replication';
import { resourceStarvation } from '../data/resourceStarvation';
import { restApi } from '../data/restApi';
import { retryPattern } from '../data/retryPattern';
import { reverseProxy } from '../data/reverseProxy';
import { serializationDeserialization } from '../data/serializationDeserialization';
import { serverless } from '../data/serverless';
import { softwareDesignPatterns } from '../data/softwareDesignPatterns';
import { sql } from '../data/sql';
import { tcp } from '../data/tcp';
import { tcpIpModel } from '../data/tcpIpModel';
import { tcpVsUdp } from '../data/tcpVsUdp';
import { thunderingHerdProblem } from '../data/thunderingHerdProblem';
import { timeoutPattern } from '../data/timeoutPattern';
import { timestampingProtocol } from '../data/timestampingProtocol';
import { tracing } from '../data/tracing';
import { twoPhaseLocking } from '../data/twoPhaseLocking';
import { udp } from '../data/udp';
import { unicodeCharacters } from '../data/unicodeCharacters';
import { unixEpoch } from '../data/unixEpoch';
import { urlVsUriVsUrn } from '../data/urlVsUriVsUrn';
import { vectorClocks } from '../data/vectorClocks';
import { verticalVsHorizontalScaling } from '../data/verticalVsHorizontalScaling';
import { webServer } from '../data/webServer';
import { websockets as webSockets } from '../data/webSockets';

export const appData = {
  topics: [
    {
      id: 'full-forms',
      title: 'Must know Acronyms',
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
    },
    {
      id: 'java-quick-reference',
      title: 'Java Quick Reference',
      subtopics: [
        {
          id: 'java-fundamentals',
          title: 'Java Fundamentals',
          content: `
            <h2>Java Quick Reference</h2>
            <p>Essential Java concepts and syntax for technical interviews.</p>
            
            <h3>Core Java Concepts</h3>
            <ul>
              <li><strong>OOP Principles:</strong> Encapsulation, Inheritance, Polymorphism, Abstraction</li>
              <li><strong>Collections Framework:</strong> List, Set, Map, Queue interfaces</li>
              <li><strong>Exception Handling:</strong> try-catch, checked vs unchecked exceptions</li>
              <li><strong>Multithreading:</strong> Thread, Runnable, ExecutorService</li>
              <li><strong>Generics:</strong> Type safety and wildcards</li>
              <li><strong>Lambda Expressions:</strong> Functional programming in Java 8+</li>
              <li><strong>Streams API:</strong> Functional data processing</li>
            </ul>

            <h3>Common Data Structures</h3>
            <ul>
              <li><strong>ArrayList vs LinkedList:</strong> Performance characteristics</li>
              <li><strong>HashMap vs TreeMap:</strong> Ordering and performance</li>
              <li><strong>HashSet vs TreeSet:</strong> Uniqueness and sorting</li>
              <li><strong>Stack and Queue:</strong> LIFO vs FIFO operations</li>
            </ul>

            <h3>Memory Management</h3>
            <ul>
              <li><strong>Heap vs Stack:</strong> Memory allocation</li>
              <li><strong>Garbage Collection:</strong> Automatic memory management</li>
              <li><strong>Memory Leaks:</strong> Common causes and prevention</li>
            </ul>

            <div class="info-note">
              <strong>💡 Interview Tip:</strong>
              <p>Focus on understanding the "why" behind Java features, not just the "how". Interviewers often ask about trade-offs and design decisions.</p>
            </div>
          `
        }
      ]
    },
    {
      id: 'kafka-zookeeper',
      title: 'Kafka & Zookeeper',
      subtopics: [
        {
          id: 'kafka-fundamentals',
          title: 'Kafka Fundamentals',
          content: `
            <h2>Apache Kafka & Zookeeper</h2>
            <p>Distributed streaming platform for building real-time data pipelines.</p>
            
            <h3>Kafka Core Concepts</h3>
            <ul>
              <li><strong>Topics:</strong> Categories of messages</li>
              <li><strong>Partitions:</strong> Scalability and parallelism</li>
              <li><strong>Producers:</strong> Applications that send messages</li>
              <li><strong>Consumers:</strong> Applications that read messages</li>
              <li><strong>Brokers:</strong> Kafka servers that store data</li>
              <li><strong>Consumer Groups:</strong> Load balancing consumers</li>
            </ul>

            <h3>Zookeeper's Role</h3>
            <ul>
              <li><strong>Cluster Coordination:</strong> Managing Kafka brokers</li>
              <li><strong>Configuration Management:</strong> Storing metadata</li>
              <li><strong>Leader Election:</strong> Partition leadership</li>
              <li><strong>Service Discovery:</strong> Broker registration</li>
            </ul>

            <h3>Key Features</h3>
            <ul>
              <li><strong>High Throughput:</strong> Millions of messages per second</li>
              <li><strong>Fault Tolerance:</strong> Replication and failover</li>
              <li><strong>Scalability:</strong> Horizontal scaling</li>
              <li><strong>Durability:</strong> Persistent storage</li>
              <li><strong>Ordering:</strong> Per-partition message ordering</li>
            </ul>

            <h3>Use Cases</h3>
            <ul>
              <li>Event Streaming</li>
              <li>Log Aggregation</li>
              <li>Real-time Analytics</li>
              <li>Microservices Communication</li>
              <li>Data Integration</li>
            </ul>
          `
        }
      ]
    },
    {
      id: 'rabbitmq',
      title: 'RabbitMQ',
      subtopics: [
        {
          id: 'rabbitmq-fundamentals',
          title: 'RabbitMQ Fundamentals',
          content: `
            <h2>RabbitMQ</h2>
            <p>Message broker that implements the Advanced Message Queuing Protocol (AMQP).</p>
            
            <h3>Core Components</h3>
            <ul>
              <li><strong>Producer:</strong> Sends messages</li>
              <li><strong>Queue:</strong> Stores messages</li>
              <li><strong>Consumer:</strong> Receives messages</li>
              <li><strong>Exchange:</strong> Routes messages to queues</li>
              <li><strong>Binding:</strong> Links exchanges to queues</li>
              <li><strong>Routing Key:</strong> Message routing criteria</li>
            </ul>

            <h3>Exchange Types</h3>
            <ul>
              <li><strong>Direct:</strong> Exact routing key match</li>
              <li><strong>Topic:</strong> Pattern-based routing</li>
              <li><strong>Fanout:</strong> Broadcast to all queues</li>
              <li><strong>Headers:</strong> Attribute-based routing</li>
            </ul>

            <h3>Message Properties</h3>
            <ul>
              <li><strong>Persistence:</strong> Message durability</li>
              <li><strong>Acknowledgments:</strong> Delivery confirmation</li>
              <li><strong>TTL:</strong> Time-to-live for messages</li>
              <li><strong>Priority:</strong> Message prioritization</li>
            </ul>

            <h3>Reliability Features</h3>
            <ul>
              <li><strong>Clustering:</strong> High availability</li>
              <li><strong>Mirroring:</strong> Queue replication</li>
              <li><strong>Dead Letter Queues:</strong> Failed message handling</li>
              <li><strong>Publisher Confirms:</strong> Delivery guarantees</li>
            </ul>
          `
        }
      ]
    },
    {
      id: 'redis-cache',
      title: 'Redis Cache',
      subtopics: [
        {
          id: 'redis-fundamentals',
          title: 'Redis Fundamentals',
          content: `
            <h2>Redis Cache</h2>
            <p>In-memory data structure store used as database, cache, and message broker.</p>
            
            <h3>Data Types</h3>
            <ul>
              <li><strong>Strings:</strong> Basic key-value pairs</li>
              <li><strong>Lists:</strong> Ordered collections</li>
              <li><strong>Sets:</strong> Unordered unique collections</li>
              <li><strong>Hashes:</strong> Field-value pairs</li>
              <li><strong>Sorted Sets:</strong> Ordered sets with scores</li>
              <li><strong>Bitmaps:</strong> Bit-level operations</li>
              <li><strong>Streams:</strong> Log-like data structure</li>
            </ul>

            <h3>Key Features</h3>
            <ul>
              <li><strong>In-Memory:</strong> Extremely fast access</li>
              <li><strong>Persistence:</strong> RDB and AOF options</li>
              <li><strong>Replication:</strong> Master-slave architecture</li>
              <li><strong>Clustering:</strong> Horizontal scaling</li>
              <li><strong>Pub/Sub:</strong> Message passing</li>
              <li><strong>Transactions:</strong> ACID properties</li>
            </ul>

            <h3>Caching Strategies</h3>
            <ul>
              <li><strong>Cache-Aside:</strong> Application manages cache</li>
              <li><strong>Write-Through:</strong> Synchronous write to cache and DB</li>
              <li><strong>Write-Behind:</strong> Asynchronous write to DB</li>
              <li><strong>Refresh-Ahead:</strong> Proactive cache refresh</li>
            </ul>

            <h3>Common Use Cases</h3>
            <ul>
              <li>Session Storage</li>
              <li>Application Caching</li>
              <li>Real-time Analytics</li>
              <li>Message Queuing</li>
              <li>Leaderboards</li>
              <li>Rate Limiting</li>
            </ul>
          `
        }
      ]
    },
    {
      id: 'aerospike',
      title: 'Aerospike',
      subtopics: [
        {
          id: 'aerospike-fundamentals',
          title: 'Aerospike Fundamentals',
          content: `
            <h2>Aerospike</h2>
            <p>High-performance NoSQL database designed for speed and scale.</p>
            
            <h3>Architecture</h3>
            <ul>
              <li><strong>Hybrid Memory:</strong> RAM + SSD optimization</li>
              <li><strong>Shared-Nothing:</strong> Distributed architecture</li>
              <li><strong>Smart Client:</strong> Direct node communication</li>
              <li><strong>Automatic Sharding:</strong> Data distribution</li>
            </ul>

            <h3>Data Model</h3>
            <ul>
              <li><strong>Namespace:</strong> Database equivalent</li>
              <li><strong>Set:</strong> Table equivalent</li>
              <li><strong>Record:</strong> Row equivalent</li>
              <li><strong>Bins:</strong> Column equivalent</li>
              <li><strong>Key:</strong> Primary key</li>
            </ul>

            <h3>Key Features</h3>
            <ul>
              <li><strong>Sub-millisecond Latency:</strong> Predictable performance</li>
              <li><strong>Linear Scalability:</strong> Horizontal scaling</li>
              <li><strong>Strong Consistency:</strong> ACID transactions</li>
              <li><strong>High Availability:</strong> 99.999% uptime</li>
              <li><strong>Cross-Datacenter Replication:</strong> Global distribution</li>
            </ul>

            <h3>Storage Options</h3>
            <ul>
              <li><strong>In-Memory:</strong> Fastest access</li>
              <li><strong>SSD:</strong> Persistent storage</li>
              <li><strong>Hybrid:</strong> Index in memory, data on SSD</li>
            </ul>

            <h3>Use Cases</h3>
            <ul>
              <li>Real-time Bidding</li>
              <li>Fraud Detection</li>
              <li>Session Management</li>
              <li>IoT Data Processing</li>
              <li>Gaming Leaderboards</li>
            </ul>
          `
        }
      ]
    },
    {
      id: 'memcached',
      title: 'Memcached',
      subtopics: [
        {
          id: 'memcached-fundamentals',
          title: 'Memcached Fundamentals',
          content: `
            <h2>Memcached</h2>
            <p>High-performance, distributed memory object caching system.</p>
            
            <h3>Architecture</h3>
            <ul>
              <li><strong>Client-Server:</strong> Simple protocol</li>
              <li><strong>Distributed:</strong> Multiple server nodes</li>
              <li><strong>No Replication:</strong> Each item stored once</li>
              <li><strong>Hash-based:</strong> Key distribution</li>
            </ul>

            <h3>Key Characteristics</h3>
            <ul>
              <li><strong>In-Memory Only:</strong> No persistence</li>
              <li><strong>Key-Value Store:</strong> Simple data model</li>
              <li><strong>LRU Eviction:</strong> Least recently used</li>
              <li><strong>Thread-Safe:</strong> Multi-threaded</li>
              <li><strong>Protocol:</strong> Text and binary</li>
            </ul>

            <h3>Operations</h3>
            <ul>
              <li><strong>GET:</strong> Retrieve value by key</li>
              <li><strong>SET:</strong> Store key-value pair</li>
              <li><strong>ADD:</strong> Store if key doesn't exist</li>
              <li><strong>REPLACE:</strong> Update existing key</li>
              <li><strong>DELETE:</strong> Remove key</li>
              <li><strong>INCR/DECR:</strong> Atomic increment/decrement</li>
            </ul>

            <h3>Advantages</h3>
            <ul>
              <li><strong>High Performance:</strong> Microsecond latency</li>
              <li><strong>Simplicity:</strong> Easy to deploy and use</li>
              <li><strong>Scalability:</strong> Horizontal scaling</li>
              <li><strong>Memory Efficiency:</strong> Optimized memory usage</li>
            </ul>

            <h3>Limitations</h3>
            <ul>
              <li>No persistence</li>
              <li>No replication</li>
              <li>No complex data types</li>
              <li>No authentication</li>
            </ul>

            <h3>Use Cases</h3>
            <ul>
              <li>Web Application Caching</li>
              <li>Database Query Caching</li>
              <li>Session Storage</li>
              <li>API Response Caching</li>
            </ul>
          `
        }
      ]
    },
    {
      id: 'mongodb',
      title: 'MongoDB',
      subtopics: [
        {
          id: 'mongodb-fundamentals',
          title: 'MongoDB Fundamentals',
          content: `
            <h2>MongoDB</h2>
            <p>Document-oriented NoSQL database for modern applications.</p>
            
            <h3>Document Model</h3>
            <ul>
              <li><strong>BSON:</strong> Binary JSON format</li>
              <li><strong>Collections:</strong> Groups of documents</li>
              <li><strong>Documents:</strong> Key-value pairs</li>
              <li><strong>Fields:</strong> Data attributes</li>
              <li><strong>Embedded Documents:</strong> Nested structures</li>
            </ul>

            <h3>Key Features</h3>
            <ul>
              <li><strong>Schema Flexibility:</strong> Dynamic schema</li>
              <li><strong>Rich Query Language:</strong> Powerful queries</li>
              <li><strong>Indexing:</strong> Performance optimization</li>
              <li><strong>Aggregation:</strong> Data processing pipeline</li>
              <li><strong>Replication:</strong> High availability</li>
              <li><strong>Sharding:</strong> Horizontal scaling</li>
            </ul>

            <h3>CRUD Operations</h3>
            <ul>
              <li><strong>Create:</strong> insertOne(), insertMany()</li>
              <li><strong>Read:</strong> find(), findOne()</li>
              <li><strong>Update:</strong> updateOne(), updateMany()</li>
              <li><strong>Delete:</strong> deleteOne(), deleteMany()</li>
            </ul>

            <h3>Aggregation Framework</h3>
            <ul>
              <li><strong>Pipeline:</strong> Sequential data processing</li>
              <li><strong>Stages:</strong> $match, $group, $sort, $project</li>
              <li><strong>Operators:</strong> $sum, $avg, $min, $max</li>
              <li><strong>Lookup:</strong> Join operations</li>
            </ul>

            <h3>Indexing</h3>
            <ul>
              <li><strong>Single Field:</strong> Index on one field</li>
              <li><strong>Compound:</strong> Index on multiple fields</li>
              <li><strong>Text:</strong> Full-text search</li>
              <li><strong>Geospatial:</strong> Location-based queries</li>
            </ul>

            <h3>Use Cases</h3>
            <ul>
              <li>Content Management</li>
              <li>Real-time Analytics</li>
              <li>Internet of Things</li>
              <li>Mobile Applications</li>
              <li>Product Catalogs</li>
            </ul>
          `
        }
      ]
    },
    {
      id: 'neo4j',
      title: 'Neo4J',
      subtopics: [
        {
          id: 'neo4j-fundamentals',
          title: 'Neo4J Fundamentals',
          content: `
            <h2>Neo4J</h2>
            <p>Graph database management system for connected data.</p>
            
            <h3>Graph Model</h3>
            <ul>
              <li><strong>Nodes:</strong> Entities in the graph</li>
              <li><strong>Relationships:</strong> Connections between nodes</li>
              <li><strong>Properties:</strong> Key-value pairs on nodes/relationships</li>
              <li><strong>Labels:</strong> Node categories</li>
              <li><strong>Types:</strong> Relationship categories</li>
            </ul>

            <h3>Cypher Query Language</h3>
            <ul>
              <li><strong>Pattern Matching:</strong> (n)-[r]->(m)</li>
              <li><strong>CREATE:</strong> Create nodes and relationships</li>
              <li><strong>MATCH:</strong> Find patterns</li>
              <li><strong>WHERE:</strong> Filter conditions</li>
              <li><strong>RETURN:</strong> Specify output</li>
              <li><strong>MERGE:</strong> Create or match</li>
            </ul>

            <h3>Key Features</h3>
            <ul>
              <li><strong>ACID Transactions:</strong> Data consistency</li>
              <li><strong>Index-Free Adjacency:</strong> Fast traversals</li>
              <li><strong>High Performance:</strong> Optimized for relationships</li>
              <li><strong>Scalability:</strong> Horizontal and vertical scaling</li>
              <li><strong>Clustering:</strong> High availability</li>
            </ul>

            <h3>Graph Algorithms</h3>
            <ul>
              <li><strong>Pathfinding:</strong> Shortest path, A*</li>
              <li><strong>Centrality:</strong> PageRank, Betweenness</li>
              <li><strong>Community Detection:</strong> Louvain, Label Propagation</li>
              <li><strong>Similarity:</strong> Jaccard, Cosine</li>
            </ul>

            <h3>Use Cases</h3>
            <ul>
              <li>Social Networks</li>
              <li>Recommendation Engines</li>
              <li>Fraud Detection</li>
              <li>Knowledge Graphs</li>
              <li>Network Management</li>
              <li>Master Data Management</li>
            </ul>

            <h3>Advantages</h3>
            <ul>
              <li>Intuitive data modeling</li>
              <li>Fast relationship traversals</li>
              <li>Flexible schema</li>
              <li>Rich query language</li>
              <li>ACID compliance</li>
            </ul>
          `
        }
      ]
    },
    {
      id: 'mysql-sql',
      title: 'MySQL & SQL',
      subtopics: [
        {
          id: 'mysql-fundamentals',
          title: 'MySQL Fundamentals',
          content: `
            <h2>MySQL & SQL</h2>
            <p>Relational database management system and Structured Query Language.</p>
            
            <h3>SQL Fundamentals</h3>
            <ul>
              <li><strong>DDL:</strong> CREATE, ALTER, DROP (Data Definition)</li>
              <li><strong>DML:</strong> INSERT, UPDATE, DELETE (Data Manipulation)</li>
              <li><strong>DQL:</strong> SELECT (Data Query)</li>
              <li><strong>DCL:</strong> GRANT, REVOKE (Data Control)</li>
              <li><strong>TCL:</strong> COMMIT, ROLLBACK (Transaction Control)</li>
            </ul>

            <h3>MySQL Features</h3>
            <ul>
              <li><strong>Storage Engines:</strong> InnoDB, MyISAM</li>
              <li><strong>ACID Compliance:</strong> Transactions support</li>
              <li><strong>Replication:</strong> Master-slave, Master-master</li>
              <li><strong>Partitioning:</strong> Horizontal data splitting</li>
              <li><strong>Indexing:</strong> B-tree, Hash, Full-text</li>
            </ul>

            <h3>Query Optimization</h3>
            <ul>
              <li><strong>EXPLAIN:</strong> Query execution plan</li>
              <li><strong>Indexes:</strong> Primary, Secondary, Composite</li>
              <li><strong>Query Cache:</strong> Result caching</li>
              <li><strong>Partitioning:</strong> Data distribution</li>
              <li><strong>Normalization:</strong> Data organization</li>
            </ul>

            <h3>Advanced Features</h3>
            <ul>
              <li><strong>Stored Procedures:</strong> Server-side logic</li>
              <li><strong>Triggers:</strong> Automatic actions</li>
              <li><strong>Views:</strong> Virtual tables</li>
              <li><strong>Functions:</strong> Built-in and user-defined</li>
              <li><strong>JSON Support:</strong> Document storage</li>
            </ul>

            <h3>Performance Tuning</h3>
            <ul>
              <li><strong>Configuration:</strong> my.cnf optimization</li>
              <li><strong>Buffer Pool:</strong> Memory management</li>
              <li><strong>Connection Pooling:</strong> Resource management</li>
              <li><strong>Slow Query Log:</strong> Performance monitoring</li>
            </ul>

            <h3>Common Patterns</h3>
            <ul>
              <li>CRUD Operations</li>
              <li>Joins and Subqueries</li>
              <li>Aggregate Functions</li>
              <li>Window Functions</li>
              <li>Common Table Expressions</li>
            </ul>
          `
        }
      ]
    },
    {
      id: 'cassandra-hbase',
      title: 'Cassandra & HBase',
      subtopics: [
        {
          id: 'cassandra-hbase-fundamentals',
          title: 'Cassandra & HBase Fundamentals',
          content: `
            <h2>Cassandra & HBase</h2>
            <p>Distributed NoSQL databases for big data applications.</p>
            
            <h3>Apache Cassandra</h3>
            <ul>
              <li><strong>Architecture:</strong> Peer-to-peer, masterless</li>
              <li><strong>Data Model:</strong> Column-family (wide column)</li>
              <li><strong>Consistency:</strong> Tunable consistency levels</li>
              <li><strong>Partitioning:</strong> Consistent hashing</li>
              <li><strong>Replication:</strong> Multi-datacenter support</li>
            </ul>

            <h3>Apache HBase</h3>
            <ul>
              <li><strong>Architecture:</strong> Master-slave with HDFS</li>
              <li><strong>Data Model:</strong> Column-oriented</li>
              <li><strong>Consistency:</strong> Strong consistency</li>
              <li><strong>Storage:</strong> Hadoop Distributed File System</li>
              <li><strong>Integration:</strong> Hadoop ecosystem</li>
            </ul>

            <h3>Cassandra Features</h3>
            <ul>
              <li><strong>Linear Scalability:</strong> Add nodes easily</li>
              <li><strong>High Availability:</strong> No single point of failure</li>
              <li><strong>CQL:</strong> Cassandra Query Language</li>
              <li><strong>Materialized Views:</strong> Denormalized data</li>
              <li><strong>Lightweight Transactions:</strong> Compare-and-set</li>
            </ul>

            <h3>HBase Features</h3>
            <ul>
              <li><strong>Random Access:</strong> Real-time read/write</li>
              <li><strong>Automatic Sharding:</strong> Region splitting</li>
              <li><strong>Compression:</strong> Data compression</li>
              <li><strong>Versioning:</strong> Multiple versions per cell</li>
              <li><strong>Coprocessors:</strong> Server-side processing</li>
            </ul>

            <h3>Use Cases</h3>
            <h4>Cassandra:</h4>
            <ul>
              <li>Time-series data</li>
              <li>IoT applications</li>
              <li>Messaging systems</li>
              <li>Product catalogs</li>
            </ul>

            <h4>HBase:</h4>
            <ul>
              <li>Real-time analytics</li>
              <li>Content serving</li>
              <li>Log processing</li>
              <li>Search indexing</li>
            </ul>

            <h3>Comparison</h3>
            <table>
              <tr>
                <th>Feature</th>
                <th>Cassandra</th>
                <th>HBase</th>
              </tr>
              <tr>
                <td>Consistency</td>
                <td>Eventual (tunable)</td>
                <td>Strong</td>
              </tr>
              <tr>
                <td>Architecture</td>
                <td>Masterless</td>
                <td>Master-slave</td>
              </tr>
              <tr>
                <td>CAP Theorem</td>
                <td>AP (Availability, Partition tolerance)</td>
                <td>CP (Consistency, Partition tolerance)</td>
              </tr>
            </table>
          `
        }
      ]
    },
    {
      id: 'docker-containers',
      title: 'Docker & Container',
      subtopics: [
        {
          id: 'docker-fundamentals',
          title: 'Docker Fundamentals',
          content: `
            <h2>Docker & Containers</h2>
            <p>Containerization platform for application deployment and management.</p>
            
            <h3>Container Concepts</h3>
            <ul>
              <li><strong>Containerization:</strong> OS-level virtualization</li>
              <li><strong>Images:</strong> Read-only templates</li>
              <li><strong>Containers:</strong> Running instances of images</li>
              <li><strong>Layers:</strong> Incremental changes</li>
              <li><strong>Registry:</strong> Image storage and distribution</li>
            </ul>

            <h3>Docker Architecture</h3>
            <ul>
              <li><strong>Docker Engine:</strong> Container runtime</li>
              <li><strong>Docker Daemon:</strong> Background service</li>
              <li><strong>Docker CLI:</strong> Command-line interface</li>
              <li><strong>Docker API:</strong> RESTful API</li>
              <li><strong>Docker Hub:</strong> Public registry</li>
            </ul>

            <h3>Key Commands</h3>
            <ul>
              <li><strong>docker build:</strong> Create image from Dockerfile</li>
              <li><strong>docker run:</strong> Create and start container</li>
              <li><strong>docker ps:</strong> List running containers</li>
              <li><strong>docker exec:</strong> Execute command in container</li>
              <li><strong>docker stop/start:</strong> Control container lifecycle</li>
              <li><strong>docker pull/push:</strong> Image management</li>
            </ul>

            <h3>Dockerfile</h3>
            <ul>
              <li><strong>FROM:</strong> Base image</li>
              <li><strong>RUN:</strong> Execute commands</li>
              <li><strong>COPY/ADD:</strong> Copy files</li>
              <li><strong>WORKDIR:</strong> Set working directory</li>
              <li><strong>EXPOSE:</strong> Declare ports</li>
              <li><strong>CMD/ENTRYPOINT:</strong> Default command</li>
            </ul>

            <h3>Networking</h3>
            <ul>
              <li><strong>Bridge:</strong> Default network</li>
              <li><strong>Host:</strong> Host network</li>
              <li><strong>None:</strong> No networking</li>
              <li><strong>Custom:</strong> User-defined networks</li>
              <li><strong>Port Mapping:</strong> Host-container port binding</li>
            </ul>

            <h3>Storage</h3>
            <ul>
              <li><strong>Volumes:</strong> Persistent data storage</li>
              <li><strong>Bind Mounts:</strong> Host directory mounting</li>
              <li><strong>tmpfs:</strong> Temporary filesystem</li>
              <li><strong>Data Containers:</strong> Shared storage</li>
            </ul>

            <h3>Best Practices</h3>
            <ul>
              <li>Use multi-stage builds</li>
              <li>Minimize layer count</li>
              <li>Use .dockerignore</li>
              <li>Run as non-root user</li>
              <li>Keep containers stateless</li>
              <li>Use health checks</li>
            </ul>
          `
        }
      ]
    },
    {
      id: 'kubernetes',
      title: 'Kubernetes (K8s)',
      subtopics: [
        {
          id: 'kubernetes-fundamentals',
          title: 'Kubernetes Fundamentals',
          content: `
            <h2>Kubernetes (K8s)</h2>
            <p>Container orchestration platform for automating deployment, scaling, and management.</p>
            
            <h3>Core Components</h3>
            <ul>
              <li><strong>Master Node:</strong> Control plane</li>
              <li><strong>Worker Nodes:</strong> Application workloads</li>
              <li><strong>etcd:</strong> Distributed key-value store</li>
              <li><strong>API Server:</strong> Central management</li>
              <li><strong>Scheduler:</strong> Pod placement</li>
              <li><strong>Controller Manager:</strong> Cluster state management</li>
            </ul>

            <h3>Workload Objects</h3>
            <ul>
              <li><strong>Pod:</strong> Smallest deployable unit</li>
              <li><strong>ReplicaSet:</strong> Pod replication</li>
              <li><strong>Deployment:</strong> Declarative updates</li>
              <li><strong>StatefulSet:</strong> Stateful applications</li>
              <li><strong>DaemonSet:</strong> Node-level services</li>
              <li><strong>Job/CronJob:</strong> Batch workloads</li>
            </ul>

            <h3>Service Discovery</h3>
            <ul>
              <li><strong>Service:</strong> Stable network endpoint</li>
              <li><strong>ClusterIP:</strong> Internal cluster access</li>
              <li><strong>NodePort:</strong> External access via node</li>
              <li><strong>LoadBalancer:</strong> Cloud load balancer</li>
              <li><strong>Ingress:</strong> HTTP/HTTPS routing</li>
            </ul>

            <h3>Configuration</h3>
            <ul>
              <li><strong>ConfigMap:</strong> Configuration data</li>
              <li><strong>Secret:</strong> Sensitive data</li>
              <li><strong>Environment Variables:</strong> Runtime configuration</li>
              <li><strong>Volume Mounts:</strong> File-based configuration</li>
            </ul>

            <h3>Storage</h3>
            <ul>
              <li><strong>Persistent Volume (PV):</strong> Cluster storage</li>
              <li><strong>Persistent Volume Claim (PVC):</strong> Storage request</li>
              <li><strong>Storage Classes:</strong> Dynamic provisioning</li>
              <li><strong>Volume Types:</strong> Various storage backends</li>
            </ul>

            <h3>Scaling & Updates</h3>
            <ul>
              <li><strong>Horizontal Pod Autoscaler:</strong> Automatic scaling</li>
              <li><strong>Vertical Pod Autoscaler:</strong> Resource adjustment</li>
              <li><strong>Rolling Updates:</strong> Zero-downtime deployments</li>
              <li><strong>Blue-Green Deployments:</strong> Release strategies</li>
            </ul>

            <h3>Security</h3>
            <ul>
              <li><strong>RBAC:</strong> Role-based access control</li>
              <li><strong>Service Accounts:</strong> Pod identity</li>
              <li><strong>Network Policies:</strong> Traffic control</li>
              <li><strong>Pod Security Policies:</strong> Security constraints</li>
            </ul>

            <h3>kubectl Commands</h3>
            <ul>
              <li><strong>kubectl get:</strong> List resources</li>
              <li><strong>kubectl describe:</strong> Detailed information</li>
              <li><strong>kubectl apply:</strong> Deploy resources</li>
              <li><strong>kubectl delete:</strong> Remove resources</li>
              <li><strong>kubectl logs:</strong> View logs</li>
              <li><strong>kubectl exec:</strong> Execute commands</li>
            </ul>
          `
        }
      ]
    },
    {
      id: 'aws',
      title: 'AWS',
      subtopics: [
        {
          id: 'aws-fundamentals',
          title: 'AWS Fundamentals',
          content: `
            <h2>Amazon Web Services (AWS)</h2>
            <p>Cloud computing platform offering a wide range of services.</p>
            
            <h3>Core Services</h3>
            <ul>
              <li><strong>EC2:</strong> Elastic Compute Cloud (Virtual Servers)</li>
              <li><strong>S3:</strong> Simple Storage Service (Object Storage)</li>
              <li><strong>RDS:</strong> Relational Database Service</li>
              <li><strong>VPC:</strong> Virtual Private Cloud (Networking)</li>
              <li><strong>IAM:</strong> Identity and Access Management</li>
              <li><strong>Lambda:</strong> Serverless Computing</li>
            </ul>

            <h3>Compute Services</h3>
            <ul>
              <li><strong>EC2:</strong> Virtual machines</li>
              <li><strong>Lambda:</strong> Function as a Service</li>
              <li><strong>ECS:</strong> Container orchestration</li>
              <li><strong>EKS:</strong> Managed Kubernetes</li>
              <li><strong>Fargate:</strong> Serverless containers</li>
              <li><strong>Batch:</strong> Batch processing</li>
            </ul>

            <h3>Storage Services</h3>
            <ul>
              <li><strong>S3:</strong> Object storage</li>
              <li><strong>EBS:</strong> Block storage</li>
              <li><strong>EFS:</strong> File storage</li>
              <li><strong>Glacier:</strong> Archive storage</li>
              <li><strong>Storage Gateway:</strong> Hybrid storage</li>
            </ul>

            <h3>Database Services</h3>
            <ul>
              <li><strong>RDS:</strong> Managed relational databases</li>
              <li><strong>DynamoDB:</strong> NoSQL database</li>
              <li><strong>ElastiCache:</strong> In-memory caching</li>
              <li><strong>Redshift:</strong> Data warehousing</li>
              <li><strong>DocumentDB:</strong> MongoDB-compatible</li>
            </ul>

            <h3>Networking</h3>
            <ul>
              <li><strong>VPC:</strong> Virtual private cloud</li>
              <li><strong>Route 53:</strong> DNS service</li>
              <li><strong>CloudFront:</strong> Content delivery network</li>
              <li><strong>ELB:</strong> Elastic Load Balancing</li>
              <li><strong>API Gateway:</strong> API management</li>
            </ul>

            <h3>Security & Identity</h3>
            <ul>
              <li><strong>IAM:</strong> Identity and access management</li>
              <li><strong>Cognito:</strong> User authentication</li>
              <li><strong>KMS:</strong> Key management service</li>
              <li><strong>WAF:</strong> Web application firewall</li>
              <li><strong>Shield:</strong> DDoS protection</li>
            </ul>

            <h3>Monitoring & Management</h3>
            <ul>
              <li><strong>CloudWatch:</strong> Monitoring and logging</li>
              <li><strong>CloudTrail:</strong> API logging</li>
              <li><strong>Config:</strong> Resource configuration</li>
              <li><strong>Systems Manager:</strong> Operational insights</li>
              <li><strong>X-Ray:</strong> Distributed tracing</li>
            </ul>

            <h3>Well-Architected Framework</h3>
            <ul>
              <li><strong>Operational Excellence:</strong> Operations automation</li>
              <li><strong>Security:</strong> Data protection</li>
              <li><strong>Reliability:</strong> System resilience</li>
              <li><strong>Performance Efficiency:</strong> Resource optimization</li>
              <li><strong>Cost Optimization:</strong> Cost management</li>
            </ul>

            <h3>Common Patterns</h3>
            <ul>
              <li>Three-tier architecture</li>
              <li>Microservices with containers</li>
              <li>Serverless applications</li>
              <li>Data lakes and analytics</li>
              <li>Disaster recovery</li>
            </ul>
          `
        }
      ]
                }
    ]
  }; 