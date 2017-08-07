<template lang="pug">
    nav.navbar.navbar-default.navbar-fixed-top.mynav
        .container
            .navbar-header
                button.navbar-toggle.collapsed(type="button", data-toggle="collapse", data-target="#navbar2")
                    span.sr-only 
                    span.icon-bar
                    span.icon-bar
                    span.icon-bar
                router-link.navbar-brand(:to="{path:'/'}")
                    img(src="http://i.imgur.com/M8O0HA0.png", alt="哈囉電影網")
            #navbar2.navbar-collapse.collapse
                ul.nav.navbar-nav.navbar-right
                    li
                        router-link(:to="{path:'/nowplaying'}") 現正熱映
                    li
                        router-link(:to="{path:'/coming'}") 即將上映
                    li
                        router-link(:to="{path:'/usamovie'}") 北美排行
                    li
                        router-link(:to="{path:'/cnmovie'}") 中國排行
</template>

<script>
export default {
  name: 'navbar',
  data() {
    return {
    }
  },
  mounted() {
    // 漢堡選單連結被點選後 自動收合
    if($(window).width()<768){ 
        $('.navbar a').on('click', function(){
            $('.navbar-toggle').click();
        });
    }
  }
}
</script>


<style scoped lang="sass">
$org: #d35b00;
.navbar
    &.navbar-default
        .navbar-brand
            color: #0f2242
            img
                height: 100%
                width: auto
        .navbar-nav
            li
                a
                    color: #0f2242
        &.navbar-fixed-top
            a:hover
                color: $org
                transition: 0.2s
            &.mynav
                font-size: 18px
                transition: 0.5s
                font-weight: 900
                background-color: #fff
                border: none
                .container
                    #navbar2
                        &.navbar-collapse
                            &.collapse
                                .router-link-active
                                    color: $org !important

.navbar-default
    .navbar-toggle
        border-color: #fff
        .icon-bar, &:focus, &:hover
            background-color: #fff
        &:focus .icon-bar, &:hover .icon-bar
            background-color: $org
        .icon-bar
            background-color: #0f2242
</style>


