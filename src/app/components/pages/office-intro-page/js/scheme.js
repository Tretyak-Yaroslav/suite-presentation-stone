'use strict';

let store;
/*
    Main class for work with canvas
 */

let visibleSeating = false
let selectedSections = []
class Scheme {
    constructor(conf, floor, segment, index, selectedType, seating = false) {
        visibleSeating = seating
        const element = document.getElementById("workspace1");
        this.type = 1;
        this.floor = floor;
        this.segment = segment;
        this.imgDir = `static/office/`;
        this.typeImgName = 'test-floor-type';
        this.imgFormat = '.png';
        this.cWidth = element.offsetWidth;
        this.cHeight = 1000;
        //this.activeGrid = conf ? conf.activeGrid : false;
        //this.activeGrid = conf ? conf.activeGrid : true;
        this.wWidth = element.offsetWidth;
        this.wHeight = 1000;
        this.baseColors = {
            strokeEngagedPolygon: '#626363',
            strokeFreePolygon: '#626363',
            // fillEngagedPolygon: 'rgba(98,99,99,0.51)',
            fillEngagedPolygon: 'rgba(48,106,208,.15)',
            fillFreePolygon: 'rgba(255,255,255,0.01)',
            strokeEngagedBtn: '#3c3bfa',
            strokeFreeBtn: '#000000',
            fillEngagedBtn: '#306AD0',
            fillFreeBtn: '#ffffff',
            fillEngagedText: '#ffffff',
            fillFreeText: '#000000',
            disabledStroke: '#000000',
            disabledFill: '#72747b',
            disabledText: '#000000',
        };

        this.availableSections = {
            quarters: [false, false, false, false],
            halfs: [false, false],
            total: [false]
        }

        this.availableSections[selectedType].forEach((item) => {
            item = false
        })
        this.availableSections[selectedType][index] = true

        window.canvas = new fabric.Canvas('canvas', { selection: true, width: this.cWidth, height: this.cHeight, defaultCursor: "default" });
        fabric.Object.prototype.objectCaching = true;
        fabric.Group.prototype.lockMovementX = true;
        fabric.Group.prototype.lockMovementY = true;
    }

    async getStorageData() {
        this.schemeRender = await store.dispatch('ParentApiStore/getOffices')
        this.schemeRender.forEach(item => {
            if (this.segment == 1) {
                if (item.floor == this.floor) {
                    this.availableSections.quarters.forEach((quarter, i) => {
                        item.sections[i].scene_checked = quarter
                    })
                }
            } else if (this.segment == 2) {
                if (item.floor == this.floor) {
                    this.availableSections.halfs.forEach((halfs, i) => {
                        item.sections[i].scene_checked = halfs
                    })
                }
            } else if (this.segment == 3) {
                if (item.floor == this.floor) {
                    this.availableSections.total.forEach((total, i) => {
                        item.sections[i].scene_checked = total
                    })
                }
            }
        })
    }

