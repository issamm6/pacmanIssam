/* DECLARAMOS LAS DIRECCIONES DE LAS SIGUIENTE MANERAS, LAS MAS IMPORTANTES SON LAS SIGUIENTES:
Izquierda: 2
Abajo: 1
Arriba: 3
Derecha: 11
*/


var NONE          = 4,
    ARRIBA        = 3,
    IZQUIERDA     = 2,
    ABAJO         = 1,
    DERECHA       = 11,
    TIEMPOESPERA  = 5,
    PAUSE         = 6,
    PLAYING       = 7,
    CUENTAATRAS   = 8,
    EATEN_PAUSE   = 9,
    MUERTO        = 10,
    Pacman        = {};


/*Declaramos el cuadro*/
Pacman.cuadro = 30;


//Declaramos la funcion para hacer la llamada para dibujar el cuadro + inicializamos las variables

Pacman.Ghost = function (juego, map, color) {

    var position  = null,
        direccion = null,
       // eatable   = null,
        eaten     = null,
        due       = null;
   
    
    
//Se declara el movimiento del de los elementos (fantasma, jugador)
    function nuevaUbicacion(dir, current) { 
    
        var movimiento  = isVunerable() ? 1 : isHidden() ? 4 : 2,
        xMovimiento = (dir === IZQUIERDA && -movimiento || dir === DERECHA && movimiento || 0),
        yMovimiento = (dir === ABAJO && movimiento || dir === ARRIBA && -movimiento || 0);
    
        return {
            "x": encerrado(current.x, xMovimiento),
            "y": encerrado(current.y, yMovimiento)
        };
    };

    
/* Creamos declaracion para detetar colision con pared */
    function encerrado(x1, x2) { 
        var pared    = x1 % 10, 
            resultado = pared + x2;
        if (pared !== 0 && resultado > 10) {
            return x1 + (10 - pared);
        } else if(pared > 0 && resultado < 0) { 
            return x1 - rem;
        }
        return x1 + x2;
    };
    
    
    
    function isVunerable() { 
        
    };
    
//Declaramos la funcion para controlar las colisiones
    function colision() {
        return eaten === null;
    };

    function isHidden() { 
        return eatable === null && eaten !== null;
    };
    
    function getRandomdireccion() {
        var moves = (direccion === IZQUIERDA || direccion === DERECHA) 
            ? [ARRIBA, ABAJO] : [IZQUIERDA, DERECHA];
        return moves[Math.floor(Math.random() * 2)];
    };
    
    function reset() {
        eaten = null;
        eatable = null;
        position = {"x": 90, "y": 80};
        direccion = getRandomdireccion();
        due = getRandomdireccion();
    };
//Para Mantener un cierto orden, declaro las COLUMNAS de la siguiente manera:
//              [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29];
tablon =[
tablon[0]=      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
tablon[1]=      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
tablon[2]=      [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
tablon[3]=      [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
tablon[4]=      [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
tablon[5]=      [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
tablon[6]=      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
tablon[7]=      [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
tablon[8]=      [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
tablon[9]=      [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
tablon[10]=     [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
tablon[11]=     [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
tablon[12]=     [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
tablon[13]=     [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
tablon[14]=     [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
tablon[15]=     [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
tablon[16]=     [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
tablon[17]=     [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
tablon[18]=     [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
tablon[19]=     [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
tablon[20]=     [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
tablon[21]=     [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
tablon[22]=     [1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1],
tablon[23]=     [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1],
tablon[24]=     [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1],
tablon[25]=     [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
tablon[26]=     [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
tablon[27]=     [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
tablon[28]=     [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
tablon[29]=     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];


//Genaremos funciones para todas las posiciones, comienzo del juego...

function start(){
    inicioJugador(jugador);
    inicioFantasma(fantasma1);
    inicioFantasma(fantasma2);
    inicioFantasma(fantasma3);
    dibujar();
}



//Para comenzar empezamos con el traslado del codigo a la pantalla
function dibujar() {
    for (var i = 0; i < 29; i++) {
        for (var j = 0; j < 29; j++) {
            if (tablon[i][j] === 1) {
                document.write("&nbsp;");
            }
            else if(tablon[i][j] === 2) {
                document.write("C");
            }
            else if(tablon[i][j] === 3) {
                document.write("M");
            }
            else document.write("X");
        }
        document.write("<br>");
    }
}




//El siguiente paso serà dibujar al jugador
function inicioJugador(jugador) {
    var x, y, dir1, dir2;

    do {
        x = Math.floor((Math.random() * 29) + 0);
        y = Math.floor((Math.random() * 29) + 0);
    } while (!comprobarPosicio(y, x))

    dir1 = direccioInicial(y, x);
    dir2 = dir1;
    
    //introduim el jugador al tauler
    tablon[y][x] = 2;
}


//A continuacion dibujamos 3 fantasmas en nuestro cuadro
function inicioFantasma(fantasma) {
    var x, y, dir1;

    do {
        x = Math.floor((Math.random() * 29) + 0);
        y = Math.floor((Math.random() * 29) + 0);
    } while (!comprobarPosicio(y, x))

    dir1 = direccioInicial(y, x);
    //introduim el jugador al tauler
    tablon[y][x] = 3;
}


//Acto seguido procedemos a realizar la comprobacion de las ubicaciones indicadas 
function comprobarUbicacion(Y, X) {
    var ok = false;
    if (tablon[Y][X] === 1) {
        ok = true;
    }
    return ok;
}



//Declaramos la direccion inicial
function direccionInicio(Y, X) {
    var direcciones = new Array();
    var cruce = false;
    var dirIni;
    var x;
    
    //comprovem si podem anar a cada una de les direccions
    if(comprobarUbicacion(Y+1, X) === 1) direcciones[1] = 1;
    else direcciones[1] = 0;
    if(comprobarUbicacion(Y, X+1) === 1) direcciones[2] = 1;
    else direcciones[2] = 0;
    if(comprobarUbicacion(Y-1, X) === 1) direcciones[3] = 1;
    else direcciones[3] = 0;
    if(comprobarUbicacion(Y, X-1) === 1) direcciones[4] = 1;
    else direcciones[4] = 0;

    //Assignem una direccio aleatoria de les disponibles, a una var auxiliar
    do {
        x = Math.floor((Math.random() * 4) + 1);
        if(direcciones[x] === 1) {
            cruce = true;
            dirIni = x;
        }
    } while (!cruce)

    //retornem la direccio inicial
    return dirIni;
}


//Assignar una nueva direccion

function nuevaDireccion(Y, X) {
    var direcciones = new Array();
    var cruce = false;
    var nuevaDir;
    var x;

    //comprovem si podem anar a cada una de les direccions
    if(comprobarUbicacion(Y+1, X) === 1) direcciones[1] = 1;
    else direcciones[1] = 0;
    if(comprobarUbicacion(Y, X+1) === 1) direcciones[2] = 1;
    else direcciones[2] = 0;
    if(comprobarUbicacion(Y-1, X) === 1) direcciones[3] = 1;
    else direcciones[3] = 0;
    if(comprobarUbicacion(Y, X-1) === 1) direcciones[4] = 1;
    else direcciones[4] = 0;

    //Assignem una direccio aleatoria de les disponibles, a una var auxiliar
    do {
        x = Math.floor((Math.random() * 4) + 1);
        if(direcciones[x] === 1) {
            cruce = true;
            nuevaDir = x;
        }
    } while (!cruce)

    //retornem la direccio inicial
    return nuevaDir;
}


 //DELCARAMOS LA FUNCION DE INCIO + la cuenta atras y la direccion en la que empiezan nuestros elementos
        
    function inicio() {
        
        document.addEventListener("keydown", keyDown, true);
        document.addEventListener("keypress", keyPress, true); 
        
        timer = window.setInterval(mainLoop, 1000 / Pacman.cuadro);
    };
    
    return {
        "init" : init
    };
    
}());

//Declaramos la opcion de los estados en los cuales se encuentra el juego:

    function mainLoop() {

        var diff;

        if (state !== PAUSE) { 
            ++tick;
        }

        map.draw(ctx);

        if (state === PLAYING) {
            mainDraw();
        } else if (state === WAITING && stateChanged) {            
            stateChanged = false;
            map.draw(ctx);
                     
        } else if (state === EATEN_PAUSE && 
                   (tick - timerStart) > (Pacman.cuadro / 3)) {
            map.draw(ctx);
            setState(PLAYING);
        } else if (state === DYING) {
            if (tick - timerStart > (Pacman.cuadro * 2)) { 
                loseLife();
            } else { 
                redrawBlock(userPos);
                for (i = 0, len = ghosts.length; i < len; i += 1) {
                    redrawBlock(ghostPos[i].old);
                    ghostPos.push(ghosts[i].draw(ctx));
                }                                   
                user.drawDead(ctx, (tick - timerStart) / (Pacman.cuadro * 2));
            }
        } else if (state === COUNTDOWN) {
            
            diff = 5 + Math.floor((timerStart - tick) / Pacman.cuadro);
            
            if (diff === 0) {
                map.draw(ctx);
                setState(PLAYING);
            } else {
                if (diff !== lastTime) { 
                    lastTime = diff;
                    map.draw(ctx);
                    dialog("Starting in: " + diff);
                }
            }
        } 

        drawFooter();
    }