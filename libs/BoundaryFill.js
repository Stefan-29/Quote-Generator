//make function to make the dot
function createDot(data_info, position, color) {
    //Define variables
    let {
        x,
        y
    } = position;
    // console.log(`${x} ${y}`)
    let {
        r,
        g,
        b
    } = color;
    let i = (x + y * canvas.width) * 4;
    let a = 255;
    //console.log(i)

    data_info.data[i] = r;
    data_info.data[i + 1] = g;
    data_info.data[i + 2] = b;
    data_info.data[i + 3] = a;
}

function gambarGaris(d, x, y, warna) {
    console.log("masuk")
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
                createDot(d, {
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
                createDot(d, {
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
                createDot(d, {
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
                createDot(d, {
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
    ctx.putImageData(dataGambar, 0, 0)
}

// function rectangular(size1, size2, x, y, r, g, b) {
//     console.log("i")
//     posx = size1 + x
//     posy = size2 + y
//     for (let i = x; i <= posx; i++) {
//         console.log(i)
//         for (let j = y; j <= posy; j++) {
//             console.log(y)
//             createDot(dataGambar, {
//                 x: i,
//                 y: j
//             }, {
//                 r: r,
//                 g: g,
//                 b: b
//             });
//         }
//     }
//     ctx.putImageData(dataGambar, 0, 0)
// }

// function rectangular_clear() { //to clear the canvas 
//     rectangular(document.getElementById("myCanvas").width, document.getElementById("myCanvas").height, 0, 0, 255, 255, 255) //erase canvas

// }

function checkColor(c_current, c_to_check) {
    if ((c_current.r == c_to_check.r) && (c_current.g == c_to_check.g) && (c_current.b == c_to_check.b)) {
        return true
    } else {
        return false
    }
}

function get_color(theData, pos) {
    let {
        x,
        y
    } = pos
    let index = (x + y * canvas.width) * 4

    let r, g, b

    r = theData.data[index]
    g = theData.data[index + 1]
    b = theData.data[index + 2]

    return {
        r: r,
        g: g,
        b: b
    };
}


function boundaryFillBFS(data, pos, bound, color) {
    createDot(data, pos, color)
        //push koordinat tetangga
    coordQueue.push({
        x: pos.x,
        y: pos.y - 1
    })
    coordQueue.push({
        x: pos.x,
        y: pos.y + 1
    })
    coordQueue.push({
        x: pos.x + 1,
        y: pos.y
    })
    coordQueue.push({
        x: pos.x - 1,
        y: pos.y
    })

    while (coordQueue.length != 0) {
        // console.log(coordQueue)
        const pos = coordQueue.shift();
        //  console.log(pos)
        const pointData = get_color(data, pos); //get the point color of now

        if (!checkColor(pointData, bound) && !checkColor(pointData, color)) { //checking whether the neighbouring dot has already been colored or if it's reached the boundary
            //console.log("masuk")
            createDot(data, pos, color)

            if (!checkColor(get_color(data, {
                    x: pos.x,
                    y: pos.y - 1
                }), color) && !checkColor(get_color(data, {
                    x: pos.x,
                    y: pos.y - 1
                }), bound)) {

                coordQueue.push({
                    x: pos.x,
                    y: pos.y - 1
                })

            }
            if (!checkColor(get_color(data, {
                    x: pos.x,
                    y: pos.y + 1
                }), color) && !checkColor(get_color(data, {
                    x: pos.x,
                    y: pos.y + 1
                }), bound)) {
                coordQueue.push({
                    x: pos.x,
                    y: pos.y + 1
                })

            }
            if (!checkColor(get_color(data, {
                    x: pos.x + 1,
                    y: pos.y
                }), color) && !checkColor(get_color(data, {
                    x: pos.x + 1,
                    y: pos.y
                }), bound)) {
                coordQueue.push({
                    x: pos.x + 1,
                    y: pos.y
                })

            }
            if (!checkColor(get_color(data, {
                    x: pos.x - 1,
                    y: pos.y
                }), color) && !checkColor(get_color(data, {
                    x: pos.x - 1,
                    y: pos.y
                }), bound)) {
                coordQueue.push({
                    x: pos.x - 1,
                    y: pos.y
                })

            }
        }
    }
    ctx.putImageData(dataGambar, 0, 0)
}

function boundaryFillDFS(data, pos, bound, color) {
    createDot(data, pos, color)
        //push koordinat tetangga
    coordStack.push({
        x: pos.x,
        y: pos.y - 1
    })
    coordStack.push({
        x: pos.x,
        y: pos.y + 1
    })
    coordStack.push({
        x: pos.x + 1,
        y: pos.y
    })
    coordStack.push({
        x: pos.x - 1,
        y: pos.y
    })


    //console.log(c.r)
    while (coordStack.length != 0) {
        console.log(coordStack)
        const pos = coordStack.pop();
        const pointData = get_color(data, pos); //get the point color of now

        if (!checkColor(pointData, bound) && !checkColor(pointData, color)) { //checking whether the neighbouring dot has already been colored or if it's reached the boundary
            console.log("masuk")
            createDot(data, pos, color)

            if (!checkColor(get_color(data, {
                    x: pos.x,
                    y: pos.y - 1
                }), color) && !checkColor(get_color(data, {
                    x: pos.x,
                    y: pos.y - 1
                }), bound)) {
                console.log("check up")
                coordStack.push({
                    x: pos.x,
                    y: pos.y - 1
                })

            }
            if (!checkColor(get_color(data, {
                    x: pos.x,
                    y: pos.y + 1
                }), color) && !checkColor(get_color(data, {
                    x: pos.x,
                    y: pos.y + 1
                }), bound)) {
                console.log("check down")

                coordStack.push({
                    x: pos.x,
                    y: pos.y + 1
                })

            }
            if (!checkColor(get_color(data, {
                    x: pos.x + 1,
                    y: pos.y
                }), color) && !checkColor(get_color(data, {
                    x: pos.x + 1,
                    y: pos.y
                }), bound)) {
                console.log("check right")
                coordStack.push({
                    x: pos.x + 1,
                    y: pos.y
                })

            }
            if (!checkColor(get_color(data, {
                    x: pos.x - 1,
                    y: pos.y
                }), color) && !checkColor(get_color(data, {
                    x: pos.x - 1,
                    y: pos.y
                }), bound)) {
                console.log("check left")
                coordStack.push({
                    x: pos.x - 1,
                    y: pos.y
                })

            }

        }
    }
    ctx.putImageData(dataGambar, 0, 0)
}