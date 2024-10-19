<template>
    <button :type="type" :disabled="disabled">
        <slot />
    </button>
</template>

<script setup >
const props = defineProps(
    {
        type: {
            default: 'button',
        },
        disabled : {
            default : false
        }
    }
)
</script>