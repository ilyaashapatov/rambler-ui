/**
 * Компонент попапа
 * Скетч: * https://zpl.io/ZTWunL
 */

import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import ClearIcon from '../icons/forms/ClearIcon'
import VisibilityAnimation from '../VisibilityAnimation'
import OnClickOutside from '../OnClickOutside'
import renderToLayer from '../hoc/render-to-layer'
import zIndexStack from '../hoc/z-index-stack'
import {ESCAPE} from '../constants/keys'
import {POPUP_ZINDEX} from '../constants/z-indexes'
import {injectSheet} from '../theme'
import {isolateMixin, middleMixin, ifDesktop} from '../utils/mixins'

@zIndexStack(POPUP_ZINDEX)
@renderToLayer
@injectSheet(
  theme => ({
    backdrop: {
      extend: [isolateMixin, middleMixin],
      fontFamily: theme.fontFamily,
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      paddingTop: 20,
      paddingBottom: 20,
      textAlign: 'center',
      overflowY: 'auto',
      overflowX: 'hidden',
      marginTop: -10,
      opacity: 0,
      transitionDuration: theme.popup.animationDuration,
      transitionProperty: 'margin-top, opacity'
    },
    'backdrop-black': {
      backgroundColor: theme.popup.colors.backdrop.default
    },
    'backdrop-blue': {
      backgroundColor: theme.popup.colors.backdrop.blue
    },
    isVisible: {
      marginTop: 0,
      opacity: 1
    },
    popup: {
      position: 'relative',
      display: 'inline-block',
      boxSizing: 'border-box',
      borderRadius: theme.popup.borderRadius,
      boxShadow: theme.popup.boxShadow,
      padding: 25,
      color: theme.popup.colors.text,
      minWidth: 300,
      maxWidth: 'calc(100% - 20px)',
      marginLeft: 10,
      marginRight: 10,
      backgroundColor: theme.popup.colors.background,
      fontSize: theme.popup.text.fontSize,
      lineHeight: `${theme.popup.text.lineHeight}px`,
      textAlign: 'left',
      ...ifDesktop({
        minWidth: 350,
        maxWidth: 'auto'
      })
    },
    title: {
      marginBottom: 20,
      paddingRight: 25,
      fontSize: theme.popup.title.fontSize,
      lineHeight: `${theme.popup.title.lineHeight}px`,
      fontWeight: 500
    },
    close: {
      position: 'absolute',
      top: 25,
      right: 25,
      border: 0,
      margin: 0,
      padding: 0,
      width: 15,
      height: 15,
      background: 'transparent',
      outline: 0,
      color: theme.popup.colors.close.default,
      cursor: 'pointer',
      '&:hover': {
        color: theme.popup.colors.close.hover
      }
    },
    buttons: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 30,
      '& > *': {
        flexGrow: 1,
        width: '50%'
      },
      '& > * + *': {
        marginLeft: 10,
        ...ifDesktop({
          marginLeft: 20
        })
      }
    }
  }),
  {name: 'Popup'}
)
export default class Popup extends PureComponent {
  static propTypes = {
    /**
     * Css-класс
     */
    className: PropTypes.string,
    /**
     * Inline-стили
     */
    style: PropTypes.object,
    /**
     * Css-класс для фонового слоя
     */
    backdropClassName: PropTypes.string,
    /**
     * Inline-стили для фонового слоя
     */
    backdropStyle: PropTypes.object,
    /**
     * Цвет фонового слоя
     */
    backdropColor: PropTypes.oneOf(['black', 'blue']),
    /**
     * Контент для попапа
     */
    children: PropTypes.node,
    /**
     * Заголовок
     */
    title: PropTypes.node,
    /**
     * Css-класс для заголовка
     */
    titleClassName: PropTypes.string,
    /**
     * Inline-стили для заголовка
     */
    titleStyle: PropTypes.object,
    /**
     * Css-класс блока с кнопками
     */
    buttonsContainerClassName: PropTypes.string,
    /**
     * Inline-стили блока с кнопками
     */
    buttonsContainerStyle: PropTypes.object,
    /**
     * Контролирует видимость попапа
     */
    isOpened: PropTypes.bool,
    /**
     * Кнопка успешного действия (если она одна, то будет расятнута на все ширину)
     */
    okButton: PropTypes.node,
    /**
     * Кнопка отмены
     */
    cancelButton: PropTypes.node,
    /**
     * Кнопка закрытия попапа
     */
    showClose: PropTypes.bool,
    /**
     * Закрытие попапа кнопкой esc
     */
    closeOnEsc: PropTypes.bool,
    /**
     * Закрытие попапа по клику вне него
     */
    closeOnClickOutside: PropTypes.bool,
    /**
     * Коллбек вызывающийся после открытия попапа
     */
    onOpen: PropTypes.func,
    /**
     * Коллбек вызывающийся при нажатии на крестик (автоматически проставляется, если используется `@providePopup`)
     */
    onRequestClose: PropTypes.func,
    /**
     * Коллбек вызывающийся после закрытия попапа
     */
    onClose: PropTypes.func
  }

  static defaultProps = {
    isOpened: false,
    showClose: true,
    closeOnEsc: true,
    closeOnClickOutside: true,
    backdropColor: 'black',
    onOpen: () => {},
    onRequestClose: () => {},
    onClose: () => {}
  }

  componentWillUnmount() {
    this.onWillInvisible()
  }

  onWillVisible = () => {
    if (this.props.closeOnEsc)
      window.addEventListener('keydown', this.onKeyDown)
  }

  onWillInvisible = () => {
    if (this.props.closeOnEsc)
      window.removeEventListener('keydown', this.onKeyDown)
  }

  onKeyDown = event => {
    if (event.keyCode === ESCAPE) this.props.onRequestClose()
  }

  renderContent() {
    const {
      children,
      className,
      style,
      title,
      titleStyle,
      titleClassName,
      buttonsContainerStyle,
      buttonsContainerClassName,
      classes,
      showClose,
      okButton,
      cancelButton,
      onRequestClose,
      closeOnClickOutside
    } = this.props

    const content = (
      <div style={style} className={classnames(classes.popup, className)}>
        {showClose && (
          <button className={classes.close} onClick={onRequestClose}>
            <ClearIcon size={15} color="currentColor" />
          </button>
        )}
        {title && (
          <header
            style={titleStyle}
            className={classnames(classes.title, titleClassName)}>
            {title}
          </header>
        )}
        {children}
        {(okButton || cancelButton) && (
          <footer
            style={buttonsContainerStyle}
            className={classnames(classes.buttons, buttonsContainerClassName)}>
            {okButton}
            {cancelButton}
          </footer>
        )}
      </div>
    )

    if (closeOnClickOutside)
      return <OnClickOutside handler={onRequestClose}>{content}</OnClickOutside>

    return content
  }

  render() {
    const {
      isOpened,
      backdropClassName,
      backdropStyle,
      backdropColor,
      theme,
      classes,
      onOpen,
      onClose
    } = this.props

    return (
      <VisibilityAnimation
        isVisible={isOpened}
        activeClassName={classes.isVisible}
        animationDuration={theme.popup.animationDuration}
        onWillVisible={this.onWillVisible}
        onVisible={onOpen}
        onWillInvisible={this.onWillInvisible}
        onInvisible={onClose}>
        <div
          ref={el => {
            this.backdrop = el
          }}
          style={backdropStyle}
          className={classnames(
            classes.backdrop,
            classes[`backdrop-${backdropColor}`],
            backdropClassName
          )}>
          {this.renderContent()}
        </div>
      </VisibilityAnimation>
    )
  }
}
