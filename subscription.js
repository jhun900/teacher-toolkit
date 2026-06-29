const SubscriptionManager = {
    STORAGE_KEY: 'app_export_count',
    FREE_LIMIT: 3,

    // 1. Injects the Modal into the page automatically
    init: function() {
        const modalHTML = `
        <div id="premium-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 9999; align-items: center; justify-content: center;">
            <div style="background: white; padding: 30px; border-radius: 12px; width: 400px; text-align: center; box-shadow: 0 10px 25px rgba(0,0,0,0.2); font-family: sans-serif;">
                <h2>Unlock Premium Features</h2>
                <p>You have used all your free exports. Upgrade to continue building.</p>
                <div style="margin: 20px 0;">
                    <a href="https://pm.link/org-3uNpEp6juxNSZQt3KcdRoWSP/o1afH3D" target="_blank" style="display: block; padding: 10px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; margin-bottom: 10px;">Monthly Plan - ₱149</a>
                    <a href="https://pm.link/org-3uNpEp6juxNSZQt3KcdRoWSP/WnvIcRV" target="_blank" style="display: block; padding: 10px; background: #28a745; color: white; text-decoration: none; border-radius: 5px;">Yearly Plan - ₱999</a>
                </div>
                <button onclick="document.getElementById('premium-modal').style.display='none'" style="padding: 8px 16px; background: #ccc; border: none; border-radius: 5px; cursor: pointer;">Close</button>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    },

    // 2. The gatekeeper function
    handleExport: function(exportActionCallback) {
        let count = parseInt(localStorage.getItem(this.STORAGE_KEY) || 0);

        if (count >= this.FREE_LIMIT) {
            document.getElementById('premium-modal').style.display = 'flex';
            return;
        }

        // Run the actual export
        exportActionCallback();

        // Increment and notify
        localStorage.setItem(this.STORAGE_KEY, count + 1);
        alert(`Export successful! You have ${this.FREE_LIMIT - (count + 1)} trials left.`);
    }
};

// Initialize the modal when the page loads
document.addEventListener('DOMContentLoaded', () => {
    SubscriptionManager.init();
});
