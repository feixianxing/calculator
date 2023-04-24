<template>
    <div class="inner-number-output">
        <p class="expression">{{ calculatorStore.expression }}</p>
        <p class="pre-result"
            v-show="calculatorStore.expression!==''"
        >
            {{ calculatorStore.result }}
        </p>
    </div>
</template>

<script setup>
import { useCalculatorStore } from '../stores/calculator'
const calculatorStore = useCalculatorStore()

</script>

<style lang="less" scoped>
.inner-number-output{
    flex-grow: 1;
    width: 100%;
    padding: 2em;
    .expression{
        width: 100%;
        text-align: right;
        font-size: 36px;
        font-weight: bold;
        color: var(--font-black);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }   
    .pre-result{
        margin-top: 0.6em;
        width: 100%;
        text-align: right;
        font-size: 24px;
        font-weight: bold;
        color: var(--font-gray);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
</style>