/*!
 * Start Bootstrap - Clean Blog v6.0.8 (https://startbootstrap.com/theme/clean-blog)
 * Copyright 2013-2022 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-clean-blog/blob/master/LICENSE)
 */
window.addEventListener("DOMContentLoaded", () => {
  let scrollPos = 0;
  const mainNav = document.getElementById("mainNav");
  if (!mainNav) return;
  
  const headerHeight = mainNav.clientHeight;
  window.addEventListener("scroll", function () {
    const currentTop = document.body.getBoundingClientRect().top * -1;
    if (currentTop < scrollPos) {
      // Scrolling Up
      if (currentTop > 0 && mainNav.classList.contains("is-fixed")) {
        mainNav.classList.add("is-visible");
      } else {
        mainNav.classList.remove("is-visible", "is-fixed");
      }
    } else {
      // Scrolling Down
      mainNav.classList.remove("is-visible");
      if (
        currentTop > headerHeight &&
        !mainNav.classList.contains("is-fixed")
      ) {
        mainNav.classList.add("is-fixed");
      }
    }
    scrollPos = currentTop;
  });
});

// Function to save the user's name in local storage and update the welcome message
function saveName() {
  const nameInput = document.getElementById("name");
  if (!nameInput) return;
  
  const name = nameInput.value.trim();

  if (name === "") {
      alert("Please enter your name.");
      return;
  }

  // Save the name in local storage
  localStorage.setItem("visitorName", name);

  // Update the welcome message in the header
  const welcomeMessage = document.getElementById("welcome-message");
  if (welcomeMessage) {
    welcomeMessage.textContent = `Welcome, ${name}!`;
  }
}

// Initialize name save button on index page
document.addEventListener('DOMContentLoaded', function() {
  const saveNameBtn = document.getElementById("saveNameBtn");
  if (saveNameBtn) {
    saveNameBtn.addEventListener('click', saveName);
  }
  
  // Load saved name on page load
  const savedName = localStorage.getItem("visitorName");
  const welcomeMessage = document.getElementById("welcome-message");
  if (savedName && welcomeMessage) {
    welcomeMessage.textContent = `Welcome, ${savedName}!`;
  }
});

// Contact form handling
document.addEventListener('DOMContentLoaded', function () {
  // Get the reference to the contact form and the submit button element.
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  const submitButton = document.getElementById('submitButton');

  // Attach a 'submit' event listener to the form. This function will be executed when the form is submitted.
  form.addEventListener('submit', function (event) {
      // Prevent the default form submission behavior, which would cause a page reload.
      event.preventDefault();

      // Get the values entered by the user in the form fields.
      const name = document.getElementById('name')?.value || '';
      const email = document.getElementById('email')?.value || '';
      const phone = document.getElementById('phone')?.value || '';
      const message = document.getElementById('message')?.value || '';

      // Create a JavaScript object to store the form data.
      const formData = {
          name: name,
          email: email,
          phone: phone,
          message: message,
          timestamp: new Date().toISOString()
      };

      // Convert the form data object to a JSON string.
      const jsonData = JSON.stringify(formData);

      // In a real application, you would send this to a server endpoint
      // For now, we'll just log it and show success message
      console.log('Form submission:', formData);
      
      // Show a success message to the user.
      showSuccessMessage();

      // Reset the form fields after successful submission.
      form.reset();
  });

  // Function to show a success message to the user.
  function showSuccessMessage() {
      const successMessage = document.getElementById('submitSuccessMessage');
      if (successMessage) {
        successMessage.classList.remove('d-none');
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
  }
});

// Scroll to top button
document.addEventListener('DOMContentLoaded', function() {
  const scrollTop = document.querySelector(".scrollTop");
  if (!scrollTop) return;

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
      scrollTop.classList.add("active");
    } else {
      scrollTop.classList.remove("active");
    }
  });

  // Add click handler for smooth scroll
  scrollTop.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});

// Removed unused greetUser function

// Geolocation HTML5
// Set up global variable
var result;

function showPosition() {
  // Store the element where the page displays the result
  result = document.getElementById("result");
  if (!result) return;

  // If geolocation is available, try to get the visitor's position
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 60000
    });
    result.innerHTML = "Getting the position information...";
  } else {
    alert("Sorry, your browser does not support HTML5 geolocation.");
  }
}

