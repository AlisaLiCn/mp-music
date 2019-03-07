<template>
  <div class="recommend-list">
    <div class="section-title">
      推荐歌单
      <i-icon type="enter" size="15" color="#ccc"/>
    </div>
    <div class="songlists">
      <div class="songlist-item" v-for="(i, index) in songLists" :key="index">
        <div class="songlist-playcount">
          <i-icon type="customerservice" size="12" color="#fff"/>
          <span>{{ i.playCount }}</span>
        </div>
        <img :src="i.picUrl" class="songlist-img">
        <p class="songlist-name">{{ i.name }}</p>
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
  mounted() {
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
.recommend-list
  padding 20px 10px

.section-title
  font-size 15px
  font-weight bold
  margin-bottom 10px

.songlists
  display flex
  justify-content space-between
  flex-wrap wrap

.songlist-item
  position relative
  width 30vw
  margin-bottom 10px
  .songlist-playcount
    position absolute
    right 0
    top 0
    color #fff
    font-size 12px
  .songlist-img
    width 30vw
    height 30vw
  .songlist-name
    /*max-height 40px*/
    font-size 13px
    /*overflow hidden*/
    /*text-overflow ellipsis*/
</style>
