import React, {Component} from 'react';
import {Dimensions as d, Text, TextInput, View} from 'react-native';
const {width} = d.get("window");


export default class NewListItem extends Component {
    constructor(props) {
        super(props);

        this.maxLengthInput = 27;
        this.input = null;
    }

    componentDidMount() {
       this.input.focus();
    }

    render() {
        return <View style={{flex: 1, alignItems: "center", marginTop: 40}}>
            <Text style={{fontSize: 18, fontWeight: "700"}}>
                Add new list item
            </Text>
            <View style={{marginTop: 60, borderBottomWidth: 1, borderBottomColor: "black"}}>
                <TextInput
                    value={this.props.inputText}
                    style={{fontSize: 18, width: width - 40, paddingHorizontal: 2}}
                    onSubmitEditing={() => {this.props.addNewListItem()}}
                    onChangeText={this.props.changeTextInputValue}
                    ref={ref => this.input = ref}
                    maxLength={this.maxLengthInput}
                    returnKeyType="done"
                    underlineColorAndroid={"transparent"}
                />
            </View>
            <Text style={{fontSize: 18, alignSelf: "flex-end", paddingRight: 20, paddingTop: 5 }}>
                Characters left {this.maxLengthInput - this.props.inputText.length}
            </Text>

        </View>
    }
}