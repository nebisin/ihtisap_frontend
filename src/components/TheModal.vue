<template>
  <div>
    <div class="bg-white fixed top-14 z-20 m-4 rounded">
      <div class="bg-gray-100 py-2 px-3 rounded-t border-b">
        <h3 class="text-lg">
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
      class="fixed bg-black top-0 right-0 left-0 bottom-0 opacity-70 z-10"
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