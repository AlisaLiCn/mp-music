<template>
  <div class="playlist" v-if="playlist">
    <div class="cover">
      <div class="cover-inner">
        <div class="cover-icon"></div>
        <div class="update-time">
          更新于：{{ playlist.updateTimeDisplay}}
        </div>
      </div>
      <!--<img :src="playlist.coverImgUrl" class="cover-img">-->
    </div>
    <div>
      <play-list type="toplist" :playlist="playlist.tracks"></play-list>
    </div>
  </div>
</template>

<script>
import PlayList from '@/components/PlayList'

export default {
  components: {
    PlayList,
  },
  data() {
    return {
      playlist: null,
    }
  },
  mounted() {
    this.getPlayList()
  },
  methods: {
    async getPlayList() {
      try {
        const idx = 1
        const response = await this.$http.get(`/top/list?idx=${idx}`)
        this.playlist = response.data.playlist
        const t = new Date(this.playlist.updateTime)
        this.playlist.updateTimeDisplay = `${t.getMonth() + 1}月${t.getDate()}日`
        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    },
    goToSongDetail(id) {
      wx.navigateTo({ url: `/pages/song-detail/main?id=${id}` })
    },
  },
}
</script>

<style scoped lang="stylus">

.cover
  position relative
  background-image url("https://s3.music.126.net/m/s/img/hot_music_bg_2x.jpg?f01a252389c26bcf016816242eaa6aee")
  background-size contain
  background-repeat no-repeat
  padding-top 38.9%
  .cover-inner
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    padding-left 20px
    display flex
    flex-direction column
    justify-content center
    z-index 2
    .cover-icon
      width 142px
      height 67px
      background-image url("https://s3.music.126.net/m/s/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880")
      background-position -20px -30px
      background-size 166px 97px
    .update-time
      color #fff
      font-size 12px
      margin-top 8px

.play-item
  display flex
  justify-content flex-start
  align-items center
  font-size 14px
  color #666
  .play-order
    padding 5px 15px
    color #999
    &.hot
      color $color-primary
  .play-info
    display flex
    justify-content space-between
    align-items center
    width 100%
    padding 10px 0
    border-bottom 1px solid #eee
    .play-name
      .song-name
        margin-bottom 5px
        overflow hidden
        width 280px
        text-overflow ellipsis
        white-space nowrap
      .artist-name
        color #999
        font-size 10px
    .play-icon
      padding-right 10px

</style>
