import { observer } from 'mobx-react-lite';
import React, { FunctionComponent } from 'react';

export function withObserverMemo(
  component: FunctionComponent<Record<string, object>>,
  isMemo = false
) {
  if (isMemo) {
    return React.memo(component);
  }
  return observer(component);
}
