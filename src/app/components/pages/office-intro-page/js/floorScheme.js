
class FloorScheme {
    constructor (floor) {
        console.log('INiTED')
        const element = document.getElementById('floorWorkspace')
        this.floor = floor
        this.imgDir = 'static/office/'
        // this.floorImgName = 'office-floor-1'
        // this.imgFormat = '.png'
        this.floorImgName = 'office-floor-2'
        this.imgFormat = '.svg'
        this.cWidth = 300
        this.cHeight = 350

        this.floorsData = {
            1: {
                points: [
                    {x: 171, y: 231}, // right top
                    {x: 171, y: 249}, // right bottom

                    {x: 133, y: 283}, // right bottom corner
                    {x: 33, y: 311}, // left bottom corner

                    {x: 0, y: 297}, // left bottom
                    {x: 0, y: 266}, // left top 

                    {x: 34, y: 274}, // left top corner
                    {x: 130, y: 257} // right top corner
                ],
                sectionOffset: {
                    left: 42,
                    top: 213,
                    angle: 0,
                    //   fill: '#306AD0'
                    fill: '#306AD0'
                },
                floor: '1',
                textPoints: {
                    left: 15, 
                    top: 249,
                    fontSize: 30,
                    fill: '#306AD0'
                }
            },
            2: {
                points: [
                    {x: 171, y: 222}, // right top
                    {x: 171, y: 230}, // right bottom

                    {x: 131, y: 254}, // right bottom corner
                    {x: 32, y: 272}, // left bottom corner

                    {x: 0, y: 263}, // left bottom
                    {x: 0, y: 251}, // left top 

                    {x: 33, y: 259}, // left top corner
                    {x: 130, y: 244} // right top corner
                ],
                sectionOffset: {
                    left: 42,
                    top: 202,
                    angle: 0,
                    //   fill: '#306AD0'
                    fill: '#306AD0'
                },
                floor: '2',
                textPoints: {
                    left: 10, 
                    top: 222,
                    fontSize: 30,
                    fill: '#306AD0'
                }
            },
            3: {
                points: [
                    {x: 171, y: 213}, // right top
                    {x: 171, y: 219}, // right bottom

                    {x: 130, y: 239}, // right bottom corner
                    {x: 33, y: 254}, // left bottom corner

                    {x: 0, y: 246}, // left bottom
                    {x: 0, y: 234}, // left top 

                    {x: 32, y: 239}, // left top corner
                    {x: 128, y: 229} // right top corner
                ],
                sectionOffset: {
                    left: 42,
                    top: 194,
                    angle: 0,
                    //   fill: '#306AD0'
                    fill: '#306AD0'
                },
                floor: '3',
                textPoints: {
                    left: 10, 
                    top: 208,
                    fontSize: 30,
                    fill: '#306AD0'
                }
            },
            4: {
                points: [
                    {x: 171, y: 202}, // right top
                    {x: 171, y: 209}, // right bottom

                    {x: 129, y: 223}, // right bottom corner
                    {x: 35, y: 234}, // left bottom corner

                    {x: 0, y: 229}, // left bottom
                    {x: 0, y: 218}, // left top 

                    {x: 35, y: 221}, // left top corner
                    {x: 122, y: 214} // right top corner
                ],
                sectionOffset: {
                    left: 42,
                    top: 184,
                    angle: 0,
                    //   fill: '#306AD0'
                    fill: '#306AD0'
                },
                floor: '4',
                textPoints: {
                    left: 10, 
                    top: 190,
                    fontSize: 30,
                    fill: '#306AD0'
                }
            },
            5: {
                points: [
                    {x: 171, y: 196}, // right top
                    {x: 171, y: 202}, // right bottom

                    {x: 131, y: 211}, // right bottom corner
                    {x: 31, y: 219}, // left bottom corner

                    {x: 0, y: 215}, // left bottom
                    {x: 0, y: 204}, // left top 

                    {x: 34, y: 207}, // left top corner
                    {x: 118, y: 203} // right top corner
                ],
                sectionOffset: {
                    left: 42,
                    top: 175,
                    angle: 0,
                    //   fill: '#306AD0'
                    fill: '#306AD0'
                },
                floor: '5',
                textPoints: {
                    left: 10, 
                    top: 172,
                    fontSize: 30,
                    fill: '#306AD0'
                }
            },
            6: {
                points: [
                    {x: 171, y: 187}, // right top
                    {x: 171, y: 193}, // right bottom

                    {x: 123, y: 200}, // right bottom corner
                    {x: 31, y: 203}, // left bottom corner

                    {x: 0, y: 201}, // left bottom
                    {x: 0, y: 190}, // left top 

                    {x: 30, y: 190}, // left top corner
                    {x: 118, y: 189} // right top corner
                ],
                sectionOffset: {
                    left: 42,
                    top: 164,
                    angle: 0,
                    //   fill: '#306AD0'
                    fill: '#306AD0'
                },
                floor: '6',
                textPoints: {
                    left: 10, 
                    top: 158,
                    fontSize: 30,
                    fill: '#306AD0'
                }
            },
            7: {
                points: [
                    {x: 171, y: 179}, // right top
                    {x: 171, y: 186}, // right bottom

                    {x: 120, y: 186}, // right bottom corner
                    {x: 29, y: 186}, // left bottom corner

                    {x: 0, y: 186}, // left bottom
                    {x: 0, y: 175}, // left top 

                    {x: 30, y: 173}, // left top corner
                    {x: 118, y: 175} // right top corner
                ],
                sectionOffset: {
                    left: 42,
                    top: 148,
                    angle: 0,
                    //   fill: '#306AD0'
                    fill: '#306AD0'
                },
                floor: '7',
                textPoints: {
                    left: 10, 
                    top: 143,
                    fontSize: 30,
                    fill: '#306AD0'
                }
            },
            8: {
                points: [
                    {x: 171, y: 169}, // right top
                    {x: 171, y: 176}, // right bottom

                    {x: 127, y: 172}, // right bottom corner
                    {x: 31, y: 169}, // left bottom corner

                    {x: 0, y: 171}, // left bottom
                    {x: 0, y: 160}, // left top 

                    {x: 30, y: 156}, // left top corner
                    {x: 133, y: 163} // right top corner
                ],
                sectionOffset: {
                    left: 42,
                    top: 130,
                    angle: 0,
                    //   fill: '#306AD0'
                    fill: '#306AD0'
                },
                floor: '8',
                textPoints: {
                    left: 10, 
                    top: 122,
                    fontSize: 30,
                    fill: '#306AD0'
                }
            },
            9: {
                points: [
                    {x: 171, y: 162}, // right top
                    {x: 171, y: 168}, // right bottom

                    {x: 131, y: 160}, // right bottom corner
                    {x: 32, y: 152}, // left bottom corner

                    {x: 0, y: 156}, // left bottom
                    {x: 0, y: 145}, // left top 

                    {x: 33, y: 140}, // left top corner
                    {x: 132, y: 150} // right top corner
                ],
                sectionOffset: {
                    left: 42,
                    top: 112,
                    angle: 0,
                    //   fill: '#306AD0'
                    fill: '#306AD0'
                },
                floor: '9',
                textPoints: {
                    left: 10, 
                    top: 106,
                    fontSize: 30,
                    fill: '#306AD0'
                }
            },
            10: {
                points: [
                    {x: 171, y: 154}, // right top
                    {x: 170, y: 160}, // right bottom

                    {x: 131, y: 147}, // right bottom corner
                    {x: 33, y: 137}, // left bottom corner

                    {x: 0, y: 142}, // left bottom
                    {x: 0, y: 131}, // left top 

                    {x: 33, y: 124}, // left top corner
                    {x: 134, y: 138} // right top corner
                ],
                sectionOffset: {
                    left: 42,
                    top: 94,
                    angle: 0,
                    //   fill: '#306AD0'
                    fill: '#306AD0'
                },
                floor: '10',
                textPoints: {
                    left: 0, 
                    top: 90,
                    fontSize: 30,
                    fill: '#306AD0'
                }
            },
            11: {
                points: [
                    {x: 171, y: 146}, // right top
                    {x: 171, y: 153}, // right bottom

                    {x: 131, y: 135}, // right bottom corner
                    {x: 33, y: 120}, // left bottom corner

                    {x: 0, y: 128}, // left bottom
                    {x: 0, y: 116}, // left top 

                    {x: 33, y: 108}, // left top corner
                    {x: 133, y: 126} // right top corner
                ],
                sectionOffset: {
                    left: 42,
                    top: 76,
                    angle: 0,
                    //   fill: '#306AD0'
                    fill: '#306AD0'
                },
                floor: '11',
                textPoints: {
                    left: 0, 
                    top: 73,
                    fontSize: 30,
                    fill: '#306AD0'
                }
            },
            12: {
                points: [
                    {x: 172, y: 137}, // right top
                    {x: 171, y: 145}, // right bottom

                    {x: 131, y: 121}, // right bottom corner
                    {x: 32, y: 104}, // left bottom corner
                    
                    {x: 0, y: 112}, // left bottom
                    {x: 0, y: 100}, // left top 

                    {x: 34, y: 90}, // left top corner
                    {x: 134, y: 112} // right top corner
                ],
                sectionOffset: {
                    left: 42,
                    top: 57,
                    angle: 0,
                    //   fill: '#306AD0'
                    fill: '#306AD0'
                },
                floor: '12',
                textPoints: {
                    left: 0, 
                    top: 60,
                    fontSize: 30,
                    fill: '#306AD0'
                }
            },
            13: {
                points: [
                    {x: 172, y: 133}, // right top
                    {x: 171, y: 140}, // right bottom

                    {x: 134, y: 112}, // right bottom corner
                    {x: 30, y: 90}, // left bottom corner

                    {x: 0, y: 100}, // left bottom
                    {x: 0, y: 89}, // left top 

                    {x: 30, y: 75}, // left top corner
                    {x: 133, y: 102} // right top corner
                ],
                sectionOffset: {
                    left: 42,
                    top: 38,
                    angle: 0,
                    //   fill: '#306AD0'
                    fill: '#306AD0'
                },
                floor: '13',
                textPoints: {
                    left: 0, 
                    top: 40,
                    fontSize: 30,
                    fill: '#306AD0'
                }
            },
            14: {
                points: [
                    {x: 172, y: 109}, // right top
                    {x: 172, y: 128}, // right bottom

                    {x: 133, y: 95}, // right bottom corner
                    {x: 32, y: 70}, // left bottom corner

                    {x: 0, y: 85}, // left bottom
                    {x: 0, y: 51}, // left top 

                    {x: 32, y: 37}, // left top corner
                    {x: 132, y: 67} // right top corner
                ],
                sectionOffset: {
                    left: 41,
                    top: 0,
                    angle: 0,
                    //   fill: '#306AD0'
                    fill: '#306AD0'
                },
                floor: '14',
                textPoints: {
                    left: 0, 
                    top: 8,
                    fontSize: 30,
                    fill: '#306AD0'
                }
            }
        }

        window.floorCanvas = new fabric.Canvas('floorCanvas', { selection: false , width: this.cWidth, height:  this.cHeight, defaultCursor: "default"});
    
    
        this.add()
    }

    getImageSrc() {
        return this.imgDir + this.floorImgName + this.imgFormat
    }

    add () {    
        fabric.Image.fromURL(this.getImageSrc(), (img) => {
            const myImg = img.set({
                lockMovementX: true,
                lockMovementY: true,
                
                lockScalingX: true,
                lockScalingY: true,
                
                lockUniScaling: true,
                lockRotation: true,
            })
            floorCanvas.add(myImg);

            floorCanvas.sendToBack(myImg)
        })

        // for (let item in this.floorsData) {
            this.createSection(this.floor)
        //     this.createSection(item)
        // }

        
    }

    createSection (i) {
        const polygon = new fabric.Polygon( this.floorsData[i].points, this.floorsData[i].sectionOffset)
        floorCanvas.add(polygon)

        const text = new fabric.Text(this.floorsData[i].floor, this.floorsData[i].textPoints)
        floorCanvas.add(text)
    }

}

export default FloorScheme