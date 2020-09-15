'use strict';

/*
    Main class for work with canvas
 */

let store
let sections = []
let imageHeight = 0
let imageWidth = 0

let zoomIn;
let zoomOut;
// на паркинге делать серую навигацию
class Parking {
    constructor (conf) {
        const element = document.getElementById("workspace");
        this.floor = -1;
        this.imgDir = `static/img/`;
        this.imgName = 'parking';
        this.imgFormat = '.png';
        this.placesLength = 100;
        this.cWidth = element.offsetWidth;
        this.cHeight = 1250;
        this.wWidth = element.offsetWidth;
        this.wHeight = 1000;
        this.baseColors = {
            // strokeEngagedPolygon: '#626363',
            // strokeFreePolygon: '#626363',
            // fillEngagedPolygon: 'rgba(98,99,99,0.51)',
            // fillFreePolygon: 'rgba(255,255,255,0.01)',
            strokeEngagedBtn: '#3c3bfa',
            strokeFreeBtn: '#000000',
            fillEngagedBtn: '#3c3bfa',
            fillFreeBtn: '#ffffff',
            fillEngagedText: 'rgba(0,0,0,1)',
            fillFreeText: 'rgba(0,0,0,1)',
            disabledStroke: '#000000',
            disabledFill: '#72747b',
            disabledText: '#000000',

            strokeEngagedPolygon: '#fa071f', // colors to test
            // strokeFreePolygon: '#3c3bfa',  // colors to test
            fillEngagedPolygon: 'rgba(98,99,99,0.01)', // colors to test
            fillFreePolygon: 'rgba(255,255,255,0.01)', // colors to test
        }

        window.canvas = new fabric.Canvas('canvas', { selection: true , width: this.cWidth, height:  this.cHeight, defaultCursor: "default"});
        // fabric.Object.prototype.objectCaching = true;
        // fabric.Group.prototype.lockMovementX = true;
        // fabric.Group.prototype.lockMovementY = true;

        // For unique object id
        window.itter = 0;

        this.controls().init();
    }

    async getStorageData() {
        this.schemeRender = await store.dispatch('ParentApiStore/getParking')
        console.log(this.schemeRender)
    }

