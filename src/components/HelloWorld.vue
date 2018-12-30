<template>
    <div class="hello">
        <h1 style="text-align: center;">vue+vuex自定义弹窗</h1>
        <div class="box">
            <div>字段名：</div>
            <div class="tagBox">
                <el-tag :key="tag" v-for="tag in tagList" style="margin:10px;" closable @close="handleClose(tag)">{{tag}}</el-tag>
            </div>
            <div class="add" @click="addFun" title="添加字段"><i class="el-icon-plus"></i></div>
        </div>
    
        <fd-box popName="box1" title="字段明细" width="100%" iconName="el-icon-bell" @openBox="openBox" @closeBox="closeBox">
            <div slot="content">
                <div>
                    <el-button type="primary" style="margin:0px 0 10px" size="mini" @click="done()">确定</el-button>
                    <el-table border :data="tableList" ref="multipleTable" style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="title" label="字段"></el-table-column>
                        <el-table-column prop="id" label="ID"></el-table-column>
                    </el-table>
                </div>
            </div>
            <div slot="footer">
                <el-button type="primary" size="small" class="footer-button">确 定</el-button>
                <el-button size="small" class="footer-button" @click="close">取 消</el-button>
            </div>
        </fd-box>
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
                indexTag: ''
            }
        },
        mounted() {
    
        },
        methods: {
            //删除tag
            handleClose(tag) {
                this.indexTag = tag
                this.tagList.splice(this.tagList.indexOf(tag), 1);
                this.tableList.forEach((el, i) => {
                    if (el.title == this.indexTag) {
                        this.$refs.multipleTable.toggleRowSelection(this.tableList[i]);
                    }
                })
            },
            //确认添加
            done() {
                if (this.multipleSelection != "") {
                    this.tagList = []
                    this.multipleSelection.forEach(item => {
                        this.tagList.push(item.title)
                    })
                    this.closeBox()
                } else {
                    this.$message({
                        message: '请至少选择一条数据',
                        type: 'warning'
                    })
                    return false
                }
    
            },
            //表格选中事件
            handleSelectionChange(selection) {
                this.multipleSelection = selection;
            },
            //添加
            addFun() {
                this.$store.commit('togglePopBox', {
                    name: "box1",
                    show: true
                })
            },
            //关闭
            closeBox() {
                this.$store.commit('togglePopBox', {
                    name: "box1",
                    show: false
                })
            },
            openBox() {
                this.$store.commit('togglePopBox', {
                    name: "box1",
                    show: true
                })
            }
        },
    }
</script>

<style lang="stylus" scoped>
.hello
    width 100%
    height 100%
    padding 5%
    .box
        display flex
        height 100px
        justify-content flex-start
        align-items center
        margin 20px auto 
        .tagBox
            width 80%
            height 98px
            border 1px solid #ddd
        .add
            width 30px
            height @width
            background #409EFF
            color #fff
            border-radius:50%
            margin-left 5%
            font-size 16px
            text-align center
            line-height 30px
            cursor pointer
    
</style>

