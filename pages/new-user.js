window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    const main = document.getElementById('main-content');
    loader.style.display = 'none';
    main.style.opacity = '1';
  }, 1000);
});

// HealthID Number Generator

function generateHealthId() {
  return Math.floor(100000000 + Math.random() * 900000000).toString();
}


const BIN_ID = '68332e128a456b7966a52e51';
const API_KEY = '$2a$10$MdBoEezWDni8FxWfT8hSh..DEOmvGRx2b5zpfgODYjF5zgSIjkaV2';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

            const newUser = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            dob: document.getElementById('dob').value,
            gender: document.getElementById('gender').value,
            medicalHistory: document.getElementById('medicalHistory').value,
            healthId: generateHealthId(),
            password: document.getElementById('password').value,
            registeredAt: new Date().toISOString()
            };

        document.getElementById('form-loader').style.display = 'flex';


    try {
    // Step 1️⃣: Fetch existing data
    const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
        headers: { 'X-Master-Key': API_KEY }
    });
    const data = await response.json();
    const users = data.record || [];

    // Step 2️⃣: Add new user to array
    users.push(newUser);

    // Step 3️⃣: PUT updated array back to JSONBin
    await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': API_KEY
        },
        body: JSON.stringify(users)
    });

    // Step 4️⃣: Save new user to sessionStorage
    sessionStorage.setItem('loggedInUser', JSON.stringify(newUser));

    alert('✅ Registration successful! Redirecting to your health details...');
    
    // Step 5️⃣: Redirect to healthid.html page
    window.location.href = 'healthid.html';

    form.reset();
    } catch (error) {
    console.error(error);
    alert('❌ Registration failed.');
    }
  });
});

