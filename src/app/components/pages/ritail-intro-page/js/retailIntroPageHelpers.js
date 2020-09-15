'use strict';

/***
 * Retail intro helpers
 */

/***
 * Return all canvas areas for lots in floor one
 */
function getAreaFloorOne(j, section, position, scaleX, scaleY) {
    if (j === 1) {
        // section.polygon = [
        //     {x: 0, y: 0},
        //     {x: 0, y: 100},
        //     {x: 100, y: 100},
        //     {x: 100, y: 0}
        // ];
        // console.log((position.X + 100)*scaleX);
        // section.left = (position.X + 0)*scaleX;
        // section.top = (position.Y + 0)*scaleY;
        // section.left = 799;
        section.textLeft = 799;
        section.textTop = 204;
        section.left = 740;
        // section.top = 204;
        section.top = 80;
    } else if (j === 2) {
        section = {
            width: 39,
            height: 82,
            left: 542,
            top: 430,
            angle: 0,
            scene_checked: false,
            polygonPoints: [
                {x: 130, y: 60}, // right top
                {x: 130, y: 305}, // right bottom

                // {x: 133, y: 283}, // right bottom corner
                // {x: 33, y: 311}, // left bottom corner

                {x: 0, y: 305}, // left bottom
                {x: 0, y: 0}, // left top 

                // {x: 34, y: 274}, // left top corner
                // {x: 130, y: 257} // right top corner
            ],
            polygonOptions: {
                top: 0,
                left: 0
            },
            textOptions: {
                left: 55,
                top: 150
            }
        }
    } else if (j === 3) {
        section = {
            width: 39,
            height: 82,
            left: 869,
            top: 80,
            angle: 0,
            scene_checked: false,
            polygonPoints: [
                {x: 130, y: 0}, // right top
                {x: 130, y: 140}, // right bottom

                {x: 65, y: 274}, // right bottom corner
                // {x: 33, y: 311}, // left bottom corner

                {x: 0, y: 249}, // left bottom
                {x: 0, y: 0}, // left top 

                // {x: 34, y: 274}, // left top corner
                // {x: 130, y: 257} // right top corner
            ],
            polygonOptions: {
                top: 0,
                left: 0
            },
            textOptions: {
                left: 65,
                top: 150
            }
        }
    } else if (j === 4) {
        section = {
            width: 39,
            height: 82,
            left: 130,
            top: 270,
            angle: 0,
            scene_checked: false,
            polygonPoints: [
                {x: 150, y: 45}, // right top
                {x: 103, y: 150}, // right bottom

                // {x: 65, y: 274}, // right bottom corner
                // {x: 33, y: 311}, // left bottom corner

                {x: 0, y: 105}, // left bottom
                {x: 50, y: 0}, // left top 

                // {x: 34, y: 274}, // left top corner
                // {x: 130, y: 257} // right top corner
            ],
            polygonOptions: {
                top: 0,
                left: 0
            },
            textOptions: {
                left: 80,
                top: 80
            }
        }
    } else if (j === 5) {
        section = {
            width: 39,
            height: 82,
            left: 335,
            top: 360,
            angle: 0,
            scene_checked: false,
            polygonPoints: [
                {x: 118, y: 29}, // right top
                {x: 70, y: 135}, // right bottom

                // {x: 65, y: 274}, // right bottom corner
                // {x: 33, y: 311}, // left bottom corner

                {x: 0, y: 105}, // left bottom
                {x: 50, y: 0}, // left top 

                // {x: 34, y: 274}, // left top corner
                // {x: 130, y: 257} // right top corner
            ],
            polygonOptions: {
                top: 0,
                left: 0
            },
            textOptions: {
                left: 65,
                top: 80
            }
        }
    } else if (j === 6) {
        section = {
            width: 39,
            height: 82,
            left: 405,
            top: 390,
            angle: 0,
            scene_checked: false,
            polygonPoints: [
                {x: 133, y: 37}, // right top
                {x: 85, y: 144}, // right bottom

                // {x: 65, y: 274}, // right bottom corner
                // {x: 33, y: 311}, // left bottom corner

                {x: 0, y: 105}, // left bottom
                {x: 50, y: 0}, // left top 

                // {x: 34, y: 274}, // left top corner
                // {x: 130, y: 257} // right top corner
            ],
            polygonOptions: {
                top: 0,
                left: 0
            },
            textOptions: {
                left: 80,
                top: 80
            }
        }
    } else if (j === 8) {
        section = {
            width: 39,
            height: 82,
            left: 233,
            top: 314,
            angle: 0,
            scene_checked: false,
            polygonPoints: [
                {x: 150, y: 45}, // right top
                {x: 103, y: 150}, // right bottom

                // {x: 65, y: 274}, // right bottom corner
                // {x: 33, y: 311}, // left bottom corner

                {x: 0, y: 105}, // left bottom
                {x: 50, y: 0}, // left top 

                // {x: 34, y: 274}, // left top corner
                // {x: 130, y: 257} // right top corner
            ],
            polygonOptions: {
                top: 0,
                left: 0
            },
            textOptions: {
                left: 80,
                top: 80
            }
        }
    } else if (j === 9) {
        section = {
            width: 39,
            height: 82,
            left: 249,
            top: 630,
            angle: 0,
            scene_checked: false,
            polygonPoints: [
                {x: 150, y: 0}, // right top
                {x: 150, y: 105}, // right bottom

                // {x: 133, y: 283}, // right bottom corner
                // {x: 33, y: 311}, // left bottom corner

                {x: 0, y: 105}, // left bottom
                {x: 0, y: 0}, // left top 

                // {x: 34, y: 274}, // left top corner
                // {x: 130, y: 257} // right top corner
            ],
            polygonOptions: {
                top: 0,
                left: 0
            },
            textOptions: {
                left: 80,
                top: 55
            }
        }
    } else if (j === 10) {
        section = {
            width: 39,
            height: 82,
            left: 18,
            top: 632,
            angle: 0,
            scene_checked: false,
            polygonPoints: [
                {x: 110, y: 0}, // right top
                {x: 110, y: 105}, // right bottom

                // {x: 133, y: 283}, // right bottom corner
                // {x: 33, y: 311}, // left bottom corner

                {x: 0, y: 105}, // left bottom
                {x: 0, y: 0}, // left top 

                // {x: 34, y: 274}, // left top corner
                // {x: 130, y: 257} // right top corner
            ],
            polygonOptions: {
                top: 0,
                left: 0
            },
            textOptions: {
                left: 60,
                top: 55
            }
        }
    } else if (j === 11) {
        section = {
            width: 39,
            height: 82,
            left: 672,
            top: 489,
            angle: 0,
            scene_checked: false,
            polygonPoints: [
                {x: 130, y: 60}, // right top
                {x: 130, y: 250}, // right bottom

                // {x: 133, y: 283}, // right bottom corner
                // {x: 33, y: 311}, // left bottom corner

                {x: 0, y: 250}, // left bottom
                {x: 0, y: 0}, // left top 

                // {x: 34, y: 274}, // left top corner
                // {x: 130, y: 257} // right top corner
            ],
            polygonOptions: {
                top: 0,
                left: 0
            },
            textOptions: {
                left: 55,
                top: 150
            }
        }
    } else if (j === 12) {
        section = {
            width: 39,
            height: 82,
            left: 18,
            top: 326,
            angle: 0,
            scene_checked: false,
            polygonPoints: [
                {x: 308, y: 138}, // right top
                {x: 308, y: 150}, // right bottom

                // {x: 133, y: 283}, // right bottom corner
                // {x: 33, y: 311}, // left bottom corner

                {x: 0, y: 150}, // left bottom
                {x: 0, y: 0}, // left top 

                // {x: 34, y: 274}, // left top corner
                // {x: 130, y: 257} // right top corner
            ],
            polygonOptions: {
                top: 0,
                left: 0
            },
            textOptions: {
                left: 110,
                top: 105
            }
        }
    } else if (j === 13) {
        section = {
            width: 39,
            height: 82,
            left: 129,
            top: 630,
            angle: 0,
            scene_checked: false,
            polygonPoints: [
                {x: 120, y: 0}, // right top
                {x: 120, y: 105}, // right bottom

                // {x: 133, y: 283}, // right bottom corner
                // {x: 33, y: 311}, // left bottom corner

                {x: 0, y: 105}, // left bottom
                {x: 0, y: 0}, // left top 

                // {x: 34, y: 274}, // left top corner
                // {x: 130, y: 257} // right top corner
            ],
            polygonOptions: {
                top: 0,
                left: 0
            },
            textOptions: {
                left: 60,
                top: 55
            }
        }
    } else if (j === 14) {
        section = {
            width: 39,
            height: 82,
            left: 18,
            top: 208,
            angle: 0,
            scene_checked: false,
            polygonPoints: [
                {x: 160, y: 59}, // right top
                {x: 113, y: 164}, // right bottom

                // {x: 65, y: 274}, // right bottom corner
                // {x: 33, y: 311}, // left bottom corner

                {x: 0, y: 115}, // left bottom
                {x: 0, y: 0}, // left top 

                {x: 34, y: 0}, // left top corner
                // {x: 130, y: 257} // right top corner
            ],
            polygonOptions: {
                top: 0,
                left: 0
            },
            textOptions: {
                left: 80,
                top: 80
            }
        }
    } else if (j === 15) {
        section = {
            width: 39,
            height: 82,
            left: 1225,
            top: 171,
            angle: 0,
            scene_checked: false,
            polygonPoints: [
                {x: 110, y: 0}, // right top
                {x: 110, y: 112}, // right bottom

                // {x: 133, y: 283}, // right bottom corner
                // {x: 33, y: 311}, // left bottom corner

                {x: 0, y: 112}, // left bottom
                {x: 0, y: 0}, // left top 

                // {x: 34, y: 274}, // left top corner
                // {x: 130, y: 257} // right top corner
            ],
            polygonOptions: {
                top: 0,
                left: 0
            },
            textOptions: {
                left: 55,
                top: 55
            }
        }
    } else if (j === 16) {
        section = {
            width: 39,
            height: 82,
            left: 1200,
            top: 493,
            angle: 0,
            scene_checked: false,
            polygonPoints: [
                {x: 136, y: 0}, // right top
                {x: 136, y: 112}, // right bottom

                // {x: 133, y: 283}, // right bottom corner
                // {x: 33, y: 311}, // left bottom corner

                {x: 0, y: 112}, // left bottom
                {x: 0, y: 0}, // left top 

                // {x: 34, y: 274}, // left top corner
                // {x: 130, y: 257} // right top corner
            ],
            polygonOptions: {
                top: 0,
                left: 0
            },
            textOptions: {
                left: 75,
                top: 55
            }
        }
    } else if (j === 17) {
        section = {
            width: 39,
            height: 82,
            left: 912,
            top: 595,
            angle: 0,
            scene_checked: false,
            polygonPoints: [
                {x: 105, y: 49}, // right top
                {x: 105, y: 140}, // right bottom

                // {x: 133, y: 283}, // right bottom corner
                // {x: 33, y: 311}, // left bottom corner

                {x: 0, y: 140}, // left bottom
                {x: 0, y: 0}, // left top 

                // {x: 34, y: 274}, // left top corner
                // {x: 130, y: 257} // right top corner
            ],
            polygonOptions: {
                top: 0,
                left: 0
            },
            textOptions: {
                left: 55,
                top: 80
            }
        }
    } else if (j === 18) {
        section = {
            width: 39,
            height: 82,
            left: 401,
            top: 495,
            angle: 0,
            scene_checked: false,
            polygonPoints: [
                {x: 140, y: 65}, // right top
                {x: 140, y: 244}, // right bottom

                // {x: 133, y: 283}, // right bottom corner
                // {x: 33, y: 311}, // left bottom corner

                {x: 0, y: 244}, // left bottom
                {x: 0, y: 0}, // left top 

                // {x: 34, y: 274}, // left top corner
                // {x: 130, y: 257} // right top corner
            ],
            polygonOptions: {
                top: 0,
                left: 0
            },
            textOptions: {
                left: 55,
                top: 150
            }
        }
    } else if (j === 19) {
        section = {
            width: 39,
            height: 82,
            left: 18,
            top: 465,
            angle: 0,
            scene_checked: false,
            polygonPoints: [
                {x: 380, y: 32}, // right top
                {x: 380, y: 162}, // right bottom

                {x: 115, y: 162}, // right bottom corner
                {x: 115, y: 117}, // left bottom corner

                {x: 0, y: 117}, // left bottom
                {x: 0, y: 13}, // left top 

                {x: 310, y: 13}, // left top corner
                {x: 310, y: 0} // right top corner
            ],
            polygonOptions: {
                top: 0,
                left: 0
            },
            textOptions: {
                left: 195,
                top: 85
            }
        }
    } else if (j === 20) {
        section = {
            width: 39,
            height: 82,
            left: 396,
            top: 266,
            angle: 0,
            scene_checked: false,
            polygonPoints: [
                {x: 98, y: 23}, // right top
                {x: 70, y: 78}, // right bottom

                // {x: 65, y: 274}, // right bottom corner
                // {x: 33, y: 311}, // left bottom corner

                {x: 22, y: 57}, // left bottom
                {x: 50, y: 0}, // left top 

                // {x: 34, y: 274}, // left top corner
                // {x: 130, y: 257} // right top corner
            ],
            polygonOptions: {
                top: 0,
                left: 0
            },
            textOptions: {
                left: 40,
                top: 40
            }
        }
    } else if (j === 21) {
        section = {
            width: 39,
            height: 82,
            left: 431,
            top: 185,
            angle: 0,
            scene_checked: false,
            polygonPoints: [
                {x: 98, y: 23}, // right top
                {x: 72, y: 79}, // right bottom

                // {x: 65, y: 274}, // right bottom corner
                // {x: 33, y: 311}, // left bottom corner

                {x: 22, y: 57}, // left bottom
                {x: 50, y: 0}, // left top 

                // {x: 34, y: 274}, // left top corner
                // {x: 130, y: 257} // right top corner
            ],
            polygonOptions: {
                top: 0,
                left: 0
            },
            textOptions: {
                left: 40,
                top: 40
            }
        }
    } else if (j === 23) {
        section = {
            width: 39,
            height: 82,
            left: 485,
            top: 105,
            angle: 0,
            scene_checked: false,
            polygonPoints: [
                {x: 118, y: 32}, // right top
                {x: 95, y: 82}, // right bottom

                // {x: 65, y: 274}, // right bottom corner
                // {x: 33, y: 311}, // left bottom corner

                {x: 22, y: 53}, // left bottom
                {x: 45, y: 0}, // left top 

                // {x: 34, y: 274}, // left top corner
                // {x: 130, y: 257} // right top corner
            ],
            polygonOptions: {
                top: 0,
                left: 0
            },
            textOptions: {
                left: 50,
                top: 45
            }
        }
    } else if (j === 24) {
        section = {
            width: 39,
            height: 82,
            left: 600,
            top: 130,
            angle: 0
        }
    } else if (j === 25) {
        section = {
            width: 39,
            height: 82,
            left: 803,
            top: 548,
            angle: 0,
            scene_checked: false,
            polygonPoints: [
                {x: 107, y: 49}, // right top
                {x: 107, y: 187}, // right bottom

                // {x: 133, y: 283}, // right bottom corner
                // {x: 33, y: 311}, // left bottom corner

                {x: 0, y: 187}, // left bottom
                {x: 0, y: 0}, // left top 

                // {x: 34, y: 274}, // left top corner
                // {x: 130, y: 257} // right top corner
            ],
            polygonOptions: {
                top: 0,
                left: 0
            },
            textOptions: {
                left: 57,
                top: 100
            }
        }
    }
    return section;
}

