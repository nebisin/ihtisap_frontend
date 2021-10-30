<template>
  <div>
    <div
      class="
        fixed
        z-20
        w-full
        max-w-lg
        left-1/2
        top-1/2
        transform
        -translate-x-1/2 -translate-y-1/2
        bg-gray-100
        shadow-lg
      "
    >
      <div class="max-h-screen min-h-full overflow-y-auto relative">
        <div
          class="
            bg-white
            py-2
            px-3
            border-b
            sticky
            top-0
            flex
            justify-between
            items-center
          "
        >
          <h3 class="text-lg text-gray-500">
            <slot name="header">Custom Header</slot>
          </h3>
          <button @click="$emit('close')" class="text-gray-500 p-1">
            <AppCloseIcon />
          </button>
        </div>
        <div class="py-2 px-3">
          <slot name="body"
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
            accusamus, tempore nesciunt quae enim dolorem? Molestias illum,
            incidunt doloremque, sint amet voluptatum repellendus perspiciatis,
            ducimus porro vel numquam? Aspernatur, voluptate?</slot
          >
        </div>
        <div class="py-2 px-3 flex gap-3">
          <div class="flex-1">
            <slot name="secondary-button">
              <button @click.prevent="$emit('close')" class="w-full">
                <AppButtonSecondary>Close</AppButtonSecondary>
              </button>
            </slot>
          </div>
          <div class="flex-1">
            <slot name="primary-button">
              <button @click.prevent="$emit('submit')" class="w-full">
                <AppButtonPrimary>Submit</AppButtonPrimary>
              </button>
            </slot>
          </div>
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
import AppCloseIcon from "./AppCloseIcon.vue";

export default {
  components: {
    AppButtonSecondary,
    AppButtonPrimary,
    AppCloseIcon,
  },
};
</script>