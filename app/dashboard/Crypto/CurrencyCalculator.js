import React from "react";

import InputLabel from "@material-ui/core/InputLabel/index";
import MenuItem from "@material-ui/core/MenuItem/index";
import FormControl from "@material-ui/core/FormControl/index";
import Select from "@material-ui/core/Select/index";
import Button from "@material-ui/core/Button/index";
import TextField from "@material-ui/core/TextField/index";

import Widget from "../../../components/Widget";

class CurrencyCalculator extends React.Component {
  state = {
    name: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <Widget>
        <h4>Currency Calculator</h4>
        <p className="mb-1">1.87 BTC equals</p>
        <h1 className="mb-1 text-primary jr-font-weight-bold">11466.78 USD</h1>
        <p className="text-grey jr-fs-sm">@ 1 BTC = 6718.72 USD</p>

        <form autoComplete="off" className="row">
          <div className="col-sm-4 col-6 mb-3">
            <FormControl className="w-100">
              <InputLabel htmlFor="demo-controlled-open-select">
                From
              </InputLabel>
              <Select
                value={this.state.name}
                onChange={this.handleChange}
                inputProps={{
                  name: "name",
                  id: "demo-controlled-open-select"
                }}
              >
                <MenuItem value={1}>BTC</MenuItem>
                <MenuItem value={2}>USD</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="col-sm-4 col-6 mb-3">
            <FormControl className="w-100">
              <InputLabel htmlFor="demo-controlled">To</InputLabel>
              <Select
                value={this.state.name}
                onChange={this.handleChange}
                inputProps={{
                  name: "name",
                  id: "demo-controlled"
                }}
              >
                <MenuItem value={3}>USD</MenuItem>
                <MenuItem value={4}>BTC</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="col-sm-4 col-12 mb-3">
            <FormControl className="w-100">
              <TextField
                id="search"
                label="Amount"
                type="search"
                margin="normal"
                fullWidth
                style={{
                  marginTop: 0,
                  marginBottom: 0
                }}
              />
            </FormControl>
          </div>
          <div className="col-12">
            <Button
              size="small"
              variant="contained"
              color="primary"
              className="text-capitalize"
            >
              Calculate
            </Button>
          </div>
        </form>
      </Widget>
    );
  }
}

export default CurrencyCalculator;
