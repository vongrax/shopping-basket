<template>
  <a-layout class="layout">
    <a-layout-header>
      <div>
        <h1 class="logo">Logo</h1>
      </div>
    </a-layout-header>
    <a-layout-content :style="{ padding: '0 50px', minHeight: '100vh' }">
      <slot />
    </a-layout-content>
  </a-layout>
</template>
<script setup lang="ts"></script>
<style scoped>
.logo {
  color: white;
}
</style>
