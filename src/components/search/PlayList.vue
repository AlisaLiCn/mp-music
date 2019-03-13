<template>
  <div>
    <div class="play-item" v-for="(i, index) in playlist" :key="index" @click="goToSongDetail(i.id)">
      <div class="play-info">
        <div class="play-name">
          <div class="song-name">
            {{ i.name }}
            <span v-if="i.alias.length">({{ i.alias[0] }})</span>
          </div>
          <div class="artist-name">{{ i.artistList }} - {{ i.album.name }}</div>
        </div>
        <div class="play-icon">
          <i-icon type="playon" size="16" color="#ddd"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    playlist: [],
  },
  data() {
    let list = this.playlist
    list.forEach(item => {
      item.artistList = item.artists.map(i => i.name).join('/')
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
      console.log(newVal)
      let list = []
      newVal.forEach(item => {
        let obj = item
        obj.artistList = item.artists.map(i => i.name).join('/')
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
