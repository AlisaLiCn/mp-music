<template>
  <div class="playlist-detail" v-if="playlist">
    <div class="playlist-header">
      <div class="cover-bg" :style="{backgroundImage: 'url(' + playlist.coverImgUrl + ')'}">
      </div>
      <div class="header-wrap">
        <div class="header_left">
          <img :src="playlist.coverImgUrl" class="cover-img">
        </div>
        <div class="header_right">
          <div class="playlist-name">{{ playlist.name }}</div>
          <div class="playlist-author">
            <img :src="playlist.creator.avatarUrl" class="playlist-author_avator">
            <div class="playlist-author_name">{{ playlist.creator.nickname }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="play-list">
      <play-list type="playlist" :playlist="playlist.tracks"></play-list>
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
      playId: null,
      playlist: null,
    }
  },
  onLoad(option) {
    this.playId = option.id
  },
  mounted() {
    this.getPlayListDetail()
  },
  methods: {
    async getPlayListDetail() {
      try {
        const response = await this.$http.get(`/playlist/detail?id=${this.playId}`)
        this.playlist = response.data.playlist
        console.log('歌单详情', response.data)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style scoped lang="stylus">
.playlist-header
  position relative
  padding 30px 10px 30px 15px
  overflow hidden

.cover-bg
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  filter blur(20px)
  height 150px
  background-position 50%
  background-repeat no-repeat
  background-size cover
  transform scale(1.5)
  overflow hidden
  z-index 1

.header-wrap
  display flex
  .header_left
    z-index 2
    margin-right 15px
    .cover-img
      width 126px
      height 126px
      z-index 2
  .header_right
    z-index 2
    .playlist-name
      color #fff
      font-size 16px
      margin-bottom 20px
    .playlist-author
      display flex
      justify-content flex-start
      align-items center
      .playlist-author_avator
        width 30px
        height 30px
        border-radius 50%
        margin-right 10px
      .playlist-author_name
        font-size 14px
        color rgba(255, 255, 255, .7)
</style>
