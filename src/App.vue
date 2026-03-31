<template>
  <v-layout>
    <v-navigation-drawer
      v-model="drawer"
      temporary
    >
      <v-list>
        <v-list-item
          prepend-avatar="@/assets/user-icon.png"
          title="You"
        />
      </v-list>

      <v-divider />

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-star" title="Simple Generator" to="/" value="simple" />
        <v-list-item prepend-icon="mdi-creation" title="Dynamic Generator" to="/dynamic-generator-page" value="dynamic" />
        <v-list-item prepend-icon="mdi-magnify" title="String Viewer" to="/string-viewer" value="view" />
        <v-list-item prepend-icon="mdi-symbol" title="Character Set" to="/character-set" value="character" />
      </v-list>
    </v-navigation-drawer>
    <v-app>
      <v-main>
        <router-view />
        <v-fab app icon="mdi-menu" location="top left" @click.stop="drawer = !drawer" />
      </v-main>
    </v-app>
  </v-layout>

</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  const drawer = ref()
</script>
