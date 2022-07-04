import React, { Component } from 'react';
import { client } from '../../../index.js'
import { gql } from '@apollo/client';
import s from './Style/productsStore.module.css';
import notAvailable from '../../../not-available.png';
import ProductCart from '../ProductCart/ProductCart';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../../../App.js';
import Pagination from '../../Pagination.js';
import '../../../App.css'

export const Product_Query = gql`
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
      }
     }
    } 
`
  ;
class ProductsStore extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
      currentPage: null,
      totalPages: null,
      productsAll: [],
      currentProducts: [],
      category: []
    }
  }
  
  componentDidMount = async () => {
    const response = await client.query({
      query: Product_Query
    })
    this.setState({
      products: response.data.category.products
    })
    this.setState({
      category: this.state.products.map(products => products.category )
    })

  }
  // {quantityId: [] , quantity: 1}
  routePath = window.location.pathname;
  routeText = this.routePath.replace(/^./, "");
  routeToLowerCase = this.routeText.toLowerCase();
  onPageChanged = data => {
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;

    const currentProducts = this.state.products.filter(products => products.category === this.routeToLowerCase || this.routeToLowerCase === "all" || this.routeToLowerCase === "").slice(offset, offset + pageLimit)

    this.setState({ currentProducts, currentPage, totalPages });
  }
  clickCart = () => {
    if (this.props.click) {
      this.props.click();
    }
  }
  countId = () => {
    if (this.props.CountId) {
      this.props.CountId();
    }
  }
  clickCartId = () => {
    if (this.props.clickCartId) {
      this.props.clickCartId();
    }
  }

  render() {
    
   
    const {currentPage, totalPages }  = this.state;
    const productsAll = this.state.products.filter(products => products.category === this.routeToLowerCase || this.routeToLowerCase === "all" || this.routeToLowerCase === "").length;
    if (productsAll === 0) return null;
    
    return (
      <div>
        <AppContext.Consumer>
          {value => (
            this.state.currentProducts.map((products) => (
              this.routeToLowerCase === products.category || this.routeToLowerCase === 'all'||  this.routeToLowerCase === "" ?
                <div key={products.id} >
                  <div className={s.column}>
                    <div className={s.rowHover}>
                      <div className={s.row}>
                      
                      </div>
                      <div>
                      </div>
                      <div className={ this.props.isClickOn?s.noHover: s.product } >
                        <NavLink to={`/Info/${products.id}`} >
                          <img className={s.gallery} src={products.gallery} onError={(e) => { e.target.onerror = null; e.target.src = notAvailable }} />
                        </NavLink>
                      </div>
                    </div >
                    <div className={this.props.isClickOn? s.productNameBlack : s.productName}>{products.name}</div>
                    <div id={products.id} onClick={products.inStock?this.props.CountId:null}>
                    <div className={products.inStock ? s.circleCartTrue : s.circleCartFalse} >
                      <div >
                        <ProductCart />
                        </div>
                      </div>
                    </div>
                    {products.prices.map((prices) => {
                      return (
                        <div className={s.price}>
                          <div class>{value.state.selectValue.slice(0, -4) === prices.currency.symbol ? prices.currency.symbol + " " + prices.amount : null} </div>
                        </div>
                      )
                    })}
                  </div>
                  
                </div>
                : null))
          )}
        </AppContext.Consumer>
        
        <div className="container mb-5">
        <div className="row d-flex flex-row py-5">
          <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
            <div className="d-flex flex-row align-items-center">
              { currentPage && (
                <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                  Page <span className="font-weight-bold">{ currentPage }</span> / <span className="font-weight-bold">{ totalPages }</span>
                </span>
              ) }
            </div>
            <div >
              <Pagination totalRecords={productsAll} pageLimit={3} pageNeighbours={1} onPageChanged={this.onPageChanged} />
            </div>
          </div>
        </div>
      </div>
                </div>

    );
  }
}

export default ProductsStore;