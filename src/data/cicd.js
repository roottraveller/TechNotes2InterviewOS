export const cicd = {
  id: 'cicd',
  title: 'CI/CD (Continuous Integration/Continuous Deployment)',
  content: `
    <p>CI/CD (Continuous Integration/Continuous Deployment) is a software development methodology that automates the integration, testing, and deployment of code changes. This practice enables teams to deliver software faster, more reliably, and with higher quality by automating repetitive tasks and providing rapid feedback on code changes.</p>

    <details>
      <summary><strong>Real-World Example: Netflix's Deployment Pipeline</strong></summary>
      <div class="info-note">
        Netflix deploys code to production over 4,000 times per day using their sophisticated CI/CD pipeline. When a developer commits code, it automatically triggers builds, runs 100+ automated tests, deploys to staging environments, and if all checks pass, automatically deploys to production within 16 minutes. This enables Netflix to rapidly iterate features and fix issues while serving 230+ million subscribers globally.
      </div>
    </details>

    <h3>Core Concepts & Philosophy</h3>
    <p>CI/CD represents a fundamental shift from traditional software development practices, emphasizing automation, rapid feedback, and continuous improvement.</p>

    <h4>Continuous Integration (CI)</h4>
    <p><strong>Definition:</strong> The practice of automatically integrating code changes from multiple developers into a shared repository frequently, typically multiple times per day.</p>

    <p><strong>Key Principles:</strong></p>
    <ul>
      <li><strong>Frequent Integration:</strong> Developers commit code changes at least daily</li>
      <li><strong>Automated Builds:</strong> Every commit triggers an automated build process</li>
      <li><strong>Comprehensive Testing:</strong> Automated tests run on every integration</li>
      <li><strong>Fast Feedback:</strong> Developers receive immediate notification of build/test failures</li>
      <li><strong>Shared Responsibility:</strong> Team collectively maintains build health</li>
    </ul>

    <details>
      <summary><strong>Example: Google's Code Integration Process</strong></summary>
      <div class="info-note">
        Google's engineering teams make over 25,000 code commits daily to their monorepo. Their CI system automatically builds, tests, and validates each change within 10 minutes. If any tests fail, the commit is automatically blocked from merging, and the developer receives immediate feedback. This process ensures that Google's massive codebase remains stable despite constant changes from 25,000+ engineers.
      </div>
    </details>

    <h4>Continuous Deployment (CD)</h4>
    <p><strong>Definition:</strong> The automated process of deploying code changes to production environments after passing all tests and quality gates, without manual intervention.</p>

    <p><strong>Key Components:</strong></p>
    <ul>
      <li><strong>Automated Deployment:</strong> Code automatically deployed to production after validation</li>
      <li><strong>Environment Promotion:</strong> Systematic progression through dev → test → staging → production</li>
      <li><strong>Rollback Mechanisms:</strong> Automated reversion capabilities for failed deployments</li>
      <li><strong>Infrastructure as Code:</strong> Environment configuration managed through version control</li>
      <li><strong>Monitoring Integration:</strong> Real-time health checks and performance monitoring</li>
    </ul>

    <h4>Continuous Delivery vs. Continuous Deployment</h4>
    <table>
      <thead>
        <tr>
          <th>Aspect</th>
          <th>Continuous Delivery</th>
          <th>Continuous Deployment</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Definition</td>
          <td>Code is always ready for production deployment</td>
          <td>Code is automatically deployed to production</td>
        </tr>
        <tr>
          <td>Manual Step</td>
          <td>Manual approval required for production deployment</td>
          <td>Fully automated deployment to production</td>
        </tr>
        <tr>
          <td>Risk Level</td>
          <td>Lower risk due to manual gate</td>
          <td>Higher risk but faster feedback</td>
        </tr>
        <tr>
          <td>Speed</td>
          <td>Slower due to manual approval process</td>
          <td>Fastest possible deployment</td>
        </tr>
        <tr>
          <td>Use Cases</td>
          <td>Regulated industries, critical systems</td>
          <td>Web applications, SaaS platforms</td>
        </tr>
      </tbody>
    </table>

    <h3>CI/CD Pipeline Architecture</h3>
    <p>A typical CI/CD pipeline consists of interconnected stages that automate the software delivery process from code commit to production deployment.</p>

    <h4>Pipeline Stages & Flow</h4>
    <div class="code-block">
      <pre><code>CI/CD Pipeline Flow:
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Source    │───▶│    Build    │───▶│    Test     │───▶│   Deploy    │
│ (Git Commit)│    │ (Compile)   │    │(Unit/E2E)   │    │(Staging)    │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
                                                                  │
┌─────────────┐    ┌─────────────┐    ┌─────────────┐            │
│   Monitor   │◀───│ Production  │◀───│   Release   │◀───────────┘
│ (Metrics)   │    │ (Deploy)    │    │ (Approval)  │
└─────────────┘    └─────────────┘    └─────────────┘</code></pre>
    </div>

    <h4>Stage Details</h4>
    <p><strong>1. Source Stage:</strong></p>
    <ul>
      <li>Code commit triggers pipeline execution</li>
      <li>Version control system integration (Git, SVN)</li>
      <li>Branch strategy implementation (GitFlow, GitHub Flow)</li>
      <li>Webhook or polling-based trigger mechanisms</li>
    </ul>

    <p><strong>2. Build Stage:</strong></p>
    <ul>
      <li>Source code compilation and packaging</li>
      <li>Dependency resolution and management</li>
      <li>Artifact generation (JAR, Docker images, etc.)</li>
      <li>Build optimization and caching strategies</li>
    </ul>

    <p><strong>3. Test Stage:</strong></p>
    <ul>
      <li>Unit tests for individual components</li>
      <li>Integration tests for system interactions</li>
      <li>End-to-end tests for user workflows</li>
      <li>Security and performance testing</li>
    </ul>

    <p><strong>4. Deploy Stage:</strong></p>
    <ul>
      <li>Environment provisioning and configuration</li>
      <li>Application deployment automation</li>
      <li>Database migrations and schema updates</li>
      <li>Health checks and smoke tests</li>
    </ul>

    <details>
      <summary><strong>Example: Spotify's Deployment Pipeline</strong></summary>
      <div class="info-note">
        Spotify's CI/CD pipeline processes over 10,000 deployments daily across 100+ microservices. Their pipeline includes automated testing with 95% code coverage, canary deployments that gradually roll out changes to 1% of users first, and automated rollback if error rates exceed 0.1%. This approach allows Spotify to maintain 99.95% uptime while continuously delivering new features to 400+ million users.
      </div>
    </details>

    <h3>CI/CD Tools & Platforms</h3>
    <p>Modern CI/CD ecosystems offer various tools and platforms, each with distinct strengths and integration capabilities.</p>

    <h4>Popular CI/CD Platforms</h4>
    <table>
      <thead>
        <tr>
          <th>Platform</th>
          <th>Type</th>
          <th>Strengths</th>
          <th>Best For</th>
          <th>Pricing</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Jenkins</td>
          <td>Self-hosted</td>
          <td>Flexibility, Plugin ecosystem</td>
          <td>Enterprise, Custom workflows</td>
          <td>Free (Open source)</td>
        </tr>
        <tr>
          <td>GitHub Actions</td>
          <td>Cloud-native</td>
          <td>GitHub integration, Marketplace</td>
          <td>GitHub-hosted projects</td>
          <td>Free tier + Usage</td>
        </tr>
        <tr>
          <td>GitLab CI</td>
          <td>Integrated</td>
          <td>Built-in DevOps platform</td>
          <td>GitLab users, DevOps teams</td>
          <td>Free tier + Plans</td>
        </tr>
        <tr>
          <td>Azure DevOps</td>
          <td>Cloud/Hybrid</td>
          <td>Microsoft ecosystem integration</td>
          <td>.NET applications, Azure</td>
          <td>Free tier + Usage</td>
        </tr>
        <tr>
          <td>CircleCI</td>
          <td>Cloud-native</td>
          <td>Speed, Docker support</td>
          <td>Fast builds, Containerized apps</td>
          <td>Free tier + Plans</td>
        </tr>
        <tr>
          <td>AWS CodePipeline</td>
          <td>Cloud-native</td>
          <td>AWS integration, Scalability</td>
          <td>AWS-hosted applications</td>
          <td>Pay-per-use</td>
        </tr>
      </tbody>
    </table>

    <h4>Tool Configuration Examples</h4>
    <div class="code-block">
      <h5>GitHub Actions Workflow:</h5>
      <pre><code>name: CI/CD Pipeline
on: [push, pull_request]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
      - name: Build application
        run: npm run build
      - name: Deploy to staging
        if: github.ref == 'refs/heads/main'
        run: npm run deploy:staging</code></pre>
    </div>

    <div class="code-block">
      <h5>Jenkins Pipeline (Jenkinsfile):</h5>
      <pre><code>pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'mvn clean compile'
            }
        }
        stage('Test') {
            steps {
                sh 'mvn test'
                publishTestResults testResultsPattern: 'target/surefire-reports/*.xml'
            }
        }
        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                sh 'mvn deploy'
            }
        }
    }
}</code></pre>
    </div>

    <details>
      <summary><strong>Example: Airbnb's CI/CD Infrastructure</strong></summary>
      <div class="info-note">
        Airbnb uses a custom CI/CD platform built on Kubernetes that processes 500+ deployments daily. Their system includes automated testing with 200,000+ tests, progressive deployment strategies, and real-time monitoring. When deploying to production, they use blue-green deployments with automated health checks, allowing them to serve 100+ million users with 99.9% availability while maintaining rapid development velocity.
      </div>
    </details>

    <h3>Implementation Best Practices</h3>
    <p>Successful CI/CD implementation requires adherence to proven practices that ensure reliability, speed, and maintainability.</p>

    <h4>1. Build & Test Optimization</h4>
    <ul>
      <li><strong>Fast Builds:</strong> Keep build times under 10 minutes through parallelization and caching</li>
      <li><strong>Test Pyramid:</strong> Maintain 70% unit tests, 20% integration tests, 10% E2E tests</li>
      <li><strong>Fail Fast:</strong> Run fastest tests first to provide immediate feedback</li>
      <li><strong>Parallel Execution:</strong> Run independent tests concurrently to reduce total time</li>
    </ul>

    <h4>2. Deployment Strategies</h4>
    <div class="code-block">
      <pre><code>Deployment Strategy Comparison:

Blue-Green Deployment:
- Zero downtime deployment
- Instant rollback capability
- Requires 2x infrastructure

Rolling Deployment:
- Gradual instance replacement
- Minimal infrastructure overhead
- Slower rollback process

Canary Deployment:
- Risk mitigation through gradual rollout
- Real user feedback on small subset
- Complex monitoring requirements</code></pre>
    </div>

    <h4>3. Security Integration</h4>
    <ul>
      <li><strong>Secrets Management:</strong> Use secure vaults for API keys and credentials</li>
      <li><strong>Dependency Scanning:</strong> Automated vulnerability detection in dependencies</li>
      <li><strong>Code Analysis:</strong> Static security analysis in build pipeline</li>
      <li><strong>Access Control:</strong> Role-based permissions for pipeline operations</li>
    </ul>

    <h4>4. Monitoring & Observability</h4>
    <ul>
      <li><strong>Pipeline Metrics:</strong> Track build success rates, deployment frequency, lead time</li>
      <li><strong>Application Monitoring:</strong> Real-time health checks and performance metrics</li>
      <li><strong>Alerting:</strong> Automated notifications for failures and anomalies</li>
      <li><strong>Logging:</strong> Centralized log aggregation and analysis</li>
    </ul>

    <details>
      <summary><strong>Example: Facebook's Continuous Deployment</strong></summary>
      <div class="info-note">
        Facebook (Meta) deploys code to production twice daily for their main application serving 3+ billion users. Their CI/CD system includes 100,000+ automated tests, gradual rollout to 1% of users first, real-time monitoring of 1,000+ metrics, and automated rollback if any metric degrades beyond thresholds. This process allows them to maintain platform stability while shipping new features rapidly.
      </div>
    </details>

    <h3>Advanced CI/CD Patterns</h3>
    <p>Sophisticated organizations implement advanced patterns to handle complex deployment scenarios and organizational requirements.</p>

    <h4>1. GitOps Methodology</h4>
    <p><strong>Concept:</strong> Infrastructure and application configuration managed through Git repositories with automated synchronization.</p>

    <div class="code-block">
      <pre><code>GitOps Workflow:
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Config    │───▶│    Git      │───▶│ Kubernetes  │
│   Change    │    │ Repository  │    │   Cluster   │
└─────────────┘    └─────────────┘    └─────────────┘
                           │                   │
                           ▼                   ▼
                  ┌─────────────┐    ┌─────────────┐
                  │   ArgoCD    │───▶│Application  │
                  │  (Sync)     │    │ Deployment  │
                  └─────────────┘    └─────────────┘</code></pre>
    </div>

    <h4>2. Feature Flags Integration</h4>
    <p><strong>Benefits:</strong></p>
    <ul>
      <li>Decouple deployment from feature release</li>
      <li>Enable gradual feature rollouts</li>
      <li>Instant feature disabling without deployment</li>
      <li>A/B testing and experimentation capabilities</li>
    </ul>

    <h4>3. Multi-Environment Strategies</h4>
    <div class="code-block">
      <pre><code>Environment Promotion Pipeline:
Development → Testing → Staging → Production

Environment-Specific Configurations:
- Database connections
- API endpoints
- Feature flags
- Resource limits
- Security policies</code></pre>
    </div>

    <h3>Metrics & KPIs</h3>
    <p>Measuring CI/CD effectiveness requires tracking key performance indicators that reflect both process efficiency and business impact.</p>

    <h4>DORA Metrics (DevOps Research & Assessment)</h4>
    <table>
      <thead>
        <tr>
          <th>Metric</th>
          <th>Description</th>
          <th>Elite Performance</th>
          <th>High Performance</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Deployment Frequency</td>
          <td>How often code is deployed</td>
          <td>Multiple times per day</td>
          <td>Once per day to once per week</td>
        </tr>
        <tr>
          <td>Lead Time</td>
          <td>Time from commit to production</td>
          <td>Less than 1 hour</td>
          <td>1 day to 1 week</td>
        </tr>
        <tr>
          <td>Mean Time to Recovery</td>
          <td>Time to restore service after failure</td>
          <td>Less than 1 hour</td>
          <td>Less than 1 day</td>
        </tr>
        <tr>
          <td>Change Failure Rate</td>
          <td>Percentage of deployments causing failures</td>
          <td>0-15%</td>
          <td>16-30%</td>
        </tr>
      </tbody>
    </table>

    <h4>Additional Metrics</h4>
    <ul>
      <li><strong>Build Success Rate:</strong> Percentage of successful builds</li>
      <li><strong>Test Coverage:</strong> Percentage of code covered by automated tests</li>
      <li><strong>Pipeline Duration:</strong> Total time from commit to deployment</li>
      <li><strong>Rollback Frequency:</strong> How often deployments are rolled back</li>
    </ul>

    <h3>Common Challenges & Solutions</h3>
    <p>Organizations implementing CI/CD face predictable challenges that can be addressed through proven strategies and solutions.</p>

    <h4>1. Cultural Resistance</h4>
    <ul>
      <li><strong>Challenge:</strong> Teams resistant to automation and frequent deployments</li>
      <li><strong>Solution:</strong> Gradual adoption, training, and demonstrating quick wins</li>
      <li><strong>Best Practice:</strong> Start with non-critical applications and expand gradually</li>
    </ul>

    <h4>2. Test Automation Gaps</h4>
    <ul>
      <li><strong>Challenge:</strong> Insufficient test coverage leading to production issues</li>
      <li><strong>Solution:</strong> Implement comprehensive test strategy with clear coverage targets</li>
      <li><strong>Best Practice:</strong> Require minimum 80% test coverage for all new code</li>
    </ul>

    <h4>3. Environment Consistency</h4>
    <ul>
      <li><strong>Challenge:</strong> "Works on my machine" syndrome</li>
      <li><strong>Solution:</strong> Containerization and Infrastructure as Code</li>
      <li><strong>Best Practice:</strong> Use identical environments across all stages</li>
    </ul>

    <h4>4. Security Integration</h4>
    <ul>
      <li><strong>Challenge:</strong> Security as bottleneck in rapid deployment</li>
      <li><strong>Solution:</strong> Shift-left security with automated scanning and testing</li>
      <li><strong>Best Practice:</strong> Integrate security checks into every pipeline stage</li>
    </ul>

    <details>
      <summary><strong>Example: Etsy's CI/CD Evolution</strong></summary>
      <div class="info-note">
        Etsy transformed from deploying twice weekly to 50+ times daily by implementing comprehensive CI/CD practices. They introduced feature flags for 90% of new features, automated testing with 95% coverage, and continuous monitoring with 200+ metrics. This transformation reduced their mean time to recovery from 4 hours to 12 minutes while maintaining 99.9% uptime for their marketplace serving millions of sellers and buyers.
      </div>
    </details>

    <h3>Conclusion</h3>
    <p>CI/CD represents a fundamental shift in software development, enabling organizations to deliver value faster, more reliably, and with higher quality. Success requires not just tool adoption, but cultural transformation, process optimization, and continuous improvement.</p>

    <p>Key success factors for CI/CD implementation:</p>
    <ul>
      <li><strong>Automation First:</strong> Automate repetitive tasks to reduce errors and increase speed</li>
      <li><strong>Quality Gates:</strong> Implement comprehensive testing and quality checks</li>
      <li><strong>Monitoring:</strong> Continuous monitoring of both pipeline and application health</li>
      <li><strong>Culture:</strong> Foster collaboration and shared responsibility for quality</li>
      <li><strong>Incremental Adoption:</strong> Start small and gradually expand CI/CD practices</li>
    </ul>

    <p>As software systems become more complex and user expectations for reliability and speed increase, CI/CD practices will continue evolving with new technologies, methodologies, and tools to meet these demands.</p>

    <h3>References</h3>
    <ul>
      <li><a href="https://martinfowler.com/articles/continuousIntegration.html" target="_blank">Continuous Integration - Martin Fowler</a></li>
      <li><a href="https://www.atlassian.com/continuous-delivery/principles" target="_blank">Continuous Delivery Principles - Atlassian</a></li>
      <li><a href="https://cloud.google.com/architecture/devops" target="_blank">DevOps and CI/CD - Google Cloud</a></li>
      <li><a href="https://github.com/features/actions" target="_blank">GitHub Actions Documentation</a></li>
      <li><a href="https://www.jenkins.io/doc/" target="_blank">Jenkins Documentation</a></li>
    </ul>
  `
}; 