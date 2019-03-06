<template>
  <div class="song">
    <div>
      <div class="song-cover" v-if="songDetail && songDetail.al" @click="togglePlay">
        <img :src="songDetail.al.picUrl">
        <div class="play-icon" v-if="!isPlaying">
          <i-icon type="playon" size="50" color="#fff"/>
        </div>
      </div>
      <div @click="togglePlay">
        {{ text }}
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
.song-cover
  position relative
  .play-icon
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)

</style>
