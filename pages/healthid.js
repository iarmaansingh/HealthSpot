    function formatHealthId(id) {
      return id.toString().replace(/(\d{3})(\d{3})(\d{3})/, '$1-$2-$3');
    }

    function calculateAge(dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }

    function loadUserDetails() {
      const user = JSON.parse(sessionStorage.getItem('loggedInUser'));
      const healthIdDisplay = document.getElementById('healthIdDisplay');
      const detailsDiv = document.getElementById('userDetails');

      if (!user) {
        detailsDiv.innerHTML = `<p class="text-red-600 font-semibold">❌ No user data found. Please login first.</p>`;
        healthIdDisplay.textContent = '';
        return;
      }

      healthIdDisplay.textContent = `Health ID: ${formatHealthId(user.healthId)}`;

      detailsDiv.innerHTML = `
        <div class="flex justify-between border-b border-indigo-200 pb-2">
          <span class="font-semibold">Name:</span>
          <span class="font-mono">${user.fullName}</span>
        </div>
        <div class="flex justify-between border-b border-indigo-200 pb-2">
          <span class="font-semibold">Email:</span>
          <span class="font-mono">${user.email}</span>
        </div>
        <div class="flex justify-between border-b border-indigo-200 pb-2">
          <span class="font-semibold">Phone:</span>
          <span class="font-mono">${user.phone}</span>
        </div>
        <div class="flex justify-between border-b border-indigo-200 pb-2">
          <span class="font-semibold">DOB:</span>
          <span class="font-mono">${user.dob}</span>
        </div>
        <div class="flex justify-between border-b border-indigo-200 pb-2">
          <span class="font-semibold">Gender:</span>
          <span class="font-mono">${user.gender}</span>
        </div>
        <div class="flex justify-between border-b border-indigo-200 pb-2">
          <span class="font-semibold">Medical History:</span>
          <span class="font-mono">${user.medicalHistory || 'None'}</span>
        </div>
        <div class="flex justify-between pt-2">
          <span class="font-semibold">Registered At:</span>
          <span class="font-mono">${new Date(user.registeredAt).toLocaleString()}</span>
        </div>
      `;

      // Update ID Card Section
      document.getElementById('cardHealthId').textContent = `🩺 ${formatHealthId(user.healthId)}`;
      document.getElementById('cardName').textContent = `👤 ${user.fullName}`;
      document.getElementById('cardAge').textContent = `🎂 Age: ${calculateAge(user.dob)}`;
    }

    function logout() {
      sessionStorage.removeItem('loggedInUser');
      window.location.href = 'already-user.html';
    }

    window.onload = function() {
    loadUserDetails();

    const user = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (!user) return;

    const qrImg = document.getElementById('qrCode');

    const qrData = 
        `HealthSpot User Details:\n` +
        `Health ID: ${formatHealthId(user.healthId)}\n` +
        `Name: ${user.fullName}\n` +
        `Email: ${user.email}\n` +
        `Phone: ${user.phone}\n` +
        `DOB: ${user.dob}\n` +
        `Gender: ${user.gender}\n` +
        `Medical History: ${user.medicalHistory || 'None'}\n` +
        `Registered At: ${new Date(user.registeredAt).toLocaleString()}`;

    const encodedData = encodeURIComponent(qrData);

    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodedData}`;
    };
