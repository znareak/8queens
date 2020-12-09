/**
 * @author Libardo J Rengifo
 * @copyright FOX Company Inc.
 * @summary Programa que busca las soluciones al problema de las 8 reinas en el tablero
 * @constant QUEENS_COUNT : cantidad de damas dentor del tablero
 * @version 1.0
 */

let QUEENS_COUNT = 8;

document.getElementById('calculate').addEventListener('click', e =>{
    let c_queens = document.getElementById('count_queens');

    if( (c_queens.value > 8) || c_queens.value < 1){
        c_queens.value = 8;
    }
    document.getElementById('box-alert-sucess').style.display = 'none';
    document.getElementById('resolves').textContent = "Soluciones encontradas: 0";
    document.querySelector('.solutions').innerHTML = "";
    clearInterval(intervalo);
    QUEENS_COUNT = +c_queens.value;
    queens_count = QUEENS_COUNT;
    log.textContent = "[!] Stoped";
    rowAux = 0;
    columnAux = 0;
    Row = 0;
    Column = 0;
    casillasPosibles = new Array(QUEENS_COUNT).fill(true);
    indexCasillasPosibles = 0;
    tablero = fillArray( QUEENS_COUNT );
    soluciones = 0;
    damasColocadas = [];
    todasLasSoluciones = [];
    fillQueens();
}, false);

document.getElementById('box-alert-sucess').addEventListener('click', e =>{
    document.querySelector('.solutions').innerHTML = "";
    document.querySelector('.solutions').classList.toggle('toggle');
    for(let i = 0; i < todasLasSoluciones.length; i++){
        let preAux = document.createElement('pre');
            preAux.className = 'solution';
        tableroToString( todasLasSoluciones[i],
                        document.querySelector('.solutions'),
                        false,
                        true,
                        preAux );
    }
}, false);
function fillArray(len){
    let arr = []
    for(let i = 0; i < len; i++){
        let aux = Array(len).fill(0);
        arr.push(aux);
    }
    return arr;
}
// PARA SABER SI HAY MAS SOLUCIONES ES NECESARIO IR CAMBIANDO LA PRIMERA DAMA DE LA PRIMERA FILA EN LA SIGUIENTE COLUMNA
//ESTO ES PARA SABER SI ESA DAMA COLOCADA EN ESA COLUMNA (CELDA) HAY UNA SOLUCION
let [rowAux, columnAux] = [0, 0],// AQUI SE CAMBIA COLUMNAUX PARA SABER SI EN ESA COLUMNA UNA SOLUCION, POR DEFECTO LA P
                                //PRIMERA SOLUCION SE ENCUENTRA EN LA PRIMERA COLUMNA
    tablero = fillArray( QUEENS_COUNT ),
    queens_count = QUEENS_COUNT,
    soluciones = 0,
    entrar = true,
    chessHTML = document.getElementById('chess'),
    tableroString = '',
    numbers = "àáâãäåæç".split(""),
    letters = "èéêëìíîï".split(""),
    damasColocadas = [], //damas que estan colocadas correctamente en el tablero
    todasLasSoluciones = [], // arreglo que almacena cada solucion (jagged array)
    log = document.getElementById('log'),
    intervalo,
    notationLetters = "abcdefgh".split(""),
    numbersNotation = "12345678".split("");

    fillQueens(tablero);

