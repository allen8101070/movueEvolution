<template lang="pug">
.cssload-container
  .cssload-zenith
  h2 讀取中...
</template>

<style scoped lang="sass">
.cssload-container
  width: 100%
  height: 100px
  text-align: center
  margin-top: 180px
  margin-bottom: 300px
  h2
    color: #fff

@media (max-width: 415px)
  .cssload-container
    margin-top: 200px
    margin-bottom: 330px

.cssload-zenith
  width: 69px
  height: 69px
  margin: 0 auto
  border-radius: 50%
  border-top-color: transparent
  border-left-color: transparent
  border-right-color: transparent
  box-shadow: 4px 4px 1px rgb(255, 159, 43)
  animation: cssload-spin 420ms infinite linear
  -o-animation: cssload-spin 420ms infinite linear
  -ms-animation: cssload-spin 420ms infinite linear
  -webkit-animation: cssload-spin 420ms infinite linear
  -moz-animation: cssload-spin 420ms infinite linear

@keyframes cssload-spin
  100%
    transform: rotate(360deg)
    transform: rotate(360deg)


@-o-keyframes cssload-spin
  100%
    -o-transform: rotate(360deg)
    transform: rotate(360deg)


@-ms-keyframes cssload-spin
  100%
    -ms-transform: rotate(360deg)
    transform: rotate(360deg)


@-webkit-keyframes cssload-spin
  100%
    -webkit-transform: rotate(360deg)
    transform: rotate(360deg)


@-moz-keyframes cssload-spin
  100%
    -moz-transform: rotate(360deg)
    transform: rotate(360deg)
</style>
