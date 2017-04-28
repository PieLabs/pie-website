import React from 'react';

/**
 * TODO this is pretty bare bones ... see if there's a similar better component
 * out in the wild or polish this.
 */
export default class ScrollIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      scrollY: window.scrollY
    }
    this.onScroll = this.onScroll.bind(this);
  }

  onScroll(e) {
    this.setState({ scrollY: window.scrollY });
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
    this.setState({ rootHeight: this.root.offsetHeight });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  render() {
    const { children } = this.props;

    //if before the offset - hide it
    //if in between offset + element height move element to window.height
    let top = 0;
    if (this.state.scrollY > this.state.rootHeight) {
      top = Math.floor(window.innerHeight - this.state.rootHeight);
    } else {
      top = Math.floor(window.innerHeight - (this.state.scrollY || 0));
    }

    const topString = `${top}px`
    return <div ref={d => this.root = d} style={{ left: '0', right: '0', position: 'fixed', top: topString }}>{children}</div>;
  }

}