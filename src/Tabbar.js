import React, {Component} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {IMAGES, COLORS as c} from "./constants";

export default class Tabbar extends Component {
    constructor() {
        super();
        this._configTabbar = [
            {
                active: IMAGES.listItemActive,
                default: IMAGES.listItem
            },
            {
                active: IMAGES.cartActive,
                default: IMAGES.cart
            }
        ];

    }
    render() {
        return (
            <View style={{
                height: 50,
                flexDirection: "row",
                backgroundColor: c.NAVBAR,
                borderTopColor: "#ccc",
                borderTopWidth: 1
            }}>
                {this._configTabbar.map((item, index) => (
                    <View key={index} style={{flex: 0.5, alignItems: "center", justifyContent: "center"}}>
                        <TouchableOpacity activeOpacity={0.6} onPress={() => {
                            this.props.changeCurrentActiveTab(index);
                        }}>
                            <Image
                                style={{width: 30, height: 30}}
                                resizeMode={"contain"}
                                source={index === this.props.currentActiveTab ? item.active : item.default}
                            />
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        );
    }
}