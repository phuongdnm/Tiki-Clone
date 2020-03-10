import React from 'react'
import NavBar from "../layout/NavBar";
import Carousel from "../categories/Carousel"
import SideBar from "../categories/SideBar"
import Grid from '@material-ui/core/Grid';
import ImageList from "../categories/ImageList"


const items = [
  {
    name: 'camera',
    label: 'Camera',
    items: [
      { name: 'camera', label: 'Camera' },
      { name: 'supervise camera', label: 'Supervise camera' },
      { name: 'accesories', label: 'Accesories' },
      { name: 'lens', label: 'Lens' },
      { name: 'group tube', label: 'Group Tube' },
      { name: 'light equipment', label: 'Light Equiment' },
    ],
  },
]

const item = [
      { name: 'camera', label: 'Camera' },
      { name: 'supervise camera1', label: 'Supervise camera' },
      { name: 'accesories', label: 'Accesories' },
      { name: 'lens', label: 'Lens' },
      { name: 'group tube', label: 'Group Tube' },
      { name: 'light equipment', label: 'Light Equiment' },
]


const ProductCategoryPage = (props) => {
    const {type} = props.match.params;
    return (
        <div>
            <NavBar/>
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <SideBar items={items} item={item} />
              </Grid>
              <Grid item xs={9}>               
                <Carousel/>
                <ImageList/>
              </Grid>
            </Grid>
        </div>

    )
};

export default ProductCategoryPage






