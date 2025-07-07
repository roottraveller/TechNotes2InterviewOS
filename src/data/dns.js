export const dns = {
  id: 'dns',
  title: 'DNS (Domain Name System)',
  content: `# DNS (Domain Name System)

## Definition
DNS is a hierarchical system that translates human-readable domain names into IP addresses.

## DNS Hierarchy
- **Root Servers**: Top-level (.)
- **TLD Servers**: Top-level domains (.com, .org)
- **Authoritative Servers**: Domain-specific servers
- **Recursive Resolvers**: ISP or public DNS servers

## DNS Records
- **A**: Maps domain to IPv4 address
- **AAAA**: Maps domain to IPv6 address
- **CNAME**: Canonical name (alias)
- **MX**: Mail exchange servers
- **NS**: Name servers
- **TXT**: Text records (SPF, DKIM)
- **SOA**: Start of authority

## DNS Resolution Process
1. Browser cache check
2. OS cache check
3. Router cache check
4. ISP DNS server query
5. Root server query
6. TLD server query
7. Authoritative server query

## DNS Caching
- **TTL**: Time to Live for cache entries
- **Browser Cache**: Local browser storage
- **OS Cache**: Operating system cache
- **DNS Server Cache**: Resolver cache

## Interview Questions
**Q: Explain the DNS resolution process.**
A: Browser checks caches, then queries DNS servers hierarchically from root to authoritative servers.`
}; 