import React from 'react'

type Props = any

const Logo = (props: Props) => {
  const { renderedDefault, title } = props
  return (
    <div>
      <h2 className='text-3xl'>{title}</h2>
      {renderedDefault && <>{renderedDefault(props)}</>}
    </div>
  )
}

export default Logo
