<template>
    <div class="relative" >
        <label :for="id" class="block mb-2 text-sm font-medium text-gray-900">{{ label }}</label>
        <input :type="type" :name="name" :id="id"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md block w-full p-2.5 outline-none"
            :placeholder="placeholder" @input="$emit('update:modelValue', $event.target.value)" :value="props.modelValue">
    </div>
</template>

<script setup >
const props = defineProps(
    {
        id: {
            required: true,
        },
        label: {
            required: true,
        },
        name: {
            required: true,
        },
        placeholder: {
            default: 'Enter',
        },
        type: {
            default: 'text',
        },
        modelValue : {
            default : "",
        }
    }
)
</script>