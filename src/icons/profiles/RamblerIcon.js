import React from 'react'
import SvgIcon from '../SvgIcon'

export default function RamblerIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 16 16">
      <path d="M14.248 14.057l-2.487-2.723.486-.692a23.739 23.739 0 0 0 1.221-2.046 1.02 1.02 0 0 0-.441-1.369 1.02 1.02 0 0 0-1.37.442c0 .015-.426.81-1.088 1.825l-.207.294L7.89 7.095l.014-.015c.177-.118.957-.75 1.399-1.295.574-.707.956-1.678.956-2.4C10.26 1.9 9.214.353 6.874.235 5.726.192 4.71.53 3.989 1.223a2.978 2.978 0 0 0-.898 2.355c.074 1.163.84 2.296 1.516 3.076-3.37 1.973-3.43 4.357-2.855 6.035.397 1.148 1.25 1.781 1.472 1.943 1.383 1.03 3.738 1.546 5.902-.309.456-.383.898-.839 1.354-1.354l2.252 2.473c.206.22.471.338.751.338.25 0 .486-.088.692-.265.427-.382.456-1.03.073-1.457zM5.431 2.679c.28-.265.722-.412 1.237-.412H6.8c.427.015 1.428.162 1.428 1.104 0 .132-.118.647-.5 1.118-.28.339-.883.84-1.016.928-.088.059-.162.117-.25.176-.589-.618-1.251-1.501-1.295-2.178a.843.843 0 0 1 .264-.736zm2.37 10.097c-1.575 1.355-2.973.5-3.356.207-.03-.015-.044-.03-.073-.045 0 0-.486-.323-.677-.912-.236-.663-.766-2.193 2.428-3.857l2.988 3.283c-.441.515-.883.956-1.31 1.324z" />
    </SvgIcon>
  )
}

RamblerIcon.displayName = 'RamblerIcon'

RamblerIcon.defaultProps = {
  color: '#5e5e5e'
}
