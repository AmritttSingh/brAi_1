//app\login\index.jsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useOAuth, useUser } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';

export default function LoginScreen() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/(tabs)/home', { scheme: 'myapp' }),
      });

      if (createdSessionId) {
        console.log('OAuth Success, Created Session ID:', createdSessionId);
      } else {
        console.log('OAuth flow completed without session creation.');
      }
    } catch (err) {
      console.error('OAuth error:', err);
    }
  }, [startOAuthFlow]);

  return (
    <ImageBackground
      source={require('./../../assets/images/bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <Image
        source={require('./../../assets/images/logo1.png')}
        style={{ width: '100%', height: '60%' }}
      />

      <View style={styles.loginContainer}>
        <Text style={styles.welcomeText}>Welcome to brAi</Text>
        <Text style={styles.sloganText}>Imaginations Amplified</Text>

        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1, // Ensures the background image spans the entire screen
  },
  loginContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    height: '70%', // Maintains container layout
  },
  welcomeText: {
    fontSize: 30, // Updated font size
    fontWeight: 'bold', // Updated font weight
    textAlign: 'center', // Ensures text is centered
    marginBottom: 10,
  },
  sloganText: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();
