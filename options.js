// Load the blocklist and display it
browser.storage.local.get('blocklist').then((result) => {
  const blocklist = result.blocklist || [];
  const listElement = document.getElementById('blocklist');

  blocklist.forEach((domain) => {
    const item = document.createElement('li');
    item.textContent = domain;
    const minusButton = document.createElement('button');
    minusButton.textContent = '-';
    minusButton.addEventListener('click', () => {
      const index = blocklist.indexOf(domain);
      if (index > -1) {
        blocklist.splice(index, 1);
        browser.storage.local.set({ blocklist });
        item.remove();
      }
    });
    item.appendChild(minusButton);
    listElement.appendChild(item);
  });
});

