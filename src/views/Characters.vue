<template>
  <div class="characters">
    <Search />
    <div class="characters-container">
      <div v-for="character in characters" :key="character.id">
        <CharacterCard :character="character" />
      </div>
    </div>
    <div>
      <Loader v-if="loading === 'loading'" />
    </div>
    <button @click="loadMore" class="load-more" :disabled="!isMoreToLoad">
      {{ isMoreToLoad ? "Load More !" : "No more to load" }}
    </button>
    <button @click="scrollTop" id="scroll-top-button" class="top-link">
      ☝ Up top !
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import CharacterCard from "../components/CharacterCard.vue";
import Search from "../components/Search.vue";
import Loader from "../components/Loader.vue";
import store from "../store";

export default defineComponent({
  name: "Characters",
  mounted() {
    store.dispatch("fetchCharacters");
  },
  computed: {
    loading() {
      return store.state.charactersLoadingStatus;
    },
    characters() {
      return store.state.characters;
    },
    isMoreToLoad() {
      return store.state.nextUrl;
    },
  },
  methods: {
    loadMore() {
      store.dispatch("fetchCharacters");
    },
    scrollTop() {
      window.scrollTo(0, 0);
    },
  },
  components: {
    CharacterCard,
    Search,
    Loader,
  },
});
</script>

<style scoped>
.characters-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.top-link {
  transition: all 0.25s ease-in-out;
  position: fixed;
  bottom: 0;
  right: 0;
  display: inline-flex;

  cursor: pointer;
  align-items: center;
  justify-content: center;
  margin: 0 3em 3em 0;
  padding: 0.25em;
  padding: 1rem;
}
.load-more {
  margin: 5rem;
}
button {
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 21px;
}
</style>
