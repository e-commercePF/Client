import {
  Button,
  Radio, 
  RadioGroup,  
  FormControlLabel, 
  FormControl, 
  FormLabel,
  InputLabel,
  Select,
  MenuItem,
  TextField }  from '@mui/material';
import { useDispatch ,  useSelector  } from "react-redux";
import { AddFilters , GetFilters } from "../Redux/actions";
import { useEffect , useState } from "react";
import { getAllBrand , getAllCategories  } from "../Redux/actions";


export default function Menu() {

  const filter = 
    {
    category:"",
    brand:"", 
    name:"", 
    pricemin:"", 
    pricemax:"",
    page:1}
  
  const dispatch = useDispatch();
  const [input,setInput] = useState(filter);
  const { categories ,  brands  } = useSelector((state) => state);

  useEffect(() => {
      dispatch(getAllBrand())
      dispatch(getAllCategories())
  }, []);


 const handleFilter= (e)  => {
  
  const newFilter = {
    ...input,
    [e.target.name]: e.target.value }

   setInput(newFilter)

    dispatch(AddFilters(newFilter))
    dispatch(GetFilters(newFilter))   
 }


 const clearFilter  = () => {
   const cleanFilter = {
      [input.category]:"",
      [input.brand]:"", 
      [input.name]:"", 
      [input.pricemin]:"", 
      [input.pricemax]:"",
      page:1
   }
   
  setInput(cleanFilter)
  dispatch(GetFilters(cleanFilter))
  dispatch(AddFilters(clearFilter))
 }



return (<div>
  
  <TextField
      name='pricemin'
      size="small"
      id="lower"
      label="Min Price"
      variant="outlined"
      // type="number"
      value={input.pricemin}
      onChange={handleFilter}
      onBlur={handleFilter}
  />
  <TextField
      name='pricemax'
      size="small"
      id="upper"
      label="Max Price"
      variant="outlined"
      // type="number"
      value={input.pricemax}
      onChange={handleFilter}
  />

  <FormControl>

    <FormLabel id="filter-buttons-group-label">Sort by..</FormLabel>
    <RadioGroup
      row
      aria-labelledby="filter-buttons-group-label"
      name="name"
    >
      <FormControlLabel
      value="pasc" 
      control={<Radio />} 
      label="Price Asc"
      onClick={handleFilter}
      />

      <FormControlLabel
      value="pdesc" 
      control={<Radio />} 
      label="Price dsc"
      onClick={handleFilter}
      />

    <FormControlLabel 
      value="nasc" 
      control={<Radio />} 
      label="Name A/Z"
      onClick={handleFilter}
      />

    <FormControlLabel 
      value="ndesc" 
      control={<Radio />} 
      label="Name Z/A"
      onClick={handleFilter}
      />
    </RadioGroup>
  </FormControl>

<FormControl fullWidth>
<InputLabel id="categories-select-label">Categories</InputLabel>
<Select
  name='category'
  labelId="categories-select-label"
  id="categories-select"
  value={input.category}
  label="category"
  onChange={handleFilter}
>
 {categories.map((name) => (
  <MenuItem
  key={name}
  value={name}
  >
  {name}
  </MenuItem>
  ))}
</Select>
</FormControl>

<FormControl fullWidth>
<InputLabel id="brands">brands</InputLabel>
<Select
  name='brand'
  labelId="brand"
  id="brands"
  value={input.brand}
  label="Brand"
  onChange={handleFilter}
>
 {brands.map((name) => (
  <MenuItem
  key={name}
  value={name}
  >
  {name}
  </MenuItem>
  ))}
</Select>
</FormControl>

 <Button
 onClick={clearFilter}
 > clear filter </Button>


  </div>
);
}