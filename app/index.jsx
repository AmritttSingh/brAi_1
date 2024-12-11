//app\index.jsx
import { View } from 'react-native';
import { Redirect } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';

export default function Index() {
  const { user } = useUser();

  return (
    <View>
      {!user ? <Redirect href="/login" /> : <Redirect href="(tabs)" />}
    </View>
  );
}
