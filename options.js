browser.storage.local.get("blocklist").then(result => {
  const blocklist = result.blocklist || [];
  const listElement = document.getElementById('blocklist');
  blocklist.forEach(url => {
    const item = document.createElement('li');
    item.textContent = url;
    listElement.appendChild(item);
  });
});

