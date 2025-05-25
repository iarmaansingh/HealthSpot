const BIN_ID = '68332e128a456b7966a52e51';
const API_KEY = '$2a$10$MdBoEezWDni8FxWfT8hSh..DEOmvGRx2b5zpfgODYjF5zgSIjkaV2';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', handleLogin);

  // Add loader CSS globally once
  const style = document.createElement('style');
  style.innerHTML = `
    .loader {
      border: 8px solid #e5e7eb;
      border-top: 8px solid #3490dc;
      border-radius: 9999px;
      width: 6rem;
      height: 6rem;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
});

async function handleLogin(event) {
  event.preventDefault();
  const loginId = event.target.loginId.value.trim();
  const password = event.target.password.value;

  if (loginId === 'admin' && password === 'singh@armaan') {
    const main = document.getElementById('mainContent');
    main.innerHTML = `
      <div class="flex flex-col items-center justify-center gap-4">
        <div class="loader"></div>
        <p class="text-white text-xl">Loading user data...</p>
      </div>
    `;

    await loadAllUsers();
  } else {
    alert('Invalid login ID or password');
  }
}

async function loadAllUsers() {
  const main = document.getElementById('mainContent');
  main.innerHTML = `
    <div class="flex flex-col items-center justify-center gap-4">
      <div class="loader"></div>
      <p class="text-blue-900 text-xl">Loading all users...</p>
    </div>
  `;

  try {
    const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
      headers: { 'X-Master-Key': API_KEY }
    });

    if (!response.ok) throw new Error('Failed to fetch user data');

    const data = await response.json();
    const users = data.record || [];

    showAllUsers(users);
  } catch (error) {
    main.innerHTML = `<p class="text-red-500 text-center">Error loading user data: ${error.message}</p>`;
  }
}

function showAllUsers(users) {
  const main = document.getElementById('mainContent');
  main.innerHTML = '';
  main.className = 'p-6 mt-20 min-h-screen';

  users.forEach(user => {
    const container = document.createElement('div');
    container.className = 'bg-white p-6 rounded-xl shadow-md mb-6 max-w-3xl mx-auto w-full text-blue-900';

    container.innerHTML = `
      <h3 class="text-xl font-bold mb-4">${user.fullName || 'User'}</h3>
      <div class="grid grid-cols-2 gap-x-6 gap-y-2">
        <div><strong>Health ID:</strong> ${user.healthId || 'N/A'}</div>
        <div><strong>Email:</strong> ${user.email || 'N/A'}</div>
        <div><strong>Phone:</strong> ${user.phone || 'N/A'}</div>
        <div><strong>DOB:</strong> ${user.dob || 'N/A'}</div>
        <div><strong>Gender:</strong> ${user.gender || 'N/A'}</div>
        <div><strong>Medical History:</strong> ${user.medicalHistory || 'None'}</div>
        <div><strong>Registered At:</strong> ${user.registeredAt ? new Date(user.registeredAt).toLocaleString() : 'N/A'}</div>
      </div>
    `;

    main.appendChild(container);
  });
}
