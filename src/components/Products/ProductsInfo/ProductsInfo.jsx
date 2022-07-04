import React, { Component } from 'react';
import { client } from '../../../index.js'
import { gql } from '@apollo/client';
import notAvailable from '../../../not-available.png';
import s from './Style/productsInfo.module.css'
import { NavLink } from 'react-router-dom';
import shadow from '../../shadow.module.css';

const ProductQuery = gql`
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

class ProductsInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      prices: [],
      currency: [],
      isClickOn: false
    }
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount = async () => {

    const response = await client.query({
      query: ProductQuery
    })
    this.setState({
      products: response.data.category.products
    })
  };
  handleClick() {
    this.setState(prevState => ({
      isClickOn: !prevState.isClickOn
    }));
  }
  render() {
    let route = window.location.pathname;
    let productsRoute = route.replace(/^....../, "");
    let newSelectChange = this.props.selectValue.slice(0, -4);
    let CartItems = this.props.countId.quantityId.map(c => c.id);
    let Click;
    if (CartItems.length > 0 ? this.props.isClickOn == true : null) {
      Click = shadow.allIpacity;
    } else if(CartItems.length < 0 ? this.props.isClickOn == false : null) {
      Click = null;
    }
    return (
      <div>
        {this.state.products.map((products, productsIndex) => (
          products.id === productsRoute ?
            <div key={products.id} className={Click}>
              <div>
                <div className={s.nameContainer}>
                  <div className={s.brand}>{products.brand}</div>
                  <div className={s.name}>{products.name}</div>
                </div>
                <div className={s.imageContainer}>
                  <img className={s.gallery} src={products.gallery} onError={(e) => { e.target.onerror = null; e.target.src = notAvailable }} />
                </div>
                <div className={s.positionMini}>
                  <div><img className={s.minigallery} src={products.gallery} onError={(e) => { e.target.onerror = null; e.target.src = notAvailable }} /></div>
                  <div><img className={s.minigallery} src={products.gallery} onError={(e) => { e.target.onerror = null; e.target.src = notAvailable }} /></div>
                  <div><img className={s.minigallery} src={products.gallery} onError={(e) => { e.target.onerror = null; e.target.src = notAvailable }} /> </div>
                </div>
                <div className={s.layoutContainer}>
                  {products.attributes.map((attributes,attributeIndex) => {
                    return (
                      <div >
                        <div >
                          <div key={attributes.key} className={s.attributesName}>{attributes.name}:</div>
                          {attributes.items.map((itemss) => {
                            return (
                   <div key={`${productsIndex}-${attributeIndex}-${itemss.id}`}className={s.attributesButton}>
                    <div className={attributes.type === "text" ?this.props.activeName.find((active)=>( `${productsIndex}-${attributeIndex}-${itemss.id}`===active.id)) ? s.itemsAttrributesActive : s.itemsAttrributes : (this.props.activeColor.find((color)=>( `${productsIndex}-${attributeIndex}-${itemss.id}`=== color.id)) ? itemss.displayValue === "White" ?s.itemsAttrributesColorActiveWhite:s.itemsAttrributesColorActive : itemss.displayValue === "White" ? s.itemsAttrributesColorWhite: s.itemsAttrributesColor)} style={{ background: itemss.value }}
                      onClick={attributes.id ? attributes.type === "text" ? this.props.handleAttribute : this.props.colorAttribute: null} id={`${productsIndex}-${attributeIndex}-${itemss.id}`}>
                      <button className={attributes.type === "text" ? (this.props.activeName.find((active)=>( `${productsIndex}-${attributeIndex}-${itemss.id}`===active.id)) ? s.buttonInfoActive : s.buttonInfo) : s.buttonInfo} >
                        {attributes.id != "Color" ? itemss.displayValue : null}
                      </button>
                                </div>
                                
                              </div>
                          )})}

                        </div>
                      </div>
                    )
                  })}


                  <div >
                    <div className={s.textPrice}>Price:</div>
                    {products.prices.map((prices) => {

                      return (

                        <div className={s.price}>

                          <div class>{newSelectChange === prices.currency.symbol ? prices.currency.symbol + " " + prices.amount : null} </div>

                        </div>
                      )
                    })}

                  </div>
                  <div>
                    {products.inStock ?<NavLink to={`/Cart`}>
                      <button className={s.buttonCart} id={productsRoute} onClick={this.props.CountId}>ADD TO CART</button>
                    </NavLink>: <div className={s.notAvailable}>NOT AVAILABLE</div>}
                  </div>
                  <div className={s.arialDescription}>
                    <div className={s.description} dangerouslySetInnerHTML={{__html: products.description}}>
                      </div>
                  </div>
                </div>
              </div>
            </div>
            : null
        )

        )}
      </div>

    );
  };

}

export default ProductsInfo;