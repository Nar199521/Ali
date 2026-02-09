# AliaxPress CloudPanel Deployment Guide

## Overview
Your application is now fully configured with:
- ✅ Database-driven product/category/user management
- ✅ Secure authentication (signup/signin with bcrypt password hashing)
- ✅ Product image uploads to Cloudinary
- ✅ Bangladeshi Taka (BDT) currency display
- ✅ ShurjoPay payment integration
- ✅ Order management system

## Step 1: Prepare Your CloudPanel Environment

### SSH into Your Server
```bash
ssh -i /path/to/your/key your_user@aliaxpress.online
```

## Step 2: Create MySQL Database

### Option A: Using CloudPanel UI
1. Log into CloudPanel dashboard (https://aliaxpress.online:8443)
2. Go to **Databases** → **Create Database**
3. **Database Name:** `Mydb` (or your preferred name)
4. **Database User:** `aliaxpressdb`
5. **Database Password:** `Ali@2026` (or your secure password)
6. Click **Create**
7. Note the database host (usually `127.0.0.1` or `localhost`)

### Option B: Using MySQL CLI
```bash
# SSH into server, then:
mysql -u root -p
```

```sql
CREATE DATABASE Mydb;
CREATE USER 'aliaxpressdb'@'127.0.0.1' IDENTIFIED BY 'Ali@2026';
GRANT ALL PRIVILEGES ON Mydb.* TO 'aliaxpressdb'@'127.0.0.1';
FLUSH PRIVILEGES;
EXIT;
```

## Step 3: Import Database Schema

### Copy schema.sql to Server
From your local machine:
```bash
scp -i /path/to/your/key schema.sql your_user@aliaxpress.online:~/schema.sql
```

### Import the Schema
```bash
# SSH to server
mysql -u aliaxpressdb -p -h 127.0.0.1 Mydb < ~/schema.sql
# Enter password: Ali@2026
```

### Verify Tables Were Created
```bash
mysql -u aliaxpressdb -p -h 127.0.0.1 Mydb -e "SHOW TABLES;"
# You should see: categories, orders, order_items, product_images, products, sellers, uploads, users
```

## Step 4: Configure Environment Variables in CloudPanel

### Go to CloudPanel Site Settings
1. CloudPanel → **Website** → Select your site (`/`)
2. Navigate to **Environment Variables** or **Edit Vhost**
3. Add the following variables:

#### Database Configuration
```
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USER=aliaxpressdb
MYSQL_PASSWORD=Ali@2026
MYSQL_DATABASE=Mydb
```

#### Site Configuration
```
NEXT_PUBLIC_SITE_URL=https://aliaxpress.online
NODE_ENV=production
```

#### Cloudinary (for image uploads)
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=aliaxpress
```

Get these from: https://cloudinary.com → Dashboard

#### ShurjoPay (for payments)
```
SHURJOPAY_BASE_URL=https://secure.shurjopay.com
SHURJOPAY_VENDOR_ID=your_vendor_id
SHURJOPAY_SECRET=your_secret_key
SHURJOPAY_RETURN_URL=https://aliaxpress.online/api/payment/verify
```

Get these from: https://shurjopay.com

### Save and Restart
- Click **Save**
- Restart Node process:
```bash
# Via CloudPanel UI: Website → Restart App
# Or via CLI:
sudo systemctl restart your-app-name
```

## Step 5: Install Dependencies and Build

### Install Dependencies
```bash
cd /var/www/aliaxpress
npm install
```

### Build Production Bundle
```bash
npm run build
```

### Start Application
```bash
npm start
# Or use PM2 if configured:
pm2 restart aliaxpress
```

## Step 6: Verify Setup

### Test Database Connection
```bash
curl https://aliaxpress.online/api/categories
```

Expected response:
```json
{
  "success": true,
  "data": []
}
```

### Check Authentication
```bash
curl -X POST https://aliaxpress.online/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"testpass123"}'
```

Expected response:
```json
{
  "success": true,
  "userId": 1,
  "email": "test@example.com",
  "username": "testuser",
  "message": "Signup successful. Please sign in."
}
```

## Step 7: Setup Admin Console (Optional)

### Create First Admin User
```bash
mysql -u aliaxpressdb -p -h 127.0.0.1 Mydb
```

```sql
-- Create a test admin user
INSERT INTO users (username, email, password) VALUES (
  'admin',
  'admin@aliaxpress.online',
  '$2a$10$...hashed_password_here...'
);

-- Note: Use bcrypt-hashed password. You can generate one by:
-- 1. Running signup and checking the database
-- 2. Or using: node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('your_pass', 10))"
```

## Step 8: Seed Initial Data (Optional)

### Add Sample Categories
```bash
curl -X POST https://aliaxpress.online/api/categories \
  -H "Content-Type: application/json" \
  -H "Cookie: session={\"id\":1,\"email\":\"admin@aliaxpress.online\",\"isAdmin\":true}" \
  -d '{"name":"Electronics","image_url":"https://via.placeholder.com/300"}'
