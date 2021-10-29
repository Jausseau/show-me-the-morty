<template>
  <div class="container">
    <input v-model="searchValue" />
    <div>
      <input type="radio" id="alive" value="alive" v-model="status" />
      <label for="alive">Alive</label>
    </div>
    <div>
      <input type="radio" id="dead" value="dead" v-model="status" />
      <label for="dead">Dead</label>
    </div>
    <div>
      <input type="radio" id="unknown" value="unknown" v-model="status" />
      <label for="unknown">Unknown</label>
    </div>
    <div>
      <input type="radio" id="all" value="all" v-model="status" />
      <label for="all">All</label>
    </div>
    <button @click="search" :disabled="!searchValue && status === 'all'">
      Search !
    </button>
    <button @click="reset" :disabled="!isOnSearch">Reset</button>
  </div>
</template>

<script lang="ts">
import { CharacterStatus } from "@/types";
import { defineComponent } from "vue";
import store from "../store";

export default defineComponent({
  name: "Search",
  computed: {
    isOnSearch() {
      return store.state.search;
    },
  },
  data: (): {
    searchValue: string;
    status: CharacterStatus;
  } => ({
    searchValue: "",
    status: "all",
  }),
  methods: {
    search(): void {
      var parameters = [];
      if (this.searchValue)
        parameters.push({ prop: "name", value: this.searchValue });
      if (this.status && this.status !== "all")
        parameters.push({ prop: "status", value: this.status });
      store.dispatch("fetchCharacters", { parameters });
    },
    reset() {
      this.searchValue = "";
      this.status = "all";
      store.dispatch("resetCharacters");
    },
  },
});
</script>

<style scoped>
.container {
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 1rem;
}
button {
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 21px;
}
input {
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-size: 21px;
}
</style>
