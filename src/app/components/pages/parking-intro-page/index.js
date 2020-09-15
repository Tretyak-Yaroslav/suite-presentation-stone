import Vue from 'vue';
import template from './index.html';
import vSelect from 'vselect-component'
import 'fabric'
import 'canvg';
// import './js/parking'
import DrawScheme from './js/parking'
// Vue.use(fabric)
// Vue.use(Canvg)

export default Vue.component('park-page', {
    template,
    data() {
        const isOpen = this.$route.query.open == 'true' ? true : false
        return {
            introTitleShow: true,
            navArrowsVisible: false,
            arrowsTimeout: null,
            // minPrice: "500",
            // maxPrice: "50000",
            minValue: "25000",
            priceMinVal: null,
            priceMaxVal: null,
            activeFloor: -1,
            activeItem: false,
            open: isOpen,
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
            selected:{
                value: 2,
                label: 'Аренда'
            },
            options2: [{
                value:1,
                label:'Рубли (₽)'
            },{
                value:2,
                label:'Dollars ($)'
            },{
                value:3,
                label:'Euro (€)'
            }
            ],
            selected2:{
                value:1,
                label:'Рубли (₽)'
            },
            placement:'down',
            activeItemsArr: [],
            savedArray: [],
            filterLeft: [
                {
                    id: 1,
                    rent: '22 206 800 ₽',
                    area: '780м²'
                },
                {
                    id: 2,
                    rent: '22 206 800 ₽',
                    area: '780м²'
                },
                {
                    id: 3,
                    rent: '22 206 800 ₽',
                    area: '780м²'
                },
                {
                    id: 4,
                    rent: '22 206 800 ₽',
                    area: '780м²'
                },
                {
                    id: 5,
                    rent: '22 206 800 ₽',
                    area: '780м²'
                },
                {
                    id: 6,
                    rent: '22 206 800 ₽',
                    area: '780м²'
                },
                {
                    id: 7,
                    rent: '22 206 800 ₽',
                    area: '780м²'
                }
            ],
            zoomed: false
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
        DrawScheme.prototype.toggleOpen = this.toggleOpen
        setTimeout(() => {
            window.scheme = new DrawScheme(this.$store);
        }, 500)
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
    computed: {
        parking () {
            const parking = this.$store.state.ParentApiStore.parking
            const data = []
            if (parking.length) {
                parking.forEach(floor => {
                    if (floor.sections.length) {
                        floor.sections.forEach(item => {
                            data.push(item)
                        })
                    }
                })
            }
            return data
        },
        filterByPrice () {
            const filterByPrice = this.parking.filter(parking => {
                if (this.selected.value == 2) {
                    if (parking.rent_price >= this.priceMinVal && parking.rent_price <= this.priceMaxVal) {
                        return true
                    }
                } else if (this.selected.value == 4) {
                    if (parking.price >= this.priceMinVal && parking.price <= this.priceMaxVal) {
                        return true
                    }
                }
            })
            return filterByPrice
        },
        allPrices () {
            const prices = []
            this.parking.forEach(parking => {
                if (this.selected.value == 2) {
                    prices.push(parking.rent_price)
                } else if (this.selected.value == 4) {
                    prices.push(parking.price)
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
    },
    methods: {
        onSectionClick (id) {
            this.setActiveItem(id)
        },
        
        addToSaved (section) {
            this.$store.dispatch('ParentApiStore/addToSaved', section)
        },

        removeFromSaved (id) {
            this.$store.dispatch('ParentApiStore/removeFromSaved', id)
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

        setActiveItem (id) {
            if (this.activeItemsArr.includes(id)) {
                this.activeItemsArr = this.activeItemsArr.filter(arrItem => arrItem !== id)
            } else {
                this.activeItemsArr.push(id)
            }
        },

        changeScheme (e, item) {
            if (e.target.classList.contains('filter-left__item-icon')) return false
            if (e.target.classList.contains('filter-left__item-box-more')) return false
            if (e.target.classList.contains('filter-left__item-box-more-item')) return false
            if (this.activeItemsArr.includes(item.id)) {
                console.log("CLEAR")
                scheme.clearChecked(item.id)
            } else {
                console.log("SET")
                scheme.setChecked(item.id)
            }
            this.setActiveItem(item.id)
        },
        priceSlider: function () {
            if (this.minPrice > this.maxPrice) {
                let tmp = this.maxPrice;
                this.maxPrice = this.minPrice;
                this.minPrice = tmp;
            }
        },
        changeFloor(i) {
            this.activeFloor = i
            scheme.controls().changeFloor(i)

            setTimeout(() => {
                this.activeItemsArr.forEach(id => {
                    console.log(id)
                    scheme.setChecked(id)
                })
            }, 200)
        },
        toggleOpen () {
            this.open = !this.open
            this.zoomed = !this.zoomed
        },
        changeWidth(){
            return this.open = typeof value == 'boolean' ? value : !this.open; 
        },
        selectItem(item) {
            this.activeItem = item;
        }
    },
    created() {
    },
});