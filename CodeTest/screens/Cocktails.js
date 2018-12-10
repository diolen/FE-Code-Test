/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react'
import {
  StyleSheet,
  AppRegistry,
  StatusBar,
  Text,
  View,
  Alert,
  Image
} from 'react-native'
import SearchList, { HighlightableText } from '@unpourtous/react-native-search-list/library';
import Touchable from '@unpourtous/react-native-search-list/library/utils/Touchable';
import { createStackNavigator } from 'react-navigation';

const rowHeight = 182
export default class Cocktails extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      dataSource: []
    }
    console.disableYellowBox = true;
  }

  componentDidMount(){
    const itemsEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail_glass';

    return fetch(itemsEndpoint)
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: (responseJson.drinks).map( item => ({
            searchStr: item.strDrink,
            idDrink: item.idDrink,
            strDrinkThumb: item.strDrinkThumb
          }) ),
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }  

  // custom render row
  renderRow (item, sectionID, rowID, highlightRowFunc, isSearching) {
    const { navigate } = this.props.navigation
    return (
      <Touchable onPress={() => navigate('Cocktail', {idDrink: item.idDrink, title: item.strDrink})}>
        <View key={item.idDrink} style={{flex: 1, height: rowHeight, backgroundColor: '#4EBCD1'}}>
          <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#FFF', marginLeft:8, marginBottom: 8, marginRight: 8, padding: 12, borderRadius: 5, borderWidth: 1, borderColor: '#FFF'}}>
            <View style={{flex: 1}}>
              <Text style={{fontWeight: 'bold'}}>
                <HighlightableText matcher={item.matcher} text={item.searchStr} textColor={'#666'} hightlightTextColor={'#0069c0'} />
              </Text>
            </View>
            <View style={{flex: -1}}>
              <Image source={{uri: item.strDrinkThumb}} style={{width: 148, height: 148, borderRadius: 5, borderWidth: 1, borderColor: '#FFF'}} />            
            </View>          
          </View>
        </View>
      </Touchable>
    )
  }

  // render empty view when datasource is empty
  renderEmpty () {
    return (
      <View style={{flex: 1, alignItems: 'center', flexDirection: 'column', justifyContent: 'flex-start', marginTop: 50}}>
        <Text style={{color: '#979797', fontSize: 18, paddingTop: 20}}> Loading... </Text>
      </View>
    )
  }

  // render empty result view when search result is empty
  renderEmptyResult (strDrink) {
    return (
      <View style={{flex: 1, alignItems: 'center', flexDirection: 'column', justifyContent: 'flex-start', marginTop: 50}}>
        <Text style={{color: '#979797', fontSize: 18, paddingTop: 20}}> No Result For <Text
          style={{color: '#171a23', fontSize: 18}}>{strDrink}</Text></Text>
        <Text style={{color: '#979797', fontSize: 18, alignItems: 'center', paddingTop: 10}}>Please search again</Text>
      </View>
    )
  }

  render () {
    return (
      <View style={{flex: 1, backgroundColor: '#4EBCD1', flexDirection: 'row', justifyContent: 'flex-start', marginTop: -44}}>
        <StatusBar backgroundColor='#4EBCD1' barStyle='dark-content' />
        <SearchList
          data={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          renderEmptyResult={this.renderEmptyResult.bind(this)}
          renderBackButton={() => null}
          renderEmpty={this.renderEmpty.bind(this)}
          renderSeparator={() => {return false}}

          rowHeight={rowHeight}

          toolbarBackgroundColor={'#4EBCD1'}
          title='Random drinks 0.1'
          cancelTitle='Cancel'
          onClickBack={() => {}}
          sortFunc={() => {}}
          searchListBackgroundColor={'#2196f3'}

          searchBarToggleDuration={300}

          searchInputBackgroundColor={'#FFF'}
          searchInputBackgroundColorActive={'#FFF'}
          searchInputPlaceholderColor={'#666'}
          searchInputTextColor={'#FFF'}
          searchInputTextColorActive={'#000'}
          searchInputPlaceholder='Search'
          sectionIndexTextColor={'#6ec6ff'}
          searchBarBackgroundColor={'#4EBCD1'}
          sectionHeaderHeight={0}
          hideSectionList={true}
        />
      </View>
    )
  }
}
AppRegistry.registerComponent('Cocktails', () => Cocktails)
