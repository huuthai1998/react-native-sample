/* eslint-disable no-undef */
import renderer from "react-test-renderer";
import React from "react";
import HomeScreen from "./screens/HomeScreen";

test("renders correctly", () => {
  const tree = renderer.create(<HomeScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
