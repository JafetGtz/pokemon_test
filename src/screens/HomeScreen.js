import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemons, resetPokemons } from "../features/pokemonSlice";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { pokemons, status, page } = useSelector((state) => state.pokemon);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPokemons({ page: 1 }));
    }
  }, [dispatch, status]);

  const onRefresh = () => {
    dispatch(resetPokemons());
    dispatch(fetchPokemons({ page: 1 }));
  };

  const loadMore = () => {
    if (!loadingMore && status !== "loading") {
      setLoadingMore(true);
      dispatch(fetchPokemons({ page: page + 1 })).then(() => {
        setLoadingMore(false);
      });
    }
  };

  const renderItem = ({ item, index }) => {
    const backgroundColor = index % 2 === 0 ? "#f0f8ff" : "#e6e6fa";
    return (
      <View style={[styles.itemContainer, { backgroundColor }]}>
        <Text style={styles.pokemonName}>{item.name}</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("PokemonDetails", { pokemon: item })
          }
        >
          <Text style={styles.detailsButton}>Ver detalle</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {status === "loading" && page === 1 ? (
        <Text style={styles.loadingText}>Cargando...</Text>
      ) : null}

      <FlatList
        data={pokemons}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        refreshControl={
          <RefreshControl
            refreshing={status === "loading" && page === 1}
            onRefresh={onRefresh}
          />
        }
        ListFooterComponent={
          loadingMore ? <ActivityIndicator size="large" /> : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  pokemonName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  detailsButton: {
    fontSize: 16,
    color: "#1e90ff",
  },
  loadingText: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 10,
  },
});

export default HomeScreen;
