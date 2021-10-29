<template>
  <router-link
    :to="{ name: 'Character', params: { id: character.id } }"
    class="character-container no-link-style"
  >
    <img :alt="character?.name" :src="character?.image" />
    <span class="name">{{ character?.name }}</span>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "CharacterCard",
  props: {
    character: Object,
  },
});
</script>

<style scoped>
.name {
  max-width: 280px;
}
.no-link-style {
  text-decoration: none;
  color: black;
}
.character-container {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
</style>
