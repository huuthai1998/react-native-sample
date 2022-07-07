import React from "react";
import { StyleSheet, Text, Image, View } from "react-native";
import PropTypes from "prop-types";
import Colors from "../constant/Colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderColor: Colors.borderCard,
    borderWidth: 1,
    borderRadius: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    padding: 10,
  },
  main: {
    flexDirection: "row",
  },
  amountText: {
    fontSize: 15,
    color: "white",
    textAlign: "right",
    marginBottom: 10,
  },
  amount: {
    textAlign: "right",
    color: "#8AC135",
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
    borderWidth: 0.5,
    borderColor: "white",
  },
});

function CardToken({ id, symbol, name, amount, src }) {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Image source={src} style={styles.image} title={id} />
        <View style={styles.content}>
          <Text style={styles.title}>{symbol}</Text>
          <Text style={styles.name}>{name}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.amountText}>Amount</Text>
        <Text style={styles.amount}>{amount.toFixed(2)}</Text>
      </View>
    </View>
  );
}

CardToken.propTypes = {
  id: PropTypes.number.isRequired,
  symbol: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  src: PropTypes.node.isRequired,
};

export default CardToken;
