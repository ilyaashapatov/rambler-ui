import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { injectSheet } from '../theme'
import { isolateMixin } from '../utils/mixins'
import { MONTHS, DAYS, MIN_YEAR, MAX_YEAR } from './CalendarDirectory'

const datePropTypes = [
  PropTypes.instanceOf(Date),
  PropTypes.string,
  PropTypes.number
]

@injectSheet((theme) => ({
  root: {
    display: 'inline-block',
    width: 275,
    padding: 15,
    backgroundColor: theme.calendar.colors.default.background,
    boxSizing: 'border-box',
    '&': {
      fontFamily: theme.calendar.fontFamily.service
    },
    '&$isMedia': {
      fontFamily: theme.calendar.fontFamily.media
    },
    '&$withSelected': {
      userSelect: 'none'
    }
  },
  headline: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 15,
    padding: '0 10px',
    boxSizing: 'border-box'
  },
  month: {
    position: 'relative',
    top: 1,
    lineHeight: theme.calendar.month.size + 'px',
    fontSize: theme.calendar.month.fontSize,
    fontWeight: theme.calendar.month.fontWeight,
    color: theme.calendar.colors.default.text
  },

  item: {
    extend: isolateMixin,
    display: 'inline-block',
    flex: 'none',
    border: 0,
    outline: 'none !important',
    background: 'none',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    boxSizing: 'border-box',
    'button&::-moz-focus-inner': {
      border: 'none !important',
      outline: 'none !important'
    },
    '$withSelected &': {
      transitionDuration: theme.calendar.animationDuration,
      transitionProperty: 'color, background-color'
    }
  },
  day: {
    composes: '$item',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: theme.calendar.size
  },

  arrow: {
    composes: '$item',
    position: 'relative',
    width: theme.calendar.arrows.size,
    height: theme.calendar.arrows.size,
    color: theme.calendar.arrows.service.default,
    cursor: 'pointer',
    overflow: 'hidden',
    '&:hover': {
      color: theme.calendar.arrows.service.hover
    },
    '$isMedia &': {
      color: theme.calendar.arrows.media.default
    },
    '$isMedia &:hover': {
      color: theme.calendar.arrows.media.hover
    },
    '&:before': {
      boxSizing: 'border-box',
      position: 'absolute',
      top: -1,
      left: 3,
      content: '""',
      width: 9,
      height: 9,
      border: 'solid',
      borderWidth: '0 0 1px 1px',
      transform: 'rotate(45deg)',
      transformOrigin: 'left bottom'
    }
  },
  prev: {
    composes: '$arrow'
  },
  next: {
    composes: '$arrow',
    transform: 'scaleX(-1)'
  },

  week: {
    display: 'flex',
    margin: '20px 0 11px'
  },
  weekDay: {
    composes: '$day',
    height: theme.calendar.weekDay.size,
    fontSize: theme.calendar.weekDay.fontSize,
    '&': {
      color: theme.calendar.colors.weekDay.text
    },
    '&$isWeekend': {
      color: theme.calendar.colors.weekend.text
    }
  },

  days: {
    overflow: 'hidden',
    '$isAnimate &': {
      transitionDuration: theme.calendar.animationDuration,
      transitionProperty: 'height'
    }
  },
  daysWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    '$isAnimate &': {
      transitionDuration: theme.calendar.animationDuration,
      transitionProperty: 'transform'
    }
  },
  dateDay: {
    composes: '$day',
    height: theme.calendar.date.size,
    fontSize: theme.calendar.date.fontSize,
    '&': {
      color: theme.calendar.colors.default.text,
      backgroundColor: theme.calendar.colors.default.background
    },
    '$withSelected &': {
      cursor: 'pointer'
    },
    '$withSelected &:hover': {
      color: theme.calendar.colors.hover.text
    },
    '&$isWeekend': {
      color: theme.calendar.colors.weekend.text,
      '$withSelected &:hover': {
        color: theme.calendar.colors.hover.text
      }
    },
    '&$isToday': {
      fontWeight: 500,
      color: theme.calendar.colors.today.text,
      '$withSelected &:hover': {
        color: theme.calendar.colors.todayHover.text
      }
    },
    '&$isSelected': {
      color: theme.calendar.colors.selected.text,
      backgroundColor: theme.calendar.colors.selected.background,
      '$withSelected &:hover': {
        color: theme.calendar.colors.hover.text
      }
    },
    '&$isActive': {
      color: theme.calendar.colors.active.text,
      backgroundColor: theme.calendar.colors.active.background,
      '$withSelected &:hover': {
        color: theme.calendar.colors.activeHover.text,
        backgroundColor: theme.calendar.colors.activeHover.background
      }
    },
    '&$isDisable': {
      color: theme.calendar.colors.disabled.text,
      '$withSelected &:hover': {
        color: theme.calendar.colors.hover.text
      }
    }
  },

  withSelected: {},
  isWeekend: {},
  isToday: {},
  isSelected: {},
  isActive: {},
  isDisable: {},
  isMedia: {},
  isAnimate: {}
}), {name: 'Calendar'})
export default class Calendar extends Component {

