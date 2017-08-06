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
                    img(src="", alt="哈囉電影網")
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
                    li
                        router-link(:to="{path:'/about'}") 關於本網

</template>

<style scoped lang="sass">
$org: #d35b00;



.navbar.navbar-default.navbar-fixed-top.mynav
  font-size: 18px
  transition: 0.5s
  font-weight: 900
  background-color: #fff
  border: none
  .container
    #navbar2.navbar-collapse.collapse
        .router-link-active
            color: $org !important
.navbar-default
    .navbar-nav > li > a, nav.navbar-default .navbar-brand
        color: #0f2242

.navbar.navbar-default.navbar-fixed-top
  a:hover
    color: $org
    transition: 0.2s

    
.navbar-default .navbar-toggle
  border-color: #fff
  .icon-bar, &:focus, &:hover
    background-color: #fff
  &:focus .icon-bar, &:hover .icon-bar
    background-color: $org
  .icon-bar
    background-color: #0f2242
</style>


