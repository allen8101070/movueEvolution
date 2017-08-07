<template lang="pug">
.mybox
  //- loading
  .row(v-if="myloading")
    loading
  //- 以下AJAX失敗顯示的畫面
  .row(v-if="errorAJAX")
    h2 讀取失敗，請重新整理!
  //- 以下AJAX成功顯示的畫面
  .moviePage(v-if="successAJAX")
    header.jumbotron(v-if="traVdo", v-bind:style="{backgroundImage:'url('+thisIdMovie.trailers[0].medium+')'}")
      .container
    header.jumbotron(v-if="traVdoOne", v-bind:style="{backgroundImage:'url('+thisIdMovie.trailers[0].medium+')'}")
      .container
    header.jumbotron(v-if="traVdoNo", v-bind:style="{backgroundImage:'url('+thisIdMovie.images.large+')'}")
      .container
    //- 電影資訊區
    section.myMovieBox
      .container
        .row
          .col-xs-12.col-sm-4.col-md-4.thismimg
            img(v-bind:src="thisIdMovie.images.large")
          .col-xs-12.col-sm-8.col-md-8.movieMsg
            .movieName
              h2 {{ thisIdMovie.title }}
              h3(v-if="otherTitle") {{ thisIdMovie.original_title }}
              h4(v-if="ratingYes")
                | 總評分：
                span {{thisIdMovie.rating.average}}
                | /{{thisIdMovie.rating.max}}
              h4(v-if="ratingNo") 總評分：暫無評分
              // 星星STAR
              .StarRating
                label.StarRatingStar(v-for="rating in ratings", :key="rating.id", :class="{ 'is-selected' : ((testStar >= rating) && testStar != null), 'is-disabled': disabled}") ★
            ul
              li
                span.movieTag(v-for="tag in thisIdMovie.tags", :key="tag.id") {{tag}}
              li
                p 導　　演：  
                  span {{thisIdMovie.directors[0].name}}
              li
                p 上映日期：  
                  span.pubdate(v-for="pubdate in thisIdMovie.pubdates", :key="pubdate.id") {{pubdate}} 
              li
                p 片　　長：  
                  span {{thisIdMovie.durations[0]}}
              li
                p 语　　言：  
                  span {{thisIdMovie.languages[0]}} 
              li
                p 官方連結：  
                  a(v-bind:href="thisIdMovie.alt") 點我去
    //- 劇情介紹區塊
    section
      .container
        .row.info0
          .col-md-12
            h3 劇情介紹：
            hr
          .col-md-12(v-if="summaryYes")
            p {{thisIdMovie.summary}}
          .col-md-12.oops(v-if="summaryNo")
            h4 Oops!目前暫無劇情介紹
    //- 預告片區塊
    section
      .container
        .row.info1
          .col-md-12
            h3 預告片：
            hr
          .col-md-12.oops(v-if="traVdoNo")
            h4 Oops!目前暫無預告片資料
          div(v-if="traVdo")
            .col-sm-12.col-md-6(v-for="trailer in thisIdMovie.trailers", :key="trailer.id")
              .trailers
                a(v-bind:href="trailer.alt")
                  .trailersHover
                    span.glyphicon.glyphicon-play(aria-hidden="", true="")
                img(v-bind:src="trailer.medium")
          div(v-if="traVdoOne")
            .col-md-12(v-for="trailer in thisIdMovie.trailers", :key="trailer.id")
              .trailers
                a(v-bind:href="trailer.alt")
                  img(v-bind:src="trailer.medium")
    //- 主要演員區塊
    section
      .container
        .row.info2
          .col-md-12
            h3 主要演員：
            hr
          div(v-if="castYes")
            .col-xs-12.col-sm-6.col-md-3.cast(v-for="cast in thisIdMovie.casts", :key="cast.id")
              .castbox
                a(v-bind:href="cast.alt")
                  .castImg(v-bind:style="{backgroundImage:'url('+cast.avatars.large+')'}")
                h5
                  a(v-bind:href="cast.alt")
                    | {{cast.name}}
                    br
                    span {{cast.name_en}}
          div(v-if="castNo")
            .col-md-12.oops
              h4 Oops!目前暫無演員資料
    //- 心得評論區塊
    section
      .container
        .row.info3
          .col-md-12
            h3 心得評論：
            hr
          div(v-if="commentsYes")
          .col-sm-12.col-md-6(v-for="reviews in thisIdMovie.popular_reviews", :key="reviews.id")
            .media.myComments
              .media-left
                a(v-bind:href="reviews.author.alt")
                  img.media-object(v-bind:src="reviews.author.avatar")
              .media-body
                h4 {{reviews.author.name}}
                .StarRating
                  label.StarRatingStar(v-for="rating in ratings", :key="rating.id", :class="{ 'is-selected' : ((reviews.rating.value >= rating) && reviews.rating.value != null), 'is-disabled': disabled}") ★
                hr
                h4.media-heading 「{{reviews.title}}」
                p {{reviews.summary}}
                  span
                    a(v-bind:href="reviews.alt") 查看更多
          div(v-if="commentsNo")
            .col-md-12.oops
              h4 Oops!目前暫無演員資料
