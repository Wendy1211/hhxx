<template>
    <div class="addsub">
        <el-dialog title="新增科目" :visible.sync="dialogFormVisible" :close-on-click-modal='false' width="25%">
            <el-form :model="form">
                <el-form-item label="上级科目" :label-width="formLabelWidth"> 
                    <SelectTree
                        :props="props"
                        :options="optionData"
                        :value="valueId"
                        :clearable="isClearable"
                        :accordion="isAccordion"
                        @getValue="getValue($event)"
                        :disabled="disabled"
                    />
                </el-form-item>
                <el-form-item label="科目编码" :label-width="formLabelWidth">
                    <el-input v-model="form.desc" autocomplete="off" :disabled="bmabled"></el-input>
                </el-form-item>
                <el-form-item label="科目名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                 <el-form-item label="科目状态" :label-width="formLabelWidth">
                    <el-radio-group v-model="form.resource">
                    <el-radio label="启用"></el-radio>
                    <el-radio label="停用"></el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button class="smallBtn" @click="dialogFormVisible = false">取 消</el-button>
                <el-button class="smallBtn" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name:'addSub',
    data() {
      return {
        dialogFormVisible:false,
        form: {
            name: '',
            region: '',
            desc: '',
            resource:'启用',
        },
        formLabelWidth: '80px',
        isClearable: true, // 可清空（可选）
        isAccordion: true, // 可收起（可选）
        valueId: 0, // 初始ID（可选）
        disabled:false, 
        bmabled:false,
        props: {
            // 配置项（必选）
            value: "id",
            label: "name",
            children: "children",
        },
        // 选项列表（必选）
        list: [
            { id: 1, parentId: 0, name: "一级菜单A", rank: 1 },
            { id: 2, parentId: 0, name: "一级菜单B", rank: 1 },
            { id: 3, parentId: 0, name: "一级菜单C", rank: 1 },
            { id: 4, parentId: 1, name: "二级菜单A-A", rank: 2 },
            { id: 5, parentId: 1, name: "二级菜单A-B", rank: 2 },
            { id: 6, parentId: 2, name: "二级菜单B-A", rank: 2 },
            { id: 7, parentId: 4, name: "三级菜单A-A-A", rank: 3 },
            { id: 8, parentId: 7, name: "四级菜单A-A-A-A", rank: 4 },
            { id: 9, parentId: 0, name: "一级菜单C", rank: 1 },
            { id: 10, parentId: 0, name: "一级菜单end", rank: 1 }
        ]
    }
   },
   mounted(){
        this.$bus.$on('subBool',(res)=>{
            this.dialogFormVisible = true;
            this.disabled = false;
            this.bmabled = false;
            if(res.bool == 1){
                this.disabled = true;
                this.valueId = 5
            }
            if(res.bool == 2){
                this.disabled = true;
                this.bmabled = true;
                this.valueId = 7
            }
        })
   },
    computed: {
    /* 转树形数据 */
    optionData() {
        let cloneData = JSON.parse(JSON.stringify(this.list)); // 对源数据深度克隆
        return cloneData.filter(father => {
            // 循环所有项，并添加children属性
            let branchArr = cloneData.filter(child => father.id == child.parentId); // 返回每一项的子级数组
            branchArr.length > 0 ? (father.children = branchArr) : ""; //给父级添加一个children属性，并赋值
            return father.parentId == 0; //返回第一层
        });
    }
    },
    methods: {
        // 取值
        getValue(value) {
            this.valueId = value;
            console.log(this.valueId);
        }
    }
}
</script>
<style lang="less" scoped>
    .el-select{
        width: 100%;
    }
</style>
