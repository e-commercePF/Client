import {
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
import { filterBy , filterByCategories  , filterByBrands , filterByRange } from "../Redux/actions";
import { useEffect , useState } from "react";
import { getAllBrand , getAllCategories  } from "../Redux/actions";

export default function Menu() {
    
    const dispatch = useDispatch();
    const [categoriesInput,setCategoriesInput] = useState("");
    const [brandsInput,setBrandsInput] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice ] = useState("");
    const { categories ,  brands  } = useSelector((state) => state);

    useEffect(() => {
        dispatch(getAllBrand())
        dispatch(getAllCategories())
    }, []);
    
    

    const handleRadioFilter = (e) => {
        console.log(e.target.value)
        dispatch(filterBy(e.target.value))
    };

    const handleCategorySeclect =(e) => {
        console.log(e)
        setCategoriesInput(e);
        dispatch(filterByCategories(e))
        dispatch(getAllCategories())
    }

    const handleBrandSeclect =(e) => {
        console.log(e)
        setCategoriesInput(e);
        dispatch(filterByBrands(e))
        dispatch(getAllCategories())
    }


    const handleRange = ( e , type ) => {
        console.log(e)
        console.log(type)

        let newRange 

        if (type === "MaxPrice") {
          //  newRange = [...priceRange];
            newRange[0] = Number(e);
            setMaxPrice(newRange);
        }

       
        // dispatch(filterByRange(minValue,maxValue))
    }    
    




  return (<div>
    
    {/* <TextField
        size="small"
        id="lower"
        label="Min Price"
        variant="outlined"
        type="number"
        value={minPrice}
        onChange={(e) => console.log(e.target.value)}
    />
    <TextField
        size="small"
        id="upper"
        label="Max Price"
        variant="outlined"
        type="number"
        value={maxPrice}
        onChange={(e) => handleRange(e.target.value,"MaxPrice")}
    /> */}

    <FormControl>

      <FormLabel id="filter-buttons-group-label">Price</FormLabel>
      <RadioGroup
        row
        aria-labelledby="filter-buttons-group-label"
        name="filter-buttons-group"
      >
        <FormControlLabel 
        value="asc" 
        control={<Radio />} 
        label="Asc"
        onClick={(e) =>  handleRadioFilter(e)}
        />

        <FormControlLabel 
        value="desc" 
        control={<Radio />} 
        label="dsc"
        onClick={(e) =>  handleRadioFilter(e)}
        />
      </RadioGroup>

    </FormControl>
    <FormControl>
      <FormLabel id="filter-buttons-group-label">Name</FormLabel>
      <RadioGroup
        row
        aria-labelledby="filter-buttons-group-label"
        name="filter-buttons-group"
      >
        <FormControlLabel 
        value="nameA" 
        control={<Radio />} 
        label="A/Z"
        onClick={(e) =>   handleRadioFilter(e)}
        />

        <FormControlLabel 
        value="nameZ" 
        control={<Radio />} 
        label="Z/A"
        onClick={(e) => handleRadioFilter(e)}
        />

      </RadioGroup>
    </FormControl>

  <FormControl fullWidth>
  <InputLabel id="categories-select-label">Categories</InputLabel>
  <Select
    labelId="categories-select-label"
    id="categories-select"
    value={categoriesInput}
    label="category"
    onChange={(e)=> handleCategorySeclect(e.target.value)}
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
  <InputLabel id="brands-select-label">brands</InputLabel>
  <Select
    labelId="brands-select-label"
    id="brands-select"
    value={brandsInput}
    label="Brand"
    onChange={(e)=> handleBrandSeclect(e.target.value)}
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

    </div>
  );
}