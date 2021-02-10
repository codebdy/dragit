import React, { Fragment } from "react";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

export default function ListLoadingSkeleton() {
  return (
    <Fragment>
      {[1,2,3,4,5].map((index)=>{
        return(
          <ListItem 
            button
            key={index} 
          >
              <ListItemIcon>
                <Skeleton animation="wave" variant="circle" width={30} height={30} />
              </ListItemIcon>
              
              <ListItemText>
                <Skeleton animation="wave" variant="rect" height={25} />
              </ListItemText>
          </ListItem>
        )

      })
      }
    </Fragment>
  )
}