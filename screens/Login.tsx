import React from "react";
import { Formik, ErrorMessage } from "formik";
import { object, string } from "yup";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { globalStyles } from "@/styles/global";
import FlatButton from "@/shared/button";

const LoginSchema = object().shape({
  name: string().required("User name is required"),
  password: string()
    .required("Password is required")
    .min(5, "Password is too short - should be 5 chars minimum"),
});

type screenProps = {
  navigation: any;
};
export default function Login(props: screenProps) {
  return (
    <View style={globalStyles.container}>
      <Formik
        initialValues={{
          name: "",
          password: "",
        }}
        onSubmit={(values, actions) => {
          props.navigation.replace("Home");
        }}
        validationSchema={LoginSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <View>
            <TextInput
              style={globalStyles.input}
              placeholder="user name"
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
              autoCapitalize="none"
            />
            <Text style={globalStyles.error}>{touched.name && errors.name}</Text>

            <TextInput
              style={globalStyles.input}
              placeholder="password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry
            />
            <Text style={globalStyles.error}>
              {touched.password && errors.password}
            </Text>

            <FlatButton text="Login" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
}
