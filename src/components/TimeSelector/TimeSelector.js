import React, {useState, useCallback, useEffect, useMemo} from "react";
import {View, StyleSheet, Text, Dimensions, Animated, Easing} from "react-native";
import { TapGestureHandler, PanGestureHandler, ScrollView, State } from 'react-native-gesture-handler';
import Bar from "./Bar";

import __colors from "./colors";

const windowWidth = Dimensions.get('window').width;

class TimeSelectorLines extends React.Component {

// ({theme = "light", tapRef, panRef, onChange})
    constructor(props) {
        super(props);

        let maxBars = parseInt(windowWidth / 10);
        if (maxBars % 2 === 0)
            maxBars += 1;
        // maxBars += maxBars * 2
        maxBars = 151;
        const barsContainerWidth = maxBars * 12;
        const middleBar = parseInt(maxBars / 2);

        this.state = {
            margin: 10,
            bars: [...Array(maxBars).keys()],
            translateX: 0,
            middleBar
        }

        this._translateX = new Animated.Value(0);
        this._translateY = new Animated.Value(0);
        this._lastOffset = { x: 0, y: 0 };

        this._onGestureEvent = Animated.event(
            [
                {
                    nativeEvent: {
                        translationX: this._translateX,
                        translationY: this._translateY,
                    },
                },
            ],
            { useNativeDriver: true }
        );
        this._translateX.addListener(({value}) => {
            const {margin, bars, middleBar} = this.state;
            this.setState({translateX: value})
            if (!this.isActive) return;
            let _value = parseInt(value)
            let max = Math.max(Math.abs(this.prevValue), Math.abs(_value));
            let min = Math.min(Math.abs(this.prevValue), Math.abs(_value));
            if (max - min > this.state.margin-2) {
                let d = margin === 10 ? 10 : 1;
                // d = parseInt((max - min) / (margin-1)) * d;
                let pass = value < this.prevValue ? d : -d
                this.props.onChange(pass);
                let newBars = Object.assign(bars, {})
                // if (pass > 0) {
                //     // let first = newBars.shift()
                //     // newBars.push(first)
                //     this.setState({middleBar: middleBar + pass/10})
                //     // this.setState({bars: [...bars, 1] })
                // } else if (pass < 0) {
                //     // let last = newBars.pop();
                //     // newBars = [last, ...newBars]
                //     this.setState({middleBar: middleBar + pass/10})
                //
                //     // this.setState({bars: [1, ...bars] })
                // }

                // this.setState({middleBar: middleBar + pass/10})
                // console.log(newBars)
                this.prevValue = _value;
            }
        });
    }
    prevValue = 0;
    isActive = false;
    afterEnd = false;
    setMargin = (margin) => {
        this.setState({margin})
    }
    setBars = (bars) => {
        this.setState({bars})
    }
    _onHandlerStateChange = event => {
        const {oldState, state, velocityX, translationX} = event.nativeEvent;
        if (state === State.BEGAN) {
            this.isActive = true;
        }

        if (oldState === State.ACTIVE) {
            this._lastOffset.x += translationX;
            this._translateX.setOffset(this._lastOffset.x);
            this._translateX.setValue(0);
            // _translateY.setOffset(_lastOffset.y);
            // _translateY.setValue(0);
        }

        if (state === State.END) {
            // this.afterEnd = true;
            // let toValue = this._lastOffset.x + translationX;
            //
            // if (Math.abs(velocityX) > 100 ) {
            //     Animated.timing(
            //         this._translateX,
            //         {
            //             toValue,
            //             duration: Math.abs(velocityX),
            //             useNativeDriver: true,
            //             easing: Easing.out(Easing.exp)
            //         }
            //     ).start();
            //     this._translateX.setOffset(this._lastOffset.x + translationX);
            // }
            this.isActive = false;
            // this._lastOffset.x += translationX;
            // this._translateX.setOffset(this._lastOffset.x);
            // this._translateX.setValue(0);
            // console.log(this._lastOffset)
            // console.log(this._translateX)
            this._lastOffset.x = 0;
            this._translateX.setOffset(0);
            this._translateX.setValue(0);

        }
    };


    render () {
        const {theme, tapRef, panRef} = this.props;
        const {margin, bars, translateX, middleBar} = this.state;
        const colors = __colors[theme];
        const styles = getStyles(colors);
        return (
            <TapGestureHandler
                ref={tapRef}
                waitFor={panRef}
                // onHandlerStateChange={_onTapHandlerStateChange}
                shouldCancelWhenOutside={false}>
                <Animated.View style={styles.wrapper}>
                    <PanGestureHandler
                        ref={panRef}
                        // activeOffsetX={[-20, 20]}
                        onGestureEvent={this._onGestureEvent}
                        onHandlerStateChange={this._onHandlerStateChange}
                        shouldCancelWhenOutside={false}>
                        <Animated.View style={styles.horizontalPan}>
                            <Animated.View style={[
                                styles.barsContainer,
                                {
                                    transform: [
                                        {
                                            translateX: this._translateX,
                                        },
                                    ],
                                },
                            ]}>
                                {
                                    bars.map((b, i) => <Bar key={`bar-${b}-${i}`} theme={theme} margin={margin} middleBar={middleBar} i={i} translateX={translateX}/>)
                                }
                            </Animated.View>
                        </Animated.View>
                    </PanGestureHandler>

                    {/*<View style={[styles.barsContainer, {position: 'absolute'}]}>*/}
                    {/*    {*/}
                    {/*        bars.map((b, i) => <Bar key={`bar-${b}-${i}`} theme={theme} margin={margin} middleBar={middleBar} i={i} translateX={translateX}/>)*/}
                    {/*    }*/}
                    {/*</View>*/}
                </Animated.View>
            </TapGestureHandler>
        )
    }
}

export default function TimeSelector({theme = "light", onChange}) {

    const colors = __colors[theme];
    const styles = getStyles(colors);

    const tapRef = React.createRef();
    const panRef = React.createRef();

    return (
        <View style={styles.container}>
            <View style={styles.dot}/>
            <TimeSelectorLines theme={theme} tapRef={tapRef} panRef={panRef} onChange={onChange}/>
        </View>
    )
}

const getStyles = theme => StyleSheet.create({
    container: {
        width: windowWidth,
        // justifyContent: "center",
        alignItems: "center",
        height: 50,
        // backgroundColor: '#f48fb1',
        // height: 150,
        // width: windowWidth,
        // justifyContent: 'center',
        marginVertical: 0,
    },
    dot: {
        backgroundColor: theme.goldColor,
        width: 4,
        height: 4,
        margin: 4,
        borderRadius: 2
    },
    horizontalPan: {
        // backgroundColor: '#f48fb1',
        // height: 150,
        width: windowWidth,
        // justifyContent: 'center',
        alignContent: "center"
        // marginVertical: 10,
    },
    wrapper: {
        flex: 1,
    },
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
    text: {
        color: theme.textColor
    },
})
