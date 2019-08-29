<template>
    <div class="home">
        <router-view></router-view>
        <p>{{ open_time | formatTime }}</p>
    </div>
</template>
<script>
export default {
    data() {
        return {
            open_time:new Date()
        }
    },
    mounted(){
        //    console.log(this.formatTime("2019-08-08"))
    }
}
</script>
<style lang="less" scoped>

</style>
