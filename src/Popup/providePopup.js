/**
 * HOC попапа
 */

import React, { Component, cloneElement } from 'react'
import ReactDOM from 'react-dom'
import uniqueId from 'lodash/uniqueId'

export default function providePopup(Target) {

  return class ProvidePopup extends Component {

    popups = []

    componentWillUnmount() {
      this.popups = []
      this.unrenderContainer()
    }

    openPopup = createElement => {
      const popup = {}

      let onOpened
      let onResolve
      let onReject

      popup.opened = new Promise(resolve => {
        onOpened = resolve
      })

      popup.closed = new Promise((resolve, reject) => {
        onResolve = arg => {
          this.removePopup(popup)
          resolve(arg)
        }

        onReject = arg => {
          this.removePopup(popup)
          reject(arg)
        }
      })

      const key = uniqueId()
      const element = createElement(onResolve, onReject)

      popup.element = cloneElement(element, {
        ...element.props,
        key,
        onOpened,
        isOpen: true,
        onClose: onReject
      })

      popup.close = onReject

      this.popups.push(popup.element)
      this.renderContainer()

      return popup
    }

    closePopup = popup => {
      popup.close()
    }

    removePopup = popup => {
      if (this.popups.indexOf(popup.element) > -1) {
        this.popups = this.popups.filter(el => el !== popup.element)
        this.renderContainer()
      }
    }

    renderContainer() {
      if (this.popups.length > 0) {
        if (!this.node) {
          this.node = document.createElement('div')
          document.body.appendChild(this.node)
        }

        const listElement = (
          <div>{this.popups}</div>
        )

        ReactDOM.unstable_renderSubtreeIntoContainer(
          this,
          listElement,
          this.node
        )
      } else {
        this.unrenderContainer()
      }
    }

    unrenderContainer() {
      if (this.node) {
        ReactDOM.unmountComponentAtNode(this.node)
        document.body.removeChild(this.node)
        this.node = null
      }
    }

    render() {
      return (
        <Target {...this.props} openPopup={this.openPopup} closePopup={this.closePopup} />
      )
    }

  }

}
