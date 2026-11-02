# Madhu Silks — Production Deployment Guide

## 1. Containerized Deployment via Docker Compose
For VPS deployments (AWS EC2, DigitalOcean Droplet, Linode, or Hetzner Ubuntu server):

1. Clone the repository onto your server:
   ```bash
   git clone https://github.com/your-username/madhu-silks.git /var/www/madhu-silks
   cd /var/www/madhu-silks
   ```

2. Copy `.env.example` to `.env` and fill in your production credentials:
   ```bash
   cp .env.example .env
   nano .env
   ```

3. Build and launch all services (PostgreSQL, Redis, Django backend, Next.js frontend, Nginx):
   ```bash
   docker compose up -d --build
   ```

4. Run database migrations and seed initial data:
   ```bash
   docker compose exec backend python manage.py migrate
   docker compose exec backend python manage.py seed_data
   ```

5. Set up SSL with Certbot:
   ```bash
   sudo certbot --nginx -d madhusilks.com -d www.madhusilks.com
   ```

---

## 2. Serverless Frontend (Vercel) + Managed Backend (Render / Railway / AWS)
- **Frontend**: Connect your GitHub repository to [Vercel](https://vercel.com). Set the root directory to `frontend`. Add environment variable:
  `NEXT_PUBLIC_API_URL=https://api.madhusilks.com/api/v1`
- **Backend**: Deploy `backend/` to Railway, Render, or AWS Elastic Beanstalk using Python 3.12 with Gunicorn. Attach a Managed PostgreSQL database and set `DATABASE_URL`.
- **Media CDN**: Add Cloudinary credentials (`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`) so high-resolution product photography is served via global edge CDN.
