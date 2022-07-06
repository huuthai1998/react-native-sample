import React from "react";
import { StyleSheet, Text, Image, View } from "react-native";
import PropTypes from "prop-types";
import Colors from "../constant/Colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
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
    color: "white",
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 5,
  },
  name: {
    color: Colors.subtitle,
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

function CardToken({ id, symbol, name, src }) {
  return (
    <View style={styles.container}>
      <Image source={src} style={styles.image} title={id} />
      <View style={styles.content}>
        <Text style={styles.title}>{symbol}</Text>
        <Text style={styles.name}>{name}</Text>
      </View>
    </View>
  );
}

CardToken.propTypes = {
  id: PropTypes.number.isRequired,
  symbol: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};

export default CardToken;
