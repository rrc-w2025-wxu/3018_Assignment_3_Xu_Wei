## Helmet.js Configuration

### Configuration Applied

\`\`\`typescript helmet({
  contentSecurityPolicy: false,
  hidePoweredBy: true,
  noSniff: true,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
  frameguard: { action: "deny" },
  referrerPolicy: { policy: "no-referrer" },
}); \`\`\`

### Justification

1. **contentSecurityPolicy: false**
 - This API only provides JSON responses and does not render HTML in the 
 browser. Enabling it would add unnecessary complexity, so it has been disabled.

2. **hidePoweredBy: true**
 - Removes the X-Powered-By header (commonly revealing frameworks like Express). 
 This reduces information disclosure, making it harder for attackers to identify 
 the technology stack and target known vulnerabilities.

3. **noSniff: true**
 - Enables the X-Content-Type-Options: nosniff header, preventing browsers 
 from MIME-sniffing responses. 
 This protects against attacks where malicious 
 files are interpreted as executable scripts instead of their declared content 
 type.

4. **hsts (HTTP Strict Transport Security)**
 - Enforced in production with:
    maxAge: 31536000 (1 year)
    includeSubDomains: true
    preload: true
This ensures browsers always use HTTPS, preventing downgrade attacks 
(e.g., SSL stripping) and protecting data in transit. Disabled in development 
to allow local HTTP testing.

5. **frameguard: { action: "deny" }**
 - This prevents the API from being embedded in iframes. 
 This protects against clickjacking attacks, even though APIs are less commonly 
 targeted this way.

6. **referrerPolicy: { policy: "no-referrer" }**
 - This prevents the browser from sending the Referer header in requests. 
 This avoids leaking potentially sensitive URL information to external services 
 or third parties.

### Sources

1. Helmet.js Official Documentation – https://helmetjs.github.io/
2. OWASP Secure Headers Project – https://owasp.org/www-project-secure-headers/

## CORS Configuration

### Configuration Applied

\`\`\`typescript 
{
  origin: process.env.ALLOWED_ORIGINS?.split(",") || [],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  maxAge: 600,
} \`\`\`

### Justification

1. **origin** 
 - Development: Set to true, allowing all origins to simplify local 
development and frontend-backend integration.
 - Production: Uses a whitelist from the ALLOWED_ORIGINS environment variable.
This prevents unauthorized domains from accessing the API and reduces the risk 
of cross-origin attacks.

2. **credentials: true**
 - Allows cookies and authentication headers (e.g., JWT tokens) to be included 
 in cross-origin requests.
This is essential for APIs that require user authentication or session management.

3. **methods: ["GET", "POST", "PUT", "DELETE"]**
 - Restricts allowed HTTP methods to only those required by the API.
This minimizes the attack surface by preventing unnecessary or potentially unsafe 
methods.

4. **allowedHeaders: ["Content-Type", "Authorization"]**
 - Specifies which request headers are permitted:
    Content-Type for handling JSON payloads
    Authorization for authentication tokens
This helps prevent clients from sending unexpected or malicious headers.

5. **maxAge: 600**
 - Caches preflight (OPTIONS) responses for 10 minutes.
This improves performance by reducing the number of preflight requests while 
maintaining a reasonable window for policy updates.

### Sources

1. Cross-Origin Resource Sharing (CORS) - 
https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
2. CORS Security Guidelines - 
https://owasp.org/www-community/attacks/CORS_OriginHeaderScrutiny