function fillQueens(){
    window.Row = rowAux,
    window.Column = columnAux;
    let casillasPosibles = new Array( QUEENS_COUNT ).fill(true), // arreglo que contiene las casillas a 
                                                                // las que puede ponerse una detemrinada reina

    checkRow  = row => {
        for (let index = 0; index < QUEENS_COUNT; index++) {
            if(tablero[row][index] == 1){
                return true;
            }
        }
        return false;
    },
    checkColumn = column =>{
        for (let index = 0; index < QUEENS_COUNT; index++) {
            if(tablero[index][column] == 1){
                return true;
            }
        }
        return false;
    },


    /*Diagonal izquierda
        .
         . Parte de arriba
          .
           x Reina
            .
             .Parte de abajo
              .
    */
    checkDiagonal1 = (row, column) =>{
        rowAux = row,
        columnAux = column;
        //primero compruebo en la diagonal en la parte de arriba a ver si hay una reina
        while (rowAux != -1 && columnAux != -1) {// condicion para que no se salga de las dimensiones
            
            if (tablero[rowAux][columnAux] == 1) {
                return true;
            }
            rowAux--;//
            columnAux--;
        }
        // reseteo las variables al origen para comprobar ahora las casillas  de abajo
        rowAux = row,
        columnAux = column;

        //comprobamos la misma diagonal, pero ahora la parte de abajo a ver si hay una reina
        while( (rowAux < QUEENS_COUNT) && (columnAux < QUEENS_COUNT) ){// condicion para que no se salga de las dimensiones
            if (tablero[rowAux][columnAux] == 1) {
                return true;
            }
            rowAux++; // en toda comprobación de diagonales para buscar del la otra diagonal es la operacion contraria
            columnAux++;
        }
        return false;
    },

    /*Diagonal derecha
             .
            .
           .
          x
         .
        .
       .
    */
    checkDiagonal2 = (row, column ) =>{
        rowAux = row,
        columnAux = column;
        while (rowAux != -1 && columnAux < QUEENS_COUNT) {
            if (tablero[rowAux][columnAux] == 1) {
                return true;
            }
            rowAux--;
            columnAux++;
        }
        rowAux = row,
        columnAux = column;
        while( (rowAux < QUEENS_COUNT) && (columnAux >= 0) ){
            if (tablero[rowAux][columnAux] == 1) {
                return true;
            }
            rowAux++;
            columnAux--;
        }
        return false;
    }

    intervalo = setInterval(()=>{
        if( Row === -1) {
            document.getElementById('box-alert-sucess').style.display = 'block';
            clearInterval(intervalo);
        }

        if(queens_count == 0){
            todasLasSoluciones.push(
                tablero.join('-').split('-').map(arr =>{

                   return arr.split(',').map( number => +number)
                   
                })
            );

            document.getElementById('title-log').textContent = 'SOLUCIÓN ' + (soluciones + 1);
            log.textContent += "\n#####################################################\n"
            log.textContent += `#               S O L U C I Ó N   ${soluciones+1}                 #\n`;
            log.textContent += "#####################################################\n\n\n"
            
            
            soluciones++;
            document.getElementById('resolves').textContent = "Soluciones encontradas: " + soluciones;

            tableroToString(tablero);
            log.textContent = "";
            let ultimaDamaColocada = damasColocadas[ damasColocadas.length - 1 ];

            if (Row === 7 && Column === 7){
                clearInterval(intervalo);
            }else {
                
                tablero[ultimaDamaColocada.Fila][ultimaDamaColocada.Columna] = 0;
                damasColocadas.pop();

                Row = ultimaDamaColocada.Fila;
                Column = ultimaDamaColocada.Columna + 1;
                queens_count++;
            }
        }else{
            tableroToString(tablero);//voy mostrando el tablero por cada repeticion

            //compruebo la fila, columna y diagonales
            if( (!checkRow(Row)) && 
                (!checkColumn(Column)) && 
                (!checkDiagonal1(Row, Column)) && 
                (!checkDiagonal2(Row, Column) ) && 
                tablero[Row][Column] === 0 ){
                // agrego la dama que puse en el arreglo para mantener las coordenadas de todas
                damasColocadas.push({
                    Fila : Row,
                    Columna : Column,
                    Dama_Nro : (QUEENS_COUNT - queens_count) + 1,
                    casillasPosibles
                })
                tablero[Row][Column] = 1; // marco el tablero con 1, que significa que es una dama

                log.textContent += `Dama nro.${queens_count} colocada en el tablero, Fila: ${Row}, Columna: ${Column}\n
            Coordenada Algebráica: ♕${notationLetters[Column]}${numbersNotation[Row]} \n\n`;
                log.textContent += '------------------------------------------------\n';

                queens_count--; // colocamos una dama, ahora eliminamos de la cantidad una unidad
                Row++;//como añadimos una dama en una fila, pasamos a la otra fila
                Column = 0; //reiniciamos la celda a la primera para comprobar todas

                // como la dama ya se pudo poner, reiniciamos el arreglo porque ya estaremos trabajando con otra dama y
                // a la vez otra fila, ya que si no lo reescribimos entonces va a tener los valores de las demas celdas de las
                // otras damas
                casillasPosibles = new Array(QUEENS_COUNT).fill(true);
                indexCasillasPosibles = 0;
            
            }else{
                /* Cuando una dama no se puede poner en una casilla, entonces hacemos lo siguiente:
                antes de pasar a la siguiente columna(casilla) compruebo que la columna no se desborde del tablero
                igual para las filas */
                if(Column + 1 < QUEENS_COUNT){
                    Column++; //pasamos a la siguiente columna o celda, ya que la que esta ahora no se puede poner la reina
                }else{
                    //Cuando el algoritmo entra aqui es porque la columna  por la que va iterando se desbordo debido
                    // a que la suma de Column + 1 se sobrepaso de las dimensiones del tablero, 
                    //obtengo las coordenadas de la ultima reina que fue colocada correctamente en el tablero
                    let ultimaDamaColocada = damasColocadas[ damasColocadas.length - 1 ];

                    //digo que omita la columna en la que estaba la dama antes de de ser eliminada del tablero ya sea porque
                    // estaba amenazada por una dama
                    //esto es necesario para que el algoritmo busque otras soluciones en otras opciones (columnas), es decir
                    //no seguir utilizando el mismo valor (en este caso la misma columna)
                    if( !(Column === ultimaDamaColocada.Columna) ){ 
                        log.textContent += `No es posible colocar la dama nro ${queens_count} en la fila, todas las casillas están amenazadas\n\n`;
                        log.textContent += '------------------------------------------------\n';

                        // Elimino la ultima dama que fue colocada en el tablero
                        tablero[ultimaDamaColocada.Fila][ultimaDamaColocada.Columna] = 0;

                        //Le digo al algoritmo, que ahora regrese a la fila de donde estaba la dama que acabe de eliminar
                        Row = ultimaDamaColocada.Fila;

                        // pasamos a la siguiente columna de la anterior dama eliminada
                        Column = ultimaDamaColocada.Columna + 1;//le sumamos 1 para ir la siguiente columna

                        damasColocadas.pop();// elimino la ultima dama colocada dentro del arreglo
                        queens_count++;// si quito una dama, debo de aumentar el nro de damas que hay sin poner
                        
                    }else{
                        //Cuando el algoritmo entra aqui es porque la Columna por la que esta iterando actualmente es igual
                        //a la columna de la dama que se elimino antes
                        let ultimaDamaColocada = damasColocadas[ damasColocadas.length - 1 ]; // obtengo la coordenada
                        tablero[ultimaDamaColocada.Fila][ultimaDamaColocada.Columna] = 0;// elimino esa dama del tablero

                        Column = 0;//reseteo la columna para ir comprobando desde el inicio todas las columnas

                        Row = ultimaDamaColocada.Fila - 1;//regreso atras, una fila menos para ubicar en otra posicion la dama
                        //es decir la dama antepenultima (dama que esta antes de la utlima)
                        
                        damasColocadas.pop();//elimino la ultima dama colocada dentro del arreglo 
                        queens_count++;//como elimine una dama debo de aumentar el nro de damas
                    }
                }
            }
        }
    }, 10)//end interval
}

function tableroToString(_tablero, _target = chessHTML, replaceText = true, appendChild = false, child = HTMLElement){
    tableroString = "";
    for(let i = 0; i < QUEENS_COUNT; i++){
        tableroString += numbers[i];
    
        for(let j = 0; j < QUEENS_COUNT; j++){
            if(+_tablero[i][j] == 1){
                tableroString += '<span class="queen">w</span> ';
            }else{
                tableroString += '+ ';
            }
        }
        tableroString += '\n';
    }
    tableroString += '<span>    ';

    for(let i = 0; i < QUEENS_COUNT; i++){
        tableroString += letters[i] + ' ';
    }
    tableroString += '</span>\n';

    if(appendChild){
        child.innerHTML = tableroString;
        _target.appendChild(child)
    }else{
        if(replaceText){
            _target.innerHTML = tableroString;
        }else{
            _target.innerHTML += tableroString;
        }
    }
}