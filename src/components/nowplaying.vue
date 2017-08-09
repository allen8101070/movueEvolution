<template lang="pug">
section.mybox
  .container
    //- loading
    .row(v-if="myloading")
        loading
    //- 以下AJAX成功顯示的畫面
    .row(v-if="successAJAX")
      .col-sm-12
        h2 現正熱映的電影
      .col-xs-12.col-sm-4.col-md-3(v-for="movie in nowPlaying", :key="movie.id")
          .myMovieCard
            router-link(:to="{ path: '/moviepage/'+movie.id}")
              .myMovieImg
                img(v-bind:src="movie.images.large")
              h4 {{movie.title}}
              p(v-if='movie.pubdate != ""') 上映日期：{{movie.pubdate}}
              p(v-if='movie.pubdate == ""') 上映日期：暫無日期資料
    //- 以下AJAX失敗顯示的畫面
    .row(v-if="errorAJAX")
      h2 讀取失敗，請重新整理!
</template>

<script>
export default {
  name: 'nowplaying',
  data() {
    return {
      msg: '',
      nowPlaying: {},
      myloading: true,//用來判定是否需要loading畫面
      successAJAX: null,//用來判定AJAX成功畫面
      errorAJAX: null,//用來判定AJAX失敗畫面
    }
  },
  methods: {
    getData() {
      //宣告變數self保存"this"，這裡的tihs是上方data(){return裡的內容，因為下面AJAX如果用"this"會抓到AJAX自己本身
      //這樣AJAX完就可以簡單的寫 變數.nowPlaying = AJAX的JSON內容，把JSON傳給data(){return 內的物件
      let self = this;
      let myApiKey = "?apikey=0df993c66c0c636e29ecbb5344252a4a";
      let nowPlayingUrl = "https://nameless-everglades-40413.herokuapp.com/movie/nowplaying" + myApiKey;
      $.ajax({
        url: nowPlayingUrl,
        type: "get",
        dataType: "json",
        success: function (data) {
          console.log("要求資料成功");
          //this.nowPlaying = data.entries;這樣寫不會報錯，因為這裡的"this"指的是AJAX自己
          //但是上方data(){return裡的內容就仍然沒東西，想要傳給上方data(){return的nowPlaying，就用到AJAX前宣告的變數self保存的this
          self.nowPlaying = data.entries;
          self.successAJAX = true;
          self.myloading = false;
        },
        error: function () {
          console.log("要求資料失敗");
          self.errorAJAX = true;
          self.myloading = false;
        }
      });
    }
  },
  mounted() {
    this.getData()
    //載入時自動回到網頁最上方
    $("html,body").animate({
      scrollTop: 0
    }, 0);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
$fontF: #fff

.mybox
  // 因為導覽列fix定住 所以往上推50px不讓區塊被導覽列擋住
  margin-top: 50px
  .row
    text-align: center
    padding: 0px
    h2
      color: $fontF
      font-weight: 900
      margin-bottom: 30px
    .myMovieCard
      background-color: #293344
      margin-bottom: 30px
      box-shadow: 0px 5px 15px -2px #000
      border-radius: 5px
      color: $fontF
      font-weight: 900
      h4
        font-size: 18px
        color: $fontF
        margin-bottom: 0px
      p
        font-size: 16px
        color: $fontF
        margin-bottom: 0
      &:hover img
        -webkit-transform: scale(1.15)
        transform: scale(1.15)
        transition: 0.3s
      .myMovieImg
        overflow: hidden
        border-radius: 5px 5px 0px 0px
        height: 0
        padding-bottom: 300px
        img
          width: 100%


@media (max-width: 767px)
  .mybox
    .row
        .myMovieCard
          width: 80%
          margin-left: auto
          height: auto
          margin-right: auto
          .myMovieImg
            height: auto
            padding-bottom: 0px
</style>
