const $photoUrl = document.querySelector('#photo-url');
const $image = document.querySelector('.image');

$photoUrl.addEventListener('input', function (e) {
  $image.src = e.target.value;
});
