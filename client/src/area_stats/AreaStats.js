import React from 'react';

class AreaStats extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      sales : null,
      rents : null
    }
    this.fetchSales = this.fetchSales.bind(this)
    this.fetchRents = this.fetchRents.bind(this)
    this.findAverage = this.findAverage.bind(this)
    this.getAveragePrices = this.getAveragePrices.bind(this)
  }

  fetchSales(){
    let city = this.props.city
    let endpoint = `/api/city-listings/${city}/for-sale`;
    fetch(endpoint)
    .then(res => res.json())
    .then(results => {
      let sales = results.results;
      this.setState({sales: sales})
      console.log("Total sales in state: " + this.state.sales)
    })
    .catch(err => console.log("Error fetching" + err))
  }

  fetchRents(){
    let city = this.props.city
    let endpoint = `/api/city-listings/${city}/to-rent`;
    fetch(endpoint)
    .then(res => res.json())
    .then(results => {
      let rents = results.results;
      this.setState({rents: rents})
      console.log("Total rents in state: " + this.state.rents)
    })
    .catch(err => console.log("Error fetching" + err))
  }

  findAverage(array){
    if (array){
    return array.reduce(function(a, b){
        return a + b;
      })/ array.length;
    }
    else {
        console.log("empty array")
      }
  }

  getAveragePrices(data, beds){
    let bedsPrices;
    console.log("av function received data: " + data);
    let bedsArray = data.filter(item => {
      return item.beds === beds;
    })
    if (data === this.state.sales){
      bedsPrices = bedsArray.map((item, index) => {
        return item.sale_price;
      })
    }
    else if (data === this.state.rents){
      bedsPrices = bedsArray.map((item, index) => {
        return item.price_per_month;
      })
    }

    else {
      console.log("Getaverageprices function not working")
    }

    return Math.floor(this.findAverage(bedsPrices));
  }

  // shouldComponentUpdate(){
  //   if (this.props.city === this.props.city){
  //     return false
  //   }
  // }

  componentWillMount(){
    this.fetchSales()
    this.fetchRents()
  }



  render(){
    let sales = this.state.sales;
    let rents = this.state.rents;
    let message = "calculating...";

    let onebedsale = message;
    let onebedrent = message;
    let twobedsale = message;
    let twobedrent = message;
    let threebedsale = message;
    let threebedrent = message;
    let fourbedsale = message;
    let fourbedrent = message;

    if (sales && rents){
          onebedsale= this.getAveragePrices(sales, 1)
          onebedrent = this.getAveragePrices(rents, 1)
          twobedsale = this.getAveragePrices(sales, 2)
          twobedrent = this.getAveragePrices(rents, 2)
          threebedsale = this.getAveragePrices(sales, 3)
          threebedrent = this.getAveragePrices(rents,3)
          fourbedsale = this.getAveragePrices(sales, 4)
          fourbedrent = this.getAveragePrices(rents, 4)
    }

    return (
        <div>
          <h2> {this.props.city} </h2>
          <h4> Property type: {this.props.type} </h4>
          <div className="info-table">
          <table>
          <tr>
            <th>no. beds</th>
            <th>Av rent per month</th>
            <th>Av sale listing price</th>
          </tr>
            <tr>
              <td> 1 bed</td>
              <td> {onebedrent}</td>
              <td> {onebedsale} </td>
            </tr>
            <tr>
              <td> 2 bed</td>
              <td> {twobedrent}</td>
              <td> {twobedsale} </td>
            </tr>
            <tr>
              <td> 3 bed</td>
              <td> {threebedrent}</td>
              <td> {threebedsale} </td>
            </tr>
            <tr>
              <td> 4 bed</td>
              <td> {fourbedrent}</td>
              <td> {fourbedsale} </td>
            </tr>
          </table>
          </div>
        </div>
    )
  }
}

export default AreaStats


// [{sale_price: 5}, {sale_price: 10}, {sale_price: 15}]
