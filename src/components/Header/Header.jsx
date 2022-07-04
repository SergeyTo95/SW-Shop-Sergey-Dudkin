import React from 'react';
import { NavLink } from 'react-router-dom';
import IconCart from '../Carts/Icons-Cart';
import s from './header.module.css';
import logo from '../../logo.png';
import '../../index.css'
import Currency from '../Products/Currency/Currency';
import { CartMini } from '../Carts/Carts';

class Header extends
  React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClickOn: false
    };

  }

  render() {
    let CartItems = this.props.countId.quantityId.map(c => c.id);
    let Click;
    if (CartItems.length > 0 != []) {
      Click = this.props.isClickOn;
    } else {
      Click = null;
    }
    return (
      <div className={s.header}>
        <div className={s.navheader}>
          <div>
            <nav>
              <NavLink className={({ isActive }) => isActive ? s.active : ""} to="/All" style={({ isActive }) => ({ color: isActive ? 'mediumseagreen' : 'black' })}>All</NavLink>
              <NavLink className={({ isActive }) => isActive ? s.active : ""} to="/Tech">Tech</NavLink>
              <NavLink className={({ isActive }) => isActive ? s.active : ""} to="/Clothes" style={({ isActive }) => ({ color: isActive ? 'mediumseagreen' : 'black' })}>Clothes</NavLink>
            </nav>
          </div>
        </div>
        <div className={s.logo}>
          <img src={logo} alt="logo.img" />
        </div>
        <div>
          <div className={s.currency} ><Currency selectValue={this.props.selectValue}handleChange={this.props.handleChange}/></div>
        </div>
        <div onClick={this.props.handleClick} className={s.night === this.state.isClickOn}>

          <IconCart />
        </div>
        {Click ?
          <CartMini IncrementItem={this.props.IncrementItem} countId={this.props.countId} DecrementItem={this.props.DecrementItem} QuantityChange={this.props.QuantityChange} quantity={this.props.quantity} handleAttribute={this.props.handleAttribute}
          colorAttribute={this.props.colorAttribute} isAttribute={this.props.isAttribute}activeName={this.props.activeName} activeColor={this.props.activeColor}
          />
          : null}
        <div className={this.props.countId.quantityId.reduce((acc,c) => (acc+ c.quantity),0 > 0) ? s.circule : null}>
          <div className={s.circuleItem}>{this.props.countId.quantityId.reduce((acc,c) => (acc+ c.quantity),0 > 0) ? (this.props.countId.quantityId.reduce((acc, q) => (acc + q.quantity),0) ) : null}</div>
        </div>
      </div>



    )

  }
}
export default Header;
