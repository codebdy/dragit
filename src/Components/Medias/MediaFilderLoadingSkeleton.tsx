import React, { Fragment } from "react";
import { ListItem, ListItemText } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

export default function MediaFilderLoadingSkeleton() {
  return (
    <Fragment>
      {[1,2,3,4,5].map((index)=>{
        return(
          <ListItem 
            button
            key={index} 
          >
            <ListItemText>
              <Skeleton animation="wave" variant="rect" height={25} width="60%" />
            </ListItemText>
          </ListItem>
        )

      })
      }
    </Fragment>
  )
}