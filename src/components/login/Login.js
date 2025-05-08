import React from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Formik } from 'formik';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid Email').required('Required'),
  password: Yup.string().required('Required'),
});

const App = () => {
  const [loading, setLoading] = React.useState(false);
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validateOnMount={true}
      validationSchema={LoginSchema}
      onSubmit={(values) => {
        setLoading(true);
        setTimeout(() => setLoading(false), 2000); // Simulated login process
      }}
    >
      {({ handleChange, values, touched, setFieldTouched, errors, handleSubmit }) => (
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.container}>
            {loading ? (
              <ActivityIndicator size="large" color="#3b5998" />
            ) : (
              <>
                <View style={styles.imageContainer}>
                  <Image
                    source={require('./src/images/spin.webp')}
                    style={styles.image}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.loginText}>Login</Text>

                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="Email id"
                    placeholderTextColor="#888"
                    style={styles.textInput}
                    keyboardType="email-address"
                    onChangeText={handleChange('email')}
                    value={values.email}
                    onBlur={() => setFieldTouched('email')}
                  />
                </View>

                <View style={styles.errorContainer}>
                  {touched.email && errors.email && (
                    <Text style={styles.errortxt}>{errors.email}</Text>
                  )}
                </View>

                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="Password"
                    placeholderTextColor="#888"
                    style={styles.textInput}
                    secureTextEntry={secureTextEntry}
                    onChangeText={handleChange('password')}
                    value={values.password}
                    onBlur={() => setFieldTouched('password')}
                  />
                  <TouchableOpacity onPress={toggleSecureTextEntry}>
                    <MaterialIcons
                      name={secureTextEntry ? 'visibility' : 'visibility-off'}
                      color="black"
                      size={25}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.errorContainer}>
                  {touched.password && errors.password && (
                    <Text style={styles.errortxt}>{errors.password}</Text>
                  )}
                </View>

                <TouchableOpacity onPress={handleSubmit} style={styles.loginButton}>
                  <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </SafeAreaView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    paddingHorizontal: 25,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 170,
    borderRadius: 10,
  },
  loginText: {
    fontSize: 30,
    color: '#333',
    marginVertical: 30,
    fontFamily: 'Roboto-Medium',
    color: 'green',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 10,
  },
  textInput: {
    flex: 1,
    paddingVertical: 0,
    fontSize: 18,
    color: 'black',
  },
  errorContainer: {
    marginBottom: 25,
  },
  errortxt: {
    color: 'red',
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#3b5998',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  loginButtonText: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 18,
    color: '#fff',
  },
});

export default App;