    // Add objects
    add(obj, position = { X: 45, Y: 105 }, unlock) {
        let scaleY,
            scaleX;
        fabric.Image.fromURL(obj.typeBG, (img) => {
            scaleY = canvas.width / img.width;
            scaleX = canvas.width / img.width;
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
                radius: 40,
                strokeWidth: 1,
                strokeUniform: true,
                originX: 'center',
                originY: 'center',
                ...baseOptions
            };

            let textOptions = {
                fontSize: 35,
                originX: 'center',
                originY: 'center',
                fontFamily: 'Codec Cold Trial Light',
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

            function createSection(section, i, selectionFlag) {
                let fillColor;
                if (obj.sections[i].status == "available") {
                    if (obj.sections[i].scene_checked) {
                        fillColor = scheme.baseColors.fillEngagedPolygon
                    } else {
                        fillColor = scheme.baseColors.fillFreePolygon
                    }
                } else {
                    fillColor = 'rgba(98,99,99,0.51)'
                }
                let individualOptions = {
                    stroke: obj.sections[i].scene_checked ? scheme.baseColors.strokeEngagedPolygon : scheme.baseColors.strokeFreePolygon,
                    fill: fillColor,
                    selectable: selectionFlag,
                    left: section.left,
                    top: section.top,
                    id: obj.sections[i].id,
                    floor: obj.sections[i].floor,
                    available: obj.sections[i].status == "available"
                };

                let individualBtnOptions = {
                    stroke: obj.sections[i].scene_checked ? scheme.baseColors.strokeEngagedBtn : scheme.baseColors.strokeFreeBtn,
                    fill: obj.sections[i].scene_checked ? scheme.baseColors.fillEngagedBtn : scheme.baseColors.fillFreeBtn,
                };
                let individualTextOptions = {
                    fill: obj.sections[i].scene_checked ? scheme.baseColors.fillEngagedText : scheme.baseColors.fillFreeText,
                };

                let readySection = new fabric.Polygon(section.polygon, { ...polygonOptions, ...individualOptions });
                let circle = new fabric.Circle({ ...btnOptions, ...individualBtnOptions });
                let text = new fabric.Text((i + 1).toString(), { ...textOptions, ...individualTextOptions });
                let btnGroup = new fabric.Group([circle, text], {
                    left: section.btnLeft,
                    top: section.btnTop,
                    ...btnGroupOptions,
                });

                let readyGroup = new fabric.Group([btnGroup, readySection], {
                    selectable: selectionFlag,
                    subTargetCheck: true,
                    ...readyGroupOptions,
                });

                if (readySection.floor == scheme.floor) {
                    readySection.visible = true
                } else {
                    readySection.visible = false
                }

                if (readySection.scene_checked) {
                    canvas.add(readyGroup);
                    readyGroup.moveTo(2000);
                } else {
                    sectionGroup.push(readyGroup);
                }

                selectedSections.push(readySection)

            }
            switch (obj.type) {
                case 1:
                    // type 1 ready, 1/4 of sections
                    if (this.segment == 1) {
                        for (let i = 0; i < 4; i++) {
                            if (i === 0) {
                                section.polygon = [
                                    { x: 0, y: 25 },
                                    { x: 25, y: 0 },
                                    { x: 225, y: 0 },
                                    { x: 225, y: 95 },
                                    { x: 375, y: 162 },
                                    { x: 352, y: 229 },
                                    { x: 485, y: 285 },
                                    { x: 475, y: 320 },
                                    { x: 702, y: 425 },
                                    { x: 652, y: 532 },
                                    { x: 25, y: 260 },
                                    { x: 0, y: 215 }
                                ];
                                section.left = (position.X + 0) * scaleX - 10;
                                section.top = (position.Y + 0) * scaleY - 16;
                                section.btnLeft = (position.X + 200) * scaleX;
                                section.btnTop = (position.Y + 500) * scaleY;
                            } else if (i === 1) {
                                section.polygon = [
                                    { x: 215, y: 0 },
                                    { x: 570, y: 0 },
                                    { x: 728, y: 70 },
                                    { x: 665, y: 210 },
                                    { x: 395, y: 90 },
                                    { x: 365, y: 155 },
                                    { x: 215, y: 88 },
                                ];
                                section.left = (position.X + 215) * scaleX;
                                section.top = (position.Y + 0) * scaleY - 13;
                                section.btnLeft = (position.X + 800) * scaleX;
                                section.btnTop = (position.Y + -70) * scaleY;
                            } else if (i === 2) {
                                section.polygon = [
                                    { x: 725, y: 73 },
                                    { x: 1415, y: 380 },
                                    { x: 1444, y: 412 },
                                    { x: 1444, y: 605 },
                                    { x: 1414, y: 635 },
                                    { x: 1255, y: 635 },
                                    { x: 1255, y: 560 },
                                    { x: 1045, y: 463 },
                                    { x: 1075, y: 399 },
                                    { x: 895, y: 317 },
                                    { x: 910, y: 287 },
                                    { x: 680, y: 185 },
                                ];
                                section.left = (position.X + 680) * scaleX + 4;
                                section.top = (position.Y + 73) * scaleY - 16;
                                section.btnLeft = (position.X + 1300) * scaleX;
                                section.btnTop = (position.Y + 150) * scaleY;
                            } else if (i === 3) {
                                section.polygon = [
                                    { x: 645, y: 523 },
                                    { x: 705, y: 380 },
                                    { x: 1017, y: 520 },
                                    { x: 1045, y: 450 },
                                    { x: 1250, y: 548 },
                                    { x: 1250, y: 625 },
                                    { x: 870, y: 625 }
                                ];
                                section.left = (position.X + 650) * scaleX - 3;
                                section.top = (position.Y + 380) * scaleY - 3;
                                section.btnLeft = (position.X + 1100) * scaleX;
                                section.btnTop = (position.Y + 700) * scaleY;
                            }
                            createSection(section, i, !obj.sections[i].scene_checked);
                        }
                    } else if (this.segment == 2) {
                        for (let i = 0; i < 2; i++) {
                            if (i === 0) {
                                section.polygon = [
                                    { x: 0, y: 25 },
                                    { x: 25, y: 0 },
                                    { x: 225, y: 0 },
                                    { x: 225, y: 95 },
                                    { x: 375, y: 162 },
                                    { x: 352, y: 229 },
                                    { x: 485, y: 285 },
                                    { x: 719, y: 387 },
                                    { x: 1030, y: 529 },
                                    { x: 1055, y: 462 },
                                    { x: 1265, y: 558 },
                                    { x: 1265, y: 635 },
                                    { x: 875, y: 635 },
                                    { x: 652, y: 532 },
                                    { x: 25, y: 260 },
                                    { x: 0, y: 215 }
                                ];
                                section.left = (position.X + 0) * scaleX - 10;
                                section.top = (position.Y + 0) * scaleY - 15;
                                section.btnLeft = (position.X + 200) * scaleX;
                                section.btnTop = (position.Y + 500) * scaleY;
                            } else if (i === 1) {
                                section.polygon = [
                                    { x: 215, y: 0 },
                                    { x: 570, y: 0 },
                                    { x: 728, y: 70 },
                                    { x: 1425, y: 380 },
                                    { x: 1446, y: 412 },
                                    { x: 1446, y: 609 },
                                    { x: 1419, y: 635 },
                                    { x: 1255, y: 635 },
                                    { x: 1255, y: 560 },
                                    { x: 1045, y: 463 },
                                    { x: 1075, y: 399 },
                                    { x: 895, y: 317 },
                                    { x: 665, y: 215 },
                                    { x: 395, y: 93 },
                                    { x: 365, y: 158 },
                                    { x: 215, y: 90 },
                                ];
                                section.left = (position.X + 215) * scaleX;
                                section.top = (position.Y + 0) * scaleY - 15;
                                section.btnLeft = (position.X + 800) * scaleX;
                                section.btnTop = (position.Y + -70) * scaleY;
                            }
                            createSection(section, i, !obj.sections[i].scene_checked);
                        }
                    } else if (this.segment == 3) {
                        for (let i = 0; i < 1; i++) {
                            if (i === 0) {
                                section.polygon = [
                                    { x: 0, y: 25 },
                                    { x: 25, y: 0 },
                                    { x: 225, y: 0 },
                                    { x: 578, y: 0 },
                                    { x: 1435, y: 380 },
                                    { x: 1457, y: 412 },
                                    { x: 1457, y: 611 },
                                    { x: 1422, y: 635 },
                                    { x: 1255, y: 635 },
                                    { x: 1265, y: 635 },
                                    { x: 875, y: 635 },
                                    { x: 652, y: 532 },
                                    { x: 25, y: 260 },
                                    { x: 0, y: 215 }
                                ];
                                section.left = (position.X + 0) * scaleX - 10;
                                section.top = (position.Y + 0) * scaleY - 15;
                                section.btnLeft = (position.X + -200) * scaleX;
                                section.btnTop = (position.Y + -200) * scaleY;
                            }
                            createSection(section, i, !obj.sections[i])
                        }
                    }
                    break;
                case 2:
                    // type 2 ready, 1/4 of sections
                    if (this.segment == 1) {
                        for (let i = 0; i < 4; i++) {
                            if (i === 0) {
                                section.polygon = [
                                    { x: 0, y: 25 },
                                    { x: 25, y: 0 },
                                    { x: 225, y: 0 },
                                    { x: 225, y: 95 },
                                    { x: 378, y: 154 },
                                    { x: 345, y: 219 },
                                    { x: 485, y: 285 },
                                    { x: 425, y: 430 },
                                    { x: 25, y: 255 },
                                    { x: 0, y: 215 }
                                ];
                                section.left = (position.X + 0) * scaleX - 10;
                                section.top = (position.Y + 0) * scaleY - 11;
                                section.btnLeft = (position.X + 200) * scaleX;
                                section.btnTop = (position.Y + 500) * scaleY;
                            } else if (i === 1) {
                                section.polygon = [
                                    { x: 215, y: 0 },
                                    { x: 570, y: 0 },
                                    { x: 958, y: 173 },
                                    { x: 907, y: 276 },
                                    { x: 685, y: 175 },
                                    { x: 670, y: 212 },
                                    { x: 395, y: 95 },
                                    { x: 364, y: 154 },
                                    { x: 215, y: 89 },
                                ];
                                section.left = (position.X + 215) * scaleX;
                                section.top = (position.Y + 0) * scaleY - 11;
                                section.btnLeft = (position.X + 800) * scaleX;
                                section.btnTop = (position.Y + -70) * scaleY;
                            } else if (i === 2) {
                                section.polygon = [
                                    { x: 960, y: 158 },
                                    { x: 1425, y: 359 },
                                    { x: 1450, y: 395 },
                                    { x: 1450, y: 587 },
                                    { x: 1420, y: 615 },
                                    { x: 1257, y: 615 },
                                    { x: 1257, y: 536 },
                                    { x: 1045, y: 448 },
                                    { x: 1075, y: 380 },
                                    { x: 895, y: 300 },
                                ];
                                section.left = (position.X + 895) * scaleX - 2;
                                section.top = (position.Y + 175) * scaleY - 13;
                                section.btnLeft = (position.X + 1300) * scaleX;
                                section.btnTop = (position.Y + 150) * scaleY;
                            } else if (i === 3) {
                                section.polygon = [
                                    { x: 418, y: 419 },
                                    { x: 465, y: 310 },
                                    { x: 680, y: 405 },
                                    { x: 695, y: 375 },
                                    { x: 1015, y: 515 },
                                    { x: 1045, y: 450 },
                                    { x: 1255, y: 545 },
                                    { x: 1255, y: 620 },
                                    { x: 865, y: 620 }
                                ];
                                section.left = (position.X + 420) * scaleX;
                                section.top = (position.Y + 310) * scaleY;
                                section.btnLeft = (position.X + 1100) * scaleX;
                                section.btnTop = (position.Y + 700) * scaleY;
                            }
                            console.log(2)
                            createSection(section, i, !obj.sections[i])
                        }
                    } else if (this.segment == 2) {
                        console.log("SEGMENT - 2")
                        for (let i = 0; i < 2; i++) {
                            if (i === 0) {
                                section.polygon = [
                                    { x: 0, y: 25 },
                                    { x: 25, y: 0 },
                                    { x: 225, y: 0 },
                                    { x: 579, y: 0 },
                                    { x: 962, y: 170 },
                                    { x: 905, y: 314 },
                                    { x: 681, y: 213 },
                                    { x: 405, y: 92 },
                                    { x: 374, y: 155 },
                                    { x: 215, y: 89 },
                                    { x: 378, y: 154 },
                                    { x: 345, y: 219 },
                                    { x: 485, y: 285 },
                                    { x: 425, y: 430 },
                                    { x: 25, y: 255 },
                                    { x: 0, y: 215 }
                                ];
                                section.left = (position.X + 0) * scaleX - 10;
                                section.top = (position.Y + 0) * scaleY - 11;
                                section.btnLeft = (position.X + 700) * scaleX;
                                section.btnTop = (position.Y + -100) * scaleY;
                            } else if (i === 1) {
                                section.polygon = [
                                    { x: 960, y: 158 },
                                    { x: 1425, y: 359 },
                                    { x: 1450, y: 395 },
                                    { x: 1450, y: 587 },
                                    { x: 1420, y: 615 },
                                    { x: 1257, y: 615 },
                                    { x: 865, y: 620 },
                                    { x: 418, y: 419 },
                                    { x: 478, y: 269 },
                                    { x: 697, y: 370 },
                                    { x: 1015, y: 510 },
                                    { x: 1045, y: 450 },
                                    { x: 1257, y: 536 },
                                    { x: 1045, y: 448 },
                                    { x: 1075, y: 380 },
                                    { x: 895, y: 300 },
                                ];
                                section.left = (position.X + 420) * scaleX - 3;
                                section.top = (position.Y + 175) * scaleY - 12;
                                section.btnLeft = (position.X + 700) * scaleX;
                                section.btnTop = (position.Y + 650) * scaleY;
                            }
                            console.log(2)
                            createSection(section, i, !obj.sections[i])
                        }
                    } else if (this.segment == 3) {
                        console.log("SEGMENT - 3")
                        for (let i = 0; i < 1; i++) {
                            if (i === 0) {
                                section.polygon = [

                                    { x: 0, y: 25 },
                                    { x: 25, y: 0 },
                                    { x: 225, y: 0 },
                                    { x: 579, y: 0 },
                                    { x: 962, y: 170 },
                                    { x: 1425, y: 372 },
                                    { x: 1455, y: 399 },
                                    { x: 1455, y: 599 },
                                    { x: 1431, y: 630 },
                                    { x: 1257, y: 630 },
                                    { x: 865, y: 630 },
                                    { x: 428, y: 429 },
                                    { x: 25, y: 255 },
                                    { x: 0, y: 215 }

                                ];
                                section.left = (position.X + 0) * scaleX - 10;
                                section.top = (position.Y + 0) * scaleY - 10;
                                section.btnLeft = (position.X + -200) * scaleX;
                                section.btnTop = (position.Y + -200) * scaleY;
                            }
                            createSection(section, i, !obj.sections[i])
                        }
                    }
                    break;
                case 3:
                    for (let i = 0; i < 4; i++) {
                        if (i === 0) {
                            section.polygon = [
                                { x: 0, y: 25 },
                                { x: 25, y: 0 },
                                { x: 215, y: 0 },
                                { x: 215, y: 85 },
                                { x: 362, y: 152 },
                                { x: 335, y: 215 },
                                { x: 1020, y: 520 },
                                { x: 1045, y: 450 },
                                { x: 1255, y: 550 },
                                { x: 1255, y: 615 },
                                { x: 870, y: 615 },
                                { x: 25, y: 240 },
                                { x: 0, y: 215 }
                            ];
                            section.left = (position.X + 0) * scaleX;
                            section.top = (position.Y + 0) * scaleY;
                            section.btnLeft = (position.X + 400) * scaleX;
                            section.btnTop = (position.Y + 500) * scaleY;
                        } else if (i === 1) {
                            section.polygon = [
                                { x: 0, y: 25 },
                                { x: 25, y: 0 },
                                { x: 560, y: 0 },
                                { x: 952, y: 175 },
                                { x: 895, y: 305 },
                                { x: 672, y: 207 },
                                { x: 395, y: 80 },
                                { x: 335, y: 215 },
                                { x: 480, y: 280 },
                                { x: 420, y: 415 },
                                { x: 25, y: 240 },
                                { x: 0, y: 215 },
                            ];
                            section.left = (position.X + 0) * scaleX;
                            section.top = (position.Y + 0) * scaleY;
                            section.btnLeft = (position.X + 300) * scaleX;
                            section.btnTop = (position.Y + -100) * scaleY;
                        } else if (i === 2) {
                            section.polygon = [
                                { x: 215, y: 0 },
                                { x: 560, y: 0 },
                                { x: 1410, y: 380 },
                                { x: 1435, y: 405 },
                                { x: 1435, y: 595 },
                                { x: 1410, y: 615 },
                                { x: 1255, y: 615 },
                                { x: 1255, y: 550 },
                                { x: 1045, y: 450 },
                                { x: 1075, y: 387 },
                                { x: 395, y: 80 },
                                { x: 362, y: 152 },
                                { x: 215, y: 85 },
                            ];
                            section.left = (position.X + 215) * scaleX;
                            section.top = (position.Y + 0) * scaleY;
                            section.btnLeft = (position.X + 900) * scaleX;
                            section.btnTop = (position.Y + 50) * scaleY;
                        } else if (i === 3) {
                            section.polygon = [
                                { x: 952, y: 175 },
                                { x: 1410, y: 380 },
                                { x: 1435, y: 405 },
                                { x: 1435, y: 595 },
                                { x: 1410, y: 615 },
                                { x: 870, y: 615 },
                                { x: 420, y: 415 },
                                { x: 480, y: 280 },
                                { x: 1020, y: 520 },
                                { x: 1045, y: 450 },
                                { x: 1075, y: 387 },
                                { x: 895, y: 305 }
                            ];
                            section.left = (position.X + 420) * scaleX;
                            section.top = (position.Y + 175) * scaleY;
                            section.btnLeft = (position.X + 1100) * scaleX;
                            section.btnTop = (position.Y + 700) * scaleY;
                        }
                        let selectionFlag, disabledStroke, disabledFill, disabledText;
                        if (((obj.sections[0] || obj.sections[2]) && (i === 1 || i === 3)) ||
                            ((obj.sections[1] || obj.sections[3]) && (i === 0 || i === 2))) {
                            selectionFlag = false;
                            disabledStroke = scheme.baseColors.disabledStroke;
                            disabledFill = scheme.baseColors.disabledFill;
                            disabledText = scheme.baseColors.disabledText;
                        } else if (obj.sections[i]) {
                            selectionFlag = false;
                            disabledStroke = scheme.baseColors.strokeEngagedBtn;
                            disabledFill = scheme.baseColors.fillEngagedBtn;
                            disabledText = scheme.baseColors.fillEngagedText;
                        } else {
                            selectionFlag = true;
                            disabledStroke = scheme.baseColors.strokeFreeBtn;
                            disabledFill = scheme.baseColors.fillFreeBtn;
                            disabledText = scheme.baseColors.fillFreeText;
                        }
                        createSection(section, i, selectionFlag)
                    }
                    break;

                case 4:
                    for (let i = 0; i < 4; i++) {
                        if (i === 0) {
                            section.polygon = [
                                { x: 0, y: 25 },
                                { x: 25, y: 0 },
                                { x: 215, y: 0 },
                                { x: 215, y: 85 },
                                { x: 362, y: 152 },
                                { x: 335, y: 215 },
                                { x: 1020, y: 520 },
                                { x: 1045, y: 450 },
                                { x: 1255, y: 550 },
                                { x: 1255, y: 615 },
                                { x: 870, y: 615 },
                                { x: 25, y: 240 },
                                { x: 0, y: 215 }
                            ];
                            section.left = (position.X + 0) * scaleX;
                            section.top = (position.Y + 0) * scaleY;
                            section.btnLeft = (position.X + 400) * scaleX;
                            section.btnTop = (position.Y + 500) * scaleY;
                        } else if (i === 1) {
                            section.polygon = [
                                { x: 0, y: 25 },
                                { x: 25, y: 0 },
                                { x: 560, y: 0 },
                                { x: 952, y: 175 },
                                { x: 895, y: 305 },
                                { x: 672, y: 207 },
                                { x: 395, y: 80 },
                                { x: 335, y: 215 },
                                { x: 480, y: 280 },
                                { x: 420, y: 415 },
                                { x: 25, y: 240 },
                                { x: 0, y: 215 },
                            ];
                            section.left = (position.X + 0) * scaleX;
                            section.top = (position.Y + 0) * scaleY;
                            section.btnLeft = (position.X + 300) * scaleX;
                            section.btnTop = (position.Y + -100) * scaleY;
                        } else if (i === 2) {
                            section.polygon = [
                                { x: 215, y: 0 },
                                { x: 560, y: 0 },
                                { x: 1410, y: 380 },
                                { x: 1435, y: 405 },
                                { x: 1435, y: 595 },
                                { x: 1410, y: 615 },
                                { x: 1255, y: 615 },
                                { x: 1255, y: 550 },
                                { x: 1045, y: 450 },
                                { x: 1075, y: 387 },
                                { x: 395, y: 80 },
                                { x: 362, y: 152 },
                                { x: 215, y: 85 },
                            ];
                            section.left = (position.X + 215) * scaleX;
                            section.top = (position.Y + 0) * scaleY;
                            section.btnLeft = (position.X + 900) * scaleX;
                            section.btnTop = (position.Y + 50) * scaleY;
                        } else if (i === 3) {
                            section.polygon = [
                                { x: 952, y: 175 },
                                { x: 1410, y: 380 },
                                { x: 1435, y: 405 },
                                { x: 1435, y: 595 },
                                { x: 1410, y: 615 },
                                { x: 870, y: 615 },
                                { x: 420, y: 415 },
                                { x: 480, y: 280 },
                                { x: 1020, y: 520 },
                                { x: 1045, y: 450 },
                                { x: 1075, y: 387 },
                                { x: 895, y: 305 }
                            ];
                            section.left = (position.X + 420) * scaleX;
                            section.top = (position.Y + 175) * scaleY;
                            section.btnLeft = (position.X + 1100) * scaleX;
                            section.btnTop = (position.Y + 700) * scaleY;
                        }
                        let selectionFlag, disabledStroke, disabledFill, disabledText;
                        if (((obj.sections[0] || obj.sections[2]) && (i === 1 || i === 3)) ||
                            ((obj.sections[1] || obj.sections[3]) && (i === 0 || i === 2))) {
                            selectionFlag = false;
                            disabledStroke = scheme.baseColors.disabledStroke;
                            disabledFill = scheme.baseColors.disabledFill;
                            disabledText = scheme.baseColors.disabledText;
                        } else if (obj.sections[i]) {
                            selectionFlag = false;
                            disabledStroke = scheme.baseColors.strokeEngagedBtn;
                            disabledFill = scheme.baseColors.fillEngagedBtn;
                            disabledText = scheme.baseColors.fillEngagedText;
                        } else {
                            selectionFlag = true;
                            disabledStroke = scheme.baseColors.strokeFreeBtn;
                            disabledFill = scheme.baseColors.fillFreeBtn;
                            disabledText = scheme.baseColors.fillFreeText;
                        }
                        createSection(section, i, selectionFlag)
                    }
                    break;

                default:
                    console.log('type is not correct');
                    break;
            }

            let group = new fabric.Group(sectionGroup, {
                selectable: true,
                subTargetCheck: true
            });

            setTimeout(function () {
                canvas.add(group);
                group.moveTo(1000);
                canvas.sendToBack(img)
            }, 100);

            img.on('selected', (e) => { });
            img.on('deselected', () => { });
            img.on('moving', () => { });
            img.on('removed', () => { });
        });

        fabric.Image.fromURL(`static/office/type-${obj.type}-segment-${this.segment}.png`, (img) => {
            scaleY = canvas.width / img.width;
            scaleX = canvas.width / img.width;

            let imgSet = img.set({
                top: 0,
                left: 0,
                fill: 'transparent',
                width: img.width,
                height: img.height,
                scaleY: scaleY,
                scaleX: scaleX,
                selectable: false,
                defaultCursor: 'default',
                visible: visibleSeating,
                name: 'seating'
            });

            canvas.add(imgSet);
            imgSet.moveTo(99);
        })
    }

