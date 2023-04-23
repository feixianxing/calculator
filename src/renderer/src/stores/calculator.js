import { defineStore } from 'pinia'

export const useCalculatorStore = defineStore('calculatorStore',{
    state: ()=>({
        // 表达式
        expression: "",
        // 数字栈
        numberStack: [],
        // 运算符栈
        operatorStack: [],
        // 运算结果
        result: 0,
        // 输入的类型(0: 空, 1: number, 2: operator)
        inputTypeList: []
    }),
    getters:{
        getLastInputType(){
            let length = this.inputTypeList.length;
            if(length===0){
                return 0
            }else{
                return this.inputTypeList[length-1]
            }
        }
    },
    actions: {
        clearAll(){
            this.expression = ""
            this.numberStack.length = 0
            this.operatorStack.length = 0
            this.result = 0
            this.inputTypeList.length = 0
        },
        input(inputType, content){
            if(inputType===1 || inputType===2){
                
            }
        }
    }
})