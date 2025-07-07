export const httpStatusCodes = {
  id: 'http-status-codes',
  title: 'HTTP Status Codes',
  content: `
    <h2>HTTP Status Codes</h2>
    <p>HTTP status codes are three-digit numbers returned by servers to indicate the result of a client's request. They are grouped into five categories based on the first digit.</p>

    <h3>Status Code Categories</h3>
    
    <h4>1xx - Informational</h4>
    <p>Request received, continuing process. These are provisional responses.</p>
    <ul>
      <li><strong>100 Continue:</strong> Initial part of request received, client should continue</li>
      <li><strong>101 Switching Protocols:</strong> Server is switching protocols as requested</li>
      <li><strong>102 Processing:</strong> Server has received and is processing (WebDAV)</li>
      <li><strong>103 Early Hints:</strong> Used to return some response headers before final HTTP message</li>
    </ul>

    <h4>2xx - Success</h4>
    <p>The request was successfully received, understood, and accepted.</p>
    <ul>
      <li><strong>200 OK:</strong> Standard response for successful requests</li>
      <li><strong>201 Created:</strong> Request succeeded and new resource was created</li>
      <li><strong>202 Accepted:</strong> Request accepted for processing, but not completed</li>
      <li><strong>203 Non-Authoritative Information:</strong> Request successful but from another source</li>
      <li><strong>204 No Content:</strong> Request successful but no content to return</li>
      <li><strong>205 Reset Content:</strong> Request successful, reset document view</li>
      <li><strong>206 Partial Content:</strong> Partial resource returned (range requests)</li>
    </ul>

    <h4>3xx - Redirection</h4>
    <p>Further action needs to be taken to complete the request.</p>
    <ul>
      <li><strong>300 Multiple Choices:</strong> Multiple options for the resource</li>
      <li><strong>301 Moved Permanently:</strong> Resource permanently moved to new URL</li>
      <li><strong>302 Found:</strong> Resource temporarily at different URL</li>
      <li><strong>303 See Other:</strong> Response can be found at another URL using GET</li>
      <li><strong>304 Not Modified:</strong> Resource hasn't changed since last request</li>
      <li><strong>307 Temporary Redirect:</strong> Temporary redirect, maintain HTTP method</li>
      <li><strong>308 Permanent Redirect:</strong> Permanent redirect, maintain HTTP method</li>
    </ul>

    <h4>4xx - Client Error</h4>
    <p>The request contains bad syntax or cannot be fulfilled.</p>
    <ul>
      <li><strong>400 Bad Request:</strong> Server cannot process due to client error</li>
      <li><strong>401 Unauthorized:</strong> Authentication required</li>
      <li><strong>402 Payment Required:</strong> Reserved for future use</li>
      <li><strong>403 Forbidden:</strong> Server understood but refuses to authorize</li>
      <li><strong>404 Not Found:</strong> Requested resource not found</li>
      <li><strong>405 Method Not Allowed:</strong> Request method not supported</li>
      <li><strong>406 Not Acceptable:</strong> Content not acceptable according to Accept headers</li>
      <li><strong>407 Proxy Authentication Required:</strong> Client must authenticate with proxy</li>
      <li><strong>408 Request Timeout:</strong> Server timed out waiting for request</li>
      <li><strong>409 Conflict:</strong> Request conflicts with current state</li>
      <li><strong>410 Gone:</strong> Resource no longer available</li>
      <li><strong>411 Length Required:</strong> Content-Length header required</li>
      <li><strong>412 Precondition Failed:</strong> Precondition in headers not met</li>
      <li><strong>413 Payload Too Large:</strong> Request entity too large</li>
      <li><strong>414 URI Too Long:</strong> URI provided was too long</li>
      <li><strong>415 Unsupported Media Type:</strong> Media type not supported</li>
      <li><strong>416 Range Not Satisfiable:</strong> Cannot fulfill range request</li>
      <li><strong>417 Expectation Failed:</strong> Expect header requirements not met</li>
      <li><strong>418 I'm a teapot:</strong> April Fools joke (RFC 2324)</li>
      <li><strong>422 Unprocessable Entity:</strong> Request understood but semantically erroneous</li>
      <li><strong>425 Too Early:</strong> Server unwilling to risk processing replay request</li>
      <li><strong>426 Upgrade Required:</strong> Client should switch protocols</li>
      <li><strong>428 Precondition Required:</strong> Origin server requires conditional request</li>
      <li><strong>429 Too Many Requests:</strong> User has sent too many requests (rate limiting)</li>
      <li><strong>431 Request Header Fields Too Large:</strong> Header fields too large</li>
      <li><strong>451 Unavailable For Legal Reasons:</strong> Resource unavailable due to legal reasons</li>
    </ul>

    <h4>5xx - Server Error</h4>
    <p>The server failed to fulfill an apparently valid request.</p>
    <ul>
      <li><strong>500 Internal Server Error:</strong> Generic server error</li>
      <li><strong>501 Not Implemented:</strong> Server doesn't support functionality</li>
      <li><strong>502 Bad Gateway:</strong> Invalid response from upstream server</li>
      <li><strong>503 Service Unavailable:</strong> Server temporarily unavailable</li>
      <li><strong>504 Gateway Timeout:</strong> Upstream server timeout</li>
      <li><strong>505 HTTP Version Not Supported:</strong> HTTP version not supported</li>
      <li><strong>506 Variant Also Negotiates:</strong> Content negotiation error</li>
      <li><strong>507 Insufficient Storage:</strong> Server unable to store representation</li>
      <li><strong>508 Loop Detected:</strong> Infinite loop detected</li>
      <li><strong>510 Not Extended:</strong> Further extensions required</li>
      <li><strong>511 Network Authentication Required:</strong> Client needs to authenticate</li>
    </ul>

    <h3>Common Status Codes in Practice</h3>
    
    <h4>Most Frequently Used</h4>
    <table>
      <thead>
        <tr>
          <th>Code</th>
          <th>Name</th>
          <th>Common Use Case</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>200</td>
          <td>OK</td>
          <td>Successful GET, PUT, PATCH requests</td>
        </tr>
        <tr>
          <td>201</td>
          <td>Created</td>
          <td>Successful POST creating new resource</td>
        </tr>
        <tr>
          <td>204</td>
          <td>No Content</td>
          <td>Successful DELETE, no body needed</td>
        </tr>
        <tr>
          <td>301</td>
          <td>Moved Permanently</td>
          <td>Permanent URL changes</td>
        </tr>
        <tr>
          <td>304</td>
          <td>Not Modified</td>
          <td>Cached content still valid</td>
        </tr>
        <tr>
          <td>400</td>
          <td>Bad Request</td>
          <td>Invalid request syntax or parameters</td>
        </tr>
        <tr>
          <td>401</td>
          <td>Unauthorized</td>
          <td>Missing or invalid authentication</td>
        </tr>
        <tr>
          <td>403</td>
          <td>Forbidden</td>
          <td>Authenticated but not authorized</td>
        </tr>
        <tr>
          <td>404</td>
          <td>Not Found</td>
          <td>Resource doesn't exist</td>
        </tr>
        <tr>
          <td>429</td>
          <td>Too Many Requests</td>
          <td>Rate limiting</td>
        </tr>
        <tr>
          <td>500</td>
          <td>Internal Server Error</td>
          <td>Unhandled server exception</td>
        </tr>
        <tr>
          <td>503</td>
          <td>Service Unavailable</td>
          <td>Server maintenance or overload</td>
        </tr>
      </tbody>
    </table>

    <h3>RESTful API Status Code Guidelines</h3>
    
    <h4>GET Requests</h4>
    <ul>
      <li><strong>200 OK:</strong> Resource found and returned</li>
      <li><strong>404 Not Found:</strong> Resource doesn't exist</li>
      <li><strong>401/403:</strong> Authentication/authorization issues</li>
    </ul>

    <h4>POST Requests</h4>
    <ul>
      <li><strong>201 Created:</strong> New resource created successfully</li>
      <li><strong>200 OK:</strong> Action performed but no new resource</li>
      <li><strong>400 Bad Request:</strong> Invalid data provided</li>
      <li><strong>409 Conflict:</strong> Resource already exists</li>
    </ul>

    <h4>PUT/PATCH Requests</h4>
    <ul>
      <li><strong>200 OK:</strong> Resource updated, returning updated resource</li>
      <li><strong>204 No Content:</strong> Resource updated, no content returned</li>
      <li><strong>404 Not Found:</strong> Resource to update doesn't exist</li>
    </ul>

    <h4>DELETE Requests</h4>
    <ul>
      <li><strong>204 No Content:</strong> Resource deleted successfully</li>
      <li><strong>200 OK:</strong> Resource deleted, returning confirmation</li>
      <li><strong>404 Not Found:</strong> Resource to delete doesn't exist</li>
    </ul>

    <h3>Custom Error Responses</h3>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Example error response body
{
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "The requested user does not exist",
    "details": {
      "userId": "12345",
      "timestamp": "2023-05-23T10:30:00Z"
    }
  }
}

// Rate limiting response headers
HTTP/1.1 429 Too Many Requests
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1684882734
Retry-After: 3600</code></pre>
    </div>

    <h3>Status Code Best Practices</h3>
    <ul>
      <li><strong>Be Specific:</strong> Use the most specific status code available</li>
      <li><strong>Be Consistent:</strong> Same scenarios should return same codes</li>
      <li><strong>Include Details:</strong> Provide helpful error messages in response body</li>
      <li><strong>Document Codes:</strong> List all possible status codes in API documentation</li>
      <li><strong>Don't Overuse 200:</strong> Use appropriate codes for different scenarios</li>
      <li><strong>Avoid 5xx When Possible:</strong> Handle errors gracefully</li>
    </ul>

    <h3>Related Links</h3>
    <ul>
      <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status" target="_blank">HTTP Status Codes - MDN</a></li>
    </ul>
  `
}; 