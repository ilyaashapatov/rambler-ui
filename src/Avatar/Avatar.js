import React, {PureComponent, cloneElement, isValidElement} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import * as profileIcons from '../icons/profiles'
import {injectSheet} from '../theme'
import {isolateMixin, middleMixin} from '../utils/mixins'

function calcProfileSize(size) {
  return Math.min(Math.max(14, 0.45 * size), 32)
}

@injectSheet(
  () => ({
    avatar: {
      extend: isolateMixin,
      position: 'relative',
      display: 'inline-block',
      verticalAlign: 'middle',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, .15)'
    },
    circle: {
      borderRadius: '50%',
      '& $profile': {
        transform: 'translate(10%, 10%)'
      }
    },
    rounded: {
      borderRadius: '7%'
    },
    profile: {
      extend: middleMixin,
      position: 'absolute',
      right: 0,
      bottom: 0,
      transform: 'translate(25%, 25%)',
      boxShadow: 'inset 0 0 0 1px white',
      borderRadius: '100%',
      fontSize: 0,
      textAlign: 'center'
    }
  }),
  {name: 'Avatar'}
)
export default class Avatar extends PureComponent {
  static propTypes = {
    /**
     * CSS-класс аватарки
     */
    className: PropTypes.string,
    /**
     * Inline-стили
     */
    style: PropTypes.object,
    /**
     * Цвет фона
     */
    backgroundColor: PropTypes.string,
    /**
     * Цвет фона иконки
     */
    iconBackgroundColor: PropTypes.string,
    /**
     * URL картинки
     */
    src: PropTypes.string.isRequired,
    /**
     * Размер аватарки
     */
    size: PropTypes.number,
    /**
     * Форма аватарки
     */
    shape: PropTypes.oneOf(['circle', 'square', 'rounded']),
    /**
     * Тип профиля для отображения иконки
     */
    profileType: PropTypes.oneOf([
      'facebook',
      'championat',
      'google',
      'instagram',
      'livejournal',
      'mailru',
      'odnoklassniki',
      'pgumosru',
      'rambler',
      'twitter',
      'vkontakte'
    ]),
    /**
     * Если указан, аватар будет ссылкой
     */
    href: PropTypes.string,
    /**
     * Элемент, который содержит контент, например `<Link />` в случае с `react-router`
     */
    container: PropTypes.element
  }

  static defaultProps = {
    size: 45,
    shape: 'circle'
  }

  getContainer() {
    const {href, container} = this.props

    if (isValidElement(container)) return container

    if (href) return <a href={href} />

    return <div />
  }

  render() {
    const {
      className,
      style,
      backgroundColor,
      iconBackgroundColor,
      src,
      size,
      shape,
      profileType,
      theme,
      classes,
      href, // eslint-disable-line no-unused-vars
      container, // eslint-disable-line no-unused-vars
      ...other
    } = this.props

    const styles = Object.assign({}, style, {
      backgroundColor,
      width: size,
      height: size,
      backgroundImage: `url(${src})`
    })

    const ProfileIcon =
      profileType &&
      profileIcons[`${profileType.replace(/^\w/, m => m.toUpperCase())}Icon`]

    const profileSize = Math.round(calcProfileSize(size))
    const profileSizePx = profileSize + 'px'
    const children = ProfileIcon && (
      <div
        className={classes.profile}
        style={{
          backgroundColor:
            iconBackgroundColor || theme.avatar.colors.iconBackground,
          width: profileSizePx,
          height: profileSizePx
        }}>
        <ProfileIcon size={Math.round(profileSize * 0.55)} />
      </div>
    )

    return cloneElement(
      this.getContainer(),
      {
        ...other,
        style: styles,
        className: classnames(classes.avatar, classes[shape], className)
      },
      children
    )
  }
}
