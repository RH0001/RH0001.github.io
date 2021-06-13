const monthContainer = document.querySelector(".js-month");
const monthTitle = monthContainer.querySelector("h1");

function getMonth() {
  const date = new Date();
  const mon = ("0" + (1 + date.getMonth())).slice(-2);

  monthTitle.innerText = `${mon}`;

}

function init() {
  getMonth();
}

init();
