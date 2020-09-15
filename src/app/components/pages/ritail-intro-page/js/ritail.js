'use strict';
const {getAreaFloorOne, getAreaFloorTwo} = require('./retailIntroPageHelpers');

/*
 *  Main class for work with canvas
 */

 let store
 let sections = []
class Ritail {
    constructor(conf) {
        const element = document.getElementById("workspace");
        this.floor = 1;
        this.imgDir = `static/img/ritail/`;
        this.imgName = 'Retail_Level_1';
        this.imgFormat = '.png';
        this.placesLength = 23;
        this.cWidth = element.offsetWidth;
        this.cHeight = 1250;
        this.wWidth = element.offsetWidth;
        this.wHeight = 1000;
        this.baseColors = {
            // strokeEngagedPolygon: '#626363',
            // strokeFreePolygon: '#626363',
            // fillEngagedPolygon: 'rgba(98,99,99,0.51)',
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
            strokeFreePolygon: '#3c3bfa',  // colors to test
            fillEngagedPolygon: 'rgba(98,99,99,1)', // colors to test
            fillFreePolygon: 'rgba(255,255,255,1)', // colors to test
        };

        window.canvas = new fabric.Canvas('canvas', {
            selection: true,
            width: this.cWidth,
            height: this.cHeight,
            defaultCursor: "default"
        });
        // fabric.Object.prototype.objectCaching = true;
        // fabric.Group.prototype.lockMovementX = true;
        // fabric.Group.prototype.lockMovementY = true;

        // For unique object id
        window.itter = 0;

        this.controls().init();
    }

    async getStorageData() {
        // this.schemeRender = JSON.parse(localStorage.getItem('schemeRender'));
        this.schemeRender = await store.dispatch('ParentApiStore/getRitails')
    }

