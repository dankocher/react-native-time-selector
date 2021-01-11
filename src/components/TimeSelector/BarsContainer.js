import React from 'react';
import {Animated, Dimensions, StyleSheet, View} from 'react-native';
import {PanGestureHandler} from "react-native-gesture-handler";
import Bar from "./Bar";
import __colors from "./colors";
const windowWidth = Dimensions.get('window').width;

class BarsContainer extends React.Component {

    render() {
        const {bars, theme, margin, middleBar, translateX} = this.props;
        const colors = __colors[theme];
        const styles = getStyles(colors);

        return (

            <View style={[styles.barsContainer, {position: 'relative'}]}>
                {
                    bars.map((b, i) => <Bar key={`bar-${b}-${i}`} theme={theme} margin={margin} middleBar={middleBar} i={i} translateX={translateX}/>)
                }
            </View>
        )
    }
}

export default BarsContainer;
const getStyles = theme => StyleSheet.create({
    barsContainer: {
        height: 38,
        width: windowWidth,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "flex-end",
        alignSelf: 'center',
        // backgroundColor: '#f48fb1',
        // flex: 1
    },
})
