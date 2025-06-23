let originalContents = new WeakMap(); // Store original content for Bionic Reading
let dyslexiaStyleElement = null;
let isApplyingBionic = false;

// Dyslexia support functions
function applyDyslexiaStyles(settings) {
  console.log('Applying dyslexia styles:', settings);
  
  // Remove existing styles
  if (dyslexiaStyleElement) {
    dyslexiaStyleElement.remove();
  }

  // Create new style element
  dyslexiaStyleElement = document.createElement('style');
  dyslexiaStyleElement.id = 'dyslexia-font-style';
  dyslexiaStyleElement.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@400;700&family=Andika&family=Atkinson+Hyperlegible&family=Comic+Neue:wght@400;700&display=swap');
    @import url('https://fonts.cdnfonts.com/css/open-dyslexic');
    
    .dyslexia-font-lexend * { font-family: 'Lexend', Arial, sans-serif !important; }
    .dyslexia-font-opendyslexic * { font-family: 'OpenDyslexic', Arial, sans-serif !important; }
    .dyslexia-font-andika * { font-family: 'Andika', Arial, sans-serif !important; }
    .dyslexia-font-atkinson * { font-family: 'Atkinson Hyperlegible', Arial, sans-serif !important; }
    .dyslexia-font-comic * { font-family: 'Comic Neue', Arial, sans-serif !important; }
    
    body.dyslexia-enabled {
      background-color: ${getBackgroundColor(settings.backgroundColor)} !important;
      max-width: ${settings.columnWidth}px !important;
      margin: 0 auto !important;
    }
    
    body.dyslexia-enabled,
    body.dyslexia-enabled p,
    body.dyslexia-enabled div,
    body.dyslexia-enabled span,
    body.dyslexia-enabled h1,
    body.dyslexia-enabled h2,
    body.dyslexia-enabled h3,
    body.dyslexia-enabled h4,
    body.dyslexia-enabled h5,
    body.dyslexia-enabled h6,
    body.dyslexia-enabled li,
    body.dyslexia-enabled a,
    body.dyslexia-enabled article,
    body.dyslexia-enabled section {
      font-size: ${settings.fontSize}px !important;
      line-height: ${settings.lineSpacing} !important;
      letter-spacing: ${settings.letterSpacing}em !important;
      word-spacing: ${settings.wordSpacing}em !important;
    }
    
    .bionic-word strong {
      font-weight: 700 !important;
    }
  `;
  document.head.appendChild(dyslexiaStyleElement);

  // Apply font family class
  document.body.classList.remove(
    'dyslexia-font-lexend',
    'dyslexia-font-opendyslexic',
    'dyslexia-font-andika',
    'dyslexia-font-atkinson',
    'dyslexia-font-comic'
  );
  
  if (settings.fontFamily !== 'none') {
    document.body.classList.add(`dyslexia-font-${settings.fontFamily}`);
  }
  
  document.body.classList.add('dyslexia-enabled');

  // Apply Bionic Reading
  if (settings.bionicReading) {
    enableBionicReading();
  } else {
    disableBionicReading();
  }

  // Apply Reading Ruler
  if (settings.readingRuler) {
    enableReadingRuler();
  } else {
    disableReadingRuler();
  }
}

function removeDyslexiaStyles() {
  console.log('Removing dyslexia styles');
  
  if (dyslexiaStyleElement) {
    dyslexiaStyleElement.remove();
    dyslexiaStyleElement = null;
  }
  
  document.body.classList.remove(
    'dyslexia-enabled',
    'dyslexia-font-lexend',
    'dyslexia-font-opendyslexic',
    'dyslexia-font-andika',
    'dyslexia-font-atkinson',
    'dyslexia-font-comic'
  );
  
  disableBionicReading();
  disableReadingRuler();
}

function getBackgroundColor(colorName) {
  const colors = {
    white: '#FFFFFF',
    cream: '#FFF5E6',
    'light-blue': '#E6F0FA',
    mint: '#E6FFF6'
  };
  return colors[colorName] || '#FFFFFF';
}

function enableBionicReading() {
  if (isApplyingBionic) return;
  isApplyingBionic = true;
  
  console.log('Enabling bionic reading');
  
  // Target text elements more specifically
  const selectors = [
    'p:not(.bionic-processed)',
    'div:not(.bionic-processed):not([class*="nav"]):not([class*="menu"]):not([class*="header"]):not([class*="footer"])',
    'article:not(.bionic-processed)',
    'section:not(.bionic-processed)',
    'li:not(.bionic-processed)',
    'span:not(.bionic-processed):not(.bionic-word)',
    'h1:not(.bionic-processed)',
    'h2:not(.bionic-processed)',
    'h3:not(.bionic-processed)',
    'h4:not(.bionic-processed)',
    'h5:not(.bionic-processed)',
    'h6:not(.bionic-processed)'
  ];
  
  const elements = document.querySelectorAll(selectors.join(', '));
  
  elements.forEach(element => {
    // Skip if already processed or contains other elements
    if (element.classList.contains('bionic-processed') || 
        element.children.length > 0 || 
        element.textContent.trim().length < 3) {
      return;
    }
    
    // Store original content
    if (!originalContents.has(element)) {
      originalContents.set(element, element.innerHTML);
    }
    
    const text = element.textContent.trim();
    const words = text.split(/\s+/);
    
    if (words.length === 0 || words[0] === '') return;
    
    const bionicWords = words.map(word => {
      if (word.length <= 1) return word;
      const emphasizedLength = Math.ceil(word.length * 0.6);
      const emphasized = word.substring(0, emphasizedLength);
      const rest = word.substring(emphasizedLength);
      return `<span class="bionic-word"><strong>${emphasized}</strong>${rest}</span>`;
    });
    
    element.innerHTML = bionicWords.join(' ');
    element.classList.add('bionic-processed');
  });
  
  isApplyingBionic = false;
}

function disableBionicReading() {
  console.log('Disabling bionic reading');
  
  const processedElements = document.querySelectorAll('.bionic-processed');
  processedElements.forEach(element => {
    if (originalContents.has(element)) {
      element.innerHTML = originalContents.get(element);
      originalContents.delete(element);
    }
    element.classList.remove('bionic-processed');
  });
}

function enableReadingRuler() {
  if (document.getElementById('reading-ruler')) return;
  
  console.log('Enabling reading ruler');
  
  const ruler = document.createElement('div');
  ruler.id = 'reading-ruler';
  ruler.style.cssText = `
    position: fixed;
    left: 0;
    right: 0;
    height: 40px;
    background: rgba(255, 255, 0, 0.3);
    pointer-events: none;
    z-index: 2147483647;
    transition: top 0.1s ease;
    top: 50%;
  `;
  document.body.appendChild(ruler);

  document.addEventListener('mousemove', updateRulerPosition);
}

function disableReadingRuler() {
  console.log('Disabling reading ruler');
  
  const ruler = document.getElementById('reading-ruler');
  if (ruler) {
    ruler.remove();
  }
  document.removeEventListener('mousemove', updateRulerPosition);
}

function updateRulerPosition(e) {
  const ruler = document.getElementById('reading-ruler');
  if (ruler) {
    ruler.style.top = `${e.clientY - 20}px`;
  }
}

// Color vision filters
const filters = {
  protanopia: 'saturate(0.5) sepia(0.3) hue-rotate(-20deg)',
  deuteranopia: 'saturate(0.6) sepia(0.2) hue-rotate(20deg)',
  tritanopia: 'saturate(0.7) sepia(0.4) hue-rotate(180deg)',
  achromatopsia: 'grayscale(1)'
};

const correctionFilters = {
  protanopia: 'saturate(1.2) hue-rotate(20deg)',
  deuteranopia: 'saturate(1.3) hue-rotate(-20deg)',
  tritanopia: 'saturate(1.4) hue-rotate(-180deg)',
  achromatopsia: 'contrast(1.5) brightness(1.2) saturate(2)'
};

// Create and inject the filter overlay
let overlay = document.getElementById('vision-aid-overlay');
if (!overlay) {
  overlay = document.createElement('div');
  overlay.id = 'vision-aid-overlay';
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 2147483647;
    mix-blend-mode: normal;
  `;
  document.body.appendChild(overlay);
}

