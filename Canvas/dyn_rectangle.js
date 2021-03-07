let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
ctx.fillStyle = "dodgerblue";

let left_X = 10;                // левая позиция объекта
let top_Y = 10;                 // верхняя позиция объекта
let sizeX = 60;                 // ширина объекта (размер)
let sizeY = 60;                 // высота объекта
let right_X = left_X + sizeX;   // правая позиция объекта
let bottom_Y = top_Y + sizeY;   // нижняя позиция объекта
let center = [];                // координаты центра фигуры
let angleGlobal = 0,            // угол поворота
    deltaAngle = 0,             // изменение угла
    currAngle = 0,                  // текущий угол 
    angleCrash = 0;             // угол для проверки на выход за границы
let crash = false;
let point = 35;
let bordWidth = 3;
let hasMin;
let wid = 4;
let ends_rel = [right_X - 30, bottom_Y - 10];
let context = false;
ctx.fillRect(left_X, top_Y, sizeX, sizeY);

let menu = document.querySelector(".context-menu");
let activeClass = "context-menu--active";
let menuState = 0;

init();

function init() {
    contextListener();
    keyDownListener();
    changesObject();
}

//при нажатии на правую кнопку мыши
function contextListener() {

    canvas.addEventListener('contextmenu', function(event){
        event.preventDefault();
        
        x = event.pageX - canvas.offsetLeft - bordWidth;
        y = event.pageY - canvas.offsetTop - bordWidth;

        let [rel_x, rel_y] = getRelativeCoordinates(x, y);

        if (rel_y < top_Y || rel_y > bottom_Y || rel_x > right_X || rel_x < left_X) {
            point = 35;
            toggleMenuOff();
        }
        else {
            toggleMenuOn();
            positionMenu();
        }
        
    });
}

//при нажатии на esc скрытие контекстного меню
function keyDownListener() {
    console.log("keyDown");
    document.addEventListener('keydown', function(event) {
        if (event.key  === 'Escape') {
            toggleMenuOff();
        }
      });
}

//показ - скрытие контекстного меню
function toggleMenuOn() {

    if ( menuState !== 1 ) {
      menuState = 1;
      menu.classList.add(activeClass);
    }
}

function toggleMenuOff() {
    if (menuState !== 0) {
      menuState = 0;
      menu.classList.remove(activeClass);
    }
}


//Позиционирование контестного меню
function positionMenu(){
    menu.style.left =  ends_rel[0] + 30 + "px";
    menu.style.top =  ends_rel[1] + 10 + "px";
}

function changesObject(){
    let links = document.querySelectorAll('.context-menu__link');
    
    links[0].onclick = function(){
        changingObject('rotate');
    };
    links[1].onclick = function(){
        changingObject('scale');
    };
    links[2].onclick = function(){
        changingObject('move');
    };
    
}

//Изменения над объектом

