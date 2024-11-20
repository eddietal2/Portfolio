// Detect if the user is in Dark Mode
function isDarkMode() {
    let isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let darkModeStatus = document.getElementById('dark-mode-status');
    // darkModeStatus.innerHTML = isDarkMode;
    alert('User is in Dark Mode: ' + isDarkMode);
    return isDarkMode;
}
  
// isDarkMode()