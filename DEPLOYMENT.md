# Deployment Guide

This guide will help you deploy your TecHoneStory blog platform to GitHub and various hosting platforms.

## 📦 Step 1: Prepare Your Project

### 1.1 Ensure all files are saved
Make sure all your changes are saved and the project builds successfully:
```bash
npm run build
```

### 1.2 Update environment variables
Create `.env.example` file with template (no real values):
```env
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## 🌐 Step 2: Deploy to GitHub

### 2.1 Initialize Git Repository (if not already done)
```bash
cd /Users/lionn/blog-affiliate-platform
git init
```

### 2.2 Add all files to Git
```bash
git add .
```

### 2.3 Create initial commit
```bash
git commit -m "Initial commit: TecHoneStory blog platform"
```

### 2.4 Create a new repository on GitHub
1. Go to https://github.com/new
2. Name your repository (e.g., `blog-affiliate-platform` or `techonestory`)
3. Choose Public or Private
4. **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

### 2.5 Connect your local repository to GitHub
Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your GitHub username and repository name:
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## 🚀 Step 3: Deploy to Hosting Platform

### Option A: Deploy to Vercel (Recommended)

**Advantages:** Best React support, automatic deployments, free SSL

1. Go to https://vercel.com and sign up with GitHub
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Add Environment Variables:
   - `VITE_SUPABASE_URL`: Your Supabase URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key
6. Click "Deploy"
7. Your site will be live at `your-project.vercel.app`

### Option B: Deploy to Netlify

**Advantages:** Great CDN, form handling, free SSL

1. Go to https://netlify.com and sign up with GitHub
2. Click "New site from Git"
3. Choose GitHub and authorize Netlify
4. Select your repository
5. Configure:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Click "Show advanced" and add environment variables:
   - `VITE_SUPABASE_URL`: Your Supabase URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key
7. Click "Deploy site"
8. Your site will be live at `your-site.netlify.app`

### Option C: Deploy to GitHub Pages

**Note:** Requires additional configuration for React Router

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Update `package.json`:
   ```json
   {
     "homepage": "https://YOUR_USERNAME.github.io/YOUR_REPO_NAME",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. Update `vite.config.ts`:
   ```typescript
   export default defineConfig({
     base: '/YOUR_REPO_NAME/',
     // ... rest of config
   })
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

## 🔒 Step 4: Secure Your Application

### 4.1 Change Admin Credentials
Update default admin credentials in production:
- Edit `src/contexts/AuthContext.tsx`
- Or set up proper Supabase authentication

### 4.2 Set Up Custom Domain (Optional)
- **Vercel:** Project Settings → Domains
- **Netlify:** Site Settings → Domain Management

### 4.3 Configure Supabase RLS Policies
Ensure your Supabase Row Level Security policies are properly configured.

## 🔄 Step 5: Automatic Deployments

Both Vercel and Netlify automatically deploy when you push to GitHub:

```bash
# Make changes to your code
git add .
git commit -m "Your commit message"
git push origin main
```

Your site will automatically redeploy with the changes!

## 📊 Step 6: Monitor Your Site

### Set up analytics (optional):
- Google Analytics
- Vercel Analytics (built-in)
- Netlify Analytics

### Monitor performance:
- Check Lighthouse scores
- Monitor Core Web Vitals
- Test on multiple devices

## 🐛 Troubleshooting

### Build fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm run build
```

### Environment variables not working
- Make sure they start with `VITE_`
- Restart dev server after adding new variables
- Check they're added in hosting platform dashboard

### React Router 404 errors
Add `_redirects` file in `public/` folder:
```
/*  /index.html  200
```

### Supabase connection issues
- Verify URL and anon key are correct
- Check Supabase project is active
- Verify RLS policies allow access

## 📱 Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Test admin login functionality
- [ ] Test creating/editing/deleting blog posts
- [ ] Test Amazon affiliate links work
- [ ] Verify responsive design on mobile
- [ ] Check all footer links work
- [ ] Test pagination
- [ ] Verify scroll-to-top button works
- [ ] Check legal pages (Privacy, Terms, Disclaimer)
- [ ] Test contact page
- [ ] Verify SEO meta tags
- [ ] Check performance with Lighthouse

## 🎉 Success!

Your blog is now live! Share your URL:
- `https://your-project.vercel.app` (Vercel)
- `https://your-site.netlify.app` (Netlify)
- `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME` (GitHub Pages)

## 📈 Next Steps

1. Add your first blog post via `/admin/login`
2. Share your blog on social media
3. Submit your sitemap to Google Search Console
4. Join Amazon Associates if you haven't already
5. Start creating great content!

---

Need help? Check the [README.md](./README.md) or create an issue on GitHub.
