import { Grid } from "@material-ui/core"
import { Skeleton } from "@material-ui/lab"
import React from "react"

export default function AppsSkeleton(){
  return (
    <Grid container spacing = {4} >
      {
        [1,2,3].map((index)=>{
          return(
            <Grid item key={index} lg={2} md={3} sm={4} xs={6}>
              <Skeleton animation="wave" variant="rect" width={200} height={200} />
            </Grid>
          )
        })
      }
    </Grid>
  )
}