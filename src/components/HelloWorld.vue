<template>
    <div class="hello">
        <div class="top">
            <div class="tagBox">
                <el-tag :key="tag" v-for="tag in tagList" style="margin:10px;" closable @close="handleClose(tag)">
                    {{tag}}
                </el-tag>
            </div>
        </div>
    
        <el-button type="primary" style="margin:50px 0 10px" size="mini" @click="done()">确定</el-button>
        <el-table border :data="tableList" ref="multipleTable" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="title" label="字段"></el-table-column>
            <el-table-column prop="id" label="ID"></el-table-column>
        </el-table>
    
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableList: [{
                        title: '哈哈',
                        id: 'hahha'
                    },
                    {
                        title: '呵呵',
                        id: 'hehe'
                    },
                    {
                        title: '娃娃',
                        id: 'wawa'
                    },
                    {
                        title: '嘻嘻',
                        id: 'xixi'
                    },
                ],
                tagList: [],
                multipleSelection: [],
                indexTag:''
            }
        },
        methods: {
            //删除tag
            handleClose(tag) {
                this.indexTag = tag

                this.tagList.splice(this.tagList.indexOf(tag), 1);
                this.multipleSelection = []


                this.tableList.forEach((el,i)=>{
                    if(el.title == this.indexTag){
                        this.$refs.multipleTable.toggleRowSelection(this.tableList[i]);
                    }
                })
            },
            //确认添加
            done() {
                this.tagList = []
                this.multipleSelection.forEach(item => {
                    this.tagList.push(item.title)
                })
            },
            //表格选中事件
            handleSelectionChange(selection) {
                this.multipleSelection = selection;
            }
        },
    }
</script>

<style lang="stylus" scoped>
.hello
    width 500px
    margin 50px auto
    .top
        height 100px;
        overflow hidden
        .tagBox
            width 100%
            height 100px
            border 1px solid #ddd
            float left
    
</style>

