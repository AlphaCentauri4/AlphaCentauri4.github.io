var curTab = 0;
var tabs = document.querySelectorAll(".nav-tab");
var tabContainers = document.querySelectorAll(".tab-div");
var tabContainerClasses = document.getElementsByClassName(".tab-div");
const defaultTabStyles = tabs[0].style;


const navDIV = document.getElementById("nav-div");

// window.onresize = changeTab(curTab);

const sliders = document.querySelectorAll('.tab-div');
let isDown = false;
let startX;
let scrollLeft;

sliders.forEach(function(slider) {
  slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX);
  slider.scrollLeft = scrollLeft - walk;
})
});


navDIV.addEventListener("wheel", function(event) {
  curTab += event.deltaY > 50 ? 1 : event.deltaY == 0 ? 0 : event.deltaY < -50 ? -1 : 0;
  // curTab = curTab > tabs.length - 1 ? tabs.length - 1 : curTab < 0 ? 0 : curTab;
  changeTab(curTab > tabs.length - 1 ? tabs.length - 1 : curTab < 0 ? 0 : curTab);
});

document.addEventListener("keydown", function(event) {
  // event.preventDefault();
  const key = event.key;
  switch (key) {
    case "ArrowUp":
      curTab -= 1;
      break;
    case "ArrowDown":
      curTab += 1;
      break;
    case "ArrowLeft":
      
      break;
    case "ArrowRight":
      break;
    default:
      return;
  }
  // curTab = curTab > tabs.length - 1 ? tabs.length - 1 : curTab < 0 ? 0 : curTab;
  changeTab(curTab > tabs.length - 1 ? tabs.length - 1 : curTab < 0 ? 0 : curTab);
});


for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener('click', function() {
    // curTab = i;
    changeTab(i);
  });
}

function toggleScrolledNav() {
  if (tabContainers[curTab].scrollLeft > navDIV.offsetWidth / 2) {
    navDIV.classList.add('scrolled');
  } else {
    navDIV.classList.remove('scrolled');
  }
}

function changeTab(tab) {
  curTab = tab;
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove('selected');
  tabContainers[i].removeEventListener("scroll", toggleScrolledNav);
    // tabContainers[i].removeEventListener("wheel", scrollWithinTab);
    // tabContainers[i].blur();
  }
  tabContainers[tab].addEventListener('scroll', toggleScrolledNav);
  // tabContainers[tab].addEventListener('wheel', function scrollWithinTab(event) {
  //   console.log(event.deltaY)
  //   tabContainers[tab].scrollLeft += event.deltaY;
  // });
  tabs[tab].classList.add('selected');
  tabContainers[tab].scrollIntoView({
    block: "center",
    behavior: "smooth",
    inline: "center"
  });
  document.activeElement.blur();
  tabContainers[tab].focus();
  toggleScrolledNav();
}

changeTab(0)