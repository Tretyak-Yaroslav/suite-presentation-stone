'use strict';

/*
    Main class for work with canvas
 */
class Scheme {
    constructor (conf) {
        const element = document.getElementById("workspace");
        this.floor = 1;
        this.segment = 1;
        this.imgDir = `static/office/`;
        this.floorImgName = 'test-floor-type';
        this.imgFormat = '.png';
        this.cWidth = element.offsetWidth;
        this.cHeight = 1000;
        this.activeGrid = conf ? conf.activeGrid : false;
        this.activeGrid = conf ? conf.activeGrid : true;
        this.wWidth = element.offsetWidth;
        this.wHeight = 1000;
        this.baseColors = {
            strokeEngagedPolygon: '#626363',
            strokeFreePolygon: '#626363',
            fillEngagedPolygon: 'rgba(98,99,99,0.51)',
            fillFreePolygon: 'rgba(255,255,255,0.01)',
            strokeEngagedBtn: '#3c3bfa',
            strokeFreeBtn: '#000000',
            fillEngagedBtn: '#3c3bfa',
            fillFreeBtn: '#ffffff',
            fillEngagedText: '#ffffff',
            fillFreeText: '#000000',
            disabledStroke: '#000000',
            disabledFill: '#72747b',
            disabledText: '#000000',

            // strokeEngagedPolygon: '#fa071f', // colors to test
            // strokeFreePolygon: '#3c3bfa',  // colors to test
            // fillEngagedPolygon: 'rgba(98,99,99,0.01)', // colors to test
            // fillFreePolygon: 'rgba(255,255,255,0.01)', // colors to test
        }

        window.canvas = new fabric.Canvas('canvas', { selection: true , width: this.cWidth, height:  this.cHeight, defaultCursor: "default"});
        fabric.Object.prototype.objectCaching = true;
        fabric.Group.prototype.lockMovementX = true;
        fabric.Group.prototype.lockMovementY = true;

        // For unique object id
        window.itter = 0;

        this.controls().init();
    }

    getStorageData() {
        this.schemeRender = JSON.parse(localStorage.getItem('schemeRender'));
    }

