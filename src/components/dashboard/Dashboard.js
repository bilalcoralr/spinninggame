import React from "react";
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, FlatList, ScrollView } from "react-native";

const App = () => {
  const wheelItems = [
    { id: 1, icon: require("./src/images/apple.jpeg"), times: "5 times" },
    { id: 2, icon: require("./src/images/carrot.jpeg"), times: "45 times" },
    { id: 3, icon: require("./src/images/corn.jpeg"), times: "5 times" },
    { id: 4, icon: require("./src/images/fish.jpeg"), times: "10 times" },
    { id: 5, icon: require("./src/images/goat.jpeg"), times: "5 times" },
    { id: 6, icon: require("./src/images/tomato.jpeg"), times: "25 times" },
   
  ];

  const betImages = [
    require("./src/images/apple.jpeg"),
    require("./src/images/carrot.jpeg"),
    require("./src/images/corn.jpeg"),
    require("./src/images/fish.jpeg"),
    require("./src/images/goat.jpeg"),
    require("./src/images/tomato.jpeg"),

  ];

  return (
    <ImageBackground
      source={require("./src/images/image.jpeg")}
      style={styles.background}
    >
      <View style={styles.header}>
        <Text style={styles.roundText}>Current Round 2073792</Text>
        <TouchableOpacity style={styles.ruleButton}>
          <Text style={styles.ruleText}>RULE </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.wheelContainer}>
        {wheelItems.map((item, index) => (
          <View
            key={item.id}
            style={[styles.wheelItem, { transform: [{ rotate: `${index * 45}deg` }] }]}
          >
            <Image source={item.icon} style={styles.wheelIcon} />
            <Text style={styles.wheelText}>{item.times}</Text>
            {item.isHot && <Text style={styles.hotText}>Hot</Text>}
          </View>
        ))}
      </View>

      <View style={styles.middleSection}>
        <Text style={styles.selectTimeText}>Select Time</Text>
        <Text style={styles.timerText}>3s</Text>
      </View>

      <View style={styles.betContainer}>
        {betImages.map((image, index) => (
          <TouchableOpacity key={index} style={styles.betOption}>
            <Image source={image} style={styles.betImage} />
          </TouchableOpacity>
        ))}
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
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {wheelItems.map((item) => (
            <Image key={item.id} source={item.icon} style={styles.resultImage} />
          ))}
        </ScrollView>
      </View>

      <View style={styles.footer}>
       <View style={styles.todayrank}>
        <Text style={styles.ruleText}>Today Rank</Text>
       </View>
       <View>
       <Image source={require('./src/images/image.jpeg')} style={styles.betImage} />
       </View>
       <View>
        <Text style={styles.ruleText}>2675000</Text>
       </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  roundText: {
    fontSize: 14,
  },
  ruleButton: {
    padding: 10,
    backgroundColor: "#FFD700",
    borderRadius: 150,
  },
  ruleText: {
    color: "white",
  },
  wheelContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  wheelItem: {
    position: "absolute",
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  wheelIcon: {
    width: 50,
    height: 50,
  },
  wheelText: {
    fontSize: 12,
    textAlign: "center",
  },
  hotText: {
    color: "red",
    fontSize: 12,
    fontWeight: "bold",
  },
  middleSection: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  selectTimeText: {
    fontSize: 18,
  },
  timerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  betContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderWidth: 2,
    borderColor: "#702d1b",
    backgroundColor: "#f58442",
    borderRadius: 10,
    padding: 10,
    marginHorizontal:10
  },
  betOption: {
    marginHorizontal: 5,
    marginVertical: 25
  },
  betImage: {
    width: 50,
    height: 50,
    borderRadius: 25,

  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginVertical: 10,
    // padding: 10,
    // borderWidth: 2,
    // borderColor: "darkorange",
    // backgroundColor: "#FFDAB9",
    // borderRadius: 10,
  },
  footerButton: {
    padding: 10,
    borderWidth: 2,
    borderColor: "darkorange",
    borderRadius: 25,
    backgroundColor: "#FFDAB9",
    
  },
  resultContainer: {
    backgroundColor: "#f22962",
    padding: 10,
    borderWidth: 2,
    borderColor: 'orange',
    marginHorizontal: 10,
    borderRadius:10,
  },
  resultImage: {
    width: 50,
    height: 50,
    marginHorizontal: 5,
    borderRadius: 25,
  },
  footer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: "#f22962",
    padding: 10,
    borderWidth: 2,
    borderColor: 'orange',
    marginHorizontal: 10,
    borderRadius:10,
    marginVertical: 10,
  },
 
});

export default App;
