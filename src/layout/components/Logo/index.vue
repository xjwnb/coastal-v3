<script setup lang="ts">
import { title, logoUrl } from "@/config/settings";
</script>


<template>
  <div class="logo-container">
    <div class="logo-img">
      <el-image :src="logoUrl" :title="title" :alt="title" />
    </div>
    <div class="logo-name">{{ title }}</div>
  </div>
</template>

<style lang="scss" scoped>
.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;

  .logo-img {
    width: 70px;
    height: 70px;
    margin-top: 8px;
    border-radius: 10%;
    overflow: hidden;
    background-color: #fff;
    padding: 5px;
    box-sizing: border-box;
  }

  .logo-name {
    margin: 8px;
    font-size: 1.3rem;
    color: #fff;
  }
}
</style>