<template>
    <div class="main">
        <nav-list></nav-list>
        <el-container>
            <left-hand></left-hand>
            <div class="mian_tags">
                <v-tags></v-tags>
                <div class="content">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </div>
            </div>
		</el-container>
    </div>
</template>
<script>
import navList from './main-content/nav'
import LeftHand from './main-content/leftHand'
import vTags from './main-content/Tags'
export default {
    data() {
        return {
            tagsList:[]
        }
    },
    components:{
        navList,
        LeftHand,
        vTags
    },
    created(){
        // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
        this.$bus.$on('tags', msg => {
            let arr = [];
            for(let i = 0, len = msg.length; i < len; i ++){
                // console.log(msg[i])
                msg[i].name && arr.push(msg[i].name);
            }
            this.tagsList = arr;
        })
    },
    watch:{
        tagsList(val){
            this.$bus.$emit('saveTag',val);
        }
    }
}
</script>
<style scoped lang="less">
    .main{
        width: 100%;
        height: calc(100vh);
        background-color: @mainBgColor;
        .mian_tags{
            // overflow: auto;
            position: absolute;
            right: 20px;
            top: 60px;
            bottom: 0;
            width: calc(100% - 220px);
            display: inline-block;
            .content{
                margin-top: 50px;
                height: calc(100vh - 110px);
                box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
                background-color: #fff;
                // overflow: auto;
                overflow-y: scroll;
                padding: 5px;
            }
        }
    }

</style>
