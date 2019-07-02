import { observer, inject } from 'mobx-react';

/* tslint:disable */
function wrapWithMobx<P>(component: any, displayName: string): React.ComponentClass<P> | React.SFC<P> {
/* tslint:enable */
	const wrappedComponent = observer(component);

	wrappedComponent.displayName = displayName;

	return wrappedComponent;
}

function injectWithState<P>(stateInjector: any, component: any, displayName: string): React.ComponentClass<P> | React.SFC<P> {
	const wrappedComponent = inject(stateInjector)(observer(component));
	wrappedComponent.displayName = displayName;

	return wrappedComponent;
}

export {
	wrapWithMobx,
	injectWithState
};