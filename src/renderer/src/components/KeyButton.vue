<template>
    <div class="inner-key-button"
    :class="{
        black: type==='black',
        gray: type ==='gray',
        blue: type==='blue',
        white: type==='white',
        empty: type==='empty',
        'double-height': height===2
    }">
        <p v-if="content!==''" class="content">{{ content }}</p>
        <slot v-if="type!=='empty'" class="icon"></slot>
    </div>
</template>

<script setup>
const props = defineProps({
    content: {
        type: String,
        default: ""
    },
    type: {
        type: String,
        default: "black"
    },
    height: {
        type: Number,
        default: 1
    }
})
</script>

<style lang="less" scoped>
.inner-key-button{
    width: var(--button-width);
    height: var(--button-height);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: calc(var(--button-width) / 2);
    box-shadow: 0px 0px 12px var(--button-shadow);
    cursor: pointer;
    user-select: none;
    transition: box-shadow ease 0.3s;
    &:hover{
        box-shadow: 0px 0px 16px var(--button-shadow-darker);
    }
    .content{
        font-size: 28px;
        font-weight: 500;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
}
.black{
    background-color: var(--key-background);
    .content{
        color: var(--font-black);
    }
}
.gray{
    background-color: var(--key-background);
    .content{
        color: var(--font-gray);
    }
}
.blue{
    background-color: var(--key-background);
    .content{
        color: var(--font-blue);
    }
}
.white{
    background-color: var(--font-blue);
    &:hover{
        box-shadow: 0px 0px 16px var(--font-blue);
    }
    .content{
        color: var(--font-white);
    }
}
.empty{
    background-color: transparent;
    box-shadow: none;
    &:hover{
        box-shadow: none;
    }
    .content{
        color: transparent;
    }
}

.double-height{
    height: calc(var(--button-height) * 2 + var(--key-row-gap));
}
</style>