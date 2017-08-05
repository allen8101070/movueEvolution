<template lang="pug">
  div
    header.jumbotron
      .container
        h1
          | 哈囉電影網
          br
          | 您的電影好夥伴
        router-link(:to="{path:'/usamovie'}") 查看本周北美排名
    section.sectionAsk
      .container
        .row
          .col-sm-5.img
          .col-sm-7
            h2 想找電影資訊與觀眾評論嗎?
    section.sectionAbout
      .container
        .row
          .col-sm-12
            h2 揚起電影網站的新旗幟
            hr
          .col-md-4.col-sm-6
            .img_wrap
              img(src="http://www.fullyu.com/ueditor/php/upload/image/20170320/1489978123866966.jpg", alt="")
            h3 背景
            p 現今電影網站多受到片商與影城業者把持，我們希望能開啟一個電影的新氣象，為這領域注入新的活水與競爭。
          .col-md-4.col-sm-6
            .img_wrap
              img(src="https://image.pbs.org/poster_images/assets/zybuwcw4sr2wuluxk4tr.png.resize.710x399.png", alt="")
            h3 怎麼做?
            p
              | 透過串接第三方電影資訊API，我們打造了一個簡易的電影網站，讓熱愛觀影的你能有更多的選擇，想找電影資訊或看別人的評論嗎?來這就對了。
          .col-md-4.col-sm-6
            .img_wrap
              img(src="https://cdn-images-1.medium.com/max/570/1*9P1fiY1DjqsfwuHT8v4gKQ.jpeg", alt="")
            h3 四種資訊
            p
              | 資訊貴精不貴多，我們替您準備了四種選項「正在熱映」、「北美排行」、「中國排行」與「即將上映」，希望能幫助你找到想要的資訊。
    section.sectionHow
      .container
        .row
          .col-sm-5.img
          .col-sm-7
            h2 哈囉電影網的的特色是?
    section.sectionThree
      .container
        .row
          .col-sm-12
            .col-sm-12
              h2 三大優勢
              hr
            .col-sm-12.features
              .col-sm-4
                span.glyphicon.glyphicon-eye-open.myicon(aria-hidden="true")
                h4 第三方電影網站
              .col-sm-4
                span.glyphicon.glyphicon-sunglasses(aria-hidden="true")
                h4 公開的資料來源
              .col-sm-4
                span.glyphicon.glyphicon-user(aria-hidden="true")
                h4 無工讀生帶風向
            .col-sm-12
              p
                | 第三方電影網站雖無片商的支持與援助。但我們的優勢有三：
                br
                | 1.保證與片商、電影院無關，不會圖利特定電影。
                br
                | 2.串接豆瓣API，遵守使用規範，資訊來源絕對合法。
                br
                | 3.保證自由客觀的影評討論。

</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
$fontF: #fff
*
  border: 1px solid #999
header.jumbotron
  background-image: url(http://i.imgur.com/9tMnrdr.jpg)
  background-size: cover
  background-attachment: fixed
  background-repeat: no-repeat
  margin-top: 50px
  margin-bottom: 0px
  .container
    padding: 120px 0px 280px 0px
    h1
      color: $fontF
      text-shadow: 0px 0px 6px #000
    a
      display: inline-block
      background-color: #d35b00
      text-align: center
      padding: 10px 20px
      font-size: 18px
      color: $fontF
      box-shadow: 0px 0px 6px #fff
      margin-top: 6px
      &:hover
        color: #d35b00
        background-color: $fontF
        transition: 0.5s
        font-width: 900
        
section
  color: $fontF
  &.sectionAsk
    background-color: #d28f1b
    
    .col-sm-5.img
      background-image: url(http://img3.doubanio.com/view/photo/photo/public/p2209079394.jpg)
      background-position: top center
      height: 350px
      background-size: cover
    h2
      margin-top: 130px
      padding: 0px 20px
  &.sectionAbout
    padding: 40px 0px
    img
      width: 100%
    p
      font-size: 16px
    .img_wrap
      height: 200px
      overflow: hidden
  &.sectionHow
    background-color: #dd6216
    
    .col-sm-5.img
      background-image: url(http://img3.doubanio.com/view/photo/photo/public/p938463241.jpg)
      background-position: top center
      height: 350px
      /* mix-blend-mode: multiply;
      background-size: cover
    h2
      margin-top: 130px
      padding: 0px 20px
  &.sectionThree
    text-align: center
    padding: 40px 0px
    h2
      text-align: left
    p
      font-size: 16px
    .features
      span
        font-size: 40px
        margin: 30px 0px
      h4
        margin-bottom: 30px
@media (max-width: 768px)
  section#sectionAsk h2
    margin: 80px 0px
@media (max-width: 767px)
  section#sectionAbout .img_wrap
    height: 250px
@media (max-width: 668px)
  section#sectionAbout .img_wrap
    height: 300px
@media (max-width: 413px)
  section#sectionAbout .img_wrap
    height: 220px
@media (max-width: 768px)
  section#sectionHow h2
    margin: 80px 0px
</style>
