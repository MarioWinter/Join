let selectedContactIndex = null;
let colorIndex = 0;
let isEditing = false;


let contactsData = [
  {
    name: "Anton Meyer",
    email: "antom@gmail.com",
    phone: "0123 45678910",
  },
  {
    name: "Anja Schulz",
    email: "schulz@hotmail.com",
    phone: "0123 45678910",
  },
  {
    name: "Benedikt Ziegler",
    email: "benedikt@gmail.com",
    phone: "0123 45678910",
  },
  {
    name: "David Eisenberg",
    email: "davidberg@gmail.com",
    phone: "0123 45678910",
  },
  {
    name: "Eva Fischer",
    email: "eva@gmail.com",
    phone: "0123 45678910",
  },
  {
    name: "Emmanuel Mauer",
    email: "emmanuelma@gmail.com",
    phone: "0123 45678910",
  },
  {
    name: "Marcel Bauer",
    email: "bauer@gmail.com",
    phone: "0123 45678910",
  },
  {
    name: "Tatjana Wolf",
    email: "wolf@gmail.com",
    phone: "0123 45678910",
  },
];

let contactCircleColors = [
  "#FF7A00",
  "#9327FF",
  "#6E52FF",
  "#FC71FF",
  "#FFBB2B",
  "#1FD7C1",
  "#462F8A",
  "#FF4646",
  "#00BEE8",
  "#FF5EB3",
  "#FFA35E",
  "#FF745E",
  "#C3FF2B",
  "#0038FF",
  "#FFC701",
  "#FFE62B",
];

loadCurrentUser();


// initailizes the contacts and loads user data
async function initContacts() {
  await loadUsers();
  loadCurrentUser();
  includeHTML();
  sortContactsAlphabetically(users);
  sortContactsAlphabetically(contactsData);
  renderDifferentContacts();
}


// function for sorting contacts alphabetically
function sortContactsAlphabetically(contacts) {
  contacts.sort((a, b) => a.name.localeCompare(b.name));
}


// renders the contact view
function renderContacts() {
  let contactsContainer = document.getElementById("contact_container");
  let contactsHTML = generateContactsHTML();
  contactsContainer.innerHTML = contactsHTML;

  let editLinks = document.getElementsByClassName("edit-text");
  for (let i = 0; i < editLinks.length; i++) {
    editLinks[i].addEventListener("click", function () {
      editContacts(i);
    });
  }
}


// renders the contacts based on the users login status
function renderDifferentContacts() {
  if (currentUser >= 0) {
    renderLoggedContacts();
  } else {
    renderContacts();
  }
}


// generates html for logged contacts including initials
function renderLoggedContactsHTML() {
  let alphabetLetters = {};
  let contactsHTML = "";  
  users.forEach((contact, index) => {
    let initials = getInitials(contact.name);
    let firstLetter = initials.charAt(0).toUpperCase();
    let circleColor = contact.bgcolor;

    if (!alphabetLetters[firstLetter]) {
      alphabetLetters[firstLetter] = true;
      contactsHTML += generateAlphabetHTML(firstLetter);
    }
    contactsHTML += generateContactHTML(contact, initials, circleColor, index);
  });
  return contactsHTML;
}


// generates firstletter html for the contact initials 
function generateAlphabetHTML(firstLetter) {
  return `
    <div class="alphabet" id="alphabet-${firstLetter}">${firstLetter}</div>  
    <div class="alphabet-vector-line"></div>
  `;
}


// renders contacts for logged in users
function renderLoggedContacts() {
  let contactsContainer = document.getElementById("contact_container");
  let contactsHTML = renderLoggedContactsHTML();
  contactsContainer.innerHTML = contactsHTML;

  let editLinks = document.getElementsByClassName("edit-text");
  for (let i = 0; i < editLinks.length; i++) {
    editLinks[i].addEventListener("click", function () {
      editContacts(i);
    });
  }
}


// generates html for all contacts
function generateContactsHTML() {
  let contactsHTML = "";  
  contactsData.forEach((contact, index) => {
    let initials = getInitials(contact.name);
    let firstLetter = initials.charAt(0).toUpperCase();
    let circleColor = contact.color;

    if (!alphabetLetters[firstLetter]) {
      alphabetLetters[firstLetter] = true;
      contactsHTML += createAlphabetHTML(firstLetter);
    }
    contactsHTML += generateContactHTML(contact, initials, circleColor, index);
  });
  return contactsHTML;
}


