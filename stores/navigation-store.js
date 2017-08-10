import { action, observable } from 'mobx';

import AppNavigator from '../components/AppNavigator';

class NavigationStore {
  @observable headerTitle = 'Songs';
  @observable.ref navigationState = {
    index: 0,
    routes: [
      { key: 'Songs', routeName: 'Songs' },
    ],
  };

  // NOTE: the second param, is to avoid stacking and reset the nav state
  @action dispatch = (navAction, stackNavState = true) => {
    const previousNavState = stackNavState ? this.navigationState : null;
    return this.navigationState = AppNavigator
      .router
      .getStateForAction(navAction, previousNavState);
  }
}

export default NavigationStore;
