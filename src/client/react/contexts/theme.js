import React from "react";
import withContextConsumer from "react/utils/with_context_consumer.jsx";

const ThemeContext = React.createContext({
  bg: undefined,
  variant: undefined,
  setBg: () => {},
  setVariant: () => {}
});

const ThemeConsumer = ThemeContext.Consumer;

class ThemeProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bg: "dark",
      variant: "dark"
    };

    this.setBg = this.setBg.bind(this);
    this.setVariant = this.setVariant.bind(this);
  }

  setBg(bg) {
    console.log("setbg");
    this.setState({
      bg: bg
    });
  }

  setVariant(variant) {
    console.log("setvariant");
    this.setState({
      variant: variant
    });
  }

  render() {
    const { setBg, setVariant } = this;
    const { bg, variant } = this.state;
    const { children } = this.props;

    const providerValues = {
      bg,
      variant,
      setBg,
      setVariant
    };
    return (
      <ThemeContext.Provider value={providerValues}>
        {children}
      </ThemeContext.Provider>
    );
  }
}

const withTheme = withContextConsumer(ThemeConsumer);

export { ThemeConsumer, ThemeProvider, withTheme };
