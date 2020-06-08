const items = document.querySelectorAll(".item");
const indicator = document.querySelector(".indicator");
const itemsList = document.querySelector(".items");
const wrapperNav = document.querySelector(".wrapperNav");
let initialDistanceWrapperNav, click;

TweenMax.set(wrapperNav, {
  transformPerspective: 450,
  transformOrigin: "center center",
});

const isItemTarget = (target) => {
  return target.classList.contains("item");
};

const getActiveItemInfo = () => {
  const activeItem = [...items].filter((item) =>
    item.classList.contains("active")
  );
  const infoActiveItem = activeItem[0].getBoundingClientRect();
  return infoActiveItem;
};

const positionIndicator = () => {
  const { x: itemLeftDistance, width: itemWidth } = getActiveItemInfo();
  const { x: currentDistanceWrapperNav } = wrapperNav.getBoundingClientRect();
  const indicatorInfo = indicator.getBoundingClientRect();
  let position =
    itemLeftDistance +
    itemWidth / 2 -
    indicatorInfo.width / 2 -
    currentDistanceWrapperNav;

  if (click) {
    diff = currentDistanceWrapperNav - initialDistanceWrapperNav;
    position = position + diff / 2;
    click = false;
  }

  return position;
};

const setIndicator = () => {
  TweenMax.set(indicator, { x: positionIndicator() });
};

const setActiveItem = (e) => {
  if (isItemTarget(e.target)) {
    items.forEach((item) => item.classList.remove("active"));
    e.target.classList.add("active");
    TweenMax.to(indicator, 0.5, {
      x: positionIndicator(),
    });
    TweenMax.to(wrapperNav, 0.7, { rotationY: 0 });
    TweenMax.to(e.target, 0.7, { scale: 1, ease: Back.easeOut.config(6) });
  }
};

const press = (e) => {
  if (isItemTarget(e.target)) {
    click = true;
    const distanceFromCenter = e.pageX - window.innerWidth / 2;
    initialDistanceWrapperNav = wrapperNav.getBoundingClientRect().x;

    TweenMax.to(wrapperNav, 0.7, { rotationY: 0.1 * distanceFromCenter });
    TweenMax.to(e.target, 0.7, { scale: 0.8, ease: Power4.easeOut });
  }
};

setIndicator();
window.addEventListener("resize", setIndicator);
itemsList.addEventListener("mouseup", setActiveItem);
itemsList.addEventListener("mousedown", press);
