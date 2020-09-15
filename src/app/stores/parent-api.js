import store from './index';
import app from '../app';

function iosEventHandler(event) {
    let data = event.detail;
    if (!data || !data.target) return;

    window.removeEventListener('message', win32EventHandler, false);
    // ParentApiStore.state.platform = 'ios';

    store.dispatch('ParentApiStore/' + data.target, data.payload);
}

function win32EventHandler(event) {
    let data = event.data;
    if (!data || !data.target) return;

    window.removeEventListener('ios-event', iosEventHandler, false);
    // ParentApiStore.state.platform = 'win32';

    store.dispatch('ParentApiStore/' + data.target, data.payload);
}

window.addEventListener('ios-event', iosEventHandler, false);
window.addEventListener('message', win32EventHandler, false);

let inited = false;

function send(target, payload = null) {
    if (ParentApiStore.state.platform === 'win32') {
        window.parent.postMessage({
            target,
            payload,
        }, "file://");
    } else if (ParentApiStore.state.platform === 'ios') {
        window.webkit.messageHandlers.jsHandler.postMessage({
            target,
            payload,
        });
    }
}

const quarters = [235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258]
const halfs = [259, 260, 261, 262, 263, 264, 265, 266, 267, 268]
const total = [269, 270]

export let ParentApiStore = {
    namespaced: true,
    state: {
        // platform: null,
        platform: 'win32',
        // platform: 'ios',
        initData: null,
        panoTours: [
            {
                "id":29,
                "project_id":65,
                "project_asset_type":"pano_tour",
                "size_mb":38,
                "version":"0.0.1",
                "entry_point":null,
                "storage_name":"pano_tours/stonehedge_cameo_pano_s14_0.0.1.asar",
                "internal_name":"stonehedge_cameo_pano_s14",
                "description":"",
                "created_at":"2019-08-17T15:00:00+00:00",
                "available_at":"2019-08-17T23:59:59+00:00",
                "deleted_at":null,
                "storage_name_full":"https://bucketeer-f417e3c9-****-4783-8cfe-18d1c123e2c4.s3.amazonaws.com/pano_tours/stonehedge_cameo_pano_s14_0.0.1.asar",
                "path":"4\\stonehedge_cameo_pano_s14_0.0.1_1586169626873.asar",
                "pathTemp":"temp\\4\\stonehedge_cameo_pano_s14_0.0.1_1586169626873.asar"
            },
            {
                "id":35,
                "project_id":65,
                "project_asset_type":"pano_tour",
                "size_mb":352,
                "version":"0.0.2",
                "entry_point":null,
                "storage_name":"pano_tours/stonehedge_cameo_pano_exterior_0.0.2.asar",
                "internal_name":"stonehedge_cameo_pano_exterior",
                "description":"Tour update",
                "created_at":"2019-08-19T15:00:00+00:00",
                "available_at":"2019-08-19T23:59:59+00:00",
                "deleted_at":null,
                "storage_name_full":"https://bucketeer-f417e3c9-****-4783-8cfe-18d1c123e2c4.s3.amazonaws.com/pano_tours/stonehedge_cameo_pano_exterior_0.0.2.asar",
                "path":"4\\stonehedge_cameo_pano_exterior_0.0.2_1586169633532.asar",
                "pathTemp":"temp\\4\\stonehedge_cameo_pano_exterior_0.0.2_1586169633532.asar"
            }
        ],
        builds: [
            {
                "id": 23,
                "project_id": 65,
                "project_asset_type": "build",
                "size_mb": 1130,
                "version": "0.0.4",
                "entry_point": "StoneHedgeCameoS15.exe",
                "storage_name": "vr_tours/2018-07-11_LondonSmall.zip",
                "internal_name": "stonehedge_cameo_s15",
                "description": "vr_tours/190808_StoneHedgeCameoS15.zip - StoneHedgeCameoS15.exe",
                "created_at": "2019-08-01T15:00:00+00:00",
                "available_at": "2019-08-01T23:59:59+00:00",
                "deleted_at": null,
                "storage_name_full": "https://bucketeer-f417e3c9-****-4783-8cfe-18d1c123e2c4.s3.amazonaws.com/vr_tours/2018-07-11_LondonSmall.zip",
                "path": "4\\stonehedge_cameo_s15\\2018-07-11_LondonSmall_1586171598123",
                "pathTemp": "temp\\4\\stonehedge_cameo_s15\\2018-07-11_LondonSmall_1586171598123.zip",
                "extracted": true,
                "executableFilePath": null
            },
            {
                "id": 24,
                "project_id": 65,
                "project_asset_type": "build",
                "size_mb": 1770,
                "version": "0.0.4",
                "entry_point": "StoneHedgeCameoS14.exe",
                "storage_name": "vr_tours/2018-07-11_LondonSmall.zip",
                "internal_name": "stonehedge_cameo_s14",
                "description": "vr_tours/190808_StoneHedgeCameoS14.zip - StoneHedgeCameoS14.exe",
                "created_at": "2019-08-01T15:00:00+00:00",
                "available_at": "2019-08-01T23:59:59+00:00",
                "deleted_at": null,
                "storage_name_full": "https://bucketeer-f417e3c9-****-4783-8cfe-18d1c123e2c4.s3.amazonaws.com/vr_tours/2018-07-11_LondonSmall.zip",
                "path": "4\\stonehedge_cameo_s14\\2018-07-11_LondonSmall_1586171738215",
                "pathTemp": "temp\\4\\stonehedge_cameo_s14\\2018-07-11_LondonSmall_1586171738215.zip",
                "extracted": true,
                "executableFilePath": null
            },
            {
                "id": 25,
                "project_id": 65,
                "project_asset_type": "build",
                "size_mb": 3660,
                "version": "0.0.3",
                "entry_point": "StoneHedge_Cameo.exe",
                "storage_name": "vr_tours/2018-07-11_LondonSmall.zip",
                "internal_name": "stonehedge_cameo",
                "description": "vr_tours/190816_StoneHedgeCameo.zip - StoneHedge_Cameo.exe",
                "created_at": "2019-08-15T15:00:00+00:00",
                "available_at": "2019-08-15T23:59:59+00:00",
                "deleted_at": null,
                "storage_name_full": "https://bucketeer-f417e3c9-****-4783-8cfe-18d1c123e2c4.s3.amazonaws.com/vr_tours/2018-07-11_LondonSmall.zip",
                "path": "4\\stonehedge_cameo\\2018-07-11_LondonSmall_1586171860694",
                "pathTemp": "temp\\4\\stonehedge_cameo\\2018-07-11_LondonSmall_1586171860694.zip",
                "extracted": true,
                "executableFilePath": null
            }
        ],
        // Массив четвертей в котором айдишки
        offices: [
            // {
            //     "floor": 1,
            //     "type": 1,
            //     "segment": 1,
            //     "sections": [],
            //     "quarters": [],
            //     "halfs": [],
            //     "total": []
            // },
            // {
            //     "floor": 2,
            //     "type": 1,
            //     "segment": 1,
            //     "sections": [],
            //     "quarters": [],
            //     "halfs": [],
            //     "total": []
            // },
            {
                "floor": 3,
                "type": 2,
                "segment": 1,
                "sections": [],
                "quarters": [],
                "halfs": [],
                "total": []
            },
            {
                "floor": 4,
                "type": 1,
                "segment": 1,
                "sections": [],
                "quarters": [],
                "halfs": [],
                "total": []
            },
            {
                "floor": 5,
                "type": 2,
                "segment": 1,
                "sections": [],
                "quarters": [],
                "halfs": [],
                "total": []
            },
            {
                "floor": 6,
                "type": 1,
                "segment": 3,
                "sections": [],
                "quarters": [],
                "halfs": [],
                "total": []
            },
            {
                "floor": 7,
                "type": 1,
                "segment": 3,
                "sections": [],
                "quarters": [],
                "halfs": [],
                "total": []
            },
            {
                "floor": 8,
                "type": 1,
                "segment": 3,
                "sections": [],
                "quarters": [],
                "halfs": [],
                "total": []
            },
            {
                "floor": 9,
                "type": 1,
                "segment": 3,
                "sections": [],
                "quarters": [],
                "halfs": [],
                "total": []
            },
            {
                "floor": 10,
                "type": 1,
                "segment": 3,
                "sections": [],
                "quarters": [],
                "halfs": [],
                "total": []
            },
            {
                "floor": 11,
                "type": 1,
                "segment": 3,
                "sections": [],
                "quarters": [],
                "halfs": [],
                "total": []
            },
            {
                "floor": 12,
                "type": 1,
                "segment": 3,
                "sections": [],
                "quarters": [],
                "halfs": [],
                "total": []
            },
            {
                "floor": 13,
                "type": 1,
                "segment": 3,
                "sections": [],
                "quarters": [],
                "halfs": [],
                "total": []
            },
            {
                "floor": 14,
                "type": 1,
                "segment": 3,
                "sections": [],
                "quarters": [],
                "halfs": [],
                "total": []
            },
            {
                "floor": 15,
                "type": 1,
                "segment": 3,
                "sections": [],
                "quarters": [],
                "halfs": [],
                "total": []
            }
        ],
        ritail: [
            {
              "floor": 1,
              "placesLength": 25,
              "selectedPlace": [1],
              "sections": []
            },
            {
              "floor": 2,
              "placesLength": 14,
              "selectedPlace": [1,2,4,5,6],
              "sections": []
            }
        ],
        parking: [
            {
                "floor": -1,
                "placesLength": 71,
                "selectedPlace": [1],
                "sections": []
            },
            {
                "floor": -2,
                "placesLength": 100,
                "selectedPlace": [1,2,4,5,6],
                "sections": []
            }
        ],
        savedItems: [
            {
                area: 344.8,
                floor: 3,
                id: 235,
                is_enabled: true,
                levels_count: null,
                name: "o301",
                price: 74138450,
                priceMetr: "215018.71",
                project_id: 65,
                related_units: [
                    259,
                    269,
                ],
                rentMetr: "290.02",
                rent_price: 100000,
                rooms_count: null,
                saved: true,
                scene_checked: false,
                status: "available",
                type: "office"
            },
            {
                area: 244.8,
                floor: 2,
                id: 234,
                is_enabled: true,
                levels_count: null,
                name: "o301",
                price: 74138450,
                priceMetr: "215018.71",
                project_id: 65,
                related_units: [
                    259,
                    269,
                ],
                rentMetr: "290.02",
                rent_price: 100000,
                rooms_count: null,
                saved: true,
                scene_checked: false,
                status: "available",
                type: "office"
            },
            {
                area: 36.5,
                floor: 2,
                id: 231,
                is_enabled: true,
                levels_count: null,
                name: "11",
                price: 10000,
                priceMetr: "273.97",
                project_id: 65,
                related_units: null,
                rentMetr: "27.40",
                rent_price: 1000,
                rooms_count: null,
                saved: false,
                scene_checked: false,
                status: "available",
                type: "retail"
            },
            {
                area: 13.75,
                floor: -2,
                id: 138,
                is_enabled: true,
                levels_count: null,
                name: "039",
                price: 10000,
                priceMetr: "727.27",
                project_id: 65,
                related_units: null,
                rentMetr: "0.00",
                rent_price: null,
                rooms_count: null,
                saved: false,
                scene_checked: false,
                status: "available",
                type: "parking"
            }
        ]
    },

    actions: {
        getOffices ({state}) {
            return state.offices
        },

        getRitails ({state}) {
            return state.ritail
        },

        getParking ({state}) {
            return state.parking
        },

        initState(context){
            if (inited) return;
            inited = true;

            if (context.state.platform === 'ios' || window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.jsHandler) {
                window.webkit.messageHandlers.jsHandler.postMessage({
                    target: 'inited',
                    payload: null,
                });
            }

            if (context.state.platform === 'win32' || window.parent) {
                window.parent.postMessage({
                    target: 'inited',
                    payload: null,
                }, "file://");
            }
        },

        initData({state, dispatch}, payload) {
            state.initData = payload;
            
            dispatch('setOffices', payload.project.placements)

            dispatch('setRitails', payload.project.placements)

            dispatch('setParking', payload.project.placements)

            store.dispatch('initDataReceived', payload)
        },

        addToSaved ({state}, payload) {
            state.savedItems.push(payload)
        },

        removeFromSaved ({state}, payload) {
            state.savedItems = state.savedItems.filter(item => item.id !== payload)
        },

        setParking ({state, dispatch}, payload) {
            const parkingArr = payload.filter(item => item.type == "parking")
            parkingArr.forEach(parking => {
                parking.rentMetr = Number(parking.rent_price / parking.area).toFixed(2)
                parking.priceMetr = Number(parking.price / parking.area).toFixed(2)

                parking.scene_checked = false
                parking.saved = false

                const parkingObject = state.parking.find(item => {
                    return item.floor == parking.floor
                })

                parkingObject.sections.push(parking)
            })
        },

        setRitails ({state, dispatch}, payload) {
            const ritailArr = payload.filter(item => item.type == "retail")
            ritailArr.forEach(ritail => {
                ritail.rentMetr = Number(ritail.rent_price / ritail.area).toFixed(2)
                ritail.priceMetr = Number(ritail.price / ritail.area).toFixed(2)

                ritail.scene_checked = false
                ritail.saved = false

                const ritailObject = state.ritail.find(item => {
                    return item.floor == ritail.floor
                })

                ritailObject.sections.push(ritail)
            })
        },

        setOffices ({ state, dispatch }, payload) {
            const officeArr = payload.filter(item => item.type === 'office')
            officeArr.forEach(office => {

                if (office.status !== "available") {
                    const status = office.status
                    setTimeout(() => {
                        if (office.related_units !== null && office.related_units.length) {
                            office.related_units.forEach((item) => {
                                const currentOffice =  officeArr.find(officeItem => officeItem.id == item)
                                currentOffice.status = status
                            })
                        }
                    }, 100);
                }

                office.rentMetr = Number(office.rent_price / office.area).toFixed(2)
                office.priceMetr = Number(office.price / office.area).toFixed(2)

                office.scene_checked = false
                office.saved = false
                const officeObject = state.offices.find(item => {
                    return item.floor == office.floor
                })

                if ( quarters.includes(office.id) ) {
                    officeObject.quarters.push(office)
                } else if (halfs.includes(office.id)) {
                    officeObject.halfs.push(office)
                } else if (total.includes(office.id)) {
                    officeObject.total.push(office)
                }

                dispatch('setOfficeSection', {floor: officeObject.floor, sections: officeObject.quarters})
            })
        },

        setOfficeSection ({state}, payload) {
            const currentOffice = state.offices.find(item => item.floor == payload.floor)
            currentOffice.sections = payload.sections
        },

        setSavedOffices ({state}, payload) {
            const sectionFloor = state.offices.filter(floor => floor.floor == payload.floor)
            const savedItem = sectionFloor[0].sections.find(item => item.id == payload.id)
            savedItem.saved = true
        },

        unSetSavedOffices ({state}, payload) {
            const sectionFloor = state.offices.filter(floor => floor.floor == payload.floor)
            const savedItem = sectionFloor[0].sections.find(item => item.id == payload.id)
            savedItem.saved = false
        },
        

        touchBuild(context, buildId) {
            send('buildTouch', buildId);
        },
        touchPanoTour(context, panoTourId) {
            send('panoTourTouch', panoTourId);
        },

        goBack(context) {
            send('outFromPresentation');
        },

        log(context, payload) {
            send('log', payload);
        },

        sharingRequest(context, payload) {
            send('sharingRequest', payload);
        },
        sharingResponse(context, payload) {
            app.$emit('sharing-response', payload);
        },
        sharingCancel() {
            send('sharingCancel');
        },

        routeLog(context) {
            if (!app || !app.$route) return;

            const route = app.$route;

            let logData = {
                target: 'route',
                value: route.path,
            };

            if (route.params && route.params.num) {
                let villa = context.rootGetters['VillaStore/villa'](route.params.num);
                logData.placementId = villa.id;
            }

            send('log', logData);
        },
        changeScreenLogTrigger(context) {
            context.dispatch('routeLog');
        },
    },
};

document.addEventListener("keyup", event => {
    if (event.key === 'F11') {
        send('toggleFullScreen');
    }
});