// Creates html for alphabet section
function createAlphabetHTML(firstLetter) {
  return `
    <div class="alphabet" id="alphabet-${firstLetter}">${firstLetter}</div>  
    <div class="alphabet-vector-line"></div>
  `;
}


// generates html for an individual contact
function generateContactHTML(contact, initials, circleColor, index) {
  return `
      <div class="contact-container" id="contact-${index}" onclick="showContactDetails(${index})">
        <div class="contact-circle">
          <svg xmlns="http://www.w3.org/2000/svg" width="43" height="42" viewBox="0 0 43 42" fill="none">
            <circle cx="21.5" cy="21" r="20" fill="${circleColor}" stroke="white" stroke-width="2"/>
            <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="Arial, sans-serif" font-size="18" fill="white">${initials}</text>
          </svg>
        </div>
        <div class="contact-data">
          <div class="contact-name">${contact.name}</div>
          <div class="contact-mail">${contact.email}</div>
        </div>
      </div>
    `;
}


// removes "active-style" from a contact
function removeActiveContactStyles(contact) {
  contact.classList.remove("active-contact");
  contact.style.backgroundColor = "";
  let nameElement = contact.getElementsByClassName("contact-name")[0];
  nameElement.style.color = "";
}


// activates "clicked-style" for a selected contact
function activateContactStyles(contact) {
  contact.classList.add("active-contact");
  contact.style.backgroundColor = "#2a3647";
  let nameElement = contact.getElementsByClassName("contact-name")[0];
  nameElement.style.color = "white";
}


// deactivates styles for all contacts
function deactivateAllContacts() {
  let contacts = document.getElementsByClassName("contact-container");
  for (let i = 0; i < contacts.length; i++) {
    let currentContact = contacts[i];
    if (currentContact.classList.contains("active-contact")) {
      removeActiveContactStyles(currentContact);
    }
  }
}


// gets the current user contact at specified index
function getCurrentUserContact(index) {
  if (currentUser >= 0) {
    return users[index];
  } else {
    return contactsData[index];
  }
}


// updates contact details in the overlay
function updateContactDetails(selectedContact, circleColor, contactInitials) {
  let contactDetails = document.getElementById("show_contact_details");
  contactDetails.innerHTML = createContactDetailsHTML(
    selectedContact,
    circleColor,
    contactInitials
  );
  contactDetails.classList.remove("d-none");
  contactDetails.classList.add("show");
}


// shows contact details container
function showContactDetails(selectedIndex) {
  let contact = document.getElementById(`contact-${selectedIndex}`);
  let isActive = contact ? contact.classList.contains("active-contact") : false;
  let contactDetails = document.getElementById("show_contact_details");

  if (isActive) {
    deactivateContactDetails(contact);
  } else if (contact) {
    activateDetailAndDisplay(selectedIndex, contact);
  }
}


// activates contact details and displays them
function activateDetailAndDisplay(selectedIndex, contact) {
  activateContactDetails(contact);
  let circleColor = contact
    .querySelector(".contact-circle > svg > circle")
    .getAttribute("fill");
  let selectedContact = getCurrentUserContact(selectedIndex);
  let contactInitials = getInitials(selectedContact.name);
  let contactDetails = document.getElementById("show_contact_details");
  if (contactDetails) {
    displayContactDetails(selectedIndex, circleColor, contactInitials);
  }
}


// deactivates contact details
function deactivateContactDetails(contact) {
  removeActiveContactStyles(contact);
    hideContactDetails();
}


// activates contact details by applying styles and deactivating other contacts
function activateContactDetails(contact) {
  deactivateAllContacts();
  activateContactStyles(contact);
}


// shows contact details with specified information
function displayContactDetails(selectedIndex, circleColor, contactInitials) {
  let contactDetails = document.getElementById("show_contact_details");
  updateContactDetails(selectedIndex, circleColor, contactInitials);
  contactDetails.classList.remove("d-none");
  contactDetails.classList.add("show");
}


