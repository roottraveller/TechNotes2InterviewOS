export const serverless = {
  id: 'serverless',
  title: 'Serverless Computing',
  content: `# Serverless Computing

## Definition
Serverless computing is a cloud execution model where the cloud provider manages server infrastructure, automatically scaling and charging only for actual usage.

## Key Characteristics
- **No Server Management**: Provider handles infrastructure
- **Event-Driven**: Functions triggered by events
- **Automatic Scaling**: Scale to zero and up automatically
- **Pay-per-Execution**: Charged only for actual usage
- **Stateless**: Functions don't maintain state between invocations

## Function as a Service (FaaS)
- **AWS Lambda**: Amazon's serverless platform
- **Azure Functions**: Microsoft's serverless offering
- **Google Cloud Functions**: Google's FaaS platform
- **Cloudflare Workers**: Edge computing functions

## Backend as a Service (BaaS)
- **Firebase**: Google's mobile/web backend
- **AWS Amplify**: Full-stack development platform
- **Supabase**: Open-source Firebase alternative
- **Auth0**: Authentication as a service

## Event Sources
- **HTTP Requests**: API Gateway triggers
- **Database Changes**: DynamoDB streams
- **File Uploads**: S3 bucket events
- **Scheduled Events**: Cron-like triggers
- **Message Queues**: SQS, SNS events

## Benefits
- **Cost Efficiency**: Pay only for execution time
- **Automatic Scaling**: Handle traffic spikes automatically
- **Reduced Operational Overhead**: No server management
- **Faster Time to Market**: Focus on business logic
- **High Availability**: Built-in redundancy

## Limitations
- **Cold Start**: Initial invocation latency
- **Vendor Lock-in**: Platform-specific implementations
- **Execution Time Limits**: Maximum function duration
- **Memory Constraints**: Limited memory allocation
- **Debugging Complexity**: Distributed debugging challenges

## Use Cases
- **API Backends**: REST API implementations
- **Data Processing**: ETL pipelines, file processing
- **Real-time Processing**: Stream processing, IoT data
- **Scheduled Tasks**: Cron jobs, maintenance tasks
- **Event Handling**: Webhook processing, notifications

## Architecture Patterns
- **Microservices**: Single-purpose functions
- **Event-Driven**: Reactive architectures
- **CQRS**: Command Query Responsibility Segregation
- **Saga Pattern**: Distributed transaction management

## Best Practices
- **Stateless Design**: Don't rely on local state
- **Connection Pooling**: Reuse database connections
- **Error Handling**: Proper exception management
- **Monitoring**: Comprehensive observability
- **Security**: Principle of least privilege

## Serverless Frameworks
- **Serverless Framework**: Multi-cloud deployment
- **AWS SAM**: AWS Serverless Application Model
- **Terraform**: Infrastructure as code
- **Pulumi**: Modern infrastructure as code

## Interview Questions
**Q: What is a cold start in serverless computing?**
A: Cold start is the initial latency when a function is invoked for the first time or after being idle, as the provider needs to initialize the runtime environment.`
}; 