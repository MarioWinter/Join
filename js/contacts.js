let selectedContactIndex = null;
let colorIndex = 0;

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
  "#FF7A00", "#9327FF", "#6E52FF", "#FC71FF", "#FFBB2B", "#1FD7C1",
  "#462F8A", "#FF4646", "#00BEE8", "#FF5EB3", "#FFA35E", "#FF745E",
  "#C3FF2B", "#0038FF", "#FFC701", "#FFE62B" 
];


// wird diese noch benötigt?
// function addContact(name, email, phone) {
//   let newContact = {
//     name: name,
//     email: email,
//     phone: phone,
//     color: getNextColor(),
//   };
//   contactsData.push(newContact);
//   renderContacts();
// }


function renderContacts() {
  let contactsContainer = document.getElementById("contact_container");
  let contactsHTML = generateContactsHTML();
  contactsContainer.innerHTML = contactsHTML;
}

// function for generating each contact including circle and contact information and color for circle
function generateContactsHTML() {
  let contactsHTML = "";
  let alphabetLetters = {};
  contactsData.forEach((contact, index) => {
    let initials = getInitials(contact.name);
    let firstLetter = initials.charAt(0).toUpperCase();
    let circleColor = contact.color || getNextColor();
    if (!alphabetLetters[firstLetter]) {
      alphabetLetters[firstLetter] = true;
      contactsHTML += `
            <div class="alphabet" id="alphabet-${firstLetter}">${firstLetter}</div>  
            <div class="alphabet-vector-line"></div>
          `;
    }
    contactsHTML += generateContactHTML(contact, initials, circleColor, index);
  });
  return contactsHTML;
}

function generateContactHTML(contact, initials, circleColor, index) {
  return `
      <div class="contact-container" id="contact-${index}" onclick="changeContactColor(${index}) ">
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

// function for changing contact color if clicked
function changeContactColor(index) {
  let contacts = document.getElementsByClassName('contact-container');
  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    let nameElement = document.getElementById(`contact-${i}`).getElementsByClassName('contact-name')[0];
    if (i === index) {
      contact.style.backgroundColor = "#2a3647";
      contact.style.pointerEvents = "none";
      nameElement.style.color = "white";
      let circleColor = contact.querySelector('.contact-circle > svg > circle').getAttribute('fill');
      showContactDetails(index, circleColor);
    } else {
      contact.style.backgroundColor = ""; 
      contact.style.pointerEvents = ""; 
      nameElement.style.color = ""; 
    }
  }
}


function getNextColor() {
  let color = contactCircleColors[colorIndex];
  colorIndex = (colorIndex + 1) % contactCircleColors.length;
  return color;
}

// Function to get the initials
function getInitials(name) {
  let parts = name.split(" ");
  let initials = "";
  parts.forEach((part) => {
    initials += part.charAt(0).toUpperCase();
  });
  return initials;
}
renderContacts();




// Overlay
function showOverlay() {
  let addNewContact = document.getElementById("add_new_contact");
  addNewContact.classList.remove("d-none"); 
  setTimeout(() => {
    addNewContact.classList.add("show"); 
  }, 100);
}

function cancelOverlay() {
  let addNewContact = document.getElementById("add_new_contact");
  addNewContact.classList.remove("show"); 
  setTimeout(() => {
    addNewContact.classList.add("d-none"); 
  }, 300);
}

function clearEntrys() {
  document.getElementById("contact_Name").value = "";
  document.getElementById("contact-Email").value = "";
  document.getElementById("contact-Phone").value = "";
}

// function for closing addnewcontact / clicking outside the present window
document.addEventListener("click", function (event) {
  let addContactOverlay = document.getElementById("add_new_contact");
  let targetElement = event.target;

  if (
    targetElement.closest(".overlay-add-contact") === null &&
    !targetElement.classList.contains("primary-contact")
  ) {
    addContactOverlay.classList.add("d-none");
  }
});

function showContactDetails(index, circleColor) {    
  let selectedContact = contactsData[index];
  let contactInitials = getInitials(selectedContact.name);
  let contactDetails = document.getElementById('show_contact_details');
  

  document.getElementById('contact_icon').style.backgroundColor = circleColor; // Setze die Hintergrundfarbe des Kreises
  document.getElementById('contact_initials').innerText = contactInitials;
  document.getElementById('details_contact_name').innerText = selectedContact.name;
  document.getElementById('mail_container').innerText = selectedContact.email;
  document.getElementById('contact_phone_number').innerText = selectedContact.phone;

  document.getElementById('show_contact_details').classList.remove('d-none');
  contactDetails.classList.add('show');
}

// Entferne die Klasse "show", um den Kontakt auszublenden
function hideContactDetails() {
  console.log('Hide contact works!');
  let contactDetails = document.getElementById('show_contact_details');
  
  contactDetails.classList.remove('show');
}