// creates html for clicked/selected contact details
function createContactDetailsHTML(index, circleColor, contactInitials) {
  let selectedContact = getCurrentUserContact(index);
  return `
    <div id="contact_icon_and_name" class="contact-icon-and-name">
      <div id="contact_icon" class="contact-icon" style="background-color: ${circleColor}">
        <div id="contact_initials_container" class="contact-initials-container">
          <div id="contact_initials" class="contact-initials">${contactInitials}</div>
        </div>
      </div>
      <div id="contact_name_and_edit_container" class="contact-name-and-edit-container">
        <div id="details_contact_name" class="details-contact-name">${selectedContact.name}</div>               
        <div id="edit_container" class="edit-container">
          <div id="edit_contacts" class="edit-contacts">
            <div id="edit_icon" class="edit-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                <mask id="mask0_69718_4858" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
                  <rect x="0.5" width="24" height="24" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_69718_4858)">
                  <path d="M5.5 19H6.9L15.525 10.375L14.125 8.975L5.5 17.6V19ZM19.8 8.925L15.55 4.725L16.95 3.325C17.3333 2.94167 17.8042 2.75 18.3625 2.75C18.9208 2.75 19.3917 2.94167 19.775 3.325L21.175 4.725C21.5583 5.10833 21.7583 5.57083 21.775 6.1125C21.7917 6.65417 21.6083 7.11667 21.225 7.5L19.8 8.925ZM18.35 10.4L7.75 21H3.5V16.75L14.1 6.15L18.35 10.4Z" fill="#2A3647"/>
                </g>
              </svg>                        
            </div>
            <div id="edit_contact_detail" class="edit-text" onclick="editContacts(${index})">Edit</div>
          </div>
          <div id="delete_container" class="delete-container" onclick="deleteContact(${index})">
            <div id="delete_icon" class="delete-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                <mask id="mask0_71348_10272" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
                  <rect x="0.5" width="24" height="24" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_71348_10272)">
                  <path d="M7.5 21C6.95 21 6.47917 20.8042 6.0875 20.4125C5.69583 20.0208 5.5 19.55 5.5 19V6C5.21667 6 4.97917 5.90417 4.7875 5.7125C4.59583 5.52083 4.5 5.28333 4.5 5C4.5 4.71667 4.59583 4.47917 4.7875 4.2875C4.97917 4.09583 5.21667 4 5.5 4H9.5C9.5 3.71667 9.59583 3.47917 9.7875 3.2875C9.97917 3.09583 10.2167 3 10.5 3H14.5C14.7833 3 15.0208 3.09583 15.2125 3.2875C15.4042 3.47917 15.5 3.71667 15.5 4H19.5C19.7833 4 20.0208 4.09583 20.2125 4.2875C20.4042 4.47917 20.5 4.71667 20.5 5C20.5 5.28333 20.4042 5.52083 20.2125 5.7125C20.0208 5.90417 19.7833 6 19.5 6V19C19.5 19.55 19.3042 20.0208 18.9125 20.4125C18.5208 20.8042 18.05 21 17.5 21H7.5ZM7.5 6V19H17.5V6H7.5ZM9.5 16C9.5 16.2833 9.59583 16.5208 9.7875 16.7125C9.97917 16.9042 10.2167 17 10.5 17C10.7833 17 11.0208 16.9042 11.2125 16.7125C11.4042 16.5208 11.5 16.2833 11.5 16V9C11.5 8.71667 11.4042 8.47917 11.2125 8.2875C11.0208 8.09583 10.7833 8 10.5 8C10.2167 8 9.97917 8.09583 9.7875 8.2875C9.59583 8.47917 9.5 8.71667 9.5 9V16ZM13.5 16C13.5 16.2833 13.5958 16.5208 13.7875 16.7125C13.9792 16.9042 14.2167 17 14.5 17C14.7833 17 15.0208 16.9042 15.2125 16.7125C15.4042 16.5208 15.5 16.2833 15.5 16V9C15.5 8.71667 15.4042 8.47917 15.2125 8.2875C15.0208 8.09583 14.7833 8 14.5 8C14.2167 8 13.9792 8.09583 13.7875 8.2875C13.5958 8.47917 13.5 8.71667 13.5 9V16Z" fill="#2A3647"/>
                </g>
              </svg>                       
            </div>
            <div class="delete-text">Delete</div>
          </div>
        </div>                
      </div>
    </div>
    <div class="contact-information">Contact Information</div>
    <div class="mail-and-phone-container">
      <div class="mail-text">Email</div>
      <div id="mail_container" class="mail-container">${selectedContact.email}</div>
    </div>
    <div class="phone-container">
      <div class="phone-text">Phone</div>
      <div id="contact_phone_number" class="contact-phone-number"></div>
    </div>
  `;
}


