import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withDelay,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedText = Animated.createAnimatedComponent(SvgText);

const Firework = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newParticles = Array.from({ length: 10 }).map(() => ({
        id: Math.random().toString(),
        x: Math.random() * width,
        y: Math.random() * (height),
        delay: Math.random() * 2000, // Random delay for each particle
        text: '' // Optional: A spark effect with emoji
      }));
      setParticles(newParticles);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={StyleSheet.absoluteFill}>
      <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
        {particles.map(({ id, x, y, delay, text }) => (
          <AnimatedParticle key={id} x={x} y={y} delay={delay} text={text} />
        ))}
      </Svg>
    </View>
  );
};

const AnimatedParticle = ({ x, y, delay, text }) => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    scale.value = withDelay(
      delay,
      withTiming(1, { duration: 600, easing: Easing.out(Easing.ease) })
    );

    opacity.value = withDelay(
      delay,
      withTiming(0, { duration: 600, easing: Easing.in(Easing.ease) })
    );
  }, []);

  const animatedProps = useAnimatedProps(() => ({
    r: scale.value * 20, // Expanding effect
    opacity: opacity.value,
  }));

  return (
    <>
      <AnimatedCircle cx={x} cy={y} fill="rgba(255, 215, 0, 0.8)" animatedProps={animatedProps} />
      <AnimatedText
        x={x}
        y={y}
        fontSize="16"
        fill="white"
        textAnchor="middle"
        animatedProps={{ opacity: opacity.value }}
      >
        {text}
      </AnimatedText>
    </>
  );
};

export default Firework;
