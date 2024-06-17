window.onload = () => {
  const sortButton = document.getElementById('sort-button');
  if (sortButton) {
    sortButton.addEventListener('click', () => {
      window.location.href = '/sort';
    });
  }
  const loginRedirect = document.getElementById('login-redirect');
  if (loginRedirect) {
    loginRedirect.addEventListener('click', () => {
      window.location.href = '/auth/login';
    });
  }
  const loginButton = document.getElementById('login-button');
  if (loginButton) {
    loginButton.addEventListener('click', () => {
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      fetch('/auth/isadmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      }).then((response) => {
        if (response.status === 200) {
          console.log('Login successful');
          window.location.href = '/';
        } else {
          response.json().then((data) => {
            if (data.status) {
              window.location.href = '/';
            }
          });
        }
      });
    });
  }
};
