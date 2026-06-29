const SubscriptionManager = {
    STORAGE_KEY: 'app_export_count',
    FREE_LIMIT: 3,

    init: function() {
        const modalHTML = `
        <div id="premium-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 99999; align-items: center; justify-content: center; font-family: sans-serif;">
            <div style="background: white; padding: 30px; border-radius: 12px; width: 400px; text-align: center; box-shadow: 0 10px 25px rgba(0,0,0,0.2);">
                <h2>Unlock Premium Features</h2>
                <p>You have used all your free exports. Upgrade to continue building.</p>
                <div style="margin: 20px 0;">
                    <a href="https://pm.link/org-3uNpEp6juxNSZQt3KcdRoWSP/o1afH3D" target="_blank" style="display: block; padding: 12px; background: #004a99; color: white; text-decoration: none; border-radius: 6px; margin-bottom: 10px; font-weight: bold;">Monthly Plan - ₱149</a>
                    <a href="https://pm.link/org-3uNpEp6juxNSZQt3KcdRoWSP/WnvIcRV" target="_blank" style="display: block; padding: 12px; background: #28a745; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">Yearly Plan - ₱999</a>
                </div>
                <button onclick="document.getElementById('premium-modal').style.display='none'" style="padding: 8px 16px; background: #ccc; border: none; border-radius: 5px; cursor: pointer;">Close</button>
            </div>
        </div>`;
        
        if (!document.getElementById('premium-modal')) {
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        }
        this.updateUI();
    },

    updateUI: function() {
        let count = parseInt(localStorage.getItem(this.STORAGE_KEY) || 0);
        let remaining = Math.max(0, this.FREE_LIMIT - count);
        const statusEl = document.getElementById('subscription-status');
        if (statusEl) {
            statusEl.innerText = `Free Tries Left: ${remaining}/${this.FREE_LIMIT}`;
        }
    },

    handleExport: function(exportActionCallback) {
        let count = parseInt(localStorage.getItem(this.STORAGE_KEY) || 0);
        if (count >= this.FREE_LIMIT) {
            document.getElementById('premium-modal').style.display = 'flex';
            return;
        }
        exportActionCallback();
        localStorage.setItem(this.STORAGE_KEY, count + 1);
        this.updateUI();
        alert(`Export successful!`);
    }
};

// Initialize immediately and after DOM content loads
SubscriptionManager.init();
document.addEventListener('DOMContentLoaded', () => SubscriptionManager.updateUI());
