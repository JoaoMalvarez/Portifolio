<template>
  <RouterView v-slot="{ Component }">
    <Transition name="luz" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>

<style>
body { margin: 0; }

.luz-enter-active,
.luz-leave-active {
  transition: opacity 0.6s ease, filter 0.6s ease;
}
.luz-enter-from,
.luz-leave-to {
  opacity: 0;
  filter: brightness(2.5);
}
</style>