// Listen for messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Message received in content.js:', message);
  
  if (message.action === 'applyFilter') {
    overlay.style.filter = message.filter || 'none';
    console.log('Applied filter:', message.filter);
  }
  
  if (message.action === 'applyDyslexiaStyles') {
    applyDyslexiaStyles(message.settings);
  }
  
  if (message.action === 'removeDyslexiaStyles') {
    removeDyslexiaStyles();
  }
  
  sendResponse({ success: true });
});

// Load saved settings on page load
chrome.storage.sync.get(['visionType', 'correction', 'dyslexiaSettings'], (settings) => {
  console.log('Loading saved settings:', settings);
  
  // Apply color vision filter
  if (settings.visionType && settings.visionType !== 'normal') {
    const filter = settings.correction ? correctionFilters[settings.visionType] : filters[settings.visionType];
    overlay.style.filter = filter;
    console.log('Applied saved filter:', filter);
  }
  
  // Apply dyslexia settings
  if (settings.dyslexiaSettings && settings.dyslexiaSettings.isEnabled) {
    // Wait for page to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => applyDyslexiaStyles(settings.dyslexiaSettings), 100);
      });
    } else {
      setTimeout(() => applyDyslexiaStyles(settings.dyslexiaSettings), 100);
    }
  }
});