<template>
  <div class="card">
    <img src="@/assets/bg3.jpeg"/>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
   return {
      loginForm: {
        username: "demonhunter",
        password: "123456",
        code: "",
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  watch: {
  },
  methods: {
  },
};
</script>

<style>
.card__cover {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    border-radius: 16px;
    overflow: hidden;
    position: relative;
    z-index: 1;
}

.card {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 20px;
    position: relative;
    overflow: hidden;
}
</style>