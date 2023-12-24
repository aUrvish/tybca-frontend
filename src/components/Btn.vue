<template>
    <button :type="type">
        <slot />
    </button>
</template>

<script setup >
const props = defineProps(
    {
        type: {
            default: 'button',
        },
    }
)
</script>