import React, { Component } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
import {
    PanGestureHandler,
    TapGestureHandler,
    ScrollView,
    State,
} from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;

function DraggableBox() {
    let _translateX = new Animated.Value(0);
    // let _translateY = new Animated.Value(0);
    let _lastOffset = { x: 0, y: 0 };
    let _onGestureEvent = Animated.event(
        [
            {
                nativeEvent: {
                    translationX: _translateX,
                    // translationY: _translateY,
                },
            },
        ],
        { useNativeDriver: true }
    );
    const _onHandlerStateChange = event => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            _lastOffset.x += event.nativeEvent.translationX;
            // _lastOffset.y += event.nativeEvent.translationY;
            _translateX.setOffset(_lastOffset.x);
            _translateX.setValue(0);
            // _translateY.setOffset(_lastOffset.y);
            // _translateY.setValue(0);
        }
    };

    _translateX.addListener(( value) =>
        console.log(value)
    );

    return (
        <PanGestureHandler
            onGestureEvent={_onGestureEvent}
            onHandlerStateChange={_onHandlerStateChange}>
            <Animated.View
                style={[
                    styles.box,
                    {
                        transform: [
                            { translateX: _translateX },
                            // { translateY: _translateY },
                        ],
                    }
                ]}
            ><Text>|</Text></Animated.View>
        </PanGestureHandler>
    );

}

export default function Example() {

    const tapRef = React.createRef();
    const panRef = React.createRef();
    return (
        <DraggableBox />
    );

}

const styles = StyleSheet.create({
    horizontalPan: {
        backgroundColor: '#f48fb1',
        height: 150,
        width: windowWidth,
        justifyContent: 'center',
        marginVertical: 10,
    },
    wrapper: {
        flex: 1,
    },
    box: {
        width: windowWidth * 2,
        height: 150,
        alignSelf: 'center',
        backgroundColor: 'plum',
        alignItems: "center",
        margin: 10,
        zIndex: 200,
    },
});
