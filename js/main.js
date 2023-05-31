const $photoUrl = document.querySelector('#photo-url');
const $image = document.querySelector('.image');
const $form = document.querySelector('form');
const $title = document.querySelector('#title');
const $notes = document.querySelector('#notes');
const $dataViewEntries = document.querySelector('[data-view="entries"]');
const $noEntries = document.querySelector('.no-entries');
const $dataViewEntryForm = document.querySelector('[data-view="entry-form"]');

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

  data.nextEntryId += 1;
  data.entries.unshift(object);
  $image.src = 'images/placeholder-image-square.jpg';
  $form.reset();
});

document.addEventListener('DOMContentLoaded', function () {
  for (let i = 0; i < data.entries.length; i++) {
    $dataViewEntries.appendChild(renderEntry(data.entries[i]));
  }
});

function renderEntry(entry) {
  const $li = document.createElement('li');
  const $row = document.createElement('div');
  const $columnHalf1 = document.createElement('div');
  const $columnHalf2 = document.createElement('div');
  const $image = document.createElement('img');
  const $h1 = document.createElement('h1');
  const $p = document.createElement('p');

  $row.className = 'row';
  $columnHalf1.className = 'column-half';
  $columnHalf2.className = 'column-half';
  $image.className = 'image';

  $li.appendChild($row);
  $row.appendChild($columnHalf1);
  $row.appendChild($columnHalf2);
  $columnHalf1.appendChild($image);
  $columnHalf2.appendChild($h1);
  $columnHalf2.appendChild($p);

  $image.src = entry.photoUrl;
  $h1.textContent = entry.title;
  $p.textContent = entry.notes;

  return $li;
}

// only temp disabling so i can commit. will enable it agian
// eslint-disable-next-line no-unused-vars
function toggleNoEntries() {
  if ($noEntries.className === 'no-entries') {
    $noEntries.className = 'no-entries hidden';
  } else {
    $noEntries.className = 'no-entries';
  }
}

// eslint-disable-next-line no-unused-vars
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
