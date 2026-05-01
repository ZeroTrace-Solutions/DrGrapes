import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SearchablePicker({ label, placeholder, value, onSelect, items = [], zIndex = 0 }) {
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState(value);
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    if (searchQuery) {
      const filtered = items.filter(item =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(items);
    }
  }, [searchQuery, items]);

  const handleSelect = (item) => {
    setSearchQuery(item);
    onSelect(item);
    setShowDropdown(false);
    setIsFocused(false);
  };

  return (
    <View style={{ zIndex }} className="w-full gap-sm">
      <Text className="text-xs font-bold tracking-widest text-on-surface-variant uppercase ml-1">
        {label}
      </Text>

      <View className="relative z-50">
        <View className="absolute left-4 top-0 bottom-0 justify-center z-10">
          <MaterialIcons name="search" size={20} color={isFocused ? "#c13584" : "#a48a93"} />
        </View>

        <TextInput
          style={{
            backgroundColor: '#1e2020',
            borderColor: isFocused ? '#c13584' : '#262626',
            borderWidth: 2,
            color: '#e2e2e2',
            paddingLeft: 48,
            paddingRight: 48,
            height: 56,
            borderRadius: 28,
            fontSize: 16
          }}
          placeholder={placeholder}
          placeholderTextColor="#a48a93"
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            setShowDropdown(true);
          }}
          onFocus={() => {
            setIsFocused(true);
            setShowDropdown(true);
          }}
          onBlur={() => {
            // Delay hide to allow selection
            setTimeout(() => {
              setIsFocused(false);
              setShowDropdown(false);
            }, 200);
          }}
        />

        <View className="absolute right-4 top-0 bottom-0 justify-center z-10">
          <MaterialIcons
            name={showDropdown ? "expand-less" : "expand-more"}
            size={24}
            color="#a48a93"
          />
        </View>

        {showDropdown && filteredItems.length > 0 && (
          <View
            className="absolute top-[64px] left-0 right-0 bg-[#1e2020] rounded-2xl border border-white/5 shadow-2xl overflow-hidden z-50"
            style={{ maxHeight: 250 }}
          >
            <ScrollView
              bounces={false}
              nestedScrollEnabled={true}
              keyboardShouldPersistTaps="handled"
            >
              {filteredItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleSelect(item)}
                  className={`px-lg py-md border-b border-white/5 ${value === item ? 'bg-primary-container/20' : ''}`}
                >
                  <Text className={`text-base ${value === item ? 'text-primary-container font-bold' : 'text-on-surface'}`}>
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
}
