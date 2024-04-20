import {
    get
} from 'lodash'
import * as readWriteModes from '@wix/wix-data-client-common-standalone'
import {
    roles as inputRoles
} from '@wix/wix-data-client-common/dist/esm/inputComponents'

const isInputRole = role => inputRoles.includes(role)

const isInSomeWritingMode = readWriteType => [readWriteModes.WRITE, readWriteModes.READ_WRITE].includes(readWriteType)

const hasConnectionWithSave = connections =>
    connections.some(
        connection => get(connection, 'config.events.onClick.action') === 'save',
    )

const hasConnectionWithInputRole = connections =>
    connections.some(connection => isInputRole(get(connection, 'role')))

const isForm = (readWriteType, connections) =>
    isInSomeWritingMode(readWriteType) &&
    hasConnectionWithSave(connections) &&
    hasConnectionWithInputRole(connections)

export default isForm