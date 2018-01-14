import React, {Component} from 'react';
import {Image, TouchableOpacity, Text, View} from 'react-native';
import {IMAGES} from "./constants";

export default function EditableRow(props) {
    return <View style={{
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderColor: "#ccc",
        flexDirection: "row",
        alignItems: "center"
    }}>
        <TouchableOpacity
            style={{flex: 0.1, marginLeft: 10 }}
            onPress={() => {props.removeListItem(props.item.key)}}
            activeOpacity={0.6}
        >
            <Image
                resizeContent="contain"
                source={IMAGES.minus}
                style={{ width: 30, height: 30}}
            />
        </TouchableOpacity>
        <Text style={{paddingVertical: 15, marginHorizontal: 15, fontSize: 20}}>
            {props.item.text}
        </Text>
    </View>
}