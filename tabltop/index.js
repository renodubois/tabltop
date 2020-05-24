import "react-native-gesture-handler";
import { AppRegistry } from "react-native";
// import App from "./App";
import StorybookUIRoot from "./storybook/index";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => StorybookUIRoot);
