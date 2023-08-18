// Initialize blocklist
let blocklist = [];

// Retrieve blocklist from storage
browser.storage.local.get("blocklist").then(result => {
  blocklist = result.blocklist || [];
});

// Left-click action
browser.browserAction.onClicked.addListener(tab => {
  blocklist.push(tab.url);
  browser.storage.local.set({ blocklist });
});

// Right-click context menu
browser.menus.create({
  id: "see-blocklist",
  title: "See blocklist",
  contexts: ["browser_action"]
});

browser.menus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "see-blocklist") {
    // Open the Options page
    browser.runtime.openOptionsPage();
  }
});

