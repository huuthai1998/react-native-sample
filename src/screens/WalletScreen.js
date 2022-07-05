// import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
} from "react-native";
// import axios from "axios";
// import { useSelector } from "react-redux";
import CardToken from "../components/CardToken";

const styles = StyleSheet.create({
  safeAreaView: {
    // backgroundColor: "#000000",
    flex: 1,
  },
  title: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  subtitle: {
    color: "rgba(235, 235, 245, 0.6)",
    fontSize: 17,
    fontWeight: "400",
    lineHeight: 22,
    marginBottom: 25,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  button: {
    alignItems: "center",
    backgroundColor: "rgb(93, 95, 222)",
    borderRadius: 8,
    height: 48,
    justifyContent: "center",
  },
  buttonTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 22,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
  },
  form: {
    alignItems: "center",
    backgroundColor: "rgb(58, 58, 60)",
    borderRadius: 8,
    flexDirection: "row",
    height: 48,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  label: {
    color: "rgba(235, 235, 245, 0.6)",
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 20,
    width: 80,
  },
  textButton: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 20,
  },
  textInput: {
    color: "#FFFFFF",
    flex: 1,
  },
});

function LoginScreen() {
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
  // const dt = useSelector((state) => state.auth);

  // const getWalletData = async () => {
  //   console.log(dt);
  //   const AuthStr = "Bearer ".concat(dt.token);
  //   console.log(AuthStr);
  //   try {
  //     const data = await axios.get("/api/v1/wallet", {
  //       headers: {
  //         Authorization: AuthStr,
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getWalletData();
  // }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
        <Text style={styles.title}> Your Wallet </Text>
        <ScrollView>
          <CardToken id={1} symbol="BTC" name="Bitcoin" />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default LoginScreen;
