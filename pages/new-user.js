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

// The Form password checking
 const passwordInput = document.getElementById('password');
  const togglePasswordBtn = document.getElementById('togglePassword');
  const eyeIcon = document.getElementById('eyeIcon');
  const passwordHint = document.getElementById('passwordHint');

  togglePasswordBtn.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';

        // Toggle eye icon (open/closed)
    if (isPassword) {
      // Now changing type to text (show password)
      eyeIcon.innerHTML = `
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      `;
    } else {
      // Now changing type to password (hide password)
      eyeIcon.innerHTML = `
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.269-2.943-9.543-7a10.056 10.056 0 012.75-4.57m2.193-1.746A9.956 9.956 0 0112 5c4.478 0 8.269 2.943 9.543 7a10.055 10.055 0 01-1.357 2.335M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M3 3l18 18" />
      `;
    }

  });

  passwordInput.addEventListener('input', () => {
    const val = passwordInput.value;

    const lengthCheck = val.length >= 8;
    const letterCheck = /[a-zA-Z]/.test(val);
    const numberCheck = /\d/.test(val);
    const symbolCheck = /[!@#$%^&*(),.?":{}|<>]/.test(val);

    if (!val) {
      passwordHint.textContent = 'Use a strong password with at least 8 characters, including letters, numbers & symbols.';
      passwordHint.className = 'mt-1 text-sm text-green-600 font-semibold';
    } else if (!lengthCheck) {
      passwordHint.textContent = 'Password is too short (min 8 characters).';
      passwordHint.className = 'mt-1 text-sm text-red-600 font-semibold';
    } else if (!letterCheck) {
      passwordHint.textContent = 'Add letters to your password.';
      passwordHint.className = 'mt-1 text-sm text-red-600 font-semibold';
    } else if (!numberCheck) {
      passwordHint.textContent = 'Add numbers to your password.';
      passwordHint.className = 'mt-1 text-sm text-red-600 font-semibold';
    } else if (!symbolCheck) {
      passwordHint.textContent = 'Add symbols (e.g. !@#$%) to your password.';
      passwordHint.className = 'mt-1 text-sm text-red-600 font-semibold';
    } else {
      passwordHint.textContent = 'Strong password! 👍';
      passwordHint.className = 'mt-1 text-sm text-green-600 font-semibold';
    }
  });