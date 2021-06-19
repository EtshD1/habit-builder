import React from "react";
import Context from "../context";

const withContext = (WrapperComponent: Function) => {
  const WithHOC = (props: any) => {
    return (
      <Context.Consumer>
        {(Context) => <WrapperComponent {...props} context={Context} />}
      </Context.Consumer>
    );
  };

  return WithHOC;
};

export default withContext;