// hides the contact details container
function hideContactDetails() {
  let contactDetails = document.getElementById("show_contact_details");
  contactDetails.classList.remove("show");
}


// gets the both initials of a name
function getInitials(name) {
  let parts = name.split(" ");
  let initials = "";
  parts.forEach((part) => {
    initials += part.charAt(0).toUpperCase();
  });
  return initials;
}


// edits the selected contact
function editContacts(index) {
  let contact = currentUser >= 0 ? users[index] : contactsData[index];
  if (!contact) return;

  selectedContactIndex = index;
  let originalCircleColor =
    document.getElementById("contact_icon").style.backgroundColor;
  let initials = getInitials(contact.name);

  showOverlay(true);
  updateContactDetails(index, originalCircleColor, initials);
  generateOverlayContactCircle(originalCircleColor, initials);
  updateContactInputs(contact);
  setSaveButtonFunction(index);  
}


// updates the contact details after editing
function updateContact(index) {
  let contact = currentUser >= 0 ? users[index] : contactsData[index];
  if (!contact) return;

  contact.name = document.getElementById("contact_Name").value;
  contact.email = document.getElementById("contact_Email").value;
  contact.phone = document.getElementById("contact_Phone").value;

  if (currentUser >= 0) {    
    sortContactsAlphabetically(users);
    setItem("users", JSON.stringify(users));
  } else {    
    sortContactsAlphabetically(contactsData);
  }
  finalizeContactUpdate();
}


// perform additional actions 
function finalizeContactUpdate() {
  hideContactDetails();
  cancelOverlay();
  clearEntrys();  
  renderDifferentContacts();
}


// function for adding a new contact
async function addNewContact(event) {
  event.preventDefault();
  let newContact = {
    name: document.getElementById("contact_Name").value,
    email: document.getElementById("contact_Email").value,
    phone: document.getElementById("contact_Phone").value,
    bgcolor: getRandomColor(),
  };
  let index;
  if (currentUser >= 0) {    
    index = findInsertIndex(newContact.name, users);
    users.splice(index, 0, newContact);
    await setItem("users", JSON.stringify(users));
  } else {    
    index = findInsertIndex(newContact.name, contactsData);
    contactsData.splice(index, 0, newContact);
  }  
  handleNewContact(index);
}


// handles: clear inputs, cancel overlay, show success, render contacts, and display details.
function handleNewContact(index) {
  clearEntrys();
  cancelOverlay();
  showSuccessMessage();
  renderDifferentContacts();
  showContactDetails(index);
}


// finds index of new contact and placed in contact list
function findInsertIndex(newContactName, contactList) {
  let index = contactList.findIndex(
    (contact) => newContactName.localeCompare(contact.name) <= 0
  );
  return index !== -1 ? index : contactList.length;
}


// adds a new user
function addUser() {
  users.push({
    name: contact_Name.value,
    email: contact_Email.value,
    phone: contact_Phone.value,
    bgcolor: getRandomColor(),
  });
  setItem("users", JSON.stringify(users));
  renderDifferentContacts();
}


// adds new contact data
function addContactsData() {
  contactsData.push({
    name: contact_Name.value,
    email: contact_Email.value,
    phone: contact_Phone.value,
    bgcolor: getRandomColor(),
  });
  renderDifferentContacts();
}


// function for permanently deleting contact
async function deleteContact(index) {
  if (currentUser >= 0) {
    users.splice(index, 1);    
    await setItem("users", JSON.stringify(users));
  } else {
    contactsData.splice(index, 1);    
  }  
  let contactDetails = document.getElementById("show_contact_details");
  if (contactDetails.classList.contains("show")) {
    hideContactDetails();
  }  
  renderDifferentContacts();
}


