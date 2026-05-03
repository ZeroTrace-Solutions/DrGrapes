import React, { useRef } from 'react';
import { ScrollView, Text, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTabBarVisibility } from './_layout';
import { styled } from 'nativewind';

// Components
import HomeTopHeader from '../../components/home/HomeTopHeader';
import BestsellerCard from '../../components/home/BestsellerCard';
import MarketBanner from '../../components/home/MarketBanner';
import QuizCard from '../../components/home/QuizCard';
import ContestCard from '../../components/home/ContestCard';
import SavedItemCard from '../../components/home/SavedItemCard';

const StyledPressable = styled(Pressable);

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
        {/* Top Action Header */}
        <HomeTopHeader />

        {/* Header Section */}
        <View className="px-container-margin mt-md mb-lg">
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
        <MarketBanner />

        {/* Unfinished Quizzes Section */}
        <View className="px-container-margin mb-xl">
          <View className="flex-row justify-between items-center mb-md">
            <Text className="headline-md text-on-surface">Unfinished Quizzes</Text>
            <Text className="label-caps text-error">3 Pending</Text>
          </View>

          <QuizCard 
            icon="school"
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
            />
            <SavedItemCard 
              icon="videocam"
              title="ER Case Study #44"
              updated="Video • 12 mins"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
