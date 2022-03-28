import React from 'react'

export default function Alert({text, type}) {
  return (
    <article className= {`alert ${type}`}>{text}</article>
  )
}
