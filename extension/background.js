// Handle system-wide color correction
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'applyFilter') {
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach(tab => {
        if (tab.url && !tab.url.startsWith('chrome://') && !tab.url.startsWith('chrome-extension://')) {
          chrome.scripting.insertCSS({
            target: { tabId: tab.id },
            css: `
              html {
                filter: ${request.filter} !important;
              }
            `
          }).catch(() => {
            // Ignore errors for protected pages
          });
        }
      });
    });
  }
  
  if (request.action === 'applyDyslexiaToAllTabs') {
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach(tab => {
        if (tab.url && !tab.url.startsWith('chrome://') && !tab.url.startsWith('chrome-extension://')) {
          chrome.tabs.sendMessage(tab.id, {
            action: request.settings.isEnabled ? 'applyDyslexiaStyles' : 'removeDyslexiaStyles',
            settings: request.settings
          }).catch(() => {
            // Ignore errors for tabs that don't have content script
          });
        }
      });
    });
  }
});

// Apply saved settings on startup and when extension is installed
chrome.runtime.onStartup.addListener(applySavedSettings);
chrome.runtime.onInstalled.addListener(applySavedSettings);

function applySavedSettings() {
  chrome.storage.sync.get(['visionType', 'correction', 'dyslexiaSettings'], (settings) => {
    // Apply color vision filter
    if (settings.visionType && settings.visionType !== 'normal') {
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

      const filter = settings.correction 
        ? correctionFilters[settings.visionType] 
        : filters[settings.visionType];

      chrome.runtime.sendMessage({
        action: 'applyFilter',
        filter: filter
      }).catch(() => {
        // Ignore if no listeners
      });
    }
    
    // Apply dyslexia settings
    if (settings.dyslexiaSettings && settings.dyslexiaSettings.isEnabled) {
      chrome.runtime.sendMessage({
        action: 'applyDyslexiaToAllTabs',
        settings: settings.dyslexiaSettings
      }).catch(() => {
        // Ignore if no listeners
      });
    }
  });
}

// Handle tab updates to apply settings to new pages
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && 
      !tab.url.startsWith('chrome://') && !tab.url.startsWith('chrome-extension://')) {
    
    // Small delay to ensure content script is loaded
    setTimeout(() => {
      chrome.storage.sync.get(['visionType', 'correction', 'dyslexiaSettings'], (settings) => {
        // Apply color vision filter
        if (settings.visionType && settings.visionType !== 'normal') {
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

          const filter = settings.correction 
            ? correctionFilters[settings.visionType] 
            : filters[settings.visionType];

          chrome.tabs.sendMessage(tabId, {
            action: 'applyFilter',
            filter: filter
          }).catch(() => {
            // Ignore errors
          });
        }
        
        // Apply dyslexia settings
        if (settings.dyslexiaSettings && settings.dyslexiaSettings.isEnabled) {
          chrome.tabs.sendMessage(tabId, {
            action: 'applyDyslexiaStyles',
            settings: settings.dyslexiaSettings
          }).catch(() => {
            // Ignore errors
          });
        }
      });
    }, 500);
  }
});