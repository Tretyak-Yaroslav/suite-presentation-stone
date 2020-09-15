import Vue from 'vue';
import template from './index.html';
import vSelect from 'vselect-component'
import 'fabric'
import 'canvg';
import DrawScheme from './js/scheme'
import DrawFloorScheme from './js/floorScheme'

export default Vue.component('park-page', {
    template,
    data() {
        return {
            introTitleShow: true,
            navArrowsVisible: false,
            arrowsTimeout: null,
            minPrice: "500",
            maxPrice: "50000",
            minValue: "25000",
            activeFloor: 1,
            open: true,
            index: 1,
            options: [
                {
                    value: 2,
                    label: 'Аренда'
                },
                {
                    value: 4,
                    label: 'Продажа'
                }
            ],
            selected: {
                value: 4,
                label: 'Продажа'
            },
            options2: [{
                value: 1,
                label: 'Рубли (₽)'
            }, {
                value: 2,
                label: 'Dollars ($)'
            }, {
                value: 3,
                label: 'Euro (€)'
            }
            ],
            selected2: {
                value: 1,
                label: 'Рубли (₽)'
            },
            placement: 'down',
            activeSegment: 1,
            filterLeft: [
                {
                    id: 1,
                    rent: '22 206 800 ₽',
                    area: '111м²',
                    checked: false
                },
                {
                    id: 2,
                    rent: '22 206 800 ₽',
                    area: '222м²',
                    checked: false
                },
                {
                    id: 3,
                    rent: '22 206 800 ₽',
                    area: '333м²',
                    checked: false
                },
                {
                    id: 4,
                    rent: '22 206 800 ₽',
                    area: '4440м²',
                    checked: false
                },
                {
                    id: 5,
                    rent: '22 206 800 ₽',
                    area: '555м²',
                    checked: false
                },
                {
                    id: 6,
                    rent: '22 206 800 ₽',
                    area: '666м²',
                    checked: false
                },
                {
                    id: 7,
                    rent: '22 206 800 ₽',
                    area: '777м²',
                    checked: false
                },
                {
                    id: 8,
                    rent: '22 206 800 ₽',
                    area: '888м²',
                    checked: false
                },
                {
                    id: 9,
                    rent: '22 206 800 ₽',
                    area: '999м²',
                    checked: false
                },
                {
                    id: 10,
                    rent: '22 206 800 ₽',
                    area: '1000м²',
                    checked: false
                },
                {
                    id: 11,
                    rent: '22 206 800 ₽',
                    area: '1111м²',
                    checked: false
                },
                {
                    id: 12,
                    rent: '22 206 800 ₽',
                    area: '1222м²',
                    checked: false
                },
                {
                    id: 13,
                    rent: '22 206 800 ₽',
                    area: '1333м²',
                    checked: false
                },
                {
                    id: 14,
                    rent: '22 206 800 ₽',
                    area: '1444м²',
                    checked: false
                }
            ],
            selectedOffice: false,
            isOpenModal: false,
            pageTitle: 'Офисные помещения класса А',
            modalMode: "light",
            selectedFloor: 3,
            selectedArea: 1,
            selectedPrice: 1,
            checkedBottomFloor: 0,
            activeItem: null,
            savedArray: [],
            activeSaved: false,
            selectedIndex: 0,
            visibleSeating: false,
            panoramaSrc: '',
            //offices: []
        }
    },
    filters: {
        money(value) {
            if (!value) return ''
            function numberWithSpaces(x) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            }
            return numberWithSpaces(value)
        },
        fromDotToComma(value) {
            if (!value) return ''
            return String(value).replace('.', ',')
        }
    },
    components: {
        vSelect
    },
    beforeDestroy() {
        window.document.removeEventListener('mousemove', this.mouseEventHandler, false);
    },
    mounted() {
        this.selected = this.options[1]

        setTimeout(() => {
            this.introTitleShow = false;
            window.document.addEventListener('mousemove', this.mouseEventHandler, false);
        }, 1000);
        // new DrawScheme();

        let availableSectionIndex;
        let availableSection;
        setTimeout(() => {
            availableSection = this.offices.find(office => {
                return office.status == "available"
            })
            const currentFloor = this.offices.filter(office => office.floor == availableSection.floor)
            availableSectionIndex = currentFloor.findIndex(office => office.id == availableSection.id)
        }, 300);

        setTimeout(() => {
            this.selectedFloor = availableSection.floor
            this.selectedIndex = availableSectionIndex
            this.initScheme(this.selectedFloor, this.activeSegment, this.selectedIndex, this.visibleSeating)
        }, 500)

        setTimeout(() => {
            const checkedItem = this.offices.find(office => office.scene_checked)

            this.setActiveItem(checkedItem)
        }, 1000);

    },
    computed: {
        offices() {
            const offices = this.$store.state.ParentApiStore.offices
            const data = []
            if (offices.length) {
                offices.forEach(floor => {
                    if (floor.sections.length) {
                        floor.sections.forEach(item => {
                            console.log(item)
                            data.push(item)
                        })
                    }
                })
            }
            return data
        },
        allQuarters() {
            const allQuarters = []
            var arrQuarters = []
            const offices = this.$store.state.ParentApiStore.offices
            if (!offices.length) return false
            offices.forEach(floor => {
                let quarters = []
                if (!floor.quarters.length) return false
                floor.quarters.forEach(quarter => quarters.push(quarter))

                arrQuarters.push(...quarters)
            })

            var areaList = [];
            if (arrQuarters.length > 0) {
                for (var i = 0; i < arrQuarters.length; ++i) {
                    if (arrQuarters[i].status === "available") {
                        areaList.push(arrQuarters[i].area);
                    }
                }
            }
            allQuarters.push(...areaList)
            return allQuarters
        },
        minQuarterArea() {
            const minQuarterArea = Math.min(...this.allQuarters)
            console.log(this.allQuarters)
            return minQuarterArea
        },
        maxQuarterArea() {
            const minQuarterArea = Math.max(...this.allQuarters)
            return minQuarterArea
        },

        allHalfs() {
            const allHalfs = []
            var arrHalfs = []
            const offices = this.$store.state.ParentApiStore.offices
            if (!offices.length) return false
            offices.forEach(floor => {
                let halfs = []
                if (!floor.halfs.length) return false
                floor.halfs.forEach(half => halfs.push(half))
                arrHalfs.push(...halfs)
            })
            var areaList2 = [];
            if (arrHalfs.length > 0) {
                for (var i = 0; i < arrHalfs.length; ++i) {
                    if (arrHalfs[i].status === "available") {
                        areaList2.push(arrHalfs[i].area);
                    }
                }
            }
            allHalfs.push(...areaList2)
            return allHalfs
        },
        minHalfArea() {
            const minHalfArea = Math.min(...this.allHalfs)
            console.log(this.allHalfs)
            return minHalfArea
        },
        maxHalfArea() {
            const maxHalfArea = Math.max(...this.allHalfs)
            return maxHalfArea
        },

        allTotals() {
            const allTotals = []
            var arrTotals = []
            const offices = this.$store.state.ParentApiStore.offices
            if (!offices.length) return false
            offices.forEach(floor => {
                let totals = []
                if (!floor.total.length) return false
                floor.total.forEach(total => totals.push(total))

                arrTotals.push(...totals)
            })
            var areaList = [];
            if (arrTotals.length > 0) {
                for (var i = 0; i < arrTotals.length; ++i) {
                    if (arrTotals[i].status === "available") {
                        areaList.push(arrTotals[i].area);
                    }
                }
            }
            allTotals.push(...areaList)
            return allTotals
        },
        minTotalArea() {
            const minTotalArea = Math.min(...this.allTotals)
            return minTotalArea
        },
        maxTotalArea() {
            const maxTotalArea = Math.max(...this.allTotals)
            return maxTotalArea
        }
    },
    methods: {

        addToSaved(section) {
            this.$store.dispatch('ParentApiStore/addToSaved', section)
        },

        removeFromSaved(id) {
            this.$store.dispatch('ParentApiStore/removeFromSaved', id)
        },

        toggleActiveSaved() {
            this.activeSaved = !this.activeSaved
        },

        hideScheme() {
        },

        initScheme(floor, segment, index, seating = false) {
            DrawScheme.prototype.setSection = this.setSection
            const officesArr = this.$store.state.ParentApiStore.offices

            let type = 'quarters'
            if (segment == 2) {
                type = 'halfs'
            } else if (segment == 3) {
                type = 'total'
            }
            officesArr.forEach(item => {
                this.$store.dispatch('ParentApiStore/setOfficeSection', {
                    floor: item.floor,
                    sections: item[type]
                })
            })

            setTimeout(() => {
                window.scheme = new DrawScheme(this.$store, floor, segment, index, type, seating);
            }, 100)
        },

        setSection(id) {
            const currentFloor = this.offices.filter(office => office.floor == this.selectedFloor)

            const currentIndex = currentFloor.findIndex(section => section.id == id)

            if (currentFloor[currentIndex].status !== "available") {
                return false
            }
            this.selectedIndex = currentIndex
            this.setActiveItem(currentFloor[currentIndex])

            setTimeout(() => {
                this.clearScheme()
                this.initScheme(this.selectedFloor, this.activeSegment, this.selectedIndex, this.visibleSeating)
            }, 200);

        },

        clearScheme() {
            this.hideScheme()
            window.scheme.clearAll()
            window.canvas.dispose()
            window.scheme = null
        },

        initFloorScheme(floor) {
            window.floorScheme = new DrawFloorScheme(floor)
        },

        opemModal() {
            this.pageTitle = 'Лот ЗЗ | Виды из окон'
            this.isOpenModal = true
            this.changeMode('light')
        },
        closeModal() {
            this.pageTitle = 'Офисные помещения класса А'
            this.isOpenModal = false
        },

        changeScheme(e, item) {
            if (e.target.classList.contains('filter-left__item-icon')) return false
            if (e.target.classList.contains('filter-left__item-box-more')) return false
            if (e.target.classList.contains('filter-left__item-box-more-item')) return false
            this.selectedFloor = item.floor
            const floorArr = this.offices.filter(office => office.floor == item.floor)
            const currentOfficeIndex = floorArr.findIndex(floor => floor == item)
            this.selectedIndex = currentOfficeIndex
            this.setActiveItem(item)
            setTimeout(() => {
                this.clearScheme()
                this.initScheme(this.selectedFloor, this.activeSegment, this.selectedIndex, this.visibleSeating)
            }, 200);
        },

        setActiveItem(item) {
            this.activeItem = item
        },

        selectOffice(item) {
            this.selectedOffice = true
            this.selectedFloor = item.floor
            this.selectedArea = item.area
            this.selectedPrice = item.price
            setTimeout(() => {
                this.initFloorScheme(item.floor)
            }, 100);
        },

        unSelectOffice() {
            this.selectedOffice = false
        },

        changeMode(value) {
            this.modalMode = ''

            setTimeout(() => {
                this.modalMode = value
            })
        },

        slider: function () {
            if (this.minPrice > this.maxPrice) {
                var tmp = this.maxPrice;
                this.maxPrice = this.minPrice;
                this.minPrice = tmp;
            }
        },

        changeSegment(segment, selectedIndex) {
            this.activeSegment = segment
            const officesArr = this.$store.state.ParentApiStore.offices
            let type = 'quarters'
            if (this.activeSegment == 2) {
                type = 'halfs'
            } else if (this.activeSegment == 3) {
                type = 'total'
            }
            officesArr.forEach(item => {
                this.$store.dispatch('ParentApiStore/setOfficeSection', {
                    floor: item.floor,
                    sections: item[type]
                })
            })

            setTimeout(() => {
                this.clearScheme()
                this.initScheme(this.selectedFloor, this.activeSegment, selectedIndex, this.visibleSeating)
            }, 50);
        },

        saveSection(section) {
            this.$store.dispatch('ParentApiStore/setSavedOffices', section)
            this.savedArray.push(section.id)
            this.addToSaved(section)
        },

        unSaveSection(section) {
            this.$store.dispatch('ParentApiStore/unSetSavedOffices', section)
            const filteredArr = this.savedArray.filter(item => item != section.id)
            this.savedArray = filteredArr
            this.removeFromSaved(section.id)
        },

        handleSaveSection(section) {
            if (this.savedArray.includes(section.id)) {
                this.unSaveSection(section)
            } else {
                this.saveSection(section)
            }
        },

        handleSegment(segment) {
            this.selectedIndex = 0
            this.changeSegment(segment, this.selectedIndex)
            const checkedItem = this.offices.find(office => office.floor == this.selectedFloor)
            this.setActiveItem(checkedItem)
        },
        toggleSeating(e) {
            this.visibleSeating = e.target.checked
            this.clearScheme()
            this.initScheme(this.selectedFloor, this.activeSegment, this.selectedIndex, this.visibleSeating)
        },
        changeWidth() {
            return this.open = typeof value == 'boolean' ? value : !this.open;
        }
    }
});