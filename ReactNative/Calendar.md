```js
/**
 * React Calendar Component v0.1.0
 *
 * Copyright 2016, Dimitar Ivanov
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
import React, {Component} from 'react';
import './RevCalendar.css';

export default class RevCalendar extends Component {
  constructor(props) {
    super(props);
    var date = new Date();
    this.state = {
      year: date.getFullYear(),
      month: date.getMonth(),
      selectedYear: date.getFullYear(),
      selectedMonth: date.getMonth(),
      selectedDate: date.getDate(),
      selectedDt: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
      startDay: 1,
      weekNumbers: false,
      minDate: this.props.minDate ? this.props.minDate : null,
      disablePast: this.props.disablePast ? this.props.disablePast : false,
      dayNames: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      monthNames: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
      ],
      monthNamesFull: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
      ],
      firstOfMonth: null,
      daysInMonth: null,
    };
  }

  componentWillMount() {
    // this.setState(this.calc.call(null, this.state.year, this.state.month));

    let state = {};
    state.year = this.props.year !== null ? this.props.year : this.state.year;
    state.month =
      this.props.month !== null ? this.props.month : this.state.month;
    Object.assign(state, this.calc.call(null, state.year, state.month));
    this.setState(state);
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    if (this.props.onSelect && prevState.selectedDt !== this.state.selectedDt) {
      // this.props.onSelect.call(this.getDOMNode(), this.state);
      this.props.onSelect(this.state.selectedDt);
    }
  }

  render() {
    let {defaultValue = new Date()} = this.props;
    return (
      <div className="r-calendar">
        <div className="r-inner">
          <Header
            monthNames={this.state.monthNamesFull}
            month={this.state.month}
            year={this.state.year}
            onPrev={this.getPrev}
            onNext={this.getNext}
          />
          <WeekDays
            dayNames={this.state.dayNames}
            startDay={this.state.startDay}
            weekNumbers={this.state.weekNumbers}
          />
          <MonthDates
            key={this.state.firstOfMonth}
            month={this.state.month}
            year={this.state.year}
            daysInMonth={this.state.daysInMonth}
            firstOfMonth={this.state.firstOfMonth}
            startDay={this.state.startDay}
            onSelect={this.selectDate}
            weekNumbers={this.state.weekNumbers}
            disablePast={this.state.disablePast}
            minDate={this.state.minDate}
            defaultValue={defaultValue}
            selectedEle={this.state.selectedElement}
          />
        </div>
      </div>
    );
  }

  calc = (year, month) => {
    if (this.state.selectedElement) {
      if (
        this.state.selectedMonth !== month ||
        this.state.selectedYear !== year
      ) {
        this.state.selectedElement.classList.remove('r-selected');
      } else {
        this.state.selectedElement.classList.add('r-selected');
      }
    }
    return {
      firstOfMonth: new Date(year, month, 1),
      daysInMonth: new Date(year, month + 1, 0).getDate(),
    };
  };

  getPrev = () => {
    var state = {};
    if (this.state.month > 0) {
      state.month = this.state.month - 1;
      state.year = this.state.year;
    } else {
      state.month = 11;
      state.year = this.state.year - 1;
    }
    Object.assign(state, this.calc.call(null, state.year, state.month));
    this.setState(state);
  };

  getNext = () => {
    var state = {};
    if (this.state.month < 11) {
      state.month = this.state.month + 1;
      state.year = this.state.year;
    } else {
      state.month = 0;
      state.year = this.state.year + 1;
    }
    Object.assign(state, this.calc.call(null, state.year, state.month));
    this.setState(state);
  };

  selectDate = (year, month, date, evt) => {
    if (this.state.selectedElement) {
      this.state.selectedElement.classList.remove('r-selected');
    }
    evt.target.classList.add('r-selected');
    this.setState({
      selectedYear: year,
      selectedMonth: month,
      selectedDate: date,
      selectedDt: new Date(year, month, date),
      selectedElement: evt.target,
    });
  };
}

class Header extends Component {
  render() {
    return (
      <div className="r-row r-head">
        <div
          className="r-cell r-prev"
          onClick={this.props.onPrev.bind(this)}
          role="button"
          tabIndex="0"
        />
        <div className="r-cell r-title">
          {this.props.year}-{this.props.monthNames[this.props.month]}
        </div>
        <div
          className="r-cell r-next"
          onClick={this.props.onNext.bind(this)}
          role="button"
          tabIndex="0"
        />
      </div>
    );
  }
}
class WeekDays extends Component {
  render() {
    var that = this,
      haystack = Array.apply(null, {length: 7}).map(Number.call, Number);
    return (
      <div className="r-row r-weekdays">
        {(() => {
          if (that.props.weekNumbers) {
            return <div className="r-cell r-weeknum">wn</div>;
          }
        })()}
        {haystack.map(function (item, i) {
          return (
            <div key={'' + item + i} className="r-cell">
              {that.props.dayNames[(that.props.startDay + i) % 7]}
            </div>
          );
        })}
      </div>
    );
  }
}

class MonthDates extends Component {
  constructor(props) {
    super(props);
    this.today = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
    );
  }

  render() {
    let {defaultValue, year, month, selectedEle, onSelect} = this.props;
    let haystack,
      day,
      className,
      weekStack = Array.apply(null, {length: 7}).map(Number.call, Number),
      that = this,
      startDay = this.props.firstOfMonth.getDay(),
      first = this.props.firstOfMonth.getDay(),
      janOne = new Date(that.props.year, 0, 1),
      rows = 5;

    if (
      (startDay === 6 && this.props.daysInMonth === 31) ||
      (startDay === 0 && this.props.daysInMonth > 29)
    ) {
      rows = 6;
    }

    className = rows === 6 ? 'r-dates' : 'r-dates r-fix';
    haystack = Array.apply(null, {length: rows}).map(Number.call, Number);
    day = this.props.startDay + 1 - first;
    while (day > 1) {
      day -= 7;
    }
    day -= 1;
    return (
      <div className={className}>
        {haystack.map(function (item, i) {
          let d;
          d = day + i * 7;
          return (
            <div key={i} className="r-row">
              {(() => {
                if (that.props.weekNumbers) {
                  var wn = Math.ceil(
                    ((new Date(that.props.year, that.props.month, d) - janOne) /
                      86400000 +
                      janOne.getDay() +
                      1) /
                      7,
                  );
                  return <div className="r-cell r-weeknum">{wn}</div>;
                }
              })()}
              {weekStack.map((item, i) => {
                let current, isDate;
                d += 1;
                isDate = d > 0 && d <= that.props.daysInMonth;

                if (isDate) {
                  current = new Date(that.props.year, that.props.month, d);
                  className =
                    current !== that.today
                      ? 'r-cell r-date'
                      : 'r-cell r-date r-today';
                  if (that.props.disablePast && current < that.today) {
                    className += ' r-past';
                  } else if (
                    that.props.minDate !== null &&
                    current < that.props.minDate
                  ) {
                    className += ' r-past';
                  }

                  //set defaultValue css
                  if (
                    year === defaultValue.getFullYear() &&
                    month === defaultValue.getMonth() &&
                    d === defaultValue.getDate() &&
                    !selectedEle
                  ) {
                    className += ' r-selected';
                  }

                  if (/r-past/.test(className)) {
                    return (
                      <div
                        key={d}
                        className={className}
                        role="button"
                        tabIndex="0">
                        {d}
                      </div>
                    );
                  }

                  return (
                    <div
                      key={d}
                      className={className}
                      onClick={(e) => {
                        console.log(d);
                        onSelect(
                          current.getFullYear(),
                          current.getMonth(),
                          current.getDate(),
                          e,
                        );
                      }}>
                      {d}
                    </div>
                  );
                }

                return <div key={d} className="r-cell"></div>;
              })}
            </div>
          );
        })}
      </div>
    );
  }
}
```

