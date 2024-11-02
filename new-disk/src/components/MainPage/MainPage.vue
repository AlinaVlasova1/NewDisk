<script lang="ts">


import {defineComponent} from "vue";
import AuthorizationPage from "@/components/AuthorizationPage/AuthorizationPage.vue";
import RegistrationPage from "@/components/RegistrationPage/RegistrationPage.vue";

export default defineComponent({
  name: "MainPage",
  components: {RegistrationPage, AuthorizationPage},
  data() {
    return {
      triggeredAuthorizationIs: false as boolean,
      triggeredRegistrationIs: false as boolean,
    }
  },
})
</script>

<template>
  <header>
    <div class="header">
      <img class="logo" src="../../assets/logo.svg" alt="logo" />
      <button class="btn" @click="triggeredAuthorizationIs = true">
        <img src="../../assets/arrow_in_circle.svg" alt="arrow_in_circle"/>
        <span>Вход</span>
      </button>
    </div>
  </header>
  <div class="main">
    <div class="main-block-left">
      <h1>Мои <br> заметки</h1>
      <span>Не забывай о важном,<br>храни его в облаке.</span>
    </div>
    <div class="board">
      <img src="../../assets/board.svg" alt="board"/>
    </div>
  </div>
  <AuthorizationPage v-if="triggeredAuthorizationIs"
                     :triggeredAuthorizationIs="triggeredAuthorizationIs"
                     :triggeredRegistrationIs="triggeredRegistrationIs"
                     @triggered-authorization-is="triggeredAuthorizationIs = false"
                     @triggered-registration-is="triggeredRegistrationIs = true"
  ></AuthorizationPage>
  <RegistrationPage v-if="triggeredRegistrationIs"
                    :triggeredRegistrationIs="triggeredRegistrationIs"
                    :triggeredAuthorizationIs="triggeredAuthorizationIs"
                    @triggered-authorization-is="triggeredAuthorizationIs = true"
                    @triggered-registration-is="triggeredRegistrationIs = false"></RegistrationPage>
</template>

<style scoped>

.header {
  display: flex;
  padding-top: 2%;
  padding-bottom: 1%;

  .logo  {
    width: 10%;
    max-width: 10%;
    min-width: 218px;
    height: auto;
    margin-left: 8%;
  }

  button {
    min-width: 144px;
    width: 144px;
    height: 56px;
    max-height: 3%;
    min-height: 56px;
    background: #b1c909;
    color: rgba(255, 255, 255, 1);
    border-radius: 32px;
    margin-right: 8%;
    margin-left: auto;
    border: none;
  }

  .btn {
    display: flex;
    justify-content: center;
    padding: 12px 24px;
    height: 32px;

    img {
      width: 32px;
      height: 32px;
      margin-right: 12px;
      color: #d5e17b;
      vertical-align: center;
    }

    span {
      font-size: 16px;
      line-height: 32px;
      margin-top: auto;
      margin-bottom: auto;
    }
  }
}

.main {
  display: flex;
}

.main .main-block-left {
  text-align: left;
  font-family: "Montserrat", sans-serif;
  font-optical-sizing: auto;
  margin-left: 8%;
  align-self : center;

  h1 {
    font-weight: 900;
    font-size: 104px;
    line-height: 104px;
    color: rgba(255, 255, 255, 1);
    margin-top: 0;
    margin-bottom: 40px;
  }

  span {
    font-weight: 400;
    font-size: 32px;
    line-height: 48px;
    color: rgba(157, 165, 175, 1);
  }
}

.board {
  display: inline-block;
  margin-right: 8%;
  margin-left: auto;

  img {
    width: 100%;
    height: 864px;
    margin-right: 0;
    margin-left: auto;
  }
}

@media  (1920px <= width) {

  .main {
    display: flex;
  }

  .main .main-block-left {
    text-align: left;
    font-family: "Montserrat", sans-serif;
    font-optical-sizing: auto;
    margin-left: 8%;
    align-self: center;
  }

  .board {
    display: flex;
    margin-left: auto;
    margin-right: auto;

    img {
      width: 100%;
      height: 864px;
      margin-right: 0;
      margin-left: auto;
    }
  }
}


@media screen and  (1366px <= width < 1920px) {
  .header {
    padding-top: 1.75%;

  }

  .main {
    display: flex;
  }

  .board {
    display: flex;
    margin-left: auto;
    margin-right: auto;

    img {
      width: 100%;
      height: 604px;
    }
  }
}

@media screen and (768px <= width < 1366px) {

  .header {
    padding-top: 4%;
  }

  .main {
    display: block;
  }

  .main .main-block-left {
    text-align: center;
    margin-top: 40px;

    h1 {
      margin-bottom: 20px;
    }
  }

  .board {
    display: flex;
    margin-left: auto;
    margin-right: auto;

    img {
      width: auto;
      height: 542px;
      margin-right: auto;
      margin-left: auto;
    }
  }
}

@media screen and ( width <= 360px) {
  .header {
    padding-top: 3%;

    .logo  {
      min-width: 154px;
      height: auto;
      margin-left: 5%;
    }

    button {
      margin-right: 5%;
    }
  }



  .main {
    display: block;
  }

  .main .main-block-left {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 23px;

    h1 {
      font-size: 60px;
      line-height: 64px;
    }

    span {
      font-size: 24px;
      line-height: 36px;
    }
  }

  .board {
    display: flex;
    margin-left: auto;
    margin-right: auto;

    img {
      width: auto;
      height: 287px;
      margin-right: auto;
      margin-left: auto;
    }
  }
}

</style>