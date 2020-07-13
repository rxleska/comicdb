const uri = 'api/ComicItems';
let comics = [];

function getItems() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

function addItem() {
    const addTitleTextbox = document.getElementById('add-title');
    const addSerTextbox = document.getElementById('add-ser');
    const addPubTextbox = document.getElementById('add-pub');
    const addIssueTextbox = document.getElementById('add-issue');


    const item = {
        title: addTitleTextbox.value.trim(),
        series: addSerTextbox.value.trim(),
        publisher: addPubTextbox.value.trim(),
        issueNumber: addIssueTextbox.value.trim()
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getItems();
            addTitleTextbox.value = '';
            addSerTextbox.value = '';
            addPubTextbox.value = '';
            addIssueTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}

function deleteItem(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
    const item = comics.find(item => item.id === id);

    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-title').value = item.title;
    document.getElementById('edit-ser').value = item.series;
    document.getElementById('edit-pub').value = item.publisher
    document.getElementById('edit-issue').value = item.issueNumber
    document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
    const itemId = document.getElementById('edit-id').value;
    const item = {
        id: parseInt(itemId, 10),
        title: document.getElementById('edit-title').value.trim(),
        series: document.getElementById('edit-ser').value.trim(),
        publisher: document.getElementById('edit-pub').value.trim(),
        issueNumber: document.getElementById('edit-issue').value.trim()
    };

    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
    const name = (itemCount === 1) ? 'comic' : 'comics';

    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
    const tBody = document.getElementById('comics');
    tBody.innerHTML = '';

    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {
        /*let isCompleteCheckbox = document.createElement('input');
        isCompleteCheckbox.type = 'checkbox';
        isCompleteCheckbox.disabled = true;
        isCompleteCheckbox.checked = item.isComplete;*/        

        let tr = tBody.insertRow();

        /*let td1 = tr.insertCell(0);
        td1.appendChild(isCompleteCheckbox);*/

        let td1 = tr.insertCell(0);
        const textNode1 = document.createTextNode(item.title);
        td1.appendChild(textNode1);

        let td2 = tr.insertCell(1);
        const textNode2 = document.createTextNode(item.series);
        td2.appendChild(textNode2);

        let td3 = tr.insertCell(2);
        const textNode3 = document.createTextNode(item.publisher);
        td3.appendChild(textNode3);

        let td4 = tr.insertCell(3);
        const textNode4 = document.createTextNode(item.issueNumber);
        td4.appendChild(textNode4);

        let td5 = tr.insertCell(4);
        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${item.id})`);
        td5.appendChild(editButton);

        let td6 = tr.insertCell(5);
        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);
        td6.appendChild(deleteButton);
    });

    comics = data;
}