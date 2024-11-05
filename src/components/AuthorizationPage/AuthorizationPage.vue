<script lang="ts">

import {defineComponent} from "vue";
import {AuthModel} from "@/models/auth-models";
import {AuthorizationService} from "@/services/authorization-service";
import {router} from "@/main";

export default defineComponent({
  name: "AuthorizationPage",
  props: ['isTriggeredAuthorization', 'isTriggeredRegistration'],
  data() {
    return {
      email: '' as string,
      password: '' as string,
      errors: [] as string[],
      authorisationService: new AuthorizationService(),
      typeInputPassword: 'password' as string,
      isDisabled: false as boolean,
    }
  },
  methods: {
    authorize() {
      this.isDisabled = true;
      const body = new AuthModel(this.email, this.password);
      this.authorisationService.authorize(body).then((res) => {
        const token = res.data.accessToken;
        localStorage.setItem("token", token);
        router.push({name: 'SheetOfNotesPage'});
        this.$emit('isTriggeredAuthorization');
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
    <div class=" authorization">
      <button class="circle-btn-with-icon" @click="$emit('isTriggeredAuthorization')">
        <img src="../../assets/cross.svg" alt="cross"/>
      </button>
      <div class="content">
        <h1 class="title-pop-up">Вход в ваш аккаунт</h1>
        <form class="form">
          <div class="field">
            <label for="title">Email</label>
            <input v-model="email" placeholder="Введите значение">
          </div>
          <div class="field">
            <label for="title">Пароль</label>
            <input :type="typeInputPassword" v-model="password" placeholder="Введите пароль">
            <img class="show-password" v-if="typeInputPassword === 'text'" src="../../assets/eye.svg"
                 @click="changeTypePassword()" alt="eye"/>
            <img class="show-password"  v-if="typeInputPassword === 'password'"
                 src="../../assets/crossed_out_eye.svg" @click="changeTypePassword()" alt="crossed_out_eye"/>
          </div>
        </form>
        <div class="go-registration">
          <div class="question">
            <span class="gray">У вас нет аккаунта?</span>
            <span class="green" @click="$emit('isTriggeredAuthorization'); $emit('isTriggeredRegistration')">
              Зарегистрируйтесь
            </span>
          </div>
          <button class="btn-green btn-authorization" :disabled="isDisabled" @click="authorize()">Войти</button>
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

.authorization {
  background: rgba(27, 47, 70, 1);
  width: 780px;
  height: 672px;
  border-radius: 40px;
  font-family: Montserrat, sans-serif;
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
    margin-bottom: 24px;

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

    .show-password {
      position: relative;
      top: -44px;
      left: 90%;
    }

  }

  .go-registration {
    display: block;
    width: 100%;
    margin-bottom: 20px;
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
    border: none;
  }

   .btn-authorization {
    width: 114px;
    height: 56px;
    margin-left: 21%;
  }

  .btn-authorization:disabled {
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
  }
}

@media screen and  (1366px <= width < 1920px) {

  .authorization {
    height: 632px;
    width: 594px;

    .circle-btn-with-icon {
      margin-left: 87%;
      margin-top: 3%;
    }

    .title-pop-up {
      width: 450px;
      margin-top: 0;
    }

    .content {
      width: 482px;
      margin-right: auto;
      margin-left: auto;
    }

    .question {
      width: 328px;
    }

    .btn-authorization {
      margin-left: 8%;
    }
  }
}

@media screen and (768px <= width < 1366px) {
  .authorization {
    height: 560px;
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

    .btn-authorization{
      margin-left: 21%;
    }
  }
}

@media screen and ( width <= 360px) {
  .authorization {
    height: 622px;
    width: 352px;

    .circle-btn-with-icon {
      margin-left: 80%;
    }

    .title-pop-up {
      margin-top: 0;
      font-size: 32px;
      line-height: 36px;
      width: 300px;
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
      margin-top: 96px;
      font-size: 14px;
      line-height: 24px;
      margin-left: 7px;
      margin-right: auto;
    }

    .btn-authorization {
      width: 90%;
      position: absolute;
      top: 63%;
      left: -17%;
    }
  }
}
</style>