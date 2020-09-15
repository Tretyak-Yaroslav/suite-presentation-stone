import Vue from 'vue';
import template from './index.html';
import vSelect from 'vselect-component'
import 'fabric'
import 'canvg';
import DrawScheme from './js/ritail'
import {ritailsFloorTwo, ritailsFloorOne} from './js/retailIntroPageHelpers'

export default Vue.component('ritail-page', {
    template,
    data() {
        return {
            introTitleShow: true,
            navArrowsVisible: false,
            arrowsTimeout: null,
            // minPrice: "500",
            // maxPrice: "50000",
            minValue: "25000",
            // minArea: '9.38',
            // maxArea: '547.18',
            minAreaValue: '9.38',
            areaMinVal: null,
            areaMaxVal: null,
            priceMinVal: null,
            priceMaxVal: null,
            open: true,
            activeFloor: 1,
            activeArea: null,
            lots: ritailsFloorOne,
            index: 1,
            savedArray: [],
            activeItemsArr:  [],
            // ritails: [  
            //     {
            //         id: 1,
            //         rent: '22 222 222',
            //         area: '222',
            //         status: 'available',
            //         floor: 1,
            //         rentMetr: 22,
            //         priceMetr: 55,
            //         rent_price: 222222,
            //         price: 555555
            //     },
            //     {
            //         id: 2,
            //         rent: '22 222 222',
            //         area: '222',
            //         status: 'available',
            //         floor: 1,
            //         rentMetr: 22,
            //         priceMetr: 55,
            //         rent_price: 222222,
            //         price: 555555
            //     },
            //     {
            //         id: 3,
            //         rent: '22 222 222',
            //         area: '222',
            //         status: 'available',
            //         floor: 1,
            //         rentMetr: 22,
            //         priceMetr: 55,
            //         rent_price: 222222,
            //         price: 555555
            //     },
            //     {
            //         id: 4,
            //         rent: '22 222 222',
            //         area: '222',
            //         status: 'available',
            //         floor: 1,
            //         rentMetr: 22,
            //         priceMetr: 55,
            //         rent_price: 222222,
            //         price: 555555
            //     },
            //     {
            //         id: 5,
            //         rent: '22 222 222',
            //         area: '222',
            //         status: 'available',
            //         floor: 1,
            //         rentMetr: 22,
            //         priceMetr: 55,
            //         rent_price: 222222,
            //         price: 555555
            //     },
            //     {
            //         id: 6,
            //         rent: '22 222 222',
            //         area: '222',
            //         status: 'available',
            //         floor: 1,
            //         rentMetr: 22,
            //         priceMetr: 55,
            //         rent_price: 222222,
            //         price: 555555
            //     }
            // ],
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
                value: 2,
                label: 'Аренда'
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
            selectedRitail: false,
            activeSaved: false,
            openedRitail: false,
            selectedObject: null
        }
    },
    filters: {
        money (value) {
          if (!value) return ''
          function numberWithSpaces(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
          }
          return numberWithSpaces(value)
        }
    },
    components: {
        vSelect
    },
    beforeDestroy() {
        window.document.removeEventListener('mousemove', this.mouseEventHandler, false);
    },
    mounted() {
        setTimeout(() => {
            this.introTitleShow = false;

            window.document.addEventListener('mousemove', this.mouseEventHandler, false);
        }, 1000);
        // new DrawScheme();
        DrawScheme.prototype.onSectionClick = this.onSectionClick
        window.scheme = new DrawScheme(this.$store);

        setTimeout(() => {
            this.setActiveItem(this.ritails[0].id)
        },500)
    },
    computed: {
        ritails () {
            const ritails = this.$store.state.ParentApiStore.ritail
            const data = []
            if (ritails.length) {
                ritails.forEach(floor => {
                    if (floor.sections.length) {
                        floor.sections.forEach(item => {
                            data.push(item)
                        })
                    }
                })
            }
            // console.log(data)
            return data
        },
        filterByArea () {
            const filterByArea = this.ritails.filter(ritail => {
                if (ritail.area >= this.areaMinVal && ritail.area <= this.areaMaxVal) {
                    return true
                }
            })
            return filterByArea
        },
        filterByPrice () {
            const filterByPrice = this.filterByArea.filter(ritail => {
                if (this.selected.value == 2) {
                    if (ritail.rent_price >= this.priceMinVal && ritail.rent_price <= this.priceMaxVal) {
                        return true
                    }
                } else if (this.selected.value == 4) {
                    if (ritail.price >= this.priceMinVal && ritail.price <= this.priceMaxVal) {
                        return true
                    }
                }
            })
            return filterByPrice
        },
        allAreas () {
            const areas = []
            this.ritails.forEach(ritail => {
                areas.push(ritail.area)
            })
            return areas
        },
        minArea () {
            const minArea = Math.min(...this.allAreas)
            this.areaMinVal = minArea
            return minArea
        },
        maxArea () {
            const maxArea = Math.max(...this.allAreas)
            this.areaMaxVal = maxArea
            return maxArea
        },
        allPrices () {
            const prices = []
            this.ritails.forEach(ritail => {
                if (this.selected.value == 2) {
                    prices.push(ritail.rent_price)
                } else if (this.selected.value == 4) {
                    prices.push(ritail.price)
                }
            })
            return prices
        },
        minPrice () {
            const minPrice = Math.min(...this.allPrices)
            this.priceMinVal = minPrice
            return minPrice
        },
        maxPrice () {
            const maxPrice = Math.max(...this.allPrices)
            this.priceMaxVal = maxPrice
            return maxPrice
        },

        savedItems () {
            const savedItems = this.$store.state.ParentApiStore.savedItems
            return savedItems
        },
        savedRitail () {
            const savedRitail = this.savedItems.filter(item => item.type === 'retail')
            return savedRitail
        }
    },
    methods: {

        addToSaved (section) {
            this.$store.dispatch('ParentApiStore/addToSaved', section)
        },

        removeFromSaved (id) {
            this.$store.dispatch('ParentApiStore/removeFromSaved', id)
        },

        priceSlider: function () {
            if (this.minPrice > this.maxPrice) {
                let tmp = this.maxPrice;
                this.maxPrice = this.minPrice;
                this.minPrice = tmp;
            }
        },
        areaSlider: function () {
            if (this.minArea > this.maxArea) {
                let tmp = this.maxArea;
                this.maxArea = this.minArea;
                this.minArea = tmp;
            }
        },
        changeFloor(i) {
            this.activeFloor = i;
            scheme.controls().changeFloor(i);
            this.lots = i === 1 ? ritailsFloorOne : ritailsFloorTwo;
            
            setTimeout(() => {
                this.activeItemsArr.forEach(id => {
                    scheme.setChecked(id)
                })
            }, 200);
        },
        showCoords(event) {
            scheme.controls().showCoords(event)
        },
        changeWidth() {
            // return this.open = typeof value == 'boolean' ? value : !this.open;
        },

        onSectionClick (id) {
            this.setActiveItem(id)
        },

        changeScheme (e, item) {
            if (e.target.classList.contains('filter-left__item-icon')) return false
            if (e.target.classList.contains('filter-left__item-box-more')) return false
            if (e.target.classList.contains('filter-left__item-box-more-item')) return false
            if (this.activeItemsArr.includes(item.id)) {
                scheme.clearChecked(item.id)
            } else {
                scheme.setChecked(item.id)
            }
            this.setActiveItem(item.id)
        },

        setActiveItem (id) {
            if (this.activeItemsArr.includes(id)) {
                this.activeItemsArr = this.activeItemsArr.filter(arrItem => arrItem !== id)
            } else {
                this.activeItemsArr.push(id)
            }
        },

        saveSection (section) {
            // this.$store.dispatch('ParentApiStore/setSavedOffices', section)
            

            this.savedArray.push(section.id)
            this.addToSaved(section)
        },

        unSaveSection (section) {
            // this.$store.dispatch('ParentApiStore/unSetSavedOffices', section)

            const filteredArr = this.savedArray.filter(item => item != section.id)
            this.savedArray = filteredArr
            this.removeFromSaved(section.id)
        },

        handleSaveSection (section) {
            if ( this.savedArray.includes(section.id) ) {
                this.unSaveSection(section)
            } else {
                this.saveSection(section)
            }
        },

        selectRitail (item) {
            this.openedRitail = true
            
            this.selectedObject = item
        },

        unSelectRitail () {
            this.openedRitail = false
        }
    },
    // watch: {
    //     areaMinVal (val) {
    //         console.log(val)
    //     }
    // },
});
