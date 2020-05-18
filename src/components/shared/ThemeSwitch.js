import React, {Component} from "react"
import Switch from "react-switch"
import {ThemeConsumer, withTheme} from "styled-components"

class CustomSwitch extends Component {
  constructor(props) {
    super(props)

    this.state = this.getStateByMode(props.theme && props.theme.mode);
  }

  componentDidMount() {
    this.setState(this.getStateByMode(this.props.theme.mode));
  }
  handleToggle = checked => {
    this.setState({ checked })
    // Passed from ToggleMode to change theme
    this.props.onClick()
  }

  getStateByMode (mode) {
    return {
      checked: mode === 'dark'
    };
  }

  render() {
    return (
      <div className="custom-switch">
        <Switch
          onChange={this.handleToggle}
          checked={this.state.checked}
          offColor="#bbb"
          onColor="#4a4a4a"
          checkedIcon={
            <span
              role="img"
              aria-label="switch-label"
              style={{
                marginLeft: "0.2rem",
                fontSize: "0.65rem",
              }}
            >
              🌙
            </span>
          }
          uncheckedIcon={
            <span
              role="img"
              aria-label="switch-label"
              style={{
                marginLeft: "0.2rem",
                fontSize: "0.65rem",
              }}
            >
              ☀️
            </span>
          }
          handleDiameter={24}
          height={26}
          width={46}
          onHandleColor="#333"
        />
      </div>
    )
  }
}

const ThemeCustomSwitch = withTheme(CustomSwitch)

export function ThemeSwitch() {
  return (
    <ThemeConsumer>
      {theme => {
        return (
          <ThemeCustomSwitch
            onClick={e =>
              theme.setTheme(
                theme.mode === "dark" ? { mode: "light" } : { mode: "dark" }
              )
            }
          />
        )
      }}
    </ThemeConsumer>
  )
}

