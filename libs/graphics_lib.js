function gambarTitik(data, position, color) {
    let {
        x,
        y
    } = position;
    let {
        r,
        g,
        b
    } = color;
    let index = (x + y * canvas.width) * 4;
    data.data[index] = r;
    data.data[index + 1] = g;
    data.data[index + 2] = b;
    data.data[index + 3] = 255;
}


function gambarGaris(d, x, y, warna) {
    //initialization, assign into js objects
    let {
        x1,
        x2
    } = x;
    let {
        y1,
        y2
    } = y;
    let {
        r,
        g,
        b
    } = warna;


    //check delta y or delta x to determine the iteration
    let dx = x2 - x1
    let dy = y2 - y1

    if (Math.abs(dy) > Math.abs(dx)) { //create the line using y, because it has many more components than x
        if (y1 > y2) {
            let x = x1;
            for (let y = y1; y > y2; y--) { //y1 initialize, y2 is the limit, but gradually decrease since y1 is bigger than y2
                x += dx / Math.abs(dy);
                gambarTitik(d, {
                    x: Math.round(x),
                    y: Math.round(y)
                }, {
                    r: r,
                    g: g,
                    b: b
                });
            }
        } else {
            let x = x1;

            for (let y = y1; y < y2; y++) { //y1 initialize, y2 is the limit, but gradually increase since y1 is smaller than y2
                x += dx / Math.abs(dy);
                gambarTitik(d, {
                    x: Math.round(x),
                    y: Math.round(y)
                }, {
                    r: r,
                    g: g,
                    b: b
                });
            }
        }
    } else { //create the line using x, because it has many more components than y
        if (x1 > x2) {
            let y = y1;

            for (let x = x1; x > x2; x--) { //x1 initialize, x2 is the limit, but gradually decrease since x1 is bigger than x2
                y += dy / Math.abs(dx);
                gambarTitik(d, {
                    x: Math.round(x),
                    y: Math.round(y)
                }, {
                    r: r,
                    g: g,
                    b: b
                });
            }
        } else {
            let y = y1;
            for (let x = x1; x < x2; x++) { //x1 initialize, x2 is the limit, but gradually increase since x1 is smaller than x2
                y += dy / Math.abs(dx);
                gambarTitik(d, {
                    x: Math.round(x),
                    y: Math.round(y)
                }, {
                    r: r,
                    g: g,
                    b: b
                });
            }
        }
    }
}



function polyline(data, dots, color) {
    for (let i = 0; i < dots.length - 1; i++) {
        gambarGaris(data, { x1: dots[i].x, y1: dots[i].y }, { x2: dots[i + 1].x, y2: dots[i + 1].y }, color);
    }
    ctx.putImageData(data, 0, 0);
}

function rectangular(size1, size2, pos, r, g, b) {
    let [x, y] = pos
    posx = size1 + x
    posy = size2 + y
    for (let i = x; i <= posx; i++) {
        for (let j = y; j <= posy; j++) {
            gambarTitik(dataGambar, {
                x: i,
                y: j
            }, {
                r: r,
                g: g,
                b: b
            });
        }
    }
    ctx.putImageData(dataGambar, 0, 0)
}

function rectangular_clear() { //to clear the canvas 
    rectangular(document.getElementById("myCanvas").width, document.getElementById("myCanvas").height, [0, 0], 240, 235, 210) //erase canvas

}





function rectangular_hollow_garis(size, pos, r, g, b) {
    let [size1, size2] = size
    let [x, y] = pos
    posx = size1 + x
    posy = size2 + y
    gambarGaris(dataGambar, { x1: x, x2: size1 + x }, { y1: y, y2: y }, { r: r, g: g, b: b })
    gambarGaris(dataGambar, { x1: size1 + x, x2: size1 + x }, { y1: y, y2: size2 + y }, { r: r, g: g, b: b })
    gambarGaris(dataGambar, { x1: size1 + x, x2: x }, { y1: size2 + y, y2: size2 + y }, { r: r, g: g, b: b })
    gambarGaris(dataGambar, { x1: x, x2: x }, { y1: size2 + y, y2: y }, { r: r, g: g, b: b })
    ctx.putImageData(dataGambar, 0, 0)

}

function background(r, g, b) {
    rectangular_hollow_garis([canvas.clientWidth, canvas.clientHeight], [0, 0], r, g, b)
    boundaryFillBFS(dataGambar, { x: 0, y: 0 }, { r: 0, g: 0, b: 0 }, { r: r, g: g, b: b })
}

