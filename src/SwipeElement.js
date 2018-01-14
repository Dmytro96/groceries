import React, {Component} from 'react';
import {Dimensions as d, Text, View, PanResponder, Image} from 'react-native';
const {width} = d.get("window");

const
    SIDE_ELEMENT_WIDTH = 50,
    SWIPE_LIST_IMAGES = [
        require("../assets/cart_icon.png"),
        require("../assets/home_icon.png")
    ];

export default class SwipeElement extends Component {
    constructor(props) {
        super(props);
        this._scrollElt = null;
        this._panResponder = PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

            onPanResponderGrant: (evt, gestureState) => {

            },
            onPanResponderMove: (evt, gestureState) => {
                this._setLeftIndent(gestureState.dx + this._getCorrectOffset())
            },
            onPanResponderRelease: (evt, gestureState) => {
                if (gestureState.dx === 0) {
                    return;
                }

                const isLeftIndent = gestureState.dx > 0;
                this._setLeftIndent( isLeftIndent ? SIDE_ELEMENT_WIDTH : 0 )
                if (this.props.item.isBucket !== isLeftIndent) {
                    this.props.changeProductState(this.props.index, isLeftIndent)
                }
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                return true;
            },
        });
    }

    _getCorrectOffset = () => {
        return this.props.item.isBucket ? SIDE_ELEMENT_WIDTH : 0
    };

    componentDidMount() {
        this._setLeftIndent(this.props.item.isBucket ? SIDE_ELEMENT_WIDTH : 0)
    }

    _setLeftIndent = indent => {
        this._scrollElt.setNativeProps({left: indent});
    };

    render() {
        return <View style={{flex: 1, borderBottomColor: "#ccc", borderBottomWidth: 1}}>
            <View style={{
                position: "absolute",
                bottom: 0,
                top: 0,
                left: 0,
                right: 0,
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "#e6e7e8",
                alignItems: "center"
            }}>
            { SWIPE_LIST_IMAGES.map((imageSource, index) =>
                <View key={index} style={{paddingHorizontal: 13}}>
                    <Image
                        resizeMode="contain"
                        style={{width: 25, height: 25, alignSelf: "center"}}
                        source={imageSource}
                    />
                </View>)
            }
            </View>

            <View
                {...this._panResponder.panHandlers}
                ref={ref => this._scrollElt = ref} style={{
                width: width - SIDE_ELEMENT_WIDTH,
                borderRightWidth: 1, borderLeftWidth: 1, borderColor: "#ccc",
                backgroundColor: "white"
            }}>
                <Text style={{padding: 15, fontSize: 20}}>
                    {this.props.item.text}
                </Text>
            </View>

        </View>
    }
}