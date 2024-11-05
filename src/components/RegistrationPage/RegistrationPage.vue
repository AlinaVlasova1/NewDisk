<script lang="ts">


import {defineComponent} from "vue";
import {RegistrationModel} from "@/models/registration-models";
import {RegistrationService} from "@/services/registration-service";

export default defineComponent({
  name: "RegistrationPage",
  props: ['isTriggeredRegistration', 'isTriggeredAuthorization'],
  data() {
    return {
      email: '' as string,
      password: '' as string,
      passwordRepeat: '' as string,
      errors: [] as string[],
      registrationService: new RegistrationService(),
      typeInputPassword: 'password' as string,
      isDisabled: false as boolean,
    }
  },
  methods: {
    register() {
      this.isDisabled = true;
      const body = new RegistrationModel(this.email, this.password, this.passwordRepeat);
      this.registrationService.register(body).then(() => {
        this.$emit('isTriggeredAuthorization');
        this.$emit('isTriggeredRegistration');
        this.isDisabled = false;
      }).catch((err) => {
        this.errors = err.response.data.message.join(';');
        this.isDisabled = false;
      })
    },
    changeTypePassword() {
      this.typeInputPassword = (this.typeInputPassword === 'password') ? 'text' : 'password';
    }
  },
})
</script>

<template>
  <div class="pop-up montserrat">
    <div class="registration">
      <button class="circle-btn-with-icon" @click="$emit('isTriggeredRegistration')">
        <img src="../../assets/cross.svg" alt="cross"/>
      </button>
      <h1 class="title-pop-up">Регистрация</h1>
      <div class="content">
        <form class="form">
          <div class="field">
            <label for="title">Email</label>
            <input v-model="email" placeholder="Введите значение">
          </div>
          <div class="field">
            <label for="title">Пароль</label>
            <input :type="typeInputPassword" v-model="password" placeholder="Введите пароль">
            <img class="show-password-r" v-if="typeInputPassword === 'text'" src="../../assets/eye.svg"
                 @click="changeTypePassword()" alt="eye"/>
            <img class="show-password-r"  v-if="typeInputPassword === 'password'"
                 src="../../assets/crossed_out_eye.svg" @click="changeTypePassword()" alt="crossed_out_eye"/>
          </div>
          <div class="field">
            <label for="title">Пароль ещё раз</label>
            <input :type="typeInputPassword" v-model="passwordRepeat" placeholder="Повторите пароль">
            <img class="show-password-r" v-if="typeInputPassword === 'text'" src="../../assets/eye.svg"
                 @click="changeTypePassword()" alt="eye"/>
            <img class="show-password-r"  v-if="typeInputPassword === 'password'"
                 src="../../assets/crossed_out_eye.svg" @click="changeTypePassword()" alt="crossed_out_eye"/>
          </div>
        </form>
        <div class="registration-block">
          <div class="question">
            <span class="gray">У вас есть аккаунт?</span>
            <span class="green" @click="$emit('isTriggeredAuthorization'); $emit('isTriggeredRegistration')">
              Войдите
            </span>
          </div>
          <button class="btn-green btn-registration" :disabled="isDisabled" @click="register()">Зарегистрироваться</button>
        </div>
        <div class="error" v-if="errors.length > 0">{{errors}}</div>
      </div>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

.montserrat {
  font-family: "Montserrat", serif;
}

.pop-up {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 99;
  background-color: rgba(10, 31, 56, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;

}

.registration {
  background: rgba(27, 47, 70, 1);
  width: 780px;
  height: 672px;
  border-radius: 40px;
  text-align: left;

  .circle-btn-with-icon {
    height: 56px;
    width: 56px;
    border-radius: 32px;
    background: #b1c909;
    margin-left: 90%;
    margin-top: 3%;
    border: none;

    button {
      margin-left: auto;
      margin-right: 0;
      border: none;
    }

    img {
      margin-top: auto;
      margin-bottom: auto;
    }
  }

  .title-pop-up {
    color: rgba(255, 255, 255, 1);
    font-weight: 600;
    font-size: 48px;
    line-height: 72px;
    text-align: left;
    margin-left: 80px;
    margin-top: 0;
  }

  .content {
    width: 620px;
    margin-right: auto;
    margin-left: auto;
  }

  .form {
    width: 100%;
  }

  .field {
    color: rgba(157, 165, 175, 1);
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    display: block;
    width: 100%;

    label {
      margin-left: 24px;
      font-weight: 400;
      margin-bottom: 8px;
    }

    input {
      width: 90%;
      padding: 23px 28px;
      border-radius: 36px;
      color: rgba(157, 165, 175, 1);
      background-color: rgba(255, 255, 255, 1);
      border: none;
    }

    .show-password-r {
      position: relative;
      top: -44px;
      left: 90%;
    }
  }

  .field:first-child {
    margin-bottom: 24px;
  }

  .question {
    display: inline-block;
  }

  .gray {
    color: rgba(157, 165, 175, 1);
    margin-right: 2px;
  }

  .green {
    color: rgba(177, 201, 9, 1);
    font-weight: 700;
  }

  .btn-green {
    background-color: rgba(177, 201, 9, 1);
    border-radius: 32px;
    color: rgba(255, 255, 255, 1);
    font-size: 20px;
    line-height: 32px;
  }

  .btn-registration {
    width: 267px;
    height: 56px;
    margin-left: 17%;
    border: none;
  }

  .btn-registration:disabled {
    background-color: rgba(157, 165, 175, 1);
    color:  rgba(177, 201, 9, 1);
  }

  .error {
    background-color: rgba(255, 116, 97, 0.1);
    color: rgba(255, 116, 97, 1);
    border-radius: 24px;
    vertical-align: center;
    padding: 8px 10px;
    line-height: 28px;
    margin-top: 10px;
  }
}

@media screen and  (1366px <= width < 1920px) {

  .registration {
    height: 632px;
    width: 594px;

    .circle-btn-with-icon {
      margin-left: 87%;
      margin-top: 3%;
    }

    .title-pop-up {
      width: 450px;
      text-align: left;
      margin: 0 auto;
    }

    .content {
      width: 482px;
      margin-right: auto;
      margin-left: auto;
    }

    .btn-registration {
      margin-left: 2%;
      width: 230px;
    }
  }
}

@media screen and (768px <= width < 1366px) {
  .registration {
    height: 692px;
    width: 688px;

    .circle-btn-with-icon {
      margin-left: 86%;
    }

    .title-pop-up {
      margin-top: 0;
    }

    .content {
      width: 576px;
      margin-right: auto;
      margin-left: auto;
    }

    .btn-registration {
      margin-left: 11%;
    }
  }

  .registration-block div {
    display: inline-block;
  }
}

@media screen and ( width <= 360px) {
  .registration {
    height: 622px;
    width: 352px;

    .circle-btn-with-icon {
      margin-left: 80%;
    }

    .title-pop-up {
      margin-top: 0;
      font-size: 32px;
      line-height: 36px;
      text-align: left;
      width: 300px;
      margin-left: 20px;
    }

    .content {
      width: 320px;
      margin-right: auto;
      margin-left: auto;
    }

    .form {
      width: 90%;
    }

    .question {
      margin-top: 60px;
      margin-left: 50px;
    }

    .btn-registration {
      width: 90%;
      position: absolute;
      top: 75%;
      left: -12%;
    }
  }


}
</style>