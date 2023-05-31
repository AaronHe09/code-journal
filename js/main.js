const $photoUrl = document.querySelector('#photo-url');
const $image = document.querySelector('.image');
const $form = document.querySelector('form');
const $title = document.querySelector('#title');
const $notes = document.querySelector('#notes');

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
  const $dataView = document.querySelector('[data-view]');
  for (let i = 0; i < data.entries.length; i++) {
    $dataView.appendChild(renderEntry(data.entries[i]));
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
