# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy semua file source code
COPY . .

# Build project (Hasilnya akan ada di folder 'dist')
RUN npm run build

# Stage 2: Serve dengan Nginx (Server Ringan)
FROM nginx:alpine

# Copy hasil build dari stage 1 ke folder Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 (Standard web)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# ... (Bagian Stage 1 biarkan sama, jangan diubah) ...

# Stage 2: Serve dengan Nginx
FROM nginx:alpine

# Hapus config default bawaan Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copy config Nginx buatan kita tadi
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy hasil build React
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
