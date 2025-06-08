let attendanceData = {};
let extensionActive = true;

// Handle messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "UPDATE_PARTICIPANTS") {
        attendanceData = request.data;
        chrome.storage.local.set({ attendanceData });
    } else if (request.type === "GET_PARTICIPANTS") {
        sendResponse(attendanceData);
    } else if (request.type === "EXPORT_DATA") {
        exportData(sendResponse);
        return true; // Required for async response
    }
});

// Handle extension reloads
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.get(['attendanceData'], (result) => {
        attendanceData = result.attendanceData || {};
    });
});

// Data export function
function exportData(callback) {
    try {
        // Get fresh data from storage in case it was updated
        chrome.storage.local.get(['attendanceData'], (result) => {
            const data = result.attendanceData || {};

            let csv = "Name\n";
            Object.keys(data).forEach(name => {
                const p = data[name];
                csv += `"${name.replace(/"/g, '""')}"\n`;
            });

            callback({ csv });
        });
    } catch (error) {
        console.error("Export failed:", error);
        callback({ error: error.message });
    }
}

// Recovery port for context invalidation
chrome.runtime.onConnect.addListener(port => {
    if (port.name === "CONTEXT_RECOVERY") {
        port.postMessage({ type: "RECONNECTED" });
    }
    if (request.type === "EXPORT_DATA") {
        exportData(sendResponse);
        return true; // Required for async response
    }
});