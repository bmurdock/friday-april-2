import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, Picker} from 'react-native';
import { rando, pokeFetch } from './util';
import {
  Directions,
  State,
  FlingGestureHandler,
} from 'react-native-gesture-handler';

const maxPoke = 898;

export default class App extends Component {
  constructor()
  {
    super();
    this.state = {
        pokemonName: 'Brian',
        pokemonImage: { uri: ''},
        pickerVal: 'test2',
        toggle: true,
        types: [],
    };
  }

  componentDidMount()
  {
      this.updatePokemon();
  }

  // get a new pokemon (refresh pokemon that is loaded)
  updatePokemon = async () =>
  {
    const pokemon = await pokeFetch('pokemon', rando(1, maxPoke));
    this.setState({
      pokemonName: pokemon.name,
      pokemonImage: {uri: pokemon.sprites.front_default},
      types: pokemon.types.map((type, i) =>
      {
        return <Text key={`type_${i}`}>{type.type.name}</Text>
      }),
    });
  }
  pickerHandler = (val) =>
  {
    // right now we just want to simply change the value
    // to match the user selection
    this.setState({
      pickerVal: val,
    });
  }

  handleSwipe = ({nativeEvent}) =>
  {
    console.log('nativeEvent: ', nativeEvent);
    if (nativeEvent.state === State.END)
    {
      const {translationX} = nativeEvent;
      let direction = (translationX < 0) ? "left" : "right";
      console.log('direction: ', direction);
      this.updatePokemon();
      this.setState({
        toggle: (this.state.toggle) ? false : true,
      });
    }
  }
  render()
  {
    return (


        <View style={styles.container}>
            <View style={styles.menu}>
            <Button
              onPress={() => { console.log('works')}}
              title="Home"
              color="#000"
              disabled={this.state.toggle}
              />
                          <Button
              onPress={() => { console.log('works')}}
              title="Home"
              color="#000"
              disabled={true}
              />
                          <Button
              onPress={() => { console.log('works')}}
              title="Home"
              color="#000"
              />
            </View>
            <FlingGestureHandler
              direction={Directions.LEFT | Directions.RIGHT}
              onGestureEvent={this.handleSwipe}
            >
              <Image
                style={styles.pokemonImage} 
                source={this.state.pokemonImage}
              />
            </FlingGestureHandler>
            <Picker
              selectedValue={this.state.pickerVal}
              onValueChange={this.pickerHandler}
            
            >
              <Picker.Item
                  label="Test 1"
                  value="test1"
                  />
              <Picker.Item
                label="Test 2"
                value="test2"
                />
              <Picker.Item
                label="Test 3"
                value="test3"
                />

            </Picker>
            <Text>Name: {this.state.pokemonName}</Text>
            <Text>Something like this.</Text>
            <View>
              {this.state.types}
            </View>
            <Button
              title="Change"
              onPress={this.updatePokemon}
            />
        </View>

    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pokemonImage: {
    resizeMode: 'contain',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
    width: 200,
    height: 200,
  },
  menu: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  menuItem: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,
    margin: 1,
  }

});
