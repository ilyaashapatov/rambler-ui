import React from 'react'
import SvgIcon from '../SvgIcon'

export default function QuestionIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 16 16">
      <path
        d="M8 0c4.416 0 8 3.584 8 8s-3.584 8-8 8-8-3.584-8-8 3.584-8 8-8zm0 14.5c3.583 0 6.5-2.917 6.5-6.5S11.583 1.5 8 1.5A6.509 6.509 0 0 0 1.5 8c0 3.583 2.917 6.5 6.5 6.5zM6.917 9.532c0-.593.072-1.065.216-1.416.144-.351.407-.697.79-1.038.383-.34.638-.617.765-.831.127-.214.19-.44.19-.676 0-.715-.33-1.073-.99-1.073-.313 0-.564.096-.752.289-.188.192-.287.458-.295.796H5c.008-.808.27-1.44.784-1.897C6.298 3.229 7 3 7.888 3c.897 0 1.593.217 2.089.65.495.434.742 1.047.742 1.838 0 .36-.08.7-.241 1.02-.16.319-.442.673-.844 1.062l-.514.49c-.322.308-.506.67-.553 1.085l-.025.387H6.917zm-.184 1.948c0-.283.096-.517.289-.7.192-.185.439-.277.74-.277.3 0 .546.092.739.276a.929.929 0 0 1 .289.701c0 .28-.095.51-.283.692-.188.182-.437.273-.746.273s-.557-.09-.746-.273a.921.921 0 0 1-.282-.692z"
        fillRule="evenodd"
      />
    </SvgIcon>
  )
}

QuestionIcon.displayName = 'QuestionIcon'
