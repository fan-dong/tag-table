export default {
    /* 自定义盒子 隐藏与显示 */
    togglePopBox(state,obj){
        state.popBoxShow[obj.name] = obj.show
    },
    fdBoxFun(state,obj){
        state.fdBox = obj
    }
}