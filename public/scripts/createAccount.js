

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.login-form');

    console.log("... this works ...");
    form.addEventListener('submit', async function(e) {
        e.preventDefault(); // Prevent the form from submitting the traditional way

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.querySelectorAll('[name="password"]')[1].value; // Since you have two password inputs, this targets the second one

        if(password !== confirmPassword) {
            alert('Passwords do not match.');
            return; // Stop the function if passwords do not match
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Account created successfully', data);
                window.location.href = '/login'; // Redirect to login page upon successful account creation
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }
        } catch (error) {
            alert('Error creating account: ' + error.message);
        }
    });
});
