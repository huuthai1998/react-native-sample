import React from "react";
import { Pressable, StyleSheet, Text, Image, View } from "react-native";
import PropTypes from "prop-types";
import Images from "../assets/index";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1E2127",
    borderColor: "#30333A",
    borderWidth: 1,
    borderRadius: 7,
    flexDirection: "row",
    margin: 5,
    padding: 10,
  },
  content: {
    flexDirection: "column",
    marginLeft: 10,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 5,
  },
  name: {
    color: "#727A82",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "white",
  },
});

function CardToken({ id, symbol, name }) {
  return (
    <Pressable>
      <View style={styles.container}>
        <Image
          source={{
            uri: Images.crypto,
          }}
          style={styles.image}
          title={id}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{symbol}</Text>
          <Text style={styles.name}>{name}</Text>
        </View>
      </View>
    </Pressable>
  );
}

CardToken.propTypes = {
  id: PropTypes.number.isRequired,
  symbol: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default CardToken;
