import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import React, { Component } from 'react';
import Header from './components/Header/Header';
import Clothes from './components/Page/Clothes/Clothes';
import Tech from './components/Page/Tech/Tech';
import All from './components/Page/All/All';
import ProductsInfo from './components/Products/ProductsInfo/ProductsInfo';
import CartPage from './components/Carts/CartPage';
import NotFound from './components/Page/404/404';
import Order from './components/Successful/Order';

export const AppContext = React.createContext('id')

class App extends Component {
  Data;
  constructor(props) {
    super(props);
    this.state = {
      selectValue: "$ USD",
      id: [],
      countId:{quantityId:[]},
      isClickOn: false,
      activeName: [],
      activeColor: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleAttribute = this.handleAttribute.bind(this);
    this.colorAttribute = this.colorAttribute.bind(this);
    this.IncrementItem = this.IncrementItem.bind(this);
    this.DecrementItem = this.DecrementItem.bind(this);
  }
  handleChange = (e) => {
    this.setState({ selectValue: e.target.value })

  }
  handleClick() {
    this.setState(prevState => ({
      isClickOn: !prevState.isClickOn
    }));
  }
  handleAttribute(e) {
    this.setState({activeName: this.state.activeName.concat(Object.assign({id: (e.currentTarget.id)})) })
    const name = e.currentTarget.id;
    const nameFound = this.state.activeName.find(element => element.id === name);
    if(nameFound){
      this.setState({
        activeName: [
            ...this.state.activeName.filter(element => element.id !== name)
          ]
      })
    }
  }
  colorAttribute(e) {
    this.setState({activeColor: this.state.activeColor.concat(Object.assign({id: (e.currentTarget.id)})) });
    const color = e.currentTarget.id;
    const colorFound = this.state.activeColor.find(element => element.id === color);
    if(colorFound){
      this.setState({
        activeColor: [
            ...this.state.activeColor.filter(element => element.id !== color)
          ]
      })
    }
  }

  CountId = (event) => {
    const id = event.currentTarget.id
    this.IncrementItem(id)
  }
  
  componentDidMount(){
    
    this.Data = JSON.parse(localStorage.getItem('data'));
    if(localStorage.getItem('data')){
      this.setState({
        selectValue: this.Data.selectValue,
        countId: this.Data.countId,
        activeName: this.Data.activeName,
        activeColor: this.Data.activeColor,

      })
    } else {
      this.setState({
      selectValue: "$ USD",
      countId: {quantityId:[]},
      activeName: [],
      activeColor: []
      })
    }
   
  }
  componentWillUpdate(nextProps, nextState){
    localStorage.setItem('data', JSON.stringify(nextState))
  }

  IncrementItem = (id) => {
    const itemFound = this.state.countId.quantityId.find(element => element.id === id);
    if (itemFound) {
      const indexOfItemFound = this.state.countId.quantityId.indexOf(itemFound)
      this.setState({
        countId: {
          ...this.state.countId,
          quantityId: [
            ...this.state.countId.quantityId.slice(0, indexOfItemFound),
            { ...itemFound, quantity: itemFound.quantity + 1 },
            ...this.state.countId.quantityId.slice(indexOfItemFound + 1),
          ]
        }
      })
    }
    
    else {
      this.setState({
        countId: {
          ...this.state.countId,
          quantityId: [
            ...this.state.countId.quantityId,
            { id: id, quantity: 1 }
          ]
        }
      })
    }
  }
  DecrementItem = (id) => {
    const itemFound = this.state.countId.quantityId.find(element => element.id === id);
    if (itemFound) {
      const indexOfItemFound = this.state.countId.quantityId.indexOf(itemFound)
      if (itemFound.quantity > 1) {
        this.setState({
          countId: {
            ...this.state.countId,
            quantityId: [
              ...this.state.countId.quantityId.slice(0, indexOfItemFound),
              { ...itemFound, quantity: itemFound.quantity - 1 },
              ...this.state.countId.quantityId.slice(indexOfItemFound + 1),
            ]
          }
        })
      }
      else {
        this.setState({
          countId: {
            ...this.state.countId,
            quantityId: [
              ...this.state.countId.quantityId.filter(element => element.id !== id)
            ]
          }
        })
      }
    }
    
  }
  render() {
    return (
      <div >
        {console.log(this.state.currentSymbol)}
        <BrowserRouter>
          <AppContext.Provider value={{ state: this.state }}>
            <div><Header selectValue={this.state.selectValue}countId={this.state.countId}
            activeName={this.state.activeName}
            activeColor={this.state.activeColor} IncrementItem={this.IncrementItem} DecrementItem={this.DecrementItem} QuantityChange={this.QuantityChange} quantity={this.state.quantity} handleClick={this.handleClick} isClickOn={this.state.isClickOn} handleAttribute={this.handleAttribute} colorAttribute={this.colorAttribute} isAttribute={this.state.isAttribute} handleChange={this.handleChange}/></div>
            <div>
              <Routes>
                <Route path='/' element={<All clickId={this.CartId} CountId={this.CountId} isClickOn={this.state.isClickOn} countId={this.state.countId} />} />
                <Route path='/All' element={<All clickId={this.CartId} isClickOn={this.state.isClickOn} CountId={this.CountId}countId={this.state.countId}  />} />
                <Route path='/Tech' element={<Tech clickId={this.CartId} CountId={this.CountId} isClickOn={this.state.isClickOn} countId={this.state.countId} />} />
                <Route path='/Clothes' element={<Clothes clickId={this.CartId} CountId={this.CountId} isClickOn={this.state.isClickOn}countId={this.state.countId}/>} />
                <Route path='/Cart' element={this.state.countId.quantityId.length < 1 ?<Navigate to='/'/>:<CartPage selectValue={this.state.selectValue}
                activeName={this.state.activeName}
                activeColor={this.state.activeColor}
                handleAttribute={this.handleAttribute} colorAttribute={this.colorAttribute}  quantity={this.state.quantity} isClickOn={this.state.isClickOn} countId={this.state.countId}IncrementItem={this.IncrementItem} DecrementItem={this.DecrementItem} />} />
                <Route path='/Order' element={<Order selectValue={this.state.selectValue}
                activeName={this.state.activeName}
                activeColor={this.state.activeColor}
                handleAttribute={this.handleAttribute} colorAttribute={this.colorAttribute}  quantity={this.state.quantity} isClickOn={this.state.isClickOn} countId={this.state.countId}/>} />
                <Route path='/Info/:id' exact element={<ProductsInfo selectValue={this.state.selectValue} clickId={this.CartId}
                activeName={this.state.activeName}
                activeColor={this.state.activeColor} CountId={this.CountId} handleAttribute={this.handleAttribute} colorAttribute={this.colorAttribute} activeClick={this.activeClick} isClickOn={this.state.isClickOn} countId={this.state.countId} />} />
                <Route path='*' element={<NotFound/> }/>
              </Routes>

            </div>
          </AppContext.Provider>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;