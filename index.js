'use strict';

const form = document.querySelector('form');
const mainContainer = document.querySelector('main');

function getColorHtml(arr) {
  return arr
    .map(
      color => `
  <div class="colors" data-color= '${color.hex.value}'>
  <div
    style="background-color: ${color.hex.value}"
    class="color__box"
    id="color"
  ></div>
  <p class="color__name">${color.hex.value}</p>
</div>
  `
    )
    .join('');
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = {
    mode: document.getElementById('model-select').value,
    color: document.getElementById('color-select').value.slice(1),
  };

  // form.reset();

  console.log(formData);

  fetch(
    `https://www.thecolorapi.com/scheme?mode=${formData.mode}&hex=${formData.color}&integer=5`
  )
    .then(res => res.json())
    .then(data => {
      console.log(data);
      mainContainer.innerHTML = getColorHtml(data.colors);
    });
});

mainContainer.addEventListener('click', function (e) {
  const { color } = e.target.closest('.colors').dataset;
  console.log(color);

  navigator.clipboard.writeText(color);
});
