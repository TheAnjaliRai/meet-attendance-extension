// Track if extension is active
let isExtensionActive = true;
const participants = {};

// Handle extension context invalidation
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "EXTENSION_STATUS") {
        sendResponse({ active: isExtensionActive });
    }
});

// Main participant tracking function
function updateParticipants() {
    if (!isExtensionActive) return;

    try {
        // Find participants container (updated June 2024)
        const container = document.querySelector('div[role="list"][aria-label="Participants"]') ||
            document.querySelector('div[jsname="jrQDbd"]');

        if (!container) {
            console.debug("[Meet Tracker] Participants container not found");
            return;
        }

        // Find all participant elements
        const items = container.querySelectorAll('div[role="listitem"][aria-label]');

        // Process each participant
        items.forEach(item => {
            const name = item.getAttribute('aria-label');
            if (!name || name === "Participants") return;

            const time = new Date().toISOString();

            if (!participants[name]) {
                participants[name] = {
                    firstJoined: time,
                    lastSeen: time,
                    duration: 0
                };
            } else {
                participants[name].lastSeen = time;
            }
        });

        // Calculate durations
        const now = new Date();
        Object.keys(participants).forEach(name => {
            const lastSeen = new Date(participants[name].lastSeen);
            participants[name].duration = Math.floor((now - lastSeen) / 1000);
        });

        // Send data to background script with error handling
        try {
            chrome.runtime.sendMessage({
                type: "UPDATE_PARTICIPANTS",
                data: participants
            });
        } catch (e) {
            console.warn("[Meet Tracker] Message send failed, extension may be reloading");
            isExtensionActive = false;
        }

    } catch (error) {
        console.error("[Meet Tracker] Error:", error);
    }
}

// Start tracking with error recovery
function startTracking() {
    updateParticipants();

    const intervalId = setInterval(() => {
        if (!isExtensionActive) {
            clearInterval(intervalId);
            return;
        }
        updateParticipants();
    }, 5000);

    // Recover from context invalidation
    chrome.runtime.onConnect.addListener(port => {
        if (port.name === "CONTEXT_RECOVERY") {
            isExtensionActive = true;
            startTracking();
        }
    });
}

// Initialize
startTracking();