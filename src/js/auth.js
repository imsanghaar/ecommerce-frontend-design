/* =====================================================
   AUTHENTICATION LOGIC
   Handles Signup, Login, Logout, Profile, and Protections
   With JSONBin.io Cloud Storage Integration
   ===================================================== */

// ===== JSONBin.io Configuration =====
const JSONBIN_CONFIG = {
    binId: '693c63e4ae596e708f95a256',
    masterKey: '$2a$10$LtVROgh1dR4Anz9L0Bg2euEp7wtgXCmApLxMKDeGhm1n4f/V3d1CK',
    apiUrl: 'https://api.jsonbin.io/v3/b'
};

// ===== Cloud Storage Helper Functions =====

// Fetch users from JSONBin.io
async function fetchUsersFromCloud() {
    try {
        const response = await fetch(`${JSONBIN_CONFIG.apiUrl}/${JSONBIN_CONFIG.binId}/latest`, {
            method: 'GET',
            headers: {
                'X-Master-Key': JSONBIN_CONFIG.masterKey
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            const users = data.record.users || [];
            // Sync to localStorage
            localStorage.setItem('users', JSON.stringify(users));
            console.log('✅ Users synced from cloud:', users.length, 'users');
            return users;
        }
    } catch (error) {
        console.warn('⚠️ Could not fetch from cloud, using local data:', error);
    }
    
    // Fallback to localStorage
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Save users to JSONBin.io
async function saveUsersToCloud(users) {
    try {
        const response = await fetch(`${JSONBIN_CONFIG.apiUrl}/${JSONBIN_CONFIG.binId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': JSONBIN_CONFIG.masterKey
            },
            body: JSON.stringify({ users: users })
        });
        
        if (response.ok) {
            console.log('✅ Users saved to cloud successfully');
            return true;
        }
    } catch (error) {
        console.error('❌ Failed to save to cloud:', error);
    }
    return false;
}

// Get users (tries cloud first, falls back to local)
async function getUsers() {
    // Try to fetch from cloud
    const cloudUsers = await fetchUsersFromCloud();
    return cloudUsers;
}

// Save users (saves to both local and cloud)
async function saveUsers(users) {
    // Save to localStorage immediately (for offline use)
    localStorage.setItem('users', JSON.stringify(users));
    
    // Save to cloud in background
    saveUsersToCloud(users);
}

document.addEventListener('DOMContentLoaded', function() {
    initAuth();
});

function initAuth() {
    // 1. Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const path = window.location.pathname;
    
    // Update Header UI
    updateHeaderAuth(currentUser);
    updateHomepageHero(currentUser);

    // Protected Routes Check
    if ((path.includes('profile.html') || path.includes('orders.html')) && !currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Redirect if already logged in (optional, but good UX)
    if ((path.includes('login.html') || path.includes('signup.html')) && currentUser) {
        window.location.href = 'profile.html';
        return;
    }

    // Populate Profile Page if active
    if (path.includes('profile.html') && currentUser) {
        populateProfile(currentUser);
    }
    
    // Populate Sidebar on Orders/Profile
    if ((path.includes('profile.html') || path.includes('orders.html')) && currentUser) {
        populateSidebar(currentUser);
    }

    // Setup Event Listeners
    setupAuthListeners();
    setupEditProfileListeners();
}

function setupEditProfileListeners() {
    const editBtn = document.getElementById('editProfileBtn');
    const modal = document.getElementById('editProfileModal');
    const cancelBtn = document.getElementById('cancelEditBtn');
    const form = document.getElementById('editProfileForm');
    const imageInput = document.getElementById('editProfileImage');

    if (editBtn) {
        editBtn.addEventListener('click', () => {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (!currentUser) return;

            // Pre-fill form
            document.getElementById('editName').value = currentUser.name || '';
            
            if (currentUser.address) {
                document.getElementById('editStreet').value = currentUser.address.street || '';
                document.getElementById('editCity').value = currentUser.address.city || '';
                document.getElementById('editState').value = currentUser.address.state || '';
                document.getElementById('editZip').value = currentUser.address.zip || '';
                document.getElementById('editCountry').value = currentUser.address.country || '';
            }

            // Preview current image
            const preview = document.getElementById('editImagePreview');
            if (currentUser.profilePic) {
                preview.innerHTML = `<img src="${currentUser.profilePic}" style="width: 100%; height: 100%; object-fit: cover;">`;
            } else {
                preview.innerHTML = `<i class="fa-solid fa-user" style="font-size: 40px; color: #ccc;"></i>`;
            }

            modal.style.display = 'flex';
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Image Preview logic
    if (imageInput) {
        imageInput.addEventListener('change', async function(e) {
            const file = e.target.files[0];
            if (file) {
                // Removed file size check
                const base64 = await convertToBase64(file);
                const preview = document.getElementById('editImagePreview');
                preview.innerHTML = `<img src="${base64}" style="width: 100%; height: 100%; object-fit: cover;">`;
            }
        });
    }

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            
            // Get new values
            currentUser.name = document.getElementById('editName').value;
            
            const address = {
                street: document.getElementById('editStreet').value,
                city: document.getElementById('editCity').value,
                state: document.getElementById('editState').value,
                zip: document.getElementById('editZip').value,
                country: document.getElementById('editCountry').value
            };
            currentUser.address = address;

            // Handle Image Update
            const fileInput = document.getElementById('editProfileImage');
            if (fileInput.files.length > 0) {
                currentUser.profilePic = await convertToBase64(fileInput.files[0]);
            }

            // Save using global helper
            const success = await window.updateUserProfile(currentUser);
            
            if (success) {
                alert('Profile updated successfully!');
                modal.style.display = 'none';
                populateProfile(currentUser);
                populateSidebar(currentUser);
                updateHeaderAuth(currentUser);
            } else {
                alert('Failed to update profile. Please try again.');
            }
        });
    }

}

function setupAuthListeners() {
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');
    const logoutBtn = document.getElementById('logoutBtn');
    const logoutMainBtn = document.getElementById('logoutMainBtn');
    const imageInput = document.getElementById('profileImage');
    const forgotBtn = document.getElementById('forgotPasswordBtn');
    const tellPasswordBtn = document.getElementById('tellPasswordBtn');
    const closeForgotBtn = document.getElementById('closeForgotPopup');

    // --- SIGNUP HANDLER ---
    if (signupForm) {
        // Image Preview
        if (imageInput) {
            imageInput.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const preview = document.getElementById('imagePreview');
                        preview.innerHTML = `<img src="${e.target.result}" alt="Profile Preview">`;
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        signupForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Validation
            const name = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const confirmPass = document.getElementById('confirmPassword').value;
            const imgInput = document.getElementById('profileImage');
            
            // Password Match Check
            if (password !== confirmPass) {
                document.getElementById('passwordError').style.display = 'block';
                return;
            } else {
                document.getElementById('passwordError').style.display = 'none';
            }

            // Show Loading Popup early
            const popup = document.getElementById('loadingPopup');
            const msg = document.getElementById('popupMessage');
            popup.style.display = 'flex';
            msg.textContent = 'Checking account details...';

            // Fetch users from cloud to check if exists
            const users = await getUsers();
            if (users.find(u => u.email === email || u.username === username)) {
                popup.style.display = 'none';
                alert('User with this email or username already exists.');
                return;
            }

            // Process Image
            let profilePic = '';
            if (imgInput.files && imgInput.files[0]) {
                const file = imgInput.files[0];
                profilePic = await convertToBase64(file);
            }

            const newUser = {
                id: Date.now().toString(),
                name,
                email,
                username,
                password,
                profilePic,
                joinDate: new Date().toLocaleDateString()
            };

            msg.textContent = 'Creating your account...';
            
            // Add user to array
            users.push(newUser);
            
            // Save to cloud and local storage
            await saveUsers(users);
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            
            msg.textContent = 'Account created successfully!';
            
            // Short delay then redirect
            setTimeout(() => {
                msg.textContent = 'Redirecting you to the Home Page...';
                setTimeout(() => {
                    window.location.href = '../../index.html';
                }, 1500);
            }, 1500);
        });
    }

    // --- LOGIN HANDLER ---
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const identifier = document.getElementById('loginIdentifier').value;
            const password = document.getElementById('loginPassword').value;
            
            // Show loading popup while fetching from cloud
            const popup = document.getElementById('loadingPopup');
            const msg = document.getElementById('popupMessage');
            const spinner = document.getElementById('spinner');
            const checkmark = document.getElementById('checkmark');
            
            popup.style.display = 'flex';
            spinner.style.display = 'block';
            checkmark.style.display = 'none';
            msg.textContent = 'Verifying credentials...';
            
            // Fetch users from cloud
            const users = await getUsers();
            const user = users.find(u => (u.email === identifier || u.username === identifier) && u.password === password);
            
            if (user) {
                msg.textContent = 'Logging you in...';
                
                setTimeout(() => {
                    // Show Checkmark
                    spinner.style.display = 'none';
                    checkmark.style.display = 'flex';
                    msg.textContent = 'Success!';
                    
                    // Redirect
                    setTimeout(() => {
                        localStorage.setItem('currentUser', JSON.stringify(user));
                        window.location.href = '../../index.html'; 
                    }, 1000);
                }, 1500);
                
            } else {
                popup.style.display = 'none';
                alert('Invalid credentials. Please try again.');
            }
        });
    }

    // --- FORGOT PASSWORD ---
    if (forgotBtn) {
        forgotBtn.addEventListener('click', () => {
            // Reset popup state when opening
            resetForgotPasswordPopup();
            document.getElementById('forgotPasswordPopup').style.display = 'flex';
        });
    }
    
    if (closeForgotBtn) {
        closeForgotBtn.addEventListener('click', () => {
            document.getElementById('forgotPasswordPopup').style.display = 'none';
            // Reset popup state when closing
            resetForgotPasswordPopup();
        });
    }

    if (tellPasswordBtn) {
        tellPasswordBtn.addEventListener('click', async () => {
            const email = document.getElementById('recoverEmail').value.trim();
            const username = document.getElementById('recoverUsername').value.trim();
            const error = document.getElementById('recoverError');
            
            // Get state elements
            const formState = document.getElementById('forgotFormState');
            const loadingState = document.getElementById('forgotLoadingState');
            const successState = document.getElementById('forgotSuccessState');
            const retrievedPassword = document.getElementById('retrievedPassword');
            
            if (!email || !username) {
                error.textContent = 'Please enter both email and username.';
                error.style.display = 'block';
                return;
            }
            
            // Show loading while fetching from cloud
            error.style.display = 'none';
            formState.style.display = 'none';
            loadingState.style.display = 'block';
            
            // Fetch users from cloud
            const users = await getUsers();
            const user = users.find(u => u.email === email && u.username === username);
            
            // Artificial delay to make it feel like "verifying"
            setTimeout(() => {
                if (user) {
                    // Success: Show Password
                    loadingState.style.display = 'none';
                    successState.style.display = 'block';
                    retrievedPassword.textContent = user.password;
                } else {
                    // User not found or mismatch
                    loadingState.style.display = 'none';
                    formState.style.display = 'block';
                    error.textContent = 'Invalid email or username combination.';
                    error.style.display = 'block';
                }
            }, 1000);
        });
    }

    // --- LOGOUT ---
    if (logoutBtn) {
        logoutBtn.addEventListener('click', performLogout);
    }
    if (logoutMainBtn) {
        logoutMainBtn.addEventListener('click', performLogout);
    }
}

function performLogout(e) {
    if(e) e.preventDefault();
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('currentUser');
        window.location.href = '../../index.html'; // Or reload current page
    }
}

function updateHeaderAuth(user) {
    const profileLink = document.querySelector('.action-item.profile');
    const path = window.location.pathname;
    const isRoot = path.endsWith('index.html') || path.endsWith('/');
    const prefix = isRoot ? 'src/html/' : '';
    
    // Update Header Profile Link
    if (profileLink) {
        if (user) {
            const imgHtml = user.profilePic ? 
                `<img src="${user.profilePic}" alt="Profile" style="width: 24px; height: 24px; border-radius: 50%; object-fit: cover; margin-right: 5px; vertical-align: middle;">` : 
                `<i class="fa-solid fa-user"></i>`;
            
            profileLink.innerHTML = `${imgHtml} ${user.name.split(' ')[0]}`;
            profileLink.href = `${prefix}profile.html`;
        } else {
            profileLink.innerHTML = `<i class="fa-regular fa-user"></i> Login / Join`;
            profileLink.href = `${prefix}login.html`;
        }
    }
}

function populateProfile(user) {
    const nameEl = document.getElementById('profileName');
    const emailEl = document.getElementById('profileEmail');
    const usernameEl = document.getElementById('profileUsername');
    
    if (nameEl) nameEl.textContent = user.name;
    if (emailEl) emailEl.textContent = user.email;
    if (usernameEl) usernameEl.textContent = user.username;
    
    // Populate Address if it exists
    const addressEl = document.getElementById('profileAddress');
    if (addressEl) {
        if (user.address) {
            const addr = user.address;
            addressEl.innerHTML = `${addr.street}<br>${addr.city}, ${addr.state} ${addr.zip}<br>${addr.country}`;
        } else {
            addressEl.textContent = 'No address saved.';
        }
    }
}

function populateSidebar(user) {
    const sbName = document.getElementById('sidebarName');
    const sbEmail = document.getElementById('sidebarEmail');
    const sbAvatar = document.getElementById('sidebarAvatar');
    
    if (sbName) sbName.textContent = user.name;
    if (sbEmail) sbEmail.textContent = user.email;
    if (sbAvatar && user.profilePic) {
        sbAvatar.innerHTML = `<img src="${user.profilePic}" alt="Profile">`;
    }
}

// Helper to convert image to base64
function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
window.checkAuth = initAuth; // Expose global

// Global function to update user profile (e.g. from Cart or Profile page)
window.updateUserProfile = async function(updatedUser) {
    try {
        // Update current user in local storage
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        
        // Update in full users array and sync to cloud
        const users = await getUsers();
        const index = users.findIndex(u => u.id === updatedUser.id || u.username === updatedUser.username);
        
        if (index !== -1) {
            users[index] = updatedUser;
            await saveUsers(users);
            console.log('✅ User profile updated and synced.');
            return true;
        }
    } catch (error) {
        console.error('Failed to update user profile:', error);
        return false;
    }
};

// Helper function to reset forgot password popup state
function resetForgotPasswordPopup() {
    const formState = document.getElementById('forgotFormState');
    const loadingState = document.getElementById('forgotLoadingState');
    const successState = document.getElementById('forgotSuccessState');
    const recoverEmail = document.getElementById('recoverEmail');
    const recoverUsername = document.getElementById('recoverUsername');
    const recoverError = document.getElementById('recoverError');
    
    if (formState) formState.style.display = 'block';
    if (loadingState) loadingState.style.display = 'none';
    if (successState) successState.style.display = 'none';
    if (recoverEmail) recoverEmail.value = '';
    if (recoverUsername) recoverUsername.value = '';
    if (recoverError) recoverError.style.display = 'none';
}

// Update Homepage Hero Section (User Greeting Card)
function updateHomepageHero(user) {
    const greetingCard = document.querySelector('.user-greeting-card');
    if (!greetingCard) return;

    const userInfo = greetingCard.querySelector('.user-info');
    const avatar = userInfo ? userInfo.querySelector('.user-avatar') : null;
    const greetingText = userInfo ? userInfo.querySelector('p') : null;
    const joinBtn = greetingCard.querySelector('.join-now-button');
    const loginBtn = greetingCard.querySelector('.login-button');

    if (user) {
        // Logged In State
        if (avatar) {
            if (user.profilePic) {
                avatar.innerHTML = `<img src="${user.profilePic}" alt="Profile" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover;">`;
            } else {
                avatar.innerHTML = `<i class="fa-solid fa-user" style="font-size: 44px; color: #b3c1d0; background: #fff; border-radius: 50%;"></i>`;
            }
        }
        
        if (greetingText) {
            greetingText.innerHTML = `Welcome, <br> ${user.name}`;
        }
        
        if (joinBtn) joinBtn.style.display = 'none';
        if (loginBtn) loginBtn.style.display = 'none';
    } else {
        // Logged Out State (Restore)
        if (avatar) {
            avatar.innerHTML = `<i class="fa-solid fa-user" style="font-size: 44px; color: #b3c1d0; background: #fff; border-radius: 50%;"></i>`;
        }
        
        if (greetingText) {
            greetingText.innerHTML = `Hi, user <br> let's get started`;
        }
        
        if (joinBtn) joinBtn.style.display = 'block';
        if (loginBtn) loginBtn.style.display = 'block';
    }
}
