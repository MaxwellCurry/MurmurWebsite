var schoolInput = document.getElementById('school');
var emailInput = document.getElementById('email');

function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}
var schoolFromURL = getQueryParam('school');
if (schoolFromURL) {
  schoolInput.value = schoolFromURL;
}
function nextTab() {
    showTab('tab2', 1)
}
function submitSignUp() {
    window.location.href = "new.html";
}
function showTab(tabId, buttonIndex) {
    var tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(function(button) {
      button.classList.remove('active-tab-button');
    });
  
    tabButtons[buttonIndex].classList.add('active-tab-button');
  
    var tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(function(tab) {
      tab.style.display = 'none';
    });
  
    document.getElementById(tabId).style.display = 'block';
}
showTab('tab1', 0);