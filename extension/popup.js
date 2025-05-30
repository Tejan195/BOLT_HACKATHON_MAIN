const visionType = document.getElementById('visionType');
const correction = document.getElementById('correction');

// Load saved settings
chrome.storage.sync.get(['visionType', 'correction'], (data) => {
  if (data.visionType) visionType.value = data.visionType;
  if (data.correction) correction.checked = data.correction;
});

// Save settings and apply filters
function updateFilters() {
  const settings = {
    visionType: visionType.value,
    correction: correction.checked
  };
  
  chrome.storage.sync.set(settings);
  
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, settings);
  });
}

visionType.addEventListener('change', updateFilters);
correction.addEventListener('change', updateFilters);