/***
 * Return all canvas areas for lots in floor two
 */
function getAreaFloorTwo(j, section, position, scaleX, scaleY) {
    if (j === 1) { //use
        section = {
            width: 35,
            height: 77,
            left: 5,
            top: 70,
            angle: 0,
            scene_checked: false,
            polygonPoints: [
                {x: 280, y: 0}, // right top
                {x: 212, y: 145}, // right bottom

                // {x: 133, y: 283}, // right bottom corner
                // {x: 33, y: 311}, // left bottom corner

                {x: 0, y: 50}, // left bottom
                {x: 8, y: 20}, 
                {x: 40, y: 0}, // left top 

                // {x: 34, y: 274}, // left top corner
                // {x: 130, y: 257} // right top corner
            ],
            polygonOptions: {
                top: 0,
                left: 0
            },
            textOptions: {
                left: 157,
                top: 70
            }
        }
    } else if (j === 2) { //use
        section = {
            width: 35,
            height: 77,
            left: 5,
            top: 120,
            angle: 0,
            scene_checked: false,
            polygonPoints: [
                {x: 212, y: 95}, // right top
                {x: 132, y: 273}, // right bottom

                // {x: 133, y: 283}, // right bottom corner
                // {x: 33, y: 311}, // left bottom corner

                {x: 30, y: 227}, // left bottom
                {x: 0, y: 190},
                {x: 0, y: 0}, // left top 

                // {x: 34, y: 274}, // left top corner
                // {x: 130, y: 257} // right top corner
            ],
            polygonOptions: {
                top: 0,
                left: 0
            },
            textOptions: {
                left: 100,
                top: 150
            }
        }
    } else if (j === 3) { //use
        section = {
            width: 30,
            height: 77,
            left: 324,
            top: 355,
            angle: 0,
            scene_checked: false,
            polygonPoints: [
                {x: 111, y: 27}, // right top
                {x: 61, y: 142}, // right bottom

                // {x: 133, y: 283}, // right bottom corner
                // {x: 33, y: 311}, // left bottom corner

                {x: 0, y: 114}, // left bottom
                {x: 50, y: 0}, // left top 

                // {x: 34, y: 274}, // left top corner
                // {x: 130, y: 257} // right top corner
            ],
            polygonOptions: {
                top: 0,
                left: 0
            },
            textOptions: {
                left: 50,
                top: 65
            }
        }
    } else if (j === 4) { // use
        section = {
            width: 35,
            height: 77,
            left: 388,
            top: 383,
            angle: 0,
            scene_checked: false,
            polygonPoints: [
                {x: 151, y: 45}, // right top
                {x: 98, y: 160}, // right bottom

                // {x: 133, y: 283}, // right bottom corner
                // {x: 33, y: 311}, // left bottom corner

                {x: 0, y: 116}, // left bottom
                {x: 50, y: 0}, // left top 

                // {x: 34, y: 274}, // left top corner
                // {x: 130, y: 257} // right top corner
            ],
            polygonOptions: {
                top: 0,
                left: 0
            },
            textOptions: {
                left: 65,
                top: 75
            }
        }
    } else if (j === 5) { //use
        section = {
            width: 35,
            height: 77,
            left: 490,
            top: 429,
            angle: 0,
            scene_checked: false,
            polygonPoints: [
                {x: 151, y: 45}, // right top
                {x: 98, y: 160}, // right bottom

                // {x: 133, y: 283}, // right bottom corner
                // {x: 33, y: 311}, // left bottom corner

                {x: 0, y: 116}, // left bottom
                {x: 50, y: 0}, // left top 

                // {x: 34, y: 274}, // left top corner
                // {x: 130, y: 257} // right top corner
            ],
            polygonOptions: {
                top: 0,
                left: 0
            },
            textOptions: {
                left: 65,
                top: 75
            }
        }
    } else if (j === 6) { // Use
        section = {
            width: 32,
            height: 68,
            left: 593,
            top: 475,
            angle: 0,
            scene_checked: false,
            polygonPoints: [
                {x: 151, y: 45}, // right top
                {x: 98, y: 160}, // right bottom

                // {x: 133, y: 283}, // right bottom corner
                // {x: 33, y: 311}, // left bottom corner

                {x: 0, y: 116}, // left bottom
                {x: 50, y: 0}, // left top 

                // {x: 34, y: 274}, // left top corner
                // {x: 130, y: 257} // right top corner
            ],
            polygonOptions: {
                top: 0,
                left: 0
            },
            textOptions: {
                left: 65,
                top: 75
            }
        }
    } else if (j === 7) { // use
        section = {
            width: 35,
            height: 77,
            left: 798,
            top: 566,
            angle: 0,
            scene_checked: false,
            polygonPoints: [
                {x: 151, y: 45}, // right top
                {x: 98, y: 160}, // right bottom

                // {x: 133, y: 283}, // right bottom corner
                // {x: 33, y: 311}, // left bottom corner

                {x: 0, y: 116}, // left bottom
                {x: 50, y: 0}, // left top 

                // {x: 34, y: 274}, // left top corner
                // {x: 130, y: 257} // right top corner
            ],
            polygonOptions: {
                top: 0,
                left: 0
            },
            textOptions: {
                left: 65,
                top: 75
            }
        }
    } else if (j === 8) { // use
        section = {
            width: 35,
            height: 77,
            left: 696,
            top: 520,
            angle: 0,
            scene_checked: false,
            polygonPoints: [
                {x: 151, y: 45}, // right top
                {x: 98, y: 160}, // right bottom

                // {x: 133, y: 283}, // right bottom corner
                // {x: 33, y: 311}, // left bottom corner

                {x: 0, y: 116}, // left bottom
                {x: 50, y: 0}, // left top 

                // {x: 34, y: 274}, // left top corner
                // {x: 130, y: 257} // right top corner
            ],
            polygonOptions: {
                top: 0,
                left: 0
            },
            textOptions: {
                left: 65,
                top: 75
            }
        }
    } else if (j === 9) { // use
        section = {
            width: 32,
            height: 68,
            left: 470,
            top: 70,
            angle: 0,
            scene_checked: false,
            polygonPoints: [
                {x: 105, y: 0}, // right top
                {x: 60, y: 100}, // right bottom

                // {x: 133, y: 283}, // right bottom corner
                // {x: 33, y: 311}, // left bottom corner

                {x: 0, y: 76}, // left bottom
                {x: 30, y: 0}, // left top 

                // {x: 34, y: 274}, // left top corner
                // {x: 130, y: 257} // right top corner
            ],
            polygonOptions: {
                top: 0,
                left: 0
            },
            textOptions: {
                left: 40,
                top: 40
            }
        }
    } else if (j === 10) { //use
        section = {
            width: 35,
            height: 77,
            left: 529,
            top: 70,
            angle: 0,
            scene_checked: false,
            polygonPoints: [
                {x: 155, y: 35}, // right top
                {x: 104, y: 147}, // right bottom

                // {x: 133, y: 283}, // right bottom corner
                // {x: 33, y: 311}, // left bottom corner

                {x: 0, y: 103}, // left bottom
                {x: 50, y: 0}, // left top 

                {x: 78, y: 0}, // left top corner
                // {x: 130, y: 257} // right top corner
            ],
            polygonOptions: {
                top: 0,
                left: 0
            },
            textOptions: {
                left: 70,
                top: 60
            }
        }
    } else if (j === 11) { // use
        section = {
            width: 35,
            height: 77,
            left: 635,
            top: 102,
            angle: 0,
            scene_checked: false,
            polygonPoints: [
                {x: 151, y: 45}, // right top
                {x: 98, y: 160}, // right bottom

                // {x: 133, y: 283}, // right bottom corner
                // {x: 33, y: 311}, // left bottom corner

                {x: 0, y: 116}, // left bottom
                {x: 50, y: 0}, // left top 

                // {x: 34, y: 274}, // left top corner
                // {x: 130, y: 257} // right top corner
            ],
            polygonOptions: {
                top: 0,
                left: 0
            },
            textOptions: {
                left: 65,
                top: 75
            }
        }
    } else if (j === 12) { // use
        section = {
            width: 32,
            height: 68,
            left: 736,
            top: 149,
            angle: 0,
            scene_checked: false,
            polygonPoints: [
                {x: 151, y: 45}, // right top
                {x: 98, y: 160}, // right bottom

                // {x: 133, y: 283}, // right bottom corner
                // {x: 33, y: 311}, // left bottom corner

                {x: 0, y: 116}, // left bottom
                {x: 50, y: 0}, // left top 

                // {x: 34, y: 274}, // left top corner
                // {x: 130, y: 257} // right top corner
            ],
            polygonOptions: {
                top: 0,
                left: 0
            },
            textOptions: {
                left: 65,
                top: 75
            }
        }
    } else if (j === 13) { // use
        section = {
            width: 35,
            height: 77,
            left: 838,
            top: 195,
            angle: 0,
            scene_checked: false,
            polygonPoints: [
                {x: 120, y: 33}, // right top
                {x: 66, y: 142}, // right bottom

                // {x: 133, y: 283}, // right bottom corner
                // {x: 33, y: 311}, // left bottom corner

                {x: 0, y: 116}, // left bottom
                {x: 50, y: 0}, // left top 

                // {x: 34, y: 274}, // left top corner
                // {x: 130, y: 257} // right top corner
            ],
            polygonOptions: {
                top: 0,
                left: 0
            },
            textOptions: {
                left: 55,
                top: 65
            }
        }
    } else if (j === 14) { // use
        section = {
            width: 35,
            height: 77,
            left: 899,
            top: 242,
            angle: 0,
            scene_checked: false,
            polygonPoints: [
                {x: 636, y: 265}, // right top
                {x: 636, y: 470}, // right bottom

                {x: 607, y: 500}, // right bottom corner
                {x: 30, y: 500}, // left bottom corner

                {x: 0, y: 485}, // left bottom
                {x: 65, y: 336},
                {x: 186, y: 390},
                {x: 250, y: 249},
                {x: 200, y: 225},
                {x: 217, y: 190},
                {x: 43, y: 112},
                {x: 90, y: 0}, // left top 

                // {x: 34, y: 274}, // left top corner
                {x: 623, y: 239} // right top corner
            ],
            polygonOptions: {
                top: 0,
                left: 0
            },
            textOptions: {
                left: 355,
                top: 305
            }
        }
    }
    return section;
}