    //Remove selected object
    remove() {
    }
    // All canvas control buttons
    controls() {
        let drawScheme = this;

        return {
            init: function () {
                function selectObject() { }
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
                    'mouse:down': () => {
                        console.log(321321)
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
                        selectObject()
                    }
                });
            },

           /*  changeType: (type) => {
                this.type = parseInt(type);
                drawScheme.reRender.call(this, 'type', this.type);
            }, */

           /*  changeSegment: (segment, { type, selectedIndex }) => {
                this.segment = parseInt(segment);

                this.availableSections[type].forEach((item) => {
                    item = false
                })
                this.availableSections[type][selectedIndex] = true

                drawScheme.reRender.call(this, 'segment', this.segment);
            },
 */
             desposition: (item) => {
                visibleSeating = item.checked
                drawScheme.reRender.call(this, 'type', this.type);
            }, 

            /*  show: function (me) {
                 me.style.display = 'block';
             },
 
             hide: function (me) {
                 me.style.display = 'none';
             }, */

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
            item.typeBG = scheme.imgDir + scheme.typeImgName + item.type + scheme.imgFormat;
            return { ...item }
        });
        this.result = result;
        DrawScheme.setSchemeRender(result);

        return this;
    }
}

class DrawScheme extends Scheme {
    constructor(conf, floor, segment, index, type, seating = false) {
        store = conf
        super(conf, floor, segment, index, type, seating);
        this.draw();
    }

