<template>
  <div class="recommend">
    <div class="section-title">
      推荐歌单
      <i-icon type="enter" size="15" color="#ccc"/>
    </div>
    <div class="songlists">
      <div class="songlist-item" v-for="(i, index) in songLists" :key="index">
        <img :src="i.picUrl" class="songlist-img">
        {{ i.name }}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      songLists: [],
    }
  },

  components: {},
  created() {
    this.getSongLists()
  },
  methods: {
    handleChange(e) {
      this.current = e.mp.detail.key
    },
    bindViewTap() {
      const url = '../logs/main'
      if (mpvuePlatform === 'wx') {
        mpvue.switchTab({ url })
      } else {
        mpvue.navigateTo({ url })
      }
    },
    async getSongLists() {
      try {
        const response = await this.$http.post('/personalized')
        this.songLists = response.data.result.slice(0, 6)
        console.log('推荐歌单', this.songLists)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style scoped lang="stylus">
.recommend
  padding 20px 10px

.section-title
  padding-left 4px
  font-size 15px

.songlists
  display flex
  justify-content space-between
  flex-wrap wrap

.songlist-item
  width 33.3%

</style>
