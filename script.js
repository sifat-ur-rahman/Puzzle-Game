var images = [
  "https://i.ibb.co/6wmx3cp/IMG-20220322-115919-397.jpg",
];

//https://i.ibb.co/6wmx3cp/IMG-20220322-115919-397.jpg
//https://scontent.fjsr6-1.fna.fbcdn.net/v/t39.30808-6/384550897_837406841364525_3181255207537297905_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=8IRtotjAlzIQ7kNvgFeR8vY&_nc_ht=scontent.fjsr6-1.fna&oh=00_AYArmnsYjZu1lgdCIr_lsqfPJT9JQPom3LJVyTuWjy6twA&oe=66C508D0

var currentIndex = 0;
var totalClicks = 0;

function randomizeImage() {
  let root = document.documentElement;
  root.style.setProperty("--image", "url(" + images[currentIndex] + ")");
  currentIndex++;
  if (currentIndex >= images.length) {
    currentIndex = 0;
  }
  var puzzleItems = document.querySelectorAll("#puzz i");
  for (var i = 0; i < puzzleItems.length; i++) {
    puzzleItems[i].style.left =
      Math.random() * (window.innerWidth - 100) + "px";
    puzzleItems[i].style.top =
      Math.random() * (window.innerHeight - 100) + "px";
  }
}

randomizeImage();

function reloadPuzzle() {
  var doneItems = document.querySelectorAll(".done");
  doneItems.forEach(function (element) {
    element.classList.toggle("done");
  });
  var droppedItems = document.querySelectorAll(".dropped");
  droppedItems.forEach(function (element) {
    element.classList.toggle("dropped");
  });
  var allDoneElement = document.querySelector(".allDone");
  allDoneElement.style = "";
  allDoneElement.classList.toggle("allDone");
}

// mobile functionality
var puzzleItemsMobile = document.querySelectorAll("#puzz i");
puzzleItemsMobile.forEach(function (element) {
  element.addEventListener("mousedown", function () {
    totalClicks++;
    document.querySelector("#clicks").innerHTML = totalClicks;
  });
  element.addEventListener("click", function () {
    if (document.querySelector(".clicked")) {
      document.querySelector(".clicked").classList.toggle("clicked");
      element.classList.toggle("clicked");
    } else {
      element.classList.toggle("clicked");
    }
  });
});

var puzzleItemsDesktop = document.querySelectorAll("#puz i");
puzzleItemsDesktop.forEach(function (element) {
  element.addEventListener("click", function () {
    if (document.querySelector(".clicked")) {
      var clickedElement = document.querySelector(".clicked");
      if (clickedElement.classList.contains(element.classList)) {
        element.classList.add("dropped");
        clickedElement.classList.add("done");
        clickedElement.classList.toggle("clicked");

        if (document.querySelectorAll(".dropped").length == 9) {
          document.querySelector("#puz").classList.add("allDone");
          document.querySelector("#puz").style.border = "none";
          document.querySelector("#puz").style.animation =
            "allDone 1s linear forwards";

          setTimeout(function () {
            reloadPuzzle();
            randomizeImage();
          }, 1500);
        }
      }
    }
  });
});

// desktop drag and drop
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.className);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");

  if (ev.target.className == data) {
    ev.target.classList.add("dropped");
    document
      .querySelector("." + data + "[draggable='true']")
      .classList.add("done");

    if (document.querySelectorAll(".dropped").length == 9) {
      document.querySelector("#puz").classList.add("allDone");
      document.querySelector("#puz").style.border = "none";
      document.querySelector("#puz").style.animation =
        "allDone 1s linear forwards";

      setTimeout(function () {
        reloadPuzzle();
        randomizeImage();
      }, 1500);
    }
  }
}
