<template lang="pug">
.mybox
  //- loading
  .row(v-if="myloading")
    h2 讀取中...
  //- 以下AJAX失敗顯示的畫面
  .row(v-if="errorAJAX")
    h2 讀取失敗，請重新整理!
  //- 以下AJAX成功顯示的畫面
  .moviePage(v-if="successAJAX")
    header.jumbotron(v-if="traVdo", v-bind:style="{backgroundImage:'url('+thisIdMovie.trailers[0].medium+')'}")
      .container
    header.jumbotron(v-if="traVdoNo", v-bind:style="{backgroundImage:'url('+thisIdMovie.images.large+')'}")
      .container
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
      castYes: true,//辦別有演員資料就顯示...
      castNo: false,//辦別沒有演員資料就顯示...
      traVdo: true, //辦別有預告片就顯示...
      traVdoNo: false//辦別沒有預告片就顯示...
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
          
          if (self.thisIdMovie.trailers == "") {//如果沒有預告片
            self.traVdo = false;
            self.traVdoNo = true;
          }
          if (self.thisIdMovie.casts == "" || self.thisIdMovie.casts[0].avatars == null) {//如果沒有演員
            self.castYes = false;
            self.castNo = true;
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
.mybox
  margin-top: 50px   

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
      padding: 150px 0px
</style>
