/**
 * Component Loader - Loads navbar and footer into pages
 * This script automatically includes reusable navbar and footer components
 */

// Determine if we're in a subdirectory
function isInSubdirectory() {
  const path = window.location.pathname;
  return path.includes('/FrontEnd/html/') || path.includes('/FrontEnd/htm/');
}

// Get the correct relative path prefix based on location
function getRelativePrefix() {
  const path = window.location.pathname;
  // From FrontEnd/html/ or FrontEnd/htm/, we need to go up 2 levels to reach root
  if (path.includes('/FrontEnd/html/') || path.includes('/FrontEnd/htm/')) {
    return '../../';
  }
  // Root level - no prefix needed
  return '';
}

// Function to load HTML component
async function loadComponent(elementId, filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to load ${filePath}: ${response.status}`);
    }
    const html = await response.text();
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = html;
      
      // Fix paths in loaded content
      fixComponentPaths(element);
    }
  } catch (error) {
    console.error(`Error loading component from ${filePath}:`, error);
  }
}

// Fix image and link paths based on current page location
function fixComponentPaths(container) {
  const inSubdirectory = isInSubdirectory();
  
  if (!inSubdirectory) {
    // On root level pages, no path adjustment needed
    return;
  }
  
  // On subdirectory pages (like FrontEnd/html/contact.html), fix paths
  
  // Fix image sources
  const images = container.querySelectorAll('img[src]');
  images.forEach(img => {
    let src = img.getAttribute('src');
    // Replace FrontEnd/ with ../ (up one level from html/ to FrontEnd/)
    if (src.startsWith('FrontEnd/')) {
      src = src.replace('FrontEnd/', '../');
      img.setAttribute('src', src);
    }
  });
  
  // Fix links
  const links = container.querySelectorAll('a[href]');
  links.forEach(link => {
    let href = link.getAttribute('href');
    
    // Skip external links and anchor links
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href === '#') {
      return;
    }
    
    // For links starting with FrontEnd/, replace with ../
    if (href.startsWith('FrontEnd/')) {
      href = href.replace('FrontEnd/', '../');
      link.setAttribute('href', href);
    }
    // For index.html (at root), need to go up 2 levels
    else if (href === 'index.html') {
      link.setAttribute('href', '../../index.html');
    }
  });
  
  // Also handle navbar-brand links
  const navbarBrand = container.querySelector('a.navbar-brand');
  if (navbarBrand) {
    const brandHref = navbarBrand.getAttribute('href');
    if (brandHref === 'index.html') {
      navbarBrand.setAttribute('href', '../../index.html');
    }
  }
}

// Calculate the component path based on current page location
function getComponentPath(componentFile) {
  if (isInSubdirectory()) {
    return `../components/${componentFile}`;
  } else if (window.location.pathname.includes('/FrontEnd/')) {
    return `components/${componentFile}`;
  } else {
    // Root level
    return `FrontEnd/components/${componentFile}`;
  }
}

// Load navbar and footer when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  const navbarPath = getComponentPath('navbar.html');
  const footerPath = getComponentPath('footer.html');
  
  loadComponent('navbar-placeholder', navbarPath);
  loadComponent('footer-placeholder', footerPath);
});
