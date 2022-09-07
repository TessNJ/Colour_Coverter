"use strict";
//Global Variables
const Input = document.getElementById("colour");
//Load Page
document.addEventListener("DOMContentLoaded", start);

//Setup
function start() {
  //Add eventListner to detect change in input colour
  Input.addEventListener("input", logInput);
}
//Log Input
function logInput() {
  //Defining Variables

  let newColour = Input.value;
  const divColour = document.getElementById("colourDiv");
  const rgb = document.getElementById("pRGB");
  const hex = document.getElementById("pHex");
  const hsl = document.getElementById("pHSL");

  //Display Hex
  hex.innerHTML = newColour;

  //Cal and Display RGB
  let rgbHere = hexToRGB(newColour);
  let rgbString =
    "rgb(" + rgbHere.r + ", " + rgbHere.g + ", " + rgbHere.b + ")";
  rgb.innerHTML = rgbString;

  //Cal and Display HSL
  let hslNew = rgbToHSL(rgbHere);
  hsl.innerHTML = `hsl(${hslNew.h}, ${hslNew.s}, ${hslNew.l})`;
  console.log(hslNew);

  // Change div Background
  divColour.style.background = rgbString;
}

//RGB to HEX
function hexToRGB(hexObj) {
  let red = hexObj.substring(1, 3).toString();
  let green = hexObj.substring(3, 5).toString();
  let blue = hexObj.substring(5).toString();

  red = parseInt(red, 16);
  green = parseInt(green, 16);
  blue = parseInt(blue, 16);

  let rgb = {
    r: red,
    g: green,
    b: blue,
  };

  return rgb;
}

//RGB to HSL
function rgbToHSL(rgbObj) {
  let r = rgbObj.r;
  let g = rgbObj.g;
  let b = rgbObj.b;

  //Copied Code
  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  h = h.toFixed(0);
  s = s.toFixed(0);
  l = l.toFixed(0);

  let hslObj = { h, s, l };

  return hslObj;
}
