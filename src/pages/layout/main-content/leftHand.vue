<template>
    <div class="leftnav">
        <el-menu
            background-color="#fff"
            text-color="#222"
            active-text-color="#4977FC"
            :default-active="currentMenu"
            :collapse-transition="false"
            :unique-opened="true" 
        >
        <DynamicMenu :menuList="sidebarMenu"></DynamicMenu>
    </el-menu>
    </div>
</template>
<script>
import DynamicMenu from '@/components/dynamic-menu'
import { mapState } from 'vuex'
export default {
    name:"navList",
    data() {
        return {
            
        }
    },
    methods:{
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    },
    computed: {
        ...mapState('permission', ['sidebarMenu', 'currentMenu']),
    },
    methods: {},
    components: {
        DynamicMenu
    }
}
</script>
<style lang="less" scoped>
    .leftnav{
        width: 180px;
        height: calc(100vh - 60px);
        position: absolute;
        top: 60px;
        left: 0;
        bottom: 0;
        overflow-x: hidden;
        overflow-y: auto;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        -moz-user-select:none;/*火狐*/
        -webkit-user-select:none;/*webkit浏览器*/
        -ms-user-select:none;/*IE10*/
        -khtml-user-select:none;/*早期浏览器*/
        user-select:none;
        .el-menu{
            width: 100%;
        }
    }
    
    // .el-menu /deep/ .el-submenu__title{
    //     background-color: #ccc !important;
    //     border-bottom: 1px solid #ccc;
    //     border-top: 1px solid #ccc;
    // }

    .el-menu /deep/ .el-menu-item:hover,.el-menu-item:focus,.el-menu-item:not(.is-disabled):focus{
        background-color: @mainNavColor !important;
        color: #fff !important;
        i{
            color: #fff !important;
        }
    }
    .el-menu /deep/ .el-submenu__title:hover {
        background-color: @mainNavColor !important;
        color: #fff !important;
        i{
            color: #fff !important;
        }
    }
</style>
