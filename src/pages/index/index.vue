<template>
  <div class="recommend-list">
    <div class="section-title">
      推荐歌单
    </div>
    <div class="songlists">
      <div class="songlist-item" v-for="(i, index) in songLists" :key="index" @click="goToDetail(i.id)">
        <div class="songlist-playcount">
          <i-icon type="customerservice" size="12" color="#fff"/>
          <span>{{ i.playCount }}</span>
        </div>
        <img :src="i.picUrl" class="songlist-img">
        <p class="songlist-name">{{ i.name }}</p>
      </div>
    </div>
    <div class="section-title">
      最新音乐
    </div>
    <div class="newsong-list">
      <play-list type="search" :playlist="newsongList"></play-list>
    </div>
  </div>
</template>

<script>
import PlayList from '@/components/PlayList'

export default {
  data() {
    return {
      songLists: [],
      newsongList: [],
    }
  },
  components: { PlayList },
  mounted() {
    this.getSongLists()
    this.getNewsongList()
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
      } catch (error) {
        console.log(error)
      }
    },
    async getNewsongList() {
      const response = await this.$http.get('/personalized/newsong')
      this.newsongList = response.data.result.map(item => {
        return item.song
      })
    },
    goToDetail(id) {
      wx.navigateTo({ url: '/pages/playlist-detail/main?id=' + id })
    },
  },
}
</script>

<style scoped lang="stylus">
.recommend-list
  padding 10px 10px

.section-title
  font-size 15px
  font-weight bold
  margin 15px 0
  padding-left 10px
  border-left 3px solid $color-primary

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
