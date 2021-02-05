import { Grid } from "@material-ui/core"
import { Skeleton } from "@material-ui/lab"
import React from "react"

export default function TemplatesSkeleton(){
  return (
    <Grid container spacing = {4} >
      {
        [1,2,3].map((index)=>{
          return(
            <Grid item key={index} md={4}>
              <Skeleton animation="wave" variant="rect" width={120} height={120} />
            </Grid>
          )
        })
      }
    </Grid>
  )
}