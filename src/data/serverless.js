export const serverless = {
  id: 'serverless',
  title: 'Serverless Computing',
  content: `
## Definition
Serverless computing is a cloud execution model where the cloud provider manages server infrastructure, automatically scaling and charging only for actual usage. Functions scale from 0 to thousands of instances in seconds.

## Core Characteristics & Impact
| Characteristic | Traditional Server | Serverless | Business Impact |
|---------------|-------------------|------------|-----------------|
| **Scaling** | Manual/Auto-scaling groups | 0 to 1000+ instances in seconds | 99.9% availability |
| **Cost** | Fixed server costs | Pay-per-100ms execution | 70-90% cost reduction |
| **Management** | OS, security, patches | Zero infrastructure management | 80% less ops overhead |
| **Cold Start** | Always warm | 50-3000ms initial latency | User experience consideration |

## Major Platforms Comparison
| Platform | Cold Start | Max Duration | Memory | Pricing | Market Share |
|----------|------------|--------------|--------|---------|--------------|
| **AWS Lambda** | 50-1000ms | 15 minutes | 128MB-10GB | $0.20/1M requests | 50% |
| **Azure Functions** | 100-2000ms | 10 minutes | 128MB-1.5GB | $0.20/1M requests | 20% |
| **Google Cloud Functions** | 100-3000ms | 9 minutes | 128MB-8GB | $0.40/1M requests | 15% |
| **Cloudflare Workers** | <1ms (edge) | 50ms CPU time | 128MB | $0.50/1M requests | 10% |

## Function as a Service (FaaS) Deep Dive

### AWS Lambda Architecture
\`\`\`javascript
// Lambda function structure
exports.handler = async (event, context) => {
    // Cold start optimization
    if (!global.dbConnection) {
        global.dbConnection = await createConnection();
    }
    
    try {
        const result = await processEvent(event);
        return {
            statusCode: 200,
            body: JSON.stringify(result)
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }
};
\`\`\`

### Event Sources & Triggers
\`\`\`yaml
# Common Lambda triggers
HTTP_API:          # API Gateway - REST/HTTP APIs
  latency: 1-10ms
  use_case: Web APIs, microservices

S3_EVENTS:         # File upload/delete
  latency: 100-1000ms  
  use_case: Image processing, ETL

DYNAMODB_STREAMS:  # Database changes
  latency: 100-500ms
  use_case: Real-time analytics, sync

CLOUDWATCH_EVENTS: # Scheduled tasks
  latency: Variable
  use_case: Cron jobs, maintenance

SQS_MESSAGES:      # Queue processing
  latency: 1-10ms
  use_case: Async processing, decoupling
\`\`\`

## Backend as a Service (BaaS)
\`\`\`javascript
// Firebase example - real-time database
import { initializeApp } from 'firebase/app';
import { getFirestore, onSnapshot } from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Real-time listener
onSnapshot(collection(db, 'orders'), (snapshot) => {
    snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
            processNewOrder(change.doc.data());
        }
    });
});
\`\`\`

## Performance Optimization

### Cold Start Mitigation
\`\`\`javascript
// 1. Connection pooling outside handler
const mysql = require('mysql2/promise');
let connection;

const getConnection = async () => {
    if (!connection) {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
    }
    return connection;
};

// 2. Provisioned concurrency (AWS)
// Pre-warm functions to avoid cold starts
// Cost: $0.015 per GB-hour provisioned

// 3. Keep functions warm
const keepWarm = () => {
    setInterval(() => {
        // Ping function every 5 minutes
        lambda.invoke({
            FunctionName: 'myFunction',
            Payload: JSON.stringify({ warmup: true })
        });
    }, 5 * 60 * 1000);
};
\`\`\`

### Memory vs Performance Trade-offs
\`\`\`bash
# AWS Lambda pricing & performance
128MB:  $0.0000000021 per 100ms | CPU: 0.5 cores
512MB:  $0.0000000083 per 100ms | CPU: 2.0 cores  
1024MB: $0.0000000167 per 100ms | CPU: 4.0 cores
3008MB: $0.0000000500 per 100ms | CPU: 6.0 cores

# Sweet spot: 1024MB for most workloads
# 4x memory = 2x faster execution = same cost
\`\`\`

## Real-World Use Cases

### Netflix - Content Processing
- **Scale**: 1 trillion+ function executions/month
- **Use Case**: Video encoding, thumbnail generation
- **Cost Savings**: 80% reduction vs EC2 instances
\`\`\`python
# Video processing pipeline
def lambda_handler(event, context):
    s3_bucket = event['Records'][0]['s3']['bucket']['name']
    s3_key = event['Records'][0]['s3']['object']['key']
    
    # Trigger video encoding job
    mediaconvert.create_job({
        'Role': 'arn:aws:iam::account:role/MediaConvertRole',
        'Settings': {
            'Inputs': [{
                'FileInput': f's3://{s3_bucket}/{s3_key}'
            }],
            'OutputGroups': [...]
        }
    })
\`\`\`

### Uber - Real-time Data Processing
- **Scale**: 100M+ rides processed/day
- **Use Case**: Surge pricing, driver matching
- **Latency**: <100ms response time
\`\`\`javascript
// Surge pricing calculation
exports.calculateSurge = async (event) => {
    const { lat, lng, timestamp } = JSON.parse(event.body);
    
    // Get real-time demand/supply data
    const demand = await getDemandMetrics(lat, lng);
    const supply = await getSupplyMetrics(lat, lng);
    
    // Calculate surge multiplier
    const surgeMultiplier = Math.min(
        Math.max(demand / supply, 1.0),
        5.0  // Max 5x surge
    );
    
    return {
        statusCode: 200,
        body: JSON.stringify({ surgeMultiplier })
    };
};
\`\`\`

### Airbnb - Image Processing
- **Scale**: 100M+ images processed/year
- **Use Case**: Photo optimization, ML inference
- **Cost**: 90% reduction vs dedicated servers
\`\`\`python
import boto3
from PIL import Image

def lambda_handler(event, context):
    s3 = boto3.client('s3')
    
    # Download image from S3
    bucket = event['bucket']
    key = event['key']
    
    # Process image
    img = Image.open(s3.get_object(Bucket=bucket, Key=key)['Body'])
    
    # Generate thumbnails
    sizes = [(150, 150), (300, 300), (800, 600)]
    for size in sizes:
        thumbnail = img.copy()
        thumbnail.thumbnail(size, Image.LANCZOS)
        
        # Upload processed image
        s3.put_object(
            Bucket=bucket,
            Key=f'thumbnails/{size[0]}x{size[1]}/{key}',
            Body=thumbnail_bytes
        )
\`\`\`

## Serverless Architecture Patterns

### 1. Microservices Pattern
\`\`\`yaml
# Each function = single responsibility
user-service:     # User CRUD operations
order-service:    # Order processing
payment-service:  # Payment handling
notification-service: # Email/SMS notifications

# API Gateway routes to appropriate functions
GET  /users/{id}     → user-service
POST /orders         → order-service  
POST /payments       → payment-service
\`\`\`

### 2. Event-Driven Pattern
\`\`\`javascript
// Order processing workflow
1. Order Created → Lambda triggers payment processing
2. Payment Success → Lambda triggers inventory update
3. Inventory Updated → Lambda sends confirmation email
4. Email Sent → Lambda updates analytics

// Event flow
S3 Upload → Lambda → DynamoDB → Lambda → SNS → Lambda
\`\`\`

### 3. CQRS with Serverless
\`\`\`javascript
// Command side - write operations
exports.createOrder = async (event) => {
    const order = JSON.parse(event.body);
    
    // Write to command store
    await dynamodb.putItem({
        TableName: 'orders-commands',
        Item: order
    });
    
    // Publish event
    await sns.publish({
        TopicArn: 'order-events',
        Message: JSON.stringify({ type: 'OrderCreated', data: order })
    });
};

// Query side - read operations  
exports.getOrderHistory = async (event) => {
    const userId = event.pathParameters.userId;
    
    // Read from optimized query store
    const orders = await dynamodb.query({
        TableName: 'orders-query',
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: { ':userId': userId }
    });
    
    return { statusCode: 200, body: JSON.stringify(orders.Items) };
};
\`\`\`

## Security Best Practices
\`\`\`javascript
// 1. IAM least privilege
{
    "Version": "2012-10-17",
    "Statement": [{
        "Effect": "Allow",
        "Action": [
            "dynamodb:GetItem",
            "dynamodb:PutItem"
        ],
        "Resource": "arn:aws:dynamodb:region:account:table/specific-table"
    }]
}

// 2. Environment variables for secrets
const dbPassword = process.env.DB_PASSWORD;  // From AWS Secrets Manager

// 3. Input validation
const validateInput = (event) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        name: Joi.string().min(1).max(100).required()
    });
    
    return schema.validate(JSON.parse(event.body));
};

// 4. API rate limiting
const rateLimit = require('lambda-rate-limiter')({
    interval: 60000,  // 1 minute
    uniqueTokenPerInterval: 500
});
\`\`\`

## Monitoring & Observability
\`\`\`javascript
// AWS X-Ray tracing
const AWSXRay = require('aws-xray-sdk-core');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));

exports.handler = async (event, context) => {
    const segment = AWSXRay.getSegment();
    const subsegment = segment.addNewSubsegment('database-query');
    
    try {
        const result = await dynamodb.getItem(params).promise();
        subsegment.close();
        return result;
    } catch (error) {
        subsegment.addError(error);
        subsegment.close();
        throw error;
    }
};

// CloudWatch custom metrics
const cloudwatch = new AWS.CloudWatch();
await cloudwatch.putMetricData({
    Namespace: 'MyApp/Orders',
    MetricData: [{
        MetricName: 'OrderProcessingTime',
        Value: processingTime,
        Unit: 'Milliseconds'
    }]
}).promise();
\`\`\`

## Cost Optimization Strategies
\`\`\`bash
# 1. Right-size memory allocation
# Test different memory sizes for optimal price/performance

# 2. Use ARM-based Graviton2 processors (20% better price/performance)
Runtime: nodejs18.x-arm64

# 3. Optimize cold starts
# Bundle size: <10MB for faster cold starts
# Use webpack/esbuild for smaller bundles

# 4. Reserved capacity for predictable workloads
# 1-year term: 17% discount
# 3-year term: 42% discount

# Example cost calculation:
# 1M requests/month, 512MB, 200ms avg duration
# On-demand: $8.35/month
# Provisioned (100 concurrent): $21.60/month + $0.83 requests = $22.43
# Use provisioned only for steady traffic
\`\`\`

## Interview Questions & Answers

**Q: What is cold start and how do you minimize it?**
A: Cold start is 50-3000ms latency when initializing a new function instance. Minimize by:
- Keep functions <10MB bundle size
- Use provisioned concurrency for critical functions  
- Connection pooling outside handler
- Choose optimal memory allocation (1024MB sweet spot)

**Q: When should you NOT use serverless?**
A: Avoid serverless for:
- Long-running processes (>15 min AWS Lambda limit)
- High-frequency, low-latency requirements (<10ms)
- Applications requiring persistent connections
- Heavy computational workloads (GPU processing)
- When you need full control over infrastructure

**Q: How do you handle state in stateless functions?**
A: 
- **External storage**: DynamoDB, Redis, S3 for persistent state
- **Event sourcing**: Store events, rebuild state from event stream
- **Step Functions**: Orchestrate stateful workflows across functions
- **Global variables**: For connection pooling (survives container reuse)

**Q: Explain serverless pricing model.**
A: Pay for:
- **Requests**: $0.20 per 1M requests (AWS Lambda)
- **Duration**: $0.0000000021 per 100ms per 128MB
- **No idle costs**: Unlike EC2 instances
- **Additional costs**: API Gateway, data transfer, storage
- **Cost optimization**: Right-size memory, optimize execution time

**Q: How do you implement distributed transactions in serverless?**
A: 
- **Saga pattern**: Compensating transactions for rollback
- **Event sourcing**: Immutable events with eventual consistency
- **Step Functions**: Orchestrate multi-step workflows
- **Two-phase commit**: For strong consistency (complex in serverless)
- **Idempotency**: Design functions to handle retries safely

**Q: Compare serverless vs containers vs VMs.**
A:
- **Serverless**: Zero ops, pay-per-use, auto-scale, cold starts
- **Containers**: Portable, faster startup than VMs, orchestration needed
- **VMs**: Full control, persistent, higher operational overhead
- **Use serverless**: Event-driven, unpredictable traffic, rapid development
- **Use containers**: Microservices, CI/CD, hybrid cloud
- **Use VMs**: Legacy apps, compliance requirements, custom OS needs
`
}; 