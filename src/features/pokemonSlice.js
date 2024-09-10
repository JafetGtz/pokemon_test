import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchPokemons = createAsyncThunk(
  "pokemon/fetchPokemons",
  async ({ page }, { getState }) => {
    const limit = 20;
    const offset = limit * (page - 1);
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    return { results: response.data.results, page };
  }
);


export const fetchPokemonDetails = createAsyncThunk(
  "pokemon/fetchPokemonDetails",
  async (url) => {
    const response = await axios.get(url);
    return response.data;
  }
);

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    pokemons: [],
    status: "idle",
    error: null,
    page: 1,
    selectedPokemon: null,
  },
  reducers: {
    resetPokemons: (state) => {
      state.pokemons = [];
      state.page = 1;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload.page === 1) {
          state.pokemons = action.payload.results;
        } else {
          state.pokemons = [...state.pokemons, ...action.payload.results];
        }
        state.page = action.payload.page;
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchPokemonDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPokemonDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedPokemon = action.payload;
      })
      .addCase(fetchPokemonDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetPokemons } = pokemonSlice.actions;
export default pokemonSlice.reducer;
