/**
 * this function generates html for a selected contact, including user badge and background color
 * @param {string} userName - name of selected contact
 * @param {string} badgeColor - background color of contact badge
 * @param {string} userBadge - user badge content
 * @param {number} i - index of selected contact
 * @returns {string} - generated html for selected contact
 */
function generateSelectedContactHTML(userName, badgeColor, userBadge, i) {
  return `
      <label class="selected-contact-label">      
          <div class="contact-badge" style="background-color: ${badgeColor};">
            <span>${userBadge}</span>
          </div>      
      </label>
    `;
}

/**
 * this function generates html for task assignment contact within a slider user badge background color and checkbox
 * @param {string} userName - name of task assignment contact
 * @param {string} badgeColor - backgruond color of the contact badge
 * @param {string} userBadge - user badge content
 * @param {number} i - index of the task assignment contact
 * @returns {strnig} - generated html for the task assignment contact within a slider
 */
function generateTaskAssigmentContactsHTML(userName, badgeColor, userBadge, i) {
  return `
      <label class="slider-contact-label" for="_check-contact${i}">
        <div class="current-contact-slider">
          <div id="_contect_badge${i}" class="contact-badge" style="background-color: ${badgeColor};">
            <span>${userBadge}</span>
          </div>
          <span>${userName}</span>
          <div class="checkbox">
            <input onclick="addElectedContact('_confirm_contact${i}', ${i}, newAssigned)" id="_confirm_contact${i}" type="checkbox" />
            <label class="checkbox-edit-task" for="_confirm_contact${i}"></label>
          </div>
        </div>
      </label>
    `;
}

/**
 * this function generates html for checked task assignment contact within slider user badge background color and checkbox
 * @param {string} userName - name of task assignment contact
 * @param {string} badgeColor - background color of the contact badge
 * @param {string} userBadge - user badge content
 * @param {number} i - index of task assignment contact
 * @returns {string} - generated html for checked task assignment contact within slider
 */
function generateTaskAssigmentContactsCheckedHTML(userName, badgeColor, userBadge, i) {
  return `
      <label class="slider-contact-label" for="_check-contact${i}">
        <div class="current-contact-slider">
          <div id="_contect_badge${i}" class="contact-badge" style="background-color: ${badgeColor};">
            <span>${userBadge}</span>
          </div>
          <span>${userName}</span>
          <div class="checkbox">
            <input onclick="addElectedContact('_confirm_contact${i}', ${i}, newAssigned)" id="_confirm_contact${i}" type="checkbox" checked/>
            <label class="checkbox-edit-task" for="_confirm_contact${i}"></label>
          </div>
        </div>
      </label>
    `;
}

/**
 * this function creates an html for subtask with editable content and associated icons
 * @param {string} subtask - content of subtask
 * @param {number} index - index of subtask in added subtask array
 * @returns {string} - representation hmtl of subtask with editable content and icons
 */
function createSubtaskHTML(subtask, index) {
  return `
    <div class="added-subtask">• <input id="input_${index}" class="subtask-input" type="text" value="${subtask}" contenteditable="true">
       <div class="added-subtask-icons">
        <img id="subtask_icons_3_${index}" onclick="deleteAddedSubtask('${subtask}')" class="invisible subtask-icon" src="./img/delete-icon.svg">
        <img id="subtask_icons_2_${index}" class="invisible vector-line" src="./img/vector-line.svg">
        <img id="subtask_icons_1_${index}" onclick="editAddedSubtask(${index})" class="invisible subtask-icon" src="./img/pencil-icon.svg">
        <img id="check_dark_save_${index}" onclick="saveEditedSubtask(${index})" class="invisible subtask-icon d-none" src="./img/check-dark.svg">  
       </div>
      </div>
    `;
}

/**
 *this function shows confirmation message after creating task to board 
 */
function createTaskMessage() {
  let taskMessage = document.getElementById("sending_confirmation");
  taskMessage.classList.add("animate-message");
}
