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


