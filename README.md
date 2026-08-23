# 🚀 Frontend Deployment on AWS EC2 using Nginx

This guide explains how to deploy a React/Vite frontend application on an AWS EC2 instance using Nginx.

---

# 📋 Prerequisites

Before starting, make sure you have:

* AWS EC2 Instance running Amazon Linux
* Security Group allowing HTTP (80)
* Node.js and npm installed
* Nginx installed
* Project source code available on GitHub

---

# Step 1: Connect to EC2

```bash
ssh -i your-key.pem ec2-user@YOUR_PUBLIC_IP
```

---

# Step 2: Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Example:

```bash
git clone https://github.com/username/frontend-main.git
```

Move into the project directory:

```bash
cd frontend-main
```

---

# Step 3: Install Dependencies

```bash
npm install
```

Verify installation:

```bash
npm list
```

---

# Step 4: Build the React Application

Create the production build:

```bash
npm run build
```

After successful build, a `dist` folder will be generated.

Verify:

```bash
ls dist
```

Expected output:

```text
assets
index.html
favicon.ico
...
```

---

# Step 5: Install Nginx

Amazon Linux:

```bash
sudo yum install nginx -y
```

Start Nginx:

```bash
sudo systemctl start nginx
```

Enable on boot:

```bash
sudo systemctl enable nginx
```

Verify:

```bash
sudo systemctl status nginx
```

---

# Step 6: Remove Default Nginx Files

```bash
sudo rm -rf /usr/share/nginx/html/*
```

Verify:

```bash
ls -la /usr/share/nginx/html
```

---

# Step 7: Copy React Build Files

```bash
sudo cp -r dist/* /usr/share/nginx/html/
```

Verify:

```bash
ls /usr/share/nginx/html
```

You should see:

```text
index.html
assets/
...
```

---

# Step 8: Configure Nginx

Open configuration file:

```bash
sudo nano /etc/nginx/conf.d/frontend.conf
```

Paste:

