import React,{PureComponent} from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import ItemList from './src/views/ItemList';
import DetailView from './src/views/DetailView';
import { Provider } from 'react-redux';
import store from './src/redux/store';


export default class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
          <AppContainer />
      </Provider>
    );
  }
}

//import all the screens we are going to switch 
const AppNavigator = createStackNavigator({
  //Constant which holds all the screens like index of any book 
    ItemList: { 
      screen: ItemList //screen one
    }, 
    DetailView: {
       screen: DetailView //screen two
      }, 
  },
  {
    initialRouteName: 'ItemList', //initial screen
  }
);
const AppContainer = createAppContainer(AppNavigator);