/**
 * request a user name and set the element
 */
function setUserName() {
  let newName = prompt("Please enter the new name");
  localStorage.setItem("name", newName);
  let head = document.querySelector("h1");
  console.log(head);
  head.textContent = "Mozilla is cool " + newName;
}
/**
 * change the image on click
 *
 */
function imageClickListener() {
  var image = document.querySelector("img");
  if (image.getAttribute("src") == "images/firefox-icon.png") {
    image.setAttribute("src", "images/firefox-icon - Copy.png");
  } else {
    image.setAttribute("src", "images/firefox-icon.png");
  }
}

// set the user name if already exist
let usrName = localStorage.getItem("name");
if (usrName != undefined) {
  document.querySelector("h1").textContent = "Mozilla is cool " + usrName;
}

//document.querySelector("html").onclick = () => alert("stop poking me!");
document.querySelector("img").onclick = imageClickListener;
document.querySelector("button").onclick = setUserName;
