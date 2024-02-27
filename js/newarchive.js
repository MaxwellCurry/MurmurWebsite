const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.content');
const editButton = document.getElementById("editButton");
const inputElements = document.querySelectorAll(".profile-info input");

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    tabs.forEach(tab => tab.classList.remove('active'));
    tab.classList.add('active');
    contents.forEach(content => content.classList.remove('active'));
    contents[index].classList.add('active');
  });
});


// Add click event listener to the edit button
editButton.addEventListener("click", function() {
  if (editButton.textContent === "Edit") {
    // Change button text to "Submit"
    editButton.textContent = "Submit";

    // Enable all input elements
    inputElements.forEach(function(input) {
      input.disabled = false;
    });
  } else {
    // Change button text back to "Edit"
    editButton.textContent = "Edit";

    // Disable all input elements
    inputElements.forEach(function(input) {
      input.disabled = true;
    });
  }
});


