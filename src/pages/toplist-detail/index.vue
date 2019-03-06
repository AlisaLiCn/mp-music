<template>
  <div class="playlist">
    <div class="cover">
      <img :src="playlist.coverImgUrl" class="cover-img">
    </div>
    <div>
      <div class="play-item" v-for="(i, index) in playlist.tracks" :key="index" @click="goToSongDetail(i.id)">
        <div class="play-order" :class="{'hot': index < 3}">{{ index + 1 }}</div>
        <div class="play-info">
          <div class="play-name">
            <div class="song-name">
              {{ i.name }}
              <span v-if="i.alia.length">({{ i.alia[0] }})</span>
            </div>
            <div class="artist-name">{{ i.artists }} - {{ i.al.name }}</div>
          </div>
          <div class="play-icon">
            <i-icon type="playon" size="16" color="#ddd"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playlist: [],
    }
  },
  created() {
    this.getDetail()
  },
  methods: {
    async getDetail() {
      try {
        const idx = 1
        const response = await this.$http.get(`/top/list?idx=${idx}`)
        this.playlist = response.data.playlist
        this.playlist.tracks.forEach(item => {
          item.artists = item.ar.map(i => i.name).join('/')
        })
        console.log('歌曲列表', this.playlist.tracks)
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

.cover-img
  width 100%

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
