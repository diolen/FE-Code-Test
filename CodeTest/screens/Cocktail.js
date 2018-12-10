import React, {Component} from 'react';
import {
  StyleSheet, 
  StatusBar,
  Text, 
  View,
  Alert,
  FlatList,
  Image,
  Dimensions
} from 'react-native';
import {StackNavigator,TabNavigator} from 'react-navigation'

type Props = {};
export default class Cocktail extends Component<Props> {

  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      dataSource: [],
      idDrink: this.props.navigation.state.params.idDrink
    }
    console.disableYellowBox = true;
  }

  componentDidMount(){
    const itemEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='+this.state.idDrink;

    return fetch(itemEndpoint)
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: (responseJson.drinks).map( item => ({
            strDrink: item.strDrink,
            idDrink: item.idDrink,
            strDrinkThumb: item.strDrinkThumb,
            strInstructions: item.strInstructions,
            strIngredient1: item.strIngredient1 ? item.strIngredient1 + `\n` : '',
            strIngredient2: item.strIngredient2 ? item.strIngredient2 + `\n` : '',
            strIngredient3: item.strIngredient3 ? item.strIngredient3 + `\n` : '',
            strIngredient4: item.strIngredient4 ? item.strIngredient4 + `\n` : '',
            strIngredient5: item.strIngredient5 ? item.strIngredient5 + `\n` : '',
            strIngredient6: item.strIngredient6 ? item.strIngredient6 + `\n` : '',
            strIngredient7: item.strIngredient7 ? item.strIngredient7 + `\n` : '',
            strIngredient8: item.strIngredient8 ? item.strIngredient8 + `\n` : '',
            strIngredient9: item.strIngredient9 ? item.strIngredient9 + `\n` : '',
            strIngredient11: item.strIngredient10 ? item.strIngredient10 + `\n` : '',
            strIngredient12: item.strIngredient11 ? item.strIngredient11 + `\n` : '',
            strIngredient13: item.strIngredient12 ? item.strIngredient12 + `\n` : '',
            strIngredient14: item.strIngredient13 ? item.strIngredient13 + `\n` : '',
            strIngredient15: item.strIngredient14 ? item.strIngredient14 + `\n` : '',
            strIngredient16: item.strIngredient15 ? item.strIngredient15 + `\n` : '',
          }) ),
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#4EBCD1'}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => {
            return(
              <View style={{flex: 1, backgroundColor: '#4EBCD1', margin: 0, padding: 10}}>
                <View style={{
                  flex: 1, 
                  flexDirection: 'column', 
                  backgroundColor: '#FFF', 
                  borderRadius: 5, 
                  borderWidth: 1, 
                  borderColor: '#FFF'}}>
                  <View style={{flex: 1}}>
                    <Text style={{color: '#666', fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>{`\n`}{item.strDrink}{`\n`}</Text>
                    <Image source={{uri: item.strDrinkThumb}} style={{
                      alignSelf: 'stretch', 
                      width: 333, 
                      height: 260, 
                      borderRadius: 5, 
                      borderWidth: 1, 
                      borderColor: '#FFF',
                      margin: 10
                    }} />            
                  </View>
                  <View style={{flex: 1, margin: 10}}>
                    <Text style={{color: '#666', fontSize: 16}}>
                      {item.strIngredient1}{item.strIngredient2}{item.strIngredient3}{item.strIngredient4}{item.strIngredient5}
                      {item.strIngredient6}{item.strIngredient7}{item.strIngredient8}{item.strIngredient9}{item.strIngredient10}
                      {item.strIngredient11}{item.strIngredient12}{item.strIngredient13}{item.strIngredient14}{item.strIngredient15}
                    </Text>
                    <Text style={{color: '#666', fontSize: 16}}>{'\u2022'} How to prepare {`\n`}</Text>
                    <Text style={{color: '#666', fontSize: 16}}>{item.strInstructions}{`\n`}</Text>
                  </View>          
                </View>
              </View>
            )            
          }}
          keyExtractor={({idDrink}, index) => idDrink}
        />
      </View>
    );
  }
}