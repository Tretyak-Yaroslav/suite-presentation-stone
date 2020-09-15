export let VillaStore = {
    namespaced: true,
    state: {
        marked: [],

        villas: [
            {
                id: 1,
                name: 'Вилла 01',
                price: 188500000,
                levels_count: 3,
                area: 391.7,
                areaLocal: {
                    totalFloors: 300.18,
                    floor: {
                        0: 38,
                        1: 78.7,
                        2: 103.6,
                        3: 79.88,
                    },
                    front_yard: 42.94,
                    back_yard: 25.79,
                    terrace: 22.79,
                },
                elevator: true,
                fireplace: true,
                emergency_entrance: true,
                access_control: true,
                stained_glass: true,
                electric_windows: true,
                electricity: 108,
                ceiling_height: {
                    max: 4.2,
                    floor: {
                        0: 4.59,
                        1: 4.17,
                        2: 3.51,
                        3: 3.71,
                    },
                },
            },
            {
                id: 2,
                name: 'Вилла 02',
                price: 163450000,
                levels_count: 2,
                area: 301.32,
                areaLocal: {
                    totalFloors: 236.91,
                    floor: {
                        0: 26.66,
                        1: 99.32,
                        2: 110.93,
                    },
                    front_yard: 30.17,
                    back_yard: 34.24,
                },
                elevator: false,
                fireplace: false,
                emergency_entrance: true,
                access_control: true,
                stained_glass: true,
                electric_windows: true,
                electricity: 111,
                ceiling_height: {
                    max: 4.2,
                    floor: {
                        0: 4.59,
                        1: 4.17,
                        2: 3.51,
                    },
                },
            },
            {
                id: 3,
                name: 'Вилла 03',
                price: 235000000,
                levels_count: 3,
                area: 452.86,
                areaLocal: {
                    totalFloors: 325.18,
                    floor: {
                        0: 30.00,
                        1: 97.27,
                        2: 111.94,
                        3: 85.97,
                    },
                    front_yard: 38.94,
                    back_yard: 66.49,
                    terrace: 22.25,
                },
                elevator: true,
                fireplace: true,
                emergency_entrance: true,
                access_control: true,
                stained_glass: true,
                electric_windows: true,
                electricity: 146,
                ceiling_height: {
                    max: 4.2,
                    floor: {
                        0: 4.59,
                        1: 4.17,
                        2: 3.51,
                        3: 3.71,
                    },
                },
            },
            {
                id: 4,
                name: 'Вилла 04',
                price: 223400000,
                levels_count: 3,
                area: 422.7,
                areaLocal: {
                    totalFloors: 318.77,
                    floor: {
                        0: 34.48,
                        1: 93.97,
                        2: 107.79,
                        3: 82.53,
                    },
                    front_yard: 42.99,
                    back_yard: 39.93,
                    terrace: 21.06,
                },
                elevator: true,
                fireplace: true,
                emergency_entrance: true,
                access_control: true,
                stained_glass: true,
                electric_windows: true,
                electricity: 148,
                ceiling_height: {
                    max: 4.2,
                    floor: {
                        0: 4.59,
                        1: 4.17,
                        2: 3.51,
                        3: 3.71,
                    },
                },
            },
            {
                id: 5,
                name: 'Вилла 05',
                price: 163600000,
                levels_count: 2,
                area: 367.75,
                areaLocal: {
                    totalFloors: 273.12,
                    floor: {
                        0: 50.77,
                        1: 105.05,
                        2: 117.30,
                    },
                    front_yard: 49.04,
                    back_yard: 45.59,
                },
                elevator: false,
                fireplace: false,
                emergency_entrance: true,
                access_control: true,
                stained_glass: true,
                electric_windows: true,
                electricity: 120,
                ceiling_height: {
                    max: 4.2,
                    floor: {
                        0: 4.59,
                        1: 4.17,
                        2: 3.51,
                    },
                },
            },
            {
                id: 6,
                name: 'Вилла 06',
                levels_count: 3,
                area: 495.59,
                areaLocal: {
                    totalFloors: 336.09,
                    floor: {
                        0: 42.53,
                        1: 97.23,
                        2: 110.11,
                        3: 86.22,
                    },
                    front_yard: 42.18,
                    back_yard: 96.49,
                    terrace: 20.83,
                },
                elevator: true,
                fireplace: true,
                emergency_entrance: true,
                access_control: true,
                stained_glass: true,
                electric_windows: true,
                electricity: 145,
                ceiling_height: {
                    max: 4.2,
                    floor: {
                        0: 4.59,
                        1: 4.17,
                        2: 3.51,
                        3: 3.71,
                    },
                },
            },
            {
                id: 7,
                name: 'Вилла 07',
                levels_count: 3,
                area: 454.91,
                areaLocal: {
                    totalFloors: 343.93,
                    floor: {
                        0: 39.88,
                        1: 100.47,
                        2: 114.49,
                        3: 89.09,
                    },
                    front_yard: 54.13,
                    back_yard: 36.19,
                    terrace: 20.66,
                },
                elevator: true,
                fireplace: true,
                emergency_entrance: true,
                access_control: true,
                stained_glass: true,
                electric_windows: true,
                electricity: 153,
                ceiling_height: {
                    max: 4.2,
                    floor: {
                        0: 4.59,
                        1: 4.17,
                        2: 3.51,
                        3: 3.71,
                    },
                },
            },
            {
                id: 8,
                name: 'Вилла 08',
                price: 164050000,
                levels_count: 2,
                area: 311.03,
                areaLocal: {
                    totalFloors: 233.44,
                    floor: {
                        0: 27.87,
                        1: 99.20,
                        2: 106.37,
                    },
                    front_yard: 42.67,
                    back_yard: 34.92,
                },
                elevator: false,
                fireplace: false,
                emergency_entrance: true,
                access_control: true,
                stained_glass: true,
                electric_windows: true,
                electricity: 123,
                ceiling_height: {
                    max: 4.2,
                    floor: {
                        0: 4.59,
                        1: 4.17,
                        2: 3.51,
                    },
                },
            },
            {
                id: 9,
                name: 'Вилла 09',
                price: 215650000,
                levels_count: 3,
                area: 417.67,
                areaLocal: {
                    totalFloors: 318.89,
                    floor: {
                        0: 34.90,
                        1: 93.59,
                        2: 108.18,
                        3: 82.22,
                    },
                    front_yard: 46.87,
                    back_yard: 29.42,
                    terrace: 22.49,
                },
                elevator: true,
                fireplace: true,
                emergency_entrance: true,
                access_control: true,
                stained_glass: true,
                electric_windows: true,
                electricity: 148,
                ceiling_height: {
                    max: 4.2,
                    floor: {
                        0: 4.59,
                        1: 4.17,
                        2: 3.51,
                        3: 3.71,
                    },
                },
            },
            {
                id: 10,
                name: 'Вилла 10',
                price: 231650000,
                levels_count: 3,
                area: 408.48,
                areaLocal: {
                    totalFloors: 324.07,
                    floor: {
                        0: 25.92,
                        1: 98.42,
                        2: 112.85,
                        3: 86.88,
                    },
                    front_yard: 38.31,
                    back_yard: 23.72,
                    terrace: 22.38,
                },
                elevator: true,
                fireplace: true,
                emergency_entrance: true,
                access_control: true,
                stained_glass: true,
                electric_windows: true,
                electricity: 148,
                ceiling_height: {
                    max: 4.2,
                    floor: {
                        0: 4.59,
                        1: 4.17,
                        2: 3.51,
                        3: 3.71,
                    },
                },
            },
            {
                id: 11,
                name: 'Вилла 11',
                levels_count: 2,
                area: 282.84,
                areaLocal: {
                    totalFloors: 231.19,
                    floor: {
                        0: 25.72,
                        1: 96.90,
                        2: 108.57,
                    },
                    front_yard: 27.82,
                    back_yard: 23.83,
                },
                elevator: false,
                fireplace: false,
                emergency_entrance: true,
                access_control: true,
                stained_glass: true,
                electric_windows: true,
                electricity: 106,
                ceiling_height: {
                    max: 4.2,
                    floor: {
                        0: 4.59,
                        1: 4.17,
                        2: 3.51,
                    },
                },
            },
            {
                id: 12,
                name: 'Вилла 12',
                levels_count: 3,
                area: 416.68,
                areaLocal: {
                    totalFloors: 335.71,
                    floor: {
                        0: 28.91,
                        1: 104.49,
                        2: 119.14,
                        3: 83.17,
                    },
                    front_yard: 34.09,
                    back_yard: 24.63,
                    terrace: 22.25,
                },
                elevator: true,
                fireplace: true,
                emergency_entrance: true,
                access_control: true,
                stained_glass: true,
                electric_windows: true,
                electricity: 151,
                ceiling_height: {
                    max: 4.2,
                    floor: {
                        0: 4.59,
                        1: 4.17,
                        2: 3.51,
                        3: 3.71,
                    },
                },
            },
            {
                id: 13,
                name: 'Вилла 13',
                price: 170950000,
                levels_count: 2,
                area: 342.68,
                areaLocal: {
                    totalFloors: 232.44,
                    floor: {
                        0: 28.57,
                        1: 95.20,
                        2: 108.67,
                    },
                    front_yard: 36.77,
                    back_yard: 73.47,
                },
                elevator: false,
                fireplace: false,
                emergency_entrance: true,
                access_control: true,
                stained_glass: true,
                electric_windows: true,
                electricity: 101,
                ceiling_height: {
                    max: 4.2,
                    floor: {
                        0: 4.59,
                        1: 4.17,
                        2: 3.51,
                    },
                },
            },
            {
                id: 14,
                name: 'Вилла 14',
                price: 358950000,
                levels_count: 3,
                area: 590.59,
                areaLocal: {
                    totalFloors: 443.68,
                    floor: {
                        0: 43.25,
                        1: 136.01,
                        2: 157.22,
                        3: 107.20,
                    },
                    front_yard: 41.61,
                    back_yard: 62.26,
                    terrace: 43.04,
                },
                elevator: true,
                fireplace: true,
                emergency_entrance: true,
                access_control: true,
                stained_glass: true,
                electric_windows: true,
                electricity: 187,
                ceiling_height: {
                    max: 4.2,
                    floor: {
                        0: 4.59,
                        1: 4.17,
                        2: 3.51,
                        3: 3.71,
                    },
                },
            },
            {
                id: 15,
                name: 'Вилла 15',
                price: 184050000,
                levels_count: 2,
                area: 322.87,
                areaLocal: {
                    totalFloors: 235.72,
                    floor: {
                        0: 47.94,
                        1: 86.35,
                        2: 101.43,
                    },
                    front_yard: 36.85,
                    back_yard: 50.30,
                },
                elevator: false,
                fireplace: false,
                emergency_entrance: true,
                access_control: true,
                stained_glass: true,
                electric_windows: true,
                electricity: 106,
                ceiling_height: {
                    max: 4.2,
                    floor: {
                        0: 4.59,
                        1: 4.17,
                        2: 3.51,
                    },
                },
            },
            {
                id: 16,
                name: 'Вилла 16',
                price: 250400000,
                levels_count: 3,
                area: 454.51,
                areaLocal: {
                    totalFloors: 315.41,
                    floor: {
                        0: 46.34,
                        1: 89.57,
                        2: 104.17,
                        3: 75.33,
                    },
                    front_yard: 56.09,
                    back_yard: 60.63,
                    terrace: 22.38,
                },
                elevator: true,
                fireplace: true,
                emergency_entrance: true,
                access_control: true,
                stained_glass: true,
                electric_windows: true,
                electricity: 140,
                ceiling_height: {
                    max: 4.2,
                    floor: {
                        0: 4.59,
                        1: 4.17,
                        2: 3.51,
                        3: 3.71,
                    },
                },
            },
            {
                id: 17,
                name: 'Вилла 17',
                price: 242150000,
                levels_count: 3,
                area: 464.84,
                areaLocal: {
                    totalFloors: 366.37,
                    floor: {
                        0: 27.13,
                        1: 87.64,
                        2: 138.23,
                        3: 113.37,
                    },
                    front_yard: 32.56,
                    back_yard: 45.77,
                    terrace: 20.14,
                },
                elevator: true,
                fireplace: true,
                emergency_entrance: true,
                access_control: true,
                stained_glass: true,
                electric_windows: true,
                electricity: 162,
                ceiling_height: {
                    max: 4.2,
                    floor: {
                        0: 4.59,
                        1: 4.17,
                        2: 3.51,
                        3: 3.71,
                    },
                },
            },
        ],
    },

    actions: {
        async initState(context, initData) {
            if (!initData || !initData.project || !initData.project.placements || !initData.project.placements.length) {
                return;
            }

            let placements = {};
            initData.project.placements.forEach(unit => {
                placements[unit.id] = unit;
            });

            context.state.villas.forEach(villa => {
                if (villa.id in placements) {
                    Object.assign(villa, placements[villa.id]);
                }
            });
        },

        markToggle(context, villaId) {
            let marked = context.state.marked;
            let index = marked.indexOf(villaId);
            if (index > -1) {
                marked.splice(index, 1);
            } else {
                marked.push(villaId);
            }

            window.presentationData = window.presentationData || {};
            window.presentationData.shareMarked = marked;
        },

        markToggleClear(context) {
            context.state.marked = [];
        },
    },

    getters: {
        villa: state => num => {
            return state.villas[num - 1];
            // return state.villas.find(villa => villa.id === id);
        },
    }
};