    // Add objects
    add(obj, position = {X: 0, Y: 13}, unlock) {
        console.log(obj)
        console.log('lenght', obj.placesLength);
        let scaleY,
            scaleX;

        fabric.Image.fromURL(obj.floorBG, (img) => {
            console.log(obj.floorBG);
            // let scaleY = obj.height / img.height,
            //     scaleX = obj.width / img.width;
            scaleY = canvas.width / img.width;
            scaleX = canvas.width / img.width;
            // let scaleY = 1,
            //     scaleX = 1;

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
                // selectable: true,
                ...baseOptions
            };

            let polygonOptions = {
                fill: 'rgba(160,166,255,0.01)',
                strokeWidth: 1,
                scaleY: scaleY,
                scaleX: scaleX,
                ...baseOptions
            };

            let rectOptions = {
                fill: 'rgba(160,166,255,0.01)',
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


            function createSection(section) {
                let individualOptions = {
                    stroke: section.scene_checked ? scheme.baseColors.strokeEngagedPolygon : scheme.baseColors.strokeFreePolygon,
                    // fill: section.scene_checked ? scheme.baseColors.fillEngagedPolygon : scheme.baseColors.fillFreePolygon,
                    fill: section.scene_checked ? 'rgba(0, 0, 255, .4)' : 'rgba(255, 255, 255, 0.1)',
                    selectable: !section.scene_checked,
                    scene_checked: section.scene_checked,
                    id: section.id
                };

                let individualTextOptions = {
                    fill: section.scene_checked ? scheme.baseColors.fillEngagedText : scheme.baseColors.fillFreeText,
                    angle: -section.angle,
                    // left: section.textLeft,
                    // top: section.textTop
                };

                if(section.status !== "available") {
                    individualOptions.fill = 'rgba(43, 44, 44, 1)',
                    individualOptions.stroke = 'rgba(0, 0, 0, .8)',
                    // individualOptions.fill = 'rgba(0, 0, 0, .8)',
                    individualOptions.selectable = false

                    individualTextOptions.fill = 'rgba(255, 255, 255, 1)'
                }

                let readySection = new fabric.Polygon(section.polygonPoints, {...polygonOptions, ...individualOptions, ...section.polygonOptions});
                let text = new fabric.Text((section.placeID).toString(), {...textOptions, ...individualTextOptions, ...section.textOptions});

                // let readySection = new fabric.Rect({
                //     width: section.width,
                //     height: section.height,
                //     ...rectOptions,
                //     ...individualOptions
                // });

                let readyGroup = new fabric.Group([readySection, text], {
                    selectable: !section.engaged,
                    left: (position.X + section.left) * scaleX,
                    top: (position.Y + section.top) * scaleY,
                    angle: section.angle,
                    lockMovementX: true,
                    lockMovementY: true,
                    ...readyGroupOptions
                });
                if (readySection.selectable) {
                    setTimeout(function () {
                        canvas.add(readyGroup);
                        readySection.moveTo(2000);
                    }, 200)
                } else {
                    sectionGroup.push(readyGroup);
                }

                readyGroup.on('mousedown', (e) => {
                    const section = readyGroup['_objects'][1]
                    if(section.scene_checked == false) {
                        section.scene_checked = true
                        section.set('fill', 'rgba(0, 0, 255, .4)')
                    } else {
                        section.scene_checked = false
                        section.set('fill', 'rgba(255, 255, 255, .1)')
                    }
                    console.log(section)
                    window.scheme.onSectionClick(section.id)
                    canvas.renderAll()
                })

                sections.push(readySection)
            }

            let convertedArr = [];
            for (let n = 1; n <= obj.placesLength; n++) {
                if (obj.selectedPlace[0] === n) {
                    convertedArr.push(n);
                    obj.selectedPlace.shift()
                } else {
                    convertedArr.push(null)
                }
            }
            // Get area for all offices on floor
            if (obj.floor === 1) {
                const excludeLots = [7, 22, 24];
                for (let i = 0, j = 1; i < obj.sections.length; i++, j++) {
                    if (!excludeLots.includes(j)) {
                        section = getAreaFloorOne(j, section, position, scaleX, scaleY);
                        section.engaged = (convertedArr[i] === j);
                        section.placeID = j;
                        section.id = obj.sections[i].id
                        section.status = obj.sections[i].status
                        createSection(section);
                    }
                }
            } else if (obj.floor === 2) {
                const excludeLots = [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
                for (let i = 0, j = 1; i < obj.sections.length; i++, j++) {
                    if (!excludeLots.includes(j)) {
                        section = getAreaFloorTwo(j, section, position, scaleX, scaleY);
                        section.engaged = (convertedArr[i] === j);
                        section.placeID = j;
                        section.id = obj.sections[i].id
                        section.status = obj.sections[i].status
                        createSection(section);
                    }
                }
            }

            let group = new fabric.Group(sectionGroup, {
                selectable: false
            });

            setTimeout(function () {
                canvas.add(group);
                group.moveTo(1000);
            }, 100);

            img.on('selected', (e) => {
            });
            img.on('deselected', () => {
            });
            img.on('moving', () => {
            });
            img.on('removed', () => {
            });
        });
    }

    //Remove selected object
    remove() {

    }

    // All canvas control buttons
    controls() {
        let drawScheme = this;

        return {
            init: function () {
                function selectObject() {
                //     let activeObjects = canvas.getActiveObject();
                //     let activeSection = activeObjects['_objects'][1];
                //     console.log(activeObjects);
                //     let activeBtn = activeObjects['_objects'][0];
                //     if(activeSection.hasOwnProperty('selectable')){
                //         if(activeSection.selectable){
                //             if(!activeObjects.selected){
                //                 activeObjects.selected = true;
                //                 activeSection.fill = scheme.baseColors.fillEngagedPolygon;
                //                 activeBtn['_objects'][0].fill = scheme.baseColors.fillEngagedBtn;
                //                 activeBtn['_objects'][1].fill = scheme.baseColors.fillEngagedText;
                //             }else{
                //                 activeObjects.selected = false;
                //                 activeSection.fill = scheme.baseColors.fillFreePolygon;
                //                 activeBtn['_objects'][0].fill = scheme.baseColors.fillFreeBtn;
                //                 activeBtn['_objects'][1].fill = scheme.baseColors.fillFreeText;
                //             }
                //         }
                //     }
                }

                canvas.on({
                    'object:moving': (options) => {
                        options.target.set({
                            left: Math.round(options.target.left / 1.8) * 1.8,
                            top: Math.round(options.target.top / 1.8) * 1.8
                        });
                    },
                    "selection:created": (options) => {
                        selectObject()
                    },
                    "selection:updated": (options) => {
                        selectObject()
                    },
                    'object:selected': (options) => {
                        // deprecated
                    },
                    'selection:cleared': (options) => {
                        canvas.forEachObject(function (activeObjects) {
                            if (activeObjects.selected) {
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
                    'mouse:down': (options) => {

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
                if (this.floor === 1) {
                    this.imgName = 'Retail_Level_1'
                } else {
                    this.imgName = 'Retail_Level _2'
                }

                drawScheme.reRender.call(this, 'floor', this.floor);
            },

            showCoords(event) {
                let x = event.clientX;
                let y = event.clientY;
                let coords = `X coords: ${+x + 54} , Y coords:  ${+y + 237}`;
                console.log(coords)
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
    constructor(data) {
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

class DrawScheme extends Ritail {
    constructor(conf) {
        store = conf
        super(conf);
        // this.loadScheme().then(() => {
            this.draw();
        // });
    }

    // loadScheme() {
    //     return new Promise((resolve, reject) => {
    //         async function loadJSON(url) {
    //             const res = await fetch(url);
    //             return await res.json();
    //         }

    //         loadJSON('static/retail/data.json').then(data => {
    //             DrawScheme.setSchemeRender(data);
    //             resolve(data);
    //         });
    //     }).catch((error) => {
    //     })

    // }

    static setSchemeRender(data) {
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
            data.forEach((section) => {
                if (section.floor == scheme.floor) {
                    this.add(section);
                }

                return false;
            });
        };
        drawProcessor(data);
    }

    setChecked (id) {
        const section = sections.find(curSection => curSection.id === id)
        if (section == undefined) return false
        section.scene_checked = true
        section.set('fill', 'rgba(0, 0, 255, .4)')
        canvas.renderAll()
    }

    clearChecked (id) {
        const section = sections.find(curSection => curSection.id === id)
        if (section == undefined) return false
        section.scene_checked = false
        section.set('fill', 'rgba(255, 255, 255, .1)')
        canvas.renderAll()
    }

    reRender(key, value) {
        if (key === 'floor') {
            scheme.floor = value
        }
        sections = []
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