/* exported data */
var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', function () {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('data', dataJSON);
});

if (localStorage.getItem('data') !== null) {
  const newData = JSON.parse(localStorage.getItem('data'));
  data = newData;
}
