import { Link, router, Stack } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import showToast from './utils/showToast';
import { RootSiblingParent } from 'react-native-root-siblings';
import { loginAPI } from './services/auth';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  async function login() {
    try {
      setLoading(true);
      const userType = await loginAPI(email, password);

      if (userType === 'user') {
        router.replace('/user/menu');
      } else if (userType === 'waiter') {
        router.replace('/waiter/incoming')
      } else if (userType === 'admin') {
        router.replace('/admin/menu-management')
      } else {
        showToast({msg: "Something isn't quite right, please try again", danger: true});
      }
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
        
        <Text style={styles.title}>Let's get you back into your account</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#A9A9A9"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#A9A9A9"
          secureTextEntry={!passwordIsVisible}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.showPassword} onPress={() => setPasswordIsVisible(!passwordIsVisible)}>
          <Text style={{...styles.buttonText, color: 'black'}}>{passwordIsVisible ? 'Hide' : 'Show'} password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => login()}>
          <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Login'}</Text>
        </TouchableOpacity>
        <View style={styles.loginInstead}>
          <Text style={styles.alreadyHave}>Don't have one?</Text>
          <Link href="/register">
            <Text style={styles.loginText}>Register</Text>
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
  showPassword: {
    width: '100%',
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
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
    fontSize: 20,
    color: '#ffffff',
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
  }
});
