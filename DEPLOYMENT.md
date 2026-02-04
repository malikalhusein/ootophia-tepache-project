# 🍍 Tepache - Self-Hosting Deployment Guide

Dokumentasi lengkap untuk melakukan deployment aplikasi Tepache secara mandiri (self-hosted).

## 📋 Prerequisites

Sebelum memulai, pastikan Anda memiliki:

- **Node.js** v18.0.0 atau lebih baru
- **npm** atau **bun** package manager
- **Git** untuk cloning repository
- Akun pada platform hosting pilihan Anda (opsional)

## 🚀 Quick Start

### 1. Clone Repository

```bash
# Clone repository dari GitHub
git clone https://github.com/YOUR_USERNAME/tepache-ootophia.git

# Masuk ke direktori project
cd tepache-ootophia
```

### 2. Install Dependencies

```bash
# Menggunakan npm
npm install

# Atau menggunakan bun (lebih cepat)
bun install
```

### 3. Development Mode

```bash
# Jalankan development server
npm run dev

# Atau dengan bun
bun run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

### 4. Build untuk Production

```bash
# Build aplikasi
npm run build

# Preview build hasil
npm run preview
```

Hasil build akan tersedia di folder `dist/`

---

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

Vercel adalah platform yang paling mudah untuk deploy aplikasi React/Vite.

#### Langkah-langkah:

1. **Install Vercel CLI** (opsional)
   ```bash
   npm install -g vercel
   ```

2. **Deploy via CLI**
   ```bash
   vercel
   ```

3. **Atau deploy via Dashboard:**
   - Buka [vercel.com](https://vercel.com)
   - Import repository GitHub Anda
   - Vercel akan auto-detect Vite dan mengkonfigurasi build settings

#### Konfigurasi Vercel:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "vite"
}
```

---

### Option 2: Netlify

#### Via Netlify Dashboard:

1. Buka [netlify.com](https://netlify.com)
2. Klik "Add new site" → "Import an existing project"
3. Hubungkan repository GitHub
4. Konfigurasi build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`

#### Via Netlify CLI:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login ke Netlify
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

#### File `netlify.toml` (opsional):
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### Option 3: GitHub Pages

#### Langkah-langkah:

1. **Update `vite.config.ts`:**
   ```typescript
   export default defineConfig({
     base: '/nama-repository/',
     // ... konfigurasi lainnya
   })
   ```

2. **Buat GitHub Actions workflow:**

   Buat file `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [main]

   permissions:
     contents: read
     pages: write
     id-token: write

   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v4

         - name: Setup Node
           uses: actions/setup-node@v4
           with:
             node-version: 20

         - name: Install dependencies
           run: npm ci

         - name: Build
           run: npm run build

         - name: Setup Pages
           uses: actions/configure-pages@v4

         - name: Upload artifact
           uses: actions/upload-pages-artifact@v3
           with:
             path: './dist'

     deploy:
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       runs-on: ubuntu-latest
       needs: build
       steps:
         - name: Deploy to GitHub Pages
           id: deployment
           uses: actions/deploy-pages@v4
   ```

3. **Enable GitHub Pages:**
   - Buka Settings → Pages di repository
   - Source: GitHub Actions

---

### Option 4: Docker

#### Dockerfile:
```dockerfile
# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### nginx.conf:
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### Build & Run:
```bash
# Build image
docker build -t tepache-app .

# Run container
docker run -p 8080:80 tepache-app
```

---

### Option 5: Traditional VPS/Server

Untuk deployment di VPS (DigitalOcean, Linode, AWS EC2, dll):

1. **Build aplikasi secara lokal:**
   ```bash
   npm run build
   ```

2. **Upload folder `dist/` ke server:**
   ```bash
   scp -r dist/* user@your-server:/var/www/tepache/
   ```

3. **Konfigurasi Nginx:**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       root /var/www/tepache;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

4. **Restart Nginx:**
   ```bash
   sudo systemctl restart nginx
   ```

---

## 🔧 Environment Variables

Jika aplikasi membutuhkan environment variables:

1. **Buat file `.env`:**
   ```env
   VITE_API_URL=https://api.yourdomain.com
   VITE_APP_NAME=Tepache
   ```

2. **Akses di kode:**
   ```typescript
   const apiUrl = import.meta.env.VITE_API_URL;
   ```

> ⚠️ **Catatan:** Hanya variabel dengan prefix `VITE_` yang akan tersedia di client-side.

---

## 🔒 SSL/HTTPS

### Let's Encrypt (Gratis):

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Generate SSL certificate
sudo certbot --nginx -d yourdomain.com

# Auto-renewal
sudo certbot renew --dry-run
```

---

## 📊 Performance Optimization

### 1. Enable Gzip Compression

Tambahkan di nginx.conf:
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
gzip_min_length 1000;
```

### 2. Enable Browser Caching

```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 3. CDN (Optional)

Pertimbangkan menggunakan CDN seperti:
- Cloudflare (gratis)
- AWS CloudFront
- Fastly

---

## 🐛 Troubleshooting

### Build Errors

```bash
# Clear cache dan reinstall
rm -rf node_modules
rm package-lock.json
npm install
npm run build
```

### 404 pada Refresh

Pastikan server dikonfigurasi untuk redirect semua routes ke `index.html` (SPA routing).

### Assets Tidak Muncul

Periksa `base` path di `vite.config.ts` sesuai dengan subdirectory hosting.

---

## 📞 Support

- **Dokumentasi Lovable:** https://docs.lovable.dev/tips-tricks/self-hosting
- **Vite Documentation:** https://vitejs.dev/guide/
- **GitHub Issues:** Buat issue di repository untuk pertanyaan

---

## 📄 License

MIT License - Lihat file [LICENSE](LICENSE) untuk detail.

---

**Ootophia Brewing Labs** 🍍
*Fermented Probiotic Elixir*
