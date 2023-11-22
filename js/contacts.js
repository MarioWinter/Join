// let contactsData = [
   // {
      //  name: "Anton Meyer",
      //  email: "antom@gmail.com",
      //  phone: "123456789"
   // },{},
// ];


function showOverlay() {
    document.getElementById('add_new_contact').classList.remove('d-none');
}

function cancelOverlay() {
    document.getElementById('add_new_contact').classList.add('d-none');
}

function clearEntrys() {
    document.getElementById('contact_Name').value = '';
    document.getElementById('contact-Email').value = '';
    document.getElementById('contact-Phone').value = '';
}

// function for closing addnewcontact / clicking outside the present window 
document.addEventListener('click', function(event) {
    let addContactOverlay = document.getElementById('add_new_contact');
    let targetElement = event.target;
    
    if (targetElement.closest('.overlay-add-contact') === null && !targetElement.classList.contains('primary-contact')) {     
      addContactOverlay.classList.add('d-none');
    }
  });


