document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('submitBtn');
    const nameInput = document.getElementById('nameInput');
    const responseContainer = document.getElementById('responseContainer');
    const responseMessage = document.getElementById('responseMessage');

    async function submitName() {
        const name = nameInput.value.trim();
        
        if (!name) {
            alert('Please enter your name.');
            nameInput.focus();
            return;
        }

        try {
            // Update UI to show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';
            responseContainer.classList.add('hidden');

            const response = await fetch('http://localhost:8080/greet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: name })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            
            // Display the success message
            responseMessage.textContent = data.message;
            
            // Reset colors if previous error
            responseContainer.style.backgroundColor = 'var(--success-bg)';
            responseContainer.style.color = 'var(--success-text)';
            responseContainer.classList.remove('hidden');
        } catch (error) {
            console.error('Error fetching data:', error);
            
            // Display error message
            responseMessage.textContent = 'Failed to connect to the server.';
            responseContainer.style.backgroundColor = '#fee2e2';
            responseContainer.style.color = '#991b1b';
            responseContainer.classList.remove('hidden');
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit';
        }
    }

    submitBtn.addEventListener('click', submitName);

    // Allow pressing "Enter" in the input field
    nameInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            submitName();
        }
    });
});
