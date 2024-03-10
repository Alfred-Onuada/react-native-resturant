import { Link, router, Stack } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { registerAPI } from './services/auth';
import { RootSiblingParent } from 'react-native-root-siblings';
import showToast from './utils/showToast';

export default function Register() {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  async function register() {
    try {
      setLoading(true);
      const data = { fullname, email, phone, password };
      await registerAPI(data);

      router.replace('/user/menu');
    } catch (error: any) {
      showToast({msg: error.message, danger: true});
    } finally {
      setLoading(false);
    }
  }

  return (
    <RootSiblingParent>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />

        <Text style={styles.title}>Create an Account</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#A9A9A9"
          value={fullname}
          onChangeText={setFullname}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#A9A9A9"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          placeholderTextColor="#A9A9A9"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#A9A9A9"
          secureTextEntry={!passwordIsVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.showPassword} onPress={() => setPasswordIsVisible(!passwordIsVisible)}>
          <Text style={{...styles.buttonText, color: 'black'}}>{passwordIsVisible ? 'Hide' : 'Show'} password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={register} disabled={loading}>
          <Text style={styles.buttonText}>{ loading === false ? 'Register' : 'Registering...'}</Text>
        </TouchableOpacity>
        <View style={styles.loginInstead}>
          <Text style={styles.alreadyHave}>Already have one?</Text>
          <Link href="/login">
            <Text style={styles.loginText}>Login</Text>
          </Link>
        </View>
      </View>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    marginBottom: 35,
    color: '#000000',
  },
  input: {
    width: '100%',
    height: 60,
    borderWidth: 1,
    borderColor: '#A9A9A9',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 18
  },
  button: {
    width: '100%',
    height: 60,
    backgroundColor: '#8d8066',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  loginInstead: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row'
  },
  alreadyHave: {
    fontSize: 18,
    marginRight: 5
  },
  loginText: {
    fontSize: 18,
    color: '#8d8066'
  },
  showPassword: {
    width: '100%',
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
});