/***
 * List of lots in floor one
 */
const ritailsFloorOne =  [
    {
        id: 1,
        rent: '22 206 800 ₽',
        area: 95.89,
        floor: 1
    },
    {
        id: 2,
        rent: '22 206 800 ₽',
        area: 99.50,
        floor: 1
    },
    {
        id: 3,
        rent: '22 206 800 ₽',
        area: 85.06,
        floor: 1
    },
    {
        id: 4,
        rent: '22 206 800 ₽',
        area: 35.13,
        floor: 1
    },
    {
        id: 5,
        rent: '22 206 800 ₽',
        area: 23.13,
        floor: 1
    },
    {
        id: 6,
        rent: '22 206 800 ₽',
        area: 39.01,
        floor: 1
    },
    {
        id: 8,
        rent: '22 206 800 ₽',
        area: 34.81,
        floor: 1
    }, {
        id: 9,
        rent: '22 206 800 ₽',
        area: 44.52,
        floor: 1
    }, {
        id: 10,
        rent: '22 206 800 ₽',
        area: 30.30,
        floor: 1
    }, {
        id: 11,
        rent: '22 206 800 ₽',
        area: 78.21,
        floor: 1
    }, {
        id: 12,
        rent: '22 206 800 ₽',
        area: 61.12,
        floor: 1
    }, {
        id: 13,
        rent: '22 206 800 ₽',
        area: 34.61,
        floor: 1
    }, {
        id: 14,
        rent: '22 206 800 ₽',
        area: 44.91,
        floor: 1
    }, {
        id: 15,
        rent: '22 206 800 ₽',
        area: 308.26,
        floor: 1
    }, {
        id: 16,
        rent: '22 206 800 ₽',
        area: 243.76,
        floor: 1
    }, {
        id: 17,
        rent: '22 206 800 ₽',
        area: 32.19,
        floor: 1
    }, {
        id: 18,
        rent: '22 206 800 ₽',
        area: 76.53,
        floor: 1
    }, {
        id: 19,
        rent: '22 206 800 ₽',
        area: 136.30,
        floor: 1
    }, {
        id: 20,
        rent: '22 206 800 ₽',
        area: 9.38,
        floor: 1
    }, {
        id: 21,
        rent: '22 206 800 ₽',
        area: 9.39,
        floor: 1
    }, {
        id: 23,
        rent: '22 206 800 ₽',
        area: 14.23,
        floor: 1
    }, {
        id: 25,
        rent: '22 206 800 ₽',
        area: 46.25,
        floor: 1
    },
];

