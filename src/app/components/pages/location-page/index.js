import Vue from 'vue';

import template from './index.html';

const points = [

    // {x: 12.75, y: -29, z: -6.5, rotation: -0.48, color: 'r', popup: {text:'ololo 3', paramN: 5}},
    // {x: 24.75, y: -19, z: -16.5, rotation: -0.48, color: 'g', popup: {text:'ololo 4', paramN: 5}},
    {x: -8.86, y: -19.70, z: 0.34, rotation: 0.34, color: 'w', popup: {Name:'м. "Савеловская"', Area: '1,1км', Time: '12 мин', Adress: ''}},
    {x: -10.28, y: -20.34, z: 0.36, rotation: 0.48, color: 'w', popup: {Name:'жд.вокзал "Савеловский"', Area: '1,2км', Time: '14 мин', Adress: ''}},
    {x: -9.64, y: -20, z: 0.38, rotation: 0.48, color: 'w', popup: {Name:'БКЛ "Савеловская"', Area: '1,2км', Time: '14 мин', Adress: ''}},
    {x: 13.39, y: 26.10, z: -1.48, rotation: -2.66, color: 'w', popup: {Name:'м. "Белорусская" радикальная', Area: '1км', Time: '10 мин', Adress: ''}},
    {x: 13.29, y: 27.18, z: -1.22, rotation: -2.66, color: 'w', popup: {Name:'ж/д вокзал "Белорусский"', Area: '1,1км', Time: '13 мин', Adress: ''}},
    {x: 12.39, y: 27.38, z: -1.1, rotation: -2.66, color: 'w', popup: {Name:'Аэроэкспресс в Шереметьево', Area: '1,1км', Time: '13 мин', Adress: ''}},
    {x: 26.91, y: -5.10, z: 0.00, rotation: -1.34, color: 'w', popup: {Name:'м. "Менделеевская"', Area: '1,3км', Time: '12 мин', Adress: ''}},
    {x: 24.55, y: 1.30, z: 0.30, rotation: -1.84, color: 'w', popup: {Name:'м. "Новослободская"', Area: '1,5км', Time: '12 мин', Adress: ''}},
    {x: -16.20, y: -13.94, z: -2.44, rotation: 0.98, color: 'b', popup: {Name:'ЖК "Правда"', Area: '480м', Time: '6 мин', Adress: ''}},
    {x: 3.90, y: 28.10, z: -2.0, rotation: -2.90, color: 'b', popup: {Name:'ЖК "Слава"', Area: '640м', Time: '8 мин', Adress: ''}},
    {x: -11.00, y: -17.50, z: 1.40, rotation: 0.76, color: 'b', popup: {Name:'ЖК Soho Noho', Area: '360м', Time: '4 мин', Adress: ''}},
    {x: -2.83, y: 28.70, z: -1.48, rotation: -3.06, color: 'b', popup: {Name:'ЖК Art Residence', Area: '1,3км', Time: '16 мин', Adress: ''}},
    {x: 24.49, y: 3.50, z: 0.54, rotation: -1.84, color: 'b', popup: {Name:'Виллы Cameo', Area: '5000кв. м', Time: '18 мин', Adress: ''}},
    {x: -16.10, y: -14.38, z: 0.30, rotation: 1.00, color: 'lb', popup: {Name:'БЦ "Северное сияние"', Area: '900м', Time: '11 мин', Adress: ''}},
    {x: 22.33, y: 21.34, z: 0.76, rotation: -2.30, color: 'lb', popup: {Name:'БЦ "Слава"', Area: '640м', Time: '8 мин', Adress: ''}},
    {x: -22.50, y: -11.74, z: -0.22, rotation: 0.98, color: 'lb', popup: {Name:'Типография "Правда"', Area: '720м', Time: '9 мин', Adress: ''}},
    {x: -19.64, y: -1.32, z: 2.88, rotation: 1.44, color: 'lb', popup: {Name:'БЦ Solutions', Area: '24 000 кв. м', Time: '', Adress: ''}},
    {x: 22.65, y: 19.24, z: 0.12, rotation: -2.14, color: 'p', popup: {Name:'Madame Wong', Name2:'Boston Seafood & Bar', Name3: 'The Box', Name4: 'Adri BBQ', Name5: 'Steak it easy', Area: '1км', Time: '12 мин', Adress: 'Лесная ул., д.7, БЦ "Белые сады"'}},
    {x: 21.69, y: 20.44, z: 0.68, rotation: -2.40, color: 'p', popup: {Name:'Torro grill', Name2: 'La Bottega', Name3: 'Кофемания', Area: '1,1км', Time: '14 мин', Adress: 'Лесная ул., д.5б, ДЦ "Белая площадь"'}},
    {x: 21.59, y: 21.60, z: 0.72, rotation: -2.20, color: 'p', popup: {Name:'Osteria della Piazza Bianca', Name2:'Хлеб насущный', Name3: 'Starbuсks', Name4: 'Torro Grill', Name5: 'Osteria Blanca', Area: '1,1км', Time: '13 мин', Adress: 'Лесная ул., д.5в, БЦ "Белая площадь"'}},
    {x: 22.65, y: 17.86, z: 0.14, rotation: -2.08, color: 'p', popup: {Name:'Cheese Connection', Area: '1км', Time: '18 мин', Adress: 'Лесная ул., д.9, БЦ "Белые сады"'}},
    {x: 20.00, y: 23.18, z: 0.62, rotation: -2.18, color: 'p', popup: {Name:'Luce (Люче) (Novikov group)', Area: '1,5км', Time: '18 мин', Adress: '1-я Тверская-Ямская ул., д.21'}},
    {x: 18.07, y: 22.68, z: -0.42, rotation: -2.58, color: 'p', popup: {Name:'Простые вещи', Area: '1,7км', Time: '20 мин', Adress: '1-я Брестская ул., д.41'}},
    {x: 17.97, y: 24.06, z: -1.42, rotation: -2.18, color: 'p', popup: {Name:'Chainaya Tea & Coctails (Секретный бар - Worlds 50 Best Bars)', Area: '1,3км', Time: '15 мин', Adress: '1-я Тверская-Ямская ул., д.29, стр.1 (вход со двора)'}},
    {x: 17.51, y: 24.32, z: -0.98, rotation: -2.32, color: 'p', popup: {Name:'Ресторан  Litro', Name2: 'Кафе Булка', Name3: 'Corner burgers', Area: '1,6км', Time: '19 мин', Adress: 'Б. Грузинская ул., д.76'}},
    {x: 17.45, y: 25.20, z: -0.80, rotation: -2.4, color: 'p', popup: {Name:'EnglishKidClub', Area: '1,9км', Time: '23 мин', Adress: 'Б. Грузинская ул., д.39'}},
    {x: -3.49, y: 26.94, z: -1.36, rotation: -3.12, color: 'p', popup: {Name:'Кафе Joe Black (в Арт Резиденс)', Name2: 'Lure Oyster Bar', Area: '980м', Time: '12 мин', Adress: 'Osteria Blanca (Лесная ул., 5А) - 8 м.п.'}},
    {x: 24.37, y: 12.90, z: -0.96, rotation: -2.04, color: 'p', popup: {Name:'"Квартет И"', Area: '1км', Time: '12 мин', Adress: 'Лесная ул., д.18'}},
    {x: 24.25, y: 11.64, z: -1.12, rotation: -1.84, color: 'p', popup: {Name:'Hudson Bar', Name2: 'Фудмолл Депо', Area: '850м', Time: '10 мин', Adress: 'Лесная ул., 20с3'}},
    {x: -1.45, y: 28.70, z: -1.48, rotation: -3.06, color: 'pur', popup: {Name:'Ноготки', Name2: 'Барбершоп Blade&Brothers', Area: '710 м', Time: '9 мин', Adress: '3-я ул. Ямского поля, д. 9 (Art Residence)'}},
    {x: 17.45, y: 25.24, z: -0.52, rotation: -2.4, color: 'pur', popup: {Name:'Libro Beauty Bar', Area: '1,5 км', Time: '18 мин', Adress: '2-ая Брестская ул., д. 39, стр. 3'}},
    {x: 17.51, y: 24.42, z: -0.76, rotation: -2.32, color: 'pur', popup: {Name:'Орхидея', Name2: 'Эко Спа', Area: '1,7км', Time: '21 мин', Adress: '1-я Брестская ул., д. 36'}},
    {x: 18.07, y: 22.90, z: -0.26, rotation: -2.58, color: 'pur', popup: {Name:'ThaiSpaClub', Area: '1,4км', Time: '17 мин', Adress: '1-я Брестская ул., д. 60'}},
    {x: 20.00, y: 23.84, z: 0.62, rotation: -2.18, color: 'pur', popup: {Name:'Cut&Colour', Area: '1,4км', Time: '17 мин', Adress: '1-я Тверская-Ямская ул., д.28'}},
    {x: 17.45, y: 24.32, z: -1.38, rotation: -2.32, color: 'pur', popup: {Name:'Barbershop 20/15', Area: '940 м', Time: '11 мин', Adress: 'Бутырский вал ул., д. 5'}},
    {x: 18.57, y: 22.84, z: -0.42, rotation: -2.58, color: 'y', popup: {Name:'Глобал Мед', Name2: '«Kinezis» European wellness center', Area: '1,3км', Time: '14 мин', Adress: '1-я Тверская-Ямская ул., д. 27'}},
    {x: 23.21, y: 16.24, z: -0.22, rotation: -2.08, color: 'y', popup: {Name:'Чайка', Area: '1км', Time: '13 мин', Adress: 'Лесная ул., 9 – 8 м.п.'}},
    {x: 13.39, y: 26.12, z: -0.94, rotation: -2.66, color: 'y', popup: {Name:'Медси', Area: '1.8км', Time: '22 мин', Adress: 'Грузинский пер., 3А – 15 м.п.'}},
    {x: -19.26, y: 12.56, z: -0.52, rotation: 1.94, color: 'y', popup: {Name:'СМ-клиника', Area: '1 км', Time: '12 мин', Adress: 'Расковой пер., 14/22 – 10 м.п.'}},
    {x: -2.09, y: 28.80, z: -1.48, rotation: -3.06, color: 'y', popup: {Name:'Гаджи Дажаев', Area: '1,4 км', Time: '16 мин', Adress: '3-я ул. Ямского поля, д. 9 (Art Residence)'}},
    {x: 25.63, y: 0.22, z: -0.74, rotation: -1.84, color: 'y', popup: {Name:'СМ-клиника', Area: '840 м', Time: '10 мин', Adress: 'Лесная ул., 57с1 – 7 м.п'}},
    {x: 24.43, y: -2.28, z: -1.04, rotation: -1.44, color: 'y', popup: {Name: 'Семейный доктор', Area: '1,4 км', Time: '17 мин', Adress: '1-я Миусская ул., 2с3 – 11 м.п.'}},
    {x: 21.47, y: 1.80, z: -6.20, rotation: -1.84, color: 'r', popup: {Name:'Магнит', Area: '450 м', Time: '4 мин', Adress: 'Бутырский вал, 32  - 2 м.п.'}},
    {x: 6.65, y: -22.78, z: -5.34, rotation: -0.28, color: 'r', popup: {Name:'Вкусвилл', Area: '290 м', Time: '3 мин', Adress: 'Бутырский вал, 48  - 3'}},
    {x: 17.45, y: 23.76, z: -1.50, rotation: -2.32, color: 'r', popup: {Name:'АВ Daily', Area: '980 м', Time: '12 мин', Adress: 'Лесная ул., 5А – 7 м.п.'}},
    {x: 17.45, y: 23.73, z: -1.48, rotation: -2.32, color: 'w', popup: {Name:'м. "Белорусская" кольцевая', Area: '1км', Time: '8 мин', Adress: ''}},
    {x: 11.79, y: 27.38, z: -1.1, rotation: -2.66, color: 'r', popup: {Name:'Вкусвилл', Area: '790 м', Time: '9 мин', Adress: 'Ленинградский пр-т, 2 - 8 м.п.'}},
    {x: -5.11, y: 26.94, z: -3.04, rotation: -3.12, color: 'g', popup: {Name:'Dr. Loder', Area: '760 м', Time: '9 мин', Adress: '3-я ул. Ямского Поля, 2к4 – 7 м.п.'}},
    {x: -0.65, y: 26.94, z: -1.40, rotation: -3.12, color: 'g', popup: {Name:'EMS Residence', Area: '1,4 км', Time: '17 мин', Adress: '3-я ул. Ямского Поля, 9к4 – 7 м.п.'}},
    {x: 17.59, y: 23.76, z: -1.64, rotation: -2.32, color: 'g', popup: {Name:'Fitness Office', Area: '980 м', Time: '12 мин', Adress: 'Бутырский вал, 10 – 7 м.п.'}},
    {x: 19.97, y: 17.80, z: -1.36, rotation: -2.58, color: 'g', popup: {Name:'EMS Студия', Name2: 'JustFit', Area: '610 м', Time: '10 мин', Adress: '2-й Лесной пер., 10 – 4 м.п.'}},
    {x: 22.33, y: 16.38, z: 0.46, rotation: -2.30, color: 'g', popup: {Name:'RockTheCycle', Area: '1.5км', Time: '18 мин', Adress: '1-я Тверская-Ямская ул., д. 26'}},
    {x: 22.73, y: 18.40, z: 0.62, rotation: -2.30, color: 'g', popup: {Name:'Эра Водолея', Area: '1.3км', Time: '16 мин', Adress: 'Александра Невского, 27 – 10 м.п.'}},
    {x: 18.92, y: 21.78, z: -1.22, rotation: -2.30, color: 'g', popup: {Name:'Trib3', Area: '940 м', Time: '11 мин', Adress: '4-й Лесной пер., 4 – 7 м.п.'}},
    {x: 18.57, y: 22.92, z: -0.06, rotation: -2.58, color: 'g', popup: {Name:'World Class', Area: '1,6км', Time: '19 мин', Adress: 'Б. Грузинская ул., д. 69'}},

    
]

