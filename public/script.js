// stores all division info loaded from the JSON file
let divisionsData = {}; 
// keeps track of the division name that is currently selected
let currentKey = "";    

// loads the data from divisions.json file
async function loadData() {
  const response = await fetch("divisions.json");
  divisionsData = await response.json();
}

// save changes into localStorage so they stay after refresh for testing purposes for now!
function saveLocal() {
  localStorage.setItem("divisionsData", JSON.stringify(divisionsData));
}

// add all division names into the dropdown list
function fillSelect() {
  const select = document.getElementById("divisionSelect");
  const names = Object.keys(divisionsData);
  names.forEach(name => {
    const opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    select.appendChild(opt);
  });
}

// show the form with info for the selected division
function showFormFor(name) {
  const form = document.getElementById("divisionForm");
  const record = divisionsData[name];
  currentKey = name; // this saves which division is being worked on

  document.getElementById("divisionName").value = record.divisionName || "";
  document.getElementById("dean").value = record.dean || "";
  document.getElementById("penContact").value = record.penContact || "";
  document.getElementById("locRep").value = record.locRep || "";
  document.getElementById("chair").value = record.chair || "";

  clearErrors();
  hideSaveMsg();
  form.classList.remove("hidden");
}

// and here i hide the whole form when cancel is clicked
function hideForm() {
  document.getElementById("divisionForm").classList.add("hidden");
  clearErrors();
  hideSaveMsg();
}

// show one error message
function showError(id) {
  document.getElementById(`err-${id}`).classList.remove("hidden");
}

// hide that  one error message
function hideError(id) {
  document.getElementById(`err-${id}`).classList.add("hidden");
}

// hide all error messages
function clearErrors() {
  ["divisionName", "dean", "penContact", "locRep", "chair"].forEach(hideError);
}

// hide the "Saved! " message
function hideSaveMsg() {
  document.getElementById("saveMsg").classList.add("hidden");
}

// check that all fields have text before saving
function validate() {
  let ok = true;
  ["divisionName", "dean", "penContact", "locRep", "chair"].forEach(id => {
    const val = document.getElementById(id).value.trim();
    if (!val) {
      showError(id);
      ok = false;
    }
  });
  return ok;
}

// hide the error as soon as user types something
function setupLiveValidation() {
  ["divisionName", "dean", "penContact", "locRep", "chair"].forEach(id => {
    const input = document.getElementById(id);
    input.addEventListener("input", () => {
      if (input.value.trim()) hideError(id);
    });
  });
}

// here i set up all event listeners
function setupEvents() {
  // when user changes dropdown
  document.getElementById("divisionSelect").addEventListener("change", e => {
    const key = e.target.value;
    if (!key) {
      hideForm();
      return;
    }
    showFormFor(key);
  });

  // when user clicks Save
  document.getElementById("divisionForm").addEventListener("submit", e => {
    e.preventDefault();
    clearErrors();
    hideSaveMsg();

    if (!validate()) return;

    // update data for the current divisions
    divisionsData[currentKey] = {
      divisionName: document.getElementById("divisionName").value.trim(),
      dean: document.getElementById("dean").value.trim(),
      penContact: document.getElementById("penContact").value.trim(),
      locRep: document.getElementById("locRep").value.trim(),
      chair: document.getElementById("chair").value.trim()
    };

    saveLocal();
    document.getElementById("saveMsg").classList.remove("hidden");
  });

  // when the user clicks cancel
  document.getElementById("cancelBtn").addEventListener("click", hideForm);
}

// run everything when page loads
(async function init() {
  await loadData();
  fillSelect();
  setupEvents();
  setupLiveValidation();
})();