// function for display/show and hide success message
function showSuccessMessage() {
  let successMessage = document.getElementById("contact_succesfully_created");
  successMessage.classList.remove("d-none");
  successMessage.style.opacity = 1;
  successMessage.style.transform = "translateX(0)";

  setTimeout(() => {
    successMessage.style.opacity = 0;
    successMessage.style.transform = "translateX(100%)";    
  }, 2000);

  setTimeout(() => {
    successMessage.classList.add("d-none");
  }, 3500);
}




// overlay functions...




// shows the overlay view for editing or adding new contact
function showOverlay(isEdit) {
  updateOverlayContent(isEdit);
  updateOverlayButtons(isEdit);

  let addNewContact = document.getElementById("add_new_contact");
  addNewContact.classList.remove("d-none");
  setTimeout(() => {
    addNewContact.classList.add("show");
  }, 100);
}


// fucntion to check overlay current state
function cancelOverlay() {
  let overlay = document.getElementById("add_new_contact");
  if (overlay.classList.contains("show")) {
    closeOverlay();
  } else {
    handleOverlay();
  }
}

// function to close the overlay
function closeOverlay() {
  let overlay = document.getElementById("add_new_contact");
  overlay.classList.remove("show");
  overlay.classList.add("close");

  setTimeout(() => {
    hideAddNewContact();
    resetOverlayContactCircle();
    setTimeout(() => {
      overlay.classList.remove("close");
      hideAddNewContact();
    }, 300);
    clearEntrys();
  }, 300);
}

// fnction to handle the overlay
function handleOverlay() {
  let overlay = document.getElementById("add_new_contact");
  overlay.classList.remove("close");
  overlay.classList.add("show");
}


// updates the content of the overlay view based on editing or adding new contact
function updateOverlayContent(isEdit) {
  let overlayContainerLeft = document.querySelector(".overlay-container-left");

  if (isEdit) {
    overlayContainerLeft.innerHTML = `
      <img class="add-contact-overlay-icon" src="./img/join-overlay-icon-white.svg" />
      <div class="overlay-letter-add-contact">Edit contact</div>
      <div class="overlay-vectorline-horizontal"></div>
    `;
  } else {
    overlayContainerLeft.innerHTML = `
      <img class="add-contact-overlay-icon" src="./img/join-overlay-icon-white.svg" />
      <div class="overlay-letter-add-contact">Add contact
        <div class="overlay-letters-better">Tasks are better with a team!</div>
        <div class="overlay-vectorline-horizontal"></div>
      </div>
    `;
  }
}

// updates the buttons in the overlay view based on editing or adding a new contact
function updateOverlayButtons(isEdit) {
  let overlayCancelButton = document.getElementById("overlay_cancel_button");
  let overlayCreateButton = document.getElementById(
    "overlay_create_contact_button"
  );

  if (isEdit) {
    setEditButtons(overlayCancelButton, overlayCreateButton);
  } else {
    setCreateButtons(overlayCancelButton, overlayCreateButton);
  }
}

// changes button if edit mode is active to delete
function setEditButtons(overlayCancelButton, overlayCreateButton) {
  overlayCancelButton.textContent = "Delete";
  overlayCancelButton.onclick = function () {
    deleteContact(selectedContactIndex);
    cancelOverlay();
  };
  overlayCreateButton.innerHTML = "Save <img src='./img/overlay-ok.svg'/>";
  overlayCreateButton.onclick = function () {
    showSuccessMessage();
  };
}

