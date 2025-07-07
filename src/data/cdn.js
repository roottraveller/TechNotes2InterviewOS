export const cdn = {
  id: 'cdn',
  title: 'CDN (Content Delivery Network)',
  content: `# CDN (Content Delivery Network)

## Definition
A CDN is a distributed network of servers that deliver web content to users based on their geographic location.

## Key Components
- **Edge Servers**: Geographically distributed cache servers
- **Origin Server**: Primary server with original content
- **PoP (Point of Presence)**: CDN server locations
- **Cache**: Temporary storage of frequently accessed content

## Benefits
- **Reduced Latency**: Content served from nearby servers
- **Improved Performance**: Faster load times
- **Reduced Bandwidth**: Less load on origin server
- **High Availability**: Redundancy and failover
- **DDoS Protection**: Distributed attack mitigation

## CDN Strategies
- **Push CDN**: Content uploaded to CDN manually
- **Pull CDN**: Content cached on first request
- **Hybrid**: Combination of push and pull

## Cache Strategies
- **TTL (Time to Live)**: Cache expiration time
- **Cache Headers**: Control caching behavior
- **Purging**: Manual cache invalidation
- **Edge Side Includes**: Dynamic content assembly

## Popular CDN Providers
- Cloudflare
- Amazon CloudFront
- Akamai
- Fastly

## Interview Questions
**Q: How does a CDN improve website performance?**
A: By serving content from geographically closer servers, reducing latency and load times.`
}; 