export const backup = {
  id: 'backup',
  title: 'Database Backup',
  content: `
## Definition
Database backup is the process of creating copies of database data to protect against data loss and enable recovery.

## Types of Backups
- **Full Backup**: Complete copy of entire database
- **Incremental Backup**: Only changes since last backup
- **Differential Backup**: Changes since last full backup
- **Transaction Log Backup**: Log file backups for point-in-time recovery

## Backup Strategies
- **Hot Backup**: Database remains online during backup
- **Cold Backup**: Database offline during backup
- **Warm Backup**: Read-only access during backup

## Recovery Models
- **Simple**: Minimal logging, no point-in-time recovery
- **Full**: Complete logging, full recovery options
- **Bulk-Logged**: Minimal logging for bulk operations

## Best Practices
- Regular backup schedules
- Test restore procedures
- Offsite storage
- Encryption for sensitive data
- Document recovery procedures

## Interview Questions
**Q: What's the difference between hot and cold backups?**
A: Hot backups occur while the database is online and accessible, while cold backups require the database to be offline.
`
}; 