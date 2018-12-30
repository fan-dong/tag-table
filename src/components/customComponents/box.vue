<template>
    <transition name="fade-up">
        <div class="fd-box" v-show="visible" :style="boxStyel">
            <div class="fd-box-header">
                <div class="fd-box-title">
                    <i :class="iconName"></i>
                    <span>{{title}}</span>
                </div>
                <span class="close" @click="close" title="关闭弹窗">x</span>
            </div>

            <div class="fd-box-content" :style="bodyStyle">
                <slot name="content">
                    
                </slot>
            </div>
            <div class="fd-box-footer">
                <slot name="footer">

                </slot>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    props:{
        popName:{
            type:String
        },
        title:{
            type:String
        },
        width:{
            type:[String,Number],
            default:"800"
        },
        height:{
            type:[String,Number],
            default:"400"
        },
        minHeight:{
            type:[String,Number],
            default:"100"
        },
        maxHeight:{
            type:[String,Number],
            default:"500"
        },
        iconName: {
            type: String
        }
    },
    data(){
        return {
            isOpen:false
        }
    },
    computed:{
        visible(){
            return this.$store.state.popBoxShow[this.popName]
        },
        boxStyel(){
            let width = ""
            let a = Number(this.width)
            if(isNaN(a)){
                width = this.width
            }else{
                width = this.width + 'px'
            }
            return{
                width
            } 
        },
        bodyStyle(){
            let height = ""
            let b = Number(this.height)
            if(isNaN(b)){
                height = this.height + 'px'
            }else{
                height = this.height
            }
            return {
                height,
                minHeight:this.minHeight + 'px',
                maxHeight:this.maxHeight + 'px'
            }
        },
        
    },
    watch:{
        visible(val){
            if(val){
                this.isOpen = true;
                this.$emit("openBox")
            }
        }
    },
    methods:{
        close(){
            this.$emit('closeBox')
            this.$store.commit('togglePopBox',{
                name:this.popName,
                show:false,
            })
        }
    }
    
}
</script>
<style lang="stylus" scoped>
    .fd-box
        position fixed
        bottom 0
        left 50%
        transform translateX(-50%)
        margin 0 auto 
        z-index 9999
        border 1px solid #ccc
        border-radius:5px 5px 0 0
        background #fff
        .fd-box-header
            display flex
            justify-content space-between
            align-items center
            height 40px
            border-bottom 1px solid #ccc
            padding 0 10px 0 15px 
            font-size 16px
            letter-spacing 1px
            .fd-box-title
                color #666
                font-weight 700
            .close
                display inline-block
                color #666
                width 18px
                height 18px
                cursor pointer
        .fd-box-content
            overflow-y auto
            padding 10px 30px
        .fd-box-footer
            display flex
            justify-content flex-end
            align-items center
            height 80px
            padding 0px 20px 20px

.fade-up-enter-active 
.fade-up-leave-active 
    transition all 1s

.fade-up-enter 
.fade-up-leave-to 
    transform translate(-50%,100%)
    opacity 0

.fade-right-enter-active 
.fade-right-leave-active 
    transition all 1s

.fade-right-enter 
.fade-right-leave-to 
    transform translate(0,100%)
    opacity 0
</style>
