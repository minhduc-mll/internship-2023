<template>
  <div class="todo-item">
    <span class="task-detail">{{ props.task.detail }}</span>
    <button @click="$emit('deleteTask', props.task.id)" class="delete-btn">
      <i class="bi bi-trash-fill"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Props } from "./TaskComponent";

const props = defineProps<Props>();
</script>

<style scoped lang="scss">
@import "@/assets/scss/modules";

.todo-item {
  display: flex;
  position: relative;

  .task-detail {
    width: 100%;
    padding: 10px;
    background-color: #eee;
    border-radius: 2px;
  }

  .delete-btn {
    height: 100%;
    display: none;
    position: absolute;
    width: 40px;
    top: 0;
    right: 0;
    background-color: red;
    color: white;
    border: none;
    border-radius: 2px;
    padding: 6px;
    cursor: pointer;
  }

  &:hover {
    .delete-btn {
      display: block;
    }
  }
}
</style>
