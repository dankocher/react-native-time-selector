import React, {useRef, useEffect} from "react";
import {View, StyleSheet, Dimensions, Text} from "react-native";
import _colors from "./colors";

const windowWidth = Dimensions.get('window').width;

export default class Bar extends React.Component {
    // (}{theme = "light", margin = 10, height = 38, color, style, _translateX}) {
    constructor(props) {
        super(props)
        this.handleLayoutChange = this.handleLayoutChange.bind(this);
    }

    handleLayoutChange() {
        this.feedPost.measure( (fx, fy, width, height, px, py) => {
            console.log('X offset to page: ' + px)
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.handleLayoutChange()
    }

    // componentDidMount() {
    //     this.handleLayoutChange()
    // }

    render() {
        const {theme, margin, style, i, translateX, middleBar} = this.props;
        const colors = _colors[theme]
        const styles = getStyles(colors);

        const color = i === middleBar || i === middleBar + 1 || i === middleBar - 1 ? colors.goldColor :
            i % 5 === 0 ? colors.blackBarColor : colors.barColor;

        const height = i === middleBar ? 38 :
            i === middleBar + 1 || i === middleBar - 1 ? 36 :
                i === middleBar + 2 || i === middleBar - 2 ? 34 :
                    i === middleBar + 3 || i === middleBar - 3 ? 32 :
                        i === middleBar + 4 || i === middleBar - 4 ? 30 : 28;

        // if (i === middleBar) {
        //     console.log(translateX)
        // }

        const barStyle = {
            ...styles.bar,
            backgroundColor: color,
            marginLeft: margin/2,
            marginRight: margin/2,
            height: height
        }
        return (
                <View
                    onLayout={(event) => {this.handleLayoutChange(event) }}
                      ref={view => { this.feedPost = view; }} style={[style, barStyle]}/>
        )
    }
};

const getStyles = theme => StyleSheet.create({
    bar: {
        width: 2,
        height: 38,
        borderRadius: 1,
        backgroundColor: theme.barColor
    },
    text: {
        fontSize: 10,
        position: "absolute",
        color: theme.textColor
    }
});

