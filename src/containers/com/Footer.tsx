import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, StyleRulesCallback, Theme, withStyles } from '@material-ui/core';
import { StyleRules, WithStyles } from '@material-ui/core/styles';
import { Camera as CameraIcon, Star as StarIcon } from '@material-ui/icons';
import { IState } from '@models';
import * as AppActions from '@actions/app';
import { ROUTE_PATH_INDEX, ROUTE_PATHS } from '@constants/Paths';

class Footer extends React.Component<Props, any, any> {
  handleChange = (_: any, value: any) => {
    const { actions, history } = this.props;

    // if (value === 0) {
    //   history.push('/');
    // } else {
    //   history.push('/study');
    // }
    // history.push(ROUTE_PATHS.Footer[ROUTE_PATH_INDEX.Main]);
    actions && actions.tabChange(Number(value));
  }

  render() {
    const { tabIndex, classes } = this.props;

    return (
      <BottomNavigation value={tabIndex} onChange={this.handleChange} className={classes.root}>
        <BottomNavigationAction
          className={classes.iconBtn}
          value={ROUTE_PATH_INDEX.RegistInit}
          icon={<CameraIcon className={classes.icon} />}
          disableRipple
          disableTouchRipple
          component={(props: any) => <Link to={ROUTE_PATHS[ROUTE_PATH_INDEX.RegistInit]} {...props} />}
        />
        <BottomNavigationAction
          className={classes.iconBtn}
          value={ROUTE_PATH_INDEX.StudyInit}
          icon={<StarIcon className={classes.icon} />}
          disableRipple
          disableTouchRipple
          component={(props: any) => <Link to={ROUTE_PATHS[ROUTE_PATH_INDEX.StudyInit]} {...props} />}
        />
      </BottomNavigation>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  tabIndex: state.get('app').get('tabIndex'),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(AppActions, dispatch),
});

const styles: StyleRulesCallback = ({ palette: { primary }, spacing: { unit } }: Theme) => ({
  root: {
    position: 'fixed',
    bottom: '0',
    width: '100%',
    height: unit * 9,
    backgroundColor: primary.dark,
    alignItems: 'flex-start',
  },
  iconBtn: {
    paddingTop: unit * 1.5,
    // marginBottom: unit,
  },
  icon: {
    color: 'white',
  },
});

export default withRouter(
  connect<StateFromProps, void, void, IState>(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(styles)(Footer)),
);

/** State */
export interface StateFromProps {
  tabIndex: number;
}

/** Properties */
export interface Props extends StateFromProps, WithStyles<StyleRules>, RouteComponentProps<any> {
  actions?: AppActions.Actions;
}
