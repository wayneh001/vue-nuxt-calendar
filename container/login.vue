<template>
  <div class="container-fluid">
    <div class="d-flex justify-content-center align-items-center vh-100">
      <div class="shadow p-5 mb-5 bg-body rounded w-25">
        <h3 class="text-center mb-5">一樓會議室預約</h3>
        <form>
          <div class="mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="請輸入帳號"
              autofocus
              v-model="user.username"
            />
          </div>
          <div class="mb-3">
            <input
              type="password"
              class="form-control"
              placeholder="請輸入密碼"
              v-model="user.password"
            />
          </div>
          <div class="row mb-3">
            <div class="col-8">
              <input
                type="password"
                class="form-control"
                placeholder="請輸入驗證碼"
                v-model="user.password"
              />
            </div>
            <div class="coderight col-2">
              <SIdentify
                :identifyCode="identifyCode"
                :contentWidth="75"
              ></SIdentify>
            </div>
            <!-- <div class="col-2">
              <div class="d-flex justify-content-center align-items-center bg-light text-center h-100">5736</div>
            </div> -->
            <div class="col-2">
              <div
                class="
                  d-flex
                  justify-content-between
                  align-items-center
                  text-center
                  h-100
                "
              >
                <a href="#" @click="refreshCode()"
                  ><i class="fa fas fa-arrow-rotate-right"></i></a
                ><a href="#" @click="speak()"
                  ><i class="fa fas fa-microphone"></i
                ></a>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <button
              type="button"
              class="btn btn-main text-white w-100"
              @click="onSubmit"
            >
              登入
            </button>
          </div>
          <div class="nb-3">
            <button
              type="button"
              class="btn btn-light text-secondary w-100"
              @click="onCancel"
            >
              取消
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import SIdentify from "@/components/Identify";
export default {
  name: "LoginPage",
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      identifyCode: "",
      identifyCodes: "0123456789",
    };
  },
  components: {
    SIdentify,
  },
  methods: {
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode +=
          this.identifyCodes[this.randomNum(0, this.identifyCodes.length)];
      }
      console.log(this.identifyCode);
    },
    // onError(error) {
    //   console.log("Error happened:", error);
    // },
    // async onSubmit() {
    //   try {
    //     const token = await this.$recaptcha.getResponse();
    //     const response = await fetch("/api/check-token", {
    //       method: "POST",
    //       body: JSON.stringify({
    //         token,
    //         email: this.username,
    //         password: this.password,
    //       }),
    //     }).then((res) => res.json());
    //     console.log("Server Response: ", response);
    //     await this.$recaptcha.reset();
    //
    //   } catch (error) {
    //     console.log("Login error:", error);
    //   }
    // },
    // onSuccess(token) {
    //   console.log("Succeeded:", token);
    // },
    // onExpired() {
    //   console.log("Expired");
    // },
    onSubmit() {
      this.$router.push("/dashboard");
    },
    onCancel() {
      console.log("yes");
    },
    speak() {
      let msg = new SpeechSynthesisUtterance();
      msg.text = this.identifyCode;
      window.speechSynthesis.speak(msg);
    },
  },
  mounted() {
    this.makeCode(this.identifyCodes, 4);
  },
};
</script>
