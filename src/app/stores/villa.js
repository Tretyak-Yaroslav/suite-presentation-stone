export let VillaStore = {
    namespaced: true,
    state: {
        marked: [],

        villas: [
            {
                id: 1,
                name: 'Вилла 01',
                levels: '29 этажей',
                apartment: '318 квартир',
                apartmens_available: '29 квартир',
                floors: [
                    {   
                        id: 0,
                        number: 17,
                        availibleRoom: 3,
                        flat : [
                            {   
                                id: 0,
                                number: 17,
                                rooms: 2,
                                area: 300,
                                cost: 30000,
                                styles: [
                                    {
                                        id: 1,
                                        name: '50-50-E',
                                        video: '',
                                    },
                                    {
                                        id: 2,
                                        name: 'Минимализм',
                                        video: '',
                                    },
                                    {
                                        id: 3,
                                        name: 'Американская класика',
                                        video: '',
                                    },
                                    {
                                        id: 4,
                                        name: 'Скандинавский',
                                        video: '',
                                    }
                                ],
                            },
                            {
                                id: 1,
                                number: 17,
                                rooms: 2,
                                area: 300,
                                cost: 30000,
                                styles: [
                                    {
                                        id: 1,
                                        name: '50-50-E',
                                        video: '',
                                    },
                                    {
                                        id: 2,
                                        name: 'Минимализм',
                                        video: '',
                                    },
                                    {
                                        id: 3,
                                        name: 'Американская класика',
                                        video: '',
                                    },
                                    {
                                        id: 4,
                                        name: 'Скандинавский',
                                        video: '',
                                    }
                                ],
                            },
                            {
                                id: 2,
                                number: 17,
                                rooms: 2,
                                area: 300,
                                cost: 30000,
                                styles: [
                                    {
                                        id: 1,
                                        name: '50-50-E',
                                        video: '',
                                    },
                                    {
                                        id: 2,
                                        name: 'Минимализм',
                                        video: '',
                                    },
                                    {
                                        id: 3,
                                        name: 'Американская класика',
                                        video: '',
                                    },
                                    {
                                        id: 4,
                                        name: 'Скандинавский',
                                        video: '',
                                    }
                                ],
                            },
                        ],
                    },
                    {   
                        id: 1,
                        number: 17,
                        availibleRoom: 4,
                        flat : [
                            {   
                                id: 0,
                                number: 17,
                                rooms: 2,
                                area: 300,
                                cost: 30000,
                            },
                            {
                                id: 1,
                                number: 17,
                                rooms: 2,
                                area: 300,
                                cost: 30000,
                            },
                            {
                                id: 2,
                                number: 17,
                                rooms: 2,
                                area: 300,
                                cost: 30000,
                            },
                        ],
                    },
                ],
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
                levels: '29 этажей',
                apartment: '318 квартир',
                apartmens_available: '29 квартир',
                floors: [
                    {
                        flat : [
                            {   
                                id: 0,
                                number: 17,
                                rooms: 2,
                                area: 300,
                                cost: 30000,
                            },
                            {
                                id: 1,
                                number: 17,
                                rooms: 2,
                                area: 300,
                                cost: 30000,
                            },
                            {
                                id: 2,
                                number: 17,
                                rooms: 2,
                                area: 300,
                                cost: 30000,
                            },
                        ],
                    },
                    {
                        flat : [
                            {   
                                id: 1,
                                rooms: 2,
                                area: 300,
                                cost: 30000,
                            },
                            {
                                id: 2,
                                rooms: 2,
                                area: 300,
                                cost: 30000,
                            },
                            {
                                id: 3,
                                rooms: 2,
                                area: 300,
                                cost: 30000,
                            },
                        ],
                    },
                ],
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
                levels: '29 этажей',
                apartment: '318 квартир',
                apartmens_available: '29 квартир',
                floors: [
                    {
                        flat : [
                            {   
                                id: 0,
                                number: 17,
                                rooms: 2,
                                area: 300,
                                cost: 30000,
                            },
                            {
                                id: 1,
                                number: 17,
                                rooms: 2,
                                area: 300,
                                cost: 30000,
                            },
                            {
                                id: 2,
                                number: 17,
                                rooms: 2,
                                area: 300,
                                cost: 30000,
                            },
                        ],
                    },
                    {
                        flat : [
                            {   
                                id: 0,
                                number: 17,
                                rooms: 2,
                                area: 300,
                                cost: 30000,
                            },
                            {
                                id: 1,
                                number: 17,
                                rooms: 2,
                                area: 300,
                                cost: 30000,
                            },
                            {
                                id: 2,
                                number: 17,
                                rooms: 2,
                                area: 300,
                                cost: 30000,
                            },
                        ],
                    },
                ],
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
                levels: '29 этажей',
                apartment: '318 квартир',
                apartmens_available: '29 квартир',
                floors: [
                    {
                        flat : [
                            {   
                                id: 0,
                                number: 17,
                                rooms: 2,
                                area: 300,
                                cost: 30000,
                            },
                            {
                                id: 1,
                                number: 17,
                                rooms: 2,
                                area: 300,
                                cost: 30000,
                            },
                            {
                                id: 2,
                                number: 17,
                                rooms: 2,
                                area: 300,
                                cost: 30000,
                            },
                        ],
                    },
                    {
                        flat : [
                            {   
                                id: 0,
                                number: 17,
                                rooms: 2,
                                area: 300,
                                cost: 30000,
                            },
                            {
                                id: 1,
                                number: 17,
                                rooms: 2,
                                area: 300,
                                cost: 30000,
                            },
                            {
                                id: 2,
                                number: 17,
                                rooms: 2,
                                area: 300,
                                cost: 30000,
                            },
                        ],
                    },
                ],
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