```css
.r-calendar {
  background-color: #eee;
  -moz-box-shadow: 0 0 5px #ccc;
  -webkit-box-shadow: 0 0 5px #ccc;
  box-shadow: 0 0 5px #ccc;
  font: normal 15px Helvetica Neue, Helvetica, Arial, sans-serif;
  min-width: 200px;
}
.r-calendar * {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -moz-transition: all 0.3s linear;
  -webkit-transition: all 0.3s linear;
  -o-transition: all 0.3s linear;
  transition: all 0.3s linear;
}
.r-calendar .r-row {
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  justify-content: center;
}
.r-calendar .r-cell {
  background-color: #ffffff;
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  flex-grow: 1;
  flex-basis: 0;
  justify-content: center;
  word-wrap: break-word;
  overflow-wrap: break-word;
}
.r-calendar .r-head {
  flex-grow: 1;
  flex-basis: 0;
}
.r-calendar .r-prev,
.r-calendar .r-next {
  background-color: #ffffff;
  cursor: pointer;
  outline: none;
}
.r-calendar .r-prev:before,
.r-calendar .r-next:before {
  position: relative;
  top: 0;
  content: '';
  display: inline-block;
  width: 0.6em;
  height: 0.6em;
  border-top: 0.2em solid #222222;
  transform: rotate(-45deg);
}
.r-calendar .r-prev:before {
  border-left: 0.2em solid #222222;
  transform: rotate(-45deg);
  margin-left: 0.3em;
}
.r-calendar .r-prev:hover:before {
  border-left-color: #ffffff;
  border-top-color: #ffffff;
}
.r-calendar .r-next:before {
  border-right: 0.2em solid #222222;
  transform: rotate(45deg);
  margin-right: 0.3em;
}
.r-calendar .r-next:hover:before {
  border-right-color: #ffffff;
  border-top-color: #ffffff;
}
.r-calendar .r-prev:hover,
.r-calendar .r-next:hover {
  background-color: #ffb438;
}
.r-calendar .r-title {
  flex-grow: 5;
  flex-basis: max-content;
}
.r-calendar .r-weekdays {
  flex-grow: 1;
  flex-basis: 0;
}
.r-calendar .r-weekdays .r-cell {
  font-weight: bold;
}
.r-calendar .r-dates {
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 6;
  flex-basis: 0;
}
.r-calendar .r-dates.r-fix {
  flex-grow: 5;
}
.r-calendar .r-dates .r-row {
  flex-grow: 1;
}
.r-calendar .r-dates .r-cell {
  background-color: #ffffff;
  border: solid 1px #ffffff;
}
.r-calendar .r-cell.r-date {
  flex-direction: column;
  cursor: pointer;
  outline: none;
}
.r-calendar .r-cell.r-date.r-today {
  background-color: #ffffff;
  border: solid 1px #0066cc;
}
.r-calendar .r-cell.r-date:not(.r-past):hover {
  background-color: #ffe2b2; /*#0066CC;*/
  border: solid 1px #ffe2b2;
  color: #ffffff;
}
.r-calendar .r-cell.r-date.r-selected {
  background-color: #ffb438;
  border: solid 1px #ffb438;
  color: #fff;
}
.r-calendar .r-cell.r-date.r-past {
  color: #999999;
  cursor: not-allowed;
}
.r-calendar .r-weeknum {
  color: #999999;
  font-size: 0.8em;
}
.r-calendar {
  position: relative;
  width: 100%;
}
.r-calendar:after {
  content: '';
  display: block;
  padding-bottom: 100%;
}
.r-calendar .r-inner {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
}
```

```js
import React from 'react';
import styled from 'styled-components';
import RevCalendar from './RevCalendar';

export default function TestPage(props) {
  return (
    <Wrapper>
      <h2>Test Page</h2>
      <div style={{width: 600}}>
        <RevCalendar
          defaultValue={new Date()}
          selectedDt={new Date()}
          disablePast={true}
          year={2022}
          month={5}
          onSelect={console.log}
        />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 80px 20px;
`;
```
