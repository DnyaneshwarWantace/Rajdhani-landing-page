# Landing Page Deployment Guide

## Overview
Deploy landing page to **rajdhanicarpets.com** using the same backend at **rajdhanicarpets.com/api**

## 1. Build for Production

```bash
cd /Users/dnyaneshwarwantace/Downloads/rajdhani/landingpage
npm run build
```

This creates a `dist` folder with optimized files.

## 2. Upload to Server

```bash
# From your local machine, upload to server
scp -r dist/* your-user@your-server-ip:/var/www/rajdhanicarpets.com/
```

## 3. Nginx Configuration

Create new config file on your server:

```bash
sudo nano /etc/nginx/sites-available/rajdhanicarpets.com
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name rajdhanicarpets.com www.rajdhanicarpets.com;

    # Landing page root
    root /var/www/rajdhanicarpets.com;
    index index.html;

    # Landing page - serve static files
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy to backend (same backend as rajdhani.wantace.com)
    location /api/ {
        proxy_pass http://localhost:8000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Socket.io
    location /socket.io/ {
        proxy_pass http://localhost:8000/socket.io/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

## 4. Enable Site

```bash
sudo ln -s /etc/nginx/sites-available/rajdhanicarpets.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 5. SSL Certificate (HTTPS)

```bash
sudo certbot --nginx -d rajdhanicarpets.com -d www.rajdhanicarpets.com
```

## 6. Restart Backend (to load new CORS settings)

```bash
pm2 restart backend
# or
sudo systemctl restart rajdhani-backend
```

## Done!

Your landing page will be live at:
- **https://rajdhanicarpets.com** → Landing page
- **https://rajdhanicarpets.com/api** → Backend API

The same backend also serves:
- **https://rajdhani.wantace.com/api** → V1 & V2 frontends