function changingObject(st){

    toggleMenuOff();    //необходимо убрать контекстное меню

    let status = st;    //rotate, scale, move
    let beginX = 0,
        beginY = 0;     // начальные значения курсора
    
    let endX = 0,
        endY = 0;       // конечные значения курсора (для изменений)

    let dx = 0,
        dy = 0;         //изменение начального и конечного значений

    let canChange = false;   // разрешение на изменения
    let pointAngle = 0;      // изменение угла
    let gran;                // грань для масштабирования

    let left_top;            // относительные координаты углов прямоугольника
    let right_top;
    let left_bottom;
    let right_bottom;

    let begs_rel = [];       //относительные координаты курсора 
    let del_rel = [];

    canvas.onmousedown = function(event){

        event.preventDefault();

        if (event.buttons == 1){
            toggleMenuOff();

            center = [left_X + sizeX / 2, top_Y + sizeY / 2]; 
            begs_rel = [event.pageX - canvas.offsetLeft - bordWidth, event.pageY - canvas.offsetTop - bordWidth]; 
            [beginX, beginY] = getRelativeCoordinates(begs_rel[0], begs_rel[1]);

            if (beginY > top_Y  && beginY < bottom_Y && beginX < right_X && beginX > left_X) {  
                
                pointAngle = Math.atan2(beginX - center[0], -(beginY - center[1]));
                canChange = true;
                return;   
            }
        }
        deltaAngle = 0;
    }

    document.onmousemove = function(event){
        event.preventDefault();

        ends_rel = [event.clientX - canvas.offsetLeft - bordWidth, event.clientY - canvas.offsetTop - bordWidth];

        del_rel[0] = ends_rel[0] - begs_rel[0];
        del_rel[1] = ends_rel[1] - begs_rel[1];

        [endX, endY] = getRelativeCoordinates(ends_rel[0], ends_rel[1]);     

        if (status === 'scale'){
            if (endY > top_Y  && endY < top_Y + wid || endY > bottom_Y - wid && endY < bottom_Y || endX > right_X - wid && endX < right_X || endX < left_X + wid && endX > left_X){
                    canvas.style.cursor = "crosshair";
            }
            else canvas.style.cursor = "";
            if (endY <= top_Y || endY >= bottom_Y || endX >= right_X || endX <= left_X) canvas.style.cursor = "";
        }

        if (canChange == false) return;
  
        dx = endX - beginX;                           
        dy = endY - beginY; 
        let [l, r, b, t] = [0, canvas.width, canvas.height, 0];

        /*  Проверка на выход за границы*/
        left_top = getRelativeCoordinates(left_X, top_Y, 1, angleCrash);
        right_top = getRelativeCoordinates(right_X, top_Y, 1, angleCrash);
        left_bottom = getRelativeCoordinates(left_X, bottom_Y, 1, angleCrash);
        right_bottom = getRelativeCoordinates(right_X, bottom_Y, 1, angleCrash);

        let [crashR, crashB] = [crashBorder (0, 1, r - del_rel[0]), crashBorder(1, 1, b - del_rel[1])];
        let [crashL, crashT] = [crashBorder (0, 0, l - del_rel[0]), crashBorder (1, 0, t - del_rel[1])];

        if (crashR || crashB || crashL || crashT){         
            ctx.fillStyle = "red";
            let max = 0;
            let min = canvas.width;

            if (status === 'scale'){
                changeCoordinates();
            }

            if (crashR){
                max = Math.max(left_top[0], right_top[0], left_bottom[0], right_bottom[0]);
                center[0] = canvas.width - (max - center[0]);
            }
            if (crashB){
                max = Math.max(left_top[1], right_top[1], left_bottom[1], right_bottom[1]);
                center[1] = canvas.height - (max - center[1]);
            }
            if (crashL){
                min = Math.min(left_top[0], right_top[0], left_bottom[0], right_bottom[0]);
                center[0] = center[0] - min;
            }
            if (crashT){
                min = Math.min(left_top[1], right_top[1], left_bottom[1], right_bottom[1]);
                center[1] = center[1] - min;
            }
            left_X = center[0] - sizeX/2;
            top_Y = center[1] - sizeY/2;
            right_X = left_X + sizeX;
            bottom_Y = top_Y + sizeY;

            rotateObj('+');

            canChange = false;
            crash = true;
            return;
        }
        ctx.fillStyle = "dodgerblue";
        crash = false;

        function crashBorder(i, sign = 0, pos) {
           if (sign) {
              return (left_top[i] > pos || right_top[i] > pos || left_bottom[i] > pos || right_bottom[i] > pos);
           }
           return (left_top[i] < pos || right_top[i] < pos || left_bottom[i] < pos || right_bottom[i] < pos);
        }
        /* -----------------------------*/

        switch (status) {

            case 'rotate':
                angleGlobal = Math.atan2(endX - center[0], -(endY - center[1]));
                deltaAngle = angleGlobal - pointAngle;
                angleCrash = currAngle + deltaAngle;
                rotateObj('+');                        // '+' - по часовой (вращение)
                break;

            case 'scale':

                if (!gran){
                    if (endY >= top_Y && endY < top_Y + wid) {
                        gran = 'top';
                    }
                    if (endY > bottom_Y - wid && endY <= bottom_Y) {
                        gran = 'bottom';
                    }

                    if (endX > right_X - wid && endX <= right_X){
                        gran = 'right';
                    }
                    if (endX < left_X + wid && endX >= left_X) {
                        gran = 'left';
                    }
                }

                switch (gran) {
                    case 'right':
                        if (right_X > left_X + point){
                            right_X += dx;
                        }
                        break;
                    case 'left':
                        if (left_X < right_X - point){
                            left_X += dx;
                        }
                        break;
                        
                    case 'top':
                        if (top_Y < bottom_Y - point){
                            top_Y += dy;
                        }    
                        break;                       
                    case 'bottom':
                        if (bottom_Y > top_Y + point){
                            bottom_Y += dy;
                        }
                        break;
                }

                sizeX = right_X - left_X;
                sizeY = bottom_Y - top_Y;
                beginY = endY;
                beginX = endX;
                rotateObj('-');
                break;

            case 'move':

                center[0] += del_rel[0];
                center[1] += del_rel[1];
                left_X = center[0] - sizeX/2;  //левая позиция объекта
                top_Y = center[1] - sizeY/2;
                right_X = left_X + sizeX;
                bottom_Y = top_Y + sizeY;
                rotateObj('-');

                break;
        }

        beginY = endY;    
        beginX = endX; 
        begs_rel[0] = ends_rel[0];
        begs_rel[1] = ends_rel[1];
            
        function rotateObj(sign) {

            ctx.save();
            ctx.translate(center[0], center[1]);
    
            if (sign === '+') ctx.rotate(currAngle + deltaAngle);
            else ctx.rotate(currAngle - deltaAngle);
            
            ctx.translate(-center[0], -center[1]);
            ctx.clearRect(-100, -100, canvas.width + 200, canvas.height + 200);
            ctx.fillRect(left_X, top_Y, sizeX, sizeY);  
            ctx.restore();

        }
    } 
    
    document.onmouseup = function(event){
        event.preventDefault(); 
        
        //canvas.style.cursor = "";
        canChange = false;  //запрет на изменения
        if (point != 20) point--;

        if (status === 'rotate'){
            currAngle += deltaAngle;    //необходимо запоминать предыдущее состояние (угол)
        }
        if (status === 'scale'){
            if (!crash){
                changeCoordinates();
            }
        }
        gran = '';
    }
}

function getRelativeCoordinates(cursorX, cursorY, invert = -1, angle = currAngle) {

    let x = cursorX;
    let y = cursorY;

    let sin = Math.sin(angle * invert);
    let cos = Math.cos(angle * invert);

    x -= center[0]; 
    y -= center[1]; 

    cursorX = x * cos - y * sin + center[0]; 
    cursorY = x * sin + y * cos + center[1];

    return [cursorX, cursorY];
}

function changeCoordinates() {
    let relCenter = [left_X + sizeX/2, top_Y + sizeY/2];
    center = getRelativeCoordinates(relCenter[0], relCenter[1], 1);
    left_X = center[0] - sizeX/2;
    right_X = left_X + sizeX;
    top_Y = center[1] - sizeY/2;
    bottom_Y = top_Y + sizeY;
}