import React, { Fragment } from "react";
import { Grid, Paper } from "@material-ui/core";
import PrimaryText from "base/PropsInputs/PrimaryText";
import { ModuleMeta } from "./ModuleContent";
import intl from "react-intl-universal";

export default function ModuleAuths(props:{module:ModuleMeta}){
  return (
    <Fragment>
      <Grid container spacing={2} justify="space-between" alignItems="center">
        <Grid item xs={12}>
          <h2>
            <PrimaryText>
              {intl.get('module-auth-points')}
            </PrimaryText>
          </h2>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            dd
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  )
}