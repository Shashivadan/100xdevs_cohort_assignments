const root = document.querySelector(".root");
const reactElement = {
  type: "a",
  props: {
    href: "https://www.baidu.com",
    target: "_blank",
  },
  children: "百度一下，你就知道",
};

function domRender(element) {
  const newElement = document.createElement(element.type);
  Object.keys(element.props).map((ele) => {
    newElement.setAttribute(ele, element.props[ele]);
  });
  newElement.innerHTML = element.children;
  root.appendChild(newElement);
}

domRender(reactElement);
