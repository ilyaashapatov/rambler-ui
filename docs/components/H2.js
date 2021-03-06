import React from 'react'
import injectSheet, {fontFamily} from 'docs/utils/theming'

const styles = {
  root: {
    marginTop: 40,
    marginBottom: 25,
    fontFamily: fontFamily.CorsicaRamblerLX,
    fontSize: 35,
    fontWeight: 500,
    lineHeight: '35px'
  }
}

const H2 = ({classes, children}) => <h2 className={classes.root}>{children}</h2>

export default injectSheet(styles)(H2)
