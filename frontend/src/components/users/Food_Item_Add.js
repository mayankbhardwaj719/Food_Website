import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ButtonGroup } from "@mui/material";

const Food_Add = (props) => {
  const [Item_name, setItem_Name] = useState("");
  const [price, setPrice] = useState("");
  const [vegetarian, setVegetarian] = useState("");
  const [addons, setAddons] = useState([]);
  const [addonsstring, setAddonsString] = useState("");
  const [tags, setTags] = useState([]);
  const [tagstring, setTagString] = useState("");
  const [Email,setEmail] = useState("");

  const onChangeItem_Name = (event) => {
    setItem_Name(event.target.value);
  };

  const onChangePrice = (event) => {
    setPrice(event.target.value);
  };

  const onChangeVegetarian = (event) => {
    setVegetarian(event.target.value);
  };

  const onChangeAddons = (event) => {
    var addon_string = event.target.value
    setAddonsString(event.target.value);
    console.log(addons)
  };

  const onChangeTags = (event) => {
    var tag_string = event.target.value
    let temp_tags = []
    temp_tags = tag_string.split(',');
    setTagString(event.target.value);
    setTags(temp_tags);
    console.log(temp_tags)
  };

  const resetInputs = () => {
    setItem_Name("");
    setPrice("");
    setVegetarian("");
    setAddons([]);
    setAddonsString("");
    setTags([]);
    setTagString("");
  };

  const onSubmit_Add = (event) => {
    event.preventDefault();

    let temp_addons = []
    let final_addons = []
    temp_addons = addonsstring.split(',');
    for(var i=0;i<temp_addons.length;i=i+2)
    {
      let temp_inside = {"addon":temp_addons[i],"price":temp_addons[i+1]}
      final_addons.push(temp_inside)
    }

    const newFood_Item = {
      Item_Name: Item_name,
      Price: price,
      Vegetarian: vegetarian === 'Veg' ? true : false ,
      Addons: final_addons,
      Tags: tags,
      Email : localStorage.getItem('Email')
    };
    axios
      .post("api/Food_Item/Add_Food_Item", newFood_Item)
      .then((response) => {
        alert("Successfully Added\t" + response.data.Item_Name);
        console.log(response.data.Shop_Name);
      })
      .catch((error) => {
        console.log(error)
        alert("Please enter valid credentials!");
      });
      // console.log(newFood_Item);
    resetInputs();
    window.location.href="/Food_Menu";
  };
  return (
    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Item_Name"
          variant="outlined"
          value={Item_name}
          onChange={onChangeItem_Name}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Price"
          variant="outlined"
          value={price}
          onChange={onChangePrice}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Vegetarian"
          variant="outlined"
          value={vegetarian}
          onChange={onChangeVegetarian}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Addons"
          variant="outlined"
          value={addonsstring}
          onChange={onChangeAddons}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Tags"
          variant="outlined"
          value={tagstring}
          onChange={onChangeTags}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmit_Add}>
          Add
        </Button>
      </Grid>
    </Grid>
  );
}

const Food_Item_Add = () => {

  return (
    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        <Food_Add /> 
      </Grid>
    </Grid>
  );

}

export default Food_Item_Add;