```nginx
server {
    listen 80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    # React frontend
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Backend reverse proxy
    location /api/ {
        proxy_pass http://BACKEND_PRIVATE_IP:3306/;

        proxy_http_version 1.1;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Replace:

```text
BACKEND_PRIVATE_IP
```

with your backend private IP.

Example:

```text
10.0.154.92
```

Save and exit.

---

# Step 9: Validate Configuration

```bash
sudo nginx -t
```

Expected:

```text
syntax is ok
test is successful
```

---

# Step 10: Reload Nginx

```bash
sudo systemctl reload nginx
```

---

# Step 11: Configure Axios

Create API instance:

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

---

# Step 12: Make API Requests

Example:

```javascript
serverUrl.get("api/query/footer/message");
```

Generated URL:

```text
/api/query/footer/message
```

Nginx forwards it to:

```text
http://BACKEND_PRIVATE_IP:3600/api/query/footer/message
```

---

# Step 13: Verify Deployment

Open browser:

```text
http://YOUR_EC2_PUBLIC_IP
```

or

```text
http://YOUR_DOMAIN_NAME
```

Your React application should load successfully.

---

# Step 14: Troubleshooting

Check Nginx status:

```bash
sudo systemctl status nginx
```

Check access logs:

```bash
sudo tail -f /var/log/nginx/access.log
```

Check error logs:

```bash
sudo tail -f /var/log/nginx/error.log
```

Verify backend connectivity:

```bash
curl http://BACKEND_PRIVATE_IP:3600
```

Verify Nginx proxy:

```bash
curl http://localhost/api/query/footer/message
```

---


# 🚀 Full-Stack Deployment on AWS EC2 — React/Vite + Nginx + Node.js

This guide explains how to deploy a **React/Vite frontend** on a public AWS EC2 instance using **Nginx**, and a **Node.js backend** on a private AWS EC2 instance.

---

## 🏗️ Architecture

```text
                         Internet
                            │
                            ▼
                  ┌──────────────────┐
                  │  Frontend EC2    │
                  │  Public IP       │
                  │  Nginx :80       │
                  └────────┬─────────┘
                           │
                           │ /api/*
                           ▼
                  ┌──────────────────┐
                  │   Backend EC2    │
                  │   Private IP     │
                  │  10.0.154.92     │
                  │   Node.js :3600  │
                  │      PM2         │
                  └────────┬─────────┘
                           │
                           ▼
                    Database / Redis
```

### Deployment Model

* **Frontend EC2** → Public
* **Backend EC2** → Private
* **Nginx** → Reverse Proxy
* **Node.js** → Backend API
* **React/Vite** → Frontend
* **PM2** → Node.js Process Manager
* **AWS Security Groups** → Network Security

---

# 📋 Prerequisites

### Frontend EC2

* AWS EC2
* Amazon Linux
* Public IP
* Node.js
* npm
* Nginx
* Git
* Frontend GitHub repository

### Backend EC2

* AWS EC2
* Amazon Linux
* Private IP
* Node.js
* npm
* Git
* PM2
* Backend GitHub repository

### AWS Requirements

Both EC2 instances should be in the same VPC or have appropriate network connectivity.

---

# 🔐 AWS Security Group Configuration

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

> **Do not expose port `3600` to `0.0.0.0/0`.**

---

# 🖥️ PART 1 — Backend Deployment

## Step 1: Create Backend EC2

Create a second EC2 instance for the Node.js backend.

Example:

```text
Backend EC2
Private IP: 10.0.154.92
Application Port: 3600
```

The backend EC2 does not need a public IP.

---

## Step 2: Connect to Backend EC2

For a private EC2, use one of:

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

## Step 3: Install Node.js

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

## Step 4: Install Git

```bash
sudo dnf install git -y
```

Verify:

```bash
git --version
```

---

## Step 5: Clone Backend Repository

```bash
git clone <YOUR_BACKEND_REPOSITORY_URL>
```

Example:

```bash
git clone https://github.com/username/backend.git
```

Enter the project:

```bash
cd backend
```

---

## Step 6: Install Dependencies

```bash
npm install
```

Verify:

```bash
npm list --depth=0
```

---

## Step 7: Configure Environment Variables

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

> **Never commit `.env` or production secrets to GitHub.**

---

## Step 8: Configure Node.js Server

Make sure your Node.js application listens on `0.0.0.0`.

Example:

```javascript
const PORT = process.env.PORT || 3600;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
```

Do not use only:

```javascript
app.listen(PORT, "localhost");
```

The frontend EC2 needs to access the backend through its private IP.

---

## Step 9: Test Backend

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

## ⚙️ Step 10: Install PM2

Install PM2 globally:

```bash
sudo npm install -g pm2
```

Verify:

```bash
pm2 -v
```

---

## ▶️ Step 11: Start Node.js with PM2

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

## 📜 Step 12: Check Backend Logs

```bash
pm2 logs backend
```

Or:

```bash
pm2 logs backend --lines 100
```

---

## 🔄 Step 13: Enable PM2 on Reboot

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

## 🔎 Step 14: Verify Backend Port

Check the listening port:

```bash
sudo ss -lntp | grep 3600
```

You should see something similar to:

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

# 🧪 PART 2 — Test Backend Connectivity

Connect to the frontend EC2 and run:

```bash
curl http://10.0.154.92:3600
```

Test an API:

```bash
curl http://10.0.154.92:3600/api/query/footer/message
```

If you receive a response, the frontend EC2 can communicate with the private backend EC2.

---

# 🌐 PART 3 — Frontend Deployment

## Step 15: Connect to Frontend EC2

```bash
ssh -i your-key.pem ec2-user@YOUR_FRONTEND_PUBLIC_IP
```

---

## Step 16: Clone Frontend Repository

```bash
git clone <YOUR_FRONTEND_REPOSITORY_URL>
```

Example:

```bash
git clone https://github.com/username/frontend-main.git
```

Enter the project:

```bash
cd frontend-main
```

---

## Step 17: Install Dependencies

```bash
npm install
```

---

## Step 18: Build React Application

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

# 🌐 Step 19: Install Nginx

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

# 🗑️ Step 20: Remove Default Nginx Files

```bash
sudo rm -rf /usr/share/nginx/html/*
```

Verify:

```bash
ls -la /usr/share/nginx/html
```

---

# 📦 Step 21: Copy React Build

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

# 🔀 Step 22: Configure Nginx Reverse Proxy

Create the configuration:

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

# ⚛️ PART 4 — Configure Axios

Do not use:

```javascript
baseURL: "http://44.207.202.196:3600"
```

Do not directly use the backend private IP from React.

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

The request flow is:

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

# ✅ PART 5 — Validate Nginx

## Step 23: Test Configuration

```bash
sudo nginx -t
```

Expected:

```text
syntax is ok
test is successful
```

---

## Step 24: Reload Nginx

```bash
sudo systemctl reload nginx
```

---

# 🧪 PART 6 — Final Testing

### Test Node.js from Backend EC2

```bash
curl http://localhost:3600/api/query/footer/message
```

### Test Backend from Frontend EC2

```bash
curl http://10.0.154.92:3600/api/query/footer/message
```

### Test Nginx Reverse Proxy

On the frontend EC2:

```bash
curl http://localhost/api/query/footer/message
```

### Test from Browser

Open:

```text
http://YOUR_FRONTEND_PUBLIC_IP
```

or:

```text
http://YOUR_DOMAIN_NAME
```

---

# 🔍 Troubleshooting

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

# 🔐 Final Architecture

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
                              │
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

Only the **frontend EC2** is publicly accessible. The **Node.js backend remains private** and accepts traffic only from the frontend EC2 Security Group.


