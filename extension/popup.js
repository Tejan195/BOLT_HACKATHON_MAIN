// Default settings
const defaultDyslexiaSettings = {
  isEnabled: false,
  fontFamily: 'opendyslexic',
  fontSize: 16,
  lineSpacing: 1.5,
  letterSpacing: 0,
  wordSpacing: 0,
  columnWidth: 800,
  backgroundColor: 'white',
  bionicReading: false,
  readingRuler: false
};

// State management
let currentSettings = { ...defaultDyslexiaSettings };
let currentVisionType = 'normal';
let correctionEnabled = false;

// Initialize popup
document.addEventListener('DOMContentLoaded', async () => {
  await loadSettings();
  initializeUI();
  setupEventListeners();
});

// Load saved settings
async function loadSettings() {
  const result = await chrome.storage.sync.get(['visionType', 'correction', 'dyslexiaSettings']);
  
  currentVisionType = result.visionType || 'normal';
  correctionEnabled = result.correction || false;
  currentSettings = { ...defaultDyslexiaSettings, ...(result.dyslexiaSettings || {}) };
}

// Initialize UI with current settings
function initializeUI() {
  // Set vision type
  const visionSelect = document.querySelector('#customSelect .selected');
  const visionOptions = {
    normal: 'Normal Vision',
    protanopia: 'Protanopia',
    deuteranopia: 'Deuteranopia',
    tritanopia: 'Tritanopia',
    achromatopsia: 'Achromatopsia'
  };
  visionSelect.textContent = visionOptions[currentVisionType];
  visionSelect.setAttribute('data-value', currentVisionType);

  // Set correction toggle
  document.getElementById('correction').checked = correctionEnabled;

  // Set dyslexia settings
  document.getElementById('dyslexiaSupport').checked = currentSettings.isEnabled;
  
  // Font family
  const fontSelect = document.querySelector('#fontFamilySelect .selected');
  const fontOptions = {
    lexend: 'Lexend',
    opendyslexic: 'OpenDyslexic',
    andika: 'Andika',
    atkinson: 'Atkinson',
    comic: 'Comic Neue'
  };
  fontSelect.textContent = fontOptions[currentSettings.fontFamily];
  fontSelect.setAttribute('data-value', currentSettings.fontFamily);

  // Text settings sliders
  document.getElementById('fontSize').value = currentSettings.fontSize;
  document.getElementById('fontSizeValue').textContent = `${currentSettings.fontSize}px`;
  
  document.getElementById('lineSpacing').value = currentSettings.lineSpacing;
  document.getElementById('lineSpacingValue').textContent = `${currentSettings.lineSpacing}x`;
  
  document.getElementById('letterSpacing').value = currentSettings.letterSpacing;
  document.getElementById('letterSpacingValue').textContent = `${currentSettings.letterSpacing}em`;
  
  document.getElementById('wordSpacing').value = currentSettings.wordSpacing;
  document.getElementById('wordSpacingValue').textContent = `${currentSettings.wordSpacing}em`;

  // Column width
  const columnSelect = document.querySelector('#columnWidthSelect .selected');
  columnSelect.textContent = `${currentSettings.columnWidth}px`;
  columnSelect.setAttribute('data-value', currentSettings.columnWidth);

  // Background color
  document.querySelectorAll('.bg-button').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-bg') === currentSettings.backgroundColor);
  });

  // Reading tools
  document.getElementById('readingRuler').classList.toggle('active', currentSettings.readingRuler);
  document.getElementById('bionicReading').classList.toggle('active', currentSettings.bionicReading);
}

// Setup event listeners
function setupEventListeners() {
  // Tab navigation
  document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => switchTab(button.getAttribute('data-tab')));
  });

  // Custom select dropdowns
  setupCustomSelect('#customSelect', '#selectOptions', handleVisionTypeChange);
  setupCustomSelect('#fontFamilySelect', '#fontFamilyOptions', handleFontFamilyChange);
  setupCustomSelect('#columnWidthSelect', '#columnWidthOptions', handleColumnWidthChange);
  setupTextSettingsDropdown();

  // Toggles
  document.getElementById('correction').addEventListener('change', handleCorrectionToggle);
  document.getElementById('dyslexiaSupport').addEventListener('change', handleDyslexiaSupportToggle);

  // Sliders
  setupSlider('fontSize', 'fontSizeValue', 'px', handleFontSizeChange);
  setupSlider('lineSpacing', 'lineSpacingValue', 'x', handleLineSpacingChange);
  setupSlider('letterSpacing', 'letterSpacingValue', 'em', handleLetterSpacingChange);
  setupSlider('wordSpacing', 'wordSpacingValue', 'em', handleWordSpacingChange);

  // Background color buttons
  document.querySelectorAll('.bg-button').forEach(button => {
    button.addEventListener('click', () => handleBackgroundColorChange(button.getAttribute('data-bg')));
  });

  // Reading tools
  document.getElementById('readingRuler').addEventListener('click', handleReadingRulerToggle);
  document.getElementById('bionicReading').addEventListener('click', handleBionicReadingToggle);

  // Close dropdowns when clicking outside
  document.addEventListener('click', closeAllDropdowns);
}

// Tab switching
function switchTab(tabId) {
  document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
  
  document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
  document.getElementById(tabId).classList.add('active');
}

// Custom select setup
function setupCustomSelect(selectSelector, optionsSelector, changeHandler) {
  const select = document.querySelector(selectSelector);
  const options = document.querySelector(optionsSelector);

  select.addEventListener('click', (e) => {
    e.stopPropagation();
    closeAllDropdowns();
    select.classList.toggle('open');
    options.classList.toggle('open');
  });

  options.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
      const value = e.target.getAttribute('data-value');
      const text = e.target.textContent;
      
      select.querySelector('.selected').textContent = text;
      select.querySelector('.selected').setAttribute('data-value', value);
      
      select.classList.remove('open');
      options.classList.remove('open');
      
      changeHandler(value);
    }
  });
}

