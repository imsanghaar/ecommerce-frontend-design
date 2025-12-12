/* =====================================================
   AUTHENTICATION LOGIC
   Handles Signup, Login, Logout, Profile, and Protections
   ===================================================== */

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

            // check if user exists
            const users = JSON.parse(localStorage.getItem('users')) || [];
            if (users.find(u => u.email === email || u.username === username)) {
                alert('User with this email or username already exists.');
                return;
            }

            // Process Image
            let profilePic = '';
            if (imgInput.files && imgInput.files[0]) {
                profilePic = await convertToBase64(imgInput.files[0]);
            }

            const newUser = {
                name,
                email,
                username,
                password,
                profilePic,
                joinDate: new Date().toLocaleDateString()
            };

            // Show Loading Popup (Requested Animation: 10s wait, then 5s redirect)
            const popup = document.getElementById('loadingPopup');
            const msg = document.getElementById('popupMessage');
            
            popup.style.display = 'flex';
            msg.textContent = 'Please wait while we create your account';
            
            // 10 Seconds Wait
            setTimeout(() => {
                msg.textContent = 'Redirecting you to the Home Page';
                
                // 5 Seconds Wait then Save and Redirect
                setTimeout(() => {
                    users.push(newUser);
                    localStorage.setItem('users', JSON.stringify(users));
                    localStorage.setItem('currentUser', JSON.stringify(newUser));
                    
                    window.location.href = '../../index.html';
                }, 5000);
            }, 10000);
        });
    }

    // --- LOGIN HANDLER ---
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const identifier = document.getElementById('loginIdentifier').value;
            const password = document.getElementById('loginPassword').value;
            
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => (u.email === identifier || u.username === identifier) && u.password === password);
            
            if (user) {
                // Login Success Animation: 5s "Logging you in" -> Checkmark -> Redirect
                const popup = document.getElementById('loadingPopup');
                const msg = document.getElementById('popupMessage');
                const spinner = document.getElementById('spinner');
                const checkmark = document.getElementById('checkmark');
                
                popup.style.display = 'flex';
                msg.textContent = 'Loggin you in';
                
                setTimeout(() => {
                    // Show Checkmark
                    spinner.style.display = 'none';
                    checkmark.style.display = 'flex';
                    msg.textContent = 'Success!';
                    
                    // Redirect
                    setTimeout(() => {
                        localStorage.setItem('currentUser', JSON.stringify(user));
                        // Verify redirection target - user said "take the user to home page" or "same data in my profile page".
                        // Usually login redirects to home or dashboard. User said "take the user to home page".
                        window.location.href = '../../index.html'; 
                    }, 1000); // short delay to see checkmark
                }, 5000);
                
            } else {
                alert('Invalid credentials. Please try again.');
            }
        });
    }

    // --- FORGOT PASSWORD ---
    if (forgotBtn) {
        forgotBtn.addEventListener('click', () => {
            document.getElementById('forgotPasswordPopup').style.display = 'flex';
        });
    }
    
    if (closeForgotBtn) {
        closeForgotBtn.addEventListener('click', () => {
            document.getElementById('forgotPasswordPopup').style.display = 'none';
        });
    }

    if (tellPasswordBtn) {
        tellPasswordBtn.addEventListener('click', () => {
             const email = document.getElementById('recoverEmail').value;
             const users = JSON.parse(localStorage.getItem('users')) || [];
             const user = users.find(u => u.email === email);
             const recoveredData = document.getElementById('recoveredData');
             const error = document.getElementById('recoverError');
             
             if (user) {
                 error.style.display = 'none';
                 recoveredData.style.display = 'block';
                 recoveredData.innerHTML = `
                    <div class="recovered-item"><strong>Name:</strong> ${user.name}</div>
                    <div class="recovered-item"><strong>Email:</strong> ${user.email}</div>
                    <div class="recovered-item"><strong>Password:</strong> ${user.password}</div>
                 `;
             } else {
                 recoveredData.style.display = 'none';
                 error.style.display = 'block';
             }
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
