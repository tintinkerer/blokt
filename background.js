// Initialize blocklist
console.log("background.js loaded");
let blocklist = [];
console.log("blocklist created");

// Retrieve blocklist from storage
chrome.storage.local.get("blocklist", (result) => {
  blocklist = result.blocklist || [];
});
console.log("blocklist retrieved");

// Left-click action
chrome.action.onClicked.addListener(tab => {
  blocklist.push(tab.url);
  chrome.storage.local.set({ blocklist });
});
console.log("left clicked")

// Right-click context menu
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "see-blocklist",
    title: "See blocklist",
    contexts: ["action"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "see-blocklist") {
    // Open the Options page
    chrome.runtime.openOptionsPage();
  }
});
