import { StatusBar } from 'expo-status-bar';
import React, {useState, useMemo} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import themes from "./src/constants/themes";
import TimeSelector from "./src/components/TimeSelector";
import Test from "./src/components/Test";
import TimeSelectorCarousel from "./src/components/TimeSelectorCarousel";

export default class App extends React.Component {
  // const [theme, setTheme] = useState("dark");
  // const [time, setTime] = useState(0)
    state = {
        theme: "dark",
        time: 0
    }

    changeTime = (v) => {
      this.setState({time: this.state.time +v})
      // this.setState({time: v})
    }

  // const timeSelector = useMemo(() => <TimeSelector theme={theme} onChange={changeTime}/>, [])
  // const timer = useMemo(() => <Text style={styles.text}>{`time: ${time}`}</Text>, [time]);
    setTheme = (theme) => {
      this.setState({theme})
    }
    render () {
        // console.log("restart")
        const {time, theme} = this.state;

        const styles = getStyles(themes[theme])
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                    <Text style={styles.text}>{`time: ${time}`}</Text>
                    <StatusBar style={theme === "light" ? "dark" : "light"}/>
                    <TouchableOpacity onPress={() => this.setTheme(theme === "light" ? "dark" : "light")}>
                        <Text style={styles.text}>Change Theme</Text>
                    </TouchableOpacity>
                </View>
                <TimeSelectorCarousel theme={theme} onChange={this.changeTime}/>
                {/*<TimeSelector theme={theme} onChange={this.changeTime}/>*/}
                <Text style={styles.text}>Double tap shows the current time</Text>
            </SafeAreaView>
        );
    }
};

const getStyles = theme => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: theme.textColor,
    marginVertical: 13
  }
});