// Initialize location button on index page
document.addEventListener('DOMContentLoaded', function() {
  const locationBtn = document.getElementById("locationBtn");
  if (locationBtn) {
    locationBtn.addEventListener('click', showPosition);
  }
});

// Define callback function for successful attempt
function successCallback(position) {
  result.innerHTML =
    "Your current position is (" +
    "Latitude: " +
    position.coords.latitude +
    ", " +
    "Longitude: " +
    position.coords.longitude +
    ")";
}

// Define callback function for failed attempt
function errorCallback(error) {
  if (error.code == 1) {
    result.innerHTML =
      "You've decided not to share your position, but it's OK. We won't ask you again.";
  } else if (error.code == 2) {
    result.innerHTML =
      "The network is down or the positioning service can't be reached.";
  } else if (error.code == 3) {
    result.innerHTML =
      "The attempt timed out before it could get the location data.";
  } else {
    result.innerHTML = "Geolocation failed due to unknown error.";
  }
}

// Form validation and submission handling
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;
  
  const submitSuccessMessage = document.getElementById("submitSuccessMessage");
  const submitErrorMessage = document.getElementById("submitErrorMessage");
  const genderSelect = document.getElementById("gender");
  const otherGenderInputContainer = document.getElementById("otherGenderInputContainer");
  const otherGenderInput = document.getElementById("otherGender");
  const resetButton = document.getElementById("resetButton");

  if (genderSelect && otherGenderInputContainer && otherGenderInput) {
    genderSelect.addEventListener("change", function () {
      const selectedGender = genderSelect.value;
      if (selectedGender === "other") {
        otherGenderInputContainer.style.display = "block";
        otherGenderInput.setAttribute("required", "required");
      } else {
        otherGenderInputContainer.style.display = "none";
        otherGenderInput.removeAttribute("required");
      }
    });
  }

  if (resetButton && otherGenderInputContainer && otherGenderInput) {
    resetButton.addEventListener("click", function () {
      if (otherGenderInputContainer) {
        otherGenderInputContainer.style.display = "none";
      }
      if (otherGenderInput) {
        otherGenderInput.removeAttribute("required");
      }
      if (submitSuccessMessage) {
        submitSuccessMessage.classList.add("d-none");
      }
      if (submitErrorMessage) {
        submitErrorMessage.classList.add("d-none");
      }
    });
  }
});

// Comment section
// VOTE
const minus = document.querySelectorAll(".minus");
const plus = document.querySelectorAll(".plus");
let change = false;

const voteChange = (btn, voteText) => {
  if (btn.classList.contains("plus")) {
    if (change) return;
    voteText.innerText = parseFloat(voteText.innerText) + 1;
    change = true;
  }
  if (btn.classList.contains("minus")) {
    if (!change) return;
    voteText.innerText = parseFloat(voteText.innerText) - 1;
    change = false;
  }
};

minus.forEach((btn) => {
  btn.onclick = () => {
    const voteText = btn.previousElementSibling;
    voteChange(btn, voteText);
  };
});

plus.forEach((btn) => {
  btn.onclick = () => {
    const voteText = btn.nextElementSibling;
    voteChange(btn, voteText);
  };
});

// Reply
const replyButtons = document.querySelectorAll(".reply");

replyButtons.forEach((btn) => {
  btn.onclick = () => {
    const card = btn.parentElement.parentElement;
    const comment = card.lastElementChild;
    const name = card.children[1].children[1].innerText;
    let textArea = comment.children[1];
    comment.classList.toggle("active");

    const cardParent = card.parentElement;
    const subCardparent = card.parentElement.parentElement;
    const replyButton = comment.lastElementChild;
    replyButton.onclick = () => {
      let subCard = document.createElement("div");
      subCard.className = "sub-card";
      subCard.innerHTML = `<div class="line"></div>
          <div class="card">
            <div class="vote">
              <div class="vote-icon plus">
                <img src="assets/images/icon-plus.svg" alt="icon-plus" />
              </div>
              <p class="vote-text">0</p>
              <div class="vote-icon minus">
                <img src="assets/images/icon-minus.svg" alt="icon-minus" />
              </div>
            </div>
            <div class="header">
              <div class="avatar">
                <img src="assets/images/avatars/image-juliusomo.png" alt="" />
              </div>
              <p class="name">juliusomo <span class="user-label">you</span></p>
              <p class="date">just now</p>
            </div>
            <div class="icon">
              <div class="delete" onclick="showModule()">
                <img src="assets/images/icon-delete.svg" alt="" />
                <p>Delete</p>
              </div>
              <div class="edit" onclick="editComment()">
                <img src="assets/images/icon-edit.svg" alt="" />
                <p>Edit</p>
              </div>
            </div>
            <div class="content">
              <span class="initial">@${name}</span> ${textArea.value}
            </div>
          </div>`;
      if (card.parentNode.classList.contains("row")) {
        cardParent.append(subCard);
        textArea.value = "";
      }
      if (card.parentNode.classList.contains("sub-card")) {
        subCardparent.append(subCard);
        textArea.value = "";
      }
      comment.classList.remove("active");
    };
  };
});

