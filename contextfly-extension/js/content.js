document.addEventListener('keydown', function(event) {
    // New Conflict-Free Shortcut: Ctrl + Shift + Y
    if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'y') {
        
        // CRUCIAL: Intercept and stop the website from doing any default action or redirecting
        event.preventDefault();
        event.stopPropagation();

        const selectedText = window.getSelection().toString().trim();

        if (selectedText.length > 0) {
            console.log("✈️ ContextFly: Captured text chunk safely. Handing over to background pipeline...");
            
            chrome.runtime.sendMessage(
                {
                    action: "analyze_text",
                    text: selectedText,
                    url: window.location.href
                },
                function(response) {
                    // Safety check to handle 'Extension context invalidated' errors cleanly
                    if (chrome.runtime.lastError) {
                        alert("⚠️ ContextFly Sync Error: Please refresh this tab to apply the latest extension update.");
                        return;
                    }

                    if (response && response.success && response.data) {
                        // Display the clean AI response directly
                        alert("✅ ContextFly Analysis:\n\n" + response.data.preview);
                    } else {
                        const errorMsg = response ? response.error : "Unknown network processing anomaly.";
                        alert("❌ App Data Contract Exception: " + errorMsg);
                    }
                }
            );
        }
    }
});