<template>
  <div>
    <div class="play-item" v-for="(i, index) in playlist" :key="index" @click="goToSongDetail(i.id)">
      <div v-if="type !== 'search'" class="play-order" :class="{'hot': type === 'toplist' && index < 3}">{{ index + 1 }}</div>
      <div class="play-info">
        <div class="play-name">
          <div class="song-name">
            {{ i.name }}
            <span v-if="i.aliasDisplay">({{ i.aliasDisplay }})</span>
          </div>
          <div class="artist-name">
            <div>{{ i.artistListDisplay }} - {{ i.albumDisplay }}</div>
          </div>
        </div>
        <div class="play-icon">
          <i-icon type="playon" size="20" color="#ddd"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: 'playlist', // playlist / toplist /search
    playlist: [],
  },
  data() {
    let list = this.playlist
    list.forEach(item => {
      item.aliasDisplay = this.type === 'search' ? item.alias[0] : item.alia[0]
      item.albumDisplay = this.type === 'search' ? item.album.name : item.al.name
      item.artistListDisplay = this.type === 'search' ? item.artists.map(i => i.name).join('/') : item.ar.map(i => i.name).join('/')
    })
    return {
      list: list,
    }
  },
  methods: {
    goToSongDetail(id) {
      wx.navigateTo({ url: `/pages/song-detail/main?id=${id}` })
    },
  },
  watch: {
    playlist: function(newVal, oldVal) {
      let list = []
      newVal.forEach(item => {
        let obj = item
        obj.aliasDisplay = this.type === 'search' ? item.alias[0] : item.alia[0]
        obj.albumDisplay = this.type === 'search' ? item.album.name : item.al.name
        obj.artistListDisplay = this.type === 'search' ? item.artists.map(i => i.name).join('/') : item.ar.map(i => i.name).join('/')
        list.push(obj)
      })
      this.list = list
    },
  },
}
</script>

<style scoped lang="stylus">
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
