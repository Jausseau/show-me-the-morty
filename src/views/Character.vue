<template>
  <Loader v-if="loading === 'loading'" />
  <div class="container" v-if="loading !== 'loading'">
    <img :alt="character?.name" :src="character?.image" />
    <span>{{ character?.name }} ({{ gender }})</span>
    <span>{{ status }}</span>
    <span>{{ location }}</span>
    <span>{{ origin }}</span>
  </div>
  <div>
    <router-link :to="{ name: 'Characters' }">
      <button>Back to all the characters !</button>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import Loader from "../components/Loader.vue";
import store from "../store";

export default defineComponent({
  name: "Character",
  mounted() {
    store.dispatch("fetchCharacter", this.$route.params.id);
  },
  computed: {
    loading() {
      return store.state.characterLoadingStatus;
    },
    character() {
      return store.state.character;
    },
    gender() {
      switch (store.state.character?.gender.toLowerCase()) {
        case "male":
          return "♂";
        case "female":
          return "♀";
        default:
          return "🤷 ⚥ ?";
      }
    },
    status() {
      switch (store.state.character?.status) {
        case "Alive":
          return "Look at that ! Still alive !";
        case "Dead":
          return "Oh no... No longer with us";
        case "Unknown":
        default:
          return "Alive ? Dead ? We don't know";
      }
    },
    location() {
      if (store.state.character)
        return `Located at ${store.state.character.location.name}`;
      return "Location unknown";
    },
    origin() {
      const originName = store.state.character?.origin.name;
      if (originName && originName.toLowerCase() !== "unknown")
        return `From ${originName}`;
      return "We don't know where from";
    },
  },
  components: { Loader },
});
</script>

<style scoped>
.container {
  display: flex;
  gap: 1rem;
  flex-direction: column;
  width: fit-content;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: auto;
  padding: 3rem;
}
button {
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 21px;
}
</style>
