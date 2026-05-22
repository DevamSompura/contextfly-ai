chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "analyze_text") {
        
        fetch("http://127.0.0.1:8000/api/v1/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: message.text,
                url: message.url
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Server returned status ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // CRUCIAL: Send response matching content.js expectations perfectly
            sendResponse({ success: true, data: data });
        })
        .catch(error => {
            console.error("Fetch error:", error);
            sendResponse({ success: false, error: error.message });
        });

        return true; // Keeps the message channel open for asynchronous responses
    }
});