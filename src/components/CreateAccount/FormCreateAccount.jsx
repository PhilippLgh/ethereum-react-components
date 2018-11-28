import React, { Component } from 'react'
import i18n from '../../i18n'
import PropTypes from 'prop-types'
import { Button, InputPassword } from '..'
import './FormCreateAccount.scss'

// TODO this falls under category API dependencies and needs to be
// - required in the beginning: const Mist = require(./api/mist)
// - passed as utility: <MyForm Mist={Mist} /> || <MyForm utils={Mist.notifications} />
// - put behind some abstract handler and logic moved up: <MyForm onFormValidationError={(error) => Mist.notification.warn(error.message) }} />
let Mist = {
  notification: {
    warn: text => alert(text.content)
  }
}

class CreateAccount extends Component {
  static displayName = 'CreateAccount'

  static propTypes = {}

  constructor(props) {
    super(props)

    this.state = {
      creating: false,
      passwordInputType: 'text',
      pw: '',
      pwRepeat: '',
      showRepeat: false
    }
  }

  resetForm() {
    this.setState({
      pw: '',
      pwRepeat: '',
      showRepeat: false,
      creating: false
    })
  }

  handleCancel(e) {
    e.preventDefault()
    Mist.closeThisWindow()
  }

  handleSubmit(e) {
    e.preventDefault()

    const { pw, pwRepeat } = this.state

    // ask for password repeat
    if (!pwRepeat.length) {
      this.setState({ showRepeat: true })
      // FIXME deprecated use this.refs.password_repeat.focus();
      return
    }

    // check passwords
    if (pw !== pwRepeat) {
      Mist.notification.warn({
        content: i18n.t(
          'mist.popupWindows.requestAccount.errors.passwordMismatch'
        ),
        duration: 3
      })
      this.resetForm()
    } else if (pw && pw.length < 8) {
      Mist.notification.warn({
        content: i18n.t(
          'mist.popupWindows.requestAccount.errors.passwordTooShort'
        ),
        duration: 3
      })
      this.resetForm()
    } else if (pw && pw.length >= 8) {
      this.setState({ creating: true }, () => this.createAccount(pwRepeat))
    }
  }

  async createAccount(pw) {
    try {
      await Mist.createAccountWeb3()
    } catch (error) {
      console.log('error', error)
    }

    this.resetForm()
    // notify about backing up!
    alert(i18n.t('mist.popupWindows.requestAccount.backupHint'))
    Mist.closeThisWindow()
  }

  renderFormBody() {
    const { showRepeat, creating, pw, pwRepeat } = this.state

    if (creating) {
      return <h2>{i18n.t('mist.popupWindows.requestAccount.creating')}</h2>
    }

    return (
      <div>
        <div className={`field-container ${showRepeat ? 'repeat-field' : ''}`}>
          {showRepeat ? (
            /** repeat password */
            <InputPassword
              className="password-repeat"
              placeholder={i18n.t(
                'mist.popupWindows.requestAccount.repeatPassword'
              )}
              onChange={value => this.setState({ pwRepeat: value })}
              value={pwRepeat}
            />
          ) : (
            /** enter password */
            <InputPassword
              className="password"
              placeholder={i18n.t(
                'mist.popupWindows.requestAccount.enterPassword'
              )}
              onChange={value => this.setState({ pw: value })}
              value={pw}
            />
          )}
        </div>
        <div className="dapp-modal-buttons">
          <Button flat secondary onClick={e => this.handleCancel(e)}>
            {i18n.t('buttons.cancel')}
          </Button>
          <Button flat type="submit">
            {i18n.t('buttons.ok')}
          </Button>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="popup-windows request-account">
        <form onSubmit={e => this.handleSubmit(e)}>
          <h1>{i18n.t('mist.popupWindows.requestAccount.title')}</h1>
          {this.renderFormBody()}
        </form>
      </div>
    )
  }
}

export default CreateAccount