```

## Step 9: Configure Cloudinary Upload Preset

### Cloudinary Dashboard
1. Go to https://cloudinary.com/console
2. Settings → Upload → **Unsigned Upload Preset**
3. Create preset named: `aliaxpress`
4. Set settings:
   - Max file size: 5 MB
   - Allowed formats: jpg, png, webp, gif
   - Transformation:
     - Width: 800 (optional auto-crop)
     - Quality: auto

## Step 10: Test Main Workflows

### User Registration & Login
1. Visit https://aliaxpress.online/signup
2. Create account with email/password
3. Go to https://aliaxpress.online/signin
4. Login with credentials

### Product Upload (Admin/Seller)
1. After login, visit /add-product
2. Enter product details (name, price, category, image)
3. Upload image (auto uploads to Cloudinary)
4. Submit form
5. Verify in database:
```bash
mysql -u aliaxpressdb -p -h 127.0.0.1 Mydb -e "SELECT * FROM products;"
```

###Checkout & Payment
1. Add products to cart from homepage
2. Go to /cart
3. Click "Checkout"
4. Enter shipping info
5. Click "Pay with ShurjoPay"
6. Should redirect to ShurjoPay payment page

## Troubleshooting

### 500 Error on API Calls
- Check environment variables are set: `echo $MYSQL_HOST`
- Verify database is running: `mysql -u root -p -e "SHOW DATABASES;"`
- Check logs: `tail -f /var/www/aliaxpress/logs/error.log` (if available)

### Database Connection Refused
```bash
# Verify MySQL is listening
netstat -tlnp | grep 3306
# Or test connection:
mysql -u aliaxpressdb -p -h 127.0.0.1 Mydb -e "SELECT 1;"
```

### Cloudinary Upload Fails
- Verify `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is set
- Check preset exists in Cloudinary dashboard
- Test via: `curl -X POST https://aliaxpress.online/api/uploads`

### Payment Integration Not Working
- Verify ShurjoPay credentials in environment
- Check `SHURJOPAY_RETURN_URL` matches your domain
- Test webhook endpoint is publicly accessible

## Backup & Maintenance

### Daily Backup Script
```bash
#!/bin/bash
# /home/user/backup-db.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/home/user/backups"
mkdir -p $BACKUP_DIR

mysqldump -u aliaxpressdb -p"Ali@2026" -h 127.0.0.1 Mydb > $BACKUP_DIR/Mydb_$DATE.sql

# Keep only last 7 days
find $BACKUP_DIR -name "Mydb_*.sql" -mtime +7 -delete
```

### Add to Crontab
```bash
crontab -e
# Add line:
0 2 * * * /home/user/backup-db.sh
```

## Support

For issues:
1. Check CloudPanel logs
2. Test API endpoints directly
3. Verify environment variables match
4. Ensure ports 22, 80, 443 are open
5. Check MySQL user permissions

## Next Steps

- [ ] Test payment gateway with test credentials
- [ ] Setup SSL certificate renewal automation
- [ ] Configure email service for notifications
- [ ] Implement seller verification workflow
- [ ] Setup analytics dashboard
- [ ] Create mobile app integration

---

**Last Updated:** February 6, 2026
**Version:** 1.0