// Text settings dropdown with sub-panels
function setupTextSettingsDropdown() {
  const select = document.querySelector('#textSettingsSelect');
  const options = document.querySelector('#textSettingsOptions');

  select.addEventListener('click', (e) => {
    e.stopPropagation();
    closeAllDropdowns();
    select.classList.toggle('open');
    options.classList.toggle('open');
  });

  options.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
      const subpanel = e.target.getAttribute('data-subpanel');
      const text = e.target.textContent;
      
      // Hide all sub-panels
      document.querySelectorAll('.sub-panel').forEach(panel => panel.classList.remove('active'));
      
      // Show selected sub-panel
      document.getElementById(subpanel).classList.add('active');
      
      select.querySelector('.selected').textContent = text;
      select.querySelector('.selected').setAttribute('data-subpanel', subpanel);
      
      select.classList.remove('open');
      options.classList.remove('open');
    }
  });
}

// Slider setup
function setupSlider(sliderId, valueId, unit, changeHandler) {
  const slider = document.getElementById(sliderId);
  const valueDisplay = document.getElementById(valueId);

  slider.addEventListener('input', (e) => {
    const value = parseFloat(e.target.value);
    valueDisplay.textContent = `${value}${unit}`;
    changeHandler(value);
  });
}

// Close all dropdowns
function closeAllDropdowns() {
  document.querySelectorAll('.custom-select').forEach(select => select.classList.remove('open'));
  document.querySelectorAll('.select-options').forEach(options => options.classList.remove('open'));
  document.querySelectorAll('.sub-panel').forEach(panel => panel.classList.remove('active'));
}

// Event handlers
function handleVisionTypeChange(value) {
  currentVisionType = value;
  saveVisionSettings();
  applyVisionFilter();
}

function handleCorrectionToggle(e) {
  correctionEnabled = e.target.checked;
  saveVisionSettings();
  applyVisionFilter();
}

function handleDyslexiaSupportToggle(e) {
  currentSettings.isEnabled = e.target.checked;
  
  if (currentSettings.isEnabled) {
    // Enable all features with optimal settings
    currentSettings.fontFamily = 'opendyslexic';
    currentSettings.fontSize = 18;
    currentSettings.lineSpacing = 1.8;
    currentSettings.letterSpacing = 0.5;
    currentSettings.wordSpacing = 0.3;
    currentSettings.backgroundColor = 'cream';
    currentSettings.bionicReading = true;
    
    // Update UI
    initializeUI();
  }
  
  saveDyslexiaSettings();
  applyDyslexiaSettings();
}

function handleFontFamilyChange(value) {
  currentSettings.fontFamily = value;
  saveDyslexiaSettings();
  applyDyslexiaSettings();
}

function handleFontSizeChange(value) {
  currentSettings.fontSize = value;
  saveDyslexiaSettings();
  applyDyslexiaSettings();
}

function handleLineSpacingChange(value) {
  currentSettings.lineSpacing = value;
  saveDyslexiaSettings();
  applyDyslexiaSettings();
}

function handleLetterSpacingChange(value) {
  currentSettings.letterSpacing = value;
  saveDyslexiaSettings();
  applyDyslexiaSettings();
}

function handleWordSpacingChange(value) {
  currentSettings.wordSpacing = value;
  saveDyslexiaSettings();
  applyDyslexiaSettings();
}

function handleColumnWidthChange(value) {
  currentSettings.columnWidth = parseInt(value);
  saveDyslexiaSettings();
  applyDyslexiaSettings();
}

function handleBackgroundColorChange(color) {
  document.querySelectorAll('.bg-button').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`[data-bg="${color}"]`).classList.add('active');
  
  currentSettings.backgroundColor = color;
  saveDyslexiaSettings();
  applyDyslexiaSettings();
}

function handleReadingRulerToggle() {
  currentSettings.readingRuler = !currentSettings.readingRuler;
  document.getElementById('readingRuler').classList.toggle('active', currentSettings.readingRuler);
  saveDyslexiaSettings();
  applyDyslexiaSettings();
}

function handleBionicReadingToggle() {
  currentSettings.bionicReading = !currentSettings.bionicReading;
  document.getElementById('bionicReading').classList.toggle('active', currentSettings.bionicReading);
  saveDyslexiaSettings();
  applyDyslexiaSettings();
}

// Save settings
function saveVisionSettings() {
  chrome.storage.sync.set({
    visionType: currentVisionType,
    correction: correctionEnabled
  });
}

function saveDyslexiaSettings() {
  chrome.storage.sync.set({
    dyslexiaSettings: currentSettings
  });
}

// Apply settings
async function applyVisionFilter() {
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

  let filter = 'none';
  
  if (currentVisionType !== 'normal') {
    filter = correctionEnabled ? correctionFilters[currentVisionType] : filters[currentVisionType];
  }

  // Apply to current tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  try {
    await chrome.tabs.sendMessage(tab.id, {
      action: 'applyFilter',
      filter: filter
    });
  } catch (error) {
    console.log('Could not apply filter to current tab:', error);
  }
}

async function applyDyslexiaSettings() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  try {
    if (currentSettings.isEnabled) {
      await chrome.tabs.sendMessage(tab.id, {
        action: 'applyDyslexiaStyles',
        settings: currentSettings
      });
    } else {
      await chrome.tabs.sendMessage(tab.id, {
        action: 'removeDyslexiaStyles'
      });
    }
  } catch (error) {
    console.log('Could not apply dyslexia settings to current tab:', error);
  }
}