export const algorithms = {
  id: 'algorithms',
  title: 'Sorting & Searching Algorithms',
  content: `
    <h2>Sorting & Searching Algorithms</h2>
    <p>Sorting and searching are fundamental algorithmic problems. Understanding different approaches, their time complexities, and trade-offs is essential for efficient problem-solving.</p>

    <h3>Sorting Algorithms</h3>

    <h4>Bubble Sort</h4>
    <ul>
      <li><strong>Time Complexity:</strong> O(n²) average and worst case, O(n) best case</li>
      <li><strong>Space Complexity:</strong> O(1)</li>
      <li><strong>Stable:</strong> Yes</li>
      <li><strong>In-place:</strong> Yes</li>
    </ul>

    <div class="code-block">
      <span class="code-label">CODE</span>
      <pre><code>// Bubble Sort - repeatedly swaps adjacent elements if they're in wrong order
function bubbleSort(arr) {
  const n = arr.length;
  let swapped;
  
  for (let i = 0; i < n - 1; i++) {
    swapped = false;
    
    // Last i elements are already sorted
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    
    // If no swapping occurred, array is sorted
    if (!swapped) break;
  }
  
  return arr;
}

// Optimized version with early termination
function optimizedBubbleSort(arr) {
  let n = arr.length;
  
  while (n > 1) {
    let newN = 0;
    
    for (let i = 1; i < n; i++) {
      if (arr[i - 1] > arr[i]) {
        [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
        newN = i;
      }
    }
    
    n = newN;
  }
  
  return arr;
}</code></pre>
    </div>

    <h4>Quick Sort</h4>
    <ul>
      <li><strong>Time Complexity:</strong> O(n log n) average, O(n²) worst case</li>
      <li><strong>Space Complexity:</strong> O(log n) average, O(n) worst case</li>
      <li><strong>Stable:</strong> No (can be made stable with modifications)</li>
      <li><strong>In-place:</strong> Yes</li>
    </ul>

    <div class="code-block">
      <span class="code-label">CODE</span>
      <pre><code>// Quick Sort - divide and conquer with partitioning
function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    // Partition the array and get pivot index
    const pivotIndex = partition(arr, low, high);
    
    // Recursively sort elements before and after partition
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  
  return arr;
}

// Lomuto partition scheme
function partition(arr, low, high) {
  // Choose rightmost element as pivot
  const pivot = arr[high];
  let i = low - 1; // Index of smaller element
  
  for (let j = low; j < high; j++) {
    // If current element is smaller than or equal to pivot
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  // Place pivot in correct position
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

// Hoare partition scheme (alternative)
function hoarePartition(arr, low, high) {
  const pivot = arr[low];
  let i = low - 1;
  let j = high + 1;
  
  while (true) {
    do {
      i++;
    } while (arr[i] < pivot);
    
    do {
      j--;
    } while (arr[j] > pivot);
    
    if (i >= j) {
      return j;
    }
    
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// Randomized Quick Sort (better average performance)
function randomizedQuickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    // Randomly choose pivot
    const randomIndex = low + Math.floor(Math.random() * (high - low + 1));
    [arr[randomIndex], arr[high]] = [arr[high], arr[randomIndex]];
    
    const pivotIndex = partition(arr, low, high);
    randomizedQuickSort(arr, low, pivotIndex - 1);
    randomizedQuickSort(arr, pivotIndex + 1, high);
  }
  
  return arr;
}</code></pre>
    </div>

    <h4>Merge Sort</h4>
    <ul>
      <li><strong>Time Complexity:</strong> O(n log n) all cases</li>
      <li><strong>Space Complexity:</strong> O(n)</li>
      <li><strong>Stable:</strong> Yes</li>
      <li><strong>In-place:</strong> No</li>
    </ul>

    <div class="code-block">
      <span class="code-label">CODE</span>
      <pre><code>// Merge Sort - divide and conquer with merging
function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  
  // Divide array into two halves
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  
  // Recursively sort both halves and merge
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  const result = [];
  let leftIndex = 0;
  let rightIndex = 0;
  
  // Merge elements in sorted order
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] <= right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  
  // Add remaining elements
  while (leftIndex < left.length) {
    result.push(left[leftIndex]);
    leftIndex++;
  }
  
  while (rightIndex < right.length) {
    result.push(right[rightIndex]);
    rightIndex++;
  }
  
  return result;
}

// In-place merge sort (more complex but O(1) extra space)
function inPlaceMergeSort(arr, start = 0, end = arr.length - 1) {
  if (start < end) {
    const mid = Math.floor((start + end) / 2);
    
    inPlaceMergeSort(arr, start, mid);
    inPlaceMergeSort(arr, mid + 1, end);
    inPlaceMerge(arr, start, mid, end);
  }
  
  return arr;
}

function inPlaceMerge(arr, start, mid, end) {
  let start2 = mid + 1;
  
  // If the direct merge is already sorted
  if (arr[mid] <= arr[start2]) {
    return;
  }
  
  // Two pointers to maintain start of both arrays to merge
  while (start <= mid && start2 <= end) {
    // If element 1 is in right place
    if (arr[start] <= arr[start2]) {
      start++;
    } else {
      const value = arr[start2];
      let index = start2;
      
      // Shift all elements between element 1 and element 2, right by 1
      while (index !== start) {
        arr[index] = arr[index - 1];
        index--;
      }
      arr[start] = value;
      
      // Update all pointers
      start++;
      mid++;
      start2++;
    }
  }
}</code></pre>
    </div>

    <h4>Heap Sort</h4>
    <ul>
      <li><strong>Time Complexity:</strong> O(n log n) all cases</li>
      <li><strong>Space Complexity:</strong> O(1)</li>
      <li><strong>Stable:</strong> No</li>
      <li><strong>In-place:</strong> Yes</li>
    </ul>

    <div class="code-block">
      <span class="code-label">CODE</span>
      <pre><code>// Heap Sort - uses binary heap data structure
function heapSort(arr) {
  const n = arr.length;
  
  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  
  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    [arr[0], arr[i]] = [arr[i], arr[0]];
    
    // Call heapify on the reduced heap
    heapify(arr, i, 0);
  }
  
  return arr;
}

// Heapify a subtree rooted with node i
function heapify(arr, n, i) {
  let largest = i; // Initialize largest as root
  const left = 2 * i + 1; // Left child
  const right = 2 * i + 2; // Right child
  
  // If left child is larger than root
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }
  
  // If right child is larger than largest so far
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }
  
  // If largest is not root
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    
    // Recursively heapify the affected sub-tree
    heapify(arr, n, largest);
  }
}</code></pre>
    </div>

    <h3>Searching Algorithms</h3>

    <h4>Linear Search</h4>
    <ul>
      <li><strong>Time Complexity:</strong> O(n)</li>
      <li><strong>Space Complexity:</strong> O(1)</li>
      <li><strong>Works on:</strong> Sorted and unsorted arrays</li>
    </ul>

    <div class="code-block">
      <span class="code-label">CODE</span>
      <pre><code>// Linear Search - check each element sequentially
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // Return index if found
    }
  }
  return -1; // Return -1 if not found
}

// Linear search with early termination for sorted arrays
function linearSearchSorted(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
    if (arr[i] > target) {
      return -1; // Target cannot be in remaining elements
    }
  }
  return -1;
}

// Find all occurrences
function linearSearchAll(arr, target) {
  const indices = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      indices.push(i);
    }
  }
  return indices;
}</code></pre>
    </div>

    <h4>Binary Search</h4>
    <ul>
      <li><strong>Time Complexity:</strong> O(log n)</li>
      <li><strong>Space Complexity:</strong> O(1) iterative, O(log n) recursive</li>
      <li><strong>Prerequisite:</strong> Array must be sorted</li>
    </ul>

    <div class="code-block">
      <span class="code-label">CODE</span>
      <pre><code>// Binary Search - iterative approach
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1;
}

// Binary Search - recursive approach
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
  if (left > right) {
    return -1;
  }
  
  const mid = Math.floor((left + right) / 2);
  
  if (arr[mid] === target) {
    return mid;
  } else if (arr[mid] < target) {
    return binarySearchRecursive(arr, target, mid + 1, right);
  } else {
    return binarySearchRecursive(arr, target, left, mid - 1);
  }
}

// Find first occurrence of target
function binarySearchFirst(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let result = -1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      result = mid;
      right = mid - 1; // Continue searching in left half
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return result;
}

// Find last occurrence of target
function binarySearchLast(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let result = -1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      result = mid;
      left = mid + 1; // Continue searching in right half
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return result;
}

// Find insertion point for target to maintain sorted order
function binarySearchInsertionPoint(arr, target) {
  let left = 0;
  let right = arr.length;
  
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  
  return left;
}</code></pre>
    </div>

    <h3>Advanced Searching</h3>

    <h4>Ternary Search</h4>
    <div class="code-block">
      <span class="code-label">CODE</span>
      <pre><code>// Ternary Search - divides array into three parts
function ternarySearch(arr, target, left = 0, right = arr.length - 1) {
  if (left > right) {
    return -1;
  }
  
  // Divide array into three parts
  const mid1 = left + Math.floor((right - left) / 3);
  const mid2 = right - Math.floor((right - left) / 3);
  
  if (arr[mid1] === target) {
    return mid1;
  }
  if (arr[mid2] === target) {
    return mid2;
  }
  
  // Determine which part to search
  if (target < arr[mid1]) {
    return ternarySearch(arr, target, left, mid1 - 1);
  } else if (target > arr[mid2]) {
    return ternarySearch(arr, target, mid2 + 1, right);
  } else {
    return ternarySearch(arr, target, mid1 + 1, mid2 - 1);
  }
}</code></pre>
    </div>

    <h4>Exponential Search</h4>
    <div class="code-block">
      <span class="code-label">CODE</span>
      <pre><code>// Exponential Search - find range then binary search
function exponentialSearch(arr, target) {
  const n = arr.length;
  
  // If target is at first position
  if (arr[0] === target) {
    return 0;
  }
  
  // Find range for binary search by repeated doubling
  let i = 1;
  while (i < n && arr[i] <= target) {
    i *= 2;
  }
  
  // Perform binary search in found range
  return binarySearch(
    arr.slice(Math.floor(i / 2), Math.min(i, n)),
    target
  ) + Math.floor(i / 2);
}</code></pre>
    </div>

    <h3>Algorithm Comparison</h3>

    <table>
      <thead>
        <tr>
          <th>Algorithm</th>
          <th>Best Case</th>
          <th>Average Case</th>
          <th>Worst Case</th>
          <th>Space</th>
          <th>Stable</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Bubble Sort</strong></td>
          <td>O(n)</td>
          <td>O(n²)</td>
          <td>O(n²)</td>
          <td>O(1)</td>
          <td>Yes</td>
        </tr>
        <tr>
          <td><strong>Quick Sort</strong></td>
          <td>O(n log n)</td>
          <td>O(n log n)</td>
          <td>O(n²)</td>
          <td>O(log n)</td>
          <td>No</td>
        </tr>
        <tr>
          <td><strong>Merge Sort</strong></td>
          <td>O(n log n)</td>
          <td>O(n log n)</td>
          <td>O(n log n)</td>
          <td>O(n)</td>
          <td>Yes</td>
        </tr>
        <tr>
          <td><strong>Heap Sort</strong></td>
          <td>O(n log n)</td>
          <td>O(n log n)</td>
          <td>O(n log n)</td>
          <td>O(1)</td>
          <td>No</td>
        </tr>
        <tr>
          <td><strong>Linear Search</strong></td>
          <td>O(1)</td>
          <td>O(n)</td>
          <td>O(n)</td>
          <td>O(1)</td>
          <td>N/A</td>
        </tr>
        <tr>
          <td><strong>Binary Search</strong></td>
          <td>O(1)</td>
          <td>O(log n)</td>
          <td>O(log n)</td>
          <td>O(1)</td>
          <td>N/A</td>
        </tr>
      </tbody>
    </table>

    <h3>When to Use Which Algorithm</h3>

    <h4>Sorting Algorithm Selection</h4>
    <ul>
      <li><strong>Quick Sort:</strong> General purpose, good average performance</li>
      <li><strong>Merge Sort:</strong> When stability is required, guaranteed O(n log n)</li>
      <li><strong>Heap Sort:</strong> When O(1) space is critical</li>
      <li><strong>Bubble Sort:</strong> Educational purposes, very small datasets</li>
    </ul>

    <h4>Searching Algorithm Selection</h4>
    <ul>
      <li><strong>Binary Search:</strong> Sorted arrays, O(log n) performance needed</li>
      <li><strong>Linear Search:</strong> Unsorted arrays, small datasets</li>
      <li><strong>Exponential Search:</strong> Unbounded/infinite arrays</li>
    </ul>

    <div class="info-note">
      <strong>💡 Key Insight:</strong>
      <p>Algorithm choice depends on data characteristics, performance requirements, and constraints. Understanding trade-offs between time, space, and stability helps in making optimal decisions.</p>
    </div>
  `
}; 