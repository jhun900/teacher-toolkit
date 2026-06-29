<script src="trialManager.js"></script>

<script>
    // 1. Check access on page load
    if (!checkTrialStatus()) {
        window.location.href = "upgrade.html";
    }

    // 2. Define your export function
    async function handleExport() {
        try {
            // Perform your export logic here (e.g., API call, file generation)
            const success = await performExportTask(); 

            if (success) {
                // ONLY increment here if the export is confirmed successful
                const newCount = updateTrial();
                console.log("Export successful! New trial count:", newCount);
                alert("Export complete!");
            }
        } catch (error) {
            console.error("Export failed:", error);
            alert("Export failed. No trial credits were used.");
        }
    }
</script>
