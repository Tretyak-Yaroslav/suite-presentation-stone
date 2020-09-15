import Vue from 'vue';

import template from './index.html';

export default Vue.component('navigation', {
    template,
    data() {
        return {
            navOpen: false,

            swiper: null,
            swiperOptions: {
                slidesPerView: 'auto',
                centeredSlides: true,
                // observer: true,
                direction: 'vertical',
                speed: 100,
                loop: false,
                mousewheel: {
                    invert: false,
                },
            },

            navigation: [
                {title: 'Начало', routeName: 'init', decorationMode: 1},
                {title: 'О бизнес-центре', routeName: 'about', decorationMode: 1},
                {title: 'Локация', routeName: 'location', decorationMode: 1},
                {title: 'Архитектура', routeName: 'architecture', decorationMode: 1},
                {title: 'Дизайнерские лобби', routeName: 'lobby', decorationMode: 1},
                {title: 'Lounge Hall', routeName: 'laungehall', decorationMode: 1},
                {title: 'Сад на крыше', routeName: 'rooftopgarden', decorationMode: 1},
                {title: 'Бар на крыше', routeName: 'rooftopbar', decorationMode: 1},
                {title: 'Офисы', routeName: 'office', decorationMode: 1},
                {title: 'Ритейл и торговая галерея', routeName: 'ritail', decorationMode: 1},
                {title: 'Паркинг', routeName: 'parking', decorationMode: 1},
                
            ],

            activeNavTitle: null,
            activeRouteName: null,

            decorationMode: 1, // 1 - black; 2 - gold;

            preventSlideCallback: true,

            navClassName: null,

            sharingVisible: false,
        }
    },
    mounted() {
        this.swiper = this.$refs.swiper.swiper;
        // window.sss = this.swiper;

        this.swiper.loopedSlides = this.navigation.length;
        this.swiper.update();

        this.$root.$on('navigation-title-set', this.setNavigationTitle);

        window.presentationData = window.presentationData || {};
        window.presentationData.sharingInit = this.sharingInit;
    },
    computed: {
        showGoNext() {
            if (!this.activeRouteName) return false;
            if (this.$route.matched && this.$route.matched.length > 1) return false;
            if (['init', 'about', 'location', 'architecture', 'lobby', 'laungehall', 'rooftopgarden', 'rooftopbar', 'office', 'ritail', 'parking'].indexOf(this.activeRouteName) > -1) return true;
            return false;
        },
        showGoPrev() {
            if (!this.activeRouteName) return false;
            if (this.$route.matched && this.$route.matched.length > 1) return false;
            if (['init', 'about', 'location', 'architecture', 'lobby', 'laungehall', 'rooftopgarden', 'rooftopbar', 'office', 'ritail', 'parking'].indexOf(this.activeRouteName) > -1) return true;
            return false;
        },

        villasMarkedQty() {
            return this.$store.state.VillaStore.marked.length;
        },
        sharingAble() {
            let result = !!this.villasMarkedQty;
            if (!result && this.sharingVisible) {
                this.$refs.sharingDetailsBlock.toggle(false);
            }
            return result;
        },
    },
    watch: {
        $route: {
            immediate: true,
            handler(newVal) {
                this.$nextTick(this.addaptSliderToRoute);

                this.navClassName = (newVal.meta && newVal.meta.navClassName) ? newVal.meta.navClassName : null;
            },
        },
    },
    methods: {
        navOpenToggle(value) {
            this.navOpen = typeof value == 'boolean' ? value : !this.navOpen;

            if (this.navOpen) {
                setTimeout(() => {
                    this.swiper.update();
                });
            }
        },

        addaptSliderToRoute() {
            let routeNames = this.$route.matched.map(item => {
                return item.name;
            });

            for (let i = 0; i < this.navigation.length; i++) {
                let navItem = this.navigation[i];
                if (routeNames.indexOf(navItem.routeName) > -1) {
                    this.swiper.slideToLoop(i, 0, false);
                    this.setNavigationTitle(navItem.title);
                    this.activeRouteName = navItem.routeName;
                    this.markSlidesActive();
                    this.decorationMode = 1;
                    break;
                }
            }
        },

        setNavigationTitle(value) {
            this.activeNavTitle = value;
        },

        onSlideChange() {
            let navItem = this.navigation[this.getRealIndex()];
            this.decorationMode = navItem.decorationMode;
        },

        navClick(event) {
            let element = event.target;
            if (!element.classList.contains('nav-link')) return;

            let index = element.dataset.index;
            if (!index) return;

            this.goTo(+index);
        },
        goTo(index) {
            this.preventSlideCallback = false;

            if (index === this.getRealIndex()) {
                this.onSlideChangeComplete();
            } else {
                this.swiper.slideTo(this.swiper.clickedIndex, this.swiperOptions.speed);
                setTimeout(() => {
                    this.preventSlideCallback = true;
                }, this.swiperOptions.speed + 100);
            }
        },
        goPrev() {
            this.addaptSliderToRoute();
            this.preventSlideCallback = false;
            this.swiper.slideToLoop(this.getPrevIndex(), 0);
        },
        goNext() {
            this.addaptSliderToRoute();
            this.preventSlideCallback = false;
            this.swiper.slideToLoop(this.getNextIndex(), 0);
        },

        getRealIndex() {
            let index = this.swiper.realIndex;
            while (index > this.navigation.length - 1) {
                index = index - this.navigation.length;
            }
            return index;
        },
        getPrevIndex() {
            let realIndex = this.getRealIndex();
            let prevIndex = realIndex - 1;
            if (prevIndex < 0) {
                prevIndex = this.navigation.length - 1;
            }
            return prevIndex;
        },
        getNextIndex() {
            let realIndex = this.getRealIndex();
            let nextIndex = realIndex + 1;
            if (nextIndex > this.navigation.length - 1) {
                nextIndex = 0;
            }
            return nextIndex;
        },

        onSlideChangeComplete() {
            if (this.preventSlideCallback) return;

            let navItem = this.navigation[this.getRealIndex()];
            if (!navItem.routeName) return;
            if (navItem.routeName === this.activeRouteName) return;

            this.$router.push({name: navItem.routeName});
            this.navOpenToggle(false);

            this.preventSlideCallback = true;
        },

        markSlidesActive() {
            this.$nextTick(() => {
                let elements = this.swiper.el.querySelectorAll('.nav-item');
                for (let i = 0; i < elements.length; i++) {
                    let el = elements[i];
                    if (el.dataset.routeName && el.dataset.routeName === this.activeRouteName) {
                        el.classList.add('active');
                    } else {
                        el.classList.remove('active');
                    }
                }
            });
        },

        out() {
            this.$store.dispatch('ParentApiStore/goBack').catch(err => {console.error(err)});
        },


        sharingInit() {
            this.$refs.sharingDetailsBlock.toggle(true);
        },
        sharingFormComplete() {
            this.$refs.sharingDetailsBlock.toggle(false);
            this.$store.dispatch('VillaStore/markToggleClear');
        },
    },
});