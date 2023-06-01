const $photoUrl = document.querySelector('#photo-url');
const $image = document.querySelector('.image');
const $form = document.querySelector('form');
const $title = document.querySelector('#title');
const $notes = document.querySelector('#notes');
const $dataViewEntries = document.querySelector('[data-view="entries"]');
const $noEntries = document.querySelector('.no-entries');
const $dataViewEntryForm = document.querySelector('[data-view="entry-form"]');
const $showEntries = document.querySelector('.show-entries');
const $rowEntriesNav = document.querySelector('.entries-nav');

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

  $dataViewEntries.prepend(renderEntry(object));
  viewSwap('entries');

  if (data.entries.length > 0 && $noEntries.className !== 'no-entries hidden') {
    toggleNoEntries();
  }
});

document.addEventListener('DOMContentLoaded', function () {
  for (let i = 0; i < data.entries.length; i++) {
    $dataViewEntries.appendChild(renderEntry(data.entries[i]));
  }
  viewSwap(data.view);
  if (data.entries.length > 0 && $noEntries.className !== 'no-entries hidden') {
    toggleNoEntries();
  }
});

$showEntries.addEventListener('click', function (e) {
  viewSwap('entries');
});

$rowEntriesNav.addEventListener('click', function (e) {
  viewSwap('no-entries');
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
  $image.alt = entry.title;
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
