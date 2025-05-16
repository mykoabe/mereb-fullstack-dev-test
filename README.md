# CSV Processing Backend & Frontend

## Overview

This project provides a scalable backend API to process large CSV files by offloading heavy parsing and aggregation tasks to worker threads, ensuring responsiveness and non-blocking behavior. The frontend handles file uploads and displays processing results seamlessly.

---

## How to Run the App

### Backend
   ```bash
   cd backend
   npm install
   npm run dev
   ```
The backend listens by default on port 8000.
### Frontend
The frontend accepts CSV file uploads and displays processing progress and results. It shows both the preview and the download buttons.
   ```bash
   cd frontend
   npm install
   npm run dev
```
## How to test
Backend tests use Jest with mock filesystem support.
Run all tests using:
```bash
npm run test
```
For watch mode during development:
```bash
npm run test:watch
```
## Algorithm Explanation & Memory Efficiency
**Algorithm:**  
Streams and parses the CSV line-by-line to aggregate sales per department without loading the full file into memory.

**Memory Efficiency:**  
Uses Node.js streams and worker threads to avoid blocking and minimize memory use by processing data incrementally and offloading CPU work from the main thread.
it avoids this rule https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop

## Estimated Time & Space Complexity

## Time Complexity

**O(n) linear time** (where *n* = number of CSV rows)  
  - Achieved through stream processing and worker threads  
  - Each row is parsed and aggregated in a single pass  

**Key Optimizations**:  
- **Non-blocking I/O**: Node.js streams handle file reading without blocking  
- **Worker Isolation**: CPU-intensive tasks (summing values, output generation) are offloaded to worker threads  
- **Event Loop Protection**: Prevents blocking during:  
  - Large dataset aggregation  
  - Memory-intensive operations  
  - Result file writing  

*Design Benefit*: Maintains Node.js's event-driven architecture while handling compute-heavy workloads efficiently.

---

**Space Complexity:**  
- With streaming and worker threads: **O(k)**, where *k* is the number of unique departments.  
  Only aggregation state is kept in memory, not the entire file, minimizing memory usage.





   

