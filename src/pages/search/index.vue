<template>
  <div class="search-page">
    <div class="search-input">
      <input v-model="keywords" @focus="suggestsVisible = true">
    </div>
    <div class="search-suggest" v-if="suggestsVisible && keywords && suggestList.length">
      <div class="search-keyword" @click="search()">搜索"{{keywords}}"</div>
      <div class="suggest-item" v-for="(item, index) in suggestList" :key="index"
           @click="handleSelect(item.keyword)">
        {{ item.keyword }}
      </div>
    </div>
    <div v-if="!playlist.length">
      <div class="section-title">热门搜索</div>
      <div class="hot-list">
        <div v-for="(i, index) in hotList" :key="index" class="hot-item" @click="handleSelect(i.first)">
          {{ i.first }}
        </div>
      </div>
    </div>
    <div class="play-list" v-if="playlist.length">
      <play-list :playlist="playlist"></play-list>
    </div>
  </div>
</template>

<script>
import PlayList from '@/components/search/PlayList'

export default {
  components: {
    PlayList,
  },
  data() {
    return {
      keywords: '',
      hotList: [],
      suggestList: [],
      suggestsVisible: true,
      playlist: [],
    }
  },
  mounted() {
    this.getHotResult()
  },
  methods: {
    async getHotResult() {
      const res = await this.$http.get('/search/hot')
      this.hotList = res.data.result.hots
    },
    handleSelect(data) {
      this.keywords = data
      this.search()
    },
    async getSearchSuggest() {
      const res = await this.$http.get(`/search/suggest?keywords=${this.keywords}&type=mobile`)
      this.suggestList = res.data.result.allMatch
    },
    async search() {
      this.suggestsVisible = false
      const res = await this.$http.get(`/search?keywords=${this.keywords}&limit=100`)
      this.playlist = res.data.result.songs
    },
  },
  watch: {
    keywords: function(newVal, oldVal) {
      if (newVal && newVal !== oldVal && this.suggestsVisible) {
        this.getSearchSuggest()
      }
    },
  },
}
</script>

<style scoped lang="stylus">
.search-input
  padding 10px
  border-bottom 1px solid #eee
  margin-bottom 20px
  font-size 14px
  color #333

.section-title
  font-size 15px
  font-weight bold
  margin-bottom 10px
  padding 0 10px

.search-suggest
  position absolute
  top 50px
  left 10px
  right 10px
  background-color #fcfcfd
  box-shadow 0 10px 20px #ddd
  font-size 14px
  padding 0 5px
  .search-keyword
    color #507daf
    padding 10px 0
    border-bottom 1px solid #eee
  .suggest-item
    color #666
    padding 10px 0
    border-bottom 1px solid #eee
    &:last-child
      border-bottom 0

.hot-list
  display flex
  justify-content flex-start
  flex-wrap wrap
  margin-top 15px
  padding 0 15px

.hot-item
  margin-right 10px
  padding 5px 10px
  border 1px solid #eee
  color #666
  border-radius 15px
  font-size 14px
  margin-bottom 10px

.play-list
  padding 0 10px
</style>
