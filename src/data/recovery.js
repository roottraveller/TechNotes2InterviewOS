export const recovery = {
  id: 'recovery',
  title: 'Database Recovery',
  content: `
## Definition
Database recovery is the process of restoring a database to a correct state after a failure or corruption.

## Types of Failures
- **Transaction Failure**: Individual transaction errors
- **System Failure**: Hardware/software crashes
- **Media Failure**: Storage device failures
- **Disaster**: Natural disasters, fire, theft

## Recovery Techniques
- **Rollback**: Undo incomplete transactions
- **Roll-forward**: Redo committed transactions
- **Point-in-Time Recovery**: Restore to specific timestamp
- **Crash Recovery**: Automatic recovery after system failure

## Recovery Models
- **ARIES**: Algorithm for Recovery and Isolation Exploiting Semantics
- **Write-Ahead Logging**: Log changes before applying them
- **Checkpointing**: Periodic consistency points

## Recovery Process
1. Assess the damage
2. Determine recovery strategy
3. Restore from backup
4. Apply transaction logs
5. Verify data integrity

## Interview Questions
**Q: What is Write-Ahead Logging?**
A: A technique where all changes are first written to a log before being applied to the database.
`
}; 