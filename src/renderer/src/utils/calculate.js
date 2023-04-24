const numberStack = []
const operatorStack = []

// 为Array添加方法top，模拟获取栈顶元素
Array.prototype.top = function(){
    return this[this.length - 1]
}

export const calculateExpression = (exp)=>{
    if(exp==='')return 0

    // 初始化
    init()

    // 对起始字符进行判断与预处理
    switch(exp[0]){
        case '+':
        case '-':
        case '.':
            exp = '0' + exp
            break
        case '×':
        case '÷':
            return NaN
        default:
            break
    }
    exp += "#" // 终止标识符

    console.log({
        numberStack, operatorStack
    });

    for(let i=0; i<exp.length; i++){
        if(exp[i]>='0' && exp[i]<='9'){ // 读取到的是数字
            let number = parseInt(exp[i])
            // 检查读取到的是否是多位数字
            while(exp[i+1]>='0'&&exp[i+1]<='9'){
                number = number*10 + parseInt(exp[i+1])
                i++
            }
            // 数字入栈
            numberStack.push(number)
        }else if(exp[i]==='.'){
            let nextNumber = 0
            // 读取后续数字
            let j = 1
            while(exp[i+1]>='0'&&exp[i+1]<='9'){
                nextNumber = nextNumber + parseInt(exp[i+1])/Math.pow(10,j++)
                i++
            }
            // 如果小数点后续有数字，则更新数字栈
            if(nextNumber!==0){
                let lastNumber = numberStack.pop()
                numberStack.push(lastNumber + nextNumber)
            }
        }else if(exp[i]==='%'){
            let lastNumber = numberStack.pop()
            numberStack.push(lastNumber/100)
        }else{  // 读取到的是运算符(运算符包括：四则运算符+边界标识符'#')
            // 读取到四则运算符
            if(exp[i]!=='#'&&!isNumber(exp[i+1])){    // 如果后续没有数字，则报错
                return NaN
            }else{  // 后续有数字，则进行运算
                const level =  levelMap[operatorStack.top()][exp[i]]
                console.log(operatorStack.top(), exp[i], level);
                switch(level){
                    case -1:
                        operatorStack.push(exp[i])
                        break
                    case 1:
                        let a = numberStack.pop()
                        let b = numberStack.pop()
                        let operator = operatorStack.pop()
                        numberStack.push(compute(b, operator, a))
                        i--
                        break
                    case 0:
                        operatorStack.pop()
                        break
                    default:
                        break
                }
            }
        }
    }
    return numberStack.top()
}

const levelMap = {
    "+":{
        "+": 1,
        "-": 1,
        "×": -1,
        "÷": -1,
        "#": 1
    },
    "-":{
        "+": 1,
        "-": 1,
        "×": -1,
        "÷": -1,
        "#": 1
    },
    "×":{
        "+": 1,
        "-": 1,
        "×": 1,
        "÷": 1,
        "#": 1
    },
    "÷":{
        "+": 1,
        "-": 1,
        "×": 1,
        "÷": 1,
        "#": 1
    },
    "#": {
        "+": -1,
        "-": -1,
        "×": -1,
        "÷": -1,
        "#": 0  // 设置为0，用于判断运算是否结束
    }
}

function init(){    // 初始化
    numberStack.length = 0
    operatorStack.length = 0
    operatorStack.push("#") // 起始符标志
}

function compute(num1, operator, num2){
    let answer = 1
    switch (operator){
        case "+":
            answer = num1 + num2
            break
        case "-":
            answer = num1 - num2
            break
        case "×":
            answer = num1 * num2
            break
        case "÷":
            answer = num1 / num2
            break
        default:
            break
    }
    return answer
}

function isOperator(c){
    return c==='+'||c==='-'||c==='×'||c==='÷'
}

function isNumber(c){
    return c>='0' && c<='9'
}
