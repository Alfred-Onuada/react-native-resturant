import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { router, Stack } from 'expo-router';
import { RootSiblingParent } from 'react-native-root-siblings';
import { getUserType } from './services/auth';
import storage from './utils/storage';

export default function App() {
  const [registerClicked, setRegisterClicked] = useState(false);
  const [loginClicked, setLoginClicked] = useState(false);

  function handleRegisterClick() {
    setRegisterClicked(true);

    setTimeout(() => {
      setRegisterClicked(false)
    }, 200);

    router.replace('/register');
  }

  function handleLoginClick() {
    setLoginClicked(true);

    setTimeout(() => {
      setLoginClicked(false)
    }, 200);
    
    router.replace('/login');
  }

  useEffect(() => {
    (async () => {
      try {
        const userType = await getUserType();

        if (userType === 'user') {
          router.replace('/user/menu');
        } else if (userType === 'waiter') {
          router.replace('/waiter/incoming')
        } else if (userType === 'admin') {
          router.replace('/admin/menu-management')
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [])

  return (
    <RootSiblingParent>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />

        <View style={styles.homeContainer}>
          <View style={styles.welcomeContainer}>
            <Image source={require('./../assets/logo.jpeg')} style={styles.image}></Image>
            <Text style={styles.welcomeTo}>Welcome to</Text>
            <Text style={styles.name}>Gourmet Palmer</Text>
            <Text style={styles.gladTo}>We are glad to serve you</Text>
          </View>

          <View style={styles.btnContainer}>
            <TouchableOpacity style={[styles.btn, registerClicked && styles.clickedBtn]} onPress={() => handleRegisterClick()}>
              <Text style={[styles.btnText, registerClicked && styles.clickedBtnText]}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, loginClicked && styles.clickedBtn]} onPress={() => handleLoginClick()}>
              <Text style={[styles.btnText, loginClicked && styles.clickedBtnText]}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
        <StatusBar style="dark" />
      </View>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cbc0aa',
  },
  homeContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  btnContainer: {
    marginBottom: 50
  },
  btn: {
    borderWidth: 2,
    width: 200,
    paddingVertical: 15,
    marginVertical: 10,
  },
  btnText: {
    textAlign: 'center',
    fontSize: 20
  },
  clickedBtn: {
    backgroundColor: 'black'
  },
  clickedBtnText: {
    color: 'white'
  },
  welcomeTo: {
    fontSize: 24,
  },
  name: {
    fontSize: 50,
  },
  gladTo: {
    fontSize: 24,
  },
  welcomeContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 220
  },
  image: {
    width: 100,
    height: 100
  }
});
