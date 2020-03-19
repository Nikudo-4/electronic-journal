<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>
         {{nameChildren}}
        </q-toolbar-title>

     <div class="q-pa-md">
      <q-btn color="primary" size="xs"
        to="/list"
        clickable
        @click="linkedBtn"
        v-if="!w"
        >
        {{btntitle}}
      </q-btn>
      <q-btn color="primary" size="xs"
        to="/week"
        clickable
        @click="linkedBtn"
        v-else-if="w"
        >
        {{btntitle}}
      </q-btn>
      
    </div>
      </q-toolbar>

    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
    
    <q-btn
          style="padding-left: 15px; padding-top: 5px; "
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />
      <q-list clickable>
        <div class="q-col-gutter-md row justify-center"  style="text-align:center;" >
          <div class="col-4" v-for="(allArrChild, index) in allArrChildren" :key="index"
           @click="currentChild(allArrChild)" clickable v-close-popup >
            <q-img
            src="https://placeimg.com/500/300/nature"
            :ratio="4/3"
            />
            <span >{{allArrChild.name}}</span>
          </div>
        <div class="col-4" >
          <q-btn to="/">+</q-btn>
        </div>
      </div>
        <q-item clickable tag="a" target="_blank" to='/week'>
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Оценки</q-item-label>
          </q-item-section>
        </q-item>
        <section class="inDeveloping">
        <q-item clickable tag="a" target="_blank">
          <q-item-section avatar>
            <q-icon name="notifications" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Расписание звонков</q-item-label>
            <q-item-label caption>В разработке</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" >
          <q-item-section avatar>
            <q-icon name="notifications_none"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Расписание уроков</q-item-label>
            <q-item-label caption>В разработке</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" >
          <q-item-section avatar>
            <q-icon name="record_voice_over" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Предметы</q-item-label>
            <q-item-label caption>В разработке</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" >
          <q-item-section avatar>
            <q-icon name="menu_book" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Дневник</q-item-label>
            <q-item-label caption>В разработке</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" >
          <q-item-section avatar>
            <q-icon name="list_alt" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Заметки</q-item-label>
            <q-item-label caption>В разработке</q-item-label>
          </q-item-section>
        </q-item>
        </section>
        <br>
        <q-item clickable tag="a" target="_blank" @click="settings = true">
          <q-item-section avatar>
            <q-icon name="settings_applications" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Настройки</q-item-label>          
            </q-item-section>
        </q-item>
        <q-dialog  v-model="settings">
          <q-card style="height:100%">
            <q-card-section>
              <div class="text-h6">Настройки</div>
            </q-card-section>

            <q-card-section  class="q-pt-none">
              <q-list style="width:240px" >
                <div class="q-col-gutter-md row justify-center">
                  <div class="col-12" style="text-align:center"
                   v-for="(allArrChild, index) in allArrChildren" :key="index" >
                    <q-img
                    src="https://placeimg.com/500/300/nature"
                    :ratio="4/3"
                    />
                    <span>{{allArrChild.name}}</span>
                    <br>
                    <q-btn @click="deleteItem(index), messDelete()" style="width:100px" >Удалить</q-btn>
                  </div>
                </div>
              </q-list>
            </q-card-section>
            <q-dialog v-model="whantDelete" position="bottom">
              <q-card style="width: 200 px">
                <q-card-section class="text-align-center" style="text-align:center">
                  <div>Ученик удален</div>
                </q-card-section>
              </q-card>
            </q-dialog>
          </q-card>
        </q-dialog>
        <q-item clickable tag="a" target="_blank" @click="EmailDevelopers = true" >
          <q-item-section avatar>
            <q-icon name="mail" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Написать разработчикам</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-dialog v-model="EmailDevelopers" transition-show="scale" transition-hide="scale" > 
      <q-card>
        <q-card-section>
          <div class="text-h6">Письмо разработчикам</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
            <q-form
              class="q-gutter-md"
            >
            <q-input
              filled
              v-model="name"
              label="Введите имя"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Напишите Ваше имя']"
            />
            <q-input
              filled
              v-model="text"
              label="Опишите проблему"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Это обязательное поле']"
            />
            <div>
              <q-btn no-caps v-if="sendBtn" label="Отправить"
               type="submit" color="primary"
               v-close-popup @click="secondDialog = true" />
              <q-btn no-caps label="Отменить" type="reset" color="primary"
               flat class="q-ml-sm" v-close-popup />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="secondDialog"  >
      <q-card class="bg-primary text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">Сообщение отправленно!</div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-black">
          <span> Спасибо, что помогаете улучшить приложение! </span>
          <q-btn flat label="OK" v-close-popup  />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import {mapGetters, mapActions , mapMutations} from 'vuex'

import { openURL } from 'quasar'
export default {
  name: 'MyLayout',


  data () {
    return {
      leftDrawerOpen: false,
       tab: 'mails',
        w:false,
        settings:false,
        EmailDevelopers: false,
        name:'',
        text:'',
        secondDialog: false,
        whantDelete: false,
    }
  },

    computed:{
      // addNewUser(){
      //   if (this.$store.allChildren.length  == 3)
      //     return false
      //   }else return true 
      // },
      btntitle() {
        let currentPath = this.$route.fullPath
        if (currentPath == '/week') return 'Неделя'
        else if (currentPath == '/list') return 'Список'
        else return 'Неделя'
      },
      sendBtn(){
        if (this.name.length >= 3 && this.text.length >=5) return true
      },
    ...mapGetters(['nameChildren','allArrChildren'])
    },
     methods: {
       ...mapActions(['deleteItem', 'currentChild']),

        //  dddd(index){
        //   alert(this.allArrChild[index])
        //  },
       
      onItemClick1 () {
       console.log('Clicked on an Item1')
      },
      onItemClick2 () {
       console.log('Clicked on an Item2')
      },
      linkedBtn(){
        let currentPath = this.$route.fullPath
        if (currentPath == '/week') {
          this.w = !this.w
          return this.w
          }
        else if (currentPath == '/list'){
          this.w = !this.w
          return this.w
          }
        else if (currentPath == '/'){
          return this.w = false 
          }
      },
      messDelete(){
        this.$q.notify({
            message: '<span style="color: white">Удалено</span>',
            color: 'primary',
            html: true
          })
      },
      aaa(){
        alert("Click")
      }
    }
}
</script>
<style>
.inDeveloping{
  opacity: 0.3;
}
</style>