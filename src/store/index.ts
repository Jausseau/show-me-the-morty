import { createStore } from "vuex";
import axios from "axios";
import { Character, CharactersApi, LoadingStatus, Parameters } from "@/types";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

const BASE_URL = "https://rickandmortyapi.com/api";

const buildQueryParameters = (params: { parameters: Parameters }) =>
  params?.parameters
    ?.map((parameter) => `${parameter.prop}=${parameter.value}`)
    .join("&");

export default createStore<{
  character?: Character;
  characterLoadingStatus: LoadingStatus;
  characters: Character[];
  charactersLoadingStatus: LoadingStatus;
  nextUrl: string;
  search: boolean;
}>({
  state: {
    character: undefined,
    characterLoadingStatus: "idle",
    characters: [],
    charactersLoadingStatus: "idle",
    nextUrl: "",
    search: false,
  },
  mutations: {
    SET_CHARACTER(state, character: Character) {
      state.character = character;
    },
    SET_CHARACTER_LOADING_STATUS(state, status) {
      state.characterLoadingStatus = status;
    },
    SET_CHARACTERS(state, characters: Character[]) {
      state.characters = characters;
    },
    ADD_CHARACTERS(state, characters: Character[]) {
      state.characters = [...state.characters, ...characters];
    },
    SET_CHARACTERS_LOADING_STATUS(state, status) {
      state.charactersLoadingStatus = status;
    },
    SET_NEXT_URL(state, url) {
      state.nextUrl = url;
    },
    SET_SEARCH(state, search: boolean) {
      state.search = search;
    },
  },
  actions: {
    fetchCharacters(
      { commit, state },
      params: { parameters: { prop: string; value: string }[]; reset: boolean }
    ) {
      commit("SET_CHARACTERS_LOADING_STATUS", "loading");
      const inlineParameters = buildQueryParameters(params);
      if (inlineParameters) commit("SET_SEARCH", true);
      const url =
        (!inlineParameters && !params?.reset && state.nextUrl) ||
        `${BASE_URL}/character/${
          inlineParameters ? `?${inlineParameters}` : ""
        }`;
      axios
        .get<CharactersApi>(url)
        .then((response) => {
          commit("SET_CHARACTERS_LOADING_STATUS", "loaded");
          commit(
            inlineParameters || params?.reset
              ? "SET_CHARACTERS"
              : "ADD_CHARACTERS",
            response.data.results
          );
          commit("SET_NEXT_URL", response.data.info.next);
        })
        .catch(() => {
          createToast("Something went wrong when fetching the characters...", {
            type: "danger",
          });
        });
    },
    resetCharacters({ commit, dispatch }) {
      commit("SET_SEARCH", false);
      dispatch("fetchCharacters", { reset: true });
    },
    fetchCharacter({ commit }, id: number) {
      commit("SET_CHARACTER_LOADING_STATUS", "loading");
      axios
        .get<Character>(`${BASE_URL}/character/${id}`)
        .then((response) => {
          commit("SET_CHARACTER_LOADING_STATUS", "loaded");
          commit("SET_CHARACTER", response.data);
        })
        .catch(() => {
          createToast("Something went wrong when fetching the character...", {
            type: "danger",
          });
        });
    },
  },
  modules: {},
});