</template>

<script>
export default {
  name: 'moviepage',
  props: {
    max: 5,
    disabled: ''
  },
  data() {
    return {
      myloading: true,//用來判定是否需要loading畫面
      successAJAX: null,//用來判定AJAX成功就...
      errorAJAX: false,//用來判定AJAX失敗就...
      otherTitle: false,//用來判定是否顯示中文以外的原始電影名稱
      thisIdMovie: {},
      testStar: null,//星星用
      ratingYes: true,//辦別有分數就...
      ratingNo: false,//辦別沒有分數就...
      summaryYes: true,//辦別有電影簡介就顯示...
      summaryNo: false,//辦別沒有電影簡介就顯示...
      castYes: true,//辦別有演員資料就顯示...
      castNo: false,//辦別沒有演員資料就顯示...
      traVdo: true, //辦別有預告片就顯示...
      traVdoNo: false,//辦別沒有預告片就顯示...
      traVdoOne: false,//辦別預告片是否只有一部...
      commentsYes: true, //辦別有預告片就顯示...
      commentsNo: false, //辦別有預告片就顯示...
    }
  },
  created() {
    this.movieData()
  },
  //生命週期：mounted(已載入el，根據el內容選擇器成功綁到對應DOM元素身上)//
  mounted: function () {//因為SPA緣故 載入新vue時滾輪不會回到網頁最上面，所以讓他載入時自動回到頁面最上方
    $("html,body").animate({
      scrollTop: 0
    }, 0);
  },
  watch: {
    //監聽路由
   '$route': 'movieData'
  },
  methods: {
    movieData() {
      var self = this;
      var myApiKey = "?apikey=0df993c66c0c636e29ecbb5344252a4a";
      //利用node.js方法params取出路由的id(故意讓路由id等於豆瓣電影API的電影id) 這樣就能把它加進"電影詳細API"去AJAX取個別資料
      var moviePageUrl = "https://nameless-everglades-40413.herokuapp.com/movie/subject/" + this.$route.params.id + myApiKey;
      console.log(this.$route.params.id);
      $.ajax({
        url: moviePageUrl,
        type: "get",
        dataType: "json",
        success: function (data) {
          console.log("要求資料成功");
          if (data.code == 5000){
            self.myloading = false;
            self.errorAJAX = true;
            successAJAX = false;
          }
          self.thisIdMovie = data;
          self.successAJAX = true;//顯示successAJAX區塊
          self.myloading = false;//不顯示loading動畫
          self.testStar = Math.round(self.thisIdMovie.rating.average / 2)//轉換成星星的分數給他四捨五入 因為滿分通常10分 星星只有5顆 所以除2
          
          if (data.title != data.original_title) {//如果電影名不等於原始電影名
            self.otherTitle = true;//顯示原始電影名(原始電影名可能是英文日文或中文 都中文的話標題沒必要顯示兩次...)
          }
          
          if (self.testStar == 0) {//如果這部電影分數等於0
            self.ratingNo = true;//顯示目前暫無評分
            self.ratingYes = false;//隱藏總評分字樣
          }

          if (self.thisIdMovie.summary == "") {//如果沒有電影簡介
            self.summaryYes = false;
            self.summaryNo = true;
          }

          if (self.thisIdMovie.trailers == "") {//如果沒有預告片
            self.traVdo = false;
            self.traVdoNo = true;
          }
          if (self.thisIdMovie.trailers.length == 1) {//如果沒有預告片
            self.traVdo = false;
            self.traVdoOne = true;
          }
          if (self.thisIdMovie.casts == "" || self.thisIdMovie.casts[0].avatars == null) {//如果沒有演員
            self.castYes = false;
            self.castNo = true;
          }
          if (self.thisIdMovie.popular_reviews == false) {//如果沒有評論
            self.commentsYes = false;
            self.commentsNo = true;
          }
        },
        error: function () {
          console.log("要求資料失敗");
          self.errorAJAX = true;
          self.myloading = false;
        }
      });
    }
  },
  computed: {
    ratings: function () {
      if (!this.max) { return [1, 2, 3, 4, 5]; }
      var numberArray = [];
      for (var i = 1; this.max >= i; i++) {
        numberArray.push(i);
      }
      return numberArray;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
$myorg: #d35b00;
$myshadow: 0px 10px 18px -4px #000;
*
  // border: 1px solid #fff


// 星星CSS
.StarRating .StarRatingStar
  display: inline-block
  padding: 3px
  vertical-align: middle
  line-height: 1
  font-size: 30px
  color: #fff
  &.is-selected
    color: yellow



.mybox
  margin-top: 50px   
  color: #fff

  // 最上方的照片區塊
  header.jumbotron
    background-size: cover
    background-repeat: no-repeat
    background-position: center top
    margin-top: 0px
    margin-bottom: 0px
    -webkit-filter: blur(5px)
    -moz-filter: blur(5px)
    filter: blur(5px)

    .container
      padding: 120px 0px

// 電影資訊區塊
.myMovieBox
  position: relative
  // 電影海報
  .thismimg

    img
      position: absolute
      left: 50px
      width: 250px
      height: auto
      top: -180px
      box-shadow: $myshadow
  // 電影資訊 
  .movieMsg
    padding: 10px
    font-size: 18px
    position: relative

    ul
      list-style-type: none
      padding: 0px
      margin-top: 20px
      span
        display: inline-block

      .pubdate
          margin-right: 20px
    // 電影分類標籤 
    .movieTag
      margin-right: 10px
      padding-left: 10px
      padding-right: 10px
      margin-bottom: 10px
      border: 2px solid #fff
      border-radius: 8px
    // 豆瓣電影der連結 
    a
      color: $myorg
      &:hover
        color: #fff
    // 電影名稱區塊 
    .movieName
      position: absolute
      top: -180px
      //給星星陰影不然視背景色不同容易看不清楚
      label
        text-shadow: 0px 0px 5px #000
      h2
        font-weight: 900
        font-size: 44px
        margin: 0px
        color: #fff
        text-shadow: 0px 0px 5px #000
      h3
        font-size: 24px
        margin: 0px
        color: #fff
        text-shadow: 0px 0px 5px #000
      h4
        text-shadow: 0px 0px 5px #000
        color: #fff
        font-size: 24px

@media (max-width: 1200px)
  .myMovieBox
    .thismimg
      img
        left: 50px
@media (max-width: 991px)
  .myMovieBox
    .thismimg
      img
        width: 200px
        left: 0px

@media (max-width: 767px)
  header.jumbotron
    display: none
  .myMovieBox
    .thismimg
      margin-top: 30px
      text-align: center
      img
        position: static
        width: 70%
        height: auto
    .movieMsg
      .movieName
        text-align: center
        position: static
        margin-bottom: 15px
      li
        text-align: center

// section區塊相同的標題與底線
section
  .container
    .row
      padding-bottom: 40px

      h3
        font-size: 30px
        font-weight: 900
        margin-bottom: 0px
      hr
        border-top: 3px solid $myorg
        margin-top: 4px
      .oops
        text-align: center
        height: 100px

// 劇情描述區塊
.info0
  p
    font-size: 16px
    line-height: 1.6em

// 預告片區塊
.info1
  .trailers
    text-align: center
    position: relative
    margin-bottom: 40px
    // 預告片圖片
    img
      max-width: 100%
      height: auto
      box-shadow: $myshadow
    // 上一層淡淡黑色區塊
    .trailersHover
      transition: 0.3s
      position: absolute
      top: 0px
      bottom: 0px
      left: 0px
      right: 0px
      background-color: rgba(0, 0, 0, 0.1)

      &:hover
        background-color: rgba(0, 0, 0, 0.5)
      // 播放標誌
      span
        font-size: 60px
        color: #fff
        text-shadow: 0px 0px 10px #fff
        border: 3px solid #fff
        border-radius: 50%
        padding: 10px
        margin-top: 20%

// 演員圖片區塊
.info2
  .cast
    // 演員區塊
    .castbox
      max-width: 200px
      height: auto
      margin-left: auto
      margin-right: auto
      margin-bottom: 10px
      text-align: center

      h5
        margin-top: 10px
        margin-bottom: 0px
        font-size: 18px

      a
        color: #fff
        &:visited
          color: #fff
      // 演員圖片      
      .castImg
        width: 100%
        height: 250px
        background-repeat: no-repeat
        background-position: center
        background-size: 100% 100%
        box-shadow: $myshadow

@media (max-width: 992px)
  .info2
    .cast
      margin-bottom: 20px
      .castbox
        max-width: 80%
        .castImg
          height: 380px

@media (max-width: 767px)
  .info2
    .cast
      .castbox
        max-width: 400px
        .castImg
          height: 600px

@media (max-width: 640px)
  .info2
    .cast
      .castbox
        max-width: 300px
        .castImg
          height: 400px



.info3
  margin-top: 50px
  .myComments
    border: 3px solid $myorg
    padding: 10px
    height: 250px
    margin-bottom: 20px
    box-shadow: $myshadow

    .media-left
      text-align: center
      padding: 10px
      img
        margin: 0px auto
    .media-body
      h4
        font-size: 18px
        color: #fff
        font-weight: 900
        margin-bottom: 0px
        
      .StarRating
        .StarRatingStar
          font-size: 20px
          color: #f7f7f7
          text-shadow: 0px 0px 1px #000
          &.is-selected
            color: yellow
      p
        font-size: 16px
        color: #fff
        padding-right: 1em
        margin-top: 20px

      a
        color: yellow
        font-width: 900
        &:hover
          color: #77e5a0

@media (max-width: 992px)
  .info3 .myComments
    height: auto










</style>
