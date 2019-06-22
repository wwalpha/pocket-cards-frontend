import * as React from 'react';
import { Grid, Paper, CircularProgress, StandardProps } from '@material-ui/core';
import { withStyles, StyleRulesCallback, Theme } from '@material-ui/core/styles';

class Loading extends React.Component<LoadingProps, any, any> {
  render() {
    const { size = 96, classes, className } = this.props;

    if (!classes) return;

    return (
      <Grid
        container
        alignItems="center"
        justify="center"
        classes={{
          container: classes.root,
        }}
        className={className}
      >
        <Paper className={classes.paper}>
          <CircularProgress size={size} />
        </Paper>
      </Grid>
    );
  }
}

const styles: StyleRulesCallback = ({ palette: { primary } }: Theme) => ({
  root: {
    position: 'absolute',
    height: '100%',
    backgroundColor: 'gray',
    opacity: 0.5,
    zIndex: 1000,
  },
  paper: {
    boxShadow: 'none',
    backgroundColor: 'transparent',
  },
  progress: {
    color: primary.dark,
  },
});

export default withStyles(styles)(Loading);

export interface LoadingProps extends StandardProps<any, any> {
  size?: number;
}
