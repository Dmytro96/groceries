import React, {Component} from 'react';
import {Text, View, StatusBar, TouchableOpacity, Image} from 'react-native';
import {COLORS as c} from "./constants";

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusBarIndent: StatusBar.currentHeight || 20
        }
    }

    _renderImageOrText = element => {
        if (element.text) {
            return <Text style={{fontSize: 18, fontWeight: "700"}}>
                {element.text}
            </Text>
        }

        if (element.image) {
            return <Image
                style={{width: 17, height: 17}}
                resizeMode={"contain"}
                source={element.image}
            />
        }

        return false;
    };

    render() {
        const {left, center, right} = this.props.config;
        return (
            <View style={{paddingTop: this.state.statusBarIndent,  backgroundColor: c.NAVBAR, borderBottomWidth: 1,
                borderBottomColor: "#ccc", justifyContent: "flex-start", alignItems: "center"}}
            >
                <View style={{height: 50, justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
                    <View style={{flex: 0.2, marginLeft: 15}}>
                        {left &&
                            <TouchableOpacity activeOpacity={0.6} onPress={left.press}>
                                {this._renderImageOrText(left)}
                            </TouchableOpacity>
                        }
                    </View>
                    <View style={{flex: 0.6, alignItems: "center"}}>
                        <Text style={{fontSize: 18, fontWeight: "700"}}>
                            {center}
                        </Text>
                    </View>
                    <View style={{flex: 0.2, alignItems: "flex-end", marginRight: 15, justifyContent: "center"}}>
                        {right &&
                            <TouchableOpacity activeOpacity={0.6} onPress={right.press}>
                                {this._renderImageOrText(right)}
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </View>
        );
    }
}