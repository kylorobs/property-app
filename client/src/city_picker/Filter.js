import React from 'react';
import Input from '../buttons_inputs/Input.js'
import PostCodeCheck from './PostCodeCheck.js'

class Filter extends React.Component{
  constructor(props){
    super(props)
    this.onSelectorChange = this.onSelectorChange.bind(this)
    this.onPostCodeChange = this.onPostCodeChange.bind(this)
    this.onTypeChange = this.onTypeChange.bind(this)
    this.onReadyToSubmitChange = this.onReadyToSubmitChange.bind(this)
  }

  onSelectorChange(e){
    let allInputs = document.querySelectorAll('input');
    allInputs.forEach(input => {input.value = ' '})

    let typeCurrentlySelected = document.querySelectorAll('li');
    typeCurrentlySelected.forEach(i => {
      i.classList.remove('typeSelected')
      i.style.display = 'none';
    })

    var target = e.target;
    console.log(target)
    var selected = target.options[target.selectedIndex].value;
    console.log(selected)
    selected.toLowerCase();
    this.props.cityChange(selected)
  }

  onPostCodeChange(newPostCode){
    this.props.postCodeChange(newPostCode)
  }

  onTypeChange(type){
    this.props.typeChange(type)
  }

  onReadyToSubmitChange(bool){
    this.props.readyToSubmit(bool)
  }



  render(){

    let styleName;
    if (this.props.name === "Home"){
      styleName = 'filterBoxOnHome'
    }
    else {
        styleName = 'filterBoxOnUI'
    }
      let result = (!this.props.filter) ? <div className="filterBoxOff"></div> :
      (<div className={styleName}>
        <span className="heading"> Your chosen city:  </span>
        <select id="citySelector" onChange={this.onSelectorChange}>
          <option value="bournemouth">Bournemouth</option>
          <option value="bristol">Bristol</option>
            <option value="ipswich">Ipswich</option>
          <option value="leeds">Leeds</option>
          <option  value="london">London</option>
          <option value="middlesbrough">Middlesbrough</option>
          <option value={this.props.selectedCity} selected>{this.props.selectedCity}</option>
        </select>
        <span className="heading"> Enter the postcode </span>
        <Input onChange={this.onPostCodeChange}  id="postcode-input" placeholder="eg SW15 6BB"  type="text"/>
        <PostCodeCheck onReadyChange={this.onReadyToSubmitChange} changeType= {this.onTypeChange} selectedCity ={this.props.selectedCity} selectedPostCode={this.props.selectedPostCode} />
      </div>
    )
      return result
  }
}




export default Filter;
