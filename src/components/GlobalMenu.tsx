import { useMenu } from '../context/MenuContext';
import { SidebarMenu } from './ui/SidebarMenu';
import { useRouter } from 'expo-router';

const routes = {
    accounts: '/accounts',
    table: '/',
    home: '/home'
} as const;


export const GlobalMenu = () => {
    const { isMenuVisible, closeMenu } = useMenu();
    const router = useRouter()
    
    const handleItemPress = (id: string) => {
        const route = routes[id as keyof typeof routes]
        if (route) {
            router.navigate(route)
        }
        console.log(`Глобальный переход в: ${id}`);
        closeMenu();
    };
    return (
        <SidebarMenu 
        visible={isMenuVisible} 
        onClose={closeMenu} 
        onItemPress={handleItemPress}
        />
    );
}