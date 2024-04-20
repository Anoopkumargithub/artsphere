import {
    Maybe
} from '@wix/wix-data-client-wix-code-adt'
import {
    appContext
} from '../viewer-app-module/DataBindingAppContext'

const currentUserFilterResolver = () => () =>
    Maybe.fromNullable(appContext.platform.user).map(({
            id,
            loggedIn
        }) =>
        loggedIn ? id : null,
    )

export default currentUserFilterResolver