    // Add objects
    add (obj, position = {X:45, Y:105}, unlock) {
        console.log(obj);
        let scaleY,
            scaleX;

        fabric.Image.fromURL(obj.floorBG, (img) => {
            // let scaleY = obj.height / img.height,
            //     scaleX = obj.width / img.width;
            scaleY = canvas.width/img.width;
            scaleX = canvas.width/img.width;
            // let scaleY = 1,
            //     scaleX = 1;
            console.log("1111",img.width);

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
                targetFindTolerance: 1
            };

            let polygonOptions = {
                fill: 'rgba(160,166,255,0.01)',
                strokeWidth: 1,
                scaleY: scaleY,
                scaleX: scaleX,
                ...baseOptions
            };
            let btnOptions = {
                radius: 30,
                strokeWidth: 1,
                strokeUniform: true,
                originX: 'center',
                originY: 'center',
                ...baseOptions
            };
            let textOptions = {
                fontSize: 30,
                originX: 'center',
                originY: 'center',
                ...baseOptions
            };
            let btnGroupOptions = {
                scaleY: scaleY,
                scaleX: scaleX,
                hoverCursor: "pointer",
                ...baseOptions
            };
            let readyGroupOptions = {
                hoverCursor: "pointer",
                ...baseOptions
            };

            function createSection(section,i,selectionFlag){
                let individualOptions = {
                    stroke : obj.sections[i] ? scheme.baseColors.strokeEngagedPolygon : scheme.baseColors.strokeFreePolygon,
                    fill : obj.sections[i] ? scheme.baseColors.fillEngagedPolygon : scheme.baseColors.fillFreePolygon,
                    selectable:  selectionFlag,
                    left: section.left,
                    top: section.top
                };

                let individualBtnOptions = {
                    stroke: obj.sections[i] ? scheme.baseColors.strokeEngagedBtn : scheme.baseColors.strokeFreeBtn,
                    fill: obj.sections[i] ? scheme.baseColors.fillEngagedBtn : scheme.baseColors.fillFreeBtn
                };
                let individualTextOptions = {
                    fill: obj.sections[i] ? scheme.baseColors.fillEngagedText : scheme.baseColors.fillFreeText,
                };

                let readySection = new fabric.Polygon(section.polygon, {...polygonOptions, ...individualOptions});
                let circle = new fabric.Circle({...btnOptions, ...individualBtnOptions});
                let text = new fabric.Text((i + 1).toString(), {...textOptions, ...individualTextOptions});
                let btnGroup = new fabric.Group([circle, text], {
                    left: section.btnLeft,
                    top: section.btnTop,
                    ...btnGroupOptions
                });
                let readyGroup = new fabric.Group([btnGroup, readySection], {
                    selectable: selectionFlag,
                    ...readyGroupOptions
                });
                if (readySection.selectable) {
                    setTimeout(function () {
                        canvas.add(readyGroup);
                        readyGroup.moveTo(2000);
                    }, 200)
                } else {
                    sectionGroup.push(readyGroup);
                }
            }

            switch(obj.type) {
                case 1:
                    // type 1 ready, 1/4 of sections
                    for(let i = 0; i < 4; i++) {
                        if (i === 0) {
                            section.polygon = [
                                {x: 0, y: 25},
                                {x: 25, y: 0},
                                {x: 215, y: 0},
                                {x: 215, y: 85},
                                {x: 362, y: 152},
                                {x: 335, y: 215},
                                {x: 480, y: 280},
                                {x: 465, y: 313},
                                {x: 692, y: 415},
                                {x: 648, y: 518},
                                {x: 25, y: 240},
                                {x: 0, y: 215}
                            ];
                            section.left = (position.X + 0) * scaleX;
                            section.top = (position.Y + 0) * scaleY;
                            section.btnLeft = (position.X + 200) * scaleX;
                            section.btnTop = (position.Y + 500) * scaleY;
                        } else if (i === 1) {
                            section.polygon = [
                                {x: 215, y: 0},
                                {x: 560, y: 0},
                                {x: 725, y: 73},
                                {x: 665, y: 205},
                                // {x: 910, y: 277},
                                // {x: 895, y: 310},
                                {x: 395, y: 80},
                                {x: 362, y: 152},
                                {x: 215, y: 85},
                            ];
                            section.left = (position.X + 215) * scaleX;
                            section.top = (position.Y + 0) * scaleY;
                            section.btnLeft = (position.X + 800) * scaleX;
                            section.btnTop = (position.Y + -70) * scaleY;
                        } else if (i === 2) {
                            section.polygon = [
                                {x: 725, y: 73},
                                {x: 1410, y: 380},
                                {x: 1435, y: 405},
                                {x: 1435, y: 595},
                                {x: 1410, y: 615},
                                {x: 1255, y: 615},
                                {x: 1255, y: 550},
                                {x: 1045, y: 450},
                                {x: 1075, y: 387},
                                {x: 895, y: 310},
                                {x: 910, y: 277},
                                {x: 752, y: 208},
                                {x: 680, y: 175},
                            ];
                            section.left = (position.X + 680) * scaleX;
                            section.top = (position.Y + 73) * scaleY;
                            section.btnLeft = (position.X + 1300) * scaleX;
                            section.btnTop = (position.Y + 150) * scaleY;
                        } else if (i === 3) {
                            section.polygon = [
                                {x: 650, y: 518},
                                {x: 705, y: 380},
                                {x: 1020, y: 520},
                                {x: 1045, y: 450},
                                {x: 1255, y: 550},
                                {x: 1255, y: 615},
                                {x: 870, y: 615}
                            ];
                            section.left = (position.X + 650) * scaleX;
                            section.top = (position.Y + 380) * scaleY;
                            section.btnLeft = (position.X + 1100) * scaleX;
                            section.btnTop = (position.Y + 700) * scaleY;
                        }
                        createSection(section,i,!obj.sections[i]);
                    }
                    break;
                case 2:
                    // type 2 ready, 1/4 of sections
                    for(let i = 0; i < 4; i++){
                        if(i === 0){
                            section.polygon = [
                                {x: 0, y: 25},
                                {x: 25, y: 0},
                                {x: 215, y: 0},
                                {x: 215, y: 85},
                                {x: 362, y: 152},
                                {x: 335, y: 215},
                                {x: 480, y: 280},
                                {x: 420, y: 415},
                                {x: 25, y: 240},
                                {x: 0, y: 215}
                            ];
                            section.left = (position.X + 0)*scaleX;
                            section.top = (position.Y + 0)*scaleY;
                            section.btnLeft = (position.X + 200)*scaleX;
                            section.btnTop = (position.Y + 500)*scaleY;
                        }else if(i === 1){
                            section.polygon = [
                                {x: 215, y: 0},
                                {x: 560, y: 0},
                                {x: 952, y: 175},
                                {x: 908, y: 275},
                                {x: 685, y: 175},
                                {x: 672, y: 207},
                                {x: 395, y: 80},
                                {x: 362, y: 152},
                                {x: 215, y: 85},
                            ];
                            section.left = (position.X + 215)*scaleX;
                            section.top = (position.Y + 0)*scaleY;
                            section.btnLeft = (position.X + 800)*scaleX;
                            section.btnTop = (position.Y + -70)*scaleY;
                        }else if(i === 2){
                            section.polygon = [
                                {x: 952, y: 175},
                                {x: 1410, y: 380},
                                {x: 1435, y: 405},
                                {x: 1435, y: 595},
                                {x: 1410, y: 615},
                                {x: 1255, y: 615},
                                {x: 1255, y: 550},
                                {x: 1045, y: 450},
                                {x: 1075, y: 387},
                                {x: 895, y: 305},
                            ];
                            section.left = (position.X + 895)*scaleX;
                            section.top = (position.Y + 175)*scaleY;
                            section.btnLeft = (position.X + 1300)*scaleX;
                            section.btnTop = (position.Y + 150)*scaleY;
                        }else if(i === 3){
                            section.polygon = [
                                {x: 420, y: 415},
                                {x: 465, y: 310},
                                {x: 680, y: 405},
                                {x: 695, y: 375},
                                {x: 1020, y: 520},
                                {x: 1045, y: 450},
                                {x: 1255, y: 550},
                                {x: 1255, y: 615},
                                {x: 870, y: 615}
                            ];
                            section.left = (position.X + 420)*scaleX;
                            section.top = (position.Y + 310)*scaleY;
                            section.btnLeft = (position.X + 1100)*scaleX;
                            section.btnTop = (position.Y + 700)*scaleY;
                        }
                        createSection(section,i,!obj.sections[i])
                    }
                    break;
                case 3:
                    for(let i = 0; i < 4; i++){
                        if(i === 0){
                            section.polygon = [
                                {x: 0, y: 25},
                                {x: 25, y: 0},
                                {x: 215, y: 0},
                                {x: 215, y: 85},
                                {x: 362, y: 152},
                                {x: 335, y: 215},
                                {x: 1020, y: 520},
                                {x: 1045, y: 450},
                                {x: 1255, y: 550},
                                {x: 1255, y: 615},
                                {x: 870, y: 615},
                                {x: 25, y: 240},
                                {x: 0, y: 215}
                            ];
                            section.left = (position.X + 0)*scaleX;
                            section.top = (position.Y + 0)*scaleY;
                            section.btnLeft = (position.X + 400)*scaleX;
                            section.btnTop = (position.Y + 500)*scaleY;
                        }else if(i === 1){
                            section.polygon = [
                                {x: 0, y: 25},
                                {x: 25, y: 0},
                                {x: 560, y: 0},
                                {x: 952, y: 175},
                                {x: 895, y: 305},
                                {x: 672, y: 207},
                                {x: 395, y: 80},
                                {x: 335, y: 215},
                                {x: 480, y: 280},
                                {x: 420, y: 415},
                                {x: 25, y: 240},
                                {x: 0, y: 215},
                            ];
                            section.left = (position.X + 0)*scaleX;
                            section.top = (position.Y + 0)*scaleY;
                            section.btnLeft = (position.X + 300)*scaleX;
                            section.btnTop = (position.Y + -100)*scaleY;
                        }else if(i === 2){
                            section.polygon = [
                                {x: 215, y: 0},
                                {x: 560, y: 0},
                                {x: 1410, y: 380},
                                {x: 1435, y: 405},
                                {x: 1435, y: 595},
                                {x: 1410, y: 615},
                                {x: 1255, y: 615},
                                {x: 1255, y: 550},
                                {x: 1045, y: 450},
                                {x: 1075, y: 387},
                                {x: 395, y: 80},
                                {x: 362, y: 152},
                                {x: 215, y: 85},
                            ];
                            section.left = (position.X + 215)*scaleX;
                            section.top = (position.Y + 0)*scaleY;
                            section.btnLeft = (position.X + 900)*scaleX;
                            section.btnTop = (position.Y + 50)*scaleY;
                        }else if(i === 3){
                            section.polygon = [
                                {x: 952, y: 175},
                                {x: 1410, y: 380},
                                {x: 1435, y: 405},
                                {x: 1435, y: 595},
                                {x: 1410, y: 615},
                                {x: 870, y: 615},
                                {x: 420, y: 415},
                                {x: 480, y: 280},
                                {x: 1020, y: 520},
                                {x: 1045, y: 450},
                                {x: 1075, y: 387},
                                {x: 895, y: 305}
                            ];
                            section.left = (position.X + 420)*scaleX;
                            section.top = (position.Y + 175)*scaleY;
                            section.btnLeft = (position.X + 1100)*scaleX;
                            section.btnTop = (position.Y + 700)*scaleY;
                        }
                        let selectionFlag, disabledStroke, disabledFill, disabledText;
                        // [null, 2, null, null]
                        //   0    1    2     3
                        if(((obj.sections[0] ||  obj.sections[2]) && (i === 1 || i === 3)) ||
                            ((obj.sections[1] ||  obj.sections[3]) && (i === 0 || i === 2))){
                            selectionFlag = false;
                            disabledStroke = scheme.baseColors.disabledStroke;
                            disabledFill = scheme.baseColors.disabledFill;
                            disabledText = scheme.baseColors.disabledText;
                        }else if(obj.sections[i]){
                            selectionFlag = false;
                            disabledStroke = scheme.baseColors.strokeEngagedBtn;
                            disabledFill = scheme.baseColors.fillEngagedBtn;
                            disabledText = scheme.baseColors.fillEngagedText;
                        }else{
                            selectionFlag = true;
                            disabledStroke = scheme.baseColors.strokeFreeBtn;
                            disabledFill = scheme.baseColors.fillFreeBtn;
                            disabledText = scheme.baseColors.fillFreeText;
                        }
                        createSection(section,i,selectionFlag)
                    }
                    break;

                case 4:
                    for(let i = 0; i < 4; i++){
                        if(i === 0){
                            section.polygon = [
                                {x: 0, y: 25},
                                {x: 25, y: 0},
                                {x: 215, y: 0},
                                {x: 215, y: 85},
                                {x: 362, y: 152},
                                {x: 335, y: 215},
                                {x: 1020, y: 520},
                                {x: 1045, y: 450},
                                {x: 1255, y: 550},
                                {x: 1255, y: 615},
                                {x: 870, y: 615},
                                {x: 25, y: 240},
                                {x: 0, y: 215}
                            ];
                            section.left = (position.X + 0)*scaleX;
                            section.top = (position.Y + 0)*scaleY;
                            section.btnLeft = (position.X + 400)*scaleX;
                            section.btnTop = (position.Y + 500)*scaleY;
                        }else if(i === 1){
                            section.polygon = [
                                {x: 0, y: 25},
                                {x: 25, y: 0},
                                {x: 560, y: 0},
                                {x: 952, y: 175},
                                {x: 895, y: 305},
                                {x: 672, y: 207},
                                {x: 395, y: 80},
                                {x: 335, y: 215},
                                {x: 480, y: 280},
                                {x: 420, y: 415},
                                {x: 25, y: 240},
                                {x: 0, y: 215},
                            ];
                            section.left = (position.X + 0)*scaleX;
                            section.top = (position.Y + 0)*scaleY;
                            section.btnLeft = (position.X + 300)*scaleX;
                            section.btnTop = (position.Y + -100)*scaleY;
                        }else if(i === 2){
                            section.polygon = [
                                {x: 215, y: 0},
                                {x: 560, y: 0},
                                {x: 1410, y: 380},
                                {x: 1435, y: 405},
                                {x: 1435, y: 595},
                                {x: 1410, y: 615},
                                {x: 1255, y: 615},
                                {x: 1255, y: 550},
                                {x: 1045, y: 450},
                                {x: 1075, y: 387},
                                {x: 395, y: 80},
                                {x: 362, y: 152},
                                {x: 215, y: 85},
                            ];
                            section.left = (position.X + 215)*scaleX;
                            section.top = (position.Y + 0)*scaleY;
                            section.btnLeft = (position.X + 900)*scaleX;
                            section.btnTop = (position.Y + 50)*scaleY;
                        }else if(i === 3){
                            section.polygon = [
                                {x: 952, y: 175},
                                {x: 1410, y: 380},
                                {x: 1435, y: 405},
                                {x: 1435, y: 595},
                                {x: 1410, y: 615},
                                {x: 870, y: 615},
                                {x: 420, y: 415},
                                {x: 480, y: 280},
                                {x: 1020, y: 520},
                                {x: 1045, y: 450},
                                {x: 1075, y: 387},
                                {x: 895, y: 305}
                            ];
                            section.left = (position.X + 420)*scaleX;
                            section.top = (position.Y + 175)*scaleY;
                            section.btnLeft = (position.X + 1100)*scaleX;
                            section.btnTop = (position.Y + 700)*scaleY;
                        }
                        let selectionFlag, disabledStroke, disabledFill, disabledText;
                        // [null, 2, null, null]
                        //   0    1    2     3
                        if(((obj.sections[0] ||  obj.sections[2]) && (i === 1 || i === 3)) ||
                            ((obj.sections[1] ||  obj.sections[3]) && (i === 0 || i === 2))){
                            selectionFlag = false;
                            disabledStroke = scheme.baseColors.disabledStroke;
                            disabledFill = scheme.baseColors.disabledFill;
                            disabledText = scheme.baseColors.disabledText;
                        }else if(obj.sections[i]){
                            selectionFlag = false;
                            disabledStroke = scheme.baseColors.strokeEngagedBtn;
                            disabledFill = scheme.baseColors.fillEngagedBtn;
                            disabledText = scheme.baseColors.fillEngagedText;
                        }else{
                            selectionFlag = true;
                            disabledStroke = scheme.baseColors.strokeFreeBtn;
                            disabledFill = scheme.baseColors.fillFreeBtn;
                            disabledText = scheme.baseColors.fillFreeText;
                        }
                        createSection(section,i,selectionFlag)
                    }
                    break;

                default:
                    console.log('type is not correct');
                    break;
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
                    let activeSection = activeObjects['_objects'][1];
                    let activeBtn = activeObjects['_objects'][0];
                    if(activeSection.hasOwnProperty('selectable')){
                        if(activeSection.selectable){
                            if(!activeObjects.selected){
                                activeObjects.selected = true;
                                activeSection.fill = scheme.baseColors.fillEngagedPolygon;
                                activeBtn['_objects'][0].fill = scheme.baseColors.fillEngagedBtn;
                                activeBtn['_objects'][1].fill = scheme.baseColors.fillEngagedText;
                            }else{
                                activeObjects.selected = false;
                                activeSection.fill = scheme.baseColors.fillFreePolygon;
                                activeBtn['_objects'][0].fill = scheme.baseColors.fillFreeBtn;
                                activeBtn['_objects'][1].fill = scheme.baseColors.fillFreeText;
                            }
                        }
                    }
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
                drawScheme.reRender.call(this,'floor', this.floor);
            },

            changeSegment: (segment) => {
                this.segment = parseInt(segment);
                drawScheme.reRender.call(this,'segment', this.segment);
            },

            desposition: (item) => {
                console.log(item.checked);
            },

            show: function (me) {
                me.style.display = 'block';
            },

            hide: function (me) {
                me.style.display = 'none';
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
            item.floorBG = scheme.imgDir + scheme.floorImgName + item.type + scheme.imgFormat;
            return {...item}
        });

        this.result = result;
        DrawScheme.setSchemeRender(result);

        return this;
    }
}

class DrawScheme extends Scheme {
    constructor(conf) {
        super(conf);
        this.loadScheme().then(()=>{
            this.draw();
        });
    }

    loadScheme() {
        return new Promise((resolve, reject) => {
            async function loadJSON (url) {
                const res = await fetch(url);
                return await res.json();
            }

            loadJSON('static/office/data.json').then(data => {
                DrawScheme.setSchemeRender(data);
                resolve(data);
            });
        }).catch((error)=>{})

    }

    static setSchemeRender (data) {
        localStorage.setItem('schemeRender', JSON.stringify(data));
    }

    draw() {
        this.clearAll();
        this.getStorageData();
        const formatter = new DataFormatter(this);
        this.render(DrawScheme.normalize(formatter.getResult()));
        this.render(formatter.getResult());
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
                if(section.floor == scheme.floor){
                    console.log(section);
                    this.add(section);
                }

                return false;
            });
        };
        drawProcessor(data);
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
export default DrawScheme;