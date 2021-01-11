import React from "react";
import {View, Dimensions, StyleSheet} from 'react-native'
import Carousel from 'react-native-snap-carousel';
import _colors from "./colors";

const windowWidth = Dimensions.get('window').width;

export default class TimeSelectorCarousel extends React.Component {

    constructor(props) {
        super(props);
        let maxBars = 150;
        this.state = {
            velocity: 0,
            margin: 10,
            activeIndex: 0,
            bars: [...Array(maxBars).keys()],
        }
        this._renderItem = this._renderItem.bind(this)
    }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     return false
    // }

    _renderItem({item, index}) {
        const {margin, activeIndex} = this.state;
        const {theme} = this.props;
        const colors = _colors[theme]
        const styles = getStyles(colors);
        // console.log(index, activeIndex)
        // const activeIndex = this.getActiveIndex(item);
        if (margin === 10) {
            item = item - 1;
        }
        const color = item === activeIndex || item === activeIndex + 1 || item === activeIndex - 1 ? colors.goldColor :
            item % 5 === 0 ? colors.blackBarColor : colors.barColor;
        const height = item === activeIndex ? 38 :
            item === activeIndex + 1 || item === activeIndex - 1 ? 36 :
                item === activeIndex + 2 || item === activeIndex - 2 ? 34 :
                    item === activeIndex + 3 || item === activeIndex - 3 ? 32 :
                        item === activeIndex + 4 || item === activeIndex - 4 ? 30 : 28;
        const marginTop = item === activeIndex ? 2 :
            item === activeIndex + 1 || item === activeIndex - 1 ? 4 :
                item === activeIndex + 2 || item === activeIndex - 2 ? 6 :
                    item === activeIndex + 3 || item === activeIndex - 3 ? 8 :
                        item === activeIndex + 4 || item === activeIndex - 4 ? 10 : 12;

        //TODO:  check if active index === 0, 1, 2, 3, 4, 5, 140, 141, 142, 143, 144, 145
        const barStyle = {
            ...styles.bar,
            backgroundColor: color,
            marginLeft: margin/2,
            marginRight: margin/2,
            height: height,
            marginTop
        }
        return (
            <View style={[barStyle]}/>
        )
    }

    onSnapToItem = (index) => {
        this.setState({activeIndex:index})
        // console.log(index)
        // this.props.onChange(index)
    }

    onScroll = (event) => {
        // console.log(event.nativeEvent.velocity.x)
        this.setState({velocity: event.nativeEvent.velocity.x})
        // this.props.onChange(parseInt(event.nativeEvent.contentOffset.x))
    }

    onIndexChanged = (currentIndex) => {
        this.setState({activeIndex:currentIndex})
        const {velocity, margin} = this.state;
        if (velocity === 0) return;
        // console.log(velocity < 0 ? "<-" : "->", currentIndex)
        let d = margin === 10 ? 10 : 1;
        // d = parseInt((max - min) / (margin-1)) * d;
        let pass = velocity > 0 ? d : -d
        this.props.onChange(pass);
    }
    render() {
        const {theme} = this.props;
        const {bars, margin, activeIndex} = this.state;
        const colors = _colors[theme]
        const styles = getStyles(colors);
        return (

            <View style={styles.container}>
                <View style={styles.dot}/>
                <Carousel data={bars}
                          layout={"default"}
                          loop
                          firstItem={bars.length}
                          initialScrollIndex={bars.length}
                          getItemLayout={(bars, index) => (
                              {length: width, offset: width * index, index}
                          )}
                          horizontal={true}
                          loopClonesPerSide={bars.length}
                          useScrollView={true}
                          ref={ref => this.carousel = ref}
                          sliderWidth={windowWidth}
                          itemWidth={margin + 2}
                          // enableSnap={false}
                          inactiveSlideOpacity={1}
                          inactiveSlideScale={1}
                          activeSlideOffset={1}
                          // renderItem={(item, index) => this._renderItem(item, index, theme, margin, activeIndex)}
                          renderItem={this._renderItem}
                          onScroll={this.onScroll}
                          onSnapToItem={ this.onSnapToItem }
                          onScrollIndexChanged={this.onIndexChanged}
                          vertical={false}
                />
            </View>
        )
    }
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
    bar: {
        width: 2,
        height: 38,
        borderRadius: 1,
        backgroundColor: theme.barColor
    }
})
