import { JuegoAhorcado } from "../docs/js/ahorcado";

describe("Tests del ahorcado", () => {
  let juego = new JuegoAhorcado();

  beforeEach(() => {
    juego = new JuegoAhorcado();
    juego.inicializarEstado();
  });

  test("Validar que se cree una palabra", () => {
    let palabraAdivinar = juego.palabra;

    expect(palabraAdivinar).toBeDefined();
  });

  test("Ingresar palabra correcta", () => {
    const intentoPalabra = "manteca";
    const valido = juego.compararPalabra(intentoPalabra);

    expect(valido).toBeTruthy();
  });

  test("Ingresar palabra incorrecta", () => {
    const intentoPalabra = "keso";
    const valido = juego.compararPalabra(intentoPalabra);

    expect(valido).toBeFalsy();
  });

  test("Ingresar letra contenida en la palabra", () => {
    const intentoLetra = "M";
    const contenida = juego.compararLetra(intentoLetra);
    expect(contenida).not.toBe(-1);
  });

  test("Ingresar letra no contenida en la palabra", () => {
    const intentoLetra = "k";
    const contenida = juego.compararLetra(intentoLetra)[0];
    expect(contenida).toBe(-1);
  });

  test("Devolver posicion de una letra contenida en la palabra", () => {
    const intentoLetra = "n";
    const posicion = juego.compararLetra(intentoLetra)[0];

    expect(posicion).toBe(2);
  });

  test("Devolver posiciones de una letra contenida multiples veces en la palabra", () => {
    const intentoLetra = "a";
    const posiciones = juego.compararLetra(intentoLetra);

    expect(posiciones).toEqual([1, 6]);
  });

  test("Diferenciar la letra ingresada si es mayuscula o minuscula", () => {
    const intentoLetra = "A";
    const posiciones = juego.compararLetra(intentoLetra);

    expect(posiciones).toEqual([1, 6]);
  });

  test("Devolver vida restante del usuario", () => {
    let vidas = juego.vidas;

    expect(vidas).toEqual(6);
  });

  test("Usuario pueda consultar estado de la partida", () => {
    let estado = juego.estadoActual;

    expect(estado).toBeDefined();
  });

  test("El estado debe contener las letras jugadas hasta el momento", () => {
    juego.arriegarLetra("a");
    juego.arriegarLetra("b");
    juego.arriegarLetra("c");

    let estado = juego.estadoActual;
    let letrasJugadas = estado.letrasJugadas;

    expect(letrasJugadas).toEqual(["a", "b", "c"]);
  });

  test("El estado contiene las letras correctas jugadas en su posicion", () => {
    juego.arriegarLetra("a");

    let estado = juego.estadoActual;
    let letrasCorrectas = estado.letrasCorrectas;

    expect(letrasCorrectas).toEqual(["_", "a", "_", "_", "_", "_", "a"]);
  });

  test("El estado contiene las letras incorrectas jugadas", () => {
    juego.arriegarLetra("s");

    let estado = juego.estadoActual;
    let letrasIncorrectas = estado.letrasIncorrectas;

    expect(letrasIncorrectas).toEqual(["s"]);
  });

  test("La vida se actualiza en -1 cuando ingreso una letra incorrecta", () => {
    juego.arriegarLetra("s");

    let vidas = juego.vidas;

    expect(vidas).toBe(5);
  });

  test("No dejar ingresar palabra al usuario si no tiene vidas", () => {
    juego.arriegarLetra("s");
    juego.arriegarLetra("z");
    juego.arriegarLetra("x");
    juego.arriegarLetra("v");
    juego.arriegarLetra("b");
    juego.arriegarLetra("q");

    juego.arriegarLetra("s");

    let estado = juego.estadoActual;
    let letras = estado.letrasJugadas;

    expect(letras).toEqual(["s", "z", "x", "v", "b", "q"]);
  });

  test("La vida se iguala a 0 cuando la palabra ingresada es incorrecta", () => {
    juego.arriesgarPalabra("jabon");

    let vidas = juego.vidas;

    expect(vidas).toBe(0);
  });

  test(" Se tiene constancia de la ultima jugada del usuario", () => {
    let estado = juego.estado;
    let ultimaJugada = estado.ultimaJugada;

    expect(ultimaJugada).toBeDefined();
  });

  test(" Si se ingreso una letra el ultimo movimiento del jugador fue una letra", () => {
    juego.arriegarLetra("s");

    let estado = juego.estado;
    let ultimaJugada = estado.ultimaJugada;

    expect(ultimaJugada).toEqual("letra");
  });

  test(" Si se ingreso una palabra el ultimo movimiento del jugador debera ser una palabra", () => {
    juego.arriesgarPalabra("Jamon");

    let estado = juego.estado;
    let ultimaJugada = estado.ultimaJugada;

    expect(ultimaJugada).toEqual("palabra");
  });
});
