import React from "react";
import { Formik, ErrorMessage } from "formik";
import { object, string } from 'yup';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import {globalS} from '@/styles/global';
import FlatButton from '@/shared/button';


const LoginSchema = object().shape({
    name: string().required("User name is required"),
    password: string().required("Password is required").min(5, "Password is too short - should be 5 chars minimum")
});


export default function LoginFormik() {


    return (
        <View >
            <Formik
                initialValues={{
                    name: '',
                    password: ''
                }}
                onSubmit={(values, actions) => {
                    actions.resetForm();
                }}
                validationSchema={LoginSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
                    <View>
                        <TextInput
                            style={globalS.input}
                            placeholder="user name"
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
                            // keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <Text style={globalS.error}>{touched.name && errors.name}</Text>

                        <TextInput
                            style={globalS.input}
                            placeholder="password"
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry
                        />
                        <Text style={globalS.error}>{touched.password && errors.password}</Text>

                        <FlatButton text="Login" onPress={handleSubmit} />
                    </View>
                )}
            </Formik>
        </View>
    );
}

const styles = StyleSheet.create({

   
});