    // Add objects
    add (obj, position = {X:0, Y:13}, unlock) {
        let scaleY,
            scaleX;

        fabric.Image.fromURL(obj.floorBG, (img) => {
            // let scaleY = obj.height / img.height,
            //     scaleX = obj.width / img.width;
            scaleY = canvas.width/img.width;
            scaleX = canvas.width/img.width;
            // scaleX = 1
            // scaleY = 1
            // let scaleY = 1,
            //     scaleX = 1;
            

            imageHeight = img.height
            imageWidth = img.width
            let imgSet = img.set({
                top: 0,
                left: 0,
                fill: 'transparent',
                selectionBackgroundColor: 'rgba(250, 166, 26, 0.5)',
                width: img.width,
                height: img.height,
                scaleY: scaleY,
                scaleX: scaleX,
                selectable: false,
                defaultCursor: 'default'
            });

            canvas.add(imgSet);
            imgSet.moveTo(99);

            let sectionGroup = [];
            let section = {
                fill: '#fa071f',
                stroke: '#fa071f',
                strokeWidth: 1
            };

            let baseOptions = {
                objectCaching: false,
                hasControls: false,
                hasBorders: false,
                perPixelTargetFind: true,
                targetFindTolerance: 1,
                transparentCorners: true,
                // rotate: true
            };

            let textOptions = {
                fontSize: 30,
                originX: 'center',
                originY: 'center',
                ...baseOptions
            };

            let rectOptions = {
                strokeWidth: 1,
                scaleY: scaleY,
                scaleX: scaleX,
                hoverCursor: "pointer",
                originX: 'center',
                originY: 'center',
                ...baseOptions
            };

            let readyGroupOptions = {
                hoverCursor: "pointer",
                ...baseOptions
            };

            function createSection(section){
                let readyGroup ;
                let individualOptions = {
                    stroke : section.scene_checked ? scheme.baseColors.strokeEngagedPolygon : scheme.baseColors.strokeFreePolygon,
                    fill : section.scene_checked ? scheme.baseColors.fillEngagedPolygon : scheme.baseColors.fillFreePolygon,
                    selectable:  !section.engaged
                };

                let individualTextOptions = {
                    fill: section.engaged ? scheme.baseColors.fillEngagedText : scheme.baseColors.fillFreeText,
                    angle: -section.angle
                };

                // let readySection = new fabric.Polygon(section.polygon, {...rectOptions, ...individualOptions});
                let text = new fabric.Text((section.placeID).toString(), {...textOptions, ...individualTextOptions});
                
                var readySection = new fabric.Rect({
                    width: section.width,
                    height: section.height,
                    ...rectOptions,
                    ...individualOptions
                });
                
                let url = section.scene_checked ? 'static/img/car-blue.png' : 'static/img/car.png'

                if (section.status == 'unavailable') {
                    url = 'static/img/car-grey.png'
                }

                fabric.Image.fromURL(url, function(oImg) {
                    oImg.set({
                        top: -34,
                        left: -20,
                        width: 39,
                        height: 82,
                        id: section.id,
                        status: section.status,
                        scene_checked: section.scene_checked
                    });
                    sections.push(oImg)
                    readyGroup = readyGroup = new fabric.Group([text, oImg, readySection], {
                        selectable: false,
                        left : (position.X + section.left) * scaleX,
                        top: (position.Y + section.top) * scaleY,
                        angle: section.angle,
                        id: section.id,
                        status: section.status,
                        ...readyGroupOptions
                    });
                    if (readySection.selectable) {
                        setTimeout(function () {
                            canvas.add(readyGroup);
                            // readySection.moveTo(2000);
                        }, 200)
                    } else {
                        sectionGroup.push(readyGroup);
                    }

                    readyGroup.on('mousedown', (e) => {
                        const section = readyGroup['_objects'][1]
                        console.log(section)
                        if (section.status == 'unavailable') return false
                        if(section.scene_checked == false) {
                            section.scene_checked = true
                            section.setSrc('static/img/car-blue.png', () => canvas.renderAll())
                        } else {
                            section.scene_checked = false
                            section.setSrc('static/img/car.png', () => canvas.renderAll())
                        }
                        window.scheme.onSectionClick(section.id)
                    })
                });

                // let readyGroup = new fabric.Group([text, myimg, readySection], {
                //     selectable: !section.engaged,
                //     left : (position.X + section.left) * scaleX,
                //     top: (position.Y + section.top) * scaleY,
                //     angle: section.angle,
                //     ...readyGroupOptions
                // });

                
            }
            let convertedArr = [];
            for(let n = 1; n <= obj.sections,length; n++) {
                if(obj.selectedPlace[0] === n){
                    convertedArr.push(n);
                    obj.selectedPlace.shift()
                }else{
                    convertedArr.push(null)
                }
            }
            
            if(obj.floor == -1){
                for(let i = 0, j = 1; i < obj.sections.length; i++, j++) {
                    if (j === 1) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 473,
                            top: 10,
                            angle: 0
                        }
                    } else if (j === 2) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 513,
                            top: 10,
                            angle: 0
                        }
                    } else if (j === 3) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 565,
                            top: 10,
                            angle: 0
                        }
                    } else if (j === 4) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 607,
                            top: 10,
                            angle: 0
                        }
                    } else if (j === 5) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 649,
                            top: 10,
                            angle: 0
                        }
                    } else if (j === 6) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 703,
                            top: 10,
                            angle: 0
                        }
                    } else if (j === 7) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 746,
                            top: 10,
                            angle: 0
                        }
                    } else if (j === 8) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 790,
                            top: 10,
                            angle: 0
                        }
                    } else if (j === 9) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 842,
                            top: 10,
                            angle: 0
                        }
                    } else if (j === 10) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 885,
                            top: 10,
                            angle: 0
                        }
                    } else if (j === 11) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 928,
                            top: 10,
                            angle: 0
                        }
                    } else if (j === 12) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 980,
                            top: 10,
                            angle: 0
                        }
                    } else if (j === 13) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1022,
                            top: 10,
                            angle: 0
                        }
                    } else if (j === 14) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1065,
                            top: 10,
                            angle: 0
                        }
                    } else if (j === 15) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1119,
                            top: 10,
                            angle: 0
                        }
                    } else if (j === 16) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1162,
                            top: 10,
                            angle: 0
                        }
                    } else if (j === 17) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1205,
                            top: 10,
                            angle: 0
                        }
                    } else if (j === 18) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1254,
                            top: 10,
                            angle: 0
                        }
                    } else if (j === 19) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1295,
                            top: 10,
                            angle: 0
                        }
                    } else if (j === 20) { // right top corner
                        section = {
                            width: 39,
                            height: 82,
                            left: 1420,
                            top: 96,
                            angle: 90
                        }
                    } else if (j === 21) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1420,
                            top: 140,
                            angle: 90
                        }
                    } else if (j === 22) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1420,
                            top: 200,
                            angle: 90
                        }
                    } else if (j === 23) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1420,
                            top: 242,
                            angle: 90
                        }
                    }else if (j === 24) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1420,
                            top: 284,
                            angle: 90
                        }
                    } else if (j === 25) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1420,
                            top: 347,
                            angle: 90
                        }
                    } else if (j === 26) { // right bottom corner
                        section = {
                            width: 39,
                            height: 82,
                            left: 1385,
                            top: 435,
                            angle: 115
                        }
                    } else if (j === 27) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1150,
                            top: 310,
                            angle: 298
                        }
                    } else if (j === 28) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1125,
                            top: 360,
                            angle: 298
                        }
                    } else if (j === 29) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1103,
                            top: 395,
                            angle: 298
                        }
                    } else if (j === 30) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1005,
                            top: 413,
                            angle: 298
                        }
                    } else if (j === 31) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1080,
                            top: 450,
                            angle: 298
                        }
                    } else if (j === 32) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1063,
                            top: 482,
                            angle: 298
                        }
                    } else if (j === 33) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1047,
                            top: 515,
                            angle: 298
                        }
                    } else if (j === 34) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1018,
                            top: 575,
                            angle: 298
                        }
                    } else if (j === 35) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1001,
                            top: 615,
                            angle: 298
                        }
                    } else if (j === 36) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 973,
                            top: 675,
                            angle: 298
                        }
                    } else if (j === 37) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 950,
                            top: 645,
                            angle: 0
                        }
                    } else if (j === 38) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 915,
                            top: 645,
                            angle: 0
                        }
                    } else if (j === 39) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 860,
                            top: 630,
                            angle: 25
                        }
                    } else if (j === 40) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 785,
                            top: 600,
                            angle: 25
                        }
                    } else if (j === 41) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 700,
                            top: 560,
                            angle: 25
                        }
                    } else if (j === 42) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 630,
                            top: 525,
                            angle: 25
                        }
                    } else if (j === 43) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 590,
                            top: 505,
                            angle: 25
                        }
                    } else if (j === 68) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 517,
                            top: 275,
                            angle: 180
                        }
                    } else if (j === 69) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 480,
                            top: 275,
                            angle: 180
                        }
                    }
                    else if (j === 67) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 460,
                            top: 285,
                            angle: 115
                        }
                    } else if (j === 66) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 440,
                            top: 325,
                            angle: 115
                        }
                    } else if (j === 65) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 430,
                            top: 365,
                            angle: 90
                        }
                    } else if (j === 64) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 430,
                            top: 405,
                            angle: 90
                        }
                    } else if (j === 63) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 430,
                            top: 445,
                            angle: 90
                        }
                    } else if (j === 62) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 170,
                            top: 250,
                            angle: 298
                        }
                    } else if (j === 61) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 135,
                            top: 300,
                            angle: 298
                        }
                    } else if (j === 60) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 140,
                            top: 345,
                            angle: 298
                        }
                    } else if (j === 59) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 150,
                            top: 390,
                            angle: 298
                        }
                    } else if (j === 58) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 125,
                            top: 485,
                            angle: 270
                        }
                    } else if (j === 57) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 125,
                            top: 525,
                            angle: 270
                        }
                    } else if (j === 56) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 125,
                            top: 585,
                            angle: 270
                        }
                    } else if (j === 44) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 660,
                            top: 810,
                            angle: 270
                        }
                    } else if (j === 45) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 620,
                            top: 710,
                            angle: 30
                        }
                    } else if (j === 46) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 570,
                            top: 690,
                            angle: 30
                        }
                    } else if (j === 47) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 533,
                            top: 670,
                            angle: 30
                        }
                    } else if (j === 48) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 475,
                            top: 745,
                            angle: 210
                        }
                    } else if (j === 49) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 440,
                            top: 730,
                            angle: 210
                        }
                    } else if (j === 51) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 385,
                            top: 730,
                            angle: 180
                        }
                    } else if (j === 53) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 345,
                            top: 730,
                            angle: 180
                        }
                    } else if (j === 50) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 385,
                            top: 820,
                            angle: 180
                        }
                    } else if (j === 52) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 345,
                            top: 820,
                            angle: 180
                        }
                    } else if (j === 55) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 290,
                            top: 730,
                            angle: 180
                        }
                    } else if (j === 54) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 290,
                            top: 820,
                            angle: 180
                        }
                    }

                    section.engaged = (convertedArr[i] === j);
                    section.placeID = j;
                    section.status = obj.sections[i].status || 'unavailable'
                    section.scene_checked = obj.sections[i].scene_checked || false
                    section.id = obj.sections[i].id || ''
                    createSection(section);
                }
            } else if (obj.floor == -2) {
                for(let i = 0, j = 1; i < obj.placesLength; i++, j++) {
                    if (j === 1) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 340,
                            top: 10,
                            angle: 0
                        }
                    } else if (j === 2) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 384,
                            top: 10,
                            angle: 0
                        }
                    } else if (j === 3) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 433,
                            top: 10,
                            angle: 0
                        }
                    } else if (j === 4) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 473,
                            top: 10,
                            angle: 0
                        }
                    } else if (j === 5) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 513,
                            top: 10,
                            angle: 0
                        }
                    } else if (j === 6) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 565,
                            top: 10,
                            angle: 0
                        }
                    } else if (j === 7) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 607,
                            top: 10,
                            angle: 0
                        }
                    } else if (j === 8) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 649,
                            top: 10,
                            angle: 0
                        }
                    } else if (j === 9) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 703,
                            top: 10,
                            angle: 0
                        }
                    } else if (j === 10) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 746,
                            top: 10,
                            angle: 0
                        }
                    } else if (j === 11) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 790,
                            top: 10,
                            angle: 0
                        }
                    } else if (j === 12) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 842,
                            top: 10,
                            angle: 0
                        }
                    } else if (j === 13) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 885,
                            top: 10,
                            angle: 0
                        }
                    } else if (j === 14) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 928,
                            top: 10,
                            angle: 0
                        }
                    } else if (j === 15) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 980,
                            top: 10,
                            angle: 0
                        }
                    } else if (j === 16) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1022,
                            top: 10,
                            angle: 0
                        }
                    } else if (j === 17) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1065,
                            top: 10,
                            angle: 0
                        }
                    } else if (j === 18) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1119,
                            top: 10,
                            angle: 0
                        }
                    } else if (j === 19) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1162,
                            top: 10,
                            angle: 0
                        }
                    } else if (j === 20) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1205,
                            top: 10,
                            angle: 0
                        }
                    } else if (j === 21) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1254,
                            top: 10,
                            angle: 0
                        }
                    } else if (j === 22) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1295,
                            top: 10,
                            angle: 0
                        }
                    } else if (j === 23) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1420,
                            top: 96,
                            angle: 90
                        }
                    } else if (j === 24) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1420,
                            top: 140,
                            angle: 90
                        }
                    } else if (j === 25) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1420,
                            top: 200,
                            angle: 90
                        }
                    } else if (j === 26) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1420,
                            top: 242,
                            angle: 90
                        }
                    }else if (j === 27) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1420,
                            top: 284,
                            angle: 90
                        }
                    } else if (j === 28) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1413,
                            top: 373,
                            angle: 115
                        }
                    } else if (j === 29) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1385,
                            top: 435,
                            angle: 115
                        }
                    } else if (j === 30) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1364,
                            top: 474,
                            angle: 115
                        }
                    } else if (j === 31) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1334,
                            top: 530,
                            angle: 115
                        }
                    } else if (j === 32) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1316,
                            top: 560,
                            angle: 115
                        }
                    } else if (j === 33) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1300,
                            top: 590,
                            angle: 115
                        }
                    } else if (j === 34) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1275,
                            top: 648,
                            angle: 115
                        }
                    } else if (j === 35) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1260,
                            top: 685,
                            angle: 115
                        }
                    } else if (j === 36) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1237,
                            top: 735,
                            angle: 90
                        }
                    } else if (j === 37) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1325,
                            top: 735,
                            angle: 90
                        }
                    } else if (j === 38) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1434,
                            top: 507,
                            angle: 115
                        }
                    } else if (j === 39) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1388,
                            top: 593,
                            angle: 115
                        }
                    } else if (j === 40) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1370,
                            top: 625,
                            angle: 115
                        }
                    } else if (j === 41) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1150,
                            top: 243,
                            angle: 270
                        }
                    } else if (j === 42) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1150,
                            top: 310,
                            angle: 298
                        }
                    } else if (j === 43) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1125,
                            top: 360,
                            angle: 298
                        }
                    } else if (j === 44) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1103,
                            top: 395,
                            angle: 298
                        }
                    } else if (j === 45) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1080,
                            top: 450,
                            angle: 298
                        }
                    } else if (j === 46) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1063,
                            top: 482,
                            angle: 298
                        }
                    } else if (j === 47) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1047,
                            top: 515,
                            angle: 298
                        }
                    } else if (j === 48) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1018,
                            top: 575,
                            angle: 298
                        }
                    } else if (j === 49) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1001,
                            top: 615,
                            angle: 298
                        }
                    } else if (j === 50) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 973,
                            top: 675,
                            angle: 298
                        }
                    } else if (j === 51) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 950,
                            top: 645,
                            angle: 0
                        }
                    } else if (j === 52) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 915,
                            top: 645,
                            angle: 0
                        }
                    } else if (j === 53) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 860,
                            top: 630,
                            angle: 25
                        }
                    } else if (j === 54) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 785,
                            top: 600,
                            angle: 25
                        }
                    } else if (j === 55) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 740,
                            top: 615,
                            angle: 115
                        }
                    } else if (j === 56) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 760,
                            top: 570,
                            angle: 115
                        }
                    } else if (j === 57) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 820,
                            top: 500,
                            angle: 115
                        }
                    } else if (j === 58) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 839,
                            top: 460,
                            angle: 115
                        }
                    } else if (j === 59) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 885,
                            top: 385,
                            angle: 115
                        }
                    } else if (j === 60) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 905,
                            top: 345,
                            angle: 115
                        }
                    } else if (j === 61) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 963,
                            top: 423,
                            angle: 115
                        }
                    } else if (j === 62) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 983,
                            top: 381,
                            angle: 115
                        }
                    } else if (j === 63) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 1005,
                            top: 413,
                            angle: 298
                        }
                    }  else if (j === 64) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 945,
                            top: 535,
                            angle: 298
                        }
                    }  else if (j === 65) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 925,
                            top: 575,
                            angle: 298
                        }
                    } else if (j === 66) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 988,
                            top: 445,
                            angle: 298
                        }
                    } else if (j === 67) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 600,
                            top: 240,
                            angle: 298
                        }
                    } else if (j === 68) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 580,
                            top: 275,
                            angle: 298
                        }
                    } else if (j === 69) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 555,
                            top: 275,
                            angle: 180
                        }
                    } else if (j === 70) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 517,
                            top: 275,
                            angle: 180
                        }
                    } else if (j === 71) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 480,
                            top: 275,
                            angle: 180
                        }
                    }
                    else if (j === 72) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 460,
                            top: 285,
                            angle: 115
                        }
                    } else if (j === 73) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 440,
                            top: 325,
                            angle: 115
                        }
                    } else if (j === 74) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 430,
                            top: 365,
                            angle: 90
                        }
                    } else if (j === 75) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 430,
                            top: 405,
                            angle: 90
                        }
                    } else if (j === 76) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 430,
                            top: 445,
                            angle: 90
                        }
                    } else if (j === 77) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 235,
                            top: 110,
                            angle: 298
                        }
                    } else if (j === 78) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 215,
                            top: 150,
                            angle: 298
                        }
                    } else if (j === 79) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 190,
                            top: 215,
                            angle: 298
                        }
                    } else if (j === 80) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 170,
                            top: 250,
                            angle: 298
                        }
                    } else if (j === 81) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 135,
                            top: 300,
                            angle: 298
                        }
                    } else if (j === 82) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 140,
                            top: 345,
                            angle: 298
                        }
                    } else if (j === 83) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 150,
                            top: 390,
                            angle: 298
                        }
                    } else if (j === 84) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 125,
                            top: 485,
                            angle: 270
                        }
                    } else if (j === 85) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 125,
                            top: 525,
                            angle: 270
                        }
                    } else if (j === 86) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 125,
                            top: 585,
                            angle: 270
                        }
                    } else if (j === 87) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 125,
                            top: 695,
                            angle: 270
                        }
                    } else if (j === 88) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 125,
                            top: 770,
                            angle: 270
                        }
                    } else if (j === 89) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 125,
                            top: 810,
                            angle: 270
                        }
                    } else if (j === 90) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 660,
                            top: 810,
                            angle: 270
                        }
                    } else if (j === 91) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 620,
                            top: 710,
                            angle: 30
                        }
                    } else if (j === 92) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 570,
                            top: 690,
                            angle: 30
                        }
                    } else if (j === 93) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 533,
                            top: 670,
                            angle: 30
                        }
                    } else if (j === 94) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 475,
                            top: 745,
                            angle: 210
                        }
                    } else if (j === 95) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 440,
                            top: 730,
                            angle: 210
                        }
                    } else if (j === 96) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 385,
                            top: 730,
                            angle: 180
                        }
                    } else if (j === 97) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 345,
                            top: 730,
                            angle: 180
                        }
                    } else if (j === 98) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 395,
                            top: 730,
                            angle: 90
                        }
                    } else if (j === 99) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 395,
                            top: 770,
                            angle: 90
                        }
                    } else if (j === 100) {
                        section = {
                            width: 39,
                            height: 82,
                            left: 390,
                            top: 810,
                            angle: 270
                        }
                    }
                    section.engaged = (convertedArr[i] === j);
                    section.placeID = j;
                    section.status = obj.sections[i].status || 'unavailable'
                    section.id = obj.sections[i].id || ''
                    section.scene_checked = obj.sections[i].scene_checked || false
                    createSection(section);
                }

            }

            let group = new fabric.Group(sectionGroup, {
                selectable: false
            });

            setTimeout(function(){
                canvas.add(group);
                group.moveTo(1000);
            },100);

            img.on('selected', (e) => {});
            img.on('deselected', () => {});
            img.on('moving', () => {});
            img.on('removed', () => {});
        });

        // fabric.Image.fromURL('static/img/zoom-in.svg', img => {
        //     const myImg = img.set({
        //         top: imageHeight,
        //         left: imageWidth - 110,
        //         width: 100,
        //         height: 100,
        //         hasControls: false,
        //         lockMovementX: true,
        //         lockMovementY: true,
        //         hoverCursor: 'pointer'
        //     })
        //     canvas.add(myImg)
        //     zoomIn = myImg
        //     myImg.on('mousedown', () => {
        //         window.scheme.toggleOpen()
        //         zoomOut.set('visible', true)
        //         zoomIn.set('visible', false)
        //         canvas.renderAll()
        //     })
        // })
        // fabric.Image.fromURL('static/img/zoom-out.svg', img => {
        //     const myImg = img.set({
        //         top: imageHeight,
        //         left: imageWidth - 110,
        //         width: 100,
        //         height: 100,
        //         visible: false,
        //         hasControls: false,
        //         lockMovementX: true,
        //         lockMovementY: true,
        //         hoverCursor: 'pointer'
        //     })
        //     canvas.add(myImg)
        //     zoomOut = myImg
        //     myImg.on('mousedown', () => {
        //         window.scheme.toggleOpen()
        //         zoomIn.set('visible', true)
        //         zoomOut.set('visible', false)
        //         canvas.renderAll()
        //     })
        // })
    }

    //Remove selected object
    remove () {

    }
    // All canvas control buttons
    controls() {
        let drawScheme = this;

        return {
            init: function () {
                function selectObject(){
                    let activeObjects = canvas.getActiveObject();
                    // let activeSection = activeObjects['_objects'][1];
                    // let activeBtn = activeObjects['_objects'][0];
                    // if(activeSection.hasOwnProperty('selectable')){
                    //     if(activeSection.selectable){
                    //         if(!activeObjects.selected){
                    //             activeObjects.selected = true;
                    //             activeSection.fill = scheme.baseColors.fillEngagedPolygon;
                    //             activeBtn['_objects'][0].fill = scheme.baseColors.fillEngagedBtn;
                    //             activeBtn['_objects'][1].fill = scheme.baseColors.fillEngagedText;
                    //         }else{
                    //             activeObjects.selected = false;
                    //             activeSection.fill = scheme.baseColors.fillFreePolygon;
                    //             activeBtn['_objects'][0].fill = scheme.baseColors.fillFreeBtn;
                    //             activeBtn['_objects'][1].fill = scheme.baseColors.fillFreeText;
                    //         }
                    //     }
                    // }
                }
                canvas.on({
                    'object:moving': (options) => {
                        options.target.set({
                            left: Math.round(options.target.left / 1.8) * 1.8,
                            top: Math.round(options.target.top / 1.8) * 1.8
                        });
                    },
                    "selection:created" : (options) => {
                        selectObject()
                    },
                    "selection:updated": (options) => {
                        selectObject()
                    },
                    'object:selected': (options) => {
                        // deprecated
                    },
                    'selection:cleared': (options) => {
                        canvas.forEachObject(function(activeObjects){
                            if(activeObjects.selected){
                                let activeSection = activeObjects['_objects'][1];
                                let activeBtn = activeObjects['_objects'][0];
                                activeObjects.selected = false;
                                activeSection.fill = scheme.baseColors.fillFreePolygon;
                                activeBtn['_objects'][0].fill = scheme.baseColors.fillFreeBtn;
                                activeBtn['_objects'][1].fill = scheme.baseColors.fillFreeText;
                            }
                        });
                        canvas.renderAll();
                    },
                    'mouse:down' : (options) => {

                    },
                    'object:modified': (options) => {

                    }
                });
            },

            changeFloor: (floor) => {
                this.floor = parseInt(floor);
                let data = this.schemeRender;
                // data.forEach(item => {
                //     if(this.floor === item.floor){
                //         let elementsArr = document.getElementsByClassName('segments');
                //         for (let i = 0; i < elementsArr.length; i++) {
                //             elementsArr[i].style.color = "black";
                //         };
                //         let elem = document.getElementById('segment-' + item.segment);
                //         elem.style = "color: red"
                //     }
                // })
                if (this.floor == -1){
                    this.imgName = 'parking'
                } else {
                    this.imgName = 'parking1'
                }

                drawScheme.reRender.call(this,'floor', this.floor);
            },

            show: function (me) {
                me.style.display = 'block';
            },

            hide: function (me) {
                me.style.display = 'none';
            },

            parkNumbers: (item) => {
                scheme.baseColors.fillFreeText = item.checked ? '#000' : 'rgba(0,0,0,0)';
                scheme.baseColors.fillEngagedText = item.checked ? '#000' : 'rgba(0,0,0,0)';
                drawScheme.reRender.call(this);
            },

            remove: () => {
                this.remove();
            },

        }
    }

    //Deselect objects
    // deselect() {
    //     return new Promise((resolve)=>{
    //         canvas.discardActiveObject();
    //         canvas.renderAll();
    //         setTimeout(()=>{
    //             resolve();
    //         });
    //     });
    // }
}

