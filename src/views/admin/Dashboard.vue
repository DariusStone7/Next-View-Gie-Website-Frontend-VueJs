<script setup>
import {getPath} from '../../utils/index.js'
</script>

<template>
  <span>{{getPath()}}</span>
    <div class="dashboard">
      <h1>dashboard</h1>
    </div>
</template>

<style scoped>
.dashboard {
  margin-top: 50px;
  width: 100%;
  height: 100%;
}
</style>