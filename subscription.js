const SubscriptionManager = {
    STORAGE_KEY: 'app_export_count',
    FREE_LIMIT: 3,

    // NEW: Function to update the UI
    updateUI: function() {
        let count = parseInt(localStorage.getItem(this.STORAGE_KEY) || 0);
        let remaining = Math.max(0, this.FREE_LIMIT - count);
        const statusEl = document.getElementById('subscription-status');
        if (statusEl) {
            statusEl.innerText = `Free Tries Left: ${remaining}/${this.FREE_LIMIT}`;
        }
    },

    // Modified init to run updateUI
    init: function() {
        // ... (existing modal injection code) ...
        this.updateUI();
    },

    handleExport: function(exportActionCallback) {
        let count = parseInt(localStorage.getItem(this.STORAGE_KEY) || 0);
        if (count >= this.FREE_LIMIT) {
            document.getElementById('premium-modal').style.display = 'flex';
            return;
        }

        exportActionCallback();

        localStorage.setItem(this.STORAGE_KEY, count + 1);
        this.updateUI(); // Refresh the counter display
        alert(`Export successful!`);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    SubscriptionManager.init();
});
