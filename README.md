# 🚀 Full-Stack Deployment on AWS EC2 — React + Nginx + Node.js

This guide explains how to deploy a **React/Vite frontend** on a public AWS EC2 instance using **Nginx**, and a **Node.js backend** on a private AWS EC2 instance.

## 📑 Quick Navigation

- [🖥️ Backend Deployment](#️-2-backend-deployment--private-ec2)
- [🌐 Frontend Deployment](#-5-frontend-deployment--public-ec2)

---


---

# 🏗️ Architecture

```text
                         🌍 Internet
                              │
                              ▼
                    ┌───────────────────┐
                    │   Frontend EC2    │
                    │   Public EC2      │
                    │   Nginx :80       │
                    │   React/Vite      │
                    └─────────┬─────────┘
                              │
                              │ /api/*
                              ▼
                    ┌───────────────────┐
                    │    Backend EC2    │
                    │   Private EC2     │
                    │ 10.0.154.92       │
                    │   Node.js :3600   │
                    │      PM2          │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │     Database      │
                    │   MySQL / RDS     │
                    └───────────────────┘
```

### Deployment Model

* **Frontend EC2** → Private
* **Backend EC2** → Private
* **Nginx** → Serves React and reverse proxies API requests
* **Node.js** → Backend API
* **PM2** → Node.js process manager
* **MySQL/RDS** → Database
* **AWS Security Groups** → Control network access

---

# 📋 Prerequisites

## Frontend EC2

* AWS EC2 instance
* Amazon Linux
* Public IP
* Node.js
* npm
* Git
* Nginx
* Frontend GitHub repository

## Backend EC2

* AWS EC2 instance
* Amazon Linux
* Private IP
* Node.js
* npm
* Git
* PM2
* Backend GitHub repository

## AWS Requirements

* Both EC2 instances should be in the same VPC or have appropriate network connectivity.
* Backend port `3600` should only be accessible from the frontend EC2 Security Group.
* Frontend port `80` should be publicly accessible.

---

# 🔐 1. AWS Security Group Configuration

## Frontend EC2 Security Group

Allow:

| Type  | Port | Source      |
| ----- | ---: | ----------- |
| HTTP  |   80 | `0.0.0.0/0` |
| HTTPS |  443 | `0.0.0.0/0` |
| SSH   |   22 | Your IP     |

## Backend EC2 Security Group

Allow:

| Type       | Port | Source                         |
| ---------- | ---: | ------------------------------ |
| Custom TCP | 3600 | Frontend EC2 Security Group    |
| SSH        |   22 | Bastion / SSM / Allowed Source |

> ⚠️ **Do not expose backend port `3600` to `0.0.0.0/0`.**

---

# 🖥️ 2. Backend Deployment — Private EC2

## Step 2.1: Create Backend EC2

Create a second EC2 instance for your Node.js backend.

Example:

```text
Backend EC2
Private IP: 10.0.154.92
Application Port: 3600
```

The backend EC2 does **not** need a public IP.

---

## Step 2.2: Connect to Backend EC2

Because the backend EC2 is private, use one of:

* AWS Systems Manager Session Manager
* Bastion Host
* SSH through a jump host

Example through a bastion:

```bash
ssh -i your-key.pem ec2-user@BASTION_PUBLIC_IP
```

Then:

```bash
ssh ec2-user@10.0.154.92
```

---

## Step 2.3: Install Node.js

Update the system:

```bash
sudo dnf update -y
```

Install Node.js 22:

```bash
curl -fsSL https://rpm.nodesource.com/setup_22.x | sudo bash -
sudo dnf install -y nodejs
```

Verify:

```bash
node -v
npm -v
```

---

## Step 2.4: Install Git

```bash
sudo dnf install git -y
```

Verify:

```bash
git --version
```

---

## Step 2.5: Clone Backend Repository

```bash
git clone <YOUR_BACKEND_REPOSITORY_URL>
```

Example:

```bash
git clone https://github.com/ChandraShekharSaini/VidTRim-VideoCompressor-AWS.git
```

Move into the project:

```bash
cd server
```

---

## Step 2.6: Install Backend Dependencies

```bash
npm install
```

Verify:

```bash
npm list --depth=0
```

---

## Step 2.7: Configure Environment Variables

Create the production environment file:

```bash
nano .env
```

Example:

```env
PORT=3600

DB_HOST=your-database-host
DB_PORT=3306
DB_NAME=your_database
DB_USER=your_database_user
DB_PASSWORD=your_database_password

JWT_SECRET=your-production-secret

REDIS_HOST=your-redis-host
REDIS_PORT=6379
```

Use the variables required by your application.

> ⚠️ **Never commit `.env` or production secrets to GitHub.**

---

## Step 2.8: Configure Node.js Server

Make sure your Node.js application listens on `0.0.0.0`.

Example:

```javascript
const PORT = process.env.PORT || 3600;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
```

Do **not** use only:

```javascript
app.listen(PORT, "localhost");
```

The frontend EC2 needs to access the backend through the backend's private IP.

---

## Step 2.9: Test Node.js Backend

Start the application:

```bash
npm start
```

Or:

```bash
node server.js
```

Test locally:

```bash
curl http://localhost:3600
```

Test an API endpoint:

```bash
curl http://localhost:3600/api/query/footer/message
```

Stop the application:

```text
CTRL + C
```

---

# ⚙️ 3. Configure PM2

## Step 3.1: Install PM2

```bash
sudo npm install -g pm2
```

Verify:

```bash
pm2 -v
```

---

## Step 3.2: Start Node.js with PM2

If your entry file is `server.js`:

```bash
pm2 start server.js --name backend
```

If your entry file is `app.js`:

```bash
pm2 start app.js --name backend
```

Or use the `npm start` script:

```bash
pm2 start npm --name backend -- start
```

Check:

```bash
pm2 status
```

Expected:

```text
backend    online
```

---

## Step 3.3: Check Backend Logs

```bash
pm2 logs backend
```

Or:

```bash
pm2 logs backend --lines 100
```

---

## Step 3.4: Enable PM2 on Reboot

Run:

```bash
pm2 startup
```

PM2 will provide a command.

Run that command and then:

```bash
pm2 save
```

The Node.js backend will now automatically restart after an EC2 reboot.

---

## Step 3.5: Verify Backend Port

Check:

```bash
sudo ss -lntp | grep 3600
```

You should see:

```text
0.0.0.0:3600
```

Verify the private IP:

```bash
hostname -I
```

Example:

```text
10.0.154.92
```

---

# 🧪 4. Test Backend Connectivity

Now connect to the **frontend EC2**.

Test the backend:

```bash
curl http://10.0.154.92:3600
```

Test an API:

```bash
curl http://10.0.154.92:3600/api/query/footer/message
```

If you receive a response, the frontend EC2 can communicate with the private backend EC2.

---

# 🌐 5. Frontend Deployment — Public EC2

## Step 5.1: Connect to Frontend EC2

```bash
ssh -i your-key.pem ec2-user@YOUR_FRONTEND_PUBLIC_IP
```

---

## Step 5.2: Clone Frontend Repository

```bash
git clone <YOUR_FRONTEND_REPOSITORY_URL>
```

Example:

```bash
git clone https://github.com/ChandraShekharSaini/VidTRim-VideoCompressor-AWS.git
```

Move into the project:

```bash
cd frontend-main
```

---

## Step 5.3: Install Dependencies

```bash
npm install
```

Verify:

```bash
npm list --depth=0
```

---

## Step 5.4: Build React Application

```bash
npm run build
```

A `dist` folder will be generated.

Verify:

```bash
ls dist
```

Expected:

```text
assets/
index.html
...
```

---

# 🌐 6. Install and Configure Nginx

## Step 6.1: Install Nginx

Amazon Linux:

```bash
sudo yum install nginx -y
```

Start Nginx:

```bash
sudo systemctl start nginx
```

Enable Nginx on boot:

```bash
sudo systemctl enable nginx
```

Check status:

```bash
sudo systemctl status nginx
```

---

## Step 6.2: Remove Default Nginx Files

```bash
sudo rm -rf /usr/share/nginx/html/*
```

Verify:

```bash
ls -la /usr/share/nginx/html
```

---

## Step 6.3: Copy React Build

```bash
sudo cp -r dist/* /usr/share/nginx/html/
```

Verify:

```bash
ls /usr/share/nginx/html
```

Expected:

```text
index.html
assets/
...
```

---

# 🔀 7. Configure Nginx Reverse Proxy

Create the configuration file:

```bash
sudo nano /etc/nginx/conf.d/frontend.conf
```

Add:

```nginx
server {
    listen 80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    # React/Vite frontend
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Node.js backend
    location /api/ {
        proxy_pass http://10.0.154.92:3600;

        proxy_http_version 1.1;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Important

There is **no `/` after `3600`**:

```nginx
proxy_pass http://10.0.154.92:3600;
```

Therefore:

```text
/api/query/footer/message
```

is forwarded to:

```text
http://10.0.154.92:3600/api/query/footer/message
```

---

# ⚛️ 8. Configure Axios

Do **not** use:

```javascript
baseURL: "http://44.207.202.196:3600"
```

Do **not** directly use the backend private IP from React.

Use:

```javascript
import axios from "axios";

const serverUrl = axios.create({
  baseURL: "/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default serverUrl;
```

Make API requests:

```javascript
serverUrl.get("api/query/footer/message");
```

The request flow becomes:

```text
Browser
   │
   │ /api/query/footer/message
   ▼
Frontend EC2
   │
   │ Nginx
   ▼
10.0.154.92:3600
   │
   │ Node.js
   ▼
Database / Redis
```

---

# ✅ 9. Validate Nginx

Test the configuration:

```bash
sudo nginx -t
```

Expected:

```text
syntax is ok
test is successful
```

Reload Nginx:

```bash
sudo systemctl reload nginx
```

---

# 🧪 10. Final Testing

## Test Node.js from Backend EC2

```bash
curl http://localhost:3600/api/query/footer/message
```

## Test Backend from Frontend EC2

```bash
curl http://10.0.154.92:3600/api/query/footer/message
```

## Test Nginx Reverse Proxy

On the frontend EC2:

```bash
curl http://localhost/api/query/footer/message
```

## Test Frontend

Open:

```text
http://YOUR_FRONTEND_PUBLIC_IP
```

Or:

```text
http://YOUR_DOMAIN_NAME
```

---

# 🔍 11. Troubleshooting

### Nginx status

```bash
sudo systemctl status nginx
```

### Test Nginx configuration

```bash
sudo nginx -t
```

### Nginx access logs

```bash
sudo tail -f /var/log/nginx/access.log
```

### Nginx error logs

```bash
sudo tail -f /var/log/nginx/error.log
```

### PM2 status

```bash
pm2 status
```

### Node.js logs

```bash
pm2 logs backend
```

### Check backend port

```bash
sudo ss -lntp | grep 3600
```

### Test backend

```bash
curl http://10.0.154.92:3600
```

### Test reverse proxy

```bash
curl http://localhost/api/query/footer/message
```

---

# 🔐 12. Final Architecture

```text
                         🌍 Internet
                              │
                              ▼
                    ┌───────────────────┐
                    │   Frontend EC2    │
                    │                   │
                    │ Public IP         │
                    │ Nginx :80         │
                    │ React/Vite        │
                    └─────────┬─────────┘
                              │
                              │ /api/*
                              ▼
                    ┌───────────────────┐
                    │    Backend EC2    │
                    │                   │
                    │ Private IP        │
                    │ 10.0.154.92       │
                    │ Node.js :3600     │
                    │ PM2               │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │     Database      │
                    │   MySQL / RDS     │
                    └───────────────────┘
```

## 🔒 Security Principle

```text
Internet
   │
   └──► Frontend EC2 :80
             │
             └──► Backend EC2 :3600
                       │
                       └──► Database
```

Only the **frontend EC2** is publicly accessible.

The **Node.js backend remains private** and accepts traffic only from the frontend EC2 Security Group.
