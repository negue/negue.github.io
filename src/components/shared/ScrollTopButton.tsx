import React, {Component} from 'react';
import {FaAngleUp} from 'react-icons/fa';
import styled from 'styled-components';

export interface ScrollTopButtonProps {
  scrollStepInPx: number;
  delayInMs: number;
}

export class ScrollTopButton extends Component<ScrollTopButtonProps> {
  _isMounted = false
  state = {
    intervalId: 0,
    scrollPosition: 0,
    show: false,
    element: null,
  }

  constructor (props: ScrollTopButtonProps) {
    super(props);
  }


  componentDidMount() {
    this._isMounted = true;

    const element = window;

    this.setState({
      element: window,
    })

    element.addEventListener("scroll", () => {
      if (element.scrollY > this.props.scrollStepInPx) {
        if (this._isMounted) {
          this.setState({ show: true })
        }
      } else {
        if (this._isMounted) {
          this.setState({ show: false })
        }
      }
    })
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  scrollStep = () => {
    if (this.state.element.pageYOffset === 0) {
      clearInterval(this.state.intervalId);
    }
    this.state.element.scroll(0, this.state.element.pageYOffset - this.props.scrollStepInPx)
  }

  scrollToTop = () => {
    let intervalId = setInterval(
      this.scrollStep.bind(this),
      this.props.delayInMs || 100
    )
    this.setState({ intervalId: intervalId })
  }

  render() {
    return this.state.show ? (
      <StyledButton
        className="btn-scroll-top"
        onClick={() => {
          this.scrollToTop()
        }}
      >
        <FaAngleUp className="icon-chevron" size="24px" />
      </StyledButton>
    ) : null
  }
}

const StyledButton = styled.button`
  cursor: pointer;
  position: fixed;
  bottom: 55px;
  right: 30px;
  height: 28px;
  z-index: 3;
  padding: 0 0.2rem;
  background: #7d7b92;
  opacity: 0.3;
  color: #fff;
  border: none;
  border-radius: 5px;
  transition: opacity 300ms linear;
  &:hover {
    opacity: 1;
  }
`
