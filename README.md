# Kigumo-Technical

## ✅ Reusable Navbar & Footer Setup Complete!

Your navbar and footer are now in separate files and will load automatically on all pages!

### 📁 Component Files:
- **[FrontEnd/components/navbar.html](FrontEnd/components/navbar.html)** - Edit navbar here
- **[FrontEnd/components/footer.html](FrontEnd/components/footer.html)** - Edit footer here
- **[FrontEnd/js/components.js](FrontEnd/js/components.js)** - Automatic loader script

### ✅ Updated Pages:
- **[index.html](index.html)** - Now uses component placeholders
- **[FrontEnd/html/contact.html](FrontEnd/html/contact.html)** - Now uses component placeholders

### 📝 How to Add to New Pages:

1. **Add placeholder divs** where you want navbar and footer:
```html
<body>
  <!-- Navbar will load here -->
  <div id="navbar-placeholder"></div>

  <!-- Your page content -->
  <main>
    <h1>Your content here</h1>
  </main>

  <!-- Footer will load here -->
  <div id="footer-placeholder"></div>
</body>
```

2. **Include the component loader** before closing `</body>` tag:
```html
  <!-- Bootstrap JS -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
  
  <!-- Component Loader (adjust path based on your page location) -->
  <script src="FrontEnd/js/components.js"></script>  <!-- For root-level pages -->
  <!-- OR -->
  <script src="../js/components.js"></script>  <!-- For pages in FrontEnd/html/ -->
</body>
```

### 🎯 Benefits:
✅ **Edit once, update everywhere** - Change navbar/footer in ONE file  
✅ **No more copy-pasting** - Just add the placeholder divs  
✅ **Automatic path detection** - Works from any folder  
✅ **Clean code** - Pages stay simple and maintainable  

### 📋 Example Template:
See **[FrontEnd/components/page-template.html](FrontEnd/components/page-template.html)** for a complete working example of a new page.

### 🔧 How It Works:
1. When a page loads, the `components.js` script automatically runs
2. It detects where the page is located (root or subfolder)
3. It fetches the navbar and footer HTML from the components folder
4. It inserts them into the placeholder divs
5. Done! Your navbar and footer appear on the page

### 💡 Tips:
- To change the navbar or footer, just edit the files in `FrontEnd/components/`
- Changes will automatically appear on ALL pages
- Make sure to include the `components.js` script on every page that uses the components