document.addEventListener("DOMContentLoaded", function () {
    loadContacts();
});

function addOrUpdateContact() {
    var nameInput = document.getElementById("name");
    var phoneInput = document.getElementById("phone");
    var name = nameInput.value.trim();
    var phone = phoneInput.value.trim();

    if (name && phone) {
        var contact = {
            name: name,
            phone: phone
        };

        var contacts = getContactsFromLocalStorage();
        var index = findContactIndex(contacts, name);
        if (index > -1) {
            // Update existing contact
            contacts[index] = contact;
        } else {
            // Add new contact
            contacts.push(contact);
        }
        saveContactsToLocalStorage(contacts);
        clearForm();
        displayContacts();
    } else {
        alert("Please enter both name and phone number.");
    }
}

function displayContacts() {
    var contactList = document.getElementById("contact-list");
    contactList.innerHTML = "";
    var contacts = getContactsFromLocalStorage();
    contacts.forEach(function (contact, index) {
        var li = document.createElement("li");
        li.innerHTML = `<span>${contact.name}: ${contact.phone}</span>
                        <button class="delete-btn" onclick="deleteContact(${index})">Delete</button>
                        <button class="edit-btn" onclick="editContact(${index})">Edit</button>`;
        contactList.appendChild(li);
    });
}

function deleteContact(index) {
    var contacts = getContactsFromLocalStorage();
    contacts.splice(index, 1);
    saveContactsToLocalStorage(contacts);
    displayContacts();
}

function editContact(index) {
    var contacts = getContactsFromLocalStorage();
    var contact = contacts[index];
    var nameInput = document.getElementById("name");
    var phoneInput = document.getElementById("phone");
    nameInput.value = contact.name;
    phoneInput.value = contact.phone;
    contacts.splice(index, 1);
    saveContactsToLocalStorage(contacts);
    displayContacts();
}

function loadContacts() {
    if (localStorage.getItem("contacts")) {
        displayContacts();
    }
}

function getContactsFromLocalStorage() {
    return JSON.parse(localStorage.getItem("contacts")) || [];
}

function saveContactsToLocalStorage(contacts) {
    localStorage.setItem("contacts", JSON.stringify(contacts));
}

function findContactIndex(contacts, name) {
    return contacts.findIndex(function (contact) {
        return contact.name === name;
    });
}

function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
}

