<template>
  <div>
    推荐音乐
  </div>
</template>

<script>

export default {
  data() {
    return {
      current: 'tab1',
    }
  },

  components: {},

  methods: {
    handleChange(e) {
      this.current = e.mp.detail.key
    },
    bindViewTap() {
      const url = '../logs/main'
      if (mpvuePlatform === 'wx') {
        mpvue.switchTab({ url })
      } else {
        mpvue.navigateTo({ url })
      }
    },
    clickHandle(ev) {
      console.log('clickHandle:', ev)
      // throw {message: 'custom test'}
    },
    async getData() {
      try {
        const response = await this.$http.post('/search/hot?params=piAtwOtaLvRA68XKMwDjYKCQ6e/hl9UfnxDZboLYfeg=&encSecKey=159d53b42cd267629ffe7aebbe0c3a9e36732e5efd5d44bd487e559dadb11427b0dbe8f9e961a2ee147014972e8597b45cfe831f1648a3900b323e61aa24f09d1243d9c401ba561bca569e67a931deb8db1fc7b2a985ffdb36fc59d10b941b4d4ecd4590a37cd38694665811f2742a2a6dc5a68da1d95c403c47b183fb3f8420')
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    },
  },

  created() {
    // let app = getApp()
    this.getData()
  },
}
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128 rpx;
  height: 128 rpx;
  margin: 20 rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.all {
  width: 7.5rem;
  height: 1rem;
  background-color: blue;
}

.all:after {
  display: block;
  content: '';
  clear: both;
}

.left {
  float: left;
  width: 3rem;
  height: 1rem;
  background-color: red;
}

.right {
  float: left;
  width: 4.5rem;
  height: 1rem;
  background-color: green;
}
</style>
