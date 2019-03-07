<template>
  <div class="song" v-if="songDetail">
    <div class="song-bg" :style="{backgroundImage: 'url(' + songDetail.al.picUrl + ')'}">
      <div class="song-wrapper">
        <div class="song-disc">
          <div class="song-disc-light"></div>
          <div class="song-disc-dark"></div>
          <div class="song-cover-wrapper">
            <div class="song-cover" :class="{rotate: isPlaying}" v-if="songDetail && songDetail.al" @click="togglePlay">
              <img class="song-cover-img" :src="songDetail.al.picUrl">
              <div class="play-icon" v-if="!isPlaying">
                <i-icon type="playon" size="40" color="#eee"/>
              </div>
            </div>
          </div>
        </div>
        <div class="song-info">
          <div class="song-name">
            {{ songDetail.name }}
            <span v-if="songDetail.alia.length">({{ songDetail.alia[0] }})</span>
          </div>
          <div class="song-lyric">
lyric lyric
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
      songId: null,
      songUrl: '',
      songDetail: null,
      innerAudioContext: null,
      isPlaying: false,
    }
  },
  onLoad(option) {
    this.songId = option.id
  },
  mounted() {
    this.createAudioCtx()
    this.getSongDetail()
  },
  computed: {
    text() {
      console.log('isPlaying: ', this.isPlaying)
      return this.isPlaying ? '暂停' : '播放'
    },
  },
  methods: {
    async createAudioCtx() {
      try {
        const response = await this.$http.get(`/song/url?id=${this.songId}`)
        this.songUrl = response.data.data[0].url
        console.log('歌曲详情', response.data)

        this.innerAudioContext = wx.createInnerAudioContext()

        this.innerAudioContext.autoplay = false
        this.innerAudioContext.src = this.songUrl
        this.innerAudioContext.onPlay(() => {
          console.log('开始播放')
        })
        this.innerAudioContext.onPause(() => {
          console.log('暂停播放')
        })
        this.innerAudioContext.onError((res) => {
          console.log(res.errMsg)
          console.log(res.errCode)
        })
      } catch (error) {
        console.log(error)
      }
    },
    togglePlay() {
      if (this.isPlaying) {
        this.innerAudioContext.pause()
      } else {
        this.innerAudioContext.play()
      }
      this.isPlaying = !this.isPlaying
    },
    async getSongDetail() {
      const response = await this.$http.get(`/song/detail?ids=${this.songId}`)
      this.songDetail = response.data.songs[0]
      console.log('歌曲detail: ', response.data)
    },
  },
}
</script>

<style scoped lang="stylus">
.song-bg
  opacity 1
  background-position 50%
  background-repeat no-repeat
  background-size auto 100%
  transform scale(1.5)
  transform-origin center top
  position fixed
  left 0
  right 0
  top 0
  height 100%
  overflow hidden
  z-index -1
  transition opacity .3s linear
  &:after
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    content ' '
    background-color rgba(0, 0, 0, .8)

.song-wrapper
  position absolute
  top 0
  right 0
  bottom 0
  left 0
  z-index 10
  padding-top 40px

vendors = official
@keyframes rotates {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.song-disc
  position relative
  width 180px
  height 180px
  margin 0 auto
  .song-disc-light
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    background-image url("https://s3.music.126.net/m/s/img/disc_light-ip6.png?996fc8a2bc62e1ab3f51f135fc459577")
    background-size contain
    z-index 1
  .song-disc-dark
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    background-image url("https://s3.music.126.net/m/s/img/disc-ip6.png?69796123ad7cfe95781ea38aac8f2d48")
    background-size contain
    z-index 2
  .song-cover-wrapper
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    z-index 3
    .song-cover
      position relative
      width 100%
      height 100%
      .song-cover-img
        position absolute
        width 120px
        height 120px
        top 50%
        left 50%
        transform translate(-50%, -50%)
        border-radius 50%
      .play-icon
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
      &.rotate
        animation: rotates 20s linear infinite;
.song-info
  width 200px
  margin 20px auto
  display flex
  flex-direction column
  justify-content center
  .song-name
    color #fff
    font-size 14px
    text-align center
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    width 200px

</style>
