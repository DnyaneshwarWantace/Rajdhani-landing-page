# Quick Deployment - Copy & Paste Commands

## 1. Point DNS (Do on Domain Registrar Website)
```
Type: A, Name: @, Value: YOUR_SERVER_IP
Type: A, Name: www, Value: YOUR_SERVER_IP
```

## 2. Build Locally
```bash
cd /Users/dnyaneshwarwantace/Downloads/rajdhani/landingpage
npm install
npm run build
```

## 3. Setup Server Directory
```bash
ssh your-user@your-server-ip
sudo mkdir -p /var/www/rajdhanicarpets.com
sudo chown -R $USER:$USER /var/www/rajdhanicarpets.com
exit
```

## 4. Upload Files
```bash
cd /Users/dnyaneshwarwantace/Downloads/rajdhani/landingpage
scp -r dist/* your-user@your-server-ip:/var/www/rajdhanicarpets.com/
```

## 5. Create Nginx Config (On Server)
```bash
ssh your-user@your-server-ip
sudo nano /etc/nginx/sites-available/rajdhanicarpets.com
```
Copy the config from DEPLOYMENT_COMPLETE.md, paste, save (Ctrl+X, Y, Enter)

## 6. Enable Site
```bash
sudo ln -s /etc/nginx/sites-available/rajdhanicarpets.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 7. Install Certbot (if not installed)
```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx -y
```

## 8. Get SSL Certificate
```bash
sudo certbot --nginx -d rajdhanicarpets.com -d www.rajdhanicarpets.com
```
Follow prompts: Enter email → Y → N

## 9. Update Backend .env
```bash
cd /path/to/backend
nano .env
```
Add line:
```
FRONTEND_URLS=https://rajdhani.wantace.com,https://rajdhanicarpets.com,http://localhost:3000,http://localhost:5173
```

## 10. Restart Backend
```bash
pm2 restart backend
```

## DONE! 🎉
Visit: https://rajdhanicarpets.com
