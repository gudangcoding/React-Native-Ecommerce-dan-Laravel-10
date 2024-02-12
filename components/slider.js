// Import library
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';


// Data untuk slide
const slides = [
  { id: 1, text: 'Slide 1', backgroundColor: '#3498db' },
  { id: 2, text: 'Slide 2', backgroundColor: '#2ecc71' },
  { id: 3, text: 'Slide 3', backgroundColor: '#e74c3c' },
];

const Slider = () => {
  return (
    <Swiper
      style={styles.wrapper}
      showsButtons={true} // Menampilkan tombol navigasi
      loop={false} // Untuk tidak membuat efek loop pada slide
    >
      {slides.map((slide) => (
        <View key={slide.id} style={[styles.slide, { backgroundColor: slide.backgroundColor }]}>
          <Text style={styles.text}>{slide.text}</Text>
        </View>
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    // Style untuk wrapper Swiper
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default Slider;