/***
 * List of lots in floor two
 */
const ritailsFloorTwo =  [
    {
        id: 1,
        rent: '22 206 800 ₽',
        area: 64.14,
        floor: 2
    },  {
        id: 2,
        rent: '22 206 800 ₽',
        area: 97.62,
        floor: 2
    },{
        id: 3,
        rent: '22 206 800 ₽',
        area: 22.83,
        floor: 2
    },{
        id: 4,
        rent: '22 206 800 ₽',
        area: 36.52,
        floor: 2
    },{
        id: 5,
        rent: '22 206 800 ₽',
        area: 36.52,
        floor: 2
    },{
        id: 6,
        rent: '22 206 800 ₽',
        area: 36.52,
        floor: 2
    },{
        id: 7,
        rent: '22 206 800 ₽',
        area: 36.52,
        floor: 2
    },{
        id: 8,
        rent: '22 206 800 ₽',
        area: 36.52,
        floor: 2
    },{
        id: 9,
        rent: '22 206 800 ₽',
        area: 16.43,
        floor: 2
    },{
        id: 10,
        rent: '22 206 800 ₽',
        area: 35.58,
        floor: 2
    },{
        id: 11,
        rent: '22 206 800 ₽',
        area: 36.50,
        floor: 2
    },{
        id: 12,
        rent: '22 206 800 ₽',
        area: 36.50,
        floor: 2
    },{
        id: 13,
        rent: '22 206 800 ₽',
        area: 23.22,
        floor: 2
    },{
        id: 14,
        rent: '22 206 800 ₽',
        area: 541.18,
        floor: 2
    },
];

/***
 * Exports
 */
module.exports = {
    getAreaFloorOne,
    getAreaFloorTwo,
    ritailsFloorOne,
    ritailsFloorTwo
};
