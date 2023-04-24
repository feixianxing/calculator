<template>
    <div class="inner-key-board">
        <div class="row" v-for="keyRow in keyMap">
            <div class="key-container" v-for="key in keyRow">
                <key-button 
                    class="key" 
                    :height="key.content==='='?2:1"
                    :content="key.content" 
                    :type="key.type"
                    @click="handleButtonClick(key.inputType, key.content)">
                    <img v-if="key.content===''" class="icon" :src="key.icon">
                </key-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import KeyButton from './KeyButton.vue'
import { useCalculatorStore } from '../stores/calculator'
import deleteIcon from '@renderer/assets/icon/delete.svg'

const calculatorStore = useCalculatorStore()

const keyMap = [
    [
        {
            content: "C",
            icon: "",
            type: "blue",
            inputType: 3
        },
        {
            content: "÷",
            icon: "",
            type: "blue",
            inputType: 2
        },
        {
            content: "×",
            icon: "",
            type: "blue",
            inputType: 2
        },
        {
            content: "",
            icon: deleteIcon,
            type: "blue",
            inputType: 4
        }
    ],
    [
        {
            content: "7",
            icon: "",
            type: "black",
            inputType: 1
        },
        {
            content: "8",
            icon: "",
            type: "black",
            inputType: 1
        },
        {
            content: "9",
            icon: "",
            type: "black",
            inputType: 1
        },
        {
            content: "-",
            icon: "",
            type: "blue",
            inputType: 2
        }
    ],
    [
        {
            content: "4",
            icon: "",
            type: "black",
            inputType: 1
        },
        {
            content: "5",
            icon: "",
            type: "black",
            inputType: 1
        },
        {
            content: "6",
            icon: "",
            type: "black",
            inputType: 1
        },
        {
            content: "+",
            icon: "",
            type: "blue",
            inputType: 2
        }
    ],
    [
        {
            content: "1",
            icon: "",
            type: "black",
            inputType: 1
        },
        {
            content: "2",
            icon: "",
            type: "black",
            inputType: 1
        },
        {
            content: "3",
            icon: "",
            type: "black",
            inputType: 1
        },
        {
            content: "=",
            icon: "",
            type: "white",
            inputType: 5
        }
    ],
    [
        {
            content: "%",
            icon: "",
            type: "black",
            inputType: 2
        },
        {
            content: "0",
            icon: "",
            type: "black",
            inputType: 1
        },
        {
            content: ".",
            icon: "",
            type: "black",
            inputType: 2
        },
        {
            content: "",
            icon: "",
            type: "empty",
            inputType: 0
        }
    ]
]

const handleButtonClick = (inputType, content)=>{
    calculatorStore.input(inputType, content)
}

onMounted(()=>{
    window.addEventListener('keyup', (e)=>{
        console.log(e);
        if(e.key==="c"&&e.ctrlKey){
            calculatorStore.input(3, "C")
        }else if(e.key==="+"||e.key==='-'||e.key==='.'||e.key==='%'){
            calculatorStore.input(2, e.key)
        }else if(e.key==='*'){
            calculatorStore.input(2, '×')
        }else if(e.key==='/'){
            calculatorStore.input(2, '÷')
        }else if(e.key==="=" || e.key==='Enter'){
            calculatorStore.input(5, e.key)
        }else if(e.key==="Backspace"){
            calculatorStore.input(4, "")
        }else if(e.key>='0'&&e.key<=9){
            calculatorStore.input(1, e.key)
        }
    })
})
</script>

<style lang="less" scoped>
.inner-key-board{
    width: 100%;
    background-color: var(--key-board-background);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px;
    .row{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin-bottom: 16px;
        .key-container{
            position: relative;
            width: var(--button-width);
            height: var(--button-height);
            .key{
                position: absolute;
                top: 0;
                left: 0;
            }
        }
    }
}
</style>