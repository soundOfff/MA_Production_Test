import { JuegoAhorcado } from "./ahorcado.js";

const juego = new JuegoAhorcado();

const wordGuess = document.getElementById("inpPalabra");

function generaABC(a, z) {
  document.getElementById("abcdario").innerHTML = "";
  var i = a.charCodeAt(0),
    j = z.charCodeAt(0);
  var letra = "";
  for (; i <= j; i++) {
    letra = String.fromCharCode(i).toUpperCase();
    document.getElementById("abcdario").innerHTML +=
      "<button value='" +
      letra +
      "\")' class='btn btn-outline-dark' id='" +
      letra +
      "'>" +
      letra +
      "</button>";
    if (i == 110) {
      document.getElementById("abcdario").innerHTML +=
        "<button value='Ñ' onclick='intento(\"Ñ\")' class='btn btn-outline-dark' id='" +
        letra +
        "'>Ñ</button>";
    }
  }
}

function intento(letra) {
  document.getElementById(letra).disabled = true;
  juego.arriegarLetra(letra);
  wordGuess.innerHTML = juego.palabra.join("");
  document.getElementById("intentos").innerHTML = juego.vidas;
  showStickman(letra);
  check();
}

function intentoPalabra() {
  var input = document.getElementById("wordInput").value;
  juego.arriesgarPalabra(input);

  if (juego.vidas === 0) {
    document.getElementById("intentos").innerHTML = juego.vidas;
    for (let i = 0; i < 6; i++) {
      let stickmanPart = document.getElementById(`${i}`);
      stickmanPart.classList.remove("invisible");
      stickmanPart.classList.add("visible");
    }
    check();
    return;
  }

  wordGuess.innerHTML = juego.palabraAdivinar;
}

function check() {
  let alert = document.getElementById("alert");

  if (juego.vidas === 0) {
    console.log("wtf");
    alert.classList.remove("invisible");
    alert.classList.add("visible");
  }

  if (!juego.palabra.includes("_")) {
    console.log("Win");
    alert.classList.remove("alert-warning");
    alert.classList.add("alert-success");
    alert.classList.remove("invisible");
    alert.classList.add("visible");
    alert.innerHTML = `You won the game <a href="#" class="alert-link" onclick="window.location.reload()">
    Restart</a
  >. Give it a click if you like.`;
  }
}

function inicio() {
  juego.inicializarEstado();
  wordGuess.innerHTML = juego.palabra.join("");
  generaABC("a", "z");
  document.getElementById("intentos").innerHTML = juego.vidas;
}

function showStickman(letra) {
  if (!juego.contieneLetra(letra.toLowerCase())) {
    const stickmanPart = document.getElementById(`${juego.vidas}`);
    stickmanPart.classList.remove("invisible");
    stickmanPart.classList.add("visible");
  }
}

function showFullStickman() {
  for (let i = 0; i < 7; i++) {
    const stickmanPart = document.getElementById(i);
    stickmanPart.classList.remove("invisible");
    stickmanPart.classList.add("visible");
  }
}

// Iniciar
window.onload = inicio();

// Eventos globales del DOM
document.getElementById("abcdario").addEventListener("click", function (event) {
  let targetID = event.srcElement.id;
  let btn = document.getElementById(targetID);
  btn.addEventListener("click", intento(targetID));
});

document
  .getElementById("wordInputButton")
  .addEventListener("click", function (event) {
    event.preventDefault();
    intentoPalabra();
  });
