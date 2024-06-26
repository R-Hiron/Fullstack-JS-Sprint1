document.getElementById('tokenForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    // Getting the Username value from the input field
    const username = document.getElementById('username').value;
    // Sends a post request to the server with the username get the token value  
    const response = await fetch('/create-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username })
    });
    const result = await response.json();
    // adding the token result to the html page
    document.getElementById('result').textContent = result.message;
  });
  