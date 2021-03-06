import React from 'react'
import Spinner from 'rambler-ui/Spinner'

export default function SpinnerExample() {
  return (
    <div>
      <div>
        <h4>Default</h4>
        <div style={{height: 200, position: 'relative'}}>
          <Spinner />
        </div>
        <h4>inline: true, color: currentColor, size: 3</h4>
        <div style={{marginTop: 20, position: 'relative', color: '#aaa'}}>
          Что-то произойдет через 5 секунд{' '}
          <Spinner inline={true} color="currentColor" size={3} />
        </div>
      </div>
    </div>
  )
}
