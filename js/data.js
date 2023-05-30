/* exported data */
const $photoUrl = document.querySelector('#photo-url');
const $image = document.querySelector('.image');
const $form = document.querySelector('form');
const $title = document.querySelector('#title');
const $notes = document.querySelector('#notes');
var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

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
  data.entries.push(object);
  $image.src = 'images/placeholder-image-square.jpg';
  $form.reset();
});

window.addEventListener('beforeunload', function () {
  const dataJSON = JSON.stringify(data);
  this.localStorage.setItem('data', dataJSON);
});

if (localStorage.getItem('data') !== null) {
  const newData = JSON.parse(localStorage.getItem('data'));
  data = newData;
}
