import React, {useRef} from 'react';
import {
  Animated,
  Text,
  View,
  StyleSheet,
  Button,
  SafeAreaView,
} from 'react-native';

const App = () => {
  // fadeAnim will be used as the value for opacity. Initial Value: 0
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const positionAnim = useRef(new Animated.Value(0)).current;
  const bouncePosition = useRef(new Animated.Value(800)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
    shiftHorizontal();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: true,
    }).start();
    shiftToOriginal();
  };

  const shiftHorizontal = () => {
    Animated.timing(positionAnim, {
      toValue: 50,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };

  const shiftToOriginal = () => {
    Animated.timing(positionAnim, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };

  const handleBounce = () => {
    Animated.spring(bouncePosition, {
      toValue: -100,
      friction: 7, // determines the bounciness, less friction=more bounce. default value is 7
      tension: 20, //determines the velocity. default value is 20
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.box,
          {
            opacity: fadeAnim,
            transform: [
              {
                translateX: positionAnim,
              },
              {
                translateY: positionAnim,
              },
            ],
          },
        ]}></Animated.View>

      <Animated.View
        style={[
          styles.circle,
          {
            transform: [
              {
                translateY: bouncePosition,
              },
            ],
          },
        ]}></Animated.View>
      <View style={styles.buttonRow}>
        <Button title="Fade In View" onPress={fadeIn} />
        <Button title="Fade Out View" onPress={fadeOut} />
        <Button title="Bounce" onPress={handleBounce} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fadingContainer: {
    padding: 20,
    backgroundColor: 'powderblue',
  },
  fadingText: {
    fontSize: 28,
  },
  buttonRow: {
    flexBasis: 100,
    justifyContent: 'space-evenly',
    marginVertical: 16,
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'green',
  },
});

export default App;
