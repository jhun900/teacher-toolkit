// trialManager.js
const MAX_TRIALS = 5; // Set your limit here

const getTrialData = () => {
    const data = localStorage.getItem('app_trial_count');
    return data ? JSON.parse(data) : { count: 0 };
};

const updateTrial = () => {
    let data = getTrialData();
    data.count += 1;
    localStorage.setItem('app_trial_count', JSON.stringify(data));
    return data.count;
};

const checkTrialStatus = () => {
    const data = getTrialData();
    if (data.count >= MAX_TRIALS) {
        alert("Trial period expired. Please upgrade.");
        // Redirect or disable features here
        return false;
    }
    return true;
};
