<template>
  <div class="song" v-if="songDetail">
    <div class="song-bg" :style="{backgroundImage: 'url(' + songDetail.al.picUrl + ')'}">
    </div>
    <div class="song-wrapper" @click="toggleLyricVisible">
      <!--<div class="song-name">-->
      <!--{{ songDetail.name }}-->
      <!--<span v-if="songDetail.alia.length">({{ songDetail.alia[0] }})</span>-->
      <!--</div>-->
      <div class="song-inner">
        <div class="song-disc" v-if="!lyricVisible">
          <div class="song-disc-light"></div>
          <div class="song-disc-dark"></div>
          <div class="song-cover-wrapper">
            <div class="song-cover" :class="{rotate: isPlaying}" v-if="songDetail && songDetail.al">
              <img class="song-cover-img" :src="songDetail.al.picUrl">
            </div>
          </div>
        </div>
        <div class="song-lyric" v-else-if="lyricVisible && lyric"
             :style="{top: lyricTop + 'px', transition: 'all 1s ease'}">
          <div v-for="(lyric,index) in lyric.lines" :key="index" :class="{'current': index === lyricCurrentLine}">
            {{ lyric.txt }}
          </div>
        </div>
      </div>
    </div>
    <div class="song-play-info">
      <div class="song-progress">
        <!--<input type="range" min="0" max="100" v-model="playProgress">-->
        <!--<input type="range" min="0" max="100" value="90">-->
        <div class="bar-bg">
          <div class="bar-inner" :style="{width: playProgress + '%'}"></div>
          <div class="bar-point"></div>
        </div>
      </div>
      <div class="song-control">
        <i-icon type="refresh" size="26" color="#fff"/>
        <i-icon type="return" size="26" color="#fff"/>
        <i-icon :type="isPlaying ? 'suspend' : 'playon'" size="26" color="#fff" @click="togglePlay"/>
        <i-icon type="enter" size="26" color="#fff"/>
        <i-icon type="other" size="26" color="#fff"/>
      </div>
    </div>
  </div>
</template>

<script>
import Lyric from 'lyric-parser'

export default {
  data() {
    return {
      songId: null,
      songUrl: '',
      songDetail: null,
      innerAudioContext: null,
      isPlaying: false,
      playProgress: 0,
      lyricVisible: false,
      lyric: null,
      lyricCurrentLine: 0,
      lyricTop: 0,
    }
  },
  onLoad(option) {
    this.songId = option.id
  },
  mounted() {
    this.createAudioCtx()
    this.getSongDetail()
    this.getLyric()
  },
  computed: {},
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
        })
        this.innerAudioContext.onTimeUpdate(() => {
          this.playProgress = this.innerAudioContext.currentTime / this.innerAudioContext.duration * 100
          console.log('progress: ', this.playProgress)
        })
        this.innerAudioContext.onPause(() => {
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
      this.lyric.togglePlay()
    },
    async getSongDetail() {
      const response = await this.$http.get(`/song/detail?ids=${this.songId}`)
      this.songDetail = response.data.songs[0]
      console.log('歌曲detail: ', response.data)
    },
    async getLyric() {
      const response = await this.$http.get(`/lyric?id=${this.songId}`)
      const lyricStr = response.data.lrc.lyric
      this.lyric = new Lyric(lyricStr, this.handleLyric)
    },
    handleLyric({ lineNum, txt }) {
      this.lyricCurrentLine = lineNum
      if (lineNum > 6) {
        this.lyricTop = (lineNum - 6) * -18
      } else {
        this.lyricTop = 0
      }
    },
    toggleLyricVisible() {
      this.lyricVisible = !this.lyricVisible
    },
  },
  onUnload() {
    this.innerAudioContext.destroy()
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
  position absolute
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
  bottom 100px
  left 0
  z-index 10
  .song-inner
    position relative
    margin-top 30px
    height calc(100% - 30px)
    overflow hidden

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
  width 200px
  height 200px
  margin 100px auto
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

.song-name
  color #fff
  font-size 14px
  text-align center
  overflow hidden
  text-overflow ellipsis
  white-space nowrap
  width 200px

.song-lyric
  position absolute
  left 50px
  right 50px
  display flex
  flex-direction column
  justify-content center
  color rgba(255, 255, 255, .6)
  font-size 12px
  line-height 1.8
  text-align center
  .current
    color #fff

.song-play-info
  position absolute
  left 0
  right 0
  bottom 0
  height 80px
  z-index 10
  .song-control
    display flex
    justify-content space-around
    padding 10px 0

$progress-bar-height = 4px
.song-progress
  .bar-bg
    position relative
    height $progress-bar-height
    background-color #ccc
    .bar-inner
      position absolute
      top 0
      left 0
      height $progress-bar-height
      background-color $color-primary
</style>
