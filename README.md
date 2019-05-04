# 简介

>当前项目基于技术栈为[webpack4](https://www.webpackjs.com/)，注意这个项目包含了2个环境，node服务器和webpack，如果只需要前端，请忽略node这一层，直接在web目录下，去工作


## 开始创建

```bash
# Clone project
git clone https://github.com/fang130tao/node-webpack4-pages-application.git

```
## node目录介绍
即第一层目录
- bin    目录下的www：服务器的端口和启动，都是在此目录
- logs   日志目录
- routes 路由
- utils  第三方库和公共js
- web    前端的页面，包含开发版和发布版

## 前端主目录（web）介绍
即web目录下，如果只工作于前端，可以就在web这个目录下工作，发布版即是dist目录，拷贝给后台
- dist 发布版本目录
- src  开发版的目录
- 其他 webpack等环境的配置

## 前端开发目录（src）介绍
- api  静态数据的js
- font、images静态资源目录
- html  多页面HTML的模板，webpack会去根据此模板去解析不同的页面
- page 多页面模板对应的js，css需在此js中引用
- service 将请求分离出来
- util 第三方库和写的公共js目录
- favicon.ico 图标

## node服务安装
```
# 安装
yarn

# 开发环境
npm run dev

# node服务集成
npm run deploy

```



#### 前端安装

- webpack开发：

```
# 进入前端目录
cd web

# 安装
yarn

# 开发环境
npm run dev

# 创建线上环境的代码
npm run build

```

## node层使用
命令 npm run dev 后，打开浏览器：http://localhost:9000/，就可以访问到

## 前端开发使用
- 添加页面index

1. 在page下添加目录index和index.js
2. 在html下添加index.html
3. 在web/src/base.js中add

```
module.exports = {
   entry: {
      common: ['./src/util/common.js'],
      jquery: ['./src/util/jquery.js'],
      product: ['./src/page/product/index.js'],
      index:['./src/page/index/index.js'] // add
   },
   module: {
   ...
   },
   plugins: [
   ...
      new HtmlWebpackPlugin(getHtmlConfig('product')),
      new HtmlWebpackPlugin(getHtmlConfig('index')), // add
   ...
   ],
   ...
}



```

命令 npm run dev 后，会自动打开浏览器，更改代码，页面会实时同步


## 相关知识

模板引擎：[art-template](https://aui.github.io/art-template/zh-cn/docs/syntax.html)