class DataFormatter {
    constructor (data) {
        this.result = [];
        this.data = data.schemeRender;
        this.compute();
    }

    getResult() {
        return this.result;
    }

    compute() {
        let data = this.data;
        let result = data.map(function callback(item, index, array) {
            item.floorBG = scheme.imgDir + scheme.imgName + scheme.imgFormat;
            return {...item}
        });
        this.result = result;
        DrawScheme.setSchemeRender(result);

        return this;
    }
}

class DrawScheme extends Parking {
    constructor(conf) {
        store = conf
        super(conf);
        // this.loadScheme().then(()=>{
            this.draw();
        // });
    }

    loadScheme() {
        return new Promise((resolve, reject) => {
            async function loadJSON (url) {
                const res = await fetch(url);
                return await res.json();
            }

            loadJSON('static/data/parking.json').then(data => {
                DrawScheme.setSchemeRender(data);
                resolve(data);
            });
        }).catch((error)=>{})

    }

    static setSchemeRender (data) {
        localStorage.setItem('schemeRender', JSON.stringify(data));
    }

    async draw() {
        this.clearAll();
        await this.getStorageData();
        const formatter = new DataFormatter(this);
        this.render(DrawScheme.normalize(formatter.getResult()));
        // this.render(formatter.getResult());
    }

