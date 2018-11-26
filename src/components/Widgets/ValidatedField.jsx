import React from 'react'
import PropTypes from 'prop-types'
import Checkmark from './AnimatedIcons/Checkmark'
import Cross from './AnimatedIcons/AnimatedCross'

const height = 50

class ValidatedField extends React.Component {
  constructor(props) {
    super(props)
    const { value } = props
    const inputValue = value || ''
    this.state = {
      inputValue,
      isValid: undefined, // valid || invalid || error || processing
      errorMessage: ''
    }
  }

  componentDidMount() {
    const { inputValue } = this.state
    this.handleValidation(inputValue)
  }

  handleValidation = async (value) => {
    const { validator, onChange } = this.props

    // graceful degradation to input field if parent wants to handle change events
    if (typeof onChange === 'function') {
      // e.persist()
      return onChange(value)
    }

    this.setState({
      inputValue: value,
      errorMessage: '',
      isValid: ''
    })
    if (value === '' || !validator) return 0

    let isValid = 'processing'
    this.setState({
      isValid
    })
    let errorMessage = ''
    try {
      isValid = await validator(value)
      if (isValid === true) {
        isValid = 'valid'
      } else if (isValid === false) {
        isValid = 'invalid'
      } else {
        isValid = 'error'
      }
    } catch (error) {
      isValid = 'error'
      errorMessage = error.message
    }
    this.setState({
      isValid,
      errorMessage
    })
  }

  renderIndicator() {
    const { isValid } = this.state
    if (isValid === undefined) return ''
    if (isValid === 'valid') return <Checkmark size={24} />
    if (isValid === 'invalid') return <Cross size={24} />
    if (isValid === 'error') return <Cross size={24} />
    return (
      isValid
    )
  }

  render() {
    const { type, placeholder, value, size } = this.props
    const { inputValue, errorMessage } = this.state
    let renderedValue = inputValue ||  value
    return (
      <div>
        <div style={{
          height,
          display: 'flex',
          alignItems: 'center'
        }}
        >
          <input
            type={type}
            size={size}
            placeholder={placeholder}
            value={renderedValue}
            onChange={e => this.handleValidation(e.target.value)}
          />
          {this.renderIndicator()}
        </div>
        <span style={{ color: 'red' }}>{errorMessage}</span>
      </div>
    )
  }
}

export default ValidatedField
