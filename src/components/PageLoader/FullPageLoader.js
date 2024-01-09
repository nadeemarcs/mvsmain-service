import { CircularProgress } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import '../../App.css';
class FullPageLoader extends Component {
  state = {};

  render() {
    const { loading } = this.props;
    console.log("loading",loading);
    if (!loading) return null;

    return (
      <div class="loader-container">
        <div className="loader">
          <CircularProgress disableShrink />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ loading: state.pageloader.loading });

export default connect(mapStateToProps)(FullPageLoader);
