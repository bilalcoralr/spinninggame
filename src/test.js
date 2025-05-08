import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Animated,
  Alert,
  TouchableOpacity,
  ScrollView,
  Easing,
} from 'react-native';

const App = () => {
  const wheelItems = [
    {id: 1, icon: require('./src/images/apple.jpeg'), times: '5 times'},
    {id: 2, icon: require('./src/images/carrot.jpeg'), times: '45 times'},
    {id: 3, icon: require('./src/images/corn.jpeg'), times: '5 times'},
    {id: 4, icon: require('./src/images/fish.jpeg'), times: '10 times'},
    {id: 5, icon: require('./src/images/goat.jpeg'), times: '5 times'},
    {id: 6, icon: require('./src/images/tomato.jpeg'), times: '25 times'},
    {id: 7, icon: require('./src/images/image.jpeg'), times: '65 times'},
    {id: 8, icon: require('./src/images/spin.webp'), times: '70 times'},
  ];

  const coinItems = [
    {id: 1, value: 100, icon: require('./src/images/100.webp')},
    {id: 2, value: 200, icon: require('./src/images/1k.webp')},
    {id: 3, value: 500, icon: require('./src/images/10k.webp')},
    {id: 4, value: 1000, icon: require('./src/images/10k.webp')},
    {id: 5, value: 1500, icon: require('./src/images/200k.webp')},
  ];

  const rotation = useRef(new Animated.Value(0)).current;
  const selectedScale = useRef(new Animated.Value(1)).current;
  const [isSpinning, setIsSpinning] = useState(false);
  const [resultHistory, setResultHistory] = useState([]);
  const [countdown, setCountdown] = useState(20);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCoin, setselectedCoin] = useState(null);

  const wheelRadius = 150; // Adjusted radius
  const numSegments = wheelItems.length;

  const startRotation = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedItem(null);

    const spinDuration = 10000; // Total spin time
    const endRotation = 360 * 4 + Math.random() * 360; // 4+ full spins + random stop point

    Animated.timing(rotation, {
      toValue: endRotation,
      duration: spinDuration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      const normalizedRotation = endRotation % 360;
      const selectedSegmentIndex =
        Math.floor(numSegments - (normalizedRotation / 360) * numSegments) %
        numSegments;

      const selectedItem = wheelItems[selectedSegmentIndex];
      setSelectedItem(selectedItem);
      setResultHistory(prevHistory => {
        const newHistory = [selectedItem, ...prevHistory];
        return newHistory.length > 10 ? newHistory.slice(0, 10) : newHistory;
      });

      // Animate the selected item
      Animated.sequence([
        Animated.timing(selectedScale, {
          toValue: 1.5,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(selectedScale, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Alert.alert("Result", `Selected: ${selectedItem.times}`);
      rotation.setValue(0);
      setIsSpinning(false);
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => (prev === 1 ? 20 : prev - 1));
      if (countdown === 1) startRotation();
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  const interpolatedRotation = rotation.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  const handleCoinPress = value => {
    setselectedCoin(value);
    console.log(`Selected coin value: ${value}`);
  };

  return (
    <ImageBackground
      source={require('./src/images/image.jpeg')}
      style={styles.background}>
      <View style={styles.header}>
        <Text style={styles.roundText}>Current Round 2073792</Text>
        <TouchableOpacity style={styles.ruleButton}>
          <Text style={styles.ruleText}>RULE</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.wheelContainer}>
        <Animated.View
          style={[styles.wheel, {transform: [{rotate: interpolatedRotation}]}]}>
          {wheelItems.map((item, index) => {
            const angle = index * (360 / wheelItems.length) * (Math.PI / 180);
            const x = wheelRadius * Math.cos(angle);
            const y = wheelRadius * Math.sin(angle);
            const isSelected = selectedItem?.id === item.id;

            return (
              <Animated.View
                key={item.id}
                style={[
                  styles.wheelItem,
                  {top: 150 + y - 30, left: 150 + x - 30},
                  isSelected && {transform: [{scale: selectedScale}]},
                ]}>
                <View style={styles.imageWrapper}>
                  <Image source={item.icon} style={styles.wheelIcon} />
                </View>
                <Text style={[styles.wheelText, {fontWeight: 'bold'}]}>
                  {item.times}
                </Text>
              </Animated.View>
            );
          })}
        </Animated.View>

        <View style={styles.countdownContainer}>
          <Text style={styles.countdownText}>{countdown}s</Text>
        </View>
      </View>

      <View style={styles.betContainer}>
        <Text style={styles.betText}>
          Choose the amount and then choose food...
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {coinItems.map(item => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleCoinPress(item.value)}>
              <Image source={item.icon} style={styles.betImage} />
            </TouchableOpacity>
          ))}
        </ScrollView>
        {selectedCoin && (
          <Text style={styles.selectedText}>You selected: {selectedCoin}</Text>
        )}
      </View>

      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.footerButton}>
          <Text>Today's Winning: 0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Text>My Record</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Text>Silver Coins: 6</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.resultContainer}>
        <View style={styles.resultTextContainer}>
          <Text style={styles.resultText}>Results</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {resultHistory.map((item, index) => (
            <Image key={index} source={item.icon} style={styles.resultImage} />
          ))}
        </ScrollView>
      </View>

      <View style={styles.Rankcontainer}>
        <View>
          <Text style={styles.resultText}>Today Rank</Text>
        </View>
        <View>
          <Image
            source={require('./src/images/spin.webp')}
            style={styles.resultImage}
          />
        </View>
        <View>
          <Text style={styles.resultText}>2675000</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  roundText: {
    fontSize: 14,
  },
  ruleButton: {
    padding: 10,
    backgroundColor: '#FFD700',
    borderRadius: 150,
  },
  ruleText: {
    color: 'white',
  },
  wheelContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wheel: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 2,
    borderColor: 'darkorange',
    position: 'relative',
  },
  wheelItem: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
  },
  wheelIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  wheelText: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  knobContainer: {
    position: 'absolute',
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'red',
    zIndex: 10,
  },
  knob: {
    width: 30,
    height: 30,
  },
  betContainer: {
    flexDirection: 'column', // Stack the text and scrollview vertically
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#702d1b',
    backgroundColor: '#f58442',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
  },

  betText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10, // Space between the text and the images
  },

  betImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#f22962',
    padding: 10,
    borderWidth: 2,
    borderColor: 'orange',
    marginHorizontal: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  footerButton: {
    padding: 10,
    borderWidth: 2,
    borderColor: 'darkorange',
    borderRadius: 25,
    backgroundColor: '#FFDAB9',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 10,
  },

  resultContainer: {
    backgroundColor: '#f22962',
    padding: 10,
    borderWidth: 2,
    borderColor: 'orange',
    marginHorizontal: 10,
    borderRadius: 10,
    flexDirection: 'row', // To place "Result" and the ScrollView in a row
    alignItems: 'center', // Center align the items
  },
  Rankcontainer: {
    backgroundColor: '#f22962',
    padding: 10,
    borderWidth: 2,
    borderColor: 'orange',
    marginHorizontal: 10,
    borderRadius: 10,
    flexDirection: 'row', // To place "Result" and the ScrollView in a row
    alignItems: 'center', // Center align the items
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  resultTextContainer: {
    marginRight: 10, // Space between the text and scrollable images
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  resultImage: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
    borderRadius: 20,
  },

  imageWrapper: {
    backgroundColor: 'white',
    borderRadius: 35, // Adjust to make a circle
    borderWidth: 3,
    borderColor: 'orange',
    padding: 5, // To add some space around the image
  },

  wheelItem: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
  },

  wheelIcon: {
    width: 50,
    height: 50,
    borderRadius: 25, // Keep the image round
  },

  countdownContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    backgroundColor: '#f58442',
    borderRadius: 50,
    borderWidth: 5,
    borderColor: '#702d1b',
    borderStyle: 'double',
  },
  countdownText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default App;
