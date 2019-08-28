<template>
    <div class="menu-container">
        <template v-for="(item,index) in menuList">
            <!--表示 有一级菜单-->
            <router-link v-if="!item.hidden && item.noDropdown" :to="item.path+'/'+item.children[0].path" :key="index">
                <el-menu-item class="dropItem" 
                    :index="item.path+'/'+item.children[0].path"
                    >
                    <i v-if="item.meta.icon" :class="'fa fa-margin '+item.meta.icon"></i>
                    <span v-if="item.meta.name" slot="title">{{item.meta.name}}</span> 
                </el-menu-item>
            </router-link>

            <!--表示 有二级或者多级菜单 -->
            <el-submenu v-if="item.children  && item.children.length >= 1 && !item.hidden && !item.noDropdown"  :index="item.path" :key="index">
                <template slot="title">
                    <i v-if="item.meta.icon" :class="'fa fa-margin '+item.meta.icon"></i>
                    <span v-if="item.meta.name" slot="title">{{item.meta.name}}</span>
                </template>
                
                <!--直接定位到子路由上，子路由也可以实现导航功能-->
                <router-link v-for="(citem,cindex) in item.children" :to="getIindex(citem,item,cindex)"  :key="cindex">
                    <el-menu-item 
                        v-if="citem.meta.routerType != 'topmenu' && citem.meta.name"
                        :index="getIindex(citem,item,cindex)" >
                        <span slot="title">{{citem.meta.name}}</span>
                    </el-menu-item> 
                </router-link>
            </el-submenu>
        </template>
    </div>
</template>

<script>
export default {
    name: 'my-nav',
    data(){
        return{
            
        }
    },
    props: {
        menuList: {
            type: Array,
            default: function() {
                return []
            }
        }
    },
    methods: {
        getIindex(citem,item,cindex){
            return (citem.meta.titleList)?item.path+'/'+citem.path+'/'+citem.meta.titleList[0].path:item.path+'/'+citem.path;
        }
    },
    mounted(){
        // console.log(this.menuList)
    }
}
</script>

<style lang="less" scoped>
    .menu-container{
        height: calc(100vh - 60px);
    }
    // .el-submenu /deep/ .el-menu-item{
    //     padding: 0;
    //     padding-left: 60px !important;
    //     min-width: 179px;
    // }

</style>
