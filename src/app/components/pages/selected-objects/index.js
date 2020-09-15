import Vue from 'vue'
import template from './index.html'

export default Vue.component('selected-object', {
  template,
  data () {
    return {
      navArrowsVisible: false,
      activeTab: 'office',
      firstFormValue: 'deal',
      mode: 1,
      isOpenedModal: false,
      modalData: {
        title: '',
        text: ''
      },
      isCompanyModal: false,
      isPassportModal: false
    }
  },
  computed: {
    savedItems () {
      const savedItems = this.$store.state.ParentApiStore.savedItems
      return savedItems
    },
    savedRitail () {
      const savedRitail = this.savedItems.filter(item => item.type === 'retail')
      return savedRitail
    },
    savedOffice () {
      const savedOffice = this.savedItems.filter(item => item.type === 'office')
      return savedOffice
    },
    savedParking () {
      const savedParking = this.savedItems.filter(item => item.type === 'parking')
      return savedParking
    },

    savedTotal () {
      const prices = this.savedItems.map(item => item.price)
      if (!prices.length) return 0
      const total = prices.reduce((acc, val) => acc + val)
      return total
    },
    officeTotal () {
      const prices = this.savedOffice.map(item => item.price)
      if (!prices.length) return 0
      const total = prices.reduce((acc, val) => acc + val)
      return total
    },
    ritailTotal () {
      const prices = this.savedRitail.map(item => item.price)
      if (!prices.length) return 0
      const total = prices.reduce((acc, val) => acc + val)
      return total
    },
    parkingTotal () {
      const prices = this.savedParking.map(item => item.price)
      if (!prices.length) return 0
      const total = prices.reduce((acc, val) => acc + val)
      return total
    }
  },
  mounted () {
    if (this.$route.query.tab) {
      this.activeTab = this.$route.query.tab
    }
    if (this.$route.query.mode) {
      this.mode = this.$route.query.mode
    }
  },
  methods: {
    removeFromSaved (id) {
      this.$store.dispatch('ParentApiStore/removeFromSaved', id)
    },
    openDeal () {
      this.modalData = {
        title: 'Поздравляем!',
        text: `Вы успешно арендовали ${this.savedOffice.length} офисов, ${this.savedParking.length} машиномест, ${this.savedRitail.length} ритейл-помещений.`
      }
      this.openModal('isOpenedModal')
    },
    openPersonalDeal () {
      this.modalData = {
        title: 'Спасибо!',
        text: `Ваше персонализированное предложение было успешно отправлено на адрес эл.почты`
      }
      this.openModal('isOpenedModal')
    },
    openModal (name) {
      this[name] = true
    },
    closeModal (name) {
      this[name] = false
    },
    setActiveTab(value) {
      this.activeTab = value
    },
    goBack () {
      this.$router.go(-1)
    },
    firstFormSubmit () {
      if (this.firstFormValue == 'deal') {
        this.mode = 2
      } else if (this.firstFormValue == 'personal_deal') {
        this.mode = 3
      }
      this.$router.push({
        query: {
          ...this.$route.query,
          mode: this.mode
        }
      })
    },
    changeRadioValue (e, name) {
      this[name] = e.target.value
    }
  },
  filters: {
      money (value) {
        if (!value) return ''
        function numberWithSpaces(x) {
          return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        }
        return numberWithSpaces(value)
      },
      fromDotToComma (value) {
          if (!value) return ''
          return String(value).replace('.', ',')
      }
  },
  watch: {
    '$route' ({ query }) {
      const { mode = 1 } = query
      this.mode = mode
    }
  }
})