import {
    Button,
    FormControl,
    Checkbox,
    Grid,
    Paper,
    RadioGroup,
    Slider,
    TextField,
    Typography, } from "@mui/material";

export default function Menu() {

    return (<div>
      <Paper elevation={3} >
        <Grid container>
          <Grid item xs={12} sm={6} lg={12}>
            <Typography gutterBottom>Filters</Typography>

            <div >

              <div >
                <TextField
                  size="small"
                  id="lower"
                  label="Min Price"
                  variant="outlined"
                  type="number"
                  value={0}
                  onChange={() => console.log("filter min price")}
                />

                <TextField
                  size="small"
                  id="upper"
                  label="Max Price"
                  variant="outlined"
                  type="number"
                  value={1}
                  onChange={() => console.log("filter max price")}
                />
              </div>
            </div>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>Sort By</Typography>

            <FormControl component="fieldset" >
              <RadioGroup
                aria-label="price-order"
                name="price-order"
                value={"1"}
                onChange={() => console.log("filter")}
              >
                <Checkbox />


                <Checkbox />
                 

              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Button size="small" color="primary">
          Clear All
        </Button>
      </Paper>
    </div>)
}