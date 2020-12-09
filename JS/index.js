
// Autor: Libardo Rengifo (zNareak)

const N = 11;
// aca solo se guardan las columnas de las reinas que ya estan en el tablero
const columnas = [];
let soluciones = 0;
buscar(0);
console.log(soluciones, "encontradas");

function buscar(fila) {
  if (fila == N) {
    imprimir();
    soluciones++;
  } else {
    // se va comprobando desde la columna 0 pero con diferente fila
    for (let columna = 0; columna < N; columna++) {
      if (comprobar(fila, columna)) {
        columnas[fila] = columna;
        // buscar en la siguiente fila
        buscar(fila + 1);
      }
    }
  }
}

function comprobar(filaReina, columnaReina) {
  // se recorre hasta esa fila solicitada (con esto se limita las filas a comprobar)
  for (let fila = 0; fila < filaReina; fila++) {
    /* 
        se van comprobando todas las columnas si alguna coincide con la columna
        pasada por argumento, entonces estan en misma columna
      */
    if (columnas[fila] == columnaReina) {
      return false;
    }

    /*
        se aplica la formula matematica para saber si estan en la misma diagonal
        x1 = fila de la primera reina
        x2 = fila de la segunda reina

        y1 = columna de la primera reina
        y2 = columna de la segunda reina
        d = |x1 - x2| == |y1 - y2|

    */
    if (Math.abs(filaReina - fila) == Math.abs(columnaReina - columnas[fila])) {
      return false;
    }
  }

  return true;
}

function imprimir() {
  str = "";
  for (let fila = 0; fila < N; fila++) {
    for (let columna = 0; columna < N; columna++) {
      if (fila == columnas[columna]) {
        str += "Q ";
      } else {
        str += "# ";
      }
    }

    str += "\n";
  }
  console.log(str);
}
