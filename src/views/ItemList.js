import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import {  SearchBar } from "react-native-elements";
import ListRow from '../components/ListRow';
// import api from '../utils/api';
import { connect } from 'react-redux';
import {getData} from '../redux/store';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
  },
});

class ItemList extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchText: "",
      filteredData: []
    }
  }

   
  componentDidMount() {
    this.props.getData();
  }

  search = (searchText) => {
    this.setState({searchText: searchText});
  
    let filteredData = this.props.data.data.filter(function (item) {
      return item.title.includes(searchText);
    });
  
    this.setState({filteredData: filteredData});
  };

  renderHeader = () => {
    //searchbar to search or filter list
    return  <SearchBar
        round={true}
        lightTheme={true}
        placeholder="Search..."
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={this.search}
        value={this.state.searchText}
  />
  };

  renderFooter = () => {
    //Setting loadmore activityindicator
    return (       
      <View>
              {
                  ( this.props.data.data )
                  ?
                      <ActivityIndicator size="large" color = "#F44336" style = {{ justifyContent:'space-evenly', alignSelf:'center'}} />
                  :
                      null
              }

      </View>           
     )
  }

  static navigationOptions = {
    //Setting the header of the screen
    title: 'Home',
    headerStyle: {
      backgroundColor: '#4B0090',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

 
  render() { 
    if (this.props.loading) {
      //Loading View while data is loading
      return (
        <View style={{ flex:1, alignSelf:'center', justifyContent:"space-evenly" }}>
          <ActivityIndicator animating size="large" color="#0000ff" />
        </View>
      );
    }
 
        return(
          //load view when getdata
          <View style={styles.container}>
                <FlatList
                  // data={this.props.data.data!==undefined? this.props.data.data :[] }
                   data={this.props.data.data && this.state.filteredData.length > 0 ? this.state.filteredData : this.props.data.data}
                   renderItem={({ item }) => 
                        <TouchableOpacity 
                        onPress={() => this.props.navigation.navigate('DetailView',{   //pasing params through props navigation
                          title: item.title,
                          description: item.slug,
                          image_url: item.images.downsized_still.url
                        })}
                        >
                        <ListRow
                            title={item.title}
                            description={item.slug}
                            image_url={item.images.downsized_still.url}
                        />
                        </TouchableOpacity>
                        }
                        keyExtractor={item => `item-${item.id}`}
                        ListHeaderComponent={this.renderHeader}
                        ListFooterComponent={this.renderFooter}

                    />
          </View>
        )
      }
    }

const mapStateToProps = state =>({
  data: state.data,
  loading: state.loading,
})

const mapDispatchToProps = {
  getData
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ItemList));