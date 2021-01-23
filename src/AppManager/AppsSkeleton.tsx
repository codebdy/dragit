import { Grid } from "@material-ui/core"
import { Skeleton } from "@material-ui/lab"
import React from "react"

export default function AppsSkeleton(){
  return (
    <Grid container spacing = {2}>
      {
        [1,2,3].map((index)=>{
          return(
            <Grid item key={index}>
              <Skeleton animation="wave" variant="rect" width={200} height={200} />
            </Grid>
          )
        })
      }
    </Grid>
  )
}