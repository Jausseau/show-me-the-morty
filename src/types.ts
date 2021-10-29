export interface Origin {
  name: string;
  url: string;
}

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: [];
  url: string;
  created: string;
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Location;
  image: string;
  episode: [];
  string: string;
  created: string;
}

export interface CharactersApi {
  info: { count: number; pages: number; next?: string; prev?: string };
  results: Character[];
}

export type CharacterStatus = "all" | "alive" | "dead" | "unknown";
export type LoadingStatus = "idle" | "loading" | "loaded" | "error";
export type Parameters = { prop: string; value: string }[];
