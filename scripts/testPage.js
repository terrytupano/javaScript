/**
 * this function is invoque onInput event for the <form> section. this method enabled/disabled input components acording 
 * to the user interaction.
 * 
 */
function onInput() {
  const errMsg = document.getElementById("example3.errMsg");
  errMsg.classList.remove("errMsg");
  //  errMsg.classList.add("errMsg");

  const selets = document.getElementById("gameType");
  const val = selets.options[selets.selectedIndex].value;

  // Human vs Human
  document.getElementById("name1").disabled = !(val == "HvH");
  document.getElementById("name2").disabled = !(val == "HvH");
}

/**
 * this method is invoked onsubmit event from the <Form> section. the main task ist form validation 
 */
function onSubmit() {
  const errMsg = document.getElementById("example3.errMsg");
  errMsg.classList.remove("errMsg");

    // no game type selected
    if (val == "") {
    errMsg.innerHTML = "Slect a game type, fill the name players and press Start game";
    errMsg.classList.add("errMsg");
  }

  // name is mandatory
  if (document.forms["myForm"]["name1"].value == "") {
    errMsg.innerHTML = "The name field muss be filled";
    errMsg.classList.add("errMsg");
  }
  return false;
}

function loadGameType() {
  const gamet = document.getElementById("gameType");
  var option = document.createElement("option");
  option.setAttribute("value", "randomPlayer");
  option.innerHTML = "Human -vs- Random Player";
  gamet.appendChild(option);
}

/**
 * this is the function entry point called in documento.onLoad event
 */
function init() {
  loadGameType();
}