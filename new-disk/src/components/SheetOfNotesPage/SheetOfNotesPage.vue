<script lang="ts">
import {defineComponent} from "vue";
import {NoteService} from "@/services/note-service";
import {INoteResponse} from "@/models/note-models";
import CreateNotePage from "@/components/CreateNotePage/CreateNotePage.vue";
import {AuthorizationService} from "@/services/authorization-service";

export default defineComponent({
  name: "SheetOfNotesPage",
  components: {CreateNotePage},
  data() {
    return {
      email: '' as string,
      arrDisplayNotes: [] as Array<INoteResponse>,
      notesService: new NoteService(),
      triggeredCreateNoteIs: false as boolean,
      createdNote: false as boolean,
      authService: new AuthorizationService()
    }
  },
  methods: {
    setNotesArray() {
      this.notesService.getListNotes().then((res) => {
        this.arrDisplayNotes = [...res.data];
      });
    },
    deleteNote(id: number) {
      this.notesService.deleteNote(id).then(() => {
        this.setNotesArray();
      })
    },
    getInfoUser() {
      this.authService.getInfoUser().then((res) => {
        this.email = res.data.email;
      })
    }
  },
  beforeMount() {
    this.getInfoUser();
    this.setNotesArray();
  }
})
</script>

<template>
  <div class="content montserrat">
    <header>
      <div class="header">
        <img class="logo" src="../../assets/logo.svg" alt="logo" />
        <div class="user">
          <span>{{email}}</span>
          <div class="icon-user">
            <img src="../../assets/user.svg" alt="user"/>
          </div>
        </div>
      </div>
    </header>
    <div class="main">
      <div class="list-notes" v-if="arrDisplayNotes.length !==0 ">
        <div class="note" v-for="(note, index) in arrDisplayNotes" :key="index">
          <div class="header-note">
            <div class="title">{{note.title}}</div>
            <div class="edge"></div>
            <div class="edge-continuation"></div>
           </div>
          <div class="content-note">
            {{note.content}}
            </div>
          <div class="footer-note">
            <div class="delete" @click="deleteNote(note.id)">
              <img src="../../assets/cross.svg" alt="cross"><span>Удалить</span></div>
            </div>
        </div>
      </div>
      <button class="plus" @click="triggeredCreateNoteIs = true">
        <img src="../../assets/plus.svg" alt="plus"/>
      </button>
    </div>
  </div>
<CreateNotePage v-if="triggeredCreateNoteIs"
                :triggeredCreateNoteIs="triggeredCreateNoteIs"
                :createdNote="createdNote"
                @triggered-create-note-is="triggeredCreateNoteIs = false"
                @created-note="setNotesArray()"></CreateNotePage>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

.montserrat {
  font-family: "Montserrat", serif;
}

.content {
  height: 100%;

  .main {
    text-align: left;

    .list-notes {
      display: grid;
      grid-template-columns: 540px 540px 540px;
      gap: 20px;
      width: 1660px;
      margin-top: 40px;
      margin-left: auto;
      margin-right: auto;

      .note {
        display: block;
        margin-top: 40px;

        .header-note {
          display: grid;
          grid-template-columns: auto 40px;
          grid-template-rows: 32px 32px;

          .title {
            grid-column-start: 1;
            grid-row-start: 1;
            grid-row-end: 3;
            border-radius: 12px 0 0 0;
            background-color: #b1c909;
            color: rgba(255, 255, 255, 1);
            font-size: 24px;
            font-weight: 600;
            line-height: 32px;
            padding: 20px 28px;
            border-bottom: 1px solid rgba(165, 187, 12, 1);
          }

          .edge {
            grid-column-start: 2;
            grid-column-end: 2;
            grid-row-start: 1;
            grid-row-end: 1;
            background-color: rgba(165, 187, 12, 1);
          }

          .edge:before {
            content: "";
            position: relative;
            top: -17px;
            right: 0;
            border-width: 0 40px 32px 0;
            border-radius: 0 0 0 16px;
            border-style: solid;
            border-color:  rgba(165, 187, 12, 1) #0a1f38;
          }

          .edge-continuation {
            grid-column-start: 2;
            grid-column-end: 2;
            grid-row-start: 1;
            grid-row-end: 3;
            background-color: #b1c909;
            border-radius: 0 16px 0 0 ;
            border-bottom: 1px solid rgba(165, 187, 12, 1);
          }
        }

        .content-note {
          background-color: #b1c909;
          color: rgba(255, 255, 255, 1);
          font-size: 20px;
          font-weight: 500;
          line-height: 32px;
          padding: 20px 28px;
          display: block;
          width: auto;
          word-wrap: break-word;

          span {
            display: inline-block;
            width: 472px;
          }
        }

        .footer-note {
          background-color: #b1c909;
          height: 72px;
          border-radius: 0 0 12px 12px;

          .delete div {
            margin-top: 10px;
          }

          div {
            width: 163px;
            height: 56px;
            text-align: center;
            margin-left: 70%;
            padding-top: 10px;
          }

          img {
            width: 16px;
            height: 16px;
            margin-right: 12px;
            margin-top: 20px;
          }

          span {
            font-size: 20px;
            line-height: 32px;
            color: rgba(255, 255, 255, 1);
            margin-top: 12px;
          }
        }
      }
    }

    .plus {
      position: absolute;
      height: 56px;
      width: 56px;
      border-radius: 32px;
      background: #b1c909;
      left: 95%;
      bottom: 1%;
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
  }
}

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

  .user {
    margin-right: 8%;
    margin-left: auto;
    display: flex;
    align-items: center;

    span {
      color: rgba(255, 255, 255, 1);
      margin-right: 12px;
    }

    .icon-user {
      width: 56px;
      height: 56px;
      background-color: rgba(27, 47, 70, 1);
      border-radius: 50%;

      img {
        margin-top: 15px;
      }

    }
  }
}





@media screen and  (1366px <= width < 1920px) {
  .content {
    .main {

      .list-notes {
        width: 1206px;
        grid-template-columns: 388px 388px 388px;

        .note {

          .header-note {

            .edge:before {
              border-width: 0 41px 32px 0;
            }
          }

          .content-note {
            line-height: normal;
          }

          .footer-note {

            div {
              margin-left: 60%;
            }
          }
        }
      }

    }
  }


}

@media screen and (768px <= width < 1366px) {
  .content {
    .main {
      .list-notes {
        display: grid;
        grid-template-columns: 688px;
        gap: 20px;
        width: 688px;
      }

      .plus {
        left: 90%;
        top: 91%;
        bottom: 10%;
        border: none;
        box-shadow:
            -19px -20px 46px rgba(4, 4, 4, 0.06),
            -20px 19px 10px rgba(0, 0, 0, 0.06);
      }
    }
  }

}



@media screen and ( width <= 360px) {

  .user {
    span {
      display: none;
    }
  }

  .content {
    .main {
      .list-notes {
        display: grid;
        grid-template-columns: 320px;
        gap: 20px;
        width: 320px;

        .note {
          .footer-note {

            div {
              margin-left: 50%;
            }
          }
        }
      }
      .plus {
        left: 80%;
        top: 91%;
        bottom: 10%;
        border: none;
        box-shadow:
            -19px -20px 46px rgba(4, 4, 4, 0.06),
            -20px 19px 10px rgba(0, 0, 0, 0.06);
      }
    }
  }




}
</style>