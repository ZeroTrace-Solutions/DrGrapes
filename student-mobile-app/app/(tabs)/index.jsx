import React, { useRef } from 'react';
import { ScrollView, Text, View, Image, Pressable, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTabBarVisibility } from './_layout';
import { styled } from 'nativewind';

const StyledPressable = styled(Pressable);
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function FeedScreen() {
  const { show, hide } = useTabBarVisibility();
  const lastScrollY = useRef(0);

  const onScroll = (event) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    const diff = currentScrollY - lastScrollY.current;
    
    if (Math.abs(diff) < 20 || currentScrollY < 10) return;

    if (diff > 0 && currentScrollY > 80) {
      hide();
    } else if (diff < -15) {
      show();
    }
    lastScrollY.current = currentScrollY;
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView 
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header Section */}
        <View className="px-container-margin mt-xl mb-lg">
          <View className="flex-row justify-between items-end">
            <View>
              <Text className="label-caps text-primary mb-xs">Market Highlights</Text>
              <Text className="display-lg text-on-surface">Bestsellers</Text>
            </View>
            <StyledPressable className="border border-outline-variant rounded-full px-md py-xs active:opacity-70">
              <Text className="body-sm text-outline">View All</Text>
            </StyledPressable>
          </View>
        </View>

        {/* Bestsellers Horizontal Scroll */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 20, paddingRight: 10 }}
          className="mb-xl"
        >
          <BestsellerCard 
            image={require('../../assets/images/elite_stethoscope_1776953817192.png')} 
            title="Elite Stethoscope"
            desc="Precision diagnostic tool"
            price="$189.00"
          />
          <BestsellerCard 
            image={require('../../assets/images/surgical_tool_advanced_1776953838738.png')} 
            title="Advanced Laser"
            desc="The 2024 Surgical Pen"
            price="$85.50"
          />
        </ScrollView>

        {/* Market Banner */}
        <View className="px-container-margin mb-xl">
          <StyledPressable className="accent-gradient rounded-xl p-lg flex-row items-center justify-between overflow-hidden shadow-lg shadow-primary/20">
            <View className="flex-1">
              <Text className="headline-md text-white font-bold mb-xs">The Market</Text>
              <Text className="body-sm text-white/80">Explore professional medical tools & resources</Text>
            </View>
            <View className="bg-white/20 rounded-full p-sm">
              <Ionicons name="arrow-forward" size={20} color="white" />
            </View>
            {/* Abstract Icon Decoration */}
            <View className="absolute -right-4 -bottom-4 opacity-10">
              <Ionicons name="cart" size={100} color="white" />
            </View>
          </StyledPressable>
        </View>

        {/* Unfinished Quizzes Section */}
        <View className="px-container-margin mb-xl">
          <View className="flex-row justify-between items-center mb-md">
            <Text className="headline-md text-on-surface">Unfinished Quizzes</Text>
            <Text className="label-caps text-error">3 Pending</Text>
          </View>

          <QuizCard 
            icon="brain"
            module="Module 4"
            title="Neuroscience Basics"
            progress={0.6}
            stats="12/20 Questions answered"
            color="primary"
          />

          <QuizCard 
            icon="heart"
            module="Module 2"
            title="Cardiac Pathology"
            progress={0.85}
            stats="45/50 Questions answered"
            color="secondary"
          />
        </View>

        {/* Upcoming Contests Section */}
        <View className="px-container-margin mb-xl">
          <Text className="headline-md text-on-surface mb-md">Upcoming Contests</Text>
          <View className="bg-surface-container rounded-xl p-md">
            <ContestCard 
              title="Grand Medical Decathlon"
              time="Starts in: 2d 14h 22m"
              prize="$5,000"
              prizeType="PRIZE POOL"
            />
            <View className="h-[1px] bg-outline-variant my-md" />
            <ContestCard 
              title="Surgical Precision Cup"
              time="Starts in: 5d 08h 10m"
              prize="Scholarship"
              prizeType="AWARD"
            />
          </View>
        </View>

        {/* Saved Items Section */}
        <View className="px-container-margin">
          <View className="flex-row justify-between items-center mb-md">
            <Text className="headline-md text-on-surface">Saved Items</Text>
            <Ionicons name="bookmark-outline" size={20} color="#a48a93" />
          </View>
          <View className="flex-row justify-between">
            <SavedItemCard 
              icon="book"
              title="Bio-Chemistry Notes"
              updated="Updated yesterday"
              className="bg-surface-container"
            />
            <SavedItemCard 
              icon="videocam"
              title="ER Case Study #44"
              updated="Video • 12 mins"
              className="bg-surface-container"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function BestsellerCard({ image, title, desc, price }) {
  return (
    <View className="bg-surface-container-low rounded-xl w-48 mr-md overflow-hidden border border-outline-variant/30">
      <View className="h-40 w-full bg-surface-container-highest">
        <Image source={image} className="w-full h-full" resizeMode="cover" />
      </View>
      <View className="p-md">
        <Text className="title-sm text-on-surface mb-xs" numberOfLines={1}>{title}</Text>
        <Text className="body-sm text-on-surface-variant mb-md" numberOfLines={1}>{desc}</Text>
        <View className="flex-row justify-between items-center">
          <Text className="body-md font-bold text-on-surface">{price}</Text>
          <StyledPressable className="bg-primary-container p-xs rounded-full active:scale-90">
            <Ionicons name="cart" size={16} color="white" />
          </StyledPressable>
        </View>
      </View>
    </View>
  );
}

