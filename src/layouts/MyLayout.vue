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
          Name Child
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
      <q-list>
        <div class="q-col-gutter-md row justify-center">
          <div class="col-4">
            <q-img
            src="https://placeimg.com/500/300/nature"
            :ratio="4/3"
            />
            <span>Александра (8А)</span>
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
        <q-item clickable tag="a" target="_blank" href="">
          <q-item-section avatar>
            <q-icon name="settings_applications" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Настройки</q-item-label>          
            </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="">
          <q-item-section avatar>
            <q-icon name="mail" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Написать разработчикам</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
export default {
  name: 'MyLayout',


  data () {
    return {
      leftDrawerOpen: false,
       tab: 'mails',
        w:false
    }
  },
    computed:{
      btntitle() {
        let currentPath = this.$route.fullPath
        if (currentPath == '/week') return 'Неделя'
        else if (currentPath == '/list') return 'Список'
        else return 'Неделя'
      },


    },
     methods: {
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
      //       linkedBtn(){
      //   let currentPath = this.$route.fullPath
      //   if (currentPath == '/week') {
      //     this.w = !this.w
      //     this.l = !this.l
      //     return this.l
      //     }
      //   else if (currentPath == '/list'){
      //     this.w = !this.w
      //     this.l = !this.l
      //     return this.w
      //     }
      // },
    }
}
</script>
<style>
.inDeveloping{
  opacity: 0.3;
}
</style>