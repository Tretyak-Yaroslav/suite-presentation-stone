import Vue from 'vue';
import template from './index.html';

export default Vue.component('saved-box', {
  template,
  data () {
    return {
      activeSaved: false
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
    }
  },
  methods: {
    toggleActiveSaved () {
      this.activeSaved = !this.activeSaved
    },
    goToSaved (value) {
      this.$router.push(`/selected?tab=${value}&mode=1`)
    }
  }
});
