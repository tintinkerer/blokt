let blocklist = [];

// Load the blocklist from storage
browser.storage.local.get('blocklist').then((result) => {
  blocklist = result.blocklist || [];
});

// Handle action button click
browser.action.onClicked.addListener((tab) => {
  const url = new URL(tab.url);
  const domain = url.hostname;

  // Add domain to blocklist and save
  blocklist.push(domain);
  browser.storage.local.set({ blocklist });

  // Close current tab
  browser.tabs.remove(tab.id);
});

// Handle web requests
browser.webRequest.onBeforeRequest.addListener(
  (details) => {
    const url = new URL(details.url);
    if (blocklist.includes(url.hostname)) {
      // Close the tab
      browser.tabs.remove(details.tabId);
      return { cancel: true };
    }
  },
  { urls: ['<all_urls>'] },
  ['blocking']
);

// Context menu for the action button
browser.menus.create({
  id: 'options',
  title: 'Options',
  contexts: ['action'],
  command: '_execute_action'
});

