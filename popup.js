document.addEventListener('DOMContentLoaded', () => {
    const statusElement = document.getElementById('status');
    const countElement = document.getElementById('participantCount');
    const exportBtn = document.getElementById('exportBtn');
    const errorElement = document.getElementById('error');

    // Load participant count
    chrome.runtime.sendMessage({ type: "GET_PARTICIPANTS" }, (response) => {
        if (chrome.runtime.lastError) {
            errorElement.textContent = "Error connecting to extension";
            console.error("Extension error:", chrome.runtime.lastError);
            return;
        }
        const count = Object.keys(response || {}).length;
        countElement.textContent = `${count} participants tracked`;
    });

    // Export button with full error handling
    exportBtn.addEventListener('click', async () => {
        errorElement.textContent = ""; // Clear previous errors
        exportBtn.disabled = true;
        exportBtn.textContent = "Exporting...";

        try {
            const response = await new Promise((resolve) => {
                chrome.runtime.sendMessage({ type: "EXPORT_DATA" }, (response) => {
                    if (chrome.runtime.lastError) {
                        throw new Error(chrome.runtime.lastError.message);
                    }
                    resolve(response);
                });
            });

            if (response?.csv) {
                const blob = new Blob([response.csv], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);

                await chrome.downloads.download({
                    url: url,
                    filename: `meet_attendance_${new Date().toISOString().slice(0, 10)}.csv`,
                    conflictAction: 'uniquify'
                });

                exportBtn.textContent = "Exported Successfully!";
                setTimeout(() => {
                    exportBtn.textContent = "Export as CSV";
                    exportBtn.disabled = false;
                }, 2000);
            }
        } catch (error) {
            console.error("Export failed:", error);
            errorElement.textContent = `Export failed: ${error.message}`;
            exportBtn.textContent = "Export as CSV";
            exportBtn.disabled = false;
        }
    });
});