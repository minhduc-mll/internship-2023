<template>
  <BaseLayout>
    <div class="todo-container">
      <div class="wraper">
        <h1>Todo App</h1>
        <div class="todo">
          <div class="add-todo">
            <input type="text" placeholder="Add your new todo" v-model="app.task.value" />
            <button @click="app.addTask"><i class="bi bi-plus-lg fa-6x" style="font-size: 24px"></i></button>
          </div>
          <div class="todo-list">
            <div class="todo-item" v-for="todo in app.todos.value" :key="todo.id">
              <span class="detail">{{ todo.task }}</span>
              <button @click="(event) => app.deleteTask(todo.id)" class="delete-btn">
                <i class="bi bi-trash-fill"></i>
              </button>
            </div>
          </div>
          <div class="todo-bottom">
            <div class="todo-detail">You have {{ app.todos.length }} pending tasks</div>
            <button @click="app.clearTask">Clear All</button>
          </div>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from "@/layouts/BaseLayout.vue";
import { BaseComponent, defineClassComponent } from "@/plugins/component.plugin";
import type { Todo } from "./TodoView";
import { Ref } from "vue";

const app = defineClassComponent(
  class Component extends BaseComponent {
    public task: Ref<string> = this.ref("");
    public todos: Ref<Array<Todo>> = this.ref([
      { id: 0, task: "Buy a new gaming laptop" },
      { id: 1, task: "Complete a previous task" },
      { id: 2, task: "Create video for YouTube" },
      { id: 3, task: "Create a new portfolio site" },
    ]);

    public constructor() {
      super();
    }

    public addTask = () => {
      if (this.task.value !== "") {
        this.todos.value = [...this.todos.value, { id: this.todos.value.length, task: this.task.value }];
        this.task.value = "";
      }
    };

    public deleteTask = (id) => {
      this.todos.value = this.todos.value.filter((t) => t.id !== id);
    };

    public clearTask = () => {
      if (this.todos.value.length > 0) {
        this.todos.value = [];
      }
    };
  },
);
</script>

<style scoped lang="scss">
@import "@/assets/scss/modules";

.todo-container {
  display: grid;
  place-items: center;
  height: 100%;
  background-image: linear-gradient(aquamarine, cornflowerblue);
}

.wraper {
  width: 360px;
  position: relative;
  padding: 20px;
  background-color: white;
  border-radius: 5px;
}

h1 {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
}

.todo {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.add-todo {
  width: 100%;
  display: flex;
  gap: 5px;
}

.add-todo input {
  width: calc(100% - 40px);
  border: 1px solid gray;
  padding: 10px;
  border-radius: 2px;
}

.add-todo button {
  width: 40px;
}

.todo-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px 0;
}

.todo-item {
  display: flex;
  position: relative;
}

.todo-item span {
  width: 100%;
  padding: 10px;
  background-color: #eee;
  border-radius: 2px;
}

.todo-item button {
  height: 100%;
  display: none;
  position: absolute;
  width: 40px;
  top: 0;
  right: 0;
  background-color: red;
}

.todo-item:hover button {
  display: block;
}

.todo-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
}

button {
  background-color: #904ae7;
  color: white;
  border: none;
  border-radius: 2px;
  padding: 6px;
  cursor: pointer;
}
</style>
