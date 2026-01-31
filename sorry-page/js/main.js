document.addEventListener('DOMContentLoaded', () => {
    // 1. Parse URL Parameters for Personalization
    const urlParams = new URLSearchParams(window.location.search);
    const toName = urlParams.get('to') || 'Love';
    const fromName = urlParams.get('from') || 'Me';

    // 2. Personalize Text
    const greetingEl = document.getElementById('greeting');
    const senderEl = document.getElementById('sender');
    const nameInput = document.getElementById('name-input');
    
    // Sanitize input to prevent basic injection
    greetingEl.innerText = `Dear ${toName} ❤️`;
    senderEl.innerText = `— From ${fromName}`;

    // Set initial value of input if provided in URL
    if (urlParams.get('to')) {
        nameInput.value = toName;
    }

    // 3. Intro Sequence
    const introScreen = document.getElementById('intro-screen');
    const mainContent = document.getElementById('main-content');
    const mainTitle = document.getElementById('main-title');
    
    // Wait for 3.5 seconds before transitioning
    setTimeout(() => {
        introScreen.style.opacity = '0';
        setTimeout(() => {
            introScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
            
            // Letter-by-letter animation
            const text = mainTitle.innerText;
            mainTitle.innerHTML = '';
            
            [...text].forEach((char, index) => {
                const span = document.createElement('span');
                span.innerText = char === ' ' ? '\u00A0' : char;
                span.style.animationDelay = `${index * 0.05}s`;
                mainTitle.appendChild(span);
            });
            
            // Activate heartbeat after letters appear
            setTimeout(() => {
                mainTitle.classList.add('heartbeat-active');
            }, text.length * 50 + 500);

        }, 1000);
    }, 3500);

    // 4. Background Hearts Generator
    const heartsContainer = document.getElementById('background-hearts');
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = Math.random() * 100 + 'vw';
        // Randomize size slightly
        const scale = Math.random() * 0.5 + 0.5; // 0.5 to 1.0
        heart.style.transform = `scale(${scale}) rotate(-45deg)`;
        
        // Randomize speed
        const duration = Math.random() * 3 + 4; // 4s to 7s
        heart.style.animationDuration = duration + 's';
        
        heartsContainer.appendChild(heart);
        
        // Remove after animation completes
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }

    // Start generating hearts
    setInterval(createHeart, 500);

    // 5. Button Interactions
    const forgiveBtn = document.getElementById('forgive-btn');
    const hugBtn = document.getElementById('hug-btn');
    const responseMessage = document.getElementById('response-message');
    const actionButtons = document.getElementById('action-buttons');

    // Check for secret name and redirect immediately
    function checkSecret(name) {
        if (name && name.trim().toLowerCase() === 'Name of your loved one') {
            console.log("Secret name detected! Redirecting...");
            window.location.href = 'secret.html';
        }
    }

    // Initial check (if loaded via URL)
    checkSecret(toName);

    // Listen for input changes
    nameInput.addEventListener('input', (e) => {
        const newName = e.target.value;
        greetingEl.innerText = `Dear ${newName || 'Love'} ❤️`;
        checkSecret(newName);
    });

    function handleInteraction(message) {
        // Burst animation
        burstHearts();
        
        // Hide buttons
        actionButtons.style.display = 'none';
        
        // Show message
        responseMessage.innerHTML = message;
        responseMessage.classList.remove('hidden');
    }

    forgiveBtn.addEventListener('click', () => {
        handleInteraction("Thank you! I promise to make it up to you! 💖");
    });

    hugBtn.addEventListener('click', () => {
        handleInteraction("Sending you the biggest virtual hug ever! 🫂❤️");
    });

    function burstHearts() {
        // Create a burst of hearts
        for(let i=0; i<50; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.classList.add('heart');
                heart.style.left = Math.random() * 100 + 'vw';
                heart.style.bottom = '-50px'; // Start from bottom
                
                // Faster animation for burst
                const duration = Math.random() * 2 + 2; 
                heart.style.animationDuration = duration + 's';
                
                heartsContainer.appendChild(heart);
                
                setTimeout(() => {
                    heart.remove();
                }, duration * 1000);
            }, i * 30);
        }
    }
});