function circleWhole(d, position, rad, warna) {
    //console.log("d")
    let {
        xc,
        yc
    } = position
    let {
        r,
        g,
        b
    } = warna;

    for (let theta = 0; theta <= 2 * Math.PI; theta += 0.01) {
        y = yc + rad * Math.sin(theta);
        x = xc + rad * Math.cos(theta);
        gambarTitik(d, {
            x: Math.round(x),
            y: Math.round(y)
        }, {
            r: r,
            g: g,
            b: b
        })


    }
    ctx.putImageData(dataGambar, 0, 0)

}

function paper(sizex, sizey, pos0) {

    rectangular_hollow_garis([sizex, sizey], pos0[0], 234, 234, 234)
    boundaryFillBFS(dataGambar, {
        x: pos0[0][0] + 125,
        y: pos0[0][1] + 125
    }, {
        r: 234,
        g: 234,
        b: 234
    }, {
        r: 234,
        g: 234,
        b: 234

    })

    for (let i = 0; i <= 100; i++) {
        gambarGaris(dataGambar, { x1: Math.ceil(Math.random() * 250) + 375, x2: Math.ceil(Math.random() * 250) + 375 }, { y1: Math.ceil(Math.random() * 250) + 375, y2: Math.ceil(Math.random() * 250) + 375 }, { r: Math.ceil(Math.random() * 33) + 200, g: Math.ceil(Math.random() * 33) + 200, b: Math.ceil(Math.random() * 33) + 200 })

    }

}

function background() {
    rectangular_hollow_garis([canvas.width - 8, canvas.height - 8], [8, 8], 234, 234, 234)
    boundaryFillBFS(dataGambar, {
        x: canvas.width * 2 / 5,
        y: canvas.height * 2 / 5
    }, {
        r: 234,
        g: 234,
        b: 234
    }, {
        r: 255,
        g: 0,
        b: 255

    })

}

function base() {
    rectangular_hollow_garis([100, 100], [canvas.width / 2 - 50, canvas.height * 7 / 8 - 50], 80, 80, 0)
    boundaryFillBFS(dataGambar, {
        x: canvas.width / 2 - 49,
        y: canvas.height * 7 / 8 - 49
    }, {
        r: 80,
        g: 80,
        b: 0
    }, {
        r: 80,
        g: 80,
        b: 80
    })
    ctx.color = "white"
    ctx.fillText("Quote", canvas.width / 2 - 50, canvas.height * 7 / 8 - 50)
}


function button(xc, yc, rad) {

    circleWhole(dataGambar, {
        xc: xc,
        yc: yc
    }, rad, {
        r: 80,
        g: 80,
        b: 0
    })
    circleWhole(dataGambar, {
        xc: xc,
        yc: yc
    }, rad - 1, {
        r: 254,
        g: 118,
        b: 157
    })
    boundaryFillBFS(dataGambar, {
        x: xc,
        y: yc
    }, {
        r: 254,
        g: 118,
        b: 157
    }, {
        r: 254,
        g: 118,
        b: 157
    })

}


function thickCircleWhole(d, position, rad, warna, thickness) {
    for (i = 0; i < thickness; i++) {
        circleWhole(d, position, rad - i, warna)
    }
}

function triangle_circular(data, center, color) {
    console.log(center)
    let pos11 = [{
            x: center[0] - canvas.width / 50,
            y: center[1] - canvas.height / 12
        }, { x: center[0], y: center[1] - canvas.height / 8 },
        { x: center[0] + canvas.width / 50, y: center[1] - canvas.height / 12 }
    ]
    console.log()
    let rotation = MatrixGrafkom.createFixedPointRotation([pos11[0].x, pos11[0].y], 3)
    let pos12 = MatrixGrafkom.transformPoints(pos11, rotation)
    console.log(pos11)
    polygon(data, pos11, color)
    polygon(data, pos12, color)
    ctx.putImageData(dataGambar, 0, 0)

}




function polygon(data, dots, color) {
    console.log("test")
    for (let i = 0; i < dots.length; i++) {
        if (dots[i + 1] == null) {
            // to check whether there's a new dot or not, if not then line will be formed to close forming to a circuit of lines
            gambarGaris(data, {
                x1: dots[i].x,
                x2: dots[0].x
            }, {
                y1: dots[i].y,
                y2: dots[0].y
            }, color);
        } else {
            //this block of code means to recreate or regenerate the lines from its original position
            //on every loop, adding the new ones as well starting from the previous dot and the final one (length-1 on dots)
            // to the newest one (i+1)

            gambarGaris(data, {
                x1: dots[i].x,
                x2: dots[i + 1].x
            }, {
                y1: dots[i].y,
                y2: dots[i + 1].y
            }, color);
        }
    }
}