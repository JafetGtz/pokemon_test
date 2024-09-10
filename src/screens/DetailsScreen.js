import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemonDetails } from "../features/pokemonSlice";

const DetailsScreen = ({ route }) => {
  const { pokemon } = route.params;
  const dispatch = useDispatch();
  const { selectedPokemon, status } = useSelector((state) => state.pokemon);

  useEffect(() => {
    dispatch(fetchPokemonDetails(pokemon.url));
  }, [dispatch, pokemon.url]);

  if (status === "loading") {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      {selectedPokemon && (
        <View style={styles.card}>
          <Text style={styles.name}>Nombre: {selectedPokemon.name}</Text>
          {selectedPokemon.sprites?.front_default && (
            <Image
              source={{ uri: selectedPokemon.sprites.front_default }}
              style={styles.image}
            />
          )}
          <Text style={styles.detailText}>
            Altura: {selectedPokemon.height / 10} m
          </Text>
          <Text style={styles.detailText}>
            Peso: {selectedPokemon.weight / 10} kg
          </Text>
          <Text style={styles.detailText}>
            Tipo(s):{" "}
            {selectedPokemon.types.map((type) => type.type.name).join(", ")}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f8ff", 
  },
  card: {
    backgroundColor: "#fff", 
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    marginVertical: 10,
    width: "90%",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  detailText: {
    fontSize: 16,
    color: "#666",
    marginVertical: 5,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DetailsScreen;
