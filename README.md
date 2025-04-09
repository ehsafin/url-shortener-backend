# URL Shortener

This project is a production-ready, horizontally scalable URL shortener system based on a microservices architecture. It consists of two main services:

- **Create Service**: Handles short URL generation
- **Redirect Service**: Handles fast URL redirection

Both services communicate with shared PostgreSQL and Redis instances and are containerized using Docker.

<br />
<br />

# Features

- Fast redirects using Redis cache
- Unique short code generation using NanoID
- Optional custom alias and expiration support
- Separated microservices for scalability and maintainability
- Dockerized and deployable via Docker Compose or on AWS EC2
- Health check endpoints for service monitoring

<br />
<br />

# Folder Structure

├── create-service/
│ └── Handles POST /shorten
├── redirect-service/
│ └── Handles GET /:shortCode
├── docker-compose.yml
└── README.md

<br />
<br />

# Health Checks

- Create Service: GET /health (Port 3001)
- Redirect Service: GET /health (Port 3002)

<br />
<br />

# BOTEC Calculation

### Traffic Assumptions

- 100M Daily Active Users (DAU)
- 1B total shortened URLs
- Assume each user shortens 1 URL/day
- Assume each short URL is redirected 3 times on average

### Request Estimates

- Shorten requests/day: 100M
- Redirect requests/day: 300M
- Total requests/day: 400M
- Peak load assumption (10x avg): ~4,000 RPS

### Latency Breakdown

- Redis lookup: 1–5ms
- DB fallback: 30–50ms
- Internal logic + response: < 50ms
- **Total target latency**: ~200ms max

### Storage Estimate (Per URL Entry)

| Field             | Size Estimate |
| ----------------- | ------------- |
| shortCode         | 8 bytes       |
| originalUrl       | 100 bytes     |
| expirationTime    | 8 bytes       |
| userId/timestamp  | 16 bytes      |
| customAlias       | 10 bytes      |
| **Total per URL** | ~150 bytes    |

- 1B URLs × 150 bytes = 150 GB
- (+) 30% for indexing/overhead = ~200 GB DB
- Redis cache for top 10% (~100M) URLs = ~10 GB

### EC2 Instance Estimate

| Component        | Recommended Instance | Monthly Est. Cost |
| ---------------- | -------------------- | ----------------- |
| Redirect Service | t3.small             | ~$16              |
| Create Service   | t3.micro             | ~$8               |
| Redis            | t3.micro             | ~$15–20           |
| PostgreSQL (RDS) | db.t3.micro + 10GB   | ~$15–20           |
| **Total Infra**  | —                    | **~$60–70/month** |

<br />
<br />

# Run Locally with Docker Compose

1. Clone the repo

```bash
git clone <repo-url>
cd url-shortener
```

2. Start services

```bash
docker compose up --build
```

3. Test endpoints

- POST: http://localhost:3001/api/shorten
- GET: http://localhost:3002/{shortcode}

<br />
<br />

# Deployment Notes

- Use separate EC2 instances for each microservice
- Shared RDS or EC2 instance for PostgreSQL
- Shared Redis EC2 Instance
- Place all the resources in the same VPC for low latency

<br />
<br />

# Environment Variables

.env in both services should define

```bash
PORT=YOUR_SERVER_PORT
BASE_URL=http://localhost:<PORT>
DATABASE_URL= <YOUR POSTGRES CONNECTION URL>
REDIS_HOST= <REDIS_HOST>
REDIS_PORT= <REDIS_PORT>
```
