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
                        router-link(:to="{path:'/usamovie'}") 北排排行
                    li
                        router-link(:to="{path:'/cnmovie'}") 中國排行
                    li
                        router-link(:to="{path:'/about'}") 關於本網

</template>

<style scoped lang="sass">
nav.navbar.navbar-default.navbar-fixed-top.mynav
    .container
        #navbar2.navbar-collapse.collapse
            .router-link-active
                color: #d35b00 !important


</style>


