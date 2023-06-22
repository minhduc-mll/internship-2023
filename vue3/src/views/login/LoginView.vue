<template>
  <BaseLayout>
    <div class="login-container">
      <div class="login-wraper">
        <h1>LOGIN</h1>
        <form action="" @submit.prevent="app.validateForm">
          <input type="text" placeholder="Username" v-model="app.username.value" @input="app.checkInputs" @focus="app.onForcusUsername" />
          <div class="error">{{ app.usernameError.value }}</div>
          <input type="password" placeholder="Password" v-model="app.password.value" @input="app.checkInputs" @focus="app.onForcusPassword" />
          <div class="error">{{ app.passwordError.value }}</div>
          <div class="remember-forgot">
            <div class="remember">
              <input type="checkbox" id="remember" name="remember" />
              <label for="remember">Remember me</label>
            </div>
            <a href="#">Forgot?</a>
          </div>
          <button>LOGIN</button>
        </form>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from "@/layouts/BaseLayout.vue";
import { BaseComponent, defineClassComponent } from "@/plugins/component.plugin";
import type { Ref } from "vue";

const app = defineClassComponent(
  class Component extends BaseComponent {
    public username: Ref<string> = this.ref("");
    public password: Ref<string> = this.ref("");
    public usernameError: Ref<string> = this.ref("");
    public passwordError: Ref<string> = this.ref("");

    public constructor() {
      super();
    }

    public checkInputs = () => {
      if (this.username.value !== "" && this.password.value !== "") {
        console.log("true");
      } else {
        console.log("false");
      }
    };

    public onForcusUsername = () => {
      if (this.usernameError.value !== "") {
        this.usernameError.value = "";
        this.username.value = "";
      }
    };

    public onForcusPassword = () => {
      if (this.passwordError.value !== "") {
        this.passwordError.value = "";
        this.password.value = "";
      }
    };

    public validateForm = () => {
      if (this.username.value.length < 6) {
        this.usernameError.value = "Username must be at least 6 characters";
      } else {
        this.usernameError.value = "";
      }
      if (this.password.value.length < 6) {
        this.passwordError.value = "Password must be at least 6 characters";
      } else {
        this.passwordError.value = "";
      }
      if (this.username.value.length >= 6 && this.password.value.length >= 6) {
        alert(`Username: ${this.username.value}\nPassword: ${this.password.value}`);
        this.username.value = "";
        this.password.value = "";
      }
    };
  },
);
</script>

<style scoped lang="scss">
@import "@/assets/scss/modules";

.login-container {
  display: grid;
  place-items: center;
  height: 100%;

  .login-wraper {
    width: 400px;
    position: relative;
    text-align: center;
    padding: 20px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 2px 4px 10px 1px rgba(128, 128, 128, 0.5);

    h1 {
      font-size: 36px;
      font-weight: bold;
      margin: 16px 0 36px 0;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 10px;

      input,
      button {
        height: 50px;
        border-radius: 2px;
      }

      input {
        border: none;
        background-color: #e7e7e7;
        font-size: 14px;
        padding: 0 20px;

        &::placeholder {
          font-weight: bold;
        }
      }

      .error {
        color: red;
      }

      .remember-forgot {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .remember {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        a {
          text-decoration: none;
        }
      }

      button {
        border: none;
        background-color: #8381f7;
        color: white;
        font-size: 14px;
        font-weight: bold;
        margin-top: 10px;
        cursor: pointer;

        &:disabled {
          background-color: gray;
          cursor: default;
        }
      }
    }
  }
}
</style>
