<template>
  <div class="flex flex-col text-normalGray pb-5">
    <div class="pb-2">
      <label :for="id" class="text-sm">{{ label }}</label>
      <p v-if="error" class="text-red-700 text-xs font-light">{{ error }}</p>
    </div>

    <input
      :type="type"
      :name="id"
      :id="id"
      :placeholder="placeholder"
      class="
        px-3
        py-1
        rounded-lg
        focus:shadow-lg
        hover:shadow
        shadow-sm
        outline-none
        transition-shadow
      "
      @change="$emit('update:value', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    error: String,
  },
};
</script>
