import React, { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    let deferredPrompt;

    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the default prompt
      e.preventDefault();
      deferredPrompt = e;

      // Optionally, show a custom install button
      const installButton = document.getElementById('installButton');
      if (installButton) {
        installButton.style.display = 'block';

        installButton.addEventListener('click', () => {
          // Show the install prompt
          deferredPrompt.prompt();

          deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
              console.log('User accepted the install prompt');
            } else {
              console.log('User dismissed the install prompt');
            }

            deferredPrompt = null;
          });
        });
      }
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', () => {});
    };
  }, []);

  return (
    <div className="App">
      <h1>My Progressive Web App</h1>
      <button id="installButton" style={{ display: 'none' }}>Install App</button>
    </div>
  );
}

export default App;
