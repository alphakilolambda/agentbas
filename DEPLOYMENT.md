# GitHub Pages Deployment Guide

## 🚀 Deployment Steps

### 1. GitHub Repository Oluştur

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### 2. GitHub Pages Ayarları

1. GitHub repository'ye gidin
2. **Settings** → **Pages** bölümüne gidin
3. **Source** olarak **GitHub Actions** seçin
4. Kaydedin

### 3. Otomatik Deploy

Her `main` branch'e push yaptığınızda otomatik olarak deploy edilecek.

Workflow dosyası: `.github/workflows/deploy.yml`

### 4. Manuel Build Test

```bash
npm run build
```

Build çıktısı `out` klasöründe olacak.

## 📝 Notlar

- **Static Export**: Proje static export modunda çalışıyor
- **API Routes**: GitHub Pages static hosting olduğu için API routes kullanılamaz
- **Client-Side Fetch**: Tüm API çağrıları client-side'da yapılıyor
- **Images**: Unoptimized modda (static export için gerekli)

## 🔗 Site URL

Deploy sonrası site şu adreste olacak:
- `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

Eğer repository adı `agentbase` ise:
- `https://YOUR_USERNAME.github.io/agentbase/`

## ⚙️ Base Path Ayarlama

Eğer repository adına göre base path kullanmak isterseniz, `next.config.js` dosyasında şu satırları aktif edin:

```js
basePath: process.env.NODE_ENV === 'production' ? '/YOUR_REPO_NAME' : '',
assetPrefix: process.env.NODE_ENV === 'production' ? '/YOUR_REPO_NAME' : '',
```

