import { Stack } from 'expo-router';
import { View } from 'react-native';
import { MenuProvider } from '../context/MenuContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GlobalMenu } from '../components/GlobalMenu';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_600SemiBold,
        Inter_700Bold
    });
    if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: '#CAEAE1' }} />;
  }
    return (
        <SafeAreaProvider>
            <MenuProvider>
                <Stack screenOptions={{ headerShown: false }}/>
                <GlobalMenu />
            </MenuProvider>
        </SafeAreaProvider> 
    )
}