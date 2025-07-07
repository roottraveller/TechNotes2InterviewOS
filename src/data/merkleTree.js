export const merkleTree = {
  id: 'merkle-tree',
  title: 'Merkle Tree',
  content: `
    <h2>Merkle Tree</h2>
    <p>A Merkle tree (also known as hash tree) is a binary tree data structure where each leaf node represents a data block and each non-leaf node stores the cryptographic hash of its child nodes. It provides efficient and secure verification of large data structures.</p>
    
    <h3>What is a Merkle Tree?</h3>
    <ul>
      <li><strong>Definition:</strong> Binary tree where each node contains a cryptographic hash</li>
      <li><strong>Leaf Nodes:</strong> Contain hashes of data blocks</li>
      <li><strong>Internal Nodes:</strong> Contain hashes of their child nodes</li>
      <li><strong>Root Hash:</strong> Single hash representing the entire tree</li>
    </ul>

    <h3>Structure and Properties</h3>
    
    <h4>Tree Construction</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>Merkle Tree Construction:

1. Start with data blocks: [D1, D2, D3, D4]

2. Create leaf nodes with hashes:
   H1 = hash(D1)
   H2 = hash(D2)  
   H3 = hash(D3)
   H4 = hash(D4)

3. Create parent nodes:
   H12 = hash(H1 + H2)
   H34 = hash(H3 + H4)

4. Create root node:
   Root = hash(H12 + H34)

Tree Structure:
        Root
       /    \\
     H12    H34
    /  \\   /  \\
   H1  H2 H3  H4
   |   |  |   |
   D1  D2 D3  D4</code></pre>
    </div>

    <h4>Key Properties</h4>
    <ul>
      <li><strong>Tamper Detection:</strong> Any change in data changes the root hash</li>
      <li><strong>Efficient Verification:</strong> O(log n) proof size for data integrity</li>
      <li><strong>Partial Verification:</strong> Can verify individual blocks without downloading entire dataset</li>
      <li><strong>Immutable:</strong> Once constructed, tree structure represents fixed data state</li>
    </ul>

    <h3>Implementation</h3>
    
    <h4>Basic Merkle Tree Class</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.*;

public class MerkleTree {
    private MerkleNode root;
    private List<String> dataBlocks;
    private MessageDigest digest;
    
    public MerkleTree(List<String> data) throws NoSuchAlgorithmException {
        this.dataBlocks = new ArrayList<>(data);
        this.digest = MessageDigest.getInstance("SHA-256");
        this.root = buildTree(data);
    }
    
    private MerkleNode buildTree(List<String> data) {
        if (data.isEmpty()) {
            return null;
        }
        
        // Create leaf nodes
        List<MerkleNode> nodes = new ArrayList<>();
        for (String block : data) {
            nodes.add(new MerkleNode(hash(block), block));
        }
        
        // Build tree bottom-up
        while (nodes.size() > 1) {
            List<MerkleNode> nextLevel = new ArrayList<>();
            
            for (int i = 0; i < nodes.size(); i += 2) {
                MerkleNode left = nodes.get(i);
                MerkleNode right = (i + 1 < nodes.size()) ? 
                    nodes.get(i + 1) : nodes.get(i); // Duplicate if odd number
                
                String combinedHash = hash(left.getHash() + right.getHash());
                MerkleNode parent = new MerkleNode(combinedHash, null);
                parent.setLeft(left);
                parent.setRight(right);
                
                nextLevel.add(parent);
            }
            
            nodes = nextLevel;
        }
        
        return nodes.get(0);
    }
    
    private String hash(String data) {
        digest.reset();
        byte[] hashBytes = digest.digest(data.getBytes());
        StringBuilder sb = new StringBuilder();
        for (byte b : hashBytes) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }
    
    public String getRootHash() {
        return root != null ? root.getHash() : null;
    }
    
    // Generate proof for data block at given index
    public List<String> generateProof(int index) {
        if (index < 0 || index >= dataBlocks.size()) {
            throw new IndexOutOfBoundsException("Invalid index");
        }
        
        List<String> proof = new ArrayList<>();
        generateProofHelper(root, index, dataBlocks.size(), proof);
        return proof;
    }
    
    private void generateProofHelper(MerkleNode node, int index, 
                                   int totalLeaves, List<String> proof) {
        if (node.isLeaf()) {
            return;
        }
        
        int leftSubtreeSize = getLeftSubtreeSize(totalLeaves);
        
        if (index < leftSubtreeSize) {
            // Target is in left subtree, add right sibling to proof
            proof.add(node.getRight().getHash());
            generateProofHelper(node.getLeft(), index, 
                              leftSubtreeSize, proof);
        } else {
            // Target is in right subtree, add left sibling to proof
            proof.add(node.getLeft().getHash());
            generateProofHelper(node.getRight(), index - leftSubtreeSize, 
                              totalLeaves - leftSubtreeSize, proof);
        }
    }
    
    private int getLeftSubtreeSize(int totalLeaves) {
        if (totalLeaves == 1) return 1;
        int powerOf2 = 1;
        while (powerOf2 < totalLeaves) {
            powerOf2 *= 2;
        }
        return Math.min(powerOf2 / 2, totalLeaves - powerOf2 / 2);
    }
    
    // Verify proof for given data and index
    public boolean verifyProof(String data, int index, List<String> proof) {
        String calculatedHash = hash(data);
        
        for (String siblingHash : proof) {
            if (isLeftChild(index)) {
                calculatedHash = hash(calculatedHash + siblingHash);
            } else {
                calculatedHash = hash(siblingHash + calculatedHash);
            }
            index = index / 2;
        }
        
        return calculatedHash.equals(getRootHash());
    }
    
    private boolean isLeftChild(int index) {
        return index % 2 == 0;
    }
}

class MerkleNode {
    private String hash;
    private String data;
    private MerkleNode left;
    private MerkleNode right;
    
    public MerkleNode(String hash, String data) {
        this.hash = hash;
        this.data = data;
    }
    
    public boolean isLeaf() {
        return left == null && right == null;
    }
    
    // Getters and setters
    public String getHash() { return hash; }
    public String getData() { return data; }
    public MerkleNode getLeft() { return left; }
    public MerkleNode getRight() { return right; }
    public void setLeft(MerkleNode left) { this.left = left; }
    public void setRight(MerkleNode right) { this.right = right; }
}</code></pre>
    </div>

    <h3>Practical Example</h3>
    
    <h4>File Integrity Verification</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>public class FileIntegrityChecker {
    private MerkleTree merkleTree;
    
    public void createFileSignature(List<String> fileChunks) 
            throws NoSuchAlgorithmException {
        this.merkleTree = new MerkleTree(fileChunks);
        System.out.println("File signature (root hash): " + 
                          merkleTree.getRootHash());
    }
    
    public boolean verifyFileChunk(String chunkData, int chunkIndex) {
        try {
            // Generate proof for the chunk
            List<String> proof = merkleTree.generateProof(chunkIndex);
            
            // Verify the chunk against the proof
            boolean isValid = merkleTree.verifyProof(chunkData, chunkIndex, proof);
            
            System.out.printf("Chunk %d verification: %s%n", 
                            chunkIndex, isValid ? "VALID" : "INVALID");
            
            return isValid;
            
        } catch (Exception e) {
            System.out.println("Verification failed: " + e.getMessage());
            return false;
        }
    }
    
    public static void main(String[] args) throws NoSuchAlgorithmException {
        // Simulate file chunks
        List<String> fileChunks = Arrays.asList(
            "chunk1: Hello World",
            "chunk2: This is a test",
            "chunk3: Merkle trees are cool",
            "chunk4: Cryptographic verification"
        );
        
        FileIntegrityChecker checker = new FileIntegrityChecker();
        checker.createFileSignature(fileChunks);
        
        // Verify original chunks
        System.out.println("\n=== Verifying Original Chunks ===");
        for (int i = 0; i < fileChunks.size(); i++) {
            checker.verifyFileChunk(fileChunks.get(i), i);
        }
        
        // Try to verify tampered chunk
        System.out.println("\n=== Verifying Tampered Chunk ===");
        checker.verifyFileChunk("chunk1: Hello World TAMPERED", 0);
    }
}</code></pre>
    </div>

    <h3>Advanced Features</h3>
    
    <h4>Sparse Merkle Tree</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>public class SparseMerkleTree {
    private static final String EMPTY_HASH = "0000000000000000";
    private int depth;
    private Map<String, String> nodes;
    
    public SparseMerkleTree(int depth) {
        this.depth = depth;
        this.nodes = new HashMap<>();
        
        // Pre-compute empty subtree hashes
        precomputeEmptyHashes();
    }
    
    private void precomputeEmptyHashes() {
        String currentHash = EMPTY_HASH;
        nodes.put(getEmptyKey(0), currentHash);
        
        for (int level = 1; level <= depth; level++) {
            currentHash = hash(currentHash + currentHash);
            nodes.put(getEmptyKey(level), currentHash);
        }
    }
    
    public void update(String key, String value) {
        String leafHash = hash(value);
        updatePath(key, leafHash, depth);
    }
    
    private void updatePath(String key, String value, int level) {
        if (level == 0) {
            nodes.put(key, value);
            return;
        }
        
        String parentKey = getParentKey(key, level);
        String siblingKey = getSiblingKey(key, level);
        
        // Recursively update path to root
        updatePath(parentKey, value, level - 1);
        
        // Update parent hash
        String leftHash = getNodeHash(getLeftChild(parentKey, level - 1));
        String rightHash = getNodeHash(getRightChild(parentKey, level - 1));
        String parentHash = hash(leftHash + rightHash);
        
        nodes.put(parentKey, parentHash);
    }
    
    public List<String> generateProof(String key) {
        List<String> proof = new ArrayList<>();
        
        for (int level = depth; level > 0; level--) {
            String siblingKey = getSiblingKey(key, level);
            String siblingHash = getNodeHash(siblingKey);
            proof.add(siblingHash);
            
            key = getParentKey(key, level);
        }
        
        return proof;
    }
    
    private String getNodeHash(String key) {
        return nodes.getOrDefault(key, getEmptyHashForKey(key));
    }
    
    private String getEmptyHashForKey(String key) {
        int level = getKeyLevel(key);
        return nodes.get(getEmptyKey(level));
    }
    
    private String getEmptyKey(int level) {
        return "EMPTY_" + level;
    }
    
    // Helper methods for key manipulation
    private String getParentKey(String key, int level) {
        return key.substring(0, key.length() - 1);
    }
    
    private String getSiblingKey(String key, int level) {
        String parent = getParentKey(key, level);
        char lastBit = key.charAt(key.length() - 1);
        char siblingBit = (lastBit == '0') ? '1' : '0';
        return parent + siblingBit;
    }
    
    private String getLeftChild(String key, int level) {
        return key + "0";
    }
    
    private String getRightChild(String key, int level) {
        return key + "1";
    }
    
    private int getKeyLevel(String key) {
        return depth - key.length();
    }
    
    private String hash(String data) {
        // Simple hash function for demonstration
        return Integer.toHexString(data.hashCode());
    }
}</code></pre>
    </div>

    <h3>Applications</h3>
    
    <h4>1. Blockchain Technology</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>public class BlockchainBlock {
    private String previousHash;
    private long timestamp;
    private List<Transaction> transactions;
    private String merkleRoot;
    private int nonce;
    
    public BlockchainBlock(String previousHash, List<Transaction> transactions) {
        this.previousHash = previousHash;
        this.timestamp = System.currentTimeMillis();
        this.transactions = new ArrayList<>(transactions);
        this.merkleRoot = calculateMerkleRoot();
        this.nonce = 0;
    }
    
    private String calculateMerkleRoot() {
        try {
            List<String> txHashes = transactions.stream()
                .map(tx -> tx.getHash())
                .collect(Collectors.toList());
            
            MerkleTree tree = new MerkleTree(txHashes);
            return tree.getRootHash();
            
        } catch (Exception e) {
            throw new RuntimeException("Failed to calculate Merkle root", e);
        }
    }
    
    public boolean verifyTransaction(Transaction tx, int index, 
                                   List<String> merkleProof) {
        try {
            List<String> txHashes = transactions.stream()
                .map(t -> t.getHash())
                .collect(Collectors.toList());
            
            MerkleTree tree = new MerkleTree(txHashes);
            return tree.verifyProof(tx.getHash(), index, merkleProof);
            
        } catch (Exception e) {
            return false;
        }
    }
    
    // Getters
    public String getMerkleRoot() { return merkleRoot; }
    public List<Transaction> getTransactions() { return transactions; }
}</code></pre>
    </div>

    <h4>2. Distributed File Systems</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>public class DistributedFileSystem {
    private Map<String, MerkleTree> fileTrees;
    
    public DistributedFileSystem() {
        this.fileTrees = new ConcurrentHashMap<>();
    }
    
    public void storeFile(String fileName, List<String> chunks) 
            throws NoSuchAlgorithmException {
        MerkleTree tree = new MerkleTree(chunks);
        fileTrees.put(fileName, tree);
        
        System.out.printf("Stored file '%s' with root hash: %s%n",
                         fileName, tree.getRootHash());
    }
    
    public boolean verifyFileChunk(String fileName, String chunkData, 
                                 int chunkIndex) {
        MerkleTree tree = fileTrees.get(fileName);
        if (tree == null) {
            System.out.println("File not found: " + fileName);
            return false;
        }
        
        try {
            List<String> proof = tree.generateProof(chunkIndex);
            boolean isValid = tree.verifyProof(chunkData, chunkIndex, proof);
            
            System.out.printf("File '%s' chunk %d: %s%n",
                            fileName, chunkIndex, 
                            isValid ? "VERIFIED" : "CORRUPTED");
            
            return isValid;
            
        } catch (Exception e) {
            System.out.println("Verification error: " + e.getMessage());
            return false;
        }
    }
    
    public String getFileSignature(String fileName) {
        MerkleTree tree = fileTrees.get(fileName);
        return tree != null ? tree.getRootHash() : null;
    }
    
    // Efficient file synchronization between nodes
    public List<Integer> findDifferentChunks(String fileName, 
                                           String remoteRootHash) {
        MerkleTree localTree = fileTrees.get(fileName);
        if (localTree == null) {
            return Collections.emptyList();
        }
        
        String localRootHash = localTree.getRootHash();
        if (localRootHash.equals(remoteRootHash)) {
            return Collections.emptyList(); // Files are identical
        }
        
        // In a real implementation, this would use the tree structure
        // to efficiently identify which chunks differ
        List<Integer> differentChunks = new ArrayList<>();
        // ... implementation details ...
        
        return differentChunks;
    }
}</code></pre>
    </div>

    <h3>Performance Characteristics</h3>
    
    <h4>Time Complexity</h4>
    <ul>
      <li><strong>Construction:</strong> O(n) where n is number of data blocks</li>
      <li><strong>Proof Generation:</strong> O(log n) for any single block</li>
      <li><strong>Proof Verification:</strong> O(log n) for any single block</li>
      <li><strong>Root Hash Calculation:</strong> O(n) for complete tree</li>
    </ul>

    <h4>Space Complexity</h4>
    <ul>
      <li><strong>Tree Storage:</strong> O(n) for complete tree</li>
      <li><strong>Proof Size:</strong> O(log n) hashes per proof</li>
      <li><strong>Sparse Tree:</strong> O(k) where k is number of non-empty leaves</li>
    </ul>

    <h3>Optimizations</h3>
    
    <h4>Parallel Construction</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>public class ParallelMerkleTree {
    private ExecutorService executor;
    
    public ParallelMerkleTree() {
        this.executor = Executors.newFixedThreadPool(
            Runtime.getRuntime().availableProcessors());
    }
    
    public MerkleNode buildTreeParallel(List<String> data) 
            throws InterruptedException, ExecutionException {
        
        List<MerkleNode> currentLevel = data.parallelStream()
            .map(block -> new MerkleNode(hash(block), block))
            .collect(Collectors.toList());
        
        while (currentLevel.size() > 1) {
            List<Future<MerkleNode>> futures = new ArrayList<>();
            
            for (int i = 0; i < currentLevel.size(); i += 2) {
                final int index = i;
                final List<MerkleNode> nodes = currentLevel;
                
                Future<MerkleNode> future = executor.submit(() -> {
                    MerkleNode left = nodes.get(index);
                    MerkleNode right = (index + 1 < nodes.size()) ? 
                        nodes.get(index + 1) : nodes.get(index);
                    
                    String combinedHash = hash(left.getHash() + right.getHash());
                    MerkleNode parent = new MerkleNode(combinedHash, null);
                    parent.setLeft(left);
                    parent.setRight(right);
                    
                    return parent;
                });
                
                futures.add(future);
            }
            
            currentLevel = futures.stream()
                .map(future -> {
                    try {
                        return future.get();
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }
                })
                .collect(Collectors.toList());
        }
        
        return currentLevel.get(0);
    }
    
    public void shutdown() {
        executor.shutdown();
    }
}</code></pre>
    </div>

    <div class="info-note">
      <strong>💡 Key Insight:</strong>
      <p>Merkle trees provide an elegant solution for efficient data integrity verification in distributed systems. The logarithmic proof size makes them particularly valuable for blockchain applications and large-scale data verification scenarios.</p>
    </div>

    <div class="reference-links">
      <h4>🔗 Learn More:</h4>
      <ul>
        <li><a href="https://en.wikipedia.org/wiki/Merkle_tree" target="_blank">Merkle Tree - Wikipedia</a></li>
        <li><a href="https://brilliant.org/wiki/merkle-tree/" target="_blank">Merkle Trees - Brilliant</a></li>
      </ul>
    </div>
  `
}; 