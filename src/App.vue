<script setup lang="ts">
import { RouterView } from "vue-router";
import {
  menuBackgroundColor
} from "@/config/settings";
</script>

<template>
  <div class="app" :style="{
    backgroundColor: menuBackgroundColor
  }">
    <RouterView />
  </div>
</template>

<style>
</style>