  static propTypes = {
    /**
     * CSS-класс контейнера
     */
    className: PropTypes.string,
    /**
     * Стили контейнера
     */
    style: PropTypes.object,
    /**
     * Тип стиля календаря
     */
    type: PropTypes.oneOf(['service', 'media']),
    /**
     * Устанавливает отображаемый месяц при инициализации.
     * Принимает числовое значение месяца, начиная с 0
     */
    initMonth: PropTypes.number,
    /**
     * Устанавливает отображаемый месяц при инициализации.
     */
    initYear: PropTypes.number,
    /**
     * Устанавливает минимальный год для отображения
     */
    minYear: PropTypes.number,
    /**
     * Устанавливает максимальный год для отображения
     */
    maxYear: PropTypes.number,
    /**
     * Устанавливает текущую дату.
     * Принимает объект Date, строку или число в формате YYYYMMDD
     */
    today: PropTypes.oneOfType(datePropTypes),
    /**
    *  Выбранная дата или период.
    *  Принимает объект Date, строку или число в формате YYYYMMDD
    *  или, в случае с выбором периода, массив
    *  Возвращ
    */
    value: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.oneOfType(datePropTypes)),
      ...datePropTypes
    ]),
    /**
     * Возможность выбора периода
     */
    range: PropTypes.bool,
    /**
     * Скрывает возможность переключения
     */
    hiddenSwitchable: PropTypes.bool,
    /**
     * Скрывает год
     */
    hiddenYear: PropTypes.bool,
    /**
     * Устанавливает подстветку выходных дней (сб и вс)
     */
    showWeekend: PropTypes.bool,
    /**
     * Коллбек, вызывающийся при изменении состояния.
     * Возвращает число в формате YYYYMMDD
     * или массив, в случае с выбором периода
     */
    onChange: PropTypes.func,
    /**
     * Функция валидации. Срабатывает перед onChange.
     * Должна возвращать true/false после валидации.
     */
    onValidate: PropTypes.func
  }

  static defaultProps = {
    type: 'service',
    minYear: MIN_YEAR,
    maxYear: MAX_YEAR,
    range: false,
    hiddenSwitchable: false,
    hiddenYear: false,
    showWeekend: false
  }

  constructor(props) {
    super(props)
    this.state = this.setDisplay(props)
  }

  componentDidUpdate(prevProps) {
    const {initMonth, initYear} = this.props

    if (prevProps.initMonth !== initMonth || prevProps.initYear !== initYear)
      this.resetDisplay()
  }

  setDisplay(props) {
    const {
      initMonth,
      initYear,
      minYear,
      maxYear
    } = props

    let showMonth = Number(initMonth)
    let showYear = Number(initYear)
    let today = this.parseDate(props.today) || this.parseDate(new Date())

    if (!Number.isInteger(showMonth))
      showMonth = today.month

    if (!Number.isInteger(showYear) || showYear < minYear || showYear > maxYear)
      showYear = today.year

    return {
      ...this.getDates(showMonth, showYear),
      showMonth,
      showYear
    }
  }

  resetDisplay() {
    this.setState({
      ...this.setDisplay(this.props)
    })
  }

  getDates = (showMonth, showYear) => {
    const dates = []

    const months = this.props.hiddenSwitchable
      ? [showMonth - 1, showMonth, showMonth + 1]
      : [showMonth - 2, showMonth - 1, showMonth, showMonth + 1, showMonth + 2]

    let first
    let last

    months.map((m, index) => {
      let month = m
      let year = showYear

      if (m < 0) {
        month = m + 12
        year--
      } else if (m > 11) {
        month = m - 12
        year++
      }

      let numFrom = 1
      let numTo = new Date(year, month + 1, 0).getDate()

      if (index === 0)
        numFrom = numTo - (new Date(year, month + 1, 1).getDay() || 7) + 2
      else if (index === months.length - 1)
        numTo = 8 - (new Date(year, month, 1).getDay() || 7)

      if (month === showMonth) {
        first = this.toNumber(year, month, 1)
        last = this.toNumber(year, month, numTo)
      }

      let i

      for (i = numFrom; i <= numTo; i++)
        dates.push(
          this.toNumber(year, month, i)
        )
    })

    return {dates, first, last}
  }

  toNumber = (year, month, date) =>
    year * 10000 + month * 100 + date

  dateToNumber = date =>
    this.toNumber(date.getFullYear(), date.getMonth(), date.getDate())

  parseDate = value => {
    let num = value instanceof Date ? this.dateToNumber(value) : Number(value)
    if (!num) return null

    const year = Math.floor(num / 10000)
    const month = Math.floor((num % 10000) / 100)
    const date = num % 100

    if (!year || year < this.props.minYear || year > this.props.maxYear)
      return null
    if (!month || month < 1 || month > 12)
      return null
    if (!date || date < 0 || date > 31)
      return null
    if ([4, 6, 9, 11].includes(month) && date > 30)
      return null
    if (month === 2 && (date > 29 || (year % 4 !== 0 && date > 28)))
      return null

    return {year, date, month, number: this.toNumber(year, month, date)}
  }

  onPrev = () => {
    if (!this.state.animate) {
      let {showMonth, showYear} = this.state

      if (--showMonth < 0) {
        showMonth = 11
        showYear--
      }

      this.updateShowMonth(showMonth, showYear)
    }
  }

  onNext = () => {
    if (!this.state.animate) {
      let {showMonth, showYear} = this.state

      if (++showMonth > 11) {
        showMonth = 0
        showYear++
      }

      this.updateShowMonth(showMonth, showYear)
    }
  }

  updateShowMonth(showMonth, showYear) {
    const {
      dates,
      first,
      last
    } = this.getDates(showMonth, showYear)

    this.setState({
      first,
      last,
      showMonth,
      showYear,
      animate: true
    }, () => {
      setTimeout(() => {
        this.setState({
          dates,
          animate: false
        })
      }, 210)
    })
  }

  onClick = (day) => {
    const {range} = this.props
    const value = [].concat(this.props.value)

    const dateFrom = this.parseDate(value[0])
    const dateTo = this.parseDate(value[1])

    if (dateFrom && dateFrom.number === day && range && !dateTo)
      return

    if (range && dateFrom && !dateTo)
      if (day < dateFrom.number)
        this.onSetNewDates([
          day,
          dateFrom.number
        ])
      else
        this.onSetNewDates([
          dateFrom.number,
          day
        ])
    else
      this.onSetNewDates([day])
  }

  onSetNewDates([dateFrom, dateTo = null]) {
    const {range, onChange, onValidate} = this.props

    const value = range
      ? [dateFrom, dateTo]
      : dateFrom

    if (typeof onValidate === 'function' && onValidate(value) === false)
      return

    if (typeof onChange === 'function')
      onChange(value)
  }

  render() {
    const {
      className,
      style,
      type,
      range,
      today,
      hiddenSwitchable,
      showWeekend,
      hiddenYear,
      onChange,
      classes,
      theme
    } = this.props

    const {
      animate,
      dates,
      last,
      first,
      showMonth,
      showYear
    } = this.state

    const classNameRoot = classnames(className, classes.root, {
      [classes.isAnimate]: animate,
      [classes.withSelected]: typeof onChange === 'function',
      [classes.isMedia]: type === 'media'
    })

    let monthLabel = MONTHS[showMonth]

    if (!hiddenYear)
      monthLabel += ', ' + showYear

    const styleDays = {
      height: (theme.calendar.size * (Math.ceil(dates.indexOf(last) / 7) - Math.floor(dates.indexOf(first) / 7))) + 'px'
    }

    const styleDaysWrap = {
      transform: `translateY(${-1 * theme.calendar.size * Math.floor(dates.indexOf(first) / 7)}px)`
    }

    const dateToday = this.parseDate(today)

    const value = [].concat(this.props.value || this.state.value)
    const dateFrom = this.parseDate(value[0])
    const dateTo = this.parseDate(value[1])

    return (
      <div className={classNameRoot} style={style}>
        <div className={classes.headline}>
          {!hiddenSwitchable && (
            <div
              className={classes.prev}
              onClick={this.onPrev}
            />
          )}

          <div
            className={classes.month}
            children={monthLabel}
          />

          {!hiddenSwitchable && (
            <div
              className={classes.next}
              onClick={this.onNext}
            />
          )}
        </div>

        <div className={classes.week}>
          {DAYS.map((el, index) => {
            const classNameDay = classnames(classes.weekDay, {
              [classes.isWeekend]: showWeekend && (index === 5 || index === 6)
            })

            return (
              <div
                key={index}
                className={classNameDay}
                children={el}
              />
            )
          })}
        </div>

        <div className={classes.days} style={styleDays} onMouseOut={this.onMouseOut}>
          <div className={classes.daysWrap} style={styleDaysWrap}>
            {dates.map((el, index) => {
              let cls = null

              if ((dateFrom && el === dateFrom.number) || (range && dateTo && el === dateTo.number))
                cls = classes.isActive
              else if (range && dateFrom && dateTo && el > dateFrom.number && el < dateTo.number)
                cls = classes.isSelected
              else if (showWeekend && ((index + 1) % 7 === 6 || (index + 1) % 7 === 0))
                cls = classes.isWeekend

              return (
                <div
                  key={el}
                  className={classnames(classes.dateDay, cls, {
                    [classes.isToday]: dateToday && el === dateToday.number,
                    [classes.isDisable]: el < first || el > last
                  })}
                  children={el % 100}
                  onClick={() => this.onClick(el)}
                />
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}