export default Vue.component('location-page', {
    template,
    data() {
        return {
            pageSuffix: '',
            isPlanVisible: false,
            isVideoVisible: false,
            isMapVisible: false,
            videoPlay: false,
            introTitleShow: true,
            navArrowsVisible: false,
            arrowsTimeout: null,
            tour: null,
            map: {img: 'static/img/panorama.JPG', angle: 26},
            filteredPoints: points
        }
    },
    /* 
        Белая площадь - нету. Зато есть БЦ "Слава"?
    */
    beforeDestroy() {
        window.document.removeEventListener('mousemove', this.mouseEventHandler, false);
    },
    mounted() {
        setTimeout(() => {
            this.introTitleShow = false;

            window.document.addEventListener('mousemove', this.mouseEventHandler, false);
        }, 1000);

    },
    computed: {
    },
    methods: {
        changePoints (type) {
            if (type === 'all') {
                this.filteredPoints = points
            } else {
                this.filteredPoints = points.filter(item => item.color === type)
            }
        },

        openPlan () {
            this.pageSuffix = 'Ситуационный план'
            this.chacngValue('isPlanVisible', true)
        },
        closePlan () {
            this.pageSuffix = ''
            this.chacngValue('isPlanVisible', false)
        },

        openMap () {
            this.pageSuffix = 'Карта окружения'
            this.chacngValue('isMapVisible', true)
        },
        closeMap () {
            this.pageSuffix = ''
            this.chacngValue('isMapVisible', false)
        },

        
        openVideo () {
            this.chacngValue('isVideoVisible', true)
        },
        closeVideo () {
            this.$refs.locationVideo.pause()
            this.chacngValue('isVideoVisible', false)
        },
        startVideo () {
            this.chacngValue('videoPlay', true)
            this.$refs.locationVideo.play()
        },

        chacngValue (name, value) {
            this[name] = value
        },

        mouseEventHandler() {
            this.navArrowsVisible = true;

            clearTimeout(this.arrowsTimeout);
            this.arrowsTimeout = setTimeout(() => {
                this.navArrowsVisible = false;
            }, 1000);
        },
    }
});