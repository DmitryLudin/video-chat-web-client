import { observer } from 'mobx-react-lite';
import React, { FunctionComponent } from 'react';

export function withObserverMemo<T extends object>(
  component: FunctionComponent<T>,
  isMemo = false
) {
  if (isMemo) {
    return React.memo(component);
  }

  return observer(component);
}
