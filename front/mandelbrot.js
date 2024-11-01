const canvas = document.getElementById('mandelbrotCanvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;

const xMin = -2.0, xMax = 1.0;
const yMin = -1.5, yMax = 1.5;
const maxIter = 100;

// Рассчитываем шаги по осям x и y
const xStep = (xMax - xMin) / (width - 1);
const yStep = (yMax - yMin) / (height - 1);

function mandelbrot(x, y) {
    let zx = x;
    let zy = y;
    let iter = 0;
    while (zx * zx + zy * zy <= 4 && iter < maxIter) {
        const temp = zx * zx - zy * zy + x;
        zy = 2 * zx * zy + y;
        zx = temp;
        iter++;
    }
    return iter;
}

function drawAxes() {
    ctx.strokeStyle = '#7f7f7f';
    ctx.lineWidth = 2;

    // Ось X
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    // Ось Y
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();


    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';
}

function drawMandelbrot() {
    for (let ix = 0; ix < width; ix++) {
        for (let iy = 0; iy < height; iy++) {
            const x = xMin + ix * xStep;
            const y = yMin + iy * yStep;
            const iter = mandelbrot(x, y);

            const color = iter === maxIter ? 0 : Math.floor(255 * iter / maxIter);
            ctx.fillStyle = `rgb(${color}, ${color}, ${color})`;
            ctx.fillRect(ix, iy, 1, 1);
        }
    }
}


drawMandelbrot();
drawAxes();