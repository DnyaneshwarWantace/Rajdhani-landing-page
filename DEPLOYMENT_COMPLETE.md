# Complete Deployment Guide - Landing Page to rajdhanicarpets.com

## Step 1: Point Domain to Server (Do This First!)

1. Login to your domain registrar (GoDaddy, Namecheap, etc.)
2. Go to DNS settings for `rajdhanicarpets.com`
3. Add these records:

```
Type: A
Name: @
Value: YOUR_SERVER_IP

Type: A
Name: www
Value: YOUR_SERVER_IP
```

4. Save and wait 5-10 minutes for DNS to propagate

---

## Step 2: Build Landing Page on Local Machine

```bash
cd /Users/dnyaneshwarwantace/Downloads/rajdhani/landingpage

# Install dependencies (if not done)
npm install

# Build for production
npm run build
```

This creates a `dist` folder with all files.

---

## Step 3: Upload Files to Server

### A. SSH into your server:
```bash
ssh your-user@your-server-ip
```

### B. Create directory on server:
```bash
sudo mkdir -p /var/www/rajdhanicarpets.com
sudo chown -R $USER:$USER /var/www/rajdhanicarpets.com
exit
```

### C. Upload files from local machine:
```bash
cd /Users/dnyaneshwarwantace/Downloads/rajdhani/landingpage

# Upload dist folder (replace with your server details)
scp -r dist/* your-user@your-server-ip:/var/www/rajdhanicarpets.com/
```

---

## Step 4: Create Nginx Configuration

SSH back into server:
```bash
ssh your-user@your-server-ip
```

Create new Nginx config file:
```bash
sudo nano /etc/nginx/sites-available/rajdhanicarpets.com
```

**Paste this configuration:**

```nginx
server {
    listen 80;
    server_name rajdhanicarpets.com www.rajdhanicarpets.com;

    # Increase body size limit (50MB)
    client_max_body_size 50M;
    client_body_buffer_size 50M;

    # Landing page root
    root /var/www/rajdhanicarpets.com;
    index index.html;

    # Landing page - serve static files
    location / {
        try_files $uri $uri/ /index.html;

        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # Proxy Socket.IO requests to backend
    location /socket.io/ {
        proxy_pass http://localhost:8000/socket.io/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
        proxy_buffering off;
    }

    # Proxy API requests to backend (same backend as rajdhani.wantace.com)
    location /api {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

**Save and exit:** Press `Ctrl+X`, then `Y`, then `Enter`

---

## Step 5: Enable the Site

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/rajdhanicarpets.com /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t
```

**You should see:** `syntax is ok` and `test is successful`

```bash
# Reload Nginx
sudo systemctl reload nginx
```

---

## Step 6: Install Certbot (SSL Certificate Tool)

**If certbot is NOT installed:**

```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx -y
```

**If already installed, skip this step.**

---

## Step 7: Get SSL Certificate (HTTPS)

**Run this command:**

```bash
sudo certbot --nginx -d rajdhanicarpets.com -d www.rajdhanicarpets.com
```

**Follow the prompts:**

1. **Enter email address:** Type your email and press Enter
2. **Agree to Terms of Service:** Type `Y` and press Enter
3. **Share email with EFF:** Type `N` (optional) and press Enter

**Certbot will automatically:**
- Download SSL certificate from Let's Encrypt
- Configure Nginx to use HTTPS
- Set up auto-renewal (certificate renews every 90 days automatically)

**You should see:** `Successfully deployed certificate`

---

## Step 8: Update Backend Environment Variables

On your server, edit backend `.env`:

```bash
cd /path/to/your/backend
nano .env
```

**Find this line:**
```
FRONTEND_URL=https://rajdhani.wantace.com
```

**Add this line below it:**
```
FRONTEND_URLS=https://rajdhani.wantace.com,https://rajdhanicarpets.com,http://localhost:3000,http://localhost:5173
```

**Save and exit:** Press `Ctrl+X`, then `Y`, then `Enter`

---

## Step 9: Restart Backend

```bash
# If using PM2
pm2 restart backend

# OR if using systemctl
sudo systemctl restart rajdhani-backend

# Check status
pm2 status
# OR
sudo systemctl status rajdhani-backend
```

---

## Step 10: Test Your Site

Open browser and visit:
- **http://rajdhanicarpets.com** → Should redirect to HTTPS
- **https://rajdhanicarpets.com** → Should show landing page with SSL lock icon
- **https://rajdhanicarpets.com/api** → Should work (backend API)

---

## Troubleshooting

### If site shows "502 Bad Gateway":
```bash
# Check if backend is running
pm2 status
# OR
sudo systemctl status rajdhani-backend

# Restart backend
pm2 restart backend
```

### If site shows "Connection Refused":
```bash
# Check Nginx status
sudo systemctl status nginx

# Restart Nginx
sudo systemctl restart nginx
```

### If images not loading:
```bash
# Check file permissions
ls -la /var/www/rajdhanicarpets.com

# Fix permissions if needed
sudo chown -R www-data:www-data /var/www/rajdhanicarpets.com
sudo chmod -R 755 /var/www/rajdhanicarpets.com
```

### Check Nginx error logs:
```bash
sudo tail -f /var/log/nginx/error.log
```

### Check SSL certificate status:
```bash
sudo certbot certificates
```

### Force renew SSL certificate (if needed):
```bash
sudo certbot renew --force-renewal
```

---

## Certificate Auto-Renewal

Certbot automatically renews certificates. To test auto-renewal:

```bash
sudo certbot renew --dry-run
```

If successful, your certificate will auto-renew every 90 days!

---

## Summary

After completing all steps, you will have:

✅ **https://rajdhanicarpets.com** → Landing page with SSL
✅ **https://rajdhanicarpets.com/api** → Backend API
✅ **https://rajdhani.wantace.com** → Old frontend (still working)
✅ **https://rajdhani.wantace.com/v2** → New frontend (still working)
✅ **https://rajdhani.wantace.com/api** → Backend API (still working)

**All using the SAME backend server at port 8000!**

---

## Need Help?

If you get stuck, check:
1. DNS has propagated: https://dnschecker.org
2. Nginx is running: `sudo systemctl status nginx`
3. Backend is running: `pm2 status`
4. Nginx error logs: `sudo tail -f /var/log/nginx/error.log`
5. Backend logs: `pm2 logs backend`
