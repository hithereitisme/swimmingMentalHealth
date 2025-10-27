// Show signup form
function showSignup() {
    document.getElementById('signup-card').style.display = 'block';
    document.querySelector('.login-card').style.display = 'none';
}

// Show login form
function showLogin() {
    document.getElementById('signup-card').style.display = 'none';
    document.querySelector('.login-card').style.display = 'block';
}

// Signup new user
function signup() {
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;

    if (!username || !password) {
        document.getElementById('signup-message').innerText = 'Please enter username & password';
        return;
    }

    let users = JSON.parse(localStorage.getItem('users') || '{}');

    if (users[username]) {
        document.getElementById('signup-message').innerText = 'Username already exists';
        return;
    }

    users[username] = password;
    localStorage.setItem('users', JSON.stringify(users));
    document.getElementById('signup-message').innerText = 'Account created! You can login now.';
    setTimeout(showLogin, 1500);
}

// Login user
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    let users = JSON.parse(localStorage.getItem('users') || '{}');

    if (users[username] && users[username] === password) {
        localStorage.setItem('loggedInUser', username);
        window.location.href = 'dashboard.html';
    } else {
        document.getElementById('message').innerText = 'Invalid username or password';
    }
}

// Logout user
function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = "index.html";
}
