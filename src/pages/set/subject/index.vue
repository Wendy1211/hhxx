<template>
    <div class="subject">
        <sub-nav></sub-nav>
        <sub-list></sub-list>
    </div>
</template>
<script>
import subNav from './subNav'
import subList from './subList'
export default {
    name:"Subject",
    data() {
        return {

        }
    },
    components:{
        subNav,
        subList
    }
}
</script>
<style lang="less" scoped>
    
</style>
