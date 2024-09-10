import React from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";
import { Formik } from "formik";
import { LoginSchema } from "../validation/validationSchemas";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleLogin = (values) => { 
    dispatch(login());
    navigation.navigate("PokemonList");
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values) => handleLogin(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <Text>Email:</Text>
            <TextInput
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              style={styles.input}
            />
            {errors.email && touched.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}

            <Text>Password:</Text>
            <TextInput
              value={values.password}
              onChangeText={handleChange("password")}
             
              secureTextEntry
              style={styles.input}
            />
            {errors.password && touched.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}
            <Button title="Iniciar sesión" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
  },
  error: {
    color: "red",
    fontSize: 12,
  },
});

export default LoginScreen;
