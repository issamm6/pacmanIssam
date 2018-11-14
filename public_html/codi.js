//------UTILIZAMOS EL FRAMEWORK MODERNIZR.JS----//

/* DECLARAMOS LAS VARIABLES LOCALES DE NUESTRO  DIRECCIONES DE LAS SIGUIENTE MANERAS, LAS MAS IMPORTANTES SON LAS SIGUIENTES:
Izquierda: 2
Abajo: 1
Arriba: 3
Derecha: 14*/


var NONE          = 4,
    ARRIBA        = 3,
    IZQUIERDA     = 2,
    ABAJO         = 1,
    DERECHA       = 11,
    TIEMPOESPERA  = 5,
    PAUSE         = 6,
    JUGANDO       = 7,
    CUENTAATRAS   = 8,
    EATEN_PAUSE   = 9,
    MUERTO        = 10,
    Pacman        = {};


/*Declaramos el cuadro*/
Pacman.cuadro = 30;


//Declaramos la funcion para hacer la llamada para dibujar el cuadro + inicializamos las variables

Pacman.Ghost = function (juego, map, color) {

    var posicion  = null,
        direccion = null,   
        due       = null;
   
    
//Se declara el movimiento del de los elementos (fantasma, jugador) y situaciones de choque en pared
    function nuevaUbicacion(dir, current) { 
    
        var movimiento  = isHidden() ? 4 : 2,
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
    
      
    //Funcion para detectar si son comestibles los fatasmas
    
    function vulnerables() { 
        
    };
    
    
//Declaramos la funcion para controlar las colisiones en caso de comernos a un fantasma
    function colision() {
        return comido === null;
    };

    function isHidden() { 
        return comido !== null;
    };
    
    function getRandomdireccion() {
        var moves = (direccion === IZQUIERDA || direccion === DERECHA) 
            ? [ARRIBA, ABAJO] : [IZQUIERDA, DERECHA];
        return moves[Math.floor(Math.random() * 2)];
    };
    
    
//A continuacion declaramos la funcion para el reseteo del juego
    function reiniciar() {
        comido = null;
        eatable = null;
        posicion = {"x": 90, "y": 80};
        direccion = getRandomdireccion();
        due = getRandomdireccion();
    };
    
    function onWholeSquare(x) {
        return x % 10 === 0;
    };
    
    function oppositedireccion(dir) { 
        return dir === IZQUIERDA && DERECHA ||
            dir === DERECHA && IZQUIERDA ||
            dir === ARRIBA && ABAJO || ARRIBA;
    };


    function eat() { 
        eatable = null;
        comido = juego.pedirCrono();
    };

    function pointToCoord(x) {
        return Math.round(x / 10);
    };
    

    //Declaramos la funcion para la siguiente direccion

    function nextSquare(x, dir) {
        var rem = x % 10;
        if (rem === 0) { 
            return x; 
        } else if (dir === DERECHA || dir === ABAJO) { 
            return x + (10 - rem);
        } else {
            return x - rem;
        }
    };

    function onGridSquare(pos) {
        return onWholeSquare(pos.y) && onWholeSquare(pos.x);
    };


    function getColor() { 
        if(comido) { 
            return "#222";
        } 
        return color;
    };

    function dibujo(ctx) {
  
        var s    = map.medidaBloque, 
            top  = (posicion.y/10) * s,
            izquierda = (posicion.x/10) * s;
        
        
        var tl = izquierda + s;
        var base = top + s - 3;
        var inc = s / 10;

        var high = juego.pedirCrono() % 10 > 5 ? 3  : -3;
        var low  = juego.pedirCrono() % 10 > 5 ? -3 : 3;

        ctx.fillStyle = getColor();
        ctx.beginPath();

        ctx.moveTo(izquierda, base);

        ctx.quadraticCurveTo(izquierda, top, izquierda + (s/2),  top);
        ctx.quadraticCurveTo(izquierda + s, top, izquierda+s,  base);
        
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = "#FFF";
        ctx.arc(izquierda + 6,top + 6, s / 6, 0, 300, false);
        ctx.arc((izquierda + s) - 6,top + 6, s / 6, 0, 300, false);
        ctx.closePath();
        ctx.fill();

        var f = s / 12;
        var off = {};
        off[DERECHA] = [f, 0];
        off[IZQUIERDA]  = [-f, 0];
        off[ARRIBA]    = [0, -f];
        off[ABAJO]  = [0, f];

        ctx.beginPath();
        ctx.fillStyle = "#000";
        ctx.arc(izquierda+6+off[direccion][0], top+6+off[direccion][1], 
                s / 15, 0, 300, false);
        ctx.arc((izquierda+s)-6+off[direccion][0], top+6+off[direccion][1], 
                s / 15, 0, 300, false);
        ctx.closePath();
        ctx.fill();

    };

    function pane(pos) {

        if (pos.y === 100 && pos.x >= 190 && direccion === DERECHA) {
            return {"y": 100, "x": -10};
        }
        
        if (pos.y === 100 && pos.x <= -10 && direccion === IZQUIERDA) {
            return posicion = {"y": 100, "x": 190};
        }

        return false;
    };
    
    
    //Declaramos la funcion para el movimiento de los fantasmas y jugador dentro del cuadro/mapa
    function mover(ctx) {
        
        var oldPos = posicion,
            onGrid = onGridSquare(posicion),
            npos   = null;
        
        if (due !== direccion) {
            
            npos = nuevaUbicacion(due, posicion);
            
            if (onGrid &&
                map.isFloorSpace({
                    "y":pointToCoord(nextSquare(npos.y, due)),
                    "x":pointToCoord(nextSquare(npos.x, due))})) {
                direccion = due;
            } else {
                npos = null;
            }
        }
        
        if (npos === null) {
            npos = nuevaUbicacion(direccion, posicion);
        }
        
        if (onGrid &&
            map.isParedSpace({
                "y" : pointToCoord(nextSquare(npos.y, direccion)),
                "x" : pointToCoord(nextSquare(npos.x, direccion))
            })) {
            
            due = getRandomdireccion();            
            return mover(ctx);
        }

        posicion = npos;        
        
        var tmp = pane(posicion);
        if (tmp) { 
            posicion = tmp;
        }
        
        due = getRandomdireccion();
        
        return {
            "new" : posicion,
            "old" : oldPos
        };
    };
    
    return {
        "eat"         : eat,
        "vulnerables" : vulnerables,
        "colision"    : colision,
        "reiniciar"   : reiniciar,
        "mover"       : mover,
        "dibujo"      : dibujo
    };
};


//Ordenes recibidas del jugador (teclas)
Pacman.User = function (juego, map) {
    
    var posicion  = null,
        direccion = null,
        comido     = null,
        due       = null, 
        vidas     = null,
        puntuar     = 5,
        keyMap    = {};
    
    keyMap[KEY.ARROW_LEFT]  = IZQUIERDA;
    keyMap[KEY.ARROW_UP]    = ARRIBA;
    keyMap[KEY.ARROW_RIGHT] = DERECHA;
    keyMap[KEY.ARROW_DOWN]  = ABAJO;
    
    
//Funciones relacionadas con las vidas de un usuario
    function addPuntuar(nPuntuar) { 
        puntuar += nPuntuar;
        if (puntuar >= 500 && puntuar - nPuntuar < 500) { 
            vidas += 1;
        }
    };

    function losPuntos() { 
        return puntuar;
    };

    function perdioVida() { 
        vidas -= 1;
    };

    function conseguirVidas() {
        return vidas;
    };

    function initUser() {
        puntuar = 0;
        vidas = 3;
        newLevel();
    }
    
    function newLevel() {
        reiniciarPosicion();
        comido = 0;
    };
    
    function reiniciarPosicion() {
        posicion = {"x": 90, "y": 120};
        direccion = IZQUIERDA;
        due = IZQUIERDA;
    };
    
    function reiniciar() {
        initUser();
        reiniciarPosicion();
    };        
    
    function keyDown(e) {
        if (typeof keyMap[e.keyCode] !== "undefined") { 
            due = keyMap[e.keyCode];
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        return true;
	};

    function nuevaUbicacion(dir, current) {   
        return {
            "x": current.x + (dir === IZQUIERDA && -2 || dir === DERECHA && 2 || 0),
            "y": current.y + (dir === ABAJO && 2 || dir === ARRIBA    && -2 || 0)
        };
    };

    function onWholeSquare(x) {
        return x % 10 === 0;
    };

    function pointToCoord(x) {
        return Math.round(x/10);
    };
    
    function nextSquare(x, dir) {
        var rem = x % 10;
        if (rem === 0) { 
            return x; 
        } else if (dir === DERECHA || dir === ABAJO) { 
            return x + (10 - rem);
        } else {
            return x - rem;
        }
    };

    function next(pos, dir) {
        return {
            "y" : pointToCoord(nextSquare(pos.y, dir)),
            "x" : pointToCoord(nextSquare(pos.x, dir)),
        };                               
    };

    function onGridSquare(pos) {
        return onWholeSquare(pos.y) && onWholeSquare(pos.x);
    };

    function isOnSamePlane(due, dir) { 
        return ((due === IZQUIERDA || due === DERECHA) && 
                (dir === IZQUIERDA || dir === DERECHA)) || 
            ((due === ARRIBA || due === ABAJO) && 
             (dir === ARRIBA || dir === ABAJO));
    };

    function mover(ctx) {
        
        var npos        = null, 
            nextWhole   = null, 
            oldPosicion = posicion,
            ESPACIOFANTASMAS       = null;
        
        if (due !== direccion) {
            npos = nuevaUbicacion(due, posicion);
            
            if (isOnSamePlane(due, direccion) || 
                (onGridSquare(posicion) && 
                 map.isFloorSpace(next(npos, due)))) {
                direccion = due;
            } else {
                npos = null;
            }
        }

        if (npos === null) {
            npos = nuevaUbicacion(direccion, posicion);
        }
        
        if (onGridSquare(posicion) && map.isParedSpace(next(npos, direccion))) {
            direccion = NONE;
        }

        if (direccion === NONE) {
            return {"new" : posicion, "old" : posicion};
        }
        
        if (npos.y === 100 && npos.x >= 190 && direccion === DERECHA) {
            npos = {"y": 100, "x": -10};
        }
        
        if (npos.y === 100 && npos.x <= -12 && direccion === IZQUIERDA) {
            npos = {"y": 100, "x": 190};
        }
        
        posicion = npos;        
        nextWhole = next(posicion, direccion);
        
        ESPACIOFANTASMAS = map.block(nextWhole);        
        
        if ((isMidSquare(posicion.y) || isMidSquare(posicion.x)) &&
            ESPACIOFANTASMAS === Pacman.LIBRE || ESPACIOFANTASMAS === Pacman.LIBRE) {
            
            map.setBlock(nextWhole, Pacman.UNION);           
            addPuntuar((ESPACIOFANTASMAS === Pacman.LIBRE) ? 10 : 50);
            comido += 1;
            
            
        }   
                
        return {
            "new" : posicion,
            "old" : oldPosicion
        };
    };

    function isMidSquare(x) { 
        var rem = x % 10;
        return rem > 3 || rem < 7;
    };

    function calcAngle(dir, pos) { 
        if (dir == DERECHA && (pos.x % 10 < 5)) {
            return {"start":0.25, "end":1.75, "direccion": false};
        } else if (dir === ABAJO && (pos.y % 10 < 5)) { 
            return {"start":0.75, "end":2.25, "direccion": false};
        } else if (dir === ARRIBA && (pos.y % 10 < 5)) { 
            return {"start":1.25, "end":1.75, "direccion": true};
        } else if (dir === IZQUIERDA && (pos.x % 10 < 5)) {             
            return {"start":0.75, "end":1.25, "direccion": true};
        }
        return {"start":0, "end":2, "direccion": false};
    };

    function dibujoMuerto(ctx, amount) { 

        var size = map.medidaBloque, 
            half = size / 2;

        if (amount >= 1) { 
            return;
        }

        ctx.fillStyle = "#FFFF00";
        ctx.beginPath();        
        ctx.moveTo(((posicion.x/10) * size) + half, 
                   ((posicion.y/10) * size) + half);
        
        ctx.arc(((posicion.x/10) * size) + half, 
                ((posicion.y/10) * size) + half,
                half, 0, Math.PI * 2 * amount, true); 
        
        ctx.fill();    
    };

    function dibujo(ctx) { 

        var s     = map.medidaBloque, 
            angle = calcAngle(direccion, posicion);

        ctx.fillStyle = "#FFFF00";

        ctx.beginPath();        

        ctx.moveTo(((posicion.x/10) * s) + s / 2,
                   ((posicion.y/10) * s) + s / 2);
        
        ctx.arc(((posicion.x/10) * s) + s / 2,
                ((posicion.y/10) * s) + s / 2,
                s / 2, Math.PI * angle.start, 
                Math.PI * angle.end, angle.direccion); 
        
        ctx.fill();    
    };
    
    initUser();

    return {
        "dibujo"        : dibujo,
        "dibujoMuerto"  : dibujoMuerto,
        "perdioVida"    : perdioVida,
        "conseguirVidas": conseguirVidas,
        "puntuar"       : puntuar,
        "addPuntuar"    : addPuntuar,
        "losPuntos"     : losPuntos,
        "keyDown"       : keyDown,
        "mover"         : mover,
        "newLevel"      : newLevel,
        "reiniciar"         : reiniciar,
        "reiniciarPosicion" : reiniciarPosicion
    };
};

Pacman.Map = function (size) {
    
    var height    = null, 
        width     = null, 
        medidaBloque = size,
        pillSize  = 0,
        map       = null;
    
    function withinBounds(y, x) {
        return y >= 0 && y < height && x >= 0 && x < width;
    }
    
    function isPared(pos) {
        return withinBounds(pos.y, pos.x) && map[pos.y][pos.x] === Pacman.PARED;
    }
    
    function isFloorSpace(pos) {
        if (!withinBounds(pos.y, pos.x)) {
            return false;
        }
        var peice = map[pos.y][pos.x];
        return peice === Pacman.UNION || 
            peice === Pacman.LIBRE ||
            peice === Pacman.PILL;
    }
    
    function dibujarPared(ctx) {

        var i, j, p, linea;
        
        ctx.strokeStyle = "#0000FF";
        ctx.lineWidth   = 5;
        ctx.lineCap     = "round";
        
        for (i = 0; i < Pacman.PAREDES.length; i += 1) {
            linea = Pacman.PAREDES[i];
            ctx.beginPath();

            for (j = 0; j < linea.length; j += 1) {

                p = linea[j];
                
                if (p.mover) {
                    ctx.moveTo(p.mover[0] * medidaBloque, p.mover[1] * medidaBloque);
                } else if (p.linea) {
                    ctx.lineTo(p.linea[0] * medidaBloque, p.linea[1] * medidaBloque);
                } else if (p.curva) {
                    ctx.quadraticCurveTo(p.curva[0] * medidaBloque, 
                                         p.curva[1] * medidaBloque,
                                         p.curva[2] * medidaBloque, 
                                         p.curva[3] * medidaBloque);   
                }
            }
            ctx.stroke();
        }
    }
    
    function reiniciar() {       
        map    = Pacman.MAP.clone();
        height = map.length;
        width  = map[0].length;        
    };

    function block(pos) {
        return map[pos.y][pos.x];
    };
    
    function setBlock(pos, type) {
        map[pos.y][pos.x] = type;
    };

    

//Declaramos la funcion para accion pos comida de pastilla

    
    function dibujo(ctx) {
        
        var i, j, size = medidaBloque;
        
        
//Declaramos los colores y fuentes de nuestro cuadro
        ctx.fillStyle = "#000";
	    ctx.fillRect(0, 0, width * size, height * size);

        dibujarPared(ctx);
        
        for (i = 0; i < height; i += 1) {
		    for (j = 0; j < width; j += 1) {
			    dibujoBloque(i, j, ctx);
		    }
	    }
    };
    
    function dibujoBloque(y, x, ctx) {

        var layout = map[y][x];

        if (layout === Pacman.PILL) {
            return;
        }

        ctx.beginPath();
        
        if (layout === Pacman.UNION || layout === Pacman.ESPACIOFANTASMAS || 
            layout === Pacman.LIBRE) {
            
            ctx.fillStyle = "#000";
		    ctx.fillRect((x * medidaBloque), (y * medidaBloque), 
                         medidaBloque, medidaBloque);

            if (layout === Pacman.LIBRE) {
                ctx.fillStyle = "#000";
		        ctx.fillRect((x * medidaBloque) + (medidaBloque / 2.5), 
                             (y * medidaBloque) + (medidaBloque / 2.5), 
                             medidaBloque / 6, medidaBloque / 6);
	        }
        }
        ctx.closePath();	 
    };

    reiniciar();
    
    return {
        "dibujo"       : dibujo,
        "dibujoBloque" : dibujoBloque,
        "block"        : block,
        "setBlock"     : setBlock,
        "reiniciar"    : reiniciar,
        "isParedSpace" : isPared,
        "isFloorSpace" : isFloorSpace,
        "height"       : height,
        "width"        : width,
        "medidaBloque" : medidaBloque
    };
};

Pacman.graficos = function(juego) {
    
    var files          = [], 
        endEvents      = [],
        progressEvents = [],
        jugando        = [];
    
    function load(name, path, cb) { 

        var f = files[name] = document.createElement("graficos");

        progressEvents[name] = function(event) { progress(event, name, cb); };
        
        f.addEventListener("canplaythrough", progressEvents[name], true);
        f.setAttribute("preload", "true");
        f.setAttribute("autobuffer", "true");
        f.setAttribute("src", path);
        f.pause();        
    };

    function progress(event, name, callback) { 
        if (event.inicio === event.total && typeof callback === "function") {
            callback();
            files[name].removeEventListener("canplaythrough", 
                                            progressEvents[name], true);
        }
    };

    function disableSound() {
        for (var i = 0; i < jugando.length; i++) {
            files[jugando[i]].pause();
            files[jugando[i]].currentTime = 0;
        }
        jugando = [];
    };

    function ended(name) { 

        var i, tmp = [], found = false;

        files[name].removeEventListener("ended", endEvents[name], true);

        for (i = 0; i < jugando.length; i++) {
            if (!found && jugando[i]) { 
                found = true;
            } else { 
                tmp.push(jugando[i]);
            }
        }
        jugando = tmp;
    };

    function play(name) { 
        if (!juego.soundDisabled()) {
            endEvents[name] = function() { ended(name); };
            jugando.push(name);
            files[name].addEventListener("FIN", endEvents[name], true);
            files[name].play();
        }
    };

    function pause() { 
        for (var i = 0; i < jugando.length; i++) {
            files[jugando[i]].pause();
        }
    };
    
    function resume() { 
        for (var i = 0; i < jugando.length; i++) {
            files[jugando[i]].play();
        }        
    };
    
    return {
        "disableSound" : disableSound,
        "load"         : load,
        "play"         : play,
        "pause"        : pause,
        "resume"       : resume
    };
};

var PACMAN = (function () {

    var state        = TIEMPOESPERA,
        graficos     = null,
        ghosts       = [],
        ghostSpecs   = ["#FF0000", "#FF0000", "#FF0000"],
        eatenCount   = 0,
        level        = 0,
        tick         = 0,
        ghostPos, userPos, 
        stateChanged = true,
        cronoInicio  = null,
        lastTime     = 0,
        ctx          = null,
        cronometro   = null,
        map          = null,
        user         = null,
        stored       = null;

    function pedirCrono() { 
        return tick;
    };

    function dialog(text) {
        ctx.fillStyle = "#FFFF00";
        ctx.font      = "14px BDCartoonShoutRegular";
        var width = ctx.measureText(text).width,
            x     = ((map.width * map.medidaBloque) - width) / 2;        
        ctx.fillText(text, x, (map.height * 10) + 8);
    }

    function soundDisabled() {
        return localStorage["soundDisabled"] === "true";
    };
    
    
    //declaramos la funcion de inicio de nivel
    function inicioNivel() {        
        user.reiniciarPosicion();
        for (var i = 0; i < ghosts.length; i += 1) { 
            ghosts[i].reiniciar();
        }
        cronoInicio = tick;
        setState(CUENTAATRAS);
    }    

    //Funcion para inicio d una nueva partida y como recibimos la orden
    function nuevaPartida() {
        setState(TIEMPOESPERA);
        level = 1;
        user.reiniciar();
        map.reiniciar();
        map.dibujo(ctx);
        inicioNivel();
    }

    function keyDown(e) {
        if (e.keyCode === KEY.N) {
            nuevaPartida();
        } else if (state !== PAUSE) {   
            return user.keyDown(e);
        }
        return true;
    }    

    //Funcion para cuando se pierde una vida
    function perdioVida() {        
        setState(TIEMPOESPERA);
        user.perdioVida();
        if (user.conseguirVidas() > 0) {
            inicioNivel();
        }
    }

    function setState(nState) { 
        state = nState;
        stateChanged = true;
    };
    
    
    //FUNCION UNA VEZ CHOCADO
    function chocado(user, ghost) {
        return (Math.sqrt(Math.pow(ghost.x - user.x, 2) + 
                          Math.pow(ghost.y - user.y, 2))) < 10;
    };
    
    

    //Declaramos como queremos dibujar nuestro pie de pagina y nuestro bloque 

    function dibujoPiePagina() {
        
        var topLeft  = (map.height * map.medidaBloque),
            textBase = topLeft + 17;
        
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, topLeft, (map.width * map.medidaBloque), 30);
        
       
        for (var i = 0, len = user.conseguirVidas(); i < len; i++) {
            ctx.fillStyle = "#FFFF00";
            ctx.beginPath();
            ctx.moveTo(150 + (25 * i) + map.medidaBloque / 2,
                       (topLeft+1) + map.medidaBloque / 2);
            
            ctx.arc(150 + (25 * i) + map.medidaBloque / 2,
                    (topLeft+1) + map.medidaBloque / 2,
                    map.medidaBloque / 2, Math.PI * 0.25, Math.PI * 1.75, false);
            ctx.fill();
        }   
    }
    
    
    function pintarBloque(pos) {
        map.dibujoBloque(Math.floor(pos.y/10), Math.floor(pos.x/10), ctx);
        map.dibujoBloque(Math.ceil(pos.y/10), Math.ceil(pos.x/10), ctx);
    }

    function mainDraw() { 

        var diff, u, i, len, nPuntuar;
        
        ghostPos = [];

        for (i = 0, len = ghosts.length; i < len; i += 1) {
            ghostPos.push(ghosts[i].mover(ctx));
        }
        u = user.mover(ctx);
        
        for (i = 0, len = ghosts.length; i < len; i += 1) {
            pintarBloque(ghostPos[i].old);
        }
        pintarBloque(u.old);
        
        for (i = 0, len = ghosts.length; i < len; i += 1) {
            ghosts[i].dibujo(ctx);
        }                     
        user.dibujo(ctx);
        
        userPos = u["new"];
        
        for (i = 0, len = ghosts.length; i < len; i += 1) {
            if (chocado(userPos, ghostPos[i]["new"])) {
                if (ghosts[i].vulnerables()) { 
                    
                    ghosts[i].eat();
                    eatenCount += 1;
                    nPuntuar = eatenCount * 50;
                    user.addPuntuar(nPuntuar);                    
                    setState(EATEN_PAUSE);
                    cronoInicio = tick;
                } else if (ghosts[i].colision()) {
                    
                    setState(MUERTO);
                    cronoInicio = tick;
                }
            }
        }                             
    };
    
    
    
    //Declaramos la opcion de los estados en los cuales se encuentra el juego:

    function mainLoop() {

        var diff;

        if (state !== JUGANDO) { 
            ++tick;
        }

        if (state === JUGANDO) {
            mainDraw();
        } else if (state === TIEMPOESPERA && stateChanged) {            
            stateChanged = false;
            map.dibujo(ctx);
                     
        } else if (state === EATEN_PAUSE && 
                   (tick - cronoInicio) > (Pacman.cuadro / 3)) {
            map.dibujo(ctx);
            setState(JUGANDO);
        } else if (state === MUERTO) {
            if (tick - cronoInicio > (Pacman.cuadro * 2)) { 
                perdioVida();
            } else { 
                pintarBloque(userPos);
                for (i = 0, len = ghosts.length; i < len; i += 1) {
                    pintarBloque(ghostPos[i].old);
                    ghostPos.push(ghosts[i].dibujo(ctx));
                }                                   
                user.dibujoMuerto(ctx, (tick - cronoInicio) / (Pacman.cuadro * 2));
            }
            
            
//Se configura la cuenta atras para el comienzo del juego
        } else if (state === CUENTAATRAS) {
            
            diff = 4 + Math.floor((cronoInicio - tick) / Pacman.cuadro);
            
            if (diff === 0) {
                map.dibujo(ctx);
                setState(JUGANDO);
            } else {
                if (diff !== lastTime) { 
                    lastTime = diff;
                    map.dibujo(ctx);
                    dialog("Comienza en: " + diff);
                }
            }
        } 

        dibujoPiePagina();
    }

    
  
//Funcion que se lanza al seleccionar la tecla
    function keyPress(e) { 
        if (state !== TIEMPOESPERA && state !== JUGANDO) { 
            e.preventDefault();
            e.stopPropagation();
        }
    };
    
    
    //Creamos la funcion para darle mejor aspecto a nuestro juego
    function init(tema, root) {
        
        var i, len, ghost,
            medidaBloque = tema.offsetWidth / 19,
            canvas    = document.createElement("canvas");
        
        canvas.setAttribute("width", (medidaBloque * 19) + "px");
        canvas.setAttribute("height", (medidaBloque * 22) + 30 + "px");

        tema.appendChild(canvas);

        ctx  = canvas.getContext('2d');

        graficos = new Pacman.graficos({"soundDisabled":soundDisabled});
        map   = new Pacman.Map(medidaBloque);
        user  = new Pacman.User({ 
            
        }, map);

        for (i = 0, len = ghostSpecs.length; i < len; i += 1) {
            ghost = new Pacman.Ghost({"pedirCrono":pedirCrono}, map, ghostSpecs[i]);
            ghosts.push(ghost);
        }
        
        map.dibujo(ctx);


        var extension = Modernizr.ogg;

        var graficos_files = [
            
        ];

        load(graficos_files, function() { inicio(); });
    };

    function load(arr, callback) { 
        
        if (arr.length === 0) { 
            callback();
        } else { 
            var x = arr.pop();
            
        }
    };
    
    //DELCARAMOS LA FUNCION DE INCIO + la cuenta atras, la direccion en la que empiezan nuestros elementos y la velocidad de los elementos.
        
    function inicio() {
        
        document.addEventListener("keydown", keyDown, true);
        document.addEventListener("keypress", keyPress, true); 
        
        cronometro = window.setInterval(mainLoop, 1500 / Pacman.cuadro);
    };
    
    return {
        "init" : init
    };
    
}());

/* Declaramos la introduccion de comandos por parte del usuario que se encuentra jugando */
var KEY = {'PAUSE': 19,
           'ARROW_LEFT': 37,
           'ARROW_UP': 38,
           'ARROW_RIGHT': 39,
           'ARROW_DOWN': 40,
           'LEFT_SQUARE_BRACKET': 219,
           'REVERSE_SOLIDUS': 220,
           'RIGHT_SQUARE_BRACKET': 221,
           'APOSTROPHE': 222};

// Declaramos la funcion para que podamos utilizar las teclas necesarias, en nuestro caso numeros y lestras
(function () {
	/* 0 - 9 */
	for (var i = 48; i <= 57; i++) {
        KEY['' + (i - 48)] = i;
	}
	/* A - Z */
	for (i = 65; i <= 90; i++) {
        KEY['' + String.fromCharCode(i)] = i;
	}
	
})();


//Declaramos valores para los dibujos en nuestro cuadro

Pacman.PARED            = 0;
Pacman.LIBRE            = 1;
Pacman.UNION            = 2;
Pacman.ESPACIOFANTASMAS = 3;

Pacman.MAP = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
	[0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
	[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],
	[0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
	[0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
	[2, 2, 2, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 2, 2],
	[0, 0, 0, 0, 1, 0, 1, 0, 0, 3, 0, 0, 1, 0, 1, 0, 0, 0, 0],
	[2, 2, 2, 2, 1, 1, 1, 0, 3, 3, 3, 0, 1, 1, 1, 2, 2, 2, 2],
	[0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
	[2, 2, 2, 0, 1, 0, 1, 1, 1, 2, 1, 1, 1, 0, 1, 0, 2, 2, 2],
	[0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
	[0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
	[0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0],
	[0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
	[0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
	[0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
	[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

Pacman.PAREDES = [
    
    [{"mover": [0, 9.5]}, {"linea": [3, 9.5]},
     {"curva": [3.5, 9.5, 3.5, 9]}, {"linea": [3.5, 8]},
     {"curva": [3.5, 7.5, 3, 7.5]}, {"linea": [1, 7.5]},
     {"curva": [0.5, 7.5, 0.5, 7]}, {"linea": [0.5, 1]},
     {"curva": [0.5, 0.5, 1, 0.5]}, {"linea": [9, 0.5]},
     {"curva": [9.5, 0.5, 9.5, 1]}, {"linea": [9.5, 3.5]}],

    [{"mover": [9.5, 1]},
     {"curva": [9.5, 0.5, 10, 0.5]}, {"linea": [18, 0.5]},
     {"curva": [18.5, 0.5, 18.5, 1]}, {"linea": [18.5, 7]},
     {"curva": [18.5, 7.5, 18, 7.5]}, {"linea": [16, 7.5]},
     {"curva": [15.5, 7.5, 15.5, 8]}, {"linea": [15.5, 9]},
     {"curva": [15.5, 9.5, 16, 9.5]}, {"linea": [19, 9.5]}],

    [{"mover": [2.5, 5.5]}, {"linea": [3.5, 5.5]}],

    [{"mover": [3, 2.5]},
     {"curva": [3.5, 2.5, 3.5, 3]},
     {"curva": [3.5, 3.5, 3, 3.5]},
     {"curva": [2.5, 3.5, 2.5, 3]},
     {"curva": [2.5, 2.5, 3, 2.5]}],

    [{"mover": [15.5, 5.5]}, {"linea": [16.5, 5.5]}],

    [{"mover": [16, 2.5]}, {"curva": [16.5, 2.5, 16.5, 3]},
     {"curva": [16.5, 3.5, 16, 3.5]}, {"curva": [15.5, 3.5, 15.5, 3]},
     {"curva": [15.5, 2.5, 16, 2.5]}],

    [{"mover": [6, 2.5]}, {"linea": [7, 2.5]}, {"curva": [7.5, 2.5, 7.5, 3]},
     {"curva": [7.5, 3.5, 7, 3.5]}, {"linea": [6, 3.5]},
     {"curva": [5.5, 3.5, 5.5, 3]}, {"curva": [5.5, 2.5, 6, 2.5]}],

    [{"mover": [12, 2.5]}, {"linea": [13, 2.5]}, {"curva": [13.5, 2.5, 13.5, 3]},
     {"curva": [13.5, 3.5, 13, 3.5]}, {"linea": [12, 3.5]},
     {"curva": [11.5, 3.5, 11.5, 3]}, {"curva": [11.5, 2.5, 12, 2.5]}],

    [{"mover": [7.5, 5.5]}, {"linea": [9, 5.5]}, {"curva": [9.5, 5.5, 9.5, 6]},
     {"linea": [9.5, 7.5]}],
    [{"mover": [9.5, 6]}, {"curva": [9.5, 5.5, 10.5, 5.5]},
     {"linea": [11.5, 5.5]}],


    [{"mover": [5.5, 5.5]}, {"linea": [5.5, 7]}, {"curva": [5.5, 7.5, 6, 7.5]},
     {"linea": [7.5, 7.5]}],
    [{"mover": [6, 7.5]}, {"curva": [5.5, 7.5, 5.5, 8]}, {"linea": [5.5, 9.5]}],

    [{"mover": [13.5, 5.5]}, {"linea": [13.5, 7]},
     {"curva": [13.5, 7.5, 13, 7.5]}, {"linea": [11.5, 7.5]}],
    [{"mover": [13, 7.5]}, {"curva": [13.5, 7.5, 13.5, 8]},
     {"linea": [13.5, 9.5]}],

    [{"mover": [0, 11.5]}, {"linea": [3, 11.5]}, {"curva": [3.5, 11.5, 3.5, 12]},
     {"linea": [3.5, 13]}, {"curva": [3.5, 13.5, 3, 13.5]}, {"linea": [1, 13.5]},
     {"curva": [0.5, 13.5, 0.5, 14]}, {"linea": [0.5, 17]},
     {"curva": [0.5, 17.5, 1, 17.5]}, {"linea": [1.5, 17.5]}],
    [{"mover": [1, 17.5]}, {"curva": [0.5, 17.5, 0.5, 18]}, {"linea": [0.5, 21]},
     {"curva": [0.5, 21.5, 1, 21.5]}, {"linea": [18, 21.5]},
     {"curva": [18.5, 21.5, 18.5, 21]}, {"linea": [18.5, 18]},
     {"curva": [18.5, 17.5, 18, 17.5]}, {"linea": [17.5, 17.5]}],
    [{"mover": [18, 17.5]}, {"curva": [18.5, 17.5, 18.5, 17]},
     {"linea": [18.5, 14]}, {"curva": [18.5, 13.5, 18, 13.5]},
     {"linea": [16, 13.5]}, {"curva": [15.5, 13.5, 15.5, 13]},
     {"linea": [15.5, 12]}, {"curva": [15.5, 11.5, 16, 11.5]},
     {"linea": [19, 11.5]}],

    [{"mover": [5.5, 11.5]}, {"linea": [5.5, 13.5]}],
    [{"mover": [13.5, 11.5]}, {"linea": [13.5, 13.5]}],

    [{"mover": [2.5, 15.5]}, {"linea": [3, 15.5]},
     {"curva": [3.5, 15.5, 3.5, 16]}, {"linea": [3.5, 17.5]}],
    [{"mover": [16.5, 15.5]}, {"linea": [16, 15.5]},
     {"curva": [15.5, 15.5, 15.5, 16]}, {"linea": [15.5, 17.5]}],

    [{"mover": [5.5, 15.5]}, {"linea": [7.5, 15.5]}],
    [{"mover": [11.5, 15.5]}, {"linea": [13.5, 15.5]}],
    
    [{"mover": [2.5, 19.5]}, {"linea": [5, 19.5]},
     {"curva": [5.5, 19.5, 5.5, 19]}, {"linea": [5.5, 17.5]}],
    [{"mover": [5.5, 19]}, {"curva": [5.5, 19.5, 6, 19.5]},
     {"linea": [7.5, 19.5]}],

    [{"mover": [11.5, 19.5]}, {"linea": [13, 19.5]},
     {"curva": [13.5, 19.5, 13.5, 19]}, {"linea": [13.5, 17.5]}],
    [{"mover": [13.5, 19]}, {"curva": [13.5, 19.5, 14, 19.5]},
     {"linea": [16.5, 19.5]}],

    [{"mover": [7.5, 13.5]}, {"linea": [9, 13.5]},
     {"curva": [9.5, 13.5, 9.5, 14]}, {"linea": [9.5, 15.5]}],
    [{"mover": [9.5, 14]}, {"curva": [9.5, 13.5, 10, 13.5]},
     {"linea": [11.5, 13.5]}],

    [{"mover": [7.5, 17.5]}, {"linea": [9, 17.5]},
     {"curva": [9.5, 17.5, 9.5, 18]}, {"linea": [9.5, 19.5]}],
    [{"mover": [9.5, 18]}, {"curva": [9.5, 17.5, 10, 17.5]},
     {"linea": [11.5, 17.5]}],

    [{"mover": [8.5, 9.5]}, {"linea": [8, 9.5]}, {"curva": [7.5, 9.5, 7.5, 10]},
     {"linea": [7.5, 11]}, {"curva": [7.5, 11.5, 8, 11.5]},
     {"linea": [11, 11.5]}, {"curva": [11.5, 11.5, 11.5, 11]},
     {"linea": [11.5, 10]}, {"curva": [11.5, 9.5, 11, 9.5]},
     {"linea": [10.5, 9.5]}]
];

Object.prototype.clone = function () {
    var i, newObj = (this instanceof Array) ? [] : {};
    for (i in this) {
        if (i === 'clone') {
            continue;
        }
        if (this[i] && typeof this[i] === "object") {
            newObj[i] = this[i].clone();
        } else {
            newObj[i] = this[i];
        }
    }
    return newObj;
};
