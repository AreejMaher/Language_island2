document.addEventListener('DOMContentLoaded', () => {
    const displayMode = document.getElementById('profileDisplayMode');
    const editMode = document.getElementById('profileEditMode');
    const editBtn = document.getElementById('editProfileBtn');
    const saveBtn = document.getElementById('saveProfileBtn');
    const cancelBtn = document.getElementById('cancelProfileBtn');
    const errorBox = document.getElementById('profileMessage');

    const firstNameInput = document.getElementById('editFirstName');
    const lastNameInput = document.getElementById('editLastName');
    const emailInput = document.getElementById('editEmail');

    // Kept in sync with the last known-good values from the server,
    // so "Cancel" can reliably restore them.
    let current = { first_name: '', last_name: '', email: '' };

    loadProfile();

    function loadProfile() {
        fetch('../Backend/get_profile.php')
            .then(res => res.json())
            .then(data => {
                if (data.success === false && data.error === 'not_logged_in') {
                    window.location.href = 'signin.html';
                    return;
                }
                if (data.success) {
                    current.first_name = data.data.first_name || '';
                    current.last_name = data.data.last_name || '';
                    current.email = data.data.email || '';

                    renderDisplay();

                    document.getElementById('statStreak').textContent = data.data.daily_streak || 0;
                    document.getElementById('statShells').textContent = data.data.star_shells || 0;
                    document.getElementById('statXP').textContent = data.data.total_xp || 0;
                    document.getElementById('statLevel').textContent = data.data.level || 1;
                }
            })
            .catch(err => console.error("Could not load profile:", err));
    }

    function renderDisplay() {
        document.getElementById('userName').textContent = current.first_name || 'Explorer';
        document.getElementById('displayFullName').textContent = `${current.first_name} ${current.last_name}`.trim();
        document.getElementById('displayEmail').textContent = current.email;
    }

    function enterEditMode() {
        firstNameInput.value = current.first_name;
        lastNameInput.value = current.last_name;
        emailInput.value = current.email;
        clearError();

        displayMode.style.display = 'none';
        editMode.style.display = 'block';
    }

    function exitEditMode() {
        displayMode.style.display = 'block';
        editMode.style.display = 'none';
        clearError();
    }

    function showError(message) {
        errorBox.textContent = message;
        errorBox.className = 'error';
    }

    function showSuccess(message) {
        errorBox.textContent = message;
        errorBox.className = 'success';
        setTimeout(() => {
            if (errorBox.className === 'success') clearError();
        }, 3000);
    }

    function clearError() {
        errorBox.textContent = '';
        errorBox.className = '';
    }

    editBtn.addEventListener('click', enterEditMode);
    cancelBtn.addEventListener('click', exitEditMode);

    saveBtn.addEventListener('click', () => {
        const first_name = firstNameInput.value.trim();
        const last_name = lastNameInput.value.trim();
        const email = emailInput.value.trim();

        clearError();

        if (!first_name || !last_name || !email) {
            showError('Please fill in all fields.');
            return;
        }

        // Simple client-side email format check for instant feedback;
        // the server validates this for real before touching the database.
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showError('Please enter a valid email address.');
            return;
        }

        saveBtn.disabled = true;
        saveBtn.textContent = 'Saving...';

        fetch('../Backend/update_profile.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ first_name, last_name, email })
        })
        .then(res => res.json())
        .then(response => {
            saveBtn.disabled = false;
            saveBtn.textContent = 'Save Changes';

            if (response.success) {
                current.first_name = response.first_name;
                current.last_name = response.last_name;
                current.email = response.email;
                renderDisplay();
                exitEditMode();
                showSuccess('✅ Profile updated!');
            } else {
                showError(response.message || 'Could not save changes.');
            }
        })
        .catch(err => {
            saveBtn.disabled = false;
            saveBtn.textContent = 'Save Changes';
            console.error("Network error saving profile:", err);
            showError('Network error. Please try again.');
        });
    });
});