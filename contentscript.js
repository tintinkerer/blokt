addEventListener("tabs.onUpdated", function(event) {
  if (event.detail.removed) {
    blocklist.push(event.detail.tab.url);
  }
});

