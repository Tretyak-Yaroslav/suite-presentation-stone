import Vue from 'vue';
import numeral from 'numeral';

// load a locale
numeral.register('locale', 'ru', {
    delimiters: {
        thousands: ' ',
        decimal: ','
    },
    abbreviations: {
        thousand: 'тыс',
        million: 'млн',
        billion: 'млрд',
        trillion: 'трлн'
    },
    currency: {
        symbol: '₽'
    }
});
numeral.locale('ru');

export default Vue.filter('numeral', (value, format = '0[.]00') => {
    console.log(value)
    if (!Number.isFinite(value)) {
        return;
    }

    let result = numeral(value);

    return result.format(format);
});