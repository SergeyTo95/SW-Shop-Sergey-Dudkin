import React, { Component } from "react";
import { client } from '../../index.js'
import { gql } from '@apollo/client';
import s from './carts.module.css';
import notAvailable from '../../not-available.png'
import { AppContext } from '../../App.js';
import { NavLink } from "react-router-dom";


export const Carts_Query = gql`
{
  category{
    name
     products{
        id
        name
        inStock
        gallery
        description
        category
        brand
        prices{
          currency{
            symbol
          }
          amount
        }
        attributes{
          id
          name
          type
          items{
            displayValue
            value
            id
          }
        }
        }
       }
      }
`
  ;

class Carts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: []
    }
  }
  componentDidMount = async () => {
    const response = await client.query({
      query: Carts_Query
    })
    this.setState({
      products: response.data.category.products
    })
  }
  render() {
    if (this.state.products.length == 0) return null;
    return (
      <AppContext.Consumer>
        {value => (
          <div className={s.carts}>
            <div className={s.bag}><b>My Bag,</b> {this.props.countId.quantityId.reduce((acc, i) => (acc + i.quantity),0) } items</div>
            {this.state.products.map((products, productsIndex) => (
              this.props.countId.quantityId.map((item) => (products.id == item.id ?
                <div key={products.id}>
                  <div className={s.hightLevel}>
                    <div className={s.containerImg}>
                      <img className={s.imgProduct} src={products.gallery} alt="img" onError={(e) => { e.target.onerror = null; e.target.src = notAvailable }} />
                      <div className={s.button}>
                        <button className={s.increment} onClick={()=>this.props.IncrementItem(item.id)}>+</button>
                        {console.log(item.id)}
                        <div className={s.count}>{item.quantity}</div>
                        <button className={s.decrement} onClick={()=>this.props.DecrementItem(item.id)}>-</button>
                      </div>
                    </div>
                  </div>
                  <div className={s.middleLevel}>

                    <div className={s.brandProduct}>{products.brand}{this.state.prices}</div>
                    <div className={s.nameContainer}>
                      <div className={s.nameProduct}>{products.name}</div>
                    </div>
                    {products.prices.map((prices) => {
                      return (value.state.selectValue.slice(0, -4) === prices.currency.symbol ?
                        <div className={s.price}>
                          <div value={prices.amount}>{prices.currency.symbol + " " + prices.amount}</div>
                        </div> : null
                      )
                    })}
                    <div >{products.attributes.map((attributes, attributeIndex) => {
                      
                      return (
                        <div>
              <div key={attributes.id} className={s.attributesName} >{attributes.id}:</div>
              {attributes.items.map((itemss) => {
                return ( 
                  <div key={`${productsIndex}-${attributeIndex}-${itemss.id}`}className={s.attributesButton}>
                    <div className={attributes.type === "text" ?this.props.activeName.find((active)=>( `${productsIndex}-${attributeIndex}-${itemss.id}`===active.id)) ? s.itemsAttrributesActive : s.itemsAttrributes : (this.props.activeColor.find((color)=>( `${productsIndex}-${attributeIndex}-${itemss.id}`=== color.id)) ? itemss.displayValue === "White" ?s.itemsAttrributesColorActiveWhite:s.itemsAttrributesColorActive : itemss.displayValue === "White" ? s.itemsAttrributesColorWhite: s.itemsAttrributesColor)} style={{ background: itemss.value }}
                      onClick={attributes.id ? attributes.type === "text" ? this.props.handleAttribute : this.props.colorAttribute: null} id={`${productsIndex}-${attributeIndex}-${itemss.id}`}>
                      <button className={attributes.type === "text" ? (this.props.activeName.find((active)=>( `${productsIndex}-${attributeIndex}-${itemss.id}`===active.id)) ? s.buttonInfoActive : s.buttonInfo) : s.buttonInfo} >
                        {attributes.id != "Color" ? itemss.displayValue : null}
                      </button>
                      {console.log(value.state.activeName)}
                                </div>
                                
                              </div>
                             )
                          })}
                        </div>
                      )
                    })}</div>
                  </div>
                </div>
                : null))))}
            <div className={s.total}><b>Total</b></div>
            <div className={s.praceTotal}>
              {value.state.selectValue.slice(0, -4) + " "}
              {this.props.countId.quantityId.reduce((acc, ci) => {
                const product = this.state.products.find(p => (p.id === ci.id));
                const price = product.prices.find(c => c.currency.symbol == value.state.selectValue.slice(0, -4));
                return acc + price.amount * ci.quantity
              }, 0).toFixed(3).slice(0, -1)
              }</div>
            <div className={s.layoutLavel}>
              <div className={s.viewBag}>
                <NavLink to={`/Cart`}>
                  <button className={s.btnViewBag}>VIEW BAG </button>
                </NavLink>
              </div>
              <div className={s.checkOut}>
                <NavLink to="/Order"><button className={s.btnCheckOut}>CHECK OUT</button></NavLink>
              </div>
            </div>
          </div>)}
      </AppContext.Consumer>
    );
  }
}
export default Carts;



export class CartMini extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className={s.cartMini}>
        <React.Fragment>
          <Carts IncrementItem={this.props.IncrementItem} countId={this.props.countId} DecrementItem={this.props.DecrementItem} QuantityChange={this.props.QuantityChange} quantity={this.props.quantity} handleAttribute={this.props.handleAttribute} isAttribute={this.props.isAttribute} cartItems={this.props.cartItems} activeName={this.props.activeName} colorAttribute={this.props.colorAttribute} activeColor={this.props.activeColor}/>
        </React.Fragment>
      </div>
    )
  }
}