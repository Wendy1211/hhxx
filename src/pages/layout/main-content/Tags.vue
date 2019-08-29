<template>
    
    <div class="tags" v-if="showTags" ref="tags">
        <div class="tags-close-box1">
            <el-button size="mini" @click="listright"><i class="el-icon-caret-left"></i></el-button>
        </div>
        <ul class="content">
            <li class="tags-li" v-for="(item,index) in tagsList" :class="{'active': isActive(item.path)}" :key="index" ref="wrapper">
                <router-link :to="item.path" class="tags-li-title">
                    {{item.title}}
                </router-link>
                <span class="tags-li-icon" @click="closeTags(index)" v-if="item.name!='home'"><i class="el-icon-close"></i></span>
            </li>
        </ul>
        <!-- <div class="tags-close-box">
            <el-dropdown @command="handleTags">
                <el-button size="mini" type="primary">
                    标签选项<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu size="small" slot="dropdown">
                    <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                    <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div> -->
        <div class="tags-close-box" >
            <el-button size="mini" @click="listLeft"><i class="el-icon-caret-right"></i></el-button>
        </div>
        <!-- listLeft -->
        <!-- listright -->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tagsList: [
                    {
                    name:'home',
                    path:"/home",
                    title:'首页'
                    }
                ],
                liWidth:[],
                len:'',
                zyd:0,
                initYd:"",
                num:0,
            }
        },
        methods: {
            isActive(path) {
                return path === this.$route.fullPath;
            },
            // 关闭单个标签
            closeTags(index) {
                const delItem = this.tagsList.splice(index, 1)[0];
                const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];
                if (item) {
                    delItem.path === this.$route.fullPath && this.$router.push(item.path);
                }else{
                    this.$router.push('/');
                }
                let tagsW = this.$refs.tags.clientWidth;
                let liW = this.sum(this.liWidth);
                if( liW > tagsW && this.zyd != 0){
                    let num = this.liWidth.length - this.len + 1;
                    this.zyd += this.liWidth[num];
                    this.initYd = this.zyd;
                    this.$refs.wrapper[1].style.marginLeft = this.zyd+"px";
                }
            },
            // 关闭全部标签
            closeAll(){
                this.tagsList = [{name:'home',path:"/home",title:'首页'}];
                this.$router.push('/').catch((err)=>{});
            },
            // 关闭其他标签
            closeOther(){
                const curItem = this.tagsList.filter(item => {
                    // 过滤当前选中路由和首页路由
                    if(item.path === this.$route.fullPath || item.name === 'home'){
                        return item;
                    }
                    // return item.path === this.$route.fullPath;
                })
               
                this.tagsList = curItem;
            },
            // 设置标签
            async setTags(route){
                const isExist = this.tagsList.some(item => {
                    return item.path === route.fullPath;
                })
                if(!isExist){
                    this.tagsList.push({
                        title: route.meta.name,
                        path: route.fullPath,
                        name: route.matched[1].name
                    })
                    await this.setWidth();
                    let tagsW = this.$refs.tags.clientWidth;
                    let liW = this.sum(this.liWidth);
                    if(liW > tagsW){
                        this.zyd -= this.liWidth[this.num];
                        this.$refs.wrapper[0].style.marginLeft = this.zyd+"px";
                        this.num++;
                    }
                }
                this.$bus.$emit('tags', this.tagsList);
            },
            handleTags(command){
                command === 'other' ? this.closeOther() : this.closeAll();
            },
            setWidth(){
                this.$nextTick(() => {
                    var li = this.$refs.wrapper;
                    var width = [];
                    for( let i=0;i<li.length;i++)
                    {   
                        
                        width.push(li[i].clientWidth)
                    }
                    this.liWidth = width;
                });
            },
            sum(arr) {
                var s = 0;
                arr.forEach(function(val, idx, arr) {
                    s += val;
                }, 0);
                return s;
            },
            listLeft(){
                let tagsW = this.$refs.tags.clientWidth;
                let liW = this.sum(this.liWidth);
                if( liW > tagsW && this.zyd > this.initYd){
                    console.log(this.num)
                    this.zyd -= this.liWidth[this.num];
                    this.$refs.wrapper[0].style.marginLeft = this.zyd+"px";
                    this.num++
                }
            },
            listright(){
                let tagsW = this.$refs.tags.clientWidth;
                let liW = this.sum(this.liWidth);
                if(!this.initYd){
                    this.initYd = this.zyd;
                }
                console.log(this.zyd)
                if( liW > tagsW && this.zyd != 0){
                    this.num--;
                    this.zyd += this.liWidth[this.num];
                    this.$refs.wrapper[0].style.marginLeft = this.zyd+"px";
                   
                }
            }
        },
        computed: {
            showTags() {
                return this.tagsList.length > 0;
            }
        },
        watch:{
            $route(newValue, oldValue){
                this.setTags(newValue);
            },
            
        },
        mounted() {
            this.setTags(this.$route);
            // 监听关闭当前页面的标签页
            // this.$bus.$on('close_current_tags', () => {
            //     for (let i = 0, len = this.tagsList.length; i < len; i++) {
            //         const item = this.tagsList[i];
            //         console.log(item);
            //         if(item.path === this.$route.fullPath){
            //             if(i < len - 1){
            //                 this.$router.push(this.tagsList[i+1].path);
            //             }else if(i > 0){
            //                 this.$router.push(this.tagsList[i-1].path);
            //             }else{
            //                 this.$router.push('/');
            //             }
            //             this.tagsList.splice(i, 1);
            //             break;
            //         }
            //     }
            // })
        }
    }

</script>


<style lang="less" scoped>
    .tags {
        position: fixed;
        top: 72px;
        z-index: 2;
        width: calc(100% - 275px);
        height: 37px;
    }

    .tags ul {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        white-space: nowrap;
        // overflow-y: scroll;
        overflow: hidden;
        margin-left: 27px;
    }

    .tags-li {
        // float: left;
        // margin: 3px 5px 2px 3px;
        display: inline-block;
        margin: 3px 0px 2px 0px;
        // border-radius: 3px;
        font-size: 12px;
        overflow: hidden;
        cursor: pointer;
        height: 32px;
        line-height: 32px;
        border: 1px solid #e9eaec;
        background: #fff;
        padding: 0 8px 0 16px;
        vertical-align: middle;
        color: #666;
        -webkit-transition: all .3s ease-in;
        -moz-transition: all .3s ease-in;
        transition: all .3s ease-in;
    }

    .tags-li:not(.active):hover {
        background: #f8f8f8;
    }

    .tags-li.active {
        color: #fff;
    }

    .tags-li-title {
        float: left;
        max-width: 80px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 8px;
        color: #666;
    }

    .tags-li.active .tags-li-title {
        color: #fff;
    }

    .tags-li.active {
        border: 1px solid @btnColor;
        background-color: @btnColor;
    }
    .tags-close-box {
        position: absolute;
        right: -70px;
        top: 5px;
        box-sizing: border-box;
        padding-top: 1px;
        text-align: center;
        width: 55px;
        height: 30px;
        // background: #fff;
        // box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1);
        z-index: 10;
    }
    .tags-close-box1{
        position: absolute;
        // right: -61px;
        left: -15px;
        top: 5px;
        box-sizing: border-box;
        padding-top: 1px;
        text-align: center;
        width: 55px;
        height: 30px;
        // background: #fff;
        // box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1);
        z-index: 10;
        // visibility: hidden;
        // display:none;

    }
    .el-button+.el-button{
        margin: 0;
    }
    .el-button--mini{
        padding: 7px 5px;
    }
</style>
