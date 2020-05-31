import React, { Fragment } from "react";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

export default function LoadingSkeleton() {
  return (
    <Fragment>
      {[1,2,3,4,5,6].map((index)=>{
        return(
          <ListItem 
            button
            key={index} 
          >
              <ListItemIcon>
                <Skeleton animation="wave" variant="circle" width={40} height={40} />
              </ListItemIcon>
              
              <ListItemText>
                <Skeleton animation="wave" variant="rect" height={30} />
              </ListItemText>
          </ListItem>
        )

      })
      }
    </Fragment>
  )
}