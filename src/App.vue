<template>
  <v-app>
    <v-layout>
      <v-navigation-drawer
        expand-on-hover
        permanent
        rail
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

      <v-main>
        <router-view />
      </v-main>
    </v-layout>
  </v-app>

</template>

<script lang="ts" setup>
  //
</script>
