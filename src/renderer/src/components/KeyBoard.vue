<template>
    <div class="inner-key-board">
        <div class="row" v-for="keyRow in keyMap">
            <div class="key-container" v-for="key in keyRow">
                <key-button 
                    class="key" 
                    :height="key.content==='='?2:1"
                    :content="key.content" 
                    :type="key.type">
                    <img v-if="key.content===''" class="icon" :src="key.icon">
                </key-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import KeyButton from './KeyButton.vue'
import deleteIcon from '@renderer/assets/icon/delete.svg'
const keyMap = [
    [
        {
            content: "C",
            icon: "",
            type: "blue",
            inputType: 0
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
            inputType: 0
        }
    ],
    [
        {
            content: "7",
            icon: "",
            type: "black"
        },
        {
            content: "8",
            icon: "",
            type: "black"
        },
        {
            content: "9",
            icon: "",
            type: "black"
        },
        {
            content: "−",
            icon: "",
            type: "blue"
        }
    ],
    [
        {
            content: "4",
            icon: "",
            type: "black"
        },
        {
            content: "5",
            icon: "",
            type: "black"
        },
        {
            content: "6",
            icon: "",
            type: "black"
        },
        {
            content: "+",
            icon: "",
            type: "blue"
        }
    ],
    [
        {
            content: "1",
            icon: "",
            type: "black"
        },
        {
            content: "2",
            icon: "",
            type: "black"
        },
        {
            content: "3",
            icon: "",
            type: "black"
        },
        {
            content: "=",
            icon: "",
            type: "white"
        }
    ],
    [
        {
            content: "%",
            icon: "",
            type: "black"
        },
        {
            content: "0",
            icon: "",
            type: "black"
        },
        {
            content: ".",
            icon: "",
            type: "black"
        },
        {
            content: "",
            icon: "",
            type: "empty"
        }
    ]
]
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