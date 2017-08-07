<template lang="pug">
section.mybox
  .container
    //- loading
    .row(v-if="myloading")
      loading
    //- 以下AJAX成功顯示的畫面
    .row(v-if="successAJAX")
      .col-sm-12
        h2 本週北美電影排行
      .col-xs-12.col-sm-4.col-md-3(v-for="movie in usamovie", :key="movie.id")
          .myMovieCard
            router-link(:to="{ path: '/moviepage/'+movie.subject.id}")
              .myMovieImg
                img(v-bind:src="movie.subject.images.large")
              h4 {{movie.subject.title}}
              p 目前排名：{{movie.rank}}
    //- 以下AJAX失敗顯示的畫面
    .row(v-if="errorAJAX")
      h2 讀取失敗，請重新整理!
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      usamovie: {},
      myloading: true,//用來判定是否需要loading畫面
      successAJAX: null,//用來判定AJAX成功畫面
      errorAJAX: null,//用來判定AJAX失敗畫面
    }
  },
  methods: {
   getData() {
      //宣告變數self保存this
      var self = this;
      var myApiKey = "?apikey=0df993c66c0c636e29ecbb5344252a4a";
      var usamovieUrl = "https://nameless-everglades-40413.herokuapp.com/movie/us_box" + myApiKey;
      $.ajax({
        url: usamovieUrl,
        type: "get",
        dataType: "json",
        success: function (data) {
          console.log("要求資料成功");
          self.usamovie = data.subjects;
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
