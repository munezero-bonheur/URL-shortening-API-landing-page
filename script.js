const urlInput = document.getElementById('url-input');
const shortenBtn = document.getElementById('shorten-btn');
const errorMessage = document.getElementById('error-message');
const shortenedLinks = document.getElementById('shortened-links');

shortenBtn.addEventListener('click', async () => {
  const originalURL = urlInput.value.trim();

  if (originalURL === '') {
    errorMessage.textContent = 'Please enter a valid URL';
    return;
  }

  errorMessage.textContent = '';

  try {
    const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${originalURL}`);
    const data = await response.json();

    if (data.ok) {
      displayShortenedLink(data.result);
      urlInput.value = '';
    } else {
      errorMessage.textContent = 'An error occurred';
    }
  } catch (error) {
    console.error(error);
    errorMessage.textContent = 'An error occurred';
  }
});

function displayShortenedLink(result) {
  const shortenedLink = document.createElement('div');
  shortenedLink.classList.add('shortened-link');
  shortenedLink.innerHTML = `
    <p>${result.original_link}</p>
    <a href="${result.full_short_link}" target="_blank" class="short-link">${result.short_link}</a>
    <button class="copy-btn">Copy</button>
  `;

  const copyButton = shortenedLink.querySelector('.copy-btn');
  copyButton.addEventListener('click', () => {
    copyToClipboard(result.full_short_link);
    copyButton.textContent = 'Copied!';
    setTimeout(() => {
      copyButton.textContent = 'Copy';
    }, 1000);
  });

  shortenedLinks.appendChild(shortenedLink);
}

function copyToClipboard(text) {
  const tempInput = document.createElement('input');
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
}
