一个微信小程序版的网易云音乐播放器练习demo

[Github](https://github.com/AlisaLiCn/mp-music)地址

## 主要功能
- 推荐音乐
- 云音乐热歌榜
- 搜索
- 歌曲播放页面
    - 歌词滚动
    - 播放进度条
    - 点击跳转进度
    - 拖动跳转进度

## 搭建过程记录
- 还是用[mpvue](http://mpvue.com/mpvue/)来初始化，vue的写法，比较顺手。
  ```

  vue init mpvue/mpvue-quickstart mp-music

  cd mp-music
  npm install

  ```
- HTTP请求，用的[flyio](https://wendux.github.io/dist/#/doc/flyio/readme)。
- 相关的API，使用的是大佬整理维护的Nodejs版本，戳[Github](https://github.com/Binaryify/NeteaseCloudMusicApi)可查看，自己简单部署了一下，Nginx配置如下：
  ```

	server{
	  listen  80;
	  server_name example.com;

	  rewrite ^(.*) https://$host$1 permanent;
	}

	server {
	  listen 443 ssl;
	  server_name example.com;
	  ssl on;

	  ssl_certificate example.com.pem;
	  ssl_certificate_key example.com.key;

	  ssl_session_cache    shared:SSL:1m;
	  ssl_session_timeout  5m;

	  location / {
	    proxy_pass http://127.0.0.1:3000;
	  }

	  ssl_ciphers  HIGH:!aNULL:!MD5;
	  ssl_prefer_server_ciphers  on;
	}

  ```
- 安装stylus，添加loader：
  ```

  npm install stylus stylus-loader  --save-dev

  // webpack.base.conf.js
  {
    test: /\.styl$/,
    loader: ['url-loader', 'css-loader', 'stylus-loader'],
  }

  ```
- app.json中定义tabBar；
- 使用微信小程序的[API](https://developers.weixin.qq.com/miniprogram/dev/api/InnerAudioContext.html)，创建音频实例：
  ```

	wx.createInnerAudioContext()

  ```
- 歌词解析：用了个开源的lyric-parser，但解析网易云音乐歌词存在bug，可以参考issues中讨论的解决方式，最后又自行增加了一个destroy()方法在离开页面时销毁实例：
  ```

	 "lyric-parser": "git+https://github.com/AlisaLiCn/lyric-parser.git",

  ```
- 进度跳转：
  ```

	// 音频跳转，单位秒，小数点需要保留在3位以内，不然好像不生效
	innerAudioContext.seek(time)

	// 歌词跳转，单位毫秒
	lyric.seek(time * 1000)

  ```


## 构建命令
``` bash

# 开发时构建
npm run dev


```

## 预览
构建完成后，使用微信开发者工具打开，也可使用手机扫码预览

截图预览：

![](https://blog.alisali.cn/2019/03/18/%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F-%E7%BD%91%E6%98%93%E4%BA%91%E9%9F%B3%E4%B9%90/play-list.jpg)

![](https://blog.alisali.cn/2019/03/18/%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F-%E7%BD%91%E6%98%93%E4%BA%91%E9%9F%B3%E4%B9%90/play-search.jpg)

![](https://blog.alisali.cn/2019/03/18/%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F-%E7%BD%91%E6%98%93%E4%BA%91%E9%9F%B3%E4%B9%90/play-detail.jpg)


[Github](https://github.com/AlisaLiCn/mp-music)地址