// DELETE MODULE
document.addEventListener('DOMContentLoaded', function() {
  const module = document.querySelector(".module-delete");
  if (!module) return;

  window.showModule = function() {
    module.classList.add("show-module");
  };

  const btnCancelModule = document.querySelector(".btn-cancel");
  const btnDeleteModule = document.querySelector(".btn-delete");

  if (btnCancelModule) {
    btnCancelModule.addEventListener('click', () => {
      module.classList.remove("show-module");
    });
  }

  if (btnDeleteModule) {
    btnDeleteModule.addEventListener('click', () => {
      const deletebutton = document.querySelector(".delete");
      if (deletebutton && deletebutton.parentElement) {
        const card = deletebutton.parentElement;
        if (card.parentElement) {
          card.parentElement.remove();
        }
      }
      module.classList.remove("show-module");
    });
  }
});

window.editComment = function() {
  const editbutton = document.querySelector(".edit");
  if (!editbutton || !editbutton.parentElement) return;
  
  const deletebutton = document.querySelector(".delete");
  const content = editbutton.parentElement.nextElementSibling;
  if (!content) return;
  
  const textArea = content.innerText;
  if (editbutton) {
    editbutton.style.opacity = "0.6";
    editbutton.style.cursor = "not-allowed";
  }
  if (deletebutton) {
    deletebutton.style.opacity = "0.6";
    deletebutton.style.cursor = "not-allowed";
  }
  
  content.innerHTML = `<textarea rows="4" cols="50" class="editedComment">${textArea} </textarea>
  <div class="btn-update-wrapper" ><button class="btn btn-update">UPDATE</button></div>`;

  const updateButton = document.querySelector(".btn-update");
  const newTextArea = document.querySelector(".editedComment");
  if (updateButton && newTextArea) {
    updateButton.addEventListener('click', () => {
      content.innerHTML = `${newTextArea.value}`;
      if (editbutton) {
        editbutton.style.opacity = "1";
        editbutton.style.cursor = "pointer";
      }
      if (deletebutton) {
        deletebutton.style.opacity = "1";
        deletebutton.style.cursor = "pointer";
      }
    });
  }
};

const btnSendComment = document.querySelector(".btn-send");
btnSendComment.onclick = () => {
  const newRow = document.createElement("div");
  const textArea = btnSendComment.previousElementSibling;
  if (textArea.value == "") return;
  newRow.className = "row";
  newRow.innerHTML = `<div class="card">
          <div class="vote">
            <div class="vote-icon plus">
              <img src="assets/images/icon-plus.svg" alt="icon-plus" />
            </div>
            <p class="vote-text">0</p>
            <div class="vote-icon minus">
              <img src="assets/images/icon-minus.svg" alt="icon-minus" />
            </div>
          </div>
          <div class="header">
            <div class="avatar">
              <img src="assets/images/avatars/image-juliusomo.png" alt="" />
            </div>
            <p class="name">juliusomo</p>
            <p class="date">just now</p>
          </div>
          <div class="icon">
              <div class="delete" onclick="showModule()">
                <img src="assets/images/icon-delete.svg" alt="" />
                <p>Delete</p>
              </div>
              <div class="edit" onclick="editComment()">
                <img src="assets/images/icon-edit.svg" alt="" />
                <p>Edit</p>
              </div>
          </div>
          <div class="content">
            ${textArea.value}
          </div>
          
        </div>`;

  const btnParrent = btnSendComment.parentElement.parentElement;
  const cardWrapper = document.querySelector(".card-wrapper");

  cardWrapper.insertBefore(newRow, btnParrent);
  textArea.value = "";
};
// Removed unused myFunction
