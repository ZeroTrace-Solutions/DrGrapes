import { Ionicons } from '@expo/vector-icons';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
import { styled } from 'nativewind';
import { createContext, useContext } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BAR_WIDTH = 356;
const BAR_HEIGHT = 64;

// Create styled components to inherit styles from global.css
const StyledView = styled(View);
const StyledIonicons = styled(Ionicons);

// Scroll Context to handle hide/show navbar
const TabBarVisibilityContext = createContext({
    translateY: { value: 0 },
    show: () => { },
    hide: () => { },
});

export const useTabBarVisibility = () => useContext(TabBarVisibilityContext);

/**
 * TabLayout implements the "Social Professionalism" floating pill navigation.
 */
export default function TabLayout() {
    const translateY = useSharedValue(0);

    const show = () => { translateY.value = withTiming(0, { duration: 300 }); };
    const hide = () => { translateY.value = withTiming(120, { duration: 300 }); };

    return (
        <TabBarVisibilityContext.Provider value={{ translateY, show, hide }}>
            <Tabs
                tabBar={(props) => <AnimatedTabBar {...props} />}
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: 'white',
                    tabBarInactiveTintColor: '#a48a93',
                    safeAreaInsets: { bottom: 0, top: 0, left: 0, right: 0 },
                    tabBarStyle: {
                        width: BAR_WIDTH,
                        height: BAR_HEIGHT,
                        borderRadius: BAR_HEIGHT / 2,
                        borderColor: '#a48a93',
                        borderWidth: 1,
                        backgroundColor: 'transparent',
                        borderTopWidth: 0,
                        justifyContent: 'center',
                        elevation: 0,
                        shadowColor: 'transparent',
                    },
                    tabBarBackground: () => (
                        <View style={styles.backgroundWrapper}>
                            <SmokyBackground />
                        </View>
                    ),
                    tabBarItemStyle: {
                        height: BAR_HEIGHT,
                        justifyContent: 'center',
                        alignItems: 'center',
                    },
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Home',
                        tabBarIcon: ({ focused }) => (
                            <TabIcon name={focused ? 'home' : 'home-outline'} focused={focused} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="bank"
                    options={{
                        title: 'Bank',
                        tabBarIcon: ({ focused }) => (
                            <TabIcon name={focused ? 'library' : 'library-outline'} focused={focused} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="market"
                    options={{
                        title: 'Market',
                        tabBarIcon: ({ focused }) => (
                            <TabIcon name={focused ? 'bag-handle' : 'bag-handle-outline'} focused={focused} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="community"
                    options={{
                        title: 'Community',
                        tabBarIcon: ({ focused }) => (
                            <TabIcon name={focused ? 'people' : 'people-outline'} focused={focused} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: 'Profile',
                        tabBarIcon: ({ focused }) => (
                            <TabIcon name={focused ? 'person' : 'person-outline'} focused={focused} />
                        ),
                    }}
                />
            </Tabs>
        </TabBarVisibilityContext.Provider>
    );
}

/**
 * Animated TabBar wrapper
 */
function AnimatedTabBar(props) {
    const { translateY } = useTabBarVisibility();

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    return (
        <Animated.View style={[styles.animatedBarContainer, animatedStyle]}>
            <View style={styles.barCenteringWrapper}>
                <BottomTabBar {...props} />
            </View>
        </Animated.View>
    );
}

/**
 * Smoky Background Component
 */
function SmokyBackground() {
    return (
        <View style={styles.smokyContainer}>
            <Svg
                width={SCREEN_WIDTH}
                height="80"
                viewBox="0 0 390 46"
                preserveAspectRatio="none"
                style={{ bottom: -10 }}
            >
                <Path
                    d="M-6.58012 18.5801C-3.79241 8.01186 6.97033 1.65787 17.5824 4.31532L63.4267 15.7955C66.0419 16.4504 68.7615 16.5703 71.4221 16.148L93.168 12.6963C96.9058 12.103 100.396 10.4607 103.234 7.96036L110.906 1.2001C116.435 -3.67113 124.201 -5.09929 131.114 -2.51587L164.13 9.82226C167.57 11.108 171.296 11.4228 174.9 10.7322L229.604 0.248914C232.105 -0.230346 234.675 -0.227259 237.177 0.258009L318.55 16.0432C321.086 16.5351 323.692 16.5351 326.225 16.0326L371.792 7.05586C381.368 5.16934 390.92 10.4758 394.389 19.6094L395.864 23.495C400.929 36.8299 390.825 51.0048 376.576 50.5548L194 44.7881L11.7447 49.7691C-1.60968 50.134 -11.5848 37.553 -8.17881 24.6408L-6.58012 18.5801Z"
                    fill="#282828"
                    fillOpacity="0.9"
                />
            </Svg>
        </View>
    );
}

/**
 * Custom TabIcon
 */
function TabIcon({ name, focused }) {
    return (
        <StyledView
            className={focused ? "tab-bubble-active" : "w-12 h-12 items-center justify-center"}
        >
            <StyledIonicons
                name={name}
                size={24}
                className={focused ? "text-white" : "text-on-surface-variant"}
            />
        </StyledView>
    );
}

const styles = StyleSheet.create({
    animatedBarContainer: {
        position: 'absolute',
        bottom: 18.83,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        height: BAR_HEIGHT,
    },
    barCenteringWrapper: {
        width: BAR_WIDTH,
        height: BAR_HEIGHT,
    },
    backgroundWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    glassContainer: {
        width: BAR_WIDTH,
        height: BAR_HEIGHT,
        borderRadius: BAR_HEIGHT / 2,
        overflow: 'hidden',
        borderWidth: 0,
    },
    smokyContainer: {
        position: 'absolute',
        bottom: -20,
        width: SCREEN_WIDTH,
        height: 100,
        justifyContent: 'flex-end',
        pointerEvents: 'none',
    }
});
