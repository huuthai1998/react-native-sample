import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  // TextInput,
  // TouchableOpacity,
  View,
} from "react-native";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    padding: 10,
  },
  title: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 5,
  },
});

function CardToken({ id, symbol, name }) {
  // const navigation = useNavigation();

  // const [userInfo, setUserInfo] = useState({ username: "", password: "" });

  // const dispatch = useDispatch();
  // const onChangeHandler = (key) => (value) => {
  //   setUserInfo({ ...userInfo, [key]: value });
  // };

  // const handleLogin = () => {
  //   try {
  //     console.log(userInfo);
  //     dispatch(signIn(userInfo));
  //     console.log(userInfo);
  //     navigation.navigate(AppScreens.HOME_SCREEN);
  //   } catch (err) {
  //     console.log(userInfo);
  //     console.log(err);
  //   }
  // };

  return (
    <Pressable>
      <View style={styles.container}>
        <Text style={styles.title}>
          {id}
          :
          {symbol}
        </Text>
        <Text>{name}</Text>
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
