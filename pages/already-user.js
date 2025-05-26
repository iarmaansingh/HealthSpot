window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    const main = document.getElementById('main-content');
    loader.style.display = 'none';
    main.style.opacity = '1';
  }, 1000);
});


const BIN_ID = '68344ecd8a456b7966a583dd';
const API_KEY = '$2a$10$zyQpm6tNv6SvPgWM2E1D1eDfvL1zWu8pc2YI1prGoUikZKK4Zwhd.';

async function loginUser() {
  const healthId = document.getElementById('loginHealthId').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  if (!healthId || !password) {
    alert('Please enter both Health ID and Password');
    return;
  }

  try {
    const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
      headers: { 'X-Master-Key': API_KEY }
    });

    const data = await response.json();
    const users = data.record || [];

    const user = users.find(u => u.healthId === healthId && u.password === password);

    if (user) {
      // Show popup modal
      const popup = document.getElementById('popup');
      popup.classList.remove('hidden');

      // Save user data in session storage
      sessionStorage.setItem('loggedInUser', JSON.stringify(user));

      // Wait 2 seconds before redirect
      setTimeout(() => {
        window.location.href = 'healthid.html';
      }, 2000);
    } else {
      alert('❌ No matching user found.');
    }
  } catch (error) {
    console.error(error);
    alert('Failed to fetch user data.');
  }
}