// changes button if edit mode is active
function setCreateButtons(overlayCancelButton, overlayCreateButton) {
  overlayCancelButton.innerHTML =
    "Cancel <svg xmlns='http://www.w3.org/2000/svg' width='24' height='25' viewBox='0 0 24 25' fill='none'><mask id='mask0_71720_5473' style='mask-type:alpha' maskUnits='userSpaceOnUse' x='0' y='0' width='24' height='25'><rect y='0.96582' width='24' height='24' fill='#D9D9D9'/></mask><g mask='url(#mask0_71720_5473)'><path d='M11.9998 14.3659L7.0998 19.2659C6.91647 19.4492 6.68314 19.5409 6.3998 19.5409C6.11647 19.5409 5.88314 19.4492 5.6998 19.2659C5.51647 19.0825 5.4248 18.8492 5.4248 18.5659C5.4248 18.2825 5.51647 18.0492 5.6998 17.8659L10.5998 12.9659L5.6998 8.06587C5.51647 7.88254 5.4248 7.6492 5.4248 7.36587C5.4248 7.08254 5.51647 6.8492 5.6998 6.66587C5.88314 6.48254 6.11647 6.39087 6.3998 6.39087C6.68314 6.39087 6.91647 6.48254 7.0998 6.66587L11.9998 11.5659L16.8998 6.66587C17.0831 6.48254 17.3165 6.39087 17.5998 6.39087C17.8831 6.39087 18.1165 6.48254 18.2998 6.66587C18.4831 6.8492 18.5748 7.08254 18.5748 7.36587C18.5748 7.6492 18.4831 7.88254 18.2998 8.06587L13.3998 12.9659L18.2998 17.8659C18.4831 18.0492 18.5748 18.2825 18.5748 18.5659C18.5748 18.8492 18.4831 19.0825 18.2998 19.2659C18.1165 19.4492 17.8831 19.5409 17.5998 19.5409C17.3165 19.5409 17.0831 19.4492 16.8998 19.2659L11.9998 14.3659Z' fill='#2A3647'/></g></svg>";
  overlayCreateButton.innerHTML =
    "Create contact <img src='./img/overlay-ok.svg'/>";
  overlayCancelButton.onclick = function () {
    cancelOverlay();
  };
}

// hides the add new contact overlay
function hideAddNewContact() {
  let addNewContact = document.getElementById("add_new_contact");
  addNewContact.classList.remove("show");
  addNewContact.classList.add("d-none");
}

// resets the overlay contact circle
function resetOverlayContactCircle() {
  let overlayContactCircle = document.getElementById("overlay_contact_circle");
  overlayContactCircle.innerHTML = getOverlayContactCircleHTML();
}

// gets the html for overlay contact circle
function getOverlayContactCircleHTML() {
  return `<div id="overlay_contact_circle" class="overlay-contact-circle">
    <img id="contact_gray" class="contact-gray" src="./img/contacts-circle-grey.svg" />
    <img id="contact_person_white" class="contact-person-white" src="./img/person-white.svg"/>
  </div>`;
}

// changes the image on hover for ovelay close
function changeImageOnHover(isHover) {
  let closeImage = document.querySelector(".oyerlay-close-img");
  if (isHover) {
    closeImage.src = "./img/cancel-white.svg";
  } else {
    closeImage.src = "./img/cancel.svg";
  }
}

// clears the input fields in the add new contact overlay
function clearEntrys() {
  document.getElementById("contact_Name").value = "";
  document.getElementById("contact_Email").value = "";
  document.getElementById("contact_Phone").value = "";
}

// updates contact inputs with the provided contact data
function updateContactInputs(contact) {
  let contactNameInput = document.getElementById("contact_Name");
  let contactEmailInput = document.getElementById("contact_Email");
  let contactPhoneInput = document.getElementById("contact_Phone");

  contactNameInput.value = contact.name;
  contactEmailInput.value = contact.email;
  contactPhoneInput.value = contact.phone;
}

// generates the overlay contact circle with specified color and initials
function generateOverlayContactCircle(color, initials) {
  let overlayContactCircle = document.getElementById("overlay_contact_circle");
  overlayContactCircle.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="126" height="126" viewBox="0 0 43 42" fill="none">
      <circle cx="21.5" cy="21" r="20" fill="${color}" stroke="white" stroke-width="2"/>
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="Arial, sans-serif" font-size="18" fill="white">${initials}</text>
    </svg>
  `;
}

// sets the save button function for editing
function setSaveButtonFunction(index) {
  let overlayCreateButton = document.getElementById(
    "overlay_create_contact_button"
  );
  overlayCreateButton.innerHTML = "Save <img src='./img/overlay-ok.svg'/>";
  overlayCreateButton.onclick = function () {
    updateContact(index);
    showSuccessMessage();
  };
}
