<template>
    <transition :name="transitionName">
    
        <div class="pop-box" v-if="visible" :class="[{bottom:bottomSet,left:leftSet}]" :style="boxStyle">
    
    
    
            <div class="pop-header">
                <div class="popBox-title">{{title}}</div>
                <div class="closeIcon">
                    <span class="closeSpan" @click="close">
                        <i class="el-icon-close"></i>
                    </span>
                    <span class="smallSpan"> </span>

                   
                </div>
    
            </div>
    
    
    
            <div class="pop-body" :style="bodyStyle">
    
                <slot></slot>
    
            </div>
    
    
    
            <div class="pop-footer">
    
                <slot name="footer"></slot>
    
            </div>
    
    
    
        </div>
    
    
    
    </transition>
</template>
<script>
export default {
    props:{
        popName:{
            type:String,
            default:''
        },
        title:{
            type:String,
            default:''
        },
        width:{
            type:[String,Number],
            default:"800"
        },
        height:{
            type:[String,Number],
            default:"300"
        },
        minHeight:{
            type:[String,Number],
            default:"180"
        },
        maxHeight:{
            type:[String,Number],
            default:"400"
        },
        bottom:{
            type:Boolean,
            default:true
        },
        left:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return {
            isOpen:false
        }
    },
    computed:{
        visible(){
            return this.$store.state[this.popName]
        },
        bottomSet(){
            return  this.left?fasle:true
        },
        bodyStyle(){
            if(this.bottomSet){
                let height = ""
                if(Number(this.height) !== NaN){
                    height = this.height + "px"
                }else{
                    height = this.height
                }
                return {
                    height: height,
                    minHeight:this.minHeight + 'px',
                    maxHeight:this.maxHeight + 'px'
                }
            }
        },
        boxStyel(){
            if(this.left){
                return {
                    width:this.width + 'px'
                }
            }else{
                return {

                }
            }
        },
        transitionName(){
            if(this.left){
                return "fade-right"
            }else{
                return "fade-up"
            }
        }
    },
    watch:{
        visible(val){
            if(val){
                this.isOpen = true;
                this.$emit("open")
            }
        }
    },
    methods:{
        close(){
            this.$emit('close')
            this.$store.commit('togglePopBox',{
                name:this.popName,
                show:false
            })
        }
    }
}
</script>
<style lang="stylus" scoped>
    .pop-box
        position fixed
        margin 0
        z-index 9999
        border 1px solid #ddd
        background #fff
        .pop-header
            height 40px
            display flex
            justify-content space-between
            align-items center
            padding 0 5px 0 15px
            border 1px solid #ddd
            font-size 14px
            letter-spacing 1px
            > div
                height 100%
                display flex
                align-items center
            .closeIcon
                padding 0 10px
                cursor pointer
                > span
                    display flex
                    display inline-block
                    padding 2px 
                    border-radius 2px
        .bottom
            bottom 0
            left 250px
            width calc(100%-250px)
            border-bottom none
            border-radius 5px 5px 0 0
        .left
            top 70px
            left 250px
            height calc(100%-70px)
            border-left none
            border-radius 0 5px 5px 0
</style>
