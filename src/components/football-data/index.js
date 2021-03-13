
import React, { Component } from "react";
import "./index.css";
const classNames = require('classnames');

export default class FootballMatchesData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedYear: null,
      listData:{},
      initialRender:true
    };
  }

  fetchData() {
    let that = this;
    fetch(`https://jsonmock.hackerrank.com/api/football_competitions?year=${this.state.selectedYear}`, { method: "GET" }).then((data) => {
      data.json().then((jsonData) => {
        //console.log(jsonData);
        that.setState({listData:jsonData});
        that.setState({initialRender:false});
      });
    })
  }

  onClick = (year) => (e) => {
    // Code written in next line is to take care of adding active class to selected year for css purpose.
    this.setState({
      selectedYear: year
    }, () => {
      this.fetchData();
    })
  }

  render() {
    var years = [2011, 2012, 2013, 2014, 2015, 2016, 2017];
    let totalMatches = this.state.listData.data && this.state.listData.data.length?this.state.listData.data.length:0;
    return (
      <div className="layout-row">
        <div className="section-title">Select Year</div>
        <ul className="sidebar" data-testid="year-list">
          {years.map((year, i) => {
            return (
              <li className={
                classNames({
                  'sidebar-item': true,
                  'active': this.state.selectedYear === year
                })
              }
                onClick={this.onClick(year)}
                key={year}>
                <a>{year}</a>
              </li>
            )
          })}
        </ul>

        <section className="content">
          {totalMatches>0 ? (<section>
          <div className="total-matches" data-testid="total-matches">Total matches: {totalMatches}</div>

            <ul className="mr-20 matches styled" data-testid="match-list">
              {this.state.listData.data.map((detail, index)=>(<li key={index} className="slide-up-fade-in">Match {detail.name} won by {detail.winner} </li>))}              
            </ul>
          </section>) : !this.state.initialRender?(
              <div data-testid="no-result" className="slide-up-fade-in no-result">
                No Matches Found
          </div>):""}
        </section>
      </div>
    );
  }
}