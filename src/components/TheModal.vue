<template>
  <div>
    <div
      class="
        fixed
        top-14
        z-20
        w-full
        max-w-lg
        left-1/2
        transform
        -translate-x-1/2
        bg-gray-100
        shadow-lg
      "
    >
      <div class="bg-white py-2 px-3 border-b">
        <h3 class="text-lg text-gray-500">
          <slot name="header">Custom Header</slot>
        </h3>
      </div>
      <div class="py-2 px-3">
        <slot name="body"
          >Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
          accusamus, tempore nesciunt quae enim dolorem? Molestias illum,
          incidunt doloremque, sint amet voluptatum repellendus perspiciatis,
          ducimus porro vel numquam? Aspernatur, voluptate?</slot
        >
      </div>
      <div class="py-2 px-3 flex justify-end gap-3">
        <div>
          <slot name="secondary-button">
            <button @click.prevent="$emit('close')">
              <AppButtonSecondary>Close</AppButtonSecondary>
            </button>
          </slot>
        </div>
        <div>
          <slot name="primary-button">
            <button @click.prevent="$emit('submit')">
              <AppButtonPrimary>Submit</AppButtonPrimary>
            </button>
          </slot>
        </div>
      </div>
    </div>
    <div
      class="fixed top-0 right-0 left-0 bottom-0 opacity-90 z-10 bg-gray-300"
      @click="$emit('close')"
    ></div>
  </div>
</template>

<script>
import AppButtonSecondary from "@/components/AppButtonSecondary.vue";
import AppButtonPrimary from "./AppButtonPrimary.vue";

export default {
  components: {
    AppButtonSecondary,
    AppButtonPrimary,
  },
};
</script>