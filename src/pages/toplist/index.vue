<template>
  <div class="toplist">
    <div class="section-title">官方榜</div>
    <div>
      <div class="toplist-item" v-for="(i, index) in topLists" :key="index" @click="goToDetail(i.idx)">
        <div class="toplist-cover">
          <img class="toplist-cover-img" :src="i.coverImgUrl">
          <div class="toplist-updateFrequency">{{ i.updateFrequency }}</div>
        </div>
        <div class="toplist-tracks">
          <div class="track-item" v-for="(track, index1) in i.tracks" :key="index1">
            {{ index1 + 1 }}.{{ track.first }} - {{ track.second}}
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
      topLists: [],
    }
  },
  created() {
    this.getTopList()
  },
  methods: {
    async getTopList() {
      try {
        const response = await this.$http.get('/toplist/detail')
        this.topLists = response.data.list.slice(0, 5)
        console.log('排行榜', response.data)
      } catch (error) {
        console.log(error)
      }
    },
    goToDetail() {
      let id = 1
      wx.navigateTo({ url: `/pages/toplist-detail/main?id=${id}` })
    },
  },
}
</script>

<style scoped lang="stylus">
.toplist
  padding 20px 10px

.section-title
  font-size 15px
  font-weight bold
  margin-bottom 10px

$cover-height = 34vw

.toplist-item
  display flex
  justify-content flex-start
  align-items flex-start
  margin-bottom 5px
  .toplist-cover
    position relative
    margin-right 10px
    .toplist-cover-img
      width $cover-height
      height $cover-height
      border-radius 4px
    .toplist-updateFrequency
      position absolute
      left 5px
      bottom 10px
      color #fff
      font-size 12px
  .toplist-tracks
    display flex
    flex-direction column
    justify-content space-between
    padding 20px 0
    border-bottom 1px solid #eee
    width 100%
    height calc(34vw - 40px)
    .track-item
      font-size 13px
      color #888

</style>
