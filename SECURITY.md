## Helmet.js Configuration

### Configuration Applied

\`\`\`typescript helmet({ contentSecurityPolicy: false, hsts: { maxAge:
31536000, includeSubDomains: true }, frameguard: { action: "deny" }, // ...
other options }); \`\`\`

### Justification

1. **contentSecurityPolicy: false** - Disabled because this API returns only
   JSON data and does not serve HTML content. CSP is designed to prevent XSS in
   browsers rendering HTML.

2. **hsts** - Enabled with 1-year max-age to enforce HTTPS connections...

### Sources

1. Helmet.js Official Documentation - https://helmetjs.github.io/
2. OWASP Secure Headers Project - https://owasp.org/www-project-secure-headers/