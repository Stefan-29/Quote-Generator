function clear_screen() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

class MatrixGrafkom {

    static multiplyMatrix(m1, m2) {
        let m3 = this.createBlank();


        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                for (let k = 0; k < 3; k++) {
                    m3[i][j] += m1[i][k] * m2[k][j];
                }
            }
        }
        return m3;
    }

    static createBlank() {
        return [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
    }

    static createIdentity() {
        return [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ];
    }

    static createTranslation(t) {
        let [Tx, Ty] = t;
        return [
            [1, 0, Tx],
            [0, 1, Ty],
            [0, 0, 1],
        ];
    }

    static createScale(s) {
        let [Sx, Sy] = s
        return [
            [Sx, 0, 0],
            [0, Sy, 0],
            [0, 0, 1],
        ];
    }


    static createFixedPointScale(c, s) {
        let [Cx, Cy] = c;

        //t1 is the first translation to move the center  point to 0,0
        let t1 = this.createTranslation([-Cx, -Cy])
            // console.log(t1)
            //s1 is the scale function 
        let s1 = this.createScale(s)
            // console.log(s1)
            // t2 is the reposition translation back to its original place
        let t2 = this.createTranslation(c)
            //n1 is the action of translating and scaling on 0,0 point coordinates
        let n1 = this.multiplyMatrix(s1, t1) //translate first then scaling
        let n2 = this.multiplyMatrix(t2, n1)
            // console.log(n1)
            // console.log(n2) //returning the resulted n1 back to its original place
        return n2
    }

    static createRotation(angle) {
        console.log("masuk")
        return [
            [Math.cos(angle), -Math.sin(angle), 0],
            [Math.sin(angle), Math.cos(angle), 0],
            [0, 0, 1]
        ]
    }

    static createFixedPointRotation(c, angle) {
        let [Cx, Cy] = c;

        //t1 is the first translation to move the center  point to 0,0
        let t1 = this.createTranslation([-Cx, -Cy])
        console.log(t1)
            //s1 is the scale function 
        let r1 = this.createRotation(angle)
        console.log(r1)
            // t2 is the reposition translation back to its original place
        let t2 = this.createTranslation(c)
            //n1 is the action of translating and scaling on 0,0 point coordinates
        let n1 = this.multiplyMatrix(r1, t1) //translate first then scaling
        let n2 = this.multiplyMatrix(t2, n1)
        console.log(n1)
        console.log(n2) //returning the resulted n1 back to its original place
        return n2

    }


    static transformPoint(p, m) {
        let [x, y] = p;
        let xR = m[0][0] * x + m[0][1] * y + m[0][2];
        let yR = m[1][0] * x + m[1][1] * y + m[1][2];

        return [Math.round(xR), Math.round(yR)];
    }

    static transformPoints(points, m) {
        let result = [];
        points.forEach(p => {
            result.push(this.transformPoint(p, m));
        });
        return result;
    }

}


// function polygon(points, color) {
//     ctx.strokeStyle = color;

//     let [x0, y0] = points[0];
//     ctx.moveTo(x0, y0);
//     ctx.beginPath();
//     points.forEach((p) => {
//         let [x, y] = p;
//         ctx.lineTo(x, y);
//         ctx.moveTo(x, y);
//     });
//     ctx.lineTo(x0, y0);
//     ctx.stroke();

//     ctx.strokeStyle = "black";
// }