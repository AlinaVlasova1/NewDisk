<script lang="ts">

import {defineComponent} from "vue";
import {NoteService} from "@/services/note-service";
import {NoteCreationModel} from "@/models/note-models";

export default defineComponent({
  name: "CreateNotePage",
  props: ['triggeredCreateNoteIs', 'createdNote'],
  data() {
    return {
      title: '' as string,
      content: '' as string,
      noteService: new NoteService(),
      disabledBtnIs: false as boolean,
    }
  },
  methods: {
    createNote() {
      this.disabledBtnIs = true;
      const body = new NoteCreationModel(this.title, this.content);
      this.noteService.createNote(body).then(() => {
        this.disabledBtnIs = false;
        this.$emit('triggeredCreateNoteIs');
        this.$emit('createdNote');
      })
    }
  }
})
</script>

<template>
  <div class="pop-up montserrat">
    <div class="pop-up-inner">
      <button class="circle-btn-with-icon" @click="$emit('triggeredCreateNoteIs')"
      :disabled="disabledBtnIs">
        <img src="../../assets/cross.svg" alt="cross"/>
      </button>
      <h1 class="title-pop-up">Добавление заметки</h1>
      <div class="content">
        <form class="form">
          <div class="field">
            <label for="title">Название заметки</label>
            <input v-model="title" placeholder="Введите название" :maxlength="100">
            <span>{{title.length}}/100</span>
          </div>
          <div class="field">
            <label for="title">Текст заметки</label>
            <textarea  v-model="content" placeholder="Введите текст" :maxlength="255"></textarea>
            <span>{{content.length}}/255</span>
<!--            255 так как ошибка с сервера приходит-->
          </div>
        </form>
        <div class="go-registration">
          <button class="btn-green btn-add" @click="createNote()"
                  :disabled="content.length > 255 || title.length > 100 || disabledBtnIs">Добавить</button>
        </div>
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

.pop-up-inner {
  background: rgba(27, 47, 70, 1);
  width: 780px;
  height: 852px;
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
      background-color: rgba(255, 255, 255, 1);
      color: rgba(157, 165, 175, 1);
      border: none;
    }

    textarea {
      width: 90%;
      padding: 23px 28px;
      border-radius: 36px;
      background-color: rgba(255, 255, 255, 1);
      border: none;
      color: rgba(157, 165, 175, 1);
      height: 244px;
      resize: none;
    }

    span {
      margin-left: 87%;
    }

  }

  .go-registration {
    display: block;
    width: 100%;
    margin-bottom: 20px;
  }


  .btn-green {
    background-color: rgba(177, 201, 9, 1);
    border-radius: 32px;
    color: rgba(255, 255, 255, 1);
    font-size: 20px;
    line-height: 32px;
  }

  .btn-add {
    width: 150px;
    height: 56px;
    margin-left: 75%;
    border: none;
  }

}


@media screen and  (1366px <= width < 1920px) {

  .pop-up-inner {
    height: 800px;
    width: 594px;

    .circle-btn-with-icon {
      margin-left: 87%;
      margin-top: 3%;
    }

    .title-pop-up {
      width: 450px;
      text-align: left;
      margin-right: auto;
      margin-left: auto;
      margin-top: -5%;
    }

    .content {
      width: 482px;
      margin-right: auto;
      margin-left: auto;
    }

    .field {

      textarea {
        height: 168px;
      }
    }


  }
}

@media screen and (768px <= width < 1366px) {
  .pop-up-inner {
    height: 728px;
    width: 688px;

    .circle-btn-with-icon {
      margin-left: 86%;
    }

    .title-pop-up {
      margin-top: -5%;
    }

    .content {
      width: 576px;
      margin-right: auto;
      margin-left: auto;
    }

    .field {

      textarea {
        height: 168px;
      }
    }
  }
}

@media screen and ( width <= 360px) {
  .pop-up-inner {
    height: 622px;
    width: 352px;

    .circle-btn-with-icon {
      margin-left: 80%;
    }

    .title-pop-up {
      margin-top: -11%;
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

    .field {

      textarea {
        height: 122px;
      }
    }

    .btn-add {
      width: 100%;
      height: 56px;
      margin-left: 0;
    }
  }
}
</style>