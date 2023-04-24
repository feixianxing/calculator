import { defineStore } from 'pinia'

import { calculateExpression } from '../utils/calculate'

export const useCalculatorStore = defineStore('calculatorStore',{
    state: ()=>({
        // 表达式
        expression: "",
        // 数字列表
        numberList: [],
        // 运算符栈
        operatorList: [],
        // 运算结果
        result: '',
        // 输入的类型(0: 空, 1: number, 2: operator)
        inputTypeList: []
    }),
    getters:{
        lastInputType(){
            let length = this.inputTypeList.length;
            if(length===0){
                return 0
            }else{
                return this.inputTypeList[length-1]
            }
        },
        calculable(){
            // return this.numberList.length>1 && this.operatorList.length>0
            return true
        }
    },
    actions: {
        clearAll(){
            this.expression = ""
            this.numberList.length = 0
            this.operatorList.length = 0
            this.result = 0
            this.inputTypeList.length = 0
        },
        input(inputType, content){
            switch (inputType) {
                case 1: // 输入数字
                    this.handleInputNumber(parseInt(content))
                    this.inputTypeList.push(inputType)
                    break
                case 2: // 输入运算符
                    this.handleInputOperator(content)
                    this.inputTypeList.push(inputType)
                    break
                case 3: // 点击清空: C
                    this.clearAll()
                    break
                case 4: // 点击后退一步: back
                    this.handleBack()
                    break
                case 5: // 点击运算: =
                    // 由于已经有了预先运算的机制，这里点击=按钮之后只是将运算结果上移
                    this.showResult()
                    // 为了避免下文中的calculate()重新计算结果，这里直接return，而不是break
                    return
                default:
                    break
            }
            this.calculate()
        },
        // 处理数字输入
        handleInputNumber(number){
            this.expression += number
            // 如果上一次输入是数字，则修改数位
            if(this.lastInputType===1){
                const lastInputNumber = this.numberList.pop()
                this.numberList.push(lastInputNumber*10 + number)
            }else{  // 如果上一次输入不是数字，则直接入栈
                this.numberList.push(number)
            }
        },
        // 处理运算符输入
        handleInputOperator(operator){
            if(this.lastInputType===2){
                this.handleBack()
            }
            this.expression += operator
            this.operatorList.push(operator)
        },
        // 处理删除back
        handleBack(){
            if(this.expression.length===0)return
            // 更新表达式
            this.expression = this.expression.slice(0, -1)
            if(this.lastInputType===1){ // 更新数字栈
                const lastNumber = this.numberList.pop()
                if(lastNumber>9){
                    this.numberList.push(Math.floor(lastNumber/10))
                }
                this.inputTypeList.pop()
            }else if(this.lastInputType===2){ // 更新运算符栈
                this.operatorList.pop()
                this.inputTypeList.pop()
            }
        },
        // 运算
        calculate(){
            if(this.calculable){
                const res = calculateExpression(this.expression)
                this.result = isNaN(res) ? "ERROR" : res
                console.log({
                    exp: this.expression,
                    res: this.result
                });
            }else{
                this.result = 0
            }
        },
        // 显示最终结果
        showResult(){
            this.expression = this.result
            this.result = ''
        }
    }
})