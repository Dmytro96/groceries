import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import Navbar from "./src/Navbar";
import Tabbar from "./src/Tabbar";
import SwipeElement from "./src/SwipeElement";
import EditableRow from "./src/EditableRow";
import NewListItem from "./src/NewListItem";
import {IMAGES, NAVBAR} from "./src/constants";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.navbarConfig = {
            General: {
                center: "Groceries",
                right: {
                    image: IMAGES.edit,
                    press: () => {this._changeRoute(NAVBAR.EDIT)}
                }
            },
            Edit: {
                left: {
                    image: IMAGES.plus,
                    press: () => {this._changeRoute(NAVBAR.NEW_ITEM)}
                },
                center: "Groceries",
                right: {
                    text: "Done",
                    press: () => {this._changeRoute(NAVBAR.GENERAL)}
                }
            },
            NewItem: {
                left: {
                    text: "Cancel",
                    press: () => {
                        this._changeRoute(NAVBAR.EDIT);
                        this.setState({inputText: ""});
                    }
                },
                center: "Add new list item",
                right: {
                    text: "Done",
                    press: () => {this._addNewListItem()}
                }
            }
        };

        this.state = {
            list: Array.from(new Array(10), (item, index) => ({
                text: Math.random().toString(36).substring(7),
                key: index,
                isBucket: Math.random() > 0.5
            })),
            currentNavbar: NAVBAR.NEW_ITEM,
            currentActiveTab: 0,
            inputText: ""
        };
    }

    _changeRoute = newRoute => {
        this.setState((prevState, props) => ({
            list: [...prevState.list],
            currentNavbar: newRoute
        }))
    };

    _removeListItem = number => {
        this.setState(prevState => {
            prevState.list.splice(number, 1)
            return {list: prevState.list.map((item,index) => ({...item, key: index}))};
        });
    };

    _changeCurrentActiveTab = numberNextActiveTab => {
        if (this.state.currentActiveTab !== numberNextActiveTab) {
            this.setState({currentActiveTab: numberNextActiveTab});
        }
    };

    _changeProductState = (productNumber, isBucket) => {
        this.setState(prevState => {
            prevState.list[productNumber] = {
                ...prevState.list[productNumber],
                isBucket
            };

            return { list: [...prevState.list] };
        });
    };

    _keyExtractor = (item, index) => item.key;

    _changeTextInputValue = inputText => this.setState({inputText});

    _addNewListItem = () => {
        if (this.state.inputText.length === 0) {
            return alert("Please input smth")
        }

        this._changeRoute(NAVBAR.EDIT);

        this.setState(prevState => {
            prevState.list.push({
                text: this.state.inputText,
                key: this.state.list.length,
                isBucket: false
            });
            return {
                list: [...prevState.list],
                inputText: ""
            };
        });
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <Navbar config={this.navbarConfig[this.state.currentNavbar]}/>
                {this.state.currentNavbar === NAVBAR.NEW_ITEM
                    ? <NewListItem changeTextInputValue={this._changeTextInputValue}
                                   addNewListItem={this._addNewListItem}
                                   inputText={this.state.inputText}/>
                    : <FlatList
                        keyExtractor={this._keyExtractor}
                        data={this.state.currentActiveTab === 0
                            ? this.state.list
                            : this.state.list.filter(item => item.isBucket)}
                        renderItem={item => this.state.currentNavbar === NAVBAR.GENERAL
                            ? <SwipeElement changeProductState={this._changeProductState} {...item}/>
                            : <EditableRow removeListItem={this._removeListItem} {...item}/>
                        }
                    />
                }

                <Tabbar
                    currentActiveTab={this.state.currentActiveTab}
                    changeCurrentActiveTab={this._changeCurrentActiveTab}
                />
            </View>
        );
    }
}


