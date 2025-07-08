export const baseProperties = {
  id: "base-properties",
  title: "BASE Properties",
  content: `
<p>BASE principles are often employed in distributed systems and NoSQL databases, prioritizing availability and partition tolerance over strict consistency.</p>

    <h3>Basically Available</h3>
    <p>Focuses on providing availability over consistency, meaning that the system should remain operational even in the face of failures or network partitions.</p>

    <h3>Soft State</h3>
    <p>Allows for temporary inconsistencies or relaxed consistency requirements, particularly useful in distributed systems.</p>

    <h3>Eventually Consistent</h3>
    <p>Promotes the idea that system-wide consistency will eventually be achieved, given enough time and lack of further updates.</p>

    <div class="info-note">
      <strong>Note:</strong> BASE properties are the opposite of ACID properties and are commonly used in distributed systems where availability and partition tolerance are prioritized over strict consistency.
    </div>
`
}; 