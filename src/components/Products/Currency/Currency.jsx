import React, { Component, Fragment } from 'react';
import {client} from '../../../index.js';
import { AppContext } from '../../../App.js';
import s from './currency.module.css';
import { gql } from "@apollo/client";
import Select from 'react-select';

const Currency_Query = gql`
{
    currencies{
      label
      symbol
    }
  }
  `
  ;

  

class Currency extends Component {
  constructor(props){
    super(props);
    this.state = {
      currencies:  []
    }
  }
  
    componentDidMount = async () =>{
      const response = await client.query({
        query: Currency_Query
      })
      this.setState({
        currencies:response.data.currencies
      })
    }
    render() {   
      return(
        <AppContext.Consumer>
        {value => (
        <div className={s.select}>
          <select value={value.state.selectValue} onChange={this.props.handleChange}> 
            {this.state.currencies.map((currencies) =>(
                <option >
                    <div className={s.option}>
                    {currencies.symbol} {currencies.label}
                    </div>                  
                </option>
                )
              ) 
            }
                </select> 

        </div>
        
            )}
            </AppContext.Consumer>
        );
    }
}

export default Currency;
