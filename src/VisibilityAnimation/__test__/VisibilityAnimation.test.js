import React, { Component } from 'react'
import VisibilityAnimation from '../VisibilityAnimation'
import renderToLayer from '../../hoc/render-to-layer'
import { mount } from '../../utils/test-utils'

class Animated extends Component {

  render() {
    return (
      <VisibilityAnimation
        isVisible={this.props.isOpened}
        className="normal"
        activeClassName="visible"
        animationDuration={200}
        onVisible={this.props.onOpen}
        onInvisible={this.props.onClose}>
        <div className="content">
          Hello world
        </div>
      </VisibilityAnimation>
    )
  }

}

const AnimatedAtNode = renderToLayer(Animated)

describe('<VisibilityAnimation />', () => {

  it('should apply class names', async done => {
    const props = {}

    const whenOpen = new Promise(resolve => {
      props.onOpen = resolve
    })

    const whenClose = new Promise(resolve => {
      props.onClose = resolve
    })

    const wrapper = mount(
      <Animated {...props} />
    )

    expect(wrapper.text()).toEqual('Hello world')
    expect(wrapper.hasClass('content')).toEqual(true)
    expect(wrapper.hasClass('normal')).toEqual(true)
    expect(wrapper.hasClass('visible')).not.toEqual(true)

    wrapper.setProps({
      isOpened: true
    })

    await whenOpen
    expect(wrapper.hasClass('content')).toEqual(true)
    expect(wrapper.hasClass('normal')).toEqual(true)
    expect(wrapper.hasClass('visible')).toEqual(true)

    wrapper.setProps({
      isOpened: false
    })

    await whenClose
    expect(wrapper.hasClass('content')).toEqual(true)
    expect(wrapper.hasClass('normal')).toEqual(true)
    expect(wrapper.hasClass('visible')).not.toEqual(true)
    done()
  })

  it('should apply class names with @renderToLayer', async done => {
    const props = {}
    let containerNode

    const whenOpen = new Promise(resolve => {
      props.onOpen = resolve
    })

    const whenClose = new Promise(resolve => {
      props.onClose = resolve
    })

    const wrapper = mount(
      <AnimatedAtNode
        {...props}
        containerRef={ref => {
          containerNode = ref
        }}/>
    )

    expect(containerNode).toBeUndefined()

    wrapper.setProps({
      isOpened: true
    })

    const animatedNode = containerNode.querySelector('.content')

    expect(animatedNode.textContent).toEqual('Hello world')
    expect(animatedNode.className).toEqual('content normal')
    expect(document.body.lastElementChild).toEqual(containerNode)
    expect(document.body.lastElementChild.childElementCount).toEqual(1)
    await whenOpen
    expect(animatedNode.className).toEqual('content normal visible')

    wrapper.setProps({
      isOpened: false
    })

    expect(animatedNode.className).toEqual('content normal')
    await whenClose
    expect(containerNode).toBeUndefined()
    done()
  })

})
