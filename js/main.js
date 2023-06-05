const $photoUrl = document.querySelector('#photo-url');
const $image = document.querySelector('.image');
const $form = document.querySelector('form');
const $title = document.querySelector('#title');
const $notes = document.querySelector('#notes');
const $dataViewEntries = document.querySelector('[data-view="entries"]');
const $ul = document.querySelector('.entries-list');
const $noEntries = document.querySelector('.no-entries');
const $dataViewEntryForm = document.querySelector('[data-view="entry-form"]');
const $showEntries = document.querySelector('.show-entries');
const $rowEntriesNav = document.querySelector('.entries-nav');
const $formHeading = document.querySelector('.form-heading');
const $deleteButton = document.querySelector('.delete-button');
const $buttonWrapper = document.querySelector('.button-wrapper');
const $deleteModalContainer = document.querySelector('.delete-modal-container');
const $cancelButton = document.querySelector('.cancel-button');
const $confirmButton = document.querySelector('.confirm-button');
let closestElement;

$photoUrl.addEventListener('input', function (e) {
  $image.src = e.target.value;
});

$form.addEventListener('submit', function (e) {
  e.preventDefault();
  const object = {
    title: $title.value,
    photoUrl: $photoUrl.value,
    notes: $notes.value,
    entryId: data.nextEntryId
  };

  if (data.editing === null) {
    data.nextEntryId += 1;
    data.entries.unshift(object);
    $image.src = 'images/placeholder-image-square.jpg';
    $form.reset();

    $ul.prepend(renderEntry(object));
    viewSwap('entries');
  } else if (data.editing !== null) {
    const newIndex = data.entries.findIndex(array => array.entryId === data.editing.entryId);
    data.editing.title = $title.value;
    data.editing.photoUrl = $photoUrl.value;
    data.editing.notes = $notes.value;
    data.entries[newIndex] = data.editing;

    closestElement.replaceWith(renderEntry(data.entries[newIndex]));
    $formHeading.textContent = 'New Entry';
    data.editing = null;
    viewSwap('entries');
  }

  if (data.entries.length > 0 && $noEntries.className !== 'no-entries hidden') {
    toggleNoEntries();
  }
});

document.addEventListener('DOMContentLoaded', function () {
  for (let i = 0; i < data.entries.length; i++) {
    $ul.appendChild(renderEntry(data.entries[i]));
  }
  viewSwap(data.view);
  if (data.entries.length > 0 && $noEntries.className !== 'no-entries hidden') {
    toggleNoEntries();
  }
});

$showEntries.addEventListener('click', function (e) {
  e.preventDefault();
  viewSwap('entries');
});

$rowEntriesNav.addEventListener('click', function (e) {
  e.preventDefault();
  viewSwap('no-entries');
  $deleteButton.classList.add('hidden');
});

$ul.addEventListener('click', function (e) {
  closestElement = e.target.closest('[data-entry-id]');
  const id = parseInt(closestElement.getAttribute('data-entry-id'));

  if (e.target.nodeName === 'I') {
    viewSwap('entry-form');
    $deleteButton.classList.remove('hidden');
    $buttonWrapper.style.justifyContent = 'space-between';

    for (const i in data.entries) {
      if (data.entries[i].entryId === id) {
        data.editing = data.entries[i];
        $title.value = data.editing.title;
        $photoUrl.value = data.editing.photoUrl;
        $notes.value = data.editing.notes;
      }
    }
    $formHeading.textContent = 'Edit Entry';
  }

});

$deleteButton.addEventListener('click', function (e) {
  e.preventDefault();
  $deleteModalContainer.classList.remove('hidden');
});

$cancelButton.addEventListener('click', function (e) {
  e.preventDefault();
  $deleteModalContainer.classList.add('hidden');
});

$confirmButton.addEventListener('click', function (e) {
  e.preventDefault();
  const entryIndex = data.entries.findIndex(entry => entry.entryId === data.editing.entryId);
  data.entries.splice(entryIndex, 1);
});

function renderEntry(entry) {
  const $li = document.createElement('li');
  const $row = document.createElement('div');
  const $row2 = document.createElement('div');
  const $columnHalf1 = document.createElement('div');
  const $columnHalf2 = document.createElement('div');
  const $image = document.createElement('img');
  const $icon = document.createElement('i');
  const $h1 = document.createElement('h1');
  const $p = document.createElement('p');

  $row.className = 'row';
  $row2.className = 'row';
  $columnHalf1.className = 'column-half';
  $columnHalf2.className = 'column-half';
  $image.className = 'image';
  $icon.className = 'fa fa-pencil fa-lg';
  $icon.setAttribute('aria-hidden', 'true');
  $icon.style = 'color: #4a2163';
  $li.setAttribute('data-entry-id', entry.entryId);

  $li.appendChild($row);
  $row.appendChild($columnHalf1);
  $row.appendChild($columnHalf2);
  $columnHalf1.appendChild($image);
  $columnHalf2.appendChild($row2);
  $row2.appendChild($h1);
  $row2.appendChild($icon);
  $columnHalf2.appendChild($p);

  $image.src = entry.photoUrl;
  $image.alt = entry.title;
  $icon.src = 'images/favicon.ico';
  $h1.textContent = entry.title;
  $p.textContent = entry.notes;

  return $li;
}

function toggleNoEntries() {
  if ($noEntries.className === 'no-entries') {
    $noEntries.className = 'no-entries hidden';
  } else {
    $noEntries.className = 'no-entries';
  }
}

function viewSwap(swap) {
  if (swap === 'entries') {
    $dataViewEntries.className = '';
    $dataViewEntryForm.className = 'hidden';
  } else {
    $dataViewEntries.className = 'hidden';
    $dataViewEntryForm.className = '';
  }

  data.view = swap;
}
