const juliacanv = document.getElementById('juliaCanvas');
const ctx1 = juliacanv.getContext('2d');
const widthJulia = juliacanv.width;
const heightJulia = juliacanv.height;

const xMinJulia = -2.0, xMaxJulia = 2.0;
const yMinJulia = -2.0, yMaxJulia = 2.0;
const maxIterJulia = 200;
const c = { x: -0.5251993, y: 0.5251993 };

// Рассчитываем шаги по осям x и y
const xStepJulia = (xMaxJulia - xMinJulia) / (widthJulia - 1);
const yStepJulia = (yMaxJulia - yMinJulia) / (heightJulia - 1);


function drawAxesJulia() {
    ctx1.strokeStyle = '#7f7f7f';
    ctx1.lineWidth = 2;

    // Ось X
    ctx1.beginPath();
    ctx1.moveTo(0, heightJulia / 2);
    ctx1.lineTo(widthJulia, heightJulia / 2);
    ctx1.stroke();

    // Ось Y
    ctx1.beginPath();
    ctx1.moveTo(widthJulia / 2, 0);
    ctx1.lineTo(widthJulia/ 2, heightJulia);
    ctx1.stroke();


    ctx1.fillStyle = 'black'; // Черный цвет для текста
    ctx1.font = '16px Arial';

}




// Функция для вычисления числа итераций для заданной точки
function julia(x, y) {
    let iter = 0;
    while (x * x + y * y <= 4 && iter < maxIterJulia) {
        const temp = x * x - y * y + c.x;
        y = 2 * x * y + c.y;
        x = temp;
        iter++;
    }
    return iter;
}

// Функция для рисования множества Жюлиа
function drawJulia() {
    for (let ix = 0; ix < widthJulia; ix++) {
        for (let iy = 0; iy < heightJulia; iy++) {
            const x = xMinJulia + ix * xStepJulia;
            const y = yMinJulia + iy * yStepJulia;
            const iter = julia(x, y);


            const color = iter === maxIterJulia ? 0 : Math.floor(255 * iter / maxIterJulia);
            ctx1.fillStyle = `rgb(${color}, ${color}, ${color})`;
            ctx1.fillRect(ix, iy, 1, 1);
        }
    }
}

drawJulia();
drawAxesJulia()