    clearAll() {
        window.itter = 0;
        canvas.clear();
    }

    static normalize(data, exclude) {
        let result = [];
        for (let item in data) {
            if (exclude) {
                if (exclude.indexOf(item) === -1) {
                    result.push(data[item]);
                }
            } else {
                result.push(data[item]);
            }
        }

        return result;
    }

    render(data) {
        let drawProcessor = (data) => {
            data.forEach((item) => {
                if(item.floor == scheme.floor){
                    // item.sections.forEach(section => {
                        
                    // })
                    this.add(item);
                }

                return false;
            });
        };
        drawProcessor(data);
    }

    setChecked (id) {
        const section = sections.find(curSection => curSection.id === id)
        console.log(section)
        if (section == undefined) return false
        section.scene_checked = true
        section.setSrc('static/img/car-blue.png', () => canvas.renderAll())
        // canvas.renderAll()
    }

    clearChecked (id) {
        const section = sections.find(curSection => curSection.id === id)
        if (section == undefined) return false
        section.scene_checked = false
        section.setSrc('static/img/car.png', () => canvas.renderAll())
        // canvas.renderAll()
    }

    reRender (key, value) {
        if(key === 'floor'){
            scheme.floor = value
        }
        scheme.draw();
    }
};


// document.addEventListener('DOMContentLoaded', function(){
//     window.scheme = new DrawScheme();
// });

// function getCookie(name) {
//     let cookieValue = null;
//     if (document.cookie && document.cookie !== '') {
//         let cookies = document.cookie.split(';');
//         for (let i = 0; i < cookies.length; i++) {
//             let cookie = jQuery.trim(cookies[i]);
//             if (cookie.substring(0, name.length + 1) === (name + '=')) {
//                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                 break;
//             }
//         }
//     }
//     return cookieValue;
// }

// window.csrftoken = getCookie('csrftoken');
//
// axios.defaults.headers.common = {
//     'X-Requested-With': 'XMLHttpRequest',
//     'X-CSRFToken' : window.csrftoken,
//     'HTTP_X_CSRFTOKEN' : window.csrftoken,
// };
export default DrawScheme