const dayContainer = document.querySelector(".js-day"),
  dayTitle = dayContainer.querySelector("h1");

function getDay() {
  const date = new Date();
  const day = ("0" + date.getDate()).slice(-2);

  dayTitle.innerText = `${day}`;

}

function init() {
  getDay();
}

init();
