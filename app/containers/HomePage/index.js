/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import {
  makeSelectError,
  makeSelectLoading,
  makeSelectRepos,
} from "containers/App/selectors";

import AtPrefix from "./AtPrefix";
import CenteredSection from "./CenteredSection";
import Form from "./Form";
import { FormattedMessage } from "react-intl";
import H2 from "components/H2";
import Helmet from "react-helmet";
import Input from "./Input";
import React from "react";
import ReposList from "components/ReposList";
import Section from "./Section";
import { changeUsername } from "./actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { firebaseConnect } from "react-redux-firebase";
import { loadRepos } from "../App/actions";
import { makeSelectUsername } from "./selectors";
import messages from "./messages";

@firebaseConnect()
export class HomePage extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
  }

  handleLogin = loginData => {
    this.props.firebase.login(loginData);
  };

  providerLogin = provider => this.handleLogin({ provider });

  render() {

    return (
      <button
        className="is-medium"
        onClick={() => this.providerLogin("google")}
      >
        <span className="icon">
          <i className="fa fa-google" />
        </span>
        <span>sign in with Google</span>
      </button>
    );
  }
}

HomePage.propTypes = {
  firebase: React.PropTypes.shape({
    login: React.PropTypes.func.isRequired,
    auth: React.PropTypes.func.isRequired,
  }),
  authError: React.PropTypes.shape({
    message: React.PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  }),
  dispatch: React.PropTypes.func.isRequired,
  auth: React.PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