function QuizCard({ icon, module, title, progress, stats, color }) {
  const progressBarColor = color === 'primary' ? 'bg-primary-container' : 'bg-secondary-container';
  const iconBg = color === 'primary' ? 'bg-primary-container/10' : 'bg-secondary-container/10';
  const iconColor = color === 'primary' ? '#c13584' : '#0d36c3';

  return (
    <View className="bg-surface-container rounded-xl p-lg mb-md">
      <View className="flex-row justify-between items-start mb-md">
        <View className={`w-12 h-12 rounded-lg ${iconBg} items-center justify-center`}>
          <Ionicons name={icon} size={24} color={iconColor} />
        </View>
        <View className={`${progressBarColor} rounded-full px-sm py-xs`}>
          <Text className="text-[10px] text-white font-bold uppercase">{module}</Text>
        </View>
      </View>
      
      <Text className="title-sm text-on-surface mb-xs">{title}</Text>
      <Text className="body-sm text-on-surface-variant mb-md">{stats}</Text>
      
      {/* Progress Bar */}
      <View className="h-1.5 w-full bg-surface-container-highest rounded-full mb-lg overflow-hidden">
        <View className={`h-full ${progressBarColor}`} style={{ width: `${progress * 100}%` }} />
      </View>

      <StyledPressable className="bg-surface-container-highest rounded-full py-md items-center active:bg-surface-container-high transition-colors">
        <Text className="body-sm text-on-surface font-bold">Resume Quiz</Text>
      </StyledPressable>
    </View>
  );
}

function ContestCard({ title, time, prize, prizeType }) {
  return (
    <View className="flex-row justify-between items-center">
      <View className="flex-1 flex-row items-center">
        <View className="w-12 h-12 rounded-full bg-surface-container-highest mr-md overflow-hidden">
          <Image source={{ uri: 'https://i.pravatar.cc/100' }} className="w-full h-full" />
        </View>
        <View className="flex-1">
          <Text className="title-sm text-on-surface" numberOfLines={1}>{title}</Text>
          <Text className="body-sm text-on-surface-variant">{time}</Text>
        </View>
      </View>
      <View className="items-end ml-md">
        <Text className="title-sm text-primary">{prize}</Text>
        <Text className="text-[8px] text-outline-variant font-bold tracking-widest">{prizeType}</Text>
      </View>
    </View>
  );
}

function SavedItemCard({ icon, title, updated }) {
  return (
    <View className="bg-surface-container rounded-xl p-md w-[48%] min-h-[160px] justify-between">
      <View className="w-10 h-10 rounded-lg bg-surface-container-highest items-center justify-center mb-md">
        <Ionicons name={icon} size={20} color="#dcbfc9" />
      </View>
      <View>
        <Text className="title-sm text-on-surface mb-xs" numberOfLines={2}>{title}</Text>
        <Text className="text-[10px] text-on-surface-variant">{updated}</Text>
      </View>
    </View>
  );
}
