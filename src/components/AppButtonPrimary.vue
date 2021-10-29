<template>
  <div
    class="
      px-3
      py-2
      bg-brandPrimary
      rounded-lg
      hover:bg-brandSecondary
      transition-colors
      cursor-pointer
      flex
      items-center
      justify-center
    "
  >
    <p class="text-white text-center"><slot></slot></p>
  </div>
</template>
