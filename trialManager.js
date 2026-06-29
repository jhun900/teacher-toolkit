// trialManager.js
const MAX_TRIALS = 5;

const getTrialCount = () => {
    const data = localStorage.getItem('app_trial_count');
    return data ? parseInt(data) : 0;
};

const updateTrial = () => {
    const newCount = getTrialCount() + 1;
    localStorage.setItem('app_trial_count', newCount.toString());
    return newCount;
};

const checkTrialStatus = () => {
    return getTrialCount() < MAX_TRIALS;
};