    static setSchemeRender(data) {
        localStorage.setItem('schemeRender', JSON.stringify(data));
    }

    async draw() {
        this.clearAll();
        await this.getStorageData();
        const formatter = new DataFormatter(this);
        this.render(DrawScheme.normalize(formatter.getResult()));
    }

    clearAll() {
        selectedSections.forEach(selectedS => {
            console.log(1, selectedS.id)
            selectedS.off('mousedown', this.handlerClick)
        })
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

    handlerClick(e) {
        const id = e.subTargets[0].id ? e.subTargets[0].id : e.subTargets[1].id
        if (e.subTargets[0].id) {
            window.scheme.setSection(id)
        }
    }

    render(data) {
        let drawProcessor = (data) => {
            selectedSections = []
            data.forEach((section) => {
                if (section.floor == scheme.floor) {
                    this.add(section);
                    setTimeout(() => {
                        selectedSections.forEach((selectedS => {
                            console.log(2, selectedS.id)
                            selectedS.on('mousedown', this.handlerClick)
                        }))
                    }, 200)
                }

                return false;
            });
        };
        drawProcessor(data);
    }

    reRender(key, value) {
        if (key === 'type') {
            scheme.type = value
        }
        if (key === 'segment') {
            scheme.segment = value

            const floor = scheme.floor

            scheme.schemeRender.forEach(item => {
                if (scheme.segment == 1) {
                    if (item.floor == floor) {
                        scheme.availableSections.quarters.forEach((quarter, i) => {
                            item.sections[i].scene_checked = quarter
                        })
                    }
                } else if (scheme.segment == 2) {
                    if (item.floor == floor) {
                        scheme.availableSections.halfs.forEach((halfs, i) => {
                            item.sections[i].scene_checked = halfs
                        })
                    }
                } else if (scheme.segment == 3) {
                    if (item.floor == floor) {
                        scheme.availableSections.total.forEach((total, i) => {
                            item.sections[i].scene_checked = total
                        })
                    }
                }
            })
        }
        scheme.draw();
    }
};